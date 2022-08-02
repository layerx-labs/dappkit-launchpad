import fs from 'fs';
import path from 'path';
import {paramCase} from 'change-case';
import makeFunction from './make-function.mjs';
import makeEvent from './make-event.mjs';
import parseInputs from '../utils/parse-inputs.mjs';
import parseTemplate from '../utils/parse-template.mjs';

export default function dappkitTranspiler(contractJsonFile = "", options = {}) {
  process.env = {... (process.env || {}), TEMPLATE_DIR: options.templatesDir} // make parseTemplate know where to look for files.

  const contract = JSON.parse(fs.readFileSync(path.resolve(contractJsonFile), "utf8"));

  const publicFns = contract.abi.filter((option) => !option.anonymous);

  const functions = publicFns.filter(({type}) => type === "function");
  const events = publicFns.filter(({type}) => type === "event");
  const constructorKey = publicFns.filter(({type}) => type === "constructor");
  const constructorInputs = constructorKey[0]?.inputs || [];

  const modelName = contract.contractName;
  const abiInputs = parseInputs(constructorInputs);

  const devDocEntries = Object.entries(contract?.devdoc?.methods || []);

  const modelContent =
    functions.map(option => {
      const devdoc = devDocEntries.find(([key, value]) => key.startsWith(option.name) && value);
      return makeFunction(option, true, devdoc?.length && (devdoc[1].details || devdoc[1].notice || ""));
    }).concat(events.map(o => makeEvent(o, true)).join('\n')).join("\n");

  const modelClass =
    parseTemplate("class", 
      {
        imports:
          parseTemplate("class-imports", {
            libs: parseTemplate("libs-import", {options}),
            events: events.length > 0,
            name: modelName,
            methodFileName: paramCase(modelName),
            eventFileName: paramCase(modelName), 
            options}),
        modelName, 
        modelNameAppendix: ` extends Model<${modelName}Methods> implements Deployable`,
        type: "class",
        isModel: true,
        deployJsonAbi: true,
        abiInputs,
        deployArguments: parseInputs(constructorInputs, undefined, true),
        content: modelContent
      })

  const interfaceClass = parseTemplate("class", {
    imports: parseTemplate("interface-imports", {options}),
    type: "interface", modelName, modelNameAppendix: "Methods", deployJsonAbi: false,
    content: functions.map(option => makeFunction(option, false)).join('\n')
  });

  const eventsClass = events.length > 0 && [parseTemplate("event-imports"), events.map(o => makeEvent(o, false)).join('\n')].join('\n') || "";

  return {modelClass, eventsClass, interfaceClass}

}

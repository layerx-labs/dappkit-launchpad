import parseTemplate from './parse-template.mjs';
import {getSolidityType} from '../src/solidity-types-magic.mjs';
/**
 * 
 * @param {Contract~AbiOption~Input[]} outputs 
 * @param {string} template 
 * @param {boolean} useComponentName 
 */
export default function parseOutput(outputs, template = `ContractCallMethod<%content%>`, useComponentName = false) {
  if (!outputs?.length)
    return `ContractSendMethod`;


  const _templateContent = (o, index) => 
    parseTemplate("output-object-prop", 
      {name: useComponentName && o.name || Number(index), type: getSolidityType(o.type), separator: ";"});

  const _templateComponent = (o, index) => 
    parseTemplate("output-object-prop",
      {
        name: useComponentName && o.name || Number(index),
        type: o.components.map(_templateMapper).join(``), 
        separator: [getSolidityType(o.type),";"].join(``),
        isObject: true,
      })

  const _templateMapper = (o, index) => !o.components ? _templateContent(o, index) : _templateComponent(o, index);

  let content = outputs.map(_templateMapper).join(``);

  if (outputs.length === 1) {
    content = content.replace("'0': ", "");
    if (!outputs[0].name)
      content = content.replace(/;$/g, ``);
  } else content = `{${content}}`;

  return template.replace(`%content%`, content.trim());
}
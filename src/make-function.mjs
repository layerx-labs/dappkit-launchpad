import parseInputs from "../utils/parse-inputs.mjs"
import parseOutput from "../utils/parse-output.mjs"
import parseTemplate from '../utils/parse-template.mjs';


/**
 * @param {Contract~AbiOption} option
 * @param {boolean} [withBody=false]
 * @param {string} [devDoc=""]
 * @return {string}
 */
export default function makeFunction(option, withBody = false, devDoc = "") {
  const parsedInputs = parseInputs(option.inputs);
  const isCall = option.stateMutability === "view" || option.stateMutability === "pure";
  
  let parsedOutputs = "";
  let functionBody = "";

  if (withBody) {
    const inputs = option.inputs.map(({name}, i) =>  name || 'arg'+(+i+1)).join(`, `);
    functionBody = parseTemplate("function-content", {methodName: option.name, inputs, isCall});
  } else parsedOutputs = parseOutput(option.outputs, isCall ? 'ContractCallMethod<%content%>;' : 'ContractSendMethod;', true);

  return parseTemplate("function", {comment: devDoc, name: option.name, inputs: parsedInputs, outputs: parsedOutputs, content: functionBody, isAsync: withBody})
}
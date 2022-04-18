import parseOutput from '../utils/parse-output.mjs';
import parseTemplate from '../utils/parse-template.mjs';

/**
 * 
 * @param {Contract~AbiOption} option 
 * @param {boolean} [withBody=false]
 * @returns string
 */
export default function makeEvent(option, withBody = false) {
  if (!withBody)
    return parseTemplate("event-interface", {name: option.name, content: parseOutput(option.inputs, `%content%`, true)});

  return parseTemplate("event-function", {name: option.name})
}
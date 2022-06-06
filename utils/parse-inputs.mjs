import { getSolidityType } from "../src/solidity-types-magic.mjs";
import parseTemplate from './parse-template.mjs';
import parseOutput from "./parse-output.mjs";

/**
 * @param {Contract~AbiOption~Input[]} inputs
 * @param {string} [joiner=", "]
 * @param {boolean} [noType=false]
 * @return string
 */
export default function parseInputs(inputs, joiner = `, `, noType = false) {
  return inputs?.map((input, i) => 
            input.components?.length
              ? parseTemplate("object-argument", {params: parseOutput([input], `%content%`, true)})
              : parseTemplate("argument", {inputName: input.name || `arg${i+1}`, type: !noType && getSolidityType(input.type)})
          )?.join(joiner);
}

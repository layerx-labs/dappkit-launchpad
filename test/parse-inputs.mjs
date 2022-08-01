import parseInputs from "../utils/parse-inputs.mjs";
import {expect} from "chai";

describe(`parseInputs()`, () => {
    [
        [`single, primitive`, [{type: 'uint'}], `arg1: number`],
        [`multiple, primitive`, [{type: 'uint'}, {type: 'address'}], `arg1: number, arg2: string`],
        [`single, object`, [{components: [{type: 'uint'}]}], `params: { '0': number; }`],
        [`multiple, object`, [{components: [{type: 'uint'}, {type: 'address'}]}], `params: { '0': number;'1': string; }`],
    ].forEach(([title, mock, expectation]) => {
        it(title, () => { expect(parseInputs(mock)).to.eq(expectation)})
    })
});
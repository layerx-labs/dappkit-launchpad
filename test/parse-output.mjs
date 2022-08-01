import {expect} from "chai";
import parseOutput from "../utils/parse-output.mjs";

const CallMethod = (type) => `ContractCallMethod<${type}>`

describe(`parseOutput()`, () => {

  it(`has no output`, () => {
    expect(parseOutput([])).to.eq(`ContractSendMethod`);
  });

  [
    [`single, primitive`, [{type: "uint"}], CallMethod`number`],

    [`single, primitive, unnamed`, [{type: "uint", name: ''}], CallMethod`number`],

    [
      `object single, primitive, named`,
      [{components: [{type: "uint", name: "num"},]}],
      CallMethod`{ 'num': number; }`
    ],

    [
      `object multiple, primitive`,
      [{components: [{type: "bytes"}, {type: "bytes[]"}]}],
      CallMethod`{ '0': string;'1': string[]; }`
    ],

    [
      `object multiple, object`,
      [{components: [{type: "uint"}, {components: [{type: "address"}]}]}],
      CallMethod`{ '0': number;'1': { '0': string; }; }`
    ],

    [
      `object multiple, edge`,
      [{components: [{type: "uint[]"}]}, {type: "address"}],
      CallMethod`{'0': { '0': number[]; };'1': string;}`
    ],

  ].forEach(([title, mock, expectation]) => {
    it(title, () => {
      expect(parseOutput(mock, undefined, true)).to.eq(expectation);
    });
  });

});
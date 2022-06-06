import makeFunction from "../src/make-function.mjs";
import {expect} from "chai";

describe(`covers makeFunction()`, () => {
  it(`pure and SendMethod`, () => {
    expect(makeFunction({stateMutability: "external", outputs: []}, false)).to.eq(`  (): ContractSendMethod\r\n`)
  });

  it(`nameless arg CallMethod`, () => {
    expect(makeFunction({stateMutability: "pure", inputs: [{type: "uint"}], outputs: [{type: "uint"}]}, false)).to.eq(`  (arg1: number): ContractCallMethod<number>;\r\n`)
  })

  it(`nameless arg CallMethod with body`, () => {
    expect(makeFunction({stateMutability: "pure", name: "method", inputs: [{type: "uint"}], outputs: [{type: "uint"}]}, true))
      .to.contain(`.method(arg1)`)
  })
})
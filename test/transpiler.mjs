import dappkitTranspiler from "../src/transpiler.mjs";
import config from '../config.mjs';
import {expect} from "chai";

describe(`dappkitTranspiler()`, () => {
  let modelClass, eventsClass, interfaceClass;
  before(() => {
    const {modelClass: model, eventsClass: events, interfaceClass: face} =
      dappkitTranspiler("test/mocks/contract.json", config);

    modelClass = model;
    eventsClass = events;
    interfaceClass = face;
  });

  it(`made constructor`, () => {
    expect(modelClass).to.contain(`deployJsonAbi(_constructorArg: number)`);
  });

  it(`made Function()`, () => {
    expect(modelClass).to.contain(`async Function(entryArg: number)`);
  });

  it(`made getEventEvents()`, () => {
    expect(modelClass).to.contain(`getEventEvents`).and.to.contain(`Promise<XEvents<Events.EventEvent>[]>`)
  });
});
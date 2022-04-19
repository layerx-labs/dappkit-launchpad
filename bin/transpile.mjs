#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import defaultConfig from '../config.mjs';
import logger from '../utils/logger.mjs';
import {paramCase, camelCase} from 'change-case';
import dappkitTranspiler from '../src/transpiler.mjs';

/**
 * @typedef {Object} Contract~AbiOption~Input
 * @property {string} internalType
 * @property {string} name
 * @property {string} type
 * @property {boolean} [indexed]
 * @property {boolean} [optional]
 * @property {Contract~AbiOption~Input[]} [components]
 * @property {*} [defaultValue]
 */

/**
 * @typedef {Object} Contract~AbiOption
 * @property {string} type
 * @property {string} name
 * @property {Contract~AbiOption~Input[]} inputs
 * @property {Contract~AbiOption~Input[]} [outputs]
 * @property {boolean} [anonymous]
 * @property {string} [stateMutability]
 */

/**
 * @typedef Contract
 * @property {string} contractName
 * @property {Contract~AbiOption[]} abi
 */

const args = yargs(hideBin(process.argv))
    .usage(`Usage: $0 [options]`)
    .alias(`f`, `file`)
    .nargs(`f`, 1)
    .describe(`f`, `File to parse`)
    .alias(`i`, `interfaceDir`)
    .describe(`i`, `directory to output interface file into`)
    .alias(`c`, `classDir`)
    .describe(`c`, `directory to output class file into`)
    .alias(`n`, `name`)
    .describe(`n`, `change the file name`)
    .alias(`I`, `overwriteInterface`)
    .describe(`I`, `allow interface file overwrite`)
    .alias(`C`, `overwriteClass`)
    .describe(`C`, `allow class file overwrite`)
    .alias(`e`, `eventsDir`)
    .describe(`e`, `directory to output events to`)
    .alias(`E`, `overwriteEvent`)
    .describe(`E`, `allow event interface file overwrite (events will be spawned on same folder as interface)`)
    .alias(`j`, `json`)
    .describe(`j`, `json configuration file`)
    .alias(`p`, `asPackage`)
    .describe(`p`, `outputs imports from dappkit istead of source`)
    .demandOption([`f`,])
    .help(`h`)
    .alias(`h`, `help`)
    .argv;

function main() {
    logger(path.basename(args.file), `dappkit parsing`);

    function makeOutputFile(dir, parsed = ``) {
        const classOutputFile = path.resolve(dir, paramCase(camelCase(path.basename(args.file))).replace(`-json`, `.ts`));
        if (fs.existsSync(classOutputFile) && !args.overwriteClass)
            logger(`file ${classOutputFile} already exists`, `Warning`, parsed);
        else {
            fs.writeFileSync(classOutputFile, parsed, `utf-8`);
            logger(`Class created`, `Success`, classOutputFile);
        }
    }

    if (!fs.existsSync(args.file))
        return logger(`File ${args.file} not found`, `Error`);

    if (args.json && !fs.existsSync(args.json))
        return logger(`Configuration file ${args.json} not found`, `Error`);

    const options = {
        ... defaultConfig,
        ... args.json ? JSON.parse(fs.readFileSync(args.json, 'utf8')) : {},
    };

    if (options.asPackage) {
        options.paths.abi = path.dirname(args.file);
        options.paths.events = options?.output?.eventsDir;
        options.paths.methods = options.paths.interfaces = options?.output?.interfaceDir
    }

    if (!args.interfaceDir)
        args.interfaceDir = options?.output?.interfaceDir;

    if (!args.classDir)
        args.classDir = options?.output?.classDir;

    if (!args.eventsDir)
        args.eventsDir = options?.output?.eventsDir;

    if (args.overwriteInterface === undefined)
        args.overwriteInterface = options?.overwrite?.interface;

    if (args.overwriteClass === undefined)
        args.overwriteClass = options?.overwrite?.class;

    if (args.overwriteEvent === undefined)
        args.overwriteEvent = options?.overwrite?.events;

    const Parsed = dappkitTranspiler(args.file, options);

    if (args.classDir)
        makeOutputFile(args.classDir, Parsed.modelClass);
    else logger(Parsed.modelClass, `Model`)

    if (args.interfaceDir)
        makeOutputFile(args.interfaceDir, Parsed.interfaceClass);
    else logger(Parsed.interfaceClass, `Methods`)

    if (args.eventsDir && Parsed.events)
        makeOutputFile(args.classDir, Parsed.eventsClass);
    else logger(Parsed.eventsClass, `Events`)
}

main();
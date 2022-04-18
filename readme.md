# dappkit-launchpad
Solidity to Typescript transpile automator for @taikai/dappkit.

```bash
$ npm install dappkit-launchpad
```

## Usage
```bash
$ node index.mjs -f path/to/your/contract/abi.json -j config.json
```

### Configuration
```json5
{
  paths: {                            // import paths, ignore if asPackage: true
    base: "@base",                    // @taikai/dappkit base folder
    interfaces: "@interfaces",        // @taikai/dappkit interfaces folder
    abi: "@abi",                      // @taikai/dappkit abi folder
    methods: "@methods",              // @taikai/dappkit methods folder
    events: "@events"                 // @taikai/dappkit events folder
  },
  output: {                           // where to output each file (empty defaults to console.log)
    interfaceDir: "",
    classDir: "",
    eventsDir: ""
  },
  overwrite: {                        // which files can be overwritten
    interface: false,
    class: false,
    events: false
  },
  asPackage: true,                    // used internally, "false" will use imports from @taikai/dappkit source
  templatesDir: "./src/templates"     // where to get the handlebars templates from, you'll need to provide ALL files
}
```
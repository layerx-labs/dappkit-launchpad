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
  paths: {                            // import paths, point to @taikai/dappkit/src or use magic paths
    base: "@base",                    // base will only be used internally
    interfaces: "@interfaces",
    abi: "@abi",
    methods: "@methods",
    events: "@events"
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
  asPackage: false,                   // used internally
  templatesDir: "./src/templates"     // where to get the handlebars templates from, you'll need to provide ALL files
}
```
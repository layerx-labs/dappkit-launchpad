# dappkit-launchpad
Solidity to Typescript transpile automator for @taikai/dappkit.

```bash
$ npm install -g @taikai/dappkit-launchpad
```

## Usage
```bash
$ dk-transpile -f path/to/your/contract/abi.json -j config.json
```

### Configuration
```json5
{
  paths: {                            // import paths, ignore if asPackage: true
    base: "@base",                    // @taikai/dappkit base folder
    abi: "@abi",                      // @taikai/dappkit abi folder        | will be rewritten if asPackage = true, path.dirname(--file)
    interfaces: "@interfaces",        // @taikai/dappkit interfaces folder | will be rewritten if asPackage = true, output.interfaceDir
    methods: "@methods",              // @taikai/dappkit methods folder    | will be rewritten if asPackage = true, output.interfaceDir
    events: "@events"                 // @taikai/dappkit events folder     | will be rewritten if asPackage = true, output.eventsDir
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

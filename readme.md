# dappkit-launchpad
Solidity to Typescript transpiler for @taikai/dappkit with templates

```bash
$ npm install -g @taikai/dappkit-launchpad
```

## Usage
```bash
$ dk-transpile -f path/to/your/contract/abi.json
```
### CLI usage
All non provided cli options will be overriden by their counterpart value on the json configuration, and if none exists a [default will be used](https://github.com/taikai/dappkit-launchpad/blob/master/config.mjs).
```bash
  -f, --file                File to parse                             [required]
  -i, --interfaceDir        directory to output interface file into
  -c, --classDir            directory to output class file into
  -n, --name                change the file name
  -I, --overwriteInterface  allow interface file overwrite
  -C, --overwriteClass      allow class file overwrite
  -e, --eventsDir           directory to output events to
  -E, --overwriteEvent      allow event interface file overwrite (events will be
                             spawned on same folder as interface)
  -j, --json                json configuration file
  -p, --asPackage           outputs imports from dappkit istead of source
  -h, --help                Show help                                 
```

### JSON Configuration
All the cli options are available as a json configuration,

|option||description|
|-|-|-|
|**asPackage**||asPackage is a backwards compatability flag that should always be `true` and will be deprecated.|
|**templatesDir**||source for the hbs templates. If you provide a custom path, you'll need to provide ALL templates|
|paths||paths works when `asPackage=false` and is a backwards compatability flag, it can be ignored as it will be deprecated|
|paths|**base**|dappkit base folder|
|paths|**abi**|where all abis are|
|paths|**interfaces**|where interfaces are imported from/exported to|
|paths|**methods**|where the methods are imported from/exported to|
|paths|**events**|where the events are imported from/exported to|
|output||Output controls where the generated files will be created; Leaving it empty the file will be outputted to the terminal|
|output|**interfaceDir**|folder for interfaces output|
|output|**classDir**|folder for model extension output|
|output|**eventsDir**|folder for events output|
|overwrite||Which files can be overwritten if already exist|
|overwrite|**interface**||
|overwrite|**class**||
|overwrite|**events**||

##### default configuration ([`config.mjs`](https://github.com/taikai/dappkit-launchpad/blob/master/config.mjs))
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
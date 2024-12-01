const lib = await import('../as-is.class.js');
const { Checker } = lib;
const { is, as, Interface, JSON5, optional } = new Checker();
import { promises } from 'fs';
const { writeFile } = promises;
import { minify } from 'terser';

export const buildInterfaces = {
    IObjectProperty: {
        objName: as.string,
        propertyName: as.string
    },
    IFunctionClass: {
        src: as.arrayFunction,
        pattern: as.stringUndefined
    },
    IBuilder: {
        out: as.string,
        pattern: as.string,
        path: as.string,
        es6export: optional.boolean,
        browserExport: optional.boolean,
        commonExport: optional.boolean
    }
};

Interface(buildInterfaces);

export class Builder {
    constructor(config, _= as.IBuilder = config) {
        const { out, pattern, path } = config;
        as.function(Builder[out]);
        as.function(Builder[pattern]);
        this.out = Builder[out].bind(this);
        this.accumulator = '';
        this.pattern = Builder[pattern];
        Object.keys(lib).forEach((module)=> {
            switch (true) {
                case is.array(lib[module]): this.out(Builder.array(lib[module], this.pattern(module)));
                    break;
                case is.class(lib[module]): this.out(Builder.class(lib[module], this.pattern(module)));
                    break;
                case is.object(lib[module]): {
                    let objOut = Builder.object(module);
                    Object.keys(lib[module]).forEach((key)=> {
                        is.function(lib[module][key])
                        && (objOut += Builder.function(lib[module][key], Builder.property(module, key)));
                    })
                    this.out(objOut);
                }
                    break;
                case is.function(lib[module]): this.out(Builder.function(lib[module], '\n'));
                    break;
            }
        });
        config.es6export && this.out(Builder.es6export(Object.assign({}, lib)));
        config.browserExport && this.out(Builder.browserExport(Object.assign({}, lib)));
        config.commonExport && this.out(Builder.commonExport(Object.assign({}, lib)));
        is.notEmpty(this.accumulator) && this.writeAccumulator(path);
    }

    static array(src, pattern,
                 _ = as.IFunctionClass = {src, pattern}) {
        return `${pattern}${JSON5.stringify(src)};\n`;
    }

    static function(src, pattern,
                    _ = as.IFunctionClass = {src, pattern}) {
        return `${pattern}${src.toString ? src.toString(): String(src)};\n`;
    }

    static class(src, _ = as.class(name)) {
        return `${src.toString()}\n`;
    }

     static constPattern(name, _ = as.string(name)) {
        return `const ${name} = `;
     }

     static object(name, _ = as.string(name)) {
        return `const ${name} = {};\n`
     }

     static property(objName, propertyName,
                     _ = as.IObjectProperty = {objName, propertyName}) {
        return `${objName}.${propertyName} = `;
     }

     static es6export(modulesList, _ = as.object(modulesList)) {
        return `export { ${Object.keys(modulesList).join(', ')} };`;
     }

     static commonExport(modulesList, _ = as.object(modulesList)) {
        return `module.exports = { ${Object.keys(modulesList).join(', ')} };`;
     }

     static browserExport(modulesList, _ = as.object(modulesList)){
        return `Object.assign(window, { ${Object.keys(modulesList).join(', ')} })`;
     }

     static consoleOut(string, _= as.string(string)){
        console.info(string);
     }

     static fileOut(string, _= as.string(string)) {
        this.accumulator += string;
     }

    async writeAccumulator(path) {
        const result = await minify(this.accumulator.replace(/\b(const|let|var)\s+/g, '$1 '), {
            mangle: {
                toplevel: true
            },
            sourceMap: {
                filename: (path.split('/'))[2],
                url: `${(path.split('/'))[2]}.map`
            },
            compress: {
                global_defs: {
                    "@console.log": "alert"
                },
                passes: 2
            },
            format: {
                preamble: "/* minified */"
            }
        });

        await writeFile(path, result.code);
        await writeFile(`${path}.map`, result.map);
    }
}

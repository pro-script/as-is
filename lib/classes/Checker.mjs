import JSON5wrapper from '../../vendor/JSON5.wrapper.mjs';
import primitiveTypes from '../types/primitiveTypes.mjs';
import structuralTypes from '../types/structuralTypes.mjs';
import otherTypes from '../types/otherTypes.mjs';
import aliasTypes from '../types/aliasTypes.mjs';
import Utility from './Utility.mjs';

export default class Checker {


    constructor(options = {
        'IF/ELSE/END': true,
        strict: false,
        Enum: true,
        utility: false
    }) {
        options['IF/ELSE/END'] && (
            this.IF = this.#proxyIs,
            this.ELSE = this.#proxyIs,
            this.END = null
        );
        options.strict && (this.strict = this.#proxySet);
        options.utility && (this.get = new Utility());
        options.Enum && (this.Enum = this.#enumProxy());
        options.integrate || (options.integrate = {});
        this.errorMsg = options.errorMsg || Checker.errorMsg;
        this.enabled = true;
        this.is = this.#proxyIs;
        this.optional = this.#optionalAs;
        this.as = this.#proxyAs;
        this.JSON5 = JSON5wrapper();
        this.integrate = {};

        Object.keys(options.integrate)
            .forEach((key)=> this.is.function(this.integrate[key])
                && (this.integrate[key]= this.integrate[key].bind(this)));

        this.Interface = function (interfaces) {
            this.as.object(interfaces);
            Object.keys(interfaces).forEach((interface_)=> {
                if(Object.keys(interfaces[interface_]).length)
                    this.#interfaces[interface_] = this.#interfaceProxy(interfaces[interface_])
                else
                    throw new SyntaxError('Check interface syntax. You should use nested objects for interfaces.');
            });
            return this.#interfaces;
        }.bind(this);

        this.multi = (typeList)=> {
            if(!Array.isArray(typeList) || typeList.length !== 1)
                throw new SyntaxError(`as-is Syntax Error ${typeList} isn't array with one string`);
            return this.as[typeList[0]]
        }
    }

    #error = null;
    #typeValue = null;
    #interfaces = {};

    #typeError(params, typeError = true ) {
        if(typeError) throw new TypeError(this.errorMsg(params));
        return false;
    }

    #optionalAs = new Proxy(this, {
        get(target, name) {
            target.#typeValue = `undefinedNull${name}`;
            name = target.#typeValue;
            target.#error = target.enabled;
            return new Proxy(()=> name, {
                apply: target.#apply.bind(target),
                get(target, name){
                    return name
                }});
        },
        set(target, prop, value) {
            Object.keys(value).forEach((key)=> target.#interfaces[prop][key] = value[key]);
            return value;
        }
    });

    #proxyIs = new Proxy(this, {
        get(target, name) {
            target.#error = false;
            target.#typeValue = name;
            return new Proxy(()=> null, { apply: target.#applyIs.bind(target) })
        }
    });

    #interfaceProxy = function (receiver) {
        return new Proxy(receiver, {
            get(target, name){
                return `${name}::${target[name].name}`;
            },
            set(target, name, value) {
                if(!Checker.primitive([target[name], 'function']))
                    throw new TypeError(`Invalid property name "${name}" in property list { ${Object.keys(target).join(' ,')} }`);
                return target[name](value);
            },
            isExtensible() {
                return false;
            },
            deleteProperty(target, key) {
                throw new TypeError(`Attempted to delete the interface readonly property [${key}]`)
            },
            defineProperty(target, key, descriptor) {
                throw new TypeError(`Attempted to defineProperty the interface readonly property [${key}]`)
            }
        })
    }

    #proxyAs = new Proxy(this, {
        get(target, name) {
            target.#typeValue = name;
            target.#error = target.enabled;
            const handler = new Proxy(()=> name, { apply: target.#apply.bind(target), name });
            Object.defineProperty(handler, 'name',{
                value: name
            });
            return handler;
        },
        set(target, prop, value) {
            if(Checker.structural([value, 'object'])){
                Object.keys(value).forEach((key)=> {
                    if(value[key]!==undefined && value[key]!==null) target.#interfaces[prop][key] = value[key]
                    else if(!target.#interfaces[prop][key].toLowerCase().includes(`${value[key]}`))
                        target.#typeError([value[key], target.#interfaces[prop][key].split(':')[2]])
                })
            } else {
                target.#typeValue = prop;
                target.#apply(()=>{}, target, [value]);
            }
            return value;
        }
    });

    #applyIs(target, thisVal, [value]) {
        let result = this.#apply(target, thisVal, [value]);
        result = Checker.nullish([result]) || !!result;
        return result;
    }

    #apply(target, thisVal, [value]) {
        let method4type;
        method4type = Checker.defineMethod(target() || this.#typeValue);
        let returned;
        switch (true){
            case !method4type && !!Checker.multiCheck(value, target() || this.#typeValue).length: {
                method4type = 'multiType';
                returned = this.check(value, target() || this.#typeValue, method4type);
            }
                break;
            case Object
                .keys(this.integrate)
                .includes(target() || this.#typeValue): returned = this.integrate[target() || this.#typeValue](value);
                break;
            case ['Any', 'any'].includes(target()) || ['Any', 'any'].includes(this.#typeValue): {
                method4type = 'any';
                returned = this.check(value, target() || this.#typeValue, method4type);
            }
                break;
            case method4type === undefined: {
                this.#typeValue = `class:${target() || this.#typeValue}`;
                method4type = 'class';
                returned = this.check(value, target() || this.#typeValue, method4type);
            }
                break;
            default:
                returned = this.check(value, target() || this.#typeValue, method4type);
        }
        return returned;
    };

    #proxySet = new Proxy(this, {
        get(target, name) {
            this.lastType = name;
            return this[name] ? this[name]: new Proxy(()=> 0, { apply: target.#setApply.bind(this) });
        },
        set(target, prop, value) {
            this.variables.forEach((varName, idx)=> {
                if(varName === prop) {
                    target.#error = !this.swap;
                    target.check(value, this.types[idx], Checker.defineMethod(this.types[idx]));
                    this[prop] = value;
                }
            })
            return true;
        }
    });

    #setApply(func, target, [value]) {
        if(Array.isArray(value)) {
            !this.types ? this.types = [this.lastType] : this.types.push(this.lastType);
            !this.variables ? this.variables = [value[0]]
                : Checker.duplicateError(value[0], this.variables) || this.variables.push(value[0]);
            return target;
        }
    }

    #enumProxy() {
        const handler = new Proxy(()=> null, {
            apply(func, target, [value]) {
                this.stop = { inc: true, dec: true };
                this.container = new class Enum { constructor() { return this } };
                this.step = value['Enum.step'] || 1;
                if(!Checker.structural([value, 'object'])) throw new TypeError('Enum can only be an object');
                const keys = Object.keys(value).filter((keys)=> !['Enum.step'].includes(keys));
                const inc = keys.filter((key)=> value[key]==='Enum.inc');
                const dec = keys.filter((key)=> value[key]==='Enum.dec');
                keys.forEach((key)=> {
                    value[key]==='Enum.inc' && this.stop.inc && inc.length && this.calc({ value, keys, inc, func: 'inc' });
                    value[key]==='Enum.dec' && this.stop.dec && dec.length && this.calc({ value, keys, dec, func: 'dec' });
                });
                keys.forEach((key)=> !inc.includes(key) && !dec.includes(key) && (this.container[value[key]]= key));
                Object.freeze(this.container);
                return this.container;
            },
            calc(params) {
                let {value, keys, func, start = this.step} = params;
                if(this.stop[func]) {
                    this.stop[func] = false;
                    keys.forEach((key)=> {
                        if(params[func].includes(key)){
                            this.container[key]= start;
                            this.container[this.container[key]]= key;
                            func === 'inc'
                                ? start += this.step
                                : start -= this.step;
                        } else {
                            func === 'inc'
                                ? (Checker.primitive([value[key], 'number']) && (start = value[key] + this.step))
                                : (Checker.primitive([value[key], 'number']) && (start = value[key] - this.step));
                            this.container[key] === undefined && (this.container[key]= value[key]);
                        }
                    });
                }
            }
        });
        return new Proxy(handler, {
            get(target, name) {
                let meOut;
                switch(name) {
                    case 'step': case 'inc': case 'dec': meOut = `Enum.${name}`;
                        break;
                    case 'init': meOut = handler;
                        break;
                }
                return meOut;
            }
        });
    }

    check(...params) {
        const [ arg, $type, ruleName ] = params;
        const checkedValue = Checker[ruleName].bind(this)(params);
        let result = (Checker.nullish([checkedValue]) || !!checkedValue)
            ? (arg === undefined && !Checker.primitive([checkedValue, 'boolean']) || arg === false ? checkedValue: arg)
            : false;
        if(this.#error) return result !== false ? result: this.#typeError([arg, $type]);
        else return result?.name !==this.constructor.name ? result: {};
    }

    static alias(params) {
        const [arg, $type] = params;
        let meOut = false;
        switch (true){
            case $type.toLowerCase() === 'argument': meOut = Checker.multiType.bind(this)([arg, 'ArrayObject']);
                break
            case $type.toLowerCase() === 'iterable': meOut = Checker.multiType.bind(this)([arg, 'iteratorObjectSymbol'])
                break
            case $type.toLowerCase() === 'generator': meOut = Checker.structural.bind(this)([arg, 'GeneratorFunction'])
                break
            case $type.toLowerCase() === 'promise': meOut = Checker.class.bind(this)([arg, $type])
                break
            case $type.toLowerCase() === 'true': meOut = Checker.primitive.bind(this)([arg, 'boolean']) && arg;
                break
            case $type.toLowerCase() === 'false': meOut = Checker.primitive.bind(this)([arg, 'boolean']) && !arg;
                break

        }
        return meOut;
    }

    static CheckPlatform(params, platform) {
        return Checker.structural([globalThis[platform], platform]);
    }

    static iterator(params) {
        const [arg] = params;
        return !!arg?.[Symbol.iterator] || !!arg?.[Symbol.asyncIterator];
    }

    static nullish(params) {
        const [arg] = params;
        return [undefined, 0, 0n, '', null, NaN].includes(arg)
    }

    static bun(params) {
        const node = Checker.node(params);
        return node?.isBun ? node: false;
    }

    static browser(params) {
        let result = Checker.CheckPlatform(params, 'navigator');
        return  result ? window.navigator: result;
    }

    static browserFromList(params) {
        const [$type] = params;
        let meOut = Checker.CheckPlatform(params, 'navigator');
        meOut && (meOut = window.navigator.userAgent
            .includes($type.toString().replace(/./, firstLetter => firstLetter.toUpperCase())) && window.navigator);
        return meOut;
    }

    static node(params) {
        let result = Checker.CheckPlatform(params, 'process');
        result = result && process?.release?.name === 'node';
        return  result ? process: result;
    }

    static any(value) {
        return value;
    }

    static multiCheck(value, typeValue){
        let meOut = primitiveTypes
            .concat(structuralTypes)
            .concat(otherTypes.map((type)=> type.alias).flat(1))
            .filter((type)=> typeValue.toLowerCase().includes(type.toLowerCase()) ? type: null);
        return meOut;
    }

    static multiType(params) {
        const [arg, $type] = params;
        const error = this.#error;
        const type4Checking = Checker.multiCheck.bind(this)(arg, $type);
        const checked =  type4Checking.length ? type4Checking.filter((type)=> this.is[type](arg) !== false): null;
        this.#error = error;
        return checked?.length ? (arg || true): false;
    }

    static defineMethod($type) {
        let method4type;
        const [otherTypesResult] = otherTypes.filter((item)=> item.alias.includes($type));
        const [aliasTypeResult] = aliasTypes.filter((item)=> item.alias.includes($type));
        const alltypes = primitiveTypes
            .concat(structuralTypes)
            .concat(otherTypes.map((type)=> type.alias).flat(1));
        switch(true){
            case primitiveTypes.map((item)=> item.toLowerCase())
                .includes($type): method4type = 'primitive';
                break;
            case primitiveTypes.map((item)=> item)
                .includes($type): method4type = 'primitive';
                break;
            case !!otherTypesResult?.method4type: method4type = otherTypesResult?.method4type;
                break;
            case !!aliasTypeResult?.method4type: method4type = aliasTypeResult?.method4type;
                break;
            case structuralTypes.map((item)=> item.toLowerCase())
                .includes($type): method4type = `structural`;
                break;
            case structuralTypes.map((item)=> item)
                .includes($type): method4type = `structural`;
                break;
            case $type.split(':')[0] === 'class': method4type = `class`;
                break;
            case $type.endsWith('s') && alltypes.map((item)=> item.toLowerCase())
                .includes($type.slice(0, -1)): method4type = 'numerous';
                break;
            case $type.endsWith('s') && alltypes.map((item)=> item)
                .includes($type.slice(0, -1)): method4type = 'numerous';
                break;

        }
        return method4type;
    }

    static duplicateError(challenger, collection) {
        if(collection.includes(challenger)) throw new Error(`${challenger} has a duplicate`)
        return false
    }

    static numerous(params) {
        const [arg, $type] = params;
        Checker.notEmpty([arg]) ||  this.#typeError([arg, $type]);
        let collection;
        switch (arg.constructor.name.toLowerCase()) {
            case 'object': collection = Object.values(arg);
                break;
            case 'set': collection = Array.from(arg);
                break;
            case 'map': collection = Array.from(arg.values());
                break;
            default:
                collection = arg;
        }
        const meOut = collection.filter((item)=> {
            const method = Checker.defineMethod($type.slice(0, -1));
            return Checker[method]([item, $type.slice(0, -1)]);
        });
        return collection.length  === meOut.length;
    }

    static primitive(params) {
        const [arg, $type] = params;
        return (typeof arg === $type.toLowerCase());
    }

    static array(params) {
        const [arg] = params;
        return Array.isArray(arg);
    }

    static json(params) {
        const [arg] = params;
        let meOut = true;
        try { JSON.parse(arg) } catch(e) { meOut = false }
        return meOut;
    }

    static json5(params) {
        const [arg] = params;
        let meOut = true;
        try { this.JSON5.parse(arg) } catch(e) { meOut = false }
        return meOut;
    }

    static empty(params) {
        const [arg] = params;
        let meOut;
        switch (true) {
            case Checker.structural([arg, 'object']): meOut = !Object.keys(arg).length;
                break;
            case Checker.structural([arg, 'map']): meOut = !arg.size;
                break;
            case Checker.structural([arg, 'set']): meOut = !arg.size;
                break;
            case arg?.length === 0: meOut = true;
                break;
        }
        return !!meOut;
    }

    static notEmpty(params) {
        const [arg] = params;
        let meOut;
        switch (true) {
            case Checker.structural([arg, 'object']) && !!Object.keys(arg).length: meOut = true;
                break;
            case Checker.structural([arg, 'set']) && !!arg.size: meOut = true;
                break;
            case Checker.structural([arg, 'map']) && !!arg.size: meOut = true;
                break;
            case arg?.length > 0: meOut = true;
                break;
        }
        return !!meOut;
    }

    static date(params) {
        const [arg] = params;
        return arg instanceof Date;
    }

    static null(params) {
        const [arg] = params;
        return arg === null;
    }

    static structural(params) {
        const [arg, $type] = params;
        return !!arg?.constructor && arg.constructor.name.toLowerCase() === $type.toLowerCase();
    }

    static class(params) {
        const [arg, $type] = params;
        let meOut;
        const standartTypes = primitiveTypes.concat(structuralTypes).concat(otherTypes.map((type)=> type.alias).flat(1))
        if(Checker.nullish([arg])) meOut = false;
        else meOut = !$type
            || (arg?.name === $type.split(':')[1] && !Checker.nullish([arg?.name]))
            || (arg?.constructor?.name === $type.split(':')[1] && !Checker.nullish([arg?.constructor?.name]))
            || (arg?.prototype?.constructor?.name === $type.split(':')[1] && arg?.prototype?.constructor?.name !== undefined)
            || (!standartTypes.includes(arg?.constructor?.name) && !Checker.nullish([arg?.constructor?.name]))
            || (!standartTypes.includes(arg?.prototype?.constructor?.name) && arg?.prototype !== undefined)
            || ((Object.getPrototypeOf(arg))?.constructor.name === $type.split(':')[1]
                && !Checker.nullish([(Object.getPrototypeOf(arg))?.constructor.name]))
            || false;

        return meOut;
    }
    static errorMsg(params) {
        const [ arg, $type, obj ] = Array.from(params);
        let meOut;
        try {
            meOut = `${obj || (
                arg?.constructor
                    ? arg.constructor.name
                    : String(arg)
            )
            } is not a(an) ${$type}`;
        } catch (e){
            meOut = `Can\'t handle this type. It's possible you are using system type like [Module] or has as-is syntax error`;
        }
        return meOut;
    }

}

export { primitiveTypes, structuralTypes, otherTypes, aliasTypes, Checker, Utility, JSON5wrapper }

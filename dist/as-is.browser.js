class BaseInterface {
    constructor(otherClass = BaseInterface) {
        const meOut = {};
        Object
            .getOwnPropertyNames(otherClass.prototype)
            .filter((item)=> item !== 'constructor' )
            .forEach((property)=> meOut[property] = otherClass.prototype[property]());

        Object
            .getOwnPropertyNames(otherClass)
            .filter((item)=> !['length', 'name', 'prototype'].includes(item))
            .forEach((property)=> meOut[property] = otherClass[property]());
        return meOut;
    }
}
class Checker {


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
        this.validationErrorMsg = options.validationErrorMsg || Checker.validationErrorMsg;
        this.enabled = true;
        this.is = this.#proxyIs;
        this.optional = this.#optionalAs;
        this.as = this.#proxyAs;
        this.JSON5 = JSON5Wrapper();
        this.integrate = {};

        Object.keys(options.integrate)
            .forEach((key)=> this.is.function(options.integrate[key])
                && (this.integrate[key]= options.integrate[key].bind(this)));

        this.Interface = function (interfaces) {
            this.as.object(interfaces);
            Object.keys(interfaces).forEach((interface_)=> {
                if(Object.keys(interfaces[interface_]).length) {
                    this.#interfaces[interface_] = this.#interfaceProxy(interfaces[interface_])
                } else {
                    throw new SyntaxError('Check the interface syntax. You should use nested objects for interfaces.');
                }
            });
            return this.#interfaces;
        }.bind(this);

        this.Type = function (types) {
            this.as.object(types);
            Object.keys(types).forEach((types_)=> {
                if(Object.keys(types[types_]).length) {
                    this.#types[types_] = this.#typeProxy(types[types_])
                } else {
                    throw new SyntaxError('Check the type syntax. You should use nested objects for types.');
                }
            });
            return this.#types;
        }.bind(this);

        this.multi = (typeList)=> {
            if(!Array.isArray(typeList) || typeList.length !== 1)
                throw new SyntaxError(`as-is Syntax Error ${typeList} isn't array with one string`);
            return this.as[typeList[0]]
        }
    }

    #interfaces = {};
    #types = {};
    #enums = {};

    typeError(params, typeError = true ) {
        if(typeError && !this.disabled) throw new TypeError(this.errorMsg(params))
        else console.error(`TYPE ERROR: ${this.errorMsg(params)}`);
        return false;
    }

    validationError(params, typeError = true ) {
        if(typeError && !this.disabled) throw new TypeError(this.validationErrorMsg(params))
        else console.error(`VALIDATION ERROR: ${this.validationErrorMsg(params)}`);
        return false;
    }

    #optionalAs = new Proxy(this, {
        get(target, name) {
            target.typeValue = `undefinedNull${name}`;
            name = target.typeValue;
            target.error = target.enabled;
            return new Proxy(()=> name, {
                apply: target.#apply.bind(target),
                get(target, name){
                    return name
                }});
        },
        set(target, prop, value) {
            Object.keys(value).forEach((key)=> target.#interfaces[prop][key] = value[key]);
            Object.keys(value).forEach((key)=> target.#types[prop][key] = value[key]);
            return value;
        }
    });

    #proxyIs = new Proxy(this, {
        get(target, name) {
            target.error = false;
            target.typeValue = name;
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
                    throw new TypeError(`INTERFACE: Invalid property name "${name}" in property list { ${Object.keys(target).join(', ')} }`);
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
    };

    #typeProxy = function (receiver) {
        return new Proxy(receiver, {
            get(target, name){
                return target
            },
            isExtensible() {
                return false;
            },
            deleteProperty(target, key) {
                throw new TypeError(`Attempted to delete the type readonly property [${key}]`)
            },
            defineProperty(target, key, descriptor) {
                throw new TypeError(`Attempted to defineProperty the type readonly property [${key}]`)
            }
        })
    };

    #proxyAs = new Proxy(this, {
        get(target, name) {
            target.typeValue = name;
            target.error = target.enabled;
            const handler = new Proxy(()=> name, { apply: target.#apply.bind(target), name });
            Object.defineProperty(handler, 'name',{
                value: name
            });
            return handler;
        },
        set(target, prop, value) {
            if(Checker.structural([value, 'object'])){
                Object.keys(value).forEach((key)=> {
                    if(value[key]!==undefined && value[key]!==null && target.#interfaces[prop][key]) {
                        target.#interfaces[prop][key] = value[key];
                    } else if(!target.#interfaces[prop][key].toLowerCase().includes(`${value[key]}`)) {
                        target.typeValue([value[key], target.#interfaces[prop][key].split(':')[2]])
                    }
                })
            } else {
                target.typeValue = prop;
                target.error = target.enabled;
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
        method4type = Checker.defineMethod(target() || this.typeValue);
        let returned;
        switch (true){
            case Object
                .keys(this.integrate)
                .includes(target() || this.typeValue): returned = this.integrate[target() || this.typeValue](value);
                break;
            case !method4type && !!Checker.multiCheck(value, target() || this.typeValue).length: {
                method4type = 'multiType';
                returned = this.check(value, target() || this.typeValue, method4type);
            }
                break;
            case ['Any', 'any'].includes(target()) || ['Any', 'any'].includes(this.typeValue): {
                method4type = 'any';
                returned = this.check(value, target() || this.typeValue, method4type);
            }
                break;
            case method4type === undefined: returned = this.#lastCheck(target, this.typeValue, value);
                break;
            default:
                returned = this.check(value, target() || this.typeValue, method4type);
        }
        return returned;
    };

    #lastCheck(target, typeValue, value ) {
        let meOut;
        switch (true){
            case !!this.#types[typeValue]: meOut = this.deepCheck(value, typeValue, 'types');
                break;
            case !!this.#enums[typeValue]: meOut =  Object.keys(this.#enums[typeValue]).includes(value) ? value : this.typeError([value, `member of ${typeValue} enum`]);
                break;
            default:
                meOut = this.check(value, target() || `class:${target() || typeValue}`, 'class');
        }
        return meOut;
    }

    #proxySet = new Proxy(this, {
        get(target, name) {
            this.lastType = name;
            return this[name] ? this[name]: new Proxy(()=> 0, { apply: target.#setApply.bind(this) });
        },
        set(target, prop, value) {
            this.variables.forEach((varName, idx)=> {
                if(varName === prop) {
                    target.error = !this.swap;
                    target.check(value, this.types[idx], Checker.defineMethod(this.types[idx]));
                    this[prop] = value;
                }
            });
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
        const handler = new Proxy( ()=> this, {
            apply(getInstance, target, [value]) {
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
                keys.forEach((key)=> {
                    if (!inc.includes(key) && !dec.includes(key)) {
                        this.container[value[key]] = key;
                        this.container[key] = value[key]
                    }
                });
                const self = getInstance();
                self.#enums[handler.prototype.name] = Object.assign({}, this.container);
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
                    default: {
                        handler.prototype = {};
                        handler.prototype.name = name;
                        meOut = handler;
                    }
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
        if(this.error){ return result !== false ? result: this.typeError([arg, $type, result]); }
        else { return result?.name !==this.constructor.name ? result: {}; }
    }

    deepCheck(...params) {
        const [ arg, $type, ruleName ] = params;
        let errors;
        errors = Object.keys(arg).filter((property)=> {
            return !(this.is.function(this.#types[$type][ruleName][property])
                ? Checker.typeChecking.bind(this)(this, [$type, ruleName, property, arg])
                : this.typeError([arg, $type]));
        });
        return !errors.length ? arg: null;
    }

    static typeChecking(self, params){
        const [$type, ruleName, property, arg] = params;
        const result = self.#types[$type][ruleName][property](arg[property]);
        if(!result) {
            self.validationError({ property, value: arg[property], type: $type });
            return false;
        } else return true;
    }

    static alias(params) {
        const [arg, $type] = params;
        let meOut = false;
        switch (true){
            case $type.toLowerCase() === 'argument': meOut = Checker.multiType.bind(this)([arg, 'ArrayObject']);
                break;
            case $type.toLowerCase() === 'iterable': meOut = Checker.multiType.bind(this)([arg, 'iteratorObjectSymbol']);
                break;
            case $type.toLowerCase() === 'generator': meOut = Checker.structural.bind(this)([arg, 'GeneratorFunction']);
                break;
            case $type.toLowerCase() === 'promise': meOut = Checker.class.bind(this)([arg, $type]);
                break;
            case $type.toLowerCase() === 'true': meOut = Checker.primitive.bind(this)([arg, 'boolean']) && arg;
                break;
            case $type.toLowerCase() === 'false': meOut = Checker.primitive.bind(this)([arg, 'boolean']) && !arg;
                break;

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
        try { return !!window?.document } catch(e) { return false }
    }

    static browserFromList(params) {
        const [$type] = params;
        let meOut = Checker.CheckPlatform(params, 'navigator');
        try {
            meOut && (meOut = window?.navigator?.userAgent
                .includes($type.toString().replace(/./, firstLetter => firstLetter.toUpperCase())) && window.navigator);
            return meOut;
        } catch (e) {
            meOut = false;
        }
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
        const error = this.error;
        const type4Checking = Checker.multiCheck.bind(this)(arg, $type);
        const checked =  type4Checking.length ? type4Checking.filter((type)=> this.is[type](arg) !== false): null;
        this.error = error;
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
        Checker.notEmpty([arg]) ||  this.typeValue([arg, $type]);
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
        const standartTypes = primitiveTypes.concat(structuralTypes).concat(otherTypes.map((type)=> type.alias).flat(1));
        if(Checker.nullish([arg])) { meOut = false; }
        else {
            meOut = !$type
                || (arg?.name === $type.split(':')[1] && !Checker.nullish([arg?.name]))
                || (arg?.constructor?.name === $type.split(':')[1] && !Checker.nullish([arg?.constructor?.name]))
                || (arg?.prototype?.constructor?.name === $type.split(':')[1] && arg?.prototype?.constructor?.name !== undefined)
                || (!standartTypes.includes(arg?.constructor?.name) && !Checker.nullish([arg?.constructor?.name]))
                || (!standartTypes.includes(arg?.prototype?.constructor?.name) && arg?.prototype !== undefined)
                || ((Object.getPrototypeOf(arg))?.constructor.name === $type.split(':')[1]
                    && !Checker.nullish([(Object.getPrototypeOf(arg))?.constructor.name]))
                || false;
        }
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
            meOut = `Can\'t handle this type. It's possible you are using system type like [Module] or has an as-is syntax error`;
        }
        return meOut;
    }

    static validationErrorMsg(params){
        const { property, value, type } = params;
        return `The value [${value}] of the property [${property}] fails to pass the [${type}] check`;
    }

}
function JSON5Wrapper() {
    var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/,
        ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/,
        ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/,
        unicode = {Space_Separator: Space_Separator, ID_Start: ID_Start, ID_Continue: ID_Continue}, util = {
            isSpaceSeparator: u => "string" == typeof u && unicode.Space_Separator.test(u),
            isIdStartChar: u => "string" == typeof u && (u >= "a" && u <= "z" || u >= "A" && u <= "Z" || "$" === u || "_" === u || unicode.ID_Start.test(u)),
            isIdContinueChar: u => "string" == typeof u && (u >= "a" && u <= "z" || u >= "A" && u <= "Z" || u >= "0" && u <= "9" || "$" === u || "_" === u || "‌" === u || "‍" === u || unicode.ID_Continue.test(u)),
            isDigit: u => "string" == typeof u && /[0-9]/.test(u),
            isHexDigit: u => "string" == typeof u && /[0-9A-Fa-f]/.test(u)
        };
    let source, parseState, stack, pos, line, column, token, key, root;
    var parse = function (u, D) {
        source = String(u), parseState = "start", stack = [], pos = 0, line = 1, column = 0, token = void 0, key = void 0, root = void 0;
        do {
            token = lex(), parseStates[parseState]()
        } while ("eof" !== token.type);
        return "function" == typeof D ? internalize({"": root}, "", D) : root
    };

    function internalize(u, D, e) {
        const r = u[D];
        if (null != r && "object" == typeof r) if (Array.isArray(r)) for (let u = 0; u < r.length; u++) {
            const D = String(u), t = internalize(r, D, e);
            void 0 === t ? delete r[D] : Object.defineProperty(r, D, {
                value: t,
                writable: !0,
                enumerable: !0,
                configurable: !0
            })
        } else for (const u in r) {
            const D = internalize(r, u, e);
            void 0 === D ? delete r[u] : Object.defineProperty(r, u, {
                value: D,
                writable: !0,
                enumerable: !0,
                configurable: !0
            })
        }
        return e.call(u, D, r)
    }

    let lexState, buffer, doubleQuote, sign, c;

    function lex() {
        for (lexState = "default", buffer = "", doubleQuote = !1, sign = 1; ;) {
            c = peek();
            const u = lexStates[lexState]();
            if (u) return u
        }
    }

    function peek() {
        if (source[pos]) return String.fromCodePoint(source.codePointAt(pos))
    }

    function read() {
        const u = peek();
        return "\n" === u ? (line++, column = 0) : u ? column += u.length : column++, u && (pos += u.length), u
    }

    const lexStates = {
        default() {
            switch (c) {
                case"\t":
                case"\v":
                case"\f":
                case" ":
                case" ":
                case"\ufeff":
                case"\n":
                case"\r":
                case"\u2028":
                case"\u2029":
                    return void read();
                case"/":
                    return read(), void (lexState = "comment");
                case void 0:
                    return read(), newToken("eof")
            }
            if (!util.isSpaceSeparator(c)) return lexStates[parseState]();
            read()
        }, comment() {
            switch (c) {
                case"*":
                    return read(), void (lexState = "multiLineComment");
                case"/":
                    return read(), void (lexState = "singleLineComment")
            }
            throw invalidChar(read())
        }, multiLineComment() {
            switch (c) {
                case"*":
                    return read(), void (lexState = "multiLineCommentAsterisk");
                case void 0:
                    throw invalidChar(read())
            }
            read()
        }, multiLineCommentAsterisk() {
            switch (c) {
                case"*":
                    return void read();
                case"/":
                    return read(), void (lexState = "default");
                case void 0:
                    throw invalidChar(read())
            }
            read(), lexState = "multiLineComment"
        }, singleLineComment() {
            switch (c) {
                case"\n":
                case"\r":
                case"\u2028":
                case"\u2029":
                    return read(), void (lexState = "default");
                case void 0:
                    return read(), newToken("eof")
            }
            read()
        }, value() {
            switch (c) {
                case"{":
                case"[":
                    return newToken("punctuator", read());
                case"n":
                    return read(), literal("ull"), newToken("null", null);
                case"t":
                    return read(), literal("rue"), newToken("boolean", !0);
                case"f":
                    return read(), literal("alse"), newToken("boolean", !1);
                case"-":
                case"+":
                    return "-" === read() && (sign = -1), void (lexState = "sign");
                case".":
                    return buffer = read(), void (lexState = "decimalPointLeading");
                case"0":
                    return buffer = read(), void (lexState = "zero");
                case"1":
                case"2":
                case"3":
                case"4":
                case"5":
                case"6":
                case"7":
                case"8":
                case"9":
                    return buffer = read(), void (lexState = "decimalInteger");
                case"I":
                    return read(), literal("nfinity"), newToken("numeric", 1 / 0);
                case"N":
                    return read(), literal("aN"), newToken("numeric", NaN);
                case'"':
                case"'":
                    return doubleQuote = '"' === read(), buffer = "", void (lexState = "string")
            }
            throw invalidChar(read())
        }, identifierNameStartEscape() {
            if ("u" !== c) throw invalidChar(read());
            read();
            const u = unicodeEscape();
            switch (u) {
                case"$":
                case"_":
                    break;
                default:
                    if (!util.isIdStartChar(u)) throw invalidIdentifier()
            }
            buffer += u, lexState = "identifierName"
        }, identifierName() {
            switch (c) {
                case"$":
                case"_":
                case"‌":
                case"‍":
                    return void (buffer += read());
                case"\\":
                    return read(), void (lexState = "identifierNameEscape")
            }
            if (!util.isIdContinueChar(c)) return newToken("identifier", buffer);
            buffer += read()
        }, identifierNameEscape() {
            if ("u" !== c) throw invalidChar(read());
            read();
            const u = unicodeEscape();
            switch (u) {
                case"$":
                case"_":
                case"‌":
                case"‍":
                    break;
                default:
                    if (!util.isIdContinueChar(u)) throw invalidIdentifier()
            }
            buffer += u, lexState = "identifierName"
        }, sign() {
            switch (c) {
                case".":
                    return buffer = read(), void (lexState = "decimalPointLeading");
                case"0":
                    return buffer = read(), void (lexState = "zero");
                case"1":
                case"2":
                case"3":
                case"4":
                case"5":
                case"6":
                case"7":
                case"8":
                case"9":
                    return buffer = read(), void (lexState = "decimalInteger");
                case"I":
                    return read(), literal("nfinity"), newToken("numeric", sign * (1 / 0));
                case"N":
                    return read(), literal("aN"), newToken("numeric", NaN)
            }
            throw invalidChar(read())
        }, zero() {
            switch (c) {
                case".":
                    return buffer += read(), void (lexState = "decimalPoint");
                case"e":
                case"E":
                    return buffer += read(), void (lexState = "decimalExponent");
                case"x":
                case"X":
                    return buffer += read(), void (lexState = "hexadecimal")
            }
            return newToken("numeric", 0 * sign)
        }, decimalInteger() {
            switch (c) {
                case".":
                    return buffer += read(), void (lexState = "decimalPoint");
                case"e":
                case"E":
                    return buffer += read(), void (lexState = "decimalExponent")
            }
            if (!util.isDigit(c)) return newToken("numeric", sign * Number(buffer));
            buffer += read()
        }, decimalPointLeading() {
            if (util.isDigit(c)) return buffer += read(), void (lexState = "decimalFraction");
            throw invalidChar(read())
        }, decimalPoint() {
            switch (c) {
                case"e":
                case"E":
                    return buffer += read(), void (lexState = "decimalExponent")
            }
            return util.isDigit(c) ? (buffer += read(), void (lexState = "decimalFraction")) : newToken("numeric", sign * Number(buffer))
        }, decimalFraction() {
            switch (c) {
                case"e":
                case"E":
                    return buffer += read(), void (lexState = "decimalExponent")
            }
            if (!util.isDigit(c)) return newToken("numeric", sign * Number(buffer));
            buffer += read()
        }, decimalExponent() {
            switch (c) {
                case"+":
                case"-":
                    return buffer += read(), void (lexState = "decimalExponentSign")
            }
            if (util.isDigit(c)) return buffer += read(), void (lexState = "decimalExponentInteger");
            throw invalidChar(read())
        }, decimalExponentSign() {
            if (util.isDigit(c)) return buffer += read(), void (lexState = "decimalExponentInteger");
            throw invalidChar(read())
        }, decimalExponentInteger() {
            if (!util.isDigit(c)) return newToken("numeric", sign * Number(buffer));
            buffer += read()
        }, hexadecimal() {
            if (util.isHexDigit(c)) return buffer += read(), void (lexState = "hexadecimalInteger");
            throw invalidChar(read())
        }, hexadecimalInteger() {
            if (!util.isHexDigit(c)) return newToken("numeric", sign * Number(buffer));
            buffer += read()
        }, string() {
            switch (c) {
                case"\\":
                    return read(), void (buffer += escape());
                case'"':
                    return doubleQuote ? (read(), newToken("string", buffer)) : void (buffer += read());
                case"'":
                    return doubleQuote ? void (buffer += read()) : (read(), newToken("string", buffer));
                case"\n":
                case"\r":
                    throw invalidChar(read());
                case"\u2028":
                case"\u2029":
                    separatorChar(c);
                    break;
                case void 0:
                    throw invalidChar(read())
            }
            buffer += read()
        }, start() {
            switch (c) {
                case"{":
                case"[":
                    return newToken("punctuator", read())
            }
            lexState = "value"
        }, beforePropertyName() {
            switch (c) {
                case"$":
                case"_":
                    return buffer = read(), void (lexState = "identifierName");
                case"\\":
                    return read(), void (lexState = "identifierNameStartEscape");
                case"}":
                    return newToken("punctuator", read());
                case'"':
                case"'":
                    return doubleQuote = '"' === read(), void (lexState = "string")
            }
            if (util.isIdStartChar(c)) return buffer += read(), void (lexState = "identifierName");
            throw invalidChar(read())
        }, afterPropertyName() {
            if (":" === c) return newToken("punctuator", read());
            throw invalidChar(read())
        }, beforePropertyValue() {
            lexState = "value"
        }, afterPropertyValue() {
            switch (c) {
                case",":
                case"}":
                    return newToken("punctuator", read())
            }
            throw invalidChar(read())
        }, beforeArrayValue() {
            if ("]" === c) return newToken("punctuator", read());
            lexState = "value"
        }, afterArrayValue() {
            switch (c) {
                case",":
                case"]":
                    return newToken("punctuator", read())
            }
            throw invalidChar(read())
        }, end() {
            throw invalidChar(read())
        }
    };

    function newToken(u, D) {
        return {type: u, value: D, line: line, column: column}
    }

    function literal(u) {
        for (const D of u) {
            if (peek() !== D) throw invalidChar(read());
            read()
        }
    }

    function escape() {
        switch (peek()) {
            case"b":
                return read(), "\b";
            case"f":
                return read(), "\f";
            case"n":
                return read(), "\n";
            case"r":
                return read(), "\r";
            case"t":
                return read(), "\t";
            case"v":
                return read(), "\v";
            case"0":
                if (read(), util.isDigit(peek())) throw invalidChar(read());
                return "\0";
            case"x":
                return read(), hexEscape();
            case"u":
                return read(), unicodeEscape();
            case"\n":
            case"\u2028":
            case"\u2029":
                return read(), "";
            case"\r":
                return read(), "\n" === peek() && read(), "";
            case"1":
            case"2":
            case"3":
            case"4":
            case"5":
            case"6":
            case"7":
            case"8":
            case"9":
            case void 0:
                throw invalidChar(read())
        }
        return read()
    }

    function hexEscape() {
        let u = "", D = peek();
        if (!util.isHexDigit(D)) throw invalidChar(read());
        if (u += read(), D = peek(), !util.isHexDigit(D)) throw invalidChar(read());
        return u += read(), String.fromCodePoint(parseInt(u, 16))
    }

    function unicodeEscape() {
        let u = "", D = 4;
        for (; D-- > 0;) {
            const D = peek();
            if (!util.isHexDigit(D)) throw invalidChar(read());
            u += read()
        }
        return String.fromCodePoint(parseInt(u, 16))
    }

    const parseStates = {
        start() {
            if ("eof" === token.type) throw invalidEOF();
            push()
        }, beforePropertyName() {
            switch (token.type) {
                case"identifier":
                case"string":
                    return key = token.value, void (parseState = "afterPropertyName");
                case"punctuator":
                    return void pop();
                case"eof":
                    throw invalidEOF()
            }
        }, afterPropertyName() {
            if ("eof" === token.type) throw invalidEOF();
            parseState = "beforePropertyValue"
        }, beforePropertyValue() {
            if ("eof" === token.type) throw invalidEOF();
            push()
        }, beforeArrayValue() {
            if ("eof" === token.type) throw invalidEOF();
            "punctuator" !== token.type || "]" !== token.value ? push() : pop()
        }, afterPropertyValue() {
            if ("eof" === token.type) throw invalidEOF();
            switch (token.value) {
                case",":
                    return void (parseState = "beforePropertyName");
                case"}":
                    pop()
            }
        }, afterArrayValue() {
            if ("eof" === token.type) throw invalidEOF();
            switch (token.value) {
                case",":
                    return void (parseState = "beforeArrayValue");
                case"]":
                    pop()
            }
        }, end() {
        }
    };

    function push() {
        let u;
        switch (token.type) {
            case"punctuator":
                switch (token.value) {
                    case"{":
                        u = {};
                        break;
                    case"[":
                        u = []
                }
                break;
            case"null":
            case"boolean":
            case"numeric":
            case"string":
                u = token.value
        }
        if (void 0 === root) root = u; else {
            const D = stack[stack.length - 1];
            Array.isArray(D) ? D.push(u) : Object.defineProperty(D, key, {
                value: u,
                writable: !0,
                enumerable: !0,
                configurable: !0
            })
        }
        if (null !== u && "object" == typeof u) stack.push(u), parseState = Array.isArray(u) ? "beforeArrayValue" : "beforePropertyName"; else {
            const u = stack[stack.length - 1];
            parseState = null == u ? "end" : Array.isArray(u) ? "afterArrayValue" : "afterPropertyValue"
        }
    }

    function pop() {
        stack.pop();
        const u = stack[stack.length - 1];
        parseState = null == u ? "end" : Array.isArray(u) ? "afterArrayValue" : "afterPropertyValue"
    }

    function invalidChar(u) {
        return syntaxError(void 0 === u ? `JSON5: invalid end of input at ${line}:${column}` : `JSON5: invalid character '${formatChar(u)}' at ${line}:${column}`)
    }

    function invalidEOF() {
        return syntaxError(`JSON5: invalid end of input at ${line}:${column}`)
    }

    function invalidIdentifier() {
        return syntaxError(`JSON5: invalid identifier character at ${line}:${column -= 5}`)
    }

    function separatorChar(u) {
        console.warn(`JSON5: '${formatChar(u)}' in strings is not valid ECMAScript; consider escaping`)
    }

    function formatChar(u) {
        const D = {
            "'": "\\'",
            '"': '\\"',
            "\\": "\\\\",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\v": "\\v",
            "\0": "\\0",
            "\u2028": "\\u2028",
            "\u2029": "\\u2029"
        };
        if (D[u]) return D[u];
        if (u < " ") {
            const D = u.charCodeAt(0).toString(16);
            return "\\x" + ("00" + D).substring(D.length)
        }
        return u
    }

    function syntaxError(u) {
        const D = new SyntaxError(u);
        return D.lineNumber = line, D.columnNumber = column, D
    }

    var stringify = function (u, D, e) {
        const r = [];
        let t, F, C, a = "", A = "";
        if (null == D || "object" != typeof D || Array.isArray(D) || (e = D.space, C = D.quote, D = D.replacer), "function" == typeof D) F = D; else if (Array.isArray(D)) {
            t = [];
            for (const u of D) {
                let D;
                "string" == typeof u ? D = u : ("number" == typeof u || u instanceof String || u instanceof Number) && (D = String(u)), void 0 !== D && t.indexOf(D) < 0 && t.push(D)
            }
        }
        return e instanceof Number ? e = Number(e) : e instanceof String && (e = String(e)), "number" == typeof e ? e > 0 && (e = Math.min(10, Math.floor(e)), A = "          ".substr(0, e)) : "string" == typeof e && (A = e.substr(0, 10)), n("", {"": u});

        function n(u, D) {
            let e = D[u];
            switch (null != e && ("function" == typeof e.toJSON5 ? e = e.toJSON5(u) : "function" == typeof e.toJSON && (e = e.toJSON(u))), F && (e = F.call(D, u, e)), e instanceof Number ? e = Number(e) : e instanceof String ? e = String(e) : e instanceof Boolean && (e = e.valueOf()), e) {
                case null:
                    return "null";
                case!0:
                    return "true";
                case!1:
                    return "false"
            }
            return "string" == typeof e ? E(e) : "number" == typeof e ? String(e) : "object" == typeof e ? Array.isArray(e) ? function (u) {
                if (r.indexOf(u) >= 0) throw TypeError("Converting circular structure to JSON5");
                r.push(u);
                let D = a;
                a += A;
                let e, t = [];
                for (let D = 0; D < u.length; D++) {
                    const e = n(String(D), u);
                    t.push(void 0 !== e ? e : "null")
                }
                if (0 === t.length) e = "[]"; else if ("" === A) {
                    let u = t.join(",");
                    e = "[" + u + "]"
                } else {
                    let u = ",\n" + a, r = t.join(u);
                    e = "[\n" + a + r + ",\n" + D + "]"
                }
                return r.pop(), a = D, e
            }(e) : function (u) {
                if (r.indexOf(u) >= 0) throw TypeError("Converting circular structure to JSON5");
                r.push(u);
                let D = a;
                a += A;
                let e, F = t || Object.keys(u), C = [];
                for (const D of F) {
                    const e = n(D, u);
                    if (void 0 !== e) {
                        let u = i(D) + ":";
                        "" !== A && (u += " "), u += e, C.push(u)
                    }
                }
                if (0 === C.length) e = "{}"; else {
                    let u;
                    if ("" === A) u = C.join(","), e = "{" + u + "}"; else {
                        let r = ",\n" + a;
                        u = C.join(r), e = "{\n" + a + u + ",\n" + D + "}"
                    }
                }
                return r.pop(), a = D, e
            }(e) : void 0
        }

        function E(u) {
            const D = {"'": .1, '"': .2}, e = {
                "'": "\\'",
                '"': '\\"',
                "\\": "\\\\",
                "\b": "\\b",
                "\f": "\\f",
                "\n": "\\n",
                "\r": "\\r",
                "\t": "\\t",
                "\v": "\\v",
                "\0": "\\0",
                "\u2028": "\\u2028",
                "\u2029": "\\u2029"
            };
            let r = "";
            for (let t = 0; t < u.length; t++) {
                const F = u[t];
                switch (F) {
                    case"'":
                    case'"':
                        D[F]++, r += F;
                        continue;
                    case"\0":
                        if (util.isDigit(u[t + 1])) {
                            r += "\\x00";
                            continue
                        }
                }
                if (e[F]) r += e[F]; else if (F < " ") {
                    let u = F.charCodeAt(0).toString(16);
                    r += "\\x" + ("00" + u).substring(u.length)
                } else r += F
            }
            const t = C || Object.keys(D).reduce((u, e) => D[u] < D[e] ? u : e);
            return t + (r = r.replace(new RegExp(t, "g"), e[t])) + t
        }

        function i(u) {
            if (0 === u.length) return E(u);
            const D = String.fromCodePoint(u.codePointAt(0));
            if (!util.isIdStartChar(D)) return E(u);
            for (let e = D.length; e < u.length; e++) if (!util.isIdContinueChar(String.fromCodePoint(u.codePointAt(e)))) return E(u);
            return u
        }
    };
    const JSON5 = {
        parse,
        stringify,
    };

    var lib = JSON5;
    return lib;
}
class MicroTest {

    START = new Proxy(this, {
        get(target, name) {
            target.info.time(name);
            target.info.info(`${name} ->`);
            return `/${name}/`;
        }
    });

    STOP = new Proxy(this, {
        get(target, name) {
            target.info.timeEnd(name);
            return {};
        }
    });

    FINISH = new Proxy(this, {
        get(target, name) {
            target.info.timeEnd(name);
            console.info(`\u2713 PASSED tests: ${target.passedTest} \u2713`);
            if(target.filedTest) {
                console.error(`\u2717 FAILED tests: ${target.filedTest} \u2717`);
                throw (new Error(`FAILED tests: ${target.filedTest}`)).message;
            }
        }
    });

    METHOD = new Proxy(this, {
        get(target, name) {
            return (arg)=>{
                target.is.classObject(arg) && arg.hasOwnProperty(name) && target.is.function(arg[name])
                    ? target.passed.METHOD(name)
                    : target.failed.METHOD(name)
            };
        }
    });

    PROPERTY = new Proxy(this, {
        get(target, name) {
            return (arg)=> {
                arg.hasOwnProperty(name) && target.is.objectClass(arg)
                    ? target.passed.PROPERTY(name)
                    : target.failed.PROPERTY(name)
            };
        }
    });

    IS = new Proxy(this, {
        get(target, name) {
            return (arg)=> {
                target.is[name](arg)
                    ? target.passed.IS(name)
                    : target.failed.IS(name)
            };
        }
    });

    CHECK = new Proxy(this, {
        get(target, name) {
            return (arg)=> {
                target.is.true(arg)
                    ? target.passed[name.toUpperCase()]('ok')
                    : target.failed[name.toUpperCase()]('fail')
            };
        }
    });

    passed = new Proxy(this, {
        get(target, name) {
            target.passedTest++;
            return (arg)=> target.info.log(` \u2713 ${name}.${arg} `);
        }
    });

    failed = new Proxy(this, {
        get(target, name) {
            target.filedTest++;
            const { stack } = new Error();
            const stackArray = stack.split('\n')
                ? stack.split('\n')
                : stack.split('@');
            const idx = stackArray[target.stackIdx].includes('eval')
                ? target.stackIdx-1
                : target.stackIdx;
            return (arg)=> target.info.error(
                ` \u2717 ${name}.${arg} -> ${(stackArray[idx] || stackArray[idx-1]).replace('\n','').replace('module code@', '').replace('    at','')}`
            );
        }
    });

    filedTest = 0;
    passedTest = 0;
    stackIdx = 3;
    constructor( options = { silentMode: false, is, as }) {
        const { silentMode, is, as } = options;
        this.is = is;
        this.as = as;
        is.boolean(silentMode) && silentMode
            ? this.info = { log: ()=> {}, time: ()=> {}, timeEnd:()=> {}, error:()=> {} }
            : this.info = console;
    }

    static getName(error){
        const { stack } = error;
        return stack.match(/^.*(?=@)/)
            ? stack.match(/^.*(?=@)/)[0]
            : stack.match(/at (.*?) /)[1];
    }
}
class Utility {

    type(arg) {
        const primitive = primitiveTypes.filter((type) => Checker.primitive([arg, type]));
        const structural = structuralTypes.filter((type) => Checker.structural([arg, type]));
        const other = arg
            ? otherTypes.filter((type) => {
                type === 'class'
                    ? Checker[type.method4type]([arg, type])
                    : Checker[type.method4type]([arg, type.method4type]);
            })
            : [];
        const type = [...primitive, ...structural, ...other].filter((item) => item)[0];

        let meOut;
        if (type === 'Function' && arg.prototype?.constructor?.name) {
            meOut = arg.prototype.constructor.name;
        } else if (type === undefined && arg?.constructor?.name) {
            meOut = arg.constructor.name;
        } else {
            meOut = type;
        }
        return meOut;
    }
    constructor() {
        const macro = Symbol();
        Array.prototype[macro] = {};
        Array.prototype?.macro || Object.defineProperty(Array.prototype, 'macro', {
            get: function () {
                let meOut = [];
                this.map((command)=> {
                    switch (true){
                        case typeof command === 'function':{
                            try {
                                command.apply(this, arguments);
                                } catch (_) {
                                    const macroID = command.toString().split('=>')[1].replaceAll(' ','');
                                    if(typeof Array.prototype[macro][macroID] === 'function') {
                                        meOut.push(Array.prototype[macro][macroID]());
                                    } else throw new SyntaxError(`[${macroID}].macro isn't defined`);
                                }
                            }
                            break;
                        case typeof Array.prototype[macro][command.toString()]=== 'function': meOut
                            .push(Array.prototype[macro][command.toString()]());
                            break;
                        case typeof command === 'object': Object
                            .keys(command)
                            .forEach((macroObject)=> Array.prototype[macro][macroObject] = command[macroObject]);
                            break;

                    }
                });
                return meOut;
            }
        });
        this.macros = ()=> Object.keys(Array.prototype[macro]);
    };
}
const aliasTypes = [{alias:['Argument','argument','Iterable','iterable','generator'],method4type:'alias'},{alias:['True','true','false','False'],method4type:'alias'}];
const otherTypes = [{alias:['Empty','empty'],method4type:'empty'},{alias:['NotEmpty','notEmpty','notempty'],method4type:'notEmpty'},{alias:['Date','date'],method4type:'date'},{alias:['Null','null'],method4type:'null'},{alias:['Class','class'],method4type:'class'},{alias:['JSON','json','Json'],method4type:'json'},{alias:['JSON5','json5','Json5'],method4type:'json5'},{alias:['Browser','browser'],method4type:'browser'},{alias:['Node','node','NodeJS','nodejs'],method4type:'node'},{alias:['Bun','bun'],method4type:'bun'},{alias:['Nullish','nullish'],method4type:'nullish'},{alias:['Iterator','iterator'],method4type:'iterator'},{alias:['Chrome','chrome','Safari','safari','Firefox','firefox','Opera','opera','Edg','edg','Samsung','samsung'],method4type:'browserFromList'}];
const primitiveTypes = ['Number','String','Boolean','Symbol','Function','BigInt','Undefined'];
const structuralTypes = ['Array','TypedArray','Date','Object','Set','Map','WeakSet','WeakMap','WeakRef','RegExp','Promise','Error','RangeError','ReferenceError','SyntaxError','TypeError','Enum','Buffer','SharedArrayBuffer'];
Object.assign(window, { BaseInterface, Checker, JSON5Wrapper, MicroTest, Utility, aliasTypes, otherTypes, primitiveTypes, structuralTypes })
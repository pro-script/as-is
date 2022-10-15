import primitiveTypes from "../types/primitiveTypes.mjs";
import structuralTypes from "../types/structuralTypes.mjs";
import otherTypes from "../types/otherTypes.mjs";
import { Checker } from './Checker.mjs';

export default class Utility {

    type(arg) {
        const primitive = primitiveTypes.filter((type)=> Checker.primitive([arg, type]))
        const structural = structuralTypes.filter((type)=> Checker.structural([arg, type]))
        const other = arg ?
            otherTypes.filter((type)=> {
                type === 'class'
                    ? Checker[type.method4type]([arg, type])
                    : Checker[type.method4type]([arg, type.method4type])
            })
            :[];
        const type = [...primitive, ...structural, ...other].filter((item)=> item)[0];

        let meOut;
        if(type === 'Function' && arg.prototype?.constructor?.name)
            meOut = arg.prototype.constructor.name;
        else if(type === undefined && arg?.constructor?.name)
            meOut =  arg.constructor.name;
        else
            meOut = type;
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
                                    if(typeof Array.prototype[macro][macroID] === 'function') meOut.push(Array.prototype[macro][macroID]())
                                    else throw new SyntaxError(`[${macroID}].macro isn't defined`);
                                }
                            }
                            break;
                        case typeof Array.prototype[macro][command.toString()]=== 'function': meOut
                            .push(Array.prototype[macro][command.toString()]());
                            break;
                        case typeof command === 'object': Object
                            .keys(command)
                            .forEach((macroObject)=> Array.prototype[macro][macroObject] = command[macroObject])
                            break;

                    }
                })
                return meOut;
            }
        });
        this.macros = ()=> Object.keys(Array.prototype[macro]);
    }

}

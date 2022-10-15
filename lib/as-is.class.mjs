import BaseInterface from './classes/BaseInterface.mjs';
import MicroTest from './classes/MicroTest.mjs';
import { Checker, primitiveTypes, structuralTypes, otherTypes, aliasTypes, Utility, JSON5wrapper } from './classes/Checker.mjs';

try { !!window } catch (e){ structuralTypes.push('Buffer'); structuralTypes.push('SharedArrayBuffer') }

export { Checker, BaseInterface, MicroTest, primitiveTypes, structuralTypes, otherTypes, aliasTypes, Utility,
    JSON5wrapper };

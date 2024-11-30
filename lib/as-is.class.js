import BaseInterface from './classes/BaseInterface.js';
import MicroTest from './classes/MicroTest.js';
import { Checker, primitiveTypes, structuralTypes, otherTypes, aliasTypes, Utility, JSON5Wrapper } from './classes/Checker.js';
try { !!window } catch (e){ structuralTypes.push('Buffer'); structuralTypes.push('SharedArrayBuffer') }

export { Checker, BaseInterface, MicroTest, primitiveTypes, structuralTypes, otherTypes, aliasTypes, Utility,
    JSON5Wrapper };
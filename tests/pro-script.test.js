import { date_, generator_, structural_, withLengthEmpty, withLengthNotEmpty } from './values.js';

let filePath, env;
try { env = process?.env?.NODE_ENV } catch (e){ env = 'esm' }

switch(env){
    // case 'esm': filePath = '../dist/as-is.esm.mjs';
    case 'esm': filePath = '../index.js';
        break;
    case 'browser': filePath = '../dist/as-is.browser.js';
        break;
    default:
        filePath = '../index.js';
}
const modules = await import(filePath);
import MacroInitialization from './macro.js';
import MacroInstance from './macroTests/instance.macro.test.js';
import MacroValues from './macroTests/values.macro.test.js';

const { Checker, BaseInterface, MicroTest, Utility, primitiveTypes, structuralTypes,
    otherTypes, aliasTypes } =  modules?.Checker ? modules: window;
const checker = new Checker({ 'IF/ELSE/END': true, strict: true, Enum: true, utility: true });
const { multi, Interface, as, is, IF, ELSE, END, optional, get, macro, strict, Enum }  = checker;
const { START, STOP, FINISH, METHOD, PROPERTY, IS, CHECK, passed, failed } = new MicroTest({ is, as });
import * as values_ from './values.js';
const values = Object.assign({}, values_);

const types = [...primitiveTypes,...structuralTypes,...otherTypes.map(_=>_.alias),...aliasTypes.map(_=>_.alias)];

const examples = [...values.primitive_, ...values.structural_];

const enumExample = Enum.init({
    [Enum.step]: 1,
    Monday: 1,
    Tuesday: Enum.inc,
    Wednesday: Enum.dec,
    Thursday: Enum.inc,
    Friday: Enum.dec,
    Saturday: 'day off',
    Sunday: 'super day off'
});

is.node() && (
    values.buffer_ = new Buffer.alloc(5),
    values.structural_.push(values.buffer_)
);

let { IUser } = Interface({
    IUser: {
        name: as.string,
        birthDate: as.date,
        prop: multi`nullStringNumberUndefined`
    }
});

console.log(get.type());

START.all
{
    START.macro
    {
        [MacroInitialization].macro;
        const results = [
            _ => this.is.a.first.macro,
            /this.is.a.second macro/,
            'this is a third macro',
            0xDad
        ].macro;
        IS.array(results);
        CHECK.RESULTS0(results[0] === 'macro value');
        CHECK.RESULTS1(results[1] === 2);
    }
    STOP.macro
    START.macros
    {
        IS.array(get.macros());
    }
    STOP.macros
    START.Instance
    {
        [MacroInstance].macro;
        [
            'check.constructor',
            'check.class',
            'check.methods'
        ].macro;
        PROPERTY.get(checker);
    }
    STOP.Instance
    START.getType
    {
        CHECK['get.type'](!!get.type())
        values.primitive_.forEach((type) => CHECK[get.type(type)](!!get.type(type)));
        values.structural_.forEach((type) => CHECK[get.type(type)](!!get.type(type)));
    }
    STOP.getType
    START.CheckMethods
    {
        ['alias', 'CheckPlatform', 'iterator', 'nullish', 'bun', 'browser', 'browserFromList', 'node', 'any',
            'multiCheck', 'multiType', 'defineMethod', 'duplicateError', 'numerous', 'primitive', 'array', 'json',
            'json5', 'empty', 'notEmpty', 'date', 'null', 'structural', 'class']
            .forEach((methodName) => METHOD[methodName](Checker));
        IS.class(BaseInterface);
    }
    STOP.CheckMethods
    START.CheckValues
    {    [MacroValues].macro;
        [_ => check.values].macro;
    }
    STOP.CheckValues
    START.newValidatorsPositive
    {
        if (is.node() || is.bun()) {
            IS.undefined(values.iterable.forEach((item) => CHECK.iterable(is.iterable(item))))
            IS.object(is.argument(values.object_) && as.argument(values.object_))
            IS.array(is.argument(values.array_) && as.argument(values.array_))
            IS.undefined(is.nullish() && as.nullish())
            IS.process(is.node() && as.node())
        } else if (is.browser()) {
            IS.undefined(values.iterable.forEach((item) => CHECK.iterable(is.iterable(item))))
            IS.object(is.argument(values.object_) && as.argument(values.object_))
            IS.array(is.argument(values.array_) && as.argument(values.array_))
            IS.undefined(is.nullish() && as.nullish())
            IS.Navigator(is.browser() && as.browser())
        }
    }
    STOP.newValidatorsPositive
    START.newValidatorsNegative
    {
        if (is.node() || is.bun()) {
            values.iterable.forEach((item) => CHECK[`not iterable`](!is.iterable(0)));
            CHECK['not argument'](!is.argument(values.error_));
            try {
                as.argument(values.error_)
            } catch (e) {
                CHECK[`as.argument(values.error_) throw an error`](true);
            }
            CHECK['not nullish'](!is.nullish(values.error_));
            try {
                as.nullish(values.error_)
            } catch (e) {
                CHECK[`as.nullish(values.error_) throw an error`](true);
            }
            CHECK['not browser'](!is.browser());
            try {
                as.browser()
            } catch (e) {
                CHECK[`as.browser() throw an error`](true);
            }

        } else if (is.browser()) {
            values.iterable.forEach((item) => CHECK[`not iterable`](!is.iterable(0)));
            CHECK['not argument'](!is.argument(values.error_));
            try {
                as.argument(values.error_)
            } catch (e) {
                CHECK[`as.generator(values.error_) throw an error`](true);
            }
            CHECK['not nullish'](!is.nullish(values.error_));
            try {
                as.nullish(values.error_)
            } catch (e) {
                CHECK[`as.nullish(values.error_) throw an error`](true);
            }
            CHECK['not node'](!is.node());
            try {
                as.node()
            } catch (e) {
                CHECK[`as.node() throw an error`](true);
            }
        }
    }
    STOP.newValidatorsNegative
    START.if_else
    {
        function someFunction(name, age, friends,
                              _ = [as.stringNumberArray(name),
                                  as.undefinedNumberArray(age),
                                  as.undefinedArray(friends)
                              ]) {
            IF.string(name) && is.number(age) && is.array(friends) ? (
                as.array(_) && as.notEmpty(_) && as.true(_.length == 3)
            ) : ELSE.string(name) && is.array(age) ? (
                friends = age,
                    age = undefined
            ) : ELSE.number(name) && is.array(age) ? (
                friends = age,
                    age = name,
                    name = undefined
            ) : ELSE.array(name) ? (
                friends = name,
                    name = undefined
            ) : END;
            return {name, age, friends};
        };
        let {name, age, friends} = someFunction('Rick', 25, ['Mike', 'Liza']);
        CHECK[`name === 'Rick'`](name === 'Rick');
        CHECK['age === 25'](age === 25);
        CHECK[`friends.includes('Mike')`](friends.includes('Mike'));
        CHECK[`friends.includes('Liza')`](friends.includes('Liza'));
        ({name, age, friends} = someFunction('Rick', ['Mike', 'Liza']))
        CHECK[`name === 'Rick'`](name === 'Rick');
        CHECK['is.undefined(age)'](is.undefined(age));
        CHECK[`friends.includes('Mike')`](friends.includes('Mike'));
        CHECK[`friends.includes('Liza')`](friends.includes('Liza'));
        ({name, age, friends} = someFunction(25, ['Mike', 'Liza']))
        CHECK['is.undefined(name)'](is.undefined(name));
        CHECK['age === 25'](age === 25);
        CHECK[`friends.includes('Mike')`](friends.includes('Mike'));
        CHECK[`friends.includes('Liza')`](friends.includes('Liza'));
        ({name, age, friends} = someFunction(['Mike', 'Liza']))
        CHECK['is.undefined(name)'](is.undefined(name));
        CHECK['is.undefined(age)'](is.undefined(age));
        CHECK[`friends.includes('Mike')`](friends.includes('Mike'));
        CHECK[`friends.includes('Liza')`](friends.includes('Liza'));
    }
    STOP.if_else;
    START.primitivesPositive
    {
        values.primitive_.forEach((type) => {
            as[get.type(type)](type);
            CHECK[get.type(type)](!!get.type(type));
        });
    }
    STOP.primitivesPositive
    START.structuralPositive
    {
        values.structural_.forEach((type) => {
            as[get.type(type)](type);
            CHECK[get.type(type)](!!get.type(type));
        });
    }
    STOP.structuralPositive
    START.primitivesNegative
    {
        values.primitive_.forEach((type) => {
            CHECK[`it's not a(an) ${get.type(type)}`](!is[get.type(type)]({}));
            try {
                as[get.type(type)]({})
            } catch (e) {
                CHECK[`as.${get.type(type)}({}) throw an error`](true);
            }
        });
    }
    STOP.primitivesNegative
    START.structuralNegative
    {
        values.structural_.forEach((type) => {
            CHECK[`it's not a(an) ${get.type(type)}`](!is[get.type(type)](0));
            try {
                as[get.type(type)](0)
            } catch (e) {
                CHECK[`as.${get.type(type)}(0) throw an error`](true);
            }
        });
    }
    STOP.structuralNegative
    START.aliasPositive
    {
        CHECK.optional(!optional.string());
        CHECK.optionalFalse(optional.Boolean(false));
        CHECK.generator(is.generator(values.generator_));
    }
    STOP.aliasPositive
    START.aliasNegative
    {
        CHECK[`not a generator`](!is.generator(values.string_));
        try {
            as.generator(0)
        } catch (e) {
            CHECK[`as.generator(0) throw an error`](true);
        }
    }
    STOP.aliasNegative
    START.otherTypesPositive
    {
        values.withLengthEmpty.forEach((type) => {
            as.empty(type);
            CHECK[`empty ${get.type(type)}`](is.empty(type));
        });
        values.withLengthNotEmpty.forEach((type) => {
            as.notEmpty(type);
            CHECK[`notEmpty ${get.type(type)}`](is.notEmpty(type));
        });
        IS.date(values.date_);
        as.date(values.date_);
        IS.null(values.null_);
        as.null(values.null_);
        IS.json(values.json_);
        as.json(values.json_);
        IS.json5(values.json5_);
        as.json5(values.json5_);
        IS.class(Checker);
        as.class(Checker);
    }
    STOP.otherTypesPositive
    START.otherTypesNegative
    {
        values.withLengthNotEmpty.forEach((type) => {
            try {
                as.empty(type)
            } catch (e) {
                CHECK[`as.empty(${type}) throw an error`](true);
            }
            CHECK[`empty ${get.type(type)}`](!is.empty(type));
        });
        values.withLengthEmpty.forEach((type) => {
            try {
                as.notEmpty(type)
            } catch (e) {
                CHECK[`as.notEmpty(${type}) throw an error`](true);
            }
            CHECK[`notEmpty ${get.type(type)}`](!is.notEmpty(type));
        });
        try {
            as.date({})
        } catch (e) {
            CHECK[`as.date(${{}}) throw an error`](true);
        }
        CHECK[`not is.date${{}}`](!is.date({}));
        try {
            as.null({})
        } catch (e) {
            CHECK[`as.null(${{}}) throw an error`](true);
        }
        CHECK[`not is.json${{}}`](!is.json({}));
        try {
            as.json({})
        } catch (e) {
            CHECK[`as.json(${{}}) throw an error`](true);
        }
        CHECK[`not is.json${{}}`](!is.json({}));
        try {
            as.json5({})
        } catch (e) {
            CHECK[`as.json5(${{}}) throw an error`](true);
        }
        CHECK[`not is.json5${{}}`](!is.json5({}));
        try {
            as.class({})
        } catch (e) {
            CHECK[`as.class(${{}}) throw an error`](true);
        }
        CHECK[`not is.class${{}}`](!is.class({}));
    }
    STOP.otherTypesNegative
    START.numerousTypePositive
    {
        values.primitiveTypes.forEach((type) => values.primitive_.forEach((value) => {
            if (type === get.type(value)) {
                CHECK[`in object is.${type}s()`](is[`${type}s`]({prop1: value, prop2: value}));
                CHECK[`in array is.${type}s()`](is[`${type}s`]([value, value, value]));
                CHECK[`in set is.${type}s()`](is[`${type}s`](new Set([value, value, value])));
                const mapValues = new Map();
                mapValues.set('1', value);
                mapValues.set('2', value);
                mapValues.set('3', value);
                CHECK[`in map is.${type}s()`](is[`${type}s`](mapValues));
            }
        }));
    }
    STOP.numerousTypePositive
    START.numerousTypeNegative;
        values.primitiveTypes.forEach((type)=> values.primitive_.forEach((value)=> {
            if(type === get.type(value)){
                try {
                    CHECK[`not in object is.${type}s()`](!is[`${type}s`]({prop1: [], prop2: []}));
                    CHECK[`not in array is.${type}s()`](!is[`${type}s`]([[], [], []]));
                    CHECK[`not in set is.${type}s()`](!is[`${type}s`](new Set([{}, {}, {}])));
                    CHECK[`not in map is.${type}s()`](!is[`${type}s`]({}));
                } catch (e) {
                    CHECK[`in object, array, set, map throw an error`](true);
                }
            }
        }));
    STOP.numerousTypeNegative;
    START.multiTypePositive
    {
        examples.forEach((value)=> IS[types.join('').replaceAll(',','')](value));
    }
    STOP.multiTypePositive
    START.multiTypeNegative
    {
        const primitives = primitiveTypes.join('').replaceAll(',','');
        const structurals = structuralTypes.join('').replaceAll(',','');
        const otherTypesCollection = otherTypes.map(_=>_.alias);
        const aliasTypesCollection = aliasTypes.map(_=>_.alias);
        try {
            as[primitives]({});
        } catch (e) {
            CHECK[`as.${primitives}({}) throw an error`](true);
        }
        try {
            as[structurals](0);
        } catch (e) {
            CHECK[`as.${structurals}(${0}) throw an error`](true);
        }
        try {
            as[otherTypesCollection](0);
        } catch (e) {
            CHECK[`as.${otherTypesCollection}(${0}) throw an error`](true);
        }
        try {
            as[aliasTypesCollection](0);
        } catch (e) {
            CHECK[`as.${aliasTypesCollection}(${0}) throw an error`](true);
        }
    }
    STOP.multiTypeNegative
    START.EnumPositive
    {
        IS.Enum(enumExample);
    }
    STOP.EnumPositive
    START.EnumNegative
    {
        try {
            as.Enum({})
        } catch (e) {
            CHECK[`as.Enum(${{}}) throw an error`](true);
        }
    }
    STOP.EnumNegative
    START.InterfacePositive
    {
        IS.object(IUser = { name: 'string', birthDate: new Date()});
        IS.object(as.IUser = { name: 'string', birthDate: new Date()});
        IS.object(as.IUser = { name: 'string', birthDate: new Date(), prop: undefined});
        IS.object(as.IUser = { name: 'string', birthDate: new Date(), prop: null});
    }
    STOP.InterfacePositive
    START.InterfaceNegative
    {
        try {
            as.IUser = { name: 0, birthDate: new Date()}
        } catch (e) {
            CHECK[`as.IUser(${{}}) throw an error`](true);
        }
    }
    STOP.InterfaceNegative
} FINISH.all;

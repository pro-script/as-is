Check your types at runtime with ESNext syntax by meta programing in node.js and browser with interfaces, strict object, enum type and more.
Follow me on twitter for further updates [twitter](https://twitter.com/VolodymyrKotov)
All code covered by 282 tests in node js and 233 in browser. 
Tested in **node js, bun.js, Chrome, Safary, FireFox**

1. [The principle of readable code](#the-principle-of-readable-code)
2. [The main idea is to use proxies instead of functions](#the-main-idea-is-to-use-proxies-instead-of-functions)
3. [Summary of Features](#summary-of-features)
4. [Install](#install)
5. [API](#api)
    - [Basics](#basics)
    - [Basic Usage](#basic-usage)
      - [String](#istring--asstring)
      - [Number](#isnumber--asnumber)
      - ...(work in process)
    - [Checking one repeated type](#checking-one-repeated-type)
    - [Checking multiple types](#checking-multiple-types)
        - [Multiple Basic](#multiple-basic)
        - [Multiple Basic usage](#multiple-basic-usage)
    - [Interfaces](#interfaces)
        - [Interfaces Basic](#interfaces-basic)
        - [Interfaces Basic usage](#interfaces-basic-usage)
    - [IF/ELSE/END](#ifelseend)
        - [IF/ELSE/END Basic usage](#ifelseend-basic-usage)
    - [Utility](#utility)
    - [Aliases](#aliases)
6. [Enum type](#enum-type)
    - [Enum type Basic](#enum-type-basic)
    - [Enum type Basic usage](#enum-type-basic-usage)
7. [Integration](#integration)
8. [Settings](#settings)
9. [Micro-tests](#micro-tests)
   - [Micro-tests Basic](#micro-tests-basic)
   - [METHOD usage](#method-usage)
   - [PROPERTY usage](#property-usage)
   - [IS usage](#is-usage)
   - [passed and failed usage](#passed-and-failed-usage)
    

## The principle of readable code
This library respects the principle of the code readability. The code should tell a story. See [details](https://github.com/pro-script/The-concept#the-principle-of-readable-code)

    I.want.to.tell.you.a.story(myStory)

[<- go back](#please-read-the-pro-script-concept-first)

## The main idea is to use proxies instead of functions
In traditional way we are using functions to do the call
```javascript
as(type, value) 
// or 
is(type, value);
```
But that means you have to use a quoted string when you need to make a call
```javascript
is('string', stringVariable);
```
In the ECMAscript specification, object.property is always a string like this object['property']. So why we can't use this a great standard feature to reduce quotas?
We can use this feature and make our calls without quotas like as.string(value). But for this functionality, we need to implement specific methods in an object or class.
```javascript
const is = {
    string: (value)=> {
        return typeof value === 'string'
    },
    number: ...,
    boolean:...,
    ...,
    etc
}
```
And it will be a lot of methods with almost the same functionality that we will need to refactor so as not to violate the DRY rule.
Or we can use ESNext proxies and metaprogramming to do it in a simple way with lots of cool features inside. Like this
```javascript
as.string(value) ;

//or 

is.string(value);
```
But remember that this is the same function call is(type, value) and you can always create an alias if you need to use it like in old days.
```javascript
function is(type, value) {
    return is[type](value)
};

function as(type, value) {
    return as[type](value)
};
// and after that to use it like a function call
is('number', 33) // instead of is.number(33)
```
So, if the property name in the is/as calls is a string variable, you can do cool things. If you implement two methods for checking strings and numbers as an example, you can do it like this.
```javascript
is.string_or_number(variable);
// inside the "is" method
...(type, varibale) {
    if('string_or_number'.includes('string')) {
        stringChecking(value);
    };
    
    if(type.includes('number')) {
        numberChecking(value);
    } 
}
```
That's huge flexibility. You can write any text that includes "string" or "number" to make your code more readable.
```javascript

is.doctor_prescription_a_string_variable(prescription);                     // this is a working example
const sum_first_plus_second = as.first_number(2) + as.second_number(3);     // this is a working example
// sum_first_plus_second -> 5
```
And, of course, the is.doctor_prescription a_string method is not implemented, because doctor_prescription_a_string_variable is just an unquoted string variable.

[<- go back](#please-read-the-pro-script-concept-first)
# Summary of Features 
**Types list with alias name:** 
- Number | number 
- String | string
- Boolean | boolean
- Symbol  | symbol
- Function | function
- BigInt | bigInt | bigint
- Array | array
- **TypedArray | typedArray | Typedarray | typedarray**
- **Buffer | buffer**
- **SharedArrayBuffer | sharedArrayBuffer | SharedarrayBuffer | sharedsrrayBuffer | sharedsrraybuffer**
- Date | date
- Object | date
- Class | class
- instance
- Enum | enum
- Set | set
- Map | map
- **Iterator | iterator**
- **Nullish | nullish**
- WeakSet | weakSet | weeakset
- WeakMap | wearMap | weakmap 
- WeakRef | weakRef | weakref
- RegExp | regExp | regexp
- Promise | promise
- Error | error
- RangeError | rangeError
- ReferenceError | referenceError
- SyntaxError |syntaxError
- TypeError | typeError
- Any | any


**Multi type checking:**
- String | Number | Boolean | etc ... 

**IF/ELSE/END for type checking**

        IF.number(string_)? (
            console.log('IF type checking')
        ):ELSE.string(string_)? (
            console.log('ELSE type checking'),
            expect(string_).to.be.eq(string_)
        ):END;

**Strict type object:**
    
     strict.string`name`
     strict.name = 'string'
    // or
    strict.string`name`.name = 'string'
**Validators list:** 
- NotEmpty | notEmpty
- Empty | empty
- JSON | Json | json
- JSON5 | Json5 | json
- **NodeJS | Node | nodejs | node | Bun | bun**
- **Browser | browser| Chrome | chrome | Safari | safari | Firefox | firefox | Opera | opera | Edg | edg | Samsung | samsung**
- **Argument | argument**
- **Generator | generator**

**Class checking:** 
- [className]
- [classInstance]
```    
is.date(Date);
is.date(new Date);
is.class(Date) or is.class(new Date)
```
**Interface**
```js
const { IUser } = Interface({
            IUser: {
                name: as.string,
                age: as.number,
                birthDate: as.date
            }
});
as.IUser = { name: 'Jesus', age: 2022, birthDate: 'Sat Apr 7 0:0:0 GMT+0200 (Central European Summer Time)'};

function example(name, age,  _ = as.IUser = { name, age }) {
            console.log(name, age);
            return 'returned string';
        }

as.StringNumber(example({ name: 'text', age: 12, pages:['page'] }));
```

**Integrations:**

    import {default as email} from 'validator/lib/isEmail';
    
    is.email('foo@bar.com'); // true | false
    as.email('foo@bar.com'); // foo@bar.com | TypeError

**Utility**

    get.type(Promise); // Promise
    get.type(43); // Number

## Install
**Node.js**
```sh
npm i @pro-script/as-is
```
**Browsers**
```html
<script type="text/javascript" src="https://unpkg.com/@pro-script/as-is@latest/dist/as-is.browser.js"></script>
// or es module
<script type="module" src="https://unpkg.com/@pro-script/as-is@latest/dist/as-is.esm.mjs"></script>

```
**Node JS**
```javascript
import { Checker, BaseInterface, MicroTest, Utility } from '@pro-script/as-is';
//or
const { Checker, BaseInterface, MicroTest, Utility } = require('@pro-script/as-is');
```
[<- go back](#please-read-the-pro-script-concept-first)
# API
**as-is** is a stateful module please keep this in mind.

[<- go back](#please-read-the-pro-script-concept-first)
## Basics
```js
is['js type here']('argument here') // true | false
as['js type here']('argument here') // argument | TypeError
optional['js type here' + 'Undefined' + 'Null']('argument here') // argument | TypeError
```
An example
```js
import { Checker, BaseInterface, MicroTest, Utility } from '@pro-script/as-is';
const { multi, Interface, as, is, IF, ELSE, END, optional, get, macro, strict, Enum } = new Checker({ 
   'IF/ELSE/END': true, strict: true, Enum: true, utility: true
});


//positive
is.string('example string'); // true
as.string('example string'); // example string
optional.string() // undefined
optional.string('example string') // example string

//negative
is.number('example string'); // false
as.number('example string'); // TypeError: String is not a(an) number
optional.number('example string'); // TypeError: String is not a(an) number
```
[<- go back](#please-read-the-pro-script-concept-first)
## Basic Usage
```js
import { Checker, BaseInterface, MicroTest, Utility } from '@pro-script/as-is';
const { multi, Interface, as, is, IF, ELSE, END, optional, get, macro, strict, Enum }  = new Checker({
   'IF/ELSE/END': true, strict: true, Enum: true, utility: true
});

function example(arg, arg2, arg3) {
    as.string(arg);
    as.number(arg2);
    as.boolean(arg3);

    console.log(arg, arg2, arg3);
};
example(text, 2, true)
// text, 2, true 

let result, one = 1, two = 2;
as.number(
    result = as.number(one) + as.number(two)
)
console.log(result);
// 3

```
or next syntax
```js 
import { Checker, BaseInterface, MicroTest, Utility } from '@pro-script/as-is';
const { multi, Interface, as, is, IF, ELSE, END, optional, get, macro, strict, Enum }  = new Checker({
   'IF/ELSE/END': true, strict: true, Enum: true, utility: true
});

function example(arg, arg2, arg3) {
    as.string(arg), as.number(arg2), as.boolean(arg3);

    console.log(arg, arg2, arg3);
};
example(text, 2, true)
//[ text, 2, true ]
```
or more extraordinary syntax
```js
import { Checker, BaseInterface, MicroTest, Utility } from '@pro-script/as-is';
const { multi, Interface, as, is, IF, ELSE, END, optional, get, macro, strict, Enum }  = new Checker({ 
   'IF/ELSE/END': true, strict: true, Enum: true, utility: true
});

function example(arg, arg2, arg3,
                       _ = [as.string(arg), as.number(arg2), as.boolean(arg3)]) {
    console.log(type);
};
example(text, 2, true)
//[ text, 2, true ]

```
[<- go back](#please-read-the-pro-script-concept-first)

### is.string && as.string
**Working examples**
```javascript
is.string('text') // -> true
is.String('text') // -> true
is.sTrInG('text') // -> true. Allways type will be converted to lowercase
is.string(2) // -> false
```
```javascript
as.string('text') // -> 'text'
as.String('text') // -> 'text'
as.sTrInG('text') // -> 'text'. Allways type will be converted to lowercase
as.string(2) // -> TypeError: Number is not a(an) string
```
```javascript
const hello = 'Hello';
const world = 'world';
const two = 2;

const resultString = as.string(hello) + as.string(world); // -> Hello world
console.log(as.string(resultString)); // type checked and returned -> Hello world

is.string(resultString)
        ? console.log('this is string')
        : console.log('this is '+ get.type(resultString));

!is.string(two)
        ? console.log('this is not string')
        : console.log('this is '+ get.type(two));
 ```
[<- go back](#please-read-the-pro-script-concept-first)

### is.number && as.number
**Working examples**
```javascript
is.string('text') // -> true
as.number(2) // -> 2

```
[<- go back](#please-read-the-pro-script-concept-first)


### You can even check the class type
```js
import { Checker, BaseInterface, MicroTest, Utility } from '@pro-script/as-is';
const instance = new Checker({ 'IF/ELSE/END': true, strict: true, Enum: true, utility: true});

is.Checker(Checker); // true
as.Checker(Checker);// class Checker

is.Checker(instance); // true
as.Checker(instance);// class instance

is.class(instance); // true
as.class(instance);// class instance


```
[<- go back](#please-read-the-pro-script-concept-first)
## Checking one repeated type
In object, array, set and map. All types ending with 's' will be checked.
```js
is.strings(exampleObject) && as.strings(exampleObject);
is.Numbers(exampleArray) && as.Numbers(exampleArray);
is.Errors(exampleSet) && as.Errors(exampleSet);
is.BigInts(exampleMap) && as.BigInts(exampleMap); 
is.BigInts(exampleMap) && optional.BigInts(exampleMap); 
```
[<- go back](#please-read-the-pro-script-concept-first)

## Checking multiple types
When a variable is part of more than one type, you can also check for that. 
### Multiple Basic
```js
is['couple js type here']('argument here'); // true | false
as['couple js type here']('argument here'); // argument | TypeError

// as alias syntax
multi`couple js type here`('argument here'); // argument | TypeError
multi(['couple js type here'])('argument here'); // argument | TypeError

```
[<- go back](#please-read-the-pro-script-concept-first)
### Multiple Basic usage
```js
as.NumberStringBoolean(2022);
as.Number_String_Boolean_Symbol_Function_BigInt_Array([]);
as['Number|String|Boolean']('text');
as['Number-String-Boolean'](true);
as['Number or String or Boolean'](777);
as['it can be any text with type definition like String or Number'](111);

multi`Number|String|Boolean`(2022);
multi(['Number|String|Boolean'])(true);

const multiType = 'Number|String|Boolean';
as[multiType]({});
// TypeError: Object is not a(an) Number|String|Boolean
```
[<- go back](#please-read-the-pro-script-concept-first)
# Interfaces
## Interfaces Basic
First you need create an interface, which will be stored in instance of checker in private area **#interfaces**.
```js
const checker = new Checker({ 'IF/ELSE/END': true, strict: true, Enum: true, utility: true });
const { multi, Interface, as, is } = checker;

const { [InterfaceName] } = Interface({
    [InterfaceName]: {
        [propertyName]: ['as[js type here]']
    }
});
// as result => checker.#interfaces[InterfaceName]
```
Working example
```js
const { Interface, as } = new Checker({ 'IF/ELSE/END': true, strict: true, Enum: true, utility: true });

const { IUser } = Interface({
    IUser: {
        name: as.string
    }
});
```
You can't change the interface.
```js
IUser.pages = as.strings; // error
IUser.birthDate = as.number; // error
delete IUser.birthDate; // error
```
The method Interface receives an object of objects, where the properties are a reference to as-is type checking methods.
You can use **BaseInterface** to create an interface object after instantiation. This gives you the ability to work with interfaces like classes.
```js
export default class MyInterface extends BaseInterface {
    
    constructor() {
        super(MyInterface);
        this.age = ()=> as.number;
    }

    name() {
        return as.string
    }

    static surName() {
        return as.string
    }
}
```
After that
```js
import MyInterface from './MyInterface.interface.js';

const { IMyInterface } = Interface({ IMyInterface: new MyInterface });
as.IMyInterface = { name: 'Tomas', age: 33, surName: 'Andersen' };
```
[<- go back](#please-read-the-pro-script-concept-first)
### Interfaces Basic usage
```js
const { IUser, IBook } = Interface({
    IUser: {
        name: as.string,
        age: as.number,
        birthDate: as.date
    },
    IBook: {
        title: as.string,
        pages: as.number
    }
});

IUser.pages = as.strings;
delete IUser.birthDate;

as.IUser = { name: 'text', age: 12, pages:['page'] };

function example(params, Interface = (as.IUser = params)) {
    return 'returned string';
}

function exampleSecond(params) {
    const { title, pages } = as.IBook = params;
    return params
}


// to check returned interface use "set"
as.IBook = example({ name: 'text', age: 12, pages:['page'] });
// to check returned value use "call"
as.string(exampleSecond({ title: 'Book title', pages: 777}));
```
You can to get all interfaces from Checker instance like this:
```js
const intefaces = Interface({});
// => { IUser, IBook, IMyInterface }
```
[<- go back](#please-read-the-pro-script-concept-first)
## IF/ELSE/END
These commands are an alias for the "is" command and are added to make the code easier to read.
### IF/ELSE/END Basic usage
When you need to use a couple of variants of function or method calls, you can do the following
```javascript
// Case 1
function someFunction(name, age, friends) {
    console.log(name, age, friends);
}
// Case 2
function someFunction(name, friends) {
    console.log(name, friends);
}
// Case 3
function someFunction(age, friends) {
    console.log(age, friends);
}
// Case 4
function someFunction(friends) {
    console.log(friends);
}

function someFunction(name, age, friends,
                      _= [as.stringNumberArray(name),
                          as.undefinedNumberArray(age),
                          as.undefinedArray(friends)
                      ]) {
    
    IF.string(name) && is.number(age) && is.array(friends)? (
        as.array(_) && as.notEmpty(_)
    ):ELSE.string(name) && is.array(age)? (
        friends = age, 
        age = undefined
    ):ELSE.number(name) && is.array(age)? (
        friends = age,
        age = name,
        name = undefined
    ):ELSE.array(name)? (
        friends = name,
        name = undefined
    ):END;
    console.log(`name: ${name}, age: ${age}, friends: ${friends}`);
}
someFunction('Rick', 25, ['Mike', 'Liza']);
// name: Rick, age: 25, friends: Mike,Liza
someFunction('Rick', ['Mike', 'Liza']);
// name: Rick, age: undefined, friends: Mike,Liza
someFunction(25, ['Mike', 'Liza']);
// name: undefined, age: 25, friends: Mike,Liza
someFunction(['Mike', 'Liza']);
// name: undefined, age: undefined, friends: Mike,Liza


```
[<- go back](#please-read-the-pro-script-concept-first)
## Utility
A simple method to get the type of argument
```javascript
get.type('any argument here'); // type of argument

get.type(43); // Number
get.type(Checker); // Checker
```
[<- go back](#please-read-the-pro-script-concept-first)
## Aliases
You can check the following types by "is", "as" or javascript, but this looks more readable
```javascript
is.arguments(1); // true | false
as.arguments(1) // 1 | TypeError
// the same of
is.arrayObject(1); // true

is.generator(function*() { yield 0 }) // true | false
as.generator(function*() { yield 0 }) // function*() { yield 0 } | TypeError
// the same of
is.iterator(function*() { yield 0 })  // true | false
as.iterator(function*() { yield 0 })  // function*() { yield 0 } | TypeError

is.NodeJs() // true | false
as.NodeJs() //  process | TypeError
// the same of
process !== undefined // true

is.browser() // true
ss.browser() // navigator | TypeError
// the same of
navigator !== undefined  // true
    
is.Chrome() // true
as.Chrome() // navigator | TypeError
// the same of
navigator.userAgent.includes('Chrome') // true    
    
```
[<- go back](#please-read-the-pro-script-concept-first)
## Enum type
### Enum type Basic
```js
Enum.init('enum object here')
```
[<- go back](#please-read-the-pro-script-concept-first)
### Enum type Basic usage
Use increment
```js
Enum.init({
    RED: 0,
    GREEN: Enum.inc,
    BLUE: Enum.inc,
});

// Enum {
//   '0': 'RED',
//   '1': 'GREEN',
//   '2': 'BLUE',
//   RED: 0,
//   GREEN: 1,
//   BLUE: 2
// }
```
Use decrement
```js
Enum.init({
    ROOF: 2,
    FLOOR: Enum.dec,
    BASEMENT: Enum.dec,
});
// Enum {
//   '0': 'BASEMENT',
//   '1': 'FLOOR',
//   '2': 'ROOF',
//   ROOF: 2,
//   FLOOR: 1,
//   BASEMENT: 0
// }
```
Use both
```js
Enum.init({
    RED: 0,
    GREEN: Enum.inc,
    BLUE: Enum.inc,
    ROOF: 6,
    FLOOR: Enum.dec,
    BASEMENT: Enum.dec,
});
// Enum {
//   '0': 'RED',
//   '1': 'GREEN',
//   '2': 'BLUE',
//   '4': 'BASEMENT',
//   '5': 'FLOOR',
//   '6': 'ROOF',
//   RED: 0,
//   GREEN: 1,
//   BLUE: 2,
//   ROOF: 6,
//   FLOOR: 5,
//   BASEMENT: 4
// }
```
Use with step
```js
Enum.init({
    [Enum.step]: 10, // ['Enum.step'] the same but with a quotes
    RED: Enum.inc,
    GREEN: Enum.inc,
    BLUE: Enum.inc,
});

// Enum {
//   '10': 'RED',
//   '20': 'GREEN',
//   '30': 'BLUE',
//   RED: 10,
//   GREEN: 20,
//   BLUE: 30
// }
const enumExample = Enum.init({
    [Enum.step]: 10,
    ROOF: Enum.dec,
    FLOOR: 30,
    BASEMENT: Enum.dec,
});
// Enum {
//   '10': 'ROOF',
//   '20': 'BASEMENT',
//   '30': 'FLOOR',
//   ROOF: 10,
//   FLOOR: 30,
//   BASEMENT: 20
// }
```
Check the Enum type like this
```js
as.Enum(enumExample) && as.enum(enumExample);
```
[<- go back](#please-read-the-pro-script-concept-first)
## Integration
You can integrate any feature you want.
```js
import { Checker, BaseInterface, MicroTest, Utility } from '@pro-script/as-is';
import axios from "axios";

const integrate = {
    up: async function (url) {
        const result = await axios.get(url);
        if(result.status === 200) return 'Ok';
        else throw new TypeError('url is down');
    }
};

const { multi, strict, as, is } = new Checker({ integrate });
const isUrl = as;

async function example(arg, arg2, arg3,
                       type = [as.string(arg), as.number(arg2), as.boolean(arg3)]) {
    await isUrl.up('https://google.com');
    console.log(type);
};

await example('text', 2, true)
// [ 'text', 2, true ]

await isUrl?.up('https://not-google.com');
// TypeError: url is down
```
[<- go back](#please-read-the-pro-script-concept-first)
## Settings
To change error message you can reload Checker.errorMsg.
If you want to disable throwing error please set checker.disabled = true.
```js
const checker = new Checker(integrate);
checker.errorMsg = (params)=> `${params[2] || (params[0]?.constructor 
                                   ? params[0].constructor.name
                                   :params[0])
                           } , really? I'm not sure that is a(an) ${params[1]}`;

const { multi, as, is } = checker;
checker.disabled = true;
// TypeError: Number, really? I'm not sure that is a(an) string
```
[<- go back](#please-read-the-pro-script-concept-first)
# Micro-tests
A micro-test is better than no tests.
## Micro-tests Basic
Micro-test has couple variant of syntax. You can choose what you like.
```javascript
START.anyName;
    START.anyName;
    // your test here
    STOP.anyName;
FINISH.anyName;
// or
START.anyName 
{
    START.anyName 
   {
        // your test here
    } 
    STOP.anyName
} 
FINISH.anyName;
// or
[{
   [START.anyName]() {
      // your test here
      STOP.anyName;
   },   
   [START.anyName2]() {
      // your test here
      STOP.anyName;
   }
}, /anyName/, /anyName2/].macro;
// or 
[{/* just init like before */}].macro;
[/anyName/, /anyName2/].macro; // launch the test macros;
```
Under the hood START.anyName is the 

    console.time('anyName');

FINISH and STOP.anyName is the

    console.timeEnd('anyName')

FINISH also counts the number of failed tests and throws errors. Because START, STOP, and FINISH are proxies, you don't need to call START.anyName(). Just leave it without brackets.

[<- go back](#please-read-the-pro-script-concept-first)
# Micro-tests Basic usage
There are only five main methods: METHOD, PROPERTY, IS, passed and failed.

## METHOD usage
METHOD strictly checks methods.
```javascript
import { Checker, BaseInterface, MicroTest, Utility, MicroTest } from '@pro-script/as-is';
const checker = new Checker({ 'IF/ELSE/END': true, strict: true, Enum: true, utility: true});
const { multi, Interface, strict, as, is, IF, ELSE, END, optional, get }  = checker;
const { START, STOP, FINISH, METHOD, PROPERTY, IS, passed, failed } = new MicroTest({ is, as });

METHOD.toString(''); // ✗ METHOD.toString failed
const object = {
    foo: ()=> {}
};
METHOD.foo(object) // ✓ METHOD.foo passed
```
[<- go back](#please-read-the-pro-script-concept-first)
## PROPERTY usage
PROPERTY strictly checks properties.
```javascript
import { Checker, BaseInterface, MicroTest, Utility, MicroTest } from '@pro-script/as-is';
const checker = new Checker({ 'IF/ELSE/END': true, strict: true, Enum: true, utility: true});
const { multi, Interface, strict, as, is, IF, ELSE, END, optional, get }  = checker;
const { START, STOP, FINISH, METHOD, PROPERTY, IS, passed, failed } = new MicroTest({ is, as });

const object = {
    foo: ()=> 'Hello world',
    property1: 1
};
PROPERTY.foo(object) // ✗ PROPERTY.foo failed
PROPERTY.property1(object) // ✓ PROPERTY.property1 passed
```
[<- go back](#please-read-the-pro-script-concept-first)
## IS usage
The IS function is a wrapper of "is" method, but with four additional methods like: true, false, ok, notOk. You can check any type with IS, what can do "is".
```javascript
import { Checker, BaseInterface, MicroTest, Utility, MicroTest } from '@pro-script/as-is';
const checker = new Checker({ 'IF/ELSE/END': true, strict: true, Enum: true, utility: true});
const { multi, Interface, strict, as, is, IF, ELSE, END, optional, get }  = checker;
const { START, STOP, FINISH, METHOD, PROPERTY, IS, passed, failed } = new MicroTest({ is, as });

IS.string(''); // ✓ IS.string passed
IS.objectUndeinedStringNumber(2); // ✓ IS.objectUndeinedStringNumber passed
```
Any testing framework has many methods and you should learn them before testing. Such as ().to.be.equal or assert.isOk() and more and that means a test development takes more time.
Using the one percent improvement principle, you can reduce this time to a minimum by using only IS.true or IS.false and IS.ok or IS.notOk. Nothing else is needed for microtesting. When you need to test anything, you will use a different testing framework.
```javascript
import { Checker, BaseInterface, MicroTest, Utility, MicroTest } from '@pro-script/as-is';
const checker = new Checker({ 'IF/ELSE/END': true, strict: true, Enum: true, utility: true});
const { multi, Interface, strict, as, is, IF, ELSE, END, optional, get }  = checker;
const { START, STOP, FINISH, METHOD, PROPERTY, IS, passed, failed } = new MicroTest({ is, as });

const object = {
   foo: ()=> 'Hello world',
   property1: 1
};
IS.object(object);
IS.string(object.foo());
IS.number(object.property1);
IS.true(object.property1 >=1);
IS.false(object.property1 < 1);
IS.ok(object.foo().includes('world'));
IS.notOk(object.foo().includes('!'));
```
[<- go back](#please-read-the-pro-script-concept-first)
## passed and failed usage
This small functionality will be useful when you need to build your own testing scenario, but don't want to use IS for checking.
```javascript
import { Checker, BaseInterface, MicroTest, Utility, MicroTest } from '@pro-script/as-is';
const checker = new Checker({ 'IF/ELSE/END': true, strict: true, Enum: true, utility: true});
const { multi, Interface, strict, as, is, IF, ELSE, END, optional, get }  = checker;
const { START, STOP, FINISH, METHOD, PROPERTY, IS, passed, failed } = new MicroTest({ is, as });

(1 < 2) ? passed.one('Is a won'): failed.two('is a loss');
```
## Possible errors
If you got this error:

      TypeError: Cannot read properties of undefined (reading '#<Object>')

Please check if you put a semicolon ';' at the end of line before.

## No dependencies
[<- go back](#please-read-the-pro-script-concept-first)

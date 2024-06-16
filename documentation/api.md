Check your types at runtime with ESNext syntax by meta programing in node.js and browser with interfaces, strict object, enum type and more.
Follow me on twitter for further updates [twitter](https://twitter.com/VolodymyrKotov)
All code covered by 282 tests in node js and 233 in browser. 
Tested in **node js, bun.js, Chrome, Safary, FireFox**


4. [API](#api)
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

# API
**as-is** is a stateful module please keep this in mind.

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

### is.number && as.number
**Working examples**
```javascript
is.string('text') // -> true
as.number(2) // -> 2

```


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
## Checking one repeated type
In object, array, set and map. All types ending with 's' will be checked.
```js
is.strings(exampleObject) && as.strings(exampleObject);
is.Numbers(exampleArray) && as.Numbers(exampleArray);
is.Errors(exampleSet) && as.Errors(exampleSet);
is.BigInts(exampleMap) && as.BigInts(exampleMap); 
is.BigInts(exampleMap) && optional.BigInts(exampleMap); 
```

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
[<- go back](#api)

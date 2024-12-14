<span style="display:block;text-align:center">
    <img src="logo.png">
</span>

# Pro-script Library Documentation
## New functionality of Types was added.

## Overview
This library provides a comprehensive framework for type checking, utility functions, and macros for automated testing in JavaScript environments. It offers tools to validate types, manage enumerations, and enhance code quality through structured checks and assertions.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
    - [Instancing](#instancing)
3. [Summary of Features](#summary-of-features)
    - [Supported types](#supported-types)
    - [Integration](#integration)
4. [Type Checks](#type-checks)
    - [String](#string)
    - [Number](#number)
    - [Boolean](#boolean)
    - [Symbol](#symbol)
    - [Function](#function)
    - [BigInt](#bigint)
    - [Array](#array)
    - [Date](#date)
    - [Object](#object)
    - [Set](#set)
    - [Map](#map)
    - [WeakSet](#weakset)
    - [WeakMap](#weakmap)
    - [RegExp](#regexp)
    - [Promise](#promise)
    - [Generator](#generator)
   - [TypedArray](#typedarray)
   - [Buffer](#buffer)
   - [SharedArrayBuffer](#sharedarraybuffer)
   - [Date](#date)
   - [Object](#object)
   - [Class](#class)
   - [Instance](#instance)
   - [Iterator](#iterator)
   - [Nullish](#nullish)
   - [Error](#error)
   - [RangeError](#rangeerror)
   - [ReferenceError](#referenceerror)
   - [SyntaxError](#syntaxerror)
   - [TypeError](#typeerror)
   - [Any](#any)
5. [Enum type](#Enum-type)
6. [Build-in validators](#Build-in-validators)
7. [Number Validators](#number-validators)
   - [Zero](#zero)
   - [Even](#even)
    - [Odd](#odd)
    - [Positive](#positive)
    - [Negative](#negative)
    - [Positive Integer](#positive-integer)
    - [Negative Integer](#negative-integer)
    - [Finite](#finite)
    - [NaN](#nan)
    - [Between](#between)
    - [Greater](#greater)
    - [Less](#less)
    - [Equal or Greater](#equal-greater)
    - [Equal or Less](#equal-less)
    - [Max](#max)
    - [Min](#min)
    - [Multiple](#multiple)
    - [Port](#port)
    - [Safe Integer](#safe-integer)
    - [Precision](#precision)
    - [Digits](#digit)
    - [ISBN-10](#isbn-10)
    - [ISBN-13](#isbn-13)
    - [EAN](#ean)
    - [SSN](#ssn)
    - [VIN](#vin)
    - [INN-10](#inn-10)
    - [INN-12](#inn-12)
    - [GLN](#gln)
    - [IMEI](#imei)
    - [NPI](#npi)
8. [String Validators](#string-validators)
   - [Alphabetic](#alphabetic)
   - [Digit](#digit)
   - [Lowercase](#lowercase)
   - [Uppercase](#uppercase)
   - [CamelCase](#camelcase)
   - [SnakeCase](#snakeCase)
   - [Kebab-Case](#kebab-case)
   - [Train-Case](#train-case)
   - [Path](#path)
   - [UUID](#uuid)
   - [HTTP URL](#http-url)
   - [HTTPS URL](#https-url)
   - [URL](#url)
   - [Email](#email)
   - [IPv4](#ipv4)
   - [IPv6](#ipv6)
   - [IP](#ip)
   - [File Extension](#file-extension)
   - [Hex Color](#hex-color)
   - [Base64](#base64)
   - [Data URL](#data-url)
   - [Credit Card](#credit-card)
   - [MasterCard](#mastercard)
   - [Visa](#visa)
   - [American Express](#american-express)
   - [Diners Club](#diners-club)
   - [Domain](#domain)
   - [GUID](#guid)
   - [Hostname](#hostname)
   - [ISO Date](#iso-date)
   - [ISO Duration](#iso-duration)
   - [JWT](#jwt)
   - [Emoji](#emoji)
   - [Nanoid](#nanoid)
   - [CUID](#cuid)
   - [CUID2](#cuid2)
   - [Excludes](#excludes)
   - [Time (HH:MM:SS)](#time-hhmmss)
   - [DateTime (YYYY-MM-DDTHH:MM:SS)](#datetime-yyyymmddthhmmss)
   - [Date (YYYY-MM-DD)](#date-yyyymmdd)
   - [SHA-256 Hash](#sha-256-hash)
   - [ISO Time with Seconds](#iso-time-with-seconds)
   - [ISO Timestamp](#iso-timestamp)
   - [ISO Week](#iso-week)
   - [MAC Address](#mac-address)
   - [MAC-48 Address](#mac-48-address)
   - [MAC-64 Address](#mac-64-address)
   - [Past Date](#past-date)
   - [Future Date](#future-date)
   - [ASCII String](#ascii-string)
   - [Base32](#base32)
   - [Base58](#base58)
   - [Date Before Specific Date](#date-before-specific-date)
   - [Date After Specific Date](#date-after-specific-date)
   - [Maximum String Length](#maximum-string-length)
   - [Minimum String Length](#minimum-string-length)
9. [Utility](#Utility)
10. [Settings](#settings)
11. [Aliases](#aliases)
12. [Micro-tests](#Micro-tests-basic-usage)
13. [Advanced techniques](#advanced-techniques)
    - [Checking one repeated type](#checking-one-repeated-type)
    - [Working with strict type](#strict-typing)
    - [Multi type checking](#checking-multiple-types)
14. [Meta programing. Macros](#macros)
15. [Possible Errors](#possible-errors)

## Installation
```bash
npm install @pro-script/as-is @pro-script/as-is-plugins
```

### For Browsers
Without module:
```html
<script src="https://www.unpkg.com/@pro-script/as-is"></script>
<script src="https://www.unpkg.com/@pro-script/as-is-plugins/numbers"></script>
<script src="https://www.unpkg.com/@pro-script/as-is-plugins/strings"></script>
```

With module:
```html
<script type="module">
    import { Checker } from "https://www.unpkg.com/@pro-script/as-is";
    import { NumbersValidator } from "https://www.unpkg.com/@pro-script/as-is-plugins/numbers";
    import { StringsValidator } from "https://www.unpkg.com/@pro-script/as-is-plugins/strings";
    // usage code
</script>
```

## Usage

### Node.js (ESM)
```javascript
import { Checker } from '@pro-script/as-is';
import { NumbersValidator } from '@pro-script/as-is-plugins/numbers';
import { StringsValidator } from '@pro-script/as-is-plugins/strings';

const { as, is } = new Checker({ integrate: Object.assign(NumbersValidator, StringsValidator) });
```

### Node.js (CommonJS)
```javascript
const { Checker } = require('@pro-script/as-is');
const { NumbersValidator } = require('@pro-script/as-is-plugins/numbers');
const { StringsValidator } = require('@pro-script/as-is-plugins/strings');

const { as, is } = new Checker({ integrate: Object.assign(NumbersValidator, StringsValidator) });
```

### Browser
Without module:
```html
<script>
    const { as, is } = new Checker({ integrate: Object.assign(NumbersValidator, StringsValidator) });
</script>
```

With module:
```html
<script type="module">
    import { Checker } from "https://www.unpkg.com/@pro-script/as-is";
    import { NumbersValidator } from "https://www.unpkg.com/@pro-script/as-is-plugins/numbers";
    import { StringsValidator } from "https://www.unpkg.com/@pro-script/as-is-plugins/strings";

    const { as, is } = new Checker({ integrate: Object.assign(NumbersValidator, StringsValidator) });
</script>
```

With import map:
```html
<script type="importmap">
  {
    "imports": {
      "@pro-script/as-is": "https://www.unpkg.com/@pro-script/as-is",
      "@pro-script/as-is-plugins/numbers": "https://www.unpkg.com/@pro-script/as-is-plugins/numbers",
      "@pro-script/as-is-plugins/strings": "https://www.unpkg.com/@pro-script/as-is-plugins/strings",
    }
  }
</script>
<script type="module">
    import { Checker } from '@pro-script/as-is';
    import { NumbersValidator } from '@pro-script/as-is-plugins/numbers';
    import { StringsValidator } from '@pro-script/as-is-plugins/strings';

    const { as, is } = new Checker({ integrate: Object.assign(NumbersValidator, StringsValidator) });
</script>
```
## Everything in one code block
```javascript
const checker = new Checker({ 
    'IF/ELSE/END': true, 
    strict: true, 
    Enum: true, 
    utility: true,
    integrate: Object.assign(NumbersValidator, StringsValidator) });
const { multi, Interface, as, is, IF, ELSE, END, optional, get, macro, strict, Enum }  = checker;
const { START, STOP, FINISH, METHOD, PROPERTY, IS, CHECK, passed, failed } = new MicroTest({ is, as });
```
## in global scope
```javascript
Object.assign(global, { multi, Interface, as, is, Enum });
```
or
```javascript
Object.assign(window, { multi, Interface, as, is, Enum });
```
After that you can use an as or is etc in other files.


## Summary of Features

### Supported Types:
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

**Class checking:**
- [className]
- [classInstance]
```    
is.date(Date);
is.date(new Date);
is.class(Date) or is.class(new Date)
```
**Interface**
Interfaces works only in the set way where IName = { * interface data * }, not like IName({ * interface data * })
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
**Types**
Types works only in the apply way where TName({ * types data * }), not like interfaces TName = { * types data * }
```js
const { multi, Interface, Type, as, is, IF, ELSE, END, optional, get, macro, strict, Enum }  = checker;

const { TUser } = Type({
            IUser: {
                name: as.string,
                birthDate: as.date,
                age: (value)=> {
                    // any code here to check the value 
                }
            }
});
as.TUser({ name: 'Jesus', age: 2022, birthDate: 'Sat Apr 7 0:0:0 GMT+0200 (Central European Summer Time)'});
```


### Integration
You can integrate any feature you want.
```javascript
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

## Instancing
Minimal set of methods.
```javascript
const { as, is } = new Checker;
```
All methods without plugins.
```javascript
const checker = new Checker({ 'IF/ELSE/END': true, strict: true, Enum: true, utility: true });
const { multi, Interface, as, is, IF, ELSE, END, optional, get, macro, strict, Enum }  = checker;
const { START, STOP, FINISH, METHOD, PROPERTY, IS, CHECK, passed, failed } = new MicroTest({ is, as });
```
All methods with plugins.
```javascript
const checker = new Checker({ 
    'IF/ELSE/END': true, 
    strict: true, 
    Enum: true, 
    utility: true, 
    integrate: Object.assign(NumbersValidator, StringsValidator) 
});
const { multi, Interface, as, is, IF, ELSE, END, optional, get, macro, strict, Enum }  = checker;
const { START, STOP, FINISH, METHOD, PROPERTY, IS, CHECK, passed, failed } = new MicroTest({ is, as });
```

## Type Checks

### String
```javascript
is.string(value) -> true | false
as.string(value) -> value | TypeError: [get.type(value)] is not a(an) string
```
**Description:**

Checks if the provided argument is a string.

- **is.string(arg):**
    - Returns `true` if `arg` is a string.
    - Returns `false` otherwise.

- **as.string(arg):**
    - Returns `arg` if it is a string.
    - Throws `TypeError` if

`arg` is not a string.

**Example:**
```javascript
is.string('hello');   // Returns true
is.string(123);       // Returns false

as.string('hello');   // Returns 'hello'
as.string(123);       // Throws TypeError: Number is not a(an) string
```

### Number
```javascript
is.number(value) -> true | false
as.number(value) -> value | TypeError: [get.type(value)] is not is not a(an) number
```
**Description:**

Checks if the provided argument is a number.

- **is.number(arg):**
    - Returns `true` if `arg` is a number.
    - Returns `false` otherwise.

- **as.number(arg):**
    - Returns `arg` if it is a number.
    - Throws `TypeError` if `arg` is not a number.

**Example:**
```javascript
is.number(123);   // Returns true
is.number('123'); // Returns false

as.number(123);   // Returns 123
as.number('123'); // Throws TypeError: Number is not a(an) number
```

### Boolean
```javascript
is.boolean(value) -> true | false
as.boolean(value) -> value | TypeError: [get.type(value)] is not a(an) boolean
```
**Description:**

Checks if the provided argument is a boolean.

- **is.boolean(arg):**
    - Returns `true` if `arg` is a boolean.
    - Returns `false` otherwise.

- **as.boolean(arg):**
    - Returns `arg` if it is a boolean.
    - Throws `TypeError` if `arg` is not a boolean.

**Example:**
```javascript
is.boolean(true);  // Returns true
is.boolean(1);     // Returns false

as.boolean(true);  // Returns true
as.boolean(1);     // Throws TypeError: Number is not a(an) boolean
```

### Symbol
```javascript
is.symbol(value) -> true | false
as.symbol(value) -> value | TypeError: [get.type(value)] is not a(an) symbol
```
**Description:**

Checks if the provided argument is a symbol.

- **is.symbol(arg):**
    - Returns `true` if `arg` is a symbol.
    - Returns `false` otherwise.

- **as.symbol(arg):**
    - Returns `arg` if it is a symbol.
    - Throws `TypeError` if `arg` is not a symbol.

**Example:**
```javascript
const sym = Symbol('test');
is.symbol(sym);        // Returns true
is.symbol('symbol');   // Returns false

as.symbol(sym);        // Returns sym
as.symbol('symbol');   // Throws TypeError: String is not a(an) symbol
```

### Function
```javascript
is.function(value) -> true | false
as.function(value) -> value | TypeError: [get.type(value)] is not a(an) function
```
**Description:**

Checks if the provided argument is a function.

- **is.function(arg):**
    - Returns `true` if `arg` is a function.
    - Returns `false` otherwise.

- **as.function(arg):**
    - Returns `arg` if it is a function.
    - Throws `TypeError` if `arg` is not a function.

**Example:**
```javascript
const func = () => {};
is.function(func);    // Returns true
is.function(123);     // Returns false

as.function(func);    // Returns func
as.function(123);     // Throws TypeError: Number is not a(an) function
```

### BigInt
```javascript
is.bigInt(value) -> true | false
as.bigInt(value) -> value | TypeError: [get.type(value)] is not a(an) bigInt
```
**Description:**

Checks if the provided argument is a BigInt.

- **is.bigInt(arg):**
    - Returns `true` if `arg` is a BigInt.
    - Returns `false` otherwise.

- **as.bigInt(arg):**
    - Returns `arg` if it is a BigInt.
    - Throws `TypeError` if `arg` is not a BigInt.

**Example:**
```javascript
const bigIntExample = BigInt('1234567890123456789012345678901234567890');
is.bigInt(bigIntExample);     // Returns true
is.bigInt(1234567890);        // Returns false

as.bigInt(bigIntExample);     // Returns bigIntExample
as.bigInt(1234567890);        // Throws TypeError: Number is not a(an) bigInt
```

### Array
```javascript
is.array(value) -> true | false
as.array(value) -> value | TypeError: [get.type(value)] is not a(an) bigInt
```
**Description:**

Checks if the provided argument is an array.

- **is.array(arg):**
    - Returns `true` if `arg` is an array.
    - Returns `false` otherwise.

- **as.array(arg):**
    - Returns `arg` if it is an array.
    - Throws `TypeError` if `arg` is not an array.

**Example:**
```javascript
const arrayExample = [];
is.array(arrayExample);    // Returns true
is.array('not an array');  // Returns false

as.array(arrayExample);    // Returns arrayExample
as.array('not an array');  // Throws TypeError: String is not a(an) array
```

### Date
```javascript
is.date(value) -> true | false
as.date(value) -> value | TypeError: [get.type(value)] is not a(an) date
```
**Description:**

Checks if the provided argument is a date.

- **is.date(arg):**
    - Returns `true` if `arg` is a date.
    - Returns `false` otherwise.

- **as.date(arg):**
    - Returns `arg` if it is a date.
    - Throws `TypeError` if `arg` is not a date.

**Example:**
```javascript
const dateExample = new Date();
is.date(dateExample);    // Returns true
is.date('not a date');   // Returns false

as.date(dateExample);    // Returns dateExample
as.date('not a date');   // Throws TypeError: String is not a(an) date
```

### Object
```javascript
is.object(value) -> true | false
as.object(value) -> value | TypeError: [get.type(value)] is not a(an) object
```
**Description:**

Checks if the provided argument is an object.

- **is.object(arg):**
    - Returns `true` if `arg` is an object.
    - Returns `false` otherwise.

- **as.object(arg):**
    - Returns `arg` if it is an object.
    - Throws `TypeError` if `arg` is not an object.

**Example:**
```javascript
const objectExample = {};
is.object(objectExample);    // Returns true
is.object('not an object');  // Returns false

as.object(objectExample);    // Returns objectExample
as.object('not an object');  // Throws TypeError: String is not a(an) object
```

### Set
```javascript
is.set(value) -> true | false
as.set(value) -> value | TypeError: [get.type(value)] is not a(an) set
```
**Description:**

Checks if the provided argument is a set.

- **is.set(arg):**
    - Returns `true` if `arg` is a set.
    - Returns `false` otherwise.

- **as.set(arg):**
    - Returns `arg` if it is a set.
    - Throws `TypeError` if `arg` is not a set.

**Example:**
```javascript
const setExample = new Set();
is.set(setExample);      // Returns true
is.set('not a set');     // Returns false

as.set(setExample);      // Returns setExample
as.set('not a set');     // Throws TypeError: String is not a(an) set
```

### Map
```javascript
is.map(value) -> true | false
as.map(value) -> value | TypeError: [get.type(value)] is not a(an) map
```
**Description:**

Checks if the provided argument is a map.

- **is.map(arg):**
    - Returns `true` if `arg` is a map.
    - Returns `false` otherwise.

- **as.map(arg):**
    - Returns `arg` if it is a map.
    - Throws `TypeError` if `arg` is not a map.

**Example:**
```javascript
const mapExample = new Map();
is.map(mapExample);      // Returns true
is.map('not a map');     // Returns false

as.map(mapExample);      // Returns mapExample
as.map('not a map');     // Throws TypeError: String is not a(an) map
```

### WeakSet
```javascript
is.weakSet(value) -> true | false
as.weakSet(value) -> value | TypeError: [get.type(value)] is not a(an) weakSet
```
**Description:**

Checks if the provided argument is a WeakSet.

- **is.weakSet(arg):**
    - Returns `true` if `arg` is a WeakSet.
    - Returns `false` otherwise.

- **as.weakSet(arg):**
    - Returns `arg` if it is a WeakSet.
    - Throws `TypeError` if `arg` is not a WeakSet.

**Example:**
```javascript
const weakSetExample = new WeakSet();
is.weakSet(weakSet

Example);      // Returns true
is.weakSet('not a weakSet');     // Returns false

as.weakSet(weakSetExample);      // Returns weakSetExample
as.weakSet('not a weakSet');     // Throws TypeError: String is not a(an) weakSet
```

### WeakMap
```javascript
is.weakMap(value) -> true | false
as.weakMap(value) -> value | TypeError: [get.type(value)] is not a(an) weakMap
```
**Description:**

Checks if the provided argument is a WeakMap.

- **is.weakMap(arg):**
    - Returns `true` if `arg` is a WeakMap.
    - Returns `false` otherwise.

- **as.weakMap(arg):**
    - Returns `arg` if it is a WeakMap.
    - Throws `TypeError` if `arg` is not a WeakMap.

**Example:**
```javascript
const weakMapExample = new WeakMap();
is.weakMap(weakMapExample);      // Returns true
is.weakMap('not a weakMap');     // Returns false

as.weakMap(weakMapExample);      // Returns weakMapExample
as.weakMap('not a weakMap');     // Throws TypeError: String is not a(an) weakMap
```

### RegExp
```javascript
is.regExp(value) -> true | false
as.regExp(value) -> value | TypeError: [get.type(value)] is not a(an) regExp
```
**Description:**

Checks if the provided argument is a regular expression.

- **is.regExp(arg):**
    - Returns `true` if `arg` is a regular expression.
    - Returns `false` otherwise.

- **as.regExp(arg):**
    - Returns `arg` if it is a regular expression.
    - Throws `TypeError` if `arg` is not a regular expression.

**Example:**
```javascript
const regExpExample = /./g;
is.regExp(regExpExample);      // Returns true
is.regExp('not a regExp');     // Returns false

as.regExp(regExpExample);      // Returns regExpExample
as.regExp('not a regExp');     // Throws TypeError: String is not a(an) regExp
```

### Promise
```javascript
is.promise(value) -> true | false
as.promise(value) -> value | TypeError: [get.type(value)] is not a(an) promise
```
**Description:**

Checks if the provided argument is a Promise.

- **is.promise(arg):**
    - Returns `true` if `arg` is a Promise.
    - Returns `false` otherwise.

- **as.promise(arg):**
    - Returns `arg` if it is a Promise.
    - Throws `TypeError` if `arg` is not a Promise.

**Example:**
```javascript
const promiseExample = new Promise((resolve) => resolve());
is.promise(promiseExample);      // Returns true
is.promise('not a promise');     // Returns false

as.promise(promiseExample);      // Returns promiseExample
as.promise('not a promise');     // Throws TypeError: String is not a(an) promise
```

### Generator
```javascript
is.generator(value) -> true | false
as.generator(value) -> value | TypeError: [get.type(value)] is not a(an) generator
```
**Description:**

Checks if the provided argument is a Generator.

- **is.generator(arg):**
    - Returns `true` if `arg` is a Generator.
    - Returns `false` otherwise.

- **as.generator(arg):**
    - Returns `arg` if it is a Generator.
    - Throws `TypeError` if `arg` is not a Generator.

**Example:**
```javascript
function* generatorExample() {
    yield 1;
    yield 2;
}
is.generator(generatorExample());     // Returns true
is.generator('not a generator');      // Returns false

as.generator(generatorExample());     // Returns generatorExample
as.generator('not a generator');      // Throws TypeError: String is not a(an) generator
```
Here is the documentation for the additional type checks:

### TypedArray
```javascript
is.typedArray(value) -> true | false
as.typedArray(value) -> value | TypeError: TypedArray is not a value that passed validation
```
**Description:**

Checks if the provided argument is a TypedArray.

- **is.typedArray(arg):**
    - Returns `true` if `arg` is a TypedArray.
    - Returns `false` otherwise.

- **as.typedArray(arg):**
    - Returns `arg` if it is a TypedArray.
    - Throws `TypeError` if `arg` is not a TypedArray.

**Example:**
```javascript
is.typedArray(new Int8Array());   // Returns true
is.typedArray([]);                // Returns false

as.typedArray(new Int8Array());   // Returns Int8Array
as.typedArray([]);                // Throws TypeError: Array is not a(an) typedArray
```

### Buffer
```javascript
is.buffer(value) -> true | false
as.buffer(value) -> value | TypeError: [get.type(value)] is not a(an) buffer
```
**Description:**

Checks if the provided argument is a Buffer.

- **is.buffer(arg):**
    - Returns `true` if `arg` is a Buffer.
    - Returns `false` otherwise.

- **as.buffer(arg):**
    - Returns `arg` if it is a Buffer.
    - Throws `TypeError` if `arg` is not a Buffer.

**Example:**
```javascript
is.buffer(Buffer.from('hello'));  // Returns true
is.buffer('hello');               // Returns false

as.buffer(Buffer.from('hello'));  // Returns Buffer
as.buffer('hello');               // Throws TypeError: String is not a(an) buffer
```

### SharedArrayBuffer
```javascript
is.sharedArrayBuffer(value) -> true | false
as.sharedArrayBuffer(value) -> value | TypeError: [get.type(value)] is not a(an) sharedArrayBuffer
```
**Description:**

Checks if the provided argument is a SharedArrayBuffer.

- **is.sharedArrayBuffer(arg):**
    - Returns `true` if `arg` is a SharedArrayBuffer.
    - Returns `false` otherwise.

- **as.sharedArrayBuffer(arg):**
    - Returns `arg` if it is a SharedArrayBuffer.
    - Throws `TypeError` if `arg` is not a SharedArrayBuffer.

**Example:**
```javascript
is.sharedArrayBuffer(new SharedArrayBuffer());  // Returns true
is.sharedArrayBuffer([]);                       // Returns false

as.sharedArrayBuffer(new SharedArrayBuffer());  // Returns SharedArrayBuffer
as.sharedArrayBuffer([]);                       // Throws TypeError: Array is not a(an) sharedArrayBuffer
```

### Date
```javascript
is.date(value) -> true | false
as.date(value) -> value | TypeError: [get.type(value)] is not a(an) date
```
**Description:**

Checks if the provided argument is a Date object.

- **is.date(arg):**
    - Returns `true` if `arg` is a Date object.
    - Returns `false` otherwise.

- **as.date(arg):**
    - Returns `arg` if it is a Date object.
    - Throws `TypeError` if `arg` is not a Date object.

**Example:**
```javascript
is.date(new Date());      // Returns true
is.date('2021-01-01');    // Returns false

as.date(new Date());      // Returns Date
as.date('2021-01-01');    // Throws TypeError: String is not a(an) date
```

### Object
```javascript
is.object(value) -> true | false
as.object(value) -> value | TypeError: [get.type(value)] is not a(an) object
```
**Description:**

Checks if the provided argument is an object.

- **is.object(arg):**
    - Returns `true` if `arg` is an object.
    - Returns `false` otherwise.

- **as.object(arg):**
    - Returns `arg` if it is an object.
    - Throws `TypeError` if `arg` is not an object.

**Example:**
```javascript
is.object({});            // Returns true
is.object('hello');       // Returns false

as.object({});            // Returns {}
as.object('hello');       // Throws TypeError: String is not a(an) object
```

### Class
```javascript
is.class(value) -> true | false
as.class(value) -> value | TypeError: [get.type(value)] is not a(an) class
```
**Description:**

Checks if the provided argument is a class.

- **is.class(arg):**
    - Returns `true` if `arg` is a class.
    - Returns `false` otherwise.

- **as.class(arg):**
    - Returns `arg` if it is a class.
    - Throws `TypeError` if `arg` is not a class.

**Example:**
```javascript
class MyClass {}
is.class(MyClass);        // Returns true
is.class(() => {});       // Returns false

as.class(MyClass);        // Returns MyClass
as.class(() => {});       // Throws TypeError: Function is not a(an) class
```

### Instance
```javascript
is.instance(value, constructor) -> true | false
as.instance(value, constructor) -> value | TypeError: [get.type(value)] is not a(an) instance
```
**Description:**

Checks if the provided argument is an instance of the specified class.

- **is.instance(arg, constructor):**
    - Returns `true` if `arg` is an instance of `constructor`.
    - Returns `false` otherwise.

- **as.instance(arg, constructor):**
    - Returns `arg` if it is an instance of `constructor`.
    - Throws `TypeError` if `arg` is not an instance of `constructor`.

**Example:**
```javascript
class MyClass {}
const instance = new MyClass();
is.instance(instance, MyClass);   // Returns true
is.instance({}, MyClass);         // Returns false

as.instance(instance, MyClass);   // Returns instance
as.instance({}, MyClass);         // Throws TypeError: Object is not a(an) instance
```

### Iterator
```javascript
is.iterator(value) -> true | false
as.iterator(value) -> value | TypeError: [get.type(value)] is not a(an) iterator
```
**Description:**

Checks if the provided argument is an iterator.

- **is.iterator(arg):**
    - Returns `true` if `arg` is an iterator.
    - Returns `false` otherwise.

- **as.iterator(arg):**
    - Returns `arg` if it is an iterator.
    - Throws `TypeError` if `arg` is not an iterator.

**Example:**
```javascript
const iterator = [][Symbol.iterator]();
is.iterator(iterator);    // Returns true
is.iterator([]);          // Returns false

as.iterator(iterator);    // Returns iterator
as.iterator([]);          // Throws TypeError: Array is not a(an) iterator
```

### Nullish
```javascript
is.nullish(value) -> true | false
as.nullish(value) -> value | TypeError: [get.type(value)] is not a(an) nullish
```
**Description:**

Checks if the provided argument is null or undefined.

- **is.nullish(arg):**
    - Returns `true` if `arg` is null or undefined.
    - Returns `false` otherwise.

- **as.nullish(arg):**
    - Returns `arg` if it is null or undefined.
    - Throws `TypeError` if `arg` is not null or undefined.

**Example:**
```javascript
is.nullish(null);         // Returns true
is.nullish(undefined);    // Returns true
is.nullish('hello');      // Returns false

as.nullish(null);         // Returns null
as.nullish(undefined);    // Returns undefined
as.nullish('hello');      // Throws TypeError: String is not a(an) nullish
```

### Error
```javascript
is.error(value) -> true | false
as.error(value) -> value | TypeError: [get.type(value)] is not a(an) error
```
**Description:**

Checks if the provided argument is an Error.

- **is.error(arg):**
    - Returns `true` if `arg` is an Error.
    - Returns `false` otherwise.

- **as.error(arg):**
    - Returns `arg` if it is an Error.
    - Throws `TypeError` if `arg` is not an Error.

**Example:**
```javascript
is.error(new Error());    // Returns true
is.error('error');        // Returns false

as.error(new Error());    // Returns Error
as.error('error');        // Throws TypeError: String is not a(an) error
```

### RangeError
```javascript
is.rangeError(value) -> true | false
as.rangeError(value) -> value | TypeError: [get.type(value)] is not a(an) rangeError
```
**Description:**

Checks if the provided argument is a RangeError.

- **is.rangeError(arg):**
    - Returns `true` if `arg` is a RangeError.
    - Returns `false` otherwise.

- **as.rangeError(arg):**
    - Returns `arg` if it is a RangeError.
    - Throws `TypeError` if `arg` is not a RangeError.

**Example:**
```javascript
is.rangeError(new RangeError());    // Returns true
is.rangeError('error');             // Returns false

as.rangeError(new RangeError());    // Returns RangeError
as.rangeError('error');             // Throws TypeError: String is not a(an) rangeError
```

### ReferenceError
```javascript
is.referenceError(value) -> true | false
as.referenceError(value) -> value | TypeError: [get.type(value)] is not a(an) referenceError
```
**Description:**

Checks if the provided argument is a ReferenceError.

- **is.referenceError(arg):**
    - Returns `true` if `arg` is a ReferenceError.
    - Returns `false` otherwise.

- **as.referenceError(arg):**
    - Returns `arg` if it is a ReferenceError.
    - Throws `TypeError` if `arg` is not a ReferenceError.

**Example:**
```javascript
is.referenceError(new ReferenceError());    // Returns true
is.referenceError('error');                 // Returns false

as.referenceError(new ReferenceError());    // Returns ReferenceError
as.referenceError('error');                 // Throws TypeError: String is not a(an) referenceError
```

### SyntaxError
```javascript
is.syntaxError(value) -> true | false
as.syntaxError(value) -> value | TypeError: [get.type(value)] is not a(an) syntaxError
```
**Description:**

Checks if the provided argument is a SyntaxError.

- **is.syntaxError(arg):**
    - Returns `true` if `arg` is a SyntaxError.
    - Returns `false` otherwise.

- **as.syntaxError(arg):**
    - Returns `arg` if it is a SyntaxError.
    - Throws `TypeError` if `arg` is not a SyntaxError.

**Example:**
```javascript
is.syntaxError(new SyntaxError());    // Returns true
is.syntaxError('error');              // Returns false

as.syntaxError(new SyntaxError());    // Returns SyntaxError
as.syntaxError('error');              // Throws TypeError: String is not a(an) syntaxError
```

### TypeError
```javascript
is.typeError(value) -> true | false
as.typeError(value) -> value | TypeError: [get.type(value)] is not a(an) typeError
```
**Description:**

Checks if the provided argument is a TypeError.

- **is.typeError(arg):**
    - Returns `true` if `arg` is a TypeError.
    - Returns `false` otherwise.

- **as.typeError(arg):**
    - Returns `arg` if it is a TypeError.
    - Throws `TypeError` if `arg` is not a TypeError.

**Example:**
```javascript
is.typeError(new TypeError());    // Returns true
is.typeError('error');            // Returns false

as.typeError(new TypeError());    // Returns TypeError
as.typeError('error');            // Throws TypeError: String is not a(an) typeError
```

### Any
```javascript
is.any(value) -> true
as.any(value) -> value
```
**Description:**

Checks if the provided argument is any value.

- **is.any(arg):**
    - Returns `true` if `arg` is any value.
    - Returns `false` otherwise.

- **as.any(arg):**
    - Returns `arg` if it is any value.
    - Throws `TypeError` if `arg` is not any value.

**Example:**
```javascript
is.any('hello');    // Returns true
is.any(123);        // Returns true

as.any('hello');    // Returns 'hello'
as.any(123);        // Returns 123
```

## Enum type
### Enum type Basic
```js
Enum.init('enum object here')
```
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

## Build-in validators
This list of validators works with a minimum set of methods.
### Empty
```javascript
is.empty(value) -> true | false
as.empty(value) -> value | TypeError: Value is not empty
```
**Description:**

Checks if the provided argument is empty.

- **is.empty(arg):**
    - Returns `true` if `arg` is empty.
    - Returns `false` otherwise.

- **as.empty(arg):**
    - Returns `arg` if it is empty.
    - Throws `TypeError` if `arg` is not empty.

**Example:**
```javascript
const emptyArray = [];
is.empty(emptyArray);    // Returns true
is.empty([1, 2, 3]);     // Returns false

as.empty(emptyArray);    // Returns emptyArray
as.empty([1, 2, 3]);     // Throws TypeError: Value is not empty
```

### NotEmpty
```javascript
is.notEmpty(value) -> true | false
as.notEmpty(value) -> value | TypeError: Value is empty
```
**Description:**

Checks if the provided argument is not empty.

- **is.notEmpty(arg):**
    - Returns `true` if `arg` is not empty.
    - Returns `false` otherwise.

- **as.notEmpty(arg):**
    - Returns `arg` if it is not empty.
    - Throws `TypeError` if `arg` is empty.

**Example:**
```javascript
const notEmptyArray = [1, 2, 3];
is.notEmpty(notEmptyArray);    // Returns true
is.notEmpty([]);               // Returns false

as.notEmpty(notEmptyArray);    // Returns notEmptyArray
as.notEmpty([]);               // Throws TypeError: Value is empty
```

### JSON
```javascript
is.json(value) -> true | false
as.json(value) -> value | TypeError: Value is not JSON
```
**Description:**

Checks if the provided argument is a valid JSON string.

- **is.json(arg):**
    - Returns `true` if `arg` is a valid JSON string.
    - Returns `false` otherwise.

- **

as.json(arg):**
- Returns `arg` if it is a valid JSON string.
- Throws `TypeError` if `arg` is not a valid JSON string.

**Example:**
```javascript
const jsonExample = JSON.stringify({ test: 'test' });
is.json(jsonExample);    // Returns true
is.json('not json');     // Returns false

as.json(jsonExample);    // Returns jsonExample
as.json('not json');     // Throws TypeError: Value is not JSON
```

### JSON5
```javascript
is.json5(value) -> true | false
as.json5(value) -> value | TypeError: Value is not JSON5
```
**Description:**

Checks if the provided argument is a valid JSON5 string.

- **is.json5(arg):**
    - Returns `true` if `arg` is a valid JSON5 string.
    - Returns `false` otherwise.

- **as.json5(arg):**
    - Returns `arg` if it is a valid JSON5 string.
    - Throws `TypeError` if `arg` is not a valid JSON5 string.

**Example:**
```javascript
const json5Example = '{property: "value"}';
is.json5(json5Example);    // Returns true
is.json5('not json5');     // Returns false

as.json5(json5Example);    // Returns json5Example
as.json5('not json5');     // Throws TypeError: Value is not JSON5
```

### Null
```javascript
is.null(value) -> true | false
as.null(value) -> value | TypeError: Value is not null
```
**Description:**

Checks if the provided argument is null.

- **is.null(arg):**
    - Returns `true` if `arg` is null.
    - Returns `false` otherwise.

- **as.null(arg):**
    - Returns `arg` if it is null.
    - Throws `TypeError` if `arg` is not null.

**Example:**
```javascript
const nullExample = null;
is.null(nullExample);    // Returns true
is.null('not null');     // Returns false

as.null(nullExample);    // Returns nullExample
as.null('not null');     // Throws TypeError: Value is not null
```


## Number Validators
Sure, I'll restructure the documentation as requested. Here is the first part of the updated documentation:

### Zero
```javascript
is.zero(value) -> true | false
as.zero(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is exactly zero.

- **is.zero(arg):**
    - Returns `true` if `arg` is `0`.
    - Returns `false` otherwise.

- **as.zero(arg):**
    - Returns `arg` if it is `0`.
    - Throws `TypeError` if `arg` is not `0`.

**Example:**
```javascript
is.zero(0);      // Returns true
is.zero(5);      // Returns false

as.zero(0);      // Returns 0
as.zero(5);      // Throws TypeError: Number is not a value that passed validation
```

### Even
```javascript
is.even(value) -> true | false
as.even(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is an even number.

- **is.even(arg):**
    - Returns `true` if `arg` is even.
    - Returns `false` otherwise.

- **as.even(arg):**
    - Returns `arg` if it is even.
    - Throws `TypeError` if `arg` is not even.

**Example:**
```javascript
is.even(2);      // Returns true
is.even(3);      // Returns false

as.even(2);      // Returns 2
as.even(3);      // Throws TypeError: Number is not a value that passed validation
```

### Odd
```javascript
is.odd(value) -> true | false
as.odd(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is an odd number.

- **is.odd(arg):**
    - Returns `true` if `arg` is odd.
    - Returns `false` otherwise.

- **as.odd(arg):**
    - Returns `arg` if it is odd.
    - Throws `TypeError` if `arg` is not odd.

**Example:**
```javascript
is.odd(1);      // Returns true
is.odd(4);      // Returns false

as.odd(1);      // Returns 1
as.odd(4);      // Throws TypeError: Number is not a value that passed validation
```

### Positive
```javascript
is.positive(value) -> true | false
as.positive(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a positive number.

- **is.positive(arg):**
    - Returns `true` if `arg` is positive.
    - Returns `false` otherwise.

- **as.positive(arg):**
    - Returns `arg` if it is positive.
    - Throws `TypeError` if `arg` is not positive.

**Example:**
```javascript
is.positive(1.1);      // Returns true
is.positive(-1.1);     // Returns false

as.positive(1.1);      // Returns 1.1
as.positive(-1.1);     // Throws TypeError: Number is not a value that passed validation
```

### Negative
```javascript
is.negative(value) -> true | false
as.negative(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a negative number.

- **is.negative(arg):**
    - Returns `true` if `arg` is negative.
    - Returns `false` otherwise.

- **as.negative(arg):**
    - Returns `arg` if it is negative.
    - Throws `TypeError` if `arg` is not negative.

**Example:**
```javascript
is.negative(-1.1);      // Returns true
is.negative(1.1);       // Returns false

as.negative(-1.1);      // Returns -1.1
as.negative(1.1);       // Throws TypeError: Number is not a value that passed validation
```

### Positive Integer
```javascript
is.positiveInteger(value) -> true | false
as.positiveInteger(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a positive integer.

- **is.positiveInteger(arg):**
    - Returns `true` if `arg` is a positive integer.
    - Returns `false` otherwise.

- **as.positiveInteger(arg):**
    - Returns `arg` if it is a positive integer.
    - Throws `TypeError` if `arg` is not a positive integer.

**Example:**
```javascript
is.positiveInteger(1);      // Returns true
is.positiveInteger(-1);     // Returns false

as.positiveInteger(1);      // Returns 1
as.positiveInteger(-1);     // Throws TypeError: Number is not a value that passed validation
```

### Negative Integer
```javascript
is.negativeInteger(value) -> true | false
as.negativeInteger(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a negative integer.

- **is.negativeInteger(arg):**
    - Returns `true` if `arg` is a negative integer.
    - Returns `false` otherwise.

- **as.negativeInteger(arg):**
    - Returns `arg` if it is a negative integer.
    - Throws `TypeError` if `arg` is not a negative integer.

**Example:**
```javascript
is.negativeInteger(-1);      // Returns true
is.negativeInteger(1);       // Returns false

as.negativeInteger(-1);      // Returns -1
as.negativeInteger(1);       // Throws TypeError: Number is not a value that passed validation
```

### Finite
```javascript
is.isFinite(value) -> true | false
as.isFinite(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a finite number.

- **is.isFinite(arg):**
    - Returns `true` if `arg` is finite.
    - Returns `false` otherwise.

- **as.isFinite(arg):**
    - Returns `arg` if it is finite.
    - Throws `TypeError` if `arg` is not finite.

**Example:**
```javascript
is.isFinite(0);      // Returns true
is.isFinite(Infinity); // Returns false

as.isFinite(0);      // Returns 0
as.isFinite(Infinity); // Throws TypeError: Number is not a value that passed validation
```

### NaN
```javascript
is.NaN(value) -> true | false
as.NaN(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is NaN (Not-a-Number).

- **is.NaN(arg):**
    - Returns `true` if `arg` is NaN.
    - Returns `false` otherwise.

- **as.NaN(arg):**
    - Returns `arg` if it is NaN.
    - Throws `TypeError` if `arg` is not NaN.

**Example:**
```javascript
is.NaN(NaN);      // Returns true
is.NaN(0);        // Returns false

as.NaN(NaN);      // Returns NaN
as.NaN(0);        // Throws TypeError: Number is not a value that passed validation
```

### Between
```javascript
is.between({ arg, min, max }) -> true | false
as.between({ arg, min, max }) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is between `min` and `max` values.

- **is.between({ arg, min, max }):**
    - Returns `true` if `arg` is between `min` and `max`.
    - Returns `false` otherwise.

- **as.between({ arg, min, max }):**
    - Returns `arg` if it is between `min` and `max`.
    - Throws `TypeError` if `arg` is not between `min` and `max`.

**Example:**
```javascript
is.between({ arg: 5, min: 0, max: 10 });  // Returns true
is.between({ arg: 15, min: 0, max: 10 }); // Returns false

as.between({ arg: 5, min: 0, max: 10 });  // Returns 5
as.between({ arg: 15, min: 0, max: 10 }); // Throws TypeError: Number is not a value that passed validation
```

### Greater
```javascript
is.greater({ arg, value }) -> true | false
as.greater({ arg, value }) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is greater than the specified value.

- **is.greater({ arg, value }):**
    - Returns `true` if `arg` is greater than `value`.
    - Returns `

false` otherwise.

- **as.greater({ arg, value }):**
    - Returns `arg` if it is greater than `value`.
    - Throws `TypeError` if `arg` is not greater than `value`.

**Example:**
```javascript
is.greater({ arg: 15, value: 5 });  // Returns true
is.greater({ arg: 5, value: 15 });  // Returns false

as.greater({ arg: 15, value: 5 });  // Returns 15
as.greater({ arg: 5, value: 15 });  // Throws TypeError: Number is not a value that passed validation
```

### Less
```javascript
is.less({ arg, value }) -> true | false
as.less({ arg, value }) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is less than the specified value.

- **is.less({ arg, value }):**
    - Returns `true` if `arg` is less than `value`.
    - Returns `false` otherwise.

- **as.less({ arg, value }):**
    - Returns `arg` if it is less than `value`.
    - Throws `TypeError` if `arg` is not less than `value`.

**Example:**
```javascript
is.less({ arg: 5, value: 15 });  // Returns true
is.less({ arg: 15, value: 5 });  // Returns false

as.less({ arg: 5, value: 15 });  // Returns 5
as.less({ arg: 15, value: 5 });  // Throws TypeError: Number is not a value that passed validation
```

### Equal or Greater
```javascript
is.equalGreater({ arg, value }) -> true | false
as.equalGreater({ arg, value }) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is equal to or greater than the specified value.

- **is.equalGreater({ arg, value }):**
    - Returns `true` if `arg` is equal to or greater than `value`.
    - Returns `false` otherwise.

- **as.equalGreater({ arg, value }):**
    - Returns `arg` if it is equal to or greater than `value`.
    - Throws `TypeError` if `arg` is not equal to or greater than `value`.

**Example:**
```javascript
is.equalGreater({ arg: 5, value: 5 });  // Returns true
is.equalGreater({ arg: 4, value: 5 });  // Returns false

as.equalGreater({ arg: 5, value: 5 });  // Returns 5
as.equalGreater({ arg: 4, value: 5 });  // Throws TypeError: Number is not a value that passed validation
```

### Equal or Less
```javascript
is.equalLess({ arg, value }) -> true | false
as.equalLess({ arg, value }) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is equal to or less than the specified value.

- **is.equalLess({ arg, value }):**
    - Returns `true` if `arg` is equal to or less than `value`.
    - Returns `false` otherwise.

- **as.equalLess({ arg, value }):**
    - Returns `arg` if it is equal to or less than `value`.
    - Throws `TypeError` if `arg` is not equal to or less than `value`.

**Example:**
```javascript
is.equalLess({ arg: 5, value: 5 });  // Returns true
is.equalLess({ arg: 6, value: 5 });  // Returns false

as.equalLess({ arg: 5, value: 5 });  // Returns 5
as.equalLess({ arg: 6, value: 5 });  // Throws TypeError: Number is not a value that passed validation
```

### Max
```javascript
is.max({ arg, value }) -> true | false
as.max({ arg, value }) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is equal to the specified maximum value.

- **is.max({ arg, value }):**
    - Returns `true` if `arg` is equal to the maximum `value`.
    - Returns `false` otherwise.

- **as.max({ arg, value }):**
    - Returns `arg` if it is equal to the maximum `value`.
    - Throws `TypeError` if `arg` is not equal to the maximum `value`.

**Example:**
```javascript
is.max({ arg: 5, value: 5 });  // Returns true
is.max({ arg: 4, value: 5 });  // Returns false

as.max({ arg: 5, value: 5 });  // Returns 5
as.max({ arg: 4, value: 5 });  // Throws TypeError: Number is not a value that passed validation
```

### Min
```javascript
is.min({ arg, value }) -> true | false
as.min({ arg, value }) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is equal to the specified minimum value.

- **is.min({ arg, value }):**
    - Returns `true` if `arg` is equal to the minimum `value`.
    - Returns `false` otherwise.

- **as.min({ arg, value }):**
    - Returns `arg` if it is equal to the minimum `value`.
    - Throws `TypeError` if `arg` is not equal to the minimum `value`.

**Example:**
```javascript
is.min({ arg: 5, value: 5 });  // Returns true
is.min({ arg: 6, value: 5 });  // Returns false

as.min({ arg: 5, value: 5 });  // Returns 5
as.min({ arg: 6, value: 5 });  // Throws TypeError: Number is not a value that passed validation
```

### Multiple
```javascript
is.multiple({ arg, value }) -> true | false
as.multiple({ arg, value }) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a multiple of the specified value.

- **is.multiple({ arg, value }):**
    - Returns `true` if `arg` is a multiple of `value`.
    - Returns `false` otherwise.

- **as.multiple({ arg, value }):**
    - Returns `arg` if it is a multiple of `value`.
    - Throws `TypeError` if `arg` is not a multiple of `value`.

**Example:**
```javascript
is.multiple({ arg: 15, value: 5 });  // Returns true
is.multiple({ arg: 14, value: 5 });  // Returns false

as.multiple({ arg: 15, value: 5 });  // Returns 15
as.multiple({ arg: 14, value: 5 });  // Throws TypeError: Number is not a value that passed validation
```

### Port
```javascript
is.port(value) -> true | false
as.port(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a valid port number (between 0 and 65535).

- **is.port(arg):**
    - Returns `true` if `arg` is a valid port number.
    - Returns `false` otherwise.

- **as.port(arg):**
    - Returns `arg` if it is a valid port number.
    - Throws `TypeError` if `arg` is not a valid port number.

**Example:**
```javascript
is.port(80);      // Returns true
is.port(70000);   // Returns false

as.port(80);      // Returns 80
as.port(70000);   // Throws TypeError: Number is not a value that passed validation
```

### Safe Integer
```javascript
is.safe(value) -> true | false
as.safe(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a safe integer (within the range of `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`).

- **is.safe(arg):**
    - Returns `true` if `arg` is a safe integer.
    - Returns `false` otherwise.

- **as.safe(arg):**
    - Returns `arg` if it is a safe integer.
    - Throws `TypeError` if `arg` is not a safe integer.

**Example:**
```javascript
is.safe(Number.MAX_SAFE_INTEGER);      // Returns true
is.safe(Number.MAX_SAFE_INTEGER + 1);  // Returns false

as.safe(Number.MAX_SAFE_INTEGER);      // Returns Number.MAX_SAFE_INTEGER
as.safe(Number.MAX_SAFE_INTEGER + 1);  // Throws TypeError: Number is not a value that passed validation
```

### Precision
```javascript
is.precision({ arg, value }) -> true | false
as.precision({ arg, value }) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument has the specified precision `value`.

- **is.precision({ arg, value }):**
    - Returns `true

` if `arg` has the specified precision `value`.
- Returns `false` otherwise.

- **as.precision({ arg, value }):**
    - Returns `arg` if it has the specified precision `value`.
    - Throws `TypeError` if `arg` does not have the specified precision `value`.

**Example:**
```javascript
is.precision({ arg: 5.22, value: 2 });  // Returns true
is.precision({ arg: 5.2, value: 2 });   // Returns false

as.precision({ arg: 5.22, value: 2 });  // Returns 5.22
as.precision({ arg: 5.2, value: 2 });   // Throws TypeError: Number is not a value that passed validation
```

### Digits
```javascript
is.digits({ arg, value }) -> true | false
as.digits({ arg, value }) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument has the specified number of digits `value`.

- **is.digits({ arg, value }):**
    - Returns `true` if `arg` has the specified number of digits `value`.
    - Returns `false` otherwise.

- **as.digits({ arg, value }):**
    - Returns `arg` if it has the specified number of digits `value`.
    - Throws `TypeError` if `arg` does not have the specified number of digits `value`.

**Example:**
```javascript
is.digits({ arg: 12345, value: 5 });  // Returns true
is.digits({ arg: 1234, value: 5 });   // Returns false

as.digits({ arg: 12345, value: 5 });  // Returns 12345
as.digits({ arg: 1234, value: 5 });   // Throws TypeError: Number is not a value that passed validation
```

### ISBN-10
```javascript
is.ISBN10(value) -> true | false
as.ISBN10(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a valid ISBN-10 number.

- **is.ISBN10(arg):**
    - Returns `true` if `arg` is a valid ISBN-10 number.
    - Returns `false` otherwise.

- **as.ISBN10(arg):**
    - Returns `arg` if it is a valid ISBN-10 number.
    - Throws `TypeError` if `arg` is not a valid ISBN-10 number.

**Example:**
```javascript
is.ISBN10(1234567890);  // Returns true
is.ISBN10(123456789);   // Returns false

as.ISBN10(1234567890);  // Returns 1234567890
as.ISBN10(123456789);   // Throws TypeError: Number is not a value that passed validation
```

### ISBN-13
```javascript
is.ISBN13(value) -> true | false
as.ISBN13(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a valid ISBN-13 number.

- **is.ISBN13(arg):**
    - Returns `true` if `arg` is a valid ISBN-13 number.
    - Returns `false` otherwise.

- **as.ISBN13(arg):**
    - Returns `arg` if it is a valid ISBN-13 number.
    - Throws `TypeError` if `arg` is not a valid ISBN-13 number.

**Example:**
```javascript
is.ISBN13(1234567890123);  // Returns true
is.ISBN13(123456789012);   // Returns false

as.ISBN13(1234567890123);  // Returns 1234567890123
as.ISBN13(123456789012);   // Throws TypeError: Number is not a value that passed validation
```

### EAN
```javascript
is.EAN(value) -> true | false
as.EAN(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a valid EAN (European Article Number).

- **is.EAN(arg):**
    - Returns `true` if `arg` is a valid EAN.
    - Returns `false` otherwise.

- **as.EAN(arg):**
    - Returns `arg` if it is a valid EAN.
    - Throws `TypeError` if `arg` is not a valid EAN.

**Example:**
```javascript
is.EAN(1234567890123);  // Returns true
is.EAN(123456789012);   // Returns false

as.EAN(1234567890123);  // Returns 1234567890123
as.EAN(123456789012);   // Throws TypeError: Number is not a value that passed validation
```

### SSN
```javascript
is.SSN(value) -> true | false
as.SSN(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a valid SSN (Social Security Number).

- **is.SSN(arg):**
    - Returns `true` if `arg` is a valid SSN.
    - Returns `false` otherwise.

- **as.SSN(arg):**
    - Returns `arg` if it is a valid SSN.
    - Throws `TypeError` if `arg` is not a valid SSN.

**Example:**
```javascript
is.SSN(123456789);  // Returns true
is.SSN(12345678);   // Returns false

as.SSN(123456789);  // Returns 123456789
as.SSN(12345678);   // Throws TypeError: Number is not a value that passed validation
```

### VIN
```javascript
is.VIN(value) -> true | false
as.VIN(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a valid VIN (Vehicle Identification Number).

- **is.VIN(arg):**
    - Returns `true` if `arg` is a valid VIN.
    - Returns `false` otherwise.

- **as.VIN(arg):**
    - Returns `arg` if it is a valid VIN.
    - Throws `TypeError` if `arg` is not a valid VIN.

**Example:**
```javascript
is.VIN(12345678901234567);  // Returns true
is.VIN(1234567890123456);   // Returns false

as.VIN(12345678901234567);  // Returns 12345678901234567
as.VIN(1234567890123456);   // Throws TypeError: Number is not a value that passed validation
```

### INN-10
```javascript
is.INN10(value) -> true | false
as.INN10(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a valid INN (Individual Taxpayer Number) with 10 digits.

- **is.INN10(arg):**
    - Returns `true` if `arg` is a valid INN with 10 digits.
    - Returns `false` otherwise.

- **as.INN10(arg):**
    - Returns `arg` if it is a valid INN with 10 digits.
    - Throws `TypeError` if `arg` is not a valid INN with 10 digits.

**Example:**
```javascript
is.INN10(1234567890);  // Returns true
is.INN10(123456789);   // Returns false

as.INN10(1234567890);  // Returns 1234567890
as.INN10(123456789);   // Throws TypeError: Number is not a value that passed validation
```

### INN-12
```javascript
is.INN12(value) -> true | false
as.INN12(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a valid INN (Individual Taxpayer Number) with 12 digits.

- **is.INN12(arg):**
    - Returns `true` if `arg` is a valid INN with 12 digits.
    - Returns `false` otherwise.

- **as.INN12(arg):**
    - Returns `arg` if it is a valid INN with 12 digits.
    - Throws `TypeError` if `arg` is not a valid INN with 12 digits.

**Example:**
```javascript
is.INN12(123456789012);  // Returns true
is.INN12(12345678901);   // Returns false

as.INN12(123456789012);  // Returns 123456789012
as.INN12(12345678901);   // Throws TypeError: Number is not a value that passed validation
```

### GLN
```javascript
is.GLN(value) -> true | false
as.GLN(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a valid GLN (Global Location Number).

- **is.GLN(arg):**
    - Returns `true` if `arg` is

a valid GLN.
- Returns `false` otherwise.

- **as.GLN(arg):**
    - Returns `arg` if it is a valid GLN.
    - Throws `TypeError` if `arg` is not a valid GLN.

**Example:**
```javascript
is.GLN(1234567890123);  // Returns true
is.GLN(123456789012);   // Returns false

as.GLN(1234567890123);  // Returns 1234567890123
as.GLN(123456789012);   // Throws TypeError: Number is not a value that passed validation
```

### IMEI
```javascript
is.IMEI(value) -> true | false
as.IMEI(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a valid IMEI (International Mobile Equipment Identity).

- **is.IMEI(arg):**
    - Returns `true` if `arg` is a valid IMEI.
    - Returns `false` otherwise.

- **as.IMEI(arg):**
    - Returns `arg` if it is a valid IMEI.
    - Throws `TypeError` if `arg` is not a valid IMEI.

**Example:**
```javascript
is.IMEI(123456789012345);  // Returns true
is.IMEI(12345678901234);   // Returns false

as.IMEI(123456789012345);  // Returns 123456789012345
as.IMEI(12345678901234);   // Throws TypeError: Number is not a value that passed validation
```

### NPI
```javascript
is.NPI(value) -> true | false
as.NPI(value) -> value | TypeError: Number is not a value that passed validation
```
**Description:**

Checks if the provided argument is a valid NPI (National Provider Identifier).

- **is.NPI(arg):**
    - Returns `true` if `arg` is a valid NPI.
    - Returns `false` otherwise.

- **as.NPI(arg):**
    - Returns `arg` if it is a valid NPI.
    - Throws `TypeError` if `arg` is not a valid NPI.

**Example:**
```javascript
is.NPI(1234567890);  // Returns true
is.NPI(123456789);   // Returns false

as.NPI(1234567890);  // Returns 1234567890
as.NPI(123456789);   // Throws TypeError: Number is not a value that passed validation
```

## String Validators
Here is the restructured documentation for the string validation methods:

### Alphabetic
```javascript
is.alphabetic(value) -> true | false
as.alphabetic(value) -> value | TypeError: String is not alphabetic
```
**Description:**

Checks if the provided argument is an alphabetic string.

- **is.alphabetic(arg):**
    - Returns `true` if `arg` contains only alphabetic characters.
    - Returns `false` otherwise.

- **as.alphabetic(arg):**
    - Returns `arg` if it contains only alphabetic characters.
    - Throws `TypeError` if `arg` does not contain only alphabetic characters.

**Example:**
```javascript
is.alphabetic('hello');  // Returns true
is.alphabetic('hello123');  // Returns false

as.alphabetic('hello');  // Returns 'hello'
as.alphabetic('hello123');  // Throws TypeError: String is not alphabetic
```
### Digit
```javascript
is.digit(value) -> true | false
as.digit(value) -> value | TypeError: String is not digit
```
**Description:**

Checks if the provided argument is an digit string.

- **is.digit(arg):**
    - Returns `true` if `arg` contains only digit characters.
    - Returns `false` otherwise.

- **as.digit(arg):**
    - Returns `arg` if it contains only digit characters.
    - Throws `TypeError` if `arg` does not contain only digit characters.

**Example:**
```javascript
is.digit('123');  // Returns true
is.digit('hello123');  // Returns false

as.digit('123');  // Returns '123'
as.digit('hello123');  // Throws TypeError: String is not digit
```

### Lowercase
```javascript
is.lowercase(value) -> true | false
as.lowercase(value) -> value | TypeError: String is not lowercase
```
**Description:**

Checks if the provided argument is a lowercase string.

- **is.lowercase(arg):**
    - Returns `true` if `arg` is a lowercase string.
    - Returns `false` otherwise.

- **as.lowercase(arg):**
    - Returns `arg` if it is a lowercase string.
    - Throws `TypeError` if `arg` is not a lowercase string.

**Example:**
```javascript
is.lowercase('hello');  // Returns true
is.lowercase('Hello');  // Returns false

as.lowercase('hello');  // Returns 'hello'
as.lowercase('Hello');  // Throws TypeError: String is not lowercase
```

### Uppercase
```javascript
is.uppercase(value) -> true | false
as.uppercase(value) -> value | TypeError: String is not uppercase
```
**Description:**

Checks if the provided argument is an uppercase string.

- **is.uppercase(arg):**
    - Returns `true` if `arg` is an uppercase string.
    - Returns `false` otherwise.

- **as.uppercase(arg):**
    - Returns `arg` if it is an uppercase string.
    - Throws `TypeError` if `arg` is not an uppercase string.

**Example:**
```javascript
is.uppercase('HELLO');  // Returns true
is.uppercase('Hello');  // Returns false

as.uppercase('HELLO');  // Returns 'HELLO'
as.uppercase('Hello');  // Throws TypeError: String is not uppercase
```

### CamelCase
```javascript
is.camelCase(value) -> true | false
as.camelCase(value) -> value | TypeError: String is not camelCase
```
**Description:**

Checks if the provided argument is a camelCase string.

- **is.camelCase(arg):**
    - Returns `true` if `arg` is a camelCase string.
    - Returns `false` otherwise.

- **as.camelCase(arg):**
    - Returns `arg` if it is a camelCase string.
    - Throws `TypeError` if `arg` is not a camelCase string.

**Example:**
```javascript
is.camelCase('camelCase');  // Returns true
is.camelCase('CamelCase');  // Returns false

as.camelCase('camelCase');  // Returns 'camelCase'
as.camelCase('CamelCase');  // Throws TypeError: String is not camelCase
```

### snakeCase
```javascript
is.snakeCase(value) -> true | false
as.snakeCase(value) -> value | TypeError: String is not snakeCase
```
**Description:**

Checks if the provided argument is a snakeCase string.

- **is.snakeCase(arg):**
    - Returns `true` if `arg` is a snakeCase string.
    - Returns `false` otherwise.

- **as.snakeCase(arg):**
    - Returns `arg` if it is a snakeCase string.
    - Throws `TypeError` if `arg` is not a snakeCase string.

**Example:**
```javascript
is.snakeCase('snakeCase');  // Returns true
is.snakeCase('SnakeCase');   // Returns false

as.snakeCase('snakeCase');  // Returns 'snakeCase'
as.snakeCase('SnakeCase');   // Throws TypeError: String is not snakeCase
```

### Kebab-Case
```javascript
is.kebabCase(value) -> true | false
as.kebabCase(value) -> value | TypeError: String is not kebab-case
```
**Description:**

Checks if the provided argument is a kebab-case string.

- **is.kebabCase(arg):**
    - Returns `true` if `arg` is a kebab-case string.
    - Returns `false` otherwise.

- **as.kebabCase(arg):**
    - Returns `arg` if it is a kebab-case string.
    - Throws `TypeError` if `arg` is not a kebab-case string.

**Example:**
```javascript
is.kebabCase('kebab-case');  // Returns true
is.kebabCase('KebabCase');   // Returns false

as.kebabCase('kebab-case');  // Returns 'kebab-case'
as.kebabCase('KebabCase');   // Throws TypeError: String is not kebab-case
```

### Train-Case
```javascript
is.trainCase(value) -> true | false
as.trainCase(value) -> value | TypeError: String is not train-case
```
**Description:**

Checks if the provided argument is a train-Case string.

- **is.trainCase(arg):**
    - Returns `true` if `arg` is a train-Case string.
    - Returns `false` otherwise.

- **as.trainCase(arg):**
    - Returns `arg` if it is a train-Case string.
    - Throws `TypeError` if `arg` is not a train-Case string.

**Example:**
```javascript
is.trainCase('Train-Case');  // Returns true
is.trainCase('train-case');  // Returns false

as.trainCase('Train-Case');  // Returns 'Train-Case'
as.trainCase('train-case');  // Throws TypeError: String is not train-case
```

### Path
```javascript
is.path(value) -> true | false
as.path(value) -> value | TypeError: String is not a valid path
```
**Description:**

Checks if the provided argument is a valid path.

- **is.path(arg):**
    - Returns `true` if `arg` is a valid path.
    - Returns `false` otherwise.

- **as.path(arg):**
    - Returns `arg` if it is a valid path.
    - Throws `TypeError` if `arg` is not a valid path.

**Example:**
```javascript
is.path('/user/home');  // Returns true
is.path('invalid//path');  // Returns false

as.path('/user/home');  // Returns '/user/home'
as.path('invalid//path');  // Throws TypeError: String is not a valid path
```

### UUID
```javascript
is.uuid(value) -> true | false
as.uuid(value) -> value | TypeError: String is not a valid UUID
```
**Description:**

Checks if the provided argument is a valid UUID.

- **is.uuid(arg):**
    - Returns `true` if `arg` is a valid UUID.
    - Returns `false` otherwise.

- **as.uuid(arg):**
    - Returns `arg` if it is a valid UUID.
    - Throws `TypeError` if `arg` is not a valid UUID.

**Example:**
```javascript
is.uuid('123e4567-e89b-12d3-a456-426614174000');  // Returns true
is.uuid('invalid-uuid');  // Returns false

as.uuid('123e4567-e89b-12d3-a456-426614174000');  // Returns '123e4567-e89b-12d3-a456-426614174000'
as.uuid('invalid-uuid');  // Throws TypeError: String is not a valid UUID
```

### HTTP URL
```javascript
is.http(value) -> true | false
as.http(value) -> value | TypeError: String is not a valid HTTP URL
```
**Description:**

Checks if the provided argument is a valid HTTP URL.

- **is.http(arg):**
    - Returns `true` if `arg` is a valid HTTP URL.
    - Returns `false` otherwise.

- **as.http(arg):**
    - Returns `arg` if it is a valid HTTP URL.
    - Throws `TypeError` if `arg` is not a valid HTTP URL.

**Example:**
```javascript
is.http('http://example.com');  // Returns true
is.http('https://example.com');  // Returns false

as.http('http://example.com');  // Returns 'http://example.com'
as.http('https://example.com');  // Throws TypeError: String is not a valid HTTP URL
```

### HTTPS URL
```javascript
is.https(value) -> true | false
as.https(value) -> value | TypeError: String is not a valid HTTPS URL
```
**Description:**

Checks if the provided argument is a valid HTTPS URL.

- **is.https(arg):**
    - Returns `true` if `arg` is a valid HTTPS URL.
    - Returns `false` otherwise

.

- **as.https(arg):**
    - Returns `arg` if it is a valid HTTPS URL.
    - Throws `TypeError` if `arg` is not a valid HTTPS URL.

**Example:**
```javascript
is.https('https://example.com');  // Returns true
is.https('http://example.com');  // Returns false

as.https('https://example.com');  // Returns 'https://example.com'
as.https('http://example.com');  // Throws TypeError: String is not a valid HTTPS URL
```

### URL
```javascript
is.url(value) -> true | false
as.url(value) -> value | TypeError: String is not a valid URL
```
**Description:**

Checks if the provided argument is a valid URL.

- **is.url(arg):**
    - Returns `true` if `arg` is a valid URL.
    - Returns `false` otherwise.

- **as.url(arg):**
    - Returns `arg` if it is a valid URL.
    - Throws `TypeError` if `arg` is not a valid URL.

**Example:**
```javascript
is.url('https://example.com');  // Returns true
is.url('invalid-url');  // Returns false

as.url('https://example.com');  // Returns 'https://example.com'
as.url('invalid-url');  // Throws TypeError: String is not a valid URL
```

### Email
```javascript
is.email(value) -> true | false
as.email(value) -> value | TypeError: String is not a valid email address
```
**Description:**

Checks if the provided argument is a valid email address.

- **is.email(arg):**
    - Returns `true` if `arg` is a valid email address.
    - Returns `false` otherwise.

- **as.email(arg):**
    - Returns `arg` if it is a valid email address.
    - Throws `TypeError` if `arg` is not a valid email address.

**Example:**
```javascript
is.email('user@example.com');  // Returns true
is.email('user@invalid');  // Returns false

as.email('user@example.com');  // Returns 'user@example.com'
as.email('user@invalid');  // Throws TypeError: String is not a valid email address
```

### IPv4
```javascript
is.ipv4(value) -> true | false
as.ipv4(value) -> value | TypeError: String is not a valid IPv4 address
```
**Description:**

Checks if the provided argument is a valid IPv4 address.

- **is.ipv4(arg):**
    - Returns `true` if `arg` is a valid IPv4 address.
    - Returns `false` otherwise.

- **as.ipv4(arg):**
    - Returns `arg` if it is a valid IPv4 address.
    - Throws `TypeError` if `arg` is not a valid IPv4 address.

**Example:**
```javascript
is.ipv4('192.168.0.1');  // Returns true
is.ipv4('999.999.999.999');  // Returns false

as.ipv4('192.168.0.1');  // Returns '192.168.0.1'
as.ipv4('999.999.999.999');  // Throws TypeError: String is not a valid IPv4 address
```

### IPv6
```javascript
is.ipv6(value) -> true | false
as.ipv6(value) -> value | TypeError: String is not a valid IPv6 address
```
**Description:**

Checks if the provided argument is a valid IPv6 address.

- **is.ipv6(arg):**
    - Returns `true` if `arg` is a valid IPv6 address.
    - Returns `false` otherwise.

- **as.ipv6(arg):**
    - Returns `arg` if it is a valid IPv6 address.
    - Throws `TypeError` if `arg` is not a valid IPv6 address.

**Example:**
```javascript
is.ipv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334');  // Returns true
is.ipv6('invalid-ipv6');  // Returns false

as.ipv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334');  // Returns '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
as.ipv6('invalid-ipv6');  // Throws TypeError: String is not a valid IPv6 address
```

### IP
```javascript
is.ip(value) -> true | false
as.ip(value) -> value | TypeError: String is not a valid IP address
```
**Description:**

Checks if the provided argument is a valid IP address (either IPv4 or IPv6).

- **is.ip(arg):**
    - Returns `true` if `arg` is a valid IP address.
    - Returns `false` otherwise.

- **as.ip(arg):**
    - Returns `arg` if it is a valid IP address.
    - Throws `TypeError` if `arg` is not a valid IP address.

**Example:**
```javascript
is.ip('192.168.0.1');  // Returns true
is.ip('2001:0db8:85a3:0000:0000:8a2e:0370:7334');  // Returns true
is.ip('invalid-ip');  // Returns false

as.ip('192.168.0.1');  // Returns '192.168.0.1'
as.ip('2001:0db8:85a3:0000:0000:8a2e:0370:7334');  // Returns '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
as.ip('invalid-ip');  // Throws TypeError: String is not a valid IP address
```

### File Extension
```javascript
is.fileExtension(value) -> true | false
as.fileExtension(value) -> value | TypeError: String is not a valid file extension
```
**Description:**

Checks if the provided argument is a valid file extension.

- **is.fileExtension(arg):**
    - Returns `true` if `arg` is a valid file extension.
    - Returns `false` otherwise.

- **as.fileExtension(arg):**
    - Returns `arg` if it is a valid file extension.
    - Throws `TypeError` if `arg` is not a valid file extension.

**Example:**
```javascript
is.fileExtension('.txt');  // Returns true
is.fileExtension('txt');  // Returns false

as.fileExtension('.txt');  // Returns '.txt'
as.fileExtension('txt');  // Throws TypeError: String is not a valid file extension
```

### Hex Color
```javascript
is.hexColor(value) -> true | false
as.hexColor(value) -> value | TypeError: String is not a valid hex color
```
**Description:**

Checks if the provided argument is a valid hex color code.

- **is.hexColor(arg):**
    - Returns `true` if `arg` is a valid hex color code.
    - Returns `false` otherwise.

- **as.hexColor(arg):**
    - Returns `arg` if it is a valid hex color code.
    - Throws `TypeError` if `arg` is not a valid hex color code.

**Example:**
```javascript
is.hexColor('#ff00ff');  // Returns true
is.hexColor('ff00ff');  // Returns false

as.hexColor('#ff00ff');  // Returns '#ff00ff'
as.hexColor('ff00ff');  // Throws TypeError: String is not a valid hex color
```

### Base64
```javascript
is.base64(value) -> true | false
as.base64(value) -> value | TypeError: String is not a valid base64 string
```
**Description:**

Checks if the provided argument is a valid base64 encoded string.

- **is.base64(arg):**
    - Returns `true` if `arg` is a valid base64 encoded string.
    - Returns `false` otherwise.

- **as.base64(arg):**
    - Returns `arg` if it is a valid base64 encoded string.
    - Throws `TypeError` if `arg` is not a valid base64 encoded string.

**Example:**
```javascript
is.base64('dGhpcyBpcyBhIHRlc3Q=');  // Returns true
is.base64('invalid-base64');  // Returns false

as.base64('dGhpcyBpcyBhIHRlc3Q=');  // Returns 'dGhpcyBpcyBhIHRlc3Q='
as.base64('invalid-base64');  // Throws TypeError: String is not a valid base64 string
```

### Data URL
```javascript
is.dataURL(value) -> true | false
as.dataURL(value) -> value | TypeError: String is not a valid data URL
```
**Description:**

Checks if the provided argument is a valid data URL.

- **is.dataURL(arg):**
    - Returns `true` if `arg` is a valid data URL.
    - Returns `false` otherwise.

- **as.dataURL(arg):**
    - Returns `arg` if it is a valid data

URL.
- Throws `TypeError` if `arg` is not a valid data URL.

**Example:**
```javascript
is.dataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA');  // Returns true
is.dataURL('invalid-data-url');  // Returns false

as.dataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA');  // Returns 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA'
as.dataURL('invalid-data-url');  // Throws TypeError: String is not a valid data URL
```

### Credit Card
```javascript
is.creditCard(value) -> true | false
as.creditCard(value) -> value | TypeError: String is not a valid credit card number
```
**Description:**

Checks if the provided argument is a valid credit card number.

- **is.creditCard(arg):**
    - Returns `true` if `arg` is a valid credit card number.
    - Returns `false` otherwise.

- **as.creditCard(arg):**
    - Returns `arg` if it is a valid credit card number.
    - Throws `TypeError` if `arg` is not a valid credit card number.

**Example:**
```javascript
is.creditCard('4111111111111111');  // Returns true
is.creditCard('1234567890123456');  // Returns false

as.creditCard('4111111111111111');  // Returns '4111111111111111'
as.creditCard('1234567890123456');  // Throws TypeError: String is not a valid credit card number
```

### MasterCard
```javascript
is.masterCard(value) -> true | false
as.masterCard(value) -> value | TypeError: String is not a valid MasterCard number
```
**Description:**

Checks if the provided argument is a valid MasterCard number.

- **is.masterCard(arg):**
    - Returns `true` if `arg` is a valid MasterCard number.
    - Returns `false` otherwise.

- **as.masterCard(arg):**
    - Returns `arg` if it is a valid MasterCard number.
    - Throws `TypeError` if `arg` is not a valid MasterCard number.

**Example:**
```javascript
is.masterCard('5555555555554444');  // Returns true
is.masterCard('1234567890123456');  // Returns false

as.masterCard('5555555555554444');  // Returns '5555555555554444'
as.masterCard('1234567890123456');  // Throws TypeError: String is not a valid MasterCard number
```

### Visa
```javascript
is.visa(value) -> true | false
as.visa(value) -> value | TypeError: String is not a valid Visa number
```
**Description:**

Checks if the provided argument is a valid Visa number.

- **is.visa(arg):**
    - Returns `true` if `arg` is a valid Visa number.
    - Returns `false` otherwise.

- **as.visa(arg):**
    - Returns `arg` if it is a valid Visa number.
    - Throws `TypeError` if `arg` is not a valid Visa number.

**Example:**
```javascript
is.visa('4111111111111111');  // Returns true
is.visa('1234567890123456');  // Returns false

as.visa('4111111111111111');  // Returns '4111111111111111'
as.visa('1234567890123456');  // Throws TypeError: String is not a valid Visa number
```

### American Express
```javascript
is.americanExpress(value) -> true | false
as.americanExpress(value) -> value | TypeError: String is not a valid American Express number
```
**Description:**

Checks if the provided argument is a valid American Express number.

- **is.americanExpress(arg):**
    - Returns `true` if `arg` is a valid American Express number.
    - Returns `false` otherwise.

- **as.americanExpress(arg):**
    - Returns `arg` if it is a valid American Express number.
    - Throws `TypeError` if `arg` is not a valid American Express number.

**Example:**
```javascript
is.americanExpress('378282246310005');  // Returns true
is.americanExpress('123456789012345');  // Returns false

as.americanExpress('378282246310005');  // Returns '378282246310005'
as.americanExpress('123456789012345');  // Throws TypeError: String is not a valid American Express number
```

### Diners Club
```javascript
is.dinersClub(value) -> true | false
as.dinersClub(value) -> value | TypeError: String is not a valid Diners Club number
```
**Description:**

Checks if the provided argument is a valid Diners Club number.

- **is.dinersClub(arg):**
    - Returns `true` if `arg` is a valid Diners Club number.
    - Returns `false` otherwise.

- **as.dinersClub(arg):**
    - Returns `arg` if it is a valid Diners Club number.
    - Throws `TypeError` if `arg` is not a valid Diners Club number.

**Example:**
```javascript
is.dinersClub('30569309025904');  // Returns true
is.dinersClub('12345678901234');  // Returns false

as.dinersClub('30569309025904');  // Returns '30569309025904'
as.dinersClub('12345678901234');  // Throws TypeError: String is not a valid Diners Club number
```

### Domain
```javascript
is.domain(value) -> true | false
as.domain(value) -> value | TypeError: String is not a valid domain
```
**Description:**

Checks if the provided argument is a valid domain.

- **is.domain(arg):**
    - Returns `true` if `arg` is a valid domain.
    - Returns `false` otherwise.

- **as.domain(arg):**
    - Returns `arg` if it is a valid domain.
    - Throws `TypeError` if `arg` is not a valid domain.

**Example:**
```javascript
is.domain('example.com');  // Returns true
is.domain('invalid_domain');  // Returns false

as.domain('example.com');  // Returns 'example.com'
as.domain('invalid_domain');  // Throws TypeError: String is not a valid domain
```

### GUID
```javascript
is.guid(value) -> true | false
as.guid(value) -> value | TypeError: String is not a valid GUID
```
**Description:**

Checks if the provided argument is a valid GUID.

- **is.guid(arg):**
    - Returns `true` if `arg` is a valid GUID.
    - Returns `false` otherwise.

- **as.guid(arg):**
    - Returns `arg` if it is a valid GUID.
    - Throws `TypeError` if `arg` is not a valid GUID.

**Example:**
```javascript
is.guid('123e4567-e89b-12d3-a456-426614174000');  // Returns true
is.guid('invalid_guid');  // Returns false

as.guid('123e4567-e89b-12d3-a456-426614174000');  // Returns '123e4567-e89b-12d3-a456-426614174000'
as.guid('invalid_guid');  // Throws TypeError: String is not a valid GUID
```

### Hostname
```javascript
is.hostname(value) -> true | false
as.hostname(value) -> value | TypeError: String is not a valid hostname
```
**Description:**

Checks if the provided argument is a valid hostname.

- **is.hostname(arg):**
    - Returns `true` if `arg` is a valid hostname.
    - Returns `false` otherwise.

- **as.hostname(arg):**
    - Returns `arg` if it is a valid hostname.
    - Throws `TypeError` if `arg` is not a valid hostname.

**Example:**
```javascript
is.hostname('example.com');  // Returns true
is.hostname('invalid_hostname');  // Returns false

as.hostname('example.com');  // Returns 'example.com'
as.hostname('invalid_hostname');  // Throws TypeError: String is not a valid hostname
```

### ISO Date
```javascript
is.isoDate(value) -> true | false
as.isoDate(value) -> value | TypeError: String is not a valid ISO date
```
**Description:**

Checks if the provided argument is a valid ISO date.

- **is.isoDate(arg):**
    - Returns `true` if `arg` is a valid ISO date.
    - Returns `false` otherwise.

- **as.isoDate(arg):**
    - Returns `arg` if it is a valid ISO date.
    - Throws `TypeError` if `arg` is not a valid ISO date.

**Example:**
```javascript
is.isoDate('2021-12-03T10:15:30Z');  // Returns true
is.isoDate('invalid_date');  // Returns false

as.isoDate('2021-12-03T10:15:30Z');  // Returns '2021-12-03T10:15:30Z'
as.isoDate('invalid_date');  // Throws TypeError: String is not a valid ISO date


```

### ISO Duration
```javascript
is.isoDuration(value) -> true | false
as.isoDuration(value) -> value | TypeError: String is not a valid ISO duration
```
**Description:**

Checks if the provided argument is a valid ISO duration.

- **is.isoDuration(arg):**
    - Returns `true` if `arg` is a valid ISO duration.
    - Returns `false` otherwise.

- **as.isoDuration(arg):**
    - Returns `arg` if it is a valid ISO duration.
    - Throws `TypeError` if `arg` is not a valid ISO duration.

**Example:**
```javascript
is.isoDuration('P3Y6M4DT12H30M5S');  // Returns true
is.isoDuration('invalid_duration');  // Returns false

as.isoDuration('P3Y6M4DT12H30M5S');  // Returns 'P3Y6M4DT12H30M5S'
as.isoDuration('invalid_duration');  // Throws TypeError: String is not a valid ISO duration
```

### JWT
```javascript
is.jwt(value) -> true | false
as.jwt(value) -> value | TypeError: String is not a valid JWT
```
**Description:**

Checks if the provided argument is a valid JWT.

- **is.jwt(arg):**
    - Returns `true` if `arg` is a valid JWT.
    - Returns `false` otherwise.

- **as.jwt(arg):**
    - Returns `arg` if it is a valid JWT.
    - Throws `TypeError` if `arg` is not a valid JWT.

**Example:**
```javascript
is.jwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');  // Returns true
is.jwt('invalid_jwt');  // Returns false

as.jwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');  // Returns the JWT
as.jwt('invalid_jwt');  // Throws TypeError: String is not a valid JWT
```

### Emoji
```javascript
is.emoji(value) -> true | false
as.emoji(value) -> value | TypeError: String is not a valid emoji
```
**Description:**

Checks if the provided argument is a valid emoji.

- **is.emoji(arg):**
    - Returns `true` if `arg` is a valid emoji.
    - Returns `false` otherwise.

- **as.emoji(arg):**
    - Returns `arg` if it is a valid emoji.
    - Throws `TypeError` if `arg` is not a valid emoji.

**Example:**
```javascript
is.emoji('😊');  // Returns true
is.emoji('not_emoji');  // Returns false

as.emoji('😊');  // Returns '😊'
as.emoji('not_emoji');  // Throws TypeError: String is not a valid emoji
```

### Nanoid
```javascript
is.nanoid(value) -> true | false
as.nanoid(value) -> value | TypeError: String is not a valid nanoid
```
**Description:**

Checks if the provided argument is a valid nanoid.

- **is.nanoid(arg):**
    - Returns `true` if `arg` is a valid nanoid.
    - Returns `false` otherwise.

- **as.nanoid(arg):**
    - Returns `arg` if it is a valid nanoid.
    - Throws `TypeError` if `arg` is not a valid nanoid.

**Example:**
```javascript
is.nanoid('V1StGXR8_Z5jdHi6B-myT');  // Returns true
is.nanoid('invalid_nanoid');  // Returns false

as.nanoid('V1StGXR8_Z5jdHi6B-myT');  // Returns 'V1StGXR8_Z5jdHi6B-myT'
as.nanoid('invalid_nanoid');  // Throws TypeError: String is not a valid nanoid
```

### CUID
```javascript
is.cuid(value) -> true | false
as.cuid(value) -> value | TypeError: String is not a valid CUID
```
**Description:**

Checks if the provided argument is a valid CUID.

- **is.cuid(arg):**
    - Returns `true` if `arg` is a valid CUID.
    - Returns `false` otherwise.

- **as.cuid(arg):**
    - Returns `arg` if it is a valid CUID.
    - Throws `TypeError` if `arg` is not a valid CUID.

**Example:**
```javascript
is.cuid('cjld2cjxh0000qzrmn831i7rn');  // Returns true
is.cuid('invalid_cuid');  // Returns false

as.cuid('cjld2cjxh0000qzrmn831i7rn');  // Returns 'cjld2cjxh0000qzrmn831i7rn'
as.cuid('invalid_cuid');  // Throws TypeError: String is not a valid CUID
```

### CUID2
```javascript
is.cuid2(value) -> true | false
as.cuid2(value) -> value | TypeError: String is not a valid CUID2
```
**Description:**

Checks if the provided argument is a valid CUID2.

- **is.cuid2(arg):**
    - Returns `true` if `arg` is a valid CUID2.
    - Returns `false` otherwise.

- **as.cuid2(arg):**
    - Returns `arg` if it is a valid CUID2.
    - Throws `TypeError` if `arg` is not a valid CUID2.

**Example:**
```javascript
is.cuid2('c9g2h0a8');  // Returns true
is.cuid2('invalid_cuid2');  // Returns false

as.cuid2('c9g2h0a8');  // Returns 'c9g2h0a8'
as.cuid2('invalid_cuid2');  // Throws TypeError: String is not a valid CUID2
```

### Excludes
```javascript
is.excludes({ arg: string, value: string }) -> true | false
as.excludes({ arg: string, value: string }) -> value | TypeError: String includes the excluded value
```
**Description:**

Checks if the provided argument excludes a given substring.

- **is.excludes({ arg, value }):**
    - Returns `true` if `arg` excludes `value`.
    - Returns `false` otherwise.

- **as.excludes({ arg, value }):**
    - Returns `arg` if it excludes `value`.
    - Throws `TypeError` if `arg` includes `value`.

**Example:**
```javascript
is.excludes({ arg: 'hello world', value: 'test' });  // Returns true
is.excludes({ arg: 'hello world', value: 'world' });  // Returns false

as.excludes({ arg: 'hello world', value: 'test' });  // Returns 'hello world'
as.excludes({ arg: 'hello world', value: 'world' });  // Throws TypeError: String includes the excluded value
```

### Time (HH:MM:SS)
```javascript
is.time(value) -> true | false
as.time(value) -> value | TypeError: String is not a valid time
```
**Description:**

Checks if the provided argument is a valid time in the format HH:MM:SS.

- **is.time(arg):**
    - Returns `true` if `arg` is a valid time.
    - Returns `false` otherwise.

- **as.time(arg):**
    - Returns `arg` if it is a valid time.
    - Throws `TypeError` if `arg` is not a valid time.

**Example:**
```javascript
is.time('12:34:56');  // Returns true
is.time('25:00:00');  // Returns false

as.time('12:34:56');  // Returns '12:34:56'
as.time('25:00:00');  // Throws TypeError: String is not a valid time
```

### DateTime (YYYY-MM-DDTHH:MM:SS)
```javascript
is.datetime(value) -> true | false
as.datetime(value) -> value | TypeError: String is not a valid datetime
```
**Description:**

Checks if the provided argument is a valid datetime in the format YYYY-MM-DDTHH:MM:SS.

- **is.datetime(arg):**
    - Returns `true` if `arg` is a valid datetime.
    - Returns `false` otherwise.

- **as.datetime(arg):**
    - Returns `

arg` if it is a valid datetime.
- Throws `TypeError` if `arg` is not a valid datetime.

**Example:**
```javascript
is.datetime('2018-01-04T05:52:20');  // Returns true
is.datetime('invalid_datetime');  // Returns false

as.datetime('2018-01-04T05:52:20');  // Returns '2018-01-04T05:52:20'
as.datetime('invalid_datetime');  // Throws TypeError: String is not a valid datetime
```

### Date (YYYY-MM-DD)
```javascript
is.date(value) -> true | false
as.date(value) -> value | TypeError: String is not a valid date
```
**Description:**

Checks if the provided argument is a valid date in the format YYYY-MM-DD.

- **is.date(arg):**
    - Returns `true` if `arg` is a valid date.
    - Returns `false` otherwise.

- **as.date(arg):**
    - Returns `arg` if it is a valid date.
    - Throws `TypeError` if `arg` is not a valid date.

**Example:**
```javascript
is.date('2021-12-03');  // Returns true
is.date('invalid_date');  // Returns false

as.date('2021-12-03');  // Returns '2021-12-03'
as.date('invalid_date');  // Throws TypeError: String is not a valid date
```

### SHA-256 Hash
```javascript
is.hash(value) -> true | false
as.hash(value) -> value | TypeError: String is not a valid SHA-256 hash
```
**Description:**

Checks if the provided argument is a valid SHA-256 hash.

- **is.hash(arg):**
    - Returns `true` if `arg` is a valid SHA-256 hash.
    - Returns `false` otherwise.

- **as.hash(arg):**
    - Returns `arg` if it is a valid SHA-256 hash.
    - Throws `TypeError` if `arg` is not a valid SHA-256 hash.

**Example:**
```javascript
is.hash('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');  // Returns true
is.hash('invalid_hash');  // Returns false

as.hash('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');  // Returns 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
as.hash('invalid_hash');  // Throws TypeError: String is not a valid SHA-256 hash
```

### ISO Time with Seconds
```javascript
is.isoTimeSecond(value) -> true | false
as.isoTimeSecond(value) -> value | TypeError: String is not a valid ISO time with seconds
```
**Description:**

Checks if the provided argument is a valid ISO time with seconds.

- **is.isoTimeSecond(arg):**
    - Returns `true` if `arg` is a valid ISO time with seconds.
    - Returns `false` otherwise.

- **as.isoTimeSecond(arg):**
    - Returns `arg` if it is a valid ISO time with seconds.
    - Throws `TypeError` if `arg` is not a valid ISO time with seconds.

**Example:**
```javascript
is.isoTimeSecond('T12:34:56');  // Returns true
is.isoTimeSecond('invalid_time');  // Returns false

as.isoTimeSecond('T12:34:56');  // Returns 'T12:34:56'
as.isoTimeSecond('invalid_time');  // Throws TypeError: String is not a valid ISO time with seconds
```

### ISO Timestamp
```javascript
is.isoTimestamp(value) -> true | false
as.isoTimestamp(value) -> value | TypeError: String is not a valid ISO timestamp
```
**Description:**

Checks if the provided argument is a valid ISO timestamp.

- **is.isoTimestamp(arg):**
    - Returns `true` if `arg` is a valid ISO timestamp.
    - Returns `false` otherwise.

- **as.isoTimestamp(arg):**
    - Returns `arg` if it is a valid ISO timestamp.
    - Throws `TypeError` if `arg` is not a valid ISO timestamp.

**Example:**
```javascript
is.isoTimestamp('2021-12-03T10:15:30Z');  // Returns true
is.isoTimestamp('invalid_timestamp');  // Returns false

as.isoTimestamp('2021-12-03T10:15:30Z');  // Returns '2021-12-03T10:15:30Z'
as.isoTimestamp('invalid_timestamp');  // Throws TypeError: String is not a valid ISO timestamp
```

### ISO Week
```javascript
is.isoWeek(value) -> true | false
as.isoWeek(value) -> value | TypeError: String is not a valid ISO week
```
**Description:**

Checks if the provided argument is a valid ISO week.

- **is.isoWeek(arg):**
    - Returns `true` if `arg` is a valid ISO week.
    - Returns `false` otherwise.

- **as.isoWeek(arg):**
    - Returns `arg` if it is a valid ISO week.
    - Throws `TypeError` if `arg` is not a valid ISO week.

**Example:**
```javascript
is.isoWeek('2021-W48');  // Returns true
is.isoWeek('invalid_week');  // Returns false

as.isoWeek('2021-W48');  // Returns '2021-W48'
as.isoWeek('invalid_week');  // Throws TypeError: String is not a valid ISO week
```

### MAC Address
```javascript
is.mac(value) -> true | false
as.mac(value) -> value | TypeError: String is not a valid MAC address
```
**Description:**

Checks if the provided argument is a valid MAC address.

- **is.mac(arg):**
    - Returns `true` if `arg` is a valid MAC address.
    - Returns `false` otherwise.

- **as.mac(arg):**
    - Returns `arg` if it is a valid MAC address.
    - Throws `TypeError` if `arg` is not a valid MAC address.

**Example:**
```javascript
is.mac('00:1B:44:11:3A:B7');  // Returns true
is.mac('invalid_mac');  // Returns false

as.mac('00:1B:44:11:3A:B7');  // Returns '00:1B:44:11:3A:B7'
as.mac('invalid_mac');  // Throws TypeError: String is not a valid MAC address
```

### MAC-48 Address
```javascript
is.mac48(value) -> true | false
as.mac48(value) -> value | TypeError: String is not a valid MAC-48 address
```
**Description:**

Checks if the provided argument is a valid MAC-48 address.

- **is.mac48(arg):**
    - Returns `true` if `arg` is a valid MAC-48 address.
    - Returns `false` otherwise.

- **as.mac48(arg):**
    - Returns `arg` if it is a valid MAC-48 address.
    - Throws `TypeError` if `arg` is not a valid MAC-48 address.

**Example:**
```javascript
is.mac48('00-1B-44-11-3A-B7');  // Returns true
is.mac48('invalid_mac');  // Returns false

as.mac48('00-1B-44-11-3A-B7');  // Returns '00-1B-44-11-3A-B7'
as.mac48('invalid_mac');  // Throws TypeError: String is not a valid MAC-48 address
```

### MAC-64 Address
```javascript
is.mac64(value) -> true | false
as.mac64(value) -> value | TypeError: String is not a valid MAC-64 address
```
**Description:**

Checks if the provided argument is a valid MAC-64 address.

- **is.mac64(arg):**
    - Returns `true` if `arg` is a valid MAC-64 address.
    - Returns `false` otherwise.

- **as.mac64(arg):**
    - Returns `arg` if it is a valid MAC-64 address.
    - Throws `TypeError` if `arg` is not a valid MAC-64 address.

**Example:**
```javascript
is.mac64('00-1B-44-11-3A-B7-44-11');  // Returns true
is.mac64('invalid_mac');  // Returns false

as.mac64('00-1B-44-11-3A-B7-44-11');  // Returns '00-1B-44-11-3A-B7-44-11'
as.mac64('invalid_mac');  // Throws TypeError: String is not a valid MAC-64 address
```

### Past Date
```javascript
is.past(value) -> true | false
as.past(value) -> value | TypeError: Date is not in the past
```
**Description:**

Checks if the provided argument is a date in the past.

- **is.past(arg):**
    - Returns `true` if `

arg` is a date in the past.
- Returns `false` otherwise.

- **as.past(arg):**
    - Returns `arg` if it is a date in the past.
    - Throws `TypeError` if `arg` is not a date in the past.

**Example:**
```javascript
is.past('2020-12-03T10:15:30Z');  // Returns true
is.past('2099-12-03T10:15:30Z');  // Returns false

as.past('2020-12-03T10:15:30Z');  // Returns '2020-12-03T10:15:30Z'
as.past('2099-12-03T10:15:30Z');  // Throws TypeError: Date is not in the past
```

### Future Date
```javascript
is.future(value) -> true | false
as.future(value) -> value | TypeError: Date is not in the future
```
**Description:**

Checks if the provided argument is a date in the future.

- **is.future(arg):**
    - Returns `true` if `arg` is a date in the future.
    - Returns `false` otherwise.

- **as.future(arg):**
    - Returns `arg` if it is a date in the future.
    - Throws `TypeError` if `arg` is not a date in the future.

**Example:**
```javascript
is.future('2099-12-03T10:15:30Z');  // Returns true
is.future('2020-12-03T10:15:30Z');  // Returns false

as.future('2099-12-03T10:15:30Z');  // Returns '2099-12-03T10:15:30Z'
as.future('2020-12-03T10:15:30Z');  // Throws TypeError: Date is not in the future
```

### ASCII String
```javascript
is.ascii(value) -> true | false
as.ascii(value) -> value | TypeError: String is not an ASCII string
```
**Description:**

Checks if the provided argument is an ASCII string.

- **is.ascii(arg):**
    - Returns `true` if `arg` is an ASCII string.
    - Returns `false` otherwise.

- **as.ascii(arg):**
    - Returns `arg` if it is an ASCII string.
    - Throws `TypeError` if `arg` is not an ASCII string.

**Example:**
```javascript
is.ascii('hello');  // Returns true
is.ascii('こんにちは');  // Returns false

as.ascii('hello');  // Returns 'hello'
as.ascii('こんにちは');  // Throws TypeError: String is not an ASCII string
```

### Base32
```javascript
is.base32(value) -> true | false
as.base32(value) -> value | TypeError: String is not a valid Base32 string
```
**Description:**

Checks if the provided argument is a valid Base32 encoded string.

- **is.base32(arg):**
    - Returns `true` if `arg` is a valid Base32 encoded string.
    - Returns `false` otherwise.

- **as.base32(arg):**
    - Returns `arg` if it is a valid Base32 encoded string.
    - Throws `TypeError` if `arg` is not a valid Base32 encoded string.

**Example:**
```javascript
is.base32('MZXW6YTBOI======');  // Returns true
is.base32('invalid_base32');  // Returns false

as.base32('MZXW6YTBOI======');  // Returns 'MZXW6YTBOI======'
as.base32('invalid_base32');  // Throws TypeError: String is not a valid Base32 string
```

### Base58
```javascript
is.base58(value) -> true | false
as.base58(value) -> value | TypeError: String is not a valid Base58 string
```
**Description:**

Checks if the provided argument is a valid Base58 encoded string.

- **is.base58(arg):**
    - Returns `true` if `arg` is a valid Base58 encoded string.
    - Returns `false` otherwise.

- **as.base58(arg):**
    - Returns `arg` if it is a valid Base58 encoded string.
    - Throws `TypeError` if `arg` is not a valid Base58 encoded string.

**Example:**
```javascript
is.base58('3mJr7AoUXx2Wqd');  // Returns true
is.base58('invalid_base58');  // Returns false

as.base58('3mJr7AoUXx2Wqd');  // Returns '3mJr7AoUXx2Wqd'
as.base58('invalid_base58');  // Throws TypeError: String is not a valid Base58 string
```

### Date Before Specific Date
```javascript
is.before({ arg: string, value: string }) -> true | false
as.before({ arg: string, value: string }) -> value | TypeError: Date is not before the specific date
```
**Description:**

Checks if the provided argument is a date before a specific date.

- **is.before({ arg, value }):**
    - Returns `true` if `arg` is before `value`.
    - Returns `false` otherwise.

- **as.before({ arg, value }):**
    - Returns `arg` if it is before `value`.
    - Throws `TypeError` if `arg` is not before `value`.

**Example:**
```javascript
is.before({ arg: '2021-12-03T10:15:30Z', value: '2022-01-01T00:00:00Z' });  // Returns true
is.before({ arg: '2023-01-01T00:00:00Z', value: '2022-01-01T00:00:00Z' });  // Returns false

as.before({ arg: '2021-12-03T10:15:30Z', value: '2022-01-01T00:00:00Z' });  // Returns '2021-12-03T10:15:30Z'
as.before({ arg: '2023-01-01T00:00:00Z', value: '2022-01-01T00:00:00Z' });  // Throws TypeError: Date is not before the specific date
```

### Date After Specific Date
```javascript
is.after({ arg: string, value: string }) -> true | false
as.after({ arg: string, value: string }) -> value | TypeError: Date is not after the specific date
```
**Description:**

Checks if the provided argument is a date after a specific date.

- **is.after({ arg, value }):**
    - Returns `true` if `arg` is after `value`.
    - Returns `false` otherwise.

- **as.after({ arg, value }):**
    - Returns `arg` if it is after `value`.
    - Throws `TypeError` if `arg` is not after `value`.

**Example:**
```javascript
is.after({ arg: '2023-01-01T00:00:00Z', value: '2022-01-01T00:00:00Z' });  // Returns true
is.after({ arg: '2021-12-03T10:15:30Z', value: '2022-01-01T00:00:00Z' });  // Returns false

as.after({ arg: '2023-01-01T00:00:00Z', value: '2022-01-01T00:00:00Z' });  // Returns '2023-01-01T00:00:00Z'
as.after({ arg: '2021-12-03T10:15:30Z', value: '2022-01-01T00:00:00Z' });  // Throws TypeError: Date is not after the specific date
```

### Maximum String Length
```javascript
is.maxStr({ arg: string, value: number }) -> true | false
as.maxStr({ arg: string, value: number }) -> value | TypeError: String length is not within the limit
```
**Description:**

Checks if the provided argument's length is less than or equal to a specific value.

- **is.maxStr({ arg, value }):**
    - Returns `true` if `arg` length is less than or equal to `value`.
    - Returns `false` otherwise.

- **as.maxStr({ arg, value }):**
    - Returns `arg` if its length is less than or equal to `value`.
    - Throws `TypeError` if `arg` length is greater than `value`.

**Example:**
```javascript
is.maxStr({ arg: '1234567890', value: 10 });  // Returns true
is.maxStr({ arg: '12345678901', value: 10 });  // Returns false

as.maxStr({ arg: '1234567890', value: 10 });  // Returns '1234567890'
as.maxStr({ arg: '12345678901', value: 10 });  // Throws TypeError: String length is not within the limit
```

### Minimum String Length
```javascript
is.minStr({ arg: string, value: number }) -> true | false
as.minStr

({ arg: string, value: number }) -> value | TypeError: String length is not sufficient
```
**Description:**

Checks if the provided argument's length is greater than or equal to a specific value.

- **is.minStr({ arg, value }):**
    - Returns `true` if `arg` length is greater than or equal to `value`.
    - Returns `false` otherwise.

- **as.minStr({ arg, value }):**
    - Returns `arg` if its length is greater than or equal to `value`.
    - Throws `TypeError` if `arg` length is less than `value`.

**Example:**
```javascript
is.minStr({ arg: '123', value: 3 });  // Returns true
is.minStr({ arg: '12', value: 3 });  // Returns false

as.minStr({ arg: '123', value: 3 });  // Returns '123'
as.minStr({ arg: '12', value: 3 });  // Throws TypeError: String length is not sufficient
```

## Settings
To customize error messages, you can override `Checker.errorMsg`. To disable throwing errors, set `checker.disabled = true`.

**Example:**
```javascript
const checker = new Checker();
checker.errorMsg = (params) => `${params[2] || (params[0]?.constructor ? params[0].constructor.name : params[0])} , really? I'm not sure that is a(an) ${params[1]}`;

const { multi, as, is } = checker;
checker.disabled = true;
// Example error message: TypeError: Number, really? I'm not sure that is a(an) string
```

## Utility
A simple method to get the type of argument
```javascript
get.type('any argument here'); // type of argument

get.type(43); // Number
get.type(Checker); // Checker
```
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
## passed and failed usage
This small functionality will be useful when you need to build your own testing scenario, but don't want to use IS for checking.
```javascript
import { Checker, BaseInterface, MicroTest, Utility, MicroTest } from '@pro-script/as-is';
const checker = new Checker({ 'IF/ELSE/END': true, strict: true, Enum: true, utility: true});
const { multi, Interface, strict, as, is, IF, ELSE, END, optional, get }  = checker;
const { START, STOP, FINISH, METHOD, PROPERTY, IS, passed, failed } = new MicroTest({ is, as });

(1 < 2) ? passed.one('Is a won'): failed.two('is a loss');
```
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
## Advanced techniques
### Checking one repeated type
In object, array, set and map. All types ending in 's' will be checked.
```js
        is.strings(exampleObject) && as.strings(exampleObject);
        is.Numbers(exampleArray) && as.Numbers(exampleArray);
        is.Errors(exampleSet) && as.Errors(exampleSet);
        is.BigInts(exampleMap) && as.BigInts(exampleMap); 
```
## Strict typing
***Basics***
```js

new Strict(type['js type here']`variable name`);// <-- meta programing magic
// after that
type['js type here']`variable name`;
```
```js
const strict = new Strict(type.string`name`);
strict.name = 'Stephen Hawking';
```
***Basic usage***
```js
import Checker from 'as-is';
const { multi, Strict, type, as, is } = new Checker();
//-- Do it once!
const strict = new Strict(
    type.string`name`,
    type.number`age`,
    type.strings`pages`
);
//--
strict.name = 'Mike';
strict.age = 12;
strict.pages = ['pageOne', 'pageTwo'];
strict.bla = 1; // will not be assigned
console.log(strict.name, strict.age, strict.pages);

// Mike 12 [ 'pageOne', 'pageTwo' ]

strict.name = 2022;
// TypeError: Number is not a(an) string
```
Use strictObject.values() to get all values.
```js
const values = strict.values();
console.log(values);
// { name: 'Mike', age: 12, pages: [ 'pageOne', 'pageTwo' ] }
```
Once the strict instance has been created, you can do the following:
```js
type.string`example`;
strict.example = '2';
```
**Strict has reserved variable names:** get, set, values, types, variable, lastType. This means that you can do the following;
```js
const strict = new Strict(type.null`get`);
//or
const strict = new Strict(type.undefined`set`);
//or
const strict = new Strict(type.array`values`);
//or
const strict = new Strict(type.object`variables`);

type.string`example`;
strict.example = '2';

// when you call strict.values()
// you only get { example: '2' }. Any of the reserved variable names will be hidden.
```
Only one strict object in one file is possible, if you want to instantiate any other object, you will get a reference to the first one.
This is because **Strict** must have access to the checker engine.
```js
const strict = new Strict(type.null`set`);
type.string`example`;

const secondStrict = new Strict(type.null`get`);
secondStrict.example = '2';

console.log(strict.values());
// { example: '2' }
```
Any tricks will not help you get the second strict object. Maybe I'll find a solution for this because I think it's a bug, not a feature :)
```js
import Checker from '@pro-script/as-is';
const { multi, Strict, type, as, is } = new Checker();

type.string`example`;
strict.example = 'first';

// even second import
import { default as CEngine }   from '@pro-script/as-is';
const { Strict: secondStrict } = new CEngine();

const secondStrict = new SecondStrict(type.null`get`);
secondStrict.string`example2`;
secondStrict.example2 = 'second';

secondStrict.values();
//{ example: 'first', example2: 'second' }
```
### Checking multiple types. It looks like generics in typescript, but more simple implementation.
When a variable is part of more than one type, you can also check for that.

***Basic***
```js
is['couple js type here']('argument here'); // argument | false
as['couple js type here']('argument here'); // argument | TypeError

// as alias syntax
multi`couple js type here`('argument here'); // argument | TypeError
multi(['couple js type here'])('argument here'); // argument | TypeError

```
***Basic usage***
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

## Macros
To manage syntax and write human-readable code, you might need metaprogramming tools such as macros. When using the 
architectural pattern of Domain-Driven Design (DDD), you may need to perform a series of validations or type checks for 
a domain entity. These checks are often required repeatedly, resulting in code that is difficult to read. You could, of 
course, create your own type or interface, but what do you do when you need to perform some action in addition to type 
checking and validation that is part of the business logic? In such cases, you can use macros to hide the technical 
checks under the hood, and the name of the macro will explain what is happening in the domain language.
### Basic
**[callback1, callback2, ... callbackN].macro** is starting array of callbacks. That's it. When **[].macro** found an object it 
start his method by name.
### Basic usage 
***callbacks example***
```javascript
[
    ()=> console.log('callback1'), 
    ()=> console.log('callback2'), 
    ()=> console.log('callbackN')
].macro; // callback1\n callback2\n callbackN\n
```
***Object example***
```javascript
[{
    first:()=> console.log('first'),
    second:()=> console.log('second')
}].macro;
['first', 'second'].macro; // first\n second
['first', 'second'].macro; // first\n second
['first', 'second'].macro; // first\n second
```
***Objects method returns a callback***
```javascript
[{
    'domain description':()=> function () { console.log('action') }
}].macro;
const domainAction = ['domain description'].macro;
domainAction.macro; // action
domainAction.macro; // action
domainAction.macro; // action
```
Only when the array is contain an object or a callback you can repeat the macro.
```javascript
const empty1 = [()=> console.log('callback1')].macro;
const empty2 = ['first', 'second'].macro;
const notEmpty = [function (){ return ()=> console.log('This function is returning a callback')}].macro;
empty1.macro; // error
empty2.macro; // error
notEmpty.macro; // This function is returning a callback
```
### Weird syntax
If you need to make something weird or unusual you can try this working syntax.
```javascript
const macroObject = {
    'this.is.a.first.macro': ()=> 'macro value',
    '/this.is.a.second macro/': ()=> 2,
    'this is a third macro': ()=> console.log('console from third macro'),
    0xDad:()=> console.log('any number can be macro')
};
[macroObject].macro;
[
    _ => this.is.a.first.macro,
    /this.is.a.second macro/,
    'this is a third macro',
    0xDad
].macro; // console from third macro\n any number can be macro

```

## Possible Errors
If you encounter the following error:
```
TypeError: Cannot read properties of undefined (reading '#<Object>')
```
Ensure you have a semicolon `;` at the end of the previous line.

## No Dependencies
This library has no external dependencies.


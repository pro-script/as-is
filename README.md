# @pro-script/as-is v1.2.0
Check and validate your types at runtime. 
Check and validate values also with [@pro-script/as-is-plugins](https://www.npmjs.com/package/@pro-script/as-is-plugins)

Please read the [pro-script](https://github.com/pro-script/The-concept) concept first.

Please read use cases 1 [@pro-script/as-is is a game changing library. Use cases 1](https://www.linkedin.com/pulse/pro-scriptas-is-game-changing-library-use-cases-1-volodymyr-kotov-nuuwe/)

Please read use cases 2 [@pro-script/as-is is a game changing library. Use cases 2](https://www.linkedin.com/pulse/pro-scriptas-is-game-changing-library-use-cases-2-volodymyr-kotov-eyuke/)

## Table of context

1. [Instalation](#installation)
2. [The principle of readable code](./documentation/readable-code.md)
3. [Summary of Features](#summary-of-features)
4. [API](./documentation/api.md)
5. [Enum type](./documentation/enum.md)
6. [Integration](./documentation/integration.md)
7. [Settings](#settings)
8. [Micro-test framework](./documentation/micro-test.md)
9. [Utility](#utility)
10. [Aliases](#aliases)

## installation
```bash
npm install @pro-script/as-is
```
For a browser without module
```html
<script src="https://www.unpkg.com/@pro-script/as-is@latest/index.js"></script>
````
For a browser with module
```html
<script type="module">
    import { Checker } from "https://www.unpkg.com/@pro-script/as-is@latest/index.js";
    
    ...
</script>
```
## Usage

Node.js modules
```javascript
import { Checker } from '@pro-script/as-is';

const { as, is, ... } = new Checker();
```
Node.js common modules
```javascript
const { Checker } = require('@pro-script/as-is/dist/as-is.common');

const { as, is, ... } = new Checker();
```
Browser without module
```javascript
const { as, is, ... } = new Checker();
```
Browser with module
```html
<script type="module">
    import { Checker } from "https://www.unpkg.com/@pro-script/as-is@latest/dist/as-is.esm.mjs";

    const { as, is, ... } = new Checker();
</script>
```
Browser with importmap
```html
<script type="importmap">
  {
    "imports": {
      "@pro-script/as-is": "https://www.unpkg.com/@pro-script/as-is@latest/dist/as-is.esm.mjs",
    }
  }
</script>
<script type="module">
    import { Checker } from '@pro-script/as-is';

    const { as, is, ... } = new Checker();
</script>

```


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

## Possible errors
If you got this error:

      TypeError: Cannot read properties of undefined (reading '#<Object>')

Please check if you put a semicolon ';' at the end of line before.

## No dependencies
[<- go back](#please-read-the-pro-script-concept-first)

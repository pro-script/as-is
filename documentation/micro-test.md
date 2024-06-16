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

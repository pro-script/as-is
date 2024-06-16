## The principle of readable code
This library respects the principle of the code readability. The code should tell a story. See [details](https://github.com/pro-script/The-concept#the-principle-of-readable-code)

    I.want.to.tell.you.a.story(myStory)

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

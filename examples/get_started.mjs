const foo = 'text';
typeof foo === 'string';
// Array.isArray(foo[Symbol.iterator]().toArray());


// function factory<TModel, TResult, TInjected extends Partial<TModel>>(
//     callback: (m: TModel) => TResult, inject: TInjected
// ){...}



// I.want.to.tell.you.a.story(myStory);
//
// This.is.how.you.can.check.types.in(@pro-script/as-is);
//

import { Checker } from '@pro-script/as-is';
const { is, as, Interface } = new Checker();

Interface({
    IArguments: {
        a: as.number,
        b: as.number,
    }
});

function add(a, b) {
    as.IArguments = { a, b };
    return as.number = a + b;
}

function add(a, b, _ = as.IArguments = { a, b }) {
    return as.number = a + b;
}



as.min(10).max(20).number = 34;
as.zero().number = 3;

// function add(a, b, _ = [as.number(a), as.number(b)]) {
//     return a + b;
// }


console.log(add(3, 2));

/*

const obj = Interface({
    IObject:{
        a: as.number,
        b: as.number
    }
});

function add(a = as.number(a), b = as.number(b)) {
    return as.number(a + b);
}

function add2(a, b, _ = as.IObject = {a, b}) {
    return a + b ;

}
*/










// function add(a, b){
//     return a + b;
// }
// function add2(a, b){
//     return as.number(a) + as.number(b);
// }







// console.log(is.string('hello'), as.string('world')); // -> true world
// as.array('Hello world!'); // -> TypeError: String is not a(an) array












// is.string('some text or variable');// -> true
// is.number('23');// -> true
// is.array([1,2,3]); // -> true
// is.json('{"prop":777}'); // -> true
// is.undefined(undefined);// -> true


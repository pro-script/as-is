const modules = await import('../../index.js');
const { Checker, BaseInterface, Enum, MicroTest } =  modules;
const checker = new Checker();
const { multi, Interface, strict, as, is, IF, ELSE, END, optional, get, macro }  = checker;
const { START, STOP, FINISH, METHOD, PROPERTY, IS, CHECK, passed, failed } = new MicroTest({ is, as });

export default {
    'check.values':()=> {
        CHECK.true(true);
        CHECK.false(is.false(false));
        IS.argument([]);
        CHECK['5 === 5'](5 === 5);
        CHECK['5 > 4'](5 > 4);
        CHECK['5 >= 5'](5 >= 5);
        CHECK['[2].includes(2)']([2].includes(2));
    }
}

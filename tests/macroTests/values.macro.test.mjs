const modules = await import('../../index.mjs');
const { Checker, MicroTest } =  modules;
const checker = new Checker();
const { as, is}  = checker;
const { IS, CHECK} = new MicroTest({ is, as });

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

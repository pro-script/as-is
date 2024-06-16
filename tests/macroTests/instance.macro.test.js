const modules = await import('../../index.js');
const { Checker, MicroTest } =  modules;
const checker = new Checker();
const { as, is }  = checker;
const {  METHOD, PROPERTY, IS } = new MicroTest({ is, as });

export default {
    'check.constructor':()=> IS.class(Checker),
    'check.class': ()=> IS.Checker(Checker),
    'check.methods': ()=> {
        const instance = new Checker();
        ['is', 'as', 'IF', 'ELSE', 'optional'].forEach((methodName)=> IS.Checker(instance[methodName]));
        IS.null(instance.END);
        IS.Checker(instance);
        METHOD.multi(instance);
        METHOD.Interface(instance);
    }
}

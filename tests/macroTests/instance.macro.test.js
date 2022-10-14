const modules = await import('../../index.js');
const { Checker, BaseInterface, Enum, MicroTest } =  modules;
const checker = new Checker();
const { multi, Interface, strict, as, is, IF, ELSE, END, optional, get, macro }  = checker;
const { START, STOP, FINISH, METHOD, PROPERTY, IS, CHECK, passed, failed } = new MicroTest({ is, as });

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
        PROPERTY.get(instance);
    }
}

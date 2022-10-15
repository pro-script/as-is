export default class MicroTest {

    START = new Proxy(this, {
        get(target, name) {
            target.info.time(name);
            target.info.info(`${name} ->`);
            return `/${name}/`;
        }
    });

    STOP = new Proxy(this, {
        get(target, name) {
            target.info.timeEnd(name);
            return {};
        }
    });

    FINISH = new Proxy(this, {
        get(target, name) {
            target.info.timeEnd(name);
            console.info(`\u2713 PASSED tests: ${target.passedTest} \u2713`);
            if(target.filedTest) {
                console.error(`\u2717 FAILED tests: ${target.filedTest} \u2717`);
                throw (new Error(`FAILED tests: ${target.filedTest}`)).message;
            }
        }
    });

    METHOD = new Proxy(this, {
        get(target, name) {
            return (arg)=>{
                target.is.classObject(arg) && arg.hasOwnProperty(name) && target.is.function(arg[name])
                    ? target.passed.METHOD(name)
                    : target.failed.METHOD(name)
            };
        }
    });

    PROPERTY = new Proxy(this, {
        get(target, name) {
            return (arg)=> {
                arg.hasOwnProperty(name) && target.is.objectClass(arg)
                    ? target.passed.PROPERTY(name)
                    : target.failed.PROPERTY(name)
            };
        }
    });

    IS = new Proxy(this, {
        get(target, name) {
            return (arg)=> {
                target.is[name](arg)
                    ? target.passed.IS(name)
                    : target.failed.IS(name)
            };
        }
    });

    CHECK = new Proxy(this, {
        get(target, name) {
            return (arg)=> {
                target.is.true(arg)
                    ? target.passed[name.toUpperCase()]('ok')
                    : target.failed[name.toUpperCase()]('fail')
            };
        }
    });

    passed = new Proxy(this, {
        get(target, name) {
            target.passedTest++;
            return (arg)=> target.info.log(` \u2713 ${name}.${arg} `);
        }
    });

    failed = new Proxy(this, {
        get(target, name) {
            target.filedTest++;
            const { stack } = new Error();
            const stackArray = stack.split('\n')
                ? stack.split('\n')
                : stack.split('@');
            const idx = stackArray[target.stackIdx].includes('eval')
                ? target.stackIdx-1
                : target.stackIdx;
            return (arg)=> target.info.error(
                ` \u2717 ${name}.${arg} -> ${(stackArray[idx] || stackArray[idx-1]).replace('\n','').replace('module code@', '').replace('    at','')}`
            );
        }
    });

    filedTest = 0;
    passedTest = 0;
    stackIdx = 3;
    constructor( options = { silentMode: false, is, as }) {
        const { silentMode, is, as } = options;
        this.is = is;
        this.as = as;
        is.boolean(silentMode) && silentMode
            ? this.info = { log: ()=> {}, time: ()=> {}, timeEnd:()=> {}, error:()=> {}}
            : this.info = console;
    }

    static getName(error){
        const { stack } = error;
        return stack.match(/^.*(?=@)/)
            ? stack.match(/^.*(?=@)/)[0]
            : stack.match(/at (.*?) /)[1];
    }
}

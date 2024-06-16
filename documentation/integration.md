## Integration
You can integrate any feature you want.
```js
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

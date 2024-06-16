# @pro-script/as-is v1.2.0

## Please read the [pro-script](https://github.com/pro-script/The-concept) concept first.
### Please read use cases 1 [@pro-script/as-is is a game changing library. Use cases 1](https://www.linkedin.com/pulse/pro-scriptas-is-game-changing-library-use-cases-1-volodymyr-kotov-nuuwe/)
### Please read use cases 2 [@pro-script/as-is is a game changing library. Use cases 2](https://www.linkedin.com/pulse/pro-scriptas-is-game-changing-library-use-cases-2-volodymyr-kotov-eyuke/)

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

## Table of context
[documentation](./documentation/temprary.md)

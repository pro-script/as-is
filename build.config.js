import { Builder } from './lib/classes/Builder.class.js';

export const buildConfig = {
    browser: {
        out: 'fileOut',
        pattern: 'constPattern',
        browserExport: true,
        path: './dist/as-is.browser.js'
    },
    esm: {
        out: 'fileOut',
        pattern: 'constPattern',
        es6export: true,
        path: './dist/as-is.esm.mjs'
    },
    common: {
        out: 'fileOut',
        pattern: 'constPattern',
        commonExport: true,
        path: './dist/as-is.common.js'
    }
};

switch (process.env.NODE_ENV) {
    case 'esm': new Builder(buildConfig.esm);
        break;
    case 'browser': new Builder(buildConfig.browser);
        break;
    case 'common': new Builder(buildConfig.common);
        break;
    default:
        Object.keys(buildConfig).forEach((env)=> new Builder(buildConfig[env]));
}

/* eslint import/extensions: ["off"] */
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

const externs = ['isFunction', 'isArrayLikeObject', 'isNumber', 'isString', 'isDate', 'isObject', 'isPlainObject', 'isBoolean'];
const external = [];
const globals = {};

for (let i = 0; i < externs.length; i += 1) {
  external.push(`lodash/${externs[i]}`);
  globals[`lodash/${externs[i]}`] = externs[i];
}

export default {
  entry: './src/index.js',
  dest: './dist/fetter.js',
  plugins: [
    buble(),
    uglify(),
  ],
  external,
  globals,
  format: 'umd',
  moduleName: 'fetter',
};

/* eslint import/extensions: ["off"] */
import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: './src/index.js',
  dest: './dist/fetter.js',
  plugins: [
    buble({
      objectAssign: 'Object.assign',
    }),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    uglify(),
  ],
  format: 'umd',
  moduleName: 'fetter',
};

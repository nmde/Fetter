/* eslint strict: ["off"] */

'use strict';

const f = require('./dist/fetter');

const n = new f.Array([1, 2, 3], f.Number);
n.set(n.concat([4, 5, 6], [7, 8, 9], 10));
console.log(n.value);

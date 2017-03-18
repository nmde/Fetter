/* eslint strict: ["off"] */

'use strict';

const f = require('./dist/fetter');

const now = new f.Date();
const days = new f.Array(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], new f.String());
const months = new f.Array(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], new f.String());
const date = new f.String(((now.getDate() < 10) ? '0' : '') + now.getDate());
const fourdigits = new f.Function((args) => {
  f.enforce(args[0], new f.Number());
  return (args[0] < 1000) ? args[0] + 1900 : args[0];
});
const today = new f.String(`${days.get(now.getDay())}, ${months.get(now.getMonth())} ${date.value}, ${fourdigits.call(now.getFullYear())}`);
console.log(today.value);

/* eslint strict: ["off"] */

'use strict';

const f = require('./dist/fetter');

const now = new f.Date();
const days = new f.Array(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], new f.String());
const months = new f.Array(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], new f.String());
const date = new f.String(((now.getDate() < 10) ? '0' : '') + now.getDate());
const fourdigits = new f.Function((number) => {
  f.is(number, new f.Number());
  return (number < 1000) ? number + 1900 : number;
});
const today = new f.String(`${days.get(now.getDay())}, ${months.get(now.getMonth())} ${date.value}, ${fourdigits.call(now.getFullYear())}`);
console.log(today);

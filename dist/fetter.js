!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("lodash/isFunction"),require("lodash/isArrayLikeObject"),require("lodash/isPlainObject"),require("lodash/isNumber"),require("lodash/isBoolean"),require("lodash/isString"),require("lodash/isDate")):"function"==typeof define&&define.amd?define(["lodash/isFunction","lodash/isArrayLikeObject","lodash/isPlainObject","lodash/isNumber","lodash/isBoolean","lodash/isString","lodash/isDate"],e):t.fetter=e(t.isFunction,t.isArrayLikeObject,t.isPlainObject,t.isNumber,t.isBoolean,t.isString,t.isDate)}(this,function(t,e,r,n,o,i,u){"use strict";function a(t,n){if(void 0===n&&(n=!0),t){if(t.fetter)return a(t.value);if(e(t)&&n)return t.map(function(t){return a(t)});if(r(t)&&n){for(var o=Object.getOwnPropertyNames(t),i=t,u=0;u<o.length;u+=1)i[o[u]]=a(t[o[u]]);return i}}return t}function c(t,e){return e.strictCheck(t)}function s(t,e){if(!c(t,e)){var r;throw r=t.typeName?t.typeName:typeof t,new Error("Expected type "+(new e).typeName+", got "+r)}}function p(t,e){return t&&!t.fetter?new e(t):t}t="default"in t?t.default:t,e="default"in e?e.default:e,r="default"in r?r.default:r,n="default"in n?n.default:n,o="default"in o?o.default:o,i="default"in i?i.default:i,u="default"in u?u.default:u;var f=function(e,r,n,o){var i=this;if(void 0===r&&(r="Class"),void 0===n&&(n={}),this.typeName=r,this.extra=n,this.fetter=!0,this.set(e),o)for(var u=Object.getOwnPropertyNames(o.prototype),c=function(e){"arguments"!==u[e]&&"caller"!==u[e]&&!i[u[e]]&&t(o.prototype[u[e]])&&(i[u[e]]=function(){for(var t=[],r=arguments.length;r--;)t[r]=arguments[r];return i._value[u[e]](t.map(function(t){return a(t)}))})},s=0;s<u.length;s+=1)c(s)},h={value:{}};h.value.get=function(){return this.get()},h.value.set=function(t){this.set(t)},f.prototype.check=function(){return!0},f.strictCheck=function(){return this.check()},f.prototype.get=function(){return this._value},f.prototype.set=function(t){if(!this.check(t))throw new Error("Value is not of type "+this.typeName);this._value=t},Object.defineProperties(f.prototype,h);var l=function(t){function e(e,r,n,o){t.call(this,e,r,{checker:n},o)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.check=function(t){return this.extra.checker(t)||t&&t.value&&this.extra.checker(t.value)},e}(f),y=function(t){function e(e){t.call(this,a(e),"Any")}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(f),v=function(t){function e(e){void 0===e&&(e=""),t.call(this,a(e),"String",function(t){return i(a(t))})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(l),d=function(t){function e(e){void 0===e&&(e=!1),t.call(this,a(e),"Boolean",function(){return!0},Boolean)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.strictCheck=function(t){return o(a(t))},e.prototype.set=function(t){return this._value=Boolean(t),this._value},e.prototype.toString=function(){return new v(""+this._value)},e.prototype.valueOf=function(){return this._value},e}(l),_=function(t){function e(e){void 0===e&&(e=0),t.call(this,a(e),"Number",function(t){return n(a(t))})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(l),g=function(t){function r(e,r){void 0===e&&(e=[]),void 0===r&&(r=y),t.call(this,a(e),"Array",{subtype:new r,SubtypeConstructor:r,makeError:function(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];for(var n="",o=0;o<e.length;o+=1)n+=JSON.stringify(e[o])+",";return n=n.replace(/,$/,""),new Error("Value "+n+" is not of type Array or "+this.subtype.typeName+" (In f.Array."+t+")")}},Array)}t&&(r.__proto__=t),r.prototype=Object.create(t&&t.prototype),r.prototype.constructor=r;var o={length:{}};return r.prototype.check=function(t){var r=this,n=a(t);if(!e(n))return!1;for(var o=0;o<n.length;o+=1)if(!r.extra.subtype.check(n[o]))return!1;return!0},r.prototype.get=function(t){return n(t)?this._value[t]:this._value},r.prototype.set=function(t){var e=this,r=a(t);if(t)if(this.check(r))this._value=r.map(function(t){return p(t,e.extra.SubtypeConstructor)});else{if(!n(r))throw this.extra.makeError("set",t);this._value=new Array(r)}else this._value=[]},o.length.get=function(){return new _(this._value.length)},r.prototype.copyWithin=function(t,e,n){return new r(this._value.copyWithin(a(t),a(e),a(n)))},r.prototype.fill=function(t,e,n){if(this.extra.subtype.check(t))return new r(this._value.fill(p(t,this.extra.SubtypeConstructor),a(e),a(n)));throw this.extra.makeError("fill",t,e,n)},r.prototype.push=function(){for(var t=this,e=[],r=arguments.length;r--;)e[r]=arguments[r];if(this.check(e)){for(var n,o=0;o<e.length;o+=1)n=t._value.push(p(e[o],t.extra.SubtypeConstructor));return n}throw this.extra.makeError("push",e)},r.prototype.sort=function(t){return void 0===t&&(t=function(t,e){return String(t)<String(e)?-1:t===e?0:1}),this._value=this._value.sort(function(e,r){return t(a(e),a(r))}),this._value},r.prototype.splice=function(t,e){for(var n=this,o=[],i=arguments.length-2;i-- >0;)o[i]=arguments[i+2];var u=a(t),c=a(e),s=o.map(function(t){return p(t,n.extra.SubtypeConstructor)});if(s.length>0){if(this.check(s)){for(var f=new r,h=0;h<c;h+=1)f.push(n._value.splice(u,1)[0]);for(var l=s.reverse(),y=0;y<l.length;y+=1)n._value.splice(u,0,l[y]);return f}throw this.makeError("splice",u,c,s)}return new r(this._value.splice(u,c),this.extra.SubtypeConstructor)},r.prototype.unshift=function(){for(var t=this,e=[],n=arguments.length;n--;)e[n]=arguments[n];var o=e.map(function(e){return p(e,t.extra.SubtypeConstructor)});if(0===o.length)return new r(this._value.unshift());if(this.check(o)){for(var i=o.reverse(),u=0;u<i.length;u+=1)t._value.unshift(i[u]);return new _(this._value.length)}throw this.extra.makeError("unshift",o)},r.prototype.concat=function(){for(var t=this,e=[],n=arguments.length;n--;)e[n]=arguments[n];for(var o=new r(this._value,this.extra.SubtypeConstructor),i=0;i<e.length;i+=1){if(!t.check(e[i]))throw t.extra.makeError("concat",e);o.value=o.value.concat(a(e[i]))}return o},r.prototype.includes=function(t,e){var r=this;void 0===e&&(e=0);for(var n=p(t,this.extra.SubtypeConstructor),o=a(e),i=o;i<this.length.value;i+=1)if(a(r.get(i))===a(n))return new d(!0);return new d(!1)},r.prototype.indexOf=function(t,e){return void 0===e&&(e=0),new _(this._value.map(function(t){return a(t)}).indexOf(a(t),a(e)))},r.prototype.join=function(t){return void 0===t&&(t=","),new v(this._value.map(function(t){return a(t)}).join(a(t)))},r.prototype.lastIndexOf=function(t,e){return void 0===e&&(e=this.length.value),new _(this._value.map(function(t){return a(t)}).lastIndexOf(a(t),a(e)))},r.prototype.slice=function(t,e){return new r(this._value.slice(a(t),a(e)))},r.prototype.toString=function(){return new v(this._value.map(function(t){return a(t)}).toString())},r.prototype.toLocaleString=function(t,e){return new v(this._value.map(function(t){return a(t)}).toLocaleString(a(t),a(e)))},Object.defineProperties(r.prototype,o),r}(f);g.from=function(t,e,r){return new g(Array.from(a(t),a(e),a(r)))},g.isArray=function(t){return new d(Array.isArray(a(t)))},g.of=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return new g(t)};var w=function(e){function r(r,n,o,i,u,c,s){var p=this;void 0===r&&(r=new Date),void 0===n&&(n=0),void 0===o&&(o=1),void 0===i&&(i=0),void 0===u&&(u=0),void 0===c&&(c=0),void 0===s&&(s=0),e.call(this,a(r),"Date",{month:a(n),day:a(o),hours:a(i),minutes:a(u),seconds:a(c),milliseconds:a(s)});for(var f=Object.getOwnPropertyNames(Date.prototype),h=function(e){!p[f[e]]&&t(Date.prototype[f[e]])&&(0===f[e].indexOf("get")||0===f[e].indexOf("set")?p[f[e]]=function(){for(var t=[],r=arguments.length;r--;)t[r]=arguments[r];return new _(p._value[f[e]](t.map(function(t){return a(t)})))}:0===f[e].indexOf("to")?p[f[e]]=function(){for(var t=[],r=arguments.length;r--;)t[r]=arguments[r];return new v(p._value[f[e]](t.map(function(t){return a(t)})))}:p[f[e]]=function(){for(var t=[],r=arguments.length;r--;)t[r]=arguments[r];return new y(p._value[f[e]](t.map(function(t){return a(t)})))})},l=0;l<f.length;l+=1)h(l)}return e&&(r.__proto__=e),r.prototype=Object.create(e&&e.prototype),r.prototype.constructor=r,r.prototype.check=function(t){return u(a(t))},r.prototype.set=function(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];if(this.check(t))this._value=t;else if(i(t))this._value=new Date(t);else if(e.length>0)this._value=new Date(t,e);else{if(!n(this.extra.month))throw new Error("Value is not of type "+this.typeName+" or String");this._value=new Date(t,this.extra.month,this.extra.day,this.extra.hours,this.extra.minutes,this.extra.seconds,this.extra.milliseconds),this.extra={}}},r.prototype.toLocaleString=function(t,e){return new v(this._value.toLocaleString(a(t),a(e)))},r.prototype.toString=function(){return new v(this._value.toString())},r}(f);w.now=function(){return new _(Date.now())},w.parse=function(t){return new _(Date.parse(a(t)))},w.UTC=function(t,e,r,n,o,i,u){return void 0===r&&(r=1),void 0===n&&(n=0),void 0===o&&(o=0),void 0===i&&(i=0),void 0===u&&(u=0),new _(Date.UTC(a(t),a(e),a(r),a(n),a(o),a(i),a(u)))};for(var m=function(e){function r(r){void 0===r&&(r=function(){}),e.call(this,a(r),"Function",function(e){return t(a(e))},Function)}return e&&(r.__proto__=e),r.prototype=Object.create(e&&e.prototype),r.prototype.constructor=r,r.prototype.apply=function(t){return(e=this)._value.apply(e,a(t));var e},r.prototype.call=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return this.apply(t)},r}(l),b=function(t){function e(e,r){void 0===e&&(e={}),void 0===r&&(r=y),t.call(this,a(e),"Object",{subtype:new r,SubtypeConstructor:r},Object)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.check=function(t){return r(a(t))},e.prototype.get=function(t){return"undefined"!=typeof t?t.fetter?this._value[t.value]:this._value[t]:this._value},e.prototype.set=function(t,e){var r=t;if(t.fetter&&(r=t.value),e&&this.extra.subtype.check(e))this._value[r]=new this.extra.SubtypeConstructor(e);else{if(e)throw new Error("Value is not of type "+this.extra.subtype.typeName);if(!this.check(t))throw new Error("Value is not of type Object");this._value=t}},e}(f),x={Any:y,Array:g,Boolean:d,Date:w,Function:m,Number:_,Object:b,String:v},O={Class:f,Simple:l,is:c,enforce:s,s:a,convert:p,types:x},k=Object.getOwnPropertyNames(x),S=0;S<k.length;S+=1)O[k[S]]=x[k[S]];return O});
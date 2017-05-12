!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("lodash/isFunction"),require("lodash/isArrayLikeObject"),require("lodash/isPlainObject"),require("lodash/isNumber"),require("lodash/isString"),require("lodash/isDate"),require("lodash/isObject")):"function"==typeof define&&define.amd?define(["lodash/isFunction","lodash/isArrayLikeObject","lodash/isPlainObject","lodash/isNumber","lodash/isString","lodash/isDate","lodash/isObject"],e):t.fetter=e(t.isFunction,t.isArrayLikeObject,t.isPlainObject,t.isNumber,t.isString,t.isDate,t.isObject)}(this,function(t,e,r,o,n,i,u){"use strict";function a(t,e){return e.check(t)}function s(t,e){if(!a(t,e)){var r;throw r=t.typeName?t.typeName:typeof t,new Error("Expected type "+e.typeName+", got "+r)}}function c(t,o){if(void 0===o&&(o=!0),t){if(t.fetter)return c(t.value);if(e(t)&&o)return t.map(function(t){return c(t)});if(r(t)&&o){for(var n=Object.getOwnPropertyNames(t),i=t,u=0;u<n.length;u+=1)i[n[u]]=c(t[n[u]]);return i}}return t}function p(t,e){return t&&!t.fetter?new e(t):t}t="default"in t?t.default:t,e="default"in e?e.default:e,r="default"in r?r.default:r,o="default"in o?o.default:o,n="default"in n?n.default:n,i="default"in i?i.default:i,u="default"in u?u.default:u;var h=function(e,r,o,n){var i=this;if(void 0===r&&(r="Class"),void 0===o&&(o={}),this.typeName=r,this.extra=o,this.fetter=!0,this.set(e),n)for(var u=Object.getOwnPropertyNames(n.prototype),a=function(e){"arguments"!==u[e]&&"caller"!==u[e]&&!i[u[e]]&&t(n.prototype[u[e]])&&(i[u[e]]=function(){for(var t=[],r=arguments.length;r--;)t[r]=arguments[r];return i._value[u[e]](t)})},s=0;s<u.length;s+=1)a(s)},l={value:{}};l.value.get=function(){return this.get()},l.value.set=function(t){this.set(t)},h.prototype.check=function(){return!0},h.prototype.get=function(){return this._value},h.prototype.set=function(t){if(!this.check(t))throw new Error("Value is not of type "+this.typeName);this._value=t},Object.defineProperties(h.prototype,l);var f=function(t){function e(e,r,o,n){t.call(this,e,r,{checker:o},n)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.check=function(t){return this.extra.checker(t)||t&&t.value&&this.extra.checker(t.value)},e}(h),y=function(t){function e(e){t.call(this,e,"Any")}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(h),v=function(t){function e(e){void 0===e&&(e=""),t.call(this,e,"String",n)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(f),_=function(t){function e(e){void 0===e&&(e=!1),t.call(this,e,"Boolean",function(){return!0},Boolean)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.set=function(t){return this._value=Boolean(t),this._value},e.prototype.toString=function(){return new v(this._value===!0?""+this._value:"false")},e}(f),d=function(t){function e(e){void 0===e&&(e=0),t.call(this,e,"Number",o)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(f),g=function(t){function r(e,r){void 0===e&&(e=[]),void 0===r&&(r=y),t.call(this,e,"Array",{subtype:new r,SubtypeConstructor:r,makeError:function(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];for(var o="",n=0;n<e.length;n+=1)o+=JSON.stringify(e[n])+",";return o=o.replace(/,$/,""),new Error("Value "+o+" is not of type Array or "+this.subtype.typeName+" (In f.Array."+t+")")}},Array)}t&&(r.__proto__=t),r.prototype=Object.create(t&&t.prototype),r.prototype.constructor=r;var n={length:{}};return r.prototype.check=function(t){var r=this,o=c(t);if(!e(o))return!1;for(var n=0;n<o.length;n+=1)if(!r.extra.subtype.check(o[n]))return!1;return!0},r.prototype.get=function(t){return o(t)?this._value[t]:this._value},r.prototype.set=function(t){var e=this,r=c(t);if(t)if(this.check(r))this._value=r.map(function(t){return p(t,e.extra.SubtypeConstructor)});else{if(!o(r))throw this.extra.makeError("set",t);this._value=new Array(r)}else this._value=[]},n.length.get=function(){return new d(this._value.length)},r.prototype.copyWithin=function(t,e,o){return new r(this._value.copyWithin(c(t),c(e),c(o)))},r.prototype.fill=function(t,e,o){if(this.extra.subtype.check(t))return new r(this._value.fill(p(t,this.extra.SubtypeConstructor),c(e),c(o)));throw this.extra.makeError("fill",t,e,o)},r.prototype.push=function(){for(var t=this,e=[],r=arguments.length;r--;)e[r]=arguments[r];if(this.check(e)){for(var o,n=0;n<e.length;n+=1)o=t._value.push(p(e[n],t.extra.SubtypeConstructor));return o}throw this.extra.makeError("push",e)},r.prototype.sort=function(t){return void 0===t&&(t=function(t,e){return String(t)<String(e)?-1:t===e?0:1}),this._value=this._value.sort(function(e,r){return t(c(e),c(r))}),this._value},r.prototype.splice=function(t,e){for(var o=this,n=[],i=arguments.length-2;i-- >0;)n[i]=arguments[i+2];var u=c(t),a=c(e),s=n.map(function(t){return p(t,o.extra.SubtypeConstructor)});if(s.length>0){if(this.check(s)){for(var h=new r,l=0;l<a;l+=1)h.push(o._value.splice(u,1)[0]);for(var f=s.reverse(),y=0;y<f.length;y+=1)o._value.splice(u,0,f[y]);return h}throw this.makeError("splice",u,a,s)}return new r(this._value.splice(u,a),this.extra.SubtypeConstructor)},r.prototype.unshift=function(){for(var t=this,e=[],o=arguments.length;o--;)e[o]=arguments[o];var n=e.map(function(e){return p(e,t.extra.SubtypeConstructor)});if(0===n.length)return new r(this._value.unshift());if(this.check(n)){for(var i=n.reverse(),u=0;u<i.length;u+=1)t._value.unshift(i[u]);return new d(this._value.length)}throw this.extra.makeError("unshift",n)},r.prototype.concat=function(){for(var t=this,e=[],o=arguments.length;o--;)e[o]=arguments[o];for(var n=new r(this._value,this.extra.SubtypeConstructor),i=0;i<e.length;i+=1){if(!t.check(e[i]))throw t.extra.makeError("concat",e);n.value=n.value.concat(c(e[i]))}return n},r.prototype.includes=function(t,e){var r=this;void 0===e&&(e=0);for(var o=p(t,this.extra.SubtypeConstructor),n=c(e),i=n;i<this.length.value;i+=1)if(c(r.get(i))===c(o))return new _(!0);return new _(!1)},r.prototype.indexOf=function(t,e){return void 0===e&&(e=0),new d(this._value.map(function(t){return c(t)}).indexOf(c(t),c(e)))},r.prototype.join=function(t){return void 0===t&&(t=","),new v(this._value.map(function(t){return c(t)}).join(c(t)))},r.prototype.lastIndexOf=function(t,e){return void 0===e&&(e=this.length.value),new d(this._value.map(function(t){return c(t)}).lastIndexOf(c(t),c(e)))},r.prototype.slice=function(t,e){return new r(this._value.slice(c(t),c(e)))},r.prototype.toString=function(){return new v(this._value.map(function(t){return c(t)}).toString())},r.prototype.toLocaleString=function(t,e){return new v(this._value.map(function(t){return c(t)}).toLocaleString(c(t),c(e)))},Object.defineProperties(r.prototype,n),r}(h);g.from=function(t,e,r){return new g(Array.from(c(t),c(e),c(r)))},g.isArray=function(t){return new _(Array.isArray(c(t)))},g.of=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return new g(t)};var b=function(t){function e(e,r,o,n,i,u,a){void 0===e&&(e=new Date),void 0===r&&(r=0),void 0===o&&(o=1),void 0===n&&(n=0),void 0===i&&(i=0),void 0===u&&(u=0),void 0===a&&(a=0),t.call(this,e,"Date",{month:r,day:o,hours:n,minutes:i,seconds:u,milliseconds:a},Date)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.check=function(t){return i(t)||i(t.value)},e.prototype.set=function(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];if(this.check(t))this._value=t;else if(n(t))this._value=new Date(t);else if(e.length>0)this._value=new Date(t,e);else{if(!o(this.extra.month))throw new Error("Value is not of type "+this.typeName+" or String");this._value=new Date(t,this.extra.month,this.extra.day,this.extra.hours,this.extra.minutes,this.extra.seconds,this.extra.milliseconds),this.extra={}}},e}(h);b.now=Date.now,b.parse=Date.parse,b.UTC=Date.UTC;var w=function(e){function r(r){void 0===r&&(r=function(){}),e.call(this,r,"Function",t,Function)}return e&&(r.__proto__=e),r.prototype=Object.create(e&&e.prototype),r.prototype.constructor=r,r.prototype.apply=function(t){return(e=this)._value.apply(e,c(t));var e},r.prototype.call=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return this.apply(t)},r}(f),m=function(t){function e(e,r){void 0===e&&(e={}),void 0===r&&(r=y),t.call(this,e,"Object",{subtype:new r,SubtypeConstructor:r},Object)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.check=function(t){return u(t)},e.prototype.get=function(t){return"undefined"!=typeof t?t.fetter?this._value[t.value]:this._value[t]:this._value},e.prototype.set=function(t,e){var r=t;if(t.fetter&&(r=t.value),e&&this.extra.subtype.check(e))this._value[r]=new this.extra.SubtypeConstructor(e);else{if(e)throw new Error("Value is not of type "+this.extra.subtype.typeName);if(!this.check(t))throw new Error("Value is not of type Object");this._value=t}},e}(h),x={Class:h,Simple:f,is:a,enforce:s,s:c,convert:p,Any:y,Array:g,Boolean:_,Date:b,Function:w,Number:d,Object:m,String:v};return x});
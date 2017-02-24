!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.fetter=e()}(this,function(){"use strict";function t(t,e){return e={exports:{}},t(e,e.exports),e.exports}function e(t){var e=w.call(t,Y),o=t[Y];try{t[Y]=void 0;var n=!0}catch(t){}var r=H.call(t);return n&&(e?t[Y]=o:delete t[Y]),r}function o(t){return N.call(t)}function n(t){return null==t?void 0===t?V:G:q&&q in Object(t)?z(t):E(t)}function r(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}function u(t){if(!L(t))return!1;var e=K(t);return e==R||e==W||e==Q||e==X}function i(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=$}function c(t){return null!=t&&ot(t.length)&&!et(t)}function p(t){return null!=t&&"object"==typeof t}function s(t){return it(t)&&ut(t)}function l(t){return t===!0||t===!1||lt(t)&&st(t)==ft}function f(t){return _t(t)&&ht(t)==vt}function a(t){return function(e){return t(e)}}function y(t){return"number"==typeof t||Ft(t)&&St(t)==xt}function h(t){return"string"==typeof t||!Nt(t)&&Bt(t)&&At(t)==Pt}var _=function(t,e,o){void 0===e&&(e="Class"),void 0===o&&(o={}),this.typeName=e,this.extra=o,this.set(t)},v={value:{}};v.value.get=function(){return this.get()},v.value.set=function(t){this.set(t)},_.prototype.check=function(){return!0},_.prototype.get=function(){return this._value},_.prototype.set=function(t){if(!this.check(t))throw new Error("Value is not of type "+this.typeName);this._value=t},Object.defineProperties(_.prototype,v);var g=function(t){function e(e,o,n){t.call(this,e,o,{checker:n})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.check=function(t){return this.extra.checker(t)},e}(_),d=function(t){function e(e){t.call(this,e,"Any")}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(_),T="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},b="object"==typeof T&&T&&T.Object===Object&&T,C=b,j=C,U="object"==typeof self&&self&&self.Object===Object&&self,M=j||U||Function("return this")(),m=M,O=m,D=O.Symbol,S=D,F=S,x=Object.prototype,w=x.hasOwnProperty,H=x.toString,Y=F?F.toStringTag:void 0,k=e,A=Object.prototype,N=A.toString,B=o,P=S,z=k,E=B,G="[object Null]",V="[object Undefined]",q=P?P.toStringTag:void 0,I=n,J=r,K=I,L=J,Q="[object AsyncFunction]",R="[object Function]",W="[object GeneratorFunction]",X="[object Proxy]",Z=u,$=9007199254740991,tt=i,et=Z,ot=tt,nt=c,rt=p,ut=nt,it=rt,ct=s,pt=function(t){function e(e,o){void 0===e&&(e=[]),t.call(this,e,"Array<"+o.typeName+">",{innerType:o})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.check=function(t){var e=this;if(ct(t)){for(var o=!0,n=0;n<t.length;n+=1)e.extra.innerType.check(t[n])||(o=!1);return o}return!1},e}(_),st=I,lt=rt,ft="[object Boolean]",at=l,yt=function(t){function e(e){void 0===e&&(e=!1),t.call(this,e,"Boolean",at)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(g),ht=I,_t=rt,vt="[object Date]",gt=f,dt=a,Tt=t(function(t,e){var o=C,n=e&&!e.nodeType&&e,r=n&&!0&&t&&!t.nodeType&&t,u=r&&r.exports===n,i=u&&o.process,c=function(){try{return i&&i.binding&&i.binding("util")}catch(t){}}();t.exports=c}),bt=gt,Ct=dt,jt=Tt,Ut=jt&&jt.isDate,Mt=Ut?Ct(Ut):bt,mt=Mt,Ot=function(t){function e(e){void 0===e&&(e=new Date),t.call(this,e,"Date",mt),this.length=7}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDate=function(){return this._value.getDate()},e.prototype.getDay=function(){return this._value.getDay()},e.prototype.getFullYear=function(){return this._value.getFullYear()},e.prototype.getHours=function(){return this._value.getHours()},e.prototype.getMilliseconds=function(){return this._value.getMilliseconds()},e.prototype.getMinutes=function(){return this._value.getMinutes()},e.prototype.getMonth=function(){return this._value.getMonth()},e.prototype.getSeconds=function(){return this._value.getSeconds()},e.prototype.getTime=function(){return this._value.getTime()},e.prototype.getTimezoneOffset=function(){return this._value.getTimezoneOffset()},e.prototype.getUTCDate=function(){return this._value.getUTCDate()},e.prototype.getUTCDay=function(){return this._value.getUTCDay()},e.prototype.getUTCFullYear=function(){return this._value.getUTCFullYear()},e.prototype.getUTCHours=function(){return this._value.getUTCHours()},e.prototype.getUTCMilliseconds=function(){return this._value.getUTCMilliseconds()},e.prototype.getUTCMinutes=function(){return this._value.getUTCMinutes()},e.prototype.getUTCMonth=function(){return this._value.getUTCMonth()},e.prototype.getUTCSeconds=function(){return this._value.getUTCSeconds()},e.prototype.setDate=function(t){return this._value.setDate(t)},e.prototype.setFullYear=function(t,e,o){return this._value.setFullYear(t,e,o)},e.prototype.setHours=function(t,e,o,n){return this._value.setHours(t,e,o,n)},e.prototype.setMilliseconds=function(t){return this._value.setMilliseconds(t)},e.prototype.setMinutes=function(t,e,o){return this._value.setMinutes(t,e,o)},e.prototype.setMonth=function(t,e){return this._value.setMonth(t,e)},e.prototype.setSeconds=function(t,e){return this._value.setSeconds(t,e)},e.prototype.setTime=function(t){return this._value.setTime(t)},e.prototype.setUTCDate=function(t){return this._value.setUTCDate(t)},e.prototype.setUTCFullYear=function(t,e,o){return this._value.setUTCFullYear(t,e,o)},e.prototype.setUTCHours=function(t,e,o,n){return this._value.setUTCHours(t,e,o,n)},e.prototype.setUTCMilliseconds=function(t){return this._value.setUTCMilliseconds(t)},e.prototype.setUTCMinutes=function(t,e,o){return this._value.setUTCMinutes(t,e,o)},e.prototype.setUTCMonth=function(t,e){return this._value.setUTCMonth(t,e)},e.prototype.setUTCSeconds=function(t,e){return this._value.setUTCSeconds(t,e)},e}(g),Dt=function(t){function e(e){void 0===e&&(e=function(){}),t.call(this,e,"Function",Z)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(g),St=I,Ft=rt,xt="[object Number]",wt=y,Ht=function(t){function e(e){void 0===e&&(e=0),t.call(this,e,"Number",wt)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(g),Yt=Array.isArray,kt=Yt,At=I,Nt=kt,Bt=rt,Pt="[object String]",zt=h,Et=function(t){function e(e){void 0===e&&(e=""),t.call(this,e,"String",zt)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(g),Gt={Class:_,Simple:g,Any:d,Array:pt,Boolean:yt,Date:Ot,Function:Dt,Number:Ht,String:Et};return Gt});
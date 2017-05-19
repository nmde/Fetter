import isDate from 'lodash/isDate';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import Class from '../class';
import s from '../simplify';
import _Any from './any';
import _Number from './number';
import _String from './string';

class _Date extends Class {
  constructor(
    defaultValue = new Date(),
    month = 0,
    day = 1,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0) {
    super(s(defaultValue), 'Date', {
      month: s(month),
      day: s(day),
      hours: s(hours),
      minutes: s(minutes),
      seconds: s(seconds),
      milliseconds: s(milliseconds),
    });
    const inherits = Object.getOwnPropertyNames(Date.prototype);
    for (let i = 0; i < inherits.length; i += 1) {
      if (!this[inherits[i]] && isFunction(Date.prototype[inherits[i]])) {
        if (inherits[i].indexOf('get') === 0 || inherits[i].indexOf('set') === 0) {
          this[inherits[i]] = (...args) =>
            new _Number(this._value[inherits[i]](args.map(arg => s(arg))));
        } else if (inherits[i].indexOf('to') === 0) {
          this[inherits[i]] = (...args) =>
            new _String(this._value[inherits[i]](args.map(arg => s(arg))));
        } else {
          this[inherits[i]] = (...args) =>
            new _Any(this._value[inherits[i]](args.map(arg => s(arg))));
        }
      }
    }
  }
  check(newValue) {
    return isDate(s(newValue));
  }
  set(newValue, ...extra) {
    if (this.check(newValue)) {
      this._value = newValue;
    } else if (isString(newValue)) {
      this._value = new Date(newValue);
    } else if (extra.length > 0) {
      this._value = new Date(newValue, extra);
    } else if (isNumber(this.extra.month)) {
      this._value = new Date(
        newValue,
        this.extra.month,
        this.extra.day,
        this.extra.hours,
        this.extra.minutes,
        this.extra.seconds,
        this.extra.milliseconds);
      this.extra = {};
    } else {
      throw new Error(`Value is not of type ${this.typeName} or String`);
    }
  }
  // @TODO: Maybe add toLocaleFormat?

  // These have to be manually defined because for some reason they are inherited from f.Class
  toLocaleString(locales, options) {
    return new _String(this._value.toLocaleString(s(locales), s(options)));
  }
  toString() {
    return new _String(this._value.toString());
  }
}

_Date.now = () => new _Number(Date.now());
_Date.parse = dateString => new _Number(Date.parse(s(dateString)));
_Date.UTC = (year, month, day = 1, hour = 0, minute = 0, second = 0, millisecond = 0) =>
  new _Number(Date.UTC(s(year), s(month), s(day), s(hour), s(minute), s(second), s(millisecond)));

export default _Date;

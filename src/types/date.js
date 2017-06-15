import isDate from 'lodash/isDate';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import Class from '../class';
import s from '../simplify';
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
    }, Date, {
      toDateString: _String,
    });
  }
  check(newValue) {
    return isDate(s(newValue));
  }
  set(newValue, ...extra) {
    if (this.check(newValue)) {
      this.setValue(newValue);
    } else if (isString(newValue)) {
      this.setValue(new Date(newValue));
    } else if (extra.length > 0) {
      this.setValue(new Date(newValue, extra));
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
  static now() {
    return new _Number(Date.now());
  }
  static parse(dateString) {
    return new _Number(Date.parse(s(dateString)));
  }
  static UTC(year, month, day = 1, hour = 0, minute = 0, second = 0, millisecond = 0) {
    return new _Number(
      Date.UTC(s(year), s(month), s(day), s(hour), s(minute), s(second), s(millisecond)));
  }
  // @TODO: Maybe add toLocaleFormat?
  toLocaleString(locales, options) {
    return new _String(this._value.toLocaleString(s(locales), s(options)));
  }
  toString() {
    return new _String(this._value.toString());
  }
}

export default _Date;

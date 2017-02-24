import isDate from 'lodash/isDate';
import Simple from '../simple';

export default class _Date extends Simple {
  constructor(defaultValue = new Date()) {
    super(defaultValue, 'Date', isDate);
    this.length = 7;
  }
  getDate() {
    return this._value.getDate();
  }
  getDay() {
    return this._value.getDay();
  }
  getFullYear() {
    return this._value.getFullYear();
  }
  getHours() {
    return this._value.getHours();
  }
  getMilliseconds() {
    return this._value.getMilliseconds();
  }
  getMinutes() {
    return this._value.getMinutes();
  }
  getMonth() {
    return this._value.getMonth();
  }
  getSeconds() {
    return this._value.getSeconds();
  }
  getTime() {
    return this._value.getTime();
  }
  getTimezoneOffset() {
    return this._value.getTimezoneOffset();
  }
  getUTCDate() {
    return this._value.getUTCDate();
  }
  getUTCDay() {
    return this._value.getUTCDay();
  }
  getUTCFullYear() {
    return this._value.getUTCFullYear();
  }
  getUTCHours() {
    return this._value.getUTCHours();
  }
  getUTCMilliseconds() {
    return this._value.getUTCMilliseconds();
  }
  getUTCMinutes() {
    return this._value.getUTCMinutes();
  }
  getUTCMonth() {
    return this._value.getUTCMonth();
  }
  getUTCSeconds() {
    return this._value.getUTCSeconds();
  }
  setDate(dayValue) {
    return this._value.setDate(dayValue);
  }
  setFullYear(yearValue, monthValue, dayValue) {
    return this._value.setFullYear(yearValue, monthValue, dayValue);
  }
  setHours(hoursValue, minutesValue, secondsValue, msValue) {
    return this._value.setHours(hoursValue, minutesValue, secondsValue, msValue);
  }
  setMilliseconds(millisecondsValue) {
    return this._value.setMilliseconds(millisecondsValue);
  }
  setMinutes(minutesValue, secondsValue, msValue) {
    return this._value.setMinutes(minutesValue, secondsValue, msValue);
  }
  setMonth(monthValue, dayValue) {
    return this._value.setMonth(monthValue, dayValue);
  }
  setSeconds(secondsValue, msValue) {
    return this._value.setSeconds(secondsValue, msValue);
  }
  setTime(timeValue) {
    return this._value.setTime(timeValue);
  }
  setUTCDate(dayValue) {
    return this._value.setUTCDate(dayValue);
  }
  setUTCFullYear(yearValue, monthValue, dayValue) {
    return this._value.setUTCFullYear(yearValue, monthValue, dayValue);
  }
  setUTCHours(hoursValue, minutesValue, secondsValue, msValue) {
    return this._value.setUTCHours(hoursValue, minutesValue, secondsValue, msValue);
  }
  setUTCMilliseconds(millisecondsValue) {
    return this._value.setUTCMilliseconds(millisecondsValue);
  }
  setUTCMinutes(minutesValue, secondsValue, msValue) {
    return this._value.setUTCMinutes(minutesValue, secondsValue, msValue);
  }
  setUTCMonth(monthValue, dayValue) {
    return this._value.setUTCMonth(monthValue, dayValue);
  }
  setUTCSeconds(secondsValue, msValue) {
    return this._value.setUTCSeconds(secondsValue, msValue);
  }
}

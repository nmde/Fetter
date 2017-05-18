import Class from './class';
import Simple from './simple';
import is from './is';
import enforce from './enforce';
import s from './simplify';
import convert from './convert';
import types from './types';

const exports = {
  Class,
  Simple,
  is,
  enforce,
  s,
  convert,
  types,
};

const typeList = Object.getOwnPropertyNames(types);
for (let i = 0; i < typeList.length; i += 1) {
  exports[typeList[i]] = types[typeList[i]];
}

export default exports;

import Class from './class';
import Simple from './simple';
import is from './is';
import enforce from './enforce';
import _Any from './types/any';
import _Array from './types/array';
import _ArrayBuffer from './types/array-buffer';
import _Boolean from './types/boolean';
import _Date from './types/date';
import _Function from './types/function';
import _Number from './types/number';
import _String from './types/string';

export default {
  Class,
  Simple,
  is,
  enforce,
  Any: _Any,
  Array: _Array,
  ArrayBuffer: _ArrayBuffer,
  Boolean: _Boolean,
  Date: _Date,
  Function: _Function,
  Number: _Number,
  String: _String,
};

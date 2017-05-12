import isArrayLikeObject from 'lodash/isArrayLikeObject';
import isPlainObject from 'lodash/isPlainObject';

export default function s(value, expand = true) {
  if (value) {
    if (value.fetter) {
      return s(value.value);
    } else if (isArrayLikeObject(value) && expand) {
      return value.map(item => s(item));
    } else if (isPlainObject(value) && expand) {
      const props = Object.getOwnPropertyNames(value);
      const temp = value;
      for (let i = 0; i < props.length; i += 1) {
        temp[props[i]] = s(value[props[i]]);
      }
      return temp;
    }
  }
  return value;
}

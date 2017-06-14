/* eslint no-param-reassign: ["off"] */
import s from './simplify';

function createHandler(DataType, model) {
  return function autoHandler(...args) {
    return new DataType(model.apply(s(this.value), s(args)));
  };
}

export default function (target, obj, parent) {
  const keys = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i] === 'toString') {
      throw new Error('toString cannot be used with Fetter\'s autoDefine!');
    }
    target[keys[i]] = createHandler(obj[keys[i]], parent[keys[i]]);
    target[keys[i]].bind(target);
  }
}

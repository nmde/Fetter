import is from './is';

export default function enforce(value, type) {
  if (!is(value, type)) {
    let realType;
    if (value.typeName) {
      realType = value.typeName;
    } else {
      realType = typeof value;
    }
    throw new Error(`Expected type ${type.typeName}, got ${realType}`);
  }
}

import is from './is';

export default function enforce(value, Type) {
  if (!is(value, Type)) {
    let realType;
    if (value.typeName) {
      realType = value.typeName;
    } else {
      realType = typeof value;
    }
    throw new Error(`Expected type ${new Type().typeName}, got ${realType}`);
  }
}

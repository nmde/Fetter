export default function is(value, Type) {
  return new Type().check(value);
}

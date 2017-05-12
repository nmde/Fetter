export default function convert(value, To) {
  if (value) {
    if (!value.fetter) {
      return new To(value);
    }
  }
  return value;
}

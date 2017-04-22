import isArrayBuffer from 'lodash/isArrayBuffer';
import Simple from '../simple';

class _ArrayBuffer extends Simple {
  constructor(defaultValue = 0) {
    super(new ArrayBuffer(defaultValue), 'ArrayBuffer', isArrayBuffer, ArrayBuffer);
  }
}

_ArrayBuffer.isView = ArrayBuffer.isView;
_ArrayBuffer.transfer = ArrayBuffer.transfer;

export default _ArrayBuffer;

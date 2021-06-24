import { Codec, ConstructorIdentity, RecordType, TransformSignature } from '../../type'
import { recordDecode, recordEncode } from './RecordCodec'

/**
 * Dynamic codec to decode object to class and encode it back to codec
 */
export class ClassCodec<T> implements Codec<T, RecordType> {
  readonly target: ConstructorIdentity<T>
  readonly signature: TransformSignature<T>

  constructor (target: ConstructorIdentity<T>, signature: TransformSignature<T>) {
    this.target = target
    this.signature = signature
  }

  decode (input: unknown): T {
    const Type = this.target.type
    return recordDecode(this.signature, input, new Type())
  }

  encode (input: T): RecordType {
    return recordEncode(this.signature, input, {})
  }
}

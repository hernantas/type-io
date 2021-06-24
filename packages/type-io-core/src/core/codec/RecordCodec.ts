import { Codec, RecordIdentity, RecordType, TransformSignature } from '../../type'

export function recordDecode <T, I = unknown> (signature: TransformSignature<T>, input: I, initial: T): T {
  if (typeof input === 'object' && input !== null) {
    for (const propT of signature) {
      const inPropName = propT.inName as keyof I
      const outPropName = propT.name as keyof T

      if (inPropName in input) {
        initial[outPropName] = propT.codec.decode(input[inPropName], propT.option)
      } else if (!propT.optional) {
        throw new Error(`"${propT.inName}" property is required but do not exist in given input when decoding`)
      }
    }
    return initial
  }
  throw new Error('Type of input must be an object when decoding')
}

export function recordEncode <T> (signature: TransformSignature<T>, input: T, initial: RecordType): RecordType {
  for (const propT of signature) {
    const inPropName = propT.name as keyof T
    const outPropName = propT.outName

    if (inPropName in input) {
      initial[outPropName] = propT.codec.encode(input[inPropName], propT.option)
    } else if (!propT.optional) {
      throw new Error(`"${propT.inName}" property is required but do not exist in given input when decoding`)
    }
  }
  return initial
}

export class RecordCodec<T extends RecordType> implements Codec<T, RecordType> {
  readonly target: RecordIdentity<T>
  readonly signature: TransformSignature<T>

  constructor (target: RecordIdentity<T>, signature: TransformSignature<T>) {
    this.target = target
    this.signature = signature
  }

  decode (input: unknown): T {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return recordDecode(this.signature, input, {} as T)
  }

  encode (input: T): RecordType {
    return recordEncode(this.signature, input, {})
  }
}

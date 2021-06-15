import { Codec, RecordIdentity, RecordType, TransformSchema } from '../../type'

function decode <T, I = unknown> (schema: TransformSchema<T>, input: I, initial: T): T {
  if (typeof input === 'object' && input !== null) {
    for (const propT of schema) {
      const inPropName = propT.inName as keyof typeof input
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

function encode <T extends RecordType> (schema: TransformSchema<T>, input: T, initial: RecordType): RecordType {
  for (const propT of schema) {
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
  readonly schema: TransformSchema<T>

  constructor (target: RecordIdentity<T>, schema: TransformSchema<T>) {
    this.target = target
    this.schema = schema
  }

  decode (input: unknown): T {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return decode(this.schema, input, {} as T)
  }

  encode (input: T): RecordType {
    return encode(this.schema, input, {})
  }
}

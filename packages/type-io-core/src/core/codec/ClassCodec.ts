import { Codec, ConstructorIdentity, RecordValue, TransformSchema } from '../../type'

/**
 * Dynamic codec to decode object to class and encode it back to codec
 */
export class ClassCodec<T> implements Codec<T, RecordValue> {
  readonly target: ConstructorIdentity<T>
  readonly schema: TransformSchema<T>

  constructor (target: ConstructorIdentity<T>, schema: TransformSchema<T>) {
    this.target = target
    this.schema = schema
  }

  decode (input: unknown): T {
    if (typeof input === 'object' && input !== null) {
      const Type = this.target.type
      const output = new Type()

      for (const propT of this.schema) {
        const inPropName = propT.inName as keyof typeof input
        const outPropName = propT.name as keyof T

        if (inPropName in input) {
          output[outPropName] = propT.codec.decode(input[inPropName], propT.option)
        } else if (!propT.optional) {
          throw new Error(`"${propT.inName}" property is required but do not exist in given input when decoding`)
        }
      }
      return output
    }

    throw new Error('Type of input must be an object when decoding')
  }

  encode (input: T): RecordValue {
    const output: RecordValue = {}
    for (const propT of this.schema) {
      const inPropName = propT.name as keyof T
      const outPropName = propT.outName

      if (inPropName in input) {
        output[outPropName] = propT.codec.encode(
          input[inPropName],
          propT.option
        )
      } else if (!propT.optional) {
        throw new Error(`"${propT.name}" property is required but do not exist in given input when encoding`)
      }
    }
    return output
  }
}

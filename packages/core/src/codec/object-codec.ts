import { AnyObject, AnyParamConstructor, CodecOf } from '../type'
import { Codec } from './codec'
import { PropDefinition } from './prop-definition'

/**
 * Dynamic codec to decode object to class and encode it back to codec
 */
export class ObjectCodec<T> implements Codec<T, AnyObject> {
  type: AnyParamConstructor<T>
  propDefs: PropDefinition[]
  codecs: CodecOf<T>

  constructor (type: AnyParamConstructor<T>, propDefs: PropDefinition[], codecs: CodecOf<T>) {
    this.type = type
    this.propDefs = propDefs
    this.codecs = codecs
  }

  decode (input: unknown): T {
    if (typeof input === 'object' && input !== null) {
      const Type = this.type
      const output = new Type()

      for (const propDef of this.propDefs) {
        const inPropName = propDef.inName as keyof typeof input
        const outPropName = propDef.name as keyof T

        if (inPropName in input) {
          output[outPropName] = this.codecs[outPropName].decode(
            input[inPropName],
            propDef.option
          ) as T[keyof T]
        } else if (!propDef.optional) {
          throw new Error(`'${propDef.inName}' property is required but do not exist in given input when decoding`)
        }
      }
      return output
    }

    throw new Error('Type of input must be an object when decoding')
  }

  encode (input: T): AnyObject {
    const output: AnyObject = {}
    for (const propDef of this.propDefs) {
      const inPropName = propDef.name as keyof T
      const outPropName = propDef.outName

      if (inPropName in input) {
        output[outPropName] = this.codecs[inPropName].encode(
          input[inPropName],
          propDef.option
        )
      } else if (!propDef.optional) {
        throw new Error(`'${propDef.name}' property is required but do not exist in given input when encoding`)
      }
    }
    return output
  }
}

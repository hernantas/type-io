import { Metadata } from './metadata'
import { AnyObject, AnyParamConstructor, TargetType } from '../type'
import { Codec } from './codec'
import { CodecOption } from './codec-option'
import { findTargetType } from './utils'
import { CodecManager } from './codec-manager'

export class Parser extends CodecManager {
  // eslint-disable-next-line no-useless-constructor
  constructor (codecCtors: AnyParamConstructor<Codec<unknown>>[]) {
    super(codecCtors)
  }

  decode <T, I> (input: I, type: TargetType<T>, options?: CodecOption): T {
    const codec = this.findOrCreate(type)
    return codec.decode(input, options)
  }

  encode <T> (input: T, type?: TargetType<T>, options?: CodecOption): unknown {
    if (type === undefined) {
      type = findTargetType(input)
    }

    const codec = this.findOrCreate(type)
    return codec.encode(input, options)
  }

  private findOrCreate <T> (type: TargetType<T>): Codec<T, unknown> {
    let codec = this.find(type)

    if (codec !== undefined) {
      return codec
    }

    if (typeof type === 'function') {
      codec = this.createCodec(type)
    } else if (type.type === Array) {
      codec = this.createArrayCodec(type.subType) as unknown as Codec<T, unknown>
    }

    if (codec !== undefined) {
      this.push(codec)
      return codec
    }

    throw new Error('No Codec found')
  }

  private createCodec <T, I extends AnyObject> (Type: AnyParamConstructor<T>): Codec<T, AnyObject, I> {
    const propDefs = Metadata.getTypeDef(Type)
    return {
      type: Type,
      decode: (input: I): T => {
        const output = new Type()
        for (const propDef of propDefs) {
          const inPropName = propDef.inName as keyof I
          const outPropName = propDef.name as keyof T

          if (inPropName in input) {
            output[outPropName] = this.decode(
              input[inPropName],
              propDef.type !== undefined ? { type: propDef.designType, subType: propDef.type } : propDef.designType,
              propDef.option
            ) as T[keyof T]
          } else if (!propDef.optional) {
            throw new Error(`'${propDef.inName}' property is required but do not exist in given input when decoding`)
          }
        }
        return output
      },
      encode: (input: T): AnyObject => {
        const output: AnyObject = {}
        for (const propDef of propDefs) {
          const inPropName = propDef.name as keyof T
          const outPropName = propDef.outName

          if (inPropName in input) {
            output[outPropName] = this.encode(
              input[inPropName],
              propDef.type !== undefined ? { type: propDef.designType, subType: propDef.type } : propDef.designType,
              propDef.option
            )
          } else if (!propDef.optional) {
            throw new Error(`'${propDef.name}' property is required but do not exist in given input when encoding`)
          }
        }
        return output
      }
    }
  }

  private createArrayCodec<T> (type: AnyParamConstructor<T>): Codec<T[], unknown> {
    return {
      type: Array,
      subType: type,
      decode: (input: unknown): T[] => {
        if (Array.isArray(input)) {
          return input.map(value => this.decode(value, type))
        }

        throw new Error('Unknown input value type, must be an array')
      },
      encode: (input: T[]): unknown => {
        return input.map(value => this.encode(value))
      }
    }
  }
}

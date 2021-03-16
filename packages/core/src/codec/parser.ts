import { Metadata } from './metadata'
import { AnyObject, AnyParamConstructor, TargetType } from '../type'
import { Codec } from './codec'
import { CodecOption } from './codec-option'
import { findTargetType } from './utils'

export class Parser {
  private codecs: Codec<unknown>[]

  constructor (codecs: AnyParamConstructor<Codec<unknown>>[]) {
    this.codecs = codecs.map(CodecConstructor => new CodecConstructor())
  }

  decode <T, I> (input: I, type: TargetType<T>, options?: CodecOption): T {
    const codec = this.findCodec(type)
    return codec.decode(input, options)
  }

  encode <T> (input: T, type?: TargetType<T>, options?: CodecOption): unknown {
    if (type === undefined) {
      type = findTargetType(input)
    }

    const codec = this.findCodec(type)
    return codec.encode(input, options)
  }

  private findCodec <T> (type: TargetType<T>): Codec<T, unknown> {
    const codecs = this.codecs.filter(codec => typeof type === 'function'
      ? codec.type === type
      : codec.type === type.type && codec.subType === type.subType
    ) as Codec<T, unknown>[]

    if (codecs.length > 0) {
      return codecs[0]
    }

    let codec

    if (typeof type === 'function') {
      codec = this.createCodec(type)
    } else if (type.type === Array) {
      codec = this.createArrayCodec(type.subType) as unknown as Codec<T, unknown>
    }

    if (codec !== undefined) {
      this.codecs.push(codec)
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

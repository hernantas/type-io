import { Metadata } from './metadata'
import { AnyObject, AnyParamConstructor } from '../type'
import { Codec } from './codec'
import { CodecOption } from './codec-option'
import { findTargetType } from './utils'

export class Parser {
  private codecs: Codec<unknown>[]

  constructor (codecs: AnyParamConstructor<Codec<unknown>>[]) {
    this.codecs = codecs.map(CodecConstructor => new CodecConstructor())
  }

  decode <T, I> (input: I[], type: AnyParamConstructor<T> | string, options?: CodecOption): T[]
  decode <T, I> (input: I, type: AnyParamConstructor<T> | string, options?: CodecOption): T
  decode <T, I> (input: I | I[], type: AnyParamConstructor<T> | string, options?: CodecOption): T | T[] {
    if (Array.isArray(input)) {
      return input.map(element => this.decode(element, type, options))
    }

    const codec = this.findCodec(type)
    return codec.decode(input, options)
  }

  encode <T> (input: T[], type?: AnyParamConstructor<T> | string, options?: CodecOption): unknown[]
  encode <T> (input: T, type?: AnyParamConstructor<T> | string, options?: CodecOption): unknown
  encode <T> (input: T | T[], type?: AnyParamConstructor<T> | string, options?: CodecOption): unknown | unknown[] {
    if (type === undefined) {
      type = findTargetType(input)
    }

    if (Array.isArray(input)) {
      return input.map(element => this.encode(element, type, options))
    }

    const codec = this.findCodec(type)
    return codec.encode(input, options)
  }

  private findCodec <T> (type: AnyParamConstructor<T> | string): Codec<T, unknown> {
    const codecs = this.codecs.filter(codec => typeof type === 'string'
      ? codec.typeName === type
      : codec.type === type
    ) as Codec<T, unknown>[]

    if (codecs.length > 0) {
      return codecs[0]
    }

    if (typeof type !== 'string') {
      const codec = this.createCodec(type)
      this.codecs.push(codec)
      return codec
    }

    throw new Error(`No Codec found for type '${type}'`)
  }

  private createCodec <T, I extends AnyObject> (Type: AnyParamConstructor<T>): Codec<T, AnyObject, I> {
    const propDefs = Metadata.getTypeDef(Type)
    return {
      type: Type,
      typeName: Type.name,
      decode: (input: I): T => {
        const output = new Type()
        for (const propDef of propDefs) {
          const inPropName = propDef.inName as keyof I
          const outPropName = propDef.name as keyof T

          if (inPropName in input) {
            output[outPropName] = this.decode(input[inPropName], propDef.type, propDef.option) as T[keyof T]
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
            output[outPropName] = this.encode(input[inPropName], propDef.type, propDef.option)
          } else if (!propDef.optional) {
            throw new Error(`'${propDef.name}' property is required but do not exist in given input when encoding`)
          }
        }
        return output
      }
    }
  }
}

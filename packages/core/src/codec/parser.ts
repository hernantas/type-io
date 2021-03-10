import { Metadata } from './metadata'
import { AnyObject, AnyParamConstructor } from '../type'
import { Codec } from './codec'

export class Parser {
  private codecs: Codec<unknown>[]

  constructor (codecs: AnyParamConstructor<Codec<unknown>>[]) {
    this.codecs = codecs.map(CodecConstructor => new CodecConstructor())
  }

  decode <T, I> (input: I[], Type: AnyParamConstructor<T>): T[]
  decode <T, I> (input: I, Type: AnyParamConstructor<T>): T
  decode <T, I> (input: I | I[], Type: AnyParamConstructor<T>): T | T[] {
    if (Array.isArray(input)) {
      const output: T[] = []
      for (const element of input) {
        output.push(this.decode(element, Type))
      }
      return output
    }

    const codec = this.findCodec(Type)
    return codec.decode(input)
  }

  encode <T> (input: T[], Type?: AnyParamConstructor<T>): unknown[]
  encode <T> (input: T, Type?: AnyParamConstructor<T>): unknown
  encode <T> (input: T | T[], Type?: AnyParamConstructor<T>): unknown | unknown[] {
    if (Type === undefined) {
      Type = findInputConstructor(input)
    }

    if (Array.isArray(input)) {
      const output = []
      for (const element of input) {
        output.push(this.encode(element, Type))
      }
      return output
    }

    const codec = this.findCodec(Type)
    return codec.encode(input)
  }

  private findCodec <T> (Type: AnyParamConstructor<T>): Codec<T, unknown> {
    for (const codec of this.codecs) {
      if (codec.type === Type) {
        return codec as Codec<T, unknown>
      }
    }

    const codec = this.createCodec(Type)
    this.codecs.push(codec)
    return codec
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
            output[outPropName] = this.decode(input[inPropName], propDef.type) as T[keyof T]
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
            output[outPropName] = this.encode(input[inPropName], propDef.type) as T[keyof T]
          } else if (!propDef.optional) {
            throw new Error(`'${propDef.name}' property is required but do not exist in given input when encoding`)
          }
        }
        return output
      }
    }
  }
}

function findInputConstructor <T> (input: T | T[]): AnyParamConstructor<T> {
  if (input instanceof Array) {
    if (input.length > 0) {
      return Object.getPrototypeOf(input[0]).constructor as AnyParamConstructor<T>
    } else {
      throw new Error('Must specify `Type` parameter when encoding empty array')
    }
  }

  return Object.getPrototypeOf(input).constructor as AnyParamConstructor<T>
}

import { Metadata } from './metadata'
import { AnyObject, AnyParamConstructor } from '../type'
import { Codec } from './codec'

export class Parser {
  codecs: Codec<unknown>[]

  constructor (codecs: AnyParamConstructor<Codec<unknown>>[]) {
    this.codecs = codecs.map(CodecConstructor => new CodecConstructor())
  }

  decode <T, I> (input: I[], Type: AnyParamConstructor<T>, traces?: string[]): T[]
  decode <T, I> (input: I, Type: AnyParamConstructor<T>, traces?: string[]): T
  decode <T, I> (input: I | I[], Type: AnyParamConstructor<T>, traces?: string[]): T | T[] {
    if (Array.isArray(input)) {
      const output: T[] = []
      for (const element of input) {
        output.push(this.decode(element, Type))
      }
      return output
    }

    const codec = this.findCodec(Type)
    if (codec !== undefined) {
      try {
        return codec.decode(input)
      } catch (e) {
        throw new Error(traces !== undefined
          ? `Error when decoding '${traces.join('.')}' property. Reason: ${e}`
          : `Error when decoding value. Reason: ${e}`
        )
      }
    } else if (typeof input === 'object' && input !== null) {
      // codec is not found but its an object
      const output = new Type()
      const propDefs = Metadata.getTypeDef(Type)

      for (const propDef of propDefs) {
        const inPropName = propDef.inName as keyof I
        const outPropName = propDef.name as keyof T

        // create traces
        const propTraces = traces !== undefined
          ? traces.concat(propDef.name)
          : [propDef.name]

        if (inPropName in input) {
          output[outPropName] = this.decode(
            input[inPropName],
            propDef.type,
            propTraces
          ) as T[keyof T]
        } else if (!propDef.optional) {
          throw new Error(`'${propTraces.join('.')}' property is required but do not exist in given input when decoding`)
        }
      }

      return output
    } else {
      throw new Error(traces !== undefined
        ? `No codec found for property '${traces.join('.')}' when decoding`
        : 'No codec found for given input when decoding'
      )
    }
  }

  encode <T> (input: T[], Type?: AnyParamConstructor<T>, traces?: string[]): unknown[]
  encode <T> (input: T, Type?: AnyParamConstructor<T>, traces?: string[]): unknown
  encode <T> (input: T | T[], Type?: AnyParamConstructor<T>, traces?: string[]): unknown | unknown[] {
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
    if (codec !== undefined) {
      try {
        return codec.encode(input)
      } catch (e) {
        throw new Error(traces !== undefined
          ? `Error when encoding '${traces.join('.')}' property. Reason: ${e}`
          : `Error when encoding value. Reason: ${e}`
        )
      }
    } else if (typeof input === 'object' && input !== null) {
      // codec is not found but its an object
      const output: AnyObject = {}
      const propDefs = Metadata.getTypeDef(Type)

      for (const propDef of propDefs) {
        const inPropName = propDef.inName as keyof T
        const outPropName = propDef.name

        // create traces
        const propTraces = traces !== undefined
          ? traces.concat(propDef.name)
          : [propDef.name]

        if (inPropName in input) {
          output[outPropName] = this.encode(
            input[inPropName],
            propDef.type,
            propTraces
          ) as T[keyof T]
        } else if (!propDef.optional) {
          throw new Error(`'${propTraces.join('.')}' property is required but do not exist in given input when encoding`)
        }
      }

      return output
    } else {
      throw new Error(traces !== undefined
        ? `No codec found for property '${traces.join('.')}' when encoding`
        : 'No codec found for given input when encoding'
      )
    }
  }

  private findCodec <T> (type: AnyParamConstructor<T>): Codec<T, unknown> | undefined {
    for (const codec of this.codecs) {
      if (codec.type === type) {
        return codec as Codec<T, unknown>
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

import { Metadata } from './metadata'
import { AnyObject, AnyParamConstructor } from '../type'
import { Codec } from './codec'

export abstract class Parser {
  codecs: Codec<unknown>[]

  constructor (codecs: AnyParamConstructor<Codec<unknown>>[]) {
    this.codecs = codecs.map(CodecConstructor => new CodecConstructor())
  }

  decode <T, I> (input: I, Type: AnyParamConstructor<T>, traces?: string[]): T {
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
      const output = this.createDecodeObject(Type)
      const propDefs = Metadata.getTypeDef(Type)

      for (const propDef of propDefs) {
        const defType = Array.isArray(propDef.type) ? propDef.type[0] : propDef.type
        const inPropName = propDef.inName as keyof I
        const outPropName = propDef.name as keyof T

        // create traces
        const propTraces = traces !== undefined
          ? traces.concat(propDef.name)
          : [propDef.name]

        if (inPropName in input) {
          if (Array.isArray(propDef.type)) {
            const outProp = []
            for (const index in input[inPropName]) {
              outProp[index as number] = this.decode(
                input[inPropName][index],
                defType,
                propTraces.concat(index)
              )
            }
            output[outPropName] = outProp as any
          } else {
            output[outPropName] = this.decode(
              input[inPropName],
              defType,
              propTraces
            ) as T[keyof T]
          }
        } else if (!propDef.optional) {
          throw new Error(`${propTraces.join('.')} property is required but do not exist in given input when decoding`)
        }
      }

      return output
    } else {
      throw new Error(traces !== undefined
        ? `No codec found for property ${traces.join('.')} when decoding`
        : 'No codec found for given input when decoding'
      )
    }
  }

  encode <T> (input: T, Type?: AnyParamConstructor<T>, traces?: string[]): unknown {
    if (Type === undefined) {
      Type = Object.getPrototypeOf(input).constructor as AnyParamConstructor<T>
    }

    const codec = this.findCodec(Type)

    if (codec !== undefined) {
      return codec.encode(input)
    } else if (typeof input === 'object' && input !== null) {
      // codec is not found but its an object
      const output: AnyObject = this.createEncodeObject(Type)
      const propDefs = Metadata.getTypeDef(Type)

      for (const propDef of propDefs) {
        const defType = Array.isArray(propDef.type) ? propDef.type[0] : propDef.type
        const inPropName = propDef.name as keyof T
        const outPropName = propDef.outName

        // create traces
        const propTraces = traces !== undefined
          ? traces.concat(propDef.name)
          : [propDef.name]

        if (inPropName in input) {
          if (Array.isArray(propDef.type)) {
            // when array
            const outProp = []
            for (const index in input[inPropName]) {
              outProp[index as number] = this.encode(
                input[inPropName][index],
                defType,
                propTraces.concat(index)
              )
            }
            output[outPropName] = outProp as any
          } else {
            // when non array
            output[outPropName] = this.encode(
              input[inPropName],
              defType,
              propTraces
            ) as T[keyof T]
          }
        } else if (!propDef.optional) {
          throw new Error(`${propTraces.join('.')} property is required but do not exist in given object when encoding`)
        }
      }

      return output
    } else {
      throw new Error(traces !== undefined
        ? `No codec found for property ${traces.join('.')} when encoding`
        : 'No codec found for given object when encoding'
      )
    }
  }

  abstract createDecodeObject <T> (Type: AnyParamConstructor<T>): T
  abstract createEncodeObject <T> (Type: AnyParamConstructor<T>): AnyObject

  private findCodec <T> (type: AnyParamConstructor<T>): Codec<T, unknown> | undefined {
    for (const codec of this.codecs) {
      if (codec.type === type) {
        return codec as Codec<T, unknown>
      }
    }
  }
}

import { Metadata } from './metadata'
import { AnyObject, AnyParamConstructor, TargetType } from '../type'
import { Codec } from './codec'
import { CodecOption } from './codec-option'
import { CodecManager } from './codec-manager'
import { TargetTypes } from './target-types'

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
      type = TargetTypes.find(input)
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
    } else if (TargetTypes.isValidArray(type)) {
      codec = this.createArrayCodec(type) as unknown as Codec<T, unknown>
    } else {
      throw new Error('No Codec was found and cannot dynamically create codec for given target type')
    }

    this.push(codec)
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
            output[outPropName] = this.decode(
              input[inPropName],
              propDef.type,
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
              propDef.type,
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

  private createArrayCodec<T> (type: TargetType<T>): Codec<T[], unknown[]> {
    return {
      type: TargetTypes.array(type),
      decode: (input: unknown): T[] => {
        if (Array.isArray(input)) {
          const unarrayType = TargetTypes.unArray(type)
          return input.map(value => this.decode(value, unarrayType))
        }

        throw new Error('Unknown input value type, must be an array')
      },
      encode: (input: T[]): unknown[] => {
        return input.map(value => this.encode(value))
      }
    }
  }
}

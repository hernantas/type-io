import { Metadata } from './metadata'
import { AnyObject, AnyParamConstructor, CodecOf, TargetType } from '../type'
import { Codec } from './codec'
import { CodecOption } from './codec-option'
import { CodecManager } from './codec-manager'
import { TargetTypes } from './target-types'
import { ObjectCodec } from './object-codec'
import { ArrayCodec } from './array-codec'
import { EnumCodec } from './enum-codec'

export class Parser extends CodecManager {
  // eslint-disable-next-line no-useless-constructor
  constructor (codecCtors: AnyParamConstructor<Codec<unknown>>[]) {
    super(codecCtors)
  }

  decode <T = unknown, I = unknown> (input: I, type: TargetType<T>, options?: CodecOption): T {
    if (!TargetTypes.isValid(type)) {
      throw new Error('Invalid target type')
    }

    const codec = this.findOrCreate(type)
    return codec.decode(input, options)
  }

  decodeArray <T = unknown, I = unknown> (input: I[], type: TargetType<T>, options?: CodecOption): T[] {
    if (!TargetTypes.isValid(type)) {
      throw new Error('Invalid target type')
    }
    return this.decode(input, TargetTypes.array(type), options)
  }

  encode <T = unknown> (input: T, type?: TargetType<T>, options?: CodecOption): unknown {
    if (type === undefined) {
      type = TargetTypes.find(input)
    }

    const codec = this.findOrCreate(type)
    return codec.encode(input, options)
  }

  encodeArray <T = unknown> (input: T[], type?: TargetType<T>, options?: CodecOption): unknown[] {
    if (type === undefined) {
      type = TargetTypes.unArray(TargetTypes.find(input))
    }
    return this.encode(input, TargetTypes.array(type), options) as unknown[]
  }

  private findOrCreate <T> (type: TargetType<T>): Codec<T, unknown> {
    let codec = this.find(type)

    if (codec !== undefined) {
      return codec
    }

    if (typeof type === 'function') {
      codec = this.createObjectCodec(type)
    } else if (TargetTypes.isNested(type) && type[0] === Array) {
      codec = this.createArrayCodec(TargetTypes.unArray(type)) as unknown as Codec<T, unknown>
    } else if (TargetTypes.isSingleUnion(type)) {
      codec = new EnumCodec(type, type[0]) as unknown as Codec<T, unknown>
    } else {
      throw new Error('No Codec was found and cannot dynamically create codec for given target type')
    }

    this.push(codec)
    return codec
  }

  private createObjectCodec <T, I extends AnyObject> (type: AnyParamConstructor<T>): Codec<T, AnyObject, I> {
    const propDefs = Metadata.getTypeDef(type)
    const codecs: Record<string, Codec<unknown>> = {}
    for (const propDef of propDefs) {
      codecs[propDef.name] = this.findOrCreate(propDef.type)
    }
    return new ObjectCodec(type, propDefs, codecs as CodecOf<T>)
  }

  private createArrayCodec<T> (type: TargetType<T>): Codec<T[], unknown[]> {
    const codec = this.findOrCreate(type)
    return new ArrayCodec(type, codec)
  }
}

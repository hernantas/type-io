import { array, isConstructorValue, type, isConstructorIdentity, isLiteralIdentity, isArrayIdentity, isMemberIdentity } from './type'
import { TargetType, CodecOption, Codec, TypeKind, ConstructorIdentity, TransformSchema, TransformProperty, ArrayIdentity } from '../type'
import { LiteralCodec, TupleCodec, UnionCodec, ClassCodec, ArrayCodec } from './codec'
import { CodecManager } from './CodecManager'
import { findCtor, getSchema } from './util'

export class Parser extends CodecManager {
  decode <T = unknown, I = unknown> (input: I, target: TargetType<T>, options?: CodecOption): T {
    const codec = this.findOrCreate(target)
    return codec.decode(input, options)
  }

  decodeArray <T = unknown, I = unknown> (input: I[], target: TargetType<T>, options?: CodecOption): T[] {
    return this.decode(input, array(target), options)
  }

  encode <T = unknown> (input: T, target?: TargetType<T>, options?: CodecOption): unknown {
    if (target === undefined) {
      target = findCtor(input)
    }

    const codec = this.findOrCreate(target)
    return codec.encode(input, options)
  }

  encodeArray <T = unknown> (input: T[], target?: TargetType<T>, options?: CodecOption): unknown[] {
    if (target === undefined) {
      target = findCtor(input)
    }
    return this.encode(input, array(target), options) as unknown[]
  }

  private findOrCreate <T> (target: TargetType<T>): Codec<T, unknown> {
    let codec = this.find(target)

    if (codec !== undefined) {
      return codec
    }

    if (isConstructorValue(target)) {
      target = type(target)
    }

    if (isConstructorIdentity(target)) {
      codec = this.createClassCodec(target)
    } else if (isLiteralIdentity(target)) {
      codec = new LiteralCodec(target) as unknown as Codec<T, unknown>
    } else if (isArrayIdentity(target)) {
      codec = this.createArrayCodec(target) as unknown as Codec<T, unknown>
    } else if (isMemberIdentity(target)) {
      const codecs = target.members.map(member => this.findOrCreate(member))
      switch (target.kind) {
        case TypeKind.Tuple:
          codec = new TupleCodec(target, codecs) as unknown as Codec<T, unknown>
          break
        case TypeKind.Union:
          codec = new UnionCodec(target, codecs) as unknown as Codec<T, unknown>
          break
        default:
          throw new Error('Invalid member target type')
      }
    } else {
      throw new Error('No Codec was found and cannot dynamically create codec for given target type')
    }

    this.push(codec)
    return codec
  }

  private createClassCodec <T> (identity: ConstructorIdentity<T>): ClassCodec<T> {
    const schema = getSchema(identity.type)
    const transformSchema: TransformSchema<T> = schema
      .map(info => {
        const transformProp = info as TransformProperty<unknown>
        transformProp.codec = this.findOrCreate(info.type)
        return transformProp
      }) as TransformSchema<T>
    return new ClassCodec(identity, transformSchema)
  }

  private createArrayCodec<T> (type: ArrayIdentity<T>): ArrayCodec<T> {
    const codec = this.findOrCreate(type.type)
    return new ArrayCodec(type, codec)
  }
}

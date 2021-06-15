import { isConstructorType, type, isConstructorIdentity, isLiteralIdentity, isArrayIdentity, isMemberIdentity, findIdentity, isRecordIdentity, toIdentity } from './type'
import { TargetType, CodecOption, Codec, TypeKind, ConstructorIdentity, TransformSchema, TransformProperty, ArrayIdentity, RecordType, RecordIdentity } from '../type'
import { LiteralCodec, TupleCodec, UnionCodec, ClassCodec, ArrayCodec, RecordCodec } from './codec'
import { CodecManager } from './CodecManager'
import { getSchema } from './util'

export class Parser extends CodecManager {
  decode <T = unknown, I = unknown> (input: I, target: TargetType<T>, options?: CodecOption): T {
    const codec = this.findOrCreate(target)
    return codec.decode(input, options)
  }

  encode <T = unknown> (input: T, target?: TargetType<T>, options?: CodecOption): unknown {
    if (target === undefined) {
      target = findIdentity(input)
    }

    const codec = this.findOrCreate(target)
    return codec.encode(input, options)
  }

  private findOrCreate <T> (target: TargetType<T>): Codec<T, unknown> {
    target = toIdentity(target)

    let codec = this.find(target)

    if (codec !== undefined) {
      return codec
    }

    if (isConstructorIdentity(target)) {
      codec = this.createClassCodec(target)
    } else if (isRecordIdentity(target)) {
      codec = this.createRecordCodec(target) as unknown as Codec<T, unknown>
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
    const transformSchema = schema
      .map(info => {
        const transformProp: TransformProperty<unknown> = {
          ...info,
          codec: this.findOrCreate(info.type)
        }
        return transformProp
      }) as TransformSchema<T>
    return new ClassCodec(identity, transformSchema)
  }

  private createRecordCodec <T extends RecordType> (identity: RecordIdentity<T>): RecordCodec<T> {
    const transformSchema = Object
      .keys(identity.props)
      .map(key => {
        const target = identity.props[key]
        const transformProp: TransformProperty<T[string]> = {
          name: key,
          inName: key,
          outName: key,
          type: target,
          optional: false,
          codec: this.findOrCreate(target)
        }
        return transformProp
      }) as TransformSchema<T>
    return new RecordCodec(identity, transformSchema)
  }

  private createArrayCodec<T> (type: ArrayIdentity<T>): ArrayCodec<T> {
    const codec = this.findOrCreate(type.type)
    return new ArrayCodec(type, codec)
  }
}

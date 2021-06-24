import { isConstructorIdentity, isLiteralIdentity, isArrayIdentity, isMemberIdentity, findIdentity, isRecordIdentity, toIdentity } from './type'
import { TargetType, CodecOption, Codec, TypeKind, ConstructorIdentity, ArrayIdentity, RecordType, RecordIdentity, ConstructorType, TransformProperty } from '../type'
import { LiteralCodec, TupleCodec, UnionCodec, ClassCodec, ArrayCodec, RecordCodec, UnknownCodec } from './codec'
import { CodecManager } from './CodecManager'
import { getSignature } from './util'

export class Parser extends CodecManager {
  constructor (...codecCtors: Array<ConstructorType<Codec<any>>>) {
    super(...codecCtors, UnknownCodec)
  }

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
      switch (target._kind) {
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
    const signature = getSignature(identity.type)
    const transform = signature.map(val => {
      return {
        ...val,
        codec: this.findOrCreate(val.type)
      }
    })
    return new ClassCodec(identity, transform)
  }

  private createRecordCodec <T extends RecordType> (identity: RecordIdentity<T>): RecordCodec<T> {
    const transform = Object.keys(identity.props).map(key => {
      const target = identity.props[key as keyof T]
      return {
        name: key,
        inName: key,
        outName: key,
        type: target,
        optional: false,
        codec: this.findOrCreate(target)
      }
    })
    return new RecordCodec(identity, transform)
  }

  private createArrayCodec<T> (type: ArrayIdentity<T>): ArrayCodec<T> {
    const codec = this.findOrCreate(type.type)
    return new ArrayCodec(type, codec)
  }
}

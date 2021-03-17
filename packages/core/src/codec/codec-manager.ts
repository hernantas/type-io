import { AnyParamConstructor, TargetType } from '../type'
import { Codec } from './codec'

export class CodecManager {
  private codecs: Codec<unknown>[]

  constructor (codecCtors?: AnyParamConstructor<Codec<unknown>>[]) {
    this.codecs = codecCtors !== undefined
      ? codecCtors.map(CodecCtor => new CodecCtor())
      : []
  }

  push (...codecs: Codec<unknown>[]): number {
    return this.codecs.push(...codecs)
  }

  find <T> (type: TargetType<T>): Codec<T, unknown> | undefined {
    const codecs = this.codecs.filter(codec => typeof type === 'function'
      ? codec.type === type
      : codec.type === type.type && codec.subType === type.subType
    ) as Codec<T, unknown>[]
    return codecs.length > 0 ? codecs[0] : undefined
  }
}

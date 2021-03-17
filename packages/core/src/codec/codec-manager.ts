import { AnyParamConstructor, TargetType } from '../type'
import { Codec } from './codec'
import { TargetTypes } from './target-types'

export class CodecManager {
  private codecs: Codec<unknown>[] = []

  constructor (codecCtors?: AnyParamConstructor<Codec<unknown>>[]) {
    this.push(...(codecCtors ?? []).map(CodecCtor => new CodecCtor()))
  }

  push (...codecs: Codec<unknown>[]): number {
    for (const codec of codecs) {
      if (!TargetTypes.isValid(codec.type)) {
        throw new Error('Cannot add codec with invalid type')
      }
    }
    return this.codecs.push(...codecs)
  }

  find <T> (type: TargetType<T>): Codec<T, unknown> | undefined {
    if (TargetTypes.isValid(type)) {
      const codecs = this.codecs.filter(codec => TargetTypes.equal(codec.type, type)) as Codec<T, unknown>[]
      return codecs.length > 0 ? codecs[0] : undefined
    }
  }
}

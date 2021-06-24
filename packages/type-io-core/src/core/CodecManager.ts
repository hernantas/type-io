import { ConstructorType, TargetType } from '../type'
import { Codec } from '../type/Codec'
import { isEqual, isStrictEqual } from './type'

export class CodecManager {
  readonly #codecs: Array<Codec<unknown>> = []

  constructor (...codecCtors: Array<ConstructorType<Codec<any>>>) {
    this.push(...codecCtors.map(Ctor => new Ctor()))
  }

  push (...codecs: Array<Codec<any>>): number {
    return this.#codecs.push(...codecs)
  }

  find <T> (target: TargetType<T>): Codec<T, unknown> | undefined {
    const codecs = this.#codecs.filter(codec => isEqual(target, codec.target)) as Array<Codec<T, unknown>>
    if (codecs.length > 0) {
      const strictCodecs = codecs.filter(codec => isStrictEqual(target, codec.target))
      return strictCodecs.length > 0 ? strictCodecs[0] : codecs[0]
    }
    return undefined
  }
}

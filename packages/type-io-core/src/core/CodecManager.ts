import { ConstructorValue, TargetType } from '../type'
import { Codec } from '../type/Codec'
import { isTargetType } from './type'

export class CodecManager {
  readonly #codecs: Array<Codec<unknown>> = []

  constructor (...codecCtors: Array<ConstructorValue<Codec<any>>>) {
    this.push(...((codecCtors ?? []).map(CodecCtor => new CodecCtor())))
  }

  push (...codecs: Array<Codec<any>>): number {
    return this.#codecs.push(...codecs)
  }

  find <T> (target: TargetType<T>): Codec<T, unknown> | undefined {
    const codecs = this.#codecs.filter(codec => isTargetType(target, codec.target)) as Array<Codec<T, unknown>>
    return codecs.length > 0 ? codecs[0] : undefined
  }
}

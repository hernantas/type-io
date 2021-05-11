import { TargetType } from '../type'
import { Codec } from './codec'

export class EnumCodec implements Codec<string | number> {
  type: TargetType

  values: (string | number)[]

  constructor (type: TargetType, values: (string | number)[]) {
    this.type = type
    this.values = values
  }

  decode (value: unknown): string | number {
    if ((typeof value === 'string' || typeof value === 'number') && this.values.includes(value)) {
      return value
    }

    throw new Error('Unknown value type: ' + this.values + ' = ' + value)
  }

  encode (value: string | number): string | number {
    return value
  }
}

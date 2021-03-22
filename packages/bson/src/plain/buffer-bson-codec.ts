import { Codec } from '@type-io/core'
import { Binary } from 'bson'

export class BufferBsonCodec implements Codec<Buffer, Binary> {
  type = Buffer

  decode (value: unknown): Buffer {
    if (value instanceof Buffer) {
      return value
    }

    if (value instanceof Binary) {
      return value.buffer
    }

    if (typeof value === 'string' || value instanceof Uint8Array || isNumberArray(value)) {
      return Buffer.from(value)
    }

    throw new Error('Unknown value type')
  }

  encode (value: Buffer): Binary {
    return new Binary(value)
  }
}

function isNumberArray (values: unknown): values is number[] {
  if (!Array.isArray(values)) {
    return false
  }

  for (const value of values) {
    if (typeof value !== 'number') {
      return false
    }
  }
  return true
}

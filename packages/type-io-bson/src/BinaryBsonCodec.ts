import { Codec, CodecOption } from '@type-io/core'
import { Binary } from 'bson'

const BUFFER_ENCODINGS = [
  'ascii',
  'utf8',
  'utf-8',
  'utf16le',
  'ucs2',
  'ucs-2',
  'base64',
  'latin1',
  'binary',
  'hex'
] as const

type BufferEncoding = typeof BUFFER_ENCODINGS[number]

export class BufferBsonCodec implements Codec<Buffer, Binary> {
  readonly target = Buffer

  decode (value: unknown, options?: CodecOption): Buffer {
    if (value instanceof Binary) {
      return value.buffer
    }

    if (value instanceof Buffer) {
      return value
    }

    if (typeof value === 'string') {
      if (typeof options?.encoding === 'string') {
        const encoding = options.encoding
        if (isValidEncoding(encoding)) {
          return Buffer.from(value, encoding)
        }
      }

      return Buffer.from(value)
    }

    if (value instanceof Uint8Array || isNumberArray(value)) {
      return Buffer.from(value)
    }

    throw new Error('Unknown value type')
  }

  encode (value: Buffer): Binary {
    return new Binary(value)
  }
}

abstract class BinaryBaseCodec<O> implements Codec<Binary, O> {
  readonly target = Binary

  decode (value: unknown, options?: CodecOption): Binary {
    if (value instanceof Binary) {
      return value
    }

    if (value instanceof Buffer) {
      return new Binary(value)
    }

    if (typeof value === 'string') {
      if (typeof options?.encoding === 'string') {
        const encoding = options.encoding
        if (isValidEncoding(encoding)) {
          return new Binary(Buffer.from(value, encoding))
        }
      }

      return new Binary(Buffer.from(value))
    }

    if (value instanceof Uint8Array || isNumberArray(value)) {
      return new Binary(Buffer.from(value))
    }

    throw new Error('Unknown value type')
  }

  abstract encode (value: Binary, options?: CodecOption): O
}

export class BinaryBsonCodec extends BinaryBaseCodec<Binary> {
  encode (value: Binary): Binary {
    return value
  }
}

export class BinaryPlainBsonCodec extends BinaryBaseCodec<string> {
  encode (value: Binary, options?: CodecOption): string {
    let encoding: BufferEncoding | undefined
    if (typeof options?.encoding === 'string') {
      const opt = options.encoding
      if (isValidEncoding(opt)) {
        encoding = opt
      }
    }
    return value.buffer.toString(encoding)
  }
}

function isValidEncoding (value: unknown): value is BufferEncoding {
  return typeof value === 'string' && BUFFER_ENCODINGS.includes(value as BufferEncoding)
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

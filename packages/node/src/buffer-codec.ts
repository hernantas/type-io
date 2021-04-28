import { Codec, CodecOption } from '@type-io/core'

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

export class BufferCodec implements Codec<Buffer, string> {
  type = Buffer

  decode (value: unknown, options?: CodecOption): Buffer {
    if (value instanceof Buffer) {
      return value
    }

    if (typeof value === 'string') {
      if (options !== undefined && options.encoding !== undefined && typeof options.encoding === 'string') {
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

  encode (value: Buffer): string {
    return value.toString()
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

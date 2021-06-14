import { expect } from 'chai'
import { Codec, Parser, Prop, type, variant } from '../../src'

describe('Codec functionality', () => {
  class StringCodec implements Codec<string> {
    readonly target = type(String)

    decode (val: unknown): string {
      if (typeof val === 'string') {
        return val
      }
      return String(val)
    }

    encode (value: string): string {
      return value
    }
  }

  class StringNumberCodec implements Codec<string, number> {
    readonly target = variant(String, Number)

    decode (value: unknown): string {
      const str = this.decodeToString(value)
      const num = Number(str)
      return !Number.isNaN(num) ? String(num) : '0'
    }

    encode (value: string): number {
      return Number(value)
    }

    private decodeToString (val: unknown): string {
      if (typeof val === 'string') {
        return val
      }
      return String(val)
    }
  }

  class Basic {
    @Prop()
    typeString: string

    @Prop({ type: variant(String, Number) })
    typeStringNumber: string

    constructor () {
      this.typeString = ''
      this.typeStringNumber = '0'
    }
  }

  const parser = new Parser(
    StringCodec,
    StringNumberCodec
  )

  it('Codec variant selection', () => {
    const plain = {
      typeString: 'This is string',
      typeStringNumber: 150
    }

    const decode = parser.decode(plain, Basic)
    const encode = parser.encode(decode)

    expect(decode).to.have.property('typeString', plain.typeString)
    expect(decode).to.have.property('typeStringNumber', plain.typeStringNumber.toString())
    expect(encode).to.have.property('typeString', plain.typeString)
    expect(encode).to.have.property('typeStringNumber', plain.typeStringNumber)
  })
})

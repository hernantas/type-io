import { BsonParser } from '../src'
import { Decimal128, Double, Int32, Long } from 'bson'
import { expect } from 'chai'

describe('[BSON] Bson Parser (Decimal128 Codec)', () => {
  const parser = new BsonParser()

  it('Decode/Encode from Decimal128', () => {
    const str = '1234567890.12345467890'
    const value = Decimal128.fromString(str)
    const decode = parser.decode(value, [String, Decimal128])
    const encode = parser.encode(decode, [String, Decimal128])

    expect(decode).to.equal(str)
    expect(String(encode)).to.equal(value.toString())
  })

  it('Decode/Encode from String', () => {
    const value = '1234567890.12345467890'
    const decode = parser.decode(value, [String, Decimal128])
    const encode = parser.encode(decode, [String, Decimal128])

    expect(decode).to.equal(value)
    expect(String(encode)).to.equal(value)
  })

  it('Decode/Encode from Number', () => {
    const value = 1234567890.1234
    const decode = parser.decode(value, [String, Decimal128])
    const encode = parser.encode(decode, [String, Decimal128])

    expect(decode).to.equal(value.toString())
    expect(String(encode)).to.equal(value.toString())
  })

  it('Decode/Encode from Long', () => {
    const value = Long.fromString('1234567890')
    const decode = parser.decode(value, [String, Decimal128])
    const encode = parser.encode(decode, [String, Decimal128])

    expect(decode).to.equal(value.toString())
    expect(String(encode)).to.equal(value.toString())
  })

  it('Decode/Encode from Boolean', () => {
    const tDec = parser.decode(true, [String, Decimal128])
    const tEnc = parser.encode(tDec, [String, Decimal128])
    expect(tDec).to.equal('1')
    expect(String(tEnc)).to.equal('1')

    const fDec = parser.decode(false, [String, Decimal128])
    const fEnc = parser.encode(fDec, [String, Decimal128])
    expect(fDec).to.equal('0')
    expect(String(fEnc)).to.equal('0')
  })

  it('Decode/Encode from Double', () => {
    const value = new Double(1234567.1234)
    const decode = parser.decode(value, [String, Decimal128])
    const encode = parser.encode(decode, [String, Decimal128])

    expect(decode).to.equal(value.value.toString())
    expect(String(encode)).to.be.equal(value.value.toString())
  })

  it('Decode/Encode from Int32', () => {
    const value = new Int32(1234567)
    const decode = parser.decode(value, [String, Decimal128])
    const encode = parser.encode(decode, [String, Decimal128])

    expect(decode).to.equal(value.value.toString())
    expect(String(encode)).to.be.equal(value.value.toString())
  })
})

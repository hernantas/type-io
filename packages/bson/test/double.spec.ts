import { BsonParser } from '../src'
import { Double, Int32 } from 'bson'
import { expect } from 'chai'

describe('[BSON] Bson Parser (Double Codec)', () => {
  const parser = new BsonParser()

  it('Decode/Encode from Double', () => {
    const value = new Double(1234567890.1234)
    const decode = parser.decode(value, [Number, Double]) as number
    const encode = parser.encode(decode, [Number, Double]) as Double

    expect(decode).to.equal(value.value)
    expect(encode.value).to.equal(value.value)
  })

  it('Decode/Encode from Int32', () => {
    const value = new Int32(1234567890)
    const decode = parser.decode(value, [Number, Double]) as number
    const encode = parser.encode(decode, [Number, Double]) as Double

    expect(decode).to.equal(value.value)
    expect(encode.value).to.equal(value.value)
  })

  it('Decode/Encode from Number', () => {
    const value = 1234567890.1234
    const decode = parser.decode(value, [Number, Double]) as number
    const encode = parser.encode(decode, [Number, Double]) as Double

    expect(decode).to.equal(value)
    expect(encode.value).to.equal(value)
  })

  it('Decode/Encode from String', () => {
    const num = 1234567890.1234
    const value = num.toString()
    const decode = parser.decode(value, [Number, Double]) as number
    const encode = parser.encode(decode, [Number, Double]) as Double

    expect(decode).to.equal(num)
    expect(encode.value).to.equal(num)
  })

  it('Decode/Encode from Boolean', () => {
    const tDec = parser.decode(true, [Number, Double]) as number
    const tEnc = parser.encode(tDec, [Number, Double]) as Double
    expect(tDec).to.equal(1)
    expect(tEnc.value).to.equal(1)

    const fDec = parser.decode(false, [Number, Double]) as number
    const fEnc = parser.encode(fDec, [Number, Double]) as Double
    expect(fDec).to.equal(0)
    expect(fEnc.value).to.equal(0)
  })
})

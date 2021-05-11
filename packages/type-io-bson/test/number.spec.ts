import { BsonParser } from '../src'
import { Double, Int32 } from 'bson'
import { expect } from 'chai'

describe('[BSON] Bson Parser (Number Codec)', () => {
  const parser = new BsonParser()

  it('Decode/Encode from Number', () => {
    const value = 1234567890
    const decode = parser.decode(value, Number)
    const encode = parser.encode(decode, Number)

    expect(decode).to.equal(value)
    expect(encode).to.equal(value)
  })

  it('Decode/Encode from Double', () => {
    const value = new Double(12345.6789)
    const decode = parser.decode(value, Number)
    const encode = parser.encode(decode, Number)

    expect(decode).to.equal(value.value)
    expect(encode).to.equal(value.value)
  })

  it('Decode/Encode from Int32', () => {
    const value = new Int32(12345.6789)
    const decode = parser.decode(value, Number)
    const encode = parser.encode(decode, Number)

    expect(decode).to.equal(value.value)
    expect(encode).to.equal(value.value)
  })

  it('Decode/Encode from String', () => {
    const num = 1234567890
    const value = num.toString()
    const decode = parser.decode(value, Number)
    const encode = parser.encode(decode, Number)

    expect(decode).to.equal(num)
    expect(encode).to.equal(num)
  })

  it('Decode/Encode from Boolean', () => {
    const tDec = parser.decode(true, Number)
    const tEnc = parser.encode(tDec, Number)
    expect(tDec).to.equal(1)
    expect(tEnc).to.equal(1)

    const fDec = parser.decode(false, Number)
    const fEnc = parser.encode(fDec, Number)
    expect(fDec).to.equal(0)
    expect(fEnc).to.equal(0)
  })
})

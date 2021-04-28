import { BsonParser } from '../src'
import { Double, Int32, Long } from 'bson'
import { expect } from 'chai'

describe('[BSON] Bson Parser (Double Codec)', () => {
  const parser = new BsonParser()

  it('Decode/Encode from Long', () => {
    const str = '1234567890'
    const value = Long.fromString(str)
    const decode = parser.decode(value, [String, Long]) as string
    const encode = parser.encode(decode, [String, Long]) as Long

    expect(decode).to.equal(str)
    expect(String(encode)).to.equal(str)
  })

  it('Decode/Encode from Number', () => {
    const value = 1234567890
    const decode = parser.decode(value, [String, Long]) as string
    const encode = parser.encode(decode, [String, Long]) as Long

    expect(decode).to.equal(value.toString())
    expect(String(encode)).to.equal(value.toString())
  })

  it('Decode/Encode from Int32', () => {
    const value = new Int32(1234567890)
    const decode = parser.decode(value, [String, Long]) as string
    const encode = parser.encode(decode, [String, Long]) as Long

    expect(decode).to.equal(value.value.toString())
    expect(String(encode)).to.equal(value.value.toString())
  })

  it('Decode/Encode from Double', () => {
    const value = new Double(1234567890.12345)
    const decode = parser.decode(value, [String, Long]) as string
    const encode = parser.encode(decode, [String, Long]) as Long

    expect(decode).to.equal((1234567890).toString())
    expect(String(encode)).to.equal((1234567890).toString())
  })

  it('Decode/Encode from String', () => {
    const value = '1234567890'
    const decode = parser.decode(value, [String, Long]) as string
    const encode = parser.encode(decode, [String, Long]) as Long

    expect(decode).to.equal(value)
    expect(String(encode)).to.equal(value)
  })

  it('Decode/Encode from Boolean', () => {
    const tDec = parser.decode(true, [String, Long]) as string
    const tEnc = parser.encode(tDec, [String, Long]) as Long
    expect(tDec).to.equal('1')
    expect(String(tEnc)).to.equal('1')

    const fDec = parser.decode(false, [String, Long]) as string
    const fEnc = parser.encode(fDec, [String, Long]) as Long
    expect(fDec).to.equal('0')
    expect(String(fEnc)).to.equal('0')
  })
})

import { variant } from '@type-io/core'
import { BsonParser } from '../../src'
import { Double, Int32, Long } from 'bson'
import { expect } from 'chai'

describe('[BSON] Bson Parser (Double Codec)', () => {
  const parser = new BsonParser()

  it('Decode/Encode from Long', () => {
    const str = '1234567890'
    const value = Long.fromString(str)
    const decode = parser.decode(value, variant(String, Long))
    const encode = parser.encode(decode, variant(String, Long)) as Long

    expect(decode).to.equal(str)
    expect(String(encode)).to.equal(str)
  })

  it('Decode/Encode from Number', () => {
    const value = 1234567890
    const decode = parser.decode(value, variant(String, Long))
    const encode = parser.encode(decode, variant(String, Long)) as Long

    expect(decode).to.equal(value.toString())
    expect(String(encode)).to.equal(value.toString())
  })

  it('Decode/Encode from Int32', () => {
    const value = new Int32(1234567890)
    const decode = parser.decode(value, variant(String, Long))
    const encode = parser.encode(decode, variant(String, Long)) as Long

    expect(decode).to.equal(value.value.toString())
    expect(String(encode)).to.equal(value.value.toString())
  })

  it('Decode/Encode from Double', () => {
    const value = new Double(1234567890.12345)
    const decode = parser.decode(value, variant(String, Long))
    const encode = parser.encode(decode, variant(String, Long)) as Long

    expect(decode).to.equal((1234567890).toString())
    expect(String(encode)).to.equal((1234567890).toString())
  })

  it('Decode/Encode from String', () => {
    const value = '1234567890'
    const decode = parser.decode(value, variant(String, Long))
    const encode = parser.encode(decode, variant(String, Long)) as Long

    expect(decode).to.equal(value)
    expect(String(encode)).to.equal(value)
  })

  it('Decode/Encode from Boolean', () => {
    const tDec = parser.decode(true, variant(String, Long))
    const tEnc = parser.encode(tDec, variant(String, Long)) as Long
    expect(tDec).to.equal('1')
    expect(String(tEnc)).to.equal('1')

    const fDec = parser.decode(false, variant(String, Long))
    const fEnc = parser.encode(fDec, variant(String, Long)) as Long
    expect(fDec).to.equal('0')
    expect(String(fEnc)).to.equal('0')
  })
})

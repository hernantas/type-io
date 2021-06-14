import { variant } from '@type-io/core'
import { BsonParser } from '../../src'
import { Long, Timestamp } from 'bson'
import { expect } from 'chai'

describe('[BSON] Bson Parser (Timestamp Codec)', () => {
  const parser = new BsonParser()

  it('Decode/Encode from Timestamp', () => {
    const valStr = '1618819191'
    const valLong = Long.fromString(valStr)
    const value = new Timestamp(valLong)
    const decode = parser.decode(value, variant(String, Timestamp))
    const encode = parser.encode(decode, variant(String, Timestamp)) as Timestamp

    expect(decode).to.equal(valStr)
    expect(encode.toString()).to.equal(valStr)
  })

  it('Decode/Encode from String', () => {
    const value = '1618819191'
    const decode = parser.decode(value, variant(String, Timestamp))
    const encode = parser.encode(decode, variant(String, Timestamp)) as Timestamp

    expect(decode).to.equal(value)
    expect(encode.toString()).to.equal(value)
  })

  it('Decode/Encode from Number', () => {
    const value = 1618819191
    const decode = parser.decode(value, variant(String, Timestamp))
    const encode = parser.encode(decode, variant(String, Timestamp)) as Timestamp

    expect(decode).to.equal(value.toString())
    expect(encode.toString()).to.equal(value.toString())
  })

  it('Decode/Encode from Long', () => {
    const valStr = '1618819191'
    const value = Long.fromString(valStr)
    const decode = parser.decode(value, variant(String, Timestamp))
    const encode = parser.encode(decode, variant(String, Timestamp)) as Timestamp

    expect(decode).to.equal(valStr)
    expect(encode.toString()).to.equal(valStr)
  })
})

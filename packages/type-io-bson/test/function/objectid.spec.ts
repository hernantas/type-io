import { variant } from '@type-io/core'
import { BsonParser } from '../../src'
import { ObjectId } from 'bson'
import { expect } from 'chai'

describe('[BSON] Bson Parser (ObjectId Codec)', () => {
  const parser = new BsonParser()

  it('[String/ObjectId] Decode/Encode from ObjectId', () => {
    const value = new ObjectId('5f818ca3088df8744185bb38')
    const decode = parser.decode(value, variant(String, ObjectId))
    const encode = parser.encode(decode, variant(String, ObjectId)) as ObjectId
    expect(decode).to.equal(value.toHexString())
    expect(encode.toHexString()).to.equal(value.toHexString())
  })

  it('[String/ObjectId] Decode/Encode from String', () => {
    const value = '5f818ca3088df8744185bb38'
    const decode = parser.decode(value, variant(String, ObjectId))
    const encode = parser.encode(decode, variant(String, ObjectId)) as ObjectId
    expect(decode).to.equal(value)
    expect(encode.toHexString()).to.equal(value)
  })

  it('[ObjectId] Decode/Encode from ObjectId', () => {
    const value = new ObjectId('5f818ca3088df8744185bb38')
    const decode = parser.decode(value, ObjectId)
    const encode = parser.encode(decode, ObjectId) as ObjectId
    expect(decode.toHexString()).to.equal(value.toHexString())
    expect(encode.toHexString()).to.equal(value.toHexString())
  })

  it('[ObjectId] Decode/Encode from String', () => {
    const value = '5f818ca3088df8744185bb38'
    const decode = parser.decode(value, ObjectId)
    const encode = parser.encode(decode, ObjectId) as ObjectId
    expect(decode.toHexString()).to.equal(value)
    expect(encode.toHexString()).to.equal(value)
  })
})

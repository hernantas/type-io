import { BsonParser } from '../src'
import { Decimal128, Double, Int32, Long, ObjectId, Timestamp } from 'bson'
import { expect } from 'chai'

describe('[BSON] Bson Parser (String Codec)', () => {
  const parser = new BsonParser()
  it('Decode/Encode from string', () => {
    const value = 'This is string'
    const decode = parser.decode(value, String)
    const encode = parser.encode(decode, String)

    expect(decode).to.equal(value)
    expect(encode).to.equal(value)
  })

  it('Decode/Encode from number', () => {
    const value = 1234
    const decode = parser.decode(value, String)
    const encode = parser.encode(decode, String)

    expect(decode).to.equal(value.toString())
    expect(encode).to.equal(value.toString())
  })

  it('Decode/Encode from boolean', () => {
    const tdec = parser.decode(true, String)
    const tenc = parser.encode(tdec, String)
    expect(tdec).to.equal('true')
    expect(tenc).to.equal('true')

    const fdec = parser.decode(false, String)
    const fenc = parser.encode(fdec, String)
    expect(fdec).to.equal('false')
    expect(fenc).to.equal('false')
  })

  it('Decode/Encode from ObjectId', () => {
    const value = new ObjectId()
    const decode = parser.decode(value, String)
    const encode = parser.encode(decode, String)

    expect(decode).to.equal(value.toString())
    expect(encode).to.equal(value.toString())
  })

  it('Decode/Encode from Double', () => {
    const value = new Double(1234.4321)
    const decode = parser.decode(value, String)
    const encode = parser.encode(decode, String)

    expect(decode).to.equal(value.value.toString())
    expect(encode).to.equal(value.value.toString())
  })

  it('Decode/Encode from Int32', () => {
    const value = new Int32(1234)
    const decode = parser.decode(value, String)
    const encode = parser.encode(decode, String)

    expect(decode).to.equal(value.value.toString())
    expect(encode).to.equal(value.value.toString())
  })

  it('Decode/Encode from Long', () => {
    const value = Long.fromString('12345')
    const decode = parser.decode(value, String)
    const encode = parser.encode(decode, String)

    expect(decode).to.equal(value.toString())
    expect(encode).to.equal(value.toString())
  })

  it('Decode/Encode from Timestamp', () => {
    const value = Timestamp.fromNumber(1616396274)
    const decode = parser.decode(value, String)
    const encode = parser.encode(decode, String)

    expect(decode).to.equal(value.toString())
    expect(encode).to.equal(value.toString())
  })

  it('Decode/Encode from Decimal128', () => {
    const value = Decimal128.fromString('123456.12345')
    const decode = parser.decode(value, String)
    const encode = parser.encode(decode, String)

    expect(decode).to.equal(value.toString())
    expect(encode).to.equal(value.toString())
  })

  it('Decode/Encode from Unknown type', () => {
    const value = { typeString: 'This is me' }
    const decode = parser.decode(value, String)
    const encode = parser.encode(decode, String)

    expect(decode).to.equal(value.toString())
    expect(encode).to.equal(value.toString())
  })
})

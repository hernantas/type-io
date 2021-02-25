import { expect } from 'chai'
import { PlainParser, Prop } from '../../src'

describe('Optional property functionality', () => {
  class Optional {
    @Prop()
    reqString: string

    @Prop({ optional: true })
    optString?: string

    constructor () {
      this.reqString = ''
    }
  }

  const parser = new PlainParser()

  it('Decode from plain object (all property)', () => {
    const plain = {
      reqString: 'This is required string',
      optString: 'This is optional string'
    }

    const decode = parser.decode(plain, Optional)
    expect(decode).to.have.property('reqString', plain.reqString)
    expect(decode).to.have.property('optString', plain.optString)
  })

  it('Decode from plain object (required property only)', () => {
    const plain = {
      reqString: 'This is required string'
    }

    const decode = parser.decode(plain, Optional)
    expect(decode).to.have.property('reqString', plain.reqString)
    expect(decode).to.not.have.property('optString')
  })

  it('Decode from plain object (missing required property)', () => {
    const plain = {
      optString: 'This is optional string'
    }

    expect(() => parser.decode(plain, Optional)).to.throw()
  })

  it('Encode from object (all property)', () => {
    const value = new Optional()
    value.reqString = 'This is required string'
    value.optString = 'This is optional string'

    const encode = parser.encode(value)
    expect(encode).to.have.property('reqString', value.reqString)
    expect(encode).to.have.property('optString', value.optString)
  })

  it('Encode from object (required property only)', () => {
    const value = new Optional()
    value.reqString = 'This is required string'

    const encode = parser.encode(value)
    expect(encode).to.have.property('reqString', value.reqString)
    expect(encode).to.not.have.property('optString')
  })

  it('Encode from object (missing required property)', () => {
    const value = new Optional()
    delete (value as any).reqString
    value.optString = 'This is optional string'

    expect(() => parser.encode(value)).to.throw()
  })

  it('Decode from plain object and encode to plain object (all property)', () => {
    const plain = {
      reqString: 'This is required string',
      optString: 'This is optional string'
    }

    const decode = parser.decode(plain, Optional)
    const encode = parser.encode(decode)

    expect(decode).to.have.property('reqString', plain.reqString)
    expect(decode).to.have.property('optString', plain.optString)
    expect(encode).to.have.property('reqString', plain.reqString)
    expect(encode).to.have.property('optString', plain.optString)
  })

  it('Decode from plain object and encode to plain object (required property only)', () => {
    const plain = {
      reqString: 'This is required string'
    }

    const decode = parser.decode(plain, Optional)
    const encode = parser.encode(decode)

    expect(decode).to.have.property('reqString', plain.reqString)
    expect(decode).to.not.have.property('optString')
    expect(encode).to.have.property('reqString', plain.reqString)
    expect(encode).to.not.have.property('optString')
  })
})

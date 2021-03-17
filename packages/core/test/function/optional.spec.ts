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

  it('Decode/Encode from plain (all property)', () => {
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

  it('Decode/Encode from plain (required property)', () => {
    const plain = {
      reqString: 'This is required string'
    }

    const decode = parser.decode(plain, Optional)
    const encode = parser.encode(decode)
    expect(decode).to.have.property('reqString', plain.reqString)
    expect(encode).to.have.property('reqString', plain.reqString)
  })

  it('Decode/Encode from plain (missing property)', () => {
    const plain = {
      optString: 'This is optional string'
    }

    expect(() => parser.decode(plain, Optional)).to.throws()
  })
})

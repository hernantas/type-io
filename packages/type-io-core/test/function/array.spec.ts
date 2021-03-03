import { expect } from 'chai'
import { PlainParser, Prop } from '../../src'

describe('Parse array', () => {
  class WithArray {
    @Prop({ type: String })
    typeStrings: string[]

    constructor () {
      this.typeStrings = []
    }
  }

  class Basic {
    @Prop()
    typeString: string

    constructor (typeString?: string) {
      this.typeString = typeString ?? ''
    }
  }

  const parser = new PlainParser()

  it('Decode/Encode from plain with array', () => {
    const plain = {
      typeStrings: [
        'This is first string',
        'This is second string',
        'This is third string'
      ]
    }
    const decode = parser.decode(plain, WithArray)
    const encode = parser.encode(decode)
    expect(decode).to.have.property('typeStrings').and.to.have.members(plain.typeStrings)
    expect(encode).to.have.property('typeStrings').and.to.have.members(plain.typeStrings)
  })

  it('Decode/Encode from plain array', () => {
    const plains = [
      { typeString: 'This is first string' },
      { typeString: 'This is second string' },
      { typeString: 'This is third string' }
    ]
    const decode = parser.decode(plains, Basic)
    const encode = parser.encode(decode)
    expect(decode).to.deep.members(plains)
    expect(encode).to.deep.members(plains)
  })

  it('Decode/Encode from empty array', () => {
    const decode = parser.decode([], Basic)
    const encode = parser.encode(decode, Basic)
    expect(decode).to.be.eql([])
    expect(encode).to.be.eql([])
    expect(() => parser.encode([])).to.throws()
  })
})

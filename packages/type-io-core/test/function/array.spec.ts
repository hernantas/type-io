import { expect } from 'chai'
import { array, PlainParser, Prop } from '../../src'

describe('Parse array', () => {
  class WithArray {
    @Prop({ type: array(String) })
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
    const decode = parser.decode(plains, array(Basic))
    const encode = parser.encode(decode)
    expect(decode).to.deep.members(plains)
    expect(encode).to.deep.members(plains)
  })

  it('Decode/Encode from empty array', () => {
    const decode = parser.decode([], array(Basic))
    const encode = parser.encode(decode, array(Basic))
    expect(decode).to.be.eql([])
    expect(encode).to.be.eql([])
    expect(() => parser.encode([])).to.throws()
  })

  it('Define class with array property without specify type', () => expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class WithArrayNoSpecify {
      @Prop()
      typeStrings: string[]

      constructor () {
        this.typeStrings = []
      }
    }
  }).to.throws())

  class WithArrayOfArray {
    @Prop({ type: array(array(String)) })
    typeStrings: string[][]

    constructor () {
      this.typeStrings = []
    }
  }

  it('Decode/Encode from object with array of array of string', () => {
    const plain = {
      typeStrings: [
        [
          '[Group 1] This is first string',
          '[Group 1] This is second string',
          '[Group 1] This is third string'
        ],
        [
          '[Group 2] This is first string',
          '[Group 2] This is second string',
          '[Group 2] This is third string'
        ]
      ]
    }
    const decode = parser.decode(plain, WithArrayOfArray)
    const encode = parser.encode(decode)
    expect(decode).to.have.property('typeStrings').and.to.have.deep.members(plain.typeStrings)
    expect(encode).to.have.property('typeStrings').and.to.have.deep.members(plain.typeStrings)
  })

  it('Decode/Encode from deep array', () => {
    const plain: string[][][] = []
    for (let section = 0; section < 5; section++) {
      plain.push([])
      for (let group = 0; group < 5; group++) {
        plain[section].push([])
        for (let i = 0; i < 5; i++) {
          plain[section][group].push(`[Section #${section}][Group #${group}] The #${i} string`)
        }
      }
    }
    const decode = parser.decode(plain, array(array(array(String))))
    const encode = parser.encode(decode)
    expect(decode).to.have.deep.members(plain)
    expect(encode).to.have.deep.members(plain)
  })
})

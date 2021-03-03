import { use, expect } from 'chai'
import chaiDateTime from 'chai-datetime'
import { PlainParser, Prop } from '../../src'

use(chaiDateTime)

describe('Basic functionality', () => {
  class WithString {
    @Prop()
    typeString: string

    constructor () {
      this.typeString = ''
    }
  }
  class WithNumber {
    @Prop()
    typeNumber: number

    constructor () {
      this.typeNumber = 0
    }
  }

  class WithBoolean {
    @Prop()
    typeBoolean: boolean

    constructor () {
      this.typeBoolean = false
    }
  }
  class WithDate {
    @Prop()
    typeDate: Date

    constructor () {
      this.typeDate = new Date()
    }
  }

  const parser = new PlainParser()

  it('Decode/Encode from/to plain (String)', () => {
    const plain = {
      typeString: 'This is String'
    }

    const decode = parser.decode(plain, WithString)
    const encode = parser.encode(decode)
    expect(decode).to.have.property('typeString', plain.typeString)
    expect(encode).to.have.property('typeString', plain.typeString)
  })

  it('Decode/Encode from/to plain (Number)', () => {
    const plain = {
      typeNumber: 13
    }

    const decode = parser.decode(plain, WithNumber)
    const encode = parser.encode(decode)
    expect(decode).to.have.property('typeNumber', plain.typeNumber)
    expect(encode).to.have.property('typeNumber', plain.typeNumber)
  })

  it('Decode/Encode from/to plain (Boolean)', () => {
    const plain = {
      typeBoolean: true
    }

    const decode = parser.decode(plain, WithBoolean)
    const encode = parser.encode(decode)
    expect(decode).to.have.property('typeBoolean', plain.typeBoolean)
    expect(encode).to.have.property('typeBoolean', plain.typeBoolean)
  })

  it('Decode/Encode from/to plain (Date)', () => {
    const plain = {
      typeDate: new Date()
    }

    const decode = parser.decode(plain, WithDate)
    const encode = parser.encode(decode)
    expect(decode).to.have.property('typeDate').and.equalTime(plain.typeDate)
    expect(encode).to.to.have.property('typeDate').and.equalTime(plain.typeDate)
  })

  it('Decode/Encode from/to plain with excess input property', () => {
    const plain = {
      typeString: 'This is String',
      typeNumber: 33,
      typeBoolean: true
    }

    const decode = parser.decode(plain, WithString)
    const encode = parser.encode(decode)
    expect(decode).to.have.property('typeString', plain.typeString)
    expect(decode).to.not.have.property('typeNumber')
    expect(decode).to.not.have.property('typeBoolean')
    expect(encode).to.have.property('typeString', plain.typeString)
    expect(encode).to.not.have.property('typeNumber')
    expect(encode).to.not.have.property('typeBoolean')
  })
})

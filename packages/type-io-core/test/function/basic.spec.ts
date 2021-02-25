import { expect } from 'chai'
import { PlainParser, Prop } from '../../src'

describe('Basic functionality', () => {
  class Basic {
    @Prop()
    typeString: string

    @Prop()
    typeNumber: number

    @Prop()
    typeBoolean: boolean

    constructor () {
      this.typeString = ''
      this.typeNumber = 0
      this.typeBoolean = false
    }
  }

  const parser = new PlainParser()

  it('Decode from plain object', () => {
    const plain = {
      typeString: 'This is String',
      typeNumber: 1,
      typeBoolean: true
    }
    const decode = parser.decode(plain, Basic)
    expect(decode).to.have.property('typeString', plain.typeString)
    expect(decode).to.have.property('typeNumber', plain.typeNumber)
    expect(decode).to.have.property('typeBoolean', plain.typeBoolean)
  })

  it('Encode from object', () => {
    const value = new Basic()
    value.typeString = 'This is String'
    value.typeNumber = 1
    value.typeBoolean = true

    const encode = parser.encode(value)
    expect(encode).to.have.property('typeString', value.typeString)
    expect(encode).to.have.property('typeNumber', value.typeNumber)
    expect(encode).to.have.property('typeBoolean', value.typeBoolean)
  })

  it('Decode from plain to object and encode to plain object', () => {
    const plain = {
      typeString: 'This is String',
      typeNumber: 1,
      typeBoolean: true
    }

    const decode = parser.decode(plain, Basic)
    const encode = parser.encode(decode)
    expect(decode).to.have.property('typeString', plain.typeString)
    expect(decode).to.have.property('typeNumber', plain.typeNumber)
    expect(decode).to.have.property('typeBoolean', plain.typeBoolean)
    expect(encode).to.have.property('typeString', plain.typeString)
    expect(encode).to.have.property('typeNumber', plain.typeNumber)
    expect(encode).to.have.property('typeBoolean', plain.typeBoolean)
  })

  class WithDate {
    @Prop()
    created: Date

    constructor () {
      this.created = new Date()
    }
  }

  it('Decode from plain object with Date', () => {
    const plain = {
      created: new Date()
    }

    const decode = parser.decode(plain, WithDate)
    expect(decode).to.have.property('created', plain.created)
  })

  it('Decode from plain object with Date from string/number', () => {
    const plainStr = {
      created: 'October 13, 2014 11:13:00'
    }
    const plainNum = {
      created: 1614235210802
    }

    const dateStr = new Date(plainStr.created)
    const dateNum = new Date(plainNum.created)

    const decodeStr = parser.decode(plainStr, WithDate)
    const decodeNum = parser.decode(plainNum, WithDate)
    expect(decodeStr).to.have.property('created')
    expect(decodeStr.created.getTime()).to.be.eq(dateStr.getTime())
    expect(decodeNum).to.have.property('created')
    expect(decodeNum.created.getTime()).to.be.eq(dateNum.getTime())
  })
})

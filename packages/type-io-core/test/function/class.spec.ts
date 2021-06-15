import { expect } from 'chai'
import { PlainParser, Prop } from '../../src'

describe('Class functionality', () => {
  class Basic {
    @Prop()
    _string: string = ''

    @Prop()
    _number: number = 0

    @Prop()
    _boolean: boolean = false

    @Prop()
    _date: Date = new Date()
  }

  const parser = new PlainParser()

  it('Decode/Encode from/to plain object', () => {
    const plain = {
      _string: 'This is string',
      _number: 8080,
      _boolean: true,
      _date: new Date()
    }

    const decoded = parser.decode(plain, Basic)
    const encoded = parser.encode(decoded)

    expect(decoded).to.be.instanceOf(Basic)
    expect(decoded).to.have.property('_string', plain._string)
    expect(decoded).to.have.property('_number', plain._number)
    expect(decoded).to.have.property('_boolean', plain._boolean)
    expect(decoded).to.have.property('_date', plain._date)

    expect(encoded).to.have.property('_string', plain._string)
    expect(encoded).to.have.property('_number', plain._number)
    expect(encoded).to.have.property('_boolean', plain._boolean)
    expect(encoded).to.have.property('_date', plain._date)
  })

  class Parent {
    @Prop()
    _string: string = ''

    @Prop()
    _number: number = 0

    @Prop()
    _boolean: boolean = false

    @Prop()
    _date: Date = new Date()

    @Prop()
    _basic: Basic = new Basic()
  }

  it('Decode/Encode from/to plain with nested object', () => {
    const plain = {
      _string: 'This is string',
      _number: 80,
      _boolean: true,
      _date: new Date(),
      _basic: {
        _string: 'This is a child',
        _number: 8080,
        _boolean: false,
        _date: new Date()
      }
    }

    const decoded = parser.decode(plain, Parent)
    const encoded = parser.encode(decoded)

    expect(decoded).to.be.instanceOf(Parent)
    expect(decoded).to.have.property('_string', plain._string)
    expect(decoded).to.have.property('_number', plain._number)
    expect(decoded).to.have.property('_boolean', plain._boolean)
    expect(decoded).to.have.property('_date', plain._date)
    expect(decoded).to.have.property('_basic')
    expect(decoded._basic).to.be.instanceOf(Basic)
    expect(decoded).to.have.nested.property('_basic._string', plain._basic._string)
    expect(decoded).to.have.nested.property('_basic._number', plain._basic._number)
    expect(decoded).to.have.nested.property('_basic._boolean', plain._basic._boolean)
    expect(decoded).to.have.nested.property('_basic._date', plain._basic._date)

    expect(encoded).to.have.property('_string', plain._string)
    expect(encoded).to.have.property('_number', plain._number)
    expect(encoded).to.have.property('_boolean', plain._boolean)
    expect(encoded).to.have.property('_date', plain._date)
    expect(encoded).to.have.property('_basic')
    expect(encoded).to.have.nested.property('_basic._string', plain._basic._string)
    expect(encoded).to.have.nested.property('_basic._number', plain._basic._number)
    expect(encoded).to.have.nested.property('_basic._boolean', plain._basic._boolean)
    expect(encoded).to.have.nested.property('_basic._date', plain._basic._date)
  })
})

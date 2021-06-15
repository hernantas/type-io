import { expect } from 'chai'
import { isEqual, PlainParser, record } from '../../src'

describe('Record functionality', () => {
  const parser = new PlainParser()

  const Basic = record({
    _string: String,
    _number: Number,
    _boolean: Boolean,
    _date: Date
  })

  it('Decode/Encode from/to plain object', () => {
    const plain = {
      _string: 'This is string',
      _number: 8080,
      _boolean: true,
      _date: new Date()
    }

    const decoded = parser.decode(plain, Basic)
    const encoded = parser.encode(decoded, Basic)

    expect(decoded).to.have.property('_string', plain._string)
    expect(decoded).to.have.property('_number', plain._number)
    expect(decoded).to.have.property('_boolean', plain._boolean)
    expect(decoded).to.have.property('_date').and.equalTime(plain._date)

    expect(encoded).to.have.property('_string', plain._string)
    expect(encoded).to.have.property('_number', plain._number)
    expect(encoded).to.have.property('_boolean', plain._boolean)
    expect(encoded).to.have.property('_date').and.equalTime(plain._date)
  })

  const Nested = record({
    _string: String,
    _number: Number,
    _boolean: Boolean,
    _date: Date,
    _nested: record({
      _string: String,
      _number: Number,
      _boolean: Boolean,
      _date: Date
    })
  })

  it('Decode/Encode from/to nested object', () => {
    const plain = {
      _string: 'This is string',
      _number: 8080,
      _boolean: true,
      _date: new Date(),
      _nested: {
        _string: 'This is string',
        _number: 8080,
        _boolean: true,
        _date: new Date()
      }
    }

    const decoded = parser.decode(plain, Nested)
    const encoded = parser.encode(decoded, Nested)

    expect(decoded).to.have.property('_string', plain._string)
    expect(decoded).to.have.property('_number', plain._number)
    expect(decoded).to.have.property('_boolean', plain._boolean)
    expect(decoded).to.have.property('_date').and.equalTime(plain._date)
    expect(decoded).to.have.property('_nested')
    expect(decoded).to.have.nested.property('_nested._string', plain._nested._string)
    expect(decoded).to.have.nested.property('_nested._number', plain._nested._number)
    expect(decoded).to.have.nested.property('_nested._boolean', plain._nested._boolean)
    expect(decoded).to.have.nested.property('_nested._date').and.equalTime(plain._date)

    expect(encoded).to.have.property('_string', plain._string)
    expect(encoded).to.have.property('_number', plain._number)
    expect(encoded).to.have.property('_boolean', plain._boolean)
    expect(encoded).to.have.property('_date').and.equalTime(plain._date)
    expect(encoded).to.have.property('_nested')
    expect(encoded).to.have.nested.property('_nested._string', plain._nested._string)
    expect(encoded).to.have.nested.property('_nested._number', plain._nested._number)
    expect(encoded).to.have.nested.property('_nested._boolean', plain._nested._boolean)
    expect(encoded).to.have.nested.property('_nested._date').and.equalTime(plain._date)
  })

  it('Equality check', () => {
    expect(isEqual(Basic, Basic)).to.be.eql(true)
    expect(isEqual(Nested, Nested)).to.be.eql(true)

    expect(isEqual(Basic, Nested)).to.be.eql(false)
    expect(isEqual(Nested, Basic)).to.be.eql(false)
  })
})

import { expect } from 'chai'
import { PlainParser, record } from '../../src'

describe('Record functionality', () => {
  const parser = new PlainParser()

  it('Decode/Encode from/to plain object', () => {
    const plain = {
      _string: 'This is string',
      _number: 8080,
      _boolean: true,
      _date: new Date()
    }
    const target = record({
      _string: String,
      _number: Number,
      _boolean: Boolean,
      _date: Date
    })

    const decoded = parser.decode(plain, target)
    const encoded = parser.encode(decoded, target)

    expect(decoded).to.have.property('_string', plain._string)
    expect(decoded).to.have.property('_number', plain._number)
    expect(decoded).to.have.property('_boolean', plain._boolean)
    expect(decoded).to.have.property('_date').and.equalTime(plain._date)

    expect(encoded).to.have.property('_string', plain._string)
    expect(encoded).to.have.property('_number', plain._number)
    expect(encoded).to.have.property('_boolean', plain._boolean)
    expect(encoded).to.have.property('_date').and.equalTime(plain._date)
  })

  it('Decode/Encode from/to plain object', () => {
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
    const target = record({
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

    const decoded = parser.decode(plain, target)
    const encoded = parser.encode(decoded, target)

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
})

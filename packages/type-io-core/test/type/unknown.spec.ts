import { expect } from 'chai'
import { PlainParser, unknown } from '../../src'

describe('Unknown functionality', () => {
  const parser = new PlainParser()

  it('Decode/Encode from/to string', () => {
    const value = 'This is string'
    const decoded = parser.decode(value, unknown())
    const encoded = parser.decode(decoded, unknown())

    expect(decoded).to.be.eq(value)
    expect(encoded).to.be.eq(value)
  })

  it('Decode/Encode from/to number', () => {
    const value = 8080
    const decoded = parser.decode(value, unknown())
    const encoded = parser.decode(decoded, unknown())

    expect(decoded).to.be.eq(value)
    expect(encoded).to.be.eq(value)
  })

  it('Decode/Encode from/to boolean', () => {
    const value = false
    const decoded = parser.decode(value, unknown())
    const encoded = parser.decode(decoded, unknown())

    expect(decoded).to.be.eq(value)
    expect(encoded).to.be.eq(value)
  })
})

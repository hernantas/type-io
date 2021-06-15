import { expect } from 'chai'
import { literal, PlainParser } from '../../src'

describe('Literal functionality', () => {
  const parser = new PlainParser()

  it('Decode/Encode from/to literal string', () => {
    const input = 'STRING_1'
    const target = literal('STRING_1')

    const decoded = parser.decode(input, target)
    const encoded = parser.encode(input, target)

    expect(decoded).to.be.eq(input)
    expect(encoded).to.be.eq(input)
  })

  it('Decode/Encode from/to literal number', () => {
    const input = 8080
    const target = literal(8080)

    const decoded = parser.decode(input, target)
    const encoded = parser.encode(input, target)

    expect(decoded).to.be.eq(input)
    expect(encoded).to.be.eq(input)
  })

  it('Decode/Encode from/to literal boolean', () => {
    const input = true
    const target = literal(true)

    const decoded = parser.decode(input, target)
    const encoded = parser.encode(input, target)

    expect(decoded).to.be.eq(input)
    expect(encoded).to.be.eq(input)
  })
})

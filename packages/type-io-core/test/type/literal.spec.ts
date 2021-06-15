import { expect } from 'chai'
import { isEqual, literal, PlainParser } from '../../src'

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

  it('Equality check', () => {
    expect(isEqual(literal('MY_STRING'), literal('MY_STRING'))).to.be.eql(true)
    expect(isEqual(literal(8080), literal(8080))).to.be.eql(true)
    expect(isEqual(literal(true), literal(true))).to.be.eql(true)

    expect(isEqual(literal('MY_STRING'), literal(8080))).to.be.eql(false)
    expect(isEqual(literal('MY_STRING'), literal(true))).to.be.eql(false)
    expect(isEqual(literal(8080), literal('MY_STRING'))).to.be.eql(false)
    expect(isEqual(literal(8080), literal(true))).to.be.eql(false)
    expect(isEqual(literal(true), literal('MY_STRING'))).to.be.eql(false)
    expect(isEqual(literal(true), literal(8080))).to.be.eql(false)
  })
})

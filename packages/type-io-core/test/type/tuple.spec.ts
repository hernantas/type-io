import { expect } from 'chai'
import { PlainParser, tuple } from '../../src'

describe('Tuple functionality', () => {
  const parser = new PlainParser()

  it('Decode/Encode from/to tuple of [String, Number, Boolean, Date]', () => {
    const input = ['This is string', 8080, false, new Date()]
    const target = tuple([String, Number, Boolean, Date])

    const decoded = parser.decode(input, target)
    const encoded = parser.encode(input, target)

    expect(decoded).to.have.deep.members(input)
    expect(encoded).to.have.deep.members(input)
  })

  it('Decode/Encode from/to tuple of [String, String, String, Number, Number]', () => {
    const input = [
      'This is first string',
      'This is second string',
      'This is third string',
      8080,
      80
    ]
    const target = tuple([String, String, String, Number, Number])

    const decoded = parser.decode(input, target)
    const encoded = parser.encode(input, target)

    expect(decoded).to.have.deep.members(input)
    expect(encoded).to.have.deep.members(input)
  })
})

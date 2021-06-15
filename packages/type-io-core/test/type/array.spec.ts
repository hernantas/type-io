import { expect } from 'chai'
import { array, isEqual, PlainParser } from '../../src'

describe('Array functionality', () => {
  const parser = new PlainParser()

  it('Decode/Encode from/to empty array', () => {
    const input: string[] = []
    const target = array(String)

    const decoded = parser.decode(input, target)
    const encoded = parser.encode(decoded, target)

    expect(decoded).to.be.eql(input)
    expect(encoded).to.be.eql(input)
  })

  it('Decode/Encode from/to array of string', () => {
    const input = [
      'This is first string',
      'This is second string',
      'This is third string'
    ]
    const target = array(String)

    const decoded = parser.decode(input, target)
    const encoded = parser.encode(decoded, target)

    expect(decoded).to.have.members(input)
    expect(encoded).to.have.members(input)
  })

  it('Decode/Encode from/to array of array of string', () => {
    const input = [
      [
        'This is 1-1 string',
        'This is 1-2 string',
        'This is 1-2 string'
      ],
      [
        'This is 1-1 string',
        'This is 1-2 string',
        'This is 1-2 string'
      ]
    ]
    const target = array(array(String))

    const decoded = parser.decode(input, target)
    const encoded = parser.encode(decoded, target)

    expect(decoded).to.have.deep.members(input)
    expect(encoded).to.have.deep.members(input)
  })

  it('Decode/Encode from/to deep array of string', () => {
    const target = array(array(array(String)))

    const input: string[][][] = []
    for (let x = 0; x < 5; x++) {
      input.push([])
      for (let y = 0; y < 5; y++) {
        input[x].push([])
        for (let z = 0; z < 5; z++) {
          input[x][y].push(`Section x:${x} y:${y} z:${z}`)
        }
      }
    }

    const decoded = parser.decode(input, target)
    const encoded = parser.encode(decoded, target)

    expect(decoded).to.have.deep.members(input)
    expect(encoded).to.have.deep.members(input)
  })

  it('Equality check', () => {
    expect(isEqual(array(String), array(String))).to.be.eq(true)
    expect(isEqual(array(array(String)), array(array(String)))).to.be.eq(true)

    expect(isEqual(array(String), array(Number))).to.be.eq(false)
    expect(isEqual(array(String), array(array(String)))).to.be.eq(false)
    expect(isEqual(array(String), array(array(array(String))))).to.be.eq(false)
  })
})

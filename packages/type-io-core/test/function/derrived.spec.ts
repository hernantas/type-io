import { expect } from 'chai'
import { PlainParser, Prop } from '../../src'

describe('Inheritance functionality', () => {
  class Parent {
    @Prop()
    name: string = ''
  }

  class Child extends Parent {
    @Prop()
    age: number = 0
  }

  const parser = new PlainParser()

  const plain = {
    name: 'Agus Rahmat',
    age: 17
  }

  it('Parsing as Parent', () => {
    const decoded = parser.decode(plain, Parent)
    const encoded = parser.encode(decoded)
    expect(decoded).to.have.property('name', plain.name)
    expect(decoded).to.not.have.property('age')
    expect(encoded).to.have.property('name', plain.name)
    expect(encoded).to.not.have.property('age')
  })

  it('Parsing as Child', () => {
    const decoded = parser.decode(plain, Child)
    const encoded = parser.encode(decoded)
    expect(decoded).to.have.property('name', plain.name)
    expect(decoded).to.have.property('age', plain.age)
    expect(encoded).to.have.property('name', plain.name)
    expect(encoded).to.have.property('age', plain.age)
  })
})

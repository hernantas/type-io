import { expect } from 'chai'
import { PlainParser, Prop } from '../../src'

describe('Parse Nested functionality', () => {
  class Child {
    @Prop()
    name: string

    @Prop()
    age: number

    constructor () {
      this.name = ''
      this.age = 0
    }
  }

  class Parent {
    @Prop()
    name: string

    @Prop()
    child: Child

    constructor () {
      this.name = ''
      this.child = new Child()
    }
  }

  const parser = new PlainParser()

  it('Decode from plain object', () => {
    const plain = {
      name: 'This is parent',
      child: {
        name: 'This is child',
        age: 13
      }
    }

    const decode = parser.decode(plain, Parent)
    expect(decode).to.have.property('name', plain.name)
    expect(decode).to.have.property('child')
    expect(decode.child).to.have.property('name', plain.child.name)
    expect(decode.child).to.have.property('age', plain.child.age)
  })

  it('Encode from object', () => {
    const value = new Parent()
    value.name = 'This is parent'
    value.child.name = 'This is child'
    value.child.age = 12

    const encode = parser.encode(value)
    expect(encode).to.have.property('name', value.name)
    expect(encode).to.have.property('child')
    expect(encode).to.have.nested.property('child.name', value.child.name)
    expect(encode).to.have.nested.property('child.age', value.child.age)
  })

  it('Decode from plain object and encode to plain object', () => {
    const plain = {
      name: 'This is parent',
      child: {
        name: 'This is child',
        age: 13
      }
    }

    const decode = parser.decode(plain, Parent)
    const encode = parser.encode(decode)
    expect(decode).to.have.property('name', plain.name)
    expect(decode).to.have.property('child')
    expect(decode).to.have.nested.property('child.name', plain.child.name)
    expect(decode).to.have.nested.property('child.age', plain.child.age)
    expect(encode).to.have.property('name', plain.name)
    expect(encode).to.have.property('child')
    expect(encode).to.have.nested.property('child.name', plain.child.name)
    expect(encode).to.have.nested.property('child.age', plain.child.age)
  })
})

import { expect } from 'chai'
import { MongoId, MongoParser, ObjectId, Prop } from '../../src'

describe('[Mongo] Basic functionality', () => {
  const parser = new MongoParser()

  it('Parsing using class with `string` id', () => {
    class CStringId {
      @MongoId()
      id: string = ''

      @Prop()
      name: string = ''

      @Prop()
      age: number = 1
    }

    const plain = {
      _id: new ObjectId(),
      name: 'Ahmed Burham',
      age: 33
    }

    const decoded = parser.decode(plain, CStringId)
    const encoded = parser.encode(decoded)

    expect(decoded).to.have.property('id').and.equal(plain._id.toHexString())
    expect(decoded).to.have.property('name', plain.name)
    expect(decoded).to.have.property('age', plain.age)

    expect(encoded).to.have.property('_id').and.to.satisfy((_id: ObjectId) => _id.equals(plain._id))
    expect(encoded).to.have.property('name', plain.name)
    expect(encoded).to.have.property('age', plain.age)
  })

  it('Parsing using class with `ObjectId` id', () => {
    class CObjectId {
      @MongoId()
      id: ObjectId = new ObjectId()

      @Prop()
      name: string = ''

      @Prop()
      age: number = 1
    }

    const plain = {
      _id: new ObjectId(),
      name: 'Ahmed Burham',
      age: 33
    }

    const decoded = parser.decode(plain, CObjectId)
    const encoded = parser.encode(decoded)

    expect(decoded).to.have.property('id').and.to.satisfy((_id: ObjectId) => _id.equals(plain._id))
    expect(decoded).to.have.property('name', plain.name)
    expect(decoded).to.have.property('age', plain.age)

    expect(encoded).to.have.property('_id').and.to.satisfy((_id: ObjectId) => _id.equals(plain._id))
    expect(encoded).to.have.property('name', plain.name)
    expect(encoded).to.have.property('age', plain.age)
  })
})

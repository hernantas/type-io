import { expect } from 'chai'
import { PlainParser, Prop, TargetTypes } from '../../src'

describe('Enum functionality', () => {
  const parser = new PlainParser()

  it('Default enum', () => {
    enum DefaultEnum {
      ENUM_0,
      ENUM_1,
      ENUM_2,
      ENUM_3
    }

    class DefaultEnumClass {
      @Prop({ type: TargetTypes.enum(DefaultEnum) })
      type: DefaultEnum = DefaultEnum.ENUM_0
    }

    const plain = {
      type: DefaultEnum.ENUM_1
    }

    const decoded = parser.decode(plain, DefaultEnumClass)
    const encoded = parser.encode(decoded)
    expect(decoded).to.have.property('type', plain.type)
    expect(encoded).to.have.property('type', plain.type)
  })

  it('Typed string enum', () => {
    enum DefaultEnum {
      ENUM_0 = 'ENUM_0',
      ENUM_1 = 'ENUM_1',
      ENUM_2 = 'ENUM_2',
      ENUM_3 = 'ENUM_3'
    }

    class DefaultEnumClass {
      @Prop({ type: TargetTypes.enum(DefaultEnum) })
      type: DefaultEnum = DefaultEnum.ENUM_2
    }

    const plain = {
      type: DefaultEnum.ENUM_2
    }

    const decoded = parser.decode(plain, DefaultEnumClass)
    const encoded = parser.encode(decoded)
    expect(decoded).to.have.property('type', plain.type)
    expect(encoded).to.have.property('type', plain.type)
  })

  it('Type number enum', () => {
    enum DefaultEnum {
      ENUM_0 = 0,
      ENUM_1 = 10,
      ENUM_2 = 20,
      ENUM_3 = 30
    }

    class DefaultEnumClass {
      @Prop({ type: TargetTypes.enum(DefaultEnum) })
      type: DefaultEnum = DefaultEnum.ENUM_1
    }

    const plain = {
      type: DefaultEnum.ENUM_3
    }

    const decoded = parser.decode(plain, DefaultEnumClass)
    const encoded = parser.encode(decoded)
    expect(decoded).to.have.property('type', plain.type)
    expect(encoded).to.have.property('type', plain.type)
  })

  it('Typed mixed (String and Number) enum', () => {
    enum DefaultEnum {
      ENUM_0 = 0,
      ENUM_1 = 'ENUM_FIRST'
    }

    class DefaultEnumClass {
      @Prop({ type: TargetTypes.enum(DefaultEnum) })
      firstType: DefaultEnum = DefaultEnum.ENUM_0

      @Prop({ type: TargetTypes.enum(DefaultEnum) })
      secondType: DefaultEnum = DefaultEnum.ENUM_0
    }

    const plain = {
      firstType: DefaultEnum.ENUM_0,
      secondType: DefaultEnum.ENUM_1
    }

    const decoded = parser.decode(plain, DefaultEnumClass)
    const encoded = parser.encode(decoded)
    expect(decoded).to.have.property('firstType', plain.firstType)
    expect(decoded).to.have.property('secondType', plain.secondType)
    expect(encoded).to.have.property('firstType', plain.firstType)
    expect(encoded).to.have.property('secondType', plain.secondType)
  })
})

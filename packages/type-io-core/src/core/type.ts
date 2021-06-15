import { ConstructorValue, TargetType, TypeKind, ConstructorIdentity, RecordValue, RecordIdentity, LiteralValue, LiteralIdentity, TypeIdentity, ArrayIdentity, MemberValue, MemberIdentity, EnumValue } from '../type'
import { TargetMemberOf, TargetRecordOf, UnionOf } from '../type/util'
import { findCtor } from './util'

export function toIdentity <T> (target: TargetType<T>): TypeIdentity<T> {
  return isConstructorValue(target) ? type(target) : target
}

export function type <T> (type: ConstructorValue<T>, variant?: TargetType): TypeIdentity<T> {
  const id: ConstructorIdentity<T> = {
    kind: TypeKind.Constructor,
    variant,
    type
  }
  return id
}

export function record <T extends RecordValue> (props: TargetRecordOf<T>, variant?: TargetType): TypeIdentity<T> {
  const id: RecordIdentity<T> = {
    kind: TypeKind.Record,
    variant,
    props
  }
  return id
}

export function literal <T extends LiteralValue> (value: T, variant?: TargetType): TypeIdentity<T> {
  const id: LiteralIdentity<T> = {
    kind: TypeKind.Literal,
    variant,
    value
  }
  return id
}

export function array <T> (type: TargetType<T>, variant?: TargetType): TypeIdentity<T[]> {
  const id: ArrayIdentity<T> = {
    kind: TypeKind.Array,
    variant,
    type
  }
  return id
}

export function tuple <T extends MemberValue> (members: TargetMemberOf<T>, variant?: TargetType): TypeIdentity<T> {
  const id: MemberIdentity<T> = {
    kind: TypeKind.Tuple,
    variant,
    members
  }
  return id
}

export function union <T extends MemberValue> (members: TargetMemberOf<T>, variant?: TargetType): TypeIdentity<UnionOf<T>> {
  const id: MemberIdentity<T> = {
    kind: TypeKind.Union,
    variant,
    members
  }
  return id
}

export function variant <T> (source: TargetType<T>, variant?: TargetType): TypeIdentity<T> {
  const id = isConstructorValue(source) ? type(source) : source
  id.variant = variant
  return id
}

export function fromEnum <T extends EnumValue> (enumValue: T, variant?: TargetType): TypeIdentity<T> {
  const type = Object.keys(enumValue).map(key => literal(enumValue[key]))
  return union(type, variant)
}

export function isConstructorValue <T> (target: TargetType<T>): target is ConstructorValue<T> {
  return typeof target === 'function'
}

export function isTypeIdentity <T> (target: TargetType<T>): target is TypeIdentity<T> {
  return typeof target === 'object' && !Array.isArray(target)
}

export function isConstructorIdentity <T> (target: TypeIdentity<T>): target is ConstructorIdentity<T> {
  return target.kind === TypeKind.Constructor
}

export function isRecordIdentity <T extends RecordValue> (target: TypeIdentity<T>): target is RecordIdentity<T> {
  return target.kind === TypeKind.Record
}

export function isLiteralIdentity <T extends LiteralValue> (target: TypeIdentity<T>): target is LiteralIdentity<T> {
  return target.kind === TypeKind.Literal
}

export function isArrayIdentity <T> (target: TypeIdentity<T>): target is ArrayIdentity<T> {
  return target.kind === TypeKind.Array
}

export function isMemberIdentity <T extends MemberValue> (target: TypeIdentity<T>): target is MemberIdentity<T> {
  return target.kind === TypeKind.Tuple || target.kind === TypeKind.Union || target.kind === TypeKind.Intersection
}

function isIdentityEqual <T> (source: TypeIdentity<T>, destination: TypeIdentity): destination is TypeIdentity<T> {
  if (source.kind !== destination.kind) {
    return false
  }

  if (isConstructorIdentity(source) && isConstructorIdentity(destination)) {
    return source.type === destination.type
  } else if (isLiteralIdentity(source) && isLiteralIdentity(destination)) {
    return source.value === destination.value
  } else if (isArrayIdentity(source) && isArrayIdentity(destination)) {
    return isEqual(source.type, destination.type)
  } else if (isMemberIdentity(source) && isMemberIdentity(destination)) {
    if (source.members.length !== destination.members.length) {
      return false
    }

    for (let i = 0; i < source.members.length; i++) {
      if (!isEqual(source.members[i], destination.members[i])) {
        return false
      }
    }

    return true
  }

  return false
}

export function isEqual <T> (source: TargetType<T>, destination: TargetType): destination is TargetType<T> {
  const src = toIdentity(source)
  const dst = toIdentity(destination)
  return isIdentityEqual(src, dst)
}

export function isStrictEqual <T> (source: TargetType<T>, destination: TargetType): destination is TargetType<T> {
  const srcVariant = isTypeIdentity(source) ? source.variant : undefined
  const dstVariant = isTypeIdentity(destination) ? destination.variant : undefined
  const variantEqual = srcVariant !== undefined && dstVariant !== undefined
    ? isEqual(srcVariant, dstVariant)
    : srcVariant === undefined && dstVariant === undefined
  return isEqual(source, destination) && variantEqual
}

export function findIdentity <T> (value: T): TypeIdentity<T> {
  if (Array.isArray(value)) {
    const elements = value.map(val => findIdentity(val))
    const notUniformElements = elements.filter(e => e !== elements[0])
    return notUniformElements.length === 0 ? array(elements[0]) : tuple(elements)
  }
  return type(findCtor(value))
}

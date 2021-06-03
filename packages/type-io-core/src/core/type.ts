import { ConstructorValue, TargetType, TypeKind, ConstructorIdentity, RecordValue, RecordIdentity, LiteralValue, LiteralIdentity, TypeIdentity, ArrayIdentity, MemberValue, MemberIdentity, EnumValue } from '../type'
import { TargetMemberOf, TargetRecordOf, UnionOf } from '../type/util'

export function type <T> (type: ConstructorValue<T>): TypeIdentity<T> {
  const id: ConstructorIdentity<T> = {
    kind: TypeKind.Constructor,
    type
  }
  return id
}

export function record <T extends RecordValue> (props: TargetRecordOf<T>): TypeIdentity<T> {
  const id: RecordIdentity<T> = {
    kind: TypeKind.Record,
    props
  }
  return id
}

export function literal <T extends LiteralValue> (value: T): TypeIdentity<T> {
  const id: LiteralIdentity<T> = {
    kind: TypeKind.Literal,
    value
  }
  return id
}

export function array <T> (type: TargetType<T>): TypeIdentity<T[]> {
  const id: ArrayIdentity<T> = {
    kind: TypeKind.Array,
    type
  }
  return id
}

export function tuple <T extends MemberValue> (...members: TargetMemberOf<T>): TypeIdentity<T> {
  const id: MemberIdentity<T> = {
    kind: TypeKind.Tuple,
    members
  }
  return id
}

export function union <T extends MemberValue> (...members: TargetMemberOf<T>): TypeIdentity<UnionOf<T>> {
  const id: MemberIdentity<T> = {
    kind: TypeKind.Union,
    members
  }
  return id
}

export function fromEnum <T extends EnumValue> (enumValue: T): TypeIdentity<T> {
  const a = Object.keys(enumValue).map(key => literal(enumValue[key]))
  return union(...a)
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

export function isLiteralIdentity <T extends LiteralValue> (target: TypeIdentity<T>): target is LiteralIdentity<T> {
  return target.kind === TypeKind.Literal
}

export function isArrayIdentity <T> (target: TypeIdentity<T>): target is ArrayIdentity<T> {
  return target.kind === TypeKind.Array
}

export function isMemberIdentity <T extends MemberValue> (target: TypeIdentity<T>): target is MemberIdentity<T> {
  return target.kind === TypeKind.Tuple || target.kind === TypeKind.Union || target.kind === TypeKind.Intersection
}

export function isTargetType<T> (source: TargetType<T>, destination: TargetType): destination is TargetType<T> {
  if (isConstructorValue(source) && isConstructorValue(destination)) {
    return source === destination
  } else if (isTypeIdentity(source) && isTypeIdentity(destination)) {
    if (source.kind !== destination.kind) {
      return false
    }

    if (isConstructorIdentity(source) && isConstructorIdentity(destination)) {
      return source.type === destination.type
    } else if (isLiteralIdentity(source) && isLiteralIdentity(destination)) {
      return source.value === destination.value
    } else if (isArrayIdentity(source) && isArrayIdentity(destination)) {
      return isTargetType(source.type, destination.type)
    } else if (isMemberIdentity(source) && isMemberIdentity(destination)) {
      if (source.kind !== destination.kind || source.members.length !== destination.members.length) {
        return false
      }

      for (let i = 0; i < source.members.length; i++) {
        if (!isTargetType(source.members[i], destination.members[i])) {
          return false
        }
      }

      return true
    }
  }

  return false
}

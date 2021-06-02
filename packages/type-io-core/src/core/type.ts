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

export function isConstructorType <T> (target: TypeIdentity<T>): target is ConstructorIdentity<T> {
  return target.kind === TypeKind.Constructor
}

export function isLiteralType <T extends LiteralValue> (target: TypeIdentity<T>): target is LiteralIdentity<T> {
  return target.kind === TypeKind.Literal
}

export function isArrayType <T> (target: TypeIdentity<T>): target is ArrayIdentity<T> {
  return target.kind === TypeKind.Array
}

export function isMemberType <T extends MemberValue> (target: TypeIdentity<T>): target is MemberIdentity<T> {
  return target.kind === TypeKind.Tuple || target.kind === TypeKind.Union || target.kind === TypeKind.Intersection
}

export function isEqualType (target1: TargetType, target2: TargetType): boolean {
  if (isConstructorValue(target1) && isConstructorValue(target2)) {
    return target1 === target2
  } else if (isTypeIdentity(target1) && isTypeIdentity(target2)) {
    if (target1.kind !== target2.kind) {
      return false
    }

    if (isConstructorType(target1) && isConstructorType(target2)) {
      return target1.type === target2.type
    } else if (isLiteralType(target1) && isLiteralType(target2)) {
      return target1.value === target2.value
    } else if (isArrayType(target1) && isArrayType(target2)) {
      return isEqualType(target1.type, target2.type)
    } else if (isMemberType(target1) && isMemberType(target2)) {
      if (target1.kind !== target2.kind || target1.members.length !== target2.members.length) {
        return false
      }

      for (let i = 0; i < target1.members.length; i++) {
        if (!isEqualType(target1.members[i], target2.members[i])) {
          return false
        }
      }

      return true
    }
  }

  return false
}

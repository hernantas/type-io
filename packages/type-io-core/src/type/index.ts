import { TargetType } from './TargetType'
import { ConstructorIdentity } from './ConstructorIdentity'
import { ConstructorValue } from './ConstructorValue'
import { LiteralValue } from './LiteralValue'
import { MemberValue } from './MemberValue'
import { RecordValue } from './RecordValue'
import { TypeIdentity } from './TypeIdentity'
import { TypeKind } from './TypeKind'
import { TargetRecordOf } from './util/TargetRecordOf'
import { RecordIdentity } from './RecordIdentity'
import { LiteralIdentity } from './LiteralIdentity'
import { ArrayIdentity } from './ArrayIdentity'
import { TargetMemberOf } from './util/TargetMemberOf'
import { UnionOf } from './util/UnionOf'

export * from './codec-of'
export * from './optional-for'
export * from './TargetType'

export function type <T> (type: ConstructorValue<T>): TargetType<T> {
  return {
    kind: TypeKind.Constructor,
    type
  } as ConstructorIdentity<T>
}

export function record <T extends RecordValue> (props: TargetRecordOf<T>): TargetType<T> {
  return {
    kind: TypeKind.Record,
    props
  } as RecordIdentity<T>
}

export function literal <T extends LiteralValue> (value: T): TargetType<T> {
  return {
    kind: TypeKind.Literal,
    value
  } as LiteralIdentity<T>
}

export function array <T> (type: TargetType<T>): TypeIdentity<T[]> {
  return {
    kind: TypeKind.Array,
    type
  } as ArrayIdentity<T>
}

export interface MemberType<T extends MemberValue> extends TypeIdentity<T> {
  kind: TypeKind.Tuple | TypeKind.Union | TypeKind.Intersection
  members: TargetMemberOf<T>
}

export function tuple <T extends MemberValue> (...members: TargetMemberOf<T>): TargetType<T> {
  return {
    kind: TypeKind.Tuple,
    members
  } as MemberType<T>
}

export function union <T extends MemberValue> (...members: TargetMemberOf<T>): TargetType<UnionOf<T>> {
  return {
    kind: TypeKind.Union,
    members
  } as MemberType<T>
}

// TEST: Union
// const unionV1 = decode(union(String, Number))
// const unionV2 = decode(union(literal('OPT1'), literal('OPT2'), literal('OPT3')))

export function isConstructorIdentity <T> (target: TargetType<T>): target is ConstructorValue<T> {
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

export function isMemberType <T extends MemberValue> (target: TypeIdentity<T>): target is MemberType<T> {
  return target.kind === TypeKind.Tuple || target.kind === TypeKind.Union || target.kind === TypeKind.Intersection
}

export function equal (target1: TargetType, target2: TargetType): boolean {
  if (isConstructorIdentity(target1) && isConstructorIdentity(target2)) {
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
      return equal(target1.type, target2.type)
    } else if (isMemberType(target1) && isMemberType(target2)) {
      if (target1.kind !== target2.kind || target1.members.length !== target2.members.length) {
        return false
      }

      for (let i = 0; i < target1.members.length; i++) {
        if (!equal(target1.members[i], target2.members[i])) {
          return false
        }
      }

      return true
    }
  }

  return false
}

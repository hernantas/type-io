import { MemberIdentity, MemberType, TargetType, TypeIdentity, TypeKind } from '../../type'
import { TargetTypeOf, UnionOf } from '../../type/util'

export function tuple <T extends MemberType> (members: TargetTypeOf<T>, variant?: TargetType): TypeIdentity<T> {
  const id: MemberIdentity<T> = {
    _kind: TypeKind.Tuple,
    variant,
    members
  }
  return id
}

export function union <T extends MemberType> (members: TargetTypeOf<T>, variant?: TargetType): TypeIdentity<UnionOf<T>> {
  const id: MemberIdentity<T> = {
    _kind: TypeKind.Union,
    variant,
    members
  }
  return id
}

export function isMemberIdentity <T extends MemberType> (target: TypeIdentity<T>): target is MemberIdentity<T> {
  return target._kind === TypeKind.Tuple || target._kind === TypeKind.Union || target._kind === TypeKind.Intersection
}

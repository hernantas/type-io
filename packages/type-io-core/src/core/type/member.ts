import { MemberIdentity, MemberType, TargetType, TypeIdentity, TypeKind } from '../../type'
import { TargetMemberOf, UnionOf } from '../../type/util'

export function tuple <T extends MemberType> (members: TargetMemberOf<T>, variant?: TargetType): TypeIdentity<T> {
  const id: MemberIdentity<T> = {
    kind: TypeKind.Tuple,
    variant,
    members
  }
  return id
}

export function union <T extends MemberType> (members: TargetMemberOf<T>, variant?: TargetType): TypeIdentity<UnionOf<T>> {
  const id: MemberIdentity<T> = {
    kind: TypeKind.Union,
    variant,
    members
  }
  return id
}

export function isMemberIdentity <T extends MemberType> (target: TypeIdentity<T>): target is MemberIdentity<T> {
  return target.kind === TypeKind.Tuple || target.kind === TypeKind.Union || target.kind === TypeKind.Intersection
}

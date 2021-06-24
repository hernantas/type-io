import { ArrayIdentity, TargetType, TypeIdentity, TypeKind } from '../../type'

export function array <T> (type: TargetType<T>, variant?: TargetType): TypeIdentity<T[]> {
  const id: ArrayIdentity<T> = {
    _kind: TypeKind.Array,
    variant,
    type
  }
  return id
}

export function isArrayIdentity <T> (target: TypeIdentity<T>): target is ArrayIdentity<T> {
  return target._kind === TypeKind.Array
}

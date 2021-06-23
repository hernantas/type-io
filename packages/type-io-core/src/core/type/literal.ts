import { LiteralIdentity, LiteralType, TargetType, TypeIdentity, TypeKind } from '../../type'

export function literal <T extends LiteralType> (value: T, variant?: TargetType): TypeIdentity<T> {
  const id: LiteralIdentity<T> = {
    kind: TypeKind.Literal,
    variant,
    value
  }
  return id
}

export function isLiteralIdentity <T extends LiteralType> (target: TypeIdentity<T>): target is LiteralIdentity<T> {
  return target.kind === TypeKind.Literal
}

import { TypeIdentity, TypeKind, UnknownIdentity } from '../../type'

export function unknown (): TypeIdentity<unknown> {
  const id: UnknownIdentity = {
    kind: TypeKind.Unknown
  }
  return id
}

export function isUnknownIdentity (target: TypeIdentity): target is TypeIdentity<unknown> {
  return target.kind === TypeKind.Unknown
}

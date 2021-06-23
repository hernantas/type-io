import { ConstructorIdentity, ConstructorType, TargetType, TypeIdentity, TypeKind } from '../../type'

export function type <T> (type: ConstructorType<T>, variant?: TargetType): TypeIdentity<T> {
  const id: ConstructorIdentity<T> = {
    kind: TypeKind.Constructor,
    variant,
    type
  }
  return id
}

export function isConstructorIdentity <T> (target: TypeIdentity<T>): target is ConstructorIdentity<T> {
  return target.kind === TypeKind.Constructor
}

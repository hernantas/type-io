import { TypeKind } from './TypeKind'

/**
 * Provides type information of `<T>`
 */
export interface TypeIdentity<T> {
  readonly kind: TypeKind
}

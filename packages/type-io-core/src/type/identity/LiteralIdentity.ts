import { LiteralValue } from '../LiteralValue'
import { TypeIdentity } from './TypeIdentity'
import { TypeKind } from './TypeKind'

/**
 * `TypeIdentity` that provides information about literal value of `<T>` type
 */
export interface LiteralIdentity<T extends LiteralValue> extends TypeIdentity<T> {
  readonly kind: TypeKind.Literal
  readonly value: T
}

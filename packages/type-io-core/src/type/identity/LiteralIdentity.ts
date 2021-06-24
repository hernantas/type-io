import { LiteralType } from '../common'
import { TypeIdentity } from './TypeIdentity'
import { TypeKind } from './TypeKind'

/**
 * `TypeIdentity` that provides information about literal value of `<T>` type
 */
export interface LiteralIdentity<T extends LiteralType> extends TypeIdentity<T> {
  readonly _kind: TypeKind.Literal
  readonly value: T
}

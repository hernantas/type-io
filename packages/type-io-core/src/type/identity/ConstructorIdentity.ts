import { ConstructorType } from '../common'
import { TypeIdentity } from './TypeIdentity'
import { TypeKind } from './TypeKind'

/**
 * `TypeIdentity` that provides information about class constructor of `<T>` type
 */
export interface ConstructorIdentity<T> extends TypeIdentity<T> {
  readonly _kind: TypeKind.Constructor
  readonly type: ConstructorType<T>
}

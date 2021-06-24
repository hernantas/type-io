import { MemberType } from '../common'
import { TargetTypeOf } from '../util'
import { TypeIdentity } from './TypeIdentity'
import { TypeKind } from './TypeKind'

/**
 * `TypeIdentity` that provides information about member type of `<T>` type
 */
export interface MemberIdentity<T extends MemberType> extends TypeIdentity<T> {
  _kind: TypeKind.Tuple | TypeKind.Union | TypeKind.Intersection
  members: TargetTypeOf<T>
}

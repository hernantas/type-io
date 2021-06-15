import { MemberType } from '../common'
import { TypeIdentity } from './TypeIdentity'
import { TypeKind } from './TypeKind'
import { TargetMemberOf } from '../util/TargetMemberOf'

/**
 * `TypeIdentity` that provides information about member type of `<T>` type
 */
export interface MemberIdentity<T extends MemberType> extends TypeIdentity<T> {
  kind: TypeKind.Tuple | TypeKind.Union | TypeKind.Intersection
  members: TargetMemberOf<T>
}

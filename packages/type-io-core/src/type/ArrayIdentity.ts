import { TargetType } from './TargetType'
import { TypeIdentity } from './TypeIdentity'
import { TypeKind } from './TypeKind'

export interface ArrayIdentity<T> extends TypeIdentity<T[]> {
  readonly kind: TypeKind.Array
  readonly type: TargetType<T>
}

import { RecordValue } from './RecordValue'
import { TypeIdentity } from './TypeIdentity'
import { TypeKind } from './TypeKind'
import { TargetPropOf } from './util/TargetPropOf'

/**
 * `TypeIdentity` that provides information about property of plain object on `<T>` type
 */
export interface RecordIdentity<T extends RecordValue> extends TypeIdentity<T> {
  readonly kind: TypeKind.Record
  readonly props: TargetPropOf<T>
}

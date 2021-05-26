import { RecordValue } from './RecordValue'
import { TypeIdentity } from './TypeIdentity'
import { TypeKind } from './TypeKind'
import { TargetRecordOf } from './util/TargetRecordOf'

/**
 * `TypeIdentity` that provides information about property of plain object on `<T>` type
 */
export interface RecordIdentity<T extends RecordValue> extends TypeIdentity<T> {
  readonly kind: TypeKind.Record
  readonly props: TargetRecordOf<T>
}

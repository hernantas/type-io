import { RecordType } from '../common'
import { TargetTypeOf } from '../util'
import { TypeIdentity } from './TypeIdentity'
import { TypeKind } from './TypeKind'

/**
 * `TypeIdentity` that provides information about property of plain object on `<T>` type
 */
export interface RecordIdentity<T extends RecordType> extends TypeIdentity<T> {
  readonly _kind: TypeKind.Record
  readonly props: TargetTypeOf<T>
}

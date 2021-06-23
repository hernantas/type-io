import { TargetRecordOf } from '../../type/util'
import { RecordIdentity, RecordType, TargetType, TypeIdentity, TypeKind } from '../../type'

export function record <T extends RecordType> (props: TargetRecordOf<T>, variant?: TargetType): TypeIdentity<T> {
  const id: RecordIdentity<T> = {
    kind: TypeKind.Record,
    variant,
    props
  }
  return id
}

export function isRecordIdentity <T extends RecordType> (target: TypeIdentity<T>): target is RecordIdentity<T> {
  return target.kind === TypeKind.Record
}

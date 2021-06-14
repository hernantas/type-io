import { RecordValue } from '../value'
import { TargetTypeOf } from './TargetTypeOf'

export type TargetRecordOf<T extends RecordValue> = TargetTypeOf<T>

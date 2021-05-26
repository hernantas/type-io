import { RecordValue } from '../RecordValue'
import { TargetTypeOf } from './TargetTypeOf'

export type TargetRecordOf<T extends RecordValue> = TargetTypeOf<T>

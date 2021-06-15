import { RecordType } from '../common'
import { TargetTypeOf } from './TargetTypeOf'

export type TargetRecordOf<T extends RecordType> = TargetTypeOf<T>

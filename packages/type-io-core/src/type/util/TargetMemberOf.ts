import { MemberValue } from '../value'
import { TargetTypeOf } from './TargetTypeOf'

export type TargetMemberOf<T extends MemberValue> = TargetTypeOf<T>

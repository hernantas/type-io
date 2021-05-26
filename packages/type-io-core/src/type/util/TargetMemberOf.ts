import { MemberValue } from '../MemberValue'
import { TargetTypeOf } from './TargetTypeOf'

export type TargetMemberOf<T extends MemberValue> = TargetTypeOf<T>

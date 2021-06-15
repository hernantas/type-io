import { MemberType } from '../common'
import { TargetTypeOf } from './TargetTypeOf'

export type TargetMemberOf<T extends MemberType> = TargetTypeOf<T>

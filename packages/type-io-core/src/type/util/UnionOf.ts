import { MemberValue } from '../MemberValue'

/**
 * Map array of value type into Union of value type
 */
export type UnionOf<T extends MemberValue> = T extends (infer R)[] ? R : never

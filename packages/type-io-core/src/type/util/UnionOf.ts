import { MemberValue } from '../value'

/**
 * Map array of value type into Union of value type
 */
export type UnionOf<T extends MemberValue> = T extends Array<infer R> ? R : never

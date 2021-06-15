import { MemberType } from '../common'

/**
 * Map array of value type into Union of value type
 */
export type UnionOf<T extends MemberType> = T extends Array<infer R> ? R : never

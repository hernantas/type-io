import { TargetType } from '../TargetType'

/**
 * Map type of properties/members of `<T>` into its `TargetType`
 */
export type TargetTypeOf<T> = { [K in keyof T]: TargetType<T[K]> }

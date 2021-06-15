import { ConstructorType } from './common'
import { TypeIdentity } from './identity'

/**
 * Convinient Type of "target" that can be used to determine information about type of `<T>`
 */
export type TargetType<T = unknown> = ConstructorType<T> | TypeIdentity<T>

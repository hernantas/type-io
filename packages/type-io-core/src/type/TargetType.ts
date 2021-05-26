import { ConstructorValue } from './ConstructorValue'
import { TypeIdentity } from './TypeIdentity'

/**
 * Type of "target" that can be used to determine information about type of `<T>`
 */
export type TargetType<T = unknown> = ConstructorValue<T> | TypeIdentity<T>

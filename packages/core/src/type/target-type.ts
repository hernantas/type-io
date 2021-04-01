import { AnyParamConstructor } from './any-param-constructor'

/**
 * Allowed target type used for decoding/encoding
 */
export type TargetType<T = unknown> =
  | AnyParamConstructor<T>
  | AnyParamConstructor[]

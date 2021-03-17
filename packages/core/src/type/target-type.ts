import { AnyParamConstructor } from './any-param-constructor'

export type TargetType<T = unknown> =
  | AnyParamConstructor<T>
  | AnyParamConstructor[]

import { AnyParamConstructor } from './any-param-constructor'

/**
 * Target type for single type such as `String` or `Number`
 */
export type SingleType<T = unknown> = AnyParamConstructor<T>

/**
 * Part of target type for enum (ex: `['ENUM_1', 'ENUM_2']`)
 */
export type EnumType = (string | number)[]

/**
 * Target type for single union type (ex: `[[UnionType1, UnionType2]]`)
 */
export type SingleUnionType = [EnumType]

/**
 * Target type for nested type (ex: `[String, Number]`)
 */
export type NestedType = [
  SingleType | EnumType,
  SingleType | EnumType,
  ...(SingleType | EnumType)[],
]

/**
 * Allowed target type used for decoding/encoding
 */
export type TargetType<T = unknown> =
  | SingleType<T>
  | SingleUnionType
  | NestedType

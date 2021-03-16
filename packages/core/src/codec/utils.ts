import { AnyParamConstructor, TargetType } from '../type'
import { TargetTypes } from './target-types'

export function findTargetType <T> (input: T[]): TargetType<T[]>
export function findTargetType <T> (input: T): TargetType<T>
export function findTargetType <T> (input: T | T[]): TargetType<T> | TargetType<T[]> {
  if (Array.isArray(input)) {
    if (input.length > 0) {
      return TargetTypes.array(Object.getPrototypeOf(input[0]).constructor as AnyParamConstructor<T>)
    } else {
      throw new Error('Cannot find target type from empty array')
    }
  }

  return Object.getPrototypeOf(input).constructor as AnyParamConstructor<T>
}

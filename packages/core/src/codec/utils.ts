import { AnyParamConstructor, TargetType } from '../type'
import { TargetTypes } from './target-types'

export function findTargetType <T> (input: T[]): TargetType<T[]>
export function findTargetType <T> (input: T): TargetType<T>
export function findTargetType <T> (input: T | T[]): TargetType<T> | TargetType<T[]> {
  try {
    const ctor = findCtor(input)

    if (Array.isArray(input)) {
      return TargetTypes.array(ctor)
    }

    return ctor
  } catch (e) {
    throw new Error('Cannot find target type from empty array')
  }
}

export function findCtor <T> (input: T | T[]): AnyParamConstructor<T> {
  if (Array.isArray(input)) {
    if (input.length > 0) {
      return Object.getPrototypeOf(input[0]).constructor as AnyParamConstructor<T>
    } else {
      throw new Error('Cannot find target constructor from empty array')
    }
  }
  return Object.getPrototypeOf(input).constructor as AnyParamConstructor<T>
}

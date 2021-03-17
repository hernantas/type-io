import { AnyParamConstructor } from '../type'

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

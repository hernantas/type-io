import { AnyParamConstructor } from '../type'

export function findInputConstructor <T> (input: T | T[]): AnyParamConstructor<T> {
  if (input instanceof Array) {
    if (input.length > 0) {
      return Object.getPrototypeOf(input[0]).constructor as AnyParamConstructor<T>
    } else {
      throw new Error('Cannot find target type from empty array')
    }
  }

  return Object.getPrototypeOf(input).constructor as AnyParamConstructor<T>
}

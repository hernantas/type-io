import { ConstructorValue } from '../../type'

/**
 * Try to get constructor of given value
 *
 * @param input An instance of object
 * @returns Constructor of given value
 */
export function findCtor <T> (input: T | T[]): ConstructorValue<T> {
  if (Array.isArray(input)) {
    if (input.length > 0) {
      return Object.getPrototypeOf(input[0]).constructor as ConstructorValue<T>
    } else {
      throw new Error('Cannot find target constructor from empty array')
    }
  }
  return Object.getPrototypeOf(input).constructor as ConstructorValue<T>
}

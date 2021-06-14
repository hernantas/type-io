import { ConstructorValue } from '../../type'

/**
 * Try to get constructor of given value
 *
 * @param input An instance of object
 * @returns Constructor of given value
 */
export function findCtor <T> (input: T): ConstructorValue<T> {
  return Object.getPrototypeOf(input).constructor as ConstructorValue<T>
}

import { ConstructorType } from '../../type'

/**
 * Try to get constructor of given value
 *
 * @param input An instance of object
 * @returns Constructor of given value
 */
export function findCtor <T> (input: T): ConstructorType<T> {
  return Object.getPrototypeOf(input).constructor as ConstructorType<T>
}

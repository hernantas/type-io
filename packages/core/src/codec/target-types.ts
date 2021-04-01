import { AnyParamConstructor, TargetType } from '../type'
import { findCtor } from './utils'

/**
 * Utility class used for `TargetType`
 */
export class TargetTypes {
  /**
   * Find `TargetTypes` from given object
   *
   * @param input object referenced
   * @throws when cannot get `TargetTypes` from given object either because
   *         cannot find its ctor or it's an empty array
   */
  static find <T> (input: T[]): TargetType<T[]>
  static find <T> (input: T): TargetType<T>
  static find <T> (input: T | T[]): TargetType<T> | TargetType<T[]> {
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

  /**
   * Compare both given type if equal. True is only given when:
   *
   * - Both are array, have same length and same element
   * - Both are not array and have same type
   *
   * @param in1 First type to be compared
   * @param in2 Second type to be compared
   * @returns True if equal, false otherwise
   */
  static equal <T> (in1: TargetType<T>, in2: TargetType<T>): boolean {
    if (Array.isArray(in1) && Array.isArray(in2)) {
      if (in1.length !== in2.length) {
        return false
      }

      for (let i = 0; i < in1.length; i++) {
        if (in1[i] !== in2[i]) {
          return false
        }
      }
      return true
    } else if (!Array.isArray(in1) && !Array.isArray(in2)) {
      return in1 === in2
    }
    return false
  }

  /**
   * Construct `TargetType` from given type that describe it as `Array` of given
   * type. For example:
   *
   * - `Array` of `String` will result in `[Array, String]` target type
   * - `Array` of `Array` of `String` (String[][]) will result in `[Array, Array, String]` target type
   *
   * @param type Type of element in array
   * @returns Array target type for given type
   */
  static array <T> (type: TargetType<T>): TargetType<T[]> {
    return this.merge<T[], T>(Array, type)
  }

  /**
   * Remove `Array` from `TargetType` by shifting the target type. For example:
   *
   * - [`Array`, `String`] will result in `String`
   * - However, [`Array`, `Array`, `String`] will result in [`Array`, `String`]
   *
   * @param type Target type to be removed
   * @returns Target type without array
   */
  static unArray <T> (type: TargetType<T | T[]>): TargetType<T> {
    if (this.isValidArray(type)) {
      type = type.slice(1)
    }
    return (Array.isArray(type) && type.length === 1 ? type[0] : type) as TargetType<T>
  }

  /**
   * Check if given `TargetType` is valid `TargetType` for array (TargetType<T[]>). Valid
   * array `TargetType` is represented as `[Array, ...]`
   *
   * @param type Type to be checked
   * @returns true if given `TargetType` is valid array, false otherwise
   */
  static isValidArray <T> (type: TargetType<T>): type is AnyParamConstructor<T>[] {
    return Array.isArray(type) && type.length > 1 && type[0] === Array
  }

  /**
   * Merge 2 `TargetType` sequentally
   *
   * @param t1 Origin type to be merged, used as base of output type
   * @param t2 Type to be merged
   * @returns Merged type
   */
  static merge <T, U> (t1: TargetType<T>, t2: TargetType<U>): TargetType<T> {
    return [
      ...(Array.isArray(t1) ? t1 : [t1]),
      ...(Array.isArray(t2) ? t2 : [t2])
    ]
  }

  /**
   * Check if given type is valid. Valid type is:
   *
   * - Any class such as `String`, `Number`, `Boolean`, etc but not `Object` and `Array`
   * - Array of class at least 2 element
   *
   * @param type Type to be checked
   * @returns true if given type is valid, false otherwise
   */
  static isValid (type: TargetType): boolean {
    return (Array.isArray(type) && type.length > 1) ||
      (typeof type === 'function' && type !== Object && type !== Array)
  }
}

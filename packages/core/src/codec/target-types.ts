import { SingleType, SingleUnionType, TargetType, NestedType, EnumType } from '../type'
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
    let ctor
    try {
      ctor = findCtor(input)
    } catch (e) {
      throw new Error('Cannot find target type from empty array')
    }

    if (Array.isArray(input)) {
      return TargetTypes.array(ctor)
    }

    return ctor
  }

  static isValid (type: TargetType): boolean {
    if (this.isSingle(type)) {
      return type !== Object && type !== Array
    } else if (this.isNested(type)) {
      for (let i = 0; i < type.length; i++) {
        if (type[i] === Array && i === type.length - 1) {
          return false
        }
      }
    }

    return true
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
  static equal (in1: TargetType, in2: TargetType): boolean {
    return this.equalSingle(in1, in2) || this.equalSingleUnion(in1, in2) || this.equalNested(in1, in2)
  }

  static equalNested (in1: TargetType, in2: TargetType): boolean {
    if (this.isNested(in1) && this.isNested(in2)) {
      if (in1.length !== in2.length) {
        return false
      }

      for (let i = 0; i < in1.length; i++) {
        const elem1 = in1[i]
        const elem2 = in2[i]

        if (this.isSingle(elem1) && this.isSingle(elem2)) {
          if (elem1 !== elem2) {
            return false
          }
        } else if (this.isEnum(elem1) && this.isEnum(elem2)) {
          if (this.equalEnum(elem1, elem2)) {
            return false
          }
        } else {
          return false
        }
      }

      return true
    }
    return false
  }

  static equalSingleUnion (in1: TargetType, in2: TargetType): boolean {
    if (this.isSingleUnion(in1) && this.isSingleUnion(in2)) {
      return this.equalEnum(in1[0], in2[0])
    }
    return false
  }

  static equalEnum (union1: EnumType, union2: EnumType): boolean {
    if (union1.length !== union2.length) {
      return false
    }

    for (let i = 0; i < union1.length; i++) {
      if (union1[i] !== union2[i]) {
        return false
      }
    }

    return true
  }

  static equalSingle (in1: TargetType, in2: TargetType): boolean {
    if (this.isSingle(in1) && this.isSingle(in2)) {
      return in1 === in2
    }
    return false
  }

  /**
   * Create target type from enum
   *
   * @param enumObject Enum object
   * @returns Target type of single enum
   */
  static enum (enumObject: Record<string | number, string | number>): TargetType {
    return [Object.values(enumObject)]
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
   * Remove one `Array` from `TargetType` by shifting the target type. For example:
   *
   * - [`Array`, `String`] will result in `String`
   * - However, [`Array`, `Array`, `String`] will result in [`Array`, `String`]
   *
   * @param type Target type to be removed
   * @returns Target type without array
   */
  static unArray <T> (type: TargetType<T | T[]>): TargetType<T> {
    if (this.isNested(type)) {
      if (type[0] === Array) {
        const sliced = type.slice(1)

        return sliced.length >= 2
          ? sliced as NestedType
          : Array.isArray(sliced[0])
            ? sliced as SingleUnionType
            : sliced[0] as SingleType<T>
      }
    }
    return type as TargetType<T>
  }

  /**
   * Merge 2 `TargetType` sequentially
   *
   * @param t1 Origin type to be merged, used as base of output type
   * @param t2 Type to be merged
   * @returns Merged type
   */
  static merge <T, U> (t1: TargetType<T>, t2: TargetType<U>): TargetType<T> {
    return [
      ...(Array.isArray(t1) ? t1 : [t1]),
      ...(Array.isArray(t2) ? t2 : [t2])
    ] as TargetType<T>
  }

  static is <T = unknown> (type: unknown): type is TargetType<T> {
    return this.isSingle(type) || this.isSingleUnion(type) || this.isNested(type)
  }

  static isNested (type: unknown): type is NestedType {
    if (!Array.isArray(type) || type.length < 2) {
      return false
    }

    for (const t of type) {
      if (!this.isSingle(t) && !this.isEnum(t)) {
        return false
      }
    }

    return true
  }

  static isSingleUnion (type: unknown): type is SingleUnionType {
    return Array.isArray(type) && type.length === 1 && this.isEnum(type[0])
  }

  static isEnum (type: unknown): type is EnumType {
    if (!Array.isArray(type)) {
      return false
    }

    for (const t of type) {
      if (!(typeof t === 'string' || typeof t === 'number')) {
        return false
      }
    }

    return true
  }

  static isSingle <T> (type: unknown): type is SingleType<T> {
    return !Array.isArray(type) && typeof type === 'function'
  }
}

import { AnyParamConstructor, TargetType } from '../type'

export class TargetTypes {
  /**
   * Construct `TargetType` from given type that describe it as `Array` of given type
   *
   * @param type Type of element in array
   * @returns Array target type for given type
   */
  static array <T> (type: AnyParamConstructor<T>): TargetType<T[]> {
    return {
      type: Array,
      subType: type
    }
  }
}

import { AnyParamConstructor, TargetType } from '../type'

export class TargetTypes {
  static array <T> (type: AnyParamConstructor<T>): TargetType<T[]> {
    return {
      type: Array,
      subType: type
    }
  }
}

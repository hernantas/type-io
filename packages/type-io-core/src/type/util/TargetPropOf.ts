import { TargetType } from '../TargetType';
import { RecordValue } from '../RecordValue';

// TEST: Constructor
// const conV1 = decode(type(String))
// const conV2 = decode(type(Number))

export type TargetPropOf<T extends RecordValue> = {
  [K in keyof T]: TargetType<T[K]>;
};

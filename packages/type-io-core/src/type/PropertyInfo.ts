import { CodecOption } from './CodecOption'
import { TargetType } from './TargetType'

/**
 * Provides information about property
 */
export interface PropertyInfo<T = unknown> {
  type: TargetType<T>
  optional: boolean
  inName: string
  outName: string
  option?: CodecOption
}

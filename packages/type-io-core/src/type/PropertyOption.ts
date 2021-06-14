import { TargetType } from './TargetType'
import { CodecOption } from './CodecOption'

export interface PropertyOption {
  type?: TargetType
  optional?: boolean
  inName?: string
  outName?: string
  option?: CodecOption
}

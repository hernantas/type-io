import { TargetType } from './TargetType'
import { CodecOption } from './CodecOption'
import { TypeResolution } from './TypeResolution'

export interface PropertyOption {
  type?: TargetType
  typeResolution?: TypeResolution
  optional?: boolean
  inName?: string
  outName?: string
  option?: CodecOption
}

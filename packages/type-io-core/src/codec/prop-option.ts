import { AnyParamConstructor } from '../type'

export interface PropOption {
  type?: AnyParamConstructor
  optional?: boolean
  inName?: string
  outName?: string
}

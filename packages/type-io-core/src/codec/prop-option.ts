import { AnyParamConstructor } from '../type'

export interface PropOption {
  type?: AnyParamConstructor | AnyParamConstructor[]
  optional?: boolean
  inName?: string
  outName?: string
  ignore?: boolean
}

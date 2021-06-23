import { TargetType } from '../TargetType'
import { TypeKind } from './TypeKind'

/**
 * Provides type information of `<T>`
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface TypeIdentity<T = unknown> {
  readonly _kind: TypeKind
  variant?: TargetType
}

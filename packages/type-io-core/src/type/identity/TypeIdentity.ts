import { TargetType } from '../TargetType'
import { TypeKind } from './TypeKind'

/**
 * Provides type information of `<T>`
 */
export interface TypeIdentity<T = unknown> {
  readonly kind: TypeKind
  variant?: TargetType
}

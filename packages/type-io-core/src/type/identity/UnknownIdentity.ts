import { TypeIdentity } from './TypeIdentity'
import { TypeKind } from './TypeKind'

export interface UnknownIdentity extends TypeIdentity<unknown> {
  readonly kind: TypeKind.Unknown
}

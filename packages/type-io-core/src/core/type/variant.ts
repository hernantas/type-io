import { TargetType, TypeIdentity } from '../../type'
import { toIdentity } from './util'

export function variant <T> (source: TargetType<T>, variant?: TargetType): TypeIdentity<T> {
  const id = toIdentity(source)
  id.variant = variant
  return id
}

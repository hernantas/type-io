import 'reflect-metadata'
import { ConstructorValue, PropDefinition } from '../../type'

const METADATA_KEY_DESIGN_TYPE = 'design:type'
const METADATA_KEY_TYPE = 'typeio:type'

function isPropDefinition (obj: unknown): obj is PropDefinition {
  const def = obj as PropDefinition
  return def.type !== undefined ||
    def.name !== undefined ||
    def.inName !== undefined ||
    def.outName !== undefined ||
    def.optional !== undefined
}

/**
 * Get design type for given object
 *
 * @param target Target object
 * @param propertyKey Property key of target object
 * @returns Target type
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function getDesignType (target: Object, propertyKey: string | symbol): ConstructorValue {
  return Reflect.getMetadata(METADATA_KEY_DESIGN_TYPE, target, propertyKey)
}

/**
 * Get Property definitions of target type
 *
 * @param constructor Target type constructor
 * @returns Array of property definition
 */
export function getTypeDef (constructor: ConstructorValue): PropDefinition[] {
  const defs = Reflect.getMetadata(METADATA_KEY_TYPE, constructor)

  if (Array.isArray(defs)) {
    return defs.filter(isPropDefinition)
  }

  return []
}

/**
 * Set Property definitions of target type
 *
 * @param constructor Target type constructor
 * @param defs Array of property definition
 */
export function setTypeDef (constructor: ConstructorValue, defs: PropDefinition[]): void {
  Reflect.defineMetadata(METADATA_KEY_TYPE, defs, constructor)
}

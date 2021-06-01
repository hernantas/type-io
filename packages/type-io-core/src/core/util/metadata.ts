import 'reflect-metadata'
import { ConstructorValue, ObjectSchema, PropertyInfo } from '../../type'

const METADATA_KEY_DESIGN_TYPE = 'design:type'
const METADATA_KEY_SCHEMA = 'typeio:schema'

function isPropertyInfo (obj: unknown): obj is PropertyInfo {
  const def = obj as PropertyInfo
  return def.type !== undefined ||
    def.name !== undefined ||
    def.inName !== undefined ||
    def.outName !== undefined ||
    def.optional !== undefined
}

/**
 * Get design type of property for given object
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
 * Get object schema for given type
 *
 * @param constructor Target type constructor
 * @returns Object schema
 */
export function getSchema (constructor: ConstructorValue): ObjectSchema {
  const schema = Reflect.getMetadata(METADATA_KEY_SCHEMA, constructor)
  return schema !== undefined && Array.isArray(schema)
    ? schema.filter(isPropertyInfo)
    : []
}

/**
 * Set object schema for given type
 *
 * @param constructor Target type constructor
 * @param schema Object schema
 */
export function setSchema <T> (constructor: ConstructorValue<T>, schema: ObjectSchema): void {
  Reflect.defineMetadata(METADATA_KEY_SCHEMA, schema, constructor)
}

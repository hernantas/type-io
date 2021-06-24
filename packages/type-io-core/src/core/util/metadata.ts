import 'reflect-metadata'
import { ConstructorType, PropertySignature, RecordSignature, RecordType } from '../../type'

const METADATA_KEY_DESIGN_TYPE = 'design:type'
const METADATA_KEY_SIGNATURE = 'typeio:signature'

function isPropertySignature <T> (obj: unknown): obj is PropertySignature<T> {
  const def = obj as PropertySignature<T>
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
export function getDesignType <T> (target: T, propertyKey: keyof T): ConstructorType<T[keyof T]> {
  return Reflect.getMetadata(METADATA_KEY_DESIGN_TYPE, target, propertyKey as string | symbol)
}

/**
 * Get object schema for given type
 *
 * @param constructor Target type constructor
 * @returns Object schema
 */
export function getSignature <T> (constructor: ConstructorType<T>): RecordSignature<T> {
  const schema = Reflect.getMetadata(METADATA_KEY_SIGNATURE, constructor)
  return schema !== undefined && Array.isArray(schema)
    ? schema.filter(isPropertySignature) as RecordSignature<T>
    : []
}

/**
 * Set object schema for given type
 *
 * @param constructor Target type constructor
 * @param signature Object schema
 */
export function setSignature <T> (constructor: ConstructorType<T>, signature: RecordSignature<T>): void {
  Reflect.defineMetadata(METADATA_KEY_SIGNATURE, signature, constructor)
}

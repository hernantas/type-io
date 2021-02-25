import 'reflect-metadata'
import { AnyParamConstructor } from '../type'
import { PropDefinition } from './prop-definition'

const METADATA_KEY_DESIGN_TYPE = 'design:type'
const METADATA_KEY_TYPE = 'typeio:type'

export class Metadata {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static getDesignType (target: Object, propertyKey: string | symbol): unknown {
    return Reflect.getMetadata(METADATA_KEY_DESIGN_TYPE, target, propertyKey)
  }

  static getTypeDef (constructor: AnyParamConstructor): PropDefinition[] {
    const defs = Reflect.getMetadata(METADATA_KEY_TYPE, constructor)

    if (Array.isArray(defs)) {
      return defs.filter(isTypeDefinition)
    }

    return []
  }

  static setTypeDef (constructor: AnyParamConstructor, defs: PropDefinition[]): void {
    Reflect.defineMetadata(METADATA_KEY_TYPE, defs, constructor)
  }
}

function isTypeDefinition (obj: unknown): obj is PropDefinition {
  const def = obj as PropDefinition
  return def.type !== undefined ||
    def.name !== undefined ||
    def.inName !== undefined ||
    def.outName !== undefined ||
    def.optional !== undefined
}

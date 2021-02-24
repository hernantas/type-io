import { Metadata } from './metadata'
import { PropDefinition } from './prop-definition'
import { PropOption } from './prop-option'
import { AnyParamConstructor } from '../type'

export function Prop (options?: PropOption): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object, propertyKey: string | symbol): void => {
    const designType = Metadata.getDesignType(target, propertyKey) as AnyParamConstructor

    if (typeof propertyKey === 'string') {
      const def: PropDefinition = {
        name: propertyKey,
        type: options?.type !== undefined ? options.type : designType,
        optional: options?.optional !== undefined ? options.optional : false,
        inName: options?.inName !== undefined ? options.inName : propertyKey,
        outName: options !== undefined ? (options.outName !== undefined ? options.outName : (options.inName !== undefined ? options.inName : propertyKey)) : propertyKey,
        ignore: options?.ignore !== undefined ? options.ignore : false
      }

      if (def.type === undefined || def.type === Object || def.type === Array) {
        throw new Error(`${def.name} has unknown type, make sure to specify the type`)
      }

      const defs = Metadata.getTypeDef(target.constructor as AnyParamConstructor)
      const index = defs.findIndex(def => def.name === propertyKey)
      if (index === -1) {
        defs.push(def)
      } else {
        defs[index] = def
      }
      Metadata.setTypeDef(target.constructor as AnyParamConstructor, defs)
    }
  }
}

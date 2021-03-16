import { Metadata } from './metadata'
import { PropDefinition } from './prop-definition'
import { PropOption } from './prop-option'
import { AnyParamConstructor } from '../type'

export function Prop (options?: PropOption): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object, propertyKey: string | symbol): void => {
    if (typeof propertyKey === 'string') {
      const def: PropDefinition = {
        name: propertyKey,
        designType: Metadata.getDesignType(target, propertyKey),
        optional: false,
        inName: propertyKey,
        outName: propertyKey
      }

      if (options !== undefined) {
        def.type = options.type
        def.option = options.option

        def.optional = options.optional ?? false
        def.inName = options.inName ?? options.outName ?? def.name
        def.outName = options.outName ?? options.inName ?? def.name
      }

      if ((def.designType === Object || def.designType === Array) && def.type === undefined) {
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

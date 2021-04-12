import { Metadata } from './metadata'
import { PropDefinition } from './prop-definition'
import { PropOption } from './prop-option'
import { AnyParamConstructor } from '../type'
import { TargetTypes } from './target-types'

export function Prop (options?: PropOption): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object, propertyKey: string | symbol): void => {
    if (typeof propertyKey === 'string') {
      const designType = Metadata.getDesignType(target, propertyKey)

      const def: PropDefinition = {
        name: propertyKey,
        type: designType,
        optional: false,
        inName: propertyKey,
        outName: propertyKey
      }

      if (options !== undefined) {
        if (options.type !== undefined) {
          if (designType === Array) {
            def.type = TargetTypes.array(options.type)
          } else if (designType !== Object) {
            def.type = TargetTypes.merge(designType, options.type)
          } else {
            def.type = options.type
          }
        }

        def.option = options.option
        def.optional = options.optional ?? false
        def.inName = options.inName ?? options.outName ?? def.name
        def.outName = options.outName ?? options.inName ?? def.name
      }

      if (!TargetTypes.isValid(def.type)) {
        throw new Error(`"${def.name}" property has unknown or invalid type, make sure to specify the correct type`)
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

import { ConstructorValue, PropDefinition, PropOption } from '../type'
import { array } from './type'
import { getDesignType, getTypeDef, setTypeDef } from './util'

export function Prop (options?: PropOption): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object, propKey: string | symbol): void => {
    if (typeof propKey === 'string') {
      const designType = getDesignType(target, propKey)

      const def: PropDefinition = {
        name: propKey,
        type: designType,
        optional: false,
        inName: propKey,
        outName: propKey
      }

      if (options !== undefined) {
        if (options.type !== undefined) {
          // Autofix target type
          if (designType === Array) {
            def.type = array(options.type)
          } else {
            // Skip design:type
            def.type = options.type
          }
        }

        def.option = options.option
        def.optional = options.optional ?? false
        def.inName = options.inName ?? options.outName ?? def.name
        def.outName = options.outName ?? options.inName ?? def.name
      }

      const defs = getTypeDef(target.constructor as ConstructorValue)
      const index = defs.findIndex(def => def.name === propKey)
      if (index === -1) {
        defs.push(def)
      } else {
        defs[index] = def
      }
      setTypeDef(target.constructor as ConstructorValue, defs)
    }
  }
}

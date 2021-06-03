import { ConstructorValue, PropertyInfo, PropertyOption } from '../type'
import { array } from './type'
import { getDesignType, getSchema, setSchema } from './util'

export function Prop (options?: PropertyOption): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object, propKey: string | symbol): void => {
    if (typeof propKey === 'string') {
      const designType = getDesignType(target, propKey)

      const def: PropertyInfo = {
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

      if (def.type === Array) {
        throw new Error('\'type\' option must be specified when property is an array')
      }

      const schema = getSchema(target.constructor as ConstructorValue)
      const index = schema.findIndex(def => def.name === propKey)
      if (index === -1) {
        schema.push(def)
      } else {
        schema[index] = def
      }
      setSchema(target.constructor as ConstructorValue, schema)
    }
  }
}

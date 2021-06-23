import { ConstructorType, PropertyInfo, PropertyOption, TypeResolution } from '../type'
import { unknown, variant } from './type'
import { getDesignType, getSchema, setSchema } from './util'

export function Prop (options?: PropertyOption): PropertyDecorator {
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

      const resolution = options?.typeResolution ?? TypeResolution.AUTO
      switch (resolution) {
        case TypeResolution.AUTO:
          def.type = options?.type ?? designType
          break
        case TypeResolution.ORIGIN:
          def.type = designType
          break
        case TypeResolution.OVERRIDE:
          def.type = options?.type ?? unknown()
          break
        case TypeResolution.MERGE:
          def.type = variant(designType, options?.type)
          break
      }

      if (options !== undefined) {
        def.option = options.option
        def.optional = options.optional ?? false
        def.inName = options.inName ?? options.outName ?? def.name
        def.outName = options.outName ?? options.inName ?? def.name
      }

      if (def.type === Array) {
        throw new Error('\'type\' option must be specified when property is an array')
      }

      const schema = getSchema(target.constructor as ConstructorType)
      const index = schema.findIndex(def => def.name === propKey)
      if (index === -1) {
        schema.push(def)
      } else {
        schema[index] = def
      }
      setSchema(target.constructor as ConstructorType, schema)
    }
  }
}

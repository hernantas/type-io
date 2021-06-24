import { ConstructorType, PropertyOption, PropertySignature, RecordType, TypeResolution } from '../type'
import { unknown, variant } from './type'
import { getDesignType, getSignature, setSignature } from './util'

export function Prop <T> (options?: PropertyOption<T>): PropertyDecorator {
  return (target: Object, key: string | symbol): void => {
    if (typeof key === 'string') {
      const designType = getDesignType(target as RecordType, key)

      const def: PropertySignature = {
        name: key,
        type: designType,
        optional: false,
        inName: key,
        outName: key
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

      const ctor = target.constructor as ConstructorType<RecordType>
      const signature = getSignature(ctor)
      const index = signature.findIndex(def => def.name === key)
      if (index === -1) {
        signature.push(def)
      } else {
        signature[index] = def
      }
      setSignature(ctor, signature)
    }
  }
}

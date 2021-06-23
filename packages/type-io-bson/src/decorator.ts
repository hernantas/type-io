import { Prop, PropertyOption, TypeResolution } from '@type-io/core'
import { ObjectId } from 'bson'

export function BsonId (options: Omit<PropertyOption, 'type' | 'typeResolution'>): PropertyDecorator {
  return Prop({
    ...options,
    type: ObjectId,
    typeResolution: TypeResolution.MERGE
  })
}

import { ObjectId } from '@type-io/bson'
import { Prop, TypeResolution } from '@type-io/core'

export function MongoId (): PropertyDecorator {
  return Prop({
    inName: '_id',
    outName: '_id',
    type: ObjectId,
    typeResolution: TypeResolution.MERGE
  })
}

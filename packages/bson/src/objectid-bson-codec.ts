import { Codec } from '@type-io/core'
import { ObjectID, ObjectId } from 'bson'

export class ObjectIdBsonCodec implements Codec<string, ObjectId> {
  type: TargetType = [String, ObjectId]

  decode (value: unknown): string {
    if (value instanceof ObjectId || value instanceof ObjectID) {
      return value.toHexString()
    }

    if (typeof value === 'string') {
      return ObjectId.createFromHexString(value).toHexString()
    }

    throw new Error('Unknown value type')
  }

  encode (value: string): ObjectId {
    return ObjectId.createFromHexString(value)
  }
}

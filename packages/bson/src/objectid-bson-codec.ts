import { Codec, TargetType } from '@type-io/core'
import { ObjectID, ObjectId } from 'bson'

export class StringObjectIdBsonCodec implements Codec<string, ObjectId> {
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

abstract class ObjectIdBsonBaseCodec<O> implements Codec<ObjectId, O> {
  type = ObjectId

  decode (value: unknown): ObjectId {
    if (value instanceof ObjectId || value instanceof ObjectID) {
      return value
    }

    if (typeof value === 'string') {
      return ObjectId.createFromHexString(value)
    }

    throw new Error('Unknown value type')
  }

  abstract encode (value: ObjectId): O
}

export class ObjectIdBsonCodec extends ObjectIdBsonBaseCodec<ObjectId> {
  encode (value: ObjectID): ObjectID {
    return value
  }
}

export class ObjectIdPlainBsonCodec extends ObjectIdBsonBaseCodec<string> {
  encode (value: ObjectID): string {
    return value.toHexString()
  }
}

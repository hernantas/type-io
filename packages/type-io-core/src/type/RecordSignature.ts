import { PropertySignature } from './PropertySignature'

export type RecordSignature<T> = Array<PropertySignature<T[keyof T]>>

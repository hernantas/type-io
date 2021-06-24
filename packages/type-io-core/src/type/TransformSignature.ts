import { TransformProperty } from './TransformProperty'

export type TransformSignature<T> = Array<TransformProperty<T[keyof T]>>

import { TransformProperty } from './TransformProperty'

export type TransformSchema<T> = Array<TransformProperty<T[keyof T]>>

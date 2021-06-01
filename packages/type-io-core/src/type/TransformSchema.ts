import { TransformProperty } from './TransformProperty'

export type TransformSchema<T> = TransformProperty<T[keyof T]>[]

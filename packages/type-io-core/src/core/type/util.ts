import { ConstructorType, EnumType, TargetType, TypeIdentity } from '../../type'
import { findCtor } from '../util'
import { array } from './array'
import { type } from './class'
import { literal } from './literal'
import { tuple, union } from './member'

export function toIdentity <T> (target: TargetType<T>): TypeIdentity<T> {
  return isConstructorType(target) ? type(target) : target
}

export function fromEnum <T extends EnumType> (enumValue: T, variant?: TargetType): TypeIdentity<T> {
  const type = Object.keys(enumValue).map(key => literal(enumValue[key]))
  return union(type, variant)
}

export function isConstructorType <T> (target: TargetType<T>): target is ConstructorType<T> {
  return typeof target === 'function'
}

export function isTypeIdentity <T> (target: TargetType<T>): target is TypeIdentity<T> {
  return typeof target === 'object' && !Array.isArray(target)
}

export function findIdentity <T> (value: T): TypeIdentity<T> {
  if (Array.isArray(value)) {
    const elements = value.map(val => findIdentity(val))
    const notUniformElements = elements.filter(e => e !== elements[0])
    return notUniformElements.length === 0 ? array(elements[0]) : tuple(elements)
  }
  return type(findCtor(value))
}

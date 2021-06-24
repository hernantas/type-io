import { TargetType, TypeIdentity } from '../../type'
import { isArrayIdentity } from './array'
import { isConstructorIdentity } from './class'
import { isLiteralIdentity } from './literal'
import { isMemberIdentity } from './member'
import { isRecordIdentity } from './record'
import { isUnknownIdentity } from './unknown'
import { isTypeIdentity, toIdentity } from './util'

function isIdentityEqual <T> (source: TypeIdentity<T>, destination: TypeIdentity): destination is TypeIdentity<T> {
  if (source._kind !== destination._kind) {
    return false
  }

  if (isUnknownIdentity(source) && isUnknownIdentity(destination)) {
    return true
  } else if (isConstructorIdentity(source) && isConstructorIdentity(destination)) {
    return source.type === destination.type
  } else if (isRecordIdentity(source) && isRecordIdentity(destination)) {
    const srcKeys = Object.keys(source.props)
    const dstKeys = Object.keys(destination.props)

    if (srcKeys.length !== dstKeys.length) {
      return false
    }

    return [...srcKeys, ...dstKeys]
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(key => source.props[key] !== undefined &&
        destination.props[key] !== undefined &&
        isEqual(source.props[key], destination.props[key])
      )
      .filter(b => !b)
      .length === 0
  } else if (isLiteralIdentity(source) && isLiteralIdentity(destination)) {
    return source.value === destination.value
  } else if (isArrayIdentity(source) && isArrayIdentity(destination)) {
    return isEqual(source.type, destination.type)
  } else if (isMemberIdentity(source) && isMemberIdentity(destination)) {
    if (source.members.length !== destination.members.length) {
      return false
    }

    for (let i = 0; i < source.members.length; i++) {
      if (!isEqual(source.members[i], destination.members[i])) {
        return false
      }
    }

    return true
  }

  return false
}

export function isEqual <T> (source: TargetType<T>, destination: TargetType): destination is TargetType<T> {
  const src = toIdentity(source)
  const dst = toIdentity(destination)
  return isIdentityEqual(src, dst)
}

export function isStrictEqual <T> (source: TargetType<T>, destination: TargetType): destination is TargetType<T> {
  const srcVariant = isTypeIdentity(source) ? source.variant : undefined
  const dstVariant = isTypeIdentity(destination) ? destination.variant : undefined
  const variantEqual = srcVariant !== undefined && dstVariant !== undefined
    ? isEqual(srcVariant, dstVariant)
    : srcVariant === undefined && dstVariant === undefined
  return isEqual(source, destination) && variantEqual
}

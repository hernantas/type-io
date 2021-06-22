/**
 * Type "kind" to be used as information to determine `TypeIdentity` kind
 */
export enum TypeKind {
  Unknown,
  Constructor,
  Record,
  Literal,
  Array,
  Tuple,
  Union,
  Intersection,
}

/**
 * Used to decide final type
 */
export enum TypeResolution {
  /**
   * Use either origin type (design:type) or specified type if specified in options. Used as default
   */
  AUTO,

  /**
   * Force use origin type (design:type)
   */
  ORIGIN,

  /**
   * Force use of specified type in options. In case type is not specified `unknown` will be used
   */
  OVERRIDE,

  /**
   * Merge origin type (design:type) and specified type as `variant`
   */
  MERGE
}

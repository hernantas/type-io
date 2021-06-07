/**
 * Type alias for Constructor type with any param
 */
export type ConstructorValue<T = unknown> = new (...args: any[]) => T

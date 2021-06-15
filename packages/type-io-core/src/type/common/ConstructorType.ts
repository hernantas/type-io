/**
 * Type alias for Constructor type with any param
 */
export type ConstructorType<T = unknown> = new (...args: any[]) => T

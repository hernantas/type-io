/**
 * Utility type for making property of `<T>` defined in `<RK>` optional
 */
export type OptionalOf<T, RK extends keyof T> = Required<Omit<T, RK>> & Partial<Pick<T, RK>>

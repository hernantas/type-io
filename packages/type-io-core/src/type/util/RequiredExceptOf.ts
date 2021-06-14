/**
 * Utility type for making all property in `<T>` required except for property defined in `<RK>` as optional
 */
export type RequiredExceptOf<T, RK extends keyof T> = Required<Omit<T, RK>> & Partial<Pick<T, RK>>

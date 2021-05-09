export type OptionalFor<T, RK extends keyof T> = Required<Omit<T, RK>> & Partial<Pick<T, RK>>

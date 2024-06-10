type Set<T> = (
  state: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean
) => T;
type Get<T> = () => T;

export type A<T> = (set: Set<T>, get: Get<T>) => T;

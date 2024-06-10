import { merge } from "../merge";

export type CombineSet<T = any> = (
  state: T | Partial<T> | ((state: T) => T | Partial<T>)
) => T;

export type Combine<T> = (set: CombineSet<T>) => T;

export type CombinePlugin<T = any> = {
  name: string;
  store: Combine<T>;
};

export function combineStore<T>(plugins: CombinePlugin[]) {
  return <Combine<T>>function (set) {
    return plugins.reduce((acc, plugin) => {
      const { name, store } = plugin;
      acc[name] = store(<CombineSet>function (data) {
        // @ts-ignore
        return set((state: any) => {
          return {
            [name]: merge(
              state[name],
              typeof data === "function" ? data(state[name]) : data
            ),
          };
        }) as T;
      })
      return acc;
    }, {} as any);
  };
}

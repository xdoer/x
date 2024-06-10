import pick from "lodash.pick";
import { useRef } from "react";
import { shallow } from "zustand/shallow";

type Many<T> = readonly T[];

type UseZus<P, T> = {
  (paths?: Many<P>): T;
  getState: () => T;
  setState: (fn: (state: T) => Partial<T> | T) => void;
  persist: {
    rehydrate: () => Promise<void> | void;
  };
};

export function useZus<
  S extends object,
  P extends keyof S,
  T extends Pick<S, P>
>(zustand: (cb?: (state: S) => T) => T) {
  const inner: UseZus<P, T> = (paths) => {
    if (!paths || !paths.length) return zustand();

    const prev = useRef<Pick<S, P>>({} as Pick<S, P>);

    // @ts-ignore
    return zustand((state: S) => {
      if (state) {
        const next = pick(state, paths);
        return shallow(prev.current, next)
          ? prev.current
          : (prev.current = next);
      }
      return prev.current;
    });
  };
  // @ts-ignore
  inner.getState = zustand.getState;
  // @ts-ignore
  inner.setState = zustand.setState;
  // @ts-ignore
  inner.persist = zustand.persist;
  return inner;
}

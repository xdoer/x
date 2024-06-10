import { isObject } from "./is";

// deep merge common object
export const merge = <T>(...args: (Record<string, any> | undefined)[]): T => {
  return args.reduce((t, c) => {
    if (!c) return t;

    const data = Object.entries(c);
    const length = data.length;

    for (let i = 0; i < length; i++) {
      const [key, value] = data[i];

      if (isObject(value)) {
        t[key] = merge(t[key], value);
      } else {
        Object.assign(t, { [key]: value });
      }
    }

    return t;
  }, {} as any);
};

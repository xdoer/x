const is =
  <T>(type: string) =>
    (obj: any): obj is T =>
      toString.call(obj) === `[object ${type}]`;
export const isRegExp = is<RegExp>("RegExp");
export const isString = is<string>("String");
export const isFunction = is<Function>("Function");
export const isObject = is<object>("Object");
export const isNumber = is<number>("Number");
export const { isArray } = Array;
export const isBoolean = is<boolean>("Boolean");

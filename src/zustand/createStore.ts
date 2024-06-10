import { create } from "zustand";
import { useZus } from "./useZus";
import { A } from "./types";

/**
 * 状态管理
 * @param cb zustand 回调函数
 */
export function createStore<T extends object>(cb: A<T>) {
  return useZus<T, keyof T, Pick<T, keyof T>>(create<T>(cb as any));
}

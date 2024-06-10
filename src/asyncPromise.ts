// @ts-nocheck

export class AsyncPromise<T = any, N = any> {
  loading = false

  promise: Promise<T>
  resolve: (value: T) => void
  reject: (reason?: N) => void

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}

// 缓存 promise 状态，pending 状态下，多次触发，只会执行一次
export function asyncPromise<T>(cb: (...args) => Promise<T>) {
  let asyncPromise = new AsyncPromise<T>();

  return async function (...args) {
    if (asyncPromise.loading) return asyncPromise.promise;
    asyncPromise.loading = true;
    try {
      const res = await cb(...args);
      asyncPromise.resolve(res);
      return asyncPromise.promise;
    } catch (e) {
      asyncPromise.reject(e);
      const old = asyncPromise;
      asyncPromise = new AsyncPromise();
      return old.promise;
    }
  };
}

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

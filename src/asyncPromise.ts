// @ts-nocheck

export class AsyncPromise<T = any, N = any> {
  settled = false
  promise: Promise<T>
  resolve: (value: T) => void
  reject: (reason?: N) => void

  constructor() {
    const cb = (cb: any) => {
      this.settled = true
      return cb
    }
    this.promise = new Promise((resolve, reject) => {
      this.resolve = cb(resolve)
      this.reject = cb(reject)
    })
  }
}

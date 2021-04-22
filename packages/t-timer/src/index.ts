export const Timer = (ctx: any) => {
  ctx.timeOutTimers = []
  ctx.intervalTimers = []

  ctx.setTimeout = generate(globalThis.setTimeout, (target, args) => {
    const [fn, t] = args
    const timerId = target(() => { fn(); ctx.clearTimeout(timerId) }, t)
    ctx.timeOutTimers.push(timerId)
    return timerId
  })

  ctx.setInterval = generate(globalThis.setInterval, (target, args) => {
    const [fn, t] = args
    const timerId = target(fn, t)
    ctx.intervalTimers.push(timerId)
    return timerId
  })

  ctx.clearTimeout = generate(globalThis.clearTimeout, (target, args) => {
    const [timerId] = args
    const idx = ctx.timeOutTimers.findIndex((t: any) => t === timerId)
    idx !== -1 && ctx.timeOutTimers.splice(idx, 1)
    return target(timerId)
  })

  ctx.clearInterval = generate(globalThis.clearInterval, (target, args) => {
    const [timerId] = args
    const idx = ctx.intervalTimers.findIndex((t: any) => t === timerId)
    idx !== -1 && ctx.intervalTimers.splice(idx, 1)
    return target(timerId)
  })

  return ctx
}

function generate(target: any, fn: (target: any, args: any) => any) {
  return new Proxy(target, { apply: (_, __, args) => fn(target, args) })
}

import { useEffect, useRef, useState } from 'react'
import { CountDownDateMeta, CountDown, CountDownManager } from 'count-it-down-timer'

export interface CountDownHookOpt {
  endTime: number
  onEnd(): void
  interval?: number
  server?: boolean
  manager?: CountDownManager
}

export interface UseCountDown {
  (opt: CountDownHookOpt): CountDownDateMeta
  manager?: CountDownManager
}

export const useCountDown: UseCountDown = ({ endTime, onEnd, server = false, manager, interval = 1000 }: CountDownHookOpt) => {
  const [dateMeta, setDateMeta] = useState<CountDownDateMeta>({ d: 0, h: 0, m: 0, s: 0 })
  const countDownTimer = useRef<CountDown | null>()

  function createCountDownTimer() {
    if (!countDownTimer.current) {
      countDownTimer.current = new CountDown({
        interval,
        endTime,
        onEnd,
        onStep: setDateMeta,
        manager: server ? (manager || useCountDown.manager) : undefined
      })
    }
  }

  function clearCountDownTimer() {
    countDownTimer.current?.clear()
    countDownTimer.current = null
  }

  // 处理页面或组件
  useEffect(() => {
    // 创建倒计时实例
    createCountDownTimer()
    return () => {
      clearCountDownTimer()
    }
  }, [])

  return dateMeta
}

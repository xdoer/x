import { CountDownDateMeta } from '@xdoer/countdown'
import React, { FC, memo, Fragment } from 'react'
import { useCountDown, CountDownHookOpt } from './useCountDown'

interface CountDownCompProps extends Pick<CountDownHookOpt, 'interval' | 'manager' | 'onEnd'> {
  t: string | number
  render(data: CountDownDateMeta): JSX.Element
  server?: boolean
}

export const CountDownComp: FC<CountDownCompProps> = memo(({ interval, manager, onEnd, t, render, server }) => {
  const endTime = typeof t === 'number' ? Date.now() + 1000 * t : new Date(t).getTime()
  const dateMeta = useCountDown({
    endTime,
    onEnd,
    manager,
    server,
    interval,
  })

  return <Fragment>{render(dateMeta)}</Fragment>
})

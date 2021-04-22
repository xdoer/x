import React, { FC } from 'react'
import { CountDownComp, CountDownManager, useCountDown } from '@xdoer/r-countdown'

useCountDown.manager = new CountDownManager({
  debounce: 3000,
  async getRemoteDate() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Date.now())
      }, 2000)
    })
  }
})

export const CountDown: FC<{}> = ({ }) => {

  return (
    <CountDownComp
      t={10}
      server
      interval={2000}
      onEnd={() => { console.log('倒计时结束啦') }}
      // manager={manager}
      render={(e) => {
        const { h, m, s, d } = e
        return <>{`${d}-${h}-${m}-${s}`}</>
      }}
    />
  )
}

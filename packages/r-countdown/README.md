# @xdoer/r-countdown

## usage

```tsx
import {
  CountDownComp,
  CountDownManager,
  useCountDown,
} from '@xdoer/r-countdown';

// all count down timer will use this manager instance
useCountDown.manager = new CountDownManager({
  debounce: 3000,
  async getRemoteDate() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Date.now());
      }, 2000);
    });
  },
});

export function Test() {
  return (
    <CountDownComp
      t={10}
      server // server mode
      onEnd={() => {
        console.log('end');
      }}
      // manager={customManager} // you can use custom manager
      render={(e) => {
        const { h, m, s, d } = e;
        return <>{`${d}-${h}-${m}-${s}`}</>;
      }}
    />
  );
}
```

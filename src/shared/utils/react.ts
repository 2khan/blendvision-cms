/* eslint-disable  @typescript-eslint/no-explicit-any -- We use 'any' here because react uses it under the hood */
import 'react'

// https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/69474
// FIXME: HACK! This is written due to the problem above and a different solution might be possible natively in the future
declare module 'react' {
  function lazy<T extends ComponentType<any>>(
    load: () => Promise<{ default: T }>
  ): T
}

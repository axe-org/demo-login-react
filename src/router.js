import { createMemoryHistory } from 'history'
import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge'
import { NativeModules } from 'react-native'
// 即使没有用到 react ，也要进行引用，这就是react-native NB的地方了。 实际上是因为jsx.
import React from 'react'
import Login from './Login'
import Register from './Register'

export const routes = [
  {path: '/login', component: () => <Login />},
  {path: '/register', component: () => <Register />}
]

export const history = createMemoryHistory()

// 然后在 BatchedBridge 注册一个回调，以接管返回按钮。
BatchedBridge.registerCallableModule(
  'nativeModule',
  {
    goBack: () => {
      if (history.index > 0) {
        history.goBack()
      } else {
        NativeModules.nativeModule.closePage()
      }
    }
  }
)

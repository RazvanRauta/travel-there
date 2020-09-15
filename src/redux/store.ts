import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reduxThunk from 'redux-thunk'

import { rootReducer } from './rootReducer'

let store: Store

if (process.env.NODE_ENV !== 'production') {
  store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(reduxThunk))
  )
} else {
  store = createStore(rootReducer, applyMiddleware(reduxThunk))
}

export default store

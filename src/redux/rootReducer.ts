import { combineReducers } from 'redux'

import placesReducer from './places/reducer'

export const rootReducer = combineReducers({
  places: placesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

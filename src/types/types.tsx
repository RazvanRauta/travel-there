import Place from '@/models/place'
import { ADD_PLACE, SET_PLACES } from '@/redux/places/actions'
import { RootState } from '@/redux/rootReducer'
import { StackScreenProps } from '@react-navigation/stack'
import { ThunkAction } from 'redux-thunk'

export type RootStackParamList = {
  Home: undefined
  PlacesList: undefined
  PlaceDetail: {
    placeTitle: string
    placeId: string
  }
  Map: undefined
  NewPlace: undefined
}

export type RootStackScreenProps = StackScreenProps<
  RootStackParamList,
  'Home' | 'PlacesList' | 'PlaceDetail' | 'Map' | 'NewPlace'
>

export interface PlacesState {
  places: Place[]
}

export interface ValuesForNewPlace {
  id: string
  title: string
  image: string
}

export interface AddPlaceAction {
  type: typeof ADD_PLACE
  placeData: ValuesForNewPlace
}

export type AddPlaceThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  AddPlaceAction
>

export interface SetPlacesAction {
  type: typeof SET_PLACES
  places: Place[]
}

export type SetPlacesThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  SetPlacesAction
>

export type PlacesActionsType = AddPlaceAction | SetPlacesAction

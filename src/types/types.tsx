import Place from '@/models/place'
import { ADD_PLACE } from '@/redux/places/actions'
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

export type PlacesActionsType = AddPlaceAction

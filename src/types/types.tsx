import Place from '@/models/place'
import { ADD_PLACE } from '@/redux/places/actions'
import { StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
  Home: undefined
  PlacesList: undefined
  PlaceDetail: undefined
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
}

export interface AddPlaceAction {
  type: typeof ADD_PLACE
  placeData: ValuesForNewPlace
}

export type PlacesActionsType = AddPlaceAction

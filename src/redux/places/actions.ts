import { AddPlaceAction, ValuesForNewPlace } from '@/types/types'

export const ADD_PLACE = 'ADD_PLACE'

export const addPlace = ({ title }: ValuesForNewPlace): AddPlaceAction => {
  return { type: ADD_PLACE, placeData: { title } }
}

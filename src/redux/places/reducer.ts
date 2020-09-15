import Place from '@/models/place'
import { PlacesActionsType, PlacesState } from '@/types/types'

import { ADD_PLACE } from './actions'
const initialState: PlacesState = {
  places: [],
}

export default (
  state = initialState,
  actions: PlacesActionsType
): PlacesState => {
  switch (actions.type) {
    case ADD_PLACE:
      return {
        places: state.places.concat(
          new Place(new Date().toString(), actions.placeData.title)
        ),
      }
    default:
      return state
  }
}

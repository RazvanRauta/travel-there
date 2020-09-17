import Place from '@/models/place'
import { PlacesActionsType, PlacesState } from '@/types/types'

import { ADD_PLACE, SET_PLACES } from './actions'
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
          new Place(
            actions.placeData.id,
            actions.placeData.title,
            actions.placeData.image
          )
        ),
      }
    case SET_PLACES:
      return {
        places: actions.places.map(
          (pl) => new Place(pl.id.toString(), pl.title, pl.image)
        ),
      }
    default:
      return state
  }
}

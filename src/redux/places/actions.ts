import { AddPlaceThunkAction, ValuesForNewPlace } from '@/types/types'
import * as FileSystem from 'expo-file-system'

export const ADD_PLACE = 'ADD_PLACE'

export const addPlace = ({
  title,
  image,
}: ValuesForNewPlace): AddPlaceThunkAction => async (dispatch) => {
  const fileName = image.split('/').pop()
  const newPath =
    fileName && FileSystem.documentDirectory
      ? FileSystem.documentDirectory + fileName
      : null

  if (newPath) {
    try {
      FileSystem.moveAsync({
        from: image,
        to: newPath,
      })
    } catch (E) {
      console.log(E)
      throw E
    }
  }

  dispatch({ type: ADD_PLACE, placeData: { title, image: newPath ?? '' } })
}

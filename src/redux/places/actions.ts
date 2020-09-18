import { fetchPlaces, insertPlace } from '@/helpers/db'
import {
  AddPlaceThunkAction,
  SetPlacesThunkAction,
  ValuesForNewPlace,
} from '@/types/types'
import * as FileSystem from 'expo-file-system'

type Values = Omit<ValuesForNewPlace, 'id'>

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

export const addPlace = ({
  title,
  image,
}: Values): AddPlaceThunkAction => async (dispatch) => {
  const fileName = image.split('/').pop()
  const newPath =
    fileName && FileSystem.documentDirectory
      ? FileSystem.documentDirectory + fileName
      : null

  if (newPath) {
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      })
      const dbResult = await insertPlace(
        title,
        newPath,
        'Dummy address',
        15.6,
        12.3
      )
      //@ts-expect-error
      if (typeof dbResult.message === 'undefined' && dbResult.insertId) {
        dispatch({
          type: ADD_PLACE,
          placeData: {
            //@ts-expect-error
            id: dbResult.insertId.toString(),
            title,
            image: newPath ?? '',
          },
        })
      } else {
        //@ts-expect-error
        throw new Error(dbResult.message)
      }
    } catch (E) {
      console.log(E)
      throw E
    }
  }
}

export const setPlaces = (): SetPlacesThunkAction => async (dispatch) => {
  try {
    const dbResult = await fetchPlaces()
    //@ts-expect-error
    if (typeof dbResult.message === 'undefined') {
      //@ts-ignore
      dispatch({ type: SET_PLACES, places: dbResult.rows._array })
    } else {
      //@ts-expect-error
      throw new Error(dbResult.message)
    }
  } catch (E) {
    throw E
  }
}

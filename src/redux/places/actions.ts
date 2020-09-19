import { fetchPlaces, insertPlace } from '@/helpers/db'
import {
  AddPlaceThunkAction,
  SetPlacesThunkAction,
  ValuesForNewPlace,
} from '@/types/types'
import { GOOGLE_API_KEY } from '@env'
import * as FileSystem from 'expo-file-system'

type Values = Omit<ValuesForNewPlace, 'id' | 'address'>

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

export const addPlace = ({
  title,
  image,
  location,
}: Values): AddPlaceThunkAction => async (dispatch) => {
  const latLng = location.split('|')
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
      latLng[0] ?? 40.714224
    },${latLng[1] ?? -73.961452}&key=${GOOGLE_API_KEY}`
  )

  if (!response.ok) throw new Error('Something went wrong')

  const resData = await response.json()

  if (!resData) throw new Error('Something went wrong')

  const address = resData.results[0].formatted_address

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
      const dbResult = await insertPlace(title, newPath, address, location)
      //@ts-expect-error
      if (typeof dbResult.message === 'undefined' && dbResult.insertId) {
        dispatch({
          type: ADD_PLACE,
          placeData: {
            //@ts-expect-error
            id: dbResult.insertId.toString(),
            title,
            image: newPath ?? '',
            location,
            address,
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

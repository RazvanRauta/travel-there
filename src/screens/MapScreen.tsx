import Colors from '@/constants/Colors'
import { isAndroid } from '@/constants/Platform'
import { RootStackScreenProps } from '@/types/types'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import MapView, { MapEvent, Region, Marker, LatLng } from 'react-native-maps'

const MapScreen: FunctionComponent<RootStackScreenProps> = ({
  navigation,
  route,
}) => {
  //@ts-ignore
  const initialLocation = route.params?.initialLocation ?? ''
  //@ts-ignore
  const readOnly = route.params?.readOnly ?? false
  const [selectedLocation, setSelectedLocation] = useState<LatLng | undefined>({
    latitude: initialLocation ? parseFloat(initialLocation[0]) : 37.78,
    longitude: initialLocation ? parseFloat(initialLocation[1]) : -122.43,
  })

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) return
    navigation.navigate('NewPlace', { pickedLocation: selectedLocation })
  }, [selectedLocation])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (!readOnly) {
          return (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={savePickedLocationHandler}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          )
        }
        return null
      },
    })
  }, [savePickedLocationHandler])

  const mapRegion: Region = {
    latitude: initialLocation[0] ? parseFloat(initialLocation[0]) : 37.78,
    longitude: initialLocation[1] ? parseFloat(initialLocation[1]) : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
  const setLocationHandler = (e: MapEvent) => {
    if (readOnly) return
    setSelectedLocation({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    })
  }

  let markerCoordinates

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    }
  }

  return (
    <MapView
      style={styles.container}
      region={mapRegion}
      onPress={setLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  saveButton: {
    marginHorizontal: 20,
  },
  saveText: {
    fontSize: 16,
    color: isAndroid ? 'white' : Colors.primary,
  },
})

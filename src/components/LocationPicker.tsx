import Colors from '@/constants/Colors'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { useFormikContext } from 'formik'
import React, { FunctionComponent, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native'

interface Props {
  error: string | undefined
  latValue: string
  lngValue: string
}

const LocationPicker: FunctionComponent<Props> = ({
  latValue,
  lngValue,
  error,
}) => {
  const [isFetching, setIsFetching] = useState(false)
  const { setFieldValue, setTouched } = useFormikContext()

  const verifyPermission = async (): Promise<boolean> => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app',
        [{ text: 'Okay' }]
      )
      return false
    }
    return true
  }

  const getLocationHandler = async () => {
    setIsFetching(true)
    const hasPermission = await verifyPermission()
    if (!hasPermission) return
    try {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({
        timeout: 5000,
      })
      if (latitude && longitude) {
        setFieldValue('lat', latitude)
        setFieldValue('lng', longitude)
      }
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick location on the map',
        [{ text: 'Okay' }]
      )
    }
    setIsFetching(false)
  }

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </View>
      {latValue && lngValue ? (
        <Text>{`Latitude:${latValue} Longitude: ${lngValue}`}</Text>
      ) : null}
      {error && <Text>Location Required</Text>}
      <Button
        title="Get Current Location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  )
}

export default LocationPicker

const styles = StyleSheet.create({
  locationPicker: { marginBottom: 15 },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
})

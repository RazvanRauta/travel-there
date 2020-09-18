import Colors from '@/constants/Colors'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { useFormikContext, useField } from 'formik'
import React, { FunctionComponent, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import MapPreview from './MapPreview'

interface Props {
  name: string
  type: string
  readOnly: boolean
}

const LocationPicker: FunctionComponent<Props> = (props) => {
  const [isFetching, setIsFetching] = useState(false)
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(props)

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
        setFieldValue(field.name, `${latitude}|${longitude}`)
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
  const location = meta.value ? meta.value.split('|') : ''
  const latValue = location[0] ?? ''
  const lngValue = location[1] ?? ''

  return (
    <View style={styles.locationPicker}>
      <MapPreview lat={latValue} lng={lngValue} style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={meta.touched && meta.error ? styles.error : undefined}>
            No location chosen yet!
          </Text>
        )}
      </MapPreview>
      {meta.touched && meta.error && (
        <Text style={styles.error}>{meta.error}</Text>
      )}
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
  },
  error: {
    color: 'red',
    fontSize: 15,
  },
})

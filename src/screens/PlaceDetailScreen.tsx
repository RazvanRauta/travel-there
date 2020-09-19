import MapPreview from '@/components/MapPreview'
import { RootState } from '@/redux/rootReducer'
import { RootStackScreenProps } from '@/types/types'
import React, { FunctionComponent } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useSelector } from 'react-redux'

const PlaceDetailScreen: FunctionComponent<RootStackScreenProps> = ({
  route,
  navigation,
}) => {
  //@ts-ignore
  const { placeId } = route.params
  const selectedPlace = useSelector((state: RootState) =>
    state.places.places.find((place) => place.id === placeId)
  )
  let latLng
  if (selectedPlace) {
    latLng = selectedPlace.location.split('|')
  } else {
    latLng = ''
  }

  const showMapHandler = () =>
    navigation.navigate('Map', {
      readOnly: true,
      initialLocation: selectedPlace?.location.split('|'),
    })
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={{ uri: selectedPlace?.image }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace?.address}</Text>
        </View>
        <MapPreview
          lat={latLng[0]}
          lng={latLng[1]}
          style={styles.mapPreview}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  )
}

export default PlaceDetailScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc',
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: 'center',
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
})

import PlaceItem from '@/components/PlaceItem'
import * as placesActions from '@/redux/places/actions'
import { useTypedSelector } from '@/redux/rootReducer'
import { RootStackScreenProps } from '@/types/types'
import React, { FunctionComponent, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'

const PlacesListScreen: FunctionComponent<RootStackScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch()
  const places = useTypedSelector((state) => state.places.places)

  useEffect(() => {
    dispatch(placesActions.setPlaces())
    // return () => {
    //   cleanup
    // }
  }, [dispatch])

  if (places.length === 0)
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          No places were found. Maybe start adding some!
        </Text>
      </View>
    )

  return (
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          onSelect={() =>
            navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            })
          }
          {...itemData.item}
        />
      )}
    />
  )
}

export default PlacesListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 20,
    fontFamily: 'open-sans-bold',
    maxWidth: '75%',
    textAlign: 'center',
    marginBottom: 10,
  },
})

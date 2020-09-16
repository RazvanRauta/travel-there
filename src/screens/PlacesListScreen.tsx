import PlaceItem from '@/components/PlaceItem'
import { RootState } from '@/redux/rootReducer'
import { RootStackScreenProps } from '@/types/types'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

const PlacesListScreen: FunctionComponent<RootStackScreenProps> = ({
  navigation,
}) => {
  const places = useSelector((state: RootState) => state.places.places)

  if (places.length === 0)
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          No products were found. Maybe start adding some!
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
          //@ts-ignore
          address={null}
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

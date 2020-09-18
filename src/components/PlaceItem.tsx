import Colors from '@/constants/Colors'
import React, { FunctionComponent } from 'react'
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native'

interface Props {
  onSelect: () => void
  image: string
  title: string
  address: string
  location: string
}

const PlaceItem: FunctionComponent<Props> = ({
  onSelect,
  image,
  title,
  address,
  location,
}: Props) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.address}>{location}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PlaceItem

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
  },
  address: {
    color: '#666',
    fontSize: 16,
  },
})

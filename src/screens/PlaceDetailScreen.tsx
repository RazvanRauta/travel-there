import { RootStackScreenProps } from '@/types/types'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PlaceDetailScreen: FunctionComponent<RootStackScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Place Detail Screen</Text>
    </View>
  )
}

export default PlaceDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

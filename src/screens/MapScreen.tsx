import { RootStackScreenProps } from '@/types/types'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MapScreen: FunctionComponent<RootStackScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

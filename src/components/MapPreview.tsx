import { GOOGLE_API_KEY } from '@env'
import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'

interface Props {
  lat: string
  lng: string
  style?: ViewStyle
  onPress?: () => void
}

const MapPreview: FunctionComponent<Props> = ({
  lat,
  lng,
  children,
  style,
  onPress,
}) => {
  let imagePreviewUrl
  if (lat && lng) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.mapPreview, ...style }}
    >
      {lat && lng ? (
        <Image style={styles.image} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

export default MapPreview

const styles = StyleSheet.create({
  mapPreview: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

import Colors from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { useFormikContext, useField } from 'formik'
import React, { FunctionComponent } from 'react'
import { Button, Image, StyleSheet, Text, View, Alert } from 'react-native'

interface Props {
  name: string
  type: string
  readOnly: boolean
}

const ImgPicker: FunctionComponent<Props> = (props) => {
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(props)
  const verifyPermission = async (): Promise<boolean> => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    )
    if (status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app',
        [{ text: 'Okay' }]
      )
      return false
    }
    return true
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission()
    if (!hasPermission) return
    const imageData = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    })
    if (!imageData.cancelled) {
      setFieldValue(field.name, imageData.uri)
    }
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!meta.value ? (
          <Text style={meta.touched && meta.error ? styles.error : undefined}>
            No image picked yet.
          </Text>
        ) : (
          <Image style={styles.image} source={{ uri: meta.value }} />
        )}
      </View>
      {meta.touched && meta.error && (
        <Text style={styles.error}>{meta.error}</Text>
      )}
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  )
}

export default ImgPicker

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  error: {
    color: 'red',
    fontSize: 15,
  },
})

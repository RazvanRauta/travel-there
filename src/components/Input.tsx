import React, { FunctionComponent } from 'react'
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  Text,
  View,
  TextInput,
} from 'react-native'

interface OwnProps {
  label: string
  inputStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  touched?: boolean
  error?: null | undefined | string
}

type InputType = OwnProps & TextInput['props']

const Input: FunctionComponent<InputType> = ({
  label,
  inputStyle,
  containerStyle,
  touched = false,
  error = null,
  ...rest
}) => {
  let labelStyles = styles.label
  if (touched && error) {
    labelStyles = { ...styles.label, ...styles.labelError }
  }
  return (
    <View style={containerStyle}>
      <Text style={labelStyles}>{label}</Text>
      <TextInput style={[inputStyle, styles.input]} {...rest} />
      {touched && error && <Text style={styles.errorInput}>{error}</Text>}
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 5,
  },
  input: {
    borderBottomWidth: 1,
    minHeight: 40,
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderBottomColor: '#ccc',
    marginBottom: 15,
  },
  label: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginBottom: 15,
    marginTop: 20,
  },
  labelError: {
    color: 'red',
  },
  errorInput: { color: 'red', fontSize: 15, marginBottom: 15 },
})

import HeaderButton from '@/components/HeaderButton'
import ImgPicker from '@/components/ImagePicker'
import Input from '@/components/Input'
import LocationPicker from '@/components/LocationPicker'
import { isAndroid } from '@/constants/Platform'
import * as placesActions from '@/redux/places/actions'
import { RootStackScreenProps, ValuesForNewPlace } from '@/types/types'
import { NewPlaceSchema } from '@/utils/validation'
import { Formik } from 'formik'
import React, { FunctionComponent, useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch } from 'react-redux'

type Values = Omit<ValuesForNewPlace, 'id' | 'address'>

const NewPlaceScreen: FunctionComponent<RootStackScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch()
  const savePlaceHandler = (values: Values) => {
    dispatch(placesActions.addPlace(values))
    navigation.goBack()
  }

  return (
    <ScrollView>
      <Formik
        initialValues={{ title: '', image: '', location: '' }}
        validationSchema={NewPlaceSchema}
        onSubmit={savePlaceHandler}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useLayoutEffect(() => {
            navigation.setOptions({
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Add"
                    iconName={isAndroid ? 'md-save' : 'ios-save'}
                    onPress={handleSubmit}
                  />
                </HeaderButtons>
              ),
            })
          })
          return (
            <View style={styles.form}>
              <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                label="Title"
                touched={touched.title}
                error={errors.title}
              />
              <ImgPicker name="image" type="text" readOnly />
              <LocationPicker
                name="location"
                type="text"
                readOnly
                route={route}
              />
            </View>
          )
        }}
      </Formik>
    </ScrollView>
  )
}

export default NewPlaceScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    margin: 30,
  },
  inputContainer: {},
  input: {},
})

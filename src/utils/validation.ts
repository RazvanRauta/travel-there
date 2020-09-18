import * as Yup from 'yup'

export const NewPlaceSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  image: Yup.string().min(2, 'Image is required').required('Image is required'),
  location: Yup.string()
    .min(5, 'Location is required')
    .required('Location is required'),
})

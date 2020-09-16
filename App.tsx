import 'react-native-gesture-handler'
import {
  OpenSans_400Regular,
  OpenSans_700Bold,
  useFonts,
} from '@expo-google-fonts/open-sans'
import { AppLoading } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import { init } from './src/helpers/db'
import Main from './src/navigation'
import store from './src/redux/store'

init()
  .then(() => {
    console.log('Database was initialized')
  })
  .catch((err) => {
    console.log('Database initializing failed')
    console.error(err)
  })

export default function App() {
  const [fontsLoaded] = useFonts({
    'open-sans': OpenSans_400Regular,
    'open-sans-bold': OpenSans_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Main />
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </Provider>
    )
  }
}

import HeaderButton from '@/components/HeaderButton'
import Colors from '@/constants/Colors'
import { isAndroid } from '@/constants/Platform'
import MapScreen from '@/screens/MapScreen'
import NewPlaceScreen from '@/screens/NewPlaceScreen'
import PlaceDetailScreen from '@/screens/PlaceDetailScreen'
import PlacesListScreen from '@/screens/PlacesListScreen'
import { RootStackParamList } from '@/types/types'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

const Stack = createStackNavigator<RootStackParamList>()

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: isAndroid ? Colors.primary : '',
          },
          headerTintColor: isAndroid ? 'white' : Colors.primary,
        }}
        initialRouteName="PlacesList"
      >
        <Stack.Screen
          name="Map"
          options={{
            headerTitle: 'Map',
          }}
          component={MapScreen}
        />
        <Stack.Screen
          name="NewPlace"
          options={{
            headerTitle: 'Add Place',
          }}
          component={NewPlaceScreen}
        />
        <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
        <Stack.Screen
          name="PlacesList"
          options={({ navigation }) => ({
            headerTitle: 'All Places',
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Add Place"
                  iconName={isAndroid ? 'md-add' : 'ios-add'}
                  onPress={() => navigation.navigate('NewPlace')}
                />
              </HeaderButtons>
            ),
          })}
          component={PlacesListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main

import Colors from '@/constants/Colors'
import { isAndroid } from '@/constants/Platform'
import { Ionicons } from '@expo/vector-icons'
import React, { FunctionComponent } from 'react'
import {
  HeaderButton as DefaultHeaderButton,
  HeaderButtonProps,
} from 'react-navigation-header-buttons'

const HeaderButton: FunctionComponent<HeaderButtonProps> = (props) => {
  return (
    <DefaultHeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={isAndroid ? 'white' : Colors.primary}
    />
  )
}

export default HeaderButton

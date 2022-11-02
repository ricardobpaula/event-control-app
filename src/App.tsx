import React, { Fragment } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './contexts/auth-context'
import { Routes } from './routes'
import { colors } from './styles/theme'
import { Notification } from './utils/notification'

export const App:React.FC = () => {
  return (
    <Fragment>
      <StatusBar barStyle='light-content' backgroundColor={colors.gray[500]}/>
      <Notification />
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </Fragment>
  )
}
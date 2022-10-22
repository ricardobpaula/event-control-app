import React, { Fragment } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './contexts/auth-context'
import { Routes } from './routes'
import { colors } from './styles/theme'

export const App:React.FC = () => {
  return (
    <Fragment>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar barStyle='light-content' backgroundColor={colors.gray[500]}/>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </Fragment>
  )
}
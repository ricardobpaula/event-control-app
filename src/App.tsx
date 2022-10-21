import React, { Fragment } from 'react'
import { StatusBar } from 'react-native'
import { AuthProvider } from './contexts/auth-context'
import { Routes } from './routes'

export const App:React.FC = () => {
  return (
    <Fragment>
      <AuthProvider>
        <StatusBar barStyle='light-content'/>
        <Routes />
      </AuthProvider>
    </Fragment>
  )
}
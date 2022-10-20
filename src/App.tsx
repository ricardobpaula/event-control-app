import React, { Fragment } from 'react'
import { StatusBar } from 'react-native'
import { Login } from './screens/login/login'

export const App:React.FC = () => {
  return (
    <Fragment>
      <StatusBar barStyle='light-content'/>
      <Login />
    </Fragment>
  )
}
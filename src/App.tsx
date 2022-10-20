import React, { Fragment } from 'react'
import { StatusBar } from 'react-native'
import { Routes } from './routes'

export const App:React.FC = () => {
  return (
    <Fragment>
      <StatusBar barStyle='light-content'/>
      <Routes />
    </Fragment>
  )
}
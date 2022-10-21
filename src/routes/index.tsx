import React from 'react'
import { Loading } from '../components/loading/loading'
import { useAuth } from '../hooks/useAuth'

import { AppRoutes } from './app.routes'
import { Login } from '../screens/login/login'

export const Routes:React.FC = () => {
    const { loading, signed } = useAuth()
    
    if(loading) return <Loading />

    return signed ? <AppRoutes /> : <Login />
}
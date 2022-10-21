import React from 'react'
import { Loading } from '../components/loading/loading'
import { useAuth } from '../hooks/useAuth'
import { Home } from '../screens/home/home'

import { Login } from '../screens/login/login'

export const Routes:React.FC = () => {
    const { loading, signed } = useAuth()
    
    if(loading) return <Loading />

    return signed ? <Home /> : <Login />
}
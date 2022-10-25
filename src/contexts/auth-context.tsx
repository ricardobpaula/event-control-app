import React, { createContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAuthStorage, setAuthStorage } from '../utils/storage'
import { getRealm } from '../database/realm'

interface LoginProps {
    user: User
}

interface AuthContextProps {
    loading: boolean
    signed: boolean
    user: User
    login: (props: LoginProps) => Promise<void>
    logout: () => Promise<void>
}

type AuthProviderProps = {
    children: React.ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function loadStorage () {
            const response = await getAuthStorage()
            setUser(response.user)
            setLoading(false)
        }
        loadStorage()
    },[])

    async function login (props: LoginProps):Promise<void> {
        await setAuthStorage({ user: props.user })
        setUser(props.user)
    }

    async function logout ():Promise<void> {
        await AsyncStorage.clear()
        const realm = await getRealm()
        realm.deleteAll()
        setUser(undefined)
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
  )    
}

import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Feather } from '@expo/vector-icons'

import { Home } from '../screens/home/home'
import { colors } from '../styles/theme'
import { Settings } from '../screens/settings/settings'

const { Navigator, Screen } = createBottomTabNavigator()

export const AppRoutes:React.FC = () => {
    return (
       <Navigator
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.pink[700],
            tabBarInactiveTintColor: colors.gray[100],
            tabBarStyle: {backgroundColor: colors.gray[500]}
        }}
       >
        <Screen
            name='Home'
            component={Home}
            options={{
                tabBarIcon: () => 
                    <Feather 
                        name='home'
                        color={colors.pink[700]} 
                        size={24} />,
                title: 'Início'
            }}
        />

        <Screen
            name='Settings'
            component={Settings}
            options={{
                    tabBarIcon: () => 
                        <Feather 
                            name='settings'
                            color={colors.pink[700]} 
                            size={24} />,
                    title: 'Configurações'
                }}
        />
       </Navigator>
    )
}
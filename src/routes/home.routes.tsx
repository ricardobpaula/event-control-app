import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/home/home'
import { EventList } from '../screens/event-list/event-list'
import { colors } from '../styles/theme'

const { Navigator, Screen } = createNativeStackNavigator()

export const HomeStack:React.FC = () => {
    return (
        <Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.gray[500]
                },
                headerTintColor: colors.pink[700],
                headerBackTitleVisible: false
            }}
        >
            <Screen 
                name='Home'
                component={Home}
                options={{headerShown: false}}
            />
            <Screen
                name='EventList'
                component={EventList}
                options={{title: 'Marcações'}}
            />
    </Navigator>
    )
}

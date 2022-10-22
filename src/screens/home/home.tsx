import React, { useState } from "react"

import { MarkedDates }  from 'react-native-calendars/src/types'

import { useAuth } from "../../hooks/useAuth"

import { Calendar, Content, Title } from './styles'
import { SafeAreaView } from "../../styles/global"
import { colors } from "../../styles/theme"

export const Home = () => {
    const [markedDates, setMarkedDates] = useState<MarkedDates>()
    const { user } = useAuth()
    
    const hour = new Date().getHours()
    let salute = ''

    switch (true) {
        case hour >= 0 && hour < 12:
            salute = 'Bom dia'
            break;
        case hour >= 12 && hour < 18:
            salute = 'Boa tarde'
            break;
        default:
            salute = 'Boa noite'
            break;
    }
    return (
        <SafeAreaView>
            <Content>
                <Title>{salute} {user.name}</Title>
                <Calendar
                    markedDates={{'2022-10-22': {selected: true}
                    ,'2022-10-30': {marked: true}}}
                    markingType='period'
                    pastScrollRange={12}
                    futureScrollRange={12}
                    theme={{
                        calendarBackground: colors.gray[500],
                        textSectionTitleColor: colors.gray[100],
                        todayTextColor: colors.gray[100],
                        dayTextColor: colors.gray[100],
                        selectedDotColor: '#ffffff',
                        monthTextColor: colors.pink[700],
                        selectedDayBackgroundColor: colors.blue[500]
                    }}
                />
            </Content>
        </SafeAreaView>
    )
}
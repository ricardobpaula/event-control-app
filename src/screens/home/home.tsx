import React, { useEffect, useState } from "react"

import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { MarkedDates, DateData }  from 'react-native-calendars/src/types'

import { useAuth } from "../../hooks/useAuth"

import { Calendar, Content, Title } from './styles'
import { SafeAreaView } from "../../styles/global"
import { colors } from "../../styles/theme"
import { useNavigation } from "@react-navigation/native"
import { Loading } from "../../components/loading/loading"
import { EventRepository } from "../../database/repositories/event-repository"

type HomeScreenProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>

export const Home = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [markedDates, setMarkedDates] = useState<MarkedDates>()
    const { user } = useAuth()
    const navigation = useNavigation<HomeScreenProp>()

    const handleOpenDay = (timestamp:number) => {
        navigation.navigate('EventList', {
            date: JSON.stringify(new Date(timestamp)) 
        })
    }

    const loadAllEvents = async () => {
        const realm = await EventRepository.start() 

        try {
            const events = realm.findMany('done = $0', false)
            const dates = new Set(
                events.map(
                        item => item.date
                                .toLocaleDateString('pt-BR')
                                .replaceAll('/','-')))
            
            const markedDates = {}

            dates.forEach(item => {
                markedDates[item] = { marked: true }
                console.log(markedDates[item])
            })
            
            setMarkedDates({markedDates})
            
        } catch (error) {
            console.log(error)
        } finally {
            realm.close()
            setLoading(false)
        }

    }
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

    useEffect(() => {
        loadAllEvents()
    }, [])

    if (loading) return <Loading />

    return (
        <SafeAreaView>
            <Content>
                <Title>{salute} {user.name}</Title>
                <Calendar
                    markedDates={{'2022-10-30': {marked: true}}}
                    markingType='dot'
                    pastScrollRange={6}
                    futureScrollRange={6}
                    onDayPress={value => handleOpenDay(value.timestamp)}
                    theme={{
                        calendarBackground: colors.gray[500],
                        textSectionTitleColor: colors.gray[100],
                        todayTextColor: colors.blue[500],
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
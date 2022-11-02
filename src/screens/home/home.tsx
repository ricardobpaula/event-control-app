import React, { useEffect, useState } from "react"

import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { useAuth } from "../../hooks/useAuth"

import { Calendar, Content, Header, Title } from './styles'
import { SafeAreaView } from "../../styles/global"
import { colors } from "../../styles/theme"
import { useNavigation } from "@react-navigation/native"
import { Loading } from "../../components/loading/loading"
import { EventRepository } from "../../database/repositories/event-repository"
import { IconButton } from "../../components/icon-button/icon-button"
import { parseToGMT3 } from "../../utils/date-util"

type HomeScreenProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>

export const Home = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [markedDates, setMarkedDates] = useState<any>()
    const { user } = useAuth()
    const navigation = useNavigation<HomeScreenProp>()

    const handleOpenDay = (timestamp:number) => {
        navigation.navigate('EventList', { 
            timestamp: timestamp
        })
    }

    const refreshAllEvents = async () => {
        setRefreshing(true)
        loadAllEvents()
    }
    
    const loadAllEvents = async () => {
        const realm = await EventRepository.start() 
        
        try {
            const events = realm.findMany('done = $0', false)
            const dates = new Set(
                events.map(
                        item => item.date
                                .toISOString()
                                .slice(0, 10)))
            
            const markedDates = {}

            dates.forEach(item => {
                markedDates[item] = { marked: true }
            })

            setMarkedDates(markedDates)
            
        } catch (error) {
            console.log(error)
        } finally {
            realm.close()
            setLoading(false)
            setRefreshing(false)
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
                <Header>
                    <Title>{salute} {user.name}</Title>
                    <IconButton 
                        icon='refresh-ccw'
                        onPress={refreshAllEvents}
                        disabled={refreshing}
                        size={24}
                        color={colors.pink[700]}
                    />
                </Header>
                
                <Calendar
                    markedDates={markedDates}
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
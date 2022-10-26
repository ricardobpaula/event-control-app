import React, { useEffect, useRef, useState } from 'react'

import { SafeAreaView } from '../../styles/global'

import { Content, EmptyText, Event, EventName, LeftContent, RightContent } from './styles'

import EventForm, { EventFormHandles } from '../../components/event-form/event-form'
import { Button } from '../../components/button/button'
import { Alert, FlatList } from 'react-native'
import { IconButton } from '../../components/icon-button/icon-button'
import { colors } from '../../styles/theme'
import { RouteProp, NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import { EventRepository } from '../../database/repositories/event-repository'

type EventListRouteProp = RouteProp<HomeStackParamList, 'EventList'>
type EventListStackProp = NavigationProp<HomeStackParamList, 'EventList'>

export const EventList:React.FC = () => {
    const modalRef = useRef<EventFormHandles>()
    const [events, setEvents] = useState<EventEntity[]>([])
    const route = useRoute<EventListRouteProp>()
    const navigate = useNavigation<EventListStackProp>()

    const date = new Date(JSON.parse(route.params.date))

    navigate.setOptions({
        title: date.toLocaleString('pt-BR', {
            dateStyle: 'medium'
        })
    })

    const handleNewEvent = () => {
        modalRef.current?.openModal()
    }

    const handleEditEvent = (event: EventEntity) => {
        modalRef.current?.openModal(event)
    }

    const handleDoneEvent = async (event: EventEntity) => {
        const realm = await EventRepository.start()
        try {
            const date = event.frequency 
                ? new Date(event.date.setDate(event.date.getDate() + event.frequency))
                : event.date

            const done = !event.frequency

            realm.update({...event, date, done})
        } catch (error) {
            console.log(error)
        } finally {
            realm.close()
            loadEvents()
        }
    }

    const handleDeleteEvent = (event: EventEntity) => {
        Alert.alert(
            'Remover marcação',
            `Tem certeza que deseja remover ${event.name}?`,
            [
                {text: 'Sim', onPress: () => deleteEvent(event.id), style: 'destructive'},
                {text: 'Não', style: 'cancel'},
            ],
            {cancelable: true}
        )
    }

    const deleteEvent = async (id: string) => {
        const realm = await EventRepository.start()
        try {
            realm.delete(id)
        } catch (error) {
            console.log(error)
        } finally {
            realm.close()
            loadEvents()
        }
    }

    const loadEvents = async () => {
        const realm = await EventRepository.start()

        try {
            const events = realm.findMany("date = $0 && done = $1", date, false)
            setEvents(events)
        } catch (error) {
            console.log(error)
        } finally {
            realm.close()
        }
    }
    useEffect(() => {
        loadEvents()
        
    },[])

    return (
        <SafeAreaView>
            <Content>
                <FlatList
                    data={events}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <Event>
                            <LeftContent>
                            <IconButton 
                                icon='check'
                                color={colors.pink[700]}
                                onPress={() => handleDoneEvent(item)}
                                size={20}
                                border={colors.gray[500]}
                            />
                                <EventName numberOfLines={1}>{item.name}</EventName>
                            </LeftContent>
                            <RightContent>
                                <IconButton
                                    icon='edit'
                                    size={24}
                                    color={colors.pink[700]}
                                    border={colors.gray[500]}
                                    onPress={() => handleEditEvent(item)}
                                />
                                <IconButton 
                                    icon='x'
                                    size={24}
                                    color={colors.red[300]}
                                    border={colors.gray[500]}
                                    onPress={() => handleDeleteEvent(item)}
                                />
                            </RightContent>
                        </Event>
                    )}
                    ListEmptyComponent={
                        <EmptyText>Nenhuma marcação para esse dia</EmptyText>
                    }
                />
                <Button title='Nova marcação' onPress={handleNewEvent}/>
                <EventForm
                    onHandleSubmit={loadEvents}
                    ref={modalRef}
                    date={date}
                />
            </Content>
        </SafeAreaView>
    )
}
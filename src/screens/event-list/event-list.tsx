import React, { useEffect, useRef, useState } from 'react'

import { SafeAreaView } from '../../styles/global'

import { ButtonContainer, Content, EmptyText, Event, EventName } from './styles'

import EventForm, { EventFormHandles } from '../../components/event-form/event-form'
import { Button } from '../../components/button/button'
import { Alert, FlatList } from 'react-native'
import { IconButton } from '../../components/icon-button/icon-button'
import { colors } from '../../styles/theme'
import { RouteProp, useRoute } from '@react-navigation/native'
import { getRealm } from '../../database/realm'
import { EventRepository } from '../../database/repositories/event-repository'

type EventListRouteProp = RouteProp<HomeStackParamList, 'EventList'>

export const EventList:React.FC = () => {
    const modalRef = useRef<EventFormHandles>()
    const [events, setEvents] = useState<EventEntity[]>([])
    const route = useRoute<EventListRouteProp>()
    
    const date = JSON.parse(route.params.date)

    const handleNewEvent = () => {
        modalRef.current?.openModal()
    }

    const handleEditEvent = (event: EventEntity) => {
        modalRef.current?.openModal(event)
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
        const realm = await getRealm()

        try {
            const data = realm.objects('Event').toJSON()
            const events = data.map<EventEntity>(item => {
                return {
                    id: item._id,
                    name: item.name,
                    date: item.date,
                    frequency: item.frequency
                }
            })
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
                            <EventName>{item.name}</EventName>
                            <ButtonContainer>
                                <IconButton 
                                    icon='edit'
                                    color={colors.pink[700]}
                                    onPress={() => handleEditEvent(item)}
                                />
                                <IconButton 
                                    icon='x'
                                    color={colors.red[300]}
                                    onPress={() => handleDeleteEvent(item)}
                                />
                            </ButtonContainer>
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
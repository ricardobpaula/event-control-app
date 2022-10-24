import React, { useEffect, useRef, useState } from 'react'

import { SafeAreaView } from '../../styles/global'

import { ButtonContainer, Content, EmptyText, Event, EventName } from './styles'

import EventForm, { EventFormHandles } from '../../components/event-form/event-form'
import { Button } from '../../components/button/button'
import { Alert, FlatList } from 'react-native'
import { IconButton } from '../../components/icon-button/icon-button'
import { colors } from '../../styles/theme'
import { RouteProp, useRoute } from '@react-navigation/native'

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
                {text: 'Sim', onPress: () => console.log('Yes'), style: 'destructive'},
                {text: 'Não', style: 'cancel'},
            ],
            {cancelable: true}
        )
    }

    useEffect(() => {
        const newEvents = [{
                id: 'fake-id-1',
                date: new Date(),
                name: 'Evento 1'
            },
            {
                id: 'fake-id-2',
                date: new Date(),
                name: 'Evento 2'
            },
            {
                id: 'fake-id-3',
                date: new Date(),
                name: 'Evento 3'
            }]
        setEvents(newEvents)
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
                    onHandleSubmit={() => console.log('submit')}
                    ref={modalRef}
                    date={date}
                />
            </Content>
        </SafeAreaView>
    )
}
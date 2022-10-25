import React, { 
    forwardRef, 
    useImperativeHandle,
    useState 
} from 'react'

import { 
    Animated,
    KeyboardAvoidingView,
    Modal,
    ModalProps,
    Platform
} from 'react-native'

import { 
    Container,
    DismissArea,
    Form,
    Title
} from './styles'

import { Button } from '../button/button'
import { Input } from '../input/input'
import { NumberSelector } from '../number-selector/number-selector'
import { EventRepository } from '../../database/repositories/event-repository'

export interface EventFormHandles {
    openModal: (event?: EventEntity) => void
}

type EventFormProps = ModalProps &  {
    onHandleSubmit: () => void
    date: Date
}

const EventForm:React.ForwardRefRenderFunction<EventFormHandles, EventFormProps> = 
    ({ onHandleSubmit, date, ...rest }, ref) => {
    const [animatedHeight] = useState(new Animated.Value(0))
    
    const [visible, setVisible] = useState<boolean>(false)
    const [id, setId] = useState<string>()
    const [name, setName] = useState<string>()
    const [frequency, setFrequency] = useState<number>(0)

    const handleSubmit = async () => {
        const realm = await EventRepository.start()

        const event = {
            id,
            date,
            name,
            frequency
        } as EventEntity

        try {
            event.id ? realm.update(event) : realm.create(event)
        } catch (error) {
            console.log(error)
        }finally {
            realm.close()
            setName('')
            setFrequency(0)
            setId(undefined)
            setVisible(false)
            onHandleSubmit()
        }
    }

    const onOpenAnimate = Animated.timing(animatedHeight, {
    useNativeDriver: false,
    toValue: 0,
    duration: 250
    })

    const onCloseAnimate = Animated.timing(animatedHeight, {
    useNativeDriver: false,
    toValue: 0,
    duration: 250
    })

    const openModal = (event?: EventEntity) => {
        if (event) {
            setId(event.id)
            setName(event.name)
            setFrequency(event.frequency || 0)
        }
        setVisible(true)
        onOpenAnimate.start()
    }

    const close = () => {
        onCloseAnimate.start(() => setVisible(false))
    }

    useImperativeHandle(ref, () => {
        return {
            openModal
        }
        })

    return (
        <Modal
            animationType='fade'
            visible={visible}
            transparent
            {...rest}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex: 1}}
            >
                <DismissArea
                onPress={close}
                />

                <Container>
                    <Title>Nova marcação</Title>
                    <Form>
                    <Input 
                            label='Descrição'
                            value={name}
                            onChangeText={(value) => setName(value)}
                        />
                        <NumberSelector
                            title='Frequência'
                            onChangeValue={(value) => setFrequency(value)}
                            value={frequency}
                        />
                        
                </Form>
                <Button title='Salvar' onPress={handleSubmit} />
            </Container>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default forwardRef(EventForm)
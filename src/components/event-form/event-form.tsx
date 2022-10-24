import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Alert, Animated, KeyboardAvoidingView, Modal, ModalProps, Platform } from 'react-native'
import { Button } from '../button/button'
import { CheckBox } from '../checkbox/checkbox'
import { Input } from '../input/input'
import { NumberSelector } from '../number-selector/number-selector'
import { 
    Container,
    DismissArea,
    Form,
    Title
} from './styles'

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
    const [description, setDescription] = useState<string>()
    const [frequency, setFrequency] = useState<number>(0)

    const handleSubmit = async () => {
        console.log('submit')
        setVisible(false)
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
            setDescription(event.name)
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
                            value={description}
                            onChangeText={(value) => setDescription(value)}
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
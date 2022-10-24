import React, { useState } from 'react'

import {
    Button,
    Container,
    Content,
    Number,
    Title
} from './styles'

import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '../../styles/theme'

type NumberSelectorProps = {
    title: string
    value: number
    disabled?: boolean
    onChangeValue: (value: number) => void
}

export const NumberSelector:React.FC<NumberSelectorProps> = ({
    title,
    value,
    onChangeValue,
    disabled = false
}) => {
    const [number, setNumber] = useState<number>(value)
    const onChangeNumber = (sum: boolean) => {
        let newNumber = number
        if (number > 0 && !sum){
            newNumber -= 1
        }

        if (sum) {
            newNumber += 1
        }
        setNumber(newNumber)
        onChangeValue(newNumber)
    }

    return (
        <Container>
            <Title>{title}</Title>
            <Content>
                <Button
                    disabled={disabled} 
                    activeOpacity={0.7}
                    onPress={() => onChangeNumber(false)}
                >
                    <MaterialIcons 
                        size={25}
                        name='remove'
                        color={colors.pink[700]}
                    />
                </Button>
                <Number>{number}</Number>
                <Button
                    disabled={disabled}
                    activeOpacity={0.7}
                    onPress={() => onChangeNumber(true)}
                >
                    <MaterialIcons 
                        size={25}
                        name='add'
                        color={colors.pink[700]}
                    />
                </Button>

            </Content>

        </Container>
    )
}
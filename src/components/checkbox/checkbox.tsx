import React, { useState } from 'react'

import {
    TouchableOpacityProps    
} from 'react-native'

import { Container } from './styles'

import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '../../styles/theme'

type CheckBoxProps = TouchableOpacityProps & {
    value: boolean
    size: number
    onChangeValue: (value: boolean) => void
}

export const CheckBox:React.FC<CheckBoxProps> = (
    {value, size, onChangeValue, ...rest}) => {
    const [checked, setChecked] = useState<boolean>(value)
    
    const onSetValue = () => {
        const newValue = !checked
        setChecked(newValue)
        onChangeValue(newValue)
    }

    return (
        <Container
            {...rest}    
            activeOpacity={0.7}
            onPress={onSetValue}
            size={size}
        >
            {checked &&
                <MaterialIcons
                    name='check'
                    size={size / 2}
                    color={colors.pink[700]}
                />
            }
        </Container>
    )
}
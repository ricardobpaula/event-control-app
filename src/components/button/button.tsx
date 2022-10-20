import React, { useState } from 'react'

import { ActivityIndicator, TouchableOpacityProps } from 'react-native'
import { colors } from '../../styles/theme'

import {
    Container,
    Title
} from './styles'

type ButtonProps = TouchableOpacityProps & {
    title: string
    isLoading?: boolean
    onPress?: () => void
}
export const Button:React.FC<ButtonProps> = ({
    title, 
    isLoading = false,
    ...rest}) => {
    return (
        <Container
            {...rest}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            {isLoading 
                ?
                    <ActivityIndicator size="small" color={colors.gray[500]} />
                :
                    <Title>{title}</Title>
            }
        </Container>
    )
}
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { colors } from '../../styles/theme'
import { Container } from './styles'

export const Loading:React.FC = () => {
    return (
        <Container>
            <ActivityIndicator size="large" color={colors.pink[700]} />
        </Container>
        
    )
}
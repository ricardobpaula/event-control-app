import {
    TouchableOpacity
} from 'react-native'

import styled from 'styled-components/native'

interface ContainerProps {
    border: string
    size: number
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
    padding: 10px;
    margin: 5px 5px;
    align-items: center;
    justify-content: center;
    border-radius: ${props => props.size}px;
    background-color: ${props => props.border};
`
import {
    TouchableOpacity
} from 'react-native'

import styled from 'styled-components/native'
import { colors } from '../../styles/theme'

interface ContainerProps {
    size: number
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
    background-color: ${colors.gray[500]};
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
`
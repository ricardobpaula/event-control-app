import {
    TouchableOpacity,
    Text
} from 'react-native'

import styled from 'styled-components/native'
import { colors } from '../../styles/theme'

export const Container = styled(TouchableOpacity)`
    width: 100%;
    margin: 20px 0px;
    background-color: ${colors.pink[700]};
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
`

export const Title = styled(Text)`
    font-size: 16px;
    color: ${colors.white};
`
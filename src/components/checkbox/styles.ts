import {
    TouchableOpacity
} from 'react-native'

import styled from 'styled-components/native'
import { colors } from '../../styles/theme'

export const Container = styled(TouchableOpacity)`
    background-color: ${colors.gray[500]};
    height: 40px;
    width: 40px;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
`
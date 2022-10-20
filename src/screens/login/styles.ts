import {
 View,
 Text
} from 'react-native'

import styled from 'styled-components/native'
import { colors } from '../../styles/theme'

export const Container = styled(View)`
    flex:1;
    background-color: ${colors.gray[500]};
`
export const Content = styled(View)`
    flex: 1;
    padding: 0px 20px;
    justify-content: center;
    align-items: center;
`

export const Title = styled(Text)`
    font-size: 26px;
    font-weight: bold;
    color: ${colors.pink[700]}
`
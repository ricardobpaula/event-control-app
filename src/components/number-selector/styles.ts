import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'

import styled from 'styled-components/native'
import { colors } from '../../styles/theme'

export const Container = styled(View)`
    width: 100%;
    padding: 20px 0px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const Title = styled(Text)`
    color: ${colors.pink[700]};
    font-size: 16px;
`
export const Number = styled(Text)`
    color: ${colors.pink[700]};
    font-size: 16px;
    padding-left: 10px;
    padding-right: 10px;
`

export const Content = styled(View)`
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

export const Button = styled(TouchableOpacity)`
    background-color: ${colors.gray[500]};
    height: 40px;
    width: 40px;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
`
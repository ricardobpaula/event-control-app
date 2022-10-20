import {
    View,
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native'

import styled from 'styled-components/native'
import { colors } from '../../styles/theme'

interface InputTextProps {
    paddingX: number
}

export const Container = styled(View)`
    width: 100%;
    margin: 20px 0px;
`

export const Content = styled(View)`
    width: 100%;
    flex-direction: row;
    align-items: center;
`

export const InputText = styled(TextInput)<InputTextProps>`
    height: 40px;
    width: 100%;
    font-size: 14px;
    border-radius: 10px;
    background-color: ${colors.gray[700]};
    padding: 0px ${props => props.paddingX}px;
    color: ${colors.gray[200]};
`

export const Label = styled(Text)`
    padding-left: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    color: ${colors.gray[200]};
`

export const Error = styled(Text)`
    padding-left: 10px;
    padding-top: 10px;
    font-size: 12px;
    color: ${colors.red[300]};
`

export const LeftIcon = styled(View)`
    position: absolute;
    left: 10px;
`

export const RightIcon = styled(TouchableOpacity)`
    position: absolute;
    right: 10px;
`

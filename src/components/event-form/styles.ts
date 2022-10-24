import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

import styled from 'styled-components/native'

import { colors } from '../../styles/theme'

export const Container = styled(View)`
    background-color: ${colors.gray[600]};
    align-items: center;
    padding: 20px 40px;
    justify-content: flex-end;
    margin-bottom: 20px;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
`

export const Title = styled(Text)`
    font-size: 16px;
    font-weight: bold;
    color: ${colors.pink[700]};
    margin-bottom: 20px;
`

export const Label = styled(Text)`
    font-size: 16px;
    color: ${colors.pink[700]};
`

export const Row =styled(View)`
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`

export const Form = styled(View)`
    width: 100%;
    margin-bottom: 20px;
`

export const DismissArea = styled(TouchableOpacity)`
    flex: 1;
`
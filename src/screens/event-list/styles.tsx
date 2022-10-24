import { 
    View,
    Text
 } from 'react-native'

import styled from 'styled-components/native'
import { colors } from '../../styles/theme'

export const Content = styled(View)`
    flex: 1;
    padding: 0px 20px;
    justify-content: space-between;
`

export const EmptyText = styled(Text)`
    font-size: 16px;
    margin: 20px 0px;
    font-weight: bold;
    text-align: center;
    color: ${colors.pink[700]};
`

export const Event = styled(View)`
    width: 100%;
    padding: 0px 10px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 20px;
    background-color: ${colors.gray[600]};
`

export const EventName = styled(Text)`
    font-size: 16px;
    color: ${colors.pink[700]};
`

export const ButtonContainer = styled(View)`
    flex-direction: row;
    align-items: center;
`
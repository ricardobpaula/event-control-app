import {
    SafeAreaView as RNSafeAreaView,
    StatusBar,
    Platform
} from 'react-native'

import styled from 'styled-components/native'
import { colors } from './theme'

const paddingTop = StatusBar.currentHeight ? StatusBar.currentHeight : 20

export const SafeAreaView = styled(RNSafeAreaView)`
    flex: 1;
    padding-top: ${Platform.OS === 'android' ? paddingTop : 0};
    background-color: ${colors.gray[500]};
`
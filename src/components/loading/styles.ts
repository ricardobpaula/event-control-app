import {
    View
} from 'react-native'

import styled from 'styled-components/native'
import { colors } from '../../styles/theme'

export const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${colors.gray[500]};
`
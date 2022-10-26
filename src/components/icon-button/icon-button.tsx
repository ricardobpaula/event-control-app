import {
    TouchableOpacityProps
} from 'react-native'

import { Feather } from '@expo/vector-icons'

import {
    Container
} from './styles'

type IconButtonProps = TouchableOpacityProps & {
    icon: React.ComponentProps<typeof Feather>['name']
    size: number
    color?: string
    border?: string
}

export const IconButton:React.FC<IconButtonProps> = ({
    color, icon, size, border, ...rest }) => {
    return (
        <Container
            border={border}
            size={size}
            activeOpacity={0.7}
            {...rest}
        >
            <Feather size={size} name={icon} color={color}/>
        </Container>
    )
}
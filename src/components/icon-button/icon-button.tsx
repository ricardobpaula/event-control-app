import {
    TouchableOpacityProps
} from 'react-native'

import { Feather } from '@expo/vector-icons'

import {
    Container
} from './styles'

type IconButtonProps = TouchableOpacityProps & {
    icon: React.ComponentProps<typeof Feather>['name']
    color?: string
}

export const IconButton:React.FC<IconButtonProps> = ({
    color, icon, ...rest }) => {
    return (
        <Container
            activeOpacity={0.7}
            {...rest}
        >
            <Feather size={24} name={icon} color={color}/>
        </Container>
    )
}
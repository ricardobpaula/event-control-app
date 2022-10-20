import React, { useState } from 'react'

import { Feather } from '@expo/vector-icons'

import { TextInputProps } from 'react-native'
import { colors } from '../../styles/theme'

import {
    Container,
    Content,
    Error,
    InputText,
    Label,
    LeftIcon,
    RightIcon
} from './styles'

type InputProps = TextInputProps & {
    label?: string
    error?: any
    icon?: React.ComponentProps<typeof Feather>['name']
}

export const Input:React.FC<InputProps> = ({
    label, icon, error, ...rest
}) => {
    const [hide, setHide] = useState<boolean>(rest.secureTextEntry)
    
    return (
        <Container>
            <Label>{label}</Label>
            <Content>
                <InputText
                    {...rest}
                    placeholderTextColor={colors.gray[300]}
                    secureTextEntry={hide}
                    paddingX={icon ? 40 : 20}
                />
                {   icon &&
                    <LeftIcon>
                        <Feather
                            size={18}
                            color={colors.gray[200]}
                            name={icon}
                        />
                    </LeftIcon>
                }
                {
                    rest.secureTextEntry &&
                        <RightIcon
                            activeOpacity={0.7}
                            onPress={() => setHide(value => !value)}
                        >
                            <Feather
                                size={18}
                                color={colors.gray[100]}
                                name={hide ? 'eye-off' : 'eye'}
                            />
                        </RightIcon>
                }
            </Content>
            {
                error &&
                    <Error>{error.message}</Error>
            }
        </Container>
    )
}
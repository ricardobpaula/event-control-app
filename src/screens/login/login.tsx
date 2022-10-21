import React, { useState } from 'react'

import {
    KeyboardAvoidingView
} from 'react-native'
import { Button } from '../../components/button/button'
import { Input } from '../../components/input/input'
import { useAuth } from '../../hooks/useAuth'

import {
    Container,
    Content,
    Title
} from './styles'

export const Login = () => {
    const [name, setName] = useState<string>()
    const [error, setError] = useState<Error>()

    const { login } = useAuth()
    
    const handleSubmit = async () => {
        if (!name) return setError(new Error('Nome não informado.'))
        await login({user : { name }})
    }

    return (
        <Container>
            <Content>
                <Title>Olá =)</Title>
                <Input
                    label='Nome'
                    placeholder='Ex: John doe'
                    value={name}
                    onChangeText={text => setName(text)}
                    error={error}
                />
                <Button title='Entrar' onPress={handleSubmit}/>
            </Content>
        </Container>
    )
}
import React, { useState } from 'react'

import {
    KeyboardAvoidingView
} from 'react-native'
import { Button } from '../../components/button/button'
import { Input } from '../../components/input/input'

import {
    Container,
    Content,
    Title
} from './styles'

export const Login = () => {
    const [name, setName] = useState<string>()
    const [error, setError] = useState<Error>()
    
    const handleSubmit = () => {
        if (!name) return setError(new Error('Nome não informado.'))

        setName('')
        setError(null)
    }

    return (
        <Container>
            <Content>
                <Title>Sejá bem vindo =)</Title>
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
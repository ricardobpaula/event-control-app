import React from "react"
import { Button } from "../../components/button/button"
import { useAuth } from "../../hooks/useAuth"

import { Container, Content, Title } from './styles'

export const Home = () => {
    const { logout, user } = useAuth()
    return (
        <Container>
            <Content>
                <Title>Olá {user.name}</Title>
                <Button title='Logout' onPress={logout} />
            </Content>
        </Container>
    )
}
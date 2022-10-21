import React from "react"
import { useAuth } from "../../hooks/useAuth"

import { Container, Content, Title } from './styles'

export const Home = () => {
    const { user } = useAuth()
    return (
        <Container>
            <Content>
                <Title>Boa tarde {user.name}</Title>
            </Content>
        </Container>
    )
}
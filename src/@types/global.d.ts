export declare global {
    interface User {
        name: string
    }

    interface EventEntity {
        id: string
        date: Date
        name: string
        frequency?: number
        createdAt?: Date
        updatedAt?: Date
    }

    type HomeStackParamList = {
        Home: undefined
        EventList: {
            date: string
        }
      }
}
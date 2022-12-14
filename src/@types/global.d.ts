export declare global {
    interface User {
        name: string
    }

    interface EventEntity {
        id: string
        date: Date
        name: string
        done: booelan
        notification: string
        frequency?: number
        createdAt?: Date
        updatedAt?: Date
    }

    type HomeStackParamList = {
        Home: undefined
        EventList: {
            timestamp: number
        }
      }
}
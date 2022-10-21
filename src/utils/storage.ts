import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthStorageProps {
    user: User
}

export async function getAuthStorage():Promise<AuthStorageProps> {
    const response = await AsyncStorage.getItem('@EventControlApp:user')
    const user = JSON.parse(response) as User
    return { user }
}

export async function setAuthStorage({user}: AuthStorageProps):Promise<void> {
    await AsyncStorage.setItem('@EventControlApp:user', JSON.stringify(user))
}

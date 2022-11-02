import * as Notifications from 'expo-notifications'
import { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'

interface NotificationProps {
  date: Date
  title: string
  body: string
}

export const Notification = () => {
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState<Notifications.Notification>(null)
  const notificationListener = useRef<any>()
  const responseListener = useRef<any>()

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token))
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return null
}

export async function schedulePushNotification ({
  title, body, date }: NotificationProps): Promise<string> {
  return await Notifications.scheduleNotificationAsync({
      content: {
          title,
          body,
          data: { data: 'goes here' },
      },
      trigger: { 
          date
      },
      })
}
export async function removeSchedulePushNotification(id: string) {
  return await Notifications.cancelScheduledNotificationAsync(id)
}
  
export async function clearAllNotifications () {
  return await Notifications.cancelAllScheduledNotificationsAsync()
}

async function registerForPushNotificationsAsync () {
  let token: string
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!')
    return
  }
  token = (await Notifications.getExpoPushTokenAsync()).data

  return token
}
import {
  store,
  ReactNotificationOptions as IReactNotificationOptions,
} from 'react-notifications-component'
import { baseNotif } from './baseNotif'

type TTypes = 'success' | 'danger' | 'warning' | 'default' | 'info'

const addNotif = (
  props: Partial<IReactNotificationOptions>,
  type: TTypes
): void => {
  // @ts-ignore
  store.addNotification({
    ...baseNotif,
    type,

    ...props,
  })
}

export const addDangerNotif = (
  props: Partial<IReactNotificationOptions>
): void => {
  addNotif(props, 'danger')
}

export const addInfoNotif = (
  props: Partial<IReactNotificationOptions>
): void => {
  addNotif(props, 'info')
}

export const addSuccessNotif = (
  props: Partial<IReactNotificationOptions>
): void => {
  addNotif(props, 'success')
}

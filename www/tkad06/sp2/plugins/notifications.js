import * as notificationsStore from '~/store/notifications'
import notificationsApi from '~/lib/notificationsApi'

export default ({ isClient, store }, inject) => {
  const opts = {}
  if (isClient) {
    opts.preserveState = true
  }
  store.registerModule('notifications', notificationsStore, opts)

  inject('notify', notificationsApi(store))
}

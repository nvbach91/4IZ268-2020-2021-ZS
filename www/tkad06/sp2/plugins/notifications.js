import notificationsApi from '~/lib/notificationsApi'

export default ({ store }, inject) => {
  inject('notify', notificationsApi(store))
}

export default ($store) => ({
  // add success notification
  success(title, text) {
    $store.dispatch('notifications/createNotification', {
      title,
      text,
      type: 'success',
    })
  },
  close(id) {
    $store.commit('notifications/remove', id)
  },
})

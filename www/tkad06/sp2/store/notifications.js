const crypto = require('crypto')

export const state = () => {
  return {
    notifications: [],
  }
}

export const mutations = {
  add(state, notification) {
    state.notifications.push(notification)
  },
  remove(state, notificationId) {
    state.notifications = [...state.notifications].filter(
      (n) => n.id !== notificationId
    )
  },
}

export const actions = {
  createNotification({ state, commit }, notification) {
    const id = crypto
      .createHash('md5')
      .update(JSON.stringify(notification))
      .digest('hex')

    // keep notifications unique
    if (state.notifications.find((n) => n.id === id)) return

    const notificationWithId = {
      id,
      ...notification,
    }
    commit('add', notificationWithId)

    setTimeout(() => {
      commit('remove', notificationWithId.id)
    }, 7000)
  },
}

export const getters = {
  notifications(state) {
    return state.notifications
  },
}

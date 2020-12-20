export const state = () => {
  return {
    audioPlay: false,
    cavnasInitialized: false,
  }
}

export const mutations = {
  canvasInit(state) {
    state.cavnasInitialized = true
  },
  audioPlayPause(state) {
    state.audioPlay = !state.audioPlay
  },
}

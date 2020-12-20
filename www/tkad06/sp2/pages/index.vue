<template>
  <div class="flex flex-col text-gray-800 px-4 py-8">
    <div
      v-show="!visualizerInitialized"
      class="flex max-w-screen-md py-32 justify-center mx-auto"
    >
      <button
        class="flex items-center space-x-2 hover:text-red-400 focus:outline-none transition-colors duration-150 ease-in-out"
        type="button"
        @click="initVisualizer"
      >
        <span class="text-xl">Let's begin</span>
        <Icon class="w-6 h-6" name="arrow-circle" />
      </button>
    </div>
    <div
      v-show="visualizerInitialized"
      class="w-full flex flex-col sm:flex-row justify-between text-center"
    >
      <div class="w-full sm:w-1/4 p-4">
        <LeftMenuBar @exportVideo="exportVideo" @togglePlay="playPauseAudio" />
      </div>
      <div class="resize-x w-full sm:w-1/4 max-h-screen">
        <InstaStorieContainer class="h-full w-full">
          <Visualizer ref="visualizer" class="w-full h-full mx-auto" />
        </InstaStorieContainer>
      </div>
      <div class="w-full sm:w-1/4">Right menu here</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    playPauseAudio() {
      this.$store.commit('audioPlayPause')
    },
    initVisualizer() {
      this.$refs.visualizer.init()
    },
    exportVideo() {
      this.$refs.visualizer.exportVideo()
    },
  },
  computed: {
    visualizerInitialized() {
      return this.$store.state.cavnasInitialized
    },
    isAudioPlaying() {
      return this.$store.state.audioPlay
    },
  },
}
</script>

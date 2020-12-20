<template>
  <div class="w-full flex flex-col items-center space-y-2 sm:space-y-4">
    <Button @click="$emit('togglePlay')">
      <span>{{ isAudioPlaying ? 'Stop' : 'Play' }}</span>
      <Icon class="w-6 h-6" :name="isAudioPlaying ? 'stop' : 'play'" />
    </Button>
    <Button
      class="opacity-50 pointer-events-none"
      @click="$emit('exportVideo')"
      title="Coming soon"
    >
      <span>Export video</span>
      <Icon class="w-6 h-6" name="download" />
    </Button>
  </div>
</template>

<script>
export default {
  computed: {
    isAudioPlaying() {
      return this.$store.state.audioPlay
    },
  },
}
</script>

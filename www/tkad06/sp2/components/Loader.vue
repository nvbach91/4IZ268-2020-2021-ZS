<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="loading"
      class="fixed bottom-0 right-0 m-6 sm:m-8 rounded-md px-3 py-2 text-white text-xs sm:text-sm bg-primary flex items-center space-x-3 z-10"
    >
      <Icon class="animate-spin w-5 h-5 sm:w-6 sm:h-6" name="circleLoad" />
      <span>Loading</span>
    </div>
  </transition>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    progress: 0,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

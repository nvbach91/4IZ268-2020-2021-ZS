<template>
  <div
    class="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:py-20 sm:items-start sm:justify-end z-10"
  >
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-for="n in Array.from(notifications)"
        :key="n.id"
        class="max-w-xs w-full bg-white shadow-lg rounded-md pointer-events-auto overflow-hidden"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <!-- Heroicon name: check-circle -->
              <Icon class="h-6 w-6 text-primary" name="check-circle" />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-secondary">
                {{ n.title }}
              </p>
              <p class="mt-1 text-sm text-secondary text-opacity-50">
                {{ n.text }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                class="bg-white rounded-md inline-flex text-secondary hover:text-black focus:outline-none transition duration-150"
                @click="$notify.close(n.id)"
              >
                <span class="sr-only">Close</span>
                <!-- Heroicon name: x -->
                <Icon class="h-5 w-5" name="close" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    notifications() {
      return this.$store.getters['notifications/notifications']
    },
  },
}
</script>

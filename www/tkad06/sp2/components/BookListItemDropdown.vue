<template>
  <!-- Profile dropdown panel, show/hide based on dropdown state. -->
  <transition
    enter-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    enter-active-class="transition ease-out duration-200"
    leave-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
    leave-active-class="transition ease-in duration-75"
  >
    <div
      v-if="open"
      class="absolute inset-0 mx-auto mb-2 w-full flex items-center py-1 justify-center rounded-md shadow-md bg-secondary bg-opacity-75"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu"
    >
      <div class="max-h-full overflow-y-auto w-3/4 bg-white rounded-lg py-1">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

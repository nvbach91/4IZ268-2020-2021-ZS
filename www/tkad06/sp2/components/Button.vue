<template>
  <button
    type="button"
    class="w-full inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium outline-none focus:outline-primary-light transition-all duration-150"
    :class="style"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'secondary',
      validator(v) {
        return ['secondary', 'primary'].includes(v)
      },
    },
  },
  computed: {
    style() {
      if (this.type === 'secondary') {
        return 'border-secondary-light bg-white hover:bg-secondary-light text-secondary'
      } else {
        return 'border-primary-light bg-primary hover:bg-primary-light text-white hover:text-primary'
      }
    },
  },
}
</script>

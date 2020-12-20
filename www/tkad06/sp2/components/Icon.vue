<template>
  <component :is="computedComponent" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    computedComponent() {
      try {
        return require(`~/assets/icons/${this.name}.vue`).default
      } catch (e) {
        return null
      }
    },
  },
}
</script>

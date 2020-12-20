<template>
  <div class="aspect-ratio-9-16">
    <slot />
  </div>
</template>

<style scoped>
.aspect-ratio-9-16 {
  padding-bottom: calc(56.25% - 100%);
}
</style>

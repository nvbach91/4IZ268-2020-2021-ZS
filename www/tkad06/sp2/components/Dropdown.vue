<template>
  <div class="relative">
    <div @click="dropdownOpen = !dropdownOpen">
      <slot name="trigger" />
    </div>

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
        v-if="dropdownOpen"
        class="origin-top-right absolute right-0 mt-2 px-2 w-48 rounded-md shadow-lg py-1 bg-white transform divide-y divide-secondary divide-opacity-25"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <slot name="items" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false,
    }
  },
}
</script>

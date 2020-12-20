<template>
  <button
    type="button"
    class="flex flex-no-wrap space-x-2 py-2 px-3 text-gray-800 border border-gray-800 bg-transparent hover:text-red-400 focus:outline-none transition-colors duration-150 ease-in-out"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

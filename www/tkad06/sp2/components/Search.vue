<template>
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
    >
      <!-- Heroicon name: search -->
      <Icon name="search" class="h-5 w-5 text-secondary" />
    </div>
    <input
      id="search"
      name="search"
      class="block w-full pl-10 pr-3 py-2 border border-primary-light rounded-md leading-5 bg-white placeholder-secondary placeholder-opacity-50 outline-none focus:outline-none focus:placeholder-opacity-25 focus:border-primary sm:text-sm transition-all duration-150"
      placeholder="Search by title, author or even text inside the book..."
      type="search"
      :value="searchQuery"
      @input="$emit('update:searchQuery', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    searchQuery: {
      type: String,
      default: null,
    },
  },
}
</script>

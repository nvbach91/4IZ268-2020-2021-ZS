<template>
  <section class="flex flex-col space-y-4 pt-3 pb-4">
    <h1 class="text-xl font-semibold text-secondary">Discover new books 🔍</h1>

    <!-- TRIGGER SEARCH ON ENTER -->
    <form @submit.prevent="searchVolumes">
      <Search :search-query.sync="searchQuery" />
    </form>
    <BooksList :books="books" is-searching />
  </section>
</template>

<script>
export default {
  layout: 'app',
  data() {
    return {
      searchQuery: null,
      books: [],
    }
  },
  methods: {
    async searchVolumes() {
      this.$nuxt.$loading.start()
      this.books = await this.$api.searchAllVolumes(this.searchQuery)
      this.$nuxt.$loading.finish()
    },
  },
}
</script>

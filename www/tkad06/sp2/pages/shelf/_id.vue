<template>
  <section class="flex flex-col space-y-4 pt-3 pb-4">
    <div class="inline-flex items-center space-x-4 py-2">
      <h1 class="text-xl font-semibold text-secondary">
        {{ currentShelf && currentShelf.title }}
      </h1>

      <!-- Bookshelf batch actions menu -->
      <div class="inline-flex items-center space-x-2">
        <button
          v-for="a in actionsMenu"
          :key="a.label"
          type="button"
          :title="a.label"
          class="bg-white rounded-md inline-flex text-secondary hover:text-black focus:outline-none transition duration-150"
          @click="a.onClick"
        >
          <span class="sr-only">{{ a.label }}</span>
          <Icon class="w-6 h-6" :name="a.icon" />
        </button>
      </div>
    </div>

    <BooksList :books="books" @change="fetchVolumes(bookshelfId)" />
  </section>
</template>

<script>
export default {
  layout: 'app',
  async asyncData({ params: { id }, $api, store }) {
    const { totalItems, items } = await $api.getBookshelfVolumes(id)
    store.commit('currentBookshelfId', id)
    return {
      books: items || [],
      totalItems: totalItems || 0,
      bookshelfId: parseInt(id),
    }
  },
  computed: {
    currentShelf() {
      return this.$store.getters.currentBookshelf
    },
    actionsMenu() {
      const actions = []

      if (this.$store.getters.canRemoveFromBookshelf) {
        actions.push({
          label: 'Clear bookshelf',
          onClick: this.clearBookshelf,
          icon: 'x-circle',
        })
      }

      return actions
    },
  },
  methods: {
    async fetchVolumes(id) {
      this.$nuxt.$loading.start()
      const { totalItems, items } = await this.$api.getBookshelfVolumes(id)
      this.totalItems = totalItems || 0
      this.books = items || []

      // give Google Books API some time to process the thing above...
      setTimeout(async () => {
        await this.$api.getMyBookshelves()
      }, 500)
      this.$nuxt.$loading.finish()
    },
    async clearBookshelf() {
      if (
        confirm(
          `Are you sure to clear all volumes from ${this.currentShelf.title}?`
        )
      ) {
        this.$nuxt.$loading.start()

        await this.$api.clearBookshelf(this.currentShelf.id)

        // refetch books list (to get actual cleared bookshelf)
        await this.fetchVolumes(this.bookshelfId)

        this.$notify.success(
          `All volumes from ${this.currentShelf.title} cleared 🧹`
        )

        this.$nuxt.$loading.finish()
      }
    },
  },
}
</script>

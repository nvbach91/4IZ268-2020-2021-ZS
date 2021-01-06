<template>
  <li
    class="relative col-span-1 flex flex-col text-center bg-white rounded-md shadow divide-y divide-secondary-light"
  >
    <!-- BOOK PREVIEW INFO -->
    <div class="flex-1 flex flex-col px-2 py-3 relative">
      <img
        class="w-24 h-32 flex-shrink-0 mx-auto bg-secondary-light rounded-md object-cover"
        :src="
          volumeInfo.imageLinks
            ? volumeInfo.imageLinks.thumbnail
            : 'http://books.google.com/books/content?id=Pk23CwAAAEAJ&printsec=frontcover&img=1&zoom=1&uvs=3&source=gbs_api'
        "
        :alt="volumeInfo.title"
      />
      <h3 class="mt-3 text-secondary text-sm font-medium">
        {{ volumeInfo.title }}
      </h3>
      <dl class="mt-1 flex-grow flex flex-col justify-between">
        <dt class="sr-only">Title</dt>
        <dd class="text-secondary text-sm divide-x opacity-75">
          <span
            v-for="authorName in volumeInfo.authors"
            :key="authorName"
            class="p-1"
            >{{ authorName }}</span
          >
        </dd>
        <dt class="sr-only">Category</dt>
        <dd class="mt-1 flex flex-wrap justify-center">
          <span
            v-for="c in volumeInfo.categories"
            :key="c"
            class="px-2 py-1 m-0.5 text-primary text-xs font-medium bg-primary-light rounded-full"
            >{{ c }}</span
          >
        </dd>
      </dl>

      <!-- BOOK ITEM MENU/DROPDOWN -->
      <BookListItemDropdown :open="dropdownOpen">
        <div v-if="bookDropdownItems.length <= 0">No Actions</div>
        <a
          v-for="i in bookDropdownItems"
          :key="i.label"
          href="#"
          class="flex items-center justify-center space-x-2 px-2 py-2 text-sm text-secondary hover:bg-secondary-light hover:bg-opacity-50 transition-all duration-150"
          role="menuitem"
          @click.prevent="i.onClick"
        >
          <span class="flex-shrink"
            ><Icon :name="i.icon" class="w-5 h-5"
          /></span>
          <span>{{ i.label }}</span>
        </a>
      </BookListItemDropdown>
    </div>
    <!-- BOOK BOTTOM ACTIONS -->
    <div class="relative">
      <div class="-mt-px flex divide-x divide-secondary-light">
        <div class="w-0 flex-1 flex">
          <a
            :href="volumeInfo.canonicalVolumeLink"
            target="_blank"
            class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-2 text-sm text-secondary border border-transparent rounded-bl-lg hover:text-primary transition-colors duration-150"
          >
            <!-- Heroicon name: eye -->
            <Icon name="eye" class="w-5 h-5" />
          </a>
        </div>
        <div class="-ml-px w-0 flex-1 flex">
          <a
            href="#"
            class="relative w-0 flex-1 inline-flex items-center justify-center py-2 text-sm text-secondary border border-transparent rounded-br-lg hover:text-primary transition-colors duration-150"
            @click.prevent="dropdownOpen = !dropdownOpen"
          >
            <!-- Heroicon name: dot-horizontal -->
            <Icon name="dots" class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
    isSearching: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dropdownOpen: false,
    }
  },
  computed: {
    volumeInfo() {
      return this.book.volumeInfo
    },
    searchInfo() {
      return this.book.searchInfo
    },
    userInfo() {
      return this.book.userInfo
    },
    saleInfo() {
      return this.book.saleInfo
    },
    currentBookshelf() {
      return this.$store.getters.currentBookshelf
    },
    bookDropdownItems() {
      const items = [
        {
          label: 'Add to shelf',
          onClick: this.addToShelf,
          icon: 'plus',
        },
      ]

      if (this.$store.getters.canRemoveFromBookshelf && !this.isSearching) {
        items.push({
          label: 'Remove',
          onClick: this.removeFromShelf,
          icon: 'trash',
        })
      }

      return items
    },
  },
  methods: {
    async removeFromShelf() {
      if (
        confirm(
          `Are you sure to remove volume ${this.volumeInfo.title} from the shelf ${this.currentBookshelf.title}?`
        )
      ) {
        this.$nuxt.$loading.start()

        await this.$api.removeVolumeFromBookshelf(
          this.book.id,
          this.currentBookshelf.id
        )
        this.$emit('removeBook')
        this.dropdownOpen = false

        this.$nuxt.$loading.finish()
        // give Google Books API some time to process the thing above...
        setTimeout(async () => {
          await this.$api.getMyBookshelves()
        }, 500)
        this.$notify.success(
          `Book ${this.volumeInfo.title} was removed from the shelf 🗑`
        )
      }
    },
    addToShelf() {
      this.$emit('addToShelf', this.book)
      this.dropdownOpen = false
    },
  },
}
</script>

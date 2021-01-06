<template>
  <nav class="block bg-white shadow max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="relative flex justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <button
            class="inline-flex items-center justify-center p-2 rounded-md hover:text-primary focus:outline-none"
            aria-expanded="false"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed. -->
            <Icon v-if="!mobileMenuOpen" name="menu" class="block h-6 w-6" />

            <!-- Icon when menu is open. -->
            <Icon v-else name="close" class="block h-6 w-6" />
          </button>
        </div>
        <div
          class="flex-1 flex items-center justify-center lg:items-stretch lg:justify-start"
        >
          <div class="flex-shrink-0 flex items-center space-x-2">
            <!-- <Icon name="bookcaser" class="block h-12 w-auto" /> -->
            <span class="block text-2xl font-light">bookcaser</span>
          </div>
        </div>
        <div class="hidden lg:flex sm:flex-1 sm:ml-6 sm:space-x-8">
          <nuxt-link
            v-for="l in menuLinks"
            :key="l.title"
            :to="{ name: l.route }"
            :exact="l.exact"
            class="border-transparent text-secondary inline-flex items-center px-1 pt-1 hover:border-primary-light border-b-4 text-base transition-all duration-150"
          >
            {{ l.title }}
          </nuxt-link>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- Profile dropdown -->
          <Dropdown class="ml-3">
            <template #trigger>
              <button
                id="user-menu"
                class="bg-white rounded-full flex text-sm outline-none focus:outline-none border-2 border-transparent hover:border-primary transition-all duration-150"
                aria-haspopup="true"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-10 w-10 rounded-full"
                  :src="$store.state.auth.user.picture"
                  :alt="$store.state.auth.user.name"
                />
              </button>
            </template>
            <template #items>
              <div class="py-1 text-secondary">
                <span class="text-sm px-4 py-2">{{
                  $store.state.auth.user.email
                }}</span>
                <span class="text-xs px-4 py-2">{{
                  $store.state.auth.user.name
                }}</span>
              </div>
              <div class="py-1">
                <a
                  v-for="i in userDropdownItems"
                  :key="i.label"
                  href="#"
                  class="block px-4 py-2 text-sm rounded-md text-secondary hover:bg-secondary-light hover:bg-opacity-50 transition-all duration-150"
                  role="menuitem"
                  @click.prevent="i.onClick"
                >
                  {{ i.label }}
                </a>
              </div>
              <div>
                <NuxtLink
                  class="block px-4 py-2 text-sm rounded-md text-secondary hover:bg-secondary-light hover:bg-opacity-50 transition-all duration-150"
                  to="/terms-of-service"
                >
                  <span>Terms of Service</span>
                </NuxtLink>
                <NuxtLink
                  class="block px-4 py-2 text-sm rounded-md text-secondary hover:bg-secondary-light hover:bg-opacity-50 transition-all duration-150"
                  to="/privacy-policy"
                >
                  <span>Privacy Policy</span>
                </NuxtLink>
              </div>
            </template>
          </Dropdown>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="lg:hidden" :class="mobileMenuOpen ? 'block' : 'hidden'">
      <div class="pt-2 pb-4 space-y-1">
        <nuxt-link
          v-for="l in menuLinks"
          :key="l.title"
          :exact="l.exact"
          :to="{ name: l.route }"
          class="border-transparent text-secondary hover:bg-secondary-light hover:border-primary-light hover:bg-opacity-50 block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-150"
        >
          {{ l.title }}
        </nuxt-link>

        <!-- Bookshelves menu, which is in sidebar on desktop -->
        <div
          class="border-t border-secondary-light text-secondary h-64 overflow-y-auto shadow-inner-bottom"
        >
          <!-- PUBLIC bookshelves -->
          <span
            class="flex items-center px-1 py-2 text-sm font-light uppercase opacity-50"
            >public</span
          >
          <nuxt-link
            v-for="s in publicBookshelves"
            :key="s.title"
            :exact="true"
            :to="{
              name: 'shelf-id',
              params: { id: s.id },
            }"
            class="border-transparent hover:bg-secondary-light hover:border-primary-light hover:bg-opacity-50 flex items-center justify-between pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-150"
          >
            <span>{{ s.title }}</span>
            <span
              v-show="s.volumeCount"
              class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-light text-primary"
            >
              {{ s.volumeCount }}
            </span>
          </nuxt-link>

          <!-- PRIVATE bookshelves -->
          <span
            class="flex items-center px-1 py-2 text-sm font-light uppercase opacity-50"
            >private</span
          >
          <nuxt-link
            v-for="s in privateBookshelves"
            :key="s.title"
            :exact="true"
            :to="{
              name: 'shelf-id',
              params: { id: s.id },
            }"
            class="border-transparent hover:bg-secondary-light hover:border-primary-light hover:bg-opacity-50 flex items-center justify-between pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-150"
            @click.native="mobileMenuOpen = false"
          >
            <span>{{ s.title }}</span>
            <span
              v-show="s.volumeCount"
              class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-light text-primary"
            >
              {{ s.volumeCount }}
            </span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      mobileMenuOpen: false,
      menuLinks: [
        {
          title: 'Home',
          route: 'shelf',
          exact: false,
        },
        {
          title: 'Discover',
          route: 'discover',
          exact: true,
        },
      ],
      userDropdownItems: [
        {
          label: 'Sign Out',
          onClick: this.logout,
        },
      ],
    }
  },
  computed: {
    privateBookshelves() {
      return this.$store.getters.bookshelvesPrivate
    },
    publicBookshelves() {
      return this.$store.getters.bookshelvesPublic
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style lang="css" scoped>
.nuxt-link-active {
  @apply border-primary;
}
</style>

<template>
  <div class="relative min-h-screen">
    <Navbar class="fixed w-full z-10" />
    <Notifications />
    <div class="relative max-w-9xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex">
          <Sidebar class="hidden lg:flex w-1/5 mr-8" />
          <Nuxt class="w-full lg:w-4/5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // fetch bookshelves on each app page
  async fetch() {
    await this.$api.getMyBookshelves()
  },
}
</script>

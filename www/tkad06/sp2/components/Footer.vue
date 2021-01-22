<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <footer class="bg-white">
    <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav
        class="-mx-5 -my-2 flex flex-wrap justify-center"
        aria-label="Footer"
      >
        <div v-for="l in links" :key="l.label" class="px-3 py-2">
          <NuxtLink
            :to="l.url"
            class="text-base text-secondary text-opacity-50 hover:text-opacity-100 transition-all duration-150"
          >
            {{ l.label }}
          </NuxtLink>
        </div>
      </nav>
      <div class="mt-8 flex justify-center space-x-4">
        <a
          href="https://github.com/dmitrijt9"
          target="_blank"
          class="text-secondary text-opacity-50 hover:text-opacity-100 transition-all duration-150"
        >
          <span class="sr-only">GitHub</span>
          <Icon name="github" class="w-6 h-6" />
        </a>
        <a
          href="https://twitter.com/dimot_9"
          target="_blank"
          class="text-secondary text-opacity-50 hover:text-opacity-100 transition-all duration-150"
        >
          <span class="sr-only">Twitter</span>
          <Icon name="twitter" class="w-6 h-6" />
        </a>

        <a
          href="https://www.instagram.com/dimot9/"
          target="_blank"
          class="text-secondary text-opacity-50 hover:text-opacity-100 transition-all duration-150"
        >
          <span class="sr-only">Instagram</span>
          <Icon name="instagram" class="w-6 h-6" />
        </a>
      </div>
      <p
        class="mt-8 w-full justify-center text-center text-base inline-flex items-center text-secondary text-opacity-50 hover:text-opacity-100 transition-all duration-150"
      >
        &copy; Made with
        <span><Icon name="heart" class="w-6 h-6 mx-1 text-primary" /></span>
        by
        <a
          class="hover:text-primary mx-1 transition-all duration-150"
          href="https://dev.to/dmitrijt9"
          target="_blank"
        >
          Dmitrij Tkačenko</a
        >
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'App',
        url: '/shelf',
      },
      {
        label: 'Privacy Policy',
        url: '/privacy-policy',
      },
      {
        label: 'Terms of Service',
        url: '/terms-of-service',
      },
    ],
  }),
}
</script>

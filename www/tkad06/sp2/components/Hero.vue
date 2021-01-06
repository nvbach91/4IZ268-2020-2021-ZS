<template>
  <section class="relative">
    <img
      class="w-full h-full lg:absolute object-cover opacity-25"
      src="/images/book-shelf.jpg"
      alt="Book Shelf background"
    />
    <div class="relative mx-auto max-w-7xl">
      <div class="lg:grid lg:grid-cols-12 lg:gap-8 py-16 md:py-32">
        <div
          class="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center"
        >
          <div>
            <h1
              class="mt-4 text-4xl tracking-tight font-extrabold text-secondary sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl"
            >
              <span class="md:block">Manage your</span>
              <span class="text-primary md:block">bookshelves</span>
            </h1>
            <p
              class="mt-3 text-base text-secondary font-light sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
            >
              Manage your Google Books shelves with Bookcaser. Discover new
              literature and keep track of what you're reading.
            </p>
          </div>
        </div>
        <div
          class="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6 lg:flex lg:items-center"
        >
          <div
            class="bg-transparent sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden"
          >
            <div class="px-4 py-8 sm:px-10">
              <div class="space-y-4">
                <div>
                  <Button
                    class="font-semibold space-x-5 py-3"
                    @click="$auth.loginWith('google')"
                  >
                    <span><Icon name="google" class="w-5 h-5" /></span>
                    <span>Sign in with Google</span>
                  </Button>
                </div>
              </div>
            </div>
            <div
              class="px-4 py-6 bg-gray-50 border-t border-secondary border-opacity-50 sm:px-10"
            >
              <p class="text-xs leading-5 text-secondary">
                By signing in, you agree to our
                <NuxtLink
                  class="font-medium underline hover:text-black transition duration-150"
                  :to="{ name: 'terms-of-service' }"
                  >Terms of Service</NuxtLink
                >

                and
                <NuxtLink
                  class="font-medium underline hover:text-black transition duration-150"
                  :to="{ name: 'terms-of-service' }"
                  >Privacy Policy</NuxtLink
                >
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

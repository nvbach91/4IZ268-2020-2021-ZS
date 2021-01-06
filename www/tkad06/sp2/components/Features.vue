<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="bg-primary-light bg-opacity-25">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl tracking-tight font-extrabold text-secondary">
          Digital bookcase you need
          <span class="inline-block animate-shake">✌</span>
        </h2>
        <p class="mt-4 text-lg text-secondary font-light">
          Easy functionality to keep track of your books and other texts. Much
          more to come!
        </p>
      </div>
      <dl
        class="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8"
      >
        <div class="flex">
          <!-- Heroicon name: check -->
          <Icon class="flex-shrink-0 h-6 w-6 text-primary" name="check" />
          <div class="ml-3">
            <dt class="text-lg leading-6 font-medium text-secondary">
              Search in your library
            </dt>
            <dd class="mt-2 text-base text-secondary text-opacity-75">
              Type title, author or even a content text and search book from
              your library.
            </dd>
          </div>
        </div>
        <div class="flex">
          <!-- Heroicon name: check -->
          <Icon class="flex-shrink-0 h-6 w-6 text-primary" name="check" />
          <div class="ml-3">
            <dt class="text-lg leading-6 font-medium text-secondary">
              Discover new books
            </dt>
            <dd class="mt-2 text-base text-secondary text-opacity-75">
              Search any new books you want to save, download or purchase.
            </dd>
          </div>
        </div>
        <div class="flex">
          <!-- Heroicon name: check -->
          <Icon class="flex-shrink-0 h-6 w-6 text-primary" name="check" />
          <div class="ml-3">
            <dt class="text-lg leading-6 font-medium text-secondary">
              Manage books in bookshelf
            </dt>
            <dd class="mt-2 text-base text-secondary text-opacity-75">
              Add, remove and clear books from your bookshelves.
            </dd>
          </div>
        </div>
        <div class="flex">
          <!-- Heroicon name: check -->
          <Icon class="flex-shrink-0 h-6 w-6 text-primary" name="check" />
          <div class="ml-3">
            <dt class="text-lg leading-6 font-medium text-secondary">
              Synced with Google
            </dt>
            <dd class="mt-2 text-base text-secondary text-opacity-75">
              All bookshelves and books are synced with your Google account
              (Google Books library).
            </dd>
          </div>
        </div>
      </dl>
    </div>
  </div>
</template>

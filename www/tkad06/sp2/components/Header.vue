<template>
  <header
    class="p-4 md:py-12 md:px-16 space-y-8 shadow-lg tracking-wider text-gray-800"
  >
    <div class="flex justify-between space-x-4">
      <!-- HEADING & SUBHEADING -->
      <div class="space-y-2">
        <div class="flex flex-no-wrap space-x-2 items-center">
          <Icon class="w-12 h-12" name="visinsta" />
          <h1 class="text-3xl font-bold uppercase">Visinsta</h1>
        </div>
        <p class="font-light">Create your music visualized story.</p>
      </div>

      <!-- MENU BUTTON -->
      <div>
        <button
          class="w-10 h-10 hover:text-red-400 focus:outline-none transition-colors duration-150 ease-in-out"
          type="button"
        >
          <Icon name="menu" />
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<template>
  <div v-if="open" class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-2 pb-12 text-center sm:block sm:p-0"
    >
      <!--
      Background overlay.
      -->
      <transition
        enter-active-class="transition ease-out duration-300"
        enter-class="transition opacity-0"
        enter-to-class="transition opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-class="transition opacity-100"
        leave-to-class="transition opacity-0"
      >
        <div v-if="open" class="fixed inset-0" aria-hidden="true">
          <div class="absolute inset-0 bg-secondary opacity-75"></div>
        </div>
      </transition>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <!--
      Modal panel.
      -->
      <transition
        enter-active-class="transition ease-out duration-300"
        enter-class="transform opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="transform opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="transition ease-in duration-200"
        leave-class="transform opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="transform opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          v-if="open"
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-light"
            >
              <!-- Heroicon name: check -->
              <svg
                class="h-6 w-6 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div class="mt-3 text-center">
              <h3
                id="modal-headline"
                class="text-lg leading-6 font-medium text-secondary"
              >
                Select bookshelves
              </h3>
              <div
                class="mt-2 h-56 overflow-y-auto border border-secondary-light"
              >
                <fieldset>
                  <legend class="sr-only">Add volume to bookshelf</legend>

                  <ul class="relative bg-white rounded-md -space-y-px">
                    <label
                      class="w-full block text-left p-2 font-light text-secondary opacity-50 uppercase text-sm"
                      >Private</label
                    >
                    <li v-for="b in addablePublicBookshelves" :key="b.id">
                      <div
                        class="relative px-3 py-2 flex flex-no-wrap md:pl-4 md:pr-4"
                      >
                        <label class="flex items-center text-sm cursor-pointer">
                          <input
                            v-model="selectedBookshelves"
                            name="pricing_plan"
                            type="checkbox"
                            class="h-5 w-5 text-primary cursor-pointer border border-primary-light rounded-sm outline-none focus:outline-none"
                            :aria-describedby="`bookshelf ${b.title}`"
                            :value="b.id"
                          />
                          <span
                            class="ml-3 font-medium text-secondary text-base"
                          >
                            {{ b.title }}
                          </span>
                        </label>
                      </div>
                    </li>
                  </ul>
                  <ul class="relative bg-white rounded-md -space-y-px">
                    <label
                      class="w-full block text-left p-2 font-light text-secondary opacity-50 uppercase text-sm"
                    >
                      Public
                    </label>
                    <li v-for="b in addablePrivateBookshelves" :key="b.id">
                      <div
                        class="relative px-3 py-2 flex flex-no-wrap md:pl-4 md:pr-4"
                      >
                        <label class="flex items-center text-sm cursor-pointer">
                          <input
                            v-model="selectedBookshelves"
                            name="pricing_plan"
                            type="checkbox"
                            class="h-5 w-5 text-primary cursor-pointer border border-primary-light rounded-sm outline-none focus:outline-none"
                            :aria-describedby="`bookshelf ${b.title}`"
                            :value="b.id"
                          />
                          <span
                            class="ml-3 font-medium text-secondary text-base"
                          >
                            {{ b.title }}
                          </span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </fieldset>
              </div>
            </div>
          </div>
          <div
            class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
          >
            <Button type="primary" class="sm:col-start-2" @click="addSelected">
              Add selected
            </Button>
            <Button class="sm:col-start-1 mt-3 sm:mt-0" @click="close">
              Cancel
            </Button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedBookshelves: [],
    }
  },
  computed: {
    addablePrivateBookshelves() {
      return this.$store.getters.addableBookshelves
        .filter((s) => s.access === 'PRIVATE')
        .sort((first, second) => first.id - second.id)
    },
    addablePublicBookshelves() {
      return this.$store.getters.addableBookshelves
        .filter((s) => s.access === 'PUBLIC')
        .sort((first, second) => first.id - second.id)
    },
  },
  methods: {
    addSelected() {
      this.$emit('input', this.selectedBookshelves)
      this.close()
    },
    close() {
      this.$emit('update:open', false)
      this.selectedBookshelves = []
    },
  },
}
</script>

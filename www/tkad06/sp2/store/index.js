export const state = () => {
  return {
    bookshelves: [],
    currentBookshelfId: null,
  }
}

export const mutations = {
  bookshelves(state, shelves) {
    state.bookshelves = shelves
  },
  currentBookshelfId(state, bookshelfId) {
    state.currentBookshelfId = parseInt(bookshelfId)
  },
}

export const getters = {
  bookshelves(state) {
    return [...state.bookshelves].sort((first, second) => first.id - second.id)
  },
  bookshelvesPrivate(state) {
    return [...state.bookshelves]
      .filter((s) => s.access === 'PRIVATE')
      .sort((first, second) => first.id - second.id)
  },
  bookshelvesPublic(state) {
    return [...state.bookshelves]
      .filter((s) => s.access === 'PUBLIC')
      .sort((first, second) => first.id - second.id)
  },
  currentBookshelf(state, getters) {
    return getters.bookshelves.find((s) => s.id === state.currentBookshelfId)
  },

  /**
   * Not all bookshelves are mutable: https://developers.google.com/books/docs/v1/getting_started#background-resources
   */
  addableBookshelves(state, getters) {
    return [...getters.bookshelves].filter((b) => ![1, 5, 6, 8].includes(b.id))
  },

  /**
   * Not all bookshelves are mutable: https://developers.google.com/books/docs/v1/getting_started#background-resources
   */
  removableBookshelves(state, getters) {
    return [...getters.bookshelves].filter((b) => ![1, 5, 8].includes(b.id))
  },

  /**
   * Not all bookshelves are mutable: https://developers.google.com/books/docs/v1/getting_started#background-resources
   */
  canAddToBookshelf(state) {
    return ![1, 5, 6, 8].includes(state.currentBookshelfId)
  },

  /**
   * Not all bookshelves are mutable: https://developers.google.com/books/docs/v1/getting_started#background-resources
   */
  canRemoveFromBookshelf(state) {
    return ![1, 5, 8].includes(state.currentBookshelfId)
  },
}

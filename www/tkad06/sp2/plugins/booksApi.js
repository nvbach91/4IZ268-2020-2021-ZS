import booksApi from '~/lib/booksApi'

export default ({ $axios, store }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('api', booksApi($axios, store))
}

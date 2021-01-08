<template>
  <div>
    <Hero />
    <Features />
  </div>
</template>

<script>
export default {
  mounted() {
    // make on client side, when accessing from server, because auth module has always loggedIn = false on server side
    if (this.$auth.loggedIn) {
      this.$router.push({ name: 'shelf' })
    }
  },
}
</script>

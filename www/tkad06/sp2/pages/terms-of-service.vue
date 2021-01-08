<template>
  <div class="relative mx-auto max-w-7xl">
    <div class="px-4 pt-12 pb-32 space-y-6">
      <h1 class="text-4xl tracking-tight font-extrabold">Terms of Service</h1>
      <div class="text-2xl px-4 tracking-tight font-light italic">
        Posted January 6, 2021
      </div>
      <div
        class="max-w-4xl px-4 text-secondary font-normal text-lg leading-6 space-y-3"
      >
        <p>
          Bookcaser is a web application for personal, noncommercial use. By
          sign in using your Google account you are accepting these Terms of
          Service and
          <a class="link" href="/privacy-policy">Privacy Policy</a>.
        </p>
        <p>
          All bookshelves and volumes (books) in your account in Bookcaser
          application are stored in Google's infrastructure (servers, databases
          etc.).
        </p>
        <p>
          You agree to read our
          <a class="link" href="/privacy-policy">Privacy Policy</a>, which
          explains what type of information we collect and what might happen to
          that information, including, without limitation, how such information
          is shared and used. Although our Privacy Policy is not a legal
          agreement, and creates no contractual obligations, it contains
          information that you should review prior to using the Bookcaser
          application. Our Privacy Policy will apply to the information we
          collect, whether or not you choose to read it. You are not required to
          sign in or provide any personal information in order to visit our
          website. You are required to sign in using your Google account,
          however, to use our application, such as searching books, adding or
          removing them to/from bookshelves or clear a whole bookshelf.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
}
</script>

<style scoped>
.link {
  @apply opacity-75 hover:opacity-100 transition-all duration-150;
}
</style>

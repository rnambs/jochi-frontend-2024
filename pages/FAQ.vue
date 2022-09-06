<template>
  <div class="inner-section">
    <!-- sidebar -->
    <UserSidebar />
    <!-- sidebar -->
    <FAQ />
  </div>
</template>
<script>
import UserSidebar from "~/components/user/UserSidebar.vue";
import FAQ from "~/components/FAQ.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
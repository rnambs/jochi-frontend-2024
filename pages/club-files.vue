<template>
  <div class="inner-section">
    <!-- header -->

    <UserSidebar />

    <!-- end section -->

    <!-- sidebar -->

    <!-- sidebar -->

    <UserClubFiles />
  </div>
</template>

<script>
import UserSidebar from "~/components/user/UserSidebar.vue";
import UserClubFiles from "~/components/user/UserClubFiles.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
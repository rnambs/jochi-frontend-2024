<template>
  <div class="inner-section">
    <!-- header -->

    <UserSidebar />

    <!-- end section -->

    <!-- sidebar -->

    <!-- sidebar -->

    <UserClubMoreInfo />
  </div>
</template>
<script>
import UserSidebar from "~/components/user/UserSidebar.vue";
import UserClubMoreInfo from "~/components/user/UserClubMoreInfo.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
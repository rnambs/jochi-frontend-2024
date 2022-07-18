<template>
  <div class="inner-section">
    <!-- sidebar -->

    <UserTeacherSidebar />

    <!-- sidebar -->

    <UserClubDetail />
  </div>
</template>
<script>
import UserTeacherSidebar from "~/components/user/UserSidebar.vue";
import UserClubDetail from "~/components/user/UserClubDetail.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
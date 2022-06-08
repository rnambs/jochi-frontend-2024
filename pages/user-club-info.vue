<template>
  <div class="inner-section">
    <!-- sidebar -->

    <UserTeacherSidebar />

    <!-- sidebar -->

    <UserTeacherClubInfo />
  </div>
</template>
<script>
import UserTeacherSidebar from "~/components/user/UserSidebar.vue";
import UserTeacherClubInfo from "~/components/user/UserTeacherClubInfo.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
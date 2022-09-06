<template>
  <div class="inner-section">
    <!-- header -->

    <UserSidebarTeacher />

    <!-- end section -->

    <!-- sidebar -->

    <!-- sidebar -->

    <UserTeacherClubMoreInfo />
  </div>
</template>
<script>
// import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserSidebarTeacher from "~/components/user/UserSidebarTeacher.vue";

import UserTeacherClubMoreInfo from "~/components/user/UserTeacherClubMoreInfo.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
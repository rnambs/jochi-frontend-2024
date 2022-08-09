<template>
  <div class="inner-section">
    <!-- header -->

    <UserSidebarTeacher />

    <!-- end section -->

    <!-- sidebar -->

    <!-- sidebar -->

    <UserTeacherClubFiles />
  </div>
</template>

<script>
// import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserSidebarTeacher from "~/components/user/UserSidebarTeacher.vue";

import UserTeacherClubFiles from "~/components/user/UserTeacherClubFiles.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
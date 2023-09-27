<template>
  <div class="inner-section">
    <!-- header -->

    <UserNewSidebarTeacher />

    <!-- end section -->

    <!-- sidebar -->

    <!-- sidebar -->

    <UserTeacherClubFiles />
  </div>
</template>

<script>
// import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserNewSidebarTeacher from "~/components/user/UserNewSidebarTeacher.vue";

import UserTeacherClubFiles from "~/components/user/UserTeacherClubFiles.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/custom.css" }],
    };
  },
};
</script>
<template>
  <div class="inner-section">
    <!-- header -->

    <UserNewSidebarTeacher />

    <!-- end section -->

    <!-- sidebar -->

    <!-- sidebar -->

    <UserTeacherClubMoreInfo />
  </div>
</template>
<script>
// import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserNewSidebarTeacher from "~/components/user/UserNewSidebarTeacher.vue";

import UserTeacherClubMoreInfo from "~/components/user/UserTeacherClubMoreInfo.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/custom.css" }],
    };
  },
};
</script>
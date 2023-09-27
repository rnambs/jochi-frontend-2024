<template>
  <div class="inner-section">
    <!-- sidebar -->

    <UserNewSidebarTeacher />

    <!-- sidebar -->

    <UserTeacherClubInfo />
  </div>
</template>
<script>
// import UserTeacherSidebar from "~/components/user/UserSidebar.vue";
import UserNewSidebarTeacher from "~/components/user/UserNewSidebarTeacher.vue";

import UserTeacherClubInfo from "~/components/user/UserTeacherClubInfo.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/custom.css" }],
    };
  },
};
</script>
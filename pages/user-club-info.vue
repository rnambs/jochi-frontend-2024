<template>
  <div class="inner-section">
    <!-- sidebar -->

    <UserSidebarTeacher />

    <!-- sidebar -->

    <UserTeacherClubInfo />
  </div>
</template>
<script>
// import UserTeacherSidebar from "~/components/user/UserSidebar.vue";
import UserSidebarTeacher from "~/components/user/UserSidebarTeacher.vue";

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
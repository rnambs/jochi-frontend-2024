<template>
  <div class="inner-section">
    <!-- header -->
    <!-- <UserNavHeader /> -->
    <!-- end section -->
    <!-- sidebar -->
    <UserSidebarTeacher />
    <!-- sidebar -->
    <UserTeacherMyClub />
  </div>
</template>
<script>
// import UserNavHeader from "~/components/user/UserNavHeader.vue";
// import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserSidebarTeacher from "~/components/user/UserSidebarTeacher.vue";

import UserTeacherMyClub from "~/components/user/UserTeacherMyClub.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
<template>
  <div class="inner-section">
    <!-- sidebar -->
    <UserSidebarTeacher />

    <!-- sidebar -->

    <UserTeacherAvailability />
  </div>
</template>
<script>
// import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserSidebarTeacher from "~/components/user/UserSidebarTeacher.vue";

import UserTeacherAvailability from "~/components/user/UserTeacherAvailability.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
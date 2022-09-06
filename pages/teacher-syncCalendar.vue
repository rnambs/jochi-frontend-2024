<template>
  <div class="inner-section">
    <!-- sidebar -->

    <UserSidebarTeacher />

    <!-- sidebar -->

    <UserTeacherSyncCalendar />
  </div>
</template>
<script>
// import UserTeacherSidebar from "~/components/user/UserSidebar.vue";
import UserSidebarTeacher from "~/components/user/UserSidebarTeacher.vue";

import UserTeacherSyncCalendar from "~/components/user/UserTeacherSyncCalendar.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
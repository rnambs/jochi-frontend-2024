<template>
  <div class="inner-section">
    <!-- sidebar -->

    <UserNewSidebarTeacher />

    <!-- sidebar -->

    <UserTeacherSyncCalendar />
  </div>
</template>
<script>
// import UserTeacherSidebar from "~/components/user/UserSidebar.vue";
import UserNewSidebarTeacher from "~/components/user/UserNewSidebarTeacher.vue";

import UserTeacherSyncCalendar from "~/components/user/UserTeacherSyncCalendar.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/custom.css" }],
    };
  },
};
</script>
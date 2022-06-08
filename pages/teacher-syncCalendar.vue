<template>
  <div class="inner-section">
    <!-- sidebar -->

    <UserTeacherSidebar />

    <!-- sidebar -->

    <UserTeacherSyncCalendar />
  </div>
</template>
<script>
import UserTeacherSidebar from "~/components/user/UserSidebar.vue";
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
<template>
  <div class="inner-section">
    <!-- sidebar -->
    <UserNewSidebarTeacher />

    <!-- sidebar -->

    <UserTeacherAppointment />
  </div>
</template>
<script>
import UserSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserNewSidebarTeacher from "~/components/user/UserNewSidebarTeacher.vue";
import UserTeacherAppointment from "~/components/user/UserTeacherAppointment.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/custom.css" }],
    };
  },
};
</script>
<template>
  <div class="inner-section">
    <!-- sidebar -->
    <UserTeacherSidebar />

    <!-- sidebar -->

    <UserTeacherAppointment />
  </div>
</template>
<script>
import UserSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserTeacherAppointment from "~/components/user/UserTeacherAppointment.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
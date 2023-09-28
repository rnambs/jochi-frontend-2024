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
  mounted() {
    const schoolAccess = localStorage.getItem('schoolAccess');
    if (schoolAccess == 'ClubOnly') {
  // Handle unauthorized access as needed (e.g., redirect)
  this.$router.push("/");
}
  },
};
</script>
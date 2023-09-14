<template>
  <div class="inner-section">
    <!-- sidebar -->
    <UserSidebar />

    <!-- sidebar -->

    <StudentAvailability />
  </div>
</template>
<script>
// import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserSidebar from "~/components/user/UserSidebarTeacher.vue";

import StudentAvailability from "~/components/StudentAvailability.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  mounted() {
    const schoolAccess = localStorage.getItem('schoolAccess');
    if (schoolAccess !== 'FullAccess') {
  // Handle unauthorized access as needed (e.g., redirect)
  this.$router.push("/");
}
  },
};
</script>
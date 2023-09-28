<template>
  <div class="inner-section">
    <!-- sidebar -->
    <UserNewSidebar />

    <!-- sidebar -->

    <StudentAvailability />
  </div>
</template>
<script>
// import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserNewSidebar from "~/components/user/UserNewSidebar.vue";

import StudentAvailability from "~/components/StudentAvailability.vue";
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
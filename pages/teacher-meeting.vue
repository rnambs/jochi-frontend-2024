<template>
  <div class="inner-section">
    <!-- sidebar -->
    <UserSidebar />
    <!-- sidebar -->
    <UserTeacherMeeting />
  </div>
</template>
<script>
import UserSidebar from "../components/user/UserSidebar.vue";
import UserTeacherMeeting from "../components/user/UserTeacherMeeting.vue";
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
<template>
  <div class="inner-section">
    <!-- sidebar -->
    <UserNewSidebar />
    <!-- sidebar -->
    <UserTeacherMeeting />
  </div>
</template>
<script>
import UserNewSidebar from "../components/user/UserNewSidebar.vue";
import UserTeacherMeeting from "../components/user/UserTeacherMeeting.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/custom.css" }],
    };
  },
};
</script>
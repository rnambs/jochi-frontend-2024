<template>
  <div class="inner-section">
    <!-- sidebar -->
    <UserTeacherSidebar />

    <!-- sidebar -->

    <UserTeacherAvailability />
  </div>
</template>
<script>
import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserTeacherAvailability from "~/components/user/UserTeacherAvailability.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
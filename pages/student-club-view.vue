<template>
  <div class="inner-section">
    <!-- header -->

    <!-- end section -->

    <!-- sidebar -->

    <UserSidebar />

    <!-- sidebar -->

    <UserStudentClubView />
  </div>
</template>
<script>
import UserSidebar from "~/components/user/UserSidebar.vue";
import UserStudentClubView from "~/components/user/UserStudentClubView.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
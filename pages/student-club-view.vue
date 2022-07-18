<template>
  <div class="inner-section">
    <!-- header -->

    <!-- end section -->

    <!-- sidebar -->

    {{user_type==3?<UserSidebar />:<UserTeacherSidebar />}}

    <!-- sidebar -->

    <UserStudentClubView />
  </div>
</template>
<script>
import UserSidebar from "~/components/user/UserSidebar.vue";
import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
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
<template>
  <div class="inner-section">
    <!-- header -->

    <!-- end section -->

    <!-- sidebar -->

    <!-- {{user_type==3?<UserSidebar />:<UserTeacherSidebar />}} -->
    <div v-if="user_type == 3"><UserNewSidebar /></div>
    <div v-else><UserSidebarTeacher /></div>

    <!-- sidebar -->

    <UserStudentClubView />
  </div>
</template>
<script>
import UserNewSidebar from "~/components/user/UserNewSidebar.vue";
// import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserSidebarTeacher from "~/components/user/UserSidebarTeacher.vue";

import UserStudentClubView from "~/components/user/UserStudentClubView.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/custom.css" }],
    };
  },
  data() {
    return {
      user_type: "3",
    };
  },
  mounted() {
    this.user_type = localStorage.getItem("user_type");
  },
};
</script>
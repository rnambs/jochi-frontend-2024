<template>
  <div class="inner-section">
    <!-- header -->
    <!-- <UserNavHeader /> -->
    <!-- end section -->
    <!-- sidebar -->
    <!-- {{user_type==3?<UserSidebar />:<UserTeacherSidebar />}} -->
    <div v-if="user_type == 3"><UserNewSidebar /></div>
    <div v-else><UserNewSidebarTeacher /></div>
    <!-- sidebar -->
    <UserClubDetail />
  </div>
</template>
<script>
// import UserNavHeader from "~/components/user/UserNavHeader.vue";
import UserNewSidebar from "~/components/user/UserNewSidebar.vue";
// import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserNewSidebarTeacher from "~/components/user/UserNewSidebarTeacher.vue";

import UserClubDetail from "~/components/user/UserClubDetail.vue";
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
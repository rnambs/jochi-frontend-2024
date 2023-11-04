<template>
  <div class="inner-section">
    <!-- header -->

    <!-- end section -->

    <!-- sidebar -->

    <div v-if="userType == '3'">
      <UserNewSidebar />
      <UserProfile />
    </div>

    <div v-if="userType == '2'">
      <UserNewSidebarTeacher />
      <UserProfile />
    </div>

    <!-- sidebar -->
  </div>
</template>
<script>
import UserNewSidebar from "~/components/user/UserNewSidebar.vue";
// import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserNewSidebarTeacher from "~/components/user/UserNewSidebarTeacher.vue";

import UserProfile from "~/components/user/UserProfile.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/custom.css" }],
    };
  },
  data() {
    return {
      userType: 1,
    };
  },
  mounted() {
    localStorage.getItem("user_type");
    this.userType = localStorage.getItem("user_type");
  },
};
</script>
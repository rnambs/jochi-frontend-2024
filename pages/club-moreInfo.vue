<template>
  <div class="inner-section">
    <!-- header -->

    <!-- {{user_type==3?<UserSidebar />:<UserTeacherSidebar />}} -->
    <div v-if="user_type == 3"><UserNewSidebar /></div>
    <div v-else><UserSidebarTeacher /></div>

    <!-- end section -->

    <!-- sidebar -->

    <!-- sidebar -->

    <UserClubMoreInfo />
  </div>
</template>
<script>
import UserNewSidebar from "~/components/user/UserNewSidebar.vue";
import UserClubMoreInfo from "~/components/user/UserClubMoreInfo.vue";
// import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserSidebarTeacher from "~/components/user/UserSidebarTeacher.vue";

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
<template>
  <div class="inner-section">
    <!-- header -->

    <!-- {{user_type==3?<UserSidebar />:<UserTeacherSidebar />}} -->
    <div v-if="user_type == 3"><UserSidebar /></div>
    <div v-else><UserTeacherSidebar /></div>

    <!-- end section -->

    <!-- sidebar -->

    <!-- sidebar -->

    <UserClubMoreInfo />
  </div>
</template>
<script>
import UserSidebar from "~/components/user/UserSidebar.vue";
import UserClubMoreInfo from "~/components/user/UserClubMoreInfo.vue";
import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  data() {
    return {
      user_type: "",
    };
  },
  mounted() {
    this.user_type = localStorage.getItem("user_type");
  },
};
</script>
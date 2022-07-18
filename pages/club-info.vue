<template>
  <div class="inner-section">
    <!-- header -->

    <!-- end section -->

    <!-- sidebar -->

    {{user_type==3?<UserSidebar />:<UserTeacherSidebar />}}

    <!-- sidebar -->

    <UserClubInfo />
  </div>
</template>
<script>
import UserSidebar from "~/components/user/UserSidebar.vue";
import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserClubInfo from "~/components/user/UserClubInfo.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  mounted() {
    var user_type = localStorage.getItem("user_type");
  },
};
</script>
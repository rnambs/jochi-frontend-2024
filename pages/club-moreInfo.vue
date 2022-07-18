<template>
  <div class="inner-section">
    <!-- header -->

    {{user_type==3?<UserSidebar />:<UserTeacherSidebar />}}

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
  mounted() {
    var user_type = localStorage.getItem("user_type");
  },
};
</script>
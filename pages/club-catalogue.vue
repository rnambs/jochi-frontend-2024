<template>
  <div class="inner-section">
    <!-- header -->
    <!-- <UserNavHeader /> -->
    <!-- end section -->

    <!-- sidebar -->
    {{user_type==3?<UserSidebar />:<UserTeacherSidebar />}}

    <!-- sidebar -->
    <UserClubCatalog />
  </div>
</template>
<script>
// import UserNavHeader from "~/components/user/UserNavHeader.vue";
import UserSidebar from "~/components/user/UserSidebar.vue";
import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserClubCatalog from "~/components/user/UserClubCatalog.vue";
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
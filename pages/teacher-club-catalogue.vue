<template>
  <div class="inner-section">
    <!-- header -->
    <!-- <UserNavHeader /> -->
    <!-- end section -->

    <!-- sidebar -->
    <UserTeacherSidebar />
    <!-- sidebar -->
    <UserClubCatalog />
  </div>
</template>
<script>
// import UserNavHeader from "~/components/user/UserNavHeader.vue";
import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserClubCatalog from "~/components/user/UserClubCatalog.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>  
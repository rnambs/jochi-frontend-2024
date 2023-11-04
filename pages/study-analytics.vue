<template>
  <div class="inner-section">
    <!-- header -->
    <!-- <UserNavHeader /> -->
    <!-- end section -->
    <!-- sidebar -->
    <UserNewSidebar />
    <!-- sidebar -->
    <UserStudyAnalytics />
  </div>
</template>
<script>
// import UserNavHeader from "~/components/user/UserNavHeader.vue";
import UserNewSidebar from "~/components/user/UserNewSidebar.vue";
import UserStudyAnalytics from "~/components/user/UserStudyAnalytics.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/custom.css" }],
    };
  },
  mounted() {
    const schoolAccess = localStorage.getItem('schoolAccess');
    if (schoolAccess == 'ClubOnly') {
  // Handle unauthorized access as needed (e.g., redirect)
  this.$router.push("/");
}
  },
};
</script>
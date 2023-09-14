<template>
  <div class="inner-section">
    <!-- header -->
    <!-- <UserNavHeader /> -->
    <!-- end section -->
    <!-- sidebar -->
    <UserSidebar />
    <!-- sidebar -->
    <!-- <UserPlannerDay /> -->
    <UserDailyPlanner />
  </div>
</template>
<script>
// import UserNavHeader from "~/components/user/UserNavHeader.vue";
import UserSidebar from "~/components/user/UserSidebar.vue";
import UserDailyPlanner from "~/components/user/UserDailyPlanner.vue";
export default {
  // middleware: "auth",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  mounted() {
    const schoolAccess = localStorage.getItem('schoolAccess');
    if (schoolAccess !== 'FullAccess') {
  // Handle unauthorized access as needed (e.g., redirect)
  this.$router.push("/");
}
  },
};
</script>
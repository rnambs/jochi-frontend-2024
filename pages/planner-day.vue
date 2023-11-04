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
    const user_type = localStorage.getItem('user_type');
    if (schoolAccess == 'ClubOnly' || user_type == 3 || user_type == 2) {
  // Handle unauthorized access as needed (e.g., redirect)
  this.$router.push("/");
}
  },
};
</script>
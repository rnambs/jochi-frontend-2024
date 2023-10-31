<template>
  <div class="inner-section">
    <!-- header -->
    <!-- <UserNavHeader /> -->
    <!-- end section -->
    <!-- sidebar -->
    <UserNewSidebar />
    <!-- sidebar -->
    <!-- <UserPlannerDay /> -->
    <UserTaskPlanner />
  </div>
</template>
<script>
// import UserNavHeader from "~/components/user/UserNavHeader.vue";
import UserNewSidebar from "~/components/user/UserNewSidebar.vue";
import UserTaskPlanner from "~/components/user/UserTaskPlanner.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/custom.css" }],
    };
  },
  mounted() {
    const user_type = localStorage.getItem('user_type');
    if (user_type == 2) {
  // Handle unauthorized access as needed (e.g., redirect)
    this.$router.push("/");
  }
  },
};
</script>
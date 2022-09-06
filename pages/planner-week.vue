<template>
  <div class="inner-section">
    <!-- header -->
    <!-- <UserNavHeader /> -->
    <!-- end section -->
    <!-- sidebar -->
    <UserSidebar />
    <!-- sidebar -->
    <UserPlannerWeek />
  </div>
</template>
<script>
// import UserNavHeader from "~/components/user/UserNavHeader.vue";
import UserSidebar from "~/components/user/UserSidebar.vue";
import UserPlannerWeek from "~/components/user/UserPlannerWeek.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
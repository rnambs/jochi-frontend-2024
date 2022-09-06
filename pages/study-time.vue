<template>
  <div class="inner-section">
    <!-- header -->
    <!-- <UserNavHeader /> -->
    <!-- end section -->
    <!-- sidebar -->
    <UserSidebar />
    <!-- sidebar -->
    <UserStudyTime />
  </div>
</template>
<script>
// import UserNavHeader from "~/components/user/UserNavHeader.vue";
import UserSidebar from "~/components/user/UserSidebar.vue";
import UserStudyTime from "~/components/user/UserStudyTime.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  mounted() {},
};
</script>
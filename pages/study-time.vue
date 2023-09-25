<template>
  <div class="inner-section">
    <!-- header -->
    <!-- <UserNavHeader /> -->
    <!-- end section -->
    <!-- sidebar -->
    <UserNewSidebar />
    <!-- sidebar -->
    <UserStudyTime />
  </div>
</template>
<script>
// import UserNavHeader from "~/components/user/UserNavHeader.vue";
import UserNewSidebar from "~/components/user/UserNewSidebar.vue";
import UserStudyTime from "~/components/user/UserStudyTime.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/custom.css" }],
    };
  },
  mounted() {},
};
</script>
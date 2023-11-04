<template>
  <div class="inner-section">
    <!-- header -->

    <div v-if="user_type == 3"><UserNewSidebar /></div>
    <div v-else><UserNewSidebarTeacher /></div>

    <!-- end section -->

    <!-- sidebar -->

    <!-- sidebar -->

    <UserClubFiles />
  </div>
</template>

<script>
import UserNewSidebar from "~/components/user/UserNewSidebar.vue";
import UserNewSidebarTeacher from "~/components/user/UserNewSidebarTeacher.vue";
import UserClubFiles from "~/components/user/UserClubFiles.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/custom.css" }],
    };
  },
  data() {
    return {
      user_type: "3",
    };
  },
  mounted() {
    this.user_type = localStorage.getItem("user_type");
  },
};
</script>
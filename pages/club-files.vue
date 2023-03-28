<template>
  <div class="inner-section">
    <!-- header -->

    <div v-if="user_type == 3"><UserSidebar /></div>
    <div v-else><UserSidebarTeacher /></div>

    <!-- end section -->

    <!-- sidebar -->

    <!-- sidebar -->

    <UserClubFiles />
  </div>
</template>

<script>
import UserSidebar from "~/components/user/UserSidebar.vue";
import UserSidebarTeacher from "~/components/user/UserSidebarTeacher.vue";
import UserClubFiles from "~/components/user/UserClubFiles.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
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
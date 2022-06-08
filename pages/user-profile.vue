<template>
  <div class="inner-section">
    <!-- header -->

    <!-- end section -->

    <!-- sidebar -->

    <div v-if="userType == '3'">
      <UserSidebar />
      <UserProfile />
    </div>

    <div v-if="userType == '2'">
      <UserTeacherSidebar />
      <UserProfile />
    </div>

    <!-- sidebar -->
  </div>
</template>
<script>
import UserSidebar from "~/components/user/UserSidebar.vue";
import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserProfile from "~/components/user/UserProfile.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  data() {
    return {
      userType: 1,
    };
  },
  mounted() {
    localStorage.getItem("user_type");
    this.userType = localStorage.getItem("user_type");
  },
};
</script>
<template>
  <div class="inner-section">
    <!-- sidebar -->
    <div v-if="userType == '3'">
      <UserSidebar />
    </div>

    <div v-if="userType == '2'">
      <UserTeacherSidebar />
    </div>
    <!-- sidebar -->
    <PrivacyPolicy />
  </div>
</template>
<script>
import UserSidebar from "~/components/user/UserSidebar.vue";
import UserTeacherSidebar from "~/components/user/UserTeacherSidebar.vue";
import PrivacyPolicy from "~/components/PrivacyPolicy.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  data() {
    return { userType: 1 };
  },
  mounted() {
    this.userType = localStorage.getItem("user_type");
  },
};
</script>
<template>
  <div class="inner-section">
    <!-- sidebar -->
    <UserSidebar />
    <!-- sidebar -->
    <UserViewAllMeeting />
  </div>
</template>
<script>
import UserSidebar from "~/components/user/UserSidebar.vue";
import UserViewAllMeeting from "~/components/user/UserViewAllMeeting.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
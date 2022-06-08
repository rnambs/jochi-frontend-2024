<template>
  <div class="inner-section">
    <!-- sidebar -->
    <UserSidebar />
    <!-- sidebar -->
    <UserPeerMeeting />
  </div>
</template>
<script>
import UserSidebar from "~/components/user/UserSidebar.vue";
import UserPeerMeeting from "~/components/user/UserPeerMeeting.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
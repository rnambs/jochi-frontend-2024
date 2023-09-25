<template>
  <div class="inner-section">
    <!-- sidebar -->
    <UserNewSidebar />
    <!-- sidebar -->
    <UserViewAllMeeting />
  </div>
</template>
<script>
import UserNewSidebar from "~/components/user/UserNewSidebar.vue";
import UserViewAllMeeting from "~/components/user/UserViewAllMeeting.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/custom.css" }],
    };
  },
};
</script>
<template>
  <div>
    <Sidebar />

    <div id="right-panel" class="right-panel">
      <NavHeader />
      <UserResetPassword />
      <div class="clearfix"></div>
      <NavFooter />
    </div>
  </div>
</template>
<script>
import NavHeader from "~/components/NavHeader.vue";
import Sidebar from "~/components/Sidebar.vue";
import UserResetPassword from "~/components/UserResetPassword.vue";
import NavFooter from "~/components/NavFooter.vue";
export default {
  
};
</script>
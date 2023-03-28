<template>
  <div>
    <Sidebar />

    <div id="right-panel" class="right-panel">
      <NavHeader />
      <no-ssr>
        <SigninLogs />
      </no-ssr>

      <div class="clearfix"></div>
      <NavFooter />
    </div>
  </div>
</template>
<script>
import NavHeader from "~/components/NavHeader.vue";
import Sidebar from "~/components/Sidebar.vue";
import SigninLogs from "~/components/SigninLogs.vue";

import NavFooter from "~/components/NavFooter.vue";
export default {
  // middleware: "authenticated",
};
</script>
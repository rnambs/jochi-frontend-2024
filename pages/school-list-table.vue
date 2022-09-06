<template>
  <div>
    <Sidebar />

    <div id="right-panel" class="right-panel">
      <NavHeader />
      <no-ssr>
        <SchoolListTable />
      </no-ssr>

      <div class="clearfix"></div>
      <NavFooter />
    </div>
  </div>
</template>
<script>
import NavHeader from "~/components/NavHeader.vue";
import Sidebar from "~/components/Sidebar.vue";
import SchoolListTable from "~/components/SchoolListTable.vue";

import NavFooter from "~/components/NavFooter.vue";
export default {
  // middleware: "authenticated",
};
</script>
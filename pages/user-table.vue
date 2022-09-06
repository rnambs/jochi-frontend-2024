<template>
  <div>
    <Sidebar />

    <div id="right-panel" class="right-panel">
      <NavHeader />
     <no-ssr>
      <UserTable/>
      </no-ssr>
      <div class="clearfix"></div>
      <NavFooter />
    </div>
  </div>
</template>
<script>
import NavHeader from "~/components/NavHeader.vue";
import Sidebar from "~/components/Sidebar.vue";
import UserTable from "~/components/UserTable.vue";
import  paginate  from '~/components/paginate.vue';
import NavFooter from "~/components/NavFooter.vue";
export default {
  
};
</script>
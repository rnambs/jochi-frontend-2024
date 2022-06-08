<template>
  <div class="inner-section">
    <UserTeacherSidebar />

    <!-- sidebar -->
    <UserTeacherDashboard />
  </div>
</template>
<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import UserSidebar from "~/components/user/UserTeacherSidebar.vue";
import UserTeacherDashboard from "~/components/user/UserTeacherDashboard.vue";
export default {
  // middleware: "authenticated",
  components: {
    FullCalendar,
    lottie,
  },
  data() {
    return {
      listAgenda: [],
      teachersList: [],
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev",
          center: "title",
          right: "next",
        },
        initialView: "dayGridMonth",
        unselectAuto: false,
        dayClick: this.clickedDay,
        dateClick: this.handleDateClick,
        selectable: true,
      },
    };
  },
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
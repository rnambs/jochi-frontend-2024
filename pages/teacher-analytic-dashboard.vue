<template>
    <div class="inner-section">
        <!-- sidebar -->
      <UserNewSidebarTeacher />
      <!-- dashboard -->
      <UserAnalyticTeacherDashboard />
    </div>
  </template>
  <script>
  import FullCalendar from "@fullcalendar/vue";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import lottie from "vue-lottie/src/lottie.vue";
  import * as animationData from "~/assets/animation.json";
  // import UserSidebar from "~/components/user/UserTeacherSidebar.vue";
  import UserNewSidebarTeacher from "~/components/user/UserNewSidebarTeacher.vue";
  
  import UserAnalyticTeacherDashboard from "~/components/user/UserAnalyticTeacherDashboard.vue";
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
        link: [{ rel: "stylesheet", href: "/css/custom.css" }],
      };
    },
    mounted() {
      const schoolAccess = localStorage.getItem('schoolAccess');
      if (schoolAccess == 'ClubOnly') {
    // Handle unauthorized access as needed (e.g., redirect)
    this.$router.push("/");
  }
    },
  };
  </script>
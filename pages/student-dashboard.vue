<template>
  <div class="inner-section">
    <!-- header -->

    <!-- end section -->

    <!-- sidebar -->

    <div><UserSidebar /></div>

    <!-- sidebar -->

    <UserStudentDashboard />
  </div>
</template>
<script>
import UserSidebar from "~/components/user/UserSidebar.vue";

import UserStudentDashboard from "~/components/user/UserStudentDashboard.vue";
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>
<!-- <script>
import StudentDashboard from "~/components/StudentDashboard.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "student-signup",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  computed: {
    ...mapState("redirectLogin", {
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },

  methods: {
    ...mapActions("redirectLogin", {
      logout: "logout",
    }),

    handleAnimation: function (anim) {
      this.anim = anim;
    },
    mounted() {},
    async logoutSession() {
      await this.logout({
        auth_token: localStorage.getItem("token").replace("Bearer ", ""),
      });
    },
  },
};
</script> -->

<style>
body {
  background-color: #ffffff !important;
}

.student-dashboard-main {
  min-height: 100vh;
  margin: 0;
}

.sd-sidebar {
  height: 100%;
}
.sd-sidebar,
.dashboard-main-content {
  min-height: calc(100vh - 1.8rem);
}

.sb-btn-icon {
  width: 30px;
}

.sb-btn-icon img {
  width: 100%;
}

.sb-btn-head {
  font-size: 17px;
  font-weight: 500;
}

.sb-expand-btn {
  cursor: pointer;
}

.sb-btn-content {
  padding-left: 4rem;
  font-size: 14px;
}

.display-picture-holder {
  width: 80px;
  height: 80px;
  background-color: #ffffff;
  border-radius: 50%;
  overflow: hidden;
}

.sb-user-name {
  font-size: 26px;
  color: #ff6d6d;
  font-weight: 700;
}

.sb-settings-btn {
  color: #b4b4b4;
  font-size: 13px;
  font-weight: 500;
}

.greet-with-name-sec .hello {
  font-size: 24px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 0.4rem;
  margin-left: 2px;
}

.greet-with-name-sec .name-section {
  font-size: 38px;
  font-weight: 700;
  color: #ff6d6d;
}

.faq-section {
  font-weight: 700;
  color: #000000;
}

.dashboard-text-content-section {
  top: 10px;
  left: 15px;
  right: 26%;
}

.dashboard-head {
  font-size: 32px;
  font-weight: 700;
  color: #000000;
}

.dashboard-text-content {
  font-size: 24px;
  font-weight: 700;
  color: #ff6d6d;
  line-height: 30px;
  font-style: italic;
}

.study-status-img-section {
  width: 150px;
  height: 150px;
  border: 10px solid #ff6d6d;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.study-status-img img {
  width: 80px;
  height: auto;
}

.study-status-progress {
  width: 148px;
  height: 148px;
  border: 8px solid #000000;
  border-radius: 50%;
  border-top-color: transparent;
  border-left-color: transparent;
}

.study-status-studied {
  font-weight: 600;
  color: #ff6d6d;
}

.arrow.right {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
@media (min-width:991.98px) {
  .h-lg-100{
    height: 100% !important;
  }
}

/* .fac-day {
  color: #ff6d6d;
  font-size: 12px;
} */

/* .fac-date {
  color: #ff6d6d;
  font-size: 50px;
  line-height: 41px;
} */

/* .faculty-meeting-text {
  font-size: 14px;
}

.faculty-name {
  font-size: 28px;
  font-weight: 700;
  color: #000000;
} */

/* .fa-time-section {
  font-size: 12px;
  padding: 2px 15px;
  background-color: #ff6d6d;
  width: fit-content;
  border-radius: 12px;
  color: #ffffff;
} */
</style>
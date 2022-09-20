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

/* Sidebar */

.header-section {
	 height: 6rem;
	 display: flex;
	 align-items: center;
	 justify-content: flex-end;
	 background: #f49196;
	 z-index: 9;
	 background: -moz-linear-gradient(-45deg, #f49196 0%, #ff4e71 100%);
	 background: -webkit-linear-gradient(-45deg, #f49196 0%, #ff4e71 100%);
	 background: linear-gradient(135deg, #f49196 0%, #ff4e71 100%);
	 filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f49196', endColorstr='#ff4e71',GradientType=1);
}
 @media (max-width: 510.98px) {
	 .header-section {
		 height: 4rem;
	}
}
 .header-section .menu-bar-icon {
	 position: absolute;
	 left: 1.5rem;
	 width: 24px;
	 height: 24px;
	 display: flex;
	 align-content: center;
	 justify-content: center;
	 flex-direction: column;
}
 @media (min-width: 510.98px) {
	 .header-section .menu-bar-icon {
		 display: none;
	}
}
 .header-section .menu-bar-icon i {
	 color: #f9f9f9;
	 font-size: 1.5rem;
	 font-weight: 400;
	 text-align: center;
}
 .header-section a {
	 text-decoration: none;
	 color: #f9f9f9;
}
 .header-section a .rounded-circle {
	 width: 80px;
	 height: 80px;
	 background-color: #f0f0f0;
	 object-fit: cover;
}
 @media (max-width: 992.98px) {
	 .header-section a .rounded-circle {
		 width: 40px;
		 height: 40px;
		 object-fit: cover;
	}
}
 .header-section .sidebar-section {
	 width: 15.625rem;
	 height: calc(100vh - 24px);
	 margin: 12px;
	 transition: all 0.3s;
	 top: 0;
	 left: 0;
	 z-index: 1031;
}
 @media (max-width: 1023.98px) {
	 .header-section .sidebar-section {
		 width: 14.625rem;
		 padding: 0.375rem 1.2rem;
	}
}
 @media (max-width: 991.98px) {
	 .header-section .sidebar-section {
		 width: 6.625rem;
	}
}
 .header-section .sidebar-section .menu-items {
	 position: relative;
	 overflow: hidden;
	 overflow-y: auto;
}
 @media (max-width: 991.98px) {
	 .header-section .sidebar-section .menu-items {
		 margin: auto 0px;
	}
}
 .header-section .sidebar-section .menu-items .font-icon {
	 color: #b4b4b4;
	 width: 2rem;
	 text-align: center;
}
 @media (max-width: 1024.98px) {
	 .header-section .sidebar-section .menu-items .font-icon {
		 width: 1.7rem;
	}
}
 @media (max-width: 991.98px) {
	 .header-section .sidebar-section .menu-items .font-icon {
		 width: 100%;
		 padding: 0px 14px;
	}
}
 .header-section .sidebar-section .menu-items .font-icon img {
	 width: 2rem;
}
 .header-section .sidebar-section .menu-items span {
	 color: #c5c0bd;
	 margin: auto;
	 font-size: 1.125rem;
}
 @media (max-width: 1024.98px) {
	 .header-section .sidebar-section .menu-items span {
		 font-size: 0.8rem;
	}
}
 @media (max-width: 991.98px) {
	 .header-section .sidebar-section .menu-items span {
		 display: none;
	}
}
 .header-section .sidebar-section .menu-items span.active, .header-section .sidebar-section .menu-items span:hover {
	 color: #431f1c;
}
 .header-section .sidebar-section .menu-items .accordion button.btn-link::after {
	 display: none;
}
 @media (max-width: 991.98px) {
	 .header-section .sidebar-section .menu-items .accordion button.btn-link {
		 background-color: rgba(255, 255, 255, 0.45);
		 display: block;
	}
	 .header-section .sidebar-section .menu-items .accordion button.btn-link::after {
		 display: none;
	}
}
 .header-section .sidebar-section .menu-items .accordion button.btn-link span {
	 color: #c5c0bd;
	 margin: auto;
	 font-size: 1.125rem;
}
 @media (max-width: 1024.98px) {
	 .header-section .sidebar-section .menu-items .accordion button.btn-link span {
		 font-size: 0.8rem;
	}
}
 @media (max-width: 991.98px) {
	 .header-section .sidebar-section .menu-items .accordion button.btn-link span {
		 display: none;
	}
}
 .header-section .sidebar-section .menu-items .accordion button.btn-link span.active {
	 color: #431f1c;
}
 .header-section .sidebar-section .menu-items .accordion button.btn-link .fa-chevron-right {
	 font-weight: 500;
	 font-size: 0.8rem;
	 transition: all 0.5s;
	 transform: rotate(90deg);
}
 @media (max-width: 1024.98px) {
	 .header-section .sidebar-section .menu-items .accordion button.btn-link .fa-chevron-right {
		 font-size: 0.7rem;
	}
}
 @media (max-width: 991.98px) {
	 .header-section .sidebar-section .menu-items .accordion button.btn-link .fa-chevron-right {
		 display: none;
	}
}
 .header-section .sidebar-section .menu-items .accordion button.btn-link.collapsed .fa-chevron-right {
	 font-weight: 500;
	 font-size: 0.8rem;
	 transition: all 0.5s;
	 transform: rotate(0deg);
}
 @media (max-width: 1024.98px) {
	 .header-section .sidebar-section .menu-items .accordion button.btn-link.collapsed .fa-chevron-right {
		 font-size: 0.7rem;
	}
}
 @media (max-width: 991.98px) {
	 .header-section .sidebar-section .menu-items .accordion button.btn-link.collapsed .fa-chevron-right {
		 display: none;
	}
}
 .header-section .sidebar-section .menu-items .accordion button.btn-link .bottum-btn {
	 display: flex;
	 flex: 1 0 auto;
	 border-radius: 4px;
}
 @media (max-width: 991.98px) {
	 .header-section .sidebar-section .menu-items .accordion button.btn-link .bottum-btn {
		 padding: 0px;
	}
}
 .header-section .sidebar-section .menu-items .accordion button.btn-link .bottum-btn.nuxt-link-exact-active.nuxt-link-active.bottum-btn {
	 background-color: rgba(255, 255, 255, 0.45);
}
 .header-section .sidebar-section .menu-items .card-body {
	 background-color: transparent;
}
 .header-section .sidebar-section .menu-items .card-body .inner-custom-list {
	 list-style-type: none;
	 padding: 0rem 0.6rem;
}
 @media (max-width: 991.98px) {
	 .header-section .sidebar-section .menu-items .card-body .inner-custom-list {
		 padding: 0 !important;
		 margin: 3px -10px !important;
		 text-align: center;
	}
}
 .header-section .sidebar-section .menu-items .card-body .inner-custom-list li {
	 padding: 0.2rem;
	 border-radius: 0.3rem;
}
 @media (max-width: 991.98px) {
	 .header-section .sidebar-section .menu-items .card-body .inner-custom-list li {
		 padding: inherit;
	}
}
 .header-section .sidebar-section .menu-items .card-body .inner-custom-list li a {
	 text-decoration: none;
	 color: #b4b4b4;
	 font-size: 0.9rem;
	 padding: 0.5rem;
}
 @media (max-width: 991.98px) {
	 .header-section .sidebar-section .menu-items .card-body .inner-custom-list li a {
		 padding: inherit;
	}
}
 .header-section .sidebar-section .menu-items .card-body .inner-custom-list li a.nav-link.nuxt-link-exact-active.nuxt-link-active {
	 padding: 0.5rem;
	 border-radius: 0.3rem;
	 color: #431f1c;
}
 @media (max-width: 991.98px) {
	 .header-section .sidebar-section .menu-items .card-body .inner-custom-list li a.nav-link.nuxt-link-exact-active.nuxt-link-active {
		 padding: inherit;
	}
}
 .header-section .sidebar-section .menu-items .card-body .inner-custom-list li a:hover, .header-section .sidebar-section .menu-items .card-body .inner-custom-list li a .active {
	 padding: 0.5rem;
	 border-radius: 0.3rem;
	 color: #431f1c;
}
 @media (max-width: 991.98px) {
	 .header-section .sidebar-section .menu-items .card-body .inner-custom-list li a:hover, .header-section .sidebar-section .menu-items .card-body .inner-custom-list li a .active {
		 padding: inherit;
	}
}
 @media (max-width: 991.98px) {
	 .header-section .sidebar-section .menu-items .card-body .inner-custom-list li a:hover {
		 background-color: unset;
	}
}
 .header-section .sidebar-section .menu-items .custom-list {
	 list-style-type: none;
}
 .header-section .sidebar-section .menu-items .custom-list .menu-list {
	 margin-bottom: 0.2rem;
	 border-radius: 0.3rem;
}
 @media (min-width: 991.98px) {
	 .header-section .sidebar-section .menu-items .custom-list .menu-list {
		 padding: 10px 0px;
	}
}
 .header-section .sidebar-opened {
	 left: 0;
}
 


/* end sidebar */


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

/* .greet-with-name-sec .name-section {
  font-size: 38px;
  font-weight: 700;
  color: #ff6d6d;
} */

.faq-section {
  font-weight: 700;
  color: #431F1C !important;
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
@media (max-width:764.98px) {
  .dashboard-text-content{
    font-size: 18px;
    line-height: 22px;
  }
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


/* Dashboard */

.dmc-head .greet-with-name-sec p.text-24{
  color: #000000;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.75rem;
}
.dmc-head .greet-with-name-sec p.text-40{
  color: #FF6D6D;
  font-weight: 700;
  font-size: 2.5rem;
  line-height: 2.75rem;
}



.calendar-dashboard .fc-header-toolbar.fc-toolbar.fc-toolbar-ltr {
	 justify-content: start;
	 align-items: baseline;
}
.calendar-dashboard .fc-header-toolbar.fc-toolbar.fc-toolbar-ltr h2.fc-toolbar-title {
	 font-size: 24px;
	 font-weight: 600;
}
 @media (max-width: 575px) {
  .calendar-dashboard .fc-header-toolbar.fc-toolbar.fc-toolbar-ltr h2.fc-toolbar-title {
		 left: 32px;
		 top: 18px;
	}
}
.calendar-dashboard .fc-header-toolbar.fc-toolbar.fc-toolbar-ltr .fc-toolbar-chunk:first-child {
	 order: 1;
	 margin-left: 0.5rem;
}
.calendar-dashboard .fc-header-toolbar.fc-toolbar.fc-toolbar-ltr .fc-toolbar-chunk:nth-child(2) {
	 order: 0;
}
.calendar-dashboard .fc-header-toolbar.fc-toolbar.fc-toolbar-ltr .fc-toolbar-chunk:nth-child(3) {
	 order: 2;
	 margin-left: 0.5rem;
}
.calendar-dashboard .fc .fc-button .fc-icon {
	 color: #a28cf6;
	 font-size: 1em;
	 line-height: 12px;
	 margin: 0;
}
.calendar-dashboard .fc-toolbar-chunk .fc-next-button.fc-button, .fc-toolbar-chunk .fc-prev-button.fc-button {
	 background: none;
	 border: 1px solid #f0deeb;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 padding: 8px;
	 border-radius: 10px;
}
.calendar-dashboard .fc .fc-toolbar.fc-header-toolbar{
    margin-bottom: 1rem;
}

/* calendar body */

.calendar-dashboard .fc-view-harness.fc-view-harness-active {
	 height: 29vh !important;
	 min-height: 276px;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid {
	 border: none;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tr.fc-scrollgrid-section.fc-scrollgrid-section-header th {
	 background: rgba(138, 116, 225, 0.26);
	 backdrop-filter: blur(9px);
	 border-right: none;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tr.fc-scrollgrid-section.fc-scrollgrid-section-header th .fc-scroller-harness .fc-scroller {
	 overflow: unset !important;
}
 .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tr.fc-scrollgrid-section.fc-scrollgrid-section-header th .fc-scroller-harness table.fc-col-header {
	 border-bottom: hidden;
	 width: 100% !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tr.fc-scrollgrid-section.fc-scrollgrid-section-header th .fc-scroller-harness table.fc-col-header th {
	 background: unset;
	 backdrop-filter: blur(0px);
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tr.fc-scrollgrid-section.fc-scrollgrid-section-header th .fc-scroller-harness table.fc-col-header th:nth-child(7) {
	 border-right: none;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tr.fc-scrollgrid-section.fc-scrollgrid-section-header th .fc-scroller-harness table.fc-col-header .fc-scroller {
	 border-right: hidden;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tr.fc-scrollgrid-section.fc-scrollgrid-section-header th .fc-scroller-harness table.fc-col-header a.fc-col-header-cell-cushion {
	 color: #8a74e1;
	 font-size: 0.8rem;
	 font-weight: 600;
}
 @media (max-width: 1199.98px) {
	.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tr.fc-scrollgrid-section.fc-scrollgrid-section-header th .fc-scroller-harness table.fc-col-header a.fc-col-header-cell-cushion {
		 font-size: 0.65rem;
	}
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid thead, .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody {
	 color: #b4b4b4;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid thead td, .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody td {
	 border: none;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid thead td .fc-scroller, .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody td .fc-scroller {
	 overflow: hidden !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid thead td th.fc-col-header-cell.fc-day, .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody td th.fc-col-header-cell.fc-day {
	 font-weight: 500;
	 border-bottom: 1px solid #f5e4f0 !important;
	 border-right: 1px solid #f5e4f0 !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid thead td th.fc-col-header-cell.fc-day:last-child, .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody td th.fc-col-header-cell.fc-day:last-child {
	 border-right: none !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td {
	 border-top: 1px solid #f5e4f0;
	 border-right: 1px solid #f5e4f0 !important;
	 border-bottom: none !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td:last-child {
	 border-right: none !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td .fc-daygrid-body.fc-daygrid-body-unbalanced {
	 width: 100% !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td table.fc-scrollgrid-sync-table {
	 width: 100% !important;
	 height: 133px !important;
	 display: inline-table !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td .fc-scroller.fc-scroller-liquid-absolute {
	 overflow: hidden !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td .fc-daygrid-day-frame.fc-scrollgrid-sync-inner {
	 cursor: pointer;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td .fc-daygrid-day-frame.fc-scrollgrid-sync-inner .fc-daygrid-day-number {
	 color: #7e7ea0 !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td .fc-daygrid-day-frame.fc-scrollgrid-sync-inner:hover {
	 background-color: #f5e4f0 !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td .fc-daygrid-day-frame.fc-scrollgrid-sync-inner:hover .fc-daygrid-day-number {
	 color: #7e7ea0 !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td .fc-daygrid-day-frame.fc-scrollgrid-sync-inner .fc-daygrid-day-events {
	 display: none;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td a.fc-daygrid-event.fc-daygrid-block-event.fc-h-event.fc-event.fc-event-start.fc-event-end.fc-event-past {
	 background-color: #b4b4b4;
	 border-color: #b4b4b4;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td a.fc-daygrid-event.fc-daygrid-block-event.fc-h-event.fc-event.fc-event-start.fc-event-end.fc-event-past .fc-event-main {
	 color: #f0f0f0 !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td.fc-daygrid-day.fc-day {
	 background-color: unset !important;
	 background: unset !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td.fc-daygrid-day.fc-day.fc-day-today {
	 background-color: #ff6d6d !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td.fc-daygrid-day.fc-day.fc-day-today .fc-daygrid-day-frame.fc-scrollgrid-sync-inner .fc-daygrid-day-number {
	 color: #fff !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr td.fc-daygrid-day.fc-day.fc-day-today .fc-daygrid-day-frame.fc-scrollgrid-sync-inner:hover .fc-daygrid-day-number {
	 color: #7e7ea0 !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr .fc-highlight {
	 background: #ff6d6d !important;
}
.calendar-dashboard .fc-view-harness.fc-view-harness-active .fc-daygrid.fc-dayGridMonth-view.fc-view table.fc-scrollgrid.fc-scrollgrid-liquid tbody tr .fc-highlight .fc-daygrid-day-number {
	 color: #ff6d6d !important;
}
 
 /* Planner common month */

.calendar-dashboard .fc .fc-scrollgrid {
	 border-radius: 12px;
	 overflow: hidden;
}
.calendar-dashboard .fc .fc-day-disabled {
	 background: none;
}
.calendar-dashboard .fc .fc-daygrid-day-number {
	 color: #8c8bac !important;
	 font-weight: 600;
}
.calendar-dashboard .fc-theme-standard th {
	 border-bottom: none;
	 border-right: none;
	 border-left: none;
	 background-color: #f0deeb;
	 padding: 5px;
}
.calendar-dashboard .fc-theme-standard th .fc-col-header-cell-cushion {
	 color: #a995ef;
}
.calendar-dashboard .fc-theme-standard td {
	 border-color: #e9d7ee;
}
 

/* assignment list */
.assignment-list h4.color-black{
  color: #000000;
  font-weight: 600;
}
.assignment-list .jochi-sub-components-light-bg{
    background-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0px 0px 32px -4px rgb(0 1 0 / 9%);
    border-radius: 22px;
}
.assignment-list .jochi-sub-components-light-bg p.text-16{
  color: #431F1C !important;
  font-weight: 600;
  word-break: break-all;
  font-size: 1rem;
  line-height: 1.5rem;
}
.assignment-list .jochi-sub-components-light-bg p.text-14{
  font-size: 0.875rem;
  line-height: 1rem;
  color: #878787;
  font-weight: 400;
}

/* End dashboard */
</style>
<template>
  <div class="main-section">
    <!-- <div class="row"> -->
    <!-- <div class="col-2">
          <div class="sd-sidebar jochi-components-light-bg p-4">
            <div class="sb-head-section">
              <div class="display-picture-holder mb-3">
                <img src="" alt="" />
              </div>
              <p class="sb-user-name mb-1">Hannah Scott</p>
              <a href="#" class="sb-settings-btn">Settings</a>
            </div>
            <div class="sb-buttons-section">
              <div class="sb-expand-btn my-3">
                <div class="sb-btn-head d-flex align-items-center">
                  <div class="sb-btn-icon mr-3">
                    <img
                      src="~/static/image/Calendar.png"
                      alt=""
                      class="planner"
                    />
                  </div>
                  Planner
                </div>
                <div class="sb-btn-content">
                  <div class="sb-btn">Daily</div>
                  <div class="sb-btn">Weekly</div>
                  <div class="sb-btn">Monthly</div>
                </div>
              </div>
              <div class="sb-expand-btn my-3">
                <div class="sb-btn-head d-flex align-items-center">
                  <div class="sb-btn-icon mr-3">
                    <img
                      src="~/static/image/Call.png"
                      alt=""
                      class="meetings"
                    />
                  </div>
                  Meetings
                </div>
              </div>
              <div class="sb-expand-btn my-3">
                <div class="sb-btn-head d-flex align-items-center">
                  <div class="sb-btn-icon mr-3">
                    <img
                      src="~/static/image/Football.png"
                      alt=""
                      class="teams-clubs"
                    />
                  </div>
                  Teams & Clubs
                </div>
              </div>
              <div class="sb-expand-btn my-3">
                <div class="sb-btn-head d-flex align-items-center">
                  <div class="sb-btn-icon mr-3">
                    <img
                      src="~/static/image/Lot_of_book.png"
                      alt=""
                      class="study-room"
                    />
                  </div>
                  Study Room
                </div>
              </div>
            </div>
          </div>
        </div> -->
    <!-- <div class="col-10"> -->
    <div
      class="
        jochi-components-light-bg
        p-4
        custom-margin-for-main-section custom-full-height
        d-flex
        flex-column
        position-realtive
        custom-overflow
      "
    >
      <div class="dmc-head d-flex justify-content-between align-items-start">
        <div class="greet-with-name-sec">
          <p class="text-24 color-black font-semi-bold mb-2">Hello,</p>
          <p class="name-section mb-4">{{ firstName }}</p>
        </div>
        <div class="faq-section d-flex align-items-center">
          <div class="faq-btn color-dark font-semi-bold mr-4">FAQs</div>
          <div class="privacy-btn mr-4 color-dark font-semi-bold">
            Privacy Policy
          </div>
          <!-- <div @click="logoutSession" class="privacy-btn mr-4">Logout</div> -->
        </div>
      </div>
      <div class="d-flex flex-column h-40 flex-fill">
        <div class="row h-100">
          <div class="col-xl-8">
            <div class="d-flex flex-column">
              <div
                class="jochi-sub-components-light-bg p-4 pr-1 pb-1 flex-fill"
              >
                <div class="row position-relative">
                  <div class="col-7"></div>
                  <div class="dashboard-text-content-section position-absolute">
                    <p class="dashboard-head">Dashboard</p>
                    <p v-if="quoteMessage" class="dashboard-text-content">
                      “{{ quoteMessage }}”<br />

                      <!-- — Malcolm X -->
                    </p>
                  </div>
                  <div class="col-5 p-0">
                    <img
                      src="~/static/image/dashboard_img.png"
                      alt=""
                      class="img-fluid mt-4"
                    />
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column h-40 flex-fill">
                <div class="row mt-1">
                  <div class="col-12 col-lg-4">
                    <div class="jochi-sub-components-light-bg">
                      <div
                        class="
                          study-status-card
                          d-flex
                          flex-column
                          justify-content-center
                          align-items-center
                          h-100
                        "
                      >
                        <div
                          class="
                            study-status-img-section
                            position-relative
                            my-4
                          "
                        >
                          <div class="study-status-img">
                            <img src="~/static/image/alarm.png" alt="" />
                          </div>
                          <div
                            class="study-status-progress position-absolute"
                          ></div>
                        </div>
                        <!-- <vue-ellipse-progress
                          :progress="progress"
                          :angle="-90"
                          color="#1565C0"
                          emptyColor="#BBDEFB"
                          :size="180"
                          :thickness="10"
                          emptyThickness="15%"
                          fontColor="black"
                          dot="10 white"
                          ><span>dkjsfajh</span>
                        </vue-ellipse-progress> -->
                        <div class="study-status-text text-center mb-2">
                          <p class="study-status-studied mb-1">
                            {{ duration }} Minutes Studied Today
                          </p>
                          <p class="study-status-time-left">
                            {{ durationRemaining }} Minutes Left
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-lg-8 px-0">
                    <div
                      class="
                        d-flex
                        flex-column
                        hidden-scroll
                        faculty-availability-card-outer
                        h-100
                        p-3
                        py-4
                      "
                    >
                      <div class="row">
                        <div class="col-12 faculty-availability-card mb-2">
                          <div class="row">
                            <div class="col-3 py-0">
                              <div
                                class="
                                  jochi-sub-components-light-bg
                                  fa-card-date
                                  d-flex
                                  flex-column
                                  align-items-center
                                  justify-content-center
                                  w-100
                                  p-3
                                "
                              >
                                <p class="fac-day mb-1">MON</p>
                                <p class="fac-date mb-0">11</p>
                              </div>
                            </div>
                            <div class="col-9">
                              <div
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                                @click="openMeetingDetail"
                              >
                                <div class="fa-meeting-faculty-details">
                                  <p class="mb-1 faculty-meeting-text">
                                    Faculty Meeting
                                  </p>
                                  <p class="mb-1 faculty-name">Mr. Ronald</p>
                                  <div class="fa-time-section">6:00 pm</div>
                                </div>
                                <i class="arrow right"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 faculty-availability-card mb-2">
                          <div class="row">
                            <div class="col-3 py-0">
                              <div
                                class="
                                  jochi-sub-components-light-bg
                                  fa-card-date
                                  d-flex
                                  flex-column
                                  align-items-center
                                  justify-content-center
                                  w-100
                                  p-3
                                "
                              >
                                <p class="fac-day mb-1">MON</p>
                                <p class="fac-date mb-0">11</p>
                              </div>
                            </div>
                            <div class="col-9">
                              <div
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="fa-meeting-faculty-details">
                                  <p class="mb-1 faculty-meeting-text">
                                    Faculty Meeting
                                  </p>
                                  <p class="mb-1 faculty-name">Mr. Ronald</p>
                                  <div class="fa-time-section">6:00 pm</div>
                                </div>
                                <i class="arrow right"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 faculty-availability-card mb-2">
                          <div class="row">
                            <div class="col-3 py-0">
                              <div
                                class="
                                  jochi-sub-components-light-bg
                                  fa-card-date
                                  d-flex
                                  flex-column
                                  align-items-center
                                  justify-content-center
                                  w-100
                                  p-3
                                "
                              >
                                <p class="fac-day mb-1">MON</p>
                                <p class="fac-date mb-0">11</p>
                              </div>
                            </div>
                            <div class="col-9">
                              <div
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="fa-meeting-faculty-details">
                                  <p class="mb-1 faculty-meeting-text">
                                    Faculty Meeting
                                  </p>
                                  <p class="mb-1 faculty-name">Mr. Ronald</p>
                                  <div class="fa-time-section">6:00 pm</div>
                                </div>
                                <i class="arrow right"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 faculty-availability-card mb-2">
                          <div class="row">
                            <div class="col-3 py-0">
                              <div
                                class="
                                  jochi-sub-components-light-bg
                                  fa-card-date
                                  d-flex
                                  flex-column
                                  align-items-center
                                  justify-content-center
                                  w-100
                                  p-3
                                "
                              >
                                <p class="fac-day mb-1">MON</p>
                                <p class="fac-date mb-0">11</p>
                              </div>
                            </div>
                            <div class="col-9">
                              <div
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="fa-meeting-faculty-details">
                                  <p class="mb-1 faculty-meeting-text">
                                    Faculty Meeting
                                  </p>
                                  <p class="mb-1 faculty-name">Mr. Ronald</p>
                                  <div class="fa-time-section">6:00 pm</div>
                                </div>
                                <i class="arrow right"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 faculty-availability-card mb-2">
                          <div class="row">
                            <div class="col-3 py-0">
                              <div
                                class="
                                  jochi-sub-components-light-bg
                                  fa-card-date
                                  d-flex
                                  flex-column
                                  align-items-center
                                  justify-content-center
                                  w-100
                                  p-3
                                "
                              >
                                <p class="fac-day mb-1">MON</p>
                                <p class="fac-date mb-0">11</p>
                              </div>
                            </div>
                            <div class="col-9">
                              <div
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="fa-meeting-faculty-details">
                                  <p class="mb-1 faculty-meeting-text">
                                    Faculty Meeting
                                  </p>
                                  <p class="mb-1 faculty-name">Mr. Ronald</p>
                                  <div class="fa-time-section">6:00 pm</div>
                                </div>
                                <i class="arrow right"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4">
            <div class="jochi-sub-components-light-bg p-4 pr-1 pb-1 h-100">
              <div>
                <FullCalendar ref="fullCalendar" :options="calendarOptions" />
              </div>
              <h4 class="color-black font-semi-bold">All Assignments</h4>
              <div class="d-flex flex-column">
                <div class="jochi-sub-components-light-bg p-4 pr-1 pb-1 mb-3">
                  .
                </div>
                <div class="jochi-sub-components-light-bg p-4 pr-1 pb-1 mb-3">
                  .
                </div>
                <div class="jochi-sub-components-light-bg p-4 pr-1 pb-1 mb-3">
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>

    <!-- meeing detil pop up -->

    <div
      class="modal fade"
      id="MeetingModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Meeting Details
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body px-4">
            <table class="table-modal w-100">
              <tr>
                <td class="tmodal-data mb-2 text-nowrap">Meeting With</td>
                <td class="tmodal-data">
                  <p class="mb-0 tdata-overflow">
                    <span class="px-2">:</span>
                    <span>
                      {{ popTitle }}
                    </span>
                  </p>
                </td>
              </tr>

              <tr>
                <td class="tmodal-data text-nowrap">Meeting Type</td>
                <td class="tmodal-data">
                  <span class="px-2">:</span>
                  <span>
                    {{ popMeeting }}
                  </span>
                </td>
              </tr>

              <tr>
                <td class="tmodal-data">Date</td>
                <td class="tmodal-data">
                  <span class="px-2">:</span>
                  {{ popDate }}
                </td>
              </tr>

              <tr>
                <td class="tmodal-data">Time</td>
                <td class="tmodal-data">
                  <span class="px-2">:</span>
                  {{ popTime }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- meeting detail pop up end -->

    <!-- </div> -->
  </div>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
// import Multiselect from 'vue-multiselect'
import { mapState, mapActions } from "vuex";

import FullCalendar, { Calendar } from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import { VueEllipseProgress } from "vue-ellipse-progress";

var eventList = [];

export default {
  name: "UserStudentDashBoard",
  components: {
    lottie,
    FullCalendar,
    // VueEllipseProgress,
  },
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  data() {
    return {
      data: [
        {
          progress: 50, // required for each circle
          color: "red", // will overwrite global progress color
          // other options will be merged with global
        },
      ],
      progress: 50,
      calendarApi: Calendar,
      calendarOptions: {
        displayEventTime: false,
        customButtons: {
          prev: {
            click: this.goPrev.bind(this),
          },
          next: {
            click: this.goNext.bind(this),
          },
        },
        allDaySlot: true,
        minTime: 0,
        maxTime: 24,
        plugins: [dayGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev",
          center: "title",
          right: "next",
        },
        initialView: "dayGridMonth",
        unselectAuto: false,
        selectable: true,
        datesSet: this.handleMonthChange,
        events: eventList,
        eventClick: this.eventClicked,
        slotDuration: "00:15:00",
        slotEventOverlap: false,
        eventMaxStack: true, // for all non-TimeGrid views
        views: {
          timeGrid: {
            dayMaxEventRows: 4, // adjust to 6 only for timeGridWeek/timeGridDay
          },
        },
      },
      firstName: "",
      hours: 0,
      minutes: 0,
      duration: 0,
      durationRemaining: 0,
      dailyTimerId: 0,
    };
  },
  computed: {
    ...mapState("quotedMessage", {
      quoteMessage: (state) => state.quoteMessage,
    }),
    ...mapState("userStudyAnalytics", {
      goal: (state) => state.goal,
    }),
  },
  mounted() {
    this.calendarApi = this.$refs.fullCalendar.getApi();
    this.ShowQuotedMessage();
    this.firstName = localStorage.getItem("first_name");
    this.getConfiguredGoal();
  },
  methods: {
    ...mapActions("quotedMessage", {
      showQuotedMessage: "showQuotedMessage",
    }),
    ...mapActions("userStudyAnalytics", {
      getGoal: "getGoal",
    }),
    goPrev() {
      this.calendarApi.prev(); // call a method on the Calendar object
      // this.GetDailyPlanner();
    },

    goNext() {
      this.calendarApi.next();
      // this.GetDailyPlanner();
    },

    async ShowQuotedMessage() {
      this.loading = true;
      await this.showQuotedMessage({
        user_id: localStorage.getItem("id"),
      });
      this.loading = false;
      if (this.viewed == 1) {
        this.isShowQuote = false;
      } else {
        this.isShowQuote = true;
      }
    },
    async getConfiguredGoal() {
      await this.getGoal();
      this.dailyTimerId = this.goal.id ? this.goal.id : 0;
      this.duration = !isNaN(Number(this.goal.total_duration_covered))
        ? Number(this.goal.total_duration_covered)
        : 0;
      this.durationRemaining =
        !isNaN(Number(this.goal.duration)) &&
        !isNaN(Number(this.goal.total_duration_covered))
          ? Number(this.goal.duration) -
            Number(this.goal.total_duration_covered)
          : 0;
      let goal =
        Number(this.goal.duration) > 0 ? Number(this.goal.duration) : 0;
      var h = Math.floor(goal / 60);
      var m = goal % 60;

      this.hours = h;
      this.minutes = m;
    },
    openMeetingDetail() {
      $("#MeetingModal").modal({ backdrop: true });
    },
  },
};
</script>

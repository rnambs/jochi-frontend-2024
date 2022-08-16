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
          <div class="faq-btn color-dark font-semi-bold mr-4">
            <a style="color: #000000" href="https://www.jochi.info/faqs"
              >FAQs</a
            >
          </div>
          <div class="privacy-btn mr-4 color-dark font-semi-bold">
            <nuxt-link
              style="color: #000000"
              to="/privacy-policy"
              class="bottum-btn"
            >
              Privacy Policy
            </nuxt-link>
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
                        <progress-bar :options="options" :value="value" />
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
                      <div
                        v-for="(list, index) in slot_date"
                        :key="index"
                        class="row"
                      >
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
                                <p class="fac-day mb-1">{{ list.date_day }}</p>
                                <p class="fac-date mb-0">
                                  {{ list.date_number }}
                                </p>
                              </div>
                            </div>
                            <div class="col-9">
                              <div
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                                @click="onCardClick(list)"
                              >
                                <div class="fa-meeting-faculty-details">
                                  <p class="mb-1 faculty-meeting-text">
                                    {{
                                      list.type == "Teacher"
                                        ? "Faculty Meeting"
                                        : "Peer Meeting"
                                    }}
                                  </p>
                                  <p class="mb-1 faculty-name">
                                    {{ list.new_title }}
                                  </p>
                                  <div class="fa-time-section">
                                    {{ list.start_time }}
                                  </div>
                                </div>
                                <i class="arrow right"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="row">
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
                      </div> -->
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
              <h4 class="color-black font-semi-bold">Assignments List</h4>
              <div class="d-flex flex-column">
                <div
                  v-for="item in plannerList"
                  :key="item.id"
                  class="jochi-sub-components-light-bg p-4 pr-1 pb-1 mb-3"
                >
                  {{ item.task }}
                  {{ item.due_date }}
                  {{ item.due_time }}
                </div>
                <!-- <div class="jochi-sub-components-light-bg p-4 pr-1 pb-1 mb-3">
                  .
                </div>
                <div class="jochi-sub-components-light-bg p-4 pr-1 pb-1 mb-3">
                  .
                </div> -->
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
      id="meetingDetailModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="meetingDetailModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content px-4">
          <div class="modal-header">
            <h5 class="modal-title" id="meetingDetailModalLongTitle">
              Meeting Details
            </h5>
            <!-- <button type="button" class="close">
              <span aria-hidden="true">Edit</span>
            </button> -->
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action="">
              <table class="w-100 table-modal custom-row-table">
                <tr>
                  <td class="tmodal-data">Type</td>
                  <td class="tmodal-data">
                    <span class="pr-2"></span>
                    {{ meetingDetail.type }}
                  </td>
                </tr>

                <tr>
                  <td class="tmodal-data">With</td>
                  <td class="tmodal-data d-flex align-items-center flex-wrap">
                    <span class="pr-2"></span>
                    <span>{{ meetingDetail.new_title }} </span>
                    <!-- <div
                      class="invited-members-status mr-2"
                      v-else
                      v-for="(item, index) of invitedMembers"
                      :key="index"
                    >
                      <span
                        v-if="item.student_id != studentId"
                        :class="
                          item.student_id == item.teacher_id
                            ? 'accepted-meeting i-member-status'
                            : item.meeting_request == 0
                            ? 'pending-meeting i-member-status'
                            : item.meeting_request == 1
                            ? 'accepted-meeting i-member-status'
                            : item.meeting_request == 2
                            ? 'rejected-meeting i-member-status'
                            : ''
                        "
                        >{{ item.name }}</span
                      >
                    </div> -->
                  </td>
                </tr>

                <tr>
                  <td class="tmodal-data">Date</td>
                  <td class="tmodal-data">
                    <div
                      class="
                        mb-0
                        col-12 col-md-8 col-lg-7
                        d-flex
                        align-items-center
                        form-row
                        py-0
                      "
                    >
                      <span class="pr-2"></span>

                      {{ meetingDetail.dateFormat }}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td class="tmodal-data">Time</td>
                  <td class="tmodal-data">
                    <span class="pr-2"></span>
                    {{ meetingDetail.start_time }}
                  </td>
                </tr>
                <tr>
                  <td class="tmodal-data text-nowrap">Meeting Name</td>
                  <td class="tmodal-data">
                    <p
                      class="
                        mb-0
                        col-12 col-md-8 col-lg-7
                        d-flex
                        align-items-center
                        form-row
                        py-0
                      "
                    >
                      <span class="pr-2"></span>

                      {{ meetingDetail.meeting_name }}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="tmodal-data text-nowrap">Description</td>
                  <td class="tmodal-data">
                    <p
                      class="
                        mb-0
                        col-12 col-md-8 col-lg-7
                        d-flex
                        align-items-center
                        form-row
                        py-0
                      "
                    >
                      <span class="pr-2"></span>

                      {{ meetingDetail.meeting_description }}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="tmodal-data text-nowrap">Type of Meeting</td>
                  <td class="tmodal-data">
                    <p
                      class="
                        mb-0
                        col-12 col-md-8 col-lg-7
                        d-flex
                        align-items-center
                        form-row
                        py-0
                      "
                    >
                      <span class="pr-2"></span>
                      {{ meetingDetail.conversation_type }}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="tmodal-data text-nowrap">
                    {{
                      meetingDetail.conversation_type == "Video Conference"
                        ? "Meeting Link"
                        : "Meeting Location"
                    }}
                  </td>
                  <td class="tmodal-data">
                    <p
                      class="
                        mb-0
                        col-12 col-md-8 col-lg-7
                        d-flex
                        align-items-center
                        form-row
                        py-0
                      "
                    >
                      <span class="pr-2"> </span>

                      {{
                        meetingDetail.conversation_type == "Video Conference"
                          ? meetingDetail.meeting_link
                          : meetingDetail.meeting_location
                      }}
                    </p>
                  </td>
                </tr>
              </table>
            </form>
          </div>
          <div class="modal-footer">
            <!-- <div
              v-if="
                detailType == 'Peer' &&
                detailMeetingRequest == 0 &&
                detailTeacherId != studentId
              "
              class="row text-center justify-content-end p-3"
            >
              <button
                type="button"
                class="btn btn-secondary py-1 px-4 rounded-pill mr-2"
                data-dismiss="modal"
                @click="acceptOrReject(2)"
              >
                Reject
              </button>
              <button
                type="button"
                class="btn btn-primary py-1 px-4 rounded-pill"
                data-dismiss="modal"
                @click="acceptOrReject(1)"
              >
                Accept
              </button>
            </div>
            <div
              v-if="
                (detailTeacherId == studentId || detailType == 'Teacher') &&
                detailMeetingRequest == 1
              "
              class="row text-center justify-content-end p-3"
            >
              <button
                type="button"
                class="btn btn-secondary py-1 px-4 rounded-pill mr-2"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary py-1 px-4 rounded-pill"
                @click="updateDetails()"
              >
                Update
              </button>
            </div> -->
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
var Peerarray = [];
var Teacherarray = [];
var Allarray = [];
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
      slot_date: [],
      progress: 50,
      calendarApi: Calendar,
      calendarOptions: {
        showNonCurrentDates: false,
        plugins: [dayGridPlugin, interactionPlugin],
        // headerToolbar: {
        //   left: "prev",
        //   center: "title",
        //   right: "next",
        // },
        customButtons: {
          prev: {
            icon: "chevron-left",
            click: this.goPrev.bind(this),
          },
          next: {
            icon: "chevron-right",
            click: this.goNext.bind(this),
          },
        },
        datesRender: this.handleDatesRender,
        initialView: "dayGridMonth",
        unselectAuto: false,
        selectable: true,
        events: eventList,
        eventClick: this.eventClicked,
        datesSet: this.handleMonthChange,
        dayMaxEventRows: true, // for all non-TimeGrid views
        views: {
          dayGrid: {
            dayMaxEventRows: 4, // adjust to 6 only for timeGridWeek/timeGridDay
            //
            // },
          },
        },
      },
      firstName: "",
      hours: 0,
      minutes: 0,
      duration: 0,
      durationRemaining: 0,
      dailyTimerId: 0,
      meetingDetail: {},
      options: {
        text: {
          color: "#FFFFFF",
          shadowEnable: true,
          shadowColor: "#000000",
          fontSize: 14,
          fontFamily: "Helvetica",
          dynamicPosition: false,
          hideText: false,
        },
        progress: {
          color: "#ff6d6d",
          backgroundColor: "#000000",
          inverted: false,
        },
        layout: {
          height: 35,
          width: 140,
          verticalTextAlign: 61,
          horizontalTextAlign: 43,
          zeroOffset: 0,
          strokeWidth: 30,
          progressPadding: 0,
          type: "circle",
        },
      },
      value: 0,
    };
  },
  computed: {
    ...mapState("plannerMonth", {
      plannerList: (state) => state.plannerList,
    }),
    ...mapState("quotedMessage", {
      quoteMessage: (state) => state.quoteMessage,
    }),
    ...mapState("userStudyAnalytics", {
      goal: (state) => state.goal,
    }),
    ...mapState("viewAllMeeting", {
      allList: (state) => state.allList,
      allData: (state) => state.allData,
      timeZones: (state) => state.timeZones,
    }),
    ...mapState("teacherMeeting", {
      invitedMembers: (state) => state.invitedMembers,
    }),
  },
  mounted() {
    this.calendarApi = this.$refs.fullCalendar.getApi();
    this.ShowQuotedMessage();
    this.firstName = localStorage.getItem("first_name");
    this.getConfiguredGoal();
    this.ListAllMeeting();
    this.GetMonthlyPlanner();
  },
  methods: {
    ...mapActions("quotedMessage", {
      showQuotedMessage: "showQuotedMessage",
    }),
    ...mapActions("userStudyAnalytics", {
      getGoal: "getGoal",
    }),
    ...mapActions("viewAllMeeting", {
      listAllMeeting: "listAllMeeting",
      getAll: "getAll",
    }),
    ...mapActions("teacherMeeting", {
      getInvitedMembers: "getInvitedMembers",
    }),
    ...mapActions("plannerMonth", {
      getMonthlyPlanner: "getMonthlyPlanner",
    }),

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
      if (this.goal) {
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
        var percentageStudied =
          Number(this.goal.duration) / Number(this.goal.total_duration_covered);
        percentageStudied = percentageStudied * 100;
        var percentage = percentageStudied.toFixed(2);
        this.value = percentage;
      }
    },
    openMeetingDetail() {
      $("#MeetingModal").modal({ backdrop: true });
    },
    async ListAllMeeting() {
      this.loading = true;
      await this.listAllMeeting({
        search_id: "",
        student_id: localStorage.getItem("id"),
      });
      console.log("consoling time zones ", this.timeZones);
      this.loading = false;
      this.dateConversion();
    },
    formatAMPM(input) {
      var time = input;
      var hours = Number(time.match(/^(\d+)/)[1]);
      var minutes = Number(time.match(/:(\d+)/)[1]);
      var AMPM = time.match(/\s(.*)$/)[1];
      if (AMPM == "PM" && hours < 12) hours = hours + 12;
      if (AMPM == "AM" && hours == 12) hours = hours - 12;
      var sHours = hours.toString();
      var sMinutes = minutes.toString();
      if (hours < 10) sHours = "0" + sHours;
      if (minutes < 10) sMinutes = "0" + sMinutes;
      var strTime = sHours + ":" + sMinutes;
      return strTime;
    },
    dateConversion() {
      this.slot_date = [];
      Teacherarray = [];
      Peerarray = [];
      Allarray = [];
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      this.allList.forEach((element) => {
        var Scheduleobj = {};
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        this.meetingType = element.meeting_type;
        var title = element.new_title;
        var from = element.start_time;
        var end = element.end_time;

        var date = moment(element.date, "YYYY-MM-DD");
        // var date = moment(element.date, "YYYY-MM-DD");
        var dateFormat =
          date.format("dddd") +
          ", " +
          date.format("D") +
          " " +
          date.format("MMMM");
        var splitDate = element.date.split("-");

        Scheduleobj["type"] = this.meetingType;
        Scheduleobj["title"] = title;
        Scheduleobj["dateFormat"] = dateFormat;
        Scheduleobj["from"] = from;
        Scheduleobj["end"] = end;
        Scheduleobj["date"] = new Date(
          splitDate[0],
          splitDate[1] - 1,
          splitDate[2]
        );
        Scheduleobj["meeting_description"] = element.meeting_description;
        Scheduleobj["meeting_link"] = element.meeting_link;
        Scheduleobj["meeting_location"] = element.meeting_location;
        Scheduleobj["meeting_request"] = element.meeting_request;
        Scheduleobj["meeting_name"] = element.meeting_name;
        Scheduleobj["conversation_type"] = element.conversation_type;
        Scheduleobj["new_title"] = element.new_title;
        Scheduleobj["meeting_with"] =
          this.meetingType == "Teacher"
            ? element.new_title
            : element.new_title
            ? element.new_title.split(",")
            : "";

        Scheduleobj["meeting_id"] = element.id;
        Scheduleobj["group_id"] = element.group_id;
        Scheduleobj["request_id"] = element.request_id;
        Scheduleobj["student_id"] = element.student_id;
        Scheduleobj["schedule_id"] = element.schedule_id;
        Scheduleobj["slot_id"] = element.slot_id;
        Scheduleobj["teacher_id"] = element.teacher_id;
        Scheduleobj["start_time"] = element.start_time;
        Scheduleobj["date"] = element.date;
        Scheduleobj["date_formatted"] =
          date.format("YYYY") +
          "-" +
          date.format("MM") +
          "-" +
          date.format("DD");
        let datesSplit = dateFormat.split(",");
        let day = datesSplit[0].slice(0, 3);
        let date_num = datesSplit[1];
        Scheduleobj["date_day"] = day.toUpperCase();
        Scheduleobj["date_number"] = date_num.split(" ")[1];

        this.slot_date.push(Scheduleobj);
        Allarray.push(Scheduleobj);
        if (this.meetingType == "Teacher") {
          Teacherarray.push(Scheduleobj);
        } else if (this.meetingType == "Peer") {
          Peerarray.push(Scheduleobj);
        }
      });
    },
    onCardClick(list) {
      $("#meetingDetailModal").modal();
      this.meetingDetail = list;
      // this.selectedSlot = "";
      // this.slot_date_selection = [];
      // this.detailDate = list.date;
      // this.detailDateFormat = list.date_formatted;
      // this.detailTime = list.from + " to " + list.end;
      // this.detailMeetingName = list.meeting_name;
      // this.detailMeetingDesc = list.meeting_description;
      // this.detailConversationType = list.conversation_type;
      // this.detailVenue =
      //   list.conversation_type == "In Person"
      //     ? list.meeting_location
      //     : list.meeting_link;
      // this.detailType = list.type;
      // this.detailWith = list.title;
      // this.detailMeetingWith = list.meeting_with;
      // this.detailMeetingId = list.meeting_id;
      // this.detailMeetingId = list.meeting_id;
      // this.detailGroupId = list.group_id;
      // this.detailStudentId = list.student_id;
      // this.detailRequestId = list.request_id;
      // this.detailMeetingRequest = list.meeting_request;
      // this.detailScheduleId = list.schedule_id;
      // this.detailTeacherId = list.teacher_id;
      // this.detailSlotId = list.slot_id;
      // this.date_formatted = list.date_formatted;
      // var dateF = list.date.split("-");
      this.date = new Date(moment(list.date));
      if (this.detailType != "Teacher") {
        this.getMemberDetails();
      }
    },
    async getMemberDetails() {
      this.loading = true;
      await this.getInvitedMembers({
        group_id: this.detailGroupId,
      });
      this.loading = false;
    },
    handleDateClick: function (arg) {
      this.listAgenda = [];

      this.agendaList.forEach((element) => {
        var listObj = {};
        if (element.date == arg.dateStr) {
          listObj["time"] = element.default_slots.start_time;
          listObj["title"] = element.title;
          this.listAgenda.push(listObj);
        }
      });
      if (!ismounted) {
        this.ListTeacherAgenda();
      }
      ismounted = false;
    },
    async GetMonthlyPlanner() {
      eventList = [];
      this.loading = true;
      const format = "YYYY-MM-DD";

      this.calendarDate = moment(this.calendarApi.view.activeStart).format(
        format
      );

      await this.getMonthlyPlanner({
        user_id: localStorage.getItem("id"),
        type: "Monthly",
        date: this.calendarDate,
      });
      this.meetingDetails = [];
      console.log(this.plannerList);
      this.plannerList.forEach((element) => {
        var scheduleObject = {};
        var plannerObj = {};
        var id = element.id;
        var assignment = element.subject;
        var time = element.due_time;
        var date = this.dateConversion(element.due_date);

        var title = element.task;

        if (element.priority == "1") {
          var color = "#EF382E";
        } else if (element.priority == "2") {
          var color = "#00CCA0";
        } else if (element.priority == "3") {
          var color = "#F6D73C";
        }
        var dateMeeting = element.due_date;
        var tmeMeeting = this.formatAMPM(element.due_time);
        var start = dateMeeting + "T" + tmeMeeting;

        scheduleObject["assignment"] = assignment;
        scheduleObject["time"] = time;
        scheduleObject["date"] = date;
        scheduleObject["title"] = title;
        scheduleObject["id"] = id;

        plannerObj["title"] = title;
        plannerObj["color"] = color;
        plannerObj["start"] = start;
        plannerObj["id"] = id;
        eventList.push(plannerObj);
        // plannerList.push(scheduleObject);
      });

      this.calendarOptions.events = eventList;
      this.loading = false;

      console.log("event list", eventList);
    },
    handleMonthChange(dateInfo) {
      var dateStr = dateInfo.startStr;
      var date = new Date(dateStr);
      date.setDate(date.getDate());
      var dateval = new Date(date),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      this.calendarDate = [date.getFullYear(), mnth, day].join("-");
    },
    goPrev() {
      this.calendarApi.prev(); // call a method on the Calendar object
      this.GetMonthlyPlanner();
    },

    goNext() {
      this.calendarApi.next();
      this.GetMonthlyPlanner();
    },
  },
};
</script>

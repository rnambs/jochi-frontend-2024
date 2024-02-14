<template>
  <div>
    <!-- <div
      id="pageLoader"
      class="bg-primary-light d-flex align-items-center justify-content-center position-fixed vh-100 vw-100 left-0 top-0"
      style="z-index: 9"
      v-if="!isHidden"
    >
      <h1 data-loading-text="loading..." class="display-4 loading"></h1>
    </div> -->
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div :class="!accordionOpened ? 'main-section' : 'main-section opened'">
      <div
        class="m--12 custom-margin-for-main-section custom-full-height d-flex flex-column position-realtive hidden-scroll"
      >
        <div class="dmc-head d-flex align-items-start">
          <div class="greet-with-name-sec">
            <h2 class="color-primary-dark heading3 font-bold mb-0">
              Welcome back, <span> {{ firstName }}!</span>
              <!-- <img src="~/static/image/v4/waving.svg" alt="" class="small-waving-hand img-theme light"/>
              <img src="~/static/image/v4/waving-dark.svg" alt="" class="small-waving-hand img-theme dark"/> -->
            </h2>
          </div>
        </div>
        <div class="d-flex flex-column h-40 flex-fill">
          <div class="row h-100">
            <div class="col-xl-8 max-h-md-100">
              <div class="d-flex flex-column h-md-100">
                <div
                class="card card-primary02 rounded-8 p-4 pr-1 pb-1 h-50 max-h-50" style="padding-top: 0;"
                >
                  <div class="row position-relative justify-content-between h-100">
                    <div class="col-7">
                      <div
                      class="dashboard-text-content-section position-absolute w-100" style="top: 0;"
                      >
                        <h3 class="color-primary-dark heading3 font-bold mb-0" style="margin-top: 0;">Your Weekly Summary</h3>
                        <router-link to="/task">
                          <button type="button">
                            <div class="poppins_text center">Let’s see what you have to do ></div>
                          </button>
                        </router-link>
                        <!-- <div class="col-12"> -->
                          <div class="row1 d-flex">

                            <div class="col d-flex flex-column" style="flex: 1;">
                              <div class="dashboard-card-purple">
                                <div style="width: 10vw; height: 10vw; position: relative; background: #5534A5; border-radius: 20px">
                                  <div style="width: 210.75px; height: 32px; left: -29.91px; top: -15.78px; position: absolute"></div>
                                    <div style="position: absolute; left: 50px; top: 50px;">
                                      <img src="~/static/image/v4/arrow-red.svg" alt="" />
                                    </div>
                                    <div class = "assignment-status">To-do</div>
                                    <div class="assignment-count-style">{{ assignmentCountNew }}</div>

                                </div>
                              </div>
                              </div>

                            <div class="col d-flex flex-column" style="flex: 1;">
                              <div class="dashboard-card-green">
                                <div style="width: 10vw; height: 10vw; position: relative; background: #008001; border-radius: 20px">
                                  <div style="width: 210.75px; height: 32px; left: -29.91px; top: -15.78px; position: absolute"></div>
                                  <div style="position: absolute; left: 50px; top: 50px;">
                                    <img src="~/static/image/v4/arrow-green.svg" alt="" />
                                  </div>
                                  <div class = "assignment-status">Done</div>
                                  <div class = "assignment-count-style">{{ assignmentCountCompleted }}</div>
                                </div>
                              </div>
                            </div>

                            <div class="col d-flex flex-column" style="flex: 1;">
                              <div class="dashboard-card-red">
                                <div style="width: 10vw; height: 10vw; position: relative; background: #DB1B24; border-radius: 20px">
                                  <div style="width: 210.75px; height: 32px; left: -29.91px; top: -15.78px; position: absolute"></div>
                                  <div style="position: absolute; left: 50px; top: 50px;">
                                    <img src="~/static/image/v4/arrow-purple.svg" alt=""/>
                                      </div>
                                      <div class = "assignment-status">Overdue</div>
                                      <div class = "assignment-count-style">{{ assignmentCountOverdue }}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        <!-- </div> -->
                    </div>
                    </div>
                    <div class="col-4 p-0 h-100 d-flex flex-column">
                      <img
                        src="~/static/image/v4/dashboard_img.svg"
                        alt=""
                        class="img-fluid mt-4 h-100 w-auto object-fit-contain img-theme light"
                      />
                      <img
                        src="~/static/image/v4/dashboard_img_dark.svg"
                        alt=""
                        class="img-fluid mt-4 h-100 w-auto object-fit-contain img-theme dark"
                      />
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-column h-lg-50 max-h-50 flex-fill">
                  <div
                    class="row mt-1 h-100 max-h-md-100 flex-column flex-md-row pt-2"
                  >
                    <div class="col-12 col-md-4 h-40 h-lg-100 flex-fill">
                      <div
                        data-intro="See how you are working towards your daily study goals."
                        class="card card-primary02 border-0 rounded-8 h-100"
                      >
                        <div
                          class="study-status-card d-flex justify-content-center align-items-center h-100 p-3 p-lg-0"
                        >
                          <div
                            class="position-relative d-flex mr-3 mr-lg-0 mt-2"
                          >
                            <progress-bar
                              :options="options"
                              :value="value"
                              class="d-flex justify-content-center w-100"
                            />
                            <div
                              class="study-status-img position-absolute d-flex w-100 h-100 align-items-center justify-content-center"
                            >
                              <!-- <img src="~/static/image/v4/alarm.png" alt="" /> -->
                              <img src="~/static/image/v4/alarm-black.svg" alt="clock" class="img-theme light" />
                              <img src="~/static/image/v4/alarm-white.svg" alt="clock" class="img-theme dark" />
                            </div>
                          </div>
                          <div
                            class="study-status-text text-left text-md-center my-2 px-2"
                          >
                            <p class="center poppins_text_bold ">
                              {{ duration }} Minutes Studied Today
                            </p>
                            <p class="center poppins_text font-semi-bold break-word">
                              {{ durationRemaining }}
                              {{
                                isAdditionalCovered
                                  ? "Additional Minutes Covered"
                                  : "Minutes Left"
                              }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-intro="View your upcoming meetings for the month. "
                      class="col-12 col-md-8 px-0  h-40 h-lg-100 flex-fill"
                    >
                      <div
                        class="d-flex flex-column custom-overflow faculty-availability-card-outer h-100 px-3 py-0 max-h-100"
                      >
                        <div class="row">
                          <div class="col-12 py-0">
                            <div
                              v-for="(list, index) in slot_date"
                              :key="index"
                              class="faculty-availability-card"
                            >
                              <div class="row">
                                <div class="col-3 py-0">
                                  <div
                                    class="bg-card-secondary border rounded-8 fa-card-date d-flex flex-column align-items-center justify-content-center w-100 p-3"
                                  >
                                    <p class="color-primary-dark text-12 mb-1">
                                      {{ list.date_day }}
                                    </p>
                                    <p
                                      class="color-primary-dark font-regular text-30 mb-0"
                                    >
                                      {{ list.date_number }}
                                    </p>
                                  </div>
                                </div>
                                <div class="col-9 py-0 d-flex">
                                  <div
                                    class="d-flex justify-content-between align-items-center cursor-pointer w-100"
                                    @click="onCardClick(list)"
                                  >
                                    <div class="fa-meeting-faculty-details">
                                      <p
                                        class="mb-1 color-seccondary text-14 font-regular"
                                      >
                                        {{
                                          list.type == "Teacher"
                                            ? "Faculty Meeting"
                                            : "Peer Meeting"
                                        }}
                                      </p>
                                      <p
                                        class="mb-1 color-dark text-18 font-bold"
                                      >
                                        {{ list.new_title }}
                                      </p>
                                      <div
                                        class="w-fit-content text-12 px-3 py-1 bg-primary color-white"
                                      >
                                        {{ list.start_time }}
                                      </div>
                                    </div>
                                    <i class="fas fa-chevron-right font-medium color-dark"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="row"
                          v-if="!slot_date || slot_date.length <= 0"
                        >
                          <span
                            class="d-flex w-100 justify-content-center color-secondary text-16 font-regular"
                            >No meetings scheduled for this month!</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 mt-3 mt-xl-0 max-h-md-100">
              <div
                class="card card-secondary border rounded-8 h-100 d-flex flex-column overflow-hidden"
              >
                <div class="calendar-dashboard px-4 pt-4">
                  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                </div>
                <div v-if="isLargeScreen" class="h-40 flex-fill">
                  <div
                    data-intro="See a brief overview of upcoming assignments day-by-day."
                    class="d-md-flex flex-column h-100 flex-fill pb-3 assignment-list assignment-md-show"
                  >
                    <h4 class="color-primary-dark font-semi-bold px-4">
                      Assignment List
                    </h4>
                    <div
                      class="d-flex flex-column h-100 custom-overflow px-3 mb-3 pt-2 mx-2 h-max-lg-600"
                    >
                      <div
                        v-for="item in assignmentList"
                        :key="item.id"
                        class="card card-tertiary rounded-8 p-3 pr-1 pb-1 mb-3"
                      >
                        <p
                          class="mb-1 word-break text-16 font-semi-bold color-dark"
                        >
                          {{ item.task }}
                        </p>
                        <p class="mb-0 text-14">
                          <span>{{ item.due_date }}</span
                          >&nbsp;<span>{{ item.due_time }}</span>
                        </p>
                        <p class="mb-0 text-14">
                          <span>Status: {{ item.task_status }}</span>
                        </p>
                      </div>
                      <div
                        v-if="!assignmentList || assignmentList.length <= 0"
                        class="card card-tertiary rounded-8 p-3 pr-1 pb-1 mb-3"
                      >
                        <p
                          class="mb-1 word-break text-16 font-semi-bold color-dark"
                        >
                          No assignments for this day!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-100 h-40 flex-fill" v-if="!isLargeScreen">
              <div
                data-intro="See a brief overview of upcoming assignments day-by-day."
                class="d-flex flex-column h-100 flex-fill pb-3 assignment-list assignment-md-hide"
              >
                <h4 class="color-primary-dark font-semi-bold px-4">
                  Assignment List
                </h4>
                <div
                  class="d-flex flex-column h-40 flex-fill custom-overflow px-3 mb-3 pt-2 mx-2"
                >
                  <div
                    v-if="assignmentList && assignmentList.length > 0"
                    class="h-100 overflow-auto"
                  >
                    <div
                      v-for="item in assignmentList"
                      :key="item.id"
                      class="card card-tertiary rounded-8 p-3 pr-1 pb-1 mb-3"
                    >
                      <p
                        class="mb-1 word-break text-16 font-semi-bold color-dark"
                      >
                        {{ item.task }}
                      </p>
                      <p class="mb-0 text-14">
                        <span>{{ item.due_date }}</span
                        >&nbsp;<span>{{ item.due_time }}</span>
                      </p>
                    </div>
                  </div>
                  <div
                    v-if="!assignmentList || assignmentList.length <= 0"
                    class="card card-tertiary rounded-8 p-3 pr-1 pb-1 mb-3"
                  >
                    <p
                      class="mb-1 word-break text-16 font-semi-bold color-dark"
                    >
                      No assignments for this day!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        <div
          class="modal-dialog modal-md modal-dialog-centered"
          role="document"
        >
          <div class="modal-content px-4">
            <div class="modal-header pb-0">
              <h2
                class="modal-title color-primary-dark font-semi-bold mb-0"
                id="meetingDetailModalLongTitle"
              >
                <span>{{ meetingDetail.type }}</span> Meeting with
                <h5 class="color-primary-dark font-semi-bold mb-0">
                  <span>{{ meetingDetail.new_title }}</span>
                </h5>
              </h2>
            </div>
            <div class="modal-body">
              <h3 class="color-black font-semi-bold">
                {{ meetingDetail.dateFormat }}
              </h3>
              <h4 class="color-primary-dark font-regular mb-2">
                {{ meetingDetail.start_time }}
              </h4>
              <h4 class="color-primary-dark font-regular mb-2"></h4>
              <form action="">
                <table class="w-100 table-modal custom-row-table">
                  <tr>
                    <td class="tmodal-data text-nowrap">Meeting Name</td>
                    <td class="tmodal-data">
                      <p
                        class="mb-0 col-12 col-md-10 col-lg-9 d-flex align-items-center form-row py-0 line-break-anywhere"
                      >
                        {{ meetingDetail.meeting_name }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="tmodal-data text-nowrap">Description</td>
                    <td class="tmodal-data">
                      <p
                        class="mb-0 col-12 col-md-11 col-lg-10 d-flex align-items-center form-row py-0 line-break-anywhere"
                      >
                        {{ meetingDetail.meeting_description }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="tmodal-data text-nowrap">Type of Meeting</td>
                    <td class="tmodal-data">
                      <p
                        class="mb-0 col-12 col-md-10 col-lg-9 d-flex align-items-center form-row py-0"
                      >
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
                        class="mb-0 col-12 col-md-10 col-lg-9 d-flex align-items-center form-row py-0 line-break-anywhere"
                      >
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
            <div class="modal-footer justify-content-end border-top-0"></div>
          </div>
        </div>
      </div>

      <!-- meeting detail pop up end -->

      <!--  prompt pop up -->

      <!-- <div
        class="modal fade"
        id="promptModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="promptModalCenterTitle"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-md modal-dialog-centered"
          role="document"
        >
          <div class="modal-content px-4 py-4">
            <div class="modal-body">
              <h3 class="modal-title color-primary-dark font-bold">
                Update Phone Number
              </h3>
              <p class="mb-0 color-secondary">
                Update your phone number to receive SMS notification on your
                mobile phone!
              </p>
            </div>
            <div class="modal-footer justify-content-end border-top-0 pb-0">
              <button
                type="button"
                data-dismiss="modal"
                class="btn btn-secondary"
                @click="skipPromt()"
              >
                Skip for Now
              </button>
              <button
                type="button"
                data-dismiss="modal"
                class="btn btn-primary color-white"
                @click="skipPromt(true)"
              >
                <nuxt-link to="/user-profile" class="text-white text-decoration-none"> -->
                 <!--Update Now -->
                <!-- </nuxt-link>
              </button>
            </div>
          </div>
        </div>
      </div>  -->

      <!--  prompt pop up end -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import { mapState, mapActions } from "vuex";

import FullCalendar, { Calendar } from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { eventBus } from "~/plugins/eventbus.js";
import moment from "moment";

var eventList = [];
var Peerarray = [];
var Teacherarray = [];
var Allarray = [];
export default {
  name: "UserStudentDashBoard",
  components: {
    lottie,
    FullCalendar,
  },
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "/css/custom.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/intro.js/6.0.0/introjs.css",
        },
      ],
    };
  },
  data() {
    return {
      selectedTheme: "light",
      accordionOpened:false,
      isSmallScreen: false,
      isMediumScreen: false,
      isLargeScreen: false,
      loading: true,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      slot_date: [],
      progress: 50,
      calendarApi: Calendar,
      calendarOptions: {
        showNonCurrentDates: false,
        plugins: [dayGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev",
          center: "title",
          right: "next",
        },
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
        eventClick: this.eventClicked,
        datesSet: this.handleMonthChange,
        dateClick: this.handleDateClick,
        dayMaxEventRows: true, // for all non-TimeGrid views
        views: {
          dayGrid: {
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
      meetingDetail: {},
      options: {
        text: {
          color: "#FFFFFF",
          shadowEnable: true,
          shadowColor: "#000000",
          fontSize: 14,
          fontFamily: "Helvetica",
          dynamicPosition: false,
          hideText: true,
        },
        progress: {
          color: "#5534A5",
          backgroundColor: "#000000",
          inverted: false,
        },
        layout: {
          height: 150,
          width: 150,
          verticalTextAlign: 61,
          horizontalTextAlign: 43,
          zeroOffset: 0,
          strokeWidth: 8,
          progressPadding: 0,
          type: "circle",
        },
        startTime: null,
      },
      value: 0,
      isAdditionalCovered: false,
      assignmentList: [],
      assignmentWeeklyList: [],
      isHidden: false,
    };
  },
  computed: {
    ...mapState("quotedMessage", {
      quoteMessage: (state) => state.quoteMessage,
      plannerList: (state) => state.plannerList,
      sharedAstList: (state) => state.sharedAstList,
      sharedWeeklyAstList: (state) => state.sharedAstList,
    }),
    ...mapState("userStudyAnalytics", {
      goal: (state) => state.goal,
    }),
    ...mapState("plannerWeek", {
      plannerWeeklyList: (state) => state.plannerList,
      sharedWeeklyAstList: (state) => state.sharedAstList,
    }),
    ...mapState("viewAllMeeting", {
      allList: (state) => state.allList,
      allMeetingMonthList: (state) => state.allMeetingMonthList,
      allData: (state) => state.allData,
      timeZones: (state) => state.timeZones,
    }),
    ...mapState("teacherMeeting", {
      invitedMembers: (state) => state.invitedMembers,
    }),
    startProductGuide() {
      return this.$store.state.startProductGuide;
    },
    assignmentCountNew() {
      const filteredAssignments = this.assignmentWeeklyList.filter(item => {
        const createdAtDate = moment(item.createdAt); //when created
        const dueDate = moment(item.due_date); //when due
        const startOfWeek = moment().startOf('isoWeek');
        const endOfWeek = moment().endOf('isoWeek');
        const isTaskActive = item.task_status !== 'Completed' && item.task_status !== 'Overdue';
        const isCreatedThisWeek = dueDate.isSameOrAfter(startOfWeek) && dueDate.isSameOrBefore(endOfWeek);
        console.log(startOfWeek, endOfWeek);
        return isTaskActive && isCreatedThisWeek;
      });
      return filteredAssignments.length;
    },

    assignmentCountCompleted() {
      const filteredAssignments = this.assignmentWeeklyList.filter(item => {
        const createdAtDate = moment(item.createdAt);
        const dueDate = moment(item.due_date); //when due
        const startOfWeek = moment().startOf('isoWeek');
        const endOfWeek = moment().endOf('isoWeek');
        const isCreatedThisWeek = dueDate.isSameOrAfter(startOfWeek) && dueDate.isSameOrBefore(endOfWeek);
        return item.task_status === 'Completed' && isCreatedThisWeek;
      });
      return filteredAssignments.length;
    },
    assignmentCountOverdue() {
      const filteredAssignments = this.assignmentWeeklyList.filter(item => {
        return item.task_status === 'Overdue';
      });
      return filteredAssignments.length;
    },
  },
  created() {
    this.loading=true;
    eventBus.$on('accordionOpened', (newValue) => {
      this.accordionOpened = newValue;
    });
  },
  mounted() {
    window.addEventListener("orientationchange", this.handleOrientationChange);
    const page = "Dashboard";
    const distinct_id = localStorage.getItem("distinctId");
    this.$mixpanel.track("Page View", { distinct_id, page });
    this.startTime = new Date().getTime();
    this.calendarApi = this.$refs.fullCalendar.getApi();
    this.ShowQuotedMessage();
    this.getConfiguredGoal();
    this.ListAllMeeting();
    this.GetDailyPlanner(this.calendarApi.getDate());
    this.GetWeeklyPlanner(this.calendarApi.getDate());
    this.firstName = localStorage.getItem("firstName");
    this.activate();
    this.findDeviceSize();
    const phone = localStorage.getItem("phone");
    const skipped = localStorage.getItem("skippedPrompt");
    const savedTheme = localStorage.getItem('selectedTheme');
      if (savedTheme) {
        this.selectedTheme = savedTheme;
    }
    setTimeout(() => {
      this.loading=false;
      if (!phone && skipped != "true") {
        $("#promptModal").modal();
      }
    }, 3000);
  },
  watch: {
    startProductGuide(newValue, oldValue) {
      if (newValue) {
        this.startIntro();
      }
    },
    selectedTheme(newTheme) {
      localStorage.setItem('selectedTheme', newTheme);
      // When the selected theme changes, apply it to the <html> element's class
      const html = document.documentElement; // <html> element
      html.classList.remove("light-theme", "dark-theme"); // Remove all theme classes
      html.classList.add(newTheme + "-theme"); // Add the selected theme class
    },
  },
  methods: {
    findDeviceSize() {
      const smallScreen = window.matchMedia("(max-width: 640px)");
      const mediumScreen = window.matchMedia("(min-width: 640px)");
      const largeScreen = window.matchMedia("(min-width: 1024px)");

      this.isSmallScreen = smallScreen.matches;
      this.isMediumScreen = mediumScreen.matches;
      this.isLargeScreen = largeScreen.matches;

      smallScreen.addListener((e) => {
        this.isSmallScreen = e.matches;
      });

      mediumScreen.addListener((e) => {
        this.isMediumScreen = e.matches;
      });

      largeScreen.addListener((e) => {
        this.isLargeScreen = e.matches;
      });
    },
    async skipPromt(updateNow=false) {
      console.log("skkip promt");
      localStorage.setItem("skippedPrompt", "true");
      if(updateNow){
        this.$router.push("/user-profile");
      }

    },
    activate() {
      setTimeout(() => (this.isHidden = true), 1500);
      setTimeout(() => {
        this.startIntro();
      }, 2500);
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    ...mapActions("quotedMessage", {
      showQuotedMessage: "showQuotedMessage",
      getDailyPlanner: "getDailyPlanner",
    }),
    ...mapActions("plannerWeek", {
      getWeeklyPlanner: "getWeeklyPlanner",
    }),
    ...mapActions("userStudyAnalytics", {
      getGoal: "getGoal",
    }),
    ...mapActions("viewAllMeeting", {
      listAllMeeting: "listAllMeeting",
      listAllMeetingMonth: "listAllMeetingMonth",
      getAll: "getAll",
    }),
    ...mapActions("teacherMeeting", {
      getInvitedMembers: "getInvitedMembers",
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
      await this.getGoal({ student_id: this.studentId });

      if (this.goal) {
        let total_duration = 0;
        let duration = 0;

        if (this.goal.duration && !isNaN(Number(this.goal.duration))) {
          duration = Number(this.goal.duration);
        }
        if (
          this.goal.total_duration_covered &&
          !isNaN(Number(this.goal.total_duration_covered))
        ) {
          total_duration = Number(this.goal.total_duration_covered);
          this.duration = total_duration;
        }
        this.durationRemaining = duration - total_duration;

        if (total_duration > 0 || duration > 0) {
          this.value = (total_duration / duration) * 100;
        } else {
          this.value = 0;
        }

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

        if (this.durationRemaining < 0) {
          this.isAdditionalCovered = true;
          this.durationRemaining = 0 - this.durationRemaining;
        } else {
          this.isAdditionalCovered = false;
        }
        let goal =
          Number(this.goal.duration) > 0 ? Number(this.goal.duration) : 0;
        let h = Math.floor(goal / 60);
        let m = goal % 60;

        this.hours = h;
        this.minutes = m;
        let percentageStudied =
          Number(this.goal.total_duration_covered) / Number(this.goal.duration);
        percentageStudied = percentageStudied * 100;
        let percentage = percentageStudied.toFixed(2);

        this.value = percentage >= 0 ? percentage : 0;
      }
    },
    openMeetingDetail() {
      $("#MeetingModal").modal({ backdrop: true });
    },
    async ListAllMeeting() {
      this.slot_date = [];
      this.loading = true;
      const format = "YYYY-MM-DD";
      let calendarDate = moment(this.calendarApi?.view?.activeStart).format(
        format
      );
      await this.listAllMeetingMonth({
        date: calendarDate,
      });
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
      this.allMeetingMonthList.forEach((element) => {
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


    async GetWeeklyPlanner(date) {
      this.loading = true;
      const startOfWeek = moment(date).startOf('week').format("YYYY-MM-DD");
      await this.getWeeklyPlanner({
        user_id: localStorage.getItem("id"),
        type: "Weekly",
        date: startOfWeek,
      });
      this.loading = false;
      this.assignmentWeeklyList = [];
      this.meetingDetails = [];
      this.plannerWeeklyList.forEach((element) => {
        var scheduleObject = {};
        var plannerObj = {};

        let planner = {};
        planner.task = element.task;
        planner.task_status = element.task_status;
        planner.id = element.id;
        planner.subject = element.subject;
        planner.due_date = moment(element.due_date).format("MM/DD/YYYY");
        planner.due_time = element.due_time;
        planner.assignment_description = element.assignment_description;
        planner.subjects = element.assignment_description;
        this.assignmentWeeklyList.push(planner);
      });
      this.sharedWeeklyAstList.forEach((element) => {
        let planner = {};
        planner.task = element.task;
        planner.task_status = element.task_status;
        planner.id = element.id;
        planner.subject = element.subject;
        planner.due_date = moment(element.due_date).format("MM/DD/YYYY");
        planner.due_time = element.due_time;
        planner.assignment_description = element.assignment_description;
        planner.subjects = element.assignment_description;
        this.assignmentWeeklyList.push(planner);
      });
    },

    async GetDailyPlanner(date) {
      eventList = [];
      this.loading = true;
      const format = "YYYY-MM-DD";
      this.calendarDate = moment(date).format(format);
      await this.getDailyPlanner({
        user_id: localStorage.getItem("id"),
        type: "Daily",
        date: this.calendarDate,
      });
      this.loading = false;
      this.assignmentList = [];
      this.meetingDetails = [];
      this.plannerList.forEach((element) => {
        var scheduleObject = {};
        var plannerObj = {};

        let planner = {};
        planner.task = element.task;
        planner.task_status = element.task_status;
        planner.id = element.id;
        planner.subject = element.subject;
        planner.due_date = moment(element.due_date).format("MM/DD/YYYY");
        planner.due_time = element.due_time;
        planner.assignment_description = element.assignment_description;
        planner.subjects = element.assignment_description;

        this.assignmentList.push(planner);
      });
      this.meetingList?.forEach((element) => {
        var meetingobj = {};
        var listobj = {};
        if (element.title != null) {
          var title = "Meeting with " + element.title;
        }
        if (element.club_name != null) {
          var title = element.club_name + " Meeting";
        }

        var meeting = element.meeting_type;
        if (meeting == "Peer") {
          var color = "#64B5FC";
          meetingobj["groupId"] = "peer-meeting";
        } else if (meeting == "Club") {
          var color = "#07BEB8";
          meetingobj["groupId"] = "club-meeting";
        } else if (meeting == "Teacher") {
          meetingobj["groupId"] = "teacher-meeting";
          var color = "#073BBF";
        }
        var dateMeeting = element.date;
        var timeValNum = element.start_time;
        var tmeMeeting = this.formatAMPM(element.start_time);
        var start = dateMeeting + "T" + tmeMeeting;
        meetingobj["title"] = title;
        meetingobj["color"] = color;
        meetingobj["start"] = start;
        meetingobj["id"] = element.id;

        listobj["title"] = title;
        listobj["meeting"] = meeting;
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.meetingDetails.push(listobj);
        eventList.push(meetingobj);
      });
      this.sharedAstList.forEach((element) => {
        let planner = {};
        planner.task = element.task;
        planner.task_status = element.task_status;
        planner.id = element.id;
        planner.subject = element.subject;
        planner.due_date = moment(element.due_date).format("MM/DD/YYYY");
        planner.due_time = element.due_time;
        planner.assignment_description = element.assignment_description;
        planner.subjects = element.assignment_description;
        this.assignmentList.push(planner);
      });
    },
    handleMonthChange(dateInfo) {
      var dateStr = dateInfo.startStr;
      var date = new Date(dateStr);
      date.setDate(date.getDate());
      var dateval = new Date(date),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      this.calendarDate = [date.getFullYear(), mnth, day].join("-");
      this.ListAllMeeting();
    },
    handleDateClick: function (arg) {
      this.GetDailyPlanner(arg.date);
    },
    goPrev() {
      this.calendarApi.prev(); // call a method on the Calendar object
      this.GetDailyPlanner(this.calendarApi.view.activeStart);
      this.ListAllMeeting();
    },

    goNext() {
      this.calendarApi.next();
      this.GetDailyPlanner(this.calendarApi.view.activeStart);
      this.ListAllMeeting();
    },
    startIntro() {
      const intro = this.$intro();
      let completed = false;
      let skip = false;
      if (this.startProductGuide) {
        intro.start();
        intro.onskip(() => {
          skip = true;
          this.$store.commit("setStartProductGuide", false);
        });
        if (skip) return;
        intro.oncomplete((step, state) => {
          completed = true;
          if (state != "skip") this.$router.push("/user-profile");
        });
        intro.onexit(() => {
          if (!completed) this.$store.commit("setStartProductGuide", false);
        });
      }
    },
    handleOrientationChange() {
      const intro = this.$intro();
      intro.exit();
      this.$store.commit("setStartProductGuide", false);
    },
  },
  beforeDestroy() {
    const endTime = new Date().getTime();
    const duration = (endTime - this.startTime) / 1000;
    const distinct_id = localStorage.getItem("distinctId");
    const page = "Dashboard";
    this.$mixpanel.track("Page Duration", { duration, distinct_id, page });
  },
  destroyed() {
    window.removeEventListener(
      "orientationchange",
      this.handleOrientationChange
    );
  },
};
</script>


<style>

.jump-to-section h3 {

  text-align: left;
}

.buttons-container {
  display: flex;
  flex-wrap: wrap; /* Allow buttons to wrap if needed */
  justify-content: space-around;
  gap: 20px;
}

.buttons-container button {
  flex: 1 1 40%;
  padding: 5px;
  font-size: 0.9em;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 2px; /* Add margin for additional spacing */
}

@media (max-width: 600px) {
  .buttons-container button {
    flex-basis: 80%;
  }
}

.greet-with-name-sec .hello {
  font-size: 24px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 0.4rem;
  margin-left: 2px;
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
  font-size: 26px;
  line-height: 30px;
  font-weight: 700;
}

.dashboard-text-content {
  font-size: 18px;
  line-height: 30px;
}
@media (max-width: 764.98px) {
  .dashboard-text-content {
    font-size: 16px;
    line-height: 22px;
  }
}
.study-status-img img {
  width: 80px;
  height: auto;
}
.study-status-studied {
  font-weight: 600;
}
@media (min-width: 959.98px) {
  .h-lg-100 {
    height: 100% !important;
  }
}

.loading {
  left: 50%;
  top: 50%;
  font-size: 36px;
  font-family: serif;
  font-weight: bold;
  letter-spacing: 4.4px;
  text-transform: capitalize;
  position: absolute;
  overflow: hidden;
  transform: translate(-50%, -60%);
}
.loading:before {
  color: #aaa;
  content: attr(data-loading-text);
}
.loading:after {
  top: 0;
  left: 0;
  width: 0;
  opacity: 1;
  color: #444;
  overflow: hidden;
  position: absolute;
  content: attr(data-loading-text);
  -webkit-animation: loading 5s infinite;
  animation: loading 5s infinite;
}
@-webkit-keyframes loading {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
@keyframes loading {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

.small-waving-hand {
  width: 40px;
  height: 40px;
  vertical-align: left;
  display: inline-block;
}

.h-max-100 {
  max-height: 100px;
}

:root.dark-theme img.img-theme.light {
  display: none;
}

:root.dark-theme img.img-theme.dark {
  display: inline-block;
}

img.img-theme.light {
  display: inline-block;
}

img.img-theme.dark {
  display: none;
}

.row1 {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem; /* Adds space between the cards */
}

.col-4 {
  flex: 1;
  width: calc(33.33% - 1rem); /* Subtract the gap from the width */
  padding: 0; /* No padding needed here */
}

.dashboard-card-green {
  background: #008001; /* Card background color */
  border-radius: 20px;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Prevents content from spilling out */
  height: 85%; /* Set to 100% of parent's height */
  padding: 1rem;
}

.dashboard-card-red {
  background: #DB1B24; /* Card background color */
  border-radius: 20px;
  display: flex;
  height: auto;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Prevents content from spilling out */
  height: 85%; /* Set to 100% of parent's height */
  padding: 1rem;
}

.dashboard-card-purple {
  background: #5534A5; /* Card background color */
  border-radius: 20px;
  display: flex;
  height: auto;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Prevents content from spilling out */
  height: 85%; /* Set to 100% of parent's height */
  padding: 1rem;
}

.card-content {
  color: white;
  text-align: center;
}

.card-image {
  max-width: 50%; /* Maximum width of the SVG image */
  max-width: 40%; /* Adjust this as needed */
  height: auto;
}

.assignment-status {
  font-size: 1.5vw; font-family: Poppins; font-weight: 500; line-height: 1.2; color: white; position: absolute; top: 0%; left: 0%; word-wrap: break-word;
}

.assignment-count-style {
  font-size: 2.5vw; font-family: Open Sans; font-weight: 700; line-height: 1.2; color: white; position: absolute; top: 70%; left: 15%; word-wrap: break-word;
}

/* Responsive text sizes */
.card-title {
  font-size: 1.25rem; /* Base size for card title */
  margin-top: 0.5rem; /* Spacing above the title */
}

.card-number {
  font-size: 2.5rem; /* Adjust this as needed */
  margin-top: 0.5rem; /* Spacing above the number */
}

.poppins_text {
  width: 315.23px; height: 23px; text-align: center; color: #5E5F6B; font-size: 16px; font-family: Poppins; font-weight: 400; line-height: 24px; word-wrap: break-word;
}

.poppins_text_bold {
  width: 315.23px; height: 23px; text-align: center; color: #5E5F6B; font-size: 16px; font-family: Poppins; font-weight: 600; line-height: 24px; word-wrap: break-word;
}

/* @media (min-width: 1441px) {
  .dashboard-card-purple, .dashboard-card-green, .dashboard-card-red {
    width: 12vw; /* Larger than the default 10vw */
    /* height: 12vw; */
  /* } */
/* } */

/* Adjust text size based on viewport width */
@media (max-width: 640px) {
  .col-4 {
    width: 100%; /* Each card takes full width on small screens */
    margin-bottom: 1rem; /* Adds space between stacked cards */
  }
  .card-title,
  .card-number {
    font-size: 1rem; /* Smaller numbers on smaller screens */
  }
  .card-image {
    max-width: 50%; /* Bigger image relative to the card on small screens */
  }
}

/* .assignment-md-show {
  display: none !important;
}

.assignment-md-hide {
  display: flex !important;
}

@media (min-width: 768px) {
  .assignment-md-show {
    display: flex !important;
  }

  .assignment-md-hide {
    display: none !important;
  }
}*/
</style>

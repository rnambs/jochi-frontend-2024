<template>
  <div>
    <div id="pageLoader" class="bg-light d-flex align-items-center justify-content-center position-fixed vh-100 vw-100 left-0 top-0" style="z-index: 9;" v-if="!isHidden">
      <h1 data-loading-text="loading..." class="display-4 loading"></h1>
    </div>
    <!-- <lottie
      v-if=" loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    /> -->
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
        hidden-scroll
      "
    >
      <div class="dmc-head d-flex justify-content-between align-items-start">
        <div class="greet-with-name-sec">
          <p class="text-24 color-black font-semi-bold mb-2">Hello,</p>
          <p class="color-primary text-40 font-bold mb-4">{{ firstName }}</p>
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
      <div class="d-flex flex-column h-40 flex-fill min-h-dashboard">
        <div class="row h-100">
          <div class="col-xl-8 h-100 height-md-unset">
            <div class="d-flex flex-column h-100">
              <div
                class="
                  jochi-sub-components-light-bg
                  p-4
                  pr-1
                  pb-1
                  h-fit-content
                "
              >
                <div class="row position-relative justify-content-between">
                  <div class="col-7"></div>
                  <div class="dashboard-text-content-section position-absolute">
                    <p class="dashboard-head">Dashboard</p>
                    <p v-if="quoteMessage" class="dashboard-text-content">
                      “{{ quoteMessage }}”<br />

                      <!-- — Malcolm X -->
                    </p>
                  </div>
                  <div class="col-4 p-0">
                    <img
                      src="~/static/image/dashboard_img.png"
                      alt=""
                      class="img-fluid mt-4"
                    />
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column h-40 flex-fill">
                <div class="row mt-1 h-100 height-md-unset flex-column flex-lg-row">
                  <div class="col-12 col-md-4 h-40 h-lg-100 flex-fill">
                    <div class="jochi-sub-components-light-bg h-100">
                      <div
                        class="
                          study-status-card
                          d-flex
                          flex-row
                          flex-lg-column
                          justify-content-center
                          align-items-center
                          h-100
                        "
                      >
                        <!-- <div
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
                        </div> -->
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
                        <div class="position-relative d-flex mr-3 mr-lg-0 mt-2">
                          <progress-bar
                            :options="options"
                            :value="value"
                            class="d-flex justify-content-center w-100"
                          />
                          <div
                            class="
                              study-status-img
                              position-absolute
                              d-flex
                              w-100
                              h-100
                              align-items-center
                              justify-content-center
                            "
                          >
                            <img src="~/static/image/alarm.png" alt="" />
                          </div>
                        </div>
                        <div class="study-status-text text-left text-lg-center mb-2 px-2">
                          <p class="study-status-studied mb-1 break-word">
                            {{ duration }} Minutes Studied Today
                          </p>
                          <p class="study-status-time-left break-word">
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
                  <div class="col-12 col-md-8 px-0 h-40 h-lg-100 flex-fill">
                    <div
                      class="
                        d-flex
                        flex-column
                        custom-overflow
                        faculty-availability-card-outer
                        h-100
                        p-3
                        py-4
                        h-max-lg-400
                      "
                    >
                      <div class="row">
                        <div class="col-12 mb-2">
                          <div
                            v-for="(list, index) in slot_date"
                            :key="index"
                            class="faculty-availability-card mb-4"
                          >
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
                                  <p class="color-primary text-12 mb-1">
                                    {{ list.date_day }}
                                  </p>
                                  <p
                                    class="
                                      color-primary
                                      font-regular
                                      text-30
                                      mb-0
                                    "
                                  >
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
                                    cursor-pointer
                                  "
                                  @click="onCardClick(list)"
                                >
                                  <div class="fa-meeting-faculty-details">
                                    <p
                                      class="
                                        mb-1
                                        color-seccondary
                                        text-14
                                        font-regular
                                      "
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
                                      class="
                                        w-fit-content
                                        text-12
                                        px-3
                                        py-1
                                        bg-theme
                                        rounded-pill
                                        color-white
                                      "
                                    >
                                      {{ list.start_time }}
                                    </div>
                                  </div>
                                  <i class="arrow right"></i>
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
                          class="
                            d-flex
                            w-100
                            justify-content-center
                            color-secondary
                            text-16
                            font-regular
                          "
                          >No meetings scheduled for this month!</span
                        >
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
          <div class="col-xl-4 h-100 mt-3 mt-xl-0 height-md-unset">
            <div
              class="
                jochi-sub-components-light-bg
                h-100
                d-flex
                flex-column
                overflow-hidden
              "
            >
              <div class="calendar-dashboard px-4 pt-4">
                <FullCalendar ref="fullCalendar" :options="calendarOptions" />
              </div>
              <div class="d-flex flex-column h-40 flex-fill pb-3 assignment-list">
                <h4 class="color-black font-semi-bold px-4">
                  Assignments List
                </h4>
                <div
                  class="
                    d-flex
                    flex-column
                    h-40
                    flex-fill
                    custom-overflow
                    px-3
                    mb-3
                    pt-2
                    mx-2
                    h-max-lg-600
                  "
                >
                  <div
                    v-for="item in assignmentList"
                    :key="item.id"
                    class="jochi-sub-components-light-bg p-4 pr-1 pb-1 mb-3"
                  >
                    <p
                      class="mb-2 word-break text-16 font-semi-bold color-dark"
                    >
                      {{ item.task }}
                    </p>
                    <p class="mb-0 text-14">
                      <span>{{ item.due_date }}</span
                      >&nbsp;<span>{{ item.due_time }}</span>
                    </p>
                  </div>
                  <div
                    v-if="!plannerList || plannerList.length <= 0"
                    class="jochi-sub-components-light-bg p-4 pr-1 pb-1 mb-3"
                  >
                    <p
                      class="mb-2 word-break text-16 font-semi-bold color-dark"
                    >
                      No assignments for this day!
                    </p>
                    <!-- <p class="mb-0 text-14">
                      <span>{{ item.due_date }}</span
                      >&nbsp;<span>{{ item.due_time }}</span>
                    </p> -->
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
      <div class="modal-dialog modal-md modal-dialog-centered" role="document">
        <div class="modal-content px-4">
          <div class="modal-header pb-0">
            <h2
              class="modal-title color-primary font-semi-bold mb-0"
              id="meetingDetailModalLongTitle"
            >
              <span>{{ meetingDetail.type }}</span> Meeting with
              <h5 class="color-primary font-semi-bold mb-0">
                <span>{{ meetingDetail.new_title }}</span>
              </h5>
            </h2>
            <!-- <button type="button" class="close">
              <span aria-hidden="true">Edit</span>
            </button> -->
            <!-- <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button> -->
          </div>
          <div class="modal-body">
            <h3 class="color-black font-semi-bold">
              {{ meetingDetail.dateFormat }}
            </h3>
            <h4 class="color-primary font-regular mb-2">
              {{ meetingDetail.start_time }}
            </h4>
            <h4 class="color-primary font-regular mb-2"></h4>
            <form action="">
              <table class="w-100 table-modal custom-row-table">
                <!-- <tr>
                  <td class="tmodal-data">Type</td>
                  <td class="tmodal-data">
                    <span class="pr-2"></span>
                    {{ meetingDetail.type }}
                  </td>
                </tr> -->

                <!-- <tr>
                  <td class="tmodal-data">With</td>
                  <td class="tmodal-data d-flex align-items-center flex-wrap">
                    <span class="pr-2"></span>
                    <span>{{ meetingDetail.new_title }} </span> -->
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
                <!-- </td>
                </tr> -->

                <!-- <tr>
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
                </tr> -->

                <!-- <tr>
                  <td class="tmodal-data">Time</td>
                  <td class="tmodal-data">
                    <span class="pr-2"></span>
                    {{ meetingDetail.start_time }}
                  </td>
                </tr> -->
                <tr>
                  <td class="tmodal-data text-nowrap">Meeting Name</td>
                  <td class="tmodal-data">
                    <p
                      class="
                        mb-0
                        col-12 col-md-10 col-lg-9
                        d-flex
                        align-items-center
                        form-row
                        py-0
                        line-break-anywhere
                      "
                    >
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
                        col-12 col-md-11 col-lg-10
                        d-flex
                        align-items-center
                        form-row
                        py-0
                        line-break-anywhere
                      "
                    >
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
                        col-12 col-md-10 col-lg-9
                        d-flex
                        align-items-center
                        form-row
                        py-0
                      "
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
                      class="
                        mb-0
                        col-12 col-md-10 col-lg-9
                        d-flex
                        align-items-center
                        form-row
                        py-0
                        line-break-anywhere
                      "
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
        // events: eventList,
        eventClick: this.eventClicked,
        datesSet: this.handleMonthChange,
        dateClick: this.handleDateClick,
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
          hideText: true,
        },
        progress: {
          color: "#ff6d6d",
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
      },
      value: 0,
      isAdditionalCovered: false,
      assignmentList: [],
      isHidden:false
    };
  },
  computed: {
    ...mapState("quotedMessage", {
      quoteMessage: (state) => state.quoteMessage,
      plannerList: (state) => state.plannerList,
    }),
    ...mapState("userStudyAnalytics", {
      goal: (state) => state.goal,
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
  },
  mounted() {
    this.calendarApi = this.$refs.fullCalendar.getApi();
    this.ShowQuotedMessage();
    this.getConfiguredGoal();
    this.ListAllMeeting();
    this.GetDailyPlanner(this.calendarApi.getDate());
    this.firstName = localStorage.getItem("firstName");
    this.activate()
  },
  methods: {
    activate() {
      console.log("inside hide timeout");
      setTimeout(() => this.isHidden = true, 1500);
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    ...mapActions("quotedMessage", {
      showQuotedMessage: "showQuotedMessage",
      getDailyPlanner: "getDailyPlanner",
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

        this.value = percentage;
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
    // handleDateClick: function (arg) {
    //   this.listAgenda = [];

    //   this.agendaList.forEach((element) => {
    //     var listObj = {};
    //     if (element.date == arg.dateStr) {
    //       listObj["time"] = element.default_slots.start_time;
    //       listObj["title"] = element.title;
    //       this.listAgenda.push(listObj);
    //     }
    //   });
    //   if (!ismounted) {
    //     this.ListTeacherAgenda();
    //   }
    //   ismounted = false;
    // },
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
        // var id = element.id;
        // var assignment = element.subject;
        // var time = element.due_time;
        // var date = this.dateConversion(element.due_date);

        // var title = element.task;

        // if (element.priority == "1") {
        //   var color = "#EF382E";
        // } else if (element.priority == "2") {
        //   var color = "#00CCA0";
        // } else if (element.priority == "3") {
        //   var color = "#F6D73C";
        // }
        // var dateMeeting = element.due_date;
        // var tmeMeeting = this.formatAMPM(element.due_time);
        // var start = dateMeeting + "T" + tmeMeeting;

        // scheduleObject["assignment"] = assignment;
        // scheduleObject["time"] = time;
        // scheduleObject["date"] = moment(date).format("MM/DD/YYYY");
        // scheduleObject["title"] = title;
        // scheduleObject["id"] = id;

        // plannerObj["title"] = title;
        // plannerObj["color"] = color;
        // plannerObj["start"] = start;
        // plannerObj["id"] = id;
        // plannerObj["groupId"] = "assignment";

        let planner = {};
        planner.task = element.task;
        planner.task_status = element.task_status;
        planner.id = element.id;
        planner.subject = element.subject;
        planner.due_date = moment(element.due_date).format("MM/DD/YYYY");
        planner.due_time = element.due_time;
        planner.assignment_description = element.assignment_description;
        planner.subjects = element.assignment_description;

        // planner.due_date = moment(element.due_date).format("MM/DD/YYYY");
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
        // meetingobj["groupId"] = "Meeting";

        listobj["title"] = title;
        listobj["meeting"] = meeting;
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.meetingDetails.push(listobj);
        eventList.push(meetingobj);
      });
      this.sessionList?.forEach((element) => {
        var meetingobj = {};
        var listobj = {};
        let title = "";
        if (element.assignment_id) {
          title = "Study Session " + element.assignments?.task;
        } else {
          title = "Study Session " + element.subject?.subject_name;
        }

        const color = element.subject?.color_code;
        // }
        var dateMeeting = element.date;
        var timeValNum = element.time;
        var tmeMeeting = this.formatAMPM(element.time);
        var start = dateMeeting + "T" + tmeMeeting;
        meetingobj["title"] = title;
        meetingobj["color"] = color;
        meetingobj["start"] = start;
        meetingobj["id"] = element.id;
        meetingobj["groupId"] = "study";
        // meetingobj["type"] = "study";

        listobj["title"] = title;
        listobj["meeting"] = "Study Session";
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        // this.meetingDetails.push(listobj);
        eventList.push(meetingobj);
      });
      // this.calendarOptions.events = eventList;
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
      console.log("arg", arg);
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
  },
};
</script>


<style>
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
  .study-status-img img {
    width: 80px;
    height: auto;
  }
  .study-status-studied {
    font-weight: 600;
    color: #ff6d6d;
  }
  @media (min-width:991.98px) {
    .h-lg-100{
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
  </style>
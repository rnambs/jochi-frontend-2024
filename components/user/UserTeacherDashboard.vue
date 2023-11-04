<template>
  <div>
    <!-- <div
      id="pageLoader"
      class="bg-primary-light02 d-flex align-items-center justify-content-center position-fixed vh-100 vw-100 left-0 top-0"
      style="z-index: 9"
      v-if="!isHidden"
    >
      <h1 data-loading-text="Loading..." class="display-4 loading"></h1>
    </div> -->
    <!-- <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    /> -->
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div class="main-section">
      <!-- teacher Page -->
      <section id="teacher-detail" class="">
        <div class="teacher-section">
          <div
            class="inner-teacher bg-global m--12 custom-full-height d-flex flex-column"
          >
            <div
              class="d-flex justify-content-between align-items-start"
            >
              <div class="d-flex flex-column">
                <h5 class="mb-1 color-dark font-semi-bold">
                  Hello {{ firstName? (firstName+'!'):'' }}
                </h5>
                <h3 class="color-primary-dark heading3 font-semi-bold">Welcome Back to Jochi</h3>
              </div>
              <div class="d-flex align-items-center">
                <!-- <div class="btn color-dark font-semi-bold mr-3">FAQs</div> -->
                <a
                  class="btn color-dark font-semi-bold mr-3"
                  href="https://www.jochi.info/faqs"
                >
                  FAQ's
                </a>
                <!-- <div class="btn color-dark font-semi-bold mr-4">
                  Privacy Policy
                </div> -->
                <a
                  class="btn color-dark font-semi-bold mr-2"
                  href="https://www.jochi.info/privacy-policy"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
            <div class="h-40 flex-fill custom-overflow">
              <div class="row h-100">
                <!-- CALANDER -->
                <!-- AGENDA -->
                <div
                  class="col-md-6 container custom-teacher-container d-flex flex-column h-100"
                >
                  <div
                    class="time-slot container p-4 card card-primary02 rounded-22 h-100"
                  >
                    <h4 class="color-dark mb-4 px-2 font-semi-bold">
                      Meetings for <span class="color-primary">{{ showDate }}</span> 
                    </h4>
                    <div class="h-40 flex-fill hidden-scroll">
                      <div
                        class="card bg-primary-light02 border-0 d-flex flex-row align-items-center mb-2 p-3"
                        v-for="(list, index) in listAgenda"
                        :key="index"
                      >
                        <span
                          class="image-icon py-0 d-flex align-items-center justify-content-center bg-primary rounded-circle p-2"
                        >
                          <i
                            class="fas fa-users color-white"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <div class="time-detail pl-3 py-0">
                          <h4 class="color-dark font-semi-bold text-18 mb-1">
                            {{ list["title"] }}
                          </h4>
                          <span class="color-secondary"
                            ><i class="far fa-clock"></i>
                          </span>
                          <span class="color-gray font-regular text-16">
                            {{ list["time"] + " to " + list["endTime"] }}
                          </span>
                        </div>
                      </div>
                      <div
                        v-if="listAgenda.length == 0"
                        class="empty-shedule d-flex h-100 justify-content-center align-items-center"
                      >
                        <p class="color-gray text-center">
                          No meetings for the day
                        </p>
                      </div>
                    </div>

                    <!-- </div>
                    </div> -->
                  </div>
                </div>
                <!-- END AGENDA -->
                <div
                  class="col-md-6 custom-teacher-container d-flex flex-column h-100"
                >
                  <!-- TABLE  -->
                  <div
                    class="teacher-row container mb-4 card card-primary02 rounded-22 p-0 h-40 flex-fill"
                  >
                    <div class="appointment-req d-flex flex-column h-100 p-2">
                      <h6 class="text-center color-primary-dark pt-2 mb-1">
                        Meeting Requests
                      </h6>
                      <div
                        class="table-req container py-1 custom-overflow-x custom-overflow h-100"
                      >
                        <table class="table mb-0">
                          <thead>
                            <tr class="color-dark font-semi-bold">
                              <td
                                scope="col"
                                class="font-semi-bold text-14"
                              ></td>
                              <td scope="col" class="font-semi-bold text-14">
                                Name
                              </td>
                              <td scope="col" class="font-semi-bold text-14">
                                Date
                              </td>
                              <td scope="col" class="font-semi-bold text-14">
                                Time
                              </td>
                              <td scope="col" class="font-semi-bold text-14">
                                Duration
                              </td>
                              <td scope="col" class="font-semi-bold text-14">
                                Accept
                              </td>
                              <td scope="col" class="font-semi-bold text-14">
                                Reject
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="teacher in teachersList"
                              :key="teacher.id"
                            >
                              <td scope="row"></td>
                              <td class="text-12">{{ teacher["title"] }}</td>
                              <td class="text-nowrap text-12">
                                {{ teacher["date"] }}
                              </td>
                              <td class="text-nowrap text-12">
                                {{ teacher["time"] }}
                              </td>
                              <td class="text-12">30 Min</td>
                              <td>
                                <button
                                  class="d-flex btn border border-success text-success meet-req px-3 py-1"
                                  @click="
                                    TeacherMeetingConfirm(
                                      teacher.studentId,
                                      teacher.reqId,
                                      1,
                                      teacher.selectableDate
                                    )
                                  "
                                >
                                  <i
                                    class="fa fa-check text-12 px-1"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </td>
                              <td>
                                <button
                                  class="d-flex btn border border-danger text-danger px-3 py-1"
                                  @click="
                                    TeacherMeetingConfirm(
                                      teacher.studentId,
                                      teacher.reqId,
                                      2
                                    )
                                  "
                                >
                                  <i
                                    class="fa fa-times text-12 px-1"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </td>
                              <td>
                                <button
                                  @click="setMeeting(teacher)"
                                  class="d-flex btn border border-primary text-primary px-3 py-1"
                                >
                                  <i class="fas fa-eye text-12"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div
                          v-if="teachersList.length == 0"
                          class="empty-shedule"
                        >
                          <p class="color-gray text-12">No data found</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- END TABLE  -->
                  <div
                    class="inner-custom-teacher dashboard-cal calendar-sm container p-3 pt-5 card card-secondary rounded-22"
                  >
                    <FullCalendar :options="calendarOptions" />
                  </div>
                </div>
                <!-- END CALANDER -->
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- modal pop up -->
      <div
        class="modal fade"
        id="mediumModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mediumModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-md"
          role="document"
        >
          <div class="modal-content h-auto">
            <div class="modal-header text-dark pb-1">
              <h3 class="modal-title heading3" id="mediumModalLabel">Meeting Request</h3>
              <!-- <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button> -->
            </div>
            <div class="modal-body pb-3">
              <p
                v-if="meetingDetail && meetingDetail.date"
                class="font-bold text-24 color-dark mb-1"
              >
                {{ meetingDetail.date }}
              </p>
              <p
                v-if="
                  meetingDetail &&
                  meetingDetail.default_slots &&
                  meetingDetail.default_slots.start_time &&
                  meetingDetail.default_slots.end_time
                "
                class="mb-1 font-semi-bold text-18 color-primary-dark"
              >
                {{ meetingDetail.default_slots.start_time }} -
                {{ meetingDetail.default_slots.end_time }}
              </p>
              <div class="row py-0">
                <div class="col-3">
                  <p class="mb-0 font-semi-bold color-dark text-16">Name</p>
                </div>
                <div class="col">
                  <p class="mb-0 color-dark font-regular text-16 d-flex">
                    <span class="px-2"> : </span>
                    <span v-if="meetingDetail && meetingDetail.meeting_name">{{
                      meetingDetail.meeting_name
                    }}</span>
                  </p>
                </div>
              </div>
              <div class="row py-0 mt-0">
                <div class="col-3">
                  <p class="mb-0 font-semi-bold color-dark text-16">With</p>
                </div>
                <div class="col">
                  <p class="mb-0 color-dark font-regular text-16 d-flex">
                    <span class="px-2"> : </span>
                    <span v-if="meetingDetail && meetingDetail.title">{{
                      meetingDetail.title
                    }}</span>
                  </p>
                </div>
              </div>
              <!-- <div class="row py-1">
                <div class="col-3">
                  <p class="mb-0 font-semi-bold color-dark text-16">Date</p>
                </div>
                <div class="col">
                  <p class="mb-0 color-dark font-regular text-16 d-flex">
                    <span class="px-2"> : </span>
                    <span v-if="meetingDetail && meetingDetail.date">{{
                      meetingDetail.date
                    }}</span>
                  </p>
                </div>
              </div> -->
              <!-- <div class="row py-1">
                <div class="col-3">
                  <p class="mb-0 font-semi-bold color-dark text-16">Time</p>
                </div>
                <div class="col">
                  <p class="mb-0 color-dark font-regular text-16 d-flex">
                    <span class="px-2"> : </span>
                    <span
                      v-if="
                        meetingDetail &&
                        meetingDetail.default_slots &&
                        meetingDetail.default_slots.start_time &&
                        meetingDetail.default_slots.end_time
                      "
                      >{{ meetingDetail.default_slots.start_time }} -
                      {{ meetingDetail.default_slots.end_time }}</span
                    >
                  </p>
                </div>
              </div> -->

              <div class="row py-0 mt-0">
                <div class="col-3">
                  <p class="mb-0 font-semi-bold color-dark text-16">
                    Description
                  </p>
                </div>
                <div class="col">
                  <p class="mb-0 color-dark font-regular text-16 d-flex">
                    <span class="px-2"> : </span>
                    <span
                      v-if="meetingDetail && meetingDetail.meeting_description"
                      >{{ meetingDetail.meeting_description }}</span
                    >
                  </p>
                </div>
              </div>
              <div class="row py-0 mt-0">
                <div class="col-3">
                  <p class="mb-0 font-semi-bold color-dark text-16">Type</p>
                </div>
                <div class="col">
                  <p class="mb-0 color-dark font-regular text-16 d-flex">
                    <span class="px-2"> : </span>
                    <span
                      v-if="meetingDetail && meetingDetail.conversation_type"
                      >{{ meetingDetail.conversation_type }}</span
                    >
                  </p>
                </div>
              </div>
              <div
                v-if="meetingDetail && meetingDetail.meeting_link"
                class="row py-0"
              >
                <div class="col-3">
                  <p class="mb-0 font-semi-bold color-dark text-16">Link</p>
                </div>
                <div class="col">
                  <p class="mb-0 color-dark font-regular text-16 d-flex">
                    <span class="px-2"> : </span>
                    <span>{{ meetingDetail.meeting_link }}</span>
                  </p>
                </div>
              </div>
              <div
                v-if="meetingDetail && meetingDetail.meeting_location"
                class="row py-0 mt-0"
              >
                <div class="col-3">
                  <p class="mb-0 font-semi-bold color-dark text-16">Location</p>
                </div>
                <div class="col">
                  <p class="mb-0 color-dark font-regular text-16 d-flex">
                    <span class="px-2"> : </span>
                    <span>{{ meetingDetail.meeting_location }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-end border-top-0 bg-global text-dark">
              <button
                v-if="
                  meetingDetail &&
                  meetingDetail.studentId &&
                  meetingDetail.reqId
                "
                class="d-flex btn btn-secondary rounded-8 px-4 py-1 mx-2 font-semi-bold"
                @click="
                  TeacherMeetingConfirm(
                    meetingDetail.studentId,
                    meetingDetail.reqId,
                    2
                  )
                "
              >
                <span class="text-16">Reject</span>
              </button>
              <button
                v-if="
                  meetingDetail &&
                  meetingDetail.studentId &&
                  meetingDetail.reqId &&
                  meetingDetail.selectableDate
                "
                class="d-flex btn btn-primary rounded-8 px-4 py-1 font-semi-bold"
                @click="
                  TeacherMeetingConfirm(
                    meetingDetail.studentId,
                    meetingDetail.reqId,
                    1,
                    meetingDetail.selectableDate
                  )
                "
              >
                <span class="text-16">Accept</span>
              </button>
              <button
                v-else
                data-dismiss="modal"
                class="d-flex btn btn-secondary rounded-8 px-4 py-1 mx-2 font-semi-bold"
              >
                <span class="text-16">Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- modal pop up end -->
      <!-- End teacher Page -->
    </div>
  </div>
</template>
<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { mapState, mapActions } from "vuex";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
var dateStr = "";
var ismounted = false;
var isAccepted = false;
var selectDate = "";
var teachersList = [];
var dateSelectValue = "";

export default {
  name: "UserTeacherAppointment",
  components: {
    FullCalendar,
    lottie,
  },
  data() {
    return {
      firstName: "",
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
      meetingDetail: {},
      studentIdConfirm: "",
      reqIdConfirm: "",
      statusConfirm: "",
      dateConfirm: "",
      isHidden: false,
      showDate: "",
    };
  },
  mounted() {
    this.loading=true;
    ismounted = true;
    this.ListTeacherAgenda();
    this.TeacherMeetingList();
    this.firstName = localStorage.getItem("firstName");
    this.activate();
    setTimeout(() => {
      this.loading=false;
    }, 3000);
  },

  computed: {
    ...mapState("teacherAppointment", {
      agendaList: (state) => state.agendaList,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      teachers: (state) => state.teachers,
    }),
  },
  methods: {
    activate() {
      setTimeout(() => (this.isHidden = true), 1500);
    },
    ...mapActions("teacherAppointment", {
      listTeacherAgenda: "listTeacherAgenda",
      teacherMeetingList: "teacherMeetingList",
      teacherMeetingConfirm: "teacherMeetingConfirm",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    setMeeting(teacher) {
      $("#mediumModal").modal("show");
      this.meetingDetail = teacher;
    },
    async TeacherMeetingList() {
      await this.teacherMeetingList({
        teacher_id: localStorage.getItem("id"),
      });
      this.teachersList = [];
      this.teachers.forEach((element) => {
        var Scheduleobj = {};
        var title = element.title;
        var time = element.default_slots.start_time;
        var studentId = element.student_id;
        var reqId = element.request_id;
        var selectableDate = element.date;
        Scheduleobj["date"] = this.formatDate(element.date);
        Scheduleobj["title"] = title;
        Scheduleobj["time"] = time;
        Scheduleobj["studentId"] = studentId;
        Scheduleobj["reqId"] = reqId;
        Scheduleobj["selectableDate"] = selectableDate;

        Scheduleobj["conversation_type"] = element.conversation_type;
        Scheduleobj["dateSelected"] = element.date;
        Scheduleobj["default_slots"] = element.default_slots;
        Scheduleobj["meeting_description"] = element.meeting_description;
        Scheduleobj["meeting_location"] = element.meeting_location;
        Scheduleobj["meeting_link"] = element.meeting_link;
        Scheduleobj["meeting_name"] = element.meeting_name;
        this.teachersList.push(Scheduleobj);
      });
    },
    async ListTeacherAgenda() {
      await this.listTeacherAgenda({
        teacher_id: localStorage.getItem("id"),
      });
      if (ismounted) {
        let argVal = {};
        let today = new Date();
        this.currentTime = this.formatAMPM(today);

        dateStr = today.toISOString().split("T")[0];

        argVal = { dateStr: dateStr };
        this.handleDateClick(argVal);
      }
      if (isAccepted) {
        isAccepted = false;
        let argVal = { dateStr: dateStr };

        this.handleDateClick(argVal);
      }
    },
    async TeacherMeetingConfirm(
      student_value,
      request_value,
      value,
      dateSelect = null
    ) {
      this.loading = true;
      isAccepted = true;
      var numValue = value;
      selectDate = dateSelect;
      await this.teacherMeetingConfirm({
        request_id: request_value,
        student_id: student_value,

        meeting_request: numValue.toString(),
      });
      this.loading = false;
      if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      } else if (this.successMessage != "") {
        if ($("#mediumModal").hasClass("show")) {
          $("#mediumModal").modal("hide");
          $(".modal").modal("hide");
          $(".modal-backdrop").remove();
        }
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        if (dateSelect) {
          if (dateSelectValue) {
            let today = new Date();
            this.currentTime = this.formatAMPM(today);

            var todayStr = today.toISOString().split("T")[0];
            if (dateSelectValue == todayStr) {
              $('.fc-day[data-date="' + dateSelectValue + '"]').css(
                "background-color",
                "#F49196"
              );
            } else {
              $('.fc-day[data-date="' + dateSelectValue + '"]').css(
                "background-color",
                "#424246"
              );
            }
          }

          $('.fc-day[data-date="' + dateSelect + '"]').css(
            "background-color",
            "#5B5B5E"
          );
          dateSelectValue = dateSelect;
        }

        if (dateSelect) {
          dateStr = dateSelect;
        }
      }
      this.ListTeacherAgenda();
      this.TeacherMeetingList();
    },

    handleDateClick: function (arg) {
      this.listAgenda = [];
      this.showDate = moment(arg.dateStr).format("MM/DD/YYYY");

      this.agendaList.forEach((element) => {
        var listObj = {};
        if (element.date == arg.dateStr) {
          listObj["time"] = element.default_slots.start_time;
          listObj["endTime"] = element.default_slots.end_time;
          listObj["title"] = element.title;
          this.listAgenda.push(listObj);
        }
      });
      if (!ismounted) {
        this.ListTeacherAgenda();
      }
      ismounted = false;
    },

    clickedDay: function (date) {},

    formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },

    formatDate(input) {
      var datePart = input.match(/\d+/g),
        year = datePart[0], // get only two digits
        month = datePart[1],
        day = datePart[2];

      return month + "-" + day + "-" + year;
    },
  },
  beforeRouteLeave: function(route, redirect, next) {
    console.log("before route leave",route, redirect, next);
    if (next) next();
  },
};
</script>

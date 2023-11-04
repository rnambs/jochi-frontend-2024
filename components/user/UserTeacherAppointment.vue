<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />

    <div class="main-section">
      <!-- teacher Page -->
      <section id="teacher-detail" class="">
        <div
          class="teacher-section bg-global border-0 rounded-10 m--12 custom-full-height d-flex flex-column"
        >
          <h3 class="color-primary-dark heading3 font-semi-bold mb-2">
            Your Meetings
          </h3>

          <div
            class="inner-teacher d-flex flex-column h-40 flex-fill custom-overflow"
          >
            <div class="d-flex h-100 flex-column">
              <div>
                <div class="row teacher-row">
                  <!-- CALANDER -->
                  <div
                    class="col-md-6 custom-teacher-container d-flex flex-column"
                  >
                    <div
                      class="inner-custom-teacher text-light p-3 pt-5 card card-secondary rounded-22 flex-fill calendar-sm"
                    >
                      <FullCalendar :options="calendarOptions" />
                    </div>
                  </div>
                  <!-- END CALANDER -->

                  <!-- AGENDA -->
                  <div
                    class="col-md-6 custom-teacher-container d-flex flex-column"
                  >
                    <div
                      class="inner-custom-teacher p-3 card card-primary02 rounded-22 flex-fill calendar-sm"
                    >
                      <h4 class="font-semi-bold color-dark text-center">
                        Meetings
                      </h4>
                      <div class="inner-agenda custom-overflow pr-2 mr--2">
                        <div
                          class="row container my-2 mx-0 py-0"
                          v-for="(list, index) in listAgenda"
                          :key="index"
                          @click="setMeetingView(list)"
                        >
                          <div
                            class="card card-white w-100 d-flex flex-row align-items-center mb-2 px-3 py-2 cursor-pointer"
                          >
                            <span
                              class="image-icon py-0 d-flex align-items-center justify-content-center bg-primary rounded-circle p-2"
                            >
                              <i
                                class="fas fa-users color-white"
                                aria-hidden="true"
                              ></i>
                            </span>

                            <div
                              class="time-detail pl-3 py-0 d-flex align-items-center justify-content-between flex-wrap w-100"
                            >
                              <h4
                                class="color-dark font-semi-bold text-18 mb-1 me-3"
                              >
                                {{ list["title"] }}
                              </h4>
                              <div>
                                <span class="color-secondary"
                                  ><i class="far fa-clock"></i>
                                </span>
                                <span
                                  class="color-secondary font-regular text-16"
                                >
                                  {{ list["time"] }}
                                </span>
                              </div>
                            </div>

                            <!-- <div class="col-3 time py-0">
                              <p
                                class="
                                  time
                                  text-center
                                  d-flex
                                  align-items-center
                                  justify-content-center
                                  mb-0
                                  p-3
                                  m-1
                                  text-14
                                "
                              >
                                {{ list["time"] }}
                              </p>
                            </div>
                            <div class="col px-0 py-0">
                              <p class="p-3 card card-white m-0">
                                <span
                                  class="
                                    club-name
                                    color-dark
                                    font-semi-bold
                                    text-truncate
                                  "
                                  >{{ list["title"] }}</span
                                >
                                <span class="club-i"><i></i> </span>
                              </p>
                            </div> -->
                          </div>
                        </div>
                        <div
                          v-if="listAgenda.length == 0"
                          class="empty-shedule d-flex justify-content-center align-items-center h-100"
                        >
                          <p>No meetings for the day</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- END AGENDA -->
                </div>
              </div>

              <!-- TABLE  -->
              <div
                class="teacher-row d-flex flex-column flex-fill h-40 mt-3 p-0"
              >
                <div
                  class="col-md-12 p-0 custom-teacher-container d-flex flex-column card card-primary02 rounded-22"
                >
                  <div class="appointment-req d-flex flex-column h-100 pb-2">
                    <h4 class="text-center color-dark font-semi-bold pt-4 mb-3">
                      Meeting Requests
                    </h4>
                    <div
                      class="table-req hidden-scroll custom-overflow-x container py-0"
                    >
                      <table class="table">
                        <thead>
                          <tr>
                            <td scope="col"></td>
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
                          <tr v-for="teacher in teachersList" :key="teacher.id">
                            <td scope="row"></td>
                            <td class="text-14">{{ teacher["title"] }}</td>
                            <td class="text-14">{{ teacher["date"] }}</td>
                            <td class="text-14">{{ teacher["time"] }}</td>
                            <td class="text-14">30 Min</td>
                            <td>
                              <button
                                class="d-flex btn border border-success text-success px-3 py-1"
                                @click="
                                  openModal(
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
                                  openModal(teacher.studentId, teacher.reqId, 2)
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
              </div>
              <!-- END TABLE  -->
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
            <div class="modal-footer justify-content-end border-top-0 text-dark">
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
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-md modal-dialog-centered"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header pb-0">
              <h3 class="modal-title" id="exampleModalLongTitle">
                Confirm Operation
              </h3>
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
              <div>
                Are you sure you want to
                {{ statusConfirm == "1" ? "Accept" : "Reject" }} the meeting
                scheduled?
              </div>
            </div>
            <div class="modal-footer justify-content-end border-top-0">
              <button
                type="button"
                class="btn btn-secondary py-1 px-4 rounded-8 font-semi-bold"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary py-1 px-4 rounded-8 font-semi-bold"
                data-dismiss="modal"
                @click="confirmAcceptReject()"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal End -->
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
    };
  },
  mounted() {
    ismounted = true;
    this.ListTeacherAgenda();
    this.TeacherMeetingList();
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
    ...mapActions("teacherAppointment", {
      listTeacherAgenda: "listTeacherAgenda",
      teacherMeetingList: "teacherMeetingList",
      teacherMeetingConfirm: "teacherMeetingConfirm",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
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
        this.studentIdConfirm = "";
        this.reqIdConfirm = "";
        this.statusConfirm = "";
        this.dateConfirm = "";
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
      this.TeacherMeetingList();
      this.ListTeacherAgenda();
    },

    handleDateClick: function (arg) {
      this.listAgenda = [];

      this.agendaList.forEach((element) => {
        var listObj = {};
        if (element.date == arg.dateStr) {
          listObj["time"] = element.default_slots.start_time;
          listObj["title"] = element.title;
          listObj["id"] = element.id;
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

    setMeeting(teacher) {
      $("#mediumModal").modal("show");
      this.meetingDetail = teacher;
    },
    setMeetingView(teacher) {
      let element = this.agendaList.find((e) => e.id == teacher.id);

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

      $("#mediumModal").modal("show");
      this.meetingDetail = Scheduleobj;
    },
    async openModal(studentId, reqId, status, date = "") {
      this.studentIdConfirm = studentId;
      this.reqIdConfirm = reqId;
      this.statusConfirm = status;
      this.dateConfirm = date;
      $("#exampleModalCenter").modal({ backdrop: true });
    },
    async confirmAcceptReject() {
      this.TeacherMeetingConfirm(
        this.studentIdConfirm,
        this.reqIdConfirm,
        this.statusConfirm,
        this.dateConfirm
      );
      // $(".modal").modal("hide");
      // $(".modal-backdrop").remove();
    },
  },
};
</script>

<style>
.modal-backdrop {
  display: none;
}
</style>
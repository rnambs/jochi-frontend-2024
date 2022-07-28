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
        <div class="teacher-section">
          <div class="inner-teacher jochi-components-light-bg
          p-4
          custom-margin-for-main-section custom-full-height
          d-flex
          flex-column custom-overflow">

            
          <div class="mb-2">
            <h5 class="mb-1  color-dark font-semi-bold" >Hello {{ firstName }}</h5>
            <h2 class="color-primary font-semi-bold">Have a great day</h2>
          </div>

            <div class="row h-40 flex-fill">
              <!-- CALANDER -->
              <!-- AGENDA -->
              <div class="col-md-7 container custom-teacher-container d-flex flex-column h-100">

                <div class="time-slot container p-4 card card-primary rounded-22 h-100">
                  <h4 class="color-dark mb-4 px-2 font-semi-bold">Meetings Today</h4>
                  <div class="h-40 flex-fill hidden-scroll">
                      <div
                        class="card card-white d-flex flex-row align-items-center mb-2 p-3"
                        v-for="(list, index) in listAgenda"
                        :key="index"
                      >
                        <span class="image-icon py-0 d-flex align-items-center justify-content-center bg-primary rounded-circle p-2">
                          <i
                            class="fas fa-users color-white"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <div class="time-detail pl-3 py-0">
                          <h4 class="color-dark font-semi-bold text-18 mb-1">
                            {{ list["title"] }}
                          </h4>
                          <span class="color-secondary "
                            ><i class="far fa-clock"></i>
                          </span>
                          <span class="color-secondary font-regular text-16">
                            {{ list["time"] + " to " + list["endTime"] }}
                          </span
                          >
                        </div>
                      </div>
                      <div v-if="listAgenda.length == 0" class="empty-shedule">
                        <p class="color-secondary  text-center">No meetings for the day</p>
                      </div>
                  </div>

                  <!-- </div>
                  </div> -->
                </div>
              </div>
              <!-- END AGENDA -->
              <div class="col-md-5 custom-teacher-container d-flex flex-column h-100">
                <!-- TABLE  -->
                <div class="teacher-row container mb-3 card card-primary rounded-22 p-0 h-40 flex-fill">
                  <div class="appointment-req d-flex flex-column h-100 p-2">
                    <h6 class="text-center color-primary pt-3 mb-0">Meeting Requests</h6>
                    <div class="table-req container py-3 custom-overflow-x custom-overflow">
                      <table class="table mb-0">
                        <thead>
                          <tr class="color-dark font-semi-bold">
                            <td scope="col" class="font-semi-bold text-14"></td>
                            <td scope="col" class="font-semi-bold text-14">Name</td>
                            <td scope="col" class="font-semi-bold text-14">Date</td>
                            <td scope="col" class="font-semi-bold text-14">Time</td>
                            <td scope="col" class="font-semi-bold text-14">Duration</td>
                            <td scope="col" class="font-semi-bold text-14">Accept</td>
                            <td scope="col" class="font-semi-bold text-14">Reject</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="teacher in teachersList" :key="teacher.id">
                            <td scope="row"></td>
                            <td class="text-12">{{ teacher["title"] }}</td>
                            <td class="text-nowrap text-12">{{ teacher["date"] }}</td>
                            <td class="text-nowrap text-12">{{ teacher["time"] }}</td>
                            <td class="text-12">30 Min</td>
                            <td>
                              <button
                                class="
                                  d-flex
                                  btn
                                  border border-success
                                  text-success
                                  meet-req
                                  px-3 py-1
                                "
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
                                class="
                                  d-flex
                                  btn
                                  border border-danger
                                  text-danger
                                  px-3 py-1
                                "
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
                          </tr>
                        </tbody>
                      </table>
                      <div
                        v-if="teachersList.length == 0"
                        class="empty-shedule"
                      >
                        <p>No data found</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- END TABLE  -->
                <div class="inner-custom-teacher dashboard-cal container p-3 card card-primary rounded-22">
                  <FullCalendar :options="calendarOptions" />
                </div>
              </div>
              <!-- END CALANDER -->
            </div>
          </div>
        </div>
      </section>

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
    };
  },
  mounted() {
    ismounted = true;
    this.ListTeacherAgenda();
    this.TeacherMeetingList();
    this.firstName = localStorage.getItem("first_name");
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
};
</script>

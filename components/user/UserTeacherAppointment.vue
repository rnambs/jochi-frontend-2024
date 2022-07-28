<template>
<div>
   <lottie v-if="loading" :options="lottieOptions" v-on:animCreated="handleAnimation" class="lottie-loader"  />

  <div class="main-section">
    <!-- teacher Page -->
    <section id="teacher-detail" class="">
      <div class="teacher-section jochi-components-light-bg
      p-4
      custom-margin-for-main-section custom-full-height
      d-flex
      flex-column custom-overflow">
        <h2 class="color-primary font-semi-bold m-0 p-3">Teacher Appointment</h2>
        <div class="inner-teacher p-3 d-flex flex-column flex-fill">
          <div class="row teacher-row">
            
            <!-- CALANDER -->
            <div class="col-md-5 custom-teacher-container d-flex flex-column">
              <div class="inner-custom-teacher text-light  p-2 card card-primary rounded-22 flex-fill">
                <FullCalendar :options="calendarOptions" />
              </div>
            </div>
            <!-- END CALANDER -->

            <!-- AGENDA -->
            <div class="col-md-7  custom-teacher-container d-flex flex-column">
              <div class="inner-custom-teacher  p-3 card card-primary rounded-22 flex-fill">
                <h6 class="font-semi-bold color-dark text-center">Meetings</h6>
                <div class="inner-agenda flex-fill">
                  <div
                    class="row container m-0 p-0"
                    v-for="(list, index) in listAgenda"
                    :key="index"
                  >
                    <div class="col-3 time text-center py-0">
                      <p class="time p-2">{{ list["time"] }}</p>
                    </div>
                    <div class="col time-detail px-2 py-0">
                      <p class="p-2 m-0">
                        <span class="club-name">{{ list["title"] }}</span>
                        <span class="club-i"><i></i> </span>
                      </p>
                    </div>
                  </div>
                  <div v-if="listAgenda.length == 0" class="empty-shedule">
                    <p>No meetings for the day</p>
                  </div>
                </div>
              </div>
        
            </div>
            <!-- END AGENDA -->
          </div>

          <!-- TABLE  -->
          <div class="teacher-row mt-4 p-0">
            <div class="col-md-12 p-0 custom-teacher-container d-flex flex-column card card-primary rounded-22">
              <div class="appointment-req pb-2">
                <h6 class="text-center color-dark font-semi-bold pt-4 mb-0">Meeting Requests</h6>
                <div class="table-req container py-0">
                  <table class="table">
                    <thead>
                      <tr>
                        <td scope="col"></td>
                        <td scope="col">Name</td>
                        <td scope="col">Date</td>
                        <td scope="col">Time</td>
                        <td scope="col">Duration</td>
                        <td scope="col">Accept</td>
                        <td scope="col">Reject</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="teacher in teachersList" :key="teacher.id">
                        <td scope="row"></td>
                        <td>{{ teacher["title"] }}</td>
                        <td>{{ teacher["date"] }}</td>
                        <td>{{ teacher["time"] }}</td>
                        <td>30 Min</td>
                        <td>
                          <button
                            class="d-flex btn border border-success text-success px-3 py-1"
                            @click="
                              TeacherMeetingConfirm(teacher.studentId,teacher.reqId, 1,teacher.selectableDate)"
                          >
                            <i class="fa fa-check text-12 px-1" aria-hidden="true"></i>
                          </button>
                        </td>
                        <td>
                          <button
                            class="d-flex btn border border-danger text-danger px-3 py-1"
                            @click="
                              TeacherMeetingConfirm(teacher.studentId,teacher.reqId, 2)"
                          >
                            <i class="fa fa-times text-12 px-1" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="teachersList.length == 0" class="empty-shedule">
                    <p>No data found</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- END TABLE  -->
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
import lottie from 'vue-lottie/src/lottie.vue'
import * as animationData from "~/assets/animation.json";
var dateStr = "";
var ismounted = false;
var isAccepted = false;
var selectDate = "";
var teachersList = [];
var dateSelectValue ="";

export default {
  name: "UserTeacherAppointment",
  components: {
    FullCalendar,
    lottie
  },
  data() {
    return {
      listAgenda: [],
      teachersList:[],
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
    ismounted = true
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
      this.teachersList=[];
       this.teachers.forEach(element => {
        var Scheduleobj = {};
        var title = element.title;
        var time = element.default_slots.start_time;
        var studentId = element.student_id;
        var reqId =  element.request_id;
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
if(ismounted){
  let argVal = {};
    let today = new Date();
    this.currentTime = this.formatAMPM(today);
    
  dateStr = today.toISOString().split("T")[0];

    argVal = { dateStr: dateStr };
    this.handleDateClick(argVal);
    }
    if(isAccepted){
isAccepted = false;
    let argVal = { dateStr: dateStr };
    
    this.handleDateClick(argVal);
    }
    },
    async TeacherMeetingConfirm(student_value, request_value, value,dateSelect = null) {
      this.loading = true;
      isAccepted = true;
      var numValue = value;
       selectDate = dateSelect;
      await this.teacherMeetingConfirm({
        request_id: request_value,
        student_id: student_value,
        
        meeting_request:numValue.toString(),
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
        if(dateSelect){
        if(dateSelectValue){
           let today = new Date();
    this.currentTime = this.formatAMPM(today);
    
  var todayStr = today.toISOString().split("T")[0];
          if(dateSelectValue==todayStr){
            
            $('.fc-day[data-date="'+dateSelectValue+'"]').css('background-color', '#F49196');
          }else{
$('.fc-day[data-date="'+dateSelectValue+'"]').css('background-color', '#424246');
          }
          
          
        }  

$('.fc-day[data-date="'+dateSelect+'"]').css('background-color', '#5B5B5E');
        dateSelectValue=dateSelect;

        }
        
        
          if(dateSelect){
          dateStr = dateSelect
          }
        this.TeacherMeetingList();
        this.ListTeacherAgenda();

      }
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
      if(!ismounted){
        this.ListTeacherAgenda();
      }
      ismounted = false
    },
    
     clickedDay:function(date) {
      
       
    },
   
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

  formatDate (input) {
  var datePart = input.match(/\d+/g),
  year = datePart[0], // get only two digits
  month = datePart[1], day = datePart[2];

  return month+'-'+day+'-'+year;
},
  },
};
</script>

<template>
  <div class="container-fluid main-container student-dashboard-main">
    <div class="col-12">
      <div class="row">
        <div class="col-2">
          <div class="sd-sidebar bg-white border rounded-10 p-4">
            <div class="sb-head-section">
              <div
                class="d-flex align-items-start justify-content-between mb-3"
              >
                <div class="display-picture-holder">
                  <img src="" alt="" />
                </div>
                <div class="notification-section position-relative">
                  <svg
                    width="426"
                    height="493"
                    viewBox="0 0 426 493"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 442.398H145.6C154.561 471.519 181.44 492.796 212.799 492.796C244.158 492.796 271.037 471.515 279.998 442.398H425.598L425.039 361.757L412.156 358.397C371.836 348.319 368.476 246.957 368.476 216.157C368.476 119.837 310.796 79.5174 267.116 63.2774C267.675 60.4766 267.675 57.6758 267.675 54.879C267.675 24.641 243.034 0 212.796 0C182.558 0 157.917 24.641 157.917 54.879C157.917 57.6798 157.917 60.4806 158.476 63.2774C114.796 80.0784 57.1156 119.836 57.1156 216.157C57.1156 246.958 53.7562 348.317 13.4356 358.397L0.556595 361.757L0 442.398ZM212.8 459.199C202.159 459.199 192.081 454.718 185.359 446.879H240.238C233.519 454.719 223.441 459.199 212.8 459.199V459.199ZM34.16 386.398C71.68 367.918 90.16 310.796 90.16 216.718C90.16 133.839 141.121 102.478 183.68 90.7178L204.399 85.1162L193.758 66.6362C192.078 63.2768 190.957 59.9174 190.957 55.9952C190.957 44.2332 200.477 34.7142 212.238 34.7142C224 34.7142 233.519 44.2337 233.519 55.9952C233.519 59.9171 232.398 63.2764 230.718 66.6362L220.077 85.1162L240.796 90.7178C283.355 102.48 334.316 134.398 334.316 216.718C334.316 310.796 353.355 367.918 390.316 386.398V408.796H34.1564L34.16 386.398Z"
                    />
                  </svg>
                  <div
                    class="position-absolute notification-count-section"
                  ></div>
                </div>
              </div>
              <p class="sb-user-name mb-1">Hannah Scott</p>
              <a href="#" class="sb-settings-btn">Settings</a>
            </div>
            <div class="sb-buttons-section">
              <div class="sb-expand-btn my-3">
                <div class="sb-btn-head d-flex align-items-center">
                  <div class="sb-btn-icon mr-3">
                    <img
                      src="../static/image/Calendar.png"
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
                      src="../static/image/Call.png"
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
                      src="../static/image/Football.png"
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
                      src="../static/image/Lot_of_book.png"
                      alt=""
                      class="study-room"
                    />
                  </div>
                  Study Room
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="row">
            <div class="col-12 position-realtive">
                <div class="dashboard-main-content bg-white border rounded-10 py-4 px-5 position-relative">
                    <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                    <div class="planner-action-btns d-flex align-items-center position-absolute">
                      <button class="pa-btn btn filter-btn mr-3" @click="filterPlanner()" id="filterPlanner">Filter Planner</button>
                      <button class="pa-btn assignment-f-btn btn" @click="assignmentPlanner()" id="assignmentPlanner">Assignment Planner</button>
                    </div>
                    <div class="col-lg-8 col-md-12 p-0 position-absolute assignment-planner-section" id="assignPlanSection">
                      <div class="position-realtive h-100">
                        <div class="dashboard-main-content bg-white border rounded-10 p-4 pl-5">
                          <div class="d-flex justify-content-between align-items-center">
                            <h3 class="jochi-headings">Pending</h3>
                            <button class="add-assignment-btn btn">
                              Add Assignment
                            </button>
                          </div>
                          <div class="col-6 px-0">
                            <div class="bg-white border rounded-8 drag-drop p-4 position-realtive" @click="addAssignment()">
                              <div class="assignment-tag-section d-flex align-items-center mb-2">
                                <div class="assignment-tag red mr-2">Urgent</div>
                                <div class="assignment-tag pink">AP French</div>
                              </div>
                              <div class="assignment-add-section">
                                <h4 class="mb-0">French Oral Practice</h4>
                                <div class="text-center px-3">
                                  <p>Practice for mock oral exam in class</p>
                                </div>
                              </div>
                              <div class="sub-task-section mb-3">
                                <h6>Sub-tasks</h6>
                                <div class="pl-2 d-flex align-items-center">
                                  <input type="radio" class="mr-2" />
                                  <label for="" class="mb-0">Study Vocab List</label>
                                </div>
                                <div class="pl-2 d-flex align-items-center">
                                  <input type="radio" class="mr-2" />
                                  <label for="" class="mb-0"
                                    >Start typing to add subtasks</label
                                  >
                                </div>
                              </div>
                              <div class="addition-material-section">
                                <h6 class="mb-1">Additional Material</h6>
                                <div
                                  class="
                                    d-flex
                                    align-items-center
                                    justify-content-between
                                  "
                                >
                                  <div class="col-8 py-0 pl-0 material-link">
                                    Rubric: https://docs.google.com/document/...
                                  </div>
                                  <div class="col-4 material-date py-0 text-right">
                                    12/04/22
                                  </div>
                                </div>
                              </div>
                              <div class="upload-file-section mt-2">
                                <div class="d-flex align-items-center">
                                  <div class="col-2 p-0">
                                    <select
                                      class="form-select form-control"
                                      aria-label="Default select example"
                                    >
                                      <option selected>Type</option>
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                    </select>
                                  </div>
                                  <div class="col-8 py-0 px-1">
                                    <input
                                      type="text"
                                      class="form-control px-2"
                                      placeholder="Paste Link or Upload File"
                                    />
                                  </div>
                                  <div class="col-2 p-0">
                                    <input
                                      type="submit"
                                      class="form-control"
                                      value="Add"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="add-person-section position-absolute">
                                <div class="ap-img-section"></div>
                                <div class="ap-img-add">
                                  <img src="../static/image/add-btn.png" alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <h3 class="jochi-headings">Completed</h3>
                          <div class="row mt-1">
                            <div class="col-6">
                              <div
                                class="
                                  bg-white border rounded-8
                                  py-4
                                  px-2
                                  completed-assignments
                                  text-center
                                "
                              >
                                <h4 class="mb-0 blue">Art History Reading</h4>
                                <p class="mb-0">Read Chapters #1 & #2</p>
                              </div>
                            </div>
                            <div class="col-6">
                              <div
                                class="
                                  bg-white border rounded-8
                                  py-4
                                  px-2
                                  completed-assignments
                                  text-center
                                "
                              >
                                <h4 class="mb-0 green">AP Calculus Problem</h4>
                                <p class="mb-0">Homework #5</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="bg-white border rounded-10 p-4 pl-5 position-absolute pending-assignment-popup">
                          <div class="d-flex justify-content-between align-items-center">
                            <h1>Test</h1>
                            <button class="btn pending-popup-close-btn" @click="pendingPopupclose()">x</button>
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
</template>

<script>
  import StudentDashboard from "~/components/StudentDashboard.vue";
  import { required } from "vuelidate/lib/validators";
    import { mapState, mapActions } from "vuex";
    import VueToast from "vue-toast-notification";
    import FullCalendar, { Calendar } from "@fullcalendar/vue";
    import dayGridPlugin from "@fullcalendar/daygrid";
    import interactionPlugin from "@fullcalendar/interaction";
    import lottie from "vue-lottie/src/lottie.vue";
    import * as animationData from "~/assets/animation.json";
    import VueTimepicker from "vue2-timepicker";
    import "vue2-timepicker/dist/VueTimepicker.css";
    // import "../../static/css/var.scss";
    import moment from "moment";

  var eventList = [
    {
      id: 1,
      title: "Meeting",
      start: "2022-06-16T00:30:00",
      end: "2022-06-16T02:30:00",
    },
    {
      id: 2,
      title: "Meeting",
      start: "2022-06-16T12:30:00",
      end: "2022-06-16T14:30:00",
    },
    {
      id: 3,
      title: "Birthday Party",
      start: "2022-06-16T07:00:00",
      extendedProps: { status: "wholeleel" },
    },
  ];


var fromDate = "";
var endDate = "";
var idValue = "";
var eventList = [];
var dateValueNum = "";

export default {
  name: "PlannerMonth",
  components: {
    FullCalendar,
    lottie,
    VueTimepicker,
  },
  data() {
    return {
      isAssignmentEdit: false,
      date_today: new Date(),
      disabledDates: {
        to: new Date(),
      },
      submitted: false,
      processing: false,
      subject: "",
      task: "",
      priorityVal: "",
      timeValue: "",
      subjectValue: "",
      taskValue: "",
      timeList: "",
      dateValue: "",
      dateValueEdit: "",
      idValue: "",
      idNum: "",
      value: "",
      popTitle: "",
      popMeeting: "",
      popTime: "",
      popDate: "",
      dateListValue: "",
      meetingDetails: [],
      calendarDate: "",
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      calendarApi: Calendar,
      calendarOptions: {
        showNonCurrentDates: false,
        displayEventTime: false,
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
        plugins: [dayGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev",
          center: "title",
          right: "next",
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
    };
  },
  mounted() {
    this.disabledDates.to = new Date(
      this.date_today.getFullYear(),
      this.date_today.getMonth(),
      this.date_today.getDate()
    );
    this.getSubjectsList();
    this.calendarApi = this.$refs.fullCalendar.getApi();
    this.GetMonthlyPlanner();
    //priority
    //priority dropdown
    const _this = this;
    $(".dropdown-menu li").on("click", function () {
      var getValue = $(this).text();
      $(".dropdown-select").text(getValue);
      _this.filterOption(getValue);
    });

    //date picker
    var today = new Date();
    var future = new Date();
    future.setDate(future.getDate() + 30);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var today = dd + "/" + mm + "/" + yyyy;

    $(function () {
      fromDate = "";
      endDate = "";
      $('input[name="daterange"]').daterangepicker({
        // autoUpdateInput: false,
        singleDatePicker: true,
        minDate: today,
        maxDate: future,
        opens: "left",
        locale: {
          // format: "DD-MM-YYYY",
          cancelLabel: "Clear",
        },
      });

      $('input[name="daterange"]').on(
        "apply.daterangepicker",
        function (ev, picker) {
          $(this).val(picker.startDate.format("YYYY/MM/DD"));
          fromDate = picker.startDate.format("YYYY-MM-DD");
          endDate = picker.endDate.format("YYYY-MM-DD");
        }
      );

      $('input[name="daterange"]').on(
        "cancel.daterangepicker",
        function (ev, picker) {
          $(this).val("");
        }
      );
    });
  },
  validations: {
    subject: { required },
    task: { required },
    dateValue: { required },
    timeValue: { required },
  },
  computed: {
    ...mapState("plannerMonth", {
      plannerList: (state) => state.plannerList,
      assignment: (state) => state.assignment,
      meetingList: (state) => state.meetingList,
      assignmentValue: (state) => state.assignmentValue,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      subjectsData: (state) => state.subjectsData,
    }),
  },
  head() {
      return {
        link: [{ rel: "stylesheet", href: "/css/style01.css" }],
      };
    },
  methods: {
    assignmentPlanner() {
      this.$el.querySelector('#assignmentPlanner').classList.toggle('active');
      this.$el.querySelector('#assignPlanSection').classList.toggle('active');
    },
    ...mapActions("plannerMonth", {
      getMonthlyPlanner: "getMonthlyPlanner",
      addAssignment: "addAssignment",
      getAssignment: "getAssignment",
      updateAssignment: "updateAssignment",
      getSubjectsList: "getSubjectsList",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async GetSubjectList() {
      await this.getSubjectsList({});
    },
    goPrev() {
      this.calendarApi.prev(); // call a method on the Calendar object
      this.GetMonthlyPlanner();
    },

    goNext() {
      this.calendarApi.next();
      this.GetMonthlyPlanner();
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
      this.plannerList.forEach((element) => {
        var plannerObj = {};
        var title = element.subject;
        if (element.priority == "1") {
          var color = "#EF382E";
        } else if (element.priority == "2") {
          var color = "#00CCA0";
        } else {
          var color = "#F6D73C";
        }
        var start = element.due_date;
        var date = this.dateValue;
        var id = element.id;
        plannerObj["title"] = title;
        plannerObj["color"] = color;
        plannerObj["start"] = start;
        plannerObj["id"] = id;
        plannerObj["date"] = date;
        eventList.push(plannerObj);
      });
      this.meetingList.forEach((element) => {
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
        } else if (meeting == "Club") {
          var color = "#07BEB8";
        } else if (meeting == "Teacher") {
          var color = "#073BBF";
        }
        var dateMeeting = element.date;
        var timeValNum = element.start_time;
        var tmeMeeting = this.formatAMPM(element.start_time);
        var start = dateMeeting;
        // + "T" + tmeMeeting;
        meetingobj["title"] = title;
        meetingobj["color"] = color;
        meetingobj["start"] = start;
        meetingobj["id"] = element.id;
        meetingobj["groupId"] = "Meeting";

        listobj["title"] = title;
        listobj["meeting"] = meeting;
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.meetingDetails.push(listobj);

        eventList.push(meetingobj);
      });

      this.calendarOptions.events = eventList;
      this.loading = false;
    },

    async AddAssignment() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.processing = true;

      const df = moment(this.dateValue).format("YYYY-MM-DD");
      this.loading = true;
      await this.addAssignment({
        user_id: localStorage.getItem("id"),
        task: this.task,
        subject: this.subject?.id,
        due_time: this.timeValue,
        due_date: df,
        priority: this.priorityVal,
      });
      this.loading = false;

      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.resetAssignment();
        this.GetMonthlyPlanner();
        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.submitted = false;
      this.processing = false;
    },
    async UpdateAssignment() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.processing = true;

      if (this.priorityVal == "High") {
        this.priorityVal = "1";
      } else if (this.priorityVal == "Medium") {
        this.priorityVal = "2";
      } else if (this.priorityVal == "Low") {
        this.priorityVal = "3";
      }

      this.loading = true;
      const dfE = moment(this.dateValue).format("YYYY-MM-DD");
      await this.updateAssignment({
        user_id: localStorage.getItem("id"),
        assignment_id: this.idNum,
        task: this.task,
        subject: this.subject?.id,
        due_time: this.timeValue,
        due_date: dfE,
        priority: this.priorityVal
          ? this.priorityVal
          : this.assignment.priority,
      });
      this.loading = false;
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.resetAssignment();
        this.GetMonthlyPlanner();
        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.submitted = false;
      this.processing = false;
    },
    async openModal() {
      this.isAssignmentEdit = false;
      $("#exampleModalCenter").modal({ backdrop: true });
    },
    async resetAssignment() {
      this.submitted = false;
      this.value = "";
      this.dateValue = "";
      fromDate = "";
      $(".dropdown-select").text("Select priority");
      this.priorityVal = "";
      this.timeValue = null;
      this.timeValue = "";
      this.subject = "";
      this.task = "";
      this.taskValue = "";
      this.timeList = "";
      this.subjectValue = "";
      let clearTimeBtn = document.getElementsByClassName("clear-btn")[0];
      clearTimeBtn?.click();
    },

    async GetAssignment(value) {
      if (value) {
        await this.getAssignment({
          id: value,
        });
      }
      this.idNum = this.assignment.id;
      let subject = this.subjectsData.find(
        (e) => e.subject_name == this.assignment.subject
      );
      this.subject = {
        id: subject.id,
        text: subject.subject_name,
      };
      this.task = this.assignment.task;
      let dateSplit = this.assignment.due_date.split("-");
      let date = new Date(dateSplit[0], Number(dateSplit[1] - 1), dateSplit[2]);
      this.dateValue = date;

      if (this.assignment.priority == "1") {
        this.priorityVal = "High";
      } else if (this.assignment.priority == "2") {
        this.priorityVal = "Medium";
      } else {
        this.priorityVal = "Low";
      }
      $(".dropdown-select").text(this.priorityVal);
      this.timeValue = this.assignment.due_time;
    },

    filterOption(val) {
      var high = /High/g;
      var med = /Medium/g;
      var low = /Low/g;
      if (high.test(val)) {
        this.priorityVal = "1";
      } else if (med.test(val)) {
        this.priorityVal = "2";
      } else if (low.test(val)) {
        this.priorityVal = "3";
      }
    },
    formatDate(input) {
      var date = new Date(input);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }

      // return year+'-'+month+'-'+dt;
      return year + "-" + month + "-" + dt;
    },
    formatDateVal(input) {
      var date = new Date(input);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }

      return dt + "/" + month + "/" + year;

      // return dt+'/'+month+'/'+year
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

    eventClicked(info) {
      var idVal = info.event;
      var idValue = idVal.id;
      var groupId = idVal.groupId;
      if (!groupId) {
        this.resetAssignment();
        this.isAssignmentEdit = true;

        // $("#editModalCenter").modal("show");
        $("#exampleModalCenter").modal("show");

        this.GetAssignment(idValue);
      } else {
        this.resetAssignment();
        $("#MeetingModal").modal("show");
        var titleVal = info.event.title;
        var meetingVal = info.event.backgroundColor;
        var dateNum = info.event.start;
        let time = this.meetingList.find((e) => e.id == idVal.id).start_time;
        this.popupmodal(titleVal, meetingVal, dateNum, time);
      }
    },
    popupmodal(titleData, meetingData, dateData, time) {
      var timestandard = new Date(dateData).toLocaleString();
      if (meetingData == "#64B5FC") {
        var color = "Peer";
      } else if (meetingData == "#07BEB8") {
        var color = "Club";
      } else if (meetingData == "#073BBF") {
        var color = "Teacher";
      }
      var dateVal = timestandard.split(",")[0];
      let tempDate = dateVal.split("/");
      var dtCheck = new Date(tempDate[2], tempDate[0] - 1, tempDate[1]);
      var timeVal = timestandard.split(",")[1];
      var timevalue = timeVal.split(" ")[1];
      var timeAmPm = timeVal.split(" ")[2];
      var times = timevalue.split(":")[0];
      var timeNum = timevalue.split(":")[1];
      var timeconcat = times + ":" + timeNum + " " + timeAmPm;
      this.popTitle =
        color == "Club"
          ? titleData
          : titleData.substring("Meeting with ".length);
      this.popMeeting = color;
      this.popTime = time;
      this.popDate = this.showDateInWords(dtCheck);
    },
    showDateInWords(dateVal) {
      var date = moment(dateVal);
      var dateFormat =
        date.format("dddd") +
        ", " +
        date.format("D") +
        " " +
        date.format("MMMM");

      return dateFormat;
    },
    formatDate(input) {
      var datePart = input.match(/\d+/g),
        year = datePart[2], // get only two digits
        month = datePart[0],
        day = datePart[1];
      day = day < 10 ? "0" + day : day;
      return month + "-" + day + "-" + year;
    },
    handleMonthChange(dateInfo) {
      if (this.calendarStart != dateInfo.startStr) {
        this.calendarStart = dateInfo.startStr;
        this.calendarEnd = dateInfo.endStr;
      }
      var dateStr = dateInfo.startStr;
      var date = new Date(dateStr);
      date.setDate(date.getDate() + 7);
      var dateval = new Date(date),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      this.calendarDate = [date.getFullYear(), mnth, day].join("-");
    },
  },
};
</script>

<style>
body {
  background-color: #ffffff !important;
}

.student-dashboard-main {
  min-height: 100vh;
  margin: 0;
}

.bg-white border rounded-8 {
  background-color: rgba(255, 255, 255, 0.45);
  -webkit-box-shadow: 0px 0px 32px -4px rgb(0 1 0 / 9%);
  box-shadow: 0px 0px 32px -4px rgb(0 1 0 / 9%);
  border-radius: 22px;
}

.jochi-headings {
  
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
  
  font-weight: 700;
}

.sb-settings-btn {
  color: #b4b4b4;
  font-size: 13px;
  font-weight: 500;
}

.add-assignment-btn {
  font-size: 12px;
  background-color: #000000;
  color: #ffffff;
  border-radius: 10px;
}

.add-assignment-btn:hover {
  font-size: 12px;
  background-color: #000000;
  color: #ffffff;
  border-radius: 10px;
}

.notification-section {
  cursor: pointer;
}

.notification-section svg {
  fill: #b4b4b4;
  width: 25px;
  height: 25px;
}

.notification-count-section {
  background-color: #ea2626;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  top: 3px;
  right: 0;
}

.assignment-tag {
  font-size: 10px;
  padding: 2px 10px;
  border-radius: 18px;
  color: #ffffff;
}

.assignment-tag.red {
  background-color: #ea2626;
}

.assignment-tag.pink {
  background-color: #fb3e80;
}

.assignment-add-section h4 {
  color: #000000;
  font-weight: 700;
}

.assignment-add-section p {
  color: #b4b4b4;
  font-weight: 600;
  line-height: 16px;
}

.sub-task-section h6 {
  color: #e48194;
}

.sub-task-section label {
  font-size: 12px;
}

.material-link {
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.material-date {
  font-size: 10px;
}

.addition-material-section h6 {
  color: #000000;
}

.form-control {
  background-color: #b4b4b4;
  border-block-color: #b4b4b4;
  color: #ffffff;
}

.upload-file-section .form-control {
  height: 18px;
  font-size: 8px;
  padding: 0;
}

.upload-file-section .form-control::placeholder {
  color: #ffffff;
}

.completed-assignments h4 {
  font-weight: 700;
}

.completed-assignments h4.blue {
  color: #9d00df;
}

.completed-assignments h4.green {
  color: #1d9c00;
}

.completed-assignments p {
  color: #c7c1c1;
  font-size: 12px;
}

.add-person-section {
  top: -5px;
  display: flex;
  right: 25px;
}

.ap-img-add,
.ap-img-section {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.ap-img-add {
  margin-left: -15px;
  cursor: pointer;
}

.ap-img-section {
  background-color: #ffffff;
}

.fc .fc-scrollgrid {
    border-radius: 12px;
    overflow: hidden;
}

/* .fc-toolbar-chunk .fc-toolbar-title {
    position: absolute;
    left: 3rem;
    top: 3rem;
    font-size: 20px;
    color: #000000;
    font-weight: 700;
} */

.fc-toolbar-chunk .fc-prev-button.fc-button {
    position: absolute;
    right: 6rem;
}

.fc .fc-button .fc-icon {
    color: #a28cf6;
    font-size: 1em;
    line-height: 1em;
    margin: 0;
}

.fc-toolbar-chunk .fc-next-button.fc-button,
.fc-toolbar-chunk .fc-prev-button.fc-button {
    background: none;
    border: 1px solid #b4b4b4;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fc-toolbar-chunk .fc-next-button.fc-button {
    position: relative;
    top: 1.065rem;
}

.fc .fc-day-disabled {
    background: none;
}

.fc .fc-daygrid-day-number {
    color: #8c8bac !important;
    font-weight: 600;
}

.fc-theme-standard th {
    border-right: none;
    border-left: none;
    background-color: #F1EEF6;
    padding: 5px;
}

.fc-theme-standard th .fc-col-header-cell-cushion {
    color: #a995ef;
}

.fc-theme-standard td {
  border-color: #e9d7ee;
}

.bg-white border rounded-10.pending-assignment-popup {
  top: 12px;
  bottom: 12px;
  left: 12px;
  right: 12px;
  background-color: #ffffff;
  transform: scale(0);
  transition: transform 1s ease;
}

.bg-white border rounded-10.pending-assignment-popup.active {
  transform: scale(1);
  transition: transform 1s ease;
}

.planner-action-btns {
  transform: rotate(-90deg);
  top: 50vh;
  right: -164px;
}

.planner-action-btns .pa-btn {
  padding: 5px 20px;
  background-color: #b8b8b8;
  color: #ffffff;
  border-radius: 14px 14px 0 0;
  transition: background-color 0.5s ease;
}

.planner-action-btns .pa-btn.active {
  background-color: #ffffff;
  color: #b8b8b8;
  border: 1px solid #b8b8b8;
  transition: background-color 0.5s ease;
}

.assignment-planner-section {
  top: 0;
  right: 3rem;
  bottom: 0;
  z-index: 5;
  display: none;
}

.assignment-planner-section.active {
  display: block;
}

.assignment-planner-section .bg-white border rounded-10 {
  background-color: #ffffff;
  height: 100%;
}

</style>
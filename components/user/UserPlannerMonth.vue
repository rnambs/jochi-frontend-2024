<template>
  <div>
    <div v-if="loading">Loading</div>

    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />

    <div class="main-section">
      <!-- Monthly Calander -->
      <div class="jochi-components-light-bg custom-margin-for-main-section custom-full-height position-realtive">

        <section id="Weekly-Calander" class="">
          <div class="element-section container-fluid">
            <div class="row mt-2">
              <div class="col-12">
                <div class="planner-Month p-4">
                  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                </div>
              </div>
            </div>
          </div>
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
              class="modal-dialog modal-dialog-centered add-assmt"
              role="document"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    {{ isAssignmentEdit ? "Edit" : "Add" }} Assignment
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
                <div class="modal-body no-overflow px-4">
                  <form ref="studyTimeForm" class="container">
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label"
                        >Subject<em>*</em></label
                      >
                      <select
                        class="form-control"
                        tabindex=""
                        v-model="subject"
                        :class="{
                          'is-invalid': submitted && $v.subject.$error,
                        }"
                      >
                        <option value="">Select subject</option>
                        <option
                          v-bind:value="{
                            id: subjects.id,
                            text: subjects.subject_name,
                          }"
                          v-for="(subjects, index) in subjectsData"
                          :key="index"
                        >
                          {{ subjects.subject_name }}
                        </option>
                        <option v-if="subjectsData.length == 0">No data</option>
                      </select>
                      <div
                        v-if="submitted && $v.subject.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.subject.required"
                          >This field is required</span
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="message-text" class="col-form-label"
                        >Task<em>*</em></label
                      >
                      <textarea
                        class="form-control"
                        id="message-text"
                        v-model="task"
                        maxlength="125"
                        placeholder="Enter task description"
                        :class="{
                          'is-invalid': submitted && $v.task.$error,
                        }"
                      ></textarea>
                      <div
                        v-if="submitted && $v.task.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.task.required"
                          >This field is required</span
                        >
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 ml-auto">
                        <div class="form-group mb-0">
                          <label for="recipient-name" class="col-form-label"
                            >Priority<em>*</em></label
                          >
                          <div class="dropdown input-icon-area">
                            <button
                              id="dLabel"
                              class="dropdown-select form-control"
                              type="button"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <span class="caret">
                                {{
                                  priorityVal ? priorityVal : "Select priority"
                                }}
                              </span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dLabel">
                              <li class="item">
                                <div class="low-color"></div>
                                Low
                              </li>
                              <li class="item">
                                <div class="medium-color"></div>
                                Medium
                              </li>
                              <li class="item">
                                <div class="high-color"></div>
                                High
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div
                          v-if="
                            submitted &&
                            priorityVal != '1' &&
                            priorityVal != '2' &&
                            priorityVal != '3'
                          "
                        >
                          <span
                            v-if="
                              priorityVal != '1' &&
                              priorityVal != '2' &&
                              priorityVal != '3'
                            "
                            class="required-button"
                            >This field is required</span
                          >
                        </div>
                      </div>
                      <div class="col-md-6 ml-auto">
                        <div class="form-group">
                          <label for="recipient-name" class="col-form-label"
                            >Date<em>*</em></label
                          >

                          <date-picker
                            class="form-control"
                            placeholder="MM/DD/YYYY"
                            format="MM/dd/yyyy"
                            v-model="dateValue"
                            :class="{
                              'is-invalid': submitted && $v.dateValue.$error,
                            }"
                            :disabled-dates="disabledDates"
                          />
                          <div
                            v-if="submitted && $v.dateValue.$error"
                            class="invalid-feedback"
                          >
                            <span v-if="!$v.dateValue.required"
                              >This field is required</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <div class="form-group">
                          <label for="recipient-name" class="col-form-label"
                            >Time<em>*</em></label
                          >
                          <div>
                            <vue-timepicker
                              format="hh:mm A"
                              v-model="timeValue"
                              name="timeValue"
                              class="show-cursor"
                              :value="timeValue"
                              :class="{
                                'is-invalid': submitted && $v.timeValue.$error,
                              }"
                            ></vue-timepicker>
                            <div
                              v-if="submitted && $v.timeValue.$error"
                              class="invalid-feedback"
                            >
                              <span v-if="!$v.timeValue.required"
                                >This field is required</span
                              >
                            </div>
                          </div>
                          <!-- <input type="text" class="form-control"> -->
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-color-close"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="btn btn-color-save"
                    @click="
                      isAssignmentEdit ? UpdateAssignment() : AddAssignment()
                    "
                    :disabled="processing"
                  >
                    <!-- data-dismiss="modal" -->
                    Confirm
                  </button>
                </div>
              </div>
            </div>
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
                  <table class="w-100 table-modal">
                    <tr>
                      <td class="tmodal-data text-nowrap">Meeting With</td>
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
          <!-- edit modal -->
        </section>

      </div>

      <!-- End Monthly Calander -->
    </div>
  </div>
</template>
<script>
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
import "../../static/css/var.scss";
import moment from "moment";
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
  methods: {
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
    background-color: #f0deeb;
    padding: 5px;
}

.fc-theme-standard th .fc-col-header-cell-cushion {
    color: #a995ef;
}

.fc-theme-standard td {
  border-color: #e9d7ee;
}

.jochi-components-light-bg.pending-assignment-popup {
  top: 12px;
  bottom: 12px;
  left: 12px;
  right: 12px;
  background-color: #ffffff;
  transform: scale(0);
  transition: transform 1s ease;
}

.jochi-components-light-bg.pending-assignment-popup.active {
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

.assignment-planner-section .jochi-components-light-bg {
  background-color: #ffffff;
  height: 100%;
}
</style>
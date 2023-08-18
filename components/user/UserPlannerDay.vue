<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div class="main-section">
      <!-- Daily Calander -->

      <section id="Daily-Calander" class="">
        <div class="element-section container-fluid">
          <div class="row mt-4">
            <div class="col-md-7 col-sm-12">
              <div class="planner-daily p-4">
                <div class="planner-head mb-3">
                  <h5>Daily Planner</h5>
                  <a
                    href="#"
                    class="btn add-assignment"
                    data-toggle="modal"
                    @click="
                      resetAssignment();
                      openModal();
                    "
                    >Add Assignment</a
                  >
                </div>
                <div>
                  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                </div>
              </div>
            </div>
            <div class="col-md-5 col-sm-12">
              <div class="planner-daily p-4 mt-3 mt-md-0 assignment">
                <h5>Assignments</h5>
                <div class="assignment-section w-100">
                  <div class="container-fluid mb-1">
                    <div
                      class="assignment-col mt-2 mb-3"
                      v-for="(list, index) in assignmentList"
                      :key="index"
                    >
                      <p class="assignment-head">{{ list.title }}</p>
                      <p class="assignment-discription">
                        {{ list.assignment }}
                      </p>
                      <div
                        class="
                          d-flex
                          justify-content-between
                          align-items-end
                          view-section
                        "
                      >
                        <div class="float-left">
                          <p class="due-date">
                            Due date: {{ list.date }} <br />Time :
                            {{ list.time }}
                          </p>
                        </div>
                        <div class="float-right">
                          <button
                            class="btn-view-more p-2 float-right"
                            data-target="#exampleModalView"
                            data-toggle="modal"
                            @click="GetAssignment(list.id)"
                          >
                            View more
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="assignmentList.length == 0"
                      class="w-100 text-center py-5"
                    >
                      <p class="no-data">No assignments available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal -->

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModalView"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Assignment Details
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
                <div class="modal-body px-3">
                  <p class="data-overflow">
                    Subject:<span>{{ assignment.subject }} </span>
                  </p>
                  <p class="data-overflow">
                    Task :<span>{{ assignment.task }}</span>
                  </p>
                  <p>
                    Priority :<span>{{ priorityVal }}</span>
                  </p>
                  <p>
                    Date :<span>{{ assignment.due_date }}</span>
                  </p>
                  <p>
                    Time :<span>{{ assignment.due_time }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- modal for add assignment -->
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
                  <form>
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
                        rows="3"
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
                              class="dropdown-select form-control text-left"
                              type="button"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                              requ
                            >
                              <span class="caret">
                                {{
                                  priorityVal ? priorityVal : "Select priority"
                                }}</span
                              >
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
                              close-on-complete
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
                <div class="modal-footer justify-content-end border-top-0">
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
                    :disabled="processing"
                    @click="
                      isAssignmentEdit ? UpdateAssignment() : AddAssignment()
                    "
                  >
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

                <div class="modal-body px-3">
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

          <!-- Welcome Pop Up -->
          <div
            class="customModal d-flex flex-column m-auto w-100"
            id="welcomeModal"
            v-if="isShowing && isShowQuote"
          >
            <!-- quots -->
            <section
              id="Welcome"
              class="
                position-absolute
                d-flex
                flex-column
                align-items-center
                justify-content-center
                text-center
                w-100
              "
            >
              <h4 class="mb-5 color-primary-dark">Welcome</h4>
              <div class="quotes-section mb-4 color-dark">
                {{ quoteMessage }}
              </div>
              <!-- <div class="auther-section color-secondary mb-4">- A P J Abdul Kalam -</div> -->

              <div class="skip-button-section">
                <button
                  action=""
                  class="btn btn-primary px-4"
                  @click="isShowing = false"
                >
                  <strong>Skip</strong>
                </button>
              </div>
            </section>

            <!-- end quots -->
          </div>
          <!-- End Welcome Pop Up -->
        </div>
      </section>

      <!-- End Daily Calander -->
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";
import FullCalendar, { Calendar } from "@fullcalendar/vue";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
var fromDate = "";
var endDate = "";
var eventList = [];
export default {
  name: "UserPlanner",
  components: {
    lottie,
    VueTimepicker,
    FullCalendar,
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
      subjectValue: {},
      taskValue: "",
      timeList: "",
      dateValue: "",
      idNum: "",
      dateListValue: "",
      popTitle: "",
      popMeeting: "",
      popTime: "",
      popDate: "",
      isShowing: true,
      assignmentList: [],
      meetingDetails: [],
      isShowQuote: "",
      calendarDate: "",
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
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
        plugins: [timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev",
          center: "title",
          right: "next",
        },
        initialView: "timeGridDay",
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
    };
  },
  mounted() {
    this.disabledDates.to = new Date(
      this.date_today.getFullYear(),
      this.date_today.getMonth(),
      this.date_today.getDate()
    );
    this.ShowQuotedMessage();
    this.getSubjectsList();
    this.calendarApi = this.$refs.fullCalendar.getApi();
    this.GetDailyPlanner();
    //priority dropdown
    const _this = this;
    $(".dropdown-menu li").on("click", function () {
      var getValue = $(this).text();
      $(".dropdown-select").text(getValue);
      _this.filterOption(getValue);
    });
    //datepicker

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
        autoUpdateInput: false,
        singleDatePicker: true,
        minDate: today,
        maxDate: future,

        opens: "left",
        locale: {
          format: "DD-MM-YYYY",
          cancelLabel: "Clear",
        },
      });

      $('input[name="daterange"]').on(
        "apply.daterangepicker",
        function (ev, picker) {
          $(this).val(picker.startDate.format("MM/DD/YYYY"));
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
    ...mapState("quotedMessage", {
      quoteMessage: (state) => state.quoteMessage,
      viewed: (state) => state.viewed,
      plannerList: (state) => state.plannerList,
      meetingList: (state) => state.meetingList,
      assignment: (state) => state.assignment,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      subjectsData: (state) => state.subjectsData,
    }),
  },
  methods: {
    ...mapActions("quotedMessage", {
      showQuotedMessage: "showQuotedMessage",
      getDailyPlanner: "getDailyPlanner",
      addAssignment: "addAssignment",
      getAssignment: "getAssignment",
      updateAssignment: "updateAssignment",
      getSubjectsList: "getSubjectsList",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
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
    async openModal() {
      this.dateValue = new Date(this.calendarApi.view.activeStart);
      this.isAssignmentEdit = false;
      $("#exampleModalCenter").modal({ backdrop: true });
    },
    async GetSubjectList() {
      await this.getSubjectsList({});
    },
    async GetDailyPlanner() {
      eventList = [];
      this.loading = true;
      const format = "YYYY-MM-DD";
      this.calendarDate = moment(this.calendarApi.view.activeStart).format(
        format
      );
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
        this.assignmentList.push(scheduleObject);
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
        var start = dateMeeting + "T" + tmeMeeting;
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
    },

    async GetAssignment(val) {
      if (val) {
        this.loading = true;
        await this.getAssignment({
          id: val,
        });
      }
      this.loading = false;
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
      this.timeValue = this.assignment.due_time;
      if (this.assignment.priority == 1) {
        this.priorityVal = "High";
      } else if (this.assignment.priority == 2) {
        this.priorityVal = "Medium";
      } else if (this.assignment.priority == 3) {
        this.priorityVal = "Low";
      }
      $(".dropdown-select").text(this.priorityVal);
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

      this.GetDailyPlanner();
    },
    async UpdateAssignment() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      if (this.priorityVal == "High") {
        this.priorityVal = "1";
      } else if (this.priorityVal == "Medium") {
        this.priorityVal = "2";
      } else if (this.priorityVal == "Low") {
        this.priorityVal = "3";
      }

      this.processing = true;
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
        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.GetDailyPlanner();
      this.submitted = false;
      this.processing = false;
    },
    async resetAssignment() {
      this.submitted = false;
      this.value = "";
      this.dateValue = "";
      $('input[name="daterange"]').val("");
      fromDate = "";
      $(".dropdown-select").text("Select priority");
      this.priorityVal = "";
      this.subject = "";
      this.task = "";
      (fromDate = ""), $('input[name="daterange"]').val("");
      fromDate = "";
      this.priorityVal = "";
      this.timeValue = null;
      this.subject = "";
      this.task = "";
      this.taskValue = "";
      this.timeList = "";
      this.timeValue = "";
      let clearTimeBtn = document.getElementsByClassName("clear-btn")[0];
      clearTimeBtn?.click();
    },

    dateConversion(value) {
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

      var dateValue = new Date(value);
      var month = monthNames[dateValue.getMonth()];
      var clickedDate = dateValue.getDate();
      return clickedDate + this.ordinal_suffix_of(clickedDate) + " " + month;
    },
    ordinal_suffix_of(i) {
      var j = i % 10,
        k = i % 100;
      if (j == 1 && k != 11) {
        return "st";
      }
      if (j == 2 && k != 12) {
        return "nd";
      }
      if (j == 3 && k != 13) {
        return "rd";
      }
      return "th";
    },
    //date conversion
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

      return month + "/" + dt + "/" + year;
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

      return year + "-" + month + "-" + dt;
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
    eventClicked(info) {
      var idVal = info.event;
      var idValue = idVal.id;
      var groupId = idVal.groupId;
      if (!groupId) {
        this.isAssignmentEdit = true;
        // $("#editModalCenter").modal("show");
        $("#exampleModalCenter").modal("show");

        this.GetAssignment(idValue);
      } else {
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
      this.GetDailyPlanner();
    },

    goNext() {
      this.calendarApi.next();
      this.GetDailyPlanner();
    },
  },
};
</script>


<!-- <style>
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
  display: none;
  padding-left: 4rem;
  font-size: 14px;
}

.sb-btn-content.active {
  display: block;
}

.sb-btn.active {
  opacity: 0.6;
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

.form-control::placeholder {
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

.fc-theme-standard td,
.fc-theme-standard th {
  border: none;
}

/* .fc-button.fc-button-primary {
  display: none;
} */

.fc-theme-standard .fc-scrollgrid {
  border: none;
}

.fc .fc-daygrid-day.fc-day-today,
.fc .fc-timegrid-col.fc-day-today {
  background-color: transparent;
}

.fc .fc-timegrid-slot-minor {
  border-top: none;
}

/* .fc-media-screen .fc-timegrid-cols {
  position: unset;
} */

.fc-direction-ltr .fc-timegrid-slot-label-frame {
  text-align: center;
  background-color: #c6c5c5;
  color: #ffffff;
  border-radius: 7px;
  font-size: 12px;
  position: relative;
}

.fc-direction-ltr .fc-timegrid-slot-label-frame::after {
  content: "";
  background-color: #c6c5c5;
  width: 100vw;
  height: 1px;
  position: absolute;
  top: 8px;
}

/* .fc-scrollgrid-sync-table,
.fc-scrollgrid-section.fc-scrollgrid-section-header {
  display: none;
} */

.fc .fc-cell-shaded,
.fc .fc-day-disabled {
  background: none;
}

/* .fc-toolbar-chunk .fc-toolbar-title {
  position: absolute;
  left: 62px;
  top: 78px;
  font-size: 14px;
} */

/* .fc-view-harness.fc-view-harness-active {
  height: 75vh !important;
  margin-top: 20px;
} */

.fc-scroller.fc-scroller-liquid-absolute::-webkit-scrollbar {
  width: 3px;
}

.fc-scroller.fc-scroller-liquid-absolute::-webkit-scrollbar-track {
  background: none;
}

.fc-scroller.fc-scroller-liquid-absolute::-webkit-scrollbar-thumb {
  background: #5534A5;
}

.fc-timegrid-event-harness > .fc-timegrid-event {
  left: 15px;
}

.fc-v-event {
  background-color: #ffffff;
  -webkit-box-shadow: 0px 0px 32px -4px rgb(0 1 0 / 15%) !important;
  box-shadow: 0px 0px 32px -4px rgb(0 1 0 / 15%) !important;
  border-radius: 22px;
  border: none;
  padding: 15px 20px;
}

.fc-v-event .fc-event-main {
  color: #000000;
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

.add-sub-task-btn {
  width: 20px;
  height: 20px;
  background-color: #ea2626;
  color: #ffffff;
  border-radius: 50%;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pending-popup-close-btn {
  color: #ea2626;
  font-size: 32px;
  font-weight: 900;
}
</style> -->
<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />

    <div class="main-section">
      <!-- tab section for teacher meeting -->
      <div
        class="
          jochi-components-light-bg
          p-4
          custom-margin-for-main-section custom-full-height
        "
      >
        <section id="tab" class="">
          <div class="tab-section container-fluid mt-4">
            <h4 class="tab-head">Schedule a Meeting!</h4>
            <div class="inner-tab-section container-fluid p-0">
              <div class="row m-0">
                <div class="col-md-3 pl-0">
                  <div class="input-icon-area schedule-meeting-section">
                    <multiselect
                      v-model="meetingType"
                      :options="types"
                      placeholder="Types of Meeting"
                    >
                      <span slot="noResult">No data found</span>
                    </multiselect>
                    <!-- <span class="input-icon"
                      ><i class="fa fa-search" aria-hidden="true"></i
                    ></span> -->
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="input-icon-area schedule-meeting-section">
                    <multiselect
                      v-if="meetingType == 'Teachers'"
                      v-model="value"
                      :options="teachers"
                      track-by="first_name"
                      label="first_name"
                      placeholder="Select a teacher"
                      @input="UpdateTimeSchedule"
                    >
                      <span slot="noResult">No data found</span>
                    </multiselect>
                    <multiselect
                      v-else
                      v-model="selectedStudents"
                      :options="students"
                      track-by="first_name"
                      label="first_name"
                      placeholder="Select students"
                      :multiple="true"
                      :max="4"
                      @input="UpdateTimeSchedule"
                    >
                      <span slot="maxElements"
                        >Maximum of 4 students selected</span
                      >
                      <span slot="noResult">No data found</span>
                    </multiselect>
                    <span class="input-icon custom-search-icon"
                      ><i class="fa fa-search" aria-hidden="true"></i
                    ></span>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="input-icon-area schedule-meeting-section">
                    <input
                      type="text"
                      name="daterange"
                      autocomplete="off"
                      placeholder="Date Range"
                      class="form-control custom-form-control"
                      readonly="readonly"
                      :disabled="!value && !(selectedStudents.length > 0)"
                    />
                    <!-- <span class="input-icon"
                      ><i class="fa fa-calendar" aria-hidden="true"></i>
                    </span> -->
                  </div>
                </div>
                <div class="col-md-3 px-2 justify-content-md-end">
                  <div class="custom-switch pb-2">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="custom-Switches"
                      v-model="week"
                      @change="UpdateTimeSchedule()"
                      v-on:click="weekToggle()"
                    />
                    <label class="custom-control-label" for="custom-Switches"
                      >Include weekends
                    </label>
                  </div>
                  <div class="custom-switch">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customSwitches"
                      v-model="availability"
                      @change="UpdateTimeSchedule()"
                      v-on:click="availabilityToggle()"
                    />
                    <label class="custom-control-label" for="customSwitches"
                      >Show options based on my availability
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- end tab section for teacher meeting -->

        <!-- element secton -->

        <section id="teacher-section" class="">
          <div class="meeting-section container-fluid">
            <div class="inner-meeting m-auto container-fluid py-3 pl-0 scroll">
              <div class="row Meeting-row" v-show="isShowing">
                <div class="col-md-4 p-3">
                  <div class="default-section">
                    <img src="~/assets/images/undraw/step1.png" alt="" />
                    <div class="default-area">
                      <h6 class="default-head">Step 1</h6>
                      <p class="default-text">Search & Select Your Teacher</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 p-3">
                  <div class="default-section">
                    <img src="~/assets/images/undraw/step2.png" alt="" />
                    <div class="default-area">
                      <h6 class="default-head">Step 2</h6>
                      <p class="default-text">Choose Your Date Range</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 p-3">
                  <div class="default-section">
                    <img src="~/assets/images/undraw/step3.png" alt="" />
                    <div class="default-area">
                      <h6 class="default-head">Step 3</h6>
                      <p class="default-text">Select Your Time and Confirm</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                <div class="row Meeting-row pl-0 pr-3 pt-3">
                  <div
                    class="col-md-3 mb-4 py-0"
                    v-for="(Schedule, index) in slot_date"
                    :key="index"
                  >
                    <div
                      class="meeting-list p-3"
                      data-toggle="modal"
                      data-target="#meetingDetailModal"
                      v-on:click="
                        modalValue(
                          Schedule.dateFormat,
                          Schedule.from,
                          Schedule.end,
                          Schedule.slot,
                          Schedule.dateValue
                        )
                      "
                    >
                      <h6>{{ Schedule["dateFormat"] }}</h6>
                      <p class="time">
                        {{ Schedule["from"] }}
                        {{ Schedule["end"] ? "to " + Schedule["end"] : "" }}
                        <!-- {{ timeZones.timeZone }} -->
                      </p>
                    </div>
                  </div>
                  <div
                    v-if="slot_date.length == 0 && isMounted"
                    class="empty-schedule"
                  >
                    <p>No time slot is available</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- pop up -->

            <!-- Modal -->
            <!-- <div
              class="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-lg modal-dialog-centered"
                role="document"
              >
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">
                      Confirm Meeting
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
                  <div class="modal-body">
                    <table class="w-100 table-modal custom-row-table">
                      <tr>
                        <td class="tmodal-data text-nowrap">Meeting With</td>
                        <td class="tmodal-data">
                          <p class="mb-0 tdata-overflow">
                            <span class="pr-2">:</span>
                            <span v-if="value">
                              {{
                                value.first_name +
                                " " +
                                (value.last_name ? value.last_name : "")
                              }}
                            </span>
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td class="tmodal-data">Date</td>
                        <td class="tmodal-data">
                          <span class="pr-2">:</span>
                          {{ popupValue[0] }}
                        </td>
                      </tr>

                      <tr>
                        <td class="tmodal-data">Time</td>
                        <td class="tmodal-data">
                          <span class="pr-2">:</span>
                          {{ popupFrom[0] }} to {{ popupEnd[0] }}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-color-close"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-color-save"
                      data-toggle="modal"
                      data-target="#meetingDetailModal"
                    >
                      Add New Meeting
                    </button>
                  </div>
                </div>
              </div>
            </div> -->
            <div
              class="modal fade"
              id="meetingDetailModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="meetingDetailModalCenterTitle"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-lg modal-dialog-centered"
                role="document"
              >
                <div class="modal-content px-4">
                  <div class="modal-header">
                    <h5 class="modal-title" id="meetingDetailModalLongTitle">
                      Confirm Meeting
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
                  <div class="modal-body">
                    <form action="">
                      <table class="w-100 table-modal custom-row-table">
                        <tr>
                          <td class="tmodal-data">Date</td>
                          <td class="tmodal-data">
                            <span class="pr-2">:</span>
                            {{ popupValue[0] }}
                          </td>
                        </tr>

                        <tr>
                          <td class="tmodal-data">Time</td>
                          <td class="tmodal-data">
                            <span class="pr-2">:</span>
                            {{ popupFrom[0] }} to {{ popupEnd[0] }}
                          </td>
                        </tr>
                        <tr>
                          <td class="tmodal-data text-nowrap">Meeting Name</td>
                          <td class="tmodal-data">
                            <p
                              class="
                                mb-0
                                tdata-overflow
                                d-flex
                                align-items-center
                              "
                            >
                              <span class="pr-2">:</span>
                              <!-- <span v-if="value">
                              {{
                                value.first_name +
                                " " +
                                (value.last_name ? value.last_name : "")
                              }}
                            </span> -->
                              <input
                                type="text"
                                name="meeting_name"
                                autocomplete="off"
                                maxlength="100"
                                class="form-control custom-form-control"
                                v-model="meeting_name"
                                :class="{
                                  'is-invalid':
                                    submitted && $v.meeting_name.$error,
                                }"
                              />
                            </p>
                            <div
                              v-if="submitted && $v.meeting_name.$error"
                              class="invalid-feedback"
                            >
                              <span v-if="!$v.meeting_name.required"
                                >This field is required</span
                              >
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="tmodal-data text-nowrap">Description</td>
                          <td class="tmodal-data">
                            <p
                              class="
                                mb-0
                                tdata-overflow
                                d-flex
                                align-items-center
                              "
                            >
                              <span class="pr-2">:</span>
                              <!-- <span v-if="value">
                              {{
                                value.first_name +
                                " " +
                                (value.last_name ? value.last_name : "")
                              }}
                            </span> -->
                              <textarea
                                type="text"
                                name="meeting_description"
                                autocomplete="off"
                                maxlength="500"
                                class="form-control custom-form-control"
                                v-model="meeting_description"
                                :class="{
                                  'is-invalid':
                                    submitted && $v.meeting_description.$error,
                                }"
                              ></textarea>
                            </p>
                            <div
                              v-if="submitted && $v.meeting_description.$error"
                              class="invalid-feedback"
                            >
                              <span v-if="!$v.meeting_description.required"
                                >This field is required</span
                              >
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="tmodal-data text-nowrap">
                            Type of Meeting
                          </td>
                          <td class="tmodal-data">
                            <p
                              class="
                                mb-0
                                tdata-overflow
                                d-flex
                                align-items-center
                              "
                            >
                              <span class="pr-2">:</span>
                              <select
                                class="custom-select custom-select-sm mb-3"
                                tabindex=""
                                name="conversation_type"
                                v-model="conversation_type"
                                :class="{
                                  'is-invalid':
                                    submitted && $v.conversation_type.$error,
                                }"
                              >
                                <option value="Video Conference">
                                  Video Conference
                                </option>
                                <option value="In Person">In Person</option>
                              </select>
                            </p>
                            <div
                              v-if="submitted && $v.conversation_type.$error"
                              class="invalid-feedback"
                            >
                              <span v-if="!$v.conversation_type.required"
                                >This field is required</span
                              >
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="tmodal-data text-nowrap">
                            {{
                              conversation_type == "Video Conference"
                                ? "Meeting Link"
                                : "Meeting Location"
                            }}
                          </td>
                          <td class="tmodal-data">
                            <p
                              class="
                                mb-0
                                tdata-overflow
                                d-flex
                                align-items-center
                              "
                            >
                              <span class="pr-2">:</span>
                              <!-- <span v-if="value">
                              {{
                                value.first_name +
                                " " +
                                (value.last_name ? value.last_name : "")
                              }}
                            </span> -->
                              <input
                                type="text"
                                name="venue"
                                autocomplete="off"
                                maxlength="200"
                                class="form-control custom-form-control"
                                v-model="venue"
                                :class="{
                                  'is-invalid': submitted && $v.venue.$error,
                                }"
                              />
                            </p>
                            <div
                              v-if="submitted && $v.venue.$error"
                              class="invalid-feedback"
                            >
                              <span v-if="!$v.venue.required"
                                >This field is required</span
                              >
                            </div>
                          </td>
                        </tr>

                        <!-- <tr>
                        <td class="tmodal-data">Date</td>
                        <td class="tmodal-data">
                          <span class="pr-2">:</span>
                          {{ popupValue[0] }}
                        </td>
                      </tr>

                      <tr>
                        <td class="tmodal-data">Time</td>
                        <td class="tmodal-data">
                          <span class="pr-2">:</span>
                          {{ popupFrom[0] }} to {{ popupEnd[0] }}
                        </td> 
                      </tr>-->
                      </table>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-color-close"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-color-save"
                      @click="ScheduleConfirm()"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- end element secton -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Multiselect from "vue-multiselect";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import { required } from "vuelidate/lib/validators";

var teacherValue = "";
var fromDate = "";
var endDate = "";
var slot_date = [];
var from = [];
var end = [];
var teacher_name = "";
var weekToggleValue = "";
var availabilityToggleValue = "";
var popupValue = [];
var popupFrom = [];
var popupEnd = [];
var slot_id = "";
var modalDate = "";

export default {
  name: "TeacherMeeting",
  components: {
    Multiselect,
    lottie,
  },
  data() {
    return {
      value: "",
      slot_date: [],
      from: [],
      end: [],
      teacher_name: "",
      dateRange: [],
      popupValue: [],
      popupFrom: [],
      popupEnd: [],
      isShowing: true,
      isMounted: false,
      week: false,
      availability: false,
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      types: ["Teachers", "Peer"],
      meetingType: "",
      selectedStudents: [],
      studentsValue: [],
      students_name: "",
      conversation_type: "",
      meeting_name: "",
      meeting_description: "",
      venue: "",
      submitted: false,
    };
  },
  validations: {
    meeting_name: { required },
    meeting_description: { required },
    conversation_type: { required },
    venue: { required },
    // meeting_link: { required },
  },
  mounted() {
    this.GetStudents();
    this.GetTeacher();
    this.isMounted = false;
    const _this = this;
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
          $(this).val(
            picker.startDate.format("MM/DD/YYYY") +
              " - " +
              picker.endDate.format("MM/DD/YYYY")
          );
          fromDate = picker.startDate.format("YYYY-MM-DD");
          endDate = picker.endDate.format("YYYY-MM-DD");
          _this.UpdateTimeSchedule.bind(_this)();
          _this.isShowing = false;
        }
      );

      $('input[name="daterange"]').on(
        "cancel.daterangepicker",
        function (ev, picker) {
          $(this).val("");
        }
      );
    });

    this.modalValue();
  },
  computed: {
    ...mapState("teacherMeeting", {
      students: (state) => state.students,
      teachers: (state) => state.teachers,
      studentsSchedule: (state) => state.studentsSchedule,
      teacherSchedule: (state) => state.teacherSchedule,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      timeZones: (state) => state.timeZones,
    }),
  },

  methods: {
    ...mapActions("teacherMeeting", {
      getStudents: "getStudents",
      getTeacher: "getTeacher",
      updateStudentTimeSchedule: "updateStudentTimeSchedule",
      updateTimeSchedule: "updateTimeSchedule",
      studentScheduleConfirm: "studentScheduleConfirm",
      scheduleConfirm: "scheduleConfirm",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async GetStudents() {
      await this.getStudents({
        school_id: localStorage.getItem("school_id"),
        studentId: localStorage.getItem("id"),
      });
    },
    async GetTeacher() {
      await this.getTeacher({
        school_id: localStorage.getItem("school_id"),
      });
    },

    async UpdateTimeSchedule() {
      if (this.meetingType == "Teachers") {
        if (!this.value || !fromDate || !endDate) {
          $('input[name="daterange"]').val("");
          fromDate = "";
          endDate = "";
          this.slot_date = [];
        }

        if (this.value?.id && fromDate && endDate) {
          this.isMounted = true;
          this.loading = true;
          await this.updateTimeSchedule({
            student_id: parseInt(localStorage.getItem("id")),
            teacher_id: this.value.id,
            from_date: fromDate,
            to_date: endDate,
            include_weekends: this.week ? 1 : 0,
            options_based_on_my_availability: this.availability ? 1 : 0,
          });

          this.loading = false;

          this.dateConversion();
        }
      } else {
        if (this.selectedStudents && this.selectedStudents.length > 0) {
          this.studentsValue = [];
          this.students_name = [];
          this.selectedStudents.forEach((element) => {
            this.studentsValue.push(element.id);
            this.students_name.push(element.first_name);
          });
        }
        if (this.studentsValue.length === 0) {
          this.value = "";
          $('input[name="daterange"]').val("");
          fromDate = "";
          endDate = "";
          this.studentsValue = "";
          this.loading = false;
          this.slot_date = [];
          this.isShowing = true;
          this.isMounted = false;
        }

        if (this.studentsValue.length != 0 && fromDate && endDate) {
          this.isMounted = true;
          this.loading = true;

          await this.updateStudentTimeSchedule({
            student_id: parseInt(localStorage.getItem("id")),
            group_id: this.studentsValue,
            from_date: fromDate,
            to_date: endDate,
            include_weekends: this.week ? 1 : 0,
            options_based_on_my_availability: this.availability ? 1 : 0,
          });
          this.dateConversion();
          this.loading = false;
        }
      }
    },
    dateConversion() {
      this.slot_date = [];
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      if (this.meetingType == "Teachers") {
        this.teacherSchedule?.forEach((element) => {
          var Scheduleobj = {};
          var slot = element.id;
          var from = element.default_slots.start_time;
          var end = element.default_slots.end_time;
          var dateValue = element.date;

          var date = moment(element.date, "YYYY-MM-DD");
          var dateFormat =
            date.format("dddd") +
            ", " +
            date.format("D") +
            " " +
            date.format("MMMM");
          Scheduleobj["slot"] = slot;
          Scheduleobj["dateFormat"] = dateFormat;
          Scheduleobj["from"] = from;
          Scheduleobj["end"] = end;
          Scheduleobj["dateValue"] = dateValue;
          this.slot_date.push(Scheduleobj);
        });
      } else {
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
        this.studentsSchedule.forEach((element) => {
          var Scheduleobj = {};

          var date = moment(element.date, "YYYY-MM-DD");

          var dateValue = element.date;
          var slot = element.slot_id;
          var from = element.timings;
          var dateFormat =
            date.format("dddd") +
            ", " +
            date.format("D") +
            " " +
            date.format("MMMM");
          Scheduleobj["dateValue"] = dateValue;
          Scheduleobj["slot"] = slot;
          Scheduleobj["dateFormat"] = dateFormat;
          Scheduleobj["from"] = from;
          this.slot_date.push(Scheduleobj);
        });
      }
    },
    async ScheduleConfirm() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.loading = true;

        if (this.meetingType == "Teachers") {
          await this.scheduleConfirm({
            teacher_id: this.value?.id,
            student_id: localStorage.getItem("id"),
            schedule_id: slot_id,
            conversation_type: this.conversation_type,
            meeting_name: this.meeting_name,
            meeting_description: this.meeting_description,
            meeting_link:
              this.conversation_type == "Video Conference" ? this.venue : "",
            meeting_location:
              this.conversation_type == "In Person" ? this.venue : "",
          });

          this.loading = false;

          if (this.successMessage != "") {
            $(".modal-backdrop").remove();
            $("#meetingDetailModal").modal("hide");
            this.resetValues();
            this.$toast.open({
              message: this.successMessage,
              type: this.SuccessType,
              duration: 5000,
            });
          } else if (this.errorMessage != "") {
            this.$toast.open({
              message: this.errorMessage,
              type: this.errorType,
              duration: 5000,
            });
          }
        } else {
          await this.studentScheduleConfirm({
            group_Id: this.studentsValue,
            student_id: parseInt(localStorage.getItem("id")),
            slot_id: slot_id,
            date: modalDate,
            conversation_type: this.conversation_type,
            meeting_name: this.meeting_name,
            meeting_description: this.meeting_description,
            meeting_link:
              this.conversation_type == "Video Conference" ? this.venue : "",
            meeting_location:
              this.conversation_type == "In Person" ? this.venue : "",
          });

          this.loading = false;

          if (this.successMessage != "") {
            $(".modal-backdrop").remove();
            $("#meetingDetailModal").modal("hide");
            this.resetValues();
            this.$toast.open({
              message: this.successMessage,
              type: this.SuccessType,
              duration: 5000,
            });
          } else if (this.errorMessage != "") {
            this.$toast.open({
              message: this.errorMessage,
              type: this.errorType,
              duration: 5000,
            });
          }
        }
        this.value = "";

        $('input[name="daterange"]').val("");
        fromDate = "";
        endDate = "";
        teacherValue = "";
        this.slot_date = [];
        this.isShowing = true;
        this.isMounted = false;
        this.value = "";
      }
    },
    resetValues() {
      this.studentsValue = [];
      this.submitted = false;
      slot_id = "";
      modalDate = "";
      this.conversation_type = "";
      this.meeting_name = "";
      this.meeting_description = "";
      this.venue = "";
    },

    weekToggle() {},
    availabilityToggle() {},
    modalValue(modalData, modalFrom, modalEnd, slotValue, value) {
      this.popupValue = [];
      this.popupFrom = [];
      this.popupEnd = [];
      this.popupValue.push(modalData);
      this.popupFrom.push(modalFrom);
      this.popupEnd.push(modalEnd);
      slot_id = slotValue;
      modalDate = value;
    },
  },
};
</script>
<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />

    <div class="main-section">
      <!-- tab section for View all meeting -->
      <div
        class="
          jochi-components-light-bg
          p-4
          custom-margin-for-main-section custom-full-height
        "
      >
        <section id="tab" class="">
          <div class="tab-section container-fluid mt-4">
            <h4 class="tab-head mb-0 p-0">My Meetings</h4>
            <div class="inner-tab-section container-fluid p-0">
              <div class="row m-0">
                <!-- <div class="col-md-4">
                  <div class="input-icon-area">
                    <multiselect
                      v-model="value"
                      :options="allData"
                      track-by="first_name"
                      label="first_name"
                      placeholder="Search name"
                      @input="ListAllMeeting"
                    >
                      <span slot="noResult">No data found</span>
                    </multiselect>
                    <span class="input-icon"
                      ><i class="fa fa-search" aria-hidden="true"></i
                    ></span>
                  </div>
                </div> -->
                <div class="col-md-4 p-0">
                  <div class="dropdown input-icon-area custom-sort-by-btn">
                    <button
                      id="dLabel"
                      class="dropdown-select form-control p-0"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sort by
                      <span class="caret"></span>
                    </button>
                    <!-- <span class="input-icon"
                      ><i class="fa fa-filter" aria-hidden="true"></i
                    ></span> -->
                    <ul class="dropdown-menu" aria-labelledby="dLabel">
                      <li class="item">Teacher</li>
                      <li class="item">Student</li>
                      <li class="item">All</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- end tab section for view all meeting -->
        <!-- element secton -->

        <section id="view-all-section" class="">
          <div class="meeting-section container-fluid">
            <div class="inner-meeting m-auto container-fluid p-0">
              <div class="row Meeting-row pl-0 pr-3 pt-0">
                <div
                  data-toggle="modal"
                  data-target="#meetingDetailModal"
                  @click="onCardClick(list)"
                  class="col-md-3 mb-4 p-4"
                  v-for="(list, index) in slot_date"
                  :key="index"
                >
                  <div class="meeting-list p-3 position-realtive">
                    <div class="approved-tag position-absolute">
                      <!-- {{ list }} -->
                      <div
                        :class="
                          list.meeting_request == 0
                            ? 'approved-status pending'
                            : 'approved-status done'
                        "
                      >
                        <img
                          src="../../static/image/pending.png"
                          alt=""
                          class="pending-img img-fluid"
                        />
                        <img
                          src="../../static/image/done.png"
                          alt=""
                          class="success-img img-fluid"
                        />
                      </div>
                    </div>
                    <h6>Meeting with {{ list["title"] }}</h6>
                    <p class="date">{{ list["dateFormat"] }}</p>
                    <p class="time">
                      {{ list["from"] }} to {{ list["end"] }}
                      <!-- {{ timeZones.timeZone }} -->
                    </p>
                  </div>
                </div>
                <div v-if="slot_date.length == 0" class="empty-schedule">
                  <p>No meetings found</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- end element secton -->
    </div>

    <!-- modal start -->
    <div
      class="modal fade"
      id="meetingDetailModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="meetingDetailModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content px-4">
          <div class="modal-header">
            <h5 class="modal-title" id="meetingDetailModalLongTitle">
              Meeting Details
            </h5>
            <!-- <button type="button" class="close">
              <span aria-hidden="true">Edit</span>
            </button> -->
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
                  <td class="tmodal-data">Type</td>
                  <td class="tmodal-data">
                    <span class="pr-2">:</span>
                    {{ detailType }}
                  </td>
                </tr>

                <tr>
                  <td class="tmodal-data">With</td>
                  <td class="tmodal-data">
                    <span class="pr-2">:</span>
                    <span v-if="meetingType == 'Teacher'"
                      >{{ detailWith }}
                    </span>
                    <div
                      class="row"
                      v-else
                      v-for="(item, index) of invitedMembers"
                      :key="index"
                    >
                      <span
                        v-if="item.student_id != studentId"
                        :class="
                          item.student_id == item.teacher_id
                            ? 'accepted'
                            : meeting_request == 0
                            ? 'pending'
                            : meeting_request == 1
                            ? 'accepted'
                            : meeting_request == 2
                            ? 'rejected'
                            : ''
                        "
                        >{{ item.name }}</span
                      >
                    </div>
                  </td>
                </tr>

                <tr>
                  <td class="tmodal-data">Date</td>
                  <td class="tmodal-data d-flex align-items-center">
                    <span class="pr-2">:</span>
                    <!-- <div class="col-md-6 ml-auto"> -->
                    <!-- <div class="form-group"> -->
                    <!-- <label for="recipient-name" class="col-form-label"
                        >Date<em>*</em></label
                      > -->
                    <!-- v-model="dateValue"
                            :class="{
                              'is-invalid': submitted && $v.dateValue.$error,
                            }"
                            :disabled-dates="disabledDates" -->
                    <date-picker
                      class="form-control w-50"
                      placeholder="MM/DD/YYYY"
                      format="MM/dd/yyyy"
                      :value="date"
                      v-model="date"
                      @selected="onDateChange()"
                    />
                    <!-- <div
                            v-if="submitted && $v.dateValue.$error"
                            class="invalid-feedback"
                          >
                            <span v-if="!$v.dateValue.required"
                              >This field is required</span
                            >
                          </div> -->
                    <!-- </div> -->
                    <!-- </div> -->
                  </td>
                </tr>

                <tr v-if="slot_date_selection.length > 0">
                  <td>Select Time</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <span class="pr-2">:</span>
                      <div
                        v-if="slot_date_selection.length > 0"
                        class="col-10 p-0 position-relative"
                      >
                        <button
                          class="btn up-btn up-arrow-icon position-absolute"
                        >
                          <i class="fa-solid fa-circle-chevron-up"></i>
                        </button>
                        <div
                          class="
                            row
                            Meeting-row
                            pl-0
                            pr-3
                            pt-3
                            custom-modal-ts-height
                          "
                        >
                          <div
                            class="col-6 text-center modal-time-schedules"
                            v-for="(Schedule, index) in slot_date_selection"
                            :key="index"
                          >
                            <div class="meeting-list p-3">
                              <h6>{{ Schedule["dateFormat"] }}</h6>
                              <p class="time">
                                {{ Schedule["from"] }} to {{ Schedule["end"] }}
                                <!-- {{ timeZones.timeZone }} -->
                              </p>
                            </div>
                          </div>
                          <div
                            v-if="slot_date_selection.length == 0 && isMounted"
                            class="empty-schedule"
                          >
                            <p>No time slot is available</p>
                          </div>
                        </div>
                        <button
                          class="btn down-btn down-arrow-icon position-absolute"
                        >
                          <i class="fa-solid fa-circle-chevron-down"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td class="tmodal-data">Time</td>
                  <td class="tmodal-data">
                    <span class="pr-2">:</span>
                    {{ detailTime }}
                    <!-- {{ popupFrom[0] }} to {{ popupEnd[0] }} -->
                  </td>
                </tr>
                <tr>
                  <td class="tmodal-data text-nowrap">Meeting Name</td>
                  <td class="tmodal-data">
                    <p class="mb-0 tdata-overflow d-flex align-items-center">
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
                        name="detailMeetingName"
                        autocomplete="off"
                        maxlength="100"
                        class="form-control custom-form-control"
                        v-model="detailMeetingName"
                        :class="{
                          'is-invalid':
                            submitted && $v.detailMeetingName.$error,
                        }"
                      />
                    </p>
                    <div
                      v-if="submitted && $v.detailMeetingName.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.detailMeetingName.required"
                        >This field is required</span
                      >
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="tmodal-data text-nowrap">Description</td>
                  <td class="tmodal-data">
                    <p class="mb-0 tdata-overflow d-flex align-items-center">
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
                        name="detailMeetingDesc"
                        autocomplete="off"
                        maxlength="500"
                        class="form-control custom-form-control"
                        v-model="detailMeetingDesc"
                        :class="{
                          'is-invalid':
                            submitted && $v.detailMeetingDesc.$error,
                        }"
                      ></textarea>
                    </p>
                    <div
                      v-if="submitted && $v.detailMeetingDesc.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.detailMeetingDesc.required"
                        >This field is required</span
                      >
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="tmodal-data text-nowrap">Type of Meeting</td>
                  <td class="tmodal-data">
                    <p class="mb-0 tdata-overflow d-flex align-items-center">
                      <span class="pr-2">:</span>
                      <select
                        class="custom-select custom-select-sm mb-3"
                        tabindex=""
                        name="detailConversationType"
                        v-model="detailConversationType"
                        :class="{
                          'is-invalid':
                            submitted && $v.detailConversationType.$error,
                        }"
                      >
                        <option value="Video Conference">
                          Video Conference
                        </option>
                        <option value="In Person">In Person</option>
                      </select>
                    </p>
                    <div
                      v-if="submitted && $v.detailConversationType.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.detailConversationType.required"
                        >This field is required</span
                      >
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="tmodal-data text-nowrap">
                    {{
                      detailConversationType == "Video Conference"
                        ? "Meeting Link"
                        : "Meeting Location"
                    }}
                  </td>
                  <td class="tmodal-data">
                    <p class="mb-0 tdata-overflow d-flex align-items-center">
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
                        name="detailVenue"
                        autocomplete="off"
                        maxlength="200"
                        class="form-control custom-form-control"
                        v-model="detailVenue"
                        :class="{
                          'is-invalid': submitted && $v.detailVenue.$error,
                        }"
                      />
                    </p>
                    <div
                      v-if="submitted && $v.detailVenue.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.detailVenue.required"
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

              <div
                v-if="detailMeetingRequest == 0 && detailTeacherId != studentId"
                class="row text-center"
              >
                <button
                  type="button"
                  class="btn btn-color-save"
                  @click="acceptOrReject(1)"
                >
                  Accept
                </button>
                <button
                  type="button"
                  class="btn btn-color-close"
                  data-dismiss="modal"
                  @click="acceptOrReject(2)"
                >
                  Reject
                </button>
              </div>
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
              @click="updateDetails()"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal end -->
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Multiselect from "vue-multiselect";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import { required } from "vuelidate/lib/validators";

var slot_date = [];
var Peerarray = [];
var Teacherarray = [];
var Allarray = [];
var filterValue = "";
var all_data = [];
var selectValue = "";
export default {
  name: "UserviewAllMeeting",
  components: {
    Multiselect,
    lottie,
  },
  data() {
    return {
      value: "",
      date: "",
      slot_date: [],
      slot_date_selection: [],
      all_data: [],
      filterValue: "",
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      detailMeetingId: "",
      detailGroupId: "",
      detailStudentId: "",
      detailMeetingRequest: "",
      detailRequestId: "",
      detailScheduleId: "",
      detailTeacherId: "",
      detailSlotId: "",
      detailType: "",
      detailWith: "",
      detailMeetingWith: "",
      detailDate: "",
      detailTime: "",
      detailMeetingName: "",
      detailMeetingDesc: "",
      detailConversationType: "",
      detailVenue: "",
      date_formatted: "",
      submitted: false,
      meetingType: "",
      studentId: 0,
    };
  },
  validations: {
    detailMeetingName: { required },
    detailMeetingDesc: { required },
    detailConversationType: { required },
    detailVenue: { required },
  },
  mounted() {
    this.studentId = parseInt(localStorage.getItem("id"));
    this.ListAllMeeting();
    this.GetAll();
    var _this = this;
    $("#dLabel").text("All");
    $(".dropdown-menu li").on("click", function () {
      var getValue = $(this).text();
      $(".dropdown-select").text(getValue);
      _this.filterOption(getValue);
    });
  },
  computed: {
    ...mapState("viewAllMeeting", {
      allList: (state) => state.allList,
      allData: (state) => state.allData,
      timeZones: (state) => state.timeZones,
    }),
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
      invitedMembers: (state) => state.invitedMembers,
    }),
  },
  methods: {
    ...mapActions("viewAllMeeting", {
      listAllMeeting: "listAllMeeting",
      updateMeeting: "updateMeeting",
      getAll: "getAll",
    }),
    ...mapActions("teacherMeeting", {
      getStudents: "getStudents",
      getTeacher: "getTeacher",
      updateStudentTimeSchedule: "updateStudentTimeSchedule",
      updateTimeSchedule: "updateTimeSchedule",
      studentScheduleConfirm: "studentScheduleConfirm",
      scheduleConfirm: "scheduleConfirm",
      acceptOrRejectMeeting: "acceptOrRejectMeeting",
      getInvitedMembers: "getInvitedMembers",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async GetAll() {
      this.loading = true;
      await this.getAll({
        user_id: localStorage.getItem("id"),
      });
      this.loading = false;
    },

    async ListAllMeeting(value) {
      selectValue = "";
      if (value) {
        selectValue = value.id;
      }
      this.loading = true;
      await this.listAllMeeting({
        search_id: selectValue,
        student_id: localStorage.getItem("id"),
      });
      this.loading = false;
      this.dateConversion();
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
      this.allList.forEach((element) => {
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
        Scheduleobj["type"] = this.meetingType;
        Scheduleobj["title"] = title;
        Scheduleobj["dateFormat"] = dateFormat;
        Scheduleobj["from"] = from;
        Scheduleobj["end"] = end;
        Scheduleobj["date"] = element.date;
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

        Scheduleobj["meeting_id"] = element.meeting_id;
        Scheduleobj["group_id"] = element.group_id;
        Scheduleobj["request_id"] = element.request_id;
        Scheduleobj["student_id"] = element.student_id;
        Scheduleobj["schedule_id"] = element.schedule_id;
        Scheduleobj["slot_id"] = element.slot_id;
        Scheduleobj["teacher_id"] = element.teacher_id;
        Scheduleobj["date_formatted"] =
          date.format("YYYY") +
          "-" +
          date.format("MM") +
          "-" +
          date.format("DD");
        this.slot_date.push(Scheduleobj);
        Allarray.push(Scheduleobj);
        if (this.meetingType == "Teacher") {
          Teacherarray.push(Scheduleobj);
        } else if (this.meetingType == "Peer") {
          Peerarray.push(Scheduleobj);
        }
      });
    },

    filterOption(value) {
      if (value == "Teacher") {
        this.slot_date = Teacherarray;
      } else if (value == "Student") {
        this.slot_date = Peerarray;
      } else if (value == "All") {
        this.slot_date = Allarray;
      }
    },

    onCardClick(list) {
      this.detailDate = list.dateFormat;
      this.detailTime = list.from + " to " + list.end;
      this.detailMeetingName = list.meeting_name;
      this.detailMeetingDesc = list.meeting_description;
      this.detailConversationType = list.conversation_type;
      this.detailVenue =
        list.conversation_type == "In Person"
          ? list.meeting_location
          : list.meeting_link;
      this.detailType = list.type;
      this.detailWith = list.new_title;
      this.detailMeetingWith = list.meeting_with;
      this.detailMeetingId = list.meeting_id;
      this.detailMeetingId = list.meeting_id;
      this.detailGroupId = list.group_id;
      this.detailStudentId = list.student_id;
      this.detailRequestId = list.request_id;
      this.detailMeetingRequest = list.meeting_request;
      this.detailScheduleId = list.schedule_id;
      this.detailTeacherId = list.teacher_id;
      this.detailSlotId = list.slot_id;
      // var dateF = list.date.split("-");
      this.date = new Date(moment(list.date));
      this.getMemberDetails();
    },
    async updateDetails() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        $("#meetingDetailModal").modal("hide");
        this.loading = true;

        await this.updateMeeting({
          id: this.detailMeetingId,
          id: this.detailMeetingId,
          // teacher_id: this.value?.id,
          // student_id: localStorage.getItem("id"),
          schedule_id: this.detailScheduleId,
          slot_id: this.detailSlotId,
          date: this.date,
          conversation_type: this.detailConversationType,
          meeting_name: this.detailMeetingName,
          meeting_description: this.detailMeetingDesc,
          meeting_link:
            this.detailConversationType == "Video Conference"
              ? this.detailVenue
              : "",
          meeting_location:
            this.detailConversationType == "In Person" ? this.detailVenue : "",
        });

        this.loading = false;

        if (this.successMessage != "") {
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
    },
    resetValues() {
      this.detailMeetingId = "";
      this.detailMeetingId = "";
      // teacher_id: this.value?.id,
      // student_id: localStorage.getItem("id"),
      this.detailScheduleId = "";
      this.detailSlotId = "";
      this.date = "";
      this.detailConversationType = "";
      this.detailMeetingName = "";
      this.detailMeetingDesc = "";
      this.e = "";
    },

    onDateChange() {
      console.log(moment(this.date).format("YYYY-MM-DD"), this.date_formatted);
      if (moment(this.date).format("YYYY-MM-DD") == this.date_formatted) {
        alert("matching");
      } else {
        // if (this.initialDateSelect) {
        //   this.initialDateSelect = !this.initialDateSelect;
        // } else {
        this.UpdateTimeSchedule();
        // }
      }
    },
    async UpdateTimeSchedule() {
      if (this.detailType == "Teacher") {
        // if (!this.date) {
        //   $('input[name="daterange"]').val("");
        //   fromDate = "";
        //   endDate = "";
        //   this.slot_date = [];
        // }

        if (this.date) {
          // this.isMounted = true;
          this.loading = true;
          await this.updateTimeSchedule({
            student_id: parseInt(localStorage.getItem("id")),
            teacher_id: this.detailTeacherId ? this.detailTeacherId : "",
            from_date: this.date,
            to_date: this.date,
            include_weekends: 1,
            options_based_on_my_availability: 1,
          });

          this.loading = false;

          this.dateConversionSlot();
        }
      } else {
        if (this.selectedStudents.length > 0) {
          this.studentsValue = [];
          this.students_name = [];
          this.selectedStudents?.forEach((element) => {
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
            from_date: this.date,
            to_date: this.date,
            include_weekends: this.week ? 1 : 0,
            options_based_on_my_availability: this.availability ? 1 : 0,
          });
          this.dateConversionSlot();
          this.loading = false;
        }
      }
    },
    dateConversionSlot() {
      this.slot_date_selection = [];
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      if (this.detailType == "Teacher") {
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
          this.slot_date_selection.push(Scheduleobj);
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
        this.studentsSchedule?.forEach((element) => {
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
          this.slot_date_selection.push(Scheduleobj);
        });
      }
    },
    async acceptOrReject(status) {
      this.loading = true;

      await this.acceptOrRejectMeeting({
        meeting_request: status ? status.toString() : "",
        request_id: this.detailRequestId,
        student_id: this.detailStudentId,
      });

      this.loading = false;

      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.ListAllMeeting();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
    },
    async getMemberDetails() {
      this.loading = true;
      await this.getInvitedMembers({
        group_id: this.detailGroupId,
      });
      this.loading = false;
      console.log("invited members ", this.invitedMembers);
    },
  },

  // https://api.jochi.devateam.com/view/all/group_members_detail?group_id=36
};
</script>

<style>
.pending {
  background-color: yellow;
}
.accepted {
  background-color: green;
}
.rejected {
  background-color: red;
}
</style>


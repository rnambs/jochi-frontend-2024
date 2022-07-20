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
          d-flex
          flex-column
        "
      >
        <section id="tab" class="">
          <div class="tab-section container-fluid mt-4">
            <h3 class="color-primary font-bold px-3">My Meetings</h3>
            <div class="inner-tab-section container-fluid p-0">
              <div class="row m-0 mb-3">
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
                <div class="col-md-4 p-0 px-3 mx-1">
                  <div class="dropdown form-row custom-sort-by-btn">
                    <button
                      id="dLabel"
                      class="
                        dropdown-select
                        btn btn-void
                        p-0
                        color-secondary
                        font-normal
                        text-16
                        pr-2
                      "
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span class="mr-2 color-secondary"> Sort by</span>
                    </button>

                    <span class="caret color-secondary"
                      ><i class="fas fa-chevron-down"></i
                    ></span>
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

        <section id="view-all-section" class="d-flex h-40 flex-fill">
          <div
            class="
              meeting-section
              container-fluid
              d-flex
              custom-overflow
              pe-2
              mr--2
              flex-fill
            "
          >
            <div class="inner-meeting m-auto container-fluid p-0">
              <div class="row Meeting-row pl-0 pr-3 pt-0">
                <div
                  @click="onCardClick(list)"
                  class="col-lg-3 col-md-4 col-sm-6 col-12 mb-3 p-4"
                  v-for="(list, index) in slot_date"
                  :key="index"
                >
                  <div
                    class="
                      meeting-list
                      p-3
                      position-realtive
                      cursor-pointer
                      card card-void
                      align-items-center
                      h-100
                    "
                  >
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
                    <h6 class="color-dark text-center mb-2 font-semi-bold">
                      Meeting with {{ list["title"] }}
                    </h6>
                    <p class="color-secondary text-center mb-1">
                      {{ list["dateFormat"] }}
                    </p>
                    <p class="color-primary text-center mb-1">
                      <!-- {{ list["from"] }} to {{ list["end"] }} -->
                      {{ list["from"] }}
                      {{ list["end"] ? "to " + list["end"] : "" }}

                      {{ timeZones.timeZone }}
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
              <fieldset
                :disabled="
                  (detailType == 'Peer' && detailTeacherId != studentId) ||
                  detailMeetingRequest != 1
                "
              >
                <table class="w-100 table-modal custom-row-table">
                  <tr>
                    <td class="tmodal-data">Type</td>
                    <td class="tmodal-data">
                      <span class="pr-2"></span>
                      {{ detailType }}
                    </td>
                  </tr>

                  <tr>
                    <td class="tmodal-data">With</td>
                    <td class="tmodal-data d-flex align-items-center flex-wrap">
                      <span class="pr-2"></span>
                      <span v-if="detailType == 'Teacher'"
                        >{{ detailWith }}
                      </span>
                      <div
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
                      </div>
                    </td>
                  </tr>

                  <tr>
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
                          class="form-control"
                          placeholder="MM/DD/YYYY"
                          format="MM/dd/yyyy"
                          :value="detailDate"
                          v-model="detailDate"
                          @selected="onDateChange($event)"
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
                      </div>
                    </td>
                  </tr>

                  <tr v-if="isDateChanged && slot_date_selection.length > 0">
                    <td>Select Time</td>
                    <td>
                      <div class="d-flex align-items-center">
                        <span class="pr-2"></span>
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
                              :class="{
                                selected: Schedule.slot_id == selectedSlot,
                              }"
                              @click="slotClick(Schedule.slot_id)"
                            >
                              <div class="meeting-list p-3">
                                <h6>{{ Schedule["dateFormat"] }}</h6>
                                <p class="time">
                                  <!-- {{ Schedule["from"] }} to
                                  {{ Schedule["end"] }} -->
                                  {{ Schedule["from"] }}
                                  {{
                                    Schedule["end"]
                                      ? "to " + Schedule["end"]
                                      : ""
                                  }}
                                  {{ timeZones.timeZone }}
                                </p>
                              </div>
                            </div>
                            <div
                              v-if="
                                slot_date_selection.length == 0 && isMounted
                              "
                              class="empty-schedule"
                            >
                              <p>No time slot is available</p>
                            </div>
                          </div>
                          <button
                            class="
                              btn
                              down-btn down-arrow-icon
                              position-absolute
                            "
                          >
                            <i class="fa-solid fa-circle-chevron-down"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr v-if="!isDateChanged">
                    <td class="tmodal-data">Time</td>
                    <td class="tmodal-data">
                      <span class="pr-2"></span>
                      {{ detailTime }}
                      <!-- {{ popupFrom[0] }} to {{ popupEnd[0] }} -->
                    </td>
                  </tr>
                  <tr>
                    <td class="tmodal-data text-nowrap">Meeting Name</td>
                    <td class="tmodal-data">
                      <p
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
                          class="form-control bg-white"
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
                      <p
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
                          class="form-control bg-white"
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
                      <p
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
                        <select
                          class="form-control bg-white"
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
                      <p
                        class="
                          mb-0
                          col-12 col-md-8 col-lg-7
                          d-flex
                          align-items-center
                          form-row
                          py-0
                        "
                      >
                        <span class="pr-2"> </span>
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
                          class="form-control custom-form-control bg-white"
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
              </fieldset>
              <div
                v-if="
                  detailType == 'Peer' &&
                  detailMeetingRequest == 0 &&
                  detailTeacherId != studentId
                "
                class="row text-center"
              >
                <button
                  type="button"
                  class="btn btn-color-save"
                  data-dismiss="modal"
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
              v-if="
                (detailTeacherId == studentId || detailType == 'Teacher') &&
                detailMeetingRequest == 1
              "
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
      isDateChanged: false,
      selectedSlot: "",
      updatedDate: "",
    };
  },
  validations: {
    detailMeetingName: { required },
    detailMeetingDesc: { required },
    detailConversationType: { required },
    detailVenue: { required },
  },
  mounted() {
    var user = localStorage.getItem("user_type");

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
      successMessages: (state) => state.successMessages,
      SuccessTypes: (state) => state.SuccessTypes,
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
      $("#meetingDetailModal").modal();
      this.detailDate = list.date;
      this.detailTime = list.from + " to " + list.end;
      this.detailMeetingName = list.meeting_name;
      this.detailMeetingDesc = list.meeting_description;
      this.detailConversationType = list.conversation_type;
      this.detailVenue =
        list.conversation_type == "In Person"
          ? list.meeting_location
          : list.meeting_link;
      this.detailType = list.type;
      this.detailWith = list.title;
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
      this.date_formatted = list.date_formatted;
      // var dateF = list.date.split("-");
      this.date = new Date(moment(list.date));
      if (this.detailType != "Teacher") {
        this.getMemberDetails();
      }
    },
    async updateDetails() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        if (this.isDateChanged && !this.selectedSlot) {
          return this.$toast.open({
            message: "Please choose a slot before proceeding",
            type: "warning",
            duration: 5000,
          });
        }
        this.loading = true;

        await this.updateMeeting({
          id: this.detailMeetingId,
          // teacher_id: this.value?.id,
          // student_id: localStorage.getItem("id"),
          schedule_id: this.detailScheduleId,
          slot_id: this.isDateChanged ? this.selectedSlot : this.detailSlotId,
          date: this.isDateChanged
            ? this.updatedDate
            : moment(this.detail).format("YYYY-MM-DD"),
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
        if (this.successMessages != "") {
          this.resetValues();
          $(".modal-backdrop").remove();
          $("#meetingDetailModal").modal("hide");
          this.$toast.open({
            message: this.successMessages,
            type: this.SuccessTypes,
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
      }
    },
    resetValues() {
      this.isDateChanged = false;
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

    onDateChange(event) {
      console.log(
        event,
        moment(event).format("YYYY-MM-DD"),
        this.date_formatted
      );
      if (moment(event).format("YYYY-MM-DD") == this.date_formatted) {
        // alert("matching");
        this.isDateChanged = false;
      } else {
        // this.detailDate = moment(this.event, "YYYY-MM-DD");
        // if (this.initialDateSelect) {
        //   this.initialDateSelect = !this.initialDateSelect;
        // } else {
        this.isDateChanged = true;
        this.updatedDate = moment(event).format("YYYY-MM-DD");
        this.UpdateTimeSchedule(event);
        // }
      }
    },
    async UpdateTimeSchedule(dateSelected) {
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
        console.log(dateSelected);
        if (this.invitedMembers && this.invitedMembers.length > 0) {
          this.studentsValue = [];
          this.students_name = [];
          this.invitedMembers?.forEach((element) => {
            this.studentsValue.push(element.student_id);
          });
        }
        // if (this.studentsValue.length === 0) {
        //   this.value = "";
        //   $('input[name="daterange"]').val("");
        //   fromDate = "";
        //   endDate = "";
        //   this.studentsValue = "";
        //   this.loading = false;
        //   this.slot_date = [];
        //   this.isShowing = true;
        //   this.isMounted = false;
        // }

        if (this.studentsValue.length != 0) {
          this.isMounted = true;
          this.loading = true;

          await this.updateStudentTimeSchedule({
            student_id: parseInt(localStorage.getItem("id")),
            group_id: this.studentsValue,
            from_date: moment(dateSelected).format("YYYY-MM-DD"),
            to_date: moment(dateSelected).format("YYYY-MM-DD"),
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
          Scheduleobj["date"] = dateValue;
          Scheduleobj["slot_id"] = element.slot_id;
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
          Scheduleobj["slot_id"] = element.slot_id;
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
    },
    slotClick(id) {
      this.selectedSlot = id;
    },
  },

  // https://api.jochi.devateam.com/view/all/group_members_detail?group_id=36
};
</script>


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
        class="bg-white border rounded-10 p-4 custom-margin-for-main-section custom-full-height d-flex flex-column"
      >
        <section id="tab" class="">
          <div class="tab-section container-fluid">
            <h2
              data-intro="View all of your meetings. Here you can accept or reject requests or edit upcoming meetings."
              class="color-primary-dark font-semi-bold"
            >
              My Meetings
            </h2>
            <div class="inner-tab-section container-fluid p-0">
              <div class="row m-0 mb-3">
                <div class="col-md-6 col-lg-3 pb-0 pr-3">
                  <div
                    data-intro="Filter teacher and peer meetings from here."
                    class="dropdown form-row"
                  >
                    <div
                      class="dropdown-select d-inline-flex form-control rounded-8 border color-secondary font-normal text-16 pr-2"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span id="dLabel" class="mr-auto color-secondary">
                        Sort by</span
                      >
                      <span class="caret color-secondary"
                        ><i class="fas fa-chevron-down font-medium"></i
                      ></span>
                    </div>

                    <ul
                      class="dropdown-menu w-100 rounded-12 border p-2"
                      aria-labelledby="dLabel"
                    >
                      <li class="item p-2">Teacher Meeting</li>
                      <li class="item p-2">Peer Meeting</li>
                      <li class="item p-2">All</li>
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
            class="meeting-section d-flex custom-overflow pe-2 mr--2 flex-fill pt-3 pt-lg-0"
          >
            <div class="inner-meeting container-fluid p-0">
              <div class="row Meeting-row pl-0 pr-3 pt-0">
                <div
                  @click="onCardClick(list)"
                  class="col-lg-3 col-md-4 col-sm-6 col-12 mb-3 p-4"
                  v-for="(list, index) in slot_date"
                  :key="index"
                >
                  <div
                    class="meeting-list p-3 position-realtive cursor-pointer card card-void align-items-center h-100"
                  >
                    <div class="approved-tag position-absolute">
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
                    <p class="color-primary-dark text-center mb-1">
                      {{ list["from"] }}
                      {{ list["end"] ? "to " + list["end"] : "" }}

                      <span v-if="timeZones && timeZones.timeZone">
                        {{ timeZones.timeZone }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div
                v-if="slot_date.length == 0"
                class="empty-schedule d-flex align-items-center justify-content-center h-100"
              >
                <p>No meetings found</p>
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
      <div class="modal-dialog modal-md modal-dialog-centered" role="document">
        <div class="modal-content px-4">
          <div class="modal-header pb-2">
            <h3 class="modal-title" id="meetingDetailModalLongTitle">
              Meeting Details
            </h3>
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
                        class="mb-0 col-12 d-flex align-items-center form-row py-0"
                      >
                        <span class="pr-2"></span>

                        <date-picker
                          :class="
                            (detailType == 'Peer' &&
                              detailTeacherId != studentId) ||
                            detailMeetingRequest != 1
                              ? 'no-cursor'
                              : 'form-control'
                          "
                          placeholder="MM/DD/YYYY"
                          format="MM/dd/yyyy"
                          :value="detailDate"
                          v-model="detailDate"
                          :disabled-dates="disabledDates"
                          @selected="onDateChange($event)"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr
                    v-if="
                      !isDateChanged &&
                      !(
                        (detailType == 'Peer' &&
                          detailTeacherId != studentId) ||
                        detailMeetingRequest != 1
                      )
                    "
                  >
                    <td class="tmodal-data">Change Slot Time</td>
                    <span class="pr-2"></span>
                    <button
                      type="button"
                      @click="changeSlot"
                      class="btn btn-primary py-2 rounded-12"
                    >
                      <i class="fas fa-clock mr-2"></i><span>Change slot</span>
                    </button>
                  </tr>

                  <tr v-if="isDateChanged && slot_date_selection.length > 0">
                    <td style="vertical-align: top" class="pt-3">
                      Select Time
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        <span class="pr-2"></span>
                        <div
                          v-if="slot_date_selection.length > 0"
                          class="col-11 p-0 position-relative"
                        >
                          <div
                            class="row Meeting-row pl-0 pr-1 pt-1 my-2 custom-modal-ts-height"
                          >
                            <div
                              class="col-12 py-1 pr-1 text-center modal-time-schedules"
                              v-for="(Schedule, index) in slot_date_selection"
                              :key="index"
                              @click="slotClick(Schedule.slot_id, Schedule.id)"
                            >
                              <div
                                class="p-3"
                                :class="
                                  Schedule.slot_id == selectedSlot
                                    ? 'card card-primary border-theme'
                                    : 'card card-white'
                                "
                              >
                                <h6>{{ Schedule["dateFormat"] }}</h6>
                                <p class="time">
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
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr v-if="!isDateChanged">
                    <td class="tmodal-data">Time</td>
                    <td class="tmodal-data">
                      <span class="pr-2"></span>
                      {{ detailTime }}
                    </td>
                  </tr>
                  <tr>
                    <td class="tmodal-data text-nowrap">Meeting Name</td>
                    <td class="tmodal-data">
                      <p
                        class="mb-0 col-12 d-flex align-items-center form-row py-0"
                      >
                        <span class="pr-2"></span>

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
                        class="mb-0 col-12 d-flex align-items-center form-row py-0"
                      >
                        <span class="pr-2"></span>

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
                        class="mb-0 col-12 d-flex align-items-center form-row py-0"
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
                            'no-cursor':
                              (detailType == 'Peer' &&
                                detailTeacherId != studentId) ||
                              detailMeetingRequest != 1,
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
                        class="mb-0 col-12 d-flex align-items-center form-row py-0"
                      >
                        <span class="pr-2"> </span>

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
                </table>
              </fieldset>
            </form>
          </div>
          <div class="modal-footer justify-content-end border-top-0">
            <div
              v-if="
                detailType == 'Peer' &&
                detailMeetingRequest == 0 &&
                detailTeacherId != studentId
              "
              class="row text-center justify-content-end p-3"
            >
              <button
                type="button"
                class="btn btn-secondary py-1 px-4 rounded-8 mr-2 font-semi-bold"
                data-dismiss="modal"
                @click="acceptOrReject(2)"
              >
                Reject
              </button>
              <button
                type="button"
                class="btn btn-primary py-1 px-4 rounded-8 font-semi-bold"
                data-dismiss="modal"
                @click="acceptOrReject(1)"
              >
                Accept
              </button>
            </div>
            <div
              v-if="
                (detailTeacherId == studentId || detailType == 'Teacher') &&
                detailMeetingRequest == 1
              "
              class="row text-center justify-content-end p-3"
            >
              <button
                type="button"
                class="btn btn-secondary py-1 px-4 rounded-8 mr-2 font-semi-bold"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary py-1 px-4 rounded-8 font-semi-bold"
                @click="updateDetails()"
                :disabled="disableUpload"
              >
                Update
              </button>
            </div>
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
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/intro.js/6.0.0/introjs.css",
        },
      ],
    };
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
      detailDate: new Date(),
      detailDateFormat: new Date(),
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
      selectedScheduleId: "",
      updatedDate: "",
      disabledDates: {
        to: new Date(),
        from: new Date(),
      },
      date_today: new Date(),
      redirectId: this.$route.query.id,
      redirectType: this.$route.query.type,
      startTime: null,
      disableUpload: false,
    };
  },
  validations: {
    detailMeetingName: { required },
    detailMeetingDesc: { required },
    detailConversationType: { required },
    detailVenue: { required },
  },
  mounted() {
    window.addEventListener("orientationchange", this.handleOrientationChange);
    const page = "MeetingViewAll";
    const distinct_id = localStorage.getItem("distinctId");
    this.$mixpanel.track("Page View", { distinct_id, page });
    this.startTime = new Date().getTime();

    this.disabledDates.to = new Date(
      this.date_today.getFullYear(),
      this.date_today.getMonth(),
      this.date_today.getDate()
    );
    this.disabledDates.from = new Date(
      this.date_today.getFullYear(),
      this.date_today.getMonth() + 1,
      this.date_today.getDate()
    );
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
    this.startIntro();
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
    startProductGuide() {
      return this.$store.state.startProductGuide;
    },
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

        if (
          this.redirectId &&
          this.redirectType &&
          Number(this.redirectId) == Number(Scheduleobj.meeting_id)
        ) {
          this.onCardClick(Scheduleobj);
        }
        Allarray.push(Scheduleobj);
        if (this.meetingType == "Teacher") {
          Teacherarray.push(Scheduleobj);
        } else if (this.meetingType == "Peer") {
          Peerarray.push(Scheduleobj);
        }
      });
    },

    filterOption(value) {
      if (value == "Teacher Meeting") {
        this.slot_date = Teacherarray;
      } else if (value == "Peer Meeting") {
        this.slot_date = Peerarray;
      } else if (value == "All") {
        this.slot_date = Allarray;
      }
    },

    onCardClick(list) {
      $("#meetingDetailModal").modal();
      this.selectedSlot = "";
      this.slot_date_selection = [];
      this.detailDate = list.date;
      this.detailDateFormat = list.date_formatted;
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
      this.date = new Date(moment(list.date));
      if (this.detailType != "Teacher") {
        this.getMemberDetails();
      }
    },
    async updateDetails() {
      this.disableUpload = true;

      let valid = true;
      if (this.detailConversationType == "Video Conference") {
        valid = this.isValidHttpUrl(this.detailVenue);
      }
      if (valid) {
        this.submitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.disableUpload = false;
          return;
        } else {
          if (this.isDateChanged && !this.selectedSlot) {
            this.disableUpload = false;

            return this.$toast.open({
              message: "Please choose a slot before proceeding",
              type: "warning",
              duration: 5000,
            });
          }
          this.loading = true;

          let payLoad = {};
          payLoad = {
            id: this.detailMeetingId,
            schedule_id: this.isDateChanged
              ? this.selectedScheduleId
              : this.detailScheduleId,
            slot_id: this.isDateChanged ? this.selectedSlot : this.detailSlotId,

            date: this.isDateChanged ? this.updatedDate : this.detailDateFormat,
            conversation_type: this.detailConversationType,
            meeting_name: this.detailMeetingName,
            meeting_description: this.detailMeetingDesc,
            meeting_link:
              this.detailConversationType == "Video Conference"
                ? this.detailVenue
                : "",
            meeting_location:
              this.detailConversationType == "In Person"
                ? this.detailVenue
                : "",
          };
          this.disableUpload = true;

          await this.updateMeeting(payLoad);
          this.disableUpload = false;

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
      }
    },
    resetValues() {
      this.isDateChanged = false;
      this.detailMeetingId = "";
      this.detailScheduleId = "";
      this.detailSlotId = "";
      this.date = "";
      this.detailConversationType = "";
      this.detailMeetingName = "";
      this.detailMeetingDesc = "";
      this.e = "";
    },

    onDateChange(event) {
      if (moment(event).format("YYYY-MM-DD") == this.date_formatted) {
        this.isDateChanged = false;
      } else {
        this.isDateChanged = true;
        this.updatedDate = moment(event).format("YYYY-MM-DD");
        this.UpdateTimeSchedule(moment(event).format("YYYY-MM-DD"));
      }
    },
    changeSlot() {
      this.isDateChanged = true;
      let date = "";
      date = moment(this.detailDate).format("YYYY-MM-DD");
      this.updatedDate = moment(date).format("YYYY-MM-DD");
      this.UpdateTimeSchedule(moment(date).format("YYYY-MM-DD"));
    },
    async UpdateTimeSchedule(dateSelected) {
      if (this.detailType == "Teacher") {
        if (dateSelected) {
          this.loading = true;
          await this.updateTimeSchedule({
            student_id: parseInt(localStorage.getItem("id")),
            teacher_id: this.detailTeacherId ? this.detailTeacherId : "",
            from_date: dateSelected,
            to_date: dateSelected,
            include_weekends: 1,
            options_based_on_my_availability: 1,
          });

          this.loading = false;

          this.dateConversionSlot();
        }
      } else {
        if (this.invitedMembers && this.invitedMembers.length > 0) {
          this.studentsValue = [];
          this.students_name = [];
          this.invitedMembers?.forEach((element) => {
            if (element.student_id.toString() != localStorage.getItem("id"))
              this.studentsValue.push(element.student_id);
          });
        }

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
          Scheduleobj["id"] = element.id;
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
    slotClick(slot, id) {
      this.selectedSlot = slot;
      this.selectedScheduleId = id;
    },
    isValidHttpUrl(string) {
      let url;

      try {
        url = new URL(string);
      } catch (_) {
        this.$toast.open({
          message: "Please add valid URL",
          type: "warning",
          duration: 5000,
        });
        return false;
      }

      let valid = url.protocol === "http:" || url.protocol === "https:";
      if (!valid) {
        this.$toast.open({
          message: "Please add valid URL",
          type: "warning",
          duration: 5000,
        });
      }

      return valid;
    },
    startIntro() {
      const intro = this.$intro();
      let completed = false;
      let skip = false;
      if (this.startProductGuide) {
        intro.start();
        intro.onskip(() => {
          skip = true;
          this.$store.commit("setStartProductGuide", false);
        });
        if (skip) return;
        intro.oncomplete((step, state) => {
          completed = true;
          if (state != "skip") this.$router.push("/club-detail");
        });
        intro.onexit(() => {
          if (!completed) this.$store.commit("setStartProductGuide", false);
        });
      }
    },
    handleOrientationChange() {
      const intro = this.$intro();
      intro.exit();
      this.$store.commit("setStartProductGuide", false);
    },
  },
  beforeDestroy() {
    const endTime = new Date().getTime();
    const duration = (endTime - this.startTime) / 1000;
    const distinct_id = localStorage.getItem("distinctId");
    const page = "MeetingViewAll";
    this.$mixpanel.track("Page Duration", { duration, distinct_id, page });
  },
  destroyed() {
    window.removeEventListener(
      "orientationchange",
      this.handleOrientationChange
    );
  },
};
</script>


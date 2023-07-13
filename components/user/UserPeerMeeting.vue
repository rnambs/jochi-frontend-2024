<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div class="main-section">
      <!-- tab section for peer meeting -->
      <div class="bg-white border rounded-10 p-4 custom-margin-for-main-section custom-full-height">
        <section id="tab" class="">
          <div class="tab-section container-fluid mt-4">
            <h4 class="tab-head">Peer Meeting</h4>
            <div class="inner-tab-section container-fluid p-0">
              <div class="row m-0">
                <div class="col-md-3">
                  <div class="input-icon-area">
                    <multiselect
                      v-model="value"
                      :options="students"
                      track-by="first_name"
                      label="first_name"
                      placeholder="Select students"
                      :multiple="true"
                      :max="4"
                      @input="UpdateStudentTimeSchedule"
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
                  <div class="input-icon-area">
                    <input
                      type="text"
                      name="daterange"
                      class="form-control custom-form-control"
                      autocomplete="off"
                      placeholder="Select Date"
                      readonly="readonly"
                      :disabled="!value"
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
                      @change="UpdateStudentTimeSchedule()"
                      v-on:click="weekToggle()"
                    />
                    <label class="custom-control-label
                        font-normal
                        color-dark
                        text-14" for="custom-Switches"
                      >Include weekends</label
                    >
                  </div>
                  <div class="custom-switch">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customSwitches"
                      v-model="availability"
                      @change="UpdateStudentTimeSchedule()"
                      v-on:click="availabilityToggle()"
                    />
                    <label class="custom-control-label
                        font-normal
                        color-dark
                        text-14" for="customSwitches"
                      >Based on my availability</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      

        <!-- end tab section for peer meeting -->

        <!-- element secton -->

        <section id="teacher-section" class="">
          <div class="meeting-section container-fluid mt-4">
            <div class="inner-meeting m-auto container-fluid py-3">
              <div class="row Meeting-row" v-show="isShowing">
                <div class="col-md-4 p-3">
                  <div class="default-section">
                    <img src="~/assets/images/undraw/step1.png" alt="" />
                    <div class="default-area">
                      <h6 class="default-head">Step 1</h6>
                      <p class="default-text">
                        Search & Select Your Peers (up to 4)
                      </p>
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
              <div class="row Meeting-row pl-3 pr-3 pt-3">
                <div
                  class="col-md-4 mb-4 py-0"
                  v-for="(Schedule, index) in slot_date"
                  :key="index"
                >
                  <div
                    class="meeting-list p-3"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    v-on:click="
                      modalValue(
                        Schedule.dateFormat,
                        Schedule.from,
                        Schedule.slot,
                        Schedule.dateValue
                      )
                    "
                  >
                    <h6>{{ Schedule["dateFormat"] }}</h6>
                    <p class="time">
                      {{ Schedule["from"] }} {{ timeZones.timeZone }}
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
            <!-- Modal -->
            <div
              class="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
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
                        <td class="tmodal-data mb-2 text-nowrap">Meeting With</td>
                        <td class="tmodal-data">
                          <p class="mb-0 tdata-overflow">
                            <span class="pr-2">:</span
                            ><span
                              v-for="(Student, index) in students_name"
                              :key="index"
                              >{{ Student }}
                              {{ index != students_name.length - 1 ? "," : "" }}
                            </span>
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td class="tmodal-data mb-2">Date</td>
                        <td class="tmodal-data">
                          <span class="pr-2">:</span>{{ popupValue[0] }}
                        </td>
                      </tr>

                      <tr>
                        <td class="tmodal-data mb-2">Time</td>
                        <td class="tmodal-data">
                          <span class="pr-2">:</span>{{ popupFrom[0] }}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary py-1 px-4 "
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary py-1 px-4 "
                      data-dismiss="modal"
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
var studentsValue = [];
var fromDate = "";
var endDate = "";
var slot_date = [];
var from = [];
var students_name = "";
var weekToggleValue = "";
var availabilityToggleValue = "";
var popupValue = [];
var popupFrom = [];
var slot_id = "";
var modalDate = "";
export default {
  name: "PeerMeeting",
  components: {
    Multiselect,
    lottie,
  },
  data() {
    return {
      value: "",
      slot_date: [],
      from: [],
      students_name: [],
      dateRange: [],
      popupValue: [],
      popupFrom: [],
      isShowing: true,
      isMounted: false,
      studentsValue: [],
      availability: false,
      week: false,
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
    };
  },
  mounted() {
    this.GetStudents();
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
          _this.UpdateStudentTimeSchedule.bind(_this)();
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
    ...mapState("peerMeeting", {
      students: (state) => state.students,
      studentsSchedule: (state) => state.studentsSchedule,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      timeZones: (state) => state.timeZones,
    }),
  },
  methods: {
    ...mapActions("peerMeeting", {
      getStudents: "getStudents",
      updateStudentTimeSchedule: "updateStudentTimeSchedule",
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
    async UpdateStudentTimeSchedule(val) {
      if (val) {
        this.studentsValue = [];
        this.students_name = [];
        val.forEach((element) => {
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
    },

    weekToggle() {},
    availabilityToggle() {},
    modalValue(modalData, modalFrom, slotValue, value) {
      this.popupValue = [];
      this.popupFrom = [];
      this.popupEnd = [];
      this.popupValue.push(modalData);
      this.popupFrom.push(modalFrom);
      slot_id = slotValue;
      modalDate = value;
    },
    async ScheduleConfirm() {
      this.loading = true;
      await this.scheduleConfirm({
        group_Id: this.studentsValue,
        student_id: parseInt(localStorage.getItem("id")),
        slot_id: slot_id,
        date: modalDate,
      });

      if (this.successMessage != "") {
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
      this.value = "";

      $('input[name="daterange"]').val("");
      fromDate = "";
      endDate = "";
      this.studentsValue;
      this.loading = false;
      this.slot_date = [];
      this.isShowing = true;
      this.isMounted = false;
    },
  },
};
</script>
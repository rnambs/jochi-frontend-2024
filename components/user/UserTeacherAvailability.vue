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
        <div class="teacher-section bg-white border-0 rounded-10
        custom-margin-for-main-section custom-full-height
        d-flex
        flex-column">
          <div class="d-flex flex-wrap align-items-center justify-content-between px-4 pt-4">
            <h3 class="color-primary-dark heading3 font-semi-bold m-0 me-2 mb-2">Custom Avaliability</h3>
            <nuxt-link to="/teacher-syncCalendar">
            <button class="btn btn-primary mb-2 px-5 ml-auto">
              <span class="mr-2">{{ syncStatus == 1 ? "Disable" : "Enable" }}</span>
              <i class="fab fa-google"></i>
              <span class="ml-2">Calendar Sync</span>
            </button>
            </nuxt-link>
          </div>
          <div class="inner-teacher container-fluid px-4 pb-4 pt-3 pb-2 mb-2 d-flex flex-column flex-fill h-40 custom-overflow">
            <div class="row h-100">
              <div class="col-md-7 text-light custom-teacher-container d-flex flex-column ">
                <div class="time-slot calendar-sm container card card-primary rounded-22 p-3 pt-4 mb-4">
                  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                </div>
                <div class="time-slot-week container card card-primary rounded-22 p-3 pt-4">
                  <FullCalendar :options="calendar" />
                </div>
              </div>
              <div class="col-md-5 custom-teacher-container d-flex flex-column h-100">
                <div class="time-slot container card card-primary rounded-22 p-4 flex-fill h-40">
                  <p class="time-head pb-1">
                    <span class="color-dark text-16 font-semi-bold">{{ date_string }}</span>
                    <span class="color-secondary text-14 font-normal"><i>30 Minute Slot</i></span>
                  </p>
                  <div class="inner-slot hidden-scroll h-40 flex-fill mb-5">
                    <span v-for="(slot, index) in slotsArrayShow" :key="index">
                      <div

                        :class="
                          slot.exist
                            ? 'badge badge-color active'
                            : 'badge badge-color disabled'
                        "
                        @click="slot.exist = !slot.exist"
                        :id="slot.time"
                      >
                        {{ slot.time }}
                      </div>
                    </span>
                  </div>
                  <form action="" class="">
                    <div class="row slot-form">
                      <div class="col">
                        <div class="custom-switch mb-3 switch-right">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="switch_month"
                            @change="monthToggle"
                            v-model="isMonth"
                            name="default-cal"
                          />
                          <label
                            class="custom-control-label form-label color-dark"
                            for="switch_month"
                            >Apply for the month</label
                          >
                        </div>

                        <div class="custom-switch mb-3 switch-right">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="switch_week"
                            name="default-cal"
                            v-model="isWeek"
                            @change="weekToggle"
                          />
                          <label
                            class="custom-control-label
                        font-normal
                        color-dark
                        text-14 form-label"
                            for="switch_week"
                            >Apply for the week</label
                          >
                        </div>
                      </div>
                      <div class="col">
                        <div class="custom-switch mb-3 switch-right">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="switch_time"
                            v-model="isTime"
                            @change="defaultToggle"
                          />
                          <label
                            class="custom-control-label
                        font-normal
                        color-dark
                        text-14 form-label"
                            for="switch_time"
                            >Set default time
                          </label>
                        </div>

                        <div
                          v-if="isWeek || isMonth || isTime"
                          class="custom-switch mb-3 switch-right"
                        >
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="switch_day"
                            value="1"
                            v-model="weekend"
                          />
                          <label
                            class="custom-control-label
                        font-normal
                        color-dark
                        text-14 form-label"
                            for="switch_day"
                            >Include weekends</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="row slot-form container m-0 p-0">
                      <div class="form-group col-12">
                        <button
                          type="submit"
                          class="btn btn-primary my-2 py-1 px-4 float-right"
                          @click.prevent="UpdateTeacherAvailability()"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- End teacher Page -->
    </div>
  </div>
</template>
<script>
import FullCalendar, { Calendar } from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
var ismounted = false;
var dateClickValue = "";
var slot_id = [];
var dateStr = "";
export default {
  name: "UserTeacherAvailability",
  components: {
    FullCalendar,
    lottie,
  },
  data() {
    return {
      currentTime: "",
      weekend: "",
      month: "",
      week: "",
      isWeek: false,
      isMonth: false,
      isTime: false,
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      time: "",
      // slotList: [
      //   "12:00 AM",
      //   "12:30 AM",
      //   "01:00 AM",
      //   "01:30 AM",
      //   "02:00 AM",
      //   "02:30 AM",
      //   "03:00 AM",
      //   "03:30 AM",
      //   "04:00 AM",
      //   "04:30 AM",
      //   "05:00 AM",
      //   "05:30 AM",
      //   "06:00 AM",
      //   "06:30 AM",
      //   "07:00 AM",
      //   "07:30 AM",
      //   "08:00 AM",
      //   "08:30 AM",
      //   "09:00 AM",
      //   "09:30 AM",
      //   "10:00 AM",
      //   "10:30 AM",
      //   "11:00 AM",
      //   "11:30 AM",
      //   "12:00 PM",
      //   "12:30 PM",
      //   "01:00 PM",
      //   "01:30 PM",
      //   "02:00 PM",
      //   "02:30 PM",
      //   "03:00 PM",
      //   "03:30 PM",
      //   "04:00 PM",
      //   "04:30 PM",
      //   "05:00 PM",
      //   "05:30 PM",
      //   "06:00 PM",
      //   "06:30 PM",
      //   "07:00 PM",
      //   "07:30 PM",
      //   "08:00 PM",
      //   "08:30 PM",
      //   "09:00 PM",
      //   "09:30 PM",
      //   "10:00 PM",
      //   "10:30 PM",
      //   "11:00 PM",
      //   "11:30 PM",
      // ],
      slotList: [
        "07:00 AM",
        "07:30 AM",
        "08:00 AM",
        "08:30 AM",
        "09:00 AM",
        "09:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM",
        "01:00 PM",
        "01:30 PM",
        "02:00 PM",
        "02:30 PM",
        "03:00 PM",
        "03:30 PM",
        "04:00 PM",
        "04:30 PM",
        "05:00 PM",
        "05:30 PM",
        "06:00 PM",
        "06:30 PM",
        "07:00 PM",
        "07:30 PM",
        "08:00 PM",
      ],
      slots: [],
      slotsArray: [],
      slotsArrayShow: [],
      date_string: "",
      calendarApi: Calendar,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev",
          center: "title",
          right: "next",
        },
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        unselectAuto: false,
        dayClick: this.clickedDay,
        selectable: true,
      },
      calendar: {
        plugins: [dayGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev",
          center: "title",
          right: "next",
        },
        firstDay: 1,
        initialView: "dayGridWeek",
        dateClick: this.handleDateClick,
        unselectAuto: false,
        dayClick: this.clickedDay,
      },
    };
  },
  mounted() {
    ismounted = true;
    this.calendarApi = this.$refs.fullCalendar.getApi();
    this.TeacherAvailableSlot();
    this.AvailabilitySlotswithId();
    this.getCalendatSyncStatus();
  },

  computed: {
    ...mapState("customAvailability", {
      availableSlot: (state) => state.availableSlot,
      teacherSlot: (state) => state.teacherSlot,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
    ...mapState("teacherSyncCalendar", {
      syncStatus: (state) => state.syncStatus,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("customAvailability", {
      teacherAvailableSlot: "teacherAvailableSlot",
      updateTeacherAvailability: "updateTeacherAvailability",
      availabilitySlotswithId: "availabilitySlotswithId",
    }),
    ...mapActions("teacherSyncCalendar", {
      syncGoogleCalendar: "syncGoogleCalendar",
      updateToken: "updateToken",
      getSyncStatus: "getSyncStatus",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async toggleExist(slot, index) {
      this.slotsArray[index].exist = !slot.exist;
      this.slotsArrayShow = this.slotsArray;
    },
    async UpdateTeacherAvailability() {
      this.loading = true;
      if (this.isMonth == true) {
        this.month = 1;
      } else {
        this.month = 0;
      }
      if (this.isTime == true) {
        this.time = 1;
      } else {
        this.time = 0;
      }
      if (this.weekend == true) {
        this.weekend = 1;
      } else {
        this.weekend = 0;
      }
      if (this.isWeek == true) {
        this.week = 1;
      } else {
        this.week = 0;
      }
      slot_id = [];

      let activeSlots = this.slotsArray.filter((e) => e.exist == true);
      activeSlots.forEach((element) => {
        let item = this.availableSlot.find((e) => e.start_time == element.time);
        if (item) {
          slot_id.push(item.id);
        }
      });

      await this.updateTeacherAvailability({
        apply_for_a_month: this.month,
        include_weekends: this.weekend,
        date: dateClickValue,
        teacher_id: localStorage.getItem("id"),
        apply_for_a_week: this.week,
        set_default_time: this.time,
        slot: slot_id,
      });
      this.loading = false;
      if (!ismounted) {
        this.TeacherAvailableSlot();
      }
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
    },
    async TeacherAvailableSlot() {
      await this.teacherAvailableSlot({
        teacher_id: localStorage.getItem("id"),
      });

      if (ismounted) {
        const format = "YYYY-MM-DD";

        let dateStr = moment(this.calendarApi.getDate()).format(format);
        let argVal = { dateStr: dateStr };

        this.handleDateClick(argVal);
      }
    },
    async AvailabilitySlotswithId() {
      await this.availabilitySlotswithId({});
    },
    async getCalendatSyncStatus() {
      await this.getSyncStatus();
    },
    async syncToGoogle() {
      let authCode = "";
      if (this.syncStatus == 0) {
        authCode = await this.$gAuth.getAuthCode();
      }
      this.loading = true;
      await this.updateToken({
        user_id: localStorage.getItem("id"),
        status: this.syncStatus == 1 ? false : true,
        token: authCode,
      });
      this.loading = false;

      if (this.successMessage != "") {
        this.getSyncStatus();
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
    formatDate(date) {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var d = new Date(date),
        month = "" + monthNames[d.getMonth()],
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (day.length < 2) day = "0" + day;

      return [day, month, year].join(" ");
    },

    compare_dates(slot_Time, current_Time) {
      var dateClickFormat = this.formatDate(dateClickValue);
      var todayFormat = this.formatDate(new Date());
      var jdt1 = Date.parse(dateClickFormat + " " + slot_Time);
      var jdt2 = Date.parse(todayFormat + " " + current_Time);

      if (jdt1 >= jdt2) {
        return true;
      } else {
        return false;
      }
    },
    checkSlot(slot) {
      var selectableSlot = this.compare_dates(slot, this.currentTime);
      if (
        this.slotsArray.filter((e) => e.time === slot).length > 0 &&
        selectableSlot
      ) {
        return true;
      } else {
        return false;
      }
    },
    checkTime(slot) {
      var selectableSlot = this.compare_dates(slot, this.currentTime);
      if (selectableSlot) {
        return true;
      } else {
        return false;
      }
    },
    weekToggle() {
      if (this.isWeek) {
        if (this.isMonth || this.isTime) {
          this.isMonth = false;
          this.isTime = false;
        }
      }
    },
    monthToggle() {
      if (this.isMonth) {
        if (this.isWeek || this.isTime) {
          this.isWeek = false;
          this.isTime = false;
        }
      }
    },
    defaultToggle() {
      if (this.isTime) {
        if (this.isMonth || this.isWeek) {
          this.isWeek = false;
          this.isMonth = false;
        }
      }
    },
    clickedDay: function (date) {
      var dateSelected = false;
      if (date.weekday() != 0 && date.weekday() != 6) {
        dateSelected = true;
        $("#calendar").fullCalendar("select", date);
        $("input[name=selectedDate]").val(date.format("MM/DD/YYYY"));
      }
      if (!dateSelected) {
      }
    },
    handleDateClick: function (arg) {
      this.slots = [];
      this.slotsArray = [];
      this.slotsArrayShow = [];
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
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      dateClickValue = arg.dateStr;
      var date = new Date(arg.dateStr);
      var month = monthNames[date.getMonth()];
      var weekDay = days[date.getDay()];
      var clickedDate = date.getDate();
      var clickedYear = date.getFullYear();

      var date = moment(arg.dateStr, "YYYY-MM-DD");
      this.date_string =
        date.format("dddd") +
        ", " +
        date.format("D") +
        " " +
        date.format("MMMM");

      // this.date_string =
      //   weekDay + "," + clickedDate + " " + month + " " + clickedYear;
      this.slotList.forEach((e) => {
        this.slotsArray.push({ exist: false, time: e });
      });
      let dates = this.teacherSlot.filter((elem) => elem.date == arg.dateStr);
      dates.forEach((element) => {
        let exist = this.checkSlot(element.default_slots.start_time);
        // this.slots.push(element.default_slots.start_time);
        let index = this.slotsArray.findIndex(
          (item) => item.time == element.default_slots.start_time
        );
        this.slotsArray[index] = {
          exist: exist,
          time: element.default_slots.start_time,
        };
      });
      this.slotsArrayShow = this.slotsArray.filter((e) => {
        return e;
      });
      if (!ismounted) {
      }
      ismounted = false;
    },
  },
};
</script>

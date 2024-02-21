<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />

    <div :class="!accordionOpened ? 'main-section' : 'main-section opened'">
      <!-- teacher Page -->
      <section id="teacher-detail" class="">
        <div
          class="teacher-section bg-global border-0 rounded-10 m--12 custom-full-height d-flex flex-column"
        >
          <h3 class="color-primary-dark heading3 font-semi-bold m-0 px-1 pt-2">
            Set Availability
          </h3>
          <button @click="syncToGoogle()" class="btn btn-primary my-2 px-5 ml-auto">
              <span class="mr-2">{{ syncStatus == 1 ? "Disable" : "Enable" }}</span>
              <i class="fab fa-google"></i>
              <span class="ml-2">Calendar Sync</span>
            </button>
          <div
            class="inner-teacher container-fluid px-1 py-2 pb-2 mb-2 d-flex flex-column flex-fill h-40 custom-overflow"
          >
            <div class="row h-100">
              <div
                class="col-md-7 text-light custom-teacher-container d-flex flex-column align-items-center"
              >
                <div
                  @click="setSessionType('assignment', false)"
                  class="row card card-void m-0 mb-4 py-4 px-2 flex-row calendar-box container w-100"
                >
                  <div class="col-sm-7 col-md-8 col-xl-7 col-xxl-12 d-flex flex-column justify-content-center justify-content-xxl-start">
                    <h3 class="color-primary-dark heading3 font-semi-bold mb-1">
                      When Are You Free?
                    </h3>
                    <p class="mb-0 color-gray font-semi-bold text-16">
                      Use this page to set your availability so that people
                      know when you're free.
                    </p>
                  </div>
                  <div
                    class="col-sm-5 col-md-4 col-xl-5 col-xxl-12 d-flex align-items-center align-items-xxl-start justify-content-end"
                  >
                    <!-- <img
                      src="~/static/image/Calendar-2.png"
                      alt=""
                      class="card-img small-size"
                    /> -->
                    <img
                        src="~/static/image/v4/free-time-light.svg"
                        alt=""
                        class="card-img small-size img-theme light"
                      />
                      <img
                        src="~/static/image/v4/free-time-dark.svg"
                        alt=""
                        class="card-img small-size img-theme dark"
                      />

                  </div>
                </div>
                <div
                  data-intro="Pre-set your availability so your peers know when you are available to meet. If you don’t set custom availability, Jochi will rely on your commitments that appear on your Jochi calendar. Here, you can choose a specific upcoming date to set your availability."
                  class="time-slot calendar-sm container card card-secondary rounded-22 border-0 pt-5 mt-4 p-0"
                >
                  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                </div>
              </div>
              <div
                class="col-md-5 custom-teacher-container d-flex flex-column h-100"
              >
                <div
                  class="time-slot container card border-0 rounded-22 p-1 flex-fill h-40"
                >
                  <p
                    data-intro="To set your custom availability, choose a series of 30 minute slots that work for you."
                    class="time-head pb-1 px-1"
                  >
                    <span class="color-dark text-16 font-semi-bold">{{
                      date_string
                    }}</span>
                    <span class="color-secondary text-14 font-normal"
                      ><i>Select 30 minute slots</i></span
                    >
                  </p>
                  <div class="inner-slot hidden-scroll mb-4">
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
                  <form action="" class="d-flex flex-column align-items-center justify-content-center px-1">
                    <div
                      data-intro="Save time and block out these slots for an entire week or month. You can also set this as your default preferences."
                      class="row card w-100 slot-form"
                    >
                      <div class="col">
                        <div class="custom-switch mb-3">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="switch_month"
                            @change="monthToggle"
                            v-model="isMonth"
                            name="default-cal"
                          />
                          <label
                            class="custom-control-label font-normal color-dark form-label"
                            for="switch_month"
                            >Set availability for the month</label
                          >
                        </div>

                        <div class="custom-switch mb-3">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="switch_week"
                            name="default-cal"
                            v-model="isWeek"
                            @change="weekToggle"
                          />
                          <label
                            class="custom-control-label font-normal color-dark text-14 form-label"
                            for="switch_week"
                            >Set availability for the week</label
                          >
                        </div>
                      </div>
                      <div class="col">
                        <div class="custom-switch mb-3">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="switch_time"
                            v-model="isTime"
                            @change="defaultToggle"
                          />
                          <label
                            class="custom-control-label font-normal color-dark text-14 form-label"
                            for="switch_time"
                            >Set as default availability
                          </label>
                        </div>

                        <div
                          v-if="isWeek || isMonth || isTime"
                          class="custom-switch mb-3"
                        >
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="switch_day"
                            value="1"
                            v-model="weekend"
                          />
                          <label
                            class="custom-control-label font-normal color-dark text-14 form-label"
                            for="switch_day"
                            >Include weekends</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="row container m-0 px-0 py-2">
                      <div class="form-group col-12 col-sm-6 py-0 pl-0 pr-0 pr-sm-2">
                        <button
                          type="submit"
                          class="btn btn-void my-2 px-4 w-100"
                        >
                          Cancel
                        </button>
                      </div>
                      <div class="form-group col-12 col-sm-6 py-0 pr-0 pl-0 pl-sm-2">
                        <button
                          type="submit"
                          class="btn btn-primary my-2 px-4 w-100"
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
import { eventBus } from "~/plugins/eventbus.js";
var ismounted = false;
var dateClickValue = "";
var slot_id = [];
var dateStr = "";
export default {
  name: "StudentAvailability",
  components: {
    FullCalendar,
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
      accordionOpened:false,
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
      startTime: null,
    };
  },
  created() {
    eventBus.$on('accordionOpened', (newValue) => {
      this.accordionOpened = newValue;
    });
  },
  mounted() {
    window.addEventListener("orientationchange", this.handleOrientationChange);
    const page = "MeetingAvailability";
    const distinct_id = localStorage.getItem("distinctId");
    this.$mixpanel.track("Page View", { distinct_id, page });
    this.startTime = new Date().getTime();
    ismounted = true;
    this.calendarApi = this.$refs.fullCalendar.getApi();
    this.TeacherAvailableSlot();
    this.AvailabilitySlotswithId();
    this.startIntro();
    this.getCalendatSyncStatus();
  },

  computed: {
    ...mapState("studentCustomAvailability", {
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
    startProductGuide() {
      return this.$store.state.startProductGuide;
    },
  },
  methods: {
    ...mapActions("studentCustomAvailability", {
      teacherAvailableSlot: "teacherAvailableSlot",
      updateTeacherAvailability: "updateTeacherAvailability",
      availabilitySlotswithId: "availabilitySlotswithId",
    }),
    ...mapActions("teacherSyncCalendar", {
      syncGoogleCalendar: "syncGoogleCalendar",
      updateToken: "updateToken",
      getSyncStatus: "getSyncStatus",
    }),
    async getCalendatSyncStatus() {
      await this.getSyncStatus();
    },
    async syncToGoogle() {
      let authCode = "";
      if (this.syncStatus == 0) {
        authCode = await this.$gAuth.getAuthCode();
      }
      console.log("1",'working')
      this.loading = true;
      await this.updateToken({
        user_id: localStorage.getItem("id"),
        status: this.syncStatus == 1 ? false : true,
        token: authCode,
      });
      console.log("2",'working')
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
        student_id: localStorage.getItem("id"),
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

      this.slotList.forEach((e) => {
        this.slotsArray.push({ exist: false, time: e });
      });
      let dates = this.teacherSlot.filter((elem) => elem.date == arg.dateStr);
      dates.forEach((element) => {
        let exist = this.checkSlot(element.default_slots.start_time);
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
          if (state != "skip") this.$router.push("/viewall-meeting");
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
    const page = "MeetingAvailability";
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
<style>
.custom-switch .custom-control-label::after {
  top: calc(0.0375rem + 2px) !important;
}
</style>


<template>
  <div class="main-section">
    <!-- Study Page -->
    <div
      class="
        jochi-components-light-bg
        p-4
        custom-margin-for-main-section custom-full-height
        d-flex
      "
    >
      <div class="study-section d-flex flex-column">
        <div
          class="d-flex align-items-center justify-content-between mb-4 px-2"
        >
          <h2 class="color-primary font-semi-bold mb-0">Study Analytics</h2>
          <div @click="openModal" class="d-flex align-items-center cursor-pointer">
            <p class="mb-0 d-flex flex-column text-right">
              <span class="color-dark text-16 font-semi-bold"
                >{{ duration }} Minutes Studied Today</span
              >
              <span class="color-secondary text-14 font-normal"
                >{{ durationRemaining }} Minutes Left</span
              >
            </p>
            <img
              src="../../static/image/alarm.png"
              alt=""
              class="img-fluid icon-img ml-2"
            />
          </div>
        </div>
        <div class="study-row d-flex flex-column px-2">
          <div class="row header-row mb-1">
            <div class="col-md-6 pt-2 pb-0">
              <h4 class="color-dark font-semi-bold mb-0">Weekly Dashboard</h4>
            </div>
            <div class="col-md-6 pt-2 pb-0">
              <h4 class="color-dark font-semi-bold mb-0">Dashboard</h4>
            </div>
          </div>
          <div class="row inner-row mt-0 text-center mb-2">
            <div class="col-md-3 py-2">
              <div class="inner-col card card-white p-2">
                <h6 class="color-dark font-semi-bold">Total Minutes</h6>
                <p class="total-value text-24 color-dark font-semi-bold">
                  {{
                    mySession.total_minutes_week
                      ? mySession.total_minutes_week
                      : 0
                  }}<sup class="color-label-green font-light text-16"
                    >{{
                      formatted_minute_status_week
                        ? formatted_minute_status_week >= 0
                          ? "+" + formatted_minute_status_week
                          : formatted_minute_status_week
                        : "+0"
                    }}%</sup
                  >
                </p>
              </div>
            </div>
            <div class="col-md-3 py-2">
              <div class="inner-col card card-white p-2">
                <h6 class="color-dark font-semi-bold">Total Session</h6>
                <p class="total-value text-24 color-dark font-semi-bold">
                  {{
                    mySession.total_sessions_week
                      ? mySession.total_sessions_week
                      : 0
                  }}<sup class="color-label-green font-light text-16"
                    >{{
                      formatted_session_status_week
                        ? formatted_session_status_week >= 0
                          ? "+" + formatted_session_status_week
                          : formatted_session_status_week
                        : "+0"
                    }}%</sup
                  >
                </p>
              </div>
            </div>
            <div class="col-md-3 py-2">
              <div class="inner-col card card-white p-2">
                <h6 class="color-dark font-semi-bold">Total Minutes</h6>
                <p class="total-value text-24 color-dark">
                  {{ mySession.total_minutes ? mySession.total_minutes : 0 }}
                </p>
              </div>
            </div>
            <div class="col-md-3 py-2">
              <div class="inner-col card card-white p-2">
                <h6 class="color-dark font-semi-bold">Total Session</h6>
                <p class="total-value text-24 color-dark">
                  {{ mySession.total_sessions ? mySession.total_sessions : 0 }}
                </p>
              </div>
            </div>
          </div>
          <div class="row inner-row mt-0 mb-2">
            <div class="col-md-6 py-2">
              <div
                class="
                  inner-col
                  card card-white
                  p-3
                  h-100
                  d-flex
                  align-items-center
                  justify-content-center
                "
              >
                <!-- {{mySession.weekly_pi_chart}} -->
                <div class="d-flex">
                  <div class="d-flex flex-column justify-content-center">
                    <div
                      v-for="item in legends"
                      :key="item.value"
                      class="d-flex chart-discription"
                    >
                      <span
                        v-bind:style="{ backgroundColor: item.color }"
                        class="chart-color mx-2"
                      >
                      </span>
                      <span class="chart-text color-dark">
                        {{ item.value }}
                      </span>
                    </div>
                  </div>
                  <div id="weeklyContainer" class="chart color-secondary">
                    <canvas
                      id="weekly"
                      width="600"
                      height="380"
                      class="w-auto h-auto"
                    ></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 py-2">
              <div
                class="
                  inner-col
                  card card-white
                  p-3
                  h-100
                  d-flex
                  align-items-center
                  justify-content-center
                "
              >
                <div class="d-flex">
                  <div class="d-flex flex-column justify-content-center">
                    <div
                      v-for="item in legendsTotal"
                      :key="item.value"
                      class="d-flex chart-discription"
                    >
                      <span
                        v-bind:style="{ backgroundColor: item.color }"
                        class="chart-color mx-2"
                      >
                      </span>
                      <span class="chart-text">
                        {{ item.value }}
                      </span>
                    </div>
                  </div>
                  <div
                    id="totalPieContainer"
                    class="chart p-2 text-center text-white"
                  >
                    <canvas
                      id="totalPie"
                      width="600"
                      height="380"
                      class="w-auto h-auto"
                    ></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row inner-row mt-0">
            <div class="col-md-12 pt-2 pb-0">
              <h4 class="color-dark font-semi-bold mb-0">Progress Chart</h4>
            </div>
            <div class="col-md-6 mb-2">
              <div class="inner-col card card-white p-2">
                <canvas id="progress1" width="600" height="380"></canvas>
              </div>
            </div>
            <div class="col-md-6 mb-2">
              <div class="inner-col card card-white p-2">
                <canvas id="progress2" width="600" height="380"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- End Study Page -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="goalModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="goalModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="goalModalLongTitle">
              Configure Daily Study Session Goal
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
            <input
              type="number"
              min="0"
              max="24"
              id="hours"
              v-model="hours"
              class="form-control"
              @change="submitted = submitted ? !submitted : submitted"
              :class="{
                'is-invalid': submitted && (hours < 0 || hours > 24),
              }"
            />
            <div
              v-if="submitted && (hours < 0 || hours > 24)"
              class="invalid-feedback"
            >
              <span>Please enter a valid value</span>
            </div>

            <input
              type="number"
              min="0"
              max="60"
              id="minutes"
              v-model="minutes"
              @change="submitted = submitted ? !submitted : submitted"
              class="form-control"
              :class="{
                'is-invalid': submitted && (minutes < 0 || minutes > 60),
              }"
            />
            <div
              v-if="submitted && (minutes < 0 || minutes > 60)"
              class="invalid-feedback"
            >
              <span>Please enter a valid value</span>
            </div>
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
              data-dismiss="modal"
              @click="configureGoal()"
              :disabled="processing"
            >
              Configure
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal end -->
  </div>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
// import Multiselect from 'vue-multiselect'
import { mapState, mapActions } from "vuex";
export default {
  name: "dashBoard",
  components: {
    lottie,
    // Multiselect
  },
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  data() {
    return {
      legends: [],
      legendsTotal: [],
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      value: { name: "Vue.js", language: "JavaScript" },
      options: [
        { name: "Vue.js", language: "JavaScript" },
        { name: "Rails", language: "Ruby" },
        { name: "Sinatra", language: "Ruby" },
        { name: "Laravel", language: "PHP" },
        { name: "Phoenix", language: "Elixir" },
      ],
      formatted_minute_status_week: "",
      formatted_session_status_week: "",
      // :''
      submitted: false,
      processing: false,
      hours: 0,
      minutes: 0,
      duration: 0,
      durationRemaining: 0,
      dailyTimerId: 0,
    };
  },
  mounted() {
    this.GetMySession();
    this.getConfiguredGoal();
    // this.InitPieChart();
  },
  computed: {
    ...mapState("userStudyAnalytics", {
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      mySession: (state) => state.mySession,
      goal: (state) => state.goal,
    }),
  },
  methods: {
    ...mapActions("userStudyAnalytics", {
      getMySession: "getMySession",
      setGoal: "setGoal",
      getGoal: "getGoal",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },

    roundDecimal() {
      this.formatted_minute_status_week =
        this.mySession.minute_status_week?.toFixed(2);
      this.formatted_session_status_week =
        this.mySession.session_status_week?.toFixed(2);
    },

    async GetMySession() {
      await this.getMySession({
        //   filterBy: 'Last Week'
      });
      this.InitPieChart();
      this.roundDecimal();
    },
    async InitPieChart() {
      var ctx = document.getElementById("weekly").getContext("2d");
      const subject = [];
      const percentage = [];
      const bgColor = [];
      this.legends = [];

      for (var i = 0; i < this.mySession.weekly_pi_chart.length; i++) {
        var obj = this.mySession.weekly_pi_chart[i];
        let percentageVal = obj.percentage ? obj.percentage : 0;
        subject.push(percentageVal?.toFixed(2) + "% " + obj.subject_name);
        percentage.push(percentageVal?.toFixed(2));
        bgColor.push("#" + obj.subjectColor.toString().substr(4));
        this.legends.push({
          value: percentageVal?.toFixed(2) + "% " + obj.subject_name,
          color: "#" + obj.subjectColor.toString().substr(4),
        });
      }

      if (percentage.length < 1) {
        document.getElementById("weeklyContainer").innerHTML =
          "No data to display!";
      }
      new Chart(ctx, {
        type: "doughnut",
        data: {
          // formatted_session_status_week
          labels: subject,
          datasets: [
            {
              data: percentage, // Specify the data values array

              borderColor: bgColor, // Add custom color border
              backgroundColor: bgColor, // Add custom color background (Points and Fill)
              borderWidth: 1, // Specify bar border width
            },
          ],
        },
        options: {
          responsive: true, // Instruct chart js to respond nicely.
          maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
          legend: {
            display: false,
          },
        },
      });

      // total percentage

      var totalPie = document.getElementById("totalPie").getContext("2d");
      const subjectTotal = [];
      const percentageTotal = [];
      const bgColorTotal = [];
      this.legendsTotal = [];

      for (var i = 0; i < this.mySession.monthly_pi_chart.length; i++) {
        var obj = this.mySession.monthly_pi_chart[i];
        let percentageVal = obj.percentage ? obj.percentage : 0;
        subjectTotal.push(percentageVal?.toFixed(2) + "% " + obj.subject_name);
        percentageTotal.push(percentageVal?.toFixed(2));
        bgColorTotal.push("#" + obj.subjectColor.toString().substr(4));
        this.legendsTotal.push({
          value: percentageVal?.toFixed(2) + "% " + obj.subject_name,
          color: "#" + obj.subjectColor.toString().substr(4),
        });
      }

      if (percentageTotal.length < 1) {
        document.getElementById("totalPieContainer").innerHTML =
          "No data to display!";
      }
      new Chart(totalPie, {
        type: "doughnut",
        data: {
          // formatted_session_status_week
          labels: subjectTotal,
          datasets: [
            {
              data: percentageTotal, // Specify the data values array

              borderColor: bgColorTotal, // Add custom color border
              backgroundColor: bgColorTotal, // Add custom color background (Points and Fill)
              borderWidth: 1, // Specify bar border width
            },
          ],
        },
        options: {
          responsive: true, // Instruct chart js to respond nicely.
          maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
          legend: {
            display: false,
          },
        },
      });

      // Progress 1
      var progress1 = document.getElementById("progress1").getContext("2d");

      const colors = {
        white: {
          stroke: "#fff",
        },
        lightBlue: {
          stroke: "#6fccdd",
        },
        darkBlue: {
          stroke: "#3282bf",
        },
        purple: {
          stroke: "#75539e",
        },
      };
      //    const avg =  [];
      // alert(avg)
      const avg = [];
      const Xdays = [];
      for (var i = 0; i < this.mySession.average_line_chart_data.length; i++) {
        var obj = this.mySession.average_line_chart_data[i];
        var da = obj.avg ?? 0;
        avg.push(da);
        Xdays.push(obj.day);
      }

      const myChart = new Chart(progress1, {
        type: "line",
        data: {
          labels: Xdays,
          datasets: [
            {
              label: "Average ",
              lineTension: 0,
              fill: false,
              pointBackgroundColor: "#7DD175",
              borderColor: "#7DD175",
              pointHighlightStroke: "#7DD175",
              data: avg,
            },
          ],
        },
        options: {
          responsive: true,
          // Can't just just `stacked: true` like the docs say
          scales: {
            yAxes: [
              {
                stacked: false,
              },
            ],
          },
          animation: {
            duration: 750,
          },
          legend: {
            display: true,
            labels: {
              usePointStyle: true,
            },
          },
        },
      });

      // Progress 2
      var progress2 = document.getElementById("progress2").getContext("2d");

      let efficiency = [];
      let focusData = [];
      let workCompletes = [];
      let X2days = [];
      for (var i = 0; i < this.mySession.total_line_chart_data.length; i++) {
        var obj2 = this.mySession.total_line_chart_data[i];
        efficiency.push(obj2.efficiency ? obj2.efficiency : 0);
        focusData.push(obj2.focus ? obj2.focus : 0);
        workCompletes.push(obj2.workCompletes ? obj2.workCompletes : 0);
        X2days.push(obj2.day);
      }

      const myChart1 = new Chart(progress2, {
        type: "line",
        data: {
          labels: X2days,
          datasets: [
            {
              label: "Efficiency",
              lineTension: 0,
              fill: false,
              pointBackgroundColor: "#7DD175",
              borderColor: "#7DD175",
              pointHighlightStroke: "#7DD175",
              data: efficiency,
            },
            {
              label: "Focus",
              lineTension: 0,
              fill: false,
              pointBackgroundColor: "#B4B4B4",
              borderColor: "#B4B4B4",
              pointHighlightStroke: "#B4B4B4",
              data: focusData,
            },
            {
              label: "Work Completed",
              lineTension: 0,
              fill: false,
              pointBackgroundColor: "#F49196",
              borderColor: "#F49196",
              pointHighlightStroke: "#F49196",
              data: workCompletes,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [
              {
                stacked: false,
              },
            ],
          },
          animation: {
            duration: 750,
          },
          legend: {
            display: true,
            labels: {
              usePointStyle: true,
            },
          },
        },
      });
    },
    openModal() {
      this.submitted = false;
      this.processing = false;
      $("#goalModal").modal({ backdrop: true });
    },
    closeModal() {
      $("#goalModal").modal("hide");
      $(".modal-backdrop").remove();
    },
    async configureGoal() {
      this.submitted = true;
      this.processing = true;

      let duration = 0;
      if (this.hours && this.minutes) {
        if (
          this.hours > 0 &&
          this.hours < 24 &&
          this.minutes > 0 &&
          this.minutes < 60
        ) {
          duration = this.hours * 60 + this.minutes;
        }

        if (duration <= 0) {
          this.processing = false;

          return this.$toast.open({
            message: "Please configure valid times",
            type: "warning",
            duration: 5000,
          });
        }

        await this.setGoal({
          daily_timer_id: this.dailyTimerId > 0 ? this.dailyTimerId : null,
          duration: duration,
        });
        if (this.successMessage != "") {
          this.submitted = false;
          this.closeModal();
          this.getConfiguredGoal();
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });

          this.hours = 0;
          this.minutes = 0;
        } else if (this.errorMessage != "") {
          this.$toast.open({
            message: this.errorMessage,
            type: this.errorType,
            duration: 5000,
          });
        }
      }
      this.processing = false;
    },

    async getConfiguredGoal() {
      await this.getGoal();
      this.dailyTimerId = this.goal.id ? this.goal.id : 0;
      this.duration = !isNaN(Number(this.goal.total_duration_covered))
        ? Number(this.goal.total_duration_covered)
        : 0;
      this.durationRemaining =
        !isNaN(Number(this.goal.duration)) &&
        !isNaN(Number(this.goal.total_duration_covered))
          ? Number(this.goal.duration) -
            Number(this.goal.total_duration_covered)
          : 0;
      let goal =
        Number(this.goal.duration) > 0 ? Number(this.goal.duration) : 0;
      var h = Math.floor(goal / 60);
      var m = goal % 60;

      this.hours = h;
      this.minutes = m;
    },
  },
};
</script>
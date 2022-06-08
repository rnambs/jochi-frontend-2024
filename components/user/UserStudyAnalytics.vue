<template>
  <div class="main-section">
    <!-- Study Page -->

    <section id="study-detail" class="">
      <div class="study-section container-fluid">
        <div class="inner-study p-3 mt-4">
          <div class="study-row">
            <div class="row header-row mb-1">
              <div class="col-md-6 py-2">
                <h4>Weekly Dashboard</h4>
              </div>
              <div class="col-md-6 py-2">
                <h4>Dashboard</h4>
              </div>
            </div>
            <div class="row inner-row text-center mb-2">
              <div class="col-md-3 py-2">
                <div class="inner-col p-2">
                  <h6>Total Minutes</h6>
                  <p class="total-value">
                    {{
                      mySession.total_minutes_week
                        ? mySession.total_minutes_week
                        : 0
                    }}<sup
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
                <div class="inner-col p-2">
                  <h6>Total Session</h6>
                  <p class="total-value">
                    {{
                      mySession.total_sessions_week
                        ? mySession.total_sessions_week
                        : 0
                    }}<sup
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
                <div class="inner-col p-2">
                  <h6>Total Minutes</h6>
                  <p class="total-value">
                    {{ mySession.total_minutes ? mySession.total_minutes : 0 }}
                  </p>
                </div>
              </div>
              <div class="col-md-3 py-2">
                <div class="inner-col p-2">
                  <h6>Total Session</h6>
                  <p class="total-value">
                    {{
                      mySession.total_sessions ? mySession.total_sessions : 0
                    }}
                  </p>
                </div>
              </div>
            </div>
            <div class="row inner-row mb-2">
              <div class="col-md-6 py-2">
                <div
                  class="
                    inner-col
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
                        <span class="chart-text">
                          {{ item.value }}
                        </span>
                      </div>
                    </div>
                    <div id="weeklyContainer" class="chart text-white">
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
            <div class="row inner-row">
              <div class="col-md-12 mb-2">
                <h4 class="txt-pink mb-0">Progress Chart</h4>
              </div>
              <div class="col-md-6 mb-2">
                <div class="inner-col p-2">
                  <canvas id="progress1" width="600" height="380"></canvas>
                </div>
              </div>
              <div class="col-md-6 mb-2">
                <div class="inner-col p-2">
                  <canvas id="progress2" width="600" height="380"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- End Study Page -->
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
    };
  },
  mounted() {
    this.GetMySession();
    // this.InitPieChart();
  },
  computed: {
    ...mapState("userStudyAnalytics", {
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      mySession: (state) => state.mySession,
    }),
  },
  methods: {
    ...mapActions("userStudyAnalytics", {
      getMySession: "getMySession",
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
  },
};
</script>
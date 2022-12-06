<template>
  <div class="content">
    <!-- Animated -->

    <div class="animated fadeIn">
      <div class="card mb-4">
        <div class="card-body">
          <div class="float-right">
            <strong>Filter By</strong>
            <select @change="onChange($event)" class="cursor-pointer">
              <option value="Last Week" selected>Last Week</option>
              <option value="Last Month">Last Month</option>
              <option value="Last Year">Last Year</option>
            </select>
          </div>
        </div>
      </div>
      <!-- Widgets  -->
      <div class="row">
        <div class="col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-1">
                  <i class="pe-7s-users"></i>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count_static">{{
                        dashBoardData.student_count
                      }}</span>
                    </div>
                    <div class="stat-heading">New Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-2">
                  <i class="pe-7s-users"></i>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count_static">{{
                        dashBoardData.teacher_count
                      }}</span>
                    </div>
                    <div class="stat-heading">New Teachers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-3">
                  <i class="pe-7s-culture"></i>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count_static">{{
                        dashBoardData.school_count
                      }}</span>
                    </div>
                    <div class="stat-heading">New Schools</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Widgets -->
      <!--  Traffic  -->
      <div class="row">
        <div class="col-lg-8">
          <div class="card">
            <div class="card-body">
              <h4 class="box-title">User Activity (Past 30 days)</h4>
              <canvas id="userActivity" width="600" height="380"></canvas>
            </div>
            <!-- /.row -->
            <div class="card-body"></div>
          </div>
        </div>
        <!-- /# column -->
        <div class="col-lg-4">
          <div class="card mb-4">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-1">
                  <i class="pe-7s-date"></i>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count_static">{{
                        dashBoardData.appoinments_count
                      }}</span>
                    </div>
                    <div class="stat-heading">Appointments Booked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-2">
                  <i class="pe-7s-notebook"></i>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count_static">{{
                        dashBoardData.session_count
                      }}</span>
                    </div>
                    <div class="stat-heading">Study Sessions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-3">
                  <i class="pe-7s-diamond"></i>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count_static">{{
                        dashBoardData.club_join_count
                      }}</span>
                    </div>
                    <div class="stat-heading">Club Joined</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-4">
                  <i class="pe-7s-note2"></i>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count_static">{{
                        dashBoardData.assignment_count
                      }}</span>
                    </div>
                    <div class="stat-heading">Assignment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-4">
                  <i class="pe-7s-note2"></i>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count_static">{{
                        dashBoardData.sub_task_count
                      }}</span>
                    </div>
                    <div class="stat-heading">Sub Task Count</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-4">
                  <i class="pe-7s-note2"></i>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count_static">{{
                        dashBoardData.completed_sub_task_count
                      }}</span>
                    </div>
                    <div class="stat-heading">Completed Sub Task Count</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /# column -->
      </div>
      <!--  /Traffic -->
      <div class="clearfix"></div>
      <!-- Orders -->
    </div>
    <!-- .animated -->
  </div>
</template>
<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";

export default {
  name: "dashBoard",
  // middleware: "authenticated",
  components: {
    lottie,
  },
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  data() {
    return {
      Email: "",
      submitted: false,
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      isLoggedIn: false,
    };
  },

  mounted() {
    this.GetDashBoard();
  },
  computed: {
    ...mapState("dashBoard", {
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      dashBoardData: (state) => state.dashBoardData,
      usersData: (state) => state.usersData,
      appointmentsData: (state) => state.appointmentsData,
      chartData: (state) => state.chartData,
    }),
  },
  methods: {
    ...mapActions("dashBoard", {
      getDashBoard: "getDashBoard",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async GetDashBoard() {
      await this.getDashBoard({
        filterBy: "Last Week",
      });
      this.InitGraph();
    },
    onChange(event) {
      this.getDashBoard({
        filterBy: event.target.value,
      });
    },

    async InitGraph() {
      var ctx = document.getElementById("userActivity").getContext("2d");

      const colors = {
        green: {
          stroke: "#5eb84d",
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

      const appointments = this.appointmentsData;
      const users = this.usersData;
      const xData = [1, 2, 3, 4, 5];
      const chartData = this.chartData;

      let userData = [];
      let appointmentData = [];
      let dates = [];
      this.chartData.forEach((e) => {
        dates.push(moment(e.currentDate).format("MM/DD/YYYY"));
        userData.push(e.users);
        appointmentData.push(e.appointments);
      });
      dates = dates?.reverse();
      userData = userData?.reverse();
      appointmentData = appointmentData?.reverse();

      console.log("chartData", chartData);

      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Appointments ",
              fill: false,
              pointBackgroundColor: colors.lightBlue.stroke,
              borderColor: colors.lightBlue.stroke,
              pointHighlightStroke: colors.lightBlue.stroke,
              data: appointmentData,
            },
            {
              label: "users",
              fill: false,
              pointBackgroundColor: colors.green.stroke,
              borderColor: colors.green.stroke,
              pointHighlightStroke: colors.green.stroke,
              data: userData,
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
        },
      });
    },
  },
};
</script>
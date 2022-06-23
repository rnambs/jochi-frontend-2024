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
      <div class="jochi-components-light-bg p-4 custom-margin-for-main-section custom-full-height">
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
                  class="col-md-3 mb-4 p-4"
                  v-for="(list, index) in slot_date"
                  :key="index"
                >
                  <div class="meeting-list p-3">
                    <h6>Meeting with {{ list["title"] }}</h6>
                    <p class="date">{{ list["dateFormat"] }}</p>
                    <p class="time">
                      {{ list["from"] }} to {{ list["end"] }}
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
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Multiselect from "vue-multiselect";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
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
      slot_date: [],
      all_data: [],
      filterValue: "",
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
    };
  },
  mounted() {
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
  },
  methods: {
    ...mapActions("viewAllMeeting", {
      listAllMeeting: "listAllMeeting",
      getAll: "getAll",
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
        var meetingType = element.meeting_type;
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
        Scheduleobj["type"] = meetingType;
        Scheduleobj["title"] = title;
        Scheduleobj["dateFormat"] = dateFormat;
        Scheduleobj["from"] = from;
        Scheduleobj["end"] = end;
        this.slot_date.push(Scheduleobj);
        Allarray.push(Scheduleobj);
        if (meetingType == "Teacher") {
          Teacherarray.push(Scheduleobj);
        } else if (meetingType == "Peer") {
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
  },
};
</script>


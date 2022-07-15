<template>
  <div class="main-section">
    <!-- Study Page -->
    <!-- session  -->
    <div class="jochi-components-light-bg p-4 custom-margin-for-main-section custom-full-height d-flex hidden-scroll">
      
      <div class="study-section d-flex flex-column flex-fill">
        <div class="row h-100">
          <div class="col-lg-7 d-flex flex-column">
              <div class="row card card-primary rounded-22 m-0 mb-4 p-4 flex-row">
                  <div class="col-7">
                      <h2 class="color-primary font-semi-bold mb-1">Complete An Assignment</h2>
                      <p class="mb-0 color-dark font-semi-bold text-16">
                        Tackle  your upcoming assignments
                      </p>
                  </div>
                  <div class="col-5 d-flex justify-content-end">
                      <img src="../../static/image/folder.png" alt="" class="card-img">
                  </div>
              </div>
              <div class="row card card-primary rounded-22 p-4 m-0 flex-row">
                  <div class="col-7">
                      <h2 class="color-primary font-semi-bold mb-1">Start a new Study Session</h2>
                      <p class="mb-0 color-dark font-semi-bold text-16">
                        Stay focused while you study, and monitor your productivity
                      </p>
                  </div>
                  <div class="col-5 d-flex justify-content-end">
                      <img src="../../static/image/lamp.png" alt="" class="card-img">
                  </div>
              </div>
          </div>
          <div class="col-lg-5 h-100">
              <div class="card card-primary rounded-22 p-4 h-100 hidden-scroll">
                <!-- default -->
                  <!-- <div class="d-flex justify-content-between flex-column h-100">
                      <div class="head-section">
                          <h2 class="color-primary font-semi-bold mb-1">Enhance your studying with research-backed technqiues</h2>
                          <button class="btn btn-dark my-2">Swipe to Learn More</button>
                      </div>
                      <div class="img-section">
                          <img src="../../static/image/student_img.png" alt="" class="img-fluid">
                      </div>
                  </div> -->
                  <!-- end -->
                  <!-- listing -->
                  <div class="d-flex flex-column h-100">
                    <div class="d-flex card card-primary p-3 d-flex flex-column mb-3">
                      <h6 class="color-dark font-semi-bold mb-1">Title </h6>
                      <p class="mb-0 color-secondary font-normal text-14"><span>02 Jan 2022 </span> <span>|</span><span>02:03 pm</span></p>
                    </div>
                    <div class="d-flex card card-primary p-3 d-flex flex-column mb-3">
                      <h6 class="color-dark font-semi-bold mb-1">Title </h6>
                      <p class="mb-0 color-secondary font-normal text-14"><span>02 Jan 2022 </span> <span>|</span><span>02:03 pm</span></p>
                    </div>
                    <div class="d-flex card card-primary p-3 d-flex flex-column mb-3">
                      <h6 class="color-dark font-semi-bold mb-1">Title </h6>
                      <p class="mb-0 color-secondary font-normal text-14"><span>02 Jan 2022 </span> <span>|</span><span>02:03 pm</span></p>
                    </div>
                    
                  </div>
                  <!-- end -->
              </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end session -->

    <!-- step two configure -->
    <div class="jochi-components-light-bg p-4 custom-margin-for-main-section custom-full-height d-flex flex-column hidden-scroll">
      <h2 class="color-primary font-semi-bold mb-3">Step Two: <br> Configure your Session</h2>
      <div class="row">
        <div class="col-lg-5">
          <div class="card card-primary rounded-22 h-100 p-4">
            <h3 class="color-dark font-semi-bold">Goals</h3>
            <p class="mb-0 d-flex flex-column">
              <span class="color-primary text-24 font-bold">Studied Today</span>
              <span class="color-dark text-16 font-semi-bold">145 Minutes</span>
              <span class="color-secondary text-14 font-normal">102 Minutes Left</span>
            </p>
          </div>
        </div>
        <div class="col-lg-7 d-flex flex-column">
          <div class="card card-primary rounded-22 p-4 mb-4">
            <h3 class="color-dark font-semi-bold">Duration</h3>
            <div class="d-flex align-items-center py-3">
              <img src="../../static/image/alarm.png" alt="" class="img-fluid mr-3 card-img">
              <p class="mb-0 d-flex flex-column">
                <span class="color-primary text-24 font-bold">Studied Today</span>
                <span class="color-dark text-16 font-semi-bold">145 Minutes</span>
                <span class="color-secondary text-14 font-normal">102 Minutes Left</span>
              </p>
            </div>
          </div>
          <div class="card card-primary rounded-22 h-40 flex-fill p-4">
            <h3 class="color-dark font-semi-bold">Invite Peers</h3>
            <div class="d-flex flex-row align-items-center">
              <div class="form-row mb-2 mx-0 mr-2">
                <label class="form-label" for="name">Invite peers</label>
                <input type="text" class="form-control">
              </div>
              <div class="pt-4">
                <button class="btn btn-primary btn-sm">Submit</button>
              </div>
            </div>
            <div class="hidden-scroll p-3 row my-0 max-height-100">
              <div class="d-flex align-items-center my-2 mr-2">
                <div class="ld-img-section mr-3">
                  <div class="ld-img-holder"></div>
                </div>
                <div class="ld-details-section">
                  <p class="ld-heading mb-1">
                    Mark Jones, President
                  </p>
                  <p class="ld-details mb-0">
                    markjones@school.edu
                  </p>
                </div>
              </div>
              <div class="d-flex align-items-center my-2 mr-2">
                <div class="ld-img-section mr-3">
                  <div class="ld-img-holder"></div>
                </div>
                <div class="ld-details-section">
                  <p class="ld-heading mb-1">
                    Mark Jones, President
                  </p>
                  <p class="ld-details mb-0">
                    markjones@school.edu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end step two configure -->
    <section id="study-detail" class="">
      <div class="study-section container-fluid">
        <h3 class="color-primary text-18 mb-2 mt-4">Study Room</h3>
        <div class="inner-study p-3">
          <!-- Study Room -->
          <div
            class="
              study-row
              room-form
              d-flex
              flex-column
              w-100
              align-items-center
              justify-content-center
            "
            v-if="!addedStudyTime && timerStatus == 0"
          >
            <div class="d-flex flex-column w-100">
              <div class="study-col d-flex flex-column justify-content-center">
                <!-- <img
                  src="~/assets/images/undraw/studying.png"
                  alt=""
                  class="container study-image"
                /> -->
              </div>
              <div class="study-col d-flex flex-column justify-content-center col-8 mx-auto py-0">
                <div class="form-section study-room-form py-0 mx-5">
                  <form
                    @submit.prevent="StartStudySession"
                    ref="studyTimeForm"
                    class="container"
                  >
                    <div class="form-group required">
                      <!-- {{subjectsData}} -->
                      <label class="typo__label">Subject</label>
                      <select
                        @change="UpdateSubject()"
                        class="form-control"
                        tabindex=""
                        v-model="Subject"
                        :class="{
                          'is-invalid': submitted && $v.Subject.$error,
                        }"
                      >
                        <option value="">Select Subject</option>
                        <option
                          v-bind:value="{
                            id: subjects.id,
                            text: subjects.subject_name,
                          }"
                          v-for="(subjects, index) in subjectsData"
                          :key="index"
                        >
                          {{ subjects.subject_name }}
                        </option>
                        <option v-if="subjectsData.length == 0">No data</option>
                      </select>
                      <div
                        v-if="submitted && $v.Subject.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.Subject.required"
                          >This field is required</span
                        >
                      </div>
                    </div>
                    <div class="form-group required">
                      <label class="typo__label">Study Technique</label>
                      <select
                        @change="UpdateStudyTechnique()"
                        class="form-control"
                        tabindex=""
                        v-model="studyTypes"
                        :class="{
                          'is-invalid': submitted && $v.studyTypes.$error,
                        }"
                      >
                        <option value="">Select Study Technique</option>

                        <option
                          v-for="(studyTypes, index) in studyTypesData"
                          :key="index"
                          v-bind:value="{
                            id: studyTypes.id,
                            text: studyTypes.type,
                            startTime: studyTypes.start_time,
                            breakTime: studyTypes.break_time,
                            cycle: studyTypes.cycle,
                            long_break: studyTypes.long_break,
                          }"
                        >
                          {{ studyTypes.type }}
                        </option>
                        <option v-if="studyTypesData.length == 0">
                          No data
                        </option>
                      </select>
                      <div
                        v-if="submitted && $v.studyTypes.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.studyTypes.required"
                          >This field is required</span
                        >
                      </div>
                    </div>
                    <div class="form-group" v-if="this.studyTypes.id != 3">
                      <label for="">Number of repetitions</label>

                      <select
                        @change="UpdateSubject()"
                        class="form-control"
                        tabindex=""
                        v-model="repetitionCount"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>

                    <div class="form-group" v-show="this.studyTypes.id == 3">
                      <label for="">Duration (In Minutes)</label>
                      <input
                        type="number"
                        id="targetDuration"
                        v-model="targetDuration"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group" v-show="this.studyTypes.id == 3">
                      <label for="">Break Time At (In Minutes)</label>
                      <input
                        type="number"
                        id="breakAt"
                        v-model="breakAt"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group" v-show="this.studyTypes.id == 3">
                      <label for="">Break Time (In Minutes)</label>
                      <input
                        type="number"
                        id="breakTime"
                        v-model="breakTime"
                        class="form-control"
                      />
                    </div>
                    <button
                      type="submit"
                      class="
                        btn btn-color
                        mb-2
                        pl-3
                        pr-3
                        d-flex
                        justify-conetent-center
                      "
                    >
                      Start Session
                    </button>
                  </form>
                </div>
              </div>
              <div class="discription-area py-3 px-5" v-if="studyTypes.id == 1">
                <p class="discription-text mb-1 text-center color-dark text-14">
                  25-minute chunks separated by five-minute breaks. After about
                  four pomodoros, you take a longer break of about 15 minutes
                  <span>
                    <a
                      href="https://www.jochi.info/post/what-is-the-pomodoro-technique"
                      target="_blank"
                      >(Read more...)</a
                    >
                  </span>
                </p>
              </div>
              <div class="discription-area py-3 px-5" v-if="studyTypes.id == 2">
                <p class="discription-text mb-1 text-center color-dark text-14">
                  The 52/17 Rule is a time management method that recommends 52
                  minutes of focused working alternated by 17 minutes of
                  complete resting and recharging
                  <span>
                    <a
                      href="https://www.jochi.info/post/what-is-the-52-17-study-method"
                      target="_blank"
                      >(Read more...)</a
                    >
                  </span>
                </p>
              </div>
            </div>
          </div>
          <!-- Study Room End -->
          <!-- Timer -->
          <form
            @submit.prevent="AddStudyTime('STOP')"
            v-if="!addedStudyTime && timerStatus == 1"
          >
            <div class="row study-row">
              <div class="col-md-6 study-col d-flex flex-column justify-content-center">
                <div class="m-5">
                  <div class="study-heading mb-2"><h1>Working on</h1></div>
                  <p class="subject-name mb-1">
                    {{ timerStatusData.subjectName }}
                  </p>
                  <p class="subject-name mb-1">{{ SubjectName }}</p>
                  <p
                    class="subject-name subject-time mb-1"
                    v-if="studyTypes.id != 3"
                  >
                    Remaining Cycles :
                    {{ this.totalCycles - this.currentCycle }}
                  </p>
                  <p
                    class="subject-name subject-time mb-1"
                    v-if="studyTypes.id != 3"
                  >
                    Remaining Repetitions :
                    {{ this.repetitionCount - this.currentRepetitionNum }}
                  </p>
                  <!-- <input type="text" v-model="remainingTime" id="remainingTime"> -->
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    class="btn btn-color mb-2 mt-2 pl-3 pr-3"
                  >
                    End Session
                  </button>
                </div>
              </div>

              <div class="col-md-6 study-col d-flex flex-column justify-content-center">
                <div>
                  <div id="app" class="mb-3">
                    <div class="base-timer m-auto">
                      <svg
                        class="base-timer__svg"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g class="base-timer__circle">
                          <circle
                            class="base-timer__path-elapsed"
                            cx="50"
                            cy="50"
                            r="45"
                          ></circle>
                          <path
                            id="base-timer-path-remaining"
                            stroke-dasharray="283"
                            class="base-timer__path-remaining arc"
                            d="
                                    M 50, 50
                                    m -45, 0
                                    a 45,45 0 1,0 90,0
                                    a 45,45 0 1,0 -90,0
                                    "
                          ></path>
                        </g>
                      </svg>
                      <div class="inner-timer">
                        <span id="base-timer-label" class="base-timer__label">{{
                          timerDurationDisplay
                        }}</span>
                        <span class="color-dark base-timer-text">{{
                          studyStatus == "break" ? "BREAK" : ""
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="
                      btn-area
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                  >
                    <!-- && !studyTimePaused -->
                    <button
                      v-show="this.studyTypes.id == 3 && studyStatus != 'break'"
                      @click.prevent="
                        showResume ? onResumeSession() : onPauseSession()
                      "
                      class="btn btn-color mb-2 mt-2 pl-3 pr-3"
                      id="pause-button"
                    >
                      <i class="fa fa-pause"></i>
                      {{ showResume ? "Resume" : "Pause" }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <!-- Timer End -->
          <!-- Rating Section -->
          <div v-show="addedStudyTime" class="container study-row">
            <div class="header-row containStarRating er">
              <div class="col-md-12 py-3">
                <h4>Rate your session</h4>
                <!-- <button type="button" @click.prevent="onBackClick()" class="btn btn-color mb-3 mt-2 pl-3 pr-3 text-right">Back</button> -->
              </div>
            </div>
            <div class="inner-row mt-0 container">
              <div class="inner-col px-5 py-4 d-flex flex-column">
                <div class="mb-3 col-5 mx-0 mx-md-auto">
                  <div class="d-flex justify-content-between">
                    <h6 class="py-2 color-dark font-semi-bold">Focus</h6>
                  </div>
                  <div class="d-flex justify-content-between">
                    <star-rating
                      class="mb-2"
                      v-model="focusRating"
                      inactive-color="#2b2b2b"
                      active-color="#F49196"
                      border-color="#F49196"
                      v-bind:border-width="4"
                      v-bind:star-size="21"
                      v-bind:padding="1"
                      v-bind:animate="true"
                      v-bind:rounded-corners="true"
                      v-bind:max-rating="5"
                    ></star-rating>
                    <p class="total-value px-4">
                      {{ focusRating }}<sub>/5</sub>
                    </p>
                  </div>
                </div>
                <div class="mb-3 col-5 mx-0 mx-md-auto">
                  <div class="d-flex justify-content-between">
                    <h6 class="py-2">Efficiency</h6>
                  </div>

                  <div class="d-flex justify-content-between">
                    <star-rating
                      class="mb-2"
                      v-model="focusEfficiency"
                      inactive-color="#2b2b2b"
                      active-color="#F49196"
                      border-color="#F49196"
                      v-bind:border-width="4"
                      v-bind:star-size="21"
                      v-bind:padding="1"
                      v-bind:animate="true"
                      v-bind:rounded-corners="true"
                      v-bind:max-rating="5"
                    ></star-rating>
                    <p class="total-value px-4">
                      {{ focusEfficiency }}<sub>/5</sub>
                    </p>
                  </div>
                </div>
                <div class="mb-3 col-5 mx-0 mx-md-auto">
                  <div class="d-flex justify-content-between">
                    <h6 class="py-2">Work Completed</h6>
                  </div>

                  <div class="d-flex justify-content-between">
                    <star-rating
                      class="mb-2"
                      v-model="focusWorkComplete"
                      inactive-color="#2b2b2b"
                      active-color="#F49196"
                      border-color="#F49196"
                      v-bind:border-width="4"
                      v-bind:star-size="21"
                      v-bind:padding="1"
                      v-bind:animate="true"
                      v-bind:rounded-corners="true"
                      v-bind:max-rating="5"
                    ></star-rating>
                    <p class="total-value px-4">
                      {{ focusWorkComplete }}<sub>/5</sub>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row button-row container">
              <div class="col-md-12 text-center py-3">
                <button
                  type="button"
                  @click.prevent="onLogSession()"
                  class="btn btn-color mb-3 mt-2 pl-3 pr-3"
                >
                  Log Session
                </button>
              </div>
            </div>
          </div>
          <!-- Rating Section End -->
        </div>
      </div>
    </section>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">End Session</h5>
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
            <p>
              If you exit timer, remaining time will not be recorded and the
              session will be lost. Are you sure you want to exit?
            </p>
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
              @click="onEndSession()"
              :disabled="processing"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="help-text d-none">
      <p>#1 Pomodoro Technique</p>
      <p>
        25-minute chunks separated by five-minute breaks. After about four
        pomodoros, you take a longer break of about 15 minutes (Read more...)
      </p>

      <p>#2 52/17</p>
      <p>
        The 52/17 Rule is a time management method that recommends 52 minutes of
        focused working alternated by 17 minutes of complete resting and
        recharging (Read more...)
      </p>
    </div>
  </div>

  <!-- End Study Page -->
</template>

<script>
import { required, requiredIf } from "vuelidate/lib/validators";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
// import Multiselect from 'vue-multiselect'
import { mapState, mapActions } from "vuex";
export default {
  name: "ClubEditForm",
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
      Subject: "",
      SubjectName: "",
      studyTypes: "",
      CustomMode: "",
      repeatLoopBy: 1,
      targetDuration: 10,
      breakTime: 2,
      Timersession_id: 0,
      Timertotal_time: 0,
      Timerrepeat: 1,
      min: 0,
      breakAt: 0,
      breakAtMinutes: 0,
      customBreakStarted: false,
      status: "",
      remainingTime: 0, //to calcualte current time
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      submitted: false,
      processing: false,
      timeCompleted: 0,
      timerStatus: 0, // Not started = 0 , started =1
      timerDurationDisplay: 0,
      timerBreakDurationDisplay: 0,
      repetitionCount: 1,
      totalCycles: 0,
      limitedInterval: 0,
      studyStatus: "",
      totalStudyTime: 0,
      studyTimeStart: 0,
      studyTimePaused: false,
      showResume: false,
      addedStudyTime: false,
      focusRating: 0,
      focusEfficiency: 0,
      focusWorkComplete: 0,
      boundRating: 3,
      currentCycle: 0,
      currentRepetitionNum: 0,
      startTime: new Date().getTime(),
    };
  },

  mounted() {
    this.GetSubjectList();
    this.GetStudyTypes();
  },
  validations: {
    Subject: { required },
    studyTypes: { required },
  },
  computed: {
    ...mapState("studyRoom", {
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      subjectsData: (state) => state.subjectsData,
      studyTypesData: (state) => state.studyTypesData,
      timerStatusData: (state) => state.timerStatusData,
    }),
  },
  methods: {
    ...mapActions("studyRoom", {
      getStatusTimer: "getStatusTimer",
      startStudySession: "startStudySession",
      getSubjectsList: "getSubjectsList",
      getStudyTypes: "getStudyTypes",
      addStudyTime: "addStudyTime",
      addRating: "addRating",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    nameWithLang({ name, language }) {
      return `${name} — [${language}]`;
    },

    async GetStatusTimer() {
      await this.getStatusTimer({});
    },
    async GetSubjectList() {
      await this.getSubjectsList({});
    },
    async GetStudyTypes() {
      await this.getStudyTypes({});
    },
    async UpdateStudyTechnique() {
      this.CustomMode = "active";
      if (this.studyTypes.id != 3) {
        this.targetDuration = this.studyTypes.startTime;
        this.breakTime = this.studyTypes.breakTime;
        this.repeatLoopBy = this.studyTypes.cycle;
      } else {
        this.targetDuration = 5;
        this.breakTime = 2;
        this.breakAt = 2;
      }
    },
    async UpdateSubject() {
      this.SubjectName = this.Subject.subject_name;
    },
    async resetTime() {
      this.totalStudyTime = 0;
      this.studyStatus = "";
      clearInterval(this.limitedInterval);
    },
    async Timer() {
      // await this.clearInterval(this.limitedInterval);
      this.GetStatusTimer();
      this.timerStatus = 1;
      this.timerBreakDurationDisplay = this.breakTime * 60;
      this.totalCycles = this.repeatLoopBy;
      this.customBreakStarted = false;
      this.breakAtMinutes = this.breakAt * 60;
      console.log("timer started");
      if (this.studyTypes.id == 3) {
        this.timeCompleted = 0;
      }

      var repbreakTime =
        this.studyTypes.long_break && this.studyTypes.long_break > 0
          ? this.studyTypes.long_break
          : this.studyTypes.breakTime;

      if (this.studyTypes.id != 3) {
        for (let i = 0; i < Number(this.repetitionCount); i++) {
          this.currentRepetitionNum = 1 + i;
          this.studyStatus = "";
          if (i != 0 && (this.studyTypes.id == 1 || this.studyTypes.id == 2)) {
            this.studyStatus = "break";
            await this.runTimer(repbreakTime * 60);
          }
          for (let j = 0; j < this.totalCycles; j++) {
            this.currentCycle = 1 + j;
            this.studyStatus = "study";
            await this.runTimer(this.targetDuration * 60);

            if (j != this.totalCycles - 1) {
              this.studyStatus = "break";
              await this.runTimer(this.breakTime * 60);
            } else if (
              j == this.totalCycles - 1 &&
              i == Number(this.repetitionCount) - 1
            ) {
              this.AddStudyTime("STOP");
            }
          }
        }
      } else {
        if (this.targetDuration > 0 && this.breakAt > 0 && this.breakTime > 0) {
          this.studyStatus = "study";
          await this.runTimer(this.targetDuration * 60);
        } else {
        }
      }
    },
    async runTimer(targetDuration, isPending = false) {
      await setTimeout(function () {
        console.log("timer is starting");
      }, 1000);

      let timer = await document.querySelector("#base-timer-path-remaining");

      let percentage = 0;
      var minutes = 0;
      var seconds = 0;
      if (this.studyTypes.id == 3) {
        this.timeCompleted = this.timeCompleted > 0 ? this.timeCompleted : 0;
      }
      // var startTime;
      var running = false;
      return new Promise((resolve, reject) => {
        if (!running) {
          this.limitedInterval = 0;
          // timer.setAttribute("stroke-dasharray", 283);
          timer.setAttribute("transition", "stroke-dasharray 0.1s");
          this.startTime = new Date().getTime();
          this.studyTimeStart = new Date().getTime();
          running = true;

          minutes = targetDuration / 60;

          this.limitedInterval = setInterval(() => {
            if (!this.studyTimePaused) {
              if (this.studyStatus == "study") {
                this.timeCompleted++;
              }
              var currentTime = new Date().getTime();
              //Time to work. Fill the circle.
              if (percentage < 283) {
                percentage +=
                  ((currentTime - this.startTime) / 1000 / targetDuration) *
                  283;
                this.timerDurationDisplay = countDown(
                  (currentTime - this.startTime) / 1000
                );
                this.startTime = currentTime;
                timer?.setAttributeNS(
                  null,
                  "stroke-dasharray",
                  283 - percentage + " 283"
                );
              }

              if (
                this.studyStatus == "study" &&
                this.studyTypes.id == 3 &&
                this.timeCompleted == this.breakAtMinutes &&
                !this.customBreakStarted
              ) {
                this.runIntervalCustom();

                return resolve(percentage);
              }

              if (283 - percentage <= 0) {
                if (this.studyStatus == "study") {
                  var presentTime = new Date().getTime();
                  this.totalStudyTime +=
                    (presentTime - this.studyTimeStart) / 1000;
                }
                clearInterval(this.limitedInterval);
                console.log(this.studyStatus + "interval cleared!");
                if (isPending) {
                  this.AddStudyTime("STOP");
                }
                resolve(percentage);
              }
            }
          }, 1000);
        }
      });

      function countDown(num) {
        seconds -= num;
        //roll over to the next minute
        if (seconds <= 0) {
          seconds = 59.9;
          minutes -= 1;
        }
        //prevent minutes from displaying -1
        if (minutes < 0) {
          minutes = 0;
        }
        return minutes + ":" + ("0" + Math.floor(seconds)).slice(-2);
      }
    },

    async StartStudySession() {
      this.submitted = true;
      // this.timerStatus = 1;
      if (this.studyTypes.id == 3) {
        if (!this.targetDuration || !this.breakTime) {
          return this.$toast.open({
            message: "Durartion and Breaktime is required",
            type: this.errorType,
            duration: 5000,
          });
        }
        if (this.targetDuration < 0 || this.breakTime < 0) {
          return this.$toast.open({
            message: "Durartion and Breaktime must be greater than zero",
            type: this.errorType,
            duration: 5000,
          });
        }

        if (this.breakTime < 2) {
          return this.$toast.open({
            message: "Breaktime must be greater than or equeal to 2 minutes",
            type: this.errorType,
            duration: 5000,
          });
        }
        if (this.breakAt < 2) {
          return this.$toast.open({
            message: "Break Time At must be greater than or equal to 2 minutes",
            type: this.errorType,
            duration: 5000,
          });
        }

        if (this.targetDuration < 5) {
          return this.$toast.open({
            message: "Duration must be greater than or equal to 5 minutes",
            type: this.errorType,
            duration: 5000,
          });
        }

        if (this.breakAt < 2 || this.breakAt >= this.targetDuration) {
          return this.$toast.open({
            message: "Break At Time must be lesser than Study duration",
            type: this.errorType,
            duration: 5000,
          });
        }
      }

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.processing = true;

        await this.startStudySession({
          subject: this.Subject.id,
          targetDuration: this.targetDuration,
          type: this.studyTypes.id,
          repeat: this.repeatLoopBy,
        });
        if (this.successMessage != "") {
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
          // this.$router.push("/club-list-table");
          if (this.limitedInterval > 0)
            await this.clearInterval(this.limitedInterval);
          this.Timer();
        } else if (this.errorMessage != "") {
          this.$toast.open({
            message: this.errorMessage,
            type: this.errorType,
            duration: 5000,
          });
        }
        this.processing = false;
      }
    },
    async AddStudyTime(studyStatus) {
      this.submitted = true;
      if (studyStatus == "STOP") {
        this.addedStudyTime = true;
      }
      let totalTimeStudied = Math.floor(this.totalStudyTime / 60);
      this.Timersession_id = this.timerStatusData.session_id;
      this.Timertotal_time = Math.floor(this.totalStudyTime / 60);
      this.Timerrepeat = this.timerStatusData.repeat;

      // targetDuration // live time data
      await this.addStudyTime({
        sessionId: this.Timersession_id,
        min: totalTimeStudied,
        status: studyStatus,
      });
      if (this.successMessage != "") {
        if (studyStatus != "PAUSE") {
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
        }
        this.totalStudyTime = 0;
        if (
          this.studyTypes.id == 3 &&
          studyStatus == "PAUSE" &&
          this.customBreakStarted
        ) {
          this.runCustomTimerRemaining(totalTimeStudied);
        }
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
    },
    async runCustomTimerRemaining(totalTimeStudied) {
      this.studyStatus = "break";
      await this.runTimer(this.breakTime * 60);
      this.targetDuration = this.targetDuration - totalTimeStudied;
      this.studyStatus = "study";
      await this.runTimer(this.targetDuration * 60, true);
    },
    async onEndSession() {
      if (this.studyStatus == "study") {
        var presentTime = new Date().getTime();
        this.totalStudyTime = (presentTime - this.studyTimeStart) / 1000;
      }

      this.AddStudyTime("STOP");
    },
    async onPauseSession() {
      if (this.studyTypes.id == 3) {
        this.studyTimePaused = true;
        var presentTime = new Date().getTime();
        this.totalStudyTime = (presentTime - this.studyTimeStart) / 1000;
        this.showResume = true;
      }
    },
    async onResumeSession() {
      if (this.studyTypes.id == 3) {
        (this.startTime = new Date().getTime()), (this.studyTimePaused = false);
        this.studyTimeStart = new Date().getTime();
        this.showResume = false;
        this.studyStatus = "study";
      }
    },

    async onBackClick() {
      clearInterval(this.limitedInterval);
      this.submitted = false;
      this.addedStudyTime = false;
      this.timerStatus = 0;
      this.Subject = "";
      this.studyTypes = "";
      this.repetitionCount = "1";
      this.targetDuration = 0;
      this.breakTime = 0;
      this.$refs.studyTimeForm.reset();
    },
    async onLogSession() {
      await this.addRating({
        session_id: this.Timersession_id,
        focus: this.focusRating,
        efficiency: this.focusEfficiency,
        workCompletes: this.focusWorkComplete,
      });
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.onBackClick();
        (this.focusRating = 0),
          (this.focusEfficiency = 0),
          (this.focusWorkComplete = 0);
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
    },
    async runIntervalCustom() {
      this.customBreakStarted = true;
      var presentTime = new Date().getTime();
      this.totalStudyTime += (presentTime - this.studyTimeStart) / 1000;
      clearInterval(this.limitedInterval);
      console.log(this.studyStatus + "custom interval cleared!");
      this.AddStudyTime("PAUSE");
    },
  },
  beforeDestroy() {},
  destroyed() {},
};
</script>



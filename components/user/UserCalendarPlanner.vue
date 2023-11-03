<template>
  <div>
      <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
      />
        <div :class="!accordionOpened ? 'main-section' : 'main-section opened'">
            <section id="calendarPlanner" class="">
                <div class="m--12 custom-full-height d-flex planner-day-responsive">
                    <div class="d-flex flex-column flex-fill w-100 position-relative">
                        <div class="row position-sticky z-index-1 bg-global top-0">
                            <div class="col-12 pb-1">
                                <div class="d-flex align-items-center">
                                    <h2 class="heading2 font-semi-bold color-primary-dark mb-2">Calendar</h2>
                                    <div class="d-flex d-lg-none align-items-center mb-2 ml-2">
                                        <p class="mb-0 font-bold text-18 color-secondary-dark mx-1">{{ monthText }}</p>
                                    </div>
                                </div>
                                <div class="d-flex flex-wrap align-items-center justify-content-between">
                                    <div class="d-flex flex-wrap px-1 flex-fill">
                                        <div data-intro="Filter calendar" class="dropdown form-row d-inline-flex w-auto mr-2 mb-2">
                                            <div class="dropdown-select form-control form-sm form-transparent"
                                                type="button" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i class="i-filter-funnel j-icon i-sm bg-gray mr-1"></i>
                                                <span id="dLabel" class="mr-3">{{ filterText }}</span>
                                                <span class="caret"><i
                                                        class="fas fa-chevron-down font-medium"></i></span>
                                            </div>
                                            <ul class="dropdown-menu w-100 rounded-12 p-2" aria-labelledby="dLabel">
                                                <li @click="GetWeeklyPlanner()" :class="{ 'active': filterType === 'All' }" class="item p-2">All</li>
                                                <li @click="updateFilter('Assignments')" :class="{ 'active': filterType === 'Assignments' }" class="item p-2">Assignments</li>
                                                <li @click="updateFilter('Meetings')" :class="{ 'active': filterType === 'Meetings' }" class="item p-2">Meetings</li>
                                                <li @click="updateFilter('Session')" :class="{ 'active': filterType === 'Session' }" class="item p-2">Study Sessions</li>
                                            </ul>
                                        </div>
                                        <div class="border border--form rounded-8 d-flex align-items-center mb-2">
                                            <button @click="goToPreviousWeek()" class="btn btn-void border-0 p-2 mx-1">
                                                <span class="d-flex">
                                                    <i class="i-arrow-left j-icon i-xs bg-text-secondary"></i>
                                                </span>  
                                            </button>
                                            <p class="mb-0 font-medium color-secondary-dark mx-1">{{ weekNumberText }}</p>
                                            <button @click="goToNextWeek()" class="btn btn-void border-0 p-2 mx-1">
                                                <span class="d-flex">
                                                    <i class="i-arrow-right j-icon i-xs bg-text-secondary"></i>
                                                </span>  
                                            </button>
                                        </div>
                                        <div class="d-none d-lg-flex align-items-center mb-2 justify-content-center flex-fill">
                                            <p class="mb-0 font-bold text-18 color-primary-dark mx-1">{{ monthText }}</p>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-wrap">
                                       <!-- This code is commented because it may be used in the future -->
                                        <!-- <button class="btn btn-primary mr-2 mb-2">
                                            <span class="d-flex mr-1">
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.22974 6.62916V1.60059H7.90593V6.62916H12.9345V8.30535H7.90593V13.3339H6.22974V8.30535H1.20117V6.62916H6.22974Z" fill="white"/>
                                                </svg>
                                            </span>                                            
                                            <span>Add task</span>
                                        </button> -->
                                        <button @click="toggleWeekends" class="btn btn-void mb-2">                                          
                                            <span>{{ showWeekends ? 'Hide Weekends' : 'Show Weekends' }}</span>
                                            <span class="d-flex ms-1">
                                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.13281 14.8L11.5328 8.4L5.13281 2" stroke="#EAEAEA" stroke-width="2.13333" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>                                                    
                                            </span>  
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row h-100">
                            <div v-for="(day, index) in days" :key="index" class="col-12 col-sm-6 col-md-4 col-lg px-0 pt-0">
                                <div class="card border-0 rounded-12 w-100 h-100">
                                      <div class="calendar-head d-flex align-items-center my-3 p-2 pl-3 mx--12" :class="{ 'calendar-head--active': isToday(day.date) }">
                                        <p class="mb-0 color-dark font-bold text-14">{{ day.name }} {{ day.dateNumber }}</p>
                                      </div>
                                    <div class="d-flex flex-column w-100 h-100 border-right px--12 calendar-container">
                                      <div v-if="filteredEvents(day.date , 'Morning').length == 0 && filteredEvents(day.date , 'Afternoon').length == 0 && filteredEvents(day.date , 'Evening').length == 0">
                                        <p>No events for the day</p>
                                      </div>
                                        <div v-if="filteredEvents(day.date , 'Morning').length > 0"  class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-half-sun j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Morning</p>
                                        </div>
                                        <div v-for="(item, index) in filteredEvents(day.date , 'Morning')" :key="item.id">
                                        <div @click="handleAssignmentClick(item)"
                                          v-if="item.groupId == 'assignment' || item.groupId == 'shared-assignment'"
                                          class="card card-secondary rounded-4 mb-3 p-2 cursor-pointer">
                                            <div class="d-flex align-items-start mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-list-check j-icon i-xs bg-white"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">{{ item.title }}</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>{{ item.time }}</span></p>
                                            <div class="d-flex justify-content-end">
                                                <p class="color-secondary text-12 mb-0"><span>Due: </span><span> {{ item.date }}</span></p>
                                            </div>
                                        </div>
                                        <div @click="handleStudyCardClick(item)"
                                          v-if="item.groupId == 'study'"
                                          class="card card-secondary rounded-4 mb-3 p-2 cursor-pointer">
                                            <div class="d-flex align-items-center">
                                                <i class="i-note-book j-icon i-xl bg-text-secondary mr-2"></i>
                                                <div class="d-flex flex-column">
                                                    <p class="color-secondary text-12 mb-1">{{ item.title }}</p>
                                                    <p class="color-secondary text-12 mb-1"><span>Due: </span><span> {{ item.timeValNum }}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div @click="handleMeetingClick(item)"
                                          v-if="item.groupId == 'peer-meeting' || item.groupId == 'teacher-meeting'"
                                          class="card card-transparent border-0 rounded-4 mb-3 py-2 cursor-pointer">
                                            <div class="d-flex align-items-start mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-chat-group j-icon i-xs bg-white"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Meeting with {{ item.title }}</p>
                                            </div>
                                            <p class="color-primary-light text-12 mb-1 ml-4 pl-1"><span>{{ item.startTime }} </span> > <span> {{ item.endTime }}</span></p>
                                        </div>
                                        <div @click="handleClubMeetingClick(item)"
                                          v-if="item.groupId == 'club-meeting'"
                                          class="card card-secondary rounded-4 mb-3 p-2 cursor-pointer">
                                            <div class="d-flex align-items-center">
                                              <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                <i class="i-club-meeting j-icon i-xs bg-white"></i>
                                              </span>
                                              <p class="mb-0 text-14 font-medium color-primary-light">{{ item.title }}</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>  </span><span> {{ item.time }}</span></p>
                                        </div>
                                        <div @click="handleTrainingsClick(item)"
                                          v-if="item.groupId == 'trainings'"
                                          class="card card-transparent border-0 rounded-4 mb-3 py-2 cursor-pointer">
                                            <div class="d-flex align-items-start mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-team-match-training j-icon i-xs bg-white"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light"> {{ item.title }}</p>
                                            </div>
                                            <p class="color-primary-light text-12 mb-1 ml-4 pl-1"><span> {{ item.time }}</span></p>
                                        </div>
                                        <div @click="handleMatchesClick(item)"
                                          v-if="item.groupId == 'matches'"
                                          class="card card-transparent border-0 rounded-4 mb-3 py-2 cursor-pointer">
                                            <div class="d-flex align-items-start mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-team-match-training j-icon i-xs bg-white"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light"> {{ item.title }}</p>
                                            </div>
                                            <p class="color-primary-light text-12 mb-1 ml-4 pl-1"><span> {{ item.time }}</span></p>
                                        </div>
                                        </div>
                                        <div v-if="filteredEvents(day.date , 'Afternoon').length > 0" class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-sun j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Afternoon</p>
                                        </div>
                                        <div v-for="(item, index) in filteredEvents(day.date , 'Afternoon')" :key="item.id">
                                        <div @click="handleAssignmentClick(item)"
                                          v-if="item.groupId == 'assignment' || item.groupId == 'shared-assignment'"
                                          class="card card-secondary rounded-4 mb-3 p-2 cursor-pointer">
                                            <div class="d-flex align-items-start mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-list-check j-icon i-xs bg-white"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">{{ item.title }}</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>{{ item.time }}</span></p>
                                            <div class="d-flex justify-content-end">
                                                <p class="color-secondary text-12 mb-0"><span>Due: </span><span> {{ item.date }}</span></p>
                                            </div>
                                        </div>
                                        <div @click="handleStudyCardClick(item)"
                                          v-if="item.groupId == 'study'"
                                          class="card card-secondary rounded-4 mb-3 p-2 cursor-pointer">
                                            <div class="d-flex align-items-center">
                                                <i class="i-note-book j-icon i-xl bg-text-secondary mr-2"></i>
                                                <div class="d-flex flex-column">
                                                    <p class="color-secondary text-12 mb-1">{{ item.title }}</p>
                                                    <p class="color-secondary text-12 mb-1"><span>Due: </span><span> {{ item.timeValNum }}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div @click="handleMeetingClick(item)"
                                          v-if="item.groupId == 'peer-meeting' || item.groupId == 'teacher-meeting'"
                                          class="card card-transparent border-0 rounded-4 mb-3 py-2 cursor-pointer">
                                            <div class="d-flex align-items-start mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-chat-group j-icon i-xs bg-white"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Meeting with {{ item.title }}</p>
                                            </div>
                                            <p class="color-primary-light text-12 mb-1 ml-4 pl-1"><span>{{ item.startTime }} </span> > <span> {{ item.endTime }}</span></p>
                                        </div>
                                        <div @click="handleClubMeetingClick(item)"
                                          v-if="item.groupId == 'club-meeting'"
                                          class="card card-secondary rounded-4 mb-3 p-2 cursor-pointer">
                                            <div class="d-flex align-items-center">
                                              <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                <i class="i-club-meeting j-icon i-xs bg-white"></i>
                                              </span>
                                              <p class="mb-0 text-14 font-medium color-primary-light">{{ item.title }}</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span> </span><span> {{ item.time }}</span></p>
                                        </div>
                                        <div @click="handleTrainingsClick(item)"
                                          v-if="item.groupId == 'trainings'"
                                          class="card card-transparent border-0 rounded-4 mb-3 py-2 cursor-pointer">
                                            <div class="d-flex align-items-start mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-team-match-training j-icon i-xs bg-white"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light"> {{ item.title }}</p>
                                            </div>
                                            <p class="color-primary-light text-12 mb-1 ml-4 pl-1"><span> {{ item.time }}</span></p>
                                        </div>
                                        <div @click="handleMatchesClick(item)"
                                          v-if="item.groupId == 'matches'"
                                          class="card card-transparent border-0 rounded-4 mb-3 py-2 cursor-pointer">
                                            <div class="d-flex align-items-start mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-team-match-training j-icon i-xs bg-white"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light"> {{ item.title }}</p>
                                            </div>
                                            <p class="color-primary-light text-12 mb-1 ml-4 pl-1"><span> {{ item.time }}</span></p>
                                        </div>
                                        </div>
                                        <div v-if="filteredEvents(day.date , 'Evening').length > 0" class="cal-time-zone d-flex align-items-center mb-2">
                                            <i class="i-half-moon j-icon i-lg bg-text-secondary mr-1"></i>
                                            <p class="color-secondary text-12 mb-0">Evening</p>
                                        </div>
                                        <div v-for="(item, index) in filteredEvents(day.date , 'Evening')" :key="item.id">
                                        <div @click="handleAssignmentClick(item)"
                                          v-if="item.groupId == 'assignment' || item.groupId == 'shared-assignment'"
                                          class="card card-secondary rounded-4 mb-3 p-2 cursor-pointer">
                                            <div class="d-flex align-items-start mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-list-check j-icon i-xs bg-white"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">{{ item.title }}</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span>{{ item.time }}</span></p>
                                            <div class="d-flex justify-content-end">
                                                <p class="color-secondary text-12 mb-0"><span>Due: </span><span> {{ item.date }}</span></p>
                                            </div>
                                        </div>
                                        <div @click="handleStudyCardClick(item)"
                                          v-if="item.groupId == 'study'"
                                          class="card card-secondary rounded-4 mb-3 p-2 cursor-pointer">
                                            <div class="d-flex align-items-center">
                                                <i class="i-note-book j-icon i-xl bg-text-secondary mr-2"></i>
                                                <div class="d-flex flex-column">
                                                    <p class="color-secondary text-12 mb-1">{{ item.title }}</p>
                                                    <p class="color-secondary text-12 mb-1"><span>Due: </span><span> {{ item.timeValNum }}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div @click="handleMeetingClick(item)"
                                          v-if="item.groupId == 'peer-meeting' || item.groupId == 'teacher-meeting'"
                                          class="card card-transparent border-0 rounded-4 mb-3 py-2 cursor-pointer">
                                            <div class="d-flex align-items-start mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-chat-group j-icon i-xs bg-white"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light">Meeting with {{ item.title }}</p>
                                            </div>
                                            <p class="color-primary-light text-12 mb-1 ml-4 pl-1"><span>{{ item.startTime }} </span> > <span> {{ item.endTime }}</span></p>
                                        </div>
                                        <div @click="handleClubMeetingClick(item)"
                                          v-if="item.groupId == 'club-meeting'"
                                          class="card card-secondary rounded-4 mb-3 p-2 cursor-pointer">
                                            <div class="d-flex align-items-center">
                                              <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                <i class="i-club-meeting j-icon i-xs bg-white"></i>
                                              </span>
                                              <p class="mb-0 text-14 font-medium color-primary-light">{{ item.title }}</p>
                                            </div>
                                            <p class="color-secondary text-12 mb-1"><span> </span><span> {{ item.time }}</span></p>
                                        </div>
                                        <div @click="handleTrainingsClick(item)"
                                          v-if="item.groupId == 'trainings'"
                                          class="card card-transparent border-0 rounded-4 mb-3 py-2 cursor-pointer">
                                            <div class="d-flex align-items-start mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-team-match-training j-icon i-xs bg-white"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light"> {{ item.title }}</p>
                                            </div>
                                            <p class="color-primary-light text-12 mb-1 ml-4 pl-1"><span> {{ item.time }}</span></p>
                                        </div>
                                        <div @click="handleMatchesClick(item)"
                                          v-if="item.groupId == 'matches'"
                                          class="card card-transparent border-0 rounded-4 mb-3 py-2 cursor-pointer">
                                            <div class="d-flex align-items-start mb-1">
                                                <span class="rounded-4 p-1 bg-primary-light mr-1">
                                                    <i class="i-team-match-training j-icon i-xs bg-white"></i>
                                                </span>
                                                <p class="mb-0 text-14 font-medium color-primary-light"> {{ item.title }}</p>
                                            </div>
                                            <p class="color-primary-light text-12 mb-1 ml-4 pl-1"><span> {{ item.time }}</span></p>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- End Daily Calander -->
    <div
      class="modal fade"
      id="alertModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="alertModalModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header pb-1">
            <h4 class="modal-title" id="alertModalModalLongTitle">Alert</h4>
          </div>
          <div class="modal-body px-3">
            <p class="mb-0">{{ alertMessage }}</p>
          </div>
          <div class="modal-footer justify-content-end border-top-0">
            <button
              type="button"
              class="btn btn-secondary py-1 px-3 rounded-8 font-semi-bold"
              data-dismiss="modal"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
    import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import { mapState, mapActions } from "vuex";
import { eventBus } from "~/plugins/eventbus.js"
export default {
  name: "UserStudentCalendar",
  components: {
    lottie,
  },
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "/css/custom.css",
        },
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
      days: [],
      currentDate: new Date(),
      showWeekends: false,
      monthText: '',
      weekNumberText: '',
      isAssignmentEdit: false,
      date_today: new Date(),
      submitted: false,
      processing: false,
      processingUpload: false,
      processingUploadSubmit: false,
      processingCompleteAssignment: false,
      processingSubCompleteAssignment: false,
      subject: "",
      subjectId: "",
      task: "",
      priorityVal: "",
      timeValue: "",
      subjectValue: "",
      taskValue: "",
      timeList: "",
      popTitle: "",
      popMeeting: "",
      popTime: "",
      popDate: "",
      dateValue: "",
      idNum: "",
      meetingDetails: [],
      dateListValue: "",
      calendarDate: "",
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      draggable: "Drag Me",
      assignmentName: "",
      assignmentDescription: "",
      addSubTask: false,
      subTaskName: "",
      subTasksList: [],
      invitePeer: false,
      peerSelected: [],
      peerList: [],
      completeAsstId: 0,
      removePeerId: 0,
      playCelebration: false,
      completeSubTasktId: 0,
      openAssignment: false,
      isAddAssignment: true,
      pendingAssignments: [],
      filterType: "",
      additionalMaterial: false,
      materialType: "",
      additionalMaterialList: [],
      additionalMaterialListSubmit: [],
      link: "",
      linkSubmit: "",
      file: "",
      fileSubmit: "",
      assignmentId: 0,
      isSharedAssignment: false,
      assignmentList: [],
      assignmentMaterials: [],
      validTime: false,
      completedAssignmentList: [],
      deletedSubTasksArray: [],
      tempCompleted: [],
      drag: false,
      viewMore: false,
      viewMoreId: "",
      offset: 0,
      limit: 10,
      tempAssts: [],
      gg4lSubject: "",
      schoologyAssignment: "",
      reloadCount: 0,
      tempOffset: -1,
      reloadNext: false,
      chooseMultiple: false,
      choosenAssignments: [],
      undoAsstId: 0,
      undoSubtaskId: 0,
      user_id: "",
      removedPeerList: [],
      prior: "4",
      startTime: null,
      alertMessage: "",
      materialTypeSubmit: "",
      submissionId: "",
      grade: "",
      gradePossible: "",
      invalidSubmitUrl:false,
      submittedAsst:false,
      disableSubmit:false,
      invalidSubmitText:false,
      eventList:[],
      showMorningSection: false,
      newDate: '',
    }
  },
  created() {
    eventBus.$on('accordionOpened', (newValue) => {
      this.accordionOpened = newValue;
    });
  },
  mounted(){
    this.generateDays();
    this.updateWeekNumber();
    this.updateWeekNumberAndMonth();
    this.user_id = localStorage.getItem("id");
    this.GetStudents();
    this.getSubjectsList();
    this.GetWeeklyPlanner();
  },
  computed: {
    ...mapState("plannerWeek", {
      plannerList: (state) => state.plannerList,
      sessionList: (state) => state.sessionList,
      assignment: (state) => state.assignment,
      meetingList: (state) => state.meetingList,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      subjectsData: (state) => state.subjectsData,
      sharedAstList: (state) => state.sharedAstList,
      sharedSessionList: (state) => state.sharedSessionList,
      clubMeetings: (state) => state.clubMeetings,
      trainingsMatches: (state) => state.trainingsMatches,
    }),
    ...mapState("quotedMessage", {
      quoteMessage: (state) => state.quoteMessage,
      viewed: (state) => state.viewed,
      assignment: (state) => state.assignment,
      sharedAssignment: (state) => state.sharedAssignment,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      errorMessageQuote: (state) => state.errorMessage,
      errorTypeQuote: (state) => state.errorType,
      subjectsData: (state) => state.subjectsData,
      assignmentsList: (state) => state.assignmentsList,
      sharedAssignmentsList: (state) => state.sharedAssignmentsList,
      completedAssignments: (state) => state.completedAssignments,
      completedSharedAssignments: (state) => state.completedSharedAssignments,
      newAdditionalMaterial: (state) => state.newAdditionalMaterial,
      allSubTskCompleted: (state) => state.allSubTskCompleted,
      overdues: (state) => state.overdues,
      sharedOverdues: (state) => state.sharedOverdues,
    }),
    ...mapState("teacherMeeting", {
      students: (state) => state.students,
      students: (state) => state.students,
    }),
    filterText() {
      if (this.filterType === 'Assignments') {
        return 'Assignments';
      } else if (this.filterType === 'Meetings') {
        return 'Meetings';
      } else if (this.filterType === 'Session') {
        return 'Study Sessions';
      } else if (this.filterType === 'All') {
        return 'All';
      }
    }
  },
  methods :{
    ...mapActions("plannerWeek", {
      getWeeklyPlanner: "getWeeklyPlanner",
      addAssignment: "addAssignment",
      updateAssignment: "updateAssignment",
      getAssignment: "getAssignment",
      getSubjectsList: "getSubjectsList",
      getWeeklyPlannerFilter: "getWeeklyPlannerFilter",
    }),
    ...mapActions("quotedMessage", {
      showQuotedMessage: "showQuotedMessage",
      getDailyPlanner: "getDailyPlanner",
      addAssignment: "addAssignment",
      getAssignment: "getAssignment",
      updateAssignment: "updateAssignment",
      getSubjectsList: "getSubjectsList",
      getAssignments: "getAssignments",
      completeTask: "completeTask",
      getCompletedAssignments: "getCompletedAssignments",
      uploadAdditionalMaterial: "uploadAdditionalMaterial",
      deleteAssignments: "deleteAssignments",
      assignmentSubmit: "assignmentSubmit",
    }),
    ...mapActions("teacherMeeting", {
      getStudents: "getStudents",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async GetSubjectList() {
      await this.getSubjectsList({});
    },
    async GetWeeklyPlanner() {
      this.filterType = 'All'
      this.loading = true;
      this.eventList = [];
      await this.getWeeklyPlanner({
        user_id: localStorage.getItem("id"),
        type: "Weekly",
        date: this.getStartOfWeek(),
      });
      this.eventList = [];
      this.meetingDetails = [];
      this.plannerList.forEach((element) => {
        if (element.due_date) {
          var plannerObj = {};
          var id = element.id;
          var assignment = element.subject;
          var time = element.due_time;
          var date = this.dateConversion(element.due_date);
          var title = element.task;
          if (element.priority == "1") {
            var color = "#EF382E";
          } else if (element.priority == "2") {
            var color = "#F6D73C";
          } else if (element.priority == "3") {
            var color = "#38a272";
          }
          if (element.task_status == "Completed") {
            var color = "#a7a7a7";
          }
          var dateMeeting = element.due_date;
          var task_status = element.task_status;
          var tmeMeeting = "";
          if (element.due_time) {
            tmeMeeting = this.formatAMPM(element.due_time);
          }
          var start = dateMeeting;
          plannerObj["assignment"] = assignment;
          plannerObj["time"] = time;
          plannerObj["date"] = date;
          plannerObj["title"] = title;
          plannerObj["id"] = id;
          plannerObj["taskStatus"] = task_status;
          plannerObj["title"] = title;
          plannerObj["color"] = color;
          plannerObj["start"] = start;
          plannerObj["id"] = id;
          plannerObj["groupId"] = "assignment";
          this.eventList.push(plannerObj);
          this.assignmentList.push(plannerObj);
        }
      });
      this.clubMeetings?.forEach((element) => {
        var listobj = {};
        if (element.title != null) {
          var title = "Meeting with " + element.title;
        }
        if (element.club_name != null) {
          var title = element.club_name + " Meeting";
        }
        var color = "#07BEB8";
        listobj["groupId"] = "club-meeting";
        var dateMeeting = element.date;
        var timeValNum = element.default_slots?.start_time;
        var time = element.default_slots?.start_time;
        var tmeMeeting = "";
        if (element.default_slots?.start_time) {
          tmeMeeting = this.formatAMPM(element.default_slots?.start_time);
        }
        var start = dateMeeting;
        listobj["title"] = title;
        listobj["color"] = color;
        listobj["start"] = start;
        listobj["id"] = element.clubs?.id;
        listobj["time"] = time;
        listobj["title"] = title;
        listobj["meeting"] = "Club";
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.meetingDetails.push(listobj);
        this.eventList.push(listobj);
      });
      this.meetingList?.forEach((element) => {
        var listobj = {};
        var title = element.title;
        var meeting = element.meeting_type;
        if (meeting == "Peer") {
          var color = "#64B5FC";
          listobj["groupId"] = "peer-meeting";
        } else if (meeting == "Teacher") {
            listobj["groupId"] = "teacher-meeting";
          var color = "#073BBF";
        }
        var time = element.start_time;
        var startTime = element.start_time;
        var endTime = element.end_time;
        var dateMeeting = element.date;
        var timeValNum = element.start_time;
        var tmeMeeting = "";
        if (element.start_time) {
          tmeMeeting = this.formatAMPM(element.start_time);
        }
        var start = dateMeeting;
        listobj["title"] = title;
        listobj["color"] = color;
        listobj["start"] = start;
        listobj["id"] = element.id;
        listobj["time"] = time;
        listobj["startTime"] = startTime;
        listobj["endTime"] = endTime;
        listobj["title"] = title;
        listobj["meeting"] = meeting;
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.meetingDetails.push(listobj);
        this.eventList.push(listobj);
      });
      this.sessionList?.forEach((element) => {
        var listobj = {};
        let title = "";
        if (element.assignment_id) {
          title = "Study Session " + element.assignments?.task;
        } else {
          title = "Study Session " + element.subject?.subject_name;
        }
        const color = element.subject?.color_code;
        var status = element.status;
        var time = element.time;
        var dateMeeting = element.date;
        var timeValNum = element.time;
        var tmeMeeting = "";
        if (element.time) {
          tmeMeeting = this.formatAMPM(element.time);
        }
        var start = dateMeeting;
        listobj["title"] = title;
        listobj["color"] = color;
        listobj["start"] = start;
        listobj["id"] = element.id;
        listobj["groupId"] = "study";
        listobj["time"] = time;
        listobj["status"] = status;
        listobj["title"] = title;
        listobj["meeting"] = "Study Session";
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.eventList.push(listobj);
      });
      this.sharedAstList.forEach((element) => {
        if (element.due_date) {
          var plannerObj = {};
          var id = element.id;
          var assignment = element.subject;
          var task_status = element.task_status;
          var time = element.due_time;
          var date = this.dateConversion(element.due_date);
          var title = element.task;
          var time = element.due_time  ;
          if (element.priority == "1") {
            var color = "#EF382E";
          } else if (element.priority == "2") {
            var color = "#F6D73C";
          } else if (element.priority == "3") {
            var color = "#38a272";
          }
          if (element.task_status == "Completed") {
            var color = "#a7a7a7";
          }
          var dateMeeting = element.due_date;
          var tmeMeeting = "";
          if (element.due_time) {
            tmeMeeting = this.formatAMPM(element.due_time);
          }
          var start = dateMeeting;
          plannerObj["assignment"] = assignment;
          plannerObj["time"] = time;
          plannerObj["date"] = date;
          plannerObj["title"] = title;
          plannerObj["id"] = id;
          plannerObj["title"] = title;
          plannerObj["color"] = color;
          plannerObj["start"] = start;
          plannerObj["id"] = id;
          plannerObj["taskStatus"] = task_status;
          plannerObj["groupId"] = "shared-assignment";
          this.eventList.push(plannerObj);
          this.assignmentList.push(plannerObj);
        }
      });
      this.sharedSessionList?.forEach((element) => {
        var listobj = {};
        let title = "";
        if (element.studyroom.assignment_id) {
          title = "Study Session " + element.studyroom.assignments?.task;
        } else {
          title = "Study Session " + element.studyroom.subject?.subject_name;
        }

        const color = element.studyroom.subject?.color_code;
        var dateMeeting = element.date;
        var timeValNum = element.start_time;
        var tmeMeeting = "";
        var status = element.studyroom.status;
        var time = element.start_time;
        if (element.start_time) {
          tmeMeeting = this.formatAMPM(element.start_time);
        }
        var start = dateMeeting;
        listobj["title"] = title;
        listobj["color"] = color;
        listobj["start"] = start;
        listobj["id"] = element.session_id;
        listobj["groupId"] = "study";
        listobj["time"] = time;
        listobj["status"] = status;
        listobj["title"] = title;
        listobj["meeting"] = "Study Session";
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.eventList.push(listobj);
      });
      this.trainingsMatches?.forEach((element) => {
        if (element.date) {
          var plannerObj = {};

          if (element.session_type == "Match") {
            var color = "#ad2b89";
          } else {
            var color = "#da70d6";
          }
          var time = element.time;
          var dateMeeting = moment(element.date).format('YYYY-MM-DD');
          var tmeMeeting = "";
          if (element.time) {
            tmeMeeting = this.formatAMPM(element.time);
          }
          var start = dateMeeting;

          plannerObj["title"] = element.title;
          plannerObj["color"] = color;
          plannerObj["start"] = start;
          plannerObj["id"] = element.id;
          plannerObj["time"] = time;
          plannerObj["groupId"] =
            element.session_type == "Match" ? "matches" : "trainings";
          this.eventList.push(plannerObj);
        }
      });
      this.loading = false;
    },
    updateFilter(selectedFilter) {
      this.filterType = selectedFilter;
      if (this.filterType !== 'All') {
      this.GetWeeklyPlannerFilter();
      }
    },
    async GetWeeklyPlannerFilter(){
      this.loading = true;
      this.eventList = [];
      await this.getWeeklyPlannerFilter({
        plannerType: "Weekly",
        date: this.getStartOfWeek(),
        filter: this.filterType,
      });
      this.meetingDetails = [];
      this.plannerList.forEach((element) => {
        if (element.due_date) {
          var plannerObj = {};
          var id = element.id;
          var assignment = element.subject;
          var time = element.due_time;
          var date = this.dateConversion(element.due_date);
          var title = element.task;
          if (element.priority == "1") {
            var color = "#EF382E";
          } else if (element.priority == "2") {
            var color = "#F6D73C";
          } else if (element.priority == "3") {
            var color = "#38a272";
          }
          if (element.task_status == "Completed") {
            var color = "#a7a7a7";
          }
          var dateMeeting = element.due_date;
          var task_status = element.task_status;
          var tmeMeeting = "";
          if (element.due_time) {
            tmeMeeting = this.formatAMPM(element.due_time);
          }
          var start = dateMeeting;
          plannerObj["assignment"] = assignment;
          plannerObj["time"] = time;
          plannerObj["date"] = date;
          plannerObj["title"] = title;
          plannerObj["id"] = id;
          plannerObj["taskStatus"] = task_status;
          plannerObj["title"] = title;
          plannerObj["color"] = color;
          plannerObj["start"] = start;
          plannerObj["id"] = id;
          plannerObj["groupId"] = "assignment";
          this.eventList.push(plannerObj);
          this.assignmentList.push(plannerObj);
        }
      });
      this.meetingList?.forEach((element) => {
        var listobj = {};
        var title = element.title;
        var meeting = element.meeting_type;
        if (meeting == "Peer") {
          var color = "#64B5FC";
          listobj["groupId"] = "peer-meeting";
        } else if (meeting == "Teacher") {
            listobj["groupId"] = "teacher-meeting";
          var color = "#073BBF";
        }
        var time = element.start_time;
        var startTime = element.start_time;
        var endTime = element.end_time;
        var dateMeeting = element.date;
        var timeValNum = element.start_time;
        var tmeMeeting = "";
        if (element.start_time) {
          tmeMeeting = this.formatAMPM(element.start_time);
        }
        var start = dateMeeting;
        listobj["title"] = title;
        listobj["color"] = color;
        listobj["start"] = start;
        listobj["id"] = element.id;
        listobj["time"] = time;
        listobj["startTime"] = startTime;
        listobj["endTime"] = endTime;
        listobj["title"] = title;
        listobj["meeting"] = meeting;
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.meetingDetails.push(listobj);
        this.eventList.push(listobj);
      });
      this.sessionList?.forEach((element) => {
        var listobj = {};
        let title = "";
        if (element.assignment_id) {
          title = "Study Session " + element.assignments?.task;
        } else {
          title = "Study Session " + element.subject?.subject_name;
        }
        const color = element.subject?.color_code;
        var status = element.status;
        var time = element.time;
        var dateMeeting = element.date;
        var timeValNum = element.time;
        var tmeMeeting = "";
        if (element.time) {
          tmeMeeting = this.formatAMPM(element.time);
        }
        var start = dateMeeting;
        listobj["title"] = title;
        listobj["color"] = color;
        listobj["start"] = start;
        listobj["id"] = element.id;
        listobj["groupId"] = "study";
        listobj["time"] = time;
        listobj["status"] = status;
        listobj["title"] = title;
        listobj["meeting"] = "Study Session";
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.eventList.push(listobj);
      });
      this.sharedAstList.forEach((element) => {
        if (element.due_date) {
          var plannerObj = {};
          var id = element.id;
          var assignment = element.subject;
          var time = element.due_time;
          var date = this.dateConversion(element.due_date);
          var title = element.task;
          var time = element.due_time  ;
          if (element.priority == "1") {
            var color = "#EF382E";
          } else if (element.priority == "2") {
            var color = "#F6D73C";
          } else if (element.priority == "3") {
            var color = "#38a272";
          }
          if (element.task_status == "Completed") {
            var color = "#a7a7a7";
          }
          var dateMeeting = element.due_date;
          var tmeMeeting = "";
          if (element.due_time) {
            tmeMeeting = this.formatAMPM(element.due_time);
          }
          var start = dateMeeting;
          plannerObj["assignment"] = assignment;
          plannerObj["time"] = time;
          plannerObj["date"] = date;
          plannerObj["title"] = title;
          plannerObj["id"] = id;
          plannerObj["title"] = title;
          plannerObj["color"] = color;
          plannerObj["start"] = start;
          plannerObj["id"] = id;
          plannerObj["groupId"] = "shared-assignment";
          this.eventList.push(plannerObj);
          this.assignmentList.push(plannerObj);
        }
      });
      this.sharedSessionList?.forEach((element) => {
        var listobj = {};
        let title = "";
        if (element.studyroom.assignment_id) {
          title = "Study Session " + element.studyroom.assignments?.task;
        } else {
          title = "Study Session " + element.studyroom.subject?.subject_name;
        }
        const color = element.studyroom.subject?.color_code;
        var dateMeeting = element.date;
        var timeValNum = element.start_time;
        var tmeMeeting = "";
        var status = element.studyroom.status;
        var time = element.start_time;
        if (element.start_time) {
          tmeMeeting = this.formatAMPM(element.start_time);
        }
        var start = dateMeeting;
        listobj["title"] = title;
        listobj["color"] = color;
        listobj["start"] = start;
        listobj["id"] = element.session_id;
        listobj["groupId"] = "study";
        listobj["time"] = time;
        listobj["status"] = status;
        listobj["title"] = title;
        listobj["meeting"] = "Study Session";
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.eventList.push(listobj);
      });
      this.loading = false;
    },
    goToPreviousWeek() {
      this.currentDate.setDate(this.currentDate.getDate() - 7);
      this.days = [];
      this.generateDays();
      this.updateWeekNumber();
      this.updateWeekNumberAndMonth();
      this.getStartOfWeek();
      this.getData();
    },
    goToNextWeek() {
      this.currentDate.setDate(this.currentDate.getDate() + 7);
      this.days = [];
      this.generateDays();
      this.updateWeekNumber();
      this.updateWeekNumberAndMonth();
      this.getStartOfWeek();
      this.getData();
    },
    getData(){
      switch (this.filterType) {
        case "All": {
          this.GetWeeklyPlanner(); 
        }
        default: {
          this.updateFilter(this.filterType)
        }
      }
    },
    getStartOfWeek() {
      const dayOfWeek = this.currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
      // Calculate the number of days to subtract to get to Monday (1)
      const daysToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
      // Calculate the date of the start of the week (Monday)
      this.currentDate.setDate(this.currentDate.getDate() - daysToMonday); 
      const year = this.currentDate.getFullYear();
      const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(this.currentDate.getDate()).padStart(2, '0');  
      return `${year}-${month}-${day}`;
    },
    generateDays() {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      // Calculate the start day of the week based on the button's state
      const startDay = new Date(this.currentDate);
      let dayOffset = 0;
      if (!this.showWeekends) {
        // If weekends are hidden, start from Monday
        dayOffset = this.currentDate.getDay() === 0 ? 1 : -this.currentDate.getDay() + 1;
      } else {
        // If weekends are shown, start from Wednesday
        dayOffset = -this.currentDate.getDay() + 3;
         this.newDate = new Date(this.currentDate);
        this.newDate.setDate(this.currentDate.getDate() + dayOffset);
      } 
      startDay.setDate(this.currentDate.getDate() + dayOffset);
      const daysToShow = this.showWeekends ? 5 : 5;
      for (let i = 0; i < daysToShow; i++) {
        const currentDate = new Date(startDay);
        currentDate.setDate(startDay.getDate() + i);
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const dateNumber = currentDate.getDate().toString().padStart(2, '0');
        this.days.push({
          name: daysOfWeek[currentDate.getDay()],
          date: `${year}-${month}-${dateNumber}`, // Format to match API
          dateNumber: dateNumber
        });
      }
    },
    updateWeekNumber() {
      // Calculate the week number within the month
      const weekNumber = Math.ceil(this.currentDate.getDate() / 7);
      this.weekNumberText = `Week ${weekNumber.toString().padStart(2, '0')}`;
    },
    updateWeekNumberAndMonth() {
    // Calculate the week number within the month
      if (this.showWeekends) {
        this.newDate
        // Get the month name from this.newDate
        const monthnames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const weekNumber = Math.ceil(this.newDate.getDate() / 7);
        this.weekNumberText = `Week ${weekNumber.toString().padStart(2, '0')}`;
        const monthname = monthnames[this.newDate.getMonth()];
        this.monthText = monthname;
      } else {
        // Get the month name from this.currentDate
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const weekNumber = Math.ceil(this.currentDate.getDate() / 7);
        this.weekNumberText = `Week ${weekNumber.toString().padStart(2, '0')}`;
        const monthName = monthNames[this.currentDate.getMonth()];
        this.monthText = monthName;
      }
    },
    toggleWeekends() {
      this.showWeekends = !this.showWeekends;
      this.days = [];
      this.generateDays();
      this.getStartOfWeek();
      this.updateWeekNumberAndMonth();
    },
    async GetStudents() {
      await this.getStudents({
        school_id: localStorage.getItem("school_id"),
        studentId: localStorage.getItem("id"),
      });
    },
    dateConversion(value) {
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      var dateValue = new Date(value);
      var month = monthNames[dateValue.getMonth()];
      var day = dateValue.getDate();
      var year = dateValue.getFullYear();
      return month + " " + day + ", " + year;
    },
    ordinal_suffix_of(i) {
      var j = i % 10,
        k = i % 100;
      if (j == 1 && k != 11) {
        return "st";
      }
      if (j == 2 && k != 12) {
        return "nd";
      }
      if (j == 3 && k != 13) {
        return "rd";
      }
      return "th";
    },
    formatAMPM(input) {
      if (input) {
        var time = input;
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "PM" && hours < 12) hours = hours + 12;
        if (AMPM == "AM" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        var strTime = sHours + ":" + sMinutes;
        return strTime;
      }
    },
    filteredEvents(date, timePeriod) {
  // First, sort the eventList by time in ascending order
  const sortedEventList = this.eventList.slice().sort((a, b) => {
    // Assuming time is in HH:MM format, you might need to adjust the parsing logic
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);

    if (timeA[0] === timeB[0]) {
      return timeA[1] - timeB[1];
    }
    return timeA[0] - timeB[0];
  });

  // Now, filter the sorted array
  const filteredEvents = sortedEventList.filter((item) => {
    const eventTimePeriod = this.getTimePeriod(item.time);
    return item.start === date && eventTimePeriod === timePeriod;
  });

  return filteredEvents;
},

    getTimePeriod(time) {
      const timeParts = time.split(' ');
      const hour = parseInt(timeParts[0].split(':')[0]);
      const period = timeParts[1];
  
      if (period === 'AM') {
        if (hour <= 12) {
          return 'Morning';
        } 
        } else if (period === 'PM') {
          if (hour === 12) {
            return 'Afternoon';
          } else if (hour < 5) {
            return 'Afternoon';
          } else if (hour < 12) {
            return 'Evening';
          }
        }
    },
    handleStudyCardClick(item) {
      if (item.groupId === "study") {
        if (item.status === "STOP") {
          this.alertMessage = "This session has already been completed";
          $("#alertModal").modal({ backdrop: true });
        } else {
          this.$router.push(`/study-time?id=${item.id}`);
        }
      }
    },
    handleClubMeetingClick(item) {
      if (item.groupId === "club-meeting") {
        let club = this.clubMeetings.find((e) => e.clubs?.id == item.id);
        const eventStartDate = moment(item.start);
        if (eventStartDate.isBefore(moment().format("YYYY-MM-DD"))) {
        this.alertMessage = "No actions can be performed on past events";
        $("#alertModal").modal({ backdrop: true });
          $("#alertModal").modal({ backdrop: true });
        } else {
          this.$router.push(`/club-moreInfo?id=${item.id}&name=${club.club_name}&type=${club.clubs.activity_type}`);
        }
      }
    },
    handleMeetingClick(item) {
      if (item.groupId === "peer-meeting" || item.groupId === "teacher-meeting") {
        // Compare the event's 'start' date with the current date
        const eventStartDate = moment(item.start);  
        if (eventStartDate.isBefore(moment().format("YYYY-MM-DD"))) {
        this.alertMessage = "No actions can be performed on past events";
          $("#alertModal").modal({ backdrop: true });
        } else {
          this.$router.push(`/viewall-meeting?id=${item.id}&type=${item.groupId}`);
        }
      }
    },
    handleMatchesClick(item) {
      if (item.groupId === "matches") {
        let club = this.trainingsMatches.find((e) => e.id == item.id);
        // Compare the event's 'start' date with the current date
        const eventStartDate = moment(item.start);
        if (eventStartDate.isBefore(moment().format("YYYY-MM-DD"))) {
        this.alertMessage = "No actions can be performed on past events";
          $("#alertModal").modal({ backdrop: true });
        } else {
          return this.$router.push(
                `/club-moreInfo?id=${club.clubs.id}&name=${club.clubs.name}&type=${club.clubs.activity_type}`
              );
        }
      }
    },
    handleTrainingsClick(item) {
      if (item.groupId === "trainings") {
        let club = this.trainingsMatches.find((e) => e.id == item.id);
        const eventStartDate = moment(item.start);
        if (eventStartDate.isBefore(moment().format("YYYY-MM-DD"))) {
        this.alertMessage = "No actions can be performed on past events";
          $("#alertModal").modal({ backdrop: true });
        } else {
          return this.$router.push(
                `/club-moreInfo?id=${club.clubs.id}&name=${club.clubs.name}&type=${club.clubs.activity_type}`
              );
        }
      }
    },
    handleAssignmentClick(item) {
      if (item.groupId === "assignment" ||item.groupId === "shared-assignment") {
        let taskStatus = item.taskStatus;
        if (taskStatus == "Completed") {
          this.alertMessage = "This is a completed assignment";
          $("#alertModal").modal({ backdrop: true });
        } else {
          return this.$router.push(`/task?id=${item.id}`);
        }
      }
    },
    isToday(date) {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1 and format with leading zero
      const day = today.getDate().toString().padStart(2, '0');
      const todayString = `${year}-${month}-${day}`;
      return date === todayString;
    }
  }
}
</script>
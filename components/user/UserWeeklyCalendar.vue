<template>
    <div class="container mt-4">
      <lottie
        v-if="loading"
        :options="lottieOptions"
        v-on:animCreated="handleAnimation"
        class="lottie-loader"
      />
      <div class="d-flex justify-content-end">
        <button @click="toggleWeekends" class="btn btn-primary">{{ showWeekends ? 'Hide Weekend' : 'Show Weekend' }}</button>
      </div>
      <div>
        <button @click="goToPreviousWeek" class="btn btn-primary">Previous</button>
        <button @click="goToNextWeek" class="btn btn-primary">Next</button>
      </div>
      <div class="row">
    <div v-for="(day, index) in days" :key="index" class="col">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title">{{ day.name }} {{ day.dateNumber }}</h6>
          <ul>
            <li v-for="(item, index) in filteredEvents(day.date)" :key="index">
              <div v-if="!item.title">Task data is missing for this event.</div>
              <div>
               <h6> <i :class="iconMappings[getTimePeriod(item.time)]"></i>
             {{ getTimePeriod(item.time) }}</h6>
             </div>
              <div class="card"  @click="handleAssignmentClick(item)">
                <i
                   v-if="item.groupId === 'assignment'"
                    class="fas fa-edit cursor-pointer"
                ></i>{{ item.title }}
                   <div class="d-flex me">
                  <p>Due {{ item.time }}</p>
                  </div>
                 {{ item.start }}
              </div>
              <div class="card">
                <i
                   v-if="item.groupId === 'peer-meeting'"
                    class="fas fa-comments"
                ></i>
              </div>
              <!-- You can display other event properties here -->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
    </div>
  </template>
  
  <script>
  // var eventList = [];
  import { mapState, mapActions } from "vuex";
  import * as animationData from "~/assets/animation.json";
  import * as animationDataSuccess from "~/assets/success.json";
  import lottie from "vue-lottie/src/lottie.vue";
  export default {
    name:"CalendarWeek",
    components : {
      lottie
    },
    data() {
      return {
        iconMappings: {
        Morning: 'fas fa-sun', // FontAwesome sun icon
        Afternoon: 'fas fa-cloud-sun', // FontAwesome sun with clouds icon
        Evening: 'fas fa-moon', // FontAwesome moon icon
        Books: 'fas fa-tasks'
      },
        days: [],
        currentDate: new Date(),
        showWeekends: false,
        loading: false,
        anim: null,
        lottieOptions: { animationData: animationData.default },
        lottieOptionsSuccess: {
          animationData: animationDataSuccess.default,
          loop: false,
          user_id: "",
          calendarDate: "",
        },
        eventList : [],
       assignmentList: [],
       meetingDetails: [],
      };
    },
    computed : {
      ...mapState("plannerWeek", {
        plannerList: (state) => state.plannerList,
        subjectsData: (state) => state.subjectsData,
        meetingList: (state) => state.meetingList,
      }),
      ...mapState("teacherMeeting", {
        students: (state) => state.students,
        students: (state) => state.students,
      }),
    },
    
    mounted() {
      this.filteredEvents();
      this.generateDays();
      this.user_id = localStorage.getItem("id");
      this.GetStudents();
      this.GetWeeklyPlanner();
      this.getStartOfWeek();
      this.getSubjectsList();
      this.getAllCompletedAssignments();
    },
    methods: {
      ...mapActions("plannerWeek", {
        getWeeklyPlanner: "getWeeklyPlanner",
        getSubjectsList: "getSubjectsList",
      }),
      ...mapActions("quotedMessage", {
        getCompletedAssignments: "getCompletedAssignments",
      }),
      ...mapActions("teacherMeeting", {
        getStudents: "getStudents",
      }),
      async GetSubjectList() {
        await this.getSubjectsList({});
      },
      handleAnimation: function (anim) {
        this.anim = anim;
      },
      filteredEvents(date) {
      return this.eventList.filter((item) => {
        // Check if the event's start date matches the specified date
        return item.start === date;
      });
    },
    handleAssignmentClick(item) {
        window.alert('Assignment clicked:', item);
      },
    formatAMPM(time) {
    const timeRegex = /^(\d{2}:\d{2}) (AM|PM)$/i;
    const matches = time.match(timeRegex);
  
    if (!matches) {
      return 'Invalid Time';
    }
  
    const [_, timeString, period] = matches;
    const [hours, minutes] = timeString.split(':').map(Number);
  
    if (isNaN(hours) || isNaN(minutes) || hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
      return 'Invalid Time';
    }
  
    return `${timeString} ${period.toUpperCase()}`;
  },
    getTimePeriod(time) {
      const timeParts = time.split(' ');
      const hour = parseInt(timeParts[0].split(':')[0]);
      const period = timeParts[1];
  
      if (period === 'AM') {
        if (hour < 12) {
          return 'Morning';
        } else {
          return 'Evening';
        }
      } else if (period === 'PM') {
        if (hour < 5) {
          return 'Afternoon';
        } else if (hour < 12) {
          return 'Evening';
        } 
      }
    },
      async GetStudents() {
        await this.getStudents({
          school_id: localStorage.getItem("school_id"),
          studentId: localStorage.getItem("id"),
        });
      },
      async GetWeeklyPlanner() {
        this.eventList = [];
        this.meetingDetails = [];
        await this.getWeeklyPlanner({
          user_id: localStorage.getItem("id"),
          type: "Weekly",
          date: this.getStartOfWeek(),
        })
        this.plannerList.forEach((element) => {
    if (element.due_date) {
      var scheduleObject = {};
      var plannerObj = {};
  
      // Extract all properties from the API response
      var id = element.id;
      var assignment = element.subject;
      var time = element.due_time;
      var title = element.task;
      var priority = element.priority;
      var taskStatus = element.task_status;
      var dateMeeting = element.due_date;
  
      // Set color based on priority and task status
      var color = "#38a272"; // Default color
      var start = dateMeeting;
      var time = time;
  
      // Populate scheduleObject with details
      scheduleObject["assignment"] = assignment;
      scheduleObject["time"] = time;
      scheduleObject["title"] = title;
      scheduleObject["id"] = id;
  
      // Populate plannerObj with details
      plannerObj["time"] = time;
      plannerObj["title"] = title;
      plannerObj["start"] = start;
      plannerObj["id"] = id;
      plannerObj["groupId"] = "assignment";
  
      // Push both objects to the eventList and assignmentList arrays
      this.eventList.push(plannerObj);
      this.assignmentList.push(scheduleObject);
    }
  });
  this.meetingList?.forEach((element) => {
          var meetingobj = {};
          var listobj = {};
  
          // if (element.club_name != null) {
          var title = element.meeting_name;
          // }
  
          var meeting = element.meeting_type;
          if (meeting == "Peer") {
            var color = "#64B5FC";
            meetingobj["groupId"] = "peer-meeting";
          } else if (meeting == "Teacher") {
            meetingobj["groupId"] = "teacher-meeting";
            var color = "#073BBF";
          }
          var dateMeeting = element.date;
          var timeValNum = element.start_time;
          var tmeMeeting = "";
          if (element.start_time) {
            tmeMeeting = this.formatAMPM(element.start_time);
          }
          var start = dateMeeting + "T" + tmeMeeting;
          let date = dateMeeting;
          let time = tmeMeeting;
          meetingobj["title"] = title;
          meetingobj["color"] = color;
          meetingobj["start"] = start;
          meetingobj["id"] = element.id;
          meetingobj["date"] = date;
          meetingobj["time"] = time;
  
          // meetingobj["groupId"] = "Meeting";
          listobj["title"] = title;
          listobj["meeting"] = meeting;
          listobj["dateMeeting"] = dateMeeting;
          listobj["timeValNum"] = timeValNum;
          this.meetingDetails.push(listobj);
          this.eventList.push(meetingobj);
          console.log(this.formatAMPM(element.start_time))
        });
  console.log(this.eventList);
      },
      async getAllCompletedAssignments() {
        await this.getCompletedAssignments({
          userId: localStorage.getItem("id"),
          date: this.getStartOfWeek(),
          type: "Weekly",
        });
      },
      getStartOfWeek() {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
  
    // Calculate the number of days to subtract to get to Monday (1)
    const daysToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    
    // Calculate the date of the start of the week (Monday)
    currentDate.setDate(currentDate.getDate() - daysToMonday);
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    
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
      console.log(this.days);
    }
  },
      toggleWeekends() {
        this.loading = true;
        this.showWeekends = !this.showWeekends;
        this.days = [];
        this.generateDays();
        this.loading = false;
      },
  
      goToPreviousWeek() {
        this.currentDate.setDate(this.currentDate.getDate() - 7);
        this.days = [];
        this.generateDays();
        this.GetWeeklyPlanner();
      },
  
      goToNextWeek() {
        this.currentDate.setDate(this.currentDate.getDate() + 7);
        this.days = [];
        this.generateDays();
      },
    },
  };
  </script>
  <style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
  </style>
  
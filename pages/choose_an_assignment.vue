<template>
  <div class="container-fluid main-container student-dashboard-main">
    <div class="col-12">
      <div class="row">
        <div class="col-2">
          <div class="sd-sidebar jochi-components-light-bg p-4">
            <div class="sb-head-section">
              <div
                class="d-flex align-items-start justify-content-between mb-3"
              >
                <div class="display-picture-holder">
                  <img src="" alt="" />
                </div>
                <div class="notification-section position-relative">
                  <svg
                    width="426"
                    height="493"
                    viewBox="0 0 426 493"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 442.398H145.6C154.561 471.519 181.44 492.796 212.799 492.796C244.158 492.796 271.037 471.515 279.998 442.398H425.598L425.039 361.757L412.156 358.397C371.836 348.319 368.476 246.957 368.476 216.157C368.476 119.837 310.796 79.5174 267.116 63.2774C267.675 60.4766 267.675 57.6758 267.675 54.879C267.675 24.641 243.034 0 212.796 0C182.558 0 157.917 24.641 157.917 54.879C157.917 57.6798 157.917 60.4806 158.476 63.2774C114.796 80.0784 57.1156 119.836 57.1156 216.157C57.1156 246.958 53.7562 348.317 13.4356 358.397L0.556595 361.757L0 442.398ZM212.8 459.199C202.159 459.199 192.081 454.718 185.359 446.879H240.238C233.519 454.719 223.441 459.199 212.8 459.199V459.199ZM34.16 386.398C71.68 367.918 90.16 310.796 90.16 216.718C90.16 133.839 141.121 102.478 183.68 90.7178L204.399 85.1162L193.758 66.6362C192.078 63.2768 190.957 59.9174 190.957 55.9952C190.957 44.2332 200.477 34.7142 212.238 34.7142C224 34.7142 233.519 44.2337 233.519 55.9952C233.519 59.9171 232.398 63.2764 230.718 66.6362L220.077 85.1162L240.796 90.7178C283.355 102.48 334.316 134.398 334.316 216.718C334.316 310.796 353.355 367.918 390.316 386.398V408.796H34.1564L34.16 386.398Z"
                    />
                  </svg>
                  <div
                    class="position-absolute notification-count-section"
                  ></div>
                </div>
              </div>
              <p class="sb-user-name mb-1">Hannah Scott</p>
              <a href="#" class="sb-settings-btn">Settings</a>
            </div>
            <div class="sb-buttons-section">
              <div class="sb-expand-btn my-3"  @click="btnCollapse(1)">
                <div class="sb-btn-head d-flex align-items-center">
                  <div class="sb-btn-icon mr-3">
                    <img
                      src="../static/image/Calendar.png"
                      alt=""
                      class="planner"
                    />
                  </div>
                  Planner
                </div>
                <div class="sb-btn-content" id="sbContent1">
                  <div class="sb-btn">Daily</div>
                  <div class="sb-btn">Weekly</div>
                  <div class="sb-btn">Monthly</div>
                </div>
              </div>
              <div class="sb-expand-btn my-3"  @click="btnCollapse(2)">
                <div class="sb-btn-head d-flex align-items-center">
                  <div class="sb-btn-icon mr-3">
                    <img
                      src="../static/image/Call.png"
                      alt=""
                      class="meetings"
                    />
                  </div>
                  Meetings
                </div>
                <div class="sb-btn-content" id="sbContent2">
                  <div class="sb-btn">Daily</div>
                  <div class="sb-btn">Weekly</div>
                  <div class="sb-btn">Monthly</div>
                </div>
              </div>
              <div class="sb-expand-btn my-3"  @click="btnCollapse(3)">
                <div class="sb-btn-head d-flex align-items-center">
                  <div class="sb-btn-icon mr-3">
                    <img
                      src="../static/image/Football.png"
                      alt=""
                      class="teams-clubs"
                    />
                  </div>
                  Teams & Clubs
                </div>
                <div class="sb-btn-content" id="sbContent3">
                  <div class="sb-btn">Daily</div>
                  <div class="sb-btn">Weekly</div>
                  <div class="sb-btn">Monthly</div>
                </div>
              </div>
              <div class="sb-expand-btn my-3"  @click="btnCollapse(4)">
                <div class="sb-btn-head d-flex align-items-center">
                  <div class="sb-btn-icon mr-3">
                    <img
                      src="../static/image/Lot_of_book.png"
                      alt=""
                      class="study-room"
                    />
                  </div>
                  Study Room
                </div>
                <div class="sb-btn-content" id="sbContent4">
                  <div class="sb-btn">Daily</div>
                  <div class="sb-btn">Weekly</div>
                  <div class="sb-btn">Monthly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-10 dashboard-main-content jochi-components-light-bg p-5">
            <h2 class="jochi-headings mb-1">Step One:</h2>
            <h2 class="jochi-headings mb-1">Choose An Assignment</h2>
            <div><div class="row">
              <div class="col-4">
                  <div class="jochi-sub-components-light-bg drag-drop p-4 position-realtive">
                      <div class="assignment-tag-section d-flex align-items-center mb-2">
                          <div class="assignment-tag red mr-2">Urgent</div>
                          <div class="assignment-tag pink">AP French</div>
                      </div>
                      <div class="assignment-add-section text-center">
                          <h4 class="mb-0">French Oral Practice</h4>
                          <div class="text-center px-3">
                          <p>Practice for mock oral exam in class</p>
                          </div>
                      </div>
                      <div class="sub-task-section mb-3">
                          <h6>Sub-tasks</h6>
                          <div class="pl-2 d-flex align-items-center">
                          <input type="radio" class="mr-2" />
                          <label for="" class="mb-0">Study Vocab List</label>
                          </div>
                          <div class="pl-2 d-flex align-items-center">
                          <input type="radio" class="mr-2" />
                          <label for="" class="mb-0"
                              >Start typing to add subtasks</label
                          >
                          </div>
                      </div>
                      <div class="addition-material-section">
                          <h6 class="mb-1">Additional Material</h6>
                          <div
                          class="
                              d-flex
                              align-items-center
                              justify-content-between
                          "
                          >
                          <div class="col-8 py-0 pl-0 material-link">
                              Rubric: https://docs.google.com/document/...
                          </div>
                          <div class="col-4 material-date py-0 text-right">
                              12/04/22
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-4">
                  <div class="jochi-sub-components-light-bg drag-drop p-4 position-realtive">
                      <div class="assignment-tag-section d-flex align-items-center mb-2">
                          <div class="assignment-tag red mr-2">Urgent</div>
                          <div class="assignment-tag pink">AP French</div>
                      </div>
                      <div class="assignment-add-section text-center">
                          <h4 class="mb-0">French Oral Practice</h4>
                          <div class="text-center px-3">
                          <p>Practice for mock oral exam in class</p>
                          </div>
                      </div>
                      <div class="sub-task-section mb-3">
                          <h6>Sub-tasks</h6>
                          <div class="pl-2 d-flex align-items-center">
                          <input type="radio" class="mr-2" />
                          <label for="" class="mb-0">Study Vocab List</label>
                          </div>
                          <div class="pl-2 d-flex align-items-center">
                          <input type="radio" class="mr-2" />
                          <label for="" class="mb-0"
                              >Start typing to add subtasks</label
                          >
                          </div>
                      </div>
                      <div class="addition-material-section">
                          <h6 class="mb-1">Additional Material</h6>
                          <div
                          class="
                              d-flex
                              align-items-center
                              justify-content-between
                          "
                          >
                          <div class="col-8 py-0 pl-0 material-link">
                              Rubric: https://docs.google.com/document/...
                          </div>
                          <div class="col-4 material-date py-0 text-right">
                              12/04/22
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-4">
                  <div class="jochi-sub-components-light-bg drag-drop p-4 position-realtive">
                      <div class="assignment-tag-section d-flex align-items-center mb-2">
                          <div class="assignment-tag red mr-2">Urgent</div>
                          <div class="assignment-tag pink">AP French</div>
                      </div>
                      <div class="assignment-add-section text-center">
                          <h4 class="mb-0">French Oral Practice</h4>
                          <div class="text-center px-3">
                          <p>Practice for mock oral exam in class</p>
                          </div>
                      </div>
                      <div class="sub-task-section mb-3">
                          <h6>Sub-tasks</h6>
                          <div class="pl-2 d-flex align-items-center">
                          <input type="radio" class="mr-2" />
                          <label for="" class="mb-0">Study Vocab List</label>
                          </div>
                          <div class="pl-2 d-flex align-items-center">
                          <input type="radio" class="mr-2" />
                          <label for="" class="mb-0"
                              >Start typing to add subtasks</label
                          >
                          </div>
                      </div>
                      <div class="addition-material-section">
                          <h6 class="mb-1">Additional Material</h6>
                          <div
                          class="
                              d-flex
                              align-items-center
                              justify-content-between
                          "
                          >
                          <div class="col-8 py-0 pl-0 material-link">
                              Rubric: https://docs.google.com/document/...
                          </div>
                          <div class="col-4 material-date py-0 text-right">
                              12/04/22
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-4">
                  <div class="jochi-sub-components-light-bg drag-drop p-4 position-realtive">
                      <div class="assignment-tag-section d-flex align-items-center mb-2">
                          <div class="assignment-tag red mr-2">Urgent</div>
                          <div class="assignment-tag pink">AP French</div>
                      </div>
                      <div class="assignment-add-section text-center">
                          <h4 class="mb-0">French Oral Practice</h4>
                          <div class="text-center px-3">
                          <p>Practice for mock oral exam in class</p>
                          </div>
                      </div>
                      <div class="sub-task-section mb-3">
                          <h6>Sub-tasks</h6>
                          <div class="pl-2 d-flex align-items-center">
                          <input type="radio" class="mr-2" />
                          <label for="" class="mb-0">Study Vocab List</label>
                          </div>
                          <div class="pl-2 d-flex align-items-center">
                          <input type="radio" class="mr-2" />
                          <label for="" class="mb-0"
                              >Start typing to add subtasks</label
                          >
                          </div>
                      </div>
                      <div class="addition-material-section">
                          <h6 class="mb-1">Additional Material</h6>
                          <div
                          class="
                              d-flex
                              align-items-center
                              justify-content-between
                          "
                          >
                          <div class="col-8 py-0 pl-0 material-link">
                              Rubric: https://docs.google.com/document/...
                          </div>
                          <div class="col-4 material-date py-0 text-right">
                              12/04/22
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-4">
                  <div class="jochi-sub-components-light-bg drag-drop p-4 position-realtive">
                      <div class="assignment-tag-section d-flex align-items-center mb-2">
                          <div class="assignment-tag red mr-2">Urgent</div>
                          <div class="assignment-tag pink">AP French</div>
                      </div>
                      <div class="assignment-add-section text-center">
                          <h4 class="mb-0">French Oral Practice</h4>
                          <div class="text-center px-3">
                          <p>Practice for mock oral exam in class</p>
                          </div>
                      </div>
                      <div class="sub-task-section mb-3">
                          <h6>Sub-tasks</h6>
                          <div class="pl-2 d-flex align-items-center">
                          <input type="radio" class="mr-2" />
                          <label for="" class="mb-0">Study Vocab List</label>
                          </div>
                          <div class="pl-2 d-flex align-items-center">
                          <input type="radio" class="mr-2" />
                          <label for="" class="mb-0"
                              >Start typing to add subtasks</label
                          >
                          </div>
                      </div>
                      <div class="addition-material-section">
                          <h6 class="mb-1">Additional Material</h6>
                          <div
                          class="
                              d-flex
                              align-items-center
                              justify-content-between
                          "
                          >
                          <div class="col-8 py-0 pl-0 material-link">
                              Rubric: https://docs.google.com/document/...
                          </div>
                          <div class="col-4 material-date py-0 text-right">
                              12/04/22
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-4">
                  <div class="jochi-sub-components-light-bg drag-drop p-4 position-realtive">
                      <div class="assignment-tag-section d-flex align-items-center mb-2">
                          <div class="assignment-tag red mr-2">Urgent</div>
                          <div class="assignment-tag pink">AP French</div>
                      </div>
                      <div class="assignment-add-section text-center">
                          <h4 class="mb-0">French Oral Practice</h4>
                          <div class="text-center px-3">
                          <p>Practice for mock oral exam in class</p>
                          </div>
                      </div>
                      <div class="sub-task-section mb-3">
                          <h6>Sub-tasks</h6>
                          <div class="pl-2 d-flex align-items-center">
                          <input type="radio" class="mr-2" />
                          <label for="" class="mb-0">Study Vocab List</label>
                          </div>
                          <div class="pl-2 d-flex align-items-center">
                          <input type="radio" class="mr-2" />
                          <label for="" class="mb-0"
                              >Start typing to add subtasks</label
                          >
                          </div>
                      </div>
                      <div class="addition-material-section">
                          <h6 class="mb-1">Additional Material</h6>
                          <div
                          class="
                              d-flex
                              align-items-center
                              justify-content-between
                          "
                          >
                          <div class="col-8 py-0 pl-0 material-link">
                              Rubric: https://docs.google.com/document/...
                          </div>
                          <div class="col-4 material-date py-0 text-right">
                              12/04/22
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import StudentDashboard from "~/components/StudentDashboard.vue";
  import FullCalendar, { Calendar } from "@fullcalendar/vue";
  import timeGridPlugin from "@fullcalendar/timegrid";
  // import interact from 'interactjs';
  import interactionPlugin from "@fullcalendar/interaction";

  var eventList = [
    {
      id: 1,
      title: "Meeting",
      start: "2022-06-16T00:30:00",
      end: "2022-06-16T02:30:00",
    },
    {
      id: 2,
      title: "Meeting",
      start: "2022-06-16T12:30:00",
      end: "2022-06-16T14:30:00",
    },
    {
      id: 3,
      title: "Birthday Party",
      start: "2022-06-16T07:00:00",
      extendedProps: { status: "wholeleel" },
    },
  ];

  export default {
    name: "student-profile",
    components: {
      FullCalendar,
    },
    data() {
      return {
        calendarApi: Calendar,
        calendarOptions: {
          displayEventTime: false,
          customButtons: {
            prev: {
              click: this.goPrev.bind(this),
            },
            next: {
              click: this.goNext.bind(this),
            },
          },
          allDaySlot: true,
          minTime: 0,
          maxTime: 24,
          plugins: [timeGridPlugin, interactionPlugin],
          headerToolbar: {
            left: "prev",
            center: "title",
            right: "next",
          },
          initialView: "timeGridDay",
          unselectAuto: false,
          selectable: true,
          datesSet: this.handleMonthChange,
          events: eventList,
          eventClick: this.eventClicked,
          slotDuration: "00:15:00",
          slotEventOverlap: false,
          eventMaxStack: true, // for all non-TimeGrid views
          views: {
            timeGrid: {
              dayMaxEventRows: 4, // adjust to 6 only for timeGridWeek/timeGridDay
            },
          },
        },
      };
    },
    mounted() {
    //   this.calendarApi = this.$refs.fullCalendar.getApi();
    },
    head() {
      return {
        link: [{ rel: "stylesheet", href: "/css/style01.css" }],
      };
    },
    methods: {
      addAssignment() {
        // alert("inside add assignment");
        //  event.target.className += " myClass";
        this.$el.querySelector(".pending-assignment-popup").classList.add('active');
      },
      pendingPopupclose() {
        this.$el.querySelector(".pending-assignment-popup").classList.remove('active');
      },
      btnCollapse(id) {
        this.$el.querySelector("#sbContent"+id).classList.toggle('active');
      },
      addSubtask() {
        var x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        x.setAttribute("name", "subTask");
        x.setAttribute("class", "form-control mb-1");
        document.getElementById("subTaskAdd").appendChild(x);

      },
      goPrev() {
        this.calendarApi.prev(); // call a method on the Calendar object
        // this.GetDailyPlanner();
      },

      goNext() {
        this.calendarApi.next();
        // this.GetDailyPlanner();
      },
    },
  };
</script>

<style>
body {
  background-color: #ffffff !important;
}

.student-dashboard-main {
  min-height: 100vh;
  margin: 0;
}

.dashboard-main-content {
    margin: 12px 0;
}

.jochi-sub-components-light-bg {
  background-color: rgba(255, 255, 255, 0.45);
  -webkit-box-shadow: 0px 0px 32px -4px rgb(0 1 0 / 9%);
  box-shadow: 0px 0px 32px -4px rgb(0 1 0 / 9%);
  border-radius: 22px;
}

.jochi-headings {
  color: #ff6d6d;
  font-weight: 700;
}

.sd-sidebar {
  height: 100%;
}
.sd-sidebar,
.dashboard-main-content {
  min-height: calc(100vh - 1.8rem);
}

.sb-btn-icon {
  width: 30px;
}

.sb-btn-icon img {
  width: 100%;
}

.sb-btn-head {
  font-size: 17px;
  font-weight: 500;
}

.sb-expand-btn {
  cursor: pointer;
}

.sb-btn-content {
  display: none;
  padding-left: 4rem;
  font-size: 14px;
}

.sb-btn-content.active {
  display: block;
}

.sb-btn.active {
  opacity: 0.6;
}

.display-picture-holder {
  width: 80px;
  height: 80px;
  background-color: #ffffff;
  border-radius: 50%;
  overflow: hidden;
}

.sb-user-name {
  font-size: 26px;
  color: #ff6d6d;
  font-weight: 700;
}

.sb-settings-btn {
  color: #b4b4b4;
  font-size: 13px;
  font-weight: 500;
}

.add-assignment-btn {
  font-size: 12px;
  background-color: #000000;
  color: #ffffff;
  border-radius: 10px;
}

.add-assignment-btn:hover {
  font-size: 12px;
  background-color: #000000;
  color: #ffffff;
  border-radius: 10px;
}

.notification-section {
  cursor: pointer;
}

.notification-section svg {
  fill: #b4b4b4;
  width: 25px;
  height: 25px;
}

.notification-count-section {
  background-color: #ea2626;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  top: 3px;
  right: 0;
}

.assignment-tag {
  font-size: 10px;
  padding: 2px 10px;
  border-radius: 18px;
  color: #ffffff;
}

.assignment-tag.red {
  background-color: #ea2626;
}

.assignment-tag.pink {
  background-color: #fb3e80;
}

.assignment-add-section h4 {
  color: #000000;
  font-weight: 700;
}

.assignment-add-section p {
  color: #b4b4b4;
  font-weight: 600;
  line-height: 16px;
}

.sub-task-section h6,
.addition-material-section h6 {
  color: #e48194;
}

.sub-task-section label {
  font-size: 12px;
}

.material-link {
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.material-date {
  font-size: 10px;
}

/* .addition-material-section h6 {
  color: #000000;
} */

.form-control {
  background-color: #b4b4b4;
  border-block-color: #b4b4b4;
  color: #ffffff;
}

.upload-file-section .form-control {
  height: 18px;
  font-size: 8px;
  padding: 0;
}

.form-control::placeholder {
  color: #ffffff;
}

.completed-assignments h4 {
  font-weight: 700;
}

.completed-assignments h4.blue {
  color: #9d00df;
}

.completed-assignments h4.green {
  color: #1d9c00;
}

.completed-assignments p {
  color: #c7c1c1;
  font-size: 12px;
}

.add-person-section {
  top: -5px;
  display: flex;
  right: 25px;
}

.ap-img-add,
.ap-img-section {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.ap-img-add {
  margin-left: -15px;
  cursor: pointer;
}

.ap-img-section {
  background-color: #ffffff;
}

.fc-theme-standard td,
.fc-theme-standard th {
  border: none;
}

.fc-button.fc-button-primary {
  display: none;
}

.fc-theme-standard .fc-scrollgrid {
  border: none;
}

.fc .fc-daygrid-day.fc-day-today,
.fc .fc-timegrid-col.fc-day-today {
  background-color: transparent;
}

.fc .fc-timegrid-slot-minor {
  border-top: none;
}

/* .fc-media-screen .fc-timegrid-cols {
  position: unset;
} */

.fc-direction-ltr .fc-timegrid-slot-label-frame {
  text-align: center;
  background-color: #c6c5c5;
  color: #ffffff;
  border-radius: 7px;
  font-size: 12px;
  position: relative;
}

.fc-direction-ltr .fc-timegrid-slot-label-frame::after {
  content: "";
  background-color: #c6c5c5;
  width: 50vw;
  height: 1px;
  position: absolute;
  top: 8px;
}

.fc-scrollgrid-sync-table,
.fc-scrollgrid-section.fc-scrollgrid-section-header {
  display: none;
}

.fc .fc-cell-shaded,
.fc .fc-day-disabled {
  background: none;
}

.fc-toolbar-chunk .fc-toolbar-title {
  position: absolute;
  left: 62px;
  top: 78px;
  font-size: 14px;
}

.fc-view-harness.fc-view-harness-active {
  height: 75vh !important;
  margin-top: 20px;
}

.fc-scroller.fc-scroller-liquid-absolute::-webkit-scrollbar {
  width: 3px;
}

.fc-scroller.fc-scroller-liquid-absolute::-webkit-scrollbar-track {
  background: none;
}

.fc-scroller.fc-scroller-liquid-absolute::-webkit-scrollbar-thumb {
  background: #ff6d6d;
}

.fc-timegrid-event-harness > .fc-timegrid-event {
  left: 15px;
}

.fc-v-event {
  background-color: #ffffff;
  -webkit-box-shadow: 0px 0px 32px -4px rgb(0 1 0 / 15%) !important;
  box-shadow: 0px 0px 32px -4px rgb(0 1 0 / 15%) !important;
  border-radius: 22px;
  border: none;
  padding: 15px 20px;
}

.fc-v-event .fc-event-main {
  color: #000000;
}

.jochi-components-light-bg.pending-assignment-popup {
  top: 12px;
  bottom: 12px;
  left: 12px;
  right: 12px;
  background-color: #ffffff;
  transform: scale(0);
  transition: transform 1s ease;
}

.jochi-components-light-bg.pending-assignment-popup.active {
  transform: scale(1);
  transition: transform 1s ease;
}

.add-sub-task-btn {
  width: 20px;
  height: 20px;
  background-color: #ea2626;
  color: #ffffff;
  border-radius: 50%;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pending-popup-close-btn {
  color: #ea2626;
  font-size: 32px;
  font-weight: 900;
}

</style>
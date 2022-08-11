<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div class="main-section">
      <!-- Weekly Calander -->
      <section id="Weekly-Calander" class="">
        <!-- <div class="element-section container-fluid">
            
            <div class="row mt-2">
              <div class="col-12 p-0">
                <div class="planner-week p-4 pr-5">
                  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                </div>
              </div>
            </div>
          </div> -->
        <!-- Modal -->
        <!-- <div
            class="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-dialog-centered add-assmt"
              role="document"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    {{ isAssignmentEdit ? "Edit" : "Add" }} Assignment
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
                <div class="modal-body no-overflow px-4">
                  <form>
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label"
                        >Subject<em>*</em></label
                      >
                      <select
                        class="form-control"
                        tabindex=""
                        v-model="subject"
                        :class="{
                          'is-invalid': submitted && $v.subject.$error,
                        }"
                      >
                        <option value="">Select subject</option>
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
                        v-if="submitted && $v.subject.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.subject.required"
                          >This field is required</span
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="message-text" class="col-form-label"
                        >Task<em>*</em></label
                      >
                      <textarea
                        class="form-control"
                        id="message-text"
                        v-model="task"
                        maxlength="125"
                        placeholder="Enter task description"
                        :class="{
                          'is-invalid': submitted && $v.task.$error,
                        }"
                      ></textarea>
                      <div
                        v-if="submitted && $v.task.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.task.required"
                          >This field is required</span
                        >
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 ml-auto">
                        <div class="form-group mb-0">
                          <label for="recipient-name" class="col-form-label"
                            >Priority<em>*</em></label
                          >
                          <div class="dropdown input-icon-area">
                            <button
                              id="dLabel"
                              class="dropdown-select form-control"
                              type="button"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <span class="caret">
                                {{
                                  priorityVal ? priorityVal : "Select priority"
                                }}
                              </span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dLabel">
                              <li class="item">
                                <div class="low-color"></div>
                                Low
                              </li>
                              <li class="item">
                                <div class="medium-color"></div>
                                Medium
                              </li>
                              <li class="item">
                                <div class="high-color"></div>
                                High
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div
                          v-if="
                            submitted &&
                            priorityVal != '1' &&
                            priorityVal != '2' &&
                            priorityVal != '3'
                          "
                        >
                          <span
                            v-if="
                              priorityVal != '1' &&
                              priorityVal != '2' &&
                              priorityVal != '3'
                            "
                            class="required-button"
                            >This field is required</span
                          >
                        </div>
                      </div>
                      <div class="col-md-6 ml-auto">
                        <div class="form-group">
                          <label for="recipient-name" class="col-form-label"
                            >Date<em>*</em></label
                          >
                          <date-picker
                            class="form-control"
                            placeholder="MM/DD/YYYY"
                            format="MM/dd/yyyy"
                            v-model="dateValue"
                            :class="{
                              'is-invalid': submitted && $v.dateValue.$error,
                            }"
                            :disabled-dates="disabledDates"
                          />
                          <div
                            v-if="submitted && $v.dateValue.$error"
                            class="invalid-feedback"
                          >
                            <span v-if="!$v.dateValue.required"
                              >This field is required</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <div class="form-group">
                          <label for="recipient-name" class="col-form-label"
                            >Time<em>*</em></label
                          >
                          <div>
                            <vue-timepicker
                              format="hh:mm A"
                              v-model="timeValue"
                              name="timeValue"
                              class="show-cursor"
                              :class="{
                                'is-invalid': submitted && $v.timeValue.$error,
                              }"
                            ></vue-timepicker>
                            <div
                              v-if="submitted && $v.timeValue.$error"
                              class="invalid-feedback"
                            >
                              <span v-if="!$v.timeValue.required"
                                >This field is required</span
                              >
                            </div>
                          </div> </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-color-close"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="btn btn-color-save"
                    :disabled="processing"
                    @click="
                      isAssignmentEdit ? UpdateAssignment() : AddAssignment()
                    "
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal fade"
            id="MeetingModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Meeting Details
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
                <div class="modal-body px-4">
                  <table class="w-100 table-modal">
                    <tr>
                      <td class="tmodal-data text-nowrap">Meeting With</td>
                      <td class="tmodal-data">
                        <p class="mb-0 tdata-overflow">
                          <span class="px-2">:</span>
                          <span>
                            {{ popTitle }}
                          </span>
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td class="tmodal-data">Meeting Type</td>
                      <td class="tmodal-data">
                        <span class="px-2">:</span>
                        <span>
                          {{ popMeeting }}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td class="tmodal-data">Date</td>
                      <td class="tmodal-data">
                        <span class="px-2">:</span>
                        {{ popDate }}
                      </td>
                    </tr>

                    <tr>
                      <td class="tmodal-data">Time</td>
                      <td class="tmodal-data">
                        <span class="px-2">:</span>
                        {{ popTime }}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div> -->
        <!-- edit modal -->

        <div
          class="
            custom-margin-for-main-section custom-full-height
            d-flex
            jochi-main-content-container
          "
        >
          <div class="row">
            <div class="col-12 position-realtive">
              <div
                class="
                  dashboard-main-content
                  jochi-components-light-bg
                  position-relative
                "
              >
                <div class="planner-week p-4 px-3 px-sm-5">
                  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                </div>

                <div
                  class="
                    planner-action-btns
                    d-flex
                    align-items-center
                    position-absolute
                  "
                >
                  <button
                    class="pa-btn btn filter-btn mr-3"
                    @click="filterPlanner()"
                    id="filterPlanner"
                  >
                    Filter Planner
                  </button>
                  <button
                    class="pa-btn assignment-f-btn btn"
                    @click="assignmentPlanner()"
                    id="assignmentPlanner"
                  >
                    Assignment Planner
                  </button>
                </div>
                <div
                  class="
                    col-10 col-md-11 col-lg-8
                    p-0
                    position-absolute
                    assignment-planner-section
                  "
                  id="assignPlanSection"
                >
                  <div class="position-realtive h-100">
                    <div
                      class="
                        dashboard-main-content
                        jochi-components-light-bg
                        py-4
                        h-100
                        d-flex
                        flex-column
                      "
                    >
                      <div
                        class="
                          d-flex
                          justify-content-between
                          align-items-center
                          px-5
                          pb-3
                        "
                      >
                        <h3 class="color-primary font-semi-bold">Pending</h3>
                        <button class="btn btn-dark py-1 px-3">
                          Add Assignment
                        </button>
                      </div>
                      <div
                        class="
                          d-flex
                          flex-column
                          h-40
                          flex-fill
                          hidden-scroll
                          py-4
                          px-5
                        "
                      >
                        <div>
                          <div class="row">
                            <div class="col-6 px-0">
                              <div
                                class="
                                  jochi-sub-components-light-bg
                                  drag-drop
                                  p-4
                                  position-realtive
                                  h-100
                                "
                                @click="addAssignment()"
                              >
                                <div
                                  class="
                                    assignment-tag-section
                                    d-flex
                                    align-items-center
                                    mb-2
                                  "
                                >
                                  <div class="assignment-tag red mr-2">
                                    Urgent
                                  </div>
                                  <div class="assignment-tag pink">
                                    AP French
                                  </div>
                                </div>
                                <div class="assignment-add-section">
                                  <h4 class="mb-0 text-center">
                                    French Oral Practice
                                  </h4>
                                  <div class="text-center px-3">
                                    <p>Practice for mock oral exam in class</p>
                                  </div>
                                </div>
                                <div class="sub-task-section mb-3">
                                  <h6>Sub-tasks</h6>
                                  <div
                                    class="
                                      pl-2
                                      d-flex
                                      align-items-center
                                      color-secondary
                                    "
                                  >
                                    <input type="radio" class="mr-2" />
                                    <label for="" class="mb-0"
                                      >Study Vocab List</label
                                    >
                                  </div>
                                  <div
                                    class="
                                      pl-2
                                      d-flex
                                      align-items-center
                                      color-secondary
                                    "
                                  >
                                    <input type="radio" class="mr-2" />
                                    <label for="" class="mb-0"
                                      >Start typing to add subtasks</label
                                    >
                                  </div>
                                </div>
                                <div class="addition-material-section">
                                  <h6 class="mb-1 font-medium">
                                    Additional Material
                                  </h6>
                                  <div
                                    class="
                                      d-flex
                                      align-items-center
                                      justify-content-between
                                    "
                                  >
                                    <div class="col-8 py-0 pl-0 material-link">
                                      <span class="color-secondary"
                                        >Rubric:
                                        https://docs.google.com/document/...</span
                                      >
                                    </div>
                                    <div
                                      class="
                                        col-4
                                        material-date
                                        py-0
                                        text-right
                                      "
                                    >
                                      12/04/22
                                    </div>
                                  </div>
                                </div>
                                <div class="upload-file-section mt-2">
                                  <div class="d-flex align-items-center">
                                    <div class="col-2 p-0">
                                      <select
                                        class="form-select form-control"
                                        aria-label="Default select example"
                                      >
                                        <option selected>Type</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                      </select>
                                    </div>
                                    <div class="col-8 py-0 px-1">
                                      <input
                                        type="text"
                                        class="form-control px-2"
                                        placeholder="Paste Link or Upload File"
                                      />
                                    </div>
                                    <div class="col-2 p-0">
                                      <input
                                        type="submit"
                                        class="form-control"
                                        value="Add"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  class="
                                    add-person-section
                                    position-absolute
                                    top-0
                                  "
                                >
                                  <div
                                    class="ap-img-section mr--3 shadow-sm"
                                  ></div>
                                  <div
                                    class="ap-img-section mr--3 shadow-sm"
                                  ></div>
                                  <div
                                    class="ap-img-section mr--3 shadow-sm"
                                  ></div>
                                  <div class="ap-img-section shadow-sm"></div>

                                  <!-- <div class="ap-img-add">
                                      <img src="~/static/image/add-btn.png" alt="" />
                                    </div> -->
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="d-flex flex-column px-5 pt-3">
                        <h3 class="color-primary font-semi-bold">Completed</h3>
                        <span class="drop color-secondary text-16"
                          >Drag and drop your assignment here when it is
                          completed</span
                        >
                        <div>
                          <div class="row mt-1">
                            <div class="col-6">
                              <div
                                class="
                                  jochi-sub-components-light-bg
                                  py-4
                                  px-2
                                  completed-assignments
                                  text-center
                                "
                              >
                                <h4 class="mb-0 blue">Art History Reading</h4>
                                <p class="mb-0">Read Chapters #1 & #2</p>
                              </div>
                            </div>
                            <div class="col-6">
                              <div
                                class="
                                  jochi-sub-components-light-bg
                                  py-4
                                  px-2
                                  completed-assignments
                                  text-center
                                "
                              >
                                <h4 class="mb-0 green">AP Calculus Problem</h4>
                                <p class="mb-0">Homework #5</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="
                        jochi-components-light-bg
                        p-4
                        pl-5
                        position-absolute
                        pending-assignment-popup
                      "
                    >
                      <div
                        class="
                          d-flex
                          justify-content-between
                          align-items-center
                        "
                      >
                        <h1>Test</h1>
                        <button
                          class="btn pending-popup-close-btn"
                          @click="pendingPopupclose()"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- <div
          class="
            planner-action-btns
            d-flex
            align-items-center
            position-absolute
          "
        >
          <button
            class="pa-btn btn filter-btn mr-3"
            @click="filterPlanner()"
            id="filterPlanner"
          >
            Filter Planner
          </button>
          <button
            class="pa-btn assignment-f-btn btn"
            @click="assignmentPlanner()"
            id="assignmentPlanner"
          >
            Assignment Planner
          </button>
        </div>
        <div
          class="
            col-lg-8 col-md-12
            p-0
            position-absolute
            assignment-planner-section
          "
          id="assignPlanSection"
        >
          <div class="position-realtive h-100">
            <div
              class="dashboard-main-content jochi-components-light-bg p-4 pl-5"
            >
              <div class="d-flex justify-content-between align-items-center">
                <h3 class="jochi-headings">Pending</h3>
                <button class="add-assignment-btn btn">Add Assignment</button>
              </div>
              <div class="col-6 px-0">
                <div
                  class="
                    jochi-sub-components-light-bg
                    drag-drop
                    p-4
                    position-realtive
                  "
                  @click="addAssignment()"
                >
                  <div
                    class="
                      assignment-tag-section
                      d-flex
                      align-items-center
                      mb-2
                    "
                  >
                    <div class="assignment-tag red mr-2">Urgent</div>
                    <div class="assignment-tag pink">AP French</div>
                  </div>
                  <div class="assignment-add-section">
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
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div class="col-8 py-0 pl-0 material-link">
                        Rubric: https://docs.google.com/document/...
                      </div>
                      <div class="col-4 material-date py-0 text-right">
                        12/04/22
                      </div>
                    </div>
                  </div>
                  <div class="upload-file-section mt-2">
                    <div class="d-flex align-items-center">
                      <div class="col-2 p-0">
                        <select
                          class="form-select form-control"
                          aria-label="Default select example"
                        >
                          <option selected>Type</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div class="col-8 py-0 px-1">
                        <input
                          type="text"
                          class="form-control px-2"
                          placeholder="Paste Link or Upload File"
                        />
                      </div>
                      <div class="col-2 p-0">
                        <input type="submit" class="form-control" value="Add" />
                      </div>
                    </div>
                  </div>
                  <div class="add-person-section position-absolute">
                    <div class="ap-img-section"></div>
                    <div class="ap-img-add">
                      <img src="../../static/image/add-btn.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <h3 class="jochi-headings">Completed</h3>
              <div class="row mt-1">
                <div class="col-6">
                  <div
                    class="
                      jochi-sub-components-light-bg
                      py-4
                      px-2
                      completed-assignments
                      text-center
                    "
                  >
                    <h4 class="mb-0 blue">Art History Reading</h4>
                    <p class="mb-0">Read Chapters #1 & #2</p>
                  </div>
                </div>
                <div class="col-6">
                  <div
                    class="
                      jochi-sub-components-light-bg
                      py-4
                      px-2
                      completed-assignments
                      text-center
                    "
                  >
                    <h4 class="mb-0 green">AP Calculus Problem</h4>
                    <p class="mb-0">Homework #5</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="
                jochi-components-light-bg
                p-4
                pl-5
                position-absolute
                pending-assignment-popup
              "
            >
              <div class="d-flex justify-content-between align-items-center">
                <h1>Test</h1>
                <button
                  class="btn pending-popup-close-btn"
                  @click="pendingPopupclose()"
                >
                  x
                </button>
              </div>
            </div>
          </div>
        </div> -->
    </div>

    <!-- filter modal -->
    <div
      class="modal fade"
      id="filterModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Choose Filter
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
          <div class="modal-body px-4">
            <select
              class="form-control"
              tabindex=""
              v-model="filterType"
              :class="{
                'is-invalid': submitted && $v.Subject.$error,
              }"
            >
              <option value="">Select Filter</option>

              <option>Meeting</option>
              <option>Meeting</option>
              <option>Meeting</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <!-- filter modal end -->

    <!-- End Weekly Calander -->
  </div>
</template>
<script>
import { required, requiredIf } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";
import FullCalendar, { Calendar } from "@fullcalendar/vue";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
var fromDate = "";
var endDate = "";
var eventList = [];
var count;
export default {
  name: "PlannerWeek",
  components: {
    FullCalendar,
    lottie,
    VueTimepicker,
  },
  data() {
    return {
      isAssignmentEdit: false,
      date_today: new Date(),
      disabledDates: {
        to: new Date(),
      },
      submitted: false,
      processing: false,
      subject: "",
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
      calendarApi: Calendar,
      calendarOptions: {
        displayEventTime: false,
        plugins: [timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev",
          center: "title",
          right: "next",
        },
        customButtons: {
          prev: {
            icon: "chevron-left",
            click: this.goPrev.bind(this),
          },
          next: {
            icon: "chevron-right",
            click: this.goNext.bind(this),
          },
        },
        initialView: "timeGridWeek",
        unselectAuto: false,
        timeZone: "local",
        selectable: true,
        events: eventList,
        eventClick: this.eventClicked,
        datesSet: this.handleMonthChange,
        slotDuration: "00:15:00",
        slotEventOverlap: false,
        eventMaxStack: true, // for all non-TimeGrid views
        views: {
          timeGrid: {
            dayMaxEventRows: 4, // adjust to 6 only for timeGridWeek/timeGridDay
          },
        },
      },
      filterType: "",
    };
  },

  mounted() {
    this.disabledDates.to = new Date(
      this.date_today.getFullYear(),
      this.date_today.getMonth(),
      this.date_today.getDate()
    );
    this.getSubjectsList();

    this.calendarApi = this.$refs.fullCalendar.getApi();
    this.GetWeeklyPlanner();
    //priority dropdown
    const _this = this;
    $(".dropdown-menu li").on("click", function () {
      var getValue = $(this).text();
      $(".dropdown-select").text(getValue);
      _this.filterOption(getValue);
    });

    //date picker
    var today = new Date();
    var future = new Date();
    future.setDate(future.getDate() + 30);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var today = dd + "/" + mm + "/" + yyyy;

    $(function () {
      fromDate = "";
      endDate = "";
      $('input[name="daterange"]').daterangepicker({
        autoUpdateInput: false,
        singleDatePicker: true,
        minDate: today,
        maxDate: future,
        opens: "left",
        locale: {
          format: "DD-MM-YYYY",
          cancelLabel: "Clear",
        },
      });

      $('input[name="daterange"]').on(
        "apply.daterangepicker",
        function (ev, picker) {
          $(this).val(picker.startDate.format("MM/DD/YYYY"));
          fromDate = picker.startDate.format("YYYY-MM-DD");
          endDate = picker.endDate.format("YYYY-MM-DD");
        }
      );

      $('input[name="daterange"]').on(
        "cancel.daterangepicker",
        function (ev, picker) {
          $(this).val("");
        }
      );
    });
  },
  validations: {
    subject: { required },
    task: { required },
    dateValue: { required },
    timeValue: { required },
  },
  computed: {
    ...mapState("plannerWeek", {
      plannerList: (state) => state.plannerList,
      assignment: (state) => state.assignment,
      meetingList: (state) => state.meetingList,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      subjectsData: (state) => state.subjectsData,
    }),
  },
  methods: {
    assignmentPlanner() {
      this.$el.querySelector("#assignmentPlanner").classList.toggle("active");
      this.$el.querySelector("#assignPlanSection").classList.toggle("active");
    },
    ...mapActions("plannerWeek", {
      getWeeklyPlanner: "getWeeklyPlanner",
      addAssignment: "addAssignment",
      updateAssignment: "updateAssignment",
      getAssignment: "getAssignment",
      getSubjectsList: "getSubjectsList",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async GetSubjectList() {
      await this.getSubjectsList({});
    },

    async GetWeeklyPlanner() {
      eventList = [];
      this.loading = true;
      const format = "YYYY-MM-DD";
      this.calendarDate = moment(this.calendarApi.view.activeStart).format(
        format
      );

      await this.getWeeklyPlanner({
        user_id: localStorage.getItem("id"),
        type: "Weekly",
        date: this.calendarDate,
      });
      this.meetingDetails = [];
      this.plannerList.forEach((element) => {
        var plannerObj = {};
        var title = element.subject;
        if (element.priority == "1") {
          var color = "#EF382E";
        } else if (element.priority == "2") {
          var color = "#00CCA0";
        } else {
          var color = "#F6D73C";
        }
        var dateMeeting = element.due_date;
        var tmeMeeting = this.formatAMPM(element.due_time);
        var start = dateMeeting + "T" + tmeMeeting;
        var id = element.id;
        plannerObj["title"] = title;
        plannerObj["color"] = color;
        plannerObj["start"] = start;
        plannerObj["id"] = id;
        eventList.push(plannerObj);
      });
      this.meetingList.forEach((element) => {
        var meetingobj = {};
        var listobj = {};
        if (element.title != null) {
          var title = "Meeting with " + element.title;
        }
        if (element.club_name != null) {
          var title = element.club_name + " Meeting";
        }
        var meeting = element.meeting_type;
        if (meeting == "Peer") {
          var color = "#64B5FC";
        } else if (meeting == "Club") {
          var color = "#07BEB8";
        } else if (meeting == "Teacher") {
          var color = "#073BBF";
        }
        var dateMeeting = element.date;
        var timeValNum = element.start_time;
        var tmeMeeting = this.formatAMPM(element.start_time);
        var start = dateMeeting + "T" + tmeMeeting;
        meetingobj["title"] = title;
        meetingobj["color"] = color;
        meetingobj["start"] = start;
        meetingobj["id"] = element.id;
        meetingobj["groupId"] = "Meeting";

        listobj["title"] = title;
        listobj["meeting"] = meeting;
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.meetingDetails.push(listobj);
        eventList.push(meetingobj);
      });

      this.calendarOptions.events = eventList;
      this.loading = false;
    },

    async AddAssignment() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.processing = true;

      const df = moment(this.dateValue).format("YYYY-MM-DD");
      this.loading = true;
      await this.addAssignment({
        user_id: localStorage.getItem("id"),
        task: this.task,
        subject: this.subject?.id,
        due_time: this.timeValue,
        due_date: df,
        priority: this.priorityVal,
      });
      this.loading = false;
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.resetAssignment();
        this.GetWeeklyPlanner();
        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.submitted = false;
      this.processing = false;
    },
    async openModal() {
      this.isAssignmentEdit = false;
      $("#exampleModalCenter").modal({ backdrop: true });
    },
    async resetAssignment() {
      this.submitted = false;
      this.value = "";
      this.dateValue = "";
      fromDate = "";
      $(".dropdown-select").text("Select priority");
      this.priorityVal = "";
      this.timeValue = null;
      this.subject = "";
      this.task = "";
      this.taskValue = "";
      this.timeList = "";
      this.timeValue = "";
      this.subjectValue = "";
      let clearTimeBtn = document.getElementsByClassName("clear-btn")[0];
      clearTimeBtn?.click();
    },

    async GetAssignment(value) {
      if (value) {
        await this.getAssignment({
          id: value,
        });
      }
      this.idNum = this.assignment.id;
      let subject = this.subjectsData.find(
        (e) => e.subject_name == this.assignment.subject
      );
      this.subject = {
        id: subject.id,
        text: subject.subject_name,
      };
      this.task = this.assignment.task;
      let dateSplit = this.assignment.due_date.split("-");
      let date = new Date(dateSplit[0], Number(dateSplit[1] - 1), dateSplit[2]);
      this.dateValue = date;
      if (this.assignment.priority == "1") {
        this.priorityVal = "High";
      } else if (this.assignment.priority == "2") {
        this.priorityVal = "Medium";
      } else {
        this.priorityVal = "Low";
      }
      $(".dropdown-select").text(this.priorityVal);
      this.timeValue = this.assignment.due_time;
      // $("#daterange").data("daterangepicker").setStartDate(this.dateListValue);
      // $("#daterange").data("daterangepicker").setEndDate(this.dateListValue);
    },
    async UpdateAssignment() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.processing = true;
      this.loading = true;
      const dfE = moment(this.dateValue).format("YYYY-MM-DD");
      if (this.priorityVal == "High") {
        this.priorityVal = "1";
      } else if (this.priorityVal == "Medium") {
        this.priorityVal = "2";
      } else if (this.priorityVal == "Low") {
        this.priorityVal = "3";
      }

      await this.updateAssignment({
        user_id: localStorage.getItem("id"),
        assignment_id: this.idNum,
        task: this.task,
        subject: this.subject?.id,
        due_time: this.timeValue,
        due_date: dfE,
        priority: this.priorityVal
          ? this.priorityVal
          : this.assignment.priority,
      });
      this.loading = false;
      if (this.successMessage != "") {
        this.resetAssignment();
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });

        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
        this.resetAssignment();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.GetWeeklyPlanner();
      this.submitted = false;
      this.processing = false;
    },
    filterOption(val) {
      var high = /High/g;
      var med = /Medium/g;
      var low = /Low/g;
      if (high.test(val)) {
        this.priorityVal = "1";
      } else if (med.test(val)) {
        this.priorityVal = "2";
      } else if (low.test(val)) {
        this.priorityVal = "3";
      }
    },
    formatDate(input) {
      var date = new Date(input);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }

      // return year+'-'+month+'-'+dt;
      return year + "-" + month + "-" + dt;
    },
    formatDateVal(input) {
      var date = new Date(input);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }

      return dt + "/" + month + "/" + year;

      // return dt+'/'+month+'/'+year
    },
    formatAMPM(input) {
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
    },
    eventClicked(info) {
      var idVal = info.event;
      var idValue = idVal.id;
      var groupId = idVal.groupId;
      if (!groupId) {
        this.isAssignmentEdit = true;
        $("#exampleModalCenter").modal("show");
        this.GetAssignment(idValue);
      } else {
        $("#MeetingModal").modal("show");
        var titleVal = info.event.title;
        var meetingVal = info.event.backgroundColor;
        var dateNum = info.event.start;
        let time = this.meetingList.find((e) => e.id == idVal.id).start_time;
        this.popupmodal(titleVal, meetingVal, dateNum, time);
      }
    },
    popupmodal(titleData, meetingData, dateData, time) {
      var timestandard = new Date(dateData).toLocaleString();
      if (meetingData == "#64B5FC") {
        var color = "Peer";
      } else if (meetingData == "#07BEB8") {
        var color = "Club";
      } else if (meetingData == "#073BBF") {
        var color = "Teacher";
      }
      var dateVal = timestandard.split(",")[0];
      let tempDate = dateVal.split("/");
      var dtCheck = new Date(tempDate[2], tempDate[0] - 1, tempDate[1]);
      var timeVal = timestandard.split(",")[1];
      var timevalue = timeVal.split(" ")[1];
      var timeAmPm = timeVal.split(" ")[2];
      var times = timevalue.split(":")[0];
      var timeNum = timevalue.split(":")[1];
      var timeconcat = times + ":" + timeNum + " " + timeAmPm;

      this.popTitle =
        color == "Club"
          ? titleData
          : titleData.substring("Meeting with ".length);
      this.popMeeting = color;
      this.popMeeting = color;
      this.popTime = time;
      this.popDate = this.showDateInWords(dtCheck);
    },
    showDateInWords(dateVal) {
      var date = moment(dateVal);
      var dateFormat =
        date.format("dddd") +
        ", " +
        date.format("D") +
        " " +
        date.format("MMMM");
      return dateFormat;
    },
    formatDate(input) {
      var datePart = input.match(/\d+/g),
        year = datePart[2], // get only two digits
        month = datePart[0],
        day = datePart[1];
      day = day < 10 ? "0" + day : day;
      return month + "-" + day + "-" + year;
    },
    handleMonthChange(dateInfo) {
      var dateStr = dateInfo.startStr;
      var date = new Date(dateStr);
      date.setDate(date.getDate() + 3);
      var dateval = new Date(date),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      this.calendarDate = [date.getFullYear(), mnth, day].join("-");
    },
    goPrev() {
      this.calendarApi.prev(); // call a method on the Calendar object
      this.GetWeeklyPlanner();
    },

    goNext() {
      this.calendarApi.next();
      this.GetWeeklyPlanner();
    },
    filterPlanner() {
      $("#filterModal").modal("show");
    },
  },
};
</script>

<!-- <style>
.material-link {
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.material-date {
  font-size: 10px;
}

.addition-material-section h6 {
  color: #000000;
}

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

.upload-file-section .form-control::placeholder {
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

.fc .fc-scrollgrid {
    border-radius: 12px;
    overflow: hidden;
    border: none;
}

.fc-timegrid-body {
  padding-top: 25px;
}

.fc-theme-standard .fc-popover {
  background: none;
  border: none;
  box-shadow: none;
}

.fc .fc-more-popover .fc-popover-header {
  background: #ff6f69;
  color: #ffffff;
  border-radius: 12px 12px 0 0;
  font-weight: 700;
}

.fc .fc-more-popover .fc-popover-body {
  background: none;
  padding: 0;
}

.fc .fc-more-popover .fc-popover-body .fc-timegrid-event {
  border-radius: 0 0 12px 12px;
}

.fc-toolbar-chunk .fc-toolbar-title {
    position: absolute;
    font-size: 20px;
    color: #000000;
    font-weight: 700;
    z-index: 999;
}

.fc-toolbar-chunk button {
    display: none !important;
}

/* .fc .fc-button .fc-icon {
    color: #a28cf6;
    font-size: 1em;
    line-height: 1em;
    margin: 0;
}

.fc-toolbar-chunk .fc-next-button.fc-button,
.fc-toolbar-chunk .fc-prev-button.fc-button {
    background: none;
    border: 1px solid #b4b4b4;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fc-toolbar-chunk .fc-next-button.fc-button {
    position: relative;
    top: 1.065rem;
}

.fc .fc-day-disabled {
    background: none;
}

.fc .fc-daygrid-day-number {
    color: #8c8bac !important;
    font-weight: 600;
}

.fc-theme-standard th {
    border-right: none;
    border-left: none;
    background-color: #f0deeb;
    padding: 5px;
}

.fc-theme-standard th .fc-col-header-cell-cushion {
    color: #a995ef;
}

.fc-theme-standard td {
  border-color: #e9d7ee;
} */

.fc-theme-standard td,
.fc-theme-standard th {
  border: none;
}

/* .fc-button.fc-button-primary {
  display: none;
}

.fc-theme-standard .fc-scrollgrid {
  border: none;
} */

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
  width: 100vw;
  height: 1px;
  position: absolute;
  top: 8px;
}

/* .fc-scrollgrid-sync-table{
  display: none;
} */

.fc .fc-cell-shaded,
.fc .fc-day-disabled {
  background: none;
}

.fc-toolbar-chunk .fc-toolbar-title {
  position: absolute;
  left: 42%;
  right: 42%;
  top: -5px;
  font-size: 14px;
  color: #ffffff;
  background: #ff6f69;
  border-radius: 12px;
  padding: 5px;
}

.planner-week .fc-view-harness.fc-view-harness-active {
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
  border-radius: 22px !important;
  border: none !important;
  padding: 15px 20px !important;
}

.fc-v-event .fc-event-main {
  color: #000000;
}

.fc-timegrid-col-events .fc-timegrid-more-link.fc-more-link {
  bottom: Unset !important;
  background: #ff6f69;
  color: #ffffff !important;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 5px;
}

.fc-v-event .fc-event-title {
  font-weight: 800;
  font-size: 18px;
  word-break: break-all;
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

.planner-action-btns {
  transform: rotate(-90deg);
  top: 50vh;
  right: -139px;
}

.planner-action-btns .pa-btn {
  padding: 5px 20px;
  background-color: #b8b8b8;
  color: #ffffff;
  border-radius: 14px 14px 0 0;
  transition: background-color 0.5s ease;
}

.planner-action-btns .pa-btn.active {
  background-color: #ffffff;
  color: #b8b8b8;
  border: 1px solid #b8b8b8;
  transition: background-color 0.5s ease;
}

.assignment-planner-section {
  top: 0;
  right: 3rem;
  bottom: 0;
  z-index: 5;
  display: none;
}

.assignment-planner-section.active {
  display: block;
}

.assignment-planner-section .jochi-components-light-bg {
  background-color: #ffffff;
  height: 100%;
}
</style> -->

<style>
body {
  background-color: #ffffff !important;
}

.student-dashboard-main {
  min-height: 100vh;
  margin: 0;
}

.jochi-sub-components-light-bg {
  background-color: rgba(255, 255, 255, 0.45);
  -webkit-box-shadow: 0px 0px 32px -4px rgb(0 1 0 / 9%);
  box-shadow: 0px 0px 32px -4px rgb(0 1 0 / 9%);
  border-radius: 22px;
}

.jochi-headings {
  color: #ff6d6d;
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
  padding-left: 4rem;
  font-size: 14px;
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

.sub-task-section h6 {
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

.addition-material-section h6 {
  color: #000000;
}

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

.upload-file-section .form-control::placeholder {
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

.fc .fc-scrollgrid {
  border-radius: 12px;
  overflow: hidden;
  border: none;
}

.fc-timegrid-body {
  padding-top: 25px;
}

.fc-theme-standard .fc-popover {
  background: none;
  border: none;
  box-shadow: none;
}

.fc .fc-more-popover .fc-popover-header {
  background: #ff6f69;
  color: #ffffff;
  border-radius: 12px 12px 0 0;
  font-weight: 700;
}

.fc .fc-more-popover .fc-popover-body {
  background: none;
  padding: 0;
}

.fc .fc-more-popover .fc-popover-body .fc-timegrid-event {
  border-radius: 0 0 12px 12px;
}

/* .fc-toolbar-chunk .fc-toolbar-title {
  position: absolute;
  font-size: 20px;
  color: #000000;
  font-weight: 700;
  z-index: 999;
} */

/* .fc-toolbar-chunk button {
  display: none !important;
} */

/* .fc .fc-button .fc-icon {
    color: #a28cf6;
    font-size: 1em;
    line-height: 1em;
    margin: 0;
}

.fc-toolbar-chunk .fc-next-button.fc-button,
.fc-toolbar-chunk .fc-prev-button.fc-button {
    background: none;
    border: 1px solid #b4b4b4;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fc-toolbar-chunk .fc-next-button.fc-button {
    position: relative;
    top: 1.065rem;
}

.fc .fc-day-disabled {
    background: none;
}

.fc .fc-daygrid-day-number {
    color: #8c8bac !important;
    font-weight: 600;
}

.fc-theme-standard th {
    border-right: none;
    border-left: none;
    background-color: #f0deeb;
    padding: 5px;
}

.fc-theme-standard th .fc-col-header-cell-cushion {
    color: #a995ef;
}

.fc-theme-standard td {
  border-color: #e9d7ee;
} */

.fc-theme-standard td,
.fc-theme-standard th {
  border: none;
}

/* .fc-button.fc-button-primary {
  display: none;
}

.fc-theme-standard .fc-scrollgrid {
  border: none;
} */

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
  width: 100vw;
  height: 1px;
  position: absolute;
  top: 8px;
}

/* .fc-scrollgrid-sync-table{
  display: none;
} */

.fc .fc-cell-shaded,
.fc .fc-day-disabled {
  background: none;
}

/* .fc-toolbar-chunk .fc-toolbar-title {
  position: absolute;
  left: 42%;
  right: 42%;
  top: -5px;
  font-size: 14px;
  color: #ffffff;
  background: #ff6f69;
  border-radius: 12px;
  padding: 5px;
} */

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

.fc-timegrid-col-events .fc-timegrid-more-link.fc-more-link {
  bottom: unset !important;
  background: #ff6f69;
  color: #ffffff !important;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 5px;
}

.fc-v-event .fc-event-title {
  font-weight: 800;
  font-size: 18px;
  word-break: break-all;
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

.planner-action-btns {
  transform: rotate(-90deg);
  top: 50vh;
  right: -160px;
}
@media (max-width: 991.98px) {
  .planner-action-btns {
    right: -145px;
  }
}

.planner-action-btns .pa-btn {
  padding: 5px 20px;
  background-color: #b8b8b8;
  color: #ffffff;
  border-radius: 14px 14px 0 0;
  transition: background-color 0.5s ease;
}

.planner-action-btns .pa-btn.active {
  background-color: #ffffff;
  color: #b8b8b8;
  border: 1px solid #b8b8b8;
  transition: background-color 0.5s ease;
}

.assignment-planner-section {
  top: 0;
  right: 3rem;
  bottom: 0;
  z-index: 5;
  display: none;
}

.assignment-planner-section.active {
  display: block;
}

.assignment-planner-section .jochi-components-light-bg {
  background-color: #ffffff;
  height: 100%;
}
</style>
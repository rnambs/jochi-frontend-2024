<style>
.send-later {
  right: 1rem;
  top: 1rem;
  width: 32px;
  height: 32px !important;
  border-radius: 50%;
  background-color: unset;
  z-index: 99;
}
</style>
<template>
  <div :class="!accordionOpened ? 'main-section' : 'main-section opened'">
    <!-- Study Page -->
    <!-- session  -->
    <div
      v-if="currentTab == 0"
      class="bg-global m--12 custom-full-height d-flex"
    >
      <div
        class="study-section d-flex flex-column flex-fill px-4 custom-overflow py-md-2 py-lg-3"
      >
        <div class="row h-lg-100">
          <div class="col-lg-7 d-flex flex-column">
            <div class="position-relative">
              <div
                data-intro="The study room is a tool for you to use to tackle your assignments/tasks. Click here to schedule a study session for sometime later."
                @click="scheduleLaterClick('assignment', $event)"
                class="position-absolute send-later bg-global border rounded-10 d-flex align-items-center justify-content-center cursor-pointer"
              >
                <img src="~/assets/images/v4/send-later.png" />
              </div>
            </div>
            <div
              @click="setSessionType('assignment', false)"
              class="row card card-void m-0 mb-4 p-4 flex-row cursor-pointer"
              data-intro="To start a session right away, click here. You will be prompted to choose what assignment you want to work on, invite your classmates to join you, a chance to set some goals, the option to choose a structured study method and other options to configure a new study session."
            >
              <div class="col-sm-7 col-md-8 col-xl-7">
                <h3 class="color-primary-dark heading3 font-semi-bold mb-1">
                  Complete An Assignment
                </h3>
                <p class="mb-0 color-gray font-semi-bold text-16">
                  Tackle your upcoming assignments
                </p>
              </div>
              <div
                class="col-sm-5 col-md-4 col-xl-5 d-flex justify-content-center"
              >
                <!-- <img
                  src="../../static/image/folder.png"
                  alt=""
                  class="card-img"
                /> -->
                <img
                  src="~/static/image/v4/complete-assignment-light.svg"
                  alt=""
                  class="card-img img-theme light"
                />
                <img
                  src="~/static/image/v4/complete-assignment-dark.svg"
                  alt=""
                  class="card-img img-theme dark"
                />
              </div>
            </div>
            <div class="position-relative mt-3">
              <div
                data-intro="Want to just set yourself accountable while getting general work here? Click here to schedule a regular study session for later."
                @click="scheduleLaterClick('study', $event)"
                class="position-absolute send-later bg-global border rounded-10 d-flex align-items-center justify-content-center cursor-pointer"
              >
                <img src="~/assets/images/v4/send-later.png" />
              </div>
            </div>
            <div
              data-intro="Get started with a general study session right away by clicking here. You will be shown similar options such as setting goals, duration, and other options to configure your session."
              @click="setSessionType('study', false)"
              class="row card card-void p-4 m-0 flex-row cursor-pointer"
            >
              <div class="col-sm-7 col-md-8 col-xl-7">
                <h3 class="color-primary-dark heading3 font-semi-bold mb-1">
                  Start A New Study Session
                </h3>
                <p class="mb-0 color-gray font-semi-bold text-16">
                  Stay focused while you study and monitor your productivity
                </p>
              </div>
              <div
                class="col-sm-5 col-md-4 col-xl-5 d-flex justify-content-center"
              >
                <!-- <img
                  src="../../static/image/lamp.png"
                  alt=""
                  class="card-img"
                /> -->
                <img
                  src="~/static/image/v4/study-session-light.svg"
                  alt=""
                  class="card-img img-theme light"
                />
                <img
                  src="~/static/image/v4/study-session-dark.svg"
                  alt=""
                  class="card-img img-theme dark"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-5 h-lg-100">
            <div
              class="card card-void py-4 h-100 position-realtive h-min-70"
            >
              <div class="d-flex flex-column h-100">
                <h3
                  data-intro="View upcoming study sessions that you’ve blocked out for later and sessions that your classmates have invited you to."
                  class="color-primary-dark heading3 font-semi-bold mb-2 px-4"
                >
                  Upcoming Sessions
                </h3>
                <div class="custom-overflow px-4 pt-2 h-max-lg-600">
                  <div
                    v-for="sessionItem in studySessionList"
                    :key="sessionItem.id"
                    @click="
                      showSessionDetail = true;
                      setDetail(sessionItem);
                    "
                    class="d-flex card card-secondary border-0 p-3 d-flex flex-column mb-3 cursor-pointer"
                  >
                    <h6 class="color-dark font-semi-bold mb-1">
                      {{ sessionItem.name }}
                    </h6>
                    <p class="mb-0 color-secondary font-normal text-14">
                      <span>{{ sessionItem.date }} </span> <span>|</span>
                      <span>{{ sessionItem.time }}</span>
                    </p>
                  </div>
                </div>
                <div
                  v-if="!studySessionList || studySessionList.length <= 0"
                  class="custom-overflow pr-2 mr--2"
                >
                  <div class="custom-overflow pr-2 mr--2">
                    <div
                      class="d-flex card card-secondary p-3 d-flex flex-column mb-3 mx-4"
                    >
                      <h6 class="color-dark font-semi-bold mb-1"></h6>
                      <p
                        class="mb-0 color-secondary font-normal text-14 text-center"
                      >
                        <span> No sessions configured yet</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Listing end -->
              <!-- popup panel -->
              <div
                v-if="showSessionDetail"
                class="position-absolute w-100 h-100 top-0 left-0 p-0"
              >
                <div
                  class="d-flex card bg-gray-light border-0 flex-column h-100 p-3 rounded-10"
                >
                  <div
                    class="d-flex justify-content-between mb-2 border-bottom"
                  >
                    <h3 class="color-primary-dark font-semi-bold">Session</h3>
                    <p
                      @click="
                        showSessionDetail = false;
                        clearCountDownInterval();
                      "
                      class="mb-0 cursor-pointer"
                    >
                      <span><i class="fas fa-times"></i></span>
                    </p>
                  </div>
                  <div class="d-flex flex-column custom-overflow">
                    <div class="d-flex flex-column mb-2">
                      <h5 class="color-dark mb-1 font-semi-bold">
                        Session details
                      </h5>
                      <p class="mb-0 color-secondary font-regular text-16">
                        {{ sessionDetail.name }}
                      </p>
                      <p class="mb-0 color-secondary font-regular text-16"></p>
                    </div>
                    <div class="d-flex flex-column mb-2">
                      <h5 class="color-dark mb-1 font-semi-bold">Goals</h5>
                      <p
                        v-for="goal in sessionDetail.goals"
                        :key="goal"
                        class="mb-0 color-secondary font-regular text-16 d-flex align-items-center"
                      >
                        <span
                          class="d-flex rounded-circle border bullet mr-2 my-1"
                        ></span>
                        {{ goal }}
                      </p>

                      <p
                        v-if="
                          !sessionDetail.goals ||
                          sessionDetail.goals.length <= 0
                        "
                        class="mb-0 color-secondary font-regular text-16 d-flex align-items-center"
                      >
                        No goals set!
                      </p>
                    </div>
                    <div class="d-flex flex-column mb-2">
                      <h5 class="color-dark mb-1 font-semi-bold">
                        {{
                          sessionDetail.studyMethod == "1"
                            ? "Pomodoro"
                            : sessionDetail.studyMethod == "2"
                            ? "Regular"
                            : ""
                        }}
                        Study Method
                      </h5>
                      <p
                        v-if="sessionDetail.name"
                        class="mb-0 color-secondary font-regular text-16 mb-1"
                      >
                        {{
                          sessionDetail.type == "assignment"
                            ? "Assignment Name"
                            : "Subject"
                        }}
                        : <span>{{ sessionDetail.name }}</span>
                      </p>
                      <p class="mb-0 color-secondary font-regular text-16 mb-1">
                        Duration : <span>{{ sessionDetail.duration }}</span>
                      </p>
                      <p class="mb-0 color-secondary font-regular text-16 mb-1">
                        Breaktime : <span>{{ sessionDetail.breakTime }}</span>
                      </p>
                      <p class="mb-0 color-secondary font-regular text-16 mb-1">
                        Breaktime At :
                        <span>{{ sessionDetail.breakTimeAt }}</span>
                      </p>
                      <p v-if="sessionDetail.studyMethod != 2" class="mb-0 color-secondary font-regular text-16 mb-1">
                        Repetitions : <span>{{ sessionDetail.repeat }}</span>
                      </p>

                    </div>
                    <div class="d-flex flex-column mb-2">
                      <h5 class="color-dark mb-1 font-semi-bold">Peers</h5>
                      <div class="d-flex flex-column pl-2">
                        <div
                          v-for="peer in invitedPeerList"
                          :key="peer.id"
                          class="d-flex align-items-center my-2 mr-3"
                        >
                          <div class="ld-img-section mr-3">
                            <div class="ld-img-holder">
                              <img
                                v-if="peer.proPic"
                                :src="peer.proPic"
                                alt="image"
                              />
                              <img
                                v-else
                                src="../../static/image/avatar.png"
                                alt=""
                              />
                            </div>
                          </div>
                          <div class="ld-details-section">
                            <p class="ld-heading mb-1">
                              {{ peer.firstName ? peer.firstName : "" }}&nbsp;{{
                                peer.lastName ? peer.lastName : ""
                              }}
                            </p>
                          </div>
                        </div>
                        <div
                          v-if="!invitedPeerList || invitedPeerList.length <= 0"
                          class="d-flex align-items-center my-2 mr-3"
                        >
                          <span class="color-secondary">No peers invited</span>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-column mb-2">
                      <button
                        v-if="sessionDetail.startSession"
                        @click="checkIfCompletedAsst(); startSessionNowClicked=true"
                        class="btn btn-primary py-2 text-center"
                      >
                        Start Session Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- popup panel end -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end session -->

    <!-- step one -->

    <div
      v-if="currentTab == 1"
      class="border-0 rounded-10 p-1 m--12 custom-full-height d-flex flex-column hidden-scroll"
    >
        <div class="d-flex flex-wrap align-items-center justify-content-between w-100">
          <h3 class="color-primary-dark heading3 font-bold mb-1 mr-3">Step One : <span>Choose an Assignment</span> </h3>
            <!-- <h3 class="color-primary-dark heading3 font-bold mb-1"></h3> -->
          <div class="d-flex flex-wrap flex-fill align-items-center">
            <div
              v-if="
                pendingAssignments &&
                pendingAssignments.length > 0 &&
                (sharedAssignmentsCount > 10 || assignmentsCount > 10)
              "
              class="d-flex align-items-center"
            >
              <button :disabled="disablePrevious" @click="previous" class="btn btn-void mr-2 px-2">
                <span
                  ><i class="i-arrow-left j-icon i-xs bg-text-secondary"></i
                ></span>
              </button>
              <button :disabled="disableNext" @click="next" class="btn btn-void px-2">
                <span
                  ><i class="i-arrow-right j-icon i-xs bg-text-secondary"></i
                ></span>
              </button>
            </div>
            <div class="d-flex ml-auto">
              <button @click="onBack()" class="btn btn-void">
                <span class="mr-2 arrow"
                  ><i class="i-arrow-left j-icon i-xs bg-text-secondary"></i></span
                ><span class="arrow-text">Back</span>
              </button>
            </div>
          </div>
        </div>
      <div
        v-if="!pendingAssignments || pendingAssignments.length < 1"
        class="d-flex align-items-center justify-content-center w-100 h-100"
      >
        <span class="text-secondary">No pending assignments</span>
      </div>
      <div>
        <div class="row">
          <div
            v-for="detail in pendingAssignments"
            :key="detail.id"
            class="col-md-6 col-lg-4"
          >
            <div
              @click="onAssignmentSelect(detail)"
              class="card card-primary rounded-8 drag-drop p-4 position-realtive h-100 justify-content-between cursor-pointer"
            >
              <div class="d-flex flex-column">
                <div
                  class="assignment-tag-section d-flex align-items-center mb-2"
                >
                  <div
                    class="assignment-tag mr-2 text-nowrap"
                    :class="{
                      red: detail.priority == '1',
                      yellow: detail.priority == '2',
                      green: detail.priority == '3',
                      orange: detail.priority == '4',
                    }"
                  >
                    {{
                      detail.priority == "1"
                        ? "Urgent"
                        : detail.priority == "2"
                        ? "Important"
                        : detail.priority == "3"
                        ? "Can Wait"
                        : detail.priority == "4"
                        ? "Overdue"
                        : ""
                    }}
                  </div>
                  <div class="assignment-tag bg-primary text-truncate">
                    {{ detail.subject }}
                  </div>
                </div>
                <div class="text-center">
                  <h4 class="text-18 color-dark font-semi-bold mb-1 word-break">
                    <!-- French Oral Practice -->
                    {{ detail.task }}
                  </h4>
                  <div class="text-center px-3">
                    <p
                      class="color-secondary text-16 line-height-1 font-semi-bold"
                    >
                      <!-- Practice for mock oral exam in class -->
                      {{ detail.subject }}
                    </p>
                  </div>
                </div>
                <div
                  v-if="detail.subTasks && detail.subTasks.length > 0"
                  class="mb-3"
                >
                  <h6 class="color-primary-dark">Sub-tasks</h6>
                  <div class="to-do-list">
                    <div v-for="subtask in detail.subTasks" :key="subtask.id">
                      <div
                        class="d-flex align-items-center mb-1 cursor-pointer"
                      >
                        <input
                          :id="subtask.title"
                          v-model="subtask.title"
                          :value="
                            subtask.task_status == 'Completed'
                              ? subtask.title
                              : ''
                          "
                          type="radio"
                          class="mr-2 cursor-pointer"
                        />
                        <label
                          for=""
                          class="mb-0 text-14 color-gray cursor-pointer text-truncate"
                          >{{ subtask.title }}</label
                        >
                      </div>
                    </div>
                  </div>
                  <div v-if="detail.subTasks && detail.subTasks.length > 4">
                    <span class="text-12 color-gray">
                      + {{ detail.subTasks.length - 4 }} more
                    </span>
                  </div>
                </div>
              </div>
              <div class="">
                <h6 class="mb-0 font-medium color-primary-dark">Additional Materials</h6>
                <div class="row px--12 d-flex align-items-center justify-content-between">
                  <div
                    v-if="
                      detail.assignment_materials &&
                      detail.assignment_materials.length > 0
                    "
                    class="col-8 py-0 pl-0 text-12 d-flex flex-column"
                  >
                    <div class="d-flex flex-column lext-limited">
                      <div
                        class="d-flex w-100"
                        v-for="(file, index) in detail.assignment_materials"
                        :key="index"
                      >
                        <span
                          class="text-capitalize color-gray text-truncate w-100"
                        >
                          {{ file.file_type }} &nbsp;:&nbsp;{{ file.file_name }}
                        </span>
                      </div>
                    </div>
                    <div
                      v-if="
                        detail.assignment_materials &&
                        detail.assignment_materials.length > 2
                      "
                    >
                      <span class="text-12 color-gray">
                        + {{ detail.assignment_materials.length - 2 }} more
                      </span>
                    </div>
                  </div>
                  <div v-else class="col-8 py-0 pl-0 material-link">
                    <p class="color-gray text-14 mb-0">No documents added</p>
                  </div>
                  <div class="col-4">
                    <p class="material-date py-0 text-right text-10 color-gray mb-0">{{ detail.formattedDate }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="currentTab == 2"
      class="border-0 rounded-10 p-1 m--12 custom-full-height d-flex flex-column hidden-scroll"
    >
    <div class="d-flex flex-wrap align-items-center justify-content-between">

      <h3 class="color-primary-dark heading3 font-bold mb-1">
        Step {{ sessionType == "study" ? "One" : "Two" }} : <span>Configure your Session</span>
      </h3>
      <!-- <h3 class="color-primary-dark heading3 font-bold mb-1"></h3> -->
      <div class="d-flex">
        <button @click="onBack()" class="btn btn-void">
          <span class="mr-2 arrow"
            ><i class="i-arrow-left j-icon i-xs bg-text-secondary"></i></span
          ><span class="arrow-text">Back</span>
        </button>
      </div>
    </div>
      <div class="d-flex flex-column flex-fill justify-content-center">
        <div>
          <div class="row justify-content-center">
            <div
              @click="onModeSelect('regular')"
              class="col-12 col-md-5 col-lg-4"
            >
              <div
                class="card card-primary02 rounded-8 drag-drop px-4 py-5 position-realtive h-100 align-items-center justify-content-center cursor-pointer"
              >
                <h3 class="color-primary-dark heading3 text-center font-bold mb-1">
                  Regular Studying
                </h3>
                <p class="color-gray font-semi-bold text-center text-18">
                  Set your own time, goals, and breaks
                </p>
              </div>
            </div>
            <div
              @click="onModeSelect('pomodoro')"
              class="col-12 col-md-5 col-lg-4"
            >
              <div
                class="card card-primary02 rounded-8 drag-drop px-4 py-5 position-realtive align-items-center cursor-pointer"
              >
                <h3 class="color-primary-dark heading3 font-bold mb-1 text-center">
                  Pomodoro Timer
                </h3>
                <p class="color-gray font-semi-bold text-18 text-center">
                  Boost your productivity with short intervals of focused work
                </p>
                <!-- <button
                  @click="$event.stopPropagation()"
                  class="btn btn-primary py-2 text-center"
                >
                  <a
                    style="color: #ffffff"
                    href="https://www.jochi.info/post/what-is-the-pomodoro-technique"
                    class="text-decoration-none"
                    target="blank"
                  >
                    Click to Learn More</a
                  >
                </button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- end step two configure -->

    <!-- step two configure -->
    <div
      v-if="currentTab == 3"
      class="border-0 rounded-10 p-1 m--12 custom-full-height d-flex flex-column hidden-scroll"
    >
    <div class="d-flex flex-wrap align-items-center justify-content-between">
      
      <h3 class="color-primary-dark heading3 font-bold mb-1">
        Step {{ sessionType == "study" ? "Two" : "Three" }}: <span>Configure your Session</span>
      </h3>
      <!-- <h3 class="color-primary-dark heading3 font-bold mb-1"></h3> -->
      <div class="d-flex">
        <button @click="onBack()" class="btn btn-void">
          <span class="mr-2 arrow"
            ><i class="i-arrow-left j-icon i-xs bg-text-secondary"></i></span
          ><span class="arrow-text">Back</span>
        </button>
      </div>
    </div>
      <div class="row h-40 flex-grow-1">
        <div class="col-lg-7 h-md-100 d-flex flex-column">
          <div
            class="card card-primary02 p-4 h-40 flex-fill mb-4 h-min-200"
          >
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h3 class="color-dark font-semi-bold mb-0">
                Goals
                {{
                  sessionType == "assignment"
                    ? "(" +
                      (subjectName ? subjectName : selectedAssignment.task) +
                      ")"
                    : null
                }}
              </h3>
              <a
                v-if="!sessionDetail.id"
                @click="onAddGoalClick"
                class="btn p-0"
              >
                <span class="color-secondary"
                  ><i class="fas fa-plus-circle"></i
                ></span>
              </a>
            </div>
            <div v-if="addGoal" class="d-flex flex-row align-items-start">
              <div class="form-row mb-2 mx-0 mr-2">
                <label class="form-label" for="name">Set goal</label>
                <input
                  type="text"
                  maxlength="100"
                  v-model="goalName"
                  class="form-control"
                />
              </div>
              <div class="pt-4">
                <button
                  class="btn btn-primary btn-sm mt-2"
                  @click="onAddNewGoal"
                >
                  Add
                </button>
              </div>
            </div>
            <div class="custom-overflow pr-2 mr--2 d-flex flex-column">
              <div v-for="goal in goalsList" :key="goal">
                <div class="card card-transparent border-0 show-icon p-1 mt-1">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <p
                      class="mb-0 color-gray text-16 font-regular pr-3 d-flex"
                    >
                      <span><i class="far fa-circle"></i></span>
                      <span class="word-break ml-2">{{ goal }}</span>
                    </p>
                    <span
                      @click="deleteGoal(goal)"
                      class="fa-icon show-hover d-none btn p-0"
                      ><i class="fas fa-trash-alt color-primary-dark"></i
                    ></span>
                  </div>
                </div>
              </div>
              <div v-if="sessionType == 'assignment'">
                <div v-for="task in selectedAssignment.subTasks" :key="task.id">
                  <div class="card card-transparent border-0 show-icon p-1 mt-1">
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <p
                        class="mb-0 color-gary text-16 font-regular pr-3 d-flex w-100"
                      >
                        <span><i class="far fa-circle"></i></span>
                        <span class="ml-2 w-100">{{ task.title }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card card-primary02 h-40 flex-fill p-4 h-min-200">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h3 class="color-dark font-semi-bold mb-0">Invite Peers</h3>
              <a
                v-if="!sessionDetail.id"
                @click="onInviteClick"
                class="btn p-0"
              >
                <span class="color-secondary"
                  ><i class="fas fa-plus-circle"></i
                ></span>
              </a>
            </div>
            <div v-if="invitePeer" class="d-flex flex-row align-items-start">
              <div class="form-row mb-2 mx-0 mr-2">
                <label class="form-label" for="name">Invite peers</label>
                <multiselect
                  v-model="peerSelected"
                  :options="students"
                  track-by="first_name"
                  label="first_name"
                  :placeholder="
                    peerSelected.length > 3 ? '' : 'Select students'
                  "
                  :multiple="true"
                  :max="4"
                >
                  <span slot="maxElements">Maximum of 4 students selected</span>
                  <span slot="noResult">No data found</span>
                </multiselect>
              </div>
              <div class="pt-4">
                <button
                  @click="onInvitePeer"
                  class="btn btn-primary btn-sm mt-2"
                >
                  Add
                </button>
              </div>
            </div>
            <div class="hidden-scroll p-3 row my-0 pl-4">
              <div
                v-for="peer of peerList"
                :key="peer.id"
                class="h-fit-content"
              >
                <div class="d-flex align-items-center my-2 mr-3 min-w-200">
                  <div class="ld-img-section mr-3">
                    <img
                      v-if="peer.profile_pic"
                      class="ld-img-holder shadow-none"
                      :src="peer.profile_pic"
                      alt=""
                    />
                    <img
                      v-else
                      class="ld-img-holder shadow-none"
                      src="../../static/image/avatar.png"
                      alt=""
                    />
                  </div>
                  <div class="ld-details-section">
                    <p class="ld-heading mb-1">{{ peer.first_name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5 d-flex flex-column h-100">
          <div class="card card-primary02 p-4 m-0 flex-column h-100">
            <div class="d-flex flex-column justify-content-between h-100">
              <div class="d-flex flex-column h-40 flex-fill">
                <h3 class="color-dark heading3 font-semi-bold mb-1">
                  {{ sessionMode == "regular" ? "Regular" : "Pomodoro" }}
                  Studying
                </h3>
                <div
                  class="form-section study-room-form py-0 d-flex flex-column h-40 flex-fill custom-overflow"
                >
                  <form
                    @submit.prevent="StartStudySession()"
                    ref="studyTimeForm"
                    class="container"
                  >
                    <div
                      v-if="sessionType == 'study'"
                      class="form-group required"
                    >
                      <label class="typo__label">Subject</label>
                      <div class="position-relative"
                  >
                    <div
                      class="dropdown-select d-inline-flex form-control rounded-8 border border--form color-secondary font-normal text-16 pr-2"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      :class="{
                      'is-invalid':
                      submitted && $v.Subject.$error,
                  }"
                    >
                      <span id="dLabel" class="mr-auto color-secondary text-truncate">
                        {{ Subject ? Subject.text : 'Select' }}</span
                      >
                      <span class="caret color-secondary"
                        ><i class="fas fa-chevron-down font-medium"></i
                      ></span>
                    </div>

                    <ul
                      class="dropdown-menu w-100 rounded-12 border border--form mt-0 p-2"
                      aria-labelledby="dLabel"
                    >
                      <li v-for="(subjects, index) in subjectsData" :key="index" class="item p-2" @click="selectSubject(subjects)">
                        {{ subjects.subject_name }}
                      </li>
                      <li v-if="subjectsData.length == 0">
                      No data
                      </li>
                      <div v-if="submitted && $v.Subject.$error" class="invalid-feedback">
                      <span v-if="!$v.Subject.required">This field is required</span>
                  </div>
                    </ul>
                  </div>
                      <!-- <select
                        :disabled="sessionDetail.id"
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
                      </select> -->
                      <!-- <div
                        v-if="submitted && $v.Subject.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.Subject.required"
                          >This field is required</span
                        >
                      </div> -->
                    </div>
                    <div v-else class="form-group required">
                      <label class="typo__label">Subject</label>
                      <input
                        type="text"
                        id="subjectName"
                        v-model="subjectName"
                        readonly
                        class="form-control"
                      />
                      <div
                        v-if="submitted && $v.Subject.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.Subject.required"
                          >This field is required</span
                        >
                      </div>
                    </div>

                    <div class="form-group" v-if="this.studyTypes.id != 2">
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

                    <div class="form-group" v-show="this.studyTypes.id == 2">
                      <label for="">How long do you want to study for? (minutes)</label>
                      <input
                        type="number"
                        min="0"
                        max="1440"
                        id="targetDuration"
                        v-model="targetDuration"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group" v-show="this.studyTypes.id == 2">
                      <label for="">After how long do you want to take a break? (minutes)</label>
                      <input
                        type="number"
                        min="0"
                        max="1440"
                        id="breakAt"
                        v-model="breakAt"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group" v-show="this.studyTypes.id == 2">
                      <label for="">How long do you want your break to be? (minutes)</label>
                      <input
                        type="number"
                        min="0"
                        max="1440"
                        id="breakTime"
                        v-model="breakTime"
                        class="form-control"
                      />
                    </div>

                    <div
                      class="d-flex flex-column"
                    >
                      <div class="row d-flex flex-wrap">
                        <div class="col-12 col-sm-6 col-md-12 col-lg-6 px--12">
                          <button
                          v-if="
                            !sessionDetail.id ||
                            (sessionDetail && sessionDetail.userId == userId)
                          "
                          type="button"
                          @click="openScheduleForLater()"
                          class="btn btn-void btn-sm w-100"
                          >
                            Schedule for later
                          </button>
                        </div>
                        <div class="col-12 col-sm-6 col-md-12 col-lg-6 px--12">
                          <button
                            v-if="!scheduleLater"
                            type="submit"
                            :disabled="processingStudySession"
                            class="btn btn-primary btn-sm w-100"
                          >
                            Start Session
                          </button>
                        </div>
                      </div>

                      <!-- <div class="d-flex justify-content-end mt-4">
                        <img
                          src="../../static/image/v4/dashboard_img.svg"
                          alt=""
                          class="img-fluid card-img"
                        />
                      </div> -->
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end step two configure -->

    <!-- timer -->

    <div
      v-if="currentTab == 4"
      class="border-0 rounded-10 p-1 m--12 custom-full-height d-flex"
    >
      <div class="d-flex flex-column flex-fill">
        <div class="row">
          <div
            class="col-lg-7 study-col d-flex flex-column justify-content-center flex-fill"
          >
            <div class="card card-void p-4 flex-fill mb-4">
              <div class="">
                <h2 class="color-primary-dark font-semi-bold mb-2">Working on</h2>
              </div>
              <p class="color-dark text-24 font-semi-bold mb-2">
                <span>Subject Name: </span>
                <span class="word-break">
                  {{
                    sessionType == "assignment"
                      ? subjectName // : timerStatusData.subjectName
                      : Subject.text
                  }}
                </span>
              </p>
              <p class="color-dark text-16 font-semi-bold mb-2">
                Study Method:
                <span>{{ startSessionNowClicked? (sessionDetail.studyMethod == "1"
                            ? "Pomodoro"
                            : sessionDetail.studyMethod == "2"
                            ? "Regular"
                            : ""):
                  (sessionMode == "regular"
                    ? "Regular Session"
                    : "Pomodoro Technique")
                }}</span>
              </p>
              <div  v-if="sessionMode != 'regular'">
                <p class="color-gray text-16 font-regular mb-2">
                  Remaining Cycles:
                  {{ totalCycles - currentCycle }}
                </p>
                <p class="color-gray text-16 font-regular mb-2">
                  Remaining Repetitions:
                  {{ repetitionCount - currentRepetitionNum }}
                </p>
              </div>

              <h3 class="color-primary-dark font-semi-bold mb-2">Goals</h3>
              <div v-for="goal in goalsList" :key="goal">
                <div class="card card-transparent border-0 show-icon py-1 mt-1">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <p
                      class="mb-0 color-gary text-16 font-regular pr-3 d-flex"
                    >
                      <span><i class="far fa-circle"></i></span>
                      <span class="color-gray word-break ml-2">{{ goal }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="sessionType == 'assignment'">
                <div v-for="task in selectedAssignment.subTasks" :key="task.id">
                  <div class="card card-transparent border-0 show-icon py-1 mt-1">
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <p
                        class="mb-0 color-gray text-16 font-regular pr-3 d-flex w-100"
                      >
                        <span><i class="far fa-circle"></i></span>
                        <span class="color-gray ml-2 w-100">{{ task.title }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="
                  (!goalsList || goalsList.length <= 0) &&
                  (!selectedAssignment.subTasks ||
                    selectedAssignment.subTasks.length <= 0)
                "
              >
                <span class="color-gray text-16 font-regular"
                  >No goals listed</span
                >
              </div>
            </div>
            <div class="card card-void p-4">
              <h3 class="color-primary-dark font-semi-bold mb-0">Invited Peers</h3>
              <div class="hidden-scroll p-3 pl-4 row my-0">
                <div
                  v-for="peer in peerList"
                  :key="peer.id"
                  class="d-flex align-items-center my-2 mr-3 min-w-200"
                >
                  <div class="ld-img-section mr-3">
                    <img
                      v-if="peer.profile_pic"
                      class="ld-img-holder shadow-none"
                      :src="peer.profile_pic"
                      alt=""
                    />
                    <img
                      v-else
                      class="ld-img-holder shadow-none"
                      src="../../static/image/avatar.png"
                      alt=""
                    />
                  </div>
                  <div class="ld-details-section">
                    <p class="ld-heading mb-1 color-gray">{{ peer.first_name }}</p>
                  </div>
                </div>
                <div
                  v-if="!peerList || peerList.length <= 0"
                  class="d-flex align-items-center my-2 mr-3 min-w-200"
                >
                  <span class="color-gray text-16 font-regular"
                    >No peers invited</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div
            class="col-lg-5 study-col d-flex justify-content-center align-items-center"
          >
            <div
              class="card card-void p-4 flex-fill h-100 justify-constent-center"
            >
              <div class="d-flex flex-column flex-fill justify-content-between">
                <div class="d-flex flex-column mb-4">
                  <h2 class="color-primary-dark font-semi-bold mb-1">Timer</h2>
                  <p class="color-gray text-18 font-semi-bold mb-1">
                    You got this!
                  </p>
                </div>
                <div
                  id="app"
                  class="mb-3 flex-fill d-flex align-items-center justify-content-center"
                >
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
                      <img src="../../static/image/v4/alarm-black.svg" alt="clock" class="img-theme light" />
                      <img src="../../static/image/v4/alarm-white.svg" alt="clock" class="img-theme dark" />
                    </div>
                    <p class="mb-2">
                      <span
                        id="base-timer-label"
                        class="color-dark text-24 font-semi-bold"
                        >{{ timerDurationDisplay }}</span
                      >
                      <span class="color-dark base-timer-text">{{
                        studyStatus == "break" ? "BREAK" : ""
                      }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="btn-area d-flex align-items-center justify-content-center"
              >
                <button
                  v-show="studyStatus != 'break'"
                  @click.prevent="
                    showResume ? onResumeSession() : onPauseSession()
                  "
                  class="btn btn-primary mb-2 mt-2 px-4"
                  id="pause-button"
                >
                  <i
                    v-if="!showResume"
                    class="fa fa-pause color-white mr-2"
                  ></i>
                  <i v-if="showResume" class="fas fa-play color-white mr-2"></i>
                  {{ showResume ? "Resume" : "Pause" }}
                </button>
                &nbsp;
                <button
                  type="button"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  class="btn btn-primary mb-2 mt-2 pl-3 pr-3"
                >
                  End Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- end timer -->

    <!-- rating  -->

    <div
      v-if="currentTab == 5"
      class="border-0 rounded-10 p-0 m--12 custom-full-height d-flex align-items-center justify-content-center hidden-scroll"
    >
      <!-- <h2 class="color-primary-dark font-semi-bold mb-1">Rate</h2> -->
      <div
        class="p-5 d-flex flex-column card card-primary02 rounded-14 col-lg-7"
      >
        <h3 class="color-primary-dark heading3 font-semi-bold mb-1">Rate Your Session</h3>
        <div class="d-flex flex-column py-3 px-0">
          <div class="mb-3">
            <h4 class="color-dark font-semi-bold">Focus</h4>
            <div class="d-flex justify-content-between">
              <star-rating
                class="mb-2"
                v-model="focusRating"
                inactive-color="#d3c8e6"
                active-color="#5534A5"
                border-color="#d3c8e6"
                v-bind:border-width="4"
                v-bind:star-size="21"
                v-bind:padding="1"
                v-bind:animate="true"
                v-bind:rounded-corners="true"
                v-bind:max-rating="5"
              ></star-rating>
              <p class="total-value px-4 color-text-primary">{{ focusRating }}<span>/5</span></p>
            </div>
          </div>
          <div class="mb-3">
            <h4 class="color-dark font-semi-bold">Efficiency</h4>
            <div class="d-flex justify-content-between">
              <star-rating
                class="mb-2"
                v-model="focusEfficiency"
                inactive-color="#d3c8e6"
                active-color="#5534A5"
                border-color="#d3c8e6"
                v-bind:border-width="4"
                v-bind:star-size="21"
                v-bind:padding="1"
                v-bind:animate="true"
                v-bind:rounded-corners="true"
                v-bind:max-rating="5"
              ></star-rating>
              <p class="total-value px-4 color-text-primary">{{ focusEfficiency }}<span>/5</span></p>
            </div>
          </div>
          <div class="mb-3">
            <h4 class="color-dark font-semi-bold">Work Completed</h4>
            <div class="d-flex justify-content-between">
              <star-rating
                class="mb-2"
                v-model="focusWorkComplete"
                inactive-color="#d3c8e6"
                active-color="#5534A5"
                border-color="#d3c8e6"
                v-bind:border-width="4"
                v-bind:star-size="21"
                v-bind:padding="1"
                v-bind:animate="true"
                v-bind:rounded-corners="true"
                v-bind:max-rating="5"
              ></star-rating>
              <p class="total-value px-4 color-text-primary">
                {{ focusWorkComplete }}<span>/5</span>
              </p>
            </div>
          </div>
        </div>
        <button
          type="button"
          @click.prevent="onLogSession()"
          class="btn btn-primary my-2 pl-3 pr-3 ml-auto"
        >
          Log Session
        </button>
      </div>
    </div>

    <!-- end rating -->

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
          <div class="modal-body p-4">
            <h3
              class="modal-title color-primary-dark font-semi-bold"
              id="exampleModalLongTitle"
            >
              End Session
            </h3>
            <p class="mb-0">
              If you end the session, the remaining time will not be recorded and the
              session will be lost. Are you sure you want to exit?
            </p>
          </div>
          <div class="modal-footer justify-content-end border-top-0">
            <button
              type="button"
              class="btn btn-void px-4 py-1 rounded-8"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary px-4 py-1 rounded-8 font-semi-bold"
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
    <!-- schedule for later modal -->
    <div
      class="modal fade"
      id="scheduleForLater"
      tabindex="-1"
      role="dialog"
      aria-labelledby="scheduleCenterModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="scheduleModalLongTitle">
              Schedule Time
            </h3>
          </div>
          <div class="modal-body overflow-initial">
            <div class="form-group required">
              <date-picker
                class="form-control bg-global"
                placeholder="Date"
                format="MM/dd/yyyy"
                :value="scheduledDate"
                v-model="scheduledDate"
                :disabled-dates="disabledDates"
                name="scheduleDate"
              />
            </div>
            <div class="form-group required">
              <vue-timepicker
                close-on-complete
                format="hh:mm A"
                placeholder="Time"
                v-model="scheduledTime"
                name="scheduledTime"
                class="show-cursor form-white"
              ></vue-timepicker>
            </div>
          </div>
          <div class="modal-footer justify-content-end border-top-0">
            <button
              type="button"
              class="btn btn-void px-4 py-1 rounded-8"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary rounded-8 px-4 py-1"
              @click="StartStudySession(false)"
              :disabled="processingStudySession"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- schedule later modal end-->

    <!-- confirm completed assignment start modal -->
    <div
      class="modal fade"
      id="confirmAsstStartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="confirmAsstStartModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmAsstStartModalLongTitle">
              Confirm completed assignment start
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
          <div class="modal-body overflow-initial">
            This assignment has already been completed. Do you want to continue?
          </div>
          <div class="modal-footer justify-content-end border-top-0">
            <button
              type="button"
              class="btn btn-secondary px-4 py-1 "
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-primary  px-4 py-1"
              @click="goToSession()"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- confirm completed assignment start modal end -->
  </div>

  <!-- End Study Page -->
</template>

<script>
import { required, requiredIf } from "vuelidate/lib/validators";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import { mapState, mapActions } from "vuex";
import VueTimepicker from "vue2-timepicker";
import { NavigationGuardNext, Route } from "vue-router";
import { eventBus } from "~/plugins/eventbus.js";

export default {
  name: "ClubEditForm",
  components: {
    lottie,
    VueTimepicker,
  },
  head() {
    return {
      link: [
        { rel: "stylesheet", href: "/css/custom.css" },
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
      processingStudySession: false,
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
      currentTab: 0,
      sessionType: "",
      assignmentDetail: {
        assignment_materials: {},
        dateISOFormat: "",
        due_date: "",
        due_time: "",
        id: 0,
        priority: "",
        subTasks: [],
        subject: "",
        task: "",
      },
      assignmentList: [],
      sessionMode: "",
      addGoal: false,
      goalName: "",
      goalsList: [],
      selectedAssignment: {},
      invitePeer: false,
      peerSelected: [],
      peerList: [],
      subjectName: "",
      disabledDates: {
        to: new Date(),
      },
      date_today: new Date(),
      scheduledDate: "",
      scheduledTime: {
        hh: "00",
        MM: "00",
        A: "am",
      },
      showSessionDetail: false,
      studySessionList: [],
      sessionDetail: {},
      invitedPeerList: [],
      timerCountDown: 0,
      counter: false,
      intervalCountDown: null,
      sessionRedirectId: this.$route.query.id,
      source : this.$route.query.source,
      userId: "",
      assignmentMaterials: [],
      pendingAssignments: [],
      isRedirect: false,
      sharedSessionId: "",
      sharedNewSessionId: "",
      offset: 0,
      limit: 10,
      disablePrevious: true,
      disableNext: false,
      pageCount: 0,
      scheduleLater: false,
      startTimeMixpanel: null,
      startSessionNowClicked:false
    };
  },
  created() {
    eventBus.$on('accordionOpened', (newValue) => {
      this.accordionOpened = newValue;
    });
  },
  beforeMount() {
    var self = this;
    window.onbeforeunload = function (e) {
      if (self.$route.path == "/study-time") {
        e = e || window.event;
        //old browsers
        if (e) {
          e.returnValue = "Changes you made may not be saved";
        }
        //safari, chrome(chrome ignores text)
        return "Changes you made may not be saved";
      } else {
        return null;
      }
    };
    if (performance.navigation.type == 1) {
      if (this.$route.path == "/study-time") {
        this.$router.push({ path: "/study-time" });
      } else {
        console.log("reload page without redirect");
      }
    }
  },
  async mounted() {
    window.addEventListener("orientationchange", this.handleOrientationChange);
    const page = "StudySession";
    const distinct_id = localStorage.getItem("distinctId");
    this.$mixpanel.track("Page View", { distinct_id, page });
    this.startTimeMixpanel = new Date().getTime();
    this.userId = localStorage.getItem("id");
    if (this.source != "task"){
    if (this.sessionRedirectId) {
      await this.getDetail(this.sessionRedirectId);
      this.redirectMap(this.studySessionDetail);
      await this.getInvitedPeersList();
      this.mapPeersInvited();
      this.currentTab = 3;
      this.isRedirect = true;
    }
  }
    const taskId = this.$route.query.id;
    if(taskId){
      this.sessionType = "assignment"
      this.currentTab = 2;
      await this.loadAssignments();
    if (this.pendingAssignments.length > 0) {
      const detail = this.pendingAssignments.find(item => item.id == taskId);
      if (detail) {
         this.onAssignmentSelectroute(detail);
      } 
    } 
    }
    window.addEventListener("beforeunload", function (e) {
      // Cancel the event
      if (this.limitedInterval > 0) {
        e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
        // Chrome requires returnValue to be set
        e.returnValue = "";
      }
    });
    this.disabledDates.to = new Date(
      this.date_today.getFullYear(),
      this.date_today.getMonth(),
      this.date_today.getDate()
    );
    this.GetSubjectList();
    this.GetStudyTypes();
    this.getAllStudySessions();
    this.startIntro();
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
      studySessions: (state) => state.studySessions,
      sharedSessions: (state) => state.sharedSessions,
      assignmentSessions: (state) => state.assignmentSessions,
      assignments: (state) => state.assignments,
      sessionData: (state) => state.sessionData,
      invitedPeers: (state) => state.invitedPeers,
      ownerDetail: (state) => state.ownerDetail,
      studySessionDetail: (state) => state.studySessionDetail,
      assignmentsList: (state) => state.assignmentsList,
      sharedAssignmentsList: (state) => state.sharedAssignmentsList,
      startStudyResponse: (state) => state.startStudyResponse,
      assignmentsCount: (state) => state.assignmentsCount,
      sharedAssignmentsCount: (state) => state.sharedAssignmentsCount,
      overdueAssignmentsList: (state) => state.overdueAssignmentsList,
      sharedOverdueAssignmentsList: (state) =>
        state.sharedOverdueAssignmentsList,
    }),
    ...mapState("teacherMeeting", {
      students: (state) => state.students,
    }),
    startProductGuide() {
      return this.$store.state.startProductGuide;
    },
  },
  methods: {
    ...mapActions("studyRoom", {
      getStatusTimer: "getStatusTimer",
      startStudySession: "startStudySession",
      getSubjectsList: "getSubjectsList",
      getStudyTypes: "getStudyTypes",
      addStudyTime: "addStudyTime",
      addRating: "addRating",
      getStudySessions: "getStudySessions",
      getAssignments: "getAssignments",
      saveStudySession: "saveStudySession",
      getInvitedPeers: "getInvitedPeers",
      getSessionDetail: "getSessionDetail",
      editStudySession: "editStudySession",
    }),
    ...mapActions("teacherMeeting", {
      getStudents: "getStudents",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    nameWithLang({ name, language }) {
      return `${name} — [${language}]`;
    },

    preventNav(event) {
      if (this.limitedInterval <= 0) return;
      event.preventDefault();
      event.returnValue = "";
    },
    previous() {
      this.offset = this.offset > 0 ? this.offset - this.limit : 0;
      this.loadAssignments();
    },
    next() {
      this.offset = this.offset + this.limit;
      this.loadAssignments();
    },
    mapPeersInvited() {
      if (this.invitedPeerList && this.invitedPeerList.length > 0) {
        this.peerList = [];
        this.invitedPeerList.forEach((e) => {
          let peer = e;
          peer.id = e.id;
          peer.first_name = e.firstName;
          peer.profile_pic = e.proPic;
          this.peerList.push(peer);
        });
        this.peerSelected = this.peerList;
      }
    },
    redirectMap(e) {
      let session = {};
      session.type = e.assignment_id ? "assignment" : "study";
      if (e.assignment_id) {
        session.assignments = e.assignments;
      }
      session.id = e.id;
      session.name =
        session.type == "assignment"
          ? e.assignments?.task
          : e.subject?.subject_name;
      if (session.type == "study") {
        this.sessionType = "study";
        let nameSubject = {
          id: e.subjectName ? e.subjectName : e.subject.id,
          text: e.subject.subject_name,
        };
        session.subjectId = e.subject?.id;
        this.Subject = nameSubject;
        this.subjectsData.find(
          (element) => element.id.toString() == e.subject.id.toString()
        );
        this.goalsList = [];
        if (e.study_goals && e.study_goals?.length > 0) {
          e.study_goals.forEach((element) => {
            this.goalsList.push(element.goal);
          });
        }
      } else {
        session.assignmentId = e.assignment_id;
        this.sessionType = "assignment";
        this.subjectName = e.assignments?.task;
        this.goalsList = [];
        if (e.assignments?.subTasks && e.assignments?.subTasks?.length > 0) {
          e.assignments?.subTasks.forEach((element) => {
            this.goalsList.push(element.title);
          });
        }
      }

      session.goals = e.subTasks;
      session.duration = e.duration;
      session.breakTime = e.break_time;
      session.repeat = e.repeat;
      session.peers = e.peers;
      session.date = moment(e.date).format("MMMM Do, YYYY");
      session.scheduledDate = e.date;
      session.time = e.time;
      session.breakTimeAt = e.break_time_at;
      session.studyMethod = e.study_method;
      session.isSharedSession = e.isSharedSession || e.shared ? true : false;
      session.subjectNameId = e.subjectName;
      const d = new Date();

      session.isToday = moment(moment(d).format("YYYY-MM-DD")).isSame(e.date);
      session.startSession = false;
      this.targetDuration = e.duration;
      this.breakAt = e.break_time_at;
      this.breakTime = e.break_time;
      this.repeatLoopBy = e.study_method == "1" || e.study_method == 1 ? 4 : 1;
      this.repetitionCount =
        e.study_method == "1" || e.study_method == 1 ? e.repeat : 1;

      session.id = e.id;
      this.studyTypes = {};
      this.studyTypes.id = e.study_method;
      // this.studyTypes.start_time = this.targetDuration;
      //   this.studyTypes.break_time = this.studyTypes.break_time;
      //   this.breakAt = this.studyTypes.start_time;
      this.peerList = this.mapPeers(e);
      this.sessionMode = e.study_method ? "regular" : "pomodoro";
      session.userId = e.userId;
      this.sessionDetail = session;
    },
    async getDetail(id) {
      await this.getSessionDetail({ id });
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
      // if (this.studyTypes.id != 2) {
      //   this.targetDuration = this.studyTypes.start_time;
      //   this.breakTime = this.studyTypes.break_time;
      //   this.repeatLoopBy = this.studyTypes.cycle;
      if (this.studyTypes?.id != 2) {
        this.targetDuration = this.studyTypes.start_time;
        this.breakTime = this.studyTypes.break_time;
        this.breakAt = this.studyTypes.start_time;
        this.repeatLoopBy = this.studyTypes.cycle;
      } else {
        this.targetDuration = 30;
        this.breakTime = 5;
        this.breakAt = 15;
        this.repeatLoopBy = 1;
        // this.totalCycles = 1;
      }
    },

    async UpdateSubject() {
      this.SubjectName = this.Subject.subject_name;
    },
    async resetTimer() {
      this.totalStudyTime = 0;
      this.studyStatus = "";
      this.$store.commit("SET_IS_TIMER_RUNNING", false);
      await clearInterval(this.limitedInterval);
    },
    async Timer() {
      this.GetStatusTimer();
      this.timerStatus = 1;
      this.timerBreakDurationDisplay = this.breakTime * 60;
      this.totalCycles = this.repeatLoopBy;
      this.customBreakStarted = false;
      this.breakAtMinutes = this.breakAt * 60;
      if (this.studyTypes?.id == 2) {
        this.timeCompleted = 0;
      }

      var repbreakTime =
        this.studyTypes.long_break && this.studyTypes.long_break > 0
          ? this.studyTypes.long_break
          : this.studyTypes.breakTime;

      if (this.studyTypes?.id != 2) {
        for (let i = 0; i < Number(this.repetitionCount); i++) {
          this.currentRepetitionNum = 1 + i;
          this.studyStatus = "";
          if (
            i != 0 &&
            (this.studyTypes?.id == 1 || this.studyTypes?.id == 2)
          ) {
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
        this.currentRepetitionNum = 1;
        this.currentCycle = 1;
        if (this.targetDuration > 0 && this.breakAt > 0 && this.breakTime > 0) {
          this.studyStatus = "study";
          await this.runTimer(this.targetDuration * 60);
        } else {
        }
      }
    },
    async runTimer(targetDuration, isPending = false) {
      this.$store.commit("SET_IS_TIMER_RUNNING", true);

      await setTimeout(function () {
        console.log("timer is starting");
      }, 1000);

      let timer = await document.querySelector("#base-timer-path-remaining");

      let percentage = 0;
      var minutes = 0;
      var seconds = 0;
      if (this.studyTypes?.id == 2) {
        this.timeCompleted = this.timeCompleted >= 0 ? this.timeCompleted : 0;
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
                this.studyTypes?.id == 2 &&
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

    checkScheduleLaterValidations() {
      let valid = true;

      if (!this.checkValidTime(this.scheduledTime)) {
        this.$toast.open({
          message: "Please add valid scheduled time",
          type: "warning",
          duration: 5000,
        });
        valid = false;
      }
      if (!this.scheduledDate) {
        this.$toast.open({
          message: "Please add scheduled date",
          type: "warning",
          duration: 5000,
        });
        valid = false;
      }
      return valid;
    },
    checkValidTime(time) {
      let timeFormat = time?.hh + ":" + time?.mm + " " + time?.A;
      console.log(time, timeFormat, moment(timeFormat, "hh:mm A", true).isValid());
      return moment(timeFormat, "hh:mm A", true).isValid();
    },

    async StartStudySession(scheduleNow = true) {
      this.submitted = true;
      this.processingStudySession = true;

      let valid = this.checkValidations();
      if (valid && !scheduleNow) {
        valid = this.checkScheduleLaterValidations();
      }
      if (!valid) {
        this.processingStudySession = false;

        return;
      }

      this.processing = true;
      const peersSelected = [];
      if (this.peerList.length > 0) {
        this.peerList.forEach((e) => {
          peersSelected.push(e.id);
        });
      }

      let today, todayTime;

      if (scheduleNow) {
        today = moment().format("YYYY-MM-DD");
        todayTime = moment().format("LT");
      }
      let payLoad = {};
      if (this.sessionType == "assignment") {
        payLoad = {
          assignment_id:
            this.sessionType == "assignment"
              ? this.selectedAssignment.id
              : null,
          session_shared_user_id: peersSelected,
          goals: this.goalsList,
          date: scheduleNow
            ? today
            : this.scheduledDate
            ? moment(this.scheduledDate).format("YYYY-MM-DD")
            : "",
            start_time: scheduleNow
            ? todayTime
            : (
              this.scheduledTime.hh +
              ":" +
              this.scheduledTime.mm +
              " " +
              ((this.scheduledTime.A ? this.scheduledTime.A : this.scheduledTime.a)
            )),
          study_method: this.studyTypes?.id,
          subject: this.sessionType != "assignment" ? this.Subject.id : "",
          target_duration:
            this.sessionMode == "regular" ? this.targetDuration : null,
          repeat:
            this.sessionMode == "regular"
              ? this.repeatLoopBy
              : this.repetitionCount,
          scheduled_status: scheduleNow ? "Now" : "Later",
          break_time_at: this.breakAt,
          break_time: this.breakTime,
        };
      } else {
        payLoad = {
          session_shared_user_id: peersSelected,
          goals: this.goalsList,
          date: scheduleNow
            ? today
            : this.scheduledDate
            ? moment(this.scheduledDate).format("YYYY-MM-DD")
            : "",
          start_time: scheduleNow
            ? todayTime
            : (this.scheduledTime.hh +
              ":" +
              this.scheduledTime.mm +
              " " +
              (this.scheduledTime.A??this.scheduledTime.a)),
          study_method: this.studyTypes?.id,
          subject: this.sessionType != "assignment" ? this.Subject.id : "",
          target_duration:
            this.sessionMode == "regular" ? this.targetDuration : null,
          repeat:
            this.sessionMode == "regular"
              ? this.repeatLoopBy
              : this.repetitionCount,
          scheduled_status: scheduleNow ? "Now" : "Later",
          break_time_at: this.breakAt,
          break_time: this.breakTime,
        };
      }
      if (this.isRedirect) {
        payLoad.session_id = this.sessionDetail.id;
        if (!scheduleNow) {
          return this.EditStudyTime(scheduleNow, payLoad);
        } else {
          this.startSessionNow();

          if (this.limitedInterval > 0) {
            await this.resetTimer();
          }
          this.submitted = false;
          this.processing = false;

          this.currentTab = 4;
          this.Timer();
        }
      } else {
        await this.saveStudySession(payLoad);
        if (this.sessionDetail.isSharedSession) {
          this.sharedNewSessionId = this.sessionData.id;
        }
        if (this.successMessage != "") {
          this.$toast.open({
            message: scheduleNow
              ? this.successMessage
              : "Session details saved successfully",
            type: this.SuccessType,
            duration: 5000,
          });
          if (this.limitedInterval > 0) {
            await this.resetTimer();
          }
          this.submitted = false;
          this.processing = false;
          if (!scheduleNow) {
            this.resetData();
            this.closeScheduleForLater();
            this.currentTab = 0;
            this.getAllStudySessions();
            return;
          } else {
            this.onNext();
            this.Timer();
          }
        } else if (this.errorMessage != "") {
          this.$toast.open({
            message: this.errorMessage,
            type: this.errorType,
            duration: 5000,
          });
        }
        this.processing = false;

        this.processingStudySession = false;
      }
    },
    checkValidations() {
      let valid = true;
      if (this.sessionType == "study" && (!this.Subject || !this.Subject.id)) {
        this.$toast.open({
          message: "Please add a subject",
          type: "warning",
          duration: 5000,
        });
        valid = false;
      }

      if (this.studyTypes?.id == 2) {
        if (!this.targetDuration || this.targetDuration == "0") {
          this.$toast.open({
            message: "Duration is required",
            type: "warning",
            duration: 5000,
          });
          valid = false;
        }
        if (!this.breakTime || this.breakTime == "0") {
          this.$toast.open({
            message: "Breaktime is required",
            type: "warning",
            duration: 5000,
          });
          valid = false;
        }
        if (!this.breakAt || this.breakAt == "0") {
          this.$toast.open({
            message: "Break At is required",
            type: "warning",
            duration: 5000,
          });
          valid = false;
        }

        if (
          (this.targetDuration || this.breakTime) &&
          (this.targetDuration < 0 || this.breakTime < 0)
        ) {
          this.$toast.open({
            message: "Duration and Breaktime must be greater than zero",
            type: "warning",
            duration: 5000,
          });
          return false;
        }

        if (
          Number(this.breakTime) &&
          !isNaN(Number(this.breakAt)) &&
          Number(this.breakTime) < 2
        ) {
          this.$toast.open({
            message: "Breaktime must be greater than or equal to 2 minutes",
            type: "warning",
            duration: 5000,
          });
          return false;
        }
        if (
          Number(this.breakAt) &&
          !isNaN(Number(this.breakAt)) &&
          Number(this.breakAt) < 2
        ) {
          this.$toast.open({
            message: "Break Time At must be greater than or equal to 2 minutes",
            type: "warning",
            duration: 5000,
          });
          return false;
        }

        if (
          Number(this.targetDuration) &&
          !isNaN(Number(this.targetDuration)) &&
          Number(this.targetDuration) < 5
        ) {
          this.$toast.open({
            message: "Duration must be at least 5 minutes",
            type: "warning",
            duration: 5000,
          });
          return false;
        }

        if (
          Number(this.breakAt) &&
          Number(this.targetDuration) &&
          !isNaN(Number(this.breakAt)) &&
          !isNaN(Number(this.targetDuration)) &&
          (Number(this.breakAt) < 2 ||
            Number(this.breakAt) >= Number(this.targetDuration))
        ) {
          this.$toast.open({
            message: "You can only take a break before the end of the session",
            type: "warning",
            duration: 5000,
          });
          return false;
        }
      }
      return valid;
    },
    async AddStudyTime(studyStatus) {
      this.submitted = true;
      if (studyStatus == "STOP") {
        this.onNext();
      }
      let totalTimeStudied = Math.floor(this.totalStudyTime / 60);
      this.Timersession_id = this.timerStatusData.id;
      this.Timertotal_time = Math.floor(this.totalStudyTime / 60);
      this.Timerrepeat = this.timerStatusData.repeat;

      let addStudyPayload = {};
      if (this.sessionDetail.isSharedSession) {
        addStudyPayload = {
          sessionId: this.sharedNewSessionId,
          old_sessionId: this.sessionDetail.id,
          min: totalTimeStudied,
          status: studyStatus,
        };
      } else {
        addStudyPayload = {
          sessionId: this.startSessionNowClicked? this.sessionDetail.id: this.sessionData.id
            ? this.sessionData.id
            : this.sessionDetail.id,
          min: totalTimeStudied,
          status: studyStatus,
        };
      }

      console.log("startSessionNowClicked", this.startSessionNowClicked, this.sessionDetail.id)

      // await this.addStudyTime({
      //   sessionId: this.sharedNewSessionId
      //     ? this.sharedNewSessionId
      //     : this.sessionData.id
      //     ? this.sessionData.id
      //     : this.sessionDetail.id,
      //   min: totalTimeStudied,
      //   status: studyStatus,
      // });
      await this.addStudyTime(addStudyPayload);

      if (this.successMessage != "") {
        if (studyStatus != "STOP" && this.sharedSessionId) {
          this.sharedSessionId = "";
        }
        if (studyStatus != "PAUSE") {
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
        }
        this.totalStudyTime = 0;
        if (
          this.studyTypes?.id == 2 &&
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
    async EditStudyTime(scheduleNow, payLoad) {
      await this.editStudySession(payLoad);
      this.isRedirect = false;
      if (this.successMessage != "") {
        this.$toast.open({
          message: scheduleNow
            ? this.successMessage
            : "Session details saved successfully",
          type: this.SuccessType,
          duration: 5000,
        });
        if (this.limitedInterval > 0) {
          await this.resetTimer();
        }
        this.submitted = false;
        this.processing = false;
        if (!scheduleNow) {
          this.resetData();
          this.closeScheduleForLater();
          this.currentTab = 0;
          this.getAllStudySessions();
          return;
        } else {
          this.onNext();
          this.Timer();
        }
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.processing = false;

      this.processingStudySession = false;
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
      // if (this.studyTypes?.id == 2) {
      this.studyTimePaused = true;
      var presentTime = new Date().getTime();
      this.totalStudyTime = (presentTime - this.studyTimeStart) / 1000;
      this.showResume = true;
      // }
    },
    async onResumeSession() {
      // if (this.studyTypes?.id == 2) {
      (this.startTime = new Date().getTime()), (this.studyTimePaused = false);
      this.studyTimeStart = new Date().getTime();
      this.showResume = false;
      this.studyStatus = "study";
      // }
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
    },
    async onLogSession() {
      await this.addRating({
        session_id: this.startSessionNowClicked ? this.sessionDetail.id : this.sharedNewSessionId
          ? this.sharedNewSessionId
          : this.sessionData.id
          ? this.sessionData.id
          : this.sessionDetail.id,
        focus: this.focusRating,
        efficiency: this.focusEfficiency,
        workCompletes: this.focusWorkComplete,
      });
      if (this.successMessage != "") {
        this.sharedNewSessionId = "";
        this.currentTab = 0;
        this.resetData();
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
      // this.customBreakStarted = true;
      // var presentTime = new Date().getTime();
      // this.totalStudyTime += (presentTime - this.studyTimeStart) / 1000;
      // this.resetTimer();

      // this.AddStudyTime("PAUSE");
      this.customBreakStarted = true;
      var presentTime = new Date().getTime();
      this.totalStudyTime += (presentTime - this.studyTimeStart) / 1000;
      clearInterval(this.limitedInterval);
      this.AddStudyTime("PAUSE");
    },
    async getAllStudySessions() {
      await this.getStudySessions({});

      this.assignmentSessions.forEach((e) => {
        let session = {};
        session.type = "assignment";
        session.id = e.id;
        session.assignment_id = e.assignment_id;
        session.name = e.assignments?.task;
        session.goals = this.mapAsstGoals(e.assignments?.subTasks);
        session.duration = e.duration;
        session.breakTime = e.break_time;
        session.repeat = e.repeat;
        session.peers = e.peers;
        session.date = moment(e.date).format("MMMM Do, YYYY");
        session.scheduledDate = e.date;
        session.time = e.time;
        session.breakTimeAt = e.break_time_at;
        session.studyMethod = e.study_method;
        session.status = e.assignments?.task_status;
        const d = new Date();

        session.isToday = moment(moment(d).format("YYYY-MM-DD")).isSame(e.date);
        session.startSession = false;

        this.studySessionList.push(session);
      });

      this.studySessions.forEach((e) => {
        let session = {};
        session.type = "study";
        session.id = e.id;
        session.name = e.subject?.subject_name;
        session.goals = this.mapSessionGoal(e.study_goals);

        session.duration = e.duration;
        session.breakTime = e.break_time;
        session.repeat = e.repeat;
        session.peers = e.peers;
        session.date = moment(e.date).format("MMMM Do, YYYY");
        session.scheduledDate = e.date;
        session.time = e.time;
        session.breakTimeAt = e.break_time_at;
        session.studyMethod = e.study_method;
        const d = new Date();
        session.isToday = moment(moment(d).format("YYYY-MM-DD")).isSame(e.date);
        session.startSession = false;

        this.studySessionList.push(session);
      });

      this.sharedSessions.forEach((e) => {
        let session = {};
        session.type = e.assignment_id ? "assignment" : "study";
        session.id = e.session_id;
        session.newSessionId = e.id;
        session.name = e.assignment_id
          ? e.studyroom?.assignments?.task
            ? e.studyroom?.assignments?.task
            : e.assignments?.task
            ? e.assignments?.task
            : ""
          : e.subjects?.subject_name;
        session.goals = e.assignment_id
          ? this.mapAsstGoals(e.assignments?.subTasks)
          : this.mapSessionGoal(e.studyroom?.study_goals);
        session.duration = e.studyroom?.duration;
        session.breakTime = e.studyroom?.break_time;
        session.repeat = e.studyroom?.repeat;
        session.peers = e.peers;
        session.date = moment(e.date).format("MMMM Do, YYYY");
        session.scheduledDate = e.date;
        session.time = e.start_time;
        session.breakTimeAt = e.studyroom?.break_time_at;
        session.studyMethod = e.study_method;
        const d = new Date();
        session.isToday = moment(moment(d).format("YYYY-MM-DD")).isSame(e.date);
        session.startSession = e.scheduled_status == "Now" ? true : false;
        session.scheduleStatus = e.scheduled_status;
        session.assignmentId = e.assignment_id;
        session.subjectId = e.subjects?.id;
        session.isSharedSession = true;
        session.subjectNameId = e.studyroom?.subjectName;
        this.studySessionList.push(session);
      });
    },
    mapSessionGoal(goalsList) {
      let goals = [];
      if (goalsList && goalsList.length > 0) {
        goalsList.forEach((element) => {
          if (element.goal) {
            goals.push(element.goal);
          }
        });
      }
      return goals;
    },
    mapAsstGoals(subTasks) {
      let tasks = [];
      if (subTasks && subTasks.length > 0) {
        subTasks.forEach((e) => {
          tasks.push(e.title);
        });
      }
      return tasks;
    },
    async onNext() {
      let nextTab = this.currentTab + 1;
      switch (nextTab) {
        case 4:
          this.timerPageInitialize();

          break;

        default:
          "";
      }
      this.currentTab++;
    },
    timerPageInitialize() {
      if (this.limitedInterval && this.limitedInterval > 0) {
        this.resetTimer();
      }
    },
    onBack() {
      if (this.sessionType == "study" && this.currentTab == 2) {
        this.currentTab = 0;
        this.resetData();
        return;
      }

      this.currentTab--;
      if (this.currentTab == 2) {
        this.resetTab3();
      }

      if (this.currentTab == 0) {
        this.resetData();
      }

      if (this.currentTab == 1) {
        this.offset = 0;
        this.loadAssignments();
      }
    },
    async setSessionType(type, later = false) {
      this.sessionDetail={}
      this.scheduleLater = later;
      this.sessionType = type;
      if (this.sessionType == "study") {
        this.resetAssignment();
        this.currentTab = 2;
        return;
      }

      this.onNext();
      if (this.currentTab == 1) {
        this.offset = 0;
        this.loadAssignments();
      }
    },

    async loadAssignments() {
      await this.getAssignments({
        student_id: parseInt(localStorage.getItem("id")),
        offset: this.offset,
        limit: this.limit,
      });

      this.mapCount();
      this.pendingAssignments = [];
      this.mapAssignments();
      this.mapSharedAssignments();
      this.mapOverdueAssignments();
      this.mapSharedOverdueAssignments();
    },

    mapCount() {
      this.sharedAssignmentsCount;
      this.assignmentsCount;

      if (this.sharedAssignmentsCount > 0 || this.assignmentsCount > 0) {
        let sharedPages = Math.floor(this.sharedAssignmentsCount / 10);
        let asstPages = Math.floor(this.assignmentsCount / 10);
        this.pageCount = sharedPages > asstPages ? sharedPages : asstPages;
        this.disableNext =
          sharedPages > asstPages
            ? sharedPages * this.limit == this.offset
            : asstPages * this.limit == this.offset;
        //  this.pageCount == this.offset + 1;
      } else {
        this.disableNext = true;
      }
      this.disablePrevious = this.offset == 0;
    },

    mapAssignments() {
      if (this.assignmentsList && this.assignmentsList.length > 0) {
        this.assignmentsList.forEach((e) => {
          let asst = this.mapData(e);
          this.pendingAssignments.push(asst);
        });
      }
    },
    mapOverdueAssignments() {
      if (
        this.overdueAssignmentsList &&
        this.overdueAssignmentsList.length > 0
      ) {
        this.overdueAssignmentsList.forEach((e) => {
          let asst = this.mapData(e);
          this.pendingAssignments.push(asst);
        });
      }
    },
    mapData(e) {
      if (e) {
        let item = {};
        this.assignmentMaterials = [];

        item.assignment_description = e.assignment_description;
        // item.assignment_materials = e.assignment_materials;
        if (e.assignment_materials && e.assignment_materials.length > 0) {
          e.assignment_materials.forEach((m) => {
            let data = {};
            data = m;
            this.assignmentMaterials.push(data);
          });
        }
        item.assignment_materials = this.assignmentMaterials;
        item.completed_date = e.completed_date;
        item.dueTimeFormat = e.dueTimeFormat;
        item.due_date = e.due_date
          ? moment(e.due_date).format("MM/DD/YYYY")
          : "";
        item.formattedDate = e.due_date
          ? moment(e.due_date).format("MMMM Do, YYYY")
          : "";
        item.due_time = e.due_time;
        item.id = e.id;
        item.priority = e.priority;
        item.schoologyAssignment = e.schoologyAssignment;
        item.schoologyAssignmentId = e.schoologyAssignmentId;
        item.subTasks = e.subTasks;
        item.subject = e.subject;
        item.subjects = e.subjects;
        item.task = e.task;
        item.task_status = e.task_status;
        item.updatedAt = e.updatedAt;
        item.user_id = e.user_id;
        item.peers = this.mapPeers(e);
        // item.formattedDate = moment(e.due_date).format("MMMM Do, YYYY");
        item.isShared = false;
        return item;
      }
    },
    mapSharedAssignments() {
      if (this.sharedAssignmentsList && this.sharedAssignmentsList.length > 0) {
        this.sharedAssignmentsList.forEach((e) => {
          let asst = this.mapSharedData(e);
          this.pendingAssignments.push(asst);
        });
      }
    },
    mapSharedOverdueAssignments() {
      if (
        this.sharedOverdueAssignmentsList &&
        this.sharedOverdueAssignmentsList.length > 0
      ) {
        this.sharedOverdueAssignmentsList.forEach((e) => {
          let asst = this.mapSharedData(e);
          this.pendingAssignments.push(asst);
        });
      }
    },
    mapSharedData(e) {
      let item = {};
      this.assignmentMaterials = [];

      if (e && e.assignments) {
        item.assignment_description = e.assignments.assignment_description;
        // item.assignment_materials = e.assignment_materials;
        if (
          e.assignments?.assignment_materials &&
          e.assignments?.assignment_materials.length > 0
        ) {
          e.assignments?.assignment_materials.forEach((m) => {
            let data = {};
            data = m;
            this.assignmentMaterials.push(data);
          });
        }
        item.assignment_materials = this.assignmentMaterials;
        item.completed_date = e.assignments.completed_date;
        item.dueTimeFormat = e.assignments.dueTimeFormat;
        item.due_date = moment(e.assignments.due_date).format("MM/DD/YYYY");
        item.formattedDate = e.assignments.due_date
          ? moment(e.assignments.due_date).format("MMMM Do, YYYY")
          : "";
        item.due_time = e.assignments.due_time;
        item.id = e.assignments.id;
        item.sharedId = e.id;
        item.priority = e.assignments.priority;
        item.schoologyAssignment = e.assignments.schoologyAssignment;
        item.schoologyAssignmentId = e.assignments.schoologyAssignmentId;
        item.subTasks = e.assignments?.subTasks;
        item.subject = e.assignments?.subjects?.subject_name;
        item.subjects = e.assignments?.subjects;
        item.task = e.assignments.task;
        item.task_status = e.assignments.task_status;
        item.updatedAt = e.assignments.updatedAt;
        item.user_id = e.assignments.user_id;
        item.peers = this.mapPeers(e);
        // item.formattedDate = moment(e.due_date).format("MMMM Do, YYYY");
        item.isShared = true;
        return item;
      }
    },
    mapPeers(e) {
      let user_id = localStorage.getItem("id");
      let peers = [];
      if (
        e.assignment_session_shared_users &&
        e.assignment_session_shared_users.length > 0
      ) {
        e.assignment_session_shared_users.forEach((item) => {
          if (item.session_shared_user_id.toString() != user_id && item.users) {
            let peer = {};
            peer = item.users;
            peer.id = item.session_shared_user_id;
            peers.push(peer);
          }
        });
      }
      if (
        e.assignments?.assignment_shared_users &&
        e.assignments?.assignment_shared_users.length > 0
      ) {
        e.assignments.assignment_shared_users.forEach((item) => {
          if (item.shared_users_id.toString() != user_id && item.users) {
            let peer = {};
            peer = item.users;
            peer.id = item.shared_users_id;
            peers.push(peer);
          }
        });
      }
      if (e.assignment_shared_users && e.assignment_shared_users?.length > 0) {
        e.assignment_shared_users.forEach((item) => {
          if (item.shared_users_id.toString() != user_id && item.users) {
            let peer = {};
            peer = item.users;
            peer.id = item.shared_users_id;
            peers.push(peer);
          }
        });
      }
      let exists = peers.find(
        (ele) => ele.id.toString() == e.assignments?.user_id.toString()
      );

      if (e.assignments?.users && !exists) {
        let user = {};
        user = e.assignments?.users;
        user.id = e.user_id;
        peers.push(user);
      }
      return peers;
    },
    onAssignmentSelect(detail) {
      this.selectedAssignment = detail;
      this.onNext();
    },
    onModeSelect(type) {
      this.sessionMode = type;

      this.onNext();
      if (this.sessionMode == "regular") {
        this.studyTypes = this.studyTypesData.find((e) => e.id == 2);
      } else {
        this.studyTypes = this.studyTypesData.find((e) => e.id == 1);
      }
      if (this.sessionType == "assignment") {
        this.subjectName = this.selectedAssignment.task;
      }
      this.UpdateStudyTechnique();
    },
    onAddGoalClick() {
      this.addGoal = true;
    },
    onAddNewGoal() {
      if (this.goalName && this.goalName.trim().length > 0) {
        this.goalsList.push(this.goalName);
        this.goalName = "";
        this.addGoal = false;
      } else {
        this.$toast.open({
          message: "Please add a valid goal ",
          type: "warning",
          duration: 5000,
        });
      }
    },
    deleteGoal(goal) {
      let index = this.goalsList.findIndex((e) => e == goal);
      this.goalsList.splice(index, 1);
    },
    onInviteClick() {
      this.invitePeer = true;
      this.GetStudents();
    },
    async GetStudents() {
      await this.getStudents({
        school_id: localStorage.getItem("school_id"),
        studentId: localStorage.getItem("id"),
      });
    },
    onInvitePeer() {
      this.peerList = this.peerSelected;
      this.invitePeer = false;
    },
    resetAssignment() {
      this.selectedAssignment = {};
      this.goalsList = [];
      this.peerList = [];
    },
    openScheduleForLater() {
      this.processing = false;
      this.processingStudySession = false;
      this.scheduledTime = {
        hh: "00",
        MM: "00",
        A: "am",
      };
      this.scheduledDate = "";
      if (this.checkValidations()) {
        $("#scheduleForLater").modal({ backdrop: true });
      }
    },

    closeScheduleForLater() {
      $("#scheduleForLater").modal("hide");
      $(".modal-backdrop").remove();
    },

    resetData() {
      this.sharedNewSessionId = "";
      this.processingStudySession = false;
      this.sessionDetail = {};
      this.sessionType = "";
      this.assignmentDetail = {};
      this.assignmentList = [];

      this.addGoal = false;
      this.goalName = "";
      this.goalsList = [];

      this.invitePeer = false;
      this.peerSelected = [];
      this.peerList = [];
      this.subjectName = "";
      this.showSessionDetail = false;
      this.studySessionList = [];
      this.sessionDetail = {};
      this.scheduledTime = {
        hh: "00",
        MM: "00",
        A: "am",
      };
      this.scheduledDate = "";
      this.Subject = "";
      if (this.currentTab == 0) {
        this.getAllStudySessions();
      }
      this.startSessionNowClicked=false;
    },
    async checkTime() {
      if (this.checkStartSession()) {
        this.sessionDetail.startSession = true;
      } else {
        this.sessionDetail.startSession = false;
        let time = this.sessionDetail.time;
        this.intervalCountDown = await setInterval(() => {
          let timeDiff = moment().diff(moment(time, "hh:mm A"), "minutes");
          if (timeDiff >= 0) {
            this.sessionDetail.startSession = true;
            clearInterval(this.intervalCountDown);
          }
        }, 1000);
      }
    },
    checkStartSession() {
      let timeDiff = moment().diff(
        moment(this.sessionDetail.time, "hh:mm A"),
        "minutes"
      );
      if (timeDiff < 0) {
        return false;
      }
      return true;
    },

    clearCountDownInterval() {
      clearInterval(this.intervalCountDown);
    },
    async setDetail(session) {
      this.sessionDetail = session;
      if (this.sessionDetail.studyroom) {
        this.sessionDetail.study_goals =
          this.sessionDetail.studyroom.study_goals;
      }
      clearInterval(this.intervalCountDown);
      this.counter = false;
      if (this.sessionDetail.isToday) {
        this.checkTime();
      }
      this.getInvitedPeersList();
      this.mapPeersInvited();
    },
    async getInvitedPeersList() {
      await this.getInvitedPeers(this.sessionDetail.id);
      this.invitedPeerList = [];
      if (this.invitedPeers && this.invitedPeers.length > 0) {
        this.invitedPeers.forEach((e) => {
          if (e?.users?.id != this.userId) {
            let peer = {};
            peer["id"] = e?.users?.id;
            peer["firstName"] = e?.users?.first_name;
            peer["last_name"] = e?.users?.last_name;
            peer["proPic"] = e?.users?.profile_pic;
            this.invitedPeerList.push(peer);
          }
        });
      }
      if (this.ownerDetail) {
        // this.ownerDetail.forEach((e) => {
        if (this.ownerDetail?.users?.id != this.userId) {
          let peer = {};
          peer["id"] = this.ownerDetail?.users?.id;
          peer["firstName"] = this.ownerDetail?.users?.first_name;
          peer["last_name"] = this.ownerDetail?.users?.last_name;
          peer["proPic"] = this.ownerDetail?.users?.profile_pic;
          this.invitedPeerList.push(peer);
        }
        // });
      }
    },
    checkIfCompletedAsst() {
      if (this.sessionDetail.isSharedSession) {
        this.sharedSessionId = this.sessionDetail.id;
        // this.sharedNewSessionId = this.sessionDetail.newSessionId;
      } else {
        this.sharedSessionId = "";
        this.sharedSessionId = "";
        this.sharedNewSessionId = "";
      }
      let valid = true;
      if (this.sessionDetail.type == "assignment") {
        if (this.sessionDetail.status == "Completed") {
          this.showConfirmSessionStart();
          valid = false;
          return;
        }
      }
      if (valid) {
        this.goToSession();
      }
    },
    selectSubject(selectedSubject) {
      this.Subject = {
      id: selectedSubject.id,
      text: selectedSubject.subject_name
    };
    },
    showConfirmSessionStart() {
      $("#confirmAsstStartModal").modal({ backdrop: true });
    },
    async goToSession() {
      await this.getDetail(this.sessionDetail.id);
      this.redirectMap(this.studySessionDetail);

      await this.getInvitedPeersList();
      this.mapPeersInvited();

      // this.UpdateStudyTechnique();
      // this.goalsList = this.sessionDetail.goals;
      // this.sessionMode =
      //   this.sessionDetail.studyMethod == "1"
      //     ? "pomodoro"
      //     : this.sessionDetail.studyMethod == "2"
      //     ? "regular"
      //     : "";
      // if (Number(this.sessionDetail.studyMethod) == 2) {
      //   this.studyTypes = this.studyTypesData.find((e) => e.id == 2);
      // } else {
      //   this.studyTypes = this.studyTypesData.find((e) => e.id == 1);
      // }
      // if (this.sessionDetail.type == "assignment") {
      //   this.subjectName = this.sessionDetail.assignments?.task
      //     ? this.sessionDetail.assignments?.task
      //     : this.selectedAssignment.task;
      // } else {
      //   // let nameSubject = { id: e.subject.id, text: e.subject.subject_name };
      //   // this.Subject = nameSubject;
      // }

      // if (this.sessionDetail.scheduleStatus == "Now") {
      this.startSessionNow();
      // }

      if (this.limitedInterval > 0) {
        await clearInterval(this.limitedInterval);
      }
      this.submitted = false;
      this.processing = false;

      this.currentTab = 4;
      this.Timer();
      // } else if (this.errorMessage != "") {
      //   this.$toast.open({
      //     message: this.errorMessage,
      //     type: this.errorType,
      //     duration: 5000,
      //   });
      // }
    },
    async startSessionNow() {
      // let payLoad = {};
      // if (this.sessionDetail.type == "assignment") {
      //   payLoad = {
      //     assignment_id: this.sessionDetail.assignmentId,
      //     session_shared_user_id: this.sessionDetail.peers,
      //     goals: this.sessionDetail.goals,
      //     date: this.sessionDetail.scheduledDate,
      //     start_time: this.sessionDetail.time,
      //     study_method: this.sessionDetail.studyMethod,
      //     subject: this.sessionType != "assignment" ? this.Subject.id : "",
      //     target_duration: this.sessionDetail.duration,
      //     repeat: this.sessionDetail.repeat,
      //     scheduled_status: "Now",
      //     break_time_at: this.sessionDetail.breakTimeAt,
      //     break_time: this.sessionDetail.breakTime,
      //   };
      // } else {
      //   payLoad = {
      //     session_shared_user_id: this.sessionDetail.peers,
      //     goals: this.sessionDetail.goals,
      //     date: this.sessionDetail.scheduledDate,
      //     start_time: this.sessionDetail.time,
      //     study_method: this.sessionDetail.studyMethod,
      //     subject: this.sessionDetail.subjectId,
      //     target_duration: this.sessionDetail.duration,
      //     repeat: this.sessionDetail.repeat,
      //     scheduled_status: "Now",
      //     break_time_at: this.sessionDetail.breakTimeAt,
      //     break_time: this.sessionDetail.breakTime,
      //   };
      // }
      // await this.saveStudySession(payLoad);
      // if (this.sessionDetail.isSharedSession) {
      //   this.sharedNewSessionId = this.sessionData.id;
      // }
      // if (this.successMessage != "") {
      //   this.$toast.open({
      //     message: this.successMessage,
      //     type: this.SuccessType,
      //     duration: 5000,
      //   });
      // }
      if (this.sessionDetail.isSharedSession) {
        let payLoad = {};
        if (this.sessionDetail.type == "assignment") {
          payLoad = {
            assignment_id: this.sessionDetail.assignmentId,
            session_shared_user_id: this.sessionDetail.peers,
            time: this.sessionDetail.time,
            date: this.sessionDetail.scheduledDate,
            type: this.sessionDetail.studyMethod,
            targetDuration: this.sessionDetail.duration,
            repeat: this.sessionDetail.repeat,
            break_time_at: this.sessionDetail.breakTimeAt,
            break_time: this.sessionDetail.breakTime,
            subject: this.sessionDetail.subjectNameId,
          };
        } else {
          payLoad = {
            session_shared_user_id: this.sessionDetail.peers,
            time: this.sessionDetail.time,
            date: this.sessionDetail.scheduledDate,
            type: this.sessionDetail.studyMethod,
            targetDuration: this.sessionDetail.duration,
            repeat: this.sessionDetail.repeat,
            break_time_at: this.sessionDetail.breakTimeAt,
            break_time: this.sessionDetail.breakTime,
            subject: this.sessionDetail.subjectId,
          };
        }
        await this.startStudySession(payLoad);

        this.sharedNewSessionId = this.startStudyResponse.id;

        if (this.successMessage != "") {
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
        }
      }
    },
    resetTab3() {
      this.sessionMode = "";
      this.addGoal = false;
      this.goalName = "";
      this.goalsList = [];
      // this.selectedAssignment = {};
      this.invitePeer = false;
      this.peerSelected = [];
      this.peerList = [];
      this.scheduledTime = {
        hh: "00",
        MM: "00",
        A: "am",
      };
      this.scheduledDate = "";
      this.Subject = "";
      this.repetitionCount = 1;
    },
    scheduleLaterClick(type, e) {
      e.preventDefault();
      e.stopPropagation();
      this.setSessionType(type, true);
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
          if (state != "skip") this.$router.push("/study-analytics");
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
    onAssignmentSelectroute(detail) {
      this.selectedAssignment = detail;
    },
  },

  destroyed() {
    window.removeEventListener("beforeunload", this.preventNav);
    window.removeEventListener(
      "orientationchange",
      this.handleOrientationChange
    );
  },
  beforeDestroy() {
    const endTime = new Date().getTime();
    const duration = (endTime - this.startTimeMixpanel) / 1000;
    const distinct_id = localStorage.getItem("distinctId");
    const page = "StudySession";
    this.$mixpanel.track("Page Duration", { duration, distinct_id, page });
  },
};
</script>



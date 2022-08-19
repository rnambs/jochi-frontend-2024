<template>
  <div>
    <div v-if="loading">Loading</div>

    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />

    <div class="main-section">
      <!-- Monthly Calander -->
      <div
        class="
          jochi-components-light-bg
          custom-margin-for-main-section custom-full-height
          position-realtive
        "
      >
        <section id="Monthly-Calander" class="h-100">
          <div class="element-section container-fluid h-100">
            <div class="row mt-0 h-100">
              <div class="col-12 position-realtive">
                <div class="planner-Month p-4 px-3 px-md-5">
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
                    <!-- <div class="dashboard-main-content jochi-components-light-bg py-4 h-100 d-flex flex-column">
                      <div class="d-flex justify-content-between align-items-center px-5 pb-3">
                        <h3 class="color-primary font-semi-bold">Pending</h3>
                        <button class="btn btn-dark py-1 px-3">
                          Add Assignment
                        </button>
                      </div>
                      <div class="d-flex flex-column h-40 flex-fill hidden-scroll py-4 px-5">
                        <div>
                          <div class="row">
                            <div class="col-6 px-0">
                              <div class="jochi-sub-components-light-bg drag-drop p-4 position-realtive h-100" @click="addAssignment()">
                                <div class="assignment-tag-section d-flex align-items-center mb-2">
                                  <div class="assignment-tag red mr-2">Urgent</div>
                                  <div class="assignment-tag pink">AP French</div>
                                </div>
                                <div class="assignment-add-section">
                                  <h4 class="mb-0 text-center">French Oral Practice</h4>
                                  <div class="text-center px-3">
                                    <p>Practice for mock oral exam in class</p>
                                  </div>
                                </div>
                                <div class="sub-task-section mb-3">
                                  <h6>Sub-tasks</h6>
                                  <div class="pl-2 d-flex align-items-center color-secondary">
                                    <input type="radio" class="mr-2" />
                                    <label for="" class="mb-0">Study Vocab List</label>
                                  </div>
                                  <div class="pl-2 d-flex align-items-center color-secondary">
                                    <input type="radio" class="mr-2" />
                                    <label for="" class="mb-0"
                                      >Start typing to add subtasks</label
                                    >
                                  </div>
                                </div>
                                <div class="addition-material-section">
                                  <h6 class="mb-1 font-medium">Additional Material</h6>
                                  <div
                                    class="
                                      d-flex
                                      align-items-center
                                      justify-content-between
                                    "
                                  >
                                    <div class="col-8 py-0 pl-0 material-link">
                                      <span class="color-secondary">Rubric: https://docs.google.com/document/...</span>
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
                                      <input
                                        type="submit"
                                        class="form-control"
                                        value="Add"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div class="add-person-section position-absolute top-0">
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
                                  comment here
                                   <div class="ap-img-add">
                                    <img src="~/static/image/add-btn.png" alt="" />
                                  </div>
                                  comment end
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    <div class="d-flex flex-column px-5 pt-3"> 
                      <h3 class="color-primary font-semi-bold">Completed</h3>
                      <span class="drop color-secondary text-16">Drag and drop your assignment here when it is completed</span>
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
                    <div class="jochi-components-light-bg p-4 pl-5 position-absolute pending-assignment-popup">
                      <div class="d-flex justify-content-between align-items-center">
                        <h1>Test</h1>
                        <button class="btn pending-popup-close-btn" @click="pendingPopupclose()">x</button>
                      </div>
                    </div> -->
                    <div
                      class="
                        jochi-components-light-bg
                        py-4
                        h-100
                        d-flex
                        flex-column
                        position-relative
                      "
                    >
                      <lottie
                        v-if="playCelebration"
                        :options="lottieOptionsSuccess"
                        v-on:animCreated="handleAnimation"
                        class="position-absolute top-0 w-100 h-100 z-index-9"
                      />
                      <div
                        class="
                          d-flex
                          justify-content-between
                          align-items-center
                          px-5
                          pb-3
                        "
                      >
                        <h2 class="color-primary font-semi-bold">Pending</h2>
                        <button
                          @click="
                            openAssignment = true;
                            isAddAssignment = true;
                          "
                          class="btn btn-dark py-1 px-3"
                        >
                          Add Assignment
                        </button>
                      </div>
                      <!-- <div class="col-6 px-0">
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
                          <img src="~/static/image/add-btn.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div> -->
                      <!-- drag -->
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
                            <div
                              class="col-6 py-4"
                              v-for="item in pendingAssignments"
                              :key="item.id"
                            >
                              <drag
                                class="drag h-100"
                                :transfer-data="{ item }"
                              >
                                <div
                                  @click="onCardClick()"
                                  class="
                                    jochi-sub-components-light-bg
                                    drag-drop
                                    p-4
                                    position-realtive
                                    h-100
                                    cursor-pointer
                                  "
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
                                      {{
                                        item.priority == "1"
                                          ? "Urgent"
                                          : item.priority == "2"
                                          ? "Important"
                                          : item.priority == "3"
                                          ? "Can Wait"
                                          : ""
                                      }}
                                    </div>
                                    <div class="assignment-tag pink">
                                      {{ item.subject }}
                                    </div>
                                  </div>
                                  <div class="assignment-add-section">
                                    <h4 class="mb-0">{{ item.task }}</h4>
                                    <div class="text-center px-3">
                                      <p>{{ item.assignment_description }}</p>
                                    </div>
                                  </div>
                                  <div class="sub-task-section mb-3">
                                    <h6>Sub-tasks</h6>
                                    <div
                                      @click="confirmComplete"
                                      v-for="sub in item.subTasks"
                                      :key="sub.id"
                                      class="
                                        pl-2
                                        d-flex
                                        align-items-center
                                        color-secondary
                                      "
                                    >
                                      <input type="radio" class="mr-2" />
                                      <label for="" class="mb-0">{{
                                        sub.title
                                      }}</label>
                                    </div>
                                    <div
                                      v-if="
                                        !item.subTasks ||
                                        item.subTasks.length <= 0
                                      "
                                      class="pl-2 d-flex align-items-center"
                                    >
                                      <span class="color-secondary text-12"
                                        >No sub tasks added!</span
                                      >
                                    </div>
                                    <!-- <div class="pl-2 d-flex align-items-center">
                              <input type="radio" class="mr-2" />
                              <label for="" class="mb-0"
                                >Start typing to add subtasks</label
                              >
                            </div> -->
                                  </div>
                                  <div
                                    v-if="item.assignment_materials"
                                    class="addition-material-section"
                                  >
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
                                      <div
                                        class="col-8 py-0 pl-0 material-link"
                                      >
                                        <span class="color-secondary">
                                          <!-- Rubric: -->
                                          {{
                                            item.assignment_materials.material
                                          }}
                                        </span>
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
                                  <!-- <div class="upload-file-section mt-2">
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
                              </div> -->
                                  <div
                                    v-for="peer in item.peers"
                                    :key="peer"
                                    class="
                                      add-person-section
                                      position-absolute
                                      top-0
                                    "
                                  >
                                    <div class="ap-img-section mr--3 shadow-sm">
                                      <img :src="peer.profile_pic" alt="" />
                                    </div>
                                    <!-- <div
                                  class="ap-img-section mr--3 shadow-sm"
                                ></div>
                                <div
                                  class="ap-img-section mr--3 shadow-sm"
                                ></div>
                                <div class="ap-img-section shadow-sm"></div> -->
                                    <!-- <div class="ap-img-add">
                              <img src="~/static/image/add-btn.png" alt="" />
                            </div> -->
                                  </div>
                                </div>
                              </drag>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- drag end -->
                      <div class="d-flex flex-column pt-3 h-40 flex-fill">
                        <drop
                          class="
                            drop
                            color-secondary
                            text-16
                            h-100
                            d-flex
                            flex-column
                          "
                          @drop="handleDrop"
                        >
                          <h2 class="color-primary font-semi-bold px-5">
                            Completed This Month
                          </h2>
                          <p class="mb-0 px-5 color-secondary font-regular">
                            Drag and drop your assignment here when it is
                            completed
                          </p>
                          <div
                            class="d-flex flex-column h-100 hidden-scroll px-5"
                          >
                            <div class="row mt-1">
                              <div
                                v-for="item in completedAssignments"
                                :key="item.id"
                                class="col-6"
                              >
                                <div
                                  class="
                                    jochi-sub-components-light-bg
                                    py-4
                                    px-2
                                    completed-assignments
                                    text-center
                                    h-100
                                  "
                                >
                                  <h4 class="mb-0 blue">{{ item.task }}</h4>
                                  <p
                                    v-for="sub in item.subTasks"
                                    class="mb-0"
                                    :key="sub.id"
                                  >
                                    {{ sub.title }}
                                  </p>
                                </div>
                              </div>
                              <!-- <div class="col-6">
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
                          </div> -->
                            </div>
                          </div>
                        </drop>
                      </div>
                      <div
                        v-if="openAssignment"
                        class="position-absolute w-100 h-100 top-0 left-0 p-3"
                      >
                        <div
                          class="
                            d-flex
                            card card-primary-void
                            flex-column
                            h-100
                            p-4
                            rounded-22
                          "
                        >
                          <div
                            class="
                              d-flex
                              justify-content-between
                              mb-2
                              border-bottom
                            "
                          >
                            <h3 class="color-primary font-semi-bold">
                              {{ isAddAssignment ? "Add" : "Edit" }} Assignment
                            </h3>
                            <p class="mb-0 cursor-pointer">
                              <span
                                @click="
                                  openAssignment = false;
                                  isAddAssignment = true;
                                "
                                ><i class="fas fa-times"></i
                              ></span>
                            </p>
                          </div>
                          <!-- <div class="d-flex flex-column custom-overflow">
                        <div class="d-flex flex-column mb-2">
                          <h5 class="color-dark mb-1 font-semi-bold">
                            Assignment details
                          </h5>
                          <p class="mb-0 color-secondary font-regular text-16">
                            Mathematics
                          </p>
                          <p
                            class="mb-0 color-secondary font-regular text-16"
                          ></p>
                        </div>
                        <div class="d-flex flex-column mb-2">
                          <h5 class="color-dark mb-1 font-semi-bold">
                            Sub-task
                          </h5>
                          <p
                            class="
                              mb-0
                              color-secondary
                              font-regular
                              text-16
                              d-flex
                              align-items-center
                            "
                          >
                            No sub tasks added!
                          </p>
                        </div>
                        <div class="d-flex flex-column mb-2">
                          <h5 class="color-dark mb-1 font-semi-bold">
                            Additional Materials
                          </h5>
                          <p
                            class="
                              mb-0
                              color-secondary
                              font-regular
                              text-16
                              mb-1
                            "
                          >
                            Material-link : <span>Mathematics</span>
                          </p>
                          <p
                            class="
                              mb-0
                              color-secondary
                              font-regular
                              text-16
                              mb-1
                            "
                          >
                            Material-date : <span>12/04/22</span>
                          </p>
                        </div>
                        <div class="d-flex flex-column mb-2">
                          <h5 class="color-dark mb-1 font-semi-bold">Labels</h5>
                          <div class="d-flex flex-column">
                            <div
                              class="
                                assignment-tag-section
                                d-flex
                                align-items-center
                                mb-2
                              "
                            >
                              <div class="assignment-tag red mr-2">Urgent</div>
                              <div class="assignment-tag pink">Other</div>
                            </div>
                          </div>
                        </div>
                      </div> -->
                          <div
                            class="
                              d-flex
                              flex-column
                              custom-overflow
                              pr-3
                              me--3
                            "
                          >
                            <form ref="assignmentForm" id="assignmentForm">
                              <div class="form-group">
                                <label
                                  for="recipient-name"
                                  class="col-form-label"
                                  >Subject<em>*</em></label
                                >
                                <select
                                  class="form-control"
                                  tabindex=""
                                  v-model="subject"
                                  :class="{
                                    'is-invalid':
                                      submitted && $v.subject.$error,
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
                                  <option v-if="subjectsData.length == 0">
                                    No data
                                  </option>
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
                                  >Assignment Name<em>*</em></label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  id="message-text"
                                  v-model="assignmentName"
                                  maxlength="125"
                                  placeholder="Enter assignment name"
                                  :class="{
                                    'is-invalid':
                                      submitted && $v.assignmentName.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.assignmentName.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.assignmentName.required"
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
                                  v-model="assignmentDescription"
                                  maxlength="500"
                                  placeholder="Enter assignement description"
                                  :class="{
                                    'is-invalid':
                                      submitted &&
                                      $v.assignmentDescription.$error,
                                  }"
                                ></textarea>
                                <div
                                  v-if="
                                    submitted && $v.assignmentDescription.$error
                                  "
                                  class="invalid-feedback"
                                >
                                  <span
                                    v-if="!$v.assignmentDescription.required"
                                    >This field is required</span
                                  >
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 ml-auto">
                                  <div class="form-group mb-0">
                                    <label
                                      for="recipient-name"
                                      class="col-form-label"
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
                                            priorityVal
                                              ? priorityVal
                                              : "Select priority"
                                          }}</span
                                        >
                                      </button>
                                      <ul
                                        class="dropdown-menu"
                                        aria-labelledby="dLabel"
                                      >
                                        <li
                                          @click="priorityVal = 'Can Wait'"
                                          class="item"
                                        >
                                          <div class="low-color"></div>
                                          Can Wait
                                        </li>
                                        <li
                                          @click="priorityVal = 'Important'"
                                          class="item"
                                        >
                                          <div class="medium-color"></div>
                                          Important
                                        </li>
                                        <li
                                          @click="priorityVal = 'Urgent'"
                                          class="item"
                                        >
                                          <div class="high-color"></div>
                                          Urgent
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div
                                    v-if="
                                      submitted &&
                                      priorityVal != 'Urgent' &&
                                      priorityVal != 'Important' &&
                                      priorityVal != 'Can Wait'
                                    "
                                    class="invalid-feedback"
                                    style="display: block"
                                  >
                                    <span
                                      v-if="
                                        priorityVal != 'Urgent' &&
                                        priorityVal != 'Important' &&
                                        priorityVal != 'Can Wait'
                                      "
                                      >This field is required</span
                                    >
                                  </div>
                                </div>
                                <div class="col-md-6 ml-auto">
                                  <div class="form-group">
                                    <label
                                      for="recipient-name"
                                      class="col-form-label"
                                      >Date<em>*</em></label
                                    >
                                    <date-picker
                                      class="form-control"
                                      placeholder="MM/DD/YYYY"
                                      format="MM/dd/yyyy"
                                      v-model="dateValue"
                                      :class="{
                                        'is-invalid':
                                          submitted && $v.dateValue.$error,
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
                              <div class="row mt-0">
                                <div class="col-6">
                                  <div class="form-group">
                                    <label
                                      for="recipient-name"
                                      class="col-form-label"
                                      >Time<em>*</em></label
                                    >
                                    <div>
                                      <vue-timepicker
                                        close-on-complete
                                        format="hh:mm A"
                                        v-model="timeValue"
                                        name="timeValue"
                                        class="show-cursor"
                                        :value="timeValue"
                                        :class="{
                                          'is-invalid':
                                            submitted && $v.timeValue.$error,
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
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                  mb-2
                                "
                              >
                                <h6 class="color-dark font-semi-bold mb-0">
                                  Sub Tasks
                                </h6>
                                <a @click="onAddSubTaskClick;" class="btn p-0">
                                  <span class="color-secondary"
                                    ><i class="fas fa-plus-circle"></i
                                  ></span>
                                </a>
                              </div>
                              <div
                                v-if="addSubTask"
                                class="d-flex flex-row align-items-start"
                              >
                                <div class="form-row mb-2 mx-0 mr-2 w-100">
                                  <label class="form-label" for="name"
                                    >Add a sub task</label
                                  >
                                  <input
                                    type="text"
                                    maxlength="100"
                                    v-model="subTaskName"
                                    class="form-control"
                                  />
                                </div>
                                <div class="pt-4">
                                  <button
                                    class="btn btn-primary btn-sm mt-2"
                                    @click="onAddNewSubTask"
                                  >
                                    Add
                                  </button>
                                </div>
                              </div>
                              <div
                                class="
                                  custom-overflow
                                  pr-2
                                  mr--2
                                  d-flex
                                  flex-column
                                "
                              >
                                <div
                                  v-for="subTask in subTasksList"
                                  :key="subTask"
                                >
                                  <div
                                    class="
                                      card card-transparent
                                      show-icon
                                      p-1
                                      mb-1
                                    "
                                  >
                                    <div
                                      class="
                                        d-flex
                                        align-items-center
                                        justify-content-between
                                      "
                                    >
                                      <p
                                        class="
                                          mb-0
                                          color-secondary
                                          text-16
                                          font-regular
                                          text-truncate
                                          pr-3
                                        "
                                      >
                                        <span
                                          ><i class="far fa-circle"></i
                                        ></span>
                                        {{ subTask }}
                                      </p>
                                      <span
                                        @click="deleteSubTask(subTask)"
                                        class="
                                          color-primary
                                          fa-icon
                                          show-hover
                                          d-none
                                          btn
                                          p-0
                                        "
                                        ><i class="fas fa-trash-alt"></i
                                      ></span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                  mb-2
                                "
                              >
                                <h6 class="color-dark font-semi-bold mb-0">
                                  Invite Peers
                                </h6>
                                <a @click="onInviteClick" class="btn p-0">
                                  <span class="color-secondary"
                                    ><i class="fas fa-plus-circle"></i
                                  ></span>
                                </a>
                              </div>
                              <div
                                v-if="invitePeer"
                                class="d-flex flex-row align-items-start"
                              >
                                <div class="form-row mb-2 mx-0 mr-2 w-100">
                                  <label class="form-label" for="name"
                                    >Invite peers</label
                                  >
                                  <!-- <input type="text" class="form-control" /> -->
                                  <multiselect
                                    v-model="peerSelected"
                                    :options="students"
                                    track-by="first_name"
                                    label="first_name"
                                    :placeholder="
                                      peerSelected.length > 3
                                        ? ''
                                        : 'Select students'
                                    "
                                    :multiple="true"
                                    :max="4"
                                  >
                                    <span slot="maxElements"
                                      >Maximum of 4 students selected</span
                                    >
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
                              <div class="hidden-scroll p-3 row my-0">
                                <div
                                  v-for="peer of peerList"
                                  :key="peer.id"
                                  class="h-fit-content"
                                >
                                  <div
                                    class="
                                      d-flex
                                      align-items-center
                                      my-2
                                      mr-3
                                      min-w-200
                                    "
                                  >
                                    <div class="ld-img-section mr-3">
                                      <div class="ld-img-holder"></div>
                                    </div>
                                    <div class="ld-details-section">
                                      <p class="ld-heading mb-1">
                                        {{ peer.first_name }}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>

                          <button
                            type="button"
                            class="btn btn-primary py-1 px-3 rounded-pill"
                            :disabled="processing"
                            @click="
                              isAddAssignment
                                ? AddAssignment()
                                : UpdateAssignment()
                            "
                          >
                            {{ isAddAssignment ? "Add" : "Update" }}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      class="
                        jochi-components-light-bg
                        p-4
                        pl-5
                        position-absolute
                        overflow-auto
                        d-block
                        pending-assignment-popup
                      "
                    >
                      <!-- pending-assignment-popup -->
                      <div
                        class="
                          d-flex
                          justify-content-between
                          align-items-center
                        "
                      >
                        <h4 class="jochi-headings mb-0">Edit Assignment</h4>
                        <button
                          class="btn pending-popup-close-btn"
                          @click="pendingPopupclose()"
                        >
                          x
                        </button>
                      </div>
                      <div class="edit-assignment-form-section col-9">
                        <label for="">Assignment Name</label>
                        <input type="text" class="form-control mb-1" />
                        <label for="">Assignment Description</label>
                        <textarea
                          name=""
                          id=""
                          cols="20"
                          rows="5"
                          class="form-control mb-1"
                        ></textarea>
                        <div
                          class="
                            d-flex
                            justify-content-between
                            align-items-center
                            mb-2
                          "
                        >
                          <label for="" class="mb-0">Add Subtask</label>
                          <button
                            @click="addSubtask()"
                            class="add-sub-task-btn"
                          >
                            +
                          </button>
                        </div>
                        <input type="text" class="form-control mb-1" />
                        <form id="subTaskAdd"></form>
                        <label for="">Additional Material</label>
                        <select
                          class="form-select form-control mb-2"
                          aria-label="Default select example"
                        >
                          <option selected>Type</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                        <div class="row m-0">
                          <div class="col-9 py-0 pl-0">
                            <input
                              type="text"
                              class="form-control px-2"
                              placeholder="Paste Link or Upload File"
                            />
                          </div>
                          <div class="col-3 p-0">
                            <input
                              type="submit"
                              class="form-control"
                              value="Add"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal -->
          <div
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
                  <form ref="studyTimeForm" class="container">
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
                          class="invalid-feedback"
                          style="display: block"
                        >
                          <span
                            v-if="
                              priorityVal != '1' &&
                              priorityVal != '2' &&
                              priorityVal != '3'
                            "
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
                              close-on-complete
                              format="hh:mm A"
                              v-model="timeValue"
                              name="timeValue"
                              class="show-cursor"
                              :value="timeValue"
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
                          </div>
                          <!-- <input type="text" class="form-control"> -->
                        </div>
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
                    @click="
                      isAssignmentEdit ? UpdateAssignment() : AddAssignment()
                    "
                    :disabled="processing"
                  >
                    <!-- data-dismiss="modal" -->
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- meeing detil pop up -->
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
                      <td class="tmodal-data text-nowrap">Meeting Type</td>
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
          </div>
          <!-- edit modal -->
        </section>
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
              <div class="form-row">
                <select
                  class="form-control"
                  tabindex=""
                  v-model="filterType"
                  :class="{
                    'is-invalid': submitted && $v.Subject.$error,
                  }"
                >
                  <option value="">All</option>

                  <option value="Assignments">Assignment</option>
                  <option value="Meetings">Meeting</option>
                  <option value="Session">Study Session</option>
                </select>
              </div>
            </div>
            <div class="modal-footer px-4">
              <button
                @click="applyFilter"
                class="btn btn-primary px-4 py-1 rounded-pill"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- filter modal end -->

      <!-- End Monthly Calander -->
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";
import FullCalendar, { Calendar } from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import "../../static/css/var.scss";
import moment from "moment";
var fromDate = "";
var endDate = "";
var idValue = "";
var eventList = [];
var dateValueNum = "";

export default {
  name: "PlannerMonth",
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
      dateValue: "",
      dateValueEdit: "",
      idValue: "",
      idNum: "",
      value: "",
      popTitle: "",
      popMeeting: "",
      popTime: "",
      popDate: "",
      dateListValue: "",
      meetingDetails: [],
      calendarDate: "",
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      calendarApi: Calendar,
      calendarOptions: {
        showNonCurrentDates: false,
        displayEventTime: false,
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
        plugins: [dayGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev",
          center: "title",
          right: "next",
        },
        datesRender: this.handleDatesRender,
        initialView: "dayGridMonth",
        unselectAuto: false,
        selectable: true,
        events: eventList,
        eventClick: this.eventClicked,
        datesSet: this.handleMonthChange,
        dayMaxEventRows: true, // for all non-TimeGrid views
        views: {
          dayGrid: {
            dayMaxEventRows: 4, // adjust to 6 only for timeGridWeek/timeGridDay
            //
            // },
          },
        },
      },
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
      playCelebration: false,
      completeSubTasktId: 0,
      openAssignment: false,
      isAddAssignment: true,
      pendingAssignments: [],
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
    this.getAssignmentsList();
    this.getAllCompletedAssignments();
    this.calendarApi = this.$refs.fullCalendar.getApi();
    this.GetMonthlyPlanner();
    //priority
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
        // autoUpdateInput: false,
        singleDatePicker: true,
        minDate: today,
        maxDate: future,
        opens: "left",
        locale: {
          // format: "DD-MM-YYYY",
          cancelLabel: "Clear",
        },
      });

      $('input[name="daterange"]').on(
        "apply.daterangepicker",
        function (ev, picker) {
          $(this).val(picker.startDate.format("YYYY/MM/DD"));
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
    ...mapState("plannerMonth", {
      plannerList: (state) => state.plannerList,
      assignment: (state) => state.assignment,
      meetingList: (state) => state.meetingList,
      assignmentValue: (state) => state.assignmentValue,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      subjectsData: (state) => state.subjectsData,
      sessionList: (state) => state.sessionList,
      sharedSessionList: (state) => state.sharedSessionList,
    }),
    ...mapState("quotedMessage", {
      quoteMessage: (state) => state.quoteMessage,
      viewed: (state) => state.viewed,
      // plannerList: (state) => state.plannerList,
      // meetingList: (state) => state.meetingList,
      assignment: (state) => state.assignment,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      subjectsData: (state) => state.subjectsData,
      assignmentsList: (state) => state.assignmentsList,
      sharedAssignmentsList: (state) => state.sharedAssignmentsList,
      completedAssignments: (state) => state.completedAssignments,
    }),
    ...mapState("teacherMeeting", {
      students: (state) => state.students,
      students: (state) => state.students,
    }),
    ...mapActions("teacherMeeting", {
      getStudents: "getStudents",
    }),
  },
  methods: {
    assignmentPlanner() {
      this.$el.querySelector("#assignmentPlanner").classList.toggle("active");
      this.$el.querySelector("#assignPlanSection").classList.toggle("active");
    },
    ...mapActions("plannerMonth", {
      getMonthlyPlanner: "getMonthlyPlanner",
      addAssignment: "addAssignment",
      getAssignment: "getAssignment",
      updateAssignment: "updateAssignment",
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
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async GetSubjectList() {
      await this.getSubjectsList({});
    },
    goPrev() {
      this.calendarApi.prev(); // call a method on the Calendar object
      this.GetMonthlyPlanner();
    },

    goNext() {
      this.calendarApi.next();
      this.GetMonthlyPlanner();
    },

    async GetMonthlyPlanner() {
      eventList = [];
      this.loading = true;
      const format = "YYYY-MM-DD";

      this.calendarDate = moment(this.calendarApi.view.activeStart).format(
        format
      );

      await this.getMonthlyPlanner({
        user_id: localStorage.getItem("id"),
        type: "Monthly",
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
        var start = element.due_date;
        var date = this.dateValue;
        var id = element.id;
        plannerObj["title"] = title;
        plannerObj["color"] = color;
        plannerObj["start"] = start;
        plannerObj["id"] = id;
        plannerObj["date"] = date;
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
        var start = dateMeeting;
        // + "T" + tmeMeeting;
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
      this.sessionList.forEach((element) => {
        var meetingobj = {};
        var listobj = {};
        let title = "";
        if (element.assignment_id) {
          title = "Study Session " + element.assignments?.task;
        } else {
          title = "Study Session " + element.subject?.subject_name;
        }

        // var meeting = element.meeting_type;
        // if (meeting == "Peer") {
        // var color = "#64B5FC";
        // } else if (meeting == "Club") {
        //   var color = "#07BEB8";
        // } else if (meeting == "Teacher") {
        const color = element.subject?.color_code;
        // }
        var dateMeeting = element.date;
        var timeValNum = element.time;
        var tmeMeeting = this.formatAMPM(element.time);
        var start = dateMeeting + "T" + tmeMeeting;
        meetingobj["title"] = title;
        meetingobj["color"] = color;
        meetingobj["start"] = start;
        meetingobj["id"] = element.id;
        // meetingobj["groupId"] = "Meeting";

        listobj["title"] = title;
        listobj["meeting"] = "Study Session";
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.meetingDetails.push(listobj);
        eventList.push(meetingobj);
      });
      this.sharedSessionList.forEach((element) => {
        var meetingobj = {};
        var listobj = {};
        let title = "";
        if (element.assignment_id) {
          title =
            "Study Session For Assignment: " +
            element.studyroom?.assignments?.task;
        } else {
          title =
            "Study Session For Regular Study: " +
            element.studyroom.subject?.subject_name;
        }

        // var meeting = element.meeting_type;
        // if (meeting == "Peer") {
        // var color = "#64B5FC";
        // } else if (meeting == "Club") {
        //   var color = "#07BEB8";
        // } else if (meeting == "Teacher") {
        const color = element.subject?.color_code;
        // }
        var dateMeeting = element.date;
        var timeValNum = element.time;
        var tmeMeeting = this.formatAMPM(element.start_time);
        var start = dateMeeting + "T" + tmeMeeting;
        meetingobj["title"] = title;
        meetingobj["color"] = color;
        meetingobj["start"] = start;
        meetingobj["id"] = element.id;
        // meetingobj["groupId"] = "Meeting";

        listobj["title"] = title;
        listobj["meeting"] = "Study Session";
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
        this.GetMonthlyPlanner();
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
    async UpdateAssignment() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.processing = true;

      if (this.priorityVal == "High") {
        this.priorityVal = "1";
      } else if (this.priorityVal == "Medium") {
        this.priorityVal = "2";
      } else if (this.priorityVal == "Low") {
        this.priorityVal = "3";
      }

      this.loading = true;
      const dfE = moment(this.dateValue).format("YYYY-MM-DD");
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
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.resetAssignment();
        this.GetMonthlyPlanner();
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
      this.timeValue = "";
      this.subject = "";
      this.task = "";
      this.taskValue = "";
      this.timeList = "";
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
        this.resetAssignment();
        this.isAssignmentEdit = true;

        // $("#editModalCenter").modal("show");
        $("#exampleModalCenter").modal("show");

        this.GetAssignment(idValue);
      } else {
        this.resetAssignment();
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
      if (this.calendarStart != dateInfo.startStr) {
        this.calendarStart = dateInfo.startStr;
        this.calendarEnd = dateInfo.endStr;
      }
      var dateStr = dateInfo.startStr;
      var date = new Date(dateStr);
      date.setDate(date.getDate() + 7);
      var dateval = new Date(date),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      this.calendarDate = [date.getFullYear(), mnth, day].join("-");
    },
    async getAssignmentsList() {
      this.pendingAssignments = [];
      await this.getAssignments();
      console.log(this.assignmentsList);
      console.log(this.sharedAssignmentsList);
      this.mapAssignments();
    },
    mapAssignments() {
      if (this.assignmentsList && this.assignmentsList.length > 0) {
        this.assignmentsList.forEach((e) => {
          let item = {};
          item.assignment_description = e.assignment_description;
          item.assignment_materials = e.assignment_materials;
          item.completed_date = e.completed_date;
          item.dueTimeFormat = e.dueTimeFormat;
          item.due_date = e.due_date;
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
          item.peers = this.mapPeers(e.id);
          this.pendingAssignments.push(item);
        });
      }
    },
    mapPeers(id) {
      let peers = [];
      if (this.sharedAssignmentsList && this.sharedAssignmentsList.length > 0) {
        this.peers = this.sharedAssignmentsList.filter(
          (e) => e.assignment_id == id
        );
      }
      return peers;
    },
    handleDrop(data, event) {
      $("#completeConfirm").modal({ backdrop: true });

      let assignment = data.item;
      this.completeAsstId = assignment.id;
    },
    async completeAssignment() {
      this.processingCompleteAssignment = true;
      await this.completeTask({
        assignment_id: this.completeAsstId,
        status: "Completed",
      });
      this.processingCompleteAssignment = false;
      if (this.successMessage != "") {
        this.getAssignmentsList();
        this.getAllCompletedAssignments();
        this.completeAsstId = 0;
        this.playCelebration = true;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });

        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
        const myTimeout = setTimeout(() => {
          this.playCelebration = false;
        }, 5000);
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.GetDailyPlanner();
    },
    async completeSubTask() {
      this.processingCompleteAssignment = true;
      await this.completeTask({
        task_id: this.completeSubTasktId,
        status: "Completed",
      });
      this.processingCompleteAssignment = false;
      if (this.successMessage != "") {
        this.completeSubTasktId = 0;
        this.playCelebration = true;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });

        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.GetDailyPlanner();
    },
    onCardClick() {
      this.isAddAssignment = false;
      this.openAssignment = true;
      // this.subject
      // this.assignmentName
      // this.assignmentDescription
      // this.priorityVal
      // this.timeValue
      // this.subTasksList
      // this.peerSelected
    },
    async getAllCompletedAssignments() {
      await this.getCompletedAssignments({
        userId: localStorage.getItem("id"),
        date: moment().format("YYYY-MM-DD"),
        type: "Monthly",
      });
      console.log(this.completedAssignments);
    },
    confirmComplete(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    filterPlanner() {
      $("#filterModal").modal("show");
    },
    async applyFilter() {
      if (!this.filterType) {
        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
        return this.GetMonthlyPlanner();
      }
      eventList = [];
      this.loading = true;
      const format = "YYYY-MM-DD";
      this.calendarDate = moment(this.calendarApi.view.activeStart).format(
        format
      );

      await this.getWeeklyPlannerFilter({
        plannerType: "Monthly",
        date: this.calendarDate,
        filter: this.filterType,
      });
      $(".modal").modal("hide");
      $(".modal-backdrop").remove();
      this.meetingDetails = [];
      console.log("planner list", this.plannerList);
      console.log("meeting list", this.meetingList);
      console.log("session list", this.sessionList);
      console.log("shared list", this.sharedSessionList);
      this.plannerList.forEach((element) => {
        var plannerObj = {};
        var title = element.assignment_description;
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
        // var start = element.dateISOFormat;
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
      this.sessionList.forEach((element) => {
        var meetingobj = {};
        var listobj = {};
        let title = "";
        if (element.assignment_id) {
          title = "Study Session " + element.assignments?.task;
        } else {
          title = "Study Session " + element.subject?.subject_name;
        }

        // var meeting = element.meeting_type;
        // if (meeting == "Peer") {
        // var color = "#64B5FC";
        // } else if (meeting == "Club") {
        //   var color = "#07BEB8";
        // } else if (meeting == "Teacher") {
        const color = element.subject?.color_code;
        // }
        var dateMeeting = element.date;
        var timeValNum = element.time;
        var tmeMeeting = this.formatAMPM(element.time);
        var start = dateMeeting + "T" + tmeMeeting;
        meetingobj["title"] = title;
        meetingobj["color"] = color;
        meetingobj["start"] = start;
        meetingobj["id"] = element.id;
        // meetingobj["groupId"] = "Meeting";

        listobj["title"] = title;
        listobj["meeting"] = "Study Session";
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.meetingDetails.push(listobj);
        eventList.push(meetingobj);
      });
      this.sharedSessionList.forEach((element) => {
        var meetingobj = {};
        var listobj = {};
        let title = "";
        if (element.assignment_id) {
          title =
            "Study Session For Assignment: " +
            element.studyroom?.assignments?.task;
        } else {
          title =
            "Study Session For Regular Study: " +
            element.studyroom.subject?.subject_name;
        }

        // var meeting = element.meeting_type;
        // if (meeting == "Peer") {
        // var color = "#64B5FC";
        // } else if (meeting == "Club") {
        //   var color = "#07BEB8";
        // } else if (meeting == "Teacher") {
        const color = element.subject?.color_code;
        // }
        var dateMeeting = element.date;
        var timeValNum = element.time;
        var tmeMeeting = this.formatAMPM(element.start_time);
        var start = dateMeeting + "T" + tmeMeeting;
        meetingobj["title"] = title;
        meetingobj["color"] = color;
        meetingobj["start"] = start;
        meetingobj["id"] = element.id;
        // meetingobj["groupId"] = "Meeting";

        listobj["title"] = title;
        listobj["meeting"] = "Study Session";
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.meetingDetails.push(listobj);
        eventList.push(meetingobj);
      });
      console.log("events console", eventList);
      this.calendarOptions.events = eventList;
      this.loading = false;
    },
  },
};
</script>

<style>
/* .display-picture-holder {
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
} */

/* .fc .fc-scrollgrid {
  border-radius: 12px;
  overflow: hidden;
} */

/* .fc-toolbar-chunk .fc-toolbar-title {
    position: absolute;
    left: 3rem;
    top: 3rem;
    font-size: 20px;
    color: #000000;
    font-weight: 700;
} */

/* .fc-toolbar-chunk .fc-prev-button.fc-button {
    position: absolute;
    right: 6rem;
}

.fc .fc-button .fc-icon {
    color: #a28cf6;
    font-size: 1em;
    line-height: 1em;
    margin: 0;
} */

/* .fc-toolbar-chunk .fc-next-button.fc-button,
.fc-toolbar-chunk .fc-prev-button.fc-button {
    background: none;
    border: 1px solid #b4b4b4;
    display: flex;
    justify-content: center;
    align-items: center;
} */

/* .fc-toolbar-chunk .fc-next-button.fc-button {
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

/* .jochi-components-light-bg.pending-assignment-popup {
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
  right: -164px;
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
  right: -80rem;
  bottom: 0;
  z-index: 5;
  transition: ease-in-out all 0.8s;
  pointer-events: none;
}

.assignment-planner-section.active {
  pointer-events: visible;
  right: 3rem;
  transition: ease-in-out all 0.8s;
}

.assignment-planner-section .jochi-components-light-bg {
  background-color: #ffffff;
  height: 100%;
} */
</style>
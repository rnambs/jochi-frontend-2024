<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div class="main-section">
      <!-- Daily Calander -->

      <section id="Daily-Calander" class="">
        <div class="custom-margin-for-main-section custom-full-height d-flex">
          <div class="d-flex flex-column flex-fill">
            <div class="row h-100">
              <div class="col-lg-5 col-md-12 h-100">
                <div class="jochi-components-light-bg p-4 h-100">
                  <h2 class="color-primary font-semi-bold mb-1">Today,</h2>
                  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                </div>
              </div>
              <div class="col-lg-7 col-md-12 position-realtive h-100">
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
                    loop="1"
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
                          v-for="item in assignmentsList"
                          :key="item.id"
                        >
                          <drag class="drag h-100" :transfer-data="{ item }">
                            <div
                              @click="onCardClick()"
                              class="
                                jochi-sub-components-light-bg
                                drag-drop
                                p-4
                                position-realtive
                                h-100
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
                                    !item.subTasks || item.subTasks.length <= 0
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
                                  <div class="col-8 py-0 pl-0 material-link">
                                    <span class="color-secondary">
                                      <!-- Rubric: -->
                                      {{ item.assignment_materials.material }}
                                    </span>
                                  </div>
                                  <div
                                    class="col-4 material-date py-0 text-right"
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
                          </drag>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- drag end -->
                  <div class="d-flex flex-column px-5 pt-3">
                    <drop
                      class="drop color-secondary text-16"
                      @drop="handleDrop"
                    >
                      <h2 class="color-primary font-semi-bold">Completed</h2>
                      Drag and drop your assignment here when it is completed
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
                        <p class="mb-0">
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
                      <form ref="assignmentForm" id="assignmentForm">
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
                                submitted && $v.assignmentDescription.$error,
                            }"
                          ></textarea>
                          <div
                            v-if="submitted && $v.assignmentDescription.$error"
                            class="invalid-feedback"
                          >
                            <span v-if="!$v.assignmentDescription.required"
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
                                  <li class="item">
                                    <div class="low-color"></div>
                                    Can Wait
                                  </li>
                                  <li class="item">
                                    <div class="medium-color"></div>
                                    Important
                                  </li>
                                  <li class="item">
                                    <div class="high-color"></div>
                                    Urgent
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
                              <label for="recipient-name" class="col-form-label"
                                >Time<em>*</em></label
                              >
                              <div>
                                <vue-timepicker
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
                          <a @click="onAddSubTaskClick" class="btn p-0">
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
                          class="custom-overflow pr-2 mr--2 d-flex flex-column"
                        >
                          <div v-for="subTask in subTasksList" :key="subTask">
                            <div
                              class="card card-transparent show-icon p-1 mb-1"
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
                                  <span><i class="far fa-circle"></i></span>
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
                                peerSelected.length > 3 ? '' : 'Select students'
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

                      <button
                        type="button"
                        class="btn btn-primary py-1 px-3 rounded-pill"
                        :disabled="processing"
                        @click="
                          isAddAssignment ? AddAssignment() : UpdateAssignment()
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
                    class="d-flex justify-content-between align-items-center"
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
                      <button @click="addSubtask()" class="add-sub-task-btn">
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
                        <input type="submit" class="form-control" value="Add" />
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
    </div>

    <!-- modal add assignment -->
    <div
      class="modal fade"
      id="addAssignmentModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addAssignmentModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addAssignmentModalLongTitle">
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
          <div class="modal-body px-4">
            <form ref="assignmentForm" id="assignmentForm">
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
                    'is-invalid': submitted && $v.assignmentName.$error,
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
                    'is-invalid': submitted && $v.assignmentDescription.$error,
                  }"
                ></textarea>
                <div
                  v-if="submitted && $v.assignmentDescription.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.assignmentDescription.required"
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
                        requ
                      >
                        <span class="caret">
                          {{
                            priorityVal ? priorityVal : "Select priority"
                          }}</span
                        >
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dLabel">
                        <li class="item">
                          <div class="low-color"></div>
                          Can Wait
                        </li>
                        <li class="item">
                          <div class="medium-color"></div>
                          Important
                        </li>
                        <li class="item">
                          <div class="high-color"></div>
                          Urgent
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
              <div class="row mt-0">
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
                  </div>
                </div>
              </div>
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <h6 class="color-dark font-semi-bold mb-0">Sub Tasks</h6>
                <a @click="onAddSubTaskClick" class="btn p-0">
                  <span class="color-secondary"
                    ><i class="fas fa-plus-circle"></i
                  ></span>
                </a>
              </div>
              <div v-if="addSubTask" class="d-flex flex-row align-items-start">
                <div class="form-row mb-2 mx-0 mr-2 w-100">
                  <label class="form-label" for="name">Add a sub task</label>
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
              <div class="custom-overflow pr-2 mr--2 d-flex flex-column">
                <div v-for="subTask in subTasksList" :key="subTask">
                  <div class="card card-transparent show-icon p-1 mb-1">
                    <div
                      class="d-flex align-items-center justify-content-between"
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
                        <span><i class="far fa-circle"></i></span> {{ subTask }}
                      </p>
                      <span
                        @click="deleteSubTask(subTask)"
                        class="color-primary fa-icon show-hover d-none btn p-0"
                        ><i class="fas fa-trash-alt"></i
                      ></span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <h6 class="color-dark font-semi-bold mb-0">Invite Peers</h6>
                <a @click="onInviteClick" class="btn p-0">
                  <span class="color-secondary"
                    ><i class="fas fa-plus-circle"></i
                  ></span>
                </a>
              </div>
              <div v-if="invitePeer" class="d-flex flex-row align-items-start">
                <div class="form-row mb-2 mx-0 mr-2 w-100">
                  <label class="form-label" for="name">Invite peers</label>
                  <!-- <input type="text" class="form-control" /> -->
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
                  <div class="d-flex align-items-center my-2 mr-3 min-w-200">
                    <div class="ld-img-section mr-3">
                      <div class="ld-img-holder"></div>
                    </div>
                    <div class="ld-details-section">
                      <p class="ld-heading mb-1">{{ peer.first_name }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary py-1 px-3 rounded-pill"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary py-1 px-3 rounded-pill"
              :disabled="processing"
              @click="isAssignmentEdit ? UpdateAssignment() : AddAssignment()"
            >
              {{ isAssignmentEdit ? "Update" : "Add" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal add assignment end -->

    <!-- Assignment completion confirmation  -->
    <div
      class="modal fade"
      id="completeConfirm"
      tabindex="-1"
      role="dialog"
      aria-labelledby="completeConfirmModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="completeConfirmModalLongTitle">
              Complete Assignment Confirmation
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
          <div class="modal-body px-4">Mark assignment as completed?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary py-1 px-3 rounded-pill"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary py-1 px-3 rounded-pill"
              :disabled="processingCompleteAssignment"
              @click="completeAssignment()"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Assignment completion confirmation end  -->
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";
import FullCalendar, { Calendar } from "@fullcalendar/vue";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import * as animationDataSuccess from "~/assets/success.json";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
var fromDate = "";
var endDate = "";
var eventList = [];
export default {
  name: "UserDailyPlanner",
  components: {
    lottie,
    VueTimepicker,
    FullCalendar,
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
      processingCompleteAssignment: false,
      subject: "",
      task: "",
      priorityVal: "",
      timeValue: "",
      subjectValue: {},
      taskValue: "",
      timeList: "",
      dateValue: "",
      idNum: "",
      dateListValue: "",
      popTitle: "",
      popMeeting: "",
      popTime: "",
      popDate: "",
      isShowing: true,
      assignmentList: [],
      meetingDetails: [],
      isShowQuote: "",
      calendarDate: "",
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      lottieOptionsSuccess: {
        animationData: animationDataSuccess.default,
        loop: false,
      },
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
    };
  },
  mounted() {
    this.disabledDates.to = new Date(
      this.date_today.getFullYear(),
      this.date_today.getMonth(),
      this.date_today.getDate()
    );
    this.ShowQuotedMessage();
    this.getSubjectsList();
    this.getAssignmentsList();
    this.getAllCompletedAssignments();
    this.calendarApi = this.$refs.fullCalendar.getApi();
    this.GetDailyPlanner();
    //priority dropdown
    const _this = this;
    $(".dropdown-menu li").on("click", function () {
      var getValue = $(this).text();
      $(".dropdown-select").text(getValue);
      _this.filterOption(getValue);
    });
    //datepicker

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
    dateValue: { required },
    timeValue: { required },
    assignmentName: { required },
    assignmentDescription: { required },
  },
  computed: {
    ...mapState("quotedMessage", {
      quoteMessage: (state) => state.quoteMessage,
      viewed: (state) => state.viewed,
      plannerList: (state) => state.plannerList,
      meetingList: (state) => state.meetingList,
      assignment: (state) => state.assignment,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      subjectsData: (state) => state.subjectsData,
      assignmentsList: (state) => state.assignmentsList,
      completedAssignments: (state) => state.completedAssignments,
    }),
    ...mapState("teacherMeeting", {
      students: (state) => state.students,
    }),
  },
  methods: {
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
    ...mapActions("teacherMeeting", {
      getStudents: "getStudents",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },

    async ShowQuotedMessage() {
      this.loading = true;
      await this.showQuotedMessage({
        user_id: localStorage.getItem("id"),
      });
      this.loading = false;
      if (this.viewed == 1) {
        this.isShowQuote = false;
      } else {
        this.isShowQuote = true;
      }
    },
    async openModal() {
      this.dateValue = new Date(this.calendarApi.view.activeStart);
      this.isAssignmentEdit = false;
      $("#exampleModalCenter").modal({ backdrop: true });
    },
    async GetSubjectList() {
      await this.getSubjectsList({});
    },
    async GetDailyPlanner() {
      eventList = [];
      this.loading = true;
      const format = "YYYY-MM-DD";
      this.calendarDate = moment(this.calendarApi.view.activeStart).format(
        format
      );
      await this.getDailyPlanner({
        user_id: localStorage.getItem("id"),
        type: "Daily",
        date: this.calendarDate,
      });

      this.loading = false;
      this.assignmentList = [];
      this.meetingDetails = [];
      this.plannerList.forEach((element) => {
        var scheduleObject = {};
        var plannerObj = {};
        var id = element.id;
        var assignment = element.subject;
        var time = element.due_time;
        var date = this.dateConversion(element.due_date);

        var title = element.task;

        if (element.priority == "1") {
          var color = "#EF382E";
        } else if (element.priority == "2") {
          var color = "#00CCA0";
        } else if (element.priority == "3") {
          var color = "#F6D73C";
        }
        var dateMeeting = element.due_date;
        var tmeMeeting = this.formatAMPM(element.due_time);
        var start = dateMeeting + "T" + tmeMeeting;

        scheduleObject["assignment"] = assignment;
        scheduleObject["time"] = time;
        scheduleObject["date"] = date;
        scheduleObject["title"] = title;
        scheduleObject["id"] = id;

        plannerObj["title"] = title;
        plannerObj["color"] = color;
        plannerObj["start"] = start;
        plannerObj["id"] = id;
        eventList.push(plannerObj);
        this.assignmentList.push(scheduleObject);
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
    },

    async GetAssignment(val) {
      if (val) {
        this.loading = true;
        await this.getAssignment({
          id: val,
        });
      }
      this.loading = false;
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
      this.timeValue = this.assignment.due_time;
      if (this.assignment.priority == 1) {
        this.priorityVal = "Urgent";
      } else if (this.assignment.priority == 2) {
        this.priorityVal = "Important";
      } else if (this.assignment.priority == 3) {
        this.priorityVal = "Can Wait";
      }
      $(".dropdown-select").text(this.priorityVal);
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
      const peersSelected = [];
      if (this.peerList.length > 0) {
        this.peerList.forEach((e) => {
          peersSelected.push(e.id);
        });
      }
      await this.addAssignment({
        // user_id: localStorage.getItem("id"),
        // task: this.task,
        // subject: this.subject?.id,
        // due_time: this.timeValue,
        // due_date: df,
        // priority: this.priorityVal,
        user_id: localStorage.getItem("id"),
        task: this.assignmentName,
        assignment_description: this.assignmentDescription,
        subject: this.subject?.id,
        due_time: this.timeValue,
        due_date: df,
        priority: this.priorityVal,
        shared_users_ids: peersSelected,
        assignment_materials: [
          "https://jochi-live.s3.amazonaws.com/assignmentDoc/1659508306402.pdf",
          "https://jochi-live.s3.amazonaws.com/assignmentImages/1659508771473.png",
        ],
        subTasks: this.subTasksList,
      });
      this.loading = false;

      if (this.successMessage != "") {
        this.GetAssignment();
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.resetAssignment();
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

      this.GetDailyPlanner();
    },
    async UpdateAssignment() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      if (this.priorityVal == "Urgent") {
        this.priorityVal = "1";
      } else if (this.priorityVal == "Important") {
        this.priorityVal = "2";
      } else if (this.priorityVal == "Can Wait") {
        this.priorityVal = "3";
      }

      this.processing = true;
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
      this.submitted = false;
      this.processing = false;
    },
    async resetAssignment() {
      this.submitted = false;
      this.value = "";
      this.dateValue = "";
      $('input[name="daterange"]').val("");
      fromDate = "";
      $(".dropdown-select").text("Select priority");
      this.priorityVal = "";
      this.subject = "";
      this.task = "";
      (fromDate = ""), $('input[name="daterange"]').val("");
      fromDate = "";
      this.priorityVal = "";
      this.timeValue = null;
      this.subject = "";
      this.task = "";
      this.taskValue = "";
      this.timeList = "";
      this.timeValue = "";
      let clearTimeBtn = document.getElementsByClassName("clear-btn")[0];
      clearTimeBtn?.click();
    },

    dateConversion(value) {
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

      var dateValue = new Date(value);
      var month = monthNames[dateValue.getMonth()];
      var clickedDate = dateValue.getDate();
      return clickedDate + this.ordinal_suffix_of(clickedDate) + " " + month;
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
    //date conversion
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

      return month + "/" + dt + "/" + year;
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

      return year + "-" + month + "-" + dt;
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
    filterOption(val) {
      var high = /Urgent/g;
      var med = /Important/g;
      var low = /Can Wait/g;
      if (high.test(val)) {
        this.priorityVal = "1";
      } else if (med.test(val)) {
        this.priorityVal = "2";
      } else if (low.test(val)) {
        this.priorityVal = "3";
      }
    },
    eventClicked(info) {
      var idVal = info.event;
      var idValue = idVal.id;
      var groupId = idVal.groupId;
      if (!groupId) {
        this.isAssignmentEdit = true;
        // $("#editModalCenter").modal("show");
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
      date.setDate(date.getDate());
      var dateval = new Date(date),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      this.calendarDate = [date.getFullYear(), mnth, day].join("-");
    },
    goPrev() {
      this.calendarApi.prev(); // call a method on the Calendar object
      this.GetDailyPlanner();
    },

    goNext() {
      this.calendarApi.next();
      this.GetDailyPlanner();
    },
    openAddAssignmentModal() {
      this.processing = false;
      this.$refs.assignmentForm.reset();
      $("#addAssignmentModal").modal({ backdrop: true });
    },
    onAddSubTaskClick() {
      this.addSubTask = true;
    },
    onAddNewSubTask() {
      if (this.subTaskName) {
        this.subTasksList.push(this.subTaskName);
      } else {
        this.$toast.open({
          message: "Please add a valid subTask ",
          type: "warning",
          duration: 5000,
        });
      }
      this.subTaskName = "";
      this.addSubTask = false;
    },
    deleteSubTask(subTask) {
      this.subTasksList = this.subTasksList.filter((e) => e != subTask);
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
      console.log(this.peerSelected);
      this.peerList = this.peerSelected;
      this.invitePeer = false;
    },
    async getAssignmentsList() {
      await this.getAssignments();
      console.log(this.assignmentsList);
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
        this.completeAsstId = 0;
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
        type: "Daily",
      });
      console.log(this.completedAssignments);
    },
  },
};
</script>

<style>
</style>

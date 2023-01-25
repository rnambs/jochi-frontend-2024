<style>
.multi-select-checkbox{left:32px; top:-12px}
</style>
<template>
  <div>
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
                    col-11
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
                        bg-light
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
                          row
                          d-flex
                          justify-content-between
                          align-items-center
                          px-5
                          pb-2
                        "
                      >
                        <div class="col-md-4">
                          <h2 class="color-primary font-semi-bold mb-0">Pending</h2>
                        </div>
                        <div class="col-md-8 d-flex justify-content-start justify-content-md-end">
                          <button
                            @click="
                              openAssignment = true;
                              isAddAssignment = true;
                              resetAssignment();
                            "
                            class="btn btn-dark py-1 px-3 mr-3"
                          >
                            Add Assignment
                          </button>
                          <button
                            @click="chooseMultiple = true"
                            class="btn btn-dark py-1 px-3"
                          >
                            Choose Multiple
                          </button>
                        </div>
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
                          custom-overflow
                          py-3
                          px-5
                        "
                      >
                        <div class="row d-none">
                          <!-- drag and drop for mobile -->
                          <draggable
                            v-model="pendingAssignments"
                            group="people"
                            @start="
                              drag = true;
                              dragCard(item.id);
                            "
                            @end="drag = false"
                            :sort="false"
                            class="col-12 col-md-6 py-3 px-5 px-lg-3"
                            v-for="item in pendingAssignments"
                            :key="item.id"
                          >
                          
                            <div class="draggable-card h-100">
                              <div class="drag h-100" :transfer-data="{ item }">
                                <div class="h-100">
                                  <div
                                    @click="onCardClick(item)"
                                    class="
                                      jochi-sub-components-light-bg
                                      drag-drop
                                      p-4
                                      position-realtive
                                      h-100
                                      cursor-pointer
                                      d-flex
                                      flex-column
                                      justify-content-between
                                    "
                                  >
                                    <div class="d-flex flex-column">
                                      <div
                                        class="
                                          assignment-tag-section
                                          d-flex
                                          align-items-center
                                          mb-2
                                        "
                                      >
                                        <div
                                          class="
                                            assignment-tag
                                            mr-2
                                            text-nowrap
                                          "
                                          :class="{
                                            red: item.priority == '1',
                                            yellow: item.priority == '2',
                                            green: item.priority == '3',
                                          }"
                                        >
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
                                        <div
                                          class="
                                            assignment-tag
                                            pink
                                            text-truncate
                                          "
                                        >
                                          {{
                                            item.subject.subject_name
                                              ? item.subject.subject_name
                                              : item.subject
                                          }}
                                        </div>
                                      </div>
                                      <div class="assignment-add-section">
                                        <h4 class="mb-1 text-center word-break">
                                          {{ item.task }}
                                        </h4>
                                        <div class="text-center px-3">
                                          <p class="text-truncate pb-3 mb-0">
                                            {{ item.assignment_description }}
                                          </p>
                                        </div>
                                      </div>
                                      <div class="sub-task-section mb-2">
                                        <h6 class="mb-1">Sub-tasks</h6>
                                        <div
                                          :class="
                                            viewMore && viewMoreId == item.id
                                              ? 'd-flex flex-column  overflow-auto vh-10'
                                              : ' d-flex flex-column overflow-hidden vh-10'
                                          "
                                        >
                                          <div
                                            @click="
                                              confirmSubTaskComplete(
                                                $event,
                                                sub.id,
                                                item.id,
                                                sub.task_status
                                              )
                                            "
                                            v-for="sub in item.subTasks"
                                            :key="sub.id"
                                            class="
                                              pl-2
                                              d-flex
                                              align-items-center
                                              color-secondary
                                              cursor-pointer
                                              mb-1
                                            "
                                          >
                                            <input
                                              :id="sub.title"
                                              v-model="sub.title"
                                              :value="
                                                sub.task_status == 'Completed'
                                                  ? sub.title
                                                  : ''
                                              "
                                              type="radio"
                                              class="mr-2 cursor-pointer"
                                            />
                                            <label
                                              for=""
                                              class="
                                                mb-0
                                                text-truncate
                                                cursor-pointer
                                              "
                                              >{{ sub.title }}</label
                                            >
                                          </div>
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
                                        <button
                                          v-if="
                                            item.subTasks &&
                                            item.subTasks.length > 4 &&
                                            (!viewMore || viewMoreId != item.id)
                                          "
                                          @click="viewMoreClick($event, item)"
                                          class="btn btn-void p-0 pl-2"
                                        >
                                          <span class="text-12">View more</span>
                                        </button>
                                        <!-- <div class="pl-2 d-flex align-items-center">
                          <input type="radio" class="mr-2" />
                          <label for="" class="mb-0"
                            >Start typing to add subtasks</label
                          >
                        </div> -->
                                      </div>
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
                                          class="
                                            col-8
                                            py-0
                                            pl-0
                                            text-12
                                            d-flex
                                            flex-column
                                          "
                                        >
                                          <div
                                            class="
                                              d-flex
                                              flex-column
                                              lext-limited
                                            "
                                          >
                                            <div
                                              class="d-flex w-100"
                                              v-for="(
                                                material, index
                                              ) in item.assignment_materials"
                                              :key="material.id"
                                            >
                                              <span
                                                v-if="index < 2"
                                                class="
                                                  color-secondary
                                                  text-truncate
                                                  w-100
                                                "
                                              >
                                                <!-- Rubric: -->
                                                {{
                                                  material.file_type == "link"
                                                    ? material.material
                                                    : material.file_name
                                                }}
                                              </span>
                                            </div>
                                          </div>
                                          <span
                                            class="color-secondary text-12"
                                            v-if="
                                              item.assignment_materials &&
                                              item.assignment_materials
                                                .length &&
                                              item.assignment_materials.length >
                                                2
                                            "
                                            >+{{
                                              item.assignment_materials.length -
                                              2
                                            }}
                                            more</span
                                          >
                                          <span
                                            v-if="
                                              !item.assignment_materials ||
                                              item.assignment_materials
                                                .length <= 0
                                            "
                                            class="color-secondary text-12"
                                          >
                                            No additional materials added
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
                                          {{ item.formattedDate }}
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
                                        v-for="(peer, index) in item.peers"
                                        :key="index"
                                        class="ap-img-section mr--3 shadow-sm"
                                      >
                                        <!-- {{ peer }} -->
                                        <img
                                          v-if="peer.profile_pic"
                                          :src="peer.profile_pic"
                                          alt=""
                                        />
                                        <img
                                          v-else
                                          src="~/static/image/avatar.png"
                                          alt=""
                                        />
                                      </div>
                                      <div
                                        v-if="!item.formattedDate"
                                        class="
                                          ap-img-section
                                          mr--3
                                          shadow-sm
                                          exclamation
                                          d-flex
                                          align-items-center
                                          justify-content-center
                                          bg-primary
                                        "
                                      >
                                        <span class="color-white"
                                          ><i class="fas fa-exclamation"></i
                                        ></span>
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
                                </div>
                              </div>
                            </div>
                          </draggable>
                          <!-- <div
                            class="
                              w-100
                              d-flex
                              align-items-center
                              justify-content-center
                            "
                            v-if="
                              !pendingAssignments ||
                              pendingAssignments.length <= 0
                            "
                          >
                            <span class="color-secondary"
                              >No pending assignments</span
                            >
                          </div> -->
                        </div>
                        <!-- hide -->
                        <div class="row">
                          <div
                            class="col-12 col-md-6 py-3 mb-3"
                            v-for="item in tempAssts"
                            :key="item.id"
                          >
                          <div class="position-absolute multi-select-checkbox">
                          <input
                            v-if="chooseMultiple"
                            type="radio"
                            :id="item.id"
                            :name="item.id"
                            @click="onChooseMultiple(item.id)"
                          />
                          </div>
                            <drag class="drag h-100" :transfer-data="{ item }">
                              <div class="h-100">
                                <div
                                  @click="onCardClick(item)"
                                  class="
                                    jochi-sub-components-light-bg
                                    drag-drop
                                    p-4
                                    position-realtive
                                    h-100
                                    cursor-pointer
                                    d-flex
                                    flex-column
                                    justify-content-between
                                  "
                                >
                                  <div class="d-flex flex-column">
                                    <div
                                      class="
                                        assignment-tag-section
                                        d-flex
                                        align-items-center
                                        mb-2
                                      "
                                    >
                                      <div
                                        class="assignment-tag mr-2 text-nowrap"
                                        :class="{
                                          red: item.priority == '1',
                                          yellow: item.priority == '2',
                                          green: item.priority == '3',
                                        }"
                                      >
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
                                      <div
                                        class="
                                          assignment-tag
                                          pink
                                          text-truncate
                                        "
                                      >
                                        {{
                                          item.subject.subject_name
                                            ? item.subject.subject_name
                                            : item.subject
                                        }}
                                      </div>
                                    </div>
                                    <div class="assignment-add-section">
                                      <h4 class="mb-1 text-center word-break">
                                        {{ item.task }}
                                      </h4>
                                      <div class="text-center px-3">
                                        <p class="text-truncate pb-3 mb-0">
                                          {{ item.assignment_description }}
                                        </p>
                                      </div>
                                    </div>
                                    <div class="sub-task-section mb-2">
                                      <h6 class="mb-1">Sub-tasks</h6>
                                      <div
                                        :class="
                                          viewMore && viewMoreId == item.id
                                            ? 'd-flex flex-column  overflow-auto vh-10'
                                            : ' d-flex flex-column overflow-hidden vh-10'
                                        "
                                      >
                                        <div
                                          @click="
                                            confirmSubTaskComplete(
                                              $event,
                                              sub.id,
                                              item.id,
                                              sub.task_status
                                            )
                                          "
                                          v-for="sub in item.subTasks"
                                          :key="sub.id"
                                          class="
                                            pl-2
                                            d-flex
                                            align-items-center
                                            color-secondary
                                            cursor-pointer
                                            mb-1
                                          "
                                        >
                                          <input
                                            :id="sub.title"
                                            v-model="sub.title"
                                            :value="
                                              sub.task_status == 'Completed'
                                                ? sub.title
                                                : ''
                                            "
                                            type="radio"
                                            class="mr-2 cursor-pointer"
                                          />
                                          <label
                                            for=""
                                            class="
                                              mb-0
                                              text-truncate
                                              cursor-pointer
                                            "
                                            >{{ sub.title }}</label
                                          >
                                        </div>
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
                                      <button
                                        v-if="
                                          item.subTasks &&
                                          item.subTasks.length > 4 &&
                                          (!viewMore || viewMoreId != item.id)
                                        "
                                        @click="viewMoreClick($event, item)"
                                        class="btn btn-void p-0 pl-2"
                                      >
                                        <span class="text-12">View more</span>
                                      </button>
                                      <!-- <div class="pl-2 d-flex align-items-center">
                          <input type="radio" class="mr-2" />
                          <label for="" class="mb-0"
                            >Start typing to add subtasks</label
                          >
                        </div> -->
                                    </div>
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
                                        class="
                                          col-8
                                          py-0
                                          pl-0
                                          text-12
                                          d-flex
                                          flex-column
                                        "
                                      >
                                        <div
                                          class="
                                            d-flex
                                            flex-column
                                            lext-limited
                                          "
                                        >
                                          <div
                                            class="d-flex w-100"
                                            v-for="(
                                              material, index
                                            ) in item.assignment_materials"
                                            :key="material.id"
                                          >
                                            <span
                                              v-if="index < 2"
                                              class="
                                                color-secondary
                                                text-truncate
                                                w-100
                                              "
                                            >
                                              <!-- Rubric: -->
                                              {{
                                                material.file_type == "link"
                                                  ? material.material
                                                  : material.file_name
                                              }}
                                            </span>
                                          </div>
                                        </div>
                                        <span
                                          class="color-secondary text-12"
                                          v-if="
                                            item.assignment_materials &&
                                            item.assignment_materials.length &&
                                            item.assignment_materials.length > 2
                                          "
                                          >+{{
                                            item.assignment_materials.length - 2
                                          }}
                                          more</span
                                        >
                                        <span
                                          v-if="
                                            !item.assignment_materials ||
                                            item.assignment_materials.length <=
                                              0
                                          "
                                          class="color-secondary text-12"
                                        >
                                          No additional materials added
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
                                        {{ item.formattedDate }}
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
                                      v-for="(peer, index) in item.peers"
                                      :key="index"
                                      class="ap-img-section mr--3 shadow-sm"
                                    >
                                      <!-- {{ peer }} -->
                                      <img
                                        v-if="peer.profile_pic"
                                        :src="peer.profile_pic"
                                        alt=""
                                      />
                                      <img
                                        v-else
                                        src="~/static/image/avatar.png"
                                        alt=""
                                      />
                                    </div>
                                    <div
                                      v-if="!item.formattedDate"
                                      class="
                                        ap-img-section
                                        mr--3
                                        shadow-sm
                                        exclamation
                                        d-flex
                                        align-items-center
                                        justify-content-center
                                        bg-primary
                                      "
                                    >
                                      <span class="color-white"
                                        ><i class="fas fa-exclamation"></i
                                      ></span>
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
                              </div>
                            </drag>
                          </div>
                          <client-only>
                            <infinite-loading
                              class="
                                d-flex
                                align-items-center
                                w-100
                                justify-content-center
                              "
                              :identifier="reloadCount"
                              @infinite="loadNext"
                            >
                            </infinite-loading>
                          </client-only>
                          <!-- <div
                            class="
                              w-100
                              d-flex
                              align-items-center
                              justify-content-center
                            "
                            v-if="
                              !pendingAssignments ||
                              pendingAssignments.length <= 0
                            "
                          >
                            <span class="color-secondary"
                              >No pending assignments</span
                            >
                          </div> -->
                        </div>
                      </div>
                      <!-- drag end -->
                      <div class="d-none flex-column pt-3 h-40 flex-fill">
                        <div
                          class="
                            d-none d-xl-block
                            drop
                            color-secondary
                            text-16
                            h-100
                            d-flex
                            flex-column
                          "
                        >
                          <h2 class="color-primary font-semi-bold px-5">
                            Completed This Month
                          </h2>
                          <p
                            class="
                              d-none d-xl-block
                              mb-0
                              px-5
                              color-secondary
                              font-regular
                            "
                          >
                            Drag and drop your assignment here when it is
                            completed
                          </p>
                          <div
                            class="
                              d-flex
                              flex-column
                              custom-overflow
                              px-5
                              pb-3
                              h-100
                            "
                            :class="{ 'drag-blur': drag }"
                          >
                            <draggable
                              draggable=".not-draggable-container"
                              v-model="tempCompleted"
                              group="people"
                              @start="drag = true"
                              @end="drag = false"
                              @add="handleDropDraggable"
                              :sort="false"
                              class="h-100"
                            >
                              <div class="row mt-1">
                                <div
                                  v-for="item in completedAssignmentList"
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
                                    <h4 class="mb-0 blue word-break">
                                      {{ item.task }}
                                    </h4>
                                    <p
                                      v-for="sub in item.subTasks"
                                      class="mb-0 word-break"
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
                              <div
                                class="
                                  h-100
                                  d-flex
                                  align-items-center
                                  justify-content-center
                                "
                                v-if="
                                  !completedAssignmentList ||
                                  completedAssignmentList.length <= 0
                                "
                              >
                                <span class="color-secondary text-center"
                                  >No completed tasks for this month</span
                                >
                              </div>
                            </draggable>
                          </div>
                        </div>
                      </div>
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
                          <p
                            class="
                              d-none d-xl-block
                              mb-0
                              px-5
                              color-secondary
                              font-regular
                            "
                          >
                            Drag and drop your assignment here when it is
                            completed
                          </p>
                          <div
                            class="
                              d-flex
                              flex-column
                              custom-overflow
                              px-5
                              pb-3
                              h-100
                            "
                          >
                            <div class="row mt-1">
                              <div
                                v-for="item in completedAssignmentList"
                                :key="item.id"
                                class="col-6"
                              >
                            <i class="fas fa-undo"></i>

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
                                  <h4 class="mb-0 blue word-break">
                                    {{ item.task }}
                                  </h4>
                                  <p
                                    v-for="sub in item.subTasks"
                                    class="mb-0 word-break"
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
                            <div
                              class="
                                h-100
                                d-flex
                                align-items-center
                                justify-content-center
                              "
                              v-if="
                                !completedAssignmentList ||
                                completedAssignmentList.length <= 0
                              "
                            >
                              <span class="color-secondary text-center"
                                >No completed tasks for this month</span
                              >
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
                            col-12 col-lg-8
                            float-right
                          "
                        >
                          <div
                            class="
                              d-flex
                              flex-column flex-md-row
                              justify-content-between
                              mb-2
                              border-bottom
                            "
                          >
                            <h3 class="color-primary font-semi-bold">
                              {{ isAddAssignment ? "Add" : "Edit" }} Assignment
                            </h3>
                            <p class="mb-0 cursor-pointer d-none d-xl-block">
                              <span
                                @click="
                                  openAssignment = false;
                                  isAddAssignment = true;
                                  assignmentId = '';
                                "
                                ><i class="fas fa-times"></i
                              ></span>
                            </p>
                            <div
                              class="
                                d-flex
                                justify-content-end
                                d-block d-xl-none
                              "
                            >
                              <button
                                v-if="!isAddAssignment"
                                class="
                                  btn btn-success
                                  border border-dark
                                  py-0
                                  px-4
                                  rounded-12
                                  font-semi-bold
                                  mb-2
                                "
                                @click="confirmComplete"
                              >
                                <span>Mark as complete</span>
                              </button>
                            </div>
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
                              justify-content-between
                              h-40
                              flex-fill
                            "
                          >
                            <div
                              class="
                                d-flex
                                flex-column
                                custom-overflow
                                px-2
                                pr-3
                                me--3
                                mb-2
                              "
                            >
                              <form
                                v-if="!isSharedAssignment"
                                ref="assignmentForm"
                                id="assignmentForm"
                              >
                                <div class="form-group">
                                  <label
                                    for="recipient-name"
                                    class="col-form-label"
                                    >Subject<em>*</em></label
                                  >
                                  <input
                                    v-if="schoologyAssignment == '1'"
                                    type="text"
                                    class="form-control"
                                    id="message-text"
                                    v-model="gg4lSubject"
                                    maxlength="125"
                                    placeholder="Enter assignment name"
                                  />
                                  <select
                                    v-else
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
                                  <label
                                    for="message-text"
                                    class="col-form-label"
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
                                  <label
                                    for="message-text"
                                    class="col-form-label"
                                    >Task<em>*</em></label
                                  >
                                  <textarea
                                    class="form-control"
                                    id="message-text"
                                    v-model="assignmentDescription"
                                    maxlength="500"
                                    placeholder="Enter assignment description"
                                    :class="{
                                      'is-invalid':
                                        submitted &&
                                        $v.assignmentDescription.$error,
                                    }"
                                  ></textarea>
                                  <div
                                    v-if="
                                      submitted &&
                                      $v.assignmentDescription.$error
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
                                          class="
                                            dropdown-select
                                            form-control
                                            text-left
                                          "
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
                                            class="item low-color"
                                          >
                                            <!-- <div class="low-color priority-color"></div> -->
                                            <span>Can Wait</span>
                                          </li>
                                          <li
                                            @click="priorityVal = 'Important'"
                                            class="item medium-color"
                                          >
                                            <!-- <div class="medium-color priority-color"></div> -->
                                            <span>Important</span>
                                          </li>
                                          <li
                                            @click="priorityVal = 'Urgent'"
                                            class="item high-color"
                                          >
                                            <!-- <div class="high-color priority-color"></div> -->
                                            <span>Urgent</span>
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
                                        class="form-control dropdown-menu-top"
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
                                          @change="checkValidTime"
                                          close-on-complete
                                          format="hh:mm A"
                                          v-model="timeValue"
                                          name="timeValue"
                                          class="show-cursor dropdown-menu-top"
                                          :value="timeValue"
                                          :class="{
                                            'is-invalid':
                                              submitted &&
                                              ($v.timeValue.$error ||
                                                !validTime),
                                          }"
                                        ></vue-timepicker>
                                        <div
                                          v-if="
                                            submitted &&
                                            ($v.timeValue.$error || !validTime)
                                          "
                                          class="invalid-feedback"
                                        >
                                          <span
                                            v-if="
                                              !$v.timeValue.required ||
                                              !validTime
                                            "
                                            >Not a valid time</span
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
                                      >Add a sub-task</label
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
                                <!-- <div
                              v-if="isAddAssignment"
                              class="
                                custom-overflow
                                pr-2
                                mr--2
                                d-flex
                                flex-column
                              "
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
                            </div> -->
                                <!-- v-else -->
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
                                            word-break
                                            pr-3
                                          "
                                        >
                                          <span
                                            class="subtask-btn mr-1"
                                            :class="{
                                              selected:
                                                subTask.task_status ==
                                                'Completed',
                                            }"
                                            ><i></i
                                          ></span>
                                          <span>{{ subTask.title }}</span>
                                        </p>
                                        <span
                                          v-if="
                                            subTask.task_status != 'Completed'
                                          "
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
                                      {{ isAddAssignment ? "Add" : "Save" }}
                                    </button>
                                  </div>
                                </div>
                                <div class="hidden-scroll px-3 row my-0">
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
                                        <div class="ld-img-holder">
                                          <img
                                            v-if="peer.profile_pic"
                                            :src="peer.profile_pic"
                                            alt=""
                                          />
                                          <img
                                            v-else
                                            src="~/static/image/avatar.png"
                                            alt=""
                                          />
                                        </div>
                                        <button
                                          type="button"
                                          role="button"
                                          @click="
                                            removePeerConfirm(peer.id, $event)
                                          "
                                        >
                                          Remove
                                        </button>
                                      </div>
                                      <div class="ld-details-section">
                                        <p class="ld-heading mb-1">
                                          {{ peer.first_name }}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <!-- Additional Material Add -->
                                <div
                                  class="
                                    d-flex
                                    justify-content-between
                                    align-items-center
                                    mb-2
                                  "
                                >
                                  <h6 class="color-dark font-semi-bold mb-0">
                                    Additional Material
                                  </h6>
                                  <a
                                    @click="onAdditionalMatClick"
                                    class="btn p-0"
                                  >
                                    <span class="color-secondary"
                                      ><i class="fas fa-plus-circle"></i
                                    ></span>
                                  </a>
                                </div>
                                <div
                                  v-if="additionalMaterial"
                                  class="d-flex flex-row align-items-start"
                                >
                                  <div class="form-row mb-2 mx-0 mr-2 w-100">
                                    <label class="form-label" for="name"
                                      >Add Additional Material</label
                                    >
                                    <!-- <input type="text" class="form-control" /> -->
                                    <select
                                      v-model="materialType"
                                      class="form-select form-control mb-2"
                                      aria-label="Default select example"
                                    >
                                      <option value="">
                                        Choose material type
                                      </option>
                                      <option value="file">File</option>
                                      <option value="link">Link</option>
                                    </select>
                                    <div class="row m-0">
                                      <div class="col-9 py-0 pl-0">
                                        <input
                                          id="fileUpload"
                                          v-if="materialType == 'file'"
                                          type="file"
                                          class="form-control px-2"
                                          placeholder="Upload File"
                                          @change="onFileChange"
                                          accept=".png,.jpeg,.jpg,.doc,.docx,.pdf"
                                        />
                                      </div>
                                      <div class="col-9 py-0 pl-0">
                                        <input
                                          v-if="materialType == 'link'"
                                          type="text"
                                          class="form-control px-2"
                                          placeholder="Paste Link"
                                          v-model="link"
                                        />
                                      </div>
                                      <div class="col-3 p-0">
                                        <!-- <input
                                      type="submit"
                                      class="form-control"
                                      value="Add"
                                    /> -->
                                      </div>
                                    </div>
                                  </div>
                                  <div class="pt-4">
                                    <button
                                      type="button"
                                      @click="UploadAttachment"
                                      class="btn btn-primary btn-sm mt-2"
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                                <div class="hidden-scroll px-3 row my-0">
                                  <div
                                    v-for="item of additionalMaterialList"
                                    :key="item.id"
                                    class="h-fit-content cursor-pointer w-100"
                                  >
                                    <div
                                      v-if="item.link"
                                      class="
                                        d-flex
                                        align-items-center
                                        my-2
                                        mr-3
                                        min-w-200
                                        w-100
                                        show-icon
                                      "
                                    >
                                      <div class="ld-details-section w-100">
                                        <p
                                          @click="openLink(item)"
                                          class="ld-heading mb-1 text-link"
                                        >
                                          <!-- {{ peer.first_name }} -->
                                          {{ item.link }}
                                        </p>
                                      </div>
                                      <span
                                        class="
                                          color-primary
                                          fa-icon
                                          show-hover
                                          d-none
                                          btn
                                          p-0
                                        "
                                        @click="deleteAdditionalMat(item)"
                                        ><i class="fas fa-trash-alt"></i
                                      ></span>
                                    </div>
                                    <div
                                      v-else
                                      class="
                                        d-flex
                                        align-items-center
                                        my-2
                                        mr-3
                                        min-w-200
                                        w-100
                                        show-icon
                                      "
                                    >
                                      <div class="ld-details-section w-100">
                                        <p
                                          @click="openLink(item)"
                                          class="ld-heading mb-1 text-link"
                                        >
                                          <!-- {{ peer.first_name }} -->
                                          {{
                                            item.file_type &&
                                            item.file_type != "link"
                                              ? item.file_name
                                              : item.material
                                          }}
                                        </p>
                                      </div>
                                      <span
                                        class="
                                          color-primary
                                          fa-icon
                                          show-hover
                                          d-none
                                          btn
                                          p-0
                                        "
                                        @click="deleteAdditionalMat(item)"
                                        ><i class="fas fa-trash-alt"></i
                                      ></span>
                                    </div>
                                  </div>
                                </div>
                                <!-- Additional Material Add End -->
                              </form>

                              <form
                                v-if="isSharedAssignment"
                                ref="assignmentForm"
                                id="assignmentForm"
                              >
                                <div class="form-group">
                                  <label
                                    for="recipient-name"
                                    class="col-form-label"
                                    >Subject:</label
                                  >
                                  &nbsp;{{ subject }}
                                  <!-- <select
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
                              </select> -->
                                </div>
                                <div class="form-group">
                                  <label
                                    for="message-text"
                                    class="col-form-label"
                                    >Assignment Name:</label
                                  >
                                  &nbsp;{{ assignmentName }}
                                </div>
                                <div class="form-group">
                                  <label
                                    for="message-text"
                                    class="col-form-label"
                                    >Task:</label
                                  >
                                  &nbsp;{{ assignmentDescription }}
                                </div>
                                <div class="row">
                                  <div class="col-md-6 ml-auto">
                                    <div class="form-group mb-0">
                                      <label
                                        for="recipient-name"
                                        class="col-form-label"
                                        >Priority:</label
                                      >&nbsp;{{ priorityVal }}
                                    </div>
                                  </div>
                                  <div class="col-md-6 ml-auto">
                                    <div class="form-group">
                                      <label
                                        for="recipient-name"
                                        class="col-form-label"
                                        >Date:</label
                                      >
                                      &nbsp;{{ dateValue }}
                                    </div>
                                  </div>
                                </div>
                                <div class="row mt-0">
                                  <div class="col-6">
                                    <div class="form-group">
                                      <label
                                        for="recipient-name"
                                        class="col-form-label"
                                        >Time:</label
                                      >
                                      <div>&nbsp;{{ timeValue }}</div>
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
                                      >Add a sub-task</label
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
                                            word-break
                                            pr-3
                                          "
                                        >
                                          <span
                                            class="subtask-btn mr-1"
                                            :class="{
                                              selected:
                                                subTask.task_status ==
                                                'Completed',
                                            }"
                                            ><i></i
                                          ></span>
                                          <span>{{ subTask.title }}</span>
                                        </p>
                                        <span
                                          v-if="
                                            subTask.task_status != 'Completed'
                                          "
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
                                    Invited Peers
                                  </h6>
                                  <!-- <a @click="onInviteClick" class="btn p-0">
                                <span class="color-secondary"
                                  ><i class="fas fa-plus-circle"></i
                                ></span>
                              </a> -->
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
                                <div class="hidden-scroll px-3 row my-0">
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
                                        <div class="ld-img-holder">
                                          <img
                                            v-if="peer.profile_pic"
                                            :src="peer.profile_pic"
                                            alt=""
                                          />
                                          <img
                                            v-else
                                            src="~/static/image/avatar.png"
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                      <div class="ld-details-section">
                                        <p class="ld-heading mb-1">
                                          {{ peer.first_name }}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <!-- Additional Material Add -->
                                <div
                                  class="
                                    d-flex
                                    justify-content-between
                                    align-items-center
                                    mb-2
                                  "
                                >
                                  <h6 class="color-dark font-semi-bold mb-0">
                                    Additional Material
                                  </h6>
                                  <a
                                    @click="onAdditionalMatClick"
                                    class="btn p-0"
                                  >
                                    <span class="color-secondary"
                                      ><i class="fas fa-plus-circle"></i
                                    ></span>
                                  </a>
                                </div>
                                <div
                                  v-if="additionalMaterial"
                                  class="d-flex flex-row align-items-start"
                                >
                                  <div class="form-row mb-2 mx-0 mr-2 w-100">
                                    <label class="form-label" for="name"
                                      >Add Additional Material</label
                                    >
                                    <!-- <input type="text" class="form-control" /> -->
                                    <select
                                      v-model="materialType"
                                      class="form-select form-control mb-2"
                                      aria-label="Default select example"
                                    >
                                      <option value="">
                                        Choose material type
                                      </option>
                                      <option value="file">File</option>
                                      <option value="link">Link</option>
                                    </select>
                                    <div class="row m-0">
                                      <div class="col-9 py-0 pl-0">
                                        <input
                                          v-if="materialType == 'file'"
                                          type="file"
                                          class="form-control px-2"
                                          placeholder="Upload File"
                                          @change="onFileChange"
                                          accept=".png,.jpeg,.jpg,.doc,.docx,.pdf"
                                        />
                                      </div>
                                      <div class="col-9 py-0 pl-0">
                                        <input
                                          v-if="materialType == 'link'"
                                          type="text"
                                          class="form-control px-2"
                                          placeholder="Paste Link"
                                          v-model="link"
                                        />
                                      </div>
                                      <div class="col-3 p-0">
                                        <!-- <input
                                      type="submit"
                                      class="form-control"
                                      value="Add"
                                    /> -->
                                      </div>
                                    </div>
                                  </div>
                                  <div class="pt-4">
                                    <button
                                      type="button"
                                      @click="UploadAttachment"
                                      class="btn btn-primary btn-sm mt-2"
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                                <div class="hidden-scroll px-3 row my-0">
                                  <div
                                    v-for="item of additionalMaterialList"
                                    :key="item.id"
                                    class="h-fit-content cursor-pointer w-100"
                                  >
                                    <div
                                      v-if="item.link"
                                      class="
                                        d-flex
                                        align-items-center
                                        my-2
                                        mr-3
                                        min-w-200
                                        w-100
                                        show-icon
                                      "
                                    >
                                      <div class="ld-details-section w-100">
                                        <p
                                          @click="openLink(item)"
                                          class="ld-heading mb-1 text-link"
                                        >
                                          <!-- {{ peer.first_name }} -->
                                          {{ item.link }}
                                        </p>
                                      </div>
                                      <span
                                        class="
                                          color-primary
                                          fa-icon
                                          show-hover
                                          d-none
                                          btn
                                          p-0
                                        "
                                        @click="deleteAdditionalMat(item)"
                                        ><i class="fas fa-trash-alt"></i
                                      ></span>
                                    </div>
                                    <div
                                      v-else
                                      class="
                                        d-flex
                                        align-items-center
                                        my-2
                                        justify-content-between
                                        min-w-200
                                      "
                                    >
                                      <div class="ld-details-section">
                                        <p
                                          @click="openLink(item)"
                                          class="ld-heading mb-1"
                                        >
                                          <!-- {{ peer.first_name }} -->
                                          {{
                                            item.file_type &&
                                            item.file_type != "link"
                                              ? item.file_name
                                              : item.material
                                          }}
                                        </p>
                                      </div>
                                      <span
                                        class="btn p-0"
                                        @click="deleteAdditionalMat(item)"
                                        ><i class="fas fa-trash-alt"></i
                                      ></span>
                                    </div>
                                  </div>
                                </div>
                                <!-- Additional Material Add End -->
                              </form>
                            </div>

                            <div class="d-flex justify-content-end">
                              <button
                                type="button"
                                class="
                                  btn btn-secondary
                                  py-1
                                  px-3
                                  rounded-pill
                                  mr-2
                                "
                                @click="openAssignment = false"
                              >
                                Close
                              </button>
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
                      </div>
                    </div>
                    <!-- pending-assignment-popup -->
                    <!-- <div
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
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                              class="dropdown-select form-control text-left"
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
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div> -->
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
              <h3 class="modal-title" id="exampleModalLongTitle">
                Choose Filter
              </h3>
              <!-- <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button> -->
            </div>
            <div class="modal-body px-4">
              <div class="form-row">
                <select class="form-control" tabindex="" v-model="filterType">
                  <option value="">All</option>

                  <option value="Assignments">Assignment</option>
                  <option value="Meetings">Meeting</option>
                  <option value="Session">Study Session</option>
                </select>
              </div>
            </div>
            <div class="modal-footer px-4">
              <button
                data-dismiss="modal"
                class="btn btn-secondary px-4 py-1 rounded-12"
              >
                Cancel
              </button>
              <button
                @click="
                  applyFilter();
                  closeAssignmentPlanner();
                "
                class="btn btn-success px-4 py-1 rounded-12"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- filter modal end -->

      <!-- End Monthly Calander -->
      <!-- Assignment completion confirmation  -->
      <div
        class="modal fade"
        id="completeConfirm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="completeConfirmModalCenterTitle"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered add-assmt"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header pb-1">
              <h3 class="modal-title" id="completeConfirmModalLongTitle">
                Complete Assignment Confirmation
              </h3>
              <!-- <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button> -->
            </div>
            <div class="modal-body px-4">Mark assignment as completed?</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary py-1 px-3 rounded-12 font-semi-bold"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-success py-1 px-3 rounded-12 font-semi-bold"
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
      <!-- Sub task completion confirmation  -->
      <div
        class="modal fade"
        id="completeSubTaskConfirm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="completeConfirmModalCenterTitle"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered add-assmt"
          role="document"
        >
          <div class="modal-content">
            <!-- <div class="modal-header pb-0">
            <h4 class="modal-title" id="completeConfirmModalLongTitle">
              Complete Sub-Task Confirmation
            </h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div> -->
            <div class="modal-body px-4">
              <h3
                class="modal-title color-primary font-bold mt-3"
                id="completeConfirmModalLongTitle"
              >
                Complete Sub-Task Confirmation
              </h3>
              <h5 class="color-dark font-semi-bold">
                Mark sub-task as completed?
              </h5>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="
                  btn btn-secondary
                  py-1
                  px-4
                  rounded-12
                  mr-2
                  font-semi-bold
                "
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-success py-1 px-4 rounded-12 font-semi-bold"
                :disabled="processingSubCompleteAssignment"
                @click="
                  processingSubCompleteAssignment = true;
                  completeSubTask();
                "
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Sub task completion confirmation end  -->
      <!-- Sub task undo confirmation  -->
    <div
      class="modal fade"
      id="undoSubTaskConfirm"
      tabindex="-1"
      role="dialog"
      aria-labelledby="undoSubTaskConfirmModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-body px-4">
            <h3
              class="modal-title color-primary font-bold mt-3"
              id="undoSubTaskConfirmModalLongTitle"
            >
              Undo Sub-Task Completion Confirmation
            </h3>
            <h5 class="color-dark font-semi-bold">Undo sub-task completion?</h5>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary py-1 px-4 rounded-12 mr-2 font-semi-bold"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-success py-1 px-4 rounded-12 font-semi-bold"
              :disabled="processingSubCompleteAssignment"
              @click="undoCompleteSubTask()"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Sub task undo confirmation end  -->
       <!-- Remove peer  confirmation  -->
    <div
      class="modal fade"
      id="removePeerConfirmation"
      tabindex="-1"
      role="dialog"
      aria-labelledby="removePeerConfirmationModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header pb-1">
            <h3 class="modal-title" id="removePeerConfirmationModalLongTitle">
              Remove Peer Confirmation
            </h3>
          </div>
          <div class="modal-body px-4">Remove the peer?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary py-1 px-3 rounded-12 font-semi-bold"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              data-dismiss="modal"
              type="button"
              class="btn btn-success py-1 px-3 rounded-12 font-semi-bold"
              @click="removePeer()"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Remove peer  confirmation end  -->
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
import * as animationDataSuccess from "~/assets/success.json";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import "../../static/css/var.scss";
import moment from "moment";
import "vue2-timepicker/dist/VueTimepicker.css";
import draggable from "vuedraggable";
var fromDate = "";
var endDate = "";
var idValue = "";
var eventList = [];
var dateValueNum = "";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "PlannerMonth",
  components: {
    FullCalendar,
    lottie,
    VueTimepicker,
    draggable,
    InfiniteLoading,
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
      processingUpload: false,
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
      lottieOptionsSuccess: {
        animationData: animationDataSuccess.default,
        loop: false,
      },
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
      link: "",
      file: "",
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
    };
  },
  mounted() {
    this.GetStudents();
    this.disabledDates.to = new Date(
      this.date_today.getFullYear(),
      this.date_today.getMonth(),
      this.date_today.getDate()
    );
    this.getSubjectsList();
    // this.getAssignmentsList();
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
    dateValue: { required },
    timeValue: { required },
    assignmentName: { required },
    assignmentDescription: { required },
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
      sharedAstList: (state) => state.sharedAstList,
      sharedSessionList: (state) => state.sharedSessionList,
      clubMeetings: (state) => state.clubMeetings,
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
      completedSharedAssignments: (state) => state.completedSharedAssignments,
      newAdditionalMaterial: (state) => state.newAdditionalMaterial,
      allSubTskCompleted: (state) => state.allSubTskCompleted,
    }),
    ...mapState("teacherMeeting", {
      students: (state) => state.students,
      students: (state) => state.students,
    }),
  },
  methods: {
    assignmentPlanner() {
      this.$el.querySelector("#assignmentPlanner").classList.toggle("active");
      this.$el.querySelector("#assignPlanSection").classList.toggle("active");
    },
    markAsCompleted() {
      $("#completeConfirm").modal({ backdrop: true });
      this.completeAsstId = this.assignmentId;
    },
    closeAssignmentPlanner() {
      if (
        this.$el
          .querySelector("#assignPlanSection")
          .classList.contains("active")
      ) {
        this.$el.querySelector("#assignPlanSection").classList.remove("active");
      }
      if (
        this.$el
          .querySelector("#assignmentPlanner")
          .classList.contains("active")
      ) {
        this.$el.querySelector("#assignmentPlanner").classList.remove("active");
      }
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
      uploadAdditionalMaterial: "uploadAdditionalMaterial",
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
    goPrev() {
      this.calendarApi.prev(); // call a method on the Calendar object
      this.GetMonthlyPlanner();
    },

    goNext() {
      this.calendarApi.next();
      this.GetMonthlyPlanner();
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
      // this.plannerList.forEach((element) => {
      //   var plannerObj = {};
      //   var title = element.subject;
      //   if (element.priority == "1") {
      //     var color = "#EF382E";
      //   } else if (element.priority == "2") {
      //     var color = "#00CCA0";
      //   } else {
      //     var color = "#F6D73C";
      //   }
      //   var start = element.due_date;
      //   var date = this.dateValue;
      //   var id = element.id;
      //   plannerObj["title"] = title;
      //   plannerObj["color"] = color;
      //   plannerObj["start"] = start;
      //   plannerObj["id"] = id;
      //   plannerObj["date"] = date;
      //   eventList.push(plannerObj);
      // });
      // this.meetingList.forEach((element) => {
      //   var meetingobj = {};
      //   var listobj = {};
      //   if (element.title != null) {
      //     var title = "Meeting with " + element.title;
      //   }
      //   if (element.club_name != null) {
      //     var title = element.club_name + " Meeting";
      //   }
      //   var meeting = element.meeting_type;
      //   if (meeting == "Peer") {
      //     var color = "#64B5FC";
      //   } else if (meeting == "Club") {
      //     var color = "#07BEB8";
      //   } else if (meeting == "Teacher") {
      //     var color = "#073BBF";
      //   }
      //   var dateMeeting = element.date;
      //   var timeValNum = element.start_time;
      //   var tmeMeeting = this.formatAMPM(element.start_time);
      //   var start = dateMeeting;
      //   // + "T" + tmeMeeting;
      //   meetingobj["title"] = title;
      //   meetingobj["color"] = color;
      //   meetingobj["start"] = start;
      //   meetingobj["id"] = element.id;
      //   meetingobj["groupId"] = "Meeting";

      //   listobj["title"] = title;
      //   listobj["meeting"] = meeting;
      //   listobj["dateMeeting"] = dateMeeting;
      //   listobj["timeValNum"] = timeValNum;
      //   this.meetingDetails.push(listobj);

      //   eventList.push(meetingobj);
      // });
      // this.sessionList.forEach((element) => {
      //   var meetingobj = {};
      //   var listobj = {};
      //   let title = "";
      //   if (element.assignment_id) {
      //     title = "Study Session " + element.assignments?.task;
      //   } else {
      //     title = "Study Session " + element.subject?.subject_name;
      //   }

      //   // var meeting = element.meeting_type;
      //   // if (meeting == "Peer") {
      //   // var color = "#64B5FC";
      //   // } else if (meeting == "Club") {
      //   //   var color = "#07BEB8";
      //   // } else if (meeting == "Teacher") {
      //   const color = element.subject?.color_code;
      //   // }
      //   var dateMeeting = element.date;
      //   var timeValNum = element.time;
      //   var tmeMeeting = this.formatAMPM(element.time);
      //   var start = dateMeeting + "T" + tmeMeeting;
      //   meetingobj["title"] = title;
      //   meetingobj["color"] = color;
      //   meetingobj["start"] = start;
      //   meetingobj["id"] = element.id;
      //   // meetingobj["groupId"] = "Meeting";

      //   listobj["title"] = title;
      //   listobj["meeting"] = "Study Session";
      //   listobj["dateMeeting"] = dateMeeting;
      //   listobj["timeValNum"] = timeValNum;
      //   this.meetingDetails.push(listobj);
      //   eventList.push(meetingobj);
      // });
      // this.sharedSessionList.forEach((element) => {
      //   var meetingobj = {};
      //   var listobj = {};
      //   let title = "";
      //   if (element.assignment_id) {
      //     title =
      //       "Study Session For Assignment: " +
      //       element.studyroom?.assignments?.task;
      //   } else {
      //     title =
      //       "Study Session For Regular Study: " +
      //       element.studyroom.subject?.subject_name;
      //   }

      //   // var meeting = element.meeting_type;
      //   // if (meeting == "Peer") {
      //   // var color = "#64B5FC";
      //   // } else if (meeting == "Club") {
      //   //   var color = "#07BEB8";
      //   // } else if (meeting == "Teacher") {
      //   const color = element.subject?.color_code;
      //   // }
      //   var dateMeeting = element.date;
      //   var timeValNum = element.time;
      //   var tmeMeeting = this.formatAMPM(element.start_time);
      //   var start = dateMeeting + "T" + tmeMeeting;
      //   meetingobj["title"] = title;
      //   meetingobj["color"] = color;
      //   meetingobj["start"] = start;
      //   meetingobj["id"] = element.id;
      //   // meetingobj["groupId"] = "Meeting";

      //   listobj["title"] = title;
      //   listobj["meeting"] = "Study Session";
      //   listobj["dateMeeting"] = dateMeeting;
      //   listobj["timeValNum"] = timeValNum;
      //   this.meetingDetails.push(listobj);
      //   eventList.push(meetingobj);
      // });

      this.plannerList.forEach((element) => {
        if (element.due_date) {
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
            var color = "#F6D73C";
          } else if (element.priority == "3") {
            var color = "#00CCA0";
          }
          var dateMeeting = element.due_date;
          var tmeMeeting = "";
          if (element.due_time) {
            tmeMeeting = this.formatAMPM(element.due_time);
          }
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
          plannerObj["groupId"] = "assignment";
          eventList.push(plannerObj);
          this.assignmentList.push(scheduleObject);
        }
      });
      this.clubMeetings?.forEach((element) => {
        var meetingobj = {};
        var listobj = {};
        if (element.title != null) {
          var title = "Meeting with " + element.title;
        }
        if (element.club_name != null) {
          var title = element.club_name + " Meeting";
        }

        // var meeting = element.meeting_type;
        // if (meeting == "Peer") {
        //   var color = "#64B5FC";
        //   meetingobj["groupId"] = "peer-meeting";
        // } else if (meeting == "Club") {
        var color = "#07BEB8";
        meetingobj["groupId"] = "club-meeting";
        // } else if (meeting == "Teacher") {
        //   meetingobj["groupId"] = "teacher-meeting";
        //   var color = "#073BBF";
        // }
        var dateMeeting = element.date;
        var timeValNum = element.default_slots?.start_time;
        var tmeMeeting = "";
        if (element.default_slots?.start_time) {
          tmeMeeting = this.formatAMPM(element.default_slots?.start_time);
        }
        var start = dateMeeting + "T" + tmeMeeting;
        meetingobj["title"] = title;
        meetingobj["color"] = color;
        meetingobj["start"] = start;
        meetingobj["id"] = element.clubs?.id;
        // meetingobj["groupId"] = "Meeting";

        listobj["title"] = title;
        listobj["meeting"] = "Club";
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.meetingDetails.push(listobj);
        eventList.push(meetingobj);
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
        meetingobj["title"] = title;
        meetingobj["color"] = color;
        meetingobj["start"] = start;
        meetingobj["id"] = element.id;
        // meetingobj["groupId"] = "Meeting";

        listobj["title"] = title;
        listobj["meeting"] = meeting;
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.meetingDetails.push(listobj);
        eventList.push(meetingobj);
      });
      this.sessionList?.forEach((element) => {
        var meetingobj = {};
        var listobj = {};
        let title = "";
        if (element.assignment_id) {
          title = "Study Session " + element.assignments?.task;
        } else {
          title = "Study Session " + element.subject?.subject_name;
        }

        const color = element.subject?.color_code;
        // }
        var dateMeeting = element.date;
        var timeValNum = element.time;
        var tmeMeeting = "";
        if (element.time) {
          tmeMeeting = this.formatAMPM(element.time);
        }
        var start = dateMeeting + "T" + tmeMeeting;
        meetingobj["title"] = title;
        meetingobj["color"] = color;
        meetingobj["start"] = start;
        meetingobj["id"] = element.id;
        meetingobj["groupId"] = "study";
        // meetingobj["type"] = "study";

        listobj["title"] = title;
        listobj["meeting"] = "Study Session";
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        // this.meetingDetails.push(listobj);
        eventList.push(meetingobj);
      });
      this.sharedAstList.forEach((element) => {
        if (element.due_date) {
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
          var tmeMeeting = "";
          if (element.due_time) {
            tmeMeeting = this.formatAMPM(element.due_time);
          }
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
          plannerObj["groupId"] = "shared-assignment";
          eventList.push(plannerObj);
          this.assignmentList.push(scheduleObject);
        }
      });
      this.sharedSessionList?.forEach((element) => {
        var meetingobj = {};
        var listobj = {};
        let title = "";
        if (element.studyroom.assignment_id) {
          title = "Study Session " + element.studyroom.assignments?.task;
        } else {
          title = "Study Session " + element.studyroom.subject?.subject_name;
        }

        const color = element.studyroom.subject?.color_code;
        // }
        var dateMeeting = element.date;
        var timeValNum = element.start_time;
        var tmeMeeting = "";
        if (element.start_time) {
          tmeMeeting = this.formatAMPM(element.start_time);
        }
        var start = dateMeeting + "T" + tmeMeeting;
        meetingobj["title"] = title;
        meetingobj["color"] = color;
        meetingobj["start"] = start;
        meetingobj["id"] = element.session_id;
        meetingobj["groupId"] = "shared-study";
        // meetingobj["type"] = "study";

        listobj["title"] = title;
        listobj["meeting"] = "Study Session";
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        // this.meetingDetails.push(listobj);
        eventList.push(meetingobj);
      });

      this.calendarOptions.events = eventList;
      this.loading = false;
    },

    // async AddAssignment() {
    //   this.submitted = true;
    //   this.$v.$touch();
    //   if (this.$v.$invalid) {
    //     return;
    //   }
    //   this.processing = true;

    //   const df = moment(this.dateValue).format("YYYY-MM-DD");
    //   this.loading = true;
    //   await this.addAssignment({
    //     user_id: localStorage.getItem("id"),
    //     task: this.task,
    //     subject: this.subject?.id,
    //     due_time: this.timeValue,
    //     due_date: df,
    //     priority: this.priorityVal,
    //   });
    //   this.loading = false;

    //   if (this.successMessage != "") {
    //     this.$toast.open({
    //       message: this.successMessage,
    //       type: this.SuccessType,
    //       duration: 5000,
    //     });
    //     this.resetAssignment();
    //     this.GetMonthlyPlanner();
    //     $(".modal").modal("hide");
    //     $(".modal-backdrop").remove();
    //   } else if (this.errorMessage != "") {
    //     this.$toast.open({
    //       message: this.errorMessage,
    //       type: this.errorType,
    //       duration: 5000,
    //     });
    //   }
    //   this.submitted = false;
    //   this.processing = false;
    // },
    // async UpdateAssignment() {
    //   this.submitted = true;
    //   this.$v.$touch();
    //   if (this.$v.$invalid) {
    //     return;
    //   }
    //   this.processing = true;

    //   if (this.priorityVal == "High") {
    //     this.priorityVal = "1";
    //   } else if (this.priorityVal == "Medium") {
    //     this.priorityVal = "2";
    //   } else if (this.priorityVal == "Low") {
    //     this.priorityVal = "3";
    //   }

    //   this.loading = true;
    //   const dfE = moment(this.dateValue).format("YYYY-MM-DD");
    //   await this.updateAssignment({
    //     user_id: localStorage.getItem("id"),
    //     assignment_id: this.idNum,
    //     task: this.task,
    //     subject: this.subject?.id,
    //     due_time: this.timeValue,
    //     due_date: dfE,
    //     priority: this.priorityVal
    //       ? this.priorityVal
    //       : this.assignment.priority,
    //   });
    //   this.loading = false;
    //   if (this.successMessage != "") {
    //     this.$toast.open({
    //       message: this.successMessage,
    //       type: this.SuccessType,
    //       duration: 5000,
    //     });
    //     this.resetAssignment();
    //     this.GetMonthlyPlanner();
    //     $(".modal").modal("hide");
    //     $(".modal-backdrop").remove();
    //   } else if (this.errorMessage != "") {
    //     this.$toast.open({
    //       message: this.errorMessage,
    //       type: this.errorType,
    //       duration: 5000,
    //     });
    //   }
    //   this.submitted = false;
    //   this.processing = false;
    // },
    viewMoreClick(event, item) {
      console.log("view more", event, item);
      event.preventDefault();
      event.stopPropagation();
      this.viewMore = true;
      this.viewMoreId = item.id;
    },
    async openModal() {
      this.isAssignmentEdit = false;
      $("#exampleModalCenter").modal({ backdrop: true });
    },
    // async resetAssignment() {
    //   this.submitted = false;
    //   this.value = "";
    //   this.dateValue = "";
    //   fromDate = "";
    //   $(".dropdown-select").text("Select priority");
    //   this.priorityVal = "";
    //   this.timeValue = null;
    //   this.timeValue = "";
    //   this.subject = "";
    //   this.task = "";
    //   this.taskValue = "";
    //   this.timeList = "";
    //   this.subjectValue = "";
    //   let clearTimeBtn = document.getElementsByClassName("clear-btn")[0];
    //   clearTimeBtn?.click();
    // },
    checkValidTime() {
      if (this.timeValue) {
        let tempTime =
          typeof this.timeValue == "object"
            ? this.timeValue.hh +
              ":" +
              this.timeValue.mm +
              " " +
              this.timeValue.A
            : this.timeValue;
        let valid = moment(tempTime, "h:mm A", true).isValid();

        if (valid && tempTime.split(" ")[1].length > 1) {
          this.validTime = true;
          this.timeValue = tempTime;
        } else {
          this.validTime = false;
        }
        return valid;
      } else {
        return false;
      }
    },
    async AddAssignment() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid || !this.validTime) {
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

      let assignment_materials = [];
      if (
        this.additionalMaterialList &&
        this.additionalMaterialList.length > 0
      ) {
        this.additionalMaterialList.forEach((e) => {
          // assignment_materials.push(e.link ? e.link : e.material);
          if (e) {
            assignment_materials.push(
              e.link ? e.link : e.name ? e.name : e.material
            );
          }
        });
      }
      let subTaskLists = [];
      this.subTasksList.forEach((e) => {
        subTaskLists.push(e.title);
      });

      console.log(assignment_materials);

      await this.addAssignment({
        user_id: localStorage.getItem("id"),
        task: this.assignmentName,
        assignment_description: this.assignmentDescription,
        subject: this.subject?.id,
        subject_id: this.subject?.id,
        due_time: this.timeValue,
        due_date: df,
        priority:
          this.priorityVal == "Urgent"
            ? 1
            : this.priorityVal == "Important"
            ? 2
            : this.priorityVal == "Can Wait"
            ? 3
            : "",
        shared_users_ids: peersSelected,
        assignment_materials: assignment_materials,
        subTasks: subTaskLists,
      });
      this.loading = false;

      if (this.successMessage != "") {
        this.offset = 0;
        this.tempAssts = [];
        this.reloadNext = true;
        this.reloadCount += 1;
        this.GetAssignment();
        // this.getAssignmentsList();
        this.openAssignment = false;

        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 4000,
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

      this.GetMonthlyPlanner();
    },
    async UpdateAssignment() {
      this.submitted = true;
      if (!this.isSharedAssignment) {
        this.$v.$touch();
        if (this.$v.$invalid || !this.validTime) {
          return;
        }
      }

      // if (this.priorityVal == "Urgent") {
      //   this.priorityVal = "1";
      // } else if (this.priorityVal == "Important") {
      //   this.priorityVal = "2";
      // } else if (this.priorityVal == "Can Wait") {
      //   this.priorityVal = "3";
      // }

      this.processing = true;
      this.loading = true;
      const dfE = moment(this.dateValue).format("YYYY-MM-DD");
      //  this.$v.$touch();
      // if (this.$v.$invalid) {
      //   return;
      // }
      // this.processing = true;
      // const df = moment(this.dateValue).format("YYYY-MM-DD");

      const peersSelected = [];
      if (this.peerList.length > 0) {
        this.peerList.forEach((e) => {
          peersSelected.push(e.id);
        });
      }

      let assignment_materials = [];
      if (
        this.additionalMaterialList &&
        this.additionalMaterialList.length > 0
      ) {
        this.additionalMaterialList.forEach((e) => {
          // assignment_materials.push(e.link ? e.link : e.material);
          if (e) {
            assignment_materials.push(
              e.link ? e.link : e.name ? e.name : e.material
            );
          }
        });
      }
      let subTaskLists = [];
      this.subTasksList.forEach((e) => {
        subTaskLists.push(e.title);
      });
      await this.updateAssignment({
        // assignment_id: this.assignmentId,
        // user_id: localStorage.getItem("id"),
        // task: this.assignmentName,
        // assignment_description: this.assignmentDescription,
        // subject: this.subject?.id,
        // due_time: this.timeValue,
        // due_date: dfE,
        // priority:
        //   this.priorityVal == "Urgent"
        //     ? 1
        //     : this.priorityVal == "Important"
        //     ? 2
        //     : this.priorityVal == "Can Wait"
        //     ? 3
        //     : "",
        // shared_users_ids: peersSelected,
        // assignment_materials: assignment_materials,
        // subTasks: subTaskLists,
        // deleted_subTask: this.deletedSubTasksArray,
        assignment_id: this.assignmentId,
        user_id: localStorage.getItem("id"),
        task: this.assignmentName,
        assignment_description: this.assignmentDescription,
        subject: this.isSharedAssignment ? this.subjectId : this.subject?.id,
        subject_id: this.isSharedAssignment ? this.subjectId : this.subject?.id,
        due_time: this.timeValue,
        due_date: dfE,
        priority:
          this.priorityVal == "Urgent"
            ? 1
            : this.priorityVal == "Important"
            ? 2
            : this.priorityVal == "Can Wait"
            ? 3
            : "",
        shared_users_ids: peersSelected,
        assignment_materials: assignment_materials,
        subTasks: subTaskLists,
        deleted_subTask: this.deletedSubTasksArray,
      });
      this.loading = false;
      if (this.successMessage != "") {
        this.offset = 0;
        this.tempAssts = [];
        this.reloadNext = true;
        this.reloadCount += 1;
        this.deletedSubTasksArray = [];
        this.GetAssignment();
        // this.getAssignmentsList();
        this.openAssignment = false;

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
      this.GetMonthlyPlanner();
      this.submitted = false;
      this.processing = false;
    },
    async resetAssignment() {
      this.schoologyAssignment = "";
      this.peerSelected = [];
      this.isSharedAssignment = false;
      this.subject = "";
      this.assignmentName = "";
      this.assignmentDescription = "";
      this.priorityVal = "";
      this.dateValue = "";
      this.timeValue = "";
      this.subTasksList = [];
      this.peerList = [];
      this.additionalMaterialList = [];
      this.invitePeer = false;
      this.materialType = "";
      this.additionalMaterial = false;
      this.addSubTask = false;
      this.submitted = false;
      this.value = "";
      this.dateValue = "";
      this.file = "";
      this.link = "";

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
        id: subject?.id,
        text: subject?.subject_name,
      };
      this.task = this.assignment.task;
      let date = "";
      if (this.assignment.due_date) {
        let dateSplit = this.assignment.due_date.split("-");
        date = new Date(dateSplit[0], Number(dateSplit[1] - 1), dateSplit[2]);
      }
      this.dateValue = date ? date : "";
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

    // eventClicked(info) {
    //   var idVal = info.event;
    //   var idValue = idVal.id;
    //   var groupId = idVal.groupId;
    //   if (!groupId) {
    //     this.resetAssignment();
    //     this.isAssignmentEdit = true;

    //     // $("#editModalCenter").modal("show");
    //     $("#exampleModalCenter").modal("show");

    //     this.GetAssignment(idValue);
    //   } else {
    //     this.resetAssignment();
    //     $("#MeetingModal").modal("show");
    //     var titleVal = info.event.title;
    //     var meetingVal = info.event.backgroundColor;
    //     var dateNum = info.event.start;
    //     let time = this.meetingList.find((e) => e.id == idVal.id).start_time;
    //     this.popupmodal(titleVal, meetingVal, dateNum, time);
    //   }
    // },
    eventClicked(info) {
      var idVal = info.event;
      // console.log("idVal", idVal);
      console.log(
        "idVal",
        idVal.startStr,
        !moment(idVal.startStr.split("T")).isBefore(moment())
      );
      var idVal = info.event;
      if (
        moment(idVal.startStr.split("T")[0]).isBefore(
          moment().format("YYYY-MM-DD")
        )
      ) {
        alert("No actions can be performed on past events");
        return;
      } else {
        if (idVal.groupId == "study") {
          let session = this.sessionList.find(
            (e) => e.id.toString() == idVal.id.toString()
          );

          if (session.status == "STOP") {
            alert("This session has already been completed");
            return;
          } else {
            return this.$router.push(`/study-time?id=${idVal.id}`);
          }
        }
        if (idVal.groupId == "shared-study") {
          let studySession = this.sharedSessionList.find(
            (e) => e.session_id.toString() == idVal.id.toString()
          );
          if (studySession.studyroom?.status == "STOP") {
            alert("This session has already been completed");
            return;
          } else {
            return this.$router.push(`/study-time?id=${idVal.id}`);
          }
        }
        if (
          idVal.groupId == "peer-meeting" ||
          idVal.groupId == "teacher-meeting"
        ) {
          return this.$router.push(
            `/viewall-meeting?id=${idVal.id}&type=${idVal.groupId}`
          );
        } else if (
          idVal.groupId == "assignment" ||
          idVal.groupId == "shared-assignment"
        ) {
          let data = {};
          let mappedData = {};
          if (idVal.groupId == "assignment") {
            data = this.assignmentsList.find((e) => e.id == idVal.id);
            mappedData = this.mapData(data);
          }
          if (idVal.groupId == "shared-assignment") {
            data = this.sharedAssignmentsList.find(
              (e) => e.assignment_id.toString() == idVal.id
            );
            mappedData = this.mapSharedData(data);
          }
          if (!mappedData) {
            return alert("This assignment has been completed!");
          }

          this.assignmentPlanner();
          this.onCardClick(mappedData);
        } else if (idVal.groupId == "club-meeting") {
          let club = this.clubMeetings.find((e) => e.clubs?.id == idVal.id);
          return this.$router.push(
            `/club-moreInfo?id=${idVal.id}&name=${club.club_name}&type=${club.clubs.activity_type}`
          );
        }
      }
      // var idValue = idVal.id;
      // var groupId = idVal.groupId;
      // if (!groupId) {
      //   this.isAssignmentEdit = true;
      //   // $("#editModalCenter").modal("show");
      //   $("#exampleModalCenter").modal("show");

      //   this.GetAssignment(idValue);
      // } else {
      //   $("#MeetingModal").modal("show");
      //   var titleVal = info.event.title;
      //   var meetingVal = info.event.backgroundColor;
      //   var dateNum = info.event.start;
      //   let time = this.meetingList?.find((e) => e.id == idVal.id).start_time;
      //   this.popupmodal(titleVal, meetingVal, dateNum, time);
      // }
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
        var title = element.task;
        if (element.priority == "1") {
          var color = "#EF382E";
        } else if (element.priority == "2") {
          var color = "#00CCA0";
        } else {
          var color = "#F6D73C";
        }
        var dateMeeting = element.due_date;
        var tmeMeeting = "";
        if (element.due_time) {
          tmeMeeting = this.formatAMPM(element.due_time);
        }
        var start = dateMeeting + "T" + tmeMeeting;
        // var start = element.dateISOFormat;
        var id = element.id;
        plannerObj["title"] = title;
        plannerObj["color"] = color;
        plannerObj["start"] = start;
        plannerObj["id"] = id;
        plannerObj["groupId"] = "assignment";
        eventList.push(plannerObj);
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
        meetingobj["title"] = title;
        meetingobj["color"] = color;
        meetingobj["start"] = start;
        meetingobj["id"] = element.id;
        // meetingobj["groupId"] = "Meeting";

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
        var tmeMeeting = "";
        if (element.time) {
          tmeMeeting = this.formatAMPM(element.time);
        }
        var start = dateMeeting + "T" + tmeMeeting;
        meetingobj["title"] = title;
        meetingobj["color"] = color;
        meetingobj["start"] = start;
        meetingobj["id"] = element.id;
        meetingobj["groupId"] = "study";

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
        var tmeMeeting = "";
        if (element.start_time) {
          tmeMeeting = this.formatAMPM(element.start_time);
        }
        var start = dateMeeting + "T" + tmeMeeting;
        meetingobj["title"] = title;
        meetingobj["color"] = color;
        meetingobj["start"] = start;
        // meetingobj["id"] = element.id;
        meetingobj["id"] = element.session_id;

        meetingobj["groupId"] = "shared-study";

        listobj["title"] = title;
        listobj["meeting"] = "Study Session";
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        this.meetingDetails.push(listobj);
        eventList.push(meetingobj);
      });
      this.sharedAstList.forEach((element) => {
        if (element.due_date) {
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
          var tmeMeeting = "";
          if (element.due_time) {
            tmeMeeting = this.formatAMPM(element.due_time);
          }
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
          plannerObj["groupId"] = "shared-assignment";
          eventList.push(plannerObj);
          this.assignmentList.push(scheduleObject);
        }
      });

      console.log("events console", eventList);
      this.calendarOptions.events = eventList;
      this.loading = false;
    },
    // async getAssignmentsList() {
    //   this.pendingAssignments = [];
    //   await this.getAssignments();
    //   console.log(this.assignmentsList);
    //   console.log(this.sharedAssignmentsList);
    //   this.mapAssignments();
    // },
    // mapAssignments() {
    //   if (this.assignmentsList && this.assignmentsList.length > 0) {
    //     this.assignmentsList.forEach((e) => {
    //       let item = {};
    //       item.assignment_description = e.assignment_description;
    //       item.assignment_materials = e.assignment_materials;
    //       item.completed_date = e.completed_date;
    //       item.dueTimeFormat = e.dueTimeFormat;
    //       item.due_date = e.due_date;
    //       item.due_time = e.due_time;
    //       item.id = e.id;
    //       item.priority = e.priority;
    //       item.schoologyAssignment = e.schoologyAssignment;
    //       item.schoologyAssignmentId = e.schoologyAssignmentId;
    //       item.subTasks = e.subTasks;
    //       item.subject = e.subject;
    //       item.subjects = e.subjects;
    //       item.task = e.task;
    //       item.task_status = e.task_status;
    //       item.updatedAt = e.updatedAt;
    //       item.user_id = e.user_id;
    //       item.peers = this.mapPeers(e.id);
    //       this.pendingAssignments.push(item);
    //     });
    //   }
    // },
    // mapPeers(id) {
    //   let peers = [];
    //   if (this.sharedAssignmentsList && this.sharedAssignmentsList.length > 0) {
    //     this.peers = this.sharedAssignmentsList.filter(
    //       (e) => e.assignment_id == id
    //     );
    //   }
    //   return peers;
    // },
    // handleDrop(data, event) {
    //   $("#completeConfirm").modal({ backdrop: true });

    //   let assignment = data.item;
    //   this.completeAsstId = assignment.id;
    // },
    // async completeAssignment() {
    //   this.processingCompleteAssignment = true;
    //   await this.completeTask({
    //     assignment_id: this.completeAsstId,
    //     status: "Completed",
    //   });
    //   this.processingCompleteAssignment = false;
    //   if (this.successMessage != "") {
    //     this.getAssignmentsList();
    //     this.getAllCompletedAssignments();
    //     this.completeAsstId = 0;
    //     this.playCelebration = true;
    //     this.$toast.open({
    //       message: this.successMessage,
    //       type: this.SuccessType,
    //       duration: 5000,
    //     });

    //     $(".modal").modal("hide");
    //     $(".modal-backdrop").remove();
    //     const myTimeout = setTimeout(() => {
    //       this.playCelebration = false;
    //     }, 5000);
    //   } else if (this.errorMessage != "") {
    //     this.$toast.open({
    //       message: this.errorMessage,
    //       type: this.errorType,
    //       duration: 5000,
    //     });
    //   }
    //   this.GetMonthlyPlanner();
    // },
    // async completeSubTask() {
    //   this.processingCompleteAssignment = true;
    //   await this.completeTask({
    //     task_id: this.completeSubTasktId,
    //     status: "Completed",
    //   });
    //   this.processingCompleteAssignment = false;
    //   if (this.successMessage != "") {
    //     this.completeSubTasktId = 0;
    //     this.playCelebration = true;
    //     this.$toast.open({
    //       message: this.successMessage,
    //       type: this.SuccessType,
    //       duration: 5000,
    //     });

    //     $(".modal").modal("hide");
    //     $(".modal-backdrop").remove();
    //   } else if (this.errorMessage != "") {
    //     this.$toast.open({
    //       message: this.errorMessage,
    //       type: this.errorType,
    //       duration: 5000,
    //     });
    //   }
    //   this.GetMonthlyPlanner();
    // },
    // onCardClick() {
    //   this.isAddAssignment = false;
    //   this.openAssignment = true;
    //   // this.subject
    //   // this.assignmentName
    //   // this.assignmentDescription
    //   // this.priorityVal
    //   // this.timeValue
    //   // this.subTasksList
    //   // this.peerSelected
    // },
    // async getAllCompletedAssignments() {
    //   await this.getCompletedAssignments({
    //     userId: localStorage.getItem("id"),
    //     date: moment().format("YYYY-MM-DD"),
    //     type: "Monthly",
    //   });
    //   console.log(this.completedAssignments);
    // },
    // confirmComplete(event) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // },

    // async resetAssignment() {
    //   this.isSharedAssignment = false;
    //   this.subject = "";
    //   this.assignmentName = "";
    //   this.assignmentDescription = "";
    //   this.priorityVal = "";
    //   this.dateValue = "";
    //   this.timeValue = "";
    //   this.subTasksList = [];
    //   this.peerList = [];
    //   this.additionalMaterialList = [];
    //   this.invitePeer = false;
    //   this.materialType = "";
    //   this.additionalMaterial = false;
    //   this.addSubTask = false;
    //   this.submitted = false;
    //   this.value = "";
    //   this.dateValue = "";

    //   $('input[name="daterange"]').val("");
    //   fromDate = "";
    //   $(".dropdown-select").text("Select priority");
    //   this.priorityVal = "";
    //   this.subject = "";
    //   this.task = "";
    //   (fromDate = ""), $('input[name="daterange"]').val("");
    //   fromDate = "";
    //   this.priorityVal = "";
    //   this.timeValue = null;
    //   this.subject = "";
    //   this.task = "";
    //   this.taskValue = "";
    //   this.timeList = "";
    //   this.timeValue = "";
    //   let clearTimeBtn = document.getElementsByClassName("clear-btn")[0];
    //   clearTimeBtn?.click();
    // },
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
        let sub = {};
        sub.title = this.subTaskName;
        this.subTasksList.push(sub);
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
      if (this.assignmentId) {
        // deleted_subTask
        console.log("edit", this.subTasksList, subTask);
        this.deletedSubTasksArray.push(subTask.id);
      }
      this.subTasksList = this.subTasksList.filter((e) => e != subTask);
    },
    onInviteClick() {
      this.invitePeer = true;
    },
    async GetStudents() {
      await this.getStudents({
        school_id: localStorage.getItem("school_id"),
        studentId: localStorage.getItem("id"),
      });
    },
    onInvitePeer() {
      this.peerList = [];
      this.peerSelected.forEach((e) => {
        this.peerList.push(e);
      });
      this.invitePeer = false;
    },
    // async loadNext() {
    //   await this.getAssignments();
    //   this.page += 1;
    //   this.tempAssts.push(...this.pendingAssignments);
    // },
    async loadNext($state) {
      // if (this.initialLoad) {
      // $state.reset();
      if (this.tempOffset != this.offset || this.reloadNext) {
        this.reloadNext = false;
        this.tempOffset = this.offset;
        console.log("inside load next", this.offset);

        this.pendingAssignments = [];
        await this.getAssignments({ offset: this.offset, limit: this.limit });
        this.offset = this.offset + this.limit;
        this.assignmentMaterials = [];
        await this.mapAssignments();
        await this.mapSharedAssignments();
        if (this.pendingAssignments.length > 0) {
          this.tempAssts.push(...this.pendingAssignments);
          $state.loaded();
        } else {
          $state.complete();
        }
      }
      // } else {
      //   $state.complete();
      // }
    },
    async getAssignmentsList() {
      if (this.reloadCount >= 0) {
        this.reloadCount += 1;
        this.tempAssts = [];
        this.offset = 0;
      }
      // this.offset = 0;
      // if (this.reloadCount > 0) {
      //   this.reloadCount += 1;
      // }
      // this.pendingAssignments = [];
      // await this.getAssignments({ offset: this.offset, limit: this.limit });
      // if (!this.initialLoad) {
      //   this.initialLoad = !this.initialLoad;
      // }
      // this.assignmentMaterials = [];
      // await this.mapAssignments();
      // await this.mapSharedAssignments();
      // this.tempAssts = this.pendingAssignments;
    },
    mapAssignments() {
      if (this.assignmentsList && this.assignmentsList.length > 0) {
        this.assignmentsList.forEach((e) => {
          // let item = {};
          // this.assignmentMaterials = [];

          // item.assignment_description = e.assignment_description;
          // // item.assignment_materials = e.assignment_materials;
          // if (e.assignment_materials && e.assignment_materials.length > 0) {
          //   e.assignment_materials.forEach((m) => {
          //     let data = {};
          //     data = m;
          //     this.assignmentMaterials.push(data);
          //   });
          // }
          // item.assignment_materials = this.assignmentMaterials;
          // item.completed_date = e.completed_date;
          // item.dueTimeFormat = e.dueTimeFormat;
          // item.due_date = e.due_date;
          // item.due_time = e.due_time;
          // item.id = e.id;
          // item.priority = e.priority;
          // item.schoologyAssignment = e.schoologyAssignment;
          // item.schoologyAssignmentId = e.schoologyAssignmentId;
          // item.subTasks = e.subTasks;
          // item.subject = e.subject;
          // item.subjects = e.subjects;
          // item.task = e.task;
          // item.task_status = e.task_status;
          // item.updatedAt = e.updatedAt;
          // item.user_id = e.user_id;
          // item.peers = this.mapPeers(e);
          // item.formattedDate = moment(e.due_date).format("MMMM Do, YYYY");
          // item.isShared = false;
          // this.pendingAssignments.push(item);
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
        item.peers = this.mapPeers(e);
        if (e.due_date) {
          item.formattedDate = moment(e.due_date).format("MMMM Do, YYYY");
        }
        item.isShared = false;
        return item;
      }
    },
    mapSharedAssignments() {
      if (this.sharedAssignmentsList && this.sharedAssignmentsList.length > 0) {
        this.sharedAssignmentsList.forEach((e) => {
          // let item = {};
          // this.assignmentMaterials = [];

          // if (e.assignments) {
          //   item.assignment_description = e.assignments.assignment_description;
          //   // item.assignment_materials = e.assignment_materials;
          //   if (e.assignment_materials && e.assignment_materials.length > 0) {
          //     e.assignment_materials.forEach((m) => {
          //       let data = {};
          //       data = m;
          //       this.assignmentMaterials.push(data);
          //     });
          //   }
          //   item.assignment_materials = this.assignmentMaterials;
          //   item.completed_date = e.assignments.completed_date;
          //   item.dueTimeFormat = e.assignments.dueTimeFormat;
          //   item.due_date = e.assignments.due_date;
          //   item.due_time = e.assignments.due_time;
          //   item.id = e.assignments.id;
          //   item.priority = e.assignments.priority;
          //   item.schoologyAssignment = e.assignments.schoologyAssignment;
          //   item.schoologyAssignmentId = e.assignments.schoologyAssignmentId;
          //   item.subTasks = e.subTasks;
          //   item.subject = e.assignments?.subjects?.subject_name;
          //   item.subjects = e.subjects;
          //   item.task = e.assignments.task;
          //   item.task_status = e.assignments.task_status;
          //   item.updatedAt = e.assignments.updatedAt;
          //   item.user_id = e.assignments.user_id;
          //   item.peers = this.mapPeers(e);
          //   item.formattedDate = moment(e.due_date).format("MMMM Do, YYYY");
          //   item.isShared = true;
          //   this.pendingAssignments.push(item);
          // }
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
        item.due_date = e.assignments.due_date;
        item.due_time = e.assignments.due_time;
        item.id = e.assignments.id;
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
        if (e.assignments.due_date) {
          item.formattedDate = moment(e.assignments.due_date).format(
            "MMMM Do, YYYY"
          );
        }
        item.isShared = true;
        return item;
      }
    },
    mapPeers(e) {
      let user_id = localStorage.getItem("id");
      let peers = [];
      if (
        e.assignments?.assignment_shared_users &&
        e.assignments?.assignment_shared_users.length > 0
      ) {
        e.assignments?.assignment_shared_users.forEach((item) => {
          let peer = {};
          if (item.shared_users_id != user_id) {
            peer = item.users;
            peer.id = item.shared_users_id;
            peers.push(peer);
          }
        });
      }
      if (e.assignment_shared_users && e.assignment_shared_users?.length > 0) {
        e.assignment_shared_users.forEach((item) => {
          let peer = {};
          if (item.shared_users_id != user_id) {
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
    dragCard(data) {
      this.completeAsstId = data;
    },
    handleDrop(data, event) {
      $("#completeConfirm").modal({ backdrop: true });

      let assignment = data.item;
      this.completeAsstId = assignment.id;
    },
    handleDropDraggable(data, event) {
      this.drag = false;
      $("#completeConfirm").modal({ backdrop: true });

      // let assignment = data?.item?._underlying_vm_;
      // this.completeAsstId = assignment.id;
    },
    async completeAssignment() {
      this.processingCompleteAssignment = true;
      await this.completeTask({
        assignment_id: this.completeAsstId,
        status: "Completed",
      });
      this.processingCompleteAssignment = false;
      if (this.successMessage != "") {
        this.openAssignment = false;
        this.offset = 0;
        this.tempAssts = [];
        this.reloadNext = true;
        this.reloadCount += 1;
        // this.getAssignmentsList();
        this.getAllCompletedAssignments();
        this.completeAsstId = 0;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.openAssignment = false;

        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
        await this.GetMonthlyPlanner();
        this.playCelebration = true;
        const myTimeout = setTimeout(() => {
          this.playCelebration = false;
        }, 5000);
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
        await this.GetMonthlyPlanner();
      }
    },
    async completeSubTask() {
      // this.processingSubCompleteAssignment = true;
      await this.completeTask({
        task_id: this.completeSubTaskId,
        status: "Completed",
      });
      this.processingSubCompleteAssignment = false;
      $(".modal").modal("hide");
      $(".modal-backdrop").remove();
      await this.GetMonthlyPlanner();

      if (this.successMessage != "") {
        this.offset = 0;
        this.tempAssts = [];
        this.reloadNext = true;
        this.reloadCount += 1;
        this.completeSubTaskId = 0;
        this.completeAsstId = 0;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        // await this.getAssignmentsList();
        await this.getAllCompletedAssignments();
        if (this.allSubTskCompleted) {
          // await this.completeAssignment();
          this.playCelebration = true;
          const myTimeout = setTimeout(() => {
            this.playCelebration = false;
          }, 5000);
        }
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.GetMonthlyPlanner();
    },
    checkAllCompleted() {
      let asst = this.pendingAssignments.find(
        (e) => e.id == this.completeAsstId
      );
      console.log(asst);
      let sub = asst.subTasks;
      console.log(sub);
      let incomplete = false;
      sub.forEach((e) => {
        if (!incomplete && e.task_status != "Completed") {
          incomplete = true;
        }
      });
      console.log(incomplete);
      return !incomplete;
    },
    async undoCompleteSubTask() {
      this.pendingAssignments
        .find((e) => e.id == this.completeAsstId)
        .subTasks.find((i) => i.id == this.completeSubTaskId).task_status='';
    },
    onCardClick(data) {
      this.deletedSubTasksArray = [];
      this.isAddAssignment = false;
      this.openAssignment = true;
      this.mapAssignmentDetail(data);
      this.mapPeerInvited(data);
      // this.subject
      // this.assignmentName
      // this.assignmentDescription
      // this.priorityVal
      // this.timeValue
      // this.subTasksList
      // this.peerSelected
    },
    mapPeerInvited(data) {
      console.log("map peer ", data, this.students);
      this.peerSelected = [];
      if (data.peers && data.peers?.length > 0 && this.students.length > 0) {
        data.peers.forEach((e) => {
          let studs = this.students.find(
            (s) => s.id.toString() == e.id.toString()
          );
          console.log(studs);
          // this.peerSelected.push(studs);
          this.peerSelected.push(studs);
        });
        console.log("peers", this.peerSelected);
      }
      // peerSelected
    },
    mapAssignmentDetail(data) {
      this.isSharedAssignment = data.isShared;
      this.schoologyAssignment = data.schoologyAssignment;
      this.assignmentId = data.id;
      this.assignmentName = data.task;
      this.assignmentDescription = data.assignment_description;
      this.priorityVal =
        data.priority == "1"
          ? "Urgent"
          : data.priority == "2"
          ? "Important"
          : data.priority == "3"
          ? "Can Wait"
          : "";

      if (data.isShared) {
        this.subject = data.subject;
        this.subjectId = data.subjects.id;
      } else {
        this.subject = {
          id: data.subjects?.id,
          text: data.subjects?.subject_name,
        };
      }
      if (this.schoologyAssignment == "1") {
        this.gg4lSubject = data.subject;
      }
      // this.dateValue = data.due_date;
      this.dateValue = data.due_date
        ? moment(data.due_date).format("MM/DD/YYYY")
        : "";
      this.timeValue = data.due_time;
      this.subTasksList = [];
      if (data.subTasks && data.subTasks.length > 0) {
        data.subTasks.forEach((e) => {
          let item = {};
          item = e;
          this.subTasksList.push(item);
        });
      }
      // this.subTasksList = data.subTasks;
      this.peerList = data.peers;
      this.additionalMaterialList = data.assignment_materials;
      console.log("map ", data);
    },
    async getAllCompletedAssignments() {
      await this.getCompletedAssignments({
        userId: localStorage.getItem("id"),
        date: moment().format("YYYY-MM-DD"),
        type: "Monthly",
      });
      console.log(this.completedAssignments);
      console.log(this.completedSharedAssignments);
      let completed = [];
      completed = this.completedAssignments;
      this.completedAssignmentList = [];
      this.completedAssignments.forEach((e) => {
        let asst = {};
        asst = e;
        this.completedAssignmentList.push(asst);
      });
      this.completedSharedAssignments.forEach((e) => {
        let asst = {};
        asst = e.assignments;
        this.completedAssignmentList.push(asst);
      });
    },
    confirmComplete() {
      this.completeAsstId = this.assignmentId;
      $("#completeConfirm").modal({ backdrop: true });
    },
    confirmSubTaskComplete(event, id, asstId, status) {
      // if (status == "Completed") {
      //   return;
      // }
      // this.completeAsstId = asstId;
      // this.completeSubTaskId = id;
      // $("#completeSubTaskConfirm").modal({ backdrop: true });

      // event.preventDefault();
      // event.stopPropagation();
      this.completeAsstId = asstId;
      this.completeSubTaskId = id;
      if (status == "Completed") {
        $("#undoSubTaskConfirm").modal({ backdrop: true });
      }else{
      $("#completeSubTaskConfirm").modal({ backdrop: true });
      }
      event.preventDefault();
      event.stopPropagation();
    },
    onAdditionalMatClick() {
      this.additionalMaterial = true;
    },
    onFileChange(e) {
      if (
        e?.target?.files[0]?.size &&
        e.target.files[0]?.size > 5 * 1024 * 1024
      ) {
        if (document.querySelector("#fileUpload"))
          document.querySelector("#fileUpload").value = "";

        return this.$toast.open({
          message: "File size must be lesser than 5 MB",
          type: "warning",
        });
      }
      if (e.target.files[0]) {
        this.file = e.target.files[0];

        // if (this.file_type.includes("pdf")) {
        //   this.fileCheck = true;
        //   this.filepptCheck = false;
        //   this.profileImageUrl = "pdf-upload.png";
        // } else if (this.file_type.includes("ppt")) {
        //   this.filepptCheck = true;
        //   this.fileCheck = false;
        //   this.profileImageUrl = "ppt.jpg";
        // } else if (this.file_type.includes("pptx")) {
        //   this.filepptCheck = true;
        //   this.fileCheck = false;
        //   this.profileImageUrl = "ppt.jpg";
        // } else {
        //   this.filepptCheck = false;
        //   this.fileCheck = false;
        //   this.profileImageUrl = URL.createObjectURL(file);
        // }
      }
    },
    async UploadAttachment() {
      this.processingUpload = true;
      const data = new FormData();
      if (this.materialType == "file") {
        if (this.file) {
          data.append("file", this.file);
          await this.uploadAdditionalMaterial(data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          this.additionalMaterialList.push({
            id: this.newAdditionalMaterial.id,
            name: this.newAdditionalMaterial.material,
            material: this.file.name,
          });
          this.processingUpload = false;
          this.file = "";
          if (document.querySelector("#fileUpload"))
            document.querySelector("#fileUpload").value = "";
        } else {
          this.processingUpload = false;

          return this.$toast.open({
            message: "Please add valid file",
            type: "warning",
            duration: 5000,
          });
          return false;
        }
      } else {
        let urlValid = this.isValidHttpUrl(this.link);
        if (urlValid) {
          this.additionalMaterialList.push({
            id: Math.random(),
            link: this.link,
          });
          this.link = "";
        }
        this.processingUpload = false;
        return;
      }
      this.processingUpload = false;

      // this.ClubFiles();
    },
    openLink(material) {
      console.log(material);
      let link = material.link
        ? material.link
        : material.name
        ? material.name
        : material.file_name;
      if (material.file_type) {
        link = material.material;
      }
      window.open(
        link,
        "_blank" // <- This is what makes it open in a new window.
      );
    },
    isValidHttpUrl(string) {
      let url;

      try {
        url = new URL(string);
      } catch (_) {
        this.$toast.open({
          message: "Please add valid URL",
          type: "warning",
          duration: 5000,
        });
        return false;
      }

      let valid = url.protocol === "http:" || url.protocol === "https:";
      if (!valid) {
        this.$toast.open({
          message: "Please add valid URL",
          type: "warning",
          duration: 5000,
        });
      }

      return valid;
    },
    deleteAdditionalMat(item) {
      console.log(item);
      this.additionalMaterialList;
      const index = this.additionalMaterialList.indexOf(item);
      if (index > -1) {
        // only splice array when item is found
        this.additionalMaterialList.splice(index, 1); // 2nd parameter means remove one item only
      }

      // array = [2, 9]
      console.log(this.additionalMaterialList);
    },
      removePeerConfirm(id, event) {
      event.stopPropagation();
      $("#removePeerConfirmation").modal({ backdrop: true });
      this.removePeerId = id;
    },
    removePeer() {
      const index = this.peerList.findIndex(
        (item) => item.id == this.removePeerId
      );
      if (index > -1) {
        this.peerList.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
    onChooseMultiple(id) {
      if (this.choosenAssignments.includes(id)) {
        let index = this.choosenAssignments.indexOf(id);
        this.choosenAssignments.splice(index, 1);
      } else {
        this.choosenAssignments.push(id);
      }
      console.log(this.choosenAssignments);
    },
  },
};
</script>

<style></style>
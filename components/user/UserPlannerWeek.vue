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
        <div
          class="custom-margin-for-main-section custom-full-height d-flex jochi-main-content-container"
        >
          <div class="row">
            <div class="col-12 position-realtive h-100 d-flex flex-column">
              <div class="jochi-components-light-bg position-relative h-100">
                <div class="planner-week p-4 pt-5 px-3 px-sm-5">
                  <div class="color-ref">
                    <ul class="d-flex align-itmes-center">
                      <li><span>Urgent assignments</span></li>
                      <li><span>Important Assignments</span></li>
                      <li><span>Can wait Assignments</span></li>
                      <li><span>Completed Assignments</span></li>
                      <li><span>Club Meeting</span></li>
                      <li><span>Peer Meeting</span></li>
                      <li><span>Teacher Meeting</span></li>
                      <li><span>Trainings</span></li>
                      <li><span>Matches</span></li>
                      <li><span>Overdue Assignments</span></li>
                      <!-- <li><span>color-10</span></li> -->
                    </ul>
                  </div>
                  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                </div>

                <div
                  class="planner-action-btns d-flex align-items-center position-absolute"
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
                  class="col-11 p-0 position-absolute assignment-planner-section"
                  id="assignPlanSection"
                >
                  <div class="position-realtive h-100">
                    <div
                      class="jochi-components-light-bg py-4 h-100 d-flex flex-column position-relative bg-light"
                    >
                      <lottie
                        v-if="playCelebration"
                        :options="lottieOptionsSuccess"
                        v-on:animCreated="handleAnimation"
                        class="position-absolute top-0 w-100 h-100 z-index-9"
                      />
                      <div
                        class="row d-flex justify-content-between align-items-center px-5 pb-2"
                      >
                        <div class="col-md-4">
                          <h2 class="color-primary font-semi-bold mb-0">
                            Pending
                          </h2>
                        </div>
                        <div
                          class="col-md-8 d-flex justify-content-start justify-content-md-end"
                        >
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
                            @click="confirmDeletion()"
                            v-if="
                              choosenAssignments &&
                              choosenAssignments.length > 0
                            "
                            class="btn btn-dark py-1 px-3"
                          >
                            Delete selected
                          </button>
                        </div>
                      </div>
                      <!-- drag -->
                      <div
                        class="d-flex flex-column h-50 flex-fill custom-overflow pb-3 px-5"
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
                                    class="jochi-sub-components-light-bg drag-drop p-4 position-realtive h-100 cursor-pointer d-flex flex-column justify-content-between"
                                  >
                                    <div class="d-flex flex-column">
                                      <div
                                        class="assignment-tag-section d-flex align-items-center mb-2"
                                      >
                                        <div
                                          class="assignment-tag mr-2 text-nowrap"
                                          :class="{
                                            red: item.priority == '1',
                                            yellow: item.priority == '2',
                                            green: item.priority == '3',
                                            orange: item.priority == '4',
                                          }"
                                        >
                                          {{
                                            item.priority == "1"
                                              ? "Urgent"
                                              : item.priority == "2"
                                              ? "Important"
                                              : item.priority == "3"
                                              ? "Can Wait"
                                              : item.priority == "4"
                                              ? "Overdue"
                                              : ""
                                          }}
                                        </div>
                                        <div
                                          class="assignment-tag pink text-truncate"
                                        >
                                          {{
                                            item.subject.subject_name
                                              ? item.subject.subject_name
                                              : item.subject
                                          }}
                                        </div>
                                      </div>
                                      <div class="assignment-add-section">
                                        <h4
                                          class="mb-1 text-center word-break text-capitalize"
                                        >
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
                                            class="pl-2 d-flex align-items-center color-secondary cursor-pointer mb-1"
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
                                              class="mb-0 text-truncate cursor-pointer"
                                              >{{ sub.title }}</label
                                            >
                                          </div>
                                        </div>
                                        <div
                                          v-if="
                                            !item.subTasks ||
                                            item.subTasks.length <= 0
                                          "
                                          class="d-flex align-items-center"
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
                                        class="d-flex align-items-center justify-content-between"
                                      >
                                        <div
                                          class="col-8 py-0 pl-0 text-12 d-flex flex-column"
                                        >
                                          <div
                                            class="d-flex flex-column lext-limited"
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
                                                class="color-secondary text-truncate w-100"
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
                                          class="col-4 material-date py-0 text-right"
                                        >
                                          {{ item.formattedDate }}
                                        </div>
                                      </div>
                                    </div>

                                    <div
                                      class="add-person-section position-absolute top-0"
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
                                        class="ap-img-section mr--3 shadow-sm exclamation d-flex align-items-center justify-content-center bg-primary"
                                      >
                                        <span class="color-white"
                                          ><i class="fas fa-exclamation"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </draggable>
                        </div>
                        <!-- hide -->
                        <div class="row">
                          <div
                            class="col-12 col-md-6 py-3 mb-3"
                            v-for="item in tempAssts"
                            :key="item.id"
                          >
                            <div
                              v-if="item.shared_users_id != user_id"
                              class="position-absolute multiple-select-checkbox jochi-components-light-bg d-flex align-items-center justify-content-center"
                            >
                              <div class="squaredThree">
                                <input
                                  type="checkbox"
                                  :id="item.id"
                                  :name="item.id"
                                  @click="onChooseMultiple(item.id)"
                                />
                                <label :for="item.id"></label>
                              </div>
                            </div>
                            <drag class="drag h-100" :transfer-data="{ item }">
                              <div class="h-100">
                                <div
                                  @click="onCardClick(item)"
                                  class="jochi-sub-components-light-bg drag-drop p-4 position-realtive h-100 cursor-pointer d-flex flex-column justify-content-between"
                                >
                                  <div class="d-flex flex-column">
                                    <div
                                      class="assignment-tag-section d-flex align-items-center mb-2"
                                    >
                                      <div
                                        class="assignment-tag mr-2 text-nowrap"
                                        :class="{
                                          red: item.priority == '1',
                                          yellow: item.priority == '2',
                                          green: item.priority == '3',
                                          orange: item.priority == '4',
                                        }"
                                      >
                                        {{
                                          item.priority == "1"
                                            ? "Urgent"
                                            : item.priority == "2"
                                            ? "Important"
                                            : item.priority == "3"
                                            ? "Can Wait"
                                            : item.priority == "4"
                                            ? "Overdue"
                                            : ""
                                        }}
                                      </div>
                                      <div
                                        class="assignment-tag pink text-truncate"
                                      >
                                        {{
                                          item.subject.subject_name
                                            ? item.subject.subject_name
                                            : item.subject
                                        }}
                                      </div>
                                    </div>
                                    <div class="assignment-add-section">
                                      <h4
                                        class="mb-1 text-center word-break text-truncate text-capitalize"
                                      >
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
                                          class="pl-2 d-flex align-items-center color-secondary cursor-pointer mb-1"
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
                                            class="mb-0 text-truncate cursor-pointer"
                                            >{{ sub.title }}</label
                                          >
                                        </div>
                                      </div>
                                      <div
                                        v-if="
                                          !item.subTasks ||
                                          item.subTasks.length <= 0
                                        "
                                        class="d-flex align-items-center"
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
                                      class="d-flex align-items-center justify-content-between"
                                    >
                                      <div
                                        class="col-8 py-0 pl-0 text-12 d-flex flex-column"
                                      >
                                        <div
                                          class="d-flex flex-column lext-limited"
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
                                              class="color-secondary text-truncate w-100"
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
                                        class="col-4 material-date py-0 text-right"
                                      >
                                        {{ item.formattedDate }}
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    class="add-person-section position-absolute top-0"
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
                                      class="ap-img-section mr--3 shadow-sm exclamation d-flex align-items-center justify-content-center bg-primary"
                                    >
                                      <span class="color-white"
                                        ><i class="fas fa-exclamation"></i
                                      ></span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </drag>
                          </div>
                          <client-only>
                            <infinite-loading
                              class="d-flex align-items-center w-100 justify-content-center"
                              :identifier="reloadCount"
                              @infinite="loadNext"
                            >
                            </infinite-loading>
                          </client-only>
                        </div>
                      </div>
                      <!-- drag end -->

                      <div class="d-none flex-column pt-3 h-40 flex-fill">
                        <div
                          class="drop color-secondary text-16 h-100 d-flex flex-column"
                        >
                          <h2 class="color-primary font-semi-bold px-5">
                            Completed This Week
                          </h2>
                          <p
                            class="d-none d-xl-block mb-0 px-5 color-secondary font-regular"
                          >
                            Drag and drop your assignment here when it is
                            completed
                          </p>
                          <div
                            class="d-flex flex-column custom-overflow px-5 pb-3 h-100"
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
                                    class="jochi-sub-components-light-bg py-4 px-2 completed-assignments text-center h-100"
                                  >
                                    <h4
                                      class="mb-0 blue word-break text-capitalize"
                                    >
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
                              </div>
                              <div
                                class="h-100 d-flex align-items-center justify-content-center"
                                v-if="
                                  !completedAssignmentList ||
                                  completedAssignmentList.length <= 0
                                "
                              >
                                <span class="color-secondary text-center"
                                  >No completed tasks for this week</span
                                >
                              </div>
                            </draggable>
                          </div>
                        </div>
                      </div>

                      <div class="d-flex flex-column pt-3 h-40 flex-fill">
                        <drop
                          class="drop color-secondary text-16 h-100 d-flex flex-column"
                          @drop="handleDrop"
                        >
                          <h2 class="color-primary font-semi-bold px-5">
                            Completed This Week
                          </h2>
                          <p class="mb-0 px-5 color-secondary font-regular">
                            Drag and drop your assignment here when it is
                            completed
                          </p>
                          <div
                            class="d-flex flex-column custom-overflow px-5 pb-3 h-100"
                          >
                            <div class="row mt-1">
                              <div
                                v-for="item in completedAssignmentList"
                                :key="item.id"
                                class="col-6"
                              >
                                <div
                                  @click="confirmUndo(item.id)"
                                  class="position-absolute multiple-select-checkbox jochi-components-light-bg d-flex align-items-center justify-content-center cursor-pointer"
                                >
                                  <i class="fas fa-undo"></i>
                                </div>
                                <div
                                  class="jochi-sub-components-light-bg py-4 px-2 completed-assignments text-center h-100 bg-redShade"
                                >
                                  <h4
                                    class="mb-0 blue word-break text-truncate text-capitalize"
                                  >
                                    {{ item.task }}
                                  </h4>

                                  <div
                                    :class="
                                      viewMore && viewMoreId == item.id
                                        ? 'd-flex flex-column overflow-auto vh-10 completed-vh-10'
                                        : 'd-flex flex-column overflow-hidden vh-10 completed-vh-10'
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
                                      class="pl-2 d-flex justify-content-center color-dark cursor-pointer mb-1"
                                    >
                                      <label
                                        for=""
                                        class="mb-0 text-truncate cursor-pointer"
                                        >{{ sub.title }}</label
                                      >
                                    </div>
                                  </div>
                                  <button
                                    v-if="
                                      item.subTasks && item.subTasks.length > 3
                                    "
                                    class="btn btn-void p-0 pl-2"
                                    @click="viewMoreClick($event, item)"
                                  >
                                    <span class="text-12">View more</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div
                              class="h-100 d-flex align-items-center justify-content-center"
                              v-if="
                                !completedAssignmentList ||
                                completedAssignmentList.length <= 0
                              "
                            >
                              <span class="color-secondary text-center"
                                >No completed tasks for this week</span
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
                          class="d-flex card card-primary-void flex-column h-100 p-4 rounded-22 col-12 col-lg-8 float-right"
                        >
                          <div
                            class="d-flex flex-column flex-md-row justify-content-between mb-2 border-bottom"
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
                                  closePopup();
                                "
                                ><i class="fas fa-times"></i
                              ></span>
                            </p>
                            <div
                              class="d-flex justify-content-end d-block d-xl-none"
                            >
                              <button
                                v-if="!isAddAssignment"
                                class="btn btn-success border border-dark py-0 px-4 rounded-12 font-semi-bold mb-2"
                                @click="confirmComplete"
                              >
                                <span>Mark as complete</span>
                              </button>
                            </div>
                          </div>
                          <div
                            class="d-flex flex-column justify-content-between h-40 flex-fill"
                          >
                            <div
                              class="d-flex flex-column custom-overflow px-2 pr-3 me--3 mb-2"
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
                                    maxlength="60"
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
                                          class="dropdown-select form-control text-left"
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
                                            <span>Can Wait</span>
                                          </li>
                                          <li
                                            @click="priorityVal = 'Important'"
                                            class="item medium-color"
                                          >
                                            <span>Important</span>
                                          </li>
                                          <li
                                            @click="priorityVal = 'Urgent'"
                                            class="item high-color"
                                          >
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
                                  class="d-flex justify-content-between align-items-center mb-2"
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
                                  class="custom-overflow pr-2 mr--2 d-flex flex-column"
                                >
                                  <div
                                    v-for="subTask in subTasksList"
                                    :key="subTask"
                                  >
                                    <div
                                      class="card card-transparent show-icon p-1 mb-1"
                                    >
                                      <div
                                        class="d-flex align-items-center justify-content-between"
                                      >
                                        <p
                                          class="mb-0 color-secondary text-16 font-regular word-break pr-3"
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
                                    class="h-fit-content show-icon"
                                  >
                                    <div
                                      class="d-flex align-items-center my-2 mr-3"
                                    >
                                      <div
                                        class="ld-img-section mr-2 d-flex flex-column"
                                      >
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
                                        <p class="ld-heading mb-0">
                                          {{ peer.first_name }}
                                        </p>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      role="button"
                                      @click="
                                        removePeerConfirm(peer.id, $event)
                                      "
                                    >
                                      <span
                                        class="color-primary fa-icon show-hover d-none btn p-0 ml-05"
                                        ><i class="fas fa-trash-alt ml-3"></i
                                      ></span>
                                    </button>
                                  </div>
                                </div>

                                <!-- Additional Material Add -->
                                <div
                                  class="d-flex justify-content-between align-items-center mb-2"
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
                                          id="fileUpload"
                                          accept=".png,.jpeg,.jpg,.pdf"
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
                                      <div class="col-3 p-0"></div>
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
                                      class="d-flex align-items-center justify-content-between my-2 mr-3 min-w-200 w-100 show-icon"
                                    >
                                      <div class="ld-details-section w-100">
                                        <p
                                          @click="openLink(item)"
                                          class="ld-heading mb-1 text-link text-truncate"
                                        >
                                          <!-- {{ peer.first_name }} -->
                                          {{ item.link }}
                                        </p>
                                      </div>
                                      <span
                                        class="color-primary fa-icon show-hover d-none btn p-0"
                                        @click="deleteAdditionalMat(item)"
                                        ><i class="fas fa-trash-alt"></i
                                      ></span>
                                    </div>
                                    <div
                                      v-else
                                      class="d-flex align-items-center justify-content-between my-2 mr-3 min-w-200 w-100 show-icon"
                                    >
                                      <div class="ld-details-section w-100">
                                        <p
                                          @click="openLink(item)"
                                          class="ld-heading mb-1 text-link text-truncate"
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
                                        class="color-primary fa-icon show-hover d-none btn p-0"
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
                                      >&nbsp;
                                      <!-- <span v-if="priorityVal != 'Overdue'" -->
                                      <span>{{ priorityVal }} </span>
                                      <!-- <div
                                        v-else
                                        class="dropdown input-icon-area"
                                      >
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
                                          requ
                                        >
                                          <span class="caret">
                                            {{
                                              priorityVal && !prior
                                                ? priorityVal
                                                : prior == 1
                                                ? "Urgent"
                                                : prior == 2
                                                ? "Important"
                                                : prior == 3
                                                ? "Can Wait"
                                                : "Select priority"
                                            }}</span
                                          >
                                        </button>
                                        <ul
                                          class="dropdown-menu"
                                          aria-labelledby="dLabel"
                                        >
                                          <li
                                            @click="prior = 3"
                                            class="item low-color"
                                          >
                                            <span>Can Wait</span>
                                          </li>
                                          <li
                                            @click="prior = 2"
                                            class="item medium-color"
                                          >
                                            <span>Important</span>
                                          </li>
                                          <li
                                            @click="prior = 1"
                                            class="item high-color"
                                          >
                                            <span>Urgent</span>
                                          </li>
                                        </ul>
                                      </div> -->
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
                                  class="d-flex justify-content-between align-items-center mb-2"
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
                                  class="custom-overflow pr-2 mr--2 d-flex flex-column"
                                >
                                  <div
                                    v-for="subTask in subTasksList"
                                    :key="subTask"
                                  >
                                    <div
                                      class="card card-transparent show-icon p-1 mb-1"
                                    >
                                      <div
                                        class="d-flex align-items-center justify-content-between"
                                      >
                                        <p
                                          class="mb-0 color-secondary text-16 font-regular word-break pr-3"
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
                                  <h6 class="color-dark font-semi-bold mb-0">
                                    Invited Peers
                                  </h6>
                                </div>
                                <div
                                  v-if="invitePeer"
                                  class="d-flex flex-row align-items-start"
                                >
                                  <div class="form-row mb-2 mx-0 mr-2 w-100">
                                    <label class="form-label" for="name"
                                      >Invite peers</label
                                    >
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
                                      class="d-flex align-items-center my-2 mr-3 min-w-200"
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
                                  class="d-flex justify-content-between align-items-center mb-2"
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
                                          id="fileUpload"
                                          @change="onFileChange"
                                          accept=".png,.jpeg,.jpg,.pdf"
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
                                      <div class="col-3 p-0"></div>
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
                                    class="h-fit-content w-100"
                                  >
                                    <div
                                      v-if="item.link"
                                      class="d-flex align-items-center justify-content-between my-2 mr-3 min-w-200 show-icon"
                                    >
                                      <div class="ld-details-section w-100">
                                        <p
                                          @click="openLink(item)"
                                          class="ld-heading mb-1 text-truncate cursor-pointer"
                                        >
                                          <!-- {{ peer.first_name }} -->
                                          {{ item.link }}
                                        </p>
                                      </div>
                                      <span
                                        class="color-primary fa-icon show-hover d-none btn p-0"
                                        @click="deleteAdditionalMat(item)"
                                        ><i class="fas fa-trash-alt"></i
                                      ></span>
                                    </div>
                                    <div
                                      v-else
                                      class="d-flex align-items-center justify-content-between my-2 mr-3 min-w-200 show-icon"
                                    >
                                      <div class="ld-details-section w-100">
                                        <p
                                          @click="openLink(item)"
                                          class="ld-heading mb-1 text-truncate cursor-pointer"
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
                                        class="color-primary fa-icon show-hover d-none btn p-0"
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
                                class="btn btn-secondary py-1 px-3 rounded-pill mr-2"
                                @click="
                                  openAssignment = false;
                                  closePopup();
                                "
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              aria-label="Close"
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

    <!-- End Weekly Calander -->
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
          <div class="modal-header pb-1">
            <h3 class="modal-title" id="completeConfirmModalLongTitle">
              Complete Assignment Confirmation
            </h3>
          </div>
          <div class="modal-body px-3 bold-6">
            Mark assignment as completed?
          </div>
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
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
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
              class="btn btn-secondary py-1 px-4 rounded-12 mr-2 font-semi-bold"
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
          <div class="modal-body px-4">
            Are you sure want to remove the peer?
          </div>
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
    <!-- Undo assignment  confirmation  -->
    <div
      class="modal fade"
      id="undoAssignmentConfirmation"
      tabindex="-1"
      role="dialog"
      aria-labelledby="undoAssignmentConfirmationModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header pb-1">
            <h3
              class="modal-title"
              id="undoAssignmentConfirmationModalLongTitle"
            >
              Undo complete assignment confirmation
            </h3>
          </div>
          <div class="modal-body px-3">
            <h5 class="color-dark font-semi-bold">
              Undo assignment completion?
            </h5>
          </div>
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
              @click="undoAsstComplete()"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Undo assignment confirmation end  -->
    <!-- Delete assignment  confirmation  -->
    <div
      class="modal fade"
      id="deleteAssignmentConfirmation"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteAssignmentConfirmationModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header pb-1">
            <h3
              class="modal-title"
              id="deleteAssignmentConfirmationModalLongTitle"
            >
              Delete assignment confirmation
            </h3>
          </div>
          <div class="modal-body px-4">Delete selected assignments?</div>
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
              @click="deleteAssts()"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete assignment confirmation end  -->
    <!-- Alert modal  -->
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
            <h3 class="modal-title" id="alertModalModalLongTitle">Alert</h3>
          </div>
          <div class="modal-body px-4">{{ alertMessage }}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary py-1 px-3 rounded-12 font-semi-bold"
              data-dismiss="modal"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Alert modal end  -->
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
import * as animationDataSuccess from "~/assets/success.json";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import "vue2-timepicker/dist/VueTimepicker.css";
import draggable from "vuedraggable";
import InfiniteLoading from "vue-infinite-loading";
import io from "socket.io-client";
const socket = io("ws://localhost:3000");

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
      lottieOptionsSuccess: {
        animationData: animationDataSuccess.default,
        loop: false,
      },
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
        allDaySlot: false,
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
      undoAsstId: 0,
      undoSubtaskId: 0,
      user_id: "",
      removedPeerList: [],
      prior: "4",
      startTime: null,
      alertMessage: "",
    };
  },

  mounted() {
    const page = "PlannerWeek";
    const distinct_id = localStorage.getItem("distinctId");
    this.$mixpanel.track("Page View", { distinct_id, page });
    this.startTime = new Date().getTime();

    this.user_id = localStorage.getItem("id");

    // socket.on("notifications", (data) => {
    //   if (data) this.updateOverdueStatus(data);
    // });
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
    dateValue: { required },
    timeValue: { required },
    assignmentName: { required },
    assignmentDescription: { required },
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
      // plannerList: (state) => state.plannerList,
      // meetingList: (state) => state.meetingList,
      assignment: (state) => state.assignment,
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
  },
  methods: {
    assignmentPlanner() {
      this.$el.querySelector("#assignmentPlanner").classList.toggle("active");
      this.$el.querySelector("#assignPlanSection").classList.toggle("active");
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
            var color = "#38a272";
          }
          // else if (element.priority == "4") {
          //   var color = "#a7a7a7";
          // }
          if (element.task_status == "Completed") {
            var color = "#a7a7a7";
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

        var color = "#8b4cbc";
        meetingobj["groupId"] = "club-meeting";

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
            var color = "#F6D73C";
          } else if (element.priority == "3") {
            var color = "#38a272";
          }
          // else if (element.priority == "4") {
          //   var color = "#a7a7a7";
          // }
          if (element.task_status == "Completed") {
            var color = "#a7a7a7";
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
        meetingobj["groupId"] = "study";
        // meetingobj["type"] = "study";

        listobj["title"] = title;
        listobj["meeting"] = "Study Session";
        listobj["dateMeeting"] = dateMeeting;
        listobj["timeValNum"] = timeValNum;
        // this.meetingDetails.push(listobj);
        eventList.push(meetingobj);
      });
      this.trainingsMatches?.forEach((element) => {
        if (element.date) {
          var plannerObj = {};

          if (element.session_type == "Match") {
            var color = "#ad2b89";
          } else {
            var color = "#da70d6";
          }
          var dateMeeting = element.date;
          var tmeMeeting = "";
          if (element.time) {
            tmeMeeting = this.formatAMPM(element.time);
          }
          var start = dateMeeting + "T" + tmeMeeting;

          plannerObj["title"] = element.title;
          plannerObj["color"] = color;
          plannerObj["start"] = start;
          plannerObj["id"] = element.id;
          plannerObj["groupId"] =
            element.session_type == "Match" ? "matches" : "trainings";
          eventList.push(plannerObj);
        }
      });
      this.calendarOptions.events = eventList;
      this.loading = false;
    },
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

      this.GetWeeklyPlanner();
    },
    async UpdateAssignment() {
      if (this.priorityVal == "Overdue" && !this.isSharedAssignment) {
        this.$toast.open({
          message: "Please select the priority",
          type: "error",
          duration: 5000,
        });
        return;
      }
      this.submitted = true;
      if (!this.isSharedAssignment) {
        this.$v.$touch();
        if (this.$v.$invalid || !this.validTime) {
          return;
        }
      }

      let priority = 0;

      if (this.priorityVal == "Urgent") {
        priority = "1";
      } else if (this.priorityVal == "Important") {
        priority = "2";
      } else if (this.priorityVal == "Can Wait") {
        priority = "3";
      } else if (this.priorityVal == "Overdue") {
        priority = this.prior;
      }
      this.processing = true;
      this.loading = true;
      const dfE = moment(this.dateValue).format("YYYY-MM-DD");

      const peersSelected = [];
      if (this.peerList.length > 0) {
        this.peerList.forEach((e) => {
          peersSelected.push(e.id);
        });
      }

      let removed = [];
      this.removedPeerList.forEach((e) => {
        const index = this.peerList.findIndex((item) => item.id == e);
        if (index < 0) {
          removed.push(e);
        }
      });

      removed = [...new Set(removed)];

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
        assignment_id: this.assignmentId,
        user_id: localStorage.getItem("id"),
        task: this.assignmentName,
        assignment_description: this.assignmentDescription,
        subject: this.isSharedAssignment ? this.subjectId : this.subject?.id,
        subject_id: this.isSharedAssignment ? this.subjectId : this.subject?.id,
        due_time: this.timeValue,
        due_date: dfE,
        priority: priority,
        shared_users_ids: peersSelected,
        assignment_materials: assignment_materials,
        subTasks: subTaskLists,
        deleted_subTask: this.deletedSubTasksArray,
        removed_users: removed,
      });
      this.loading = false;
      this.removedPeerList = [];
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
      this.GetWeeklyPlanner();
      this.submitted = false;
      this.processing = false;
    },
    async resetAssignment() {
      this.choosenAssignments = [];
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

    viewMoreClick(event, item) {
      event.preventDefault();
      event.stopPropagation();
      this.viewMore = true;
      this.viewMoreId = item.id;
    },
    async openModal() {
      this.isAssignmentEdit = false;
      $("#exampleModalCenter").modal({ backdrop: true });
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
    eventClicked(info) {
      var idVal = info.event;

      var idVal = info.event;
      if (
        moment(idVal.startStr.split("T")[0]).isBefore(
          moment().format("YYYY-MM-DD")
        )
      ) {
        if (
          idVal.groupId == "assignment" ||
          idVal.groupId == "shared-assignment"
        ) {
          let data = {};
          let mappedData = {};
          if (idVal.groupId == "assignment") {
            data = this.assignmentsList.find(
              (e) => e.id.toString() == idVal.id.toString()
            );
            mappedData = this.mapData(data);
          }
          if (idVal.groupId == "assignment") {
            data = this.overdues.find(
              (e) => e.id.toString() == idVal.id.toString()
            );
            if (
              !mappedData ||
              (Object.keys(mappedData).length === 0 &&
                mappedData.constructor === Object)
            )
              mappedData = this.mapData(data);
          }
          if (idVal.groupId == "shared-assignment") {
            data = this.sharedAssignmentsList.find(
              (e) => e.assignment_id.toString() == idVal.id.toString()
            );
            if (!mappedData) mappedData = this.mapSharedData(data);
          }
          if (idVal.groupId == "shared-assignment") {
            data = this.sharedOverdues.find(
              (e) => e.assignment_id.toString() == idVal.id.toString()
            );
            if (
              !mappedData ||
              (Object.keys(mappedData).length === 0 &&
                mappedData.constructor === Object)
            )
              mappedData = this.mapSharedData(data);
          }
          if (!mappedData) {
            this.alertMessage = "This assignment has been completed!";
            $("#alertModal").modal({ backdrop: true });
            return;
          }
          this.assignmentPlanner();
          this.onCardClick(mappedData);
        } else {
          this.alertMessage = "No actions can be performed on past events!";
          $("#alertModal").modal({ backdrop: true });
          return;
        }
      } else {
        if (
          idVal.groupId == "assignment" ||
          idVal.groupId == "shared-assignment"
        ) {
          let data = {};
          let mappedData = {};
          if (idVal.groupId == "assignment") {
            data = this.assignmentsList.find(
              (e) => e.id.toString() == idVal.id.toString()
            );
            mappedData = this.mapData(data);
          }
          if (idVal.groupId == "assignment") {
            data = this.overdues.find(
              (e) => e.id.toString() == idVal.id.toString()
            );
            if (
              !mappedData ||
              (Object.keys(mappedData).length === 0 &&
                mappedData.constructor === Object)
            )
              mappedData = this.mapData(data);
          }
          if (idVal.groupId == "shared-assignment") {
            data = this.sharedAssignmentsList.find(
              (e) => e.assignment_id.toString() == idVal.id.toString()
            );
            if (!mappedData) mappedData = this.mapSharedData(data);
          }
          if (idVal.groupId == "shared-assignment") {
            data = this.sharedOverdues.find(
              (e) => e.assignment_id.toString() == idVal.id.toString()
            );
            if (
              !mappedData ||
              (Object.keys(mappedData).length === 0 &&
                mappedData.constructor === Object)
            )
              mappedData = this.mapSharedData(data);
          }
          if (!mappedData) {
            this.alertMessage = "This assignment has been completed!";
            $("#alertModal").modal({ backdrop: true });
            return;
          }
          this.assignmentPlanner();

          this.onCardClick(mappedData);
        }
        if (idVal.groupId == "study") {
          let session = this.sessionList.find(
            (e) => e.id.toString() == idVal.id.toString()
          );

          if (session.status == "STOP") {
            this.alertMessage = "This session has already been completed!";
            $("#alertModal").modal({ backdrop: true });
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
            this.alertMessage = "This session has already been completed!";
            $("#alertModal").modal({ backdrop: true });

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
        } else if (idVal.groupId == "club-meeting") {
          let club = this.clubMeetings.find((e) => e.clubs?.id == idVal.id);
          return this.$router.push(
            `/club-moreInfo?id=${idVal.id}&name=${club.club_name}&type=${club.clubs.activity_type}`
          );
        } else if (idVal.groupId == "matches" || idVal.groupId == "trainings") {
          let club = this.trainingsMatches.find((e) => e.id == idVal.id);
          return this.$router.push(
            `/club-moreInfo?id=${club.clubs.id}&name=${club.clubs.name}&type=${club.clubs.activity_type}`
          );
        }
      }
    },
    popupmodal(titleData, meetingData, dateData, time) {
      var timestandard = new Date(dateData).toLocaleString();
      if (meetingData == "#64B5FC") {
        var color = "Peer";
      } else if (meetingData == "#8b4cbc") {
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
    async loadNext($state) {
      if (this.tempOffset != this.offset || this.reloadNext) {
        this.reloadNext = false;
        this.tempOffset = this.offset;
        this.pendingAssignments = [];
        await this.getAssignments({ offset: this.offset, limit: this.limit });
        if (this.offset == 0) {
          await this.mapOverdues();
        }
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
    },
    async getAssignmentsList() {
      if (this.reloadCount >= 0) {
        this.reloadCount += 1;
        this.tempAssts = [];
        this.offset = 0;
      }
    },
    async applyFilter() {
      if (!this.filterType) {
        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
        return this.getWeeklyPlannerFilter();
      }
      eventList = [];
      this.loading = true;
      const format = "YYYY-MM-DD";
      this.calendarDate = moment(this.calendarApi.view.activeStart).format(
        format
      );

      await this.getWeeklyPlannerFilter({
        plannerType: "Weekly",
        date: this.calendarDate,
        filter: this.filterType,
      });
      $(".modal").modal("hide");
      $(".modal-backdrop").remove();
      this.meetingDetails = [];

      this.plannerList.forEach((element) => {
        var plannerObj = {};
        var title = element.task;
        if (element.priority == "1") {
          var color = "#EF382E";
        } else if (element.priority == "2") {
          var color = "#F6D73C";
        } else if (element.priority == "3") {
          var color = "#38a272";
        }
        // else if (element.priority == "4") {
        //   var color = "#a7a7a7";
        // }
        if (element.task_status == "Completed") {
          var color = "#a7a7a7";
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

        const color = element.subject?.color_code;
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

        const color = element.subject?.color_code;
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
            var color = "#F6D73C";
          } else if (element.priority == "3") {
            var color = "#38a272";
          }
          //  else if (element.priority == "4") {
          //   var color = "#a7a7a7";
          // }
          if (element.task_status == "Completed") {
            var color = "#a7a7a7";
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

      this.calendarOptions.events = eventList;
      this.loading = false;
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
          message: "Please add a valid sub task ",
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
    mapOverdues() {
      if (this.overdues && this.overdues.length > 0) {
        this.overdues.forEach((e) => {
          let asst = this.mapData(e);
          this.pendingAssignments.push(asst);
        });
      }

      if (this.sharedOverdues && this.sharedOverdues.length > 0) {
        this.sharedOverdues.forEach((e) => {
          let asst = this.mapSharedData(e);
          this.pendingAssignments.push(asst);
        });
      }
    },
    mapAssignments() {
      if (this.assignmentsList && this.assignmentsList.length > 0) {
        this.assignmentsList.forEach((e) => {
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
        item.shared_users_id = e.shared_users_id;
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
        item.shared_users_id = e.shared_users_id;
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
            if (item.users) {
              peer = item.users;
              peer.id = item.shared_users_id;
              peers.push(peer);
            }
          }
        });
      }
      if (e.assignment_shared_users && e.assignment_shared_users?.length > 0) {
        e.assignment_shared_users.forEach((item) => {
          let peer = {};
          if (item.shared_users_id != user_id) {
            if (item.users) {
              peer = item.users;
              peer.id = item.shared_users_id;
              peers.push(peer);
            }
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
    },
    async completeAssignment(completed = true) {
      this.processingCompleteAssignment = true;
      await this.completeTask({
        assignment_id: completed ? this.completeAsstId : this.undoAsstId,
        status: completed ? "Completed" : "Pending",
      });
      this.processingCompleteAssignment = false;
      if (this.successMessage != "") {
        this.openAssignment = false;
        this.offset = 0;
        this.tempAssts = [];
        this.reloadNext = true;
        this.reloadCount += 1;

        this.getAllCompletedAssignments();
        this.completeAsstId = 0;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });

        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
        await this.GetWeeklyPlanner();
        if (completed) this.playCelebration = true;
        const myTimeout = setTimeout(() => {
          this.playCelebration = false;
        }, 5000);
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
        await this.GetWeeklyPlanner();
      }
    },
    async completeSubTask(completed = true) {
      await this.completeTask({
        task_id: completed ? this.completeSubTaskId : this.undoSubtaskId,
        status: completed ? "Completed" : "Pending",
      });
      this.processingSubCompleteAssignment = false;
      $(".modal").modal("hide");
      $(".modal-backdrop").remove();
      await this.GetWeeklyPlanner();

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
        await this.getAllCompletedAssignments();
        if (this.allSubTskCompleted) {
          if (completed) this.playCelebration = true;

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
      this.GetWeeklyPlanner();
    },
    checkAllCompleted() {
      let asst = this.pendingAssignments.find(
        (e) => e.id == this.completeAsstId
      );
      let sub = asst.subTasks;
      let incomplete = false;
      sub.forEach((e) => {
        if (!incomplete && e.task_status != "Completed") {
          incomplete = true;
        }
      });
      return !incomplete;
    },
    async undoCompleteSubTask() {
      this.completeSubTask(false);
    },
    onCardClick(data) {
      this.deletedSubTasksArray = [];
      this.isAddAssignment = false;
      this.openAssignment = true;
      this.mapAssignmentDetail(data);
      this.mapPeerInvited(data);
    },
    mapPeerInvited(data) {
      this.peerSelected = [];
      if (data.peers && data.peers?.length > 0 && this.students.length > 0) {
        data.peers.forEach((e) => {
          let studs = this.students.find(
            (s) => s.id.toString() == e.id.toString()
          );
          this.peerSelected.push(studs);
        });
      }
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
          : data.priority == "4"
          ? "Overdue"
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
      this.peerList = data.peers;
      this.additionalMaterialList = data.assignment_materials;
    },
    async getAllCompletedAssignments() {
      await this.getCompletedAssignments({
        userId: localStorage.getItem("id"),
        date: moment().format("YYYY-MM-DD"),
        type: "Weekly",
      });
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
      this.completeAsstId = asstId;
      this.completeSubTaskId = id;
      if (status == "Completed") {
        this.undoSubtaskId = id;
        $("#undoSubTaskConfirm").modal({ backdrop: true });
      } else {
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
      }
    },
    async UploadAttachment() {
      if (!this.materialType) {
        return this.$toast.open({
          message: "Please choose file type",
          type: "warning",
          duration: 5000,
        });
        return false;
      }

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
          if (this.errorMessageQuote != "") {
            return this.$toast.open({
              message: this.errorMessageQuote,
              type: this.errorTypeQuote,
              duration: 4000,
            });
          }

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
    },
    openLink(material) {
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
      this.additionalMaterialList;
      const index = this.additionalMaterialList.indexOf(item);
      if (index > -1) {
        this.additionalMaterialList.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
    removePeerConfirm(id, event) {
      event.stopPropagation();
      $("#removePeerConfirmation").modal({ backdrop: true });
      this.removePeerId = id;
    },
    removePeer() {
      this.removedPeerList.push(this.removePeerId);
      const index = this.peerList.findIndex(
        (item) => item.id == this.removePeerId
      );
      if (index > -1) {
        this.peerList.splice(index, 1); // 2nd parameter means remove one item only
      }
      const index1 = this.peerSelected.findIndex(
        (item) => item.id == this.removePeerId
      );
      if (index1 > -1) {
        this.peerSelected.splice(index1, 1); // 2nd parameter means remove one item only
      }
    },
    onChooseMultiple(id) {
      if (this.choosenAssignments.includes(id)) {
        let index = this.choosenAssignments.indexOf(id);
        this.choosenAssignments.splice(index, 1);
      } else {
        this.choosenAssignments.push(id);
      }
    },
    confirmUndo(id) {
      this.undoAsstId = id;
      $("#undoAssignmentConfirmation").modal({ backdrop: true });
    },
    undoAsstComplete() {
      this.completeAssignment(false);
    },
    confirmDeletion() {
      $("#deleteAssignmentConfirmation").modal({ backdrop: true });
    },
    async deleteAssts() {
      await this.deleteAssignments({
        assignments_ids: this.choosenAssignments,
      });
      if (this.successMessage != "") {
        this.choosenAssignments = [];
        this.offset = 0;
        this.tempAssts = [];
        this.reloadNext = true;
        this.reloadCount += 1;
        this.openAssignment = false;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });

        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
        await this.GetWeeklyPlanner();
      }
    },
    updateOverdueStatus(data) {
      this.tempAssts.find((e) => e.id == data.id)?.priority == 4;
    },
    closePopup() {
      this.offset = 0;
      this.tempAssts = [];
      this.reloadNext = true;
      this.reloadCount += 1;
      this.deletedSubTasksArray = [];

      this.GetAssignment();
      this.GetWeeklyPlanner();
      this.openAssignment = false;
    },
  },
  beforeDestroy() {
    const endTime = new Date().getTime();
    const duration = (endTime - this.startTime) / 1000;
    const distinct_id = localStorage.getItem("distinctId");
    const page = "PlannerWeek";
    this.$mixpanel.track("Page Duration", { duration, distinct_id, page });
  },
};
</script>

<style>
.completed-assignments {
  min-height: 200px;
}
.multiple-select-checkbox {
  left: 5px;
  top: 0px;
  width: 32px;
  height: 32px !important;
  border-radius: 50%;
  background-color: unset;
}
.h-60 {
  height: 60%;
}
.squaredThree {
  /* position: relative;
  float:left; */
  /* margin: 10px */
}
.squaredThree label {
  width: 24px;
  height: 24px !important;
  cursor: pointer;
  position: absolute;
  top: 3px;
  left: 3px;
  background: #ffb5b2;
  border-radius: 50%;
}
.squaredThree label:after {
  content: "";
  width: 13px;
  height: 7px;
  position: absolute;
  top: 7px;
  left: 6px;
  border: 3px solid #fcfff4;
  border-top: none;
  border-right: none;
  background: transparent;
  opacity: 0;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.squaredThree label::after {
  opacity: 0.3;
}
.squaredThree label:hover::after {
  opacity: 1;
  transition: all ease-in-out 300ms;
}
.squaredThree input[type="checkbox"] {
  visibility: hidden;
}
.squaredThree input[type="checkbox"]:checked + label:after {
  opacity: 1 !important;
}
.squaredThree input[type="checkbox"]:checked + label {
  background: #ed7672;
  transition: all ease-in-out 300ms;
}
.label-text {
  /* position: relative; */
  /* left: 10px; */
}
.completed-vh-10 {
  height: 10vh;
}
</style>

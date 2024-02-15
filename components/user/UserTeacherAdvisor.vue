<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />

    <div class="main-section">
      <!-- teacher Page -->
      <section id="teacher-detail" class="">
        <div
          class="border-0 px-1 py-3 custom-margin-for-main-section custom-full-height d-flex flex-column custom-overflow"
        >
          <div
            v-if="isSchoolAdmin != '1'"
            class="d-flex align-items-center justify-content-between px-3"
          >
            <h3 class="color-primary-dark heading3 font-semi-bold m-0">Your Students</h3>
            <button class="btn btn-primary px-4" @click="openModal">
              Send Request
            </button>
          </div>
          <div
            class="inner-teacher container-fluid p-3 d-flex flex-column flex-fill h-40"
          >
            <div class="row h-100">
              <div class="col-12 col-md-5 col-lg-4 col-xl-3 h-50 h-md-100">
                <div
                  class="card card-primary-void rounded-22 py-4 h-100 position-realtive"
                >
                  <!-- <div class="d-flex flex-column px-4">
                    <h5 class="color-dark font-semi-bold mb-3">Students</h5>
                  </div> -->
                  <div class="hidden-scroll d-flex flex-column">
                    <div
                      @click="onStudentClick(student)"
                      v-for="student in studentsListAdvisor"
                      :key="student.id"
                      :class="{ 'bg-card-secondary': student.id == studentDetail.id }"
                      class="d-flex align-items-center flex-row p-3 student-list border-bottom cursor-pointer"
                    >
                      <div class="ld-img-section mr-3">
                        <div class="ld-img-holder">
                          <img
                            v-if="student.profile_pic"
                            :src="student.profile_pic"
                            alt=""
                          />
                          <img v-else src="~/static/image/avatar.png" alt="" />
                        </div>
                      </div>
                      <div class="ld-details-section">
                        <p class="ld-heading mb-1">
                          {{ student.first_name + " " + student.last_name }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-7 col-lg-8 col-xl-9 h-100">
                <div
                  v-if="showStudentAnalytics || showStudentProfile"
                  class="card card-primary-void rounded-22 h-100 position-realtive"
                >
                  <div
                    class="tab-btns d-flex align-items-center position-absolute z-index-9"
                  >
                    <button
                      @click="onTabClick(1)"
                      class="tab-btn mr-3"
                      id="filterPlanner"
                      :class="{ selected: showStudentProfile }"
                    >
                      Profile
                    </button>
                    <button
                      @click="onTabClick(2)"
                      class="btn tab-btn"
                      id="assignmentPlanner"
                      :class="{ selected: showStudentAnalytics }"
                    >
                      Study Analytics
                    </button>
                  </div>
                  <div
                    v-if="showStudentProfile"
                    class="d-flex flex-column h-40 flex-fill p-4 pt-0 custom-overflow my-3 mt-5"
                  >
                    <div class="d-flex py-1 py-md-4 px-0 px-xl-4 pt-xl-0">
                      <div class="ld-img-section mr-3 mb-0">
                        <div class="ld-img-holder img-holder-lg">
                          <img
                            v-if="studentDetail.profile_pic"
                            :src="studentDetail.profile_pic"
                            alt=""
                          />
                          <img
                            v-else
                            src="../../static/image/avatar.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div
                        class="d-flex flex-wrap flex-fill justify-content-between w-100 align-items-center"
                      >
                        <h3 class="color-primary-dark heading3 font-semi-bold mb-1 mb-md-2">
                          {{
                            studentDetail.first_name +
                            " " +
                            studentDetail.last_name
                          }}
                          <a :href="`mailto:${studentDetail.email}`">
                            <img src="~/static/image/v4/email-white.svg" alt="Email" class="small-waving-hand img-theme light"/>
                            <img src="~/static/image/v4/email-black.svg" alt="Email" class="small-waving-hand img-theme dark"/>
                          </a>
                        </h3>
                          <button 
                          v-if="isSchoolAdmin != '1'"
                          @click="
                           openAssignment = true;
                          isAddAssignment = true;
                            EditAssignmentModal();" class="btn btn-primary py-1 px-3 mr-3">Add Assignment
                          </button>
                        <!-- <div>
                          <div class="row m-0">
                            <div class="col-1 p-1">
                              <p
                                class="mb-0 color-dark text-16 font-regular text-right"
                              >
                                <span>: </span>
                              </p>
                            </div>
                            <div class="col-7 col-md-11 col-lg-8 p-1">
                              <p class="mb-0 color-dark text-16 font-semi-bold">
                                <span>{{ studentDetail.email }}</span>
                              </p>
                            </div>
                          </div>
                        </div> -->
                      </div>
                    </div>
                    <div
                      class="card card-primary-void rounded-22 h-40 flex-fill h-min-400"
                    >
                      <div class="tab-btns d-flex align-items-center z-index-">
                        <button
                          @click="
                            onTabClickAssignment(1);
                            showOverdueAssingments = false;
                            showAssignments = true;
                          "
                          class="tab-btn mr-3"
                          id="filterPlanner"
                          :class="{ selected: showAssignments }"
                        >
                          Assignments
                        </button>
                        <button
                          @click="
                            onTabClickAssignment(2);
                            showOverdueAssingments = true;
                            showAssignments = false;
                          "
                          class="btn tab-btn"
                          id="assignmentPlanner"
                          :class="{ selected: showOverdueAssingments }"
                        >
                          Overdue Assignments
                        </button>
                      </div>

                      <div
                        v-if="showAssignments"
                        class="custom-overflow px-4 pt-3 mb-3 h-100"
                      >
                        <div class="row">
                          <div
                            v-for="detail in pendingAssignments"
                            :key="detail.id"
                            class="col-12 col-lg-6 col-xl-4"
                          >
                            <div
                              class="bg-card-primary02 border rounded-8 drag-drop p-4 position-realtive h-100 d-flex flex-column justify-content-between assignment-status position-relative"
                              :class="{
                                'bg-card-secondary selected': detail.task_status === 'Completed',
                                'bg-card-primary02': detail.task_status !== 'Completed',
                              }"
                            >
                              <div class="d-flex flex-column">
                                <div
                                  class="assignment-tag-section d-flex justify-content-between align-items-center mb-2"
                                >
                                <div class="assignment-tag-section d-flex justify-content-between align-items-start">
                                  <div
                                    class="assignment-tag mr-2 text-nowrap"
                                    :class="
                                      detail.priority == '1'
                                        ? 'red'
                                        : detail.priority == '2'
                                        ? 'yellow'
                                        : detail.priority == '3'
                                        ? 'green'
                                        : detail.priority == '4'
                                        ? 'orange'
                                        : ''
                                    "
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
                                  <div
                                    v-if="detail.subject"
                                    class="assignment-tag bg-primary text-truncate"
                                  >
                                    {{ detail.subject }}
                                  </div>
                                </div>
                                  <div class="pe-2 d-flex justify-space-between align-center">
                                    <!-- Code commented for future use -->
                                    <!-- <button
                                    v-if="detail.createdBy && detail.task_status !== 'Completed'"
                                    @click="onCardClick(detail)"
                                    class="ml-3 text-12"
                                  >
                                    <i class="fas fa-pen color-black"></i>
                                  </button>
                                  <button
                                  v-if="detail.createdBy && detail.task_status !== 'Completed'"
                                    class="ml-3 text-12"
                                  >
                                    <i class="fas fa-trash color-black"></i>
                                  </button> -->
                                  </div>
                                </div>
                                <div class="text-center my-3">
                                  <h4 class="color-dark font-semi-bold mb-1">
                                    {{ detail.task }}
                                  </h4>
                                  <div class="text-center px-3">
                                    <p
                                      class="color-gray mb-0 text-16 line-height-1 font-semi-bold"
                                    >
                                      {{ detail.subject }}
                                    </p>
                                  </div>
                                </div>
                                <div
                                  v-if="
                                    detail.subTasks &&
                                    detail.subTasks.length > 0
                                  "
                                  class="mb-3"
                                >
                                  <h6 class="color-primary-dark font-semi-bold">
                                    Sub-tasks
                                  </h6>
                                  <div class="to-do-list">
                                    <div
                                      v-for="subtask in detail.subTasks"
                                      :key="subtask.id"
                                    >
                                      <div
                                        class="pl-2 d-flex align-items-center mb-1"
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
                                          class="mr-2 color-gray"
                                          :disabled="subtask.task_status !== 'Completed'"
                                        />
                                        <label
                                          for=""
                                          class="mb-0 text-12 color-gray"
                                          >{{ subtask.title }}</label
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="">
                                <h6 class="mb-1 color-primary-dark font-semi-bold">
                                  Additional Material
                                </h6>
                                <div
                                  class="d-flex align-items-center justify-content-between"
                                >
                                  <div
                                    v-if="
                                      detail.assignment_materials &&
                                      detail.assignment_materials.length > 0
                                    "
                                    class="col-8 py-0 pl-0 material-link text-12"
                                  >
                                    <div
                                      class="d-flex w-100"
                                      v-for="(
                                        material, index
                                      ) in detail.assignment_materials"
                                      :key="material.id"
                                    >
                                      <span
                                        v-if="index < 2"
                                        class="color-gray text-truncate w-100"
                                      >
                                        {{
                                          material.file_type == "link"
                                            ? material.material
                                            : material.file_name
                                        }}
                                      </span>
                                    </div>
                                    <span
                                      class="color-gray text-12"
                                      v-if="
                                        detail.assignment_materials &&
                                        detail.assignment_materials.length &&
                                        detail.assignment_materials.length > 2
                                      "
                                      >+{{
                                        detail.assignment_materials.length - 2
                                      }}
                                      more</span
                                    >
                                  </div>

                                  <div
                                    v-if="
                                      !detail.assignment_materials ||
                                      detail.assignment_materials.length <= 0
                                    "
                                    class="col-8 py-0 pl-0 material-link text-12"
                                  >
                                    <span class="color-gray text-12"
                                      >No documents added!</span
                                    >
                                  </div>
                                  <div
                                    class="col-4 material-date py-0 text-right pr-0"
                                  >
                                    <span class="text-12 color-gray">{{
                                      detail.due_date
                                    }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="row text-center w-100 flex-fill justify-content-center"
                        >
                          <div
                            v-if="
                              !pendingAssignments ||
                              pendingAssignments.length <= 0
                            "
                            class="empty-shedule d-flex justify-content-center align-items-center h-100"
                          >
                            <p>No assignments</p>
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="showOverdueAssingments"
                        class="custom-overflow px-4 pt-3 mb-3 h-100"
                      >
                        <div class="row">
                          <div
                            v-for="detail in overdueAssts"
                            :key="detail.id"
                            class="col-12 col-lg-6 col-xl-4"
                          >
                            <div
                              class="bg-card-primary02 border rounded-8 drag-drop p-4 position-realtive h-100 d-flex flex-column justify-content-between assignment-status position-relative"
                              :class="{
                                selected: detail.task_status == 'Completed',
                              }"
                            >
                              <div class="d-flex flex-column">
                                <div
                                  class="assignment-tag-section d-flex align-items-center justify-content-between"
                                >
                                <div class="d-flex align-items-center justify-content-between">
                                  <div
                                    class="assignment-tag mr-2 text-nowrap"
                                    :class="
                                      detail.priority == '1'
                                        ? 'red'
                                        : detail.priority == '2'
                                        ? 'yellow'
                                        : detail.priority == '3'
                                        ? 'green'
                                        : detail.priority == '4'
                                        ? 'orange'
                                        : ''
                                    "
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
                                  <div
                                    v-if="detail.subject"
                                    class="assignment-tag bg-primary text-truncate"
                                  >
                                    {{ detail.subject }}
                                  </div>
                                </div>
                                  <div class="d-flex  p-0">
                                    <!-- Code commented for future use -->
                                <!-- <button
                                    v-if="detail.createdBy"
                                    @click="onCardClick(detail)"
                                    class="ml-3 text-12"
                                  >
                                    <i class="fas fa-pen color-black"></i>
                                  </button>
                                  <button
                                  v-if="detail.createdBy"
                                    class="ml-3 text-12"
                                  >
                                    <i class="fas fa-trash color-black"></i>
                                  </button> -->
                                <div v-if="isSchoolAdmin != '1'">
                                  <button data-bs-toggle="tooltip" data-bs-placement="right" :title="`This bell icon is to send a reminder email to the student,
${detail.emailCounter === null ? 0 : detail.emailCounter} reminder emails sent so far`"
                                    class="ml-3 text-12"
                                    @click="emailTrigger(detail.id,detail.user_id
                                    )"
                                  >
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      id="Notification"
                                      class="svgShape"
                                    >
                                      <path
                                        d="M22.086 14.672A3.685 3.685 0 0 1 21 12.05V9A9 9 0 0 0 3 9v3.05a3.685
                                        3.685 0 0 1-1.086 2.622A3.121 3.121 0 0 0 4.121 20H7.1a5 5 0 0 0 9.8
                                        0h2.98a3.121 3.121 0 0 0 2.207-5.328ZM12 22a3 3 0 0 1-2.816-2h5.632A3 3 0 0 1
                                        12 22Zm7.879-4H4.121a1.121 1.121 0 0 1-.793-1.914A5.672 5.672 0 0 0 5
                                        12.05V9a7 7 0 0 1 14 0v3.05a5.672 5.672 0 0 0 1.672 4.036A1.121 1.121 0 0 1
                                        19.879 18Z"
                                        fill="#000000"
                                      ></path>
                                    </svg>
                                  </button>
                                </div>
                                </div>
                                </div>
                                <div class="text-center my-3">
                                  <h4 class="color-dark font-semi-bold mb-1">
                                    {{ detail.task }}
                                  </h4>
                                  <div class="text-center px-3">
                                    <p
                                      class="color-gray mb-0 text-16 line-height-1 font-semi-bold"
                                    >
                                      {{ detail.subject }}
                                    </p>
                                  </div>
                                </div>
                                <div
                                  v-if="
                                    detail.subTasks &&
                                    detail.subTasks.length > 0
                                  "
                                  class="mb-3"
                                >
                                  <h6 class="color-primary-dark font-semi-bold">
                                    Sub-tasks
                                  </h6>
                                  <div class="to-do-list">
                                    <div
                                      v-for="subtask in detail.subTasks"
                                      :key="subtask.id"
                                    >
                                      <div
                                        class="pl-2 d-flex align-items-center mb-1"
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
                                          class="mr-2 color-gray"
                                          :disabled="subtask.task_status !== 'Completed'"
                                        />
                                        <label
                                          for=""
                                          class="mb-0 text-12 color-gray"
                                          >{{ subtask.title }}</label
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="">
                                <h6 class="mb-1 color-primary-dark font-semi-bold">
                                  Additional Material
                                </h6>
                                <div
                                  class="d-flex align-items-center justify-content-between"
                                >
                                  <div
                                    v-if="
                                      detail.assignment_materials &&
                                      detail.assignment_materials.length > 0
                                    "
                                    class="col-8 py-0 pl-0 material-link text-12"
                                  >
                                    <div
                                      class="d-flex w-100"
                                      v-for="(
                                        material, index
                                      ) in detail.assignment_materials"
                                      :key="material.id"
                                    >
                                      <span
                                        v-if="index < 2"
                                        class="color-gray text-truncate w-100"
                                      >
                                        {{
                                          material.file_type == "link"
                                            ? material.material
                                            : material.file_name
                                        }}
                                      </span>
                                    </div>
                                    <span
                                      class="color-gray text-12"
                                      v-if="
                                        detail.assignment_materials &&
                                        detail.assignment_materials.length &&
                                        detail.assignment_materials.length > 2
                                      "
                                      >+{{
                                        detail.assignment_materials.length - 2
                                      }}
                                      more</span
                                    >
                                  </div>

                                  <div
                                    v-if="
                                      !detail.assignment_materials ||
                                      detail.assignment_materials.length <= 0
                                    "
                                    class="col-8 py-0 pl-0 material-link text-12"
                                  >
                                    <span class="color-gray text-12"
                                      >No documents added!</span
                                    >
                                  </div>
                                  <div
                                    class="col-4 material-date py-0 text-right pr-0"
                                  >
                                    <span class="text-12 color-gray">{{
                                      detail.due_date
                                    }}</span>
                                  </div>
                                </div>
                              </div>
                              <!-- Code commented for future use -->
                              <!-- <div
                                class="position-absolute w-100 h-100 d-flex align-items-start justify-content-end success-image"
                              > -->
                                <span
                                  v-if="detail.task_status == 'Completed'"
                                  class="color-primary-dark text-30 check position-absolute"
                                  ><i class="fas fa-check-circle"></i
                                ></span>
                              <!-- </div> -->
                            </div>
                          </div>
                          <div
                          class="row text-center w-100 h-100 justify-content-center"
                        >
                          <div
                            v-if="
                              !overdueAssignments ||
                              overdueAssignments.length <= 0
                            "
                            class="empty-shedule d-flex justify-content-center align-items-center h-100"
                          >
                            <p>No overdue assignments</p>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- analytics -->
                  <div v-if="showStudentAnalytics" class="h-100 p-4 pt-5">
                    <!-- <h3 class="color-primary-dark heading3 font-semi-bold">Analytics</h3> -->
                    <UserAdvisorStudyAnalytics
                      :studentId="studentDetail.id"
                    ></UserAdvisorStudyAnalytics>
                  </div>
                  <!-- end analytics -->
                </div>
                <div
                  v-else
                  class="card card-primary-void rounded-22 p-4 h-100 position-realtive align-items-center justify-content-center"
                >
                  <h6 v-if="!displaytext" class="color-gray">
                    Select a student to show details
                  </h6>
                  <!-- <div class="position-absolute advisor-image col-3">
                    <img src="../../static/image/advisor-image.png" alt="" />
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Modal -->
      <div
        class="modal fade"
        id="inviteStudentModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="inviteStudentModalCenterTitle"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered add-assmt"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="inviteStudentModalLongTitle">
                Choose Student
              </h3>
            </div>
            <h4 class="modal-body">Your students will only appear once they've logged in to Jochi!</h4>
            <div class="modal-body no-overflow px-4">
              <div class="form-row">
                <multiselect
                  v-model="selectedStudent"
                  :options="studentsList"
                  track-by="first_name"
                  label="first_name"
                  placeholder="Select students"
                >
                  <span slot="noResult">No data found</span>
                </multiselect>
              </div>
            </div>
            <div class="modal-footer justify-content-end border-top-0">
              <button
                type="button"
                class="btn btn-void font-semi-bold rounded-8 py-1 px-4"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary color-black rounded-8 font-semi-bold py-1 px-4"
                @click="inviteStudentAdv"
                :disabled="submitted"
              >
                <!-- data-dismiss="modal" -->
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Add Assignment Modal -->
      <div class="modal fade" id="editAssignment" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle"
aria-hidden="true">
<div class="modal-dialog modal-dialog-centered add-assmt" role="document">
  <div class="modal-content">
    <div class="modal-header pb-1">
      <h3 class="modal-title" id="editAssignmentModalLongTitle">
        {{ isAddAssignment ? "Add" : "Edit" }} Assignment
      </h3>
      <!-- grades section -->
      <div class="d-flex align-items-center mb-2 ml-auto" v-if="submissionId && grade && gradePossible">
        <p class="mb-0">Grade</p><span class="px-1">:</span>
        <p class="mb-0 bg-primary-light01 px-2 rounded-pill font-semi-bold color-primary"><span>{{
          grade
        }}</span>/<span>{{ gradePossible }}</span></p>
        <!-- <span v-if="gradePossible"
                              >Grade Possible</span
                            >: -->
      </div>
      <!-- grades section end -->
    </div>
    <div class="modal-body px-3">
      <form v-if="!isSharedAssignment" ref="assignmentForm" id="assignmentForm">
        <div class="form-group mb-2">
          <label for="recipient-name" class="col-form-label py-1">Subject<em>*</em></label>
          <input v-if="schoologyAssignment == '1'" type="text" class="form-control" v-model="gg4lSubject"
            maxlength="100" placeholder="Enter assignment name" />
          <!-- <select v-else class="form-control" tabindex="" v-model="subject" :class="{
            'is-invalid':
              submitted && $v.subject.$error,
          }">
            <option value="">Select subject</option>
            <option v-bind:value="{
              id: subjects.id,
              text: subjects.subject_name,
            }" v-for="(subjects, index) in subjectsData" :key="index">
              {{ subjects.subject_name }}
            </option>
            <option v-if="subjectsData.length == 0">
              No data
            </option>
          </select>
          <div v-if="submitted && $v.subject.$error" class="invalid-feedback">
            <span v-if="!$v.subject.required">This field is required</span>
          </div> -->
          <div v-else
            class="dropdown"
          >
            <div
              class="dropdown-select d-inline-flex form-control rounded-8 border border--form color-secondary font-normal text-16 pr-2"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              :class="{
              'is-invalid':
              submitted && $v.subject.$error,
          }"
            >
              <span id="dLabel" class="mr-auto color-secondary text-truncate">
                {{ subject ? subject.text : 'Select Subject' }}</span
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
              <div v-if="submitted && $v.subject.$error" class="invalid-feedback">
              <span v-if="!$v.subject.required">This field is required</span>
          </div>
            </ul>
          </div>
        </div>
        <div class="form-group mb-2">
          <label for="assignment-name" class="col-form-label py-1">Assignment<em>*</em></label>
          <input type="text" class="form-control" v-model="assignmentName" placeholder="Enter assignment name"
            :class="{
              'is-invalid':
                submitted && $v.assignmentName.$error,
            }" />
          <div v-if="submitted && $v.assignmentName.$error" class="invalid-feedback">
            <span v-if="!$v.assignmentName.required">This field is required</span>
          </div>
        </div>
        <div class="form-group mb-2">
          <label for="message-text" class="col-form-label py-1">Description</label>
          <textarea class="form-control" id="message-text" rows="3" v-model="assignmentDescription"
            maxlength="500" placeholder="Enter assignment description"></textarea>
        </div>
        <div class="row">
          <div class="col-md-6 ml-auto py-0">
            <div class="form-group mb-2 mb-0">
              <label for="recipient-name" class="col-form-label py-1">Priority<em>*</em></label>
              <div class="dropdown input-icon-area">
                <button id="dLabel" class="dropdown-select form-control text-left" type="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span class="">
                    {{
                      priorityVal
                      ? priorityVal
                      : "Select priority"
                    }}</span>
                </button>
                <ul class="dropdown-menu border" aria-labelledby="dLabel">
                  <li @click="priorityVal = 'Can Wait'" class="item low-color">
                    <span>Can Wait</span>
                  </li>
                  <li @click="priorityVal = 'Important'" class="item medium-color">
                    <span>Important</span>
                  </li>
                  <li @click="priorityVal = 'Urgent'" class="item high-color">
                    <span>Urgent</span>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="submitted &&
              priorityVal != 'Urgent' &&
              priorityVal != 'Important' &&
              priorityVal != 'Can Wait'
              " class="invalid-feedback" style="display: block">
              <span v-if="priorityVal != 'Urgent' &&
                priorityVal != 'Important' &&
                priorityVal != 'Can Wait'
                ">This field is required</span>
            </div>
          </div>
          <div class="col-md-6 ml-auto py-0">
            <div class="form-group mb-2">
              <label for="recipient-name" class="col-form-label py-1">Date<em>*</em></label>
              <date-picker class="form-control dropdown-menu-top" placeholder="MM/DD/YYYY" format="MM/dd/yyyy"
                v-model="dateValue" :class="{
                  'is-invalid':
                    submitted && $v.dateValue.$error,
                }" :disabled-dates="disabledDates" />
              <div v-if="submitted && $v.dateValue.$error" class="invalid-feedback">
                <span v-if="!$v.dateValue.required">This field is required</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-0">
          <div class="col-6">
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Time<em>*</em></label>
              <div>
                <vue-timepicker @change="checkValidTime" close-on-complete format="hh:mm A" v-model="timeValue"
                  name="timeValue" class="show-cursor dropdown-menu-top" :value="timeValue" :class="{
                    'is-invalid':
                      submitted &&
                      ($v.timeValue.$error ||
                        !validTime),
                  }"></vue-timepicker>
                <div v-if="submitted &&
                  ($v.timeValue.$error || !validTime)
                  " class="invalid-feedback">
                  <span v-if="!$v.timeValue.required ||
                    !validTime
                    ">Not a valid time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-2">
                  <h6 class="color-dark font-semi-bold mb-0">
                    Subtasks
                  </h6>
                  <a @click="onAddSubTaskClick" class="btn p-0">
                    <span class="color-secondary"><i class="fas fa-plus-circle"></i></span>
                  </a>
                </div>
                <div v-if="addSubTask" class="d-flex flex-row align-items-start">
                  <div class="form-row mb-2 mx-0 mr-2 w-100">
                    <label class="form-label" for="name">Add a subtask</label>
                    <input type="text" maxlength="100" v-model="subTaskName" class="form-control" />
                  </div>
                  <div class="pt-4">
                    <button class="btn btn-primary btn-sm mt-1" @click="onAddNewSubTask">
                      Add
                    </button>
                  </div>
                </div>
                <!-- <div
                            class="d-flex flex-row align-items-start"
                          >
                            <div class="form-row mb-2 mx-0 mr-2 w-100">
                              <label class="form-label" for="name"
                                >Add a sub-task</label
                              >
                              <input
                                type="text"
                                maxlength="100"
                                class="form-control"
                              />
                            </div>
                            <div class="pt-4">
                              <button
                                class="btn btn-primary btn-sm mt-2"
                              >
                                Add
                              </button>
                            </div>
                          </div> -->

                <div class="custom-overflow pr-2 mr--2 d-flex flex-column">
                  <div v-if="isAddAssignment === false">
                    <div v-for="subTask in subTasksList" :key="subTask.id">
                      <div class="card card-transparent show-icon p-1 mb-1">
                        <div class="d-flex align-items-center justify-content-between">
                          <div class="p-1 form-group checkbox">
                            <!-- @click="confirmSubTaskComplete($event, subTask.id, subTask.task_status,subTask)" -->
                            <input :id="subTask.id" class="mr-2 cursor-pointer" type="checkbox"
                              v-model="subTask.isTaskCompleted" @change="updateTaskIds(subTask.id)" />
                            <label :for="subTask.id">{{ subTask.title }}</label>
                          </div>
                          <span v-if="subTask.task_status != 'Completed'
                            " @click="deleteSubTask(subTask)"
                            class="color-primary-dark fa-icon show-hover d-none btn p-0"><i
                              class="fas fa-trash-alt"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div v-for="subTask in subTasksList" :key="subTask.id">
                      <div class="card card-transparent show-icon p-1 mb-1">
                        <div class="d-flex align-items-center justify-content-between">
                          <!-- <p
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
                                        </p> -->
                          <div class="p-1 form-group checkbox">
                            <!-- @click="confirmSubTaskComplete($event, subTask.id, subTask.task_status,subTask)" -->
                            <input :id="subTask.id" class="mr-2 cursor-pointer" type="checkbox" />
                            <label :for="subTask.id">{{ subTask.title }}</label>
                          </div>
                          <span v-if="subTask.task_status != 'Completed'
                            " @click="deleteSubTask(subTask)"
                            class="color-primary-dark fa-icon show-hover d-none btn p-0"><i
                              class="fas fa-trash-alt"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

        <!-- Additional Material Add -->
        <div class="d-flex justify-content-between align-items-center mb-2">
                  <h6 class="color-dark font-semi-bold mb-0">
                    Additional Material
                  </h6>
                  <a @click="onAdditionalMatClick" class="btn p-0">
                    <span class="color-secondary"><i class="fas fa-plus-circle"></i></span>
                  </a>
                </div>
                <div v-if="additionalMaterial" class="d-flex flex-row align-items-start">
                  <div class="form-row mb-2 mx-0 mr-2 w-100">
                    <label class="form-label" for="name">Add Additional Material</label>
                    <!-- <input type="text" class="form-control" /> -->
                    <select v-model="materialType" class="form-select form-control mb-2"
                      aria-label="Default select example">
                      <option value="">
                        Choose material type
                      </option>
                      <option value="file">File</option>
                      <option value="link">Link</option>
                    </select>
                    <div class="row m-0">
                      <div class="col-12 py-0">
                        <input v-if="materialType == 'file'" type="file" class="form-control px-2"
                          placeholder="Upload File" @change="onFileChange" id="fileUpload"
                          accept=".png,.jpeg,.jpg,.pdf" />
                      </div>
                      <div class="col-12 py-0">
                        <input v-if="materialType == 'link'" type="text" class="form-control px-2"
                          placeholder="Paste Link" v-model="link" />
                      </div>
                      <div class="col-3 p-0"></div>
                    </div>
                  </div>
                  <div class="pt-4">
                    <button type="button" @click="UploadAttachment" class="btn btn-primary btn-sm mt-1">
                      Add
                    </button>
                  </div>
                </div>
                <div class="hidden-scroll px-3 row my-0">
                  <div v-for="item of additionalMaterialList" :key="item.id" class="h-fit-content cursor-pointer w-100">
                    <div v-if="item.link"
                      class="d-flex align-items-center justify-content-between my-2 mr-3 min-w-200 w-100 show-icon">
                      <div class="ld-details-section w-100">
                        <p @click="openLink(item)" class="ld-heading mb-1 text-link text-truncate">
                          <!-- {{ peer.first_name }} -->
                          {{ item.link }}
                        </p>
                      </div>
                      <span class="color-primary-dark fa-icon show-hover d-none btn p-0"
                        @click="deleteAdditionalMat(item)"><i class="fas fa-trash-alt"></i></span>
                    </div>
                    <div v-else
                      class="d-flex align-items-center justify-content-between my-2 mr-3 min-w-200 w-100 show-icon">
                      <div class="ld-details-section w-100">
                        <p @click="openLink(item)" class="ld-heading mb-1 text-link text-truncate">
                          <!-- {{ peer.first_name }} -->
                          {{
                            item.file_type &&
                            item.file_type != "link"
                            ? item.file_name
                            : item.material
                          }}
                        </p>
                      </div>
                      <span class="color-primary-dark fa-icon show-hover d-none btn p-0"
                        @click="deleteAdditionalMat(item)"><i class="fas fa-trash-alt"></i></span>
                    </div>
                  </div>
                </div>
      </form>
    </div>
    <div class="modal-footer justify-content-end border-top-0">
      <button v-if="!isAddAssignment && schoologyAssignment == '1'
        " type="button" class="btn btn-primary py-1 px-3 mr-auto" :disabled="processing || submissionId"
        @click="submitAssignment()">
        Submit Assignment
      </button>
      <button type="button" class="btn btn-secondary py-1 px-3 mr-2" @click="
        openAssignment = false;
      closePopup();
      ">
        Close
      </button>
      <button type="button" class="btn btn-primary py-1 px-3" :disabled="processing" @click="
        isAddAssignment
          ? AddAssignment()
          : UpdateAssignment()
        ">
        <v-progress-circular
        v-if="spinnerLoader"
        :size="20"
        color="primary"
        indeterminate
      ></v-progress-circular>
        <!-- <span v-if="spinnerLoader" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> -->
        {{ isAddAssignment ? "Add" : "Update" }}
      </button>
    </div>
  </div>
</div>
</div>
<!-- Add Assignment Modal End-->

      <!-- meeing detil pop up -->

      <!-- End teacher Page -->
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import UserAdvisorStudyAnalytics from "./UserAdvisorStudyAnalytics.vue";
import { required, } from "vuelidate/lib/validators";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import "vue2-timepicker/dist/VueTimepicker.css";
import moment from "moment";
var fromDate = "";
export default {
  name: "UserTeacherAdvisor",
  components: {
    lottie,
    UserAdvisorStudyAnalytics,
    VueTimepicker,
  },
  data() {
    return {
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      showStudentAnalytics: false,
      showStudentProfile: false,
      selectedStudent: "",
      submitted: false,
      studentDetail: {},
      pendingAssignments: [],
      overdueAssts: [],
      showAssignments: true,
      showOverdueAssingments: false,
      isSchoolAdmin: "0",
      isAddAssignment: true,
      grade: "",
      gradePossible: "",
      isSharedAssignment: false,
      schoologyAssignment: "",
      gg4lSubject: "",
      assignmentName: "",
      assignmentDescription: "",
      priorityVal: "",
      dateValue: "",
      submitted: false,
      timeValue: "",
      subTaskName: "",
      subTasksList: [],
      materialType: "",
      additionalMaterial: false,
      additionalMaterialList: [],
      processing: false,
      submissionId: "",
      addSubTask: false,
      subject: "",
      processingUpload: false,
      link: "",
      file: "",
      createdBy: '',
      task_ids: [],
      spinnerLoader: false,
      date_today: new Date(),
      emailCount: '',
      displaytext: false,
      disabledDates: {
        to: new Date(),
      },
    };
  },
 async mounted() {
    const studentId = this.$route.query.id;
    if(studentId){
      this.displaytext = true;
    await this.getStudentList();
    const student = this.studentsListAdvisor.find(student => student.id == studentId);
    this.onStudentClick(student);
    }
    this.isSchoolAdmin = localStorage.getItem("schoolAdmin");
    this.getStudentList();
    this.checkValidTime();
    this.disabledDates.to = new Date(
      this.date_today.getFullYear(),
      this.date_today.getMonth(),
      this.date_today.getDate()
    );
  },

  computed: {
    ...mapState("teacherAdvisor", {
      studentsList: (state) => state.studentsList,
      studentsListAdvisor: (state) => state.studentsListAdvisor,
      successMessage: (state) => state.successMessage,
      successType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      assignmentList: (state) => state.assignmentList,
      sharedAssignmentsList: (state) => state.sharedAssignmentsList,
      overdueAssignments: (state) => state.overdueAssignments,
      sharedOverdueAssignments: (state) => state.sharedOverdueAssignments,
      errorMessageQuote: (state) => state.errorMessage,
      subjectsData: (state) => state.subjectsData,
      emailCountList: (state) => state.emailCountList,
    }),
    ...mapState("quotedMessage", {
      newAdditionalMaterial: (state) => state.newAdditionalMaterial,
      errorMessageQuote: (state) => state.errorMessage,
      errorTypeQuote: (state) => state.errorType,
    }),

  },
  validations: {
    subject: { required },
    dateValue: { required },
    timeValue: { required },
    assignmentName: { required },
    // assignmentDescription: { required },
  },
  methods: {
    ...mapActions("teacherAdvisor", {
      inviteStudent: "inviteStudent",
      getStudents: "getStudents",
      getStudentsList: "getStudentsList",
      getAssignmentsList: "getAssignmentsList",
      getSubjectsList: "getSubjectsList",
      addAssignment: "addAssignment",
      emailReminder: "emailReminder"
    }),
    ...mapActions("quotedMessage", {
      uploadAdditionalMaterial: "uploadAdditionalMaterial",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async emailTrigger(detailId,userId){
      this.loading = true;
      const payload = {
        detailId: detailId,
        userId: userId,
      };
     await this.emailReminder(payload);
    if (this.successMessage != "") {
      this.overdueAssts = [];
      await this.getAssignments();
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 4000,
        });
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.loading = false;
    },
    async getStudentList() {
      await this.getStudents();
    },
    async getAllStudentsList() {
      await this.getStudentsList({
        school_id: localStorage.getItem("school_id"),
        studentId: localStorage.getItem("id"),
      });
    },
    openModal() {
      this.selectedStudent = [];
      $("#inviteStudentModal").modal("show");
      this.getAllStudentsList();
    },
    async inviteStudentAdv() {
      this.submitted = true;
      if (this.selectedStudent.id) {
        await this.inviteStudent({ id: this.selectedStudent.id });
        if (this.errorMessage != "") {
          this.$toast.open({
            message: this.errorMessage,
            type: this.errorType,
            duration: 5000,
          });
        } else if (this.successMessage != "") {
          $("#inviteStudentModal").modal("hide");
          $(".modal").modal("hide");
          $(".modal-backdrop").remove();
          this.$toast.open({
            message: this.successMessage,
            type: this.successType,
            duration: 5000,
          });
          this.getStudentsList();
        }
        this.selectedStudent = "";
      } else {
        this.submitted = false;

        return this.$toast.open({
          message: "Please select student before proceeding",
          type: "warning",
          duration: 5000,
        });
      }
      this.submitted = false;
    },
    onStudentClick(student) {
      this.showStudentProfile = true;
      this.showStudentAnalytics = false;
      this.studentDetail = student;
      this.showOverdueAssingments = false;
      this.showAssignments = true;
      this.pendingAssignments = [];
      this.overdueAssts = [];
      this.getAssignments();
    },
    onTabClick(tab) {
      if (tab == 1) {
        this.showStudentProfile = true;
        this.showStudentAnalytics = false;
      } else if (tab == 2) {
        this.showStudentProfile = false;
        this.showStudentAnalytics = true;
      }
    },
    async getAssignments() {
      this.loading = true;
      await this.getAssignmentsList({ id: this.studentDetail.id });
      await this.getSubjectsList({ id: this.studentDetail.id });
      this.mapAssignments();
      this.mapSharedAssignments();
      this.mapOverdueAssignments();
      this.mapOverdueSharedAssignments();
      this.loading = false;
    },
    mapAssignments() {
      if (this.assignmentList && this.assignmentList.length > 0) {
        this.assignmentList.forEach((e) => {
          this.mapSingleAsst(e);
        });
      }
    },
    mapSingleAsst(e) {
      let item = {};
      item.assignment_description = e.assignment_description;
      item.assignment_materials = e.assignment_materials;
      item.completed_date = e.completed_date;
      item.dueTimeFormat = e.dueTimeFormat;
      item.due_date = moment(e.due_date).format("MM/DD/YYYY");
      item.due_time = e.due_time;
      item.id = e.id;
      item.priority = e.priority;
      item.schoologyAssignment = e.schoologyAssignment;
      item.schoologyAssignmentId = e.schoologyAssignmentId;
      item.subTasks = e.subTasks;
      item.subject = e.subject;
      item.createdBy = e.createdBy
      item.createdByName = e.createdByName
      item.subjects = e.subjects;
      item.task = e.task;
      item.task_status = e.task_status;
      item.updatedAt = e.updatedAt;
      item.user_id = e.user_id;
      item.peers = this.mapPeers(e);
      item.formattedDate = moment(e.due_date).format("MMMM Do, YYYY");
      item.isShared = false;
      this.pendingAssignments.push(item);
    },
    mapSharedAssignments() {
      if (this.sharedAssignmentsList && this.sharedAssignmentsList.length > 0) {
        this.sharedAssignmentsList.forEach((e) => {
          this.mapSingleSharedAsst(e);
        });
      }
    },
    mapSingleSharedAsst(e) {
      let item = {};
      if (e.assignments) {
        item.assignment_description = e.assignments.assignment_description;
        item.assignment_materials = e.assignments.assignment_materials;
        item.completed_date = e.assignments.completed_date;
        item.dueTimeFormat = e.assignments.dueTimeFormat;
        item.due_date = moment(e.assignments.due_date).format("MM/DD/YYYY");
        item.due_time = e.assignments.due_time;
        item.id = e.assignments.id;
        item.priority = e.assignments.priority;
        item.schoologyAssignment = e.assignments.schoologyAssignment;
        item.schoologyAssignmentId = e.assignments.schoologyAssignmentId;
        item.subTasks = e.assignments?.subTasks;
        item.subject = e.assignments?.subjects?.subject_name;
        item.subjects = e.subjects;
        item.createdBy = e.createdBy
        item.createdByName = e.createdByName
        item.task = e.assignments.task;
        item.task_status = e.assignments.task_status;
        item.updatedAt = e.assignments.updatedAt;
        item.user_id = e.assignments.user_id;
        item.peers = this.mapPeers(e);
        item.formattedDate = moment(e.due_date).format("MMMM Do, YYYY");
        item.isShared = true;
        this.pendingAssignments.push(item);
      }
    },
    mapOverdueAssignments() {
      if (this.overdueAssignments && this.overdueAssignments.length > 0) {
        this.overdueAssignments.forEach((e) => {
          if (e.task_status != "Completed") {
            let item = {};
            item.assignment_description = e.assignment_description;
            item.assignment_materials = e.assignment_materials;
            item.completed_date = e.completed_date;
            item.dueTimeFormat = e.dueTimeFormat;
            item.due_date = moment(e.due_date).format("MM/DD/YYYY");
            item.due_time = e.due_time;
            item.id = e.id;
            item.priority = e.priority;
            item.schoologyAssignment = e.schoologyAssignment;
            item.schoologyAssignmentId = e.schoologyAssignmentId;
            item.subTasks = e.subTasks;
            item.emailCounter = e.emailCounter;
            item.subject = e.subject;
            item.subjects = e.subjects;
            item.createdBy = e.createdBy
            item.createdByName = e.createdByName
            item.task = e.task;
            item.task_status = e.task_status;
            item.updatedAt = e.updatedAt;
            item.user_id = e.user_id;
            item.peers = this.mapPeers(e);
            item.formattedDate = moment(e.due_date).format("MMMM Do, YYYY");
            item.isShared = false;
            this.overdueAssts.push(item);
          } else {
            this.mapSingleAsst(e);
          }
        });
      }
    },
    mapOverdueSharedAssignments() {
      if (
        this.sharedOverdueAssignments &&
        this.sharedOverdueAssignments.length > 0
      ) {
        this.sharedOverdueAssignments.forEach((e) => {
          if (e.assignments && e.assignments.task_status != "Completed") {
            let item = {};
            item.assignment_description = e.assignments.assignment_description;
            item.assignment_materials = e.assignments.assignment_materials;
            item.completed_date = e.assignments.completed_date;
            item.dueTimeFormat = e.assignments.dueTimeFormat;
            item.due_date = moment(e.assignments.due_date).format("MM/DD/YYYY");
            item.due_time = e.assignments.due_time;
            item.id = e.assignments.id;
            item.priority = e.assignments.priority;
            item.schoologyAssignment = e.assignments.schoologyAssignment;
            item.schoologyAssignmentId = e.assignments.schoologyAssignmentId;
            item.subTasks = e.assignments?.subTasks;
            item.subject = e.assignments?.subjects?.subject_name;
            item.subjects = e.subjects;
            item.task = e.assignments.task;
            item.createdBy = e.createdBy
            item.createdByName = e.createdByName
            item.task_status = e.assignments.task_status;
            item.updatedAt = e.assignments.updatedAt;
            item.user_id = e.assignments.user_id;
            item.peers = this.mapPeers(e);
            item.formattedDate = moment(e.due_date).format("MMMM Do, YYYY");
            item.isShared = true;
            item.emailCounter = e.assignments.emailCounter;
            this.overdueAssts.push(item);
          } else if (e.assignments.task_status == "Completed") {
            this.mapSingleSharedAsst(e);
          }
        });
      }
    },
    mapPeers(e) {
      let user_id = localStorage.getItem("id");
      let peers = [];
      if (e.assignment_shared_users && e.assignment_shared_users.length > 0) {
        e.assignment_shared_users.forEach((item) => {
          let peer = {};
          if (item.users && item.shared_users_id != user_id) {
            peer = item.users;
            peer.id = item.shared_users_id;
            peers.push(peer);
          }
        });
      }
      if (e.assignments?.users) {
        let user = {};
        user = e.assignments?.users;
        user.id = e.user_id;
        peers.push(user);
      }
      return peers;
    },
    onTabClickAssignment(tab) {
      if (tab == 1) {
        this.showOverdueAssingments = false;
        this.showAssignments = true;
      } else if (tab == 2) {
        this.showOverdueAssingments = true;
        this.showAssignments = false;
      }
    },
    EditAssignmentModal(){
      this.openAssignment = true;
      $('#editAssignment').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    checkValidTime() {
      if (this.timeValue) {
        let tempTime =
          typeof this.timeValue == "object"
            ? (this.timeValue.hh +
            ":" +
            this.timeValue.mm +
            " " +
            (this.timeValue.A??this.timeValue.a))
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
      console.log(this.timeValue);
    },
    onAddSubTaskClick() {
      this.addSubTask = true;
    },
    onAdditionalMatClick() {
      this.additionalMaterial = true;
    },
    closePopup() {
      this.deletedSubTasksArray = [];
      this.openAssignment = false;
      $('#editAssignment').modal('hide');
      this.resetAssignment();
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
      this.submissionId = "";
      this.schoologyAssignment = "";
      this.grade = "";
      this.gradePossible = "";
      this.invalidSubmitUrl = false;
      this.submittedAsst = false;
      this.disableSubmit = false;
      this.invalidSubmitText = false;
      this.additionalMaterial = false;
      this.assignmentId = '';
      // $('input[name="daterange"]').val("");
      fromDate = "";
      // $(".dropdown-select").text("Select priority");
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
      // this.timeValue = {
      //   HH: '11',
      //   mm: '59',
      //   A: 'PM'
      // };
      let clearTimeBtn = document.getElementsByClassName("clear-btn")[0];
      clearTimeBtn?.click();
      this.typeOfAssignment = '';
    },
    async AddAssignment() {
      this.submitted = true;
      this.$v.$touch();
      if (!this.priorityVal || this.$v.$invalid || !this.validTime) {
        return;
      }
      this.processing = true;
      const df = moment(this.dateValue).format("YYYY-MM-DD");
      this.spinnerLoader = true;
      this.loading = true;

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
        school_id: localStorage.getItem("school_id"),
        user_id: this.studentDetail.id,
        task: this.assignmentName,
        assignment_description: this.assignmentDescription,
        // subject: this.subject?.id,
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
        assignment_materials: assignment_materials,
        subTasks: subTaskLists,
      });
      this.spinnerLoader = false;
      this.loading = false;

      if (this.successMessage != "") {
        this.pendingAssignments = [];
        this.overdueAssts = [];
        await this.getAssignments();
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
    },
    onAddNewSubTask() {
      if (this.subTaskName && this.subTaskName.trim() !== "") {
        let sub = {};
        sub.title = this.subTaskName;
        this.subTasksList.push(sub);
      } else {
        this.$toast.open({
          message: "Please Add a Valid Subtask ",
          type: "warning",
          duration: 5000,
        });
      }
      this.subTaskName = "";
      this.addSubTask = false;
    },
    updateTaskIds(subTaskId) {
      // Check if the subTaskId is in the task_ids array
      const index = this.task_ids.indexOf(subTaskId);
      if (index === -1) {
        // If not in the array, add it
        this.task_ids.push(subTaskId);
      } else {
        // If already in the array, remove it
        this.task_ids.splice(index, 1);
      }
    },
    deleteSubTask(subTask) {
      if (this.assignmentId) {
        // deleted_subTask
        this.deletedSubTasksArray.push(subTask.id);
      }
      this.subTasksList = this.subTasksList.filter((e) => e != subTask);
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
          message: "Please Choose File Type",
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
            message: "Please Add Valid File",
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
    deleteAdditionalMat(item) {
      this.additionalMaterialList;
      const index = this.additionalMaterialList.indexOf(item);
      if (index > -1) {
        this.additionalMaterialList.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
    isValidHttpUrl(urlLink, showError = true) {
      let url;

      try {
        url = new URL(urlLink);
      } catch (_) {
        if (showError) {
          this.$toast.open({
            message: "Please Add Valid URL",
            type: "warning",
            duration: 5000,
          });
        }
        return false;
      }

      let valid = url.protocol === "http:" || url.protocol === "https:";
      if (!valid) {
        this.$toast.open({
          message: "Please Add Valid URL",
          type: "warning",
          duration: 5000,
        });
      }

      return valid;
    },
    selectSubject(selectedSubject) {
      this.subject = {
      id: selectedSubject.id,
      text: selectedSubject.subject_name
    };
  },
  onCardClick(detail){
      this.resetAssignment();
      this.deletedSubTasksArray = [];
      this.isAddAssignment = false;
      this.openAssignment = true;
      this.EditAssignmentModal();
      this.mapAssignmentDetail(detail);
      // this.mapPeerInvited(data);
      // this.typeOfAssignment = type;
  },
  mapAssignmentDetail(data) {

      const parser = new DOMParser();
      const doc = parser.parseFromString(data.assignment_description, 'text/html');
      const textContent = doc.body.textContent;

      this.isSharedAssignment = data.isShared;
      this.schoologyAssignment = data.schoologyAssignment;
      this.createdBy = data.createdBy;
      this.createdByName = data.createdByName;
      this.assignmentId = data.id;
      this.assignmentName = data.task;
      this.assignmentDescription = textContent;
      this.submissionId = data.submission_id;
      this.grade = data.grade;
      this.gradePossible = data.grade_possible;
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
          item.isTaskCompleted = item.task_status !== 'Completed' ? false : true;
          this.subTasksList.push(item);
        });
      }
      this.peerList = data.peers;
      this.additionalMaterialList = data.assignment_materials
        ? data.assignment_materials
        : [];
    },
    async UpdateAssignment() {
      if (this.priorityVal == "Overdue" && !this.isSharedAssignment) {
        this.$toast.open({
          message: "Please Select the Priority",
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
      this.spinnerLoader = true;
      this.loading = true;
      const dfE = moment(this.dateValue).format("YYYY-MM-DD");

      // const peersSelected = [];
      // if (this.peerList.length > 0) {
      //   this.peerList.forEach((e) => {
      //     peersSelected.push(e.id);
      //   });
      // }

      // let removed = [];
      // this.removedPeerList.forEach((e) => {
      //   const index = this.peerList.findIndex((item) => item.id == e);
      //   if (index < 0) {
      //     removed.push(e);
      //   }
      // });

      // removed = [...new Set(removed)];

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
        school_id: localStorage.getItem("school_id"),
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
        task_ids: this.task_ids,
      });
      this.spinnerLoader = false;
      this.loading = false;
      this.removedPeerList = [];
      if (this.SuccessTypeSubTasks == true) {
        this.subtaskUpdatedData();
      }
      if (this.successMessage != "") {
        this.loadUpdatedData();
        this.deletedSubTasksArray = [];
        this.openAssignment = false;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.resetAssignment();
        this.task_ids = [];
        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      // this.GetWeeklyPlanner();
      this.submitted = false;
      this.processing = false;
    },
  },
};
</script>
<style>
.small-waving-hand {
  width: 22px;
  height: auto;
  vertical-align: middle;
  display: inline-block;
}

.no-break-text {
  white-space: nowrap; /* Prevents the text from wrapping */
  overflow: hidden; /* Ensures the overflow text is hidden */
  text-overflow: ellipsis; /* Adds an ellipsis if the text overflows */
}

.label {
  font-weight: semi-bold; /* If you want to maintain the boldness of the label */
}
.clickable {
  cursor: pointer;
}
.svgShape {
  width: 1rem;
  height: 1rem;
  fill: #000000;
}
</style>

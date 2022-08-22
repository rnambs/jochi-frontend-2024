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
          class="
            teacher-section
            jochi-components-light-bg
            p-4
            custom-margin-for-main-section custom-full-height
            d-flex
            flex-column
            custom-overflow
          "
        >
          <div class="d-flex align-items-center justify-content-between px-3">
            <h2 class="color-primary font-semi-bold m-0">Advisor</h2>
            <button class="btn btn-primary px-4" @click="openModal">
              Send Request
            </button>
          </div>
          <div
            class="
              inner-teacher
              container-fluid
              p-3
              d-flex
              flex-column flex-fill
              h-40
            "
          >
            <div class="row h-100">
              <div class="col-12 col-md-5 col-lg-4 col-xl-3">
                <div
                  class="
                    card card-primary-void
                    rounded-22
                    py-4
                    h-100
                    position-realtive
                  "
                >
                  <div class="d-flex flex-column px-4">
                    <h3 class="color-dark font-semi-bold mb-0">Students</h3>
                  </div>
                  <!-- <div class="form-row position-relative mb-3 px-2">
                            <input
                              class="form-control w-100 tab-form-control"
                              type="text"
                              placeholder="Search"
                            />
                            <span class="input-icon custom-search-icon position-absolute">
                              <i class="fa fa-search" aria-hidden="true"></i>
                            </span>
                        </div> -->
                  <!-- student list -->
                  <div class="hidden-scroll d-flex flex-column">
                    <div
                      @click="onStudentClick(student)"
                      v-for="student in studentsListAdvisor"
                      :key="student.id"
                      class="
                        d-flex
                        align-items-center
                        flex-row
                        p-3
                        student-list
                        border-bottom
                      "
                    >
                      <div class="ld-img-section mr-3">
                        <div class="ld-img-holder">
                          <img
                            v-if="student.profile_pic"
                            :src="student.profile_pic"
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="ld-details-section">
                        <p class="ld-heading mb-1">
                          {{ student.first_name + " " + student.last_name }}
                        </p>
                      </div>
                    </div>
                    <!-- <div
                      class="
                        d-flex
                        align-items-center
                        flex-row
                        p-3
                        student-list
                        border-bottom
                      "
                    >
                      <div class="ld-img-section mr-3">
                        <div class="ld-img-holder"></div>
                      </div>
                      <div class="ld-details-section">
                        <p class="ld-heading mb-1">Devon Lane</p>
                      </div>
                    </div>
                    <div
                      class="
                        d-flex
                        align-items-center
                        flex-row
                        p-3
                        student-list
                        border-bottom
                      "
                    >
                      <div class="ld-img-section mr-3">
                        <div class="ld-img-holder"></div>
                      </div>
                      <div class="ld-details-section">
                        <p class="ld-heading mb-1">Eleanor Pena</p>
                      </div>
                    </div>
                    <div
                      class="
                        d-flex
                        align-items-center
                        flex-row
                        p-3
                        student-list
                        border-bottom
                      "
                    >
                      <div class="ld-img-section mr-3">
                        <div class="ld-img-holder"></div>
                      </div>
                      <div class="ld-details-section">
                        <p class="ld-heading mb-1">Jane Cooper</p>
                      </div>
                    </div>
                    <div
                      class="
                        d-flex
                        align-items-center
                        flex-row
                        p-3
                        student-list
                        border-bottom
                        active
                      "
                    >
                      <div class="ld-img-section mr-3">
                        <div class="ld-img-holder"></div>
                      </div>
                      <div class="ld-details-section">
                        <p class="ld-heading mb-1">Kathryn Murphy</p>
                      </div>
                    </div> -->
                  </div>
                  <!-- end student list -->
                  <!-- rounded black button -->
                  <!-- <button class="btn btn-rounded position-absolute bg-dark rounded-circle p-0">
                            <i class="fas fa-plus color-white"></i>
                        </button> -->
                  <!-- end rounded black button -->
                </div>
              </div>
              <div class="col-12 col-md-7 col-lg-8 col-xl-9">
                <div
                  v-if="showStudentAnalytics || showStudentProfile"
                  class="
                    card card-primary-void
                    rounded-22
                    p-4
                    h-100
                    position-realtive
                  "
                >
                  <div v-if="showStudentProfile">
                    <div class="d-flex py-4 px-0 px-xl-4">
                      <div class="ld-img-section mr-3 mb-3">
                        <div class="ld-img-holder img-holder-lg">
                          <img
                            v-if="studentDetail.profile_pic"
                            :src="studentDetail.profile_pic"
                            alt=""
                          />
                        </div>
                      </div>
                      <div
                        class="
                          d-flex
                          flex-column flex-fill
                          justify-content-center
                        "
                      >
                        <h2 class="color-primary font-semi-bold">
                          {{
                            studentDetail.first_name +
                            " " +
                            studentDetail.last_name
                          }}
                        </h2>
                        <div>
                          <div class="row m-0">
                            <div class="col-12 col-sm-3 col-md-12 col-lg-2 p-1">
                              <p class="mb-0 color-dark text-16 font-regular">
                                <span>Email</span>
                              </p>
                            </div>
                            <div class="col-1 p-1">
                              <p
                                class="
                                  mb-0
                                  color-dark
                                  text-16
                                  font-regular
                                  text-right
                                "
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
                          <div class="row m-0">
                            <div class="col-12 col-sm-3 col-md-12 col-lg-2 p-1">
                              <p class="mb-0 color-dark text-16 font-regular">
                                <span>School</span>
                              </p>
                            </div>
                            <div class="col-1 p-1">
                              <p
                                class="
                                  mb-0
                                  color-dark
                                  text-16
                                  font-regular
                                  text-right
                                "
                              >
                                <span>: </span>
                              </p>
                            </div>
                            <div class="col-7 col-md-11 col-lg-8 p-1">
                              <p class="mb-0 color-dark text-16 font-semi-bold">
                                <!-- <span>Southside Middle School</span> -->
                                <span>{{ studentDetail.schools.name }}</span>
                              </p>
                            </div>
                          </div>
                          <!-- <div class="row m-0">
                            <div class="col-12 col-sm-3 col-md-12 col-lg-2 p-1">
                              <p class="mb-0 color-dark text-16 font-regular">
                                <span>Class</span>
                              </p>
                            </div>
                            <div class="col-1 p-1">
                              <p
                                class="
                                  mb-0
                                  color-dark
                                  text-16
                                  font-regular
                                  text-right
                                "
                              >
                                <span>: </span>
                              </p>
                            </div>
                            <div class="col-7 col-md-11 col-lg-8 p-1">
                              <p class="mb-0 color-dark text-16 font-semi-bold">
                                <span>7</span>
                              </p>
                            </div>
                          </div> -->
                        </div>
                      </div>
                    </div>
                    <div class="card card-primary-void rounded-22 p-4 h-100">
                      <h2 class="color-primary font-semi-bold">Assignment</h2>
                      <div class="row">
                        <div
                          v-for="detail in assignmentList"
                          :key="detail.id"
                          class="col-md-6 col-lg-4"
                        >
                          <!-- @click="onAssignmentSelect(detail)" -->
                          <div
                            class="
                              jochi-sub-components-light-bg
                              drag-drop
                              p-4
                              position-realtive
                              h-100
                              d-flex
                              flex-column
                              justify-content-between
                              cursor-pointer
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
                                  class="assignment-tag mr-2"
                                  :class="
                                    detail.priority == '1'
                                      ? 'red'
                                      : detail.priority == '2'
                                      ? 'orange'
                                      : detail.priority == '3'
                                      ? 'yellow'
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
                                      : ""
                                  }}
                                </div>
                                <div class="assignment-tag pink">
                                  {{ detail.subject }}
                                </div>
                              </div>
                              <div class="text-center">
                                <h4 class="color-dark font-semi-bold mb-1">
                                  {{ detail.task }}
                                </h4>
                                <div class="text-center px-3">
                                  <p
                                    class="
                                      color-secondary
                                      text-16
                                      line-height-1
                                      font-semi-bold
                                    "
                                  >
                                    {{ detail.subject }}
                                  </p>
                                </div>
                              </div>
                              <div
                                v-if="
                                  detail.subTasks && detail.subTasks.length > 0
                                "
                                class="mb-3"
                              >
                                <h6 class="color-primary">Sub-tasks</h6>
                                <div class="to-do-list">
                                  <div
                                    v-for="subtask in detail.subTasks"
                                    :key="subtask.id"
                                  >
                                    <div class="pl-2 d-flex align-items-center">
                                      <input
                                        type="radio"
                                        class="mr-2 color-secondary"
                                      />
                                      <label
                                        for=""
                                        class="mb-0 text-12 color-secondary"
                                        >{{ subtask.title }}</label
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="">
                              <h6 class="mb-1 color-primary">
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
                                  v-if="detail.assignment_materials"
                                  class="col-8 py-0 pl-0 material-link"
                                >
                                  {{ detail.assignment_materials.file_type }}:{{
                                    detail.assignment_materials.file_name
                                  }}
                                </div>

                                <div
                                  v-else
                                  class="col-8 py-0 pl-0 material-link"
                                >
                                  <span class="color-secondary"
                                    >No documents added!</span
                                  >
                                </div>
                                <div
                                  class="col-4 material-date py-0 text-right"
                                >
                                  {{ detail.due_date }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- analytics -->
                  <div v-if="showStudentAnalytics">
                    <h2 class="color-primary font-semi-bold">Analytics</h2>
                    <div>
                      <UserStudyAnalytics
                        :studentId="studentDetail.id"
                      ></UserStudyAnalytics>
                    </div>
                  </div>
                  <!-- end analytics -->

                  <div
                    class="tab-btns d-flex align-items-center position-absolute"
                  >
                    <button
                      @click="onTabClick(1)"
                      class="tab-btn mr-3"
                      id="filterPlanner"
                    >
                      profile
                    </button>
                    <button
                      @click="onTabClick(2)"
                      class="btn tab-btn"
                      id="assignmentPlanner"
                    >
                      Study Analytics
                    </button>
                  </div>
                </div>
                <div
                  v-else
                  class="
                    card card-primary-void
                    rounded-22
                    p-4
                    h-100
                    position-realtive
                  "
                >
                  Select a student to show details
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
              <h5 class="modal-title" id="inviteStudentModalLongTitle">
                Choose Student
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
              <select
                class="custom-select custom-select-sm mb-3"
                tabindex=""
                v-model="selectedStudent"
                :class="{
                  'is-invalid': submitted && !selectedStudent,
                }"
              >
                <option
                  :value="Student.id"
                  v-for="(Student, index) in studentsList"
                  :key="index"
                >
                  {{ Student.first_name }}
                </option>
                <option v-if="studentsList.length == 0">No data</option>
              </select>
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
import UserStudyAnalytics from "./UserStudyAnalytics.vue";

export default {
  name: "UserTeacherAdvisor",
  components: {
    lottie,
    UserStudyAnalytics,
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
    };
  },
  mounted() {
    this.getStudentList();
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
    }),
  },
  methods: {
    ...mapActions("teacherAdvisor", {
      inviteStudent: "inviteStudent",
      getStudents: "getStudents",
      getStudentsList: "getStudentsList",
      getAssignmentsList: "getAssignmentsList",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
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
      $("#inviteStudentModal").modal("show");
      this.getAllStudentsList();
    },
    async inviteStudentAdv() {
      this.submitted = true;
      if (this.selectedStudent) {
        await this.inviteStudent({ id: this.selectedStudent });
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
        }
        this.selectedStudent = "";
        this.submitted = false;
      } else {
        this.$toast.open({
          message: "Please select student before proceeding",
          type: "warning",
          duration: 5000,
        });
      }
    },
    onStudentClick(student) {
      this.showStudentProfile = true;
      this.showStudentAnalytics = false;
      this.studentDetail = student;
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
      await this.getAssignmentsList();
    },
  },
};
</script>

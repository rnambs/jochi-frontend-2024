<template>
  <div class="main-section">
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <section class="py-4 analytic-dashboard">
      <div class="container-fluid">
        <div class="d-flex justify-content-between  align-items-center mb-3">
          <h2 class="text-20 font-poppins font-semi-bold mb-0 flex-grow-1">
            Rahul’s Dashboard</h2>
          <div class="form-group flex-grow-1 mb-0">
            <input type="text" class="form-control" id="search" placeholder="Search Student">
          </div>
        </div>
        <div class="row ">
          <div class="col-12 px-0 d-flex flex-wrap justify-content-between  align-items-center">
            <div class="col-12 col-sm-8 col-md-8 col-lg-6">
              <form class="row">
                <div class="form-group mb-3 mb-sm-0  col-12 col-sm-6 py-0">
                  <select class="form-control" id="exampleFormControlSelect1">
                    <option selected>Week</option>
                    <option>Month</option>
                    <option>Year</option>
                  </select>
                </div>
                <div data-intro="Choose your date range."
                  class="col-12 col-sm-6 py-0 form-row  d-flex position-relative schedule-meeting-section">
                  <input type="text" name="daterange" autocomplete="off" placeholder="Date Range"
                    class="form-control tab-form-control custom-form-control pr-5" readonly="readonly" />
                  <span class="inputfield-icon date-icon position-absolute right-0"></span>
                </div>
              </form>
            </div>

            <div class="col-12 col-sm-4 py-0 d-flex justify-content-end">
              <button @click="currentProgress()" type="submit" class="btn btn-primary text-14 px-3 w-auto">
                View Current Progress
              </button>
            </div>

          </div>
        </div>
        <div class="row d-flex">
          <div class="col-12 col-sm-4 h-auto d-flex">
            <div class="border p-3 rounded-20 w-100 box-card">
              <div class="d-flex justify-content-between align-items-center ">
                <div class="">
                  <h2 class="mb-0 text-28 d-flex align-items-baseline color-text-100 mb-2">{{overdueAssignmentcount}} <span
                      class="text-14 color-text-50">/{{ this.totalAssignmentCount }}</span></h2>
                  <p class="mb-0 text-14 color-text-50">Rahul’s Overdue Assignments</p>
                </div>
                <div class="w-fit-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="101" height="51" viewBox="0 0 101 51" fill="none">
                    <path
                      d="M2 49C14.4714 49 14.4714 36.3644 24.6333 36.3644C34.7952 36.3644 36.1809 49 44.4952 49C52.8095 49 53.7333 2 64.3571 2C74.981 2 73.5952 32.4522 84.219 32.4522C94.8429 32.4522 89.7619 20.081 99 20.081"
                      stroke="#EB702A" stroke-width="3" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-8">
            <div class="border p-3 rounded-20 w-100 box-card">
              <h2 class="text-18 font-poppins font-semi-bold mb-3 flex-grow-1">
                Overdue Assignments</h2>
                <div class="scrollable-container overflow-auto" style="max-height: 100px;">
                  <div class="row">
                    <div class="col-12 col-md-3">
                      <p class="mb-0 text-14 color-text-50">Assignment Name</p>
                    </div>
                    <div class="col-12 col-md-3">
                      <p class="mb-0 text-14 color-text-50">Subject</p>
                    </div>
                    <div class="col-12 col-md-3">
                      <p class="mb-0 text-14 color-text-50">Due Date</p>
                    </div>
                    <div class="col-12 col-md-3">
                      <p class="mb-0 text-14 color-text-50">Remind Student</p>
                    </div>
                  </div>

                  <div class="row" v-for="assignment in overdueAssts" :key="assignment.id">
                    <div class="col-12 col-md-3">
                      <h2 class="mb-0 text-16 font-weight-medium color-text-100">{{ assignment.task }}</h2>
                    </div>
                    <div class="col-12 col-md-3">
                      <h2 class="mb-0 text-16 font-weight-medium color-text-100">{{ assignment.subject }}</h2>
                    </div>
                    <div class="col-12 col-md-3">
                      <h2 class="mb-0 text-16 font-weight-medium color-text-100">{{ assignment.due_date }}</h2>
                    </div>
                    <div class="col-12 col-md-3">
                      <h2 class="mb-0 text-16 font-weight-medium color-text-100">INSERT BELL ICON</h2>
                    </div>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div class="row d-flex">
          <div class="col-12 col-sm-4 h-auto d-flex">
            <div class="border p-3 rounded-20 w-100 box-card">
              <div class="d-flex justify-content-between align-items-center ">
                <div class="">
                  <h2 class="mb-0 text-28 d-flex align-items-baseline color-text-100 mb-2">{{ this.completedAssignmentcount }}<span
                      class="text-14 color-text-50">/{{ this.totalAssignmentCount }}</span></h2>
                  <p class="mb-0 text-14 color-text-50">Rahul’s Completed Assignments</p>
                </div>
                <div class="w-fit-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="101" height="51" viewBox="0 0 101 51" fill="none">
                    <path
                      d="M2 49C14.4714 49 14.4714 36.3644 24.6333 36.3644C34.7952 36.3644 36.1809 49 44.4952 49C52.8095 49 53.7333 2 64.3571 2C74.981 2 73.5952 32.4522 84.219 32.4522C94.8429 32.4522 89.7619 20.081 99 20.081"
                      stroke="#18D837" stroke-width="3" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-8">
            <div class="border p-3 rounded-20 w-100 box-card">
              <h2 class="text-18 font-poppins font-semi-bold mb-3 flex-grow-1">
                Completed Assignments</h2>
                <div  class="scrollable-container overflow-auto" style="max-height: 100px;">
                  <div class="row">
                    <div class="col-12 col-md-3">
                      <p class="mb-0 text-14 color-text-50">Assignment Name</p>
                    </div>
                    <div class="col-12 col-md-3">
                      <p class="mb-0 text-14 color-text-50">Subject</p>
                    </div>
                    <div class="col-12 col-md-3">
                      <p class="mb-0 text-14 color-text-50">Due Date</p>
                    </div>
                    <div class="col-12 col-md-3">
                      <p class="mb-0 text-14 color-text-50">Remind Student</p>
                    </div>
                  </div>

                  <div class="row" v-for="assignment in filteredAssignments" :key="assignment.id">
                    <div class="col-12 col-md-3">
                      <h2 class="mb-0 text-16 font-weight-medium color-text-100">{{ assignment.task }}</h2>
                    </div>
                    <div class="col-12 col-md-3">
                      <h2 class="mb-0 text-16 font-weight-medium color-text-100">{{ assignment.subject }}</h2>
                    </div>
                    <div class="col-12 col-md-3">
                      <h2 class="mb-0 text-16 font-weight-medium color-text-100">{{ assignment.due_date }}</h2>
                    </div>
                    <div class="col-12 col-md-3">
                      <h2 class="mb-0 text-16 font-weight-medium color-text-100">INSERT BELL ICON</h2>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="border p-3 rounded-20 w-100 box-card">
              <h2 class="text-18 font-poppins font-semi-bold mb-3 flex-grow-1">
                Recent Grades</h2>
            </div>
          </div>

        </div>
        <div class="row">
          <div class="col-12 d-flex justify-content-end ">
            <button type="submit" class="btn btn-primary text-14 px-4 w-auto ">
              Create Report
            </button>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
var fromDate = "";
var endDate = "";

export default {
  components: {
    lottie,
  },
  data() {
    return {
      accordionOpened: false,
      value: "",
      slot_date: [],
      from: [],
      end: [],
      teacher_name: "",
      dateRange: [],
      popupValue: [],
      popupFrom: [],
      popupEnd: [],
      isShowing: true,
      isMounted: false,
      week: false,
      availability: false,
      loading: false,
      processing: false,
      pendingAssignments: [],
      overdueAssts: [],
      totalAssignmentCount: '',
      overdueAssignmentcount: '',
      completedAssignmentcount: '',
      filteredAssignments: [],
      studentId: "",
      lottieOptions: { animationData: animationData.default },
      anim: null,
    };
  },
  computed:{
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
  },
  mounted() {
    const studentId = this.$route.query.id;
    if(studentId){
      this.studentId = studentId;
      this.getAssignments();
    }else{
      this.$router.push(`/teacher-analytic-dashboard`);
    }
    // this.loading = false;
    this.startTime = new Date().getTime();
    this.isMounted = false;
    const _this = this;
    var today = new Date();
    var future = new Date();
    future.setDate(future.getDate());
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
        // minDate: today,
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
          $(this).val(
            picker.startDate.format("MM/DD/YYYY") +
            " - " +
            picker.endDate.format("MM/DD/YYYY")
          );
          fromDate = picker.startDate.format("YYYY-MM-DD");
          endDate = picker.endDate.format("YYYY-MM-DD");
          _this.UpdateTimeSchedule.bind(_this)();
          _this.isShowing = false;
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

  methods: {
    ...mapActions("teacherAdvisor", {
      getAssignmentsList: "getAssignmentsList",
      getSubjectsList: "getSubjectsList",
    }),
    async getAssignments() {
      this.loading = true;
      await this.getAssignmentsList({ id:  this.studentId });
      await this.getSubjectsList({ id: this.studentId });
      this.mapAssignments();
      this.mapSharedAssignments();
      this.mapOverdueAssignments();
      this.mapOverdueSharedAssignments();
      this.loading = false;
    },
    handleAnimation: function (anim) {
      this.anim = anim;
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
            item.emailCounter = e.emailCounter;
            this.overdueAssts.push(item);
            this.totalAssignmentCount = this.pendingAssignments.length + this.overdueAssts.length
            this.overdueAssignmentcount = this.overdueAssts.length
            this.completedAssignmentcount = this.pendingAssignments.filter((assignment) => {
              return assignment.task_status === 'Completed';
            }).length;
            this.filterCompletedAssignments();
          } else if (e.assignments.task_status == "Completed") {
            this.mapSingleSharedAsst(e);
          }
        });
      }
    },
    filterCompletedAssignments() {
      this.filteredAssignments = this.pendingAssignments.filter((assignment) => {
              return assignment.task_status === 'Completed';
            });
    },
    currentProgress(){
      this.$router.push(`/teacher-advisor?id=${this.studentId}`);
    }
  },
};
</script>

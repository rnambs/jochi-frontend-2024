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
          <h2 class="text-20 font-poppins font-semi-bold color-primary-dark mb-0 flex-grow-1">
            {{ studentDetail + "'s Dashboard" }}</h2>
          <div class="form-group flex-grow-1 mb-0">
            <!-- <input type="text" class="form-control" id="search" placeholder="Search Student"> -->
            <multiselect
                  v-model="selectedStudent"
                  :options="studentDetails"
                  track-by="id"
                  label="fullName"
                  placeholder="Select students"
                  @input="selectedStudentId"
                >
                  <span slot="noResult">No data Found</span>
                </multiselect>
          </div>
        </div>
        <div class="row ">
          <div class="col-12 px-0 d-flex flex-wrap justify-content-between  align-items-center">
            <div class="col-12 col-sm-8 col-md-8 col-lg-6">
              <form class="row">
                <!-- <div class="form-group mb-3 mb-sm-0  col-12 col-sm-6 py-0">
                  <select class="form-control" id="exampleFormControlSelect1">
                    <option @input="setAssignmentType('weekly')">Week</option>
                    <option @input="setAssignmentType('monthly')">Month</option>
                    <option>Year</option>
                  </select>
                </div> -->
                <div data-intro="Filter tasks" class="dropdown form-row d-inline-flex w-auto mr-2">
                        <div class="dropdown-select form-control form-md form-transparent" type="button"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="i-filter-calendar j-icon i-sm bg-gray mr-1"></i>
                          <span id="dLabel" class="mr-3">{{ TypeText }}</span>
                          <span class="caret"><i class="fas fa-chevron-down font-medium"></i></span>
                        </div>
                        <ul class="dropdown-menu w-100 rounded-12 p-2 mt-2" aria-labelledby="dLabel">
                          <li class="item p-2" @click="setAssignmentType('weekly')"
                            :class="{ active: assignmentType === 'weekly' }">This week</li>
                          <li class="item p-2" @click="setAssignmentType('monthly')"
                            :class="{ active: assignmentType === 'monthly' }">This Month</li>
                        </ul>
                      </div>
                <div data-intro="Choose your date range."
                  class="col-12 col-sm-6 py-0 form-row  d-flex position-relative schedule-meeting-section">
                  <input type="text" name="daterange" autocomplete="off" placeholder="Date Range"
                    class="form-control tab-form-control custom-form-control pr-5 clickable border border--form3" readonly="readonly" />
                  <span class="inputfield-icon date-icon position-absolute right-0 clickable"></span>
                </div>
              </form>
            </div>

            <div class="col-12 col-md-4 py-0 d-flex justify-content-start justify-content-md-end">
              <button @click="currentProgress()" type="submit" class="btn btn-primary text-14 px-3 w-auto">
                View Current Progress
              </button>
              <button @click="GeneratePdf()" :disabled="submitted" type="submit" class="btn btn-primary text-14 px-3 w-auto ml-2">
                <v-progress-circular
                  v-if="spinnerLoader"
                  :size="20"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
                Create Report
              </button>
            </div>

          </div>
        </div>
        <div class="row d-flex">
          <div class="col-12 col-sm-3 h-auto d-flex">
            <div class="border p-3 rounded-20 w-100 box-card overflow-x-hidden">
              <div class="d-flex flex-column flex-xl-row justify-content-between align-items-start align-items-xl-center ">
                <div class="mb-4 mb-xl-0">
                  <h2 class="mb-0 text-28 d-flex align-items-baseline color-dark mb-2">{{ OverdueAssignmentscount + overdueSharedAssignmentsCount }} <span
                      class="text-14 color-text-50">/{{ totalAssignmentscount }}</span></h2>
                  <p class="mb-0 text-14 color-text-50">{{ studentFirstName }}’s Overdue Assignments</p>
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
          <div class="col-12 col-sm-9">
            <div class="border p-3 rounded-20 w-100 box-card h-100">
              <h2 class="text-18 color-dark font-poppins font-semi-bold mb-2 flex-grow-1">
                Overdue Assignments
              </h2>
              <div>
                <div class="assignment-overflow">
                  <table class="table position-relative">
                    <thead class="position-sticky top-0 bg-global">
                      <tr>
                        <th><span class="mb-0 text-14 color-text-50 font-regular">Assignment Name</span></th>
                        <th><span class="mb-0 text-14 color-text-50 font-regular">Subject</span></th>
                        <th><span class="mb-0 text-14 color-text-50 font-regular">Due Date</span></th>
                        <th v-if="isSchoolAdmin != '1'"><span class="mb-0 text-14 color-text-50 font-regular">Remind</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="assignment in overdueAssts" :key="assignment.id">
                        <td><span class="text-14 color-dark font-poppins font-semi-bold mb-3">{{ assignment.task }}</span></td>
                        <td><span class="text-14 color-dark font-poppins font-semi-bold mb-3">{{ assignment.subject }}</span></td>
                        <td><span class="text-14 color-dark font-poppins font-semi-bold mb-3 text-nowrap">{{ assignment.due_date }}</span></td>
                        <td v-if="isSchoolAdmin != '1'"><span class="text-14 color-dark font-poppins font-semi-bold mb-3 text-nowrap"><button data-bs-toggle="tooltip" data-bs-placement="right" :title="`This bell icon is to send a reminder email to the student,
${assignment.emailCounter === null ? 0 : assignment.emailCounter} reminder emails sent so far`"
                                class="ml-3 text-12 bg-card-secondary p-2 rounded"
                                @click="emailTrigger(assignment.id,assignment.user_id
                                )"
                              >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 3.77778C8.25 3.77778 4.75 4.84444 4.75 9.11111V12.6667L3 14.4444H7.375M10 3.77778C14.2 3.77778 15.25 7.33333 15.25 9.11111V12.6667L17 14.4444H12.625M10 3.77778V2M7.375 14.4444V15.3333C7.375 16.2222 7.9 18 10 18C12.1 18 12.625 16.2222 12.625 15.3333V14.4444M7.375 14.4444H12.625" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              </button></span></td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="overdueAssts.length == 0" class="empty-shedule">
                    <p class="color-gray text-center text-14">No Overdue Assignments Found</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div class="row d-flex">
          <div class="col-12 col-sm-3 h-auto d-flex">
            <div class="border p-3 rounded-20 w-100 box-card">
              <div class="d-flex flex-column flex-xl-row justify-content-between align-items-start align-items-xl-center ">
                <div class="mb-4 mb-xl-0">
                  <h2 class="mb-0 text-28 d-flex align-items-baseline color-dark mb-2">{{ completedAssignmentscount + completedSharedAssignmentsCount }}<span
                      class="text-14 color-text-50">/{{ totalAssignmentscount }}</span></h2>
                  <p class="mb-0 text-14 color-text-50">{{ studentFirstName }}’s Completed Assignments</p>
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
          <div class="col-12 col-sm-9">
            <div class="border p-3 rounded-20 w-100 box-card h-100">
              <h2 class="text-18 color-dark font-poppins font-semi-bold mb-2 flex-grow-1">
                Completed Assignments
              </h2>
              <div>
                <div class="assignment-overflow">
                  <table class="table position-relative">
                    <thead class="position-sticky top-0 bg-global">
                      <tr>
                        <th><span class="mb-0 text-14 color-text-50 font-regular">Assignment Name</span></th>
                        <th><span class="mb-0 text-14 color-text-50 font-regular">Subject</span></th>
                        <th><span class="mb-0 text-14 color-text-50 font-regular">Due Date</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="assignment in completedAssignmentsList" :key="assignment.id">
                        <td><span class="font-poppins color-dark font-semi-bold mb-3">{{ assignment.task }}</span></td>
                        <td><span class="font-poppins color-dark font-semi-bold mb-3">{{ assignment.subject }}</span></td>
                        <td><span class="font-poppins color-dark font-semi-bold mb-3 text-nowrap">{{ assignment.due_date }}</span></td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="completedAssignmentsList.length == 0" class="empty-shedule">
                    <p class="color-gray text-center text-14">No Completed Assignments Found</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="row">
          <div class="col-12">
            <div class="border p-3 rounded-20 w-100 box-card h-100">
              <h2 class="text-18 color-dark font-poppins font-semi-bold mb-3 flex-grow-1">
                Recent Grades
              </h2>
              <div>
                <div class="assignment-overflow">
                  <table class="table position-relative">
                    <thead class="position-sticky top-0 bg-global">
                      <tr>
                        <th><span class="mb-0 text-14 color-text-50 font-regular">Assignment Name</span></th>
                        <th><span class="mb-0 text-14 color-text-50 font-regular">Subject</span></th>
                        <th><span class="mb-0 text-14 color-text-50 font-regular">Grade</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="assignment in assignmentsGradeList" :key="assignment.id">
                        <td><span class="font-poppins color-dark font-semi-bold mb-3">{{ assignment.task }}</span></td>
                        <td><span class="font-poppins color-dark font-semi-bold mb-3">{{ assignment.subject }}</span></td>
                        <td><span class="font-poppins color-dark font-semi-bold mb-3 text-nowrap">{{ assignment.grade }}</span></td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="assignmentsGradeList.length == 0" class="empty-shedule">
                    <p class="color-gray text-center text-14">No Assignments Found</p>
                  </div>
                </div>
              </div>
            </div>
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
      overdueAssts: [],
      completedAssignmentsList: [],
      studentId: "",
      selectedStudent: "",
      lottieOptions: { animationData: animationData.default },
      anim: null,
      assignmentType:'weekly',
      studentDetail:'',
      spinnerLoader: false,
      submitted: false,
      overdueSharedAssts: [],
      completedSharedAssts: [],
      studentFirstName: '',
      isSchoolAdmin: '',
      fromDate: "",
      endDate: "",
      dateRangePicker: null,
      future: new Date(),
    };
  },
  computed:{
    ...mapState("teacherAdvisor", {
      studentDetails: (state) => state.studentDetails,
      studentsList: (state) => state.studentsList,
      studentsListAdvisor: (state) => state.studentsListAdvisor,
      successMessage: (state) => state.successMessage,
      successType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      errorMessageQuote: (state) => state.errorMessage,
      subjectsData: (state) => state.subjectsData,
      emailCountList: (state) => state.emailCountList,
      totalAssignmentscount: (state) => state.totalAssignmentscount,
      completedAssignmentscount: (state) => state.completedAssignmentscount,
      completedAssignments: (state) => state.completedAssignments,
      OverdueAssignmentscount: (state) => state.OverdueAssignmentscount,
      OverDueAssignments: (state) => state.OverDueAssignments,
      assignmentsGradeList:(state) => state.assignmentsGradeList,
      completedSharedAssignmentsCount:(state) => state.completedSharedAssignmentsCount,
      completedShareddetails:(state) => state.completedShareddetails,
      overdueSharedAssignmentsCount:(state) => state.overdueSharedAssignmentsCount,
      overdueShareddetails:(state) => state.overdueShareddetails,
    }),
    TypeText() {
      if (this.assignmentType === 'monthly') {
        return 'This Month';
      }else {
        return 'This Week';
      }
    },
  },
  async mounted() {
    const studentId = this.$route.query.id;
    if(studentId){
      this.studentId = studentId;
      await this.getAssignments();
      await this.GetStudentCount();
      const student = this.studentDetails.find(student => student.id == studentId);
      this.studentDetail = student.first_name + " " + student.last_name;
      this.studentFirstName = student.first_name;
    }else{
      this.$router.push(`/teacher-analytic-dashboard`);
    }
    // this.loading = false;
    this.isSchoolAdmin = localStorage.getItem("schoolAdmin");
    this.GetStudentCount();
    this.GetGradeList();
    this.future.setDate(this.future.getDate());
    this.initializeDateRangePicker();
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
  },

  methods: {
    ...mapActions("teacherAdvisor", {
      getSubjectsList: "getSubjectsList",
      getStudentCount: "getStudentCount",
      getAssignmentsListData: "getAssignmentsListData",
      getGradeList: "getGradeList",
      emailReminder: "emailReminder",
      generatePdf:"generatePdf"
    }),
    async setAssignmentType(type) {
      this.assignmentType = type;
      this.fromDate = '',
      this.endDate = '',
      $('input[name="daterange"]').val("");
      await this.getAssignments()
    },
    async GetStudentCount(){
      await this.getStudentCount();
      this.studentDetails.forEach(student => {
        student.fullName = `${student.first_name} ${student.last_name}`;
      });
    },
    async GetGradeList(){
      await this.getGradeList({id:this.studentId});
    },
    async getAssignments() {
      this.loading = true;
      await this.getAssignmentsListData({id:this.studentId,type:this.assignmentType,fromDate:this.fromDate,toDate:this.endDate});
      this.mapAssignments();
      this.mapCompletedAssignments();
      this.loading = false;
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    initializeDateRangePicker() {
      // Store reference to Vue component
      const vm = this;

      // Initialize dateRangePicker
      this.dateRangePicker = $('input[name="daterange"]').daterangepicker({
        autoUpdateInput: false,
        // minDate: today,
        maxDate: this.future,
        opens: "left",
        locale: {
          format: "DD-MM-YYYY",
          cancelLabel: "Clear",
        },
      });

      // Handle click on date icon
      $('.date-icon').click(function() {
        // Open the date range picker when the icon is clicked
        $('input[name="daterange"]').click();
      });

      // Handle apply event
      $('input[name="daterange"]').on("apply.daterangepicker", function(ev, picker) {
        $(this).val(
          picker.startDate.format("MM/DD/YYYY") +
          " - " +
          picker.endDate.format("MM/DD/YYYY")
        );
        vm.fromDate = picker.startDate.format("YYYY-MM-DD");
        vm.endDate = picker.endDate.format("YYYY-MM-DD");
        vm.assignmentType = '';
        vm.getAssignments();
        vm.isShowing = false;
      });

      // Handle cancel event
      $('input[name="daterange"]').on("cancel.daterangepicker", function(ev, picker) {
        $(this).val("");
        vm.fromDate = '';
        vm.endDate = '';
        vm.assignmentType = 'weekly';
        vm.getAssignments();
        picker.setStartDate(moment());
      });
    },

    mapAssignments() {
      this.overdueAssts = this.mapAssignmentDetails(this.OverDueAssignments);
      this.overdueSharedAssts = this.mapAssignmentDetails(this.overdueShareddetails);
      // this.overdueAssts = [...this.overdueAssts, ...this.overdueSharedAssts];
      const mergedArray = [...this.overdueAssts, ...this.overdueSharedAssts];
      mergedArray.sort((a, b) => {
    const dateA = new Date(a.due_date);
    const dateB = new Date(b.due_date);
    return dateA - dateB;
    });
    this.overdueAssts = mergedArray;
    },
    mapAssignmentDetails(assignments) {
      return assignments.map((element) => {
        const { due_date, emailCounter, emailSendDate, overdueMailSentDate, task_status, subject, task, user_id, id } = element;

        return {
          due_date: this.formatDate(due_date),
          emailCounter,
          emailSendDate,
          overdueMailSentDate,
          task_status,
          task,
          id,
          subject,
          user_id
        };
      });
    },
    mapCompletedAssignments() {
      this.completedAssignmentsList = this.mapCompletedAssignmentDetails(this.completedAssignments);
      this.completedSharedAssts = this.mapCompletedAssignmentDetails(this.completedShareddetails);
      this.completedAssignmentsList = [...this.completedAssignmentsList, ...this.completedSharedAssts];
    },

    mapCompletedAssignmentDetails(assignments) {
      return assignments.map((element) => {
        const { due_date, subject, task, id } = element;

        return {
          due_date: this.formatDate(due_date),
          task,
          id,
          subject
        };
      });
    },
    formatDate(input) {
      var datePart = input.match(/\d+/g),
        year = datePart[0], // get only two digits
        month = datePart[1],
        day = datePart[2];

      return month + "-" + day + "-" + year;
    },
    currentProgress(){
      this.$router.push(`/teacher-advisor?id=${this.studentId}`);
    },
    selectedStudentId(selectedStudent) {
      this.$router.push(`/teacher-advisor?id=${selectedStudent.id}`);
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
    GeneratePdf(){
      this.submitted = true;
      this.spinnerLoader = true;
      this.generatePdf({id:this.studentId,type:this.assignmentType,fromDate:this.fromDate,toDate:this.endDate});      
      setTimeout(() => {
        if(this.successMessage){
        this.$toast.open({
          message: "Download initiated",
          type: this.SuccessType,
          duration: 4000,
        });
      }
        this.spinnerLoader = false;
        this.submitted = false;
      
      }, 4000);
    }
  },
  beforeDestroy() {
    if (this.dateRangePicker) {
      // Remove the date range picker when the component is destroyed
      this.dateRangePicker.data('daterangepicker').remove();
    }
  },
};
</script>
<style scoped>
.assignment-overflow{
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 8.25rem;
}
.table {
  border-collapse: collapse;
} 
.table th,
.table td {
  border: none;
  padding: 0.5rem;
}
</style>

<template>
  <div class="content col-lg-12">
    <div class="row">
      <div class="col-12">
        <div class="bg-light">
          <div class="tab-content p-1" id="myTabContent">
            <!-- student tab -->
            <div
              class="tab-pane fade container-fluid show active in"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div id="app" class="custom-container pt-3 px-0">
                <!-- search tab -->
                <div
                  class="row shadow-sm p-3 bg-white rounded justify-content-between w-100 m-0"
                >
                  <div class="col-md-4 col-lg-3">
                    <h4 class="text-dark text-left">Email Dispatch</h4>
                  </div>
                </div>

                <!-- end search tab -->
              </div>
              <div class="bg-white mt-2 p-1 rounded row overflow-hidden">
                <!-- table -->
                <div class="bg-white mt-2 p-1 rounded row">
                  <div
                    class="col-lg-4 d-flex align-items-center align-items-start"
                  >
                    <div class="input-group rounded d-flex">
                      <input
                        class="mr-1"
                        role="button"
                        type="checkbox"
                        aria-describedby="search-addon"
                        v-model="selectAll"
                        name="selectAll"
                        @change="custom = !selectAll"
                      />
                      <label for="selectAll" class="m-0">Select All</label>
                    </div>
                    <div class="input-group rounded">
                      <input
                        class="mr-1"
                        role="button"
                        type="checkbox"
                        aria-describedby="search-addon1"
                        v-model="custom"
                        name="custom"
                        @change="selectAll = !custom"
                      />
                      <label for="custom" class="m-0">Search</label>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="row">
                      <div
                        v-if="custom"
                        class="col-md-4 col-lg-6 align-items-center"
                      >
                        <div class="input-group rounded d-flex">
                          <input
                            type="search"
                            class="form-control rounded mr-3"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="search-addon"
                            v-model="search"
                            v-on:keyup="GetSchoolList()"
                          />
                          <button type="button">
                            <span
                              class="input-group-text border-0 h-100"
                              id="search-addon2"
                            >
                              <i class="fa fa-search" aria-hidden="true"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                      <div v-if="custom" class="col-md-4 col-lg-6">
                        <div
                          v-if="schoolSelected()"
                          class="input-group rounded"
                        >
                          <input
                            type="search"
                            class="form-control rounded"
                            placeholder="Search Student"
                            aria-label="searchStudent"
                            aria-describedby="search-addon"
                            v-model="searchStudent"
                            @keyup="GetStudentList()"
                          />
                          <button type="button">
                            <span
                              class="input-group-text border-0 h-100"
                              id="search-addon2"
                            >
                              <i class="fa fa-search" aria-hidden="true"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="custom && search"
                      class="bg-white mt-2 p-1 rounded"
                    >
                      <div class="row">
                        <div class="col-md-12 col-lg-6">
                          <table class="user-table table">
                            <tr class="text-secondary bg-light">
                              <th>
                                <input
                                  type="checkbox"
                                  role="button"
                                  name="chooseAll"
                                  v-model="chooseAll"
                                  @change="changeSelection()"
                                />
                                <label for="chooseAll">Select</label>
                              </th>
                              <th>School Name</th>
                              <th>State</th>
                            </tr>
                            <tr v-if="schools.length == 0">
                              <td
                                colspan="5"
                                class="text-center text-danger pt-3"
                              >
                                Type something to search for students
                              </td>
                            </tr>
                            <tr
                              v-for="(school, index) in schoolList"
                              :key="index"
                            >
                              <td>
                                <input
                                  type="checkbox"
                                  role="button"
                                  :name="index"
                                  v-model="school.checked"
                                  @change="individualSelect()"
                                />
                              </td>
                              <td>
                                <span class="text-nowrap">{{
                                  school.schoolName
                                }}</span>
                              </td>
                              <td class="text-nowrap">{{ school.state }}</td>
                            </tr>
                          </table>
                        </div>
                        <div class="col-md-12 col-lg-6">
                          <table
                            v-if="studentsList && schoolSelected()"
                            class="user-table table"
                          >
                            <tr class="text-secondary bg-light">
                              <th>
                                <input
                                  type="checkbox"
                                  role="button"
                                  name="chooseAllStudent"
                                  v-model="chooseAllStudent"
                                  @change="changeSelectionStudent()"
                                />
                                <label for="chooseAllStudent">Select</label>
                              </th>
                              <th class="p-3">Name</th>
                              <th>Email Id</th>
                              <th>Status</th>
                            </tr>
                            <tr v-if="studentsList.length == 0">
                              <td
                                colspan="5"
                                class="text-center text-danger pt-3"
                              >
                                Type something to start searching
                              </td>
                            </tr>
                            <tr
                              v-for="student in studentsList"
                              :key="student.id"
                            >
                              <td>
                                <input
                                  type="checkbox"
                                  role="button"
                                  :name="index"
                                  v-model="student.checked"
                                  @change="individualSelectStudent()"
                                />
                              </td>
                              <td>{{ student.first_name }}</td>
                              <td>{{ student.email }}</td>
                              <td>
                                {{
                                  student.isactive == 1 ? "Active" : "Inactive"
                                }}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="bg-white mt-2 p-1 rounded d-flex">
                        <div
                          v-if="(custom && schoolSelected(true)) || selectAll"
                          class="col-md-4 col-lg-6"
                        >
                          <div class="input-group rounded">
                            <input
                              type="text"
                              class="form-control rounded"
                              placeholder="Template ID"
                              aria-label="Template ID"
                              aria-describedby="search-addon2"
                              v-model="templateId"
                            />
                          </div>
                        </div>
                        <div
                          v-if="selectAll || schoolList.find((e) => e.checked)"
                          class="col-md-4 col-lg-6"
                        >
                          <button
                            :disabled="!templateId"
                            class="btn btn-primary btn-flat m-b-30 m-t-30"
                            @click="dispatchEmail()"
                          >
                            Send Email
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end table -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import paginate from "~/components/paginate.vue";
var deleteID = "";
var selectValue = 10;
var pageNumValue = 1;
export default {
  name: "SchoolListTable",
  data() {
    return {
      search: "",
      offset: 0,
      limit: selectValue,
      pageTotal: 0,
      paginateCount: 0,
      paginateRange: 0,
      pageNum: "",
      pageNumValue: 1,
      selectValue: 10,
      schoolList: [],
      updateId: 0,
      updateStat: "",
      selectAll: false,
      custom: false,
      templateId: "",
      chooseAll: false,
      chooseAllStudent: false,
      searchStudent: "",
      schoolId: "",
      studentsList: [],
    };
  },
  mounted() {
    this.GetSchoolList();
    this.pageCount = 10;
  },
  computed: {
    ...mapState("emailDispatch", {
      successMessageEmail: (state) => state.successMessageEmail,
      SuccessTypeEmail: (state) => state.SuccessTypeEmail,
      errorMessageEmail: (state) => state.errorMessageEmail,
      errorTypeEmail: (state) => state.errorTypeEmail,
    }),
    ...mapState("schoolListTable", {
      schools: (state) => state.schools,
      schoolCount: (state) => state.schoolCount,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
    ...mapState("userListTable", {
      students: (state) => state.students,
      studentsCount: (state) => state.studentsCount,
    }),
  },
  methods: {
    ...mapActions("emailDispatch", {
      sendEmail: "sendEmail",
    }),
    ...mapActions("schoolListTable", {
      getSchoolFullList: "getSchoolFullList",
      updateStatus: "updateStatus",
      deleteSchools: "deleteSchools",
    }),
    ...mapActions("userListTable", {
      getStudentFullList: "getStudentFullList",
    }),
    async changeStatus(id, status) {
      $("#mediumModal").modal("show");
      this.updateId = id;
      this.updateStat = status;
    },
    async dispatchEmail() {
      let selectedIds = [];
      if (!this.selectAll) {
        let selectedSchools = this.schoolList.filter((e) => e.checked);
        selectedSchools.forEach((e) => {
          selectedIds.push(e.schoolId);
        });
      }
      let selectedIdStudents = [];
      if (!this.selectAll && this.schoolSelected()) {
        let selectedStudents = this.studentsList.filter((e) => e.checked);
        selectedStudents.forEach((e) => {
          selectedIdStudents.push(e.id);
        });
      }
      await this.sendEmail({
        school_ids: selectedIds,
        student_ids: selectedIdStudents,
        template_id: this.templateId,
        select_all: this.selectAll,
      });
      if (this.successMessageEmail != "") {
        this.selectAll = false;
        this.custom = false;
        this.schoolList = [];
        this.studentsList = [];
        this.chooseAll = false;
        this.chooseAllStudent = false;
        this.search = "";
        this.searchStudent = "";
        this.GetStudentList();
        this.templateId = "";
        this.$toast.open({
          message: this.successMessageEmail,
          type: this.SuccessTypeEmail,
          duration: 5000,
        });
      }
      if (this.errorMessageEmail != "") {
        this.selectAll = false;
        this.custom = false;
        this.chooseAll = false;
        this.chooseAllStudent = false;
        this.search = "";
        this.searchStudent = "";
        this.GetStudentList();
        this.$toast.open({
          message: this.errorMessageEmail,
          type: this.errorTypeEmail,
          duration: 5000,
        });
      }
      this.GetSchoolList();
    },
    async cancel() {
      this.GetSchoolList();
    },
    async GetSchoolList(pageNum = 0) {
      if (pageNum != 0) {
        pageNum = (pageNum - 1) * this.selectValue;
      }
      await this.getSchoolFullList({
        search: this.search,
      });
      //schools
      this.schoolList = [];
      this.schools.forEach((element) => {
        var schoolArray = {};
        var schoolName = element.name;
        var contactPerson = element.contact_person;
        var emailId = element.email;
        var phoneNumber = element.phone;
        var description = element.description;
        var schoolId = element.id;
        if (element.states) {
          var state = element.states.state_name;
        }

        schoolArray["schoolName"] = schoolName;
        schoolArray["contactPerson"] = contactPerson;
        schoolArray["emailId"] = emailId;
        schoolArray["phoneNumber"] = phoneNumber;
        schoolArray["description"] = description;
        schoolArray["state"] = state;
        schoolArray["schoolId"] = schoolId;
        schoolArray["status"] = element.status;
        schoolArray["checked"] = false;

        this.schoolList.push(schoolArray);
      });

      this.paginateCount = pageNum;
      this.paginateRange = Math.ceil(this.schoolCount / this.selectValue);
      this.totalPage();
    },
    clickCallback(pageNum) {
      this.GetSchoolList(pageNum);
      this.pageNumValue = pageNum;
    },
    totalPage() {
      this.pageTotal = Math.ceil(this.schoolCount / this.selectValue);
    },
    selectvaluechange(event) {
      this.selectValue = event.target.value;

      this.GetSchoolList();
    },
    setDeleteId(deleteiD) {
      deleteID = deleteiD;
    },
    async DeleteSchools(type) {
      await this.deleteSchools({
        id: deleteID,
        type,
      });
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        if (this.paginateCount != 0) {
          this.paginateCount = this.paginateCount / 10 + 1;
        }
        if (type == 1) {
          this.GetSchoolList(this.paginateCount);
        }
      }
    },
    changeSelection() {
      if (this.chooseAll) {
        this.schoolList.forEach((e) => (e.checked = true));
      } else {
        this.schoolList.forEach((e) => (e.checked = false));
      }
    },
    individualSelect() {
      if (this.chooseAll) {
        const unchecked = this.schoolList.find((e) => !e.checked);
        if (unchecked) {
          this.chooseAll = false;
        }
      }
    },
    schoolSelected(multiple = false) {
      if (!multiple) {
        const selected = this.schoolList.filter((e) => e.checked);
        if (selected.length == 1) {
          this.schoolId = selected[0].schoolId;
        }
        return selected.length == 1 ? true : false;
      } else {
        const selected = this.schoolList.filter((e) => e.checked);
        if (selected.length == 1) {
          this.schoolId = selected[0].schoolId;
        }
        return selected.length > 0 ? true : false;
      }
    },
    async GetStudentList(pageNum = 0) {
      if (pageNum != 0) {
        pageNum = (pageNum - 1) * this.selectValue;
      }

      await this.getStudentFullList({
        search: this.searchStudent,
        school_id: this.schoolId,
      });
      this.studentsList = [];
      if (this.students && this.students.length > 0) {
        this.students.forEach((element) => {
          var studentArray = {};
          var id = element.id;
          var first_name = element.first_name;
          var email = element.email;
          var isactive = element.isactive;
          studentArray["id"] = id;
          studentArray["first_name"] = first_name;
          studentArray["email"] = email;
          studentArray["isactive"] = isactive;
          studentArray["checked"] = false;

          this.studentsList.push(studentArray);
        });
      }
      this.paginateCount = pageNum;
      this.paginateRange = Math.ceil(this.studentsCount / this.selectValue);
    },
    changeSelectionStudent() {
      if (this.chooseAllStudent) {
        this.studentsList.forEach((e) => (e.checked = true));
      } else {
        this.studentsList.forEach((e) => (e.checked = false));
      }
    },
    individualSelectStudent() {
      if (this.chooseAllStudent) {
        const unchecked = this.studentsList.find((e) => !e.checked);
        if (unchecked) {
          this.chooseAllStudent = false;
        }
      }
    },
  },
};
</script>

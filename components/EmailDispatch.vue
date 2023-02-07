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
                  class="
                    row
                    shadow-sm
                    p-3
                    bg-white
                    rounded
                    justify-content-between
                    w-100
                    m-0
                  "
                >
                  <div class="col-md-4 col-lg-3">
                    <h4 class="text-dark text-left">Email Dispatch</h4>
                  </div>
                </div>

                <!-- end search tab -->
              </div>
              <div class="bg-white mt-2 p-1 rounded row">
                <!-- table -->
                <div class="bg-white mt-2 p-1 rounded row">
                  <div class="col-md-4 col-lg-3 d-flex align-items-center">
                    <div class="input-group rounded d-flex">
                      <input
                        class="mr-1"
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
                        type="checkbox"
                        aria-describedby="search-addon1"
                        v-model="custom"
                        name="custom"
                        @change="selectAll = !custom"
                      />
                      <label for="custom" class="m-0">Search</label>
                    </div>
                  </div>
                  <div class="col-md-4 col-lg-12">
                    <div class="row">
                      <div v-if="custom" class="col-md-4 col-lg-6 align-items-center">
                      <div class="input-group rounded d-flex">
                        <input
                          type="search"
                          class="form-control rounded"
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
                      <div v-if="schoolSelected()" class="input-group rounded">
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
                        <div class="col-md-6">
                          <table class="user-table table">
                            <tr class="text-secondary bg-light">
                              <th>
                                <input
                                  type="checkbox"
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
                              <td colspan="5" class="text-center text-danger pt-3">
                                No data found
                              </td>
                            </tr>
                            <tr v-for="(school, index) in schoolList" :key="index">
                              <td>
                                <input
                                  type="checkbox"
                                  :name="index"
                                  v-model="school.checked"
                                  @change="individualSelect()"
                                />
                              </td>
                              <td>
                                <nuxt-link
                                  :to="{
                                    path: '/user-table',
                                    query: { id: school.schoolId },
                                  }"
                                >
                                  <span class="text-nowrap">{{
                                    school.schoolName
                                  }}</span>
                                </nuxt-link>
                              </td>
                              <td class="text-nowrap">{{ school.state }}</td>
                            </tr>
                          </table>
                        </div>
                        <div class="col-md-6">
                          <table v-if="students" class="user-table table">
                            <tr class="text-secondary bg-light">
                              <th class="p-3">Name</th>
                              <th>Email Id</th>
                              <th>Status</th>
                               
                            </tr>
                            <tr v-if="students.length == 0">
                              <td colspan="5" class="text-center text-danger pt-3">
                                No data found
                              </td>
                            </tr>
                            <tr v-for="student in students" :key="student.id">
                              <td>{{ student.first_name }}</td>
                              <td>{{ student.email }}</td>
                              <td>{{ student.isactive == 1 ? "Active":"Inactive" }}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="bg-white mt-2 p-1 rounded d-flex">
                        <div v-if="custom || selectAll" class="col-md-4 col-lg-6">
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
      searchStudent: "",
      schoolId: "",
    };
  },
  mounted() {
    this.GetSchoolList();
    this.pageCount = 10;
  },
  computed: {
    ...mapState("emailDispatch", {
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
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
      if (!this.selectAll) {
        let selectedSchools = this.schoolList.filter((e) => e.checked);
        let selectedIds = [];
        selectedSchools.forEach((e) => {
          selectedIds.push(e.id);
        });
      }
      await this.sendEmail({
        school_ids: selectedIds,
        template_id: this.templateId,
        select_all: this.selectAll,
      });
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
      }
      if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
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
    schoolSelected() {
      const selected = this.schoolList.filter((e) => e.checked);
      if (selected.length == 1) {
        console.log("selected", selected);
        this.schoolId = selected[0].schoolId;
      }
      return selected.length == 1 ? true : false;
    },
    async GetStudentList(pageNum = 0) {
      if (pageNum != 0) {
        pageNum = (pageNum - 1) * this.selectValue;
      }

      await this.getStudentFullList({
        search: this.searchStudent,
        school_id: this.schoolId,
      });
      this.paginateCount = pageNum;
      this.paginateRange = Math.ceil(this.studentsCount / this.selectValue);
    },
  },
};
</script>

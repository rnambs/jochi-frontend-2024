<template>
  <div class="content col-lg-12">
    <div class="row">
      <div class="col-12">
        <div class="card p-3">
          <div class="card-head m-1">
            <h4>{{ schoolDetails.name }}</h4>
          </div>
          <div style="width: 100%; height: 1px" class="bg-secondary mb-1"></div>
          <div class="row justify-content-between">
            <div class="col-md-5">
              <div>
                Description :
                <span class="text-muted m-b-15"
                  >{{ schoolDetails.description }}.</span
                >
              </div>
            </div>
            <div class="col-md-6">
              <div>
                Contact person :
                <span class="text-muted m-b-15">{{
                  schoolDetails.contact_person
                }}</span>
              </div>
              <div>
                Email :
                <span class="text-muted m-b-15">{{ schoolDetails.email }}</span>
              </div>
              <div>
                Phone number:
                <span class="text-muted m-b-15">{{ schoolDetails.phone }}</span>
              </div>
              <div>
                State :
                <span class="text-muted m-b-15" v-if="schoolDetails.state">{{
                  schoolDetails.states.state_name
                }}</span>
              </div>
              <!-- <div>LMS Id : <span class="text-muted m-b-15">32</span> <button class="btn btn-dark bg-secondary">edit</button></div> -->

              <!-- <div class="form-row lms-form">
                <label class="form-label mt-1">LMS ID:</label>
                <input
                  type="num"
                  id="lms"
                  class="form-control w-25 ml-2 m-b-15"
                  v-model="Lms_id"
                />
                <button
                  class="btn btn-sm btn-dark bg-primary ml-2"
                  @click="FetchLmsId()"
                >
                  Save And Verified
                </button>
              </div> -->
            </div>
          </div>
        </div>

        <div class="bg-light">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item active">
              <a
                class="nav-link active show"
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="true"
                >Student List</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="contact-tab"
                data-toggle="tab"
                href="#contact"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
                >Teacher List</a
              >
            </li>
          </ul>
          <div class="tab-content p-1" id="myTabContent">
            <!-- student tab -->
            <div
              class="tab-pane fade container-fluid show active in"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div id="app" class="custom-container container">
                <!-- search tab -->
                <div
                  class="row justify-content-between shadow-sm p-3 bg-white rounded"
                >
                  <div class="col-md-4 col-lg-3">
                    <!-- <h4 class="text-dark">Student List</h4> -->
                  </div>
                  <div class="col-md-4 col-lg-3">
                    <div class="input-group rounded">
                      <input
                        type="search"
                        class="form-control rounded"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                        v-model="search"
                      />
                      <button type="button" @click="GetStudentList()">
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

                <!-- end search tab -->
              </div>
              <!-- table -->
              <div class="bg-white mt-2 p-1 rounded">
                <table class="user-table table">
                  <tr class="text-secondary bg-light">
                    <th>Name</th>
                    <th>Email Id</th>
                    <th>Status</th>
                    <th>Request for Delete</th>
                    <th>Actions</th>
                  </tr>
                  <tr v-if="students.length == 0">
                    <td colspan="5" class="text-center text-danger pt-3">
                      No data found
                    </td>
                  </tr>
                  <tr v-for="student in students" :key="student.id">
                    <td>{{ student.first_name }}</td>
                    <td>{{ student.email }}</td>

                    <td @click="setId(student.id)">
                      <select
                        @change="onchange($event)"
                        class="px-2 rounded border"
                        style="cursor: pointer"
                      >
                        <option :value="1" :selected="student.isactive == 1">
                          Active
                        </option>
                        <option :value="0" :selected="student.isactive == 0">
                          Inactive
                        </option>
                      </select>
                    </td>
                    <td>No</td>
                    <td @click="setDeleteId(student.id)">
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#mediumModal"
                      >
                        <span>
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </span>
                      </button>
                    </td>
                  </tr>
                </table>
                <div class="custom-paginate d-flex justify-content-center p-3">
                  <paginate
                    :page-count="pageTotalStudent"
                    :page-range="this.paginateRange"
                    :margin-pages="this.paginateRange"
                    :click-handler="clickCallbackstudent"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="'pagination'"
                    :page-class="'page-item'"
                  >
                  </paginate>
                  <div class="pr-5">
                    {{ (pageNumberStudent - 1) * selectValueTeacher + 1 }}-{{
                      pageNumberStudent * selectValueTeacher > studentsCount
                        ? studentsCount
                        : pageNumberStudent * selectValueTeacher
                    }}
                    of {{ studentsCount }}
                  </div>
                  <div class="pr-2">Students per page</div>

                  <div>
                    <select
                      name="rows per page"
                      class="border rounded"
                      @change="selectvaluechange($event)"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                    </select>
                  </div>
                </div>

                <!-- modal pop up -->
                <div
                  class="modal fade"
                  id="mediumModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="mediumModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-md" role="document">
                    <div class="modal-content delete-modal h-auto">
                      <div class="modal-header bg-light text-dark">
                        <h5 class="modal-title" id="mediumModalLabel">
                          Delete
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
                      <div class="modal-body">
                        <p>Are you sure you want to delete this item?</p>
                      </div>
                      <div class="modal-footer bg-white">
                        <button
                          type="button"
                          data-dismiss="modal"
                          @click="DeleteUsers(1)"
                          class="btn btn-primary color-dark"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          data-dismiss="modal"
                          class="btn btn-light border border-secondary color-dark"
                          aria-label="Close"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end table -->
            </div>

            <!-- Teacher tab -->
            <div
              class="tab-pane fade container-fluid"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <div id="app" class="custom-container container">
                <!-- search tab -->
                <div
                  class="row justify-content-between shadow-sm p-3 bg-white rounded"
                >
                  <div class="col-md-4 col-lg-3">
                    <!-- <h4 class="text-dark">Teacher List</h4> -->
                  </div>
                  <div class="col-md-4 col-lg-3">
                    <div class="input-group rounded">
                      <input
                        type="search"
                        class="form-control rounded"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                        v-model="search"
                      />
                      <button type="button" @click="GetTeacherList()">
                        <span
                          class="input-group-text border-0 h-100"
                          id="search-addon1"
                        >
                          <i class="fa fa-search" aria-hidden="true"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <!-- end search tab -->
              </div>
              <!-- table -->
              <div class="bg-white mt-2 p-1 rounded">
                <table class="user-table table">
                  <tr class="text-secondary bg-light">
                    <th>Name</th>
                    <th>Email Id</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                  <tr v-if="teachers.length == 0">
                    <td colspan="4" class="text-center text-danger pt-3">
                      No data found
                    </td>
                  </tr>
                  <tr v-for="teacher in teachers" :key="teacher.id">
                    <td>{{ teacher.first_name }}</td>
                    <td>{{ teacher.email }}</td>
                    <td @click="setId(teacher.id)">
                      <select
                        @change="onchange($event)"
                        class="px-2 rounded border"
                        style="cursor: pointer"
                      >
                        <option :value="1" :selected="teacher.isactive == 1">
                          Active
                        </option>
                        <option :value="0" :selected="teacher.isactive == 0">
                          Inactive
                        </option>
                      </select>
                    </td>

                    <td @click="setDeleteId(teacher.id)">
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#mediumModal2"
                      >
                        <span>
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </span>
                      </button>
                    </td>
                  </tr>
                </table>
                <div class="custom-paginate d-flex justify-content-center p-3">
                  <paginate
                    :page-count="pageTotal"
                    :page-range="this.paginateRangeTeachers"
                    :margin-pages="this.paginateRangeTeachers"
                    :click-handler="clickCallback"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="'pagination'"
                    :page-class="'page-item'"
                  >
                  </paginate>
                  <div class="pr-5">
                    {{ (pageNumberTeahcer - 1) * selectValueTeacher + 1 }}-{{
                      pageNumberTeahcer * selectValueTeacher > teachersCount
                        ? teachersCount
                        : pageNumberTeahcer * selectValueTeacher
                    }}
                    of {{ teachersCount }}
                  </div>
                  <div class="pr-2">Teachers per page</div>
                  <div>
                    <select
                      name="rows per page"
                      class="border rounded"
                      @change="selectvalueteacher($event)"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                    </select>
                  </div>
                </div>
                <!-- modal popup -->
                <div
                  class="modal fade"
                  id="mediumModal2"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="mediumModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-md" role="document">
                    <div class="modal-content h-auto">
                      <div class="modal-header bg-light text-dark">
                        <h5 class="modal-title" id="mediumModalLabel">
                          Delete
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
                      <div class="modal-body">
                        <p>Are you sure you want to delete this item?</p>
                      </div>
                      <div class="modal-footer bg-white">
                        <button
                          type="button"
                          data-dismiss="modal"
                          @click="DeleteUsers(2)"
                          class="btn btn-primary color-dark"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          data-dismiss="modal"
                          class="btn btn-light border border-secondary color-dark"
                          aria-label="Close"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end table -->
            </div>
            <!-- pagination -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
var deleteID = "";
var statusID = "";
var statusValue = "";
var selectValue = 5;
var selectValueTeacher = 5;
var pageNumberTeahcer = 1;
var pageNumberStudent = 1;
export default {
  name: "UserTable",
  data() {
    return {
      offset: 0,
      limit: selectValue,
      pageTotal: 0,
      pageTotalStudent: 0,
      paginateCount: 0,
      paginateRange: 0,
      paginateRangeTeachers: 0,
      Lms_id: "",
      pageNum: "",
      pageNumTeacher: "",
      search: "",
      selectValue: 5,
      selectValueTeacher: 5,
      pageNumberTeahcer: 1,
      pageNumberStudent: 1,
    };
  },
  mounted() {
    this.search = "";
    this.FetchSchool();
    this.GetStudentList();
    this.GetTeacherList();
    this.pageCount = 10;
  },
  computed: {
    stateName() {
      return this.schoolDetails ? this.schoolDetails.states.state_name : "";
    },
    ...mapState("userListTable", {
      students: (state) => state.students,
      studentsCount: (state) => state.studentsCount,
      teachers: (state) => state.teachers,
      teachersCount: (state) => state.teachersCount,
      schoolDetails: (state) => state.schoolDetails,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("userListTable", {
      getStudentList: "getStudentList",
      getTeacherList: "getTeacherList",
      fetchSchool: "fetchSchool",
      deleteUsers: "deleteUsers",
      setActionStatus: "setActionStatus",
      fetchLmsId: "fetchLmsId",
    }),
    async GetStudentList(pageNum = 0) {
      if (pageNum != 0) {
        pageNum = (pageNum - 1) * this.selectValue;
      }

      await this.getStudentList({
        search: this.search,
        offset: pageNum,
        limit: this.selectValue,
        school_id: this.$route.query.id,
      });
      this.paginateCount = pageNum;
      this.paginateRange = Math.ceil(this.studentsCount / this.selectValue);
      this.totalPage1();
    },
    async GetTeacherList(pageNumTeacher = 0) {
      if (pageNumTeacher != 0) {
        pageNumTeacher = (pageNumTeacher - 1) * this.selectValueTeacher;
      }

      await this.getTeacherList({
        search: this.search,
        offset: pageNumTeacher,
        limit: this.selectValueTeacher,
        school_id: this.$route.query.id,
      });
      this.paginateCount = pageNumTeacher;
      this.paginateRangeTeachers = Math.ceil(
        this.teachersCount / this.selectValueTeacher
      );
      this.totalPage();
    },
    clickCallback(pageNumTeacher) {
      this.GetTeacherList(pageNumTeacher);
      this.pageNumTeacher = pageNumTeacher;
      this.pageNumberTeahcer = pageNumTeacher;
    },
    clickCallbackstudent(pageNum) {
      this.GetStudentList(pageNum);
      this.pageNumberStudent = pageNum;
    },
    totalPage() {
      this.pageTotal = Math.ceil(this.teachersCount / this.selectValueTeacher);
    },
    totalPage1() {
      this.pageTotalStudent = Math.ceil(this.studentsCount / this.selectValue);
    },
    async FetchSchool() {
      await this.fetchSchool({
        school_id: this.$route.query.id,
      });
      this.Lms_id = this.schoolDetails.school_lms_id;
    },
    setDeleteId(deleteiD) {
      deleteID = deleteiD;
    },
    setId(setiD) {
      statusID = setiD;
    },
    async DeleteUsers(type) {
      await this.deleteUsers({
        deleteID,
        type,
      });

      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });

        if (this.paginateCount != 0) {
          this.paginateCount = this.paginateCount / 5 + 1;
        }
        if (type == 1) {
          this.GetStudentList(this.paginateCount);
        } else {
          this.GetTeacherList(this.paginateCount);
        }
      }
    },
    selectvaluechange(event) {
      this.selectValue = event.target.value;
      this.GetStudentList();
    },
    selectvalueteacher(event) {
      this.selectValueTeacher = event.target.value;
      this.GetTeacherList();
    },

    onchange: function (event) {
      statusValue = event.target.value;
      this.SetActionStatus();
    },
    async SetActionStatus() {
      statusValue = parseInt(statusValue);

      await this.setActionStatus({
        id: statusID,
        isactive: statusValue,
      });
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
    },
    async FetchLmsId() {
      await this.fetchLmsId({
        id: this.schoolDetails.id,
        school_lms_id: this.Lms_id,
      });
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
    },
  },
};
</script>
<style>
select {
  appearance: menulist !important;
  -moz-appearance: menulist !important;
  -webkit-appearance: menulist !important;
}
</style>
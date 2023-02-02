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
                  <div class="col-md-4 col-lg-3">
                    <div class="input-group rounded">
                      <input
                        type="checkbox"
                        aria-describedby="search-addon"
                        v-model="selectAll"
                        name="selectAll"
                        @change="custom = !selectAll"
                      />
                      <label for="selectAll">Select All</label>
                    </div>
                    <div class="input-group rounded">
                      <input
                        type="checkbox"
                        aria-describedby="search-addon1"
                        v-model="custom"
                        name="custom"
                        @change="selectAll = !custom"
                      />
                      <label for="custom">Search</label>
                    </div>
                  </div>
                  <div v-if="custom" class="col-md-4 col-lg-6">
                    <div class="input-group rounded">
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
                  <div class="col-md-4 col-lg-6">
                    <div
                      v-if="custom && search"
                      class="bg-white mt-2 p-1 rounded"
                    >
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
                      <div
                        class="
                          custom-paginate
                          d-flex
                          justify-content-center
                          p-3
                        "
                      >
                        <paginate
                          :page-count="pageTotal"
                          :page-range="this.paginateRange"
                          :margin-pages="this.paginateRange"
                          :click-handler="clickCallback"
                          :prev-text="'Prev'"
                          :next-text="'Next'"
                          :container-class="'pagination'"
                          :page-class="'page-item'"
                        >
                        </paginate>
                        <div class="pr-5">
                          {{ (pageNumValue - 1) * selectValue + 1 }}-{{
                            pageNumValue * selectValue > schoolCount
                              ? schoolCount
                              : pageNumValue * selectValue
                          }}
                          of {{ schoolCount }}
                        </div>
                        <div class="pr-2">schools per page</div>
                        <div>
                          <select
                            name="rows per page"
                            class="border rounded"
                            @change="selectvaluechange($event)"
                          >
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>

                      <div
                        class="modal fade"
                        id="mediumModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="mediumModalLabel"
                        aria-hidden="true"
                        data-backdrop="static"
                        data-keyboard="false"
                      >
                        <div class="modal-dialog modal-md" role="document">
                          <div class="modal-content h-auto">
                            <div class="modal-header bg-light text-dark">
                              <h5 class="modal-title" id="mediumModalLabel">
                                Change status
                              </h5>
                              <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                @click="cancel()"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              <p class="text-left">
                                Are you sure you want to change the status for
                                this school?
                              </p>
                            </div>
                            <div class="modal-footer bg-white text-dark">
                              <button
                                type="button"
                                data-dismiss="modal"
                                class="btn btn-primary color-white"
                                @click="update()"
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                data-dismiss="modal"
                                class="
                                  btn btn-light
                                  border border-secondary
                                  color-dark
                                "
                                @click="cancel()"
                                aria-label="Close"
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end table -->
                <div class="bg-white mt-2 p-1 rounded row">
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
                    <button>Send Email</button>
                  </div>
                </div>
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
    };
  },
  mounted() {
    this.GetSchoolList();
    this.pageCount = 10;
  },
  computed: {
    ...mapState("schoolListTable", {
      schools: (state) => state.schools,
      schoolCount: (state) => state.schoolCount,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("schoolListTable", {
      getSchoolList: "getSchoolList",
      updateStatus: "updateStatus",
      deleteSchools: "deleteSchools",
    }),
    async changeStatus(id, status) {
      $("#mediumModal").modal("show");
      this.updateId = id;
      this.updateStat = status;
    },
    async update() {
      await this.updateStatus({
        school_id: this.updateId,
        status: this.updateStat,
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
      await this.getSchoolList({
        search: this.search,
        offset: pageNum,
        limit: this.selectValue,
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
  },
};
</script>

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
                    <h4 class="text-dark text-left">Club</h4>
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
                        v-on:keyup="GetClubList()"
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
                  <!-- <div class="col-md-4 col-lg-3">
                    <nuxt-link class="py-2 btn btn-primary px-4" to="/club-form"
                      >Add Club
                    </nuxt-link>
                  </div> -->
                </div>

                <!-- end search tab -->
              </div>
              <!-- table -->
              <div class="bg-white mt-2 p-1 rounded">
                <table class="user-table table">
                  <tr class="text-secondary bg-light">
                    <th>Club Name</th>
                    <th>School Name</th>
                    <th>Student Leader</th>
                    <th>Teacher</th>
                    <th>Action</th>
                    <!-- <th>Status</th> -->
                  </tr>
                  <tr v-if="clubs.length == 0">
                    <td colspan="6" class="text-center text-danger pt-3">
                      No data found
                    </td>
                  </tr>
                  <tr v-for="(club, index) in clublist" :key="index">
                    <td>{{ club.clubName }}</td>
                    <td>{{ club.schoolName }}</td>
                    <td>{{ club.leaderName }}</td>
                    <td>{{ club.teacherName }}</td>
                    <td>
                      <button
                        @click="setDeleteId(club.clubId)"
                        data-toggle="modal"
                        data-target="#mediumModal"
                      >
                        <span>
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </span>
                      </button>
                      <nuxt-link
                        :to="{
                          path: '/club-edit-form',
                          query: { id: club.clubId },
                        }"
                      >
                        <span class="ml-2 text-dark"
                          ><i class="fas fa-pencil"></i
                        ></span>
                      </nuxt-link>
                    </td>
                    <!-- <td>
                      <div class="d-flex w-100 justify-content-between">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            :id="club.clubId"
                            :value="club.status"
                            v-model="club.status"
                            true-value="active"
                            false-value="inactive"
                            @change="changeStatus(club.clubId, club.status)"
                          />

                          <label
                            class="custom-control-label
                        font-normal
                        color-dark
                        text-14"
                            :for="club.clubId"
                          >
                            <span>
                              {{
                                club.status == "active"
                                  ? "Active"
                                  : "Inactive"
                              }}
                            </span>
                          </label>
                        </div>

                       
                      </div>
                    </td> -->
                     <!-- <nuxt-link
                          :to="{
                            path: '/school-edit-form',
                            query: { id: club.clubId },
                          }"
                        >
                          <span class="ml-2 text-dark"
                            ><i class="fas fa-pencil"></i
                          ></span>
                        </nuxt-link> -->
                  </tr>
                </table>
                <div class="custom-paginate d-flex justify-content-center p-3">
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
                      pageNumValue * selectValue > clubCount
                        ? clubCount
                        : pageNumValue * selectValue
                    }}
                    of {{ clubCount }}
                  </div>

                  <div class="pr-2">clubs per page</div>
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
                    <div class="modal-content h-auto">
                      <div class="modal-header bg-light text-dark">
                        <h3 class="modal-title font-bold" id="mediumModalLabel">
                          Delete
                        </h3>
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
                        <p class="text-left color-dark font-semi-bold">
                          Are you sure you want to delete this item?
                        </p>
                      </div>
                      <div class="modal-footer bg-white text-dark">
                        <button
                          type="button"
                          data-dismiss="modal"
                          class="btn btn-primary color-white"
                          @click="DeleteClubs(1)"
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

              <!-- modal pop up -->
                <div
                  class="modal fade"
                  id="mediumModalStatus"
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
                        <h5 class="modal-title" id="mediumModalStatusLabel">
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
                          Are you sure you want to change the status for this
                          club?
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
              <!-- end table -->
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
  name: "ClubListTable",
  data() {
    return {
      search: "",
      offset: 0,
      limit: selectValue,
      pageTotal: 0,
      paginateCount: 0,
      paginateRange: 0,
      pageNum: 0,
      pageNumValue: 1,
      selectValue: 10,
      clublist: [],
      updateId: 0,
      updateStat: "",
    };
  },
  mounted() {
    this.GetClubList();
    this.pageCount = 10;
  },
  computed: {
    ...mapState("clubListTable", {
      clubs: (state) => state.clubs,
      clubCount: (state) => state.clubCount,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
    }),
  },
  methods: {
    ...mapActions("clubListTable", {
      getClubList: "getClubList", //list the clubs
      fetchClub: "fetchClub", //fetch the club details by id
      deleteClubs: "deleteClubs",
      updateStatus: "updateStatus",
    }),
    async update() {
      await this.updateStatus({
        id: this.updateId,
        status: this.updateStat,
      });
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
      }
      if (this.errorMessage) {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.GetClubList();
    },
    async cancel() {
      this.GetClubList();
    },
    async changeStatus(id, status) {
      $("#mediumModalStatus").modal("show");
      this.updateId = id;
      this.updateStat = status;
    },
    async GetClubList(pageNum = 0) {
      if (pageNum != 0) {
        pageNum = (pageNum - 1) * this.selectValue;
      }
      await this.getClubList({
        search: this.search,
        offset: pageNum,
        limit: this.selectValue,
      });
      //clubs
      this.clublist = [];
      this.clubs.forEach((element) => {
        var clubArray = {};
        var clubName = element.name;
        if (element.schools) {
          var schoolName = element.schools.name;
        }
        if (element.student) {
          var leaderName = element.student.first_name;
        }
        if (element.teacher) {
          var teacherName = element.teacher.first_name;
        }
        var clubId = element.id;
        clubArray["clubName"] = clubName;
        clubArray["schoolName"] = schoolName;
        clubArray["leaderName"] = leaderName;
        clubArray["teacherName"] = teacherName;
        clubArray["clubId"] = clubId;
        clubArray["status"] = element.status;
        this.clublist.push(clubArray);
      });

      this.paginateCount = pageNum;
      this.paginateRange = Math.ceil(this.clubCount / this.selectValue);
      this.totalPage();
    },
    clickCallback(pageNum) {
      this.GetClubList(pageNum);
      this.pageNumValue = pageNum;
    },
    totalPage() {
      this.pageTotal = Math.ceil(this.clubCount / this.selectValue);
    },
    selectvaluechange(event) {
      this.selectValue = event.target.value;
      this.GetClubList();
    },

    setDeleteId(deleteiD) {
      deleteID = deleteiD;
    },
    async DeleteClubs(type) {
      await this.deleteClubs({
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
          this.GetClubList(this.paginateCount);
        }
      }
    },
  },
};
</script>

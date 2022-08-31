<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div class="main-section">
      <!-- tab for club info -->
      <div
        class="
          jochi-components-light-bg
          custom-margin-for-main-section custom-full-height
          d-flex
          flex-column
        "
      >
        <!-- end tab for club info -->

        <!-- Club info -->
        <div class="cd-cover-pic-section position-relative">
          <div class="black-grad"></div>
          <div
            class="
              position-absolute
              cover-button
              mr-3
              mb-1
              d-flex
              align-items-center
            "
          >
            <button class="d-none btn p-1 m-2">
              <i class="fas fa-pen color-white"></i>
            </button>
            <!-- <div class="d-flex align-items-center">
              <button class="btn p-1 m-2">
                <i class="fas fa-info-circle color-white"></i>
              </button>
              <p class="mb-0 color-secondary text-14 font-regular">1200 X 180</p>
            </div> -->
            <button
              class="d-none btn p-0 tooltip01 right-tip"
              CustomTitle="1200 X 180"
            >
              <i class="fas fa-info-circle color-white"></i>
            </button>
          </div>
        </div>

        <section id="club-detail" class="custom-height-for-club-detail-section h-40 flex-fill">
          <div class="club-section container-fluid h-100">
            <div
              class="
                inner-club
                club-info
                d-flex
                flex-column
                justify-content-top
                container-fluid
                pr-3
                py-0
                pl-0
                custom-overflow
                h-100
              "
            >
              <div class="info-head my-2 mt-4">
                <div
                  class="d-flex align-items-center justify-content-between mb-3"
                >
                  <h3 class="color-primary font-semi-bold mb-1">
                    Club Details
                  </h3>

                  <a
                    href="#"
                    class="btn btn-primary py-1"
                    @click="JoinClub()"
                    >{{ userType == 3 ? "Join Now" : "Join As Leader" }}</a
                  >
                </div>
              </div>
              <div class="inner-info">
                <div
                  class="row mx-3"
                  v-for="(list, index) in list_data"
                  :key="index"
                >
                  <div
                    v-if="index == 0"
                    class="col-md-6 col-xs-12 pr-0 pl-3 py-12"
                  >
                    <div class="inner-info-head mb-2">
                      <h4 class="color-dark mb-2 font-bold">
                        About the {{ headingName }}
                      </h4>
                    </div>
                    <p
                      v-if="!editDescription"
                      class="mb-2 text-14 color-secondary"
                    >
                      {{ clubDetails.description }}
                      <span
                        v-if="enableEdit"
                        class="ml-2 text-dark"
                        @click="editDescription = true"
                        ><i class="fas fa-pencil"></i
                      ></span>
                    </p>

                    <div v-if="editDescription" class="form-group mb-1">
                      <button @click="editDescription = false" class="close">
                        <span
                          @click="editDescription = false"
                          aria-hidden="true"
                          >&times;</span
                        >
                      </button>
                      <textarea
                        placeholder="No data"
                        class="form-control club-info mb-0 w-75 input"
                        id=""
                        rows="5"
                        v-model="clubDetails.description"
                        maxlength="500"
                      ></textarea>

                      <button
                        href=""
                        class="
                          btn btn-info-edit
                          custom-theme-color-btn
                          pl-4
                          pr-4
                          mb-0
                          button
                        "
                        v-if="enableEdit"
                        :disabled="!clubDetails.description"
                        @click.prevent="
                          Editinformation(clubId, clubDetails.description)
                        "
                      >
                        Update
                      </button>
                    </div>
                    <!-- <div class="custom-switch pb-2" v-if="enableEdit">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="custom-Switches"
                        v-model="availability"
                        @change="ShowClubInCatalog()"
                        v-on:click="availabilityToggle()"
                      />
                      <label class="custom-control-label
                        font-normal
                        color-dark
                        text-14" for="custom-Switches"
                        >Show club in catalog
                      </label>
                    </div> -->
                  </div>

                  <div v-if="index == 0" class="col-md-6 col-xs-12 px-0 py-12">
                    <div class="row">
                      <div class="col-12 inner-col text-right py-12">
                        <div class="inner-info-head mb-3">
                          <h4 class="color-dark mb-2 font-bold">Leaders</h4>
                        </div>
                        <div class="row justify-content-end">
                          <div class="col-10 col-lg-8">
                            <div class="inner-info-text">
                              <ul class="mb-0 leader-list-style">
                                <li
                                  v-for="(data, index) in leadersInfo"
                                  :key="index"
                                >
                                  <!-- <span class="input-name">{{ data }}</span> -->
                                  <div
                                    v-if="index < 2"
                                    class="
                                      d-flex
                                      align-items-center
                                      justify-content-end
                                      mt-2
                                    "
                                  >
                                    <div
                                      class="
                                        col-3
                                        d-flex
                                        justify-content-end
                                        p-0
                                      "
                                    >
                                      <div class="ld-img-section">
                                        <div class="ld-img-holder">
                                          <img
                                            v-if="data.user_info.profile_pic"
                                            :src="data.user_info.profile_pic"
                                            alt=""
                                          />
                                          <span v-else>{{
                                            data.user_info.first_name.charAt(0)
                                          }}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-9 p-0">
                                      <div class="ld-details-section">
                                        <p
                                          class="
                                            mb-1
                                            color-dark
                                            text-18
                                            font-semi-bold
                                          "
                                        >
                                          {{
                                            data.user_info.first_name +
                                            (data.user_info.last_name
                                              ? " " + data.user_info.last_name
                                              : "")
                                          }},
                                          {{
                                            data.user_info.user_type_id == 3
                                              ? "Student"
                                              : "Teacher"
                                          }}
                                        </p>
                                        <p
                                          class="
                                            text-16
                                            color-secondary
                                            mb-0
                                            text-truncate
                                          "
                                        >
                                          {{ data.user_info.email }}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <button 
                                  v-if="leadersInfo.length >= 3"
                                  @click="openViewMoreMembers(true)"
                                  class="btn btn-void mt-3 py-1 px-0"> 
                                  <span class="font-semi-bold mr-1">
                                    View More</span>
                                  <span class="more-icon"><i class="fas fa-chevron-right"></i> </span>
                                </button>

                                <!-- <li
                                  v-for="(leader, index) in list.todoLeader"
                                  :key="index"
                                >
                                  <span class="input-name">{{ leader }}</span>
                                  <span
                                    class="input-icon"
                                    v-if="enableEdit"
                                    @click.prevent="RemoveLeader(leader)"
                                  >
                                    <i class="fa fa-times p-1" aria-hidden="true"></i
                                  ></span> 
                                </li> -->
                                <!-- list.todoArr.length == 0 && -->
                                <li
                                  v-if="!leadersInfo || leadersInfo.length == 0"
                                >
                                  <span
                                    class="color-secondary font-regular text-14"
                                    >No data</span
                                  >
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-12 text-right inner-col py-12"
                        v-if="enableEdit"
                      >
                        <div class="inner-info-head mb-3">
                          <h4 class="color-dark mb-2 font-bold">Add Leaders</h4>
                        </div>

                        <div
                          class="
                            form-row
                            m-0
                            d-flex
                            align-items-center
                            justify-content-end
                          "
                        >
                          <!-- <multiselect
                              v-model="value"
                              :options="taglist"
                              track-by="name"
                              label="name"
                              placeholder="Select a tag"
                              @input="EditTag"
                            >
                              <span slot="noResult">No data found</span>
                            </multiselect> -->
                          <!-- <multiselect
                            v-model="value"
                            deselect-label="Can't remove this value"
                            track-by="name"
                            label="name"
                            placeholder="Select one"
                            :options="options"
                            :searchable="false"
                            :allow-empty="false"
                          >
                            <template slot="singleLabel" slot-scope="{ option }"
                              ><strong>{{ option.name }}</strong> is written
                              in<strong>
                                {{ option.language }}</strong
                              ></template
                            >
                          </multiselect> -->
                          <multiselect
                            v-model="leaderUpdate"
                            :options="students"
                            track-by="first_name"
                            label="first_name"
                            placeholder="
                              Select students
                            "
                          >
                            <!-- <span slot="maxElements"
                              >Maximum of 4 students selected</span
                            > -->
                            <span slot="color-secondary text-14 font-regular"
                              >No data found</span
                            >
                          </multiselect>
                          <span class="input-icon custom-search-icon"
                            ><i class="fa fa-search" aria-hidden="true"></i
                          ></span>
                          <button
                            class="btn btn-info-edit custom-theme-color-btn"
                            :disabled="!leaderUpdate"
                            @click.prevent="addLeader()"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="index == 0" class="col-md-6 col-xs-12 pr-0 pl-3">
                    <div class="inner-info-head mb-2 mt-4">
                      <h4 class="color-dark mb-2 font-bold">Members</h4>
                    </div>
                    <div
                      class="
                        members-thumbnail-list
                        d-flex
                        flex-column
                        align-items-center
                        justify-content-start
                        mt-3
                        position-relative
                      "
                    >
                      <div class="first-row">
                        <div class="d-flex align-items-center">
                          <div
                            v-for="index in 4"
                            :key="index"
                            :class="
                              membersInfo[index - 1] &&
                              membersInfo[index - 1].user_info
                                ? 'mlist-thumb-holder'
                                : 'd-none'
                            "
                          >
                            <!-- {{ membersInfo[index].user_info }} -->
                            <img
                              v-if="
                                membersInfo[index - 1] &&
                                membersInfo[index - 1].user_info &&
                                membersInfo[index - 1].user_info.profile_pic
                              "
                              :src="
                                membersInfo[index - 1].user_info.profile_pic
                              "
                              alt=""
                            />
                            <span v-else>{{
                              membersInfo[index - 1] &&
                              membersInfo[index - 1].user_info
                                ? membersInfo[
                                    index - 1
                                  ].user_info.first_name.charAt(0)
                                : ""
                            }}</span>
                          </div>
                          <!-- <div class="mlist-thumb-holder"></div>
                          <div class="mlist-thumb-holder"></div>
                          <div class="mlist-thumb-holder"></div> -->
                        </div>
                      </div>
                      <div v-if="membersInfo.length > 4" class="second-row">
                        <div class="d-flex align-items-center">
                          <div
                            v-for="index in 3"
                            :key="index"
                            :class="
                              membersInfo[index + 3] &&
                              membersInfo[index + 3].user_info
                                ? 'mlist-thumb-holder'
                                : 'd-none'
                            "
                          >
                            <img
                              v-if="
                                membersInfo[index + 3] &&
                                membersInfo[index + 3].user_info.profile_pic
                              "
                              :src="
                                membersInfo[index + 3].user_info.profile_pic
                              "
                              alt=""
                            />
                          </div>
                          <!-- <div class="mlist-thumb-holder"></div>
                          <div class="mlist-thumb-holder"></div> -->
                        </div>
                      </div>
                      <div
                        v-if="membersInfo.length > 7"
                        class="ml-list-more position-absolute"
                        @click="openViewMoreMembers(false)"
                      >
                        7+
                      </div>
                    </div>
                  </div>

                  <div v-if="index == 0" class="col-md-6 col-xs-12 px-0">
                    <div class="row">
                      <div class="col-12 inner-col text-right py-12">
                        <div class="inner-info-head mb-3">
                          <h4 class="color-dark mb-2 font-bold">Tags</h4>
                        </div>
                        <div class="row justify-content-end">
                          <div class="col-10 col-lg-8 info-tag pr-0">
                            <div class="input-group mb-0 justify-content-end">
                              
                              <!-- input-icon-area
                              py-1
                              px-4
                              mb-2
                              mr-2
                              custom-club-details-tag-bg -->
                              <div
                                class="
                                  px-4
                                  py-1
                                  ml-1 
                                  mb-1
                                  rounded-6
                                  color-white
                                  d-flex
                                  justify-content-center
                                  min-w-100
                                  text-14
                                  bg-theme
                                  align-items-center
                                "
                                v-for="(value, index) in list.taglists"
                                :key="index"
                                
                                :style="{
                                  'background-color': tagColorMap[value.name]
                                    ? tagColorMap[value.name]
                                    : red,
                                }"
                              >
                                <!-- <span
                                  type="text"
                                  :style="{
                                    'background-color': tagColorMap[value.name],
                                  }"
                                  class="pl"
                                  >{{ value.name }}</span
                                > -->
                                <span
                                  class=""
                                  >{{ value.name }}</span
                                >
                                <span
                                  class="input-icon"
                                  v-if="enableEdit"
                                  @click.prevent="RemoveTag(value.id)"
                                  ><i
                                    class="fa fa-times p-1"
                                    aria-hidden="true"
                                  ></i
                                ></span>
                              </div>

                              <!-- <li
                                class="to-do-li"
                                :style="{
                                  'background-color': tagColorMap[todos],
                                }"
                              >
                                {{ todos }}
                              </li> -->
                              <div
                                class="input-icon-area mb-2 mr-2"
                                v-if="list.taglists.length == 0"
                              >
                                <input
                                  type="text"
                                  class="color-secondary text-14 font-regular"
                                />
                                <span
                                  class="
                                    color-secondary
                                    text-14
                                    font-normal
                                    text-nowrap
                                  "
                                  >No data</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-12 text-right inner-col"
                        v-if="enableEdit"
                      >
                        <div class="inner-info-head mb-3">
                          <h4 class="color-dark mb-2 font-bold">Add Tags</h4>
                        </div>
                        <div
                          class="d-flex align-items-center justify-content-end"
                        >
                          <div class="input-icon-area col-6 pr-0">
                            <multiselect
                              v-model="value"
                              :options="taglist"
                              track-by="name"
                              label="name"
                              placeholder="Select a tag"
                              @input="EditTag"
                            >
                              <span
                                slot="color-secondary font-regular text-14"
                              ></span>
                              <span class="color-secondary text-14 font-normal"
                                >No data found</span
                              >
                            </multiselect>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="list_data.length == 0" class="w-100 text-center py-5">
              <p class="color-secondary font-regular text-14 mb-1">No Data</p>
            </div>
          </div>
        </section>
      </div>
      <!-- End Club info -->
    </div>

    <!-- modal for view members and leaders -->
    <div
      class="modal fade"
      id="viewMoreModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="viewMoreModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header pb-1">
            <h3 class="modal-title" id="viewMoreModalLongTitle">
              View {{ isLeaderView ? "Leaders" : "Members" }}
            </h3>
            <button
              type="button" 
              class="btn btn-close px-1"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body d-flex custom-overflow px-4">
            <!-- leader details -->
            <div v-if="isLeaderView" class="inner-info-text">
              <ul class="mb-0 leader-list-style">
                <li v-for="(data, index) in leadersInfo" :key="index">
                  <!-- <span class="input-name">{{ data }}</span> -->
                  <div
                    class="d-flex align-items-center mt-3"
                  >
                    <div class="d-flex justify-content-end p-0">
                      <div class="ld-img-section mr-2">
                        <div class="ld-img-holder">
                          <img
                            v-if="data.user_info.profile_pic"
                            :src="data.user_info.profile_pic"
                            alt=""
                          />
                          <span v-else>{{
                            data.user_info.first_name.charAt(0)
                          }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="p-0">
                      <div class="ld-details-section">
                        <p class="color-dark mb-1 text-18 font-semi-bold mb-0">
                          {{
                            data.user_info.first_name +
                            (data.user_info.last_name
                              ? " " + data.user_info.last_name
                              : "")
                          }},
                          {{
                            data.user_info.user_type_id == 3
                              ? "Student"
                              : "Teacher"
                          }}
                        </p>
                        <p class="text-16 color-secondary mb-0 text-truncate">
                          {{ data.user_info.email }}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>

                <li v-if="!leadersInfo || leadersInfo.length == 0">
                  <span class="input-name">No data</span>
                </li>
              </ul>
            </div>
            <!-- details end -->

            <!-- member details -->
            <div v-if="!isLeaderView" class="inner-info-text">
              <ul class="mb-0 leader-list-style">
                <li v-for="(data, index) in membersInfo" :key="index">
                  <!-- <span class="input-name">{{ data }}</span> -->
                  <div class="d-flex align-items-center mt-3">
                    <div class="d-flex justify-content-end p-0">
                      <div class="ld-img-section mr-3">
                        <div class="ld-img-holder">
                          <img
                            v-if="data.user_info.profile_pic"
                            :src="data.user_info.profile_pic"
                            alt=""
                          />
                          <span v-else>{{
                            data.user_info.first_name.charAt(0)
                          }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="p-0">
                      <div class="ld-details-section">
                        <p class="mb-0 color-dark text-18 font-semi-bold">
                          {{
                            data.user_info.first_name +
                            (data.user_info.last_name
                              ? " " + data.user_info.last_name
                              : "")
                          }},
                          {{
                            data.user_info.user_type_id == 3
                              ? "Student"
                              : "Teacher"
                          }}
                        </p>
                        <p class="text-16 color-secondary mb-0 text-truncate">
                          {{ data.user_info.email }}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>

                <li v-if="!membersInfo || membersInfo.length == 0">
                  <span class="input-name">No data</span>
                </li>
              </ul>
            </div>
            <!-- details end -->
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
    <!--  modal for view members and leaders -->
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import Multiselect from "vue-multiselect";
var headingName = "";
var clubId = "";
var list_data = [];
var statusValue = "";
export default {
  name: "UserStudentClubView",
  components: {
    lottie,
    Multiselect,
  },
  data() {
    return {
      value: [],
      valueMeeting: "",
      name: "",
      student: "",
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      headingName: this.$route.query.name,
      clubId: this.$route.query.id,
      type: this.$route.query.type,
      list_data: [],
      tagValue: [],
      availability: "",
      activity_type: "",
      editDescription: false,
      clubDetails: {},
      leadersInfo: {},
      membersInfo: {},
      dayList: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      dateArray: [],
      dayArrVal: [],
      daysArray: [],
      selectedStudents: [],
      leaderUpdate: {},
      isLeaderView: false,
      tagColorMap: {},
      userType: 0,
    };
  },

  mounted() {
    this.userType = localStorage.getItem("user_type");
    this.getClubMoreInfo();
    this.SlotswithId();
    // load students for add leader
    this.GetStudents();

    // if (user == 3) {
    this.ClubInfo();
    this.GetTag();
    // } else {
    //   this.$router.push("/");
    // }
  },
  computed: {
    ...mapState("clubInfo", {
      enableEdit: (state) => state.enableEdit,
      allList: (state) => state.allList,
      taglist: (state) => state.taglist,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
    ...mapState("clubMoreInfo", {
      clubMoreDetails: (state) => state.clubMoreDetails,
      slots: (state) => state.slots,
      successMessageClub: (state) => state.successMessage,
      SuccessTypeClub: (state) => state.SuccessType,
      errorMessageClub: (state) => state.errorMessage,
      errorTypeClub: (state) => state.errorType,
    }),
    ...mapState("teacherMeeting", {
      students: (state) => state.students,
      successMessageTeacher: (state) => state.successMessage,
    }),
  },
  methods: {
    ...mapActions("clubInfo", {
      clubInfo: "clubInfo",
      editinformation: "editinformation",
      getTagList: "getTagList",
      editTag: "editTag",
      showClubInCatalog: "showClubInCatalog",
      removeLeader: "removeLeader",
      removeTag: "removeTag",
      addStudentLeader: "addStudentLeader",
    }),
    ...mapActions("clubMoreInfo", {
      clubMoreInfo: "clubMoreInfo",
      updateTime: "updateTime",
      slotswithId: "slotswithId",
      joinClub: "joinClub",
    }),
    ...mapActions("teacherMeeting", {
      getStudents: "getStudents",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async getClubMoreInfo() {
      await this.clubMoreInfo({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
      });
    },
    async UpdateTime() {
      this.dayArrVal = [];
      let activeElements = document.getElementsByClassName(
        "badge badge-pill badge-color active"
      );
      let tempArray = [];
      Array.prototype.forEach.call(activeElements, function (element) {
        tempArray.push(element.id);
      });
      this.dayArrVal = tempArray;
      this.loading = true;
      await this.updateTime({
        club_id: this.clubId,
        user_id: localStorage.getItem("id"),
        week: this.dayArrVal,
        slot_id: this.valueId,
      });

      this.loading = false;
      if (this.successMessageClub != "") {
        $("#nextMeetingModal").modal("hide");
        this.$toast.open({
          message: this.successMessageClub,
          type: this.SuccessTypeClub,
          duration: 5000,
        });
        this.getClubMoreInfo();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.valueMeeting = "";
    },
    async SlotswithId() {
      await this.slotswithId({});
    },
    UpdateDays(value) {
      this.daysArray.push(value);
      this.dayArrVal = [];
      this.daysArray.forEach((element) => {
        this.dayArrVal.push(element);
      });
    },
    checkSlot(day) {
      if (this.dateArray.includes(day)) {
        return true;
      } else {
        return false;
      }
    },
    UpdateSlots(val) {
      this.valueId = val.id;
    },
    async GetTag() {
      await this.getTagList({
        club_id: this.$route.query.id,
      });
    },
    // generate random tag colours
    generateRandomColor() {
      this.tagColorMap = {};
      const obj = {};
      this.list_data.forEach((e) => {
        if (e.taglists && e.taglists.length > 0) {
          e.taglists.forEach((tag) => {
            // let index = this.tagColorMap.find((index) => index.tag == tag);
            if (!this.tagColorMap[tag.name]) {
              let color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
              const key = tag.name;

              obj[key] = color;
            }
          });
          this.tagColorMap = obj;
        }
      });
    },
    async ShowClubInCatalog() {
      this.loading = true;
      await this.showClubInCatalog({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
        status: this.availability ? "active" : "inactive",
      });
      this.loading = false;

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
      this.ClubInfo();
    },

    async ClubInfo() {
      this.loading = true;
      await this.clubInfo({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
      });
      this.activity_type = this.allList[0].activity_type;
      this.loading = false;
      this.list_data = [];
      this.clubDetails = this.allList[0];
      this.leadersInfo = this.allList[1].Leaders_info;
      this.membersInfo = this.allList[2].Members_info;
      this.allList.forEach((element) => {
        var Scheduleobj = {};
        statusValue = element.status_by_leader;
        var description = element.description;
        var new_leader = element.student_leaders;
        if (new_leader) {
          var newLeader = new_leader.split(",");
        }
        var leader = element.leaders_names;
        if (leader) {
          var leaders = leader.split(",");
        }
        var todoLeader = [];
        var todoArr = [];
        var taglists = [];
        Scheduleobj["description"] = description;
        Scheduleobj["leaders"] = leaders;
        Scheduleobj["newLeader"] = newLeader;
        element["tag_details"]?.forEach((el) => {
          var ScheduleArr = {};
          ScheduleArr["name"] = el.tags.name;
          ScheduleArr["id"] = el.tags.id;
          taglists.push(ScheduleArr);
        });
        if (leaders) {
          leaders.forEach((ele) => {
            todoArr.push(ele);
          });
        }
        if (new_leader) {
          newLeader.forEach((elements) => {
            todoLeader.push(elements);
          });
        }

        Scheduleobj["todoLeader"] = todoLeader;
        Scheduleobj["todoArr"] = todoArr;
        Scheduleobj["taglists"] = taglists;
        this.list_data.push(Scheduleobj);
        // this.taglist = this.taglist.filter( ( el ) => !this.list_data.includes( el ) );
      });
      this.generateRandomColor();

      if (statusValue == "active") {
        this.availability = true;
      } else {
        this.availability = false;
      }
    },
    async Editinformation(value, des) {
      this.loading = true;
      if (this.student) {
        await this.editinformation({
          user_id: localStorage.getItem("id"),
          club_id: value,
          student_leaders: this.student,
        });
      } else {
        await this.editinformation({
          user_id: localStorage.getItem("id"),
          club_id: value,
          description: des,
        });
      }

      this.loading = false;
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.editDescription = false;
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.student = "";
      this.ClubInfo();
    },
    async EditTag(val) {
      this.loading = true;
      if (val) {
        this.tagValue = val.id;
      }
      await this.editTag({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
        tags: this.tagValue,
      });
      this.loading = false;
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.value = "";
        this.GetTag();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }

      this.ClubInfo();
    },
    async RemoveLeader(val) {
      await this.removeLeader({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
        name: val,
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
      this.ClubInfo();
    },
    async RemoveTag(val) {
      await this.removeTag({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
        tag_id: val,
      });
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.GetTag();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.ClubInfo();
    },
    availabilityToggle() {},
    check() {
      this.editDescription = true;
    },
    onNextMeeting() {
      if (this.enableEdit) {
        $("#nextMeetingModal").modal();
      }
    },
    // adding student leader
    async GetStudents() {
      await this.getStudents({
        school_id: localStorage.getItem("school_id"),
        studentId: localStorage.getItem("id"),
      });
    },
    async addLeader() {
      await this.addStudentLeader({
        club_id: this.$route.query.id,
        user_id: this.leaderUpdate ? this.leaderUpdate.id : "",
      });
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.leaderUpdate = "";
        this.ClubInfo();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
    },
    // view more members modal open
    openViewMoreMembers(isLeader) {
      this.isLeaderView = isLeader;
      $("#viewMoreModal").modal({ backdrop: true });
    },
    // join to the club as member
    async JoinClub() {
      this.loading = true;
      await this.joinClub({
        club_id: this.clubId,
        user_id: localStorage.getItem("id"),
      });

      if (this.successMessageClub != "") {
        this.$toast.open({
          message: this.successMessageClub,
          type: this.SuccessType,
          duration: 5000,
        });
        this.$router.push({
          path: "/club-info",
          query: { id: this.clubId, name: this.headingName },
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
  },
};
</script>
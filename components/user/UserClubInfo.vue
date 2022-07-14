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
        "
      >
        <!-- end tab for club info -->

        <!-- Club info -->
        <div class="cd-cover-pic-section">
          <div class="black-grad"></div>
        </div>

        <section id="club-detail" class="custom-height-for-club-detail-section">
          <div class="club-section container-fluid mt-2">
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
              "
            >
              <div class="info-head my-2">
                <h3 class="mb-1">Club Details</h3>
              </div>
              <div class="inner-info">
                <div
                  class="row mx-3"
                  v-for="(list, index) in list_data"
                  :key="index"
                >
                  <div v-if="index == 0" class="col-md-6 col-xs-12 pr-0 pl-3">
                    <div class="inner-info-head mb-2">
                      <h5>About the {{ headingName }}</h5>
                    </div>
                    <p
                      v-if="!editDescription"
                      class="mb-2 cd-about-club-details"
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
                      <label class="custom-control-label" for="custom-Switches"
                        >Show club in catalog
                      </label>
                    </div> -->
                    <div class="inner-info-head mb-2 mt-4">
                      <h5>Members</h5>
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
                                membersInfo[index - 1].user_info
                                  .proPic_file_name
                              "
                              :src="
                                membersInfo[index - 1].user_info
                                  .proPic_file_name
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
                            class="mlist-thumb-holder"
                          >
                            <img
                              v-if="
                                membersInfo[index + 3] &&
                                membersInfo[index + 3].user_info
                                  .proPic_file_name
                              "
                              :src="
                                membersInfo[index + 3].user_info
                                  .proPic_file_name
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
                      >
                        7+
                      </div>
                    </div>
                  </div>
                  <div v-if="index == 0" class="col-md-6 col-xs-12 px-0">
                    <div class="row">
                      <div class="col-12 inner-col text-right">
                        <div class="inner-info-head mb-3">
                          <h5>Leaders</h5>
                        </div>
                        <div class="row">
                          <div class="col-4"></div>
                          <div class="col-8">
                            <div class="inner-info-text">
                              <ul class="mb-0 leader-list-style">
                                <li
                                  v-for="(data, index) in leadersInfo"
                                  :key="index"
                                >
                                  <!-- <span class="input-name">{{ data }}</span> -->
                                  <div
                                    class="
                                      d-flex
                                      align-items-center
                                      justify-content-end
                                      mt-2
                                    "
                                  >
                                    <div
                                      class="
                                        col-4
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
                                    <div class="col-8 p-0">
                                      <div class="ld-details-section">
                                        <p class="ld-heading mb-1">
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
                                        <p class="ld-details mb-0">
                                          {{ data.user_info.email }}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </li>

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
                                <li
                                  v-if="
                                    list.todoArr.length == 0 &&
                                    list.todoLeader.length == 0
                                  "
                                >
                                  <span class="input-name">No data</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-12 text-right inner-col"
                        v-if="enableEdit"
                      >
                        <div class="inner-info-head mb-3">
                          <h5>Add Leaders</h5>
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
                          <input
                            type="text"
                            class="form-control col-6"
                            v-model="student"
                            maxlength="20"
                          />
                          <button
                            class="btn btn-info-edit custom-theme-color-btn"
                            :disabled="!student"
                            @click.prevent="Editinformation(clubId)"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 inner-col text-right">
                        <div class="inner-info-head mb-3">
                          <h5>Tags</h5>
                        </div>
                        <div class="row">
                          <div class="col-6"></div>
                          <div class="col-6 info-tag pr-0">
                            <div class="input-group mb-0 justify-content-end">
                              <div
                                class="
                                  input-icon-area
                                  py-1
                                  px-4
                                  mb-2
                                  mr-2
                                  custom-club-details-tag-bg
                                "
                                v-for="(value, index) in list.taglists"
                                :key="index"
                              >
                                <input type="text" class="pl" hidden />{{
                                  value.name
                                }}
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
                              <div
                                class="input-icon-area mb-2 mr-2"
                                v-if="list.taglists.length == 0"
                              >
                                <input type="text" class="pl" />No data
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
                          <h5>Add Tags</h5>
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
                              <span slot="noResult">No data found</span>
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
              <p class="no-data">No Data</p>
            </div>
          </div>
        </section>

        <section id="tab" class="">
          <div class="info-tab container-fluid mt-3">
            <div class="row tab-row mt-2">
              <div class="col-md-4 col-xs-12">
                <nuxt-link
                  :to="{
                    path: '/club-moreInfo',
                    query: {
                      id: clubId,
                      name: headingName,
                      type: clubDetails.activity_type,
                    },
                  }"
                  class="inner-tab"
                >
                  <!-- <i class="fas fa-info"></i> -->
                  <span class="pl">Home Page</span>
                </nuxt-link>
              </div>
              <div class="col-md-4 col-xs-12">
                <nuxt-link
                  :to="{
                    path: '/club-files',
                    query: { id: clubId, name: headingName },
                  }"
                  class="inner-tab"
                >
                  <!-- <i class="fas fa-file-alt"></i> -->
                  <span class="pl">Files & Slides</span>
                </nuxt-link>
              </div>
              <div @click="onNextMeeting" class="col-md-4 col-xs-12">
                <!-- <nuxt-link
                  :to="{
                    path: '/club-moreInfo',
                    query: {
                      id: clubId,
                      name: headingName,
                      type: activity_type,
                    },
                  }"
                  class="inner-tab"
                > -->
                <!-- <i class="fas fa-ellipsis-h"></i> -->
                <!-- <span class="pl">More</span> -->
                <span class="pl">Next Meeting</span>
                <span style="color: black">{{
                  clubMoreDetails.announcement
                }}</span>
                <!-- </nuxt-link> -->
              </div>
            </div>
          </div>
        </section>
      </div>
      <!-- End Club info -->
    </div>
    <!-- modal for add next meeting -->
    <div
      class="modal fade"
      id="nextMeetingModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="nextMeetingModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="nextMeetingModalLongTitle">
              Configure Meeting Days
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
            <!-- <div class="col-md-5 col-xs-12"> -->
            <div class="inner-info container p-4">
              <div class="inner-info-head mb-3">
                <h6>Meeting Time</h6>
              </div>
              <p class="time">
                Next meeting:
                {{
                  clubMoreDetails.announcement == null
                    ? "No meeting scheduled "
                    : clubMoreDetails.announcement
                }}
              </p>

              <div class="row inner-col" v-if="enableEdit">
                <div class="col-lg-4 col-md-12 inner-info-head">
                  <h6>Choose time</h6>
                </div>
                <div class="col-lg-8 col-md-12 input-icon-area">
                  <multiselect
                    v-model="valueMeeting"
                    track-by="start_time"
                    label="start_time"
                    placeholder="Select the time"
                    :options="slots"
                    @input="UpdateSlots"
                  >
                    <span slot="noResult">No data found</span>
                  </multiselect>
                </div>
              </div>

              <div class="row choose-date my-2 m-0 p-0">
                <div
                  class="col"
                  v-for="(day, index) in dayList"
                  :key="index"
                  @click.prevent="
                    UpdateDays(day);
                    $event.target.classList.toggle('active');
                  "
                >
                  <a
                    class="btn date-picker badge badge-pill badge-color active"
                    :id="day"
                    v-if="checkSlot(day)"
                    >{{ day }}</a
                  >
                  <a
                    href=""
                    class="btn date-picker badge badge-pill badge-color"
                    :id="day"
                    v-else
                    >{{ day }}</a
                  >
                </div>
              </div>
              <!-- <button
                v-if="enableEdit"
                class="btn btn-info-edit mt-2"
                :disabled="!value"
                @click.prevent="UpdateTime"
              >
                Update the next meeting
              </button> -->
            </div>
            <!-- </div> -->
          </div>
          <div class="modal-footer">
            <!-- <button
              type="button"
              class="btn btn-color-close"
              data-dismiss="modal"
            >
              Cancel
            </button> -->
            <button
              v-if="enableEdit"
              class="btn btn-info-edit mt-2"
              :disabled="!valueMeeting"
              @click.prevent="UpdateTime"
            >
              Update the next meeting
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal add assignment -->
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
  name: "UserClubInfo",
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
    };
  },

  mounted() {
    var user = localStorage.getItem("user_type");
    this.getClubMoreInfo();
    this.SlotswithId();

    if (user == 3) {
      this.ClubInfo();
      this.GetTag();
    } else {
      this.$router.push("/");
    }
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
    }),
    ...mapActions("clubMoreInfo", {
      clubMoreInfo: "clubMoreInfo",
      updateTime: "updateTime",
      slotswithId: "slotswithId",
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
      alert("inside alert");
    },
    onNextMeeting() {
      if (this.enableEdit) {
        $("#nextMeetingModal").modal();
      }
    },
  },
};
</script>
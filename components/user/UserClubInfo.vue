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
                  <div class="col-md-6 col-xs-12 pr-0 pl-3">
                    <div class="inner-info-head mb-2">
                      <h5>About the {{ headingName }}</h5>
                    </div>
                    <p class="mb-2 cd-about-club-details">
                      The Drama Club is our school’s premier performing arts
                      groups. Opportunities for students interested in drama,
                      technology, singing and more!
                    </p>
                    <div class="form-group mb-1">
                      <textarea
                        placeholder="No data"
                        class="form-control club-info mb-0 w-75 input"
                        id=""
                        rows="5"
                        v-model="list.description"
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
                        :disabled="!list.description"
                        @click.prevent="
                          Editinformation(clubId, list.description)
                        "
                      >
                        Update
                      </button>
                    </div>
                    <div class="custom-switch pb-2" v-if="enableEdit">
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
                    </div>
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
                          <div class="mlist-thumb-holder"></div>
                          <div class="mlist-thumb-holder"></div>
                          <div class="mlist-thumb-holder"></div>
                          <div class="mlist-thumb-holder"></div>
                        </div>
                      </div>
                      <div class="second-row">
                        <div class="d-flex align-items-center">
                          <div class="mlist-thumb-holder"></div>
                          <div class="mlist-thumb-holder"></div>
                          <div class="mlist-thumb-holder"></div>
                        </div>
                      </div>
                      <div class="ml-list-more position-absolute">17+</div>
                    </div>
                  </div>
                  <div class="col-md-6 col-xs-12 px-0">
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
                                  v-for="(data, index) in list.todoArr"
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
                                        <div class="ld-img-holder"></div>
                                      </div>
                                    </div>
                                    <div class="col-8 p-0">
                                      <div class="ld-details-section">
                                        <p class="ld-heading mb-1">
                                          {{ data }}, President
                                        </p>
                                        <p class="ld-details mb-0">
                                          markjones@school.edu
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
                    path: '/club-info',
                    query: { id: clubId, name: headingName },
                  }"
                  class="inner-tab"
                >
                  <!-- <i class="fas fa-info"></i> -->
                  <span class="pl">Club Details</span>
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
              <div class="col-md-4 col-xs-12">
                <nuxt-link
                  :to="{
                    path: '/club-moreInfo',
                    query: { id: clubId, name: headingName, type: 'club' },
                  }"
                  class="inner-tab"
                >
                  <!-- <i class="fas fa-ellipsis-h"></i> -->
                  <span class="pl">More</span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <!-- End Club info -->
    </div>
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
    };
  },

  mounted() {
    var user = localStorage.getItem("user_type");
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
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async GetTag() {
      await this.getTagList({
        club_id: this.$route.query.id,
      });
      console.log(this.taglist);
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
      this.loading = false;
      this.list_data = [];
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
        element["tag_details"].forEach((el) => {
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
  },
};
</script>
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

      <section id="tab" class="">
        <div class="info-tab container-fluid mt-3">
          <div class="row tab-row mt-2">
            <div class="col-md-4 col-xs-12">
              <nuxt-link
                :to="{
                  path: '/user-club-info',
                  query: { id: clubId, name: headingName },
                }"
              >
                <div class="inner-tab">
                  <i class="fas fa-info"></i><span class="pl">Info</span>
                </div>
              </nuxt-link>
              <button class="btn p-1 m-2" CustomTitle="1200 X 180">
                <i class="fas fa-cog color-white"></i>
              </button>
            </div>
            <div class="col-md-4 col-xs-12">
              <nuxt-link
                :to="{
                  path: '/user-club-files',
                  query: { id: clubId, name: headingName },
                }"
              >
                <div class="inner-tab">
                  <i class="fas fa-file-alt"></i
                  ><span class="pl">Files/Slides</span>
                </div>
              </nuxt-link>
            </div>
            <div class="col-md-4 col-xs-12">
              <nuxt-link
                :to="{
                  path: '/user-club-moreInfo',
                  query: { id: clubId, name: headingName },
                }"
              >
                <div class="inner-tab">
                  <i class="fas fa-ellipsis-h"></i><span class="pl">More</span>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>

      <!-- end tab for club info -->

      <!-- Club info -->

      <section id="club-detail" class="">
        <div class="club-section container-fluid mt-2">
          <div class="inner-club container-fluid p-3">
            <div class="info-head my-2">
              <h5 class="mb-3">{{ headingName }}</h5>
            </div>
            <div class="inner-info">
              <div
                class="row mx-3"
                v-for="(list, index) in list_data"
                :key="index"
              >
                <div class="col-md-6 col-xs-12 px-0">
                  <div class="inner-info-head mb-3">
                    <h6>Club info</h6>
                  </div>
                  <div class="form-group">
                    <textarea
                      placeholder="No data"
                      class="form-control club-info mb-3 w-75 input"
                      id=""
                      rows="5"
                      v-model="list.description"
                      maxlength="500"
                    ></textarea>

                    <button
                      href=""
                      class="btn btn-info-edit pl-4 pr-4 mb-3 button"
                      v-if="enableEdit"
                      :disabled="!list.description"
                      @click.prevent="Editinformation(clubId, list.description)"
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
                    <label
                      class="
                        custom-control-label
                        font-normal
                        color-dark
                        text-14
                      "
                      for="custom-Switches"
                      >Show club in catalog
                    </label>
                  </div>
                </div>
                <div class="col-md-6 col-xs-12 px-0">
                  <div class="row inner-row mt-0">
                    <div class="col-6 inner-col">
                      <div class="inner-info-head mb-3">
                        <h6>Leaders</h6>
                      </div>
                      <div class="inner-info-text">
                        <ul class="mb-0">
                          <li
                            v-for="(data, index) in list.todoArr"
                            :key="index"
                          >
                            <span class="input-name">{{ data }}</span>
                          </li>

                          <li
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
                          </li>
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
                    <div class="col-6 inner-col" v-if="enableEdit">
                      <div class="inner-info-head mb-3">
                        <h6>Add Leaders</h6>
                      </div>

                      <div class="form-row m-0">
                        <input
                          type="text"
                          class="form-control"
                          v-model="student"
                          maxlength="20"
                        />
                        <button
                          class="btn btn-info-edit mt-2"
                          :disabled="!student"
                          @click.prevent="Editinformation(clubId)"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="row inner-row mt-0">
                    <div class="col-6 inner-col">
                      <div class="inner-info-head mb-3">
                        <h6>Tags</h6>
                      </div>
                      <div class="info-tag">
                        <div class="input-group mb-0">
                          <div
                            class="input-icon-area mb-2 mr-2"
                            v-for="(value, index) in list.taglists"
                            :key="index"
                          >
                            <input type="text" class="pl" />{{ value.name }}
                            <span
                              class="input-icon"
                              v-if="enableEdit"
                              @click.prevent="RemoveTag(value.id)"
                              ><i class="fa fa-times p-1" aria-hidden="true"></i
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
                    <div class="col-6 inner-col" v-if="enableEdit">
                      <div class="inner-info-head mb-3">
                        <h6>Add Tags</h6>
                      </div>
                      <div class="input-icon-area">
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
          <div v-if="list_data.length == 0" class="w-100 text-center py-5">
            <p class="no-data">No Data</p>
          </div>
        </div>
      </section>

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
      list_data: [],
      tagValue: [],
      availability: "",
    };
  },

  mounted() {
    var user = localStorage.getItem("user_type");
    if (user == 2) {
      this.ClubInfo();
      this.GetTag();
    } else {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState("teacherClubInfo", {
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
    ...mapActions("teacherClubInfo", {
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
          description: des,
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
<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div class="main-section">
      <!-- tab for club detail -->
      <div
        class="
          jochi-components-light-bg
          p-4
          custom-margin-for-main-section custom-full-height
        "
      >
        <section id="tab" class="">
          <div class="tab-section container-fluid mt-3">
            <h4 class="tab-head">Club details</h4>
            <div class="inner-tab-section container-fluid py-3">
              <div
                class="
                  row
                  m-auto
                  d-flex
                  justify-content-between
                  align-items-center
                "
              >
                <div class="col-md-4">
                  <div class="input-icon-area">
                    <multiselect
                      v-model="value"
                      :options="tags"
                      track-by="name"
                      label="name"
                      placeholder="Filter"
                      @input="filterSelection"
                    >
                      <span slot="noResult">No data found</span>
                    </multiselect>
                    <!-- <span class="input-icon"
                      ><i class="fa fa-filter" aria-hidden="true"></i
                    ></span> -->
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="custom-switch pb-2 float-right">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="custom-Switches"
                      v-model="availability"
                      @change="SyncClub()"
                    />
                    <label class="custom-control-label" for="custom-Switches"
                      >Sync to Planner
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- end tab for club detail -->

        <!-- Club detail -->

        <section id="club-detail" class="">
          <div class="club-section container-fluid mt-2">
            <div class="inner-club club-datail container-fluid py-3">
              <div class="row club-row m-1">
                <div
                  class="col-lg-4 col-md-6 col-sm-12 col-12"
                  v-for="(list, index) in list_data"
                  :key="index"
                >
                  <div class="club-list p-4 position-relative">
                    <div
                      :class="
                        list.activity_type == 'Clubs'
                          ? 'position-absolute club-type-icon club'
                          : 'position-absolute club-type-icon team'
                      "
                    >
                      <img
                        src="../../static/image/Football.png"
                        alt=""
                        class="img-fluid ct-team"
                      />
                      <img
                        src="../../static/image/club-type.png"
                        alt=""
                        class="img-fluid ct-club"
                      />
                    </div>
                    <h6 class="list-title mb-3">{{ list["description"] }}</h6>
                    <div class="to-do-list">
                      <ul>
                        <li v-for="(todos, index) in list.todoArr" :key="index">
                          {{ todos }}
                        </li>
                        <li v-if="list.todoArr.length == 0">
                          No to-do's available
                        </li>
                      </ul>
                    </div>
                    <p class="list-text">
                      Next meeting:
                      {{
                        list.upcoming_meeting
                          ? list.upcoming_meeting
                          : "No Meeting Scheduled"
                      }}
                    </p>
                    <nuxt-link
                      :to="{
                        path:
                          user == 3
                            ? '/club-moreInfo'
                            : '/teacher-club-moreInfo',
                        query: {
                          id: list.id,
                          name: list.description,
                          type: list.activity_type,
                        },
                      }"
                      class="btn btn-sm btn-view-more"
                      >View More</nuxt-link
                    >
                  </div>
                </div>
                <div
                  v-if="list_data.length == 0"
                  class="w-100 text-center py-5"
                >
                  <p class="no-data">No data available</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <!-- End Club detail -->
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Multiselect from "vue-multiselect";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
var SelectValue = "";
var list_data = [];

export default {
  name: "UserClubDetail",
  components: {
    Multiselect,
    lottie,
  },
  data() {
    return {
      list_data: [],
      value: "",
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      todoVal: [],
      availability: "",
      tags: [],
    };
  },
  mounted() {
    var user = localStorage.getItem("user_type");
    // if (user == 3) {
    this.GetTag();
    this.MyClubList();
    // } else {
    // this.$router.push("/");
    // }
  },
  computed: {
    ...mapState("myClub", {
      allList: (state) => state.allList,
      taglist: (state) => state.taglist,
      syncStatus: (state) => state.syncStatus,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("myClub", {
      myClubList: "myClubList",
      getTag: "getTag",
      syncClub: "syncClub",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async SyncClub() {
      this.loading = true;
      await this.syncClub({
        user_id: localStorage.getItem("id"),
        status: this.availability ? "true" : "false",
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
      this.loading = false;
      this.MyClubList();
    },
    async GetTag() {
      await this.getTag({});
      this.tags = [{ createdAt: "", id: "", name: "All", updatedAt: "" }];
      this.tags = this.tags.concat(this.taglist);
      this.value = this.tags[0];
    },
    async MyClubList() {
      this.loading = true;
      await this.myClubList({
        user_id: localStorage.getItem("id"),
        tag_id: SelectValue,
      });
      if (this.syncStatus == "1") {
        this.availability = 1;
      } else if (this.syncStatus == "0") {
        this.availability = 0;
      }
      this.loading = false;
      this.list_data = [];
      this.allList.forEach((element) => {
        var day = element.announcement;
        this.todoVal.push(element.todo);
        var Scheduleobj = {};
        var description = element.name;

        var time = element.start_time;
        var id = element.id;
        var todoArr = [];

        Scheduleobj["description"] = description;
        Scheduleobj["day"] = day;
        Scheduleobj["time"] = time;
        Scheduleobj["id"] = id;
        Scheduleobj["activity_type"] = element.activity_type;

        element.todo.forEach((ele) => {
          todoArr.push(ele.todo_list);
        });
        Scheduleobj["todoArr"] = todoArr;
        Scheduleobj["upcoming_meeting"] = element.upcoming_meeting;
        Scheduleobj["todo"] = element.todo;
        this.list_data.push(Scheduleobj);
      });
    },

    filterSelection(val) {
      if (val && val.id) {
        SelectValue = val.id;
      } else {
        SelectValue = "";
      }
      this.MyClubList();
    },
  },
};
</script>
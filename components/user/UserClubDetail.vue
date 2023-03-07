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
        class="jochi-components-light-bg p-4 custom-margin-for-main-section custom-full-height d-flex flex-column"
      >
        <section id="tab" class="">
          <div class="tab-section container-fluid mt-3">
            <h2
              data-intro="View and manage all of your existing commitments"
              class="tab-head color-primary font-semi-bold"
            >
              Club Details
            </h2>
            <div class="inner-tab-section container-fluid p-0">
              <div
                class="row m-auto px-2 d-flex justify-content-between align-items-center"
              >
                <div
                  data-intro="Filter through your commitments based on different tags"
                  class="col-md-4 px-0"
                >
                  <div class="input-icon-area form-row">
                    <multiselect
                      v-model="value"
                      :options="tags"
                      track-by="name"
                      label="name"
                      placeholder="Filter"
                      @input="filterSelection"
                      class="form-contol"
                    >
                      <span slot="noResult">No data found</span>
                    </multiselect>
                  </div>
                </div>
                <div v-if="user == '3'" class="col-md-4 px-0">
                  <div class="custom-switch pb-2 float-right">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="custom-Switches"
                      v-model="availability"
                      @change="SyncClub()"
                    />
                    <label
                      class="custom-control-label font-normal color-dark text-14"
                      data-intro="Sync your team and club meetings to your planner from here"
                      for="custom-Switches"
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

        <section id="club-detail" class="d-flex flex-column h-40 flex-fill">
          <div
            class="club-section container-fluid mt-2 px-0 d-flex flex-column h-40 flex-fill"
          >
            <div
              class="inner-club club-datail container-fluid p-0 custom-overflow mr--2 pr-2"
            >
              <div class="row club-row m-1">
                <div
                  class="col-lg-4 col-md-6 col-sm-12 col-12 py-12"
                  v-for="(list, index) in list_data"
                  :key="index"
                >
                  <div
                    class="club-list card card-secondary-sm justify-content-between p-4 position-relative h-100"
                  >
                    <div
                      :class="
                        list.activity_type == 'Clubs'
                          ? 'position-absolute club-type-icon club'
                          : 'position-absolute club-type-icon team'
                      "
                    >
                      <img
                        src="../../static/image/Trophy.png"
                        alt=""
                        class="img-fluid ct-team"
                      />
                      <img
                        src="../../static/image/Badge.png"
                        alt=""
                        class="img-fluid ct-club"
                      />
                    </div>
                    <div class="d-flex flex-column">
                      <h5
                        class="list-title mb-3 color-primary font-semi-bold pr-3"
                      >
                        {{ list["description"] }}
                      </h5>
                      <div
                        v-if="list.activity_type == 'Clubs'"
                        class="to-do-list"
                      >
                        <ul class="list-unstyled">
                          <li
                            class="text-12 color-secondary"
                            v-for="(todos, index) in list.todoArr"
                            :key="index"
                          >
                            {{ todos }}
                          </li>
                          <li
                            class="text-14 color-secondary font-regular"
                            v-if="list.todoArr.length == 0"
                          >
                            No to-do's available
                          </li>
                        </ul>
                      </div>
                      <p class="list-text color-secondary text-14 font-regular">
                        Next meeting:
                        {{
                          list.upcoming_meeting
                            ? list.upcoming_meeting
                            : "No Meeting Scheduled"
                        }}
                      </p>
                    </div>
                    <nuxt-link
                      :to="{
                        path: '/club-moreInfo',
                        query: {
                          id: list.id,
                          name: list.description,
                          type: list.activity_type,
                        },
                      }"
                      class="btn btn-sm btn-primary py-1"
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
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/intro.js/6.0.0/introjs.css",
        },
      ],
    };
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
      user: "",
      startTime: null,
    };
  },
  mounted() {
    const page = "ClubExisting";
    const distinct_id = localStorage.getItem("distinctId");
    this.$mixpanel.track("Page View", { distinct_id, page });
    this.startTime = new Date().getTime();

    SelectValue = "";
    this.user = localStorage.getItem("user_type");

    this.GetTag();
    this.MyClubList();
    this.startIntro();
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
    startProductGuide() {
      return this.$store.state.startProductGuide;
    },
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
    startIntro() {
      const intro = this.$intro();
      let completed = false;
      let skip = false;
      if (this.startProductGuide) {
        intro.start();
        intro.onskip(() => {
          skip = true;
          this.$store.commit("setStartProductGuide", false);
        });
        if (skip) return;
        intro.oncomplete((step, state) => {
          completed = true;
          if (state != "skip") this.$router.push("/club-catalogue");
        });
        intro.onexit(() => {
          if (!completed) this.$store.commit("setStartProductGuide", false);
        });
      }
    },
  },
  beforeDestroy() {
    const endTime = new Date().getTime();
    const duration = (endTime - this.startTime) / 1000;
    const distinct_id = localStorage.getItem("distinctId");
    const page = "ClubExisting";
    this.$mixpanel.track("Page Duration", { duration, distinct_id, page });
  },
};
</script>
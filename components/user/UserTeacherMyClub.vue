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
      <section id="tab" class="">
        <div class="tab-section container-fluid mt-3">
          <h5 class="tab-head">Club details</h5>
          <div class="inner-tab-section container-fluid py-3">
            <div class="row m-auto d-flex justify-content-between">
              <div class="col-md-4">
                <div class="input-icon-area">
                  <multiselect
                    v-model="value"
                    :options="taglist"
                    track-by="name"
                    label="name"
                    placeholder="Filter"
                    @input="filterSelection"
                  >
                    <span slot="noResult">No data found</span>
                  </multiselect>
                  <span class="input-icon"
                    ><i class="fa fa-filter" aria-hidden="true"></i
                  ></span>
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
          <div class="inner-club container-fluid py-3">
            <div class="row club-row pl-3 pr-3 pt-3">
              <div
                class="col-md-4"
                v-for="(list, index) in list_data"
                :key="index"
              >
                <div class="club-list p-4">
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
                    {{ list.day ? list.day : "No Meeting Scheduled" }}
                  </p>
                  <nuxt-link
                    :to="{
                      path: '/user-club-info',
                      query: { id: list.id, name: list.description },
                    }"
                    class="btn btn-sm btn-view-more"
                    >View More</nuxt-link
                  >
                </div>
              </div>
              <div v-if="list_data.length == 0" class="w-100 text-center py-5">
                <p class="no-data">No data available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    };
  },
  mounted() {
    var user = localStorage.getItem("user_type");
    if (user == 2) {
      this.GetTag();
      this.MyClubList();
    } else {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState("myClubTeacher", {
      allList: (state) => state.allList,
      taglist: (state) => state.taglist,
    }),
  },
  methods: {
    ...mapActions("myClubTeacher", {
      myClubList: "myClubList",
      getTag: "getTag",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async GetTag() {
      await this.getTag({});
    },
    async MyClubList() {
      this.loading = true;
      await this.myClubList({
        user_id: localStorage.getItem("id"),
        tag_id: SelectValue,
      });
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

        element.todo.forEach((ele) => {
          todoArr.push(ele.todo_list);
        });
        Scheduleobj["todoArr"] = todoArr;
        this.list_data.push(Scheduleobj);
      });
    },

    filterSelection(val) {
      if (val) {
        SelectValue = val.id;
      } else {
        SelectValue = "";
      }
      this.MyClubList();
    },
  },
};
</script>
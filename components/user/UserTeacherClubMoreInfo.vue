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
                class="inner-tab"
              >
                <i class="fas fa-info"></i><span class="pl">Info</span>
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
                class="inner-tab"
              >
                <i class="fas fa-file-alt"></i
                ><span class="pl">Files/Slides</span>
              </nuxt-link>
            </div>
            <div class="col-md-4 col-xs-12">
              <nuxt-link
                :to="{
                  path: '/user-club-moreInfo',
                  query: { id: clubId, name: headingName },
                }"
                class="inner-tab"
              >
                <i class="fas fa-ellipsis-h"></i><span class="pl">More</span>
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
            <div class="inner-info container-fluid my-3">
              <div class="row">
                <div class="col-md-7 col-xs-12">
                  <div class="inner-info container-fluid p-4">
                    <div class="row">
                      <div class="col-6">
                        <div class="inner-info-head mb-3">
                          <h6>To-do's!</h6>
                        </div>
                        <div class="form-group">
                          <ul>
                            <li
                              v-for="(todos, index) in list_data"
                              :key="index"
                            >
                              <span class="input-name"> {{ todos.name }}</span>

                              <span
                                class="input-icon"
                                v-if="enableEdit"
                                @click.prevent="Removetodo(todos.id)"
                              >
                                <i
                                  class="fa fa-times p-1"
                                  aria-hidden="true"
                                ></i
                              ></span>
                            </li>
                            <li v-if="list_data.length === 0">
                              <span class="input-name">
                                No to-do's available</span
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="col-6" v-if="enableEdit">
                        <div class="inner-info-head mb-3">
                          <h6>Add To-do's</h6>
                        </div>
                        <div class="form-row m-0">
                          <input
                            class="form-control"
                            v-model="todolist"
                            maxlength="30"
                          />
                          <button
                            :disabled="!todolist"
                            class="btn btn-info-edit mt-2"
                            @click.prevent="EditTodo(clubId)"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-5 col-xs-12">
                  <div class="inner-info container p-4">
                    <div class="inner-info-head mb-3">
                      <h6>Meeting Time</h6>
                    </div>
                    <p class="time">
                      Next meeting:
                      {{
                        allList.announcement == null
                          ? "No meeting scheduled "
                          : allList.announcement
                      }}
                    </p>

                    <div class="row inner-col" v-if="enableEdit">
                      <div class="col-lg-4 col-md-12 inner-info-head">
                        <h6>Choose time</h6>
                      </div>
                      <div class="col-lg-8 col-md-12 input-icon-area">
                        <multiselect
                          v-model="value"
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
                          class="
                            btn
                            date-picker
                            badge badge-pill badge-color
                            active
                          "
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
                    <button
                      v-if="enableEdit"
                      class="btn btn-primary rounded-pill mt-2 py-1 px-4"
                      :disabled="!value"
                      @click.prevent="UpdateTime"
                    >
                      Update the next meeting
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
var list_data = "";
export default {
  name: "UserClubFiles",
  components: {
    lottie,
    Multiselect,
  },
  data() {
    return {
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      headingName: this.$route.query.name,
      clubId: this.$route.query.id,
      list_data: [],
      dateArray: [],
      simpleStringValue: "",
      announcement: "",
      dayList: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      todolist: "",
      value: "",
      daysArray: [],
      dayArrVal: [],
      valueId: "",
    };
  },
  mounted() {
    var user = localStorage.getItem("user_type");
    if (user == 2) {
      this.ClubMoreInfo();
      this.SlotswithId();
    } else {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState("teacherClubMoreInfo", {
      allList: (state) => state.allList,
      enableEdit: (state) => state.enableEdit,
      slots: (state) => state.slots,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("teacherClubMoreInfo", {
      clubMoreInfo: "clubMoreInfo",
      editTodo: "editTodo",
      updateTime: "updateTime",
      slotswithId: "slotswithId",
      removetodo: "removetodo",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    checkSlot(day) {
      if (this.dateArray.includes(day)) {
        return true;
      } else {
        return false;
      }
    },

    async ClubMoreInfo() {
      this.loading = true;
      await this.clubMoreInfo({
        club_id: this.clubId,
        user_id: localStorage.getItem("id"),
      });
      this.loading = false;
      this.list_data = [];

      var daysArr = [];
      if (this.allList.days) {
        this.allList.days.forEach((day) => {
          daysArr.push(day);
        });
      }
      this.dateArray = daysArr;
      var todoArr = [];
      if (this.allList.todo) {
        this.allList.todo.forEach((element) => {
          var ScheduleArr = {};
          ScheduleArr["name"] = element.todo_list;
          ScheduleArr["id"] = element.id;
          todoArr.push(ScheduleArr);

          this.list_data = todoArr;
        });
      }
    },
    async EditTodo() {
      this.loading = true;
      await this.editTodo({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
        title: this.todolist,
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
      this.ClubMoreInfo();
      this.todolist = "";
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
      this.value = "";
      this.ClubMoreInfo();
    },
    async Removetodo(val) {
      this.loading = true;
      await this.removetodo({
        club_id: this.clubId,
        user_id: localStorage.getItem("id"),
        todoId: val,
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
      this.ClubMoreInfo();

      this.loading = false;
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
    UpdateSlots(val) {
      this.valueId = val.id;
    },
  },
};
</script>
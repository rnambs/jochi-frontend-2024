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
          p-4
          custom-margin-for-main-section custom-full-height
        "
      >
        <!-- end tab for club info -->

        <!-- Club info -->

        <section id="club-detail" class="">
          <div class="club-section container-fluid mt-2">
            <div
              class="
                inner-club
                club-info
                d-flex
                flex-column
                justify-content-center
                container-fluid
                p-3
              "
            >
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
                            <h6>To do!</h6>
                          </div>
                          <div class="form-group">
                            <ul>
                              <li
                                v-for="(todos, index) in list_data"
                                :key="index"
                              >
                                <span class="input-name">
                                  {{ todos.name }}</span
                                >

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
                            <h6>Add Todo</h6>
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
                        <h6>Announcements</h6>
                        <a
                          href="#"
                          class="btn add-assignment"
                          data-toggle="modal"
                          @click="openModal()"
                          >Add Announcement</a
                        >
                      </div>
                      <!-- <p class="time">
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
                      </div> -->

                      <div class="row">
                        <div
                          @click="openEdit(item)"
                          v-for="(item, index) in announcements"
                          :key="index"
                        >
                          {{ item.title }}
                          {{ item.description }}

                          <button
                            @click="onDeleteClick(item.id, item.club_id)"
                            data-toggle="modal"
                            data-target="#mediumModal"
                          >
                            <span>
                              <i class="fa fa-trash" aria-hidden="true"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                      <button
                        v-if="enableEdit"
                        class="btn btn-info-edit mt-2"
                        :disabled="!value"
                        @click.prevent="UpdateTime"
                      >
                        Update the next meeting
                      </button>
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
                        class="btn btn-info-edit mt-2"
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
                  <span class="pl">Info</span>
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
                  <span class="pl">Files/Slides</span>
                </nuxt-link>
              </div>
              <div class="col-md-4 col-xs-12">
                <nuxt-link
                  :to="{
                    path: '/club-moreInfo',
                    query: { id: clubId, name: headingName },
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

        <!-- End Club info -->
      </div>
    </div>
    <!-- modal delete confirm pop up -->
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
            <h5 class="modal-title" id="mediumModalLabel">Delete</h5>
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
            <p class="text-left">Are you sure you want to delete this item?</p>
          </div>
          <div class="modal-footer bg-white text-dark">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-primary color-white"
              @click="onDeleteAnnouncement()"
            >
              Yes
            </button>
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-light border border-secondary color-dark"
              aria-label="Close"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal delete confirm pop up -->

    <!-- modal for add announcement -->
    <div
      class="modal fade"
      id="announcementModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="announcementModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="announcementModalLongTitle">
              {{ isAnnouncementEdit ? "Edit" : "Add" }} Announcement
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
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label"
                  >Title<em>*</em></label
                >

                <input
                  type="text"
                  id="club"
                  placeholder="Enter your club name"
                  class="form-control"
                  v-model="announceTitle"
                  name="announceTitle"
                  :class="{
                    'is-invalid': submitted && $v.announceTitle.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.announceTitle.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.announceTitle.required"
                    >This field is required</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label"
                  >Description<em>*</em></label
                >
                <textarea
                  class="form-control"
                  id="message-text"
                  v-model="announceDesc"
                  name="announceDesc"
                  maxlength="125"
                  placeholder="Enter task description"
                  :class="{
                    'is-invalid': submitted && $v.announceDesc.$error,
                  }"
                ></textarea>
                <div
                  v-if="submitted && $v.announceDesc.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.announceDesc.required"
                    >This field is required</span
                  >
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label"
                      >Date<em>*</em></label
                    >
                    <div>
                      <date-picker
                        class="form-control"
                        placeholder="MM/DD/YYYY"
                        format="MM/dd/yyyy"
                        :value="announceDate"
                        v-model="announceDate"
                        name="announceDate"
                      />
                      <div
                        v-if="submitted && $v.announceDate.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.announceDate.required"
                          >This field is required</span
                        >
                      </div>
                    </div>
                    <!-- <input type="text" class="form-control"> -->
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-color-close"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-color-save"
              :disabled="submitted"
              @click="
                isAnnouncementEdit
                  ? updateAnnouncementId()
                  : addNewAnnouncement()
              "
            >
              {{ (isAnnouncementEdit ? "Update" : "Add") + " Announcement" }}
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
import { required } from "vuelidate/lib/validators";
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
      deleteClickId: 0,
      deleteClubId: 0,
      isAnnouncementEdit: false,
      announceTitle: "",
      announceDesc: "",
      announceDate: "",
      announcementId: 0,
    };
  },
  validations: {
    announceTitle: { required },
    announceDesc: { required },
    announceDate: { required },
  },
  mounted() {
    var user = localStorage.getItem("user_type");
    this.getAnnouncement();
    if (user == 3) {
      this.ClubMoreInfo();
      this.SlotswithId();
    } else {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState("clubMoreInfo", {
      allList: (state) => state.allList,
      announcements: (state) => state.announcements,
      enableEdit: (state) => state.enableEdit,
      slots: (state) => state.slots,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("clubMoreInfo", {
      clubMoreInfo: "clubMoreInfo",
      editTodo: "editTodo",
      updateTime: "updateTime",
      slotswithId: "slotswithId",
      removetodo: "removetodo",
      getAnnouncements: "getAnnouncements",
      deleteAnnouncement: "deleteAnnouncement",
      addAnnouncement: "addAnnouncement",
      updateAnnouncement: "updateAnnouncement",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async getAnnouncement() {
      this.loading = true;
      await this.getAnnouncements({
        club_id: this.clubId,
        // user_id: localStorage.getItem("id"),
      });
      this.loading = false;
      console.log("consoling announcements ", this.announcements);
      // this.list_data = [];

      // var daysArr = [];
      // if (this.allList.days) {
      //   this.allList.days.forEach((day) => {
      //     daysArr.push(day);
      //   });
      // }
      // this.dateArray = daysArr;
      // var todoArr = [];
      // if (this.allList.todo) {
      //   this.allList.todo.forEach((element) => {
      //     var ScheduleArr = {};
      //     ScheduleArr["name"] = element.todo_list;
      //     ScheduleArr["id"] = element.id;
      //     todoArr.push(ScheduleArr);

      //     this.list_data = todoArr;
      //   });
      // }
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
      // await this.clubMoreInfo({
      //   club_id: this.clubId,
      //   user_id: localStorage.getItem("id"),
      // });
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
    onDeleteClick(id, clubId) {
      this.deleteClickId = id;
      this.deleteClubId = clubId;
    },
    async onDeleteAnnouncement() {
      console.log(this.deleteClickId, this.deleteClubId);
      this.loading = true;
      await this.deleteAnnouncement({
        id: this.deleteClickId,
        clubId: this.deleteClubId,
      });
      this.loading = false;
      if (this.successMessage != "") {
        this.deleteClickId = 0;
        this.deleteClubId = 0;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.getAnnouncement();
      }
    },
    async openModal() {
      // this.dateValue = new Date(this.calendarApi.view.activeStart);
      // this.isAssignmentEdit = false;
      this.announceDate = new Date(moment());
      $("#announcementModal").modal({ backdrop: true });
    },
    async openEdit(data) {
      // this.dateValue = new Date(this.calendarApi.view.activeStart);
      // this.isAssignmentEdit = false;
      this.announcementId = data.id;
      this.announceTitle = data.title;
      this.announceDesc = data.description;
      this.announceDate = new Date(data.date);
      this.announceClubId = data.club_id;
      $("#announcementModal").modal({ backdrop: true });
    },
    async addNewAnnouncement() {
      this.loading = true;
      await this.addAnnouncement({
        title: this.announceTitle,
        description: this.announceDesc,
        date: this.announceDate,
        club_id: this.clubId,
      });
      this.loading = false;
      if (this.successMessage != "") {
        $("#announcementModal").modal("hide");
        this.deleteClickId = 0;
        this.deleteClubId = 0;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.getAnnouncement();
      }
    },
    async updateAnnouncementId() {
      this.loading = true;
      await this.updateAnnouncement({
        id: this.announcementId,
        title: this.announceTitle,
        description: this.announceDesc,
        date: this.announceDate,
        clubId: this.clubId,
      });
      this.loading = false;
      if (this.successMessage != "") {
        this.deleteClickId = 0;
        this.deleteClubId = 0;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.getAnnouncement();
      }
    },
  },
};
</script>
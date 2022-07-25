<template>
  <div>
    <div v-if="loading" class="lottie-loader d-flex flex-column">
      <lottie :options="lottieOptions" v-on:animCreated="handleAnimation" />
      <div
        id="fountainTextG"
        class="
          d-flex
          align-items-center
          justify-content-center
          w-100
          m-0
          h-100
          position-absolute
        "
      >
        <div id="fountainTextG_1" class="fountainTextG">L</div>
        <div id="fountainTextG_2" class="fountainTextG">o</div>
        <div id="fountainTextG_3" class="fountainTextG">a</div>
        <div id="fountainTextG_4" class="fountainTextG">d</div>
        <div id="fountainTextG_5" class="fountainTextG">i</div>
        <div id="fountainTextG_6" class="fountainTextG">n</div>
        <div id="fountainTextG_7" class="fountainTextG">g</div>
        <div id="fountainTextG_8" class="fountainTextG">.</div>
        <div id="fountainTextG_9" class="fountainTextG">.</div>
        <div id="fountainTextG_10" class="fountainTextG">.</div>
      </div>
    </div>
    <div class="main-section">
      <!-- tab for club files -->
      <div
        class="
          jochi-components-light-bg
          custom-margin-for-main-section custom-full-height
          d-flex
          flex-column
        "
      >
        <!-- end tab for club files -->

        <!-- Club files -->
        <div class="cd-cover-pic-section position-relative">
          <div class="black-grad"></div>
          <div class="position-absolute cover-button mr-3 mb-1">
            <button class="btn p-1 m-2">
              <i class="fas fa-pen color-white"></i>
            </button>
            <button class="btn p-1 m-2">
              <i class="fas fa-info-circle color-white"></i>
            </button>
          </div>
        </div>

        <section id="club-detail" class="flex-fill d-flex flex-column h-40">
          <div class="club-section container-fluid mt-2 d-flex flex-column custom-overflow flex-fill">
            <div class="row my-0">
              <div class="col-md-8 d-flex h-100">
                <div
                  class="
                    inner-club
                    club-files
                    container-fluid
                    p-3
                    d-flex
                    flex-column
                  "
                >
                  <div class="info-head container-fluid mb-2">
                    <h3 class="color-primary font-semi-bold mb-1">
                      {{ headingName }}
                    </h3>
                  </div>
                  <div class="custom-overflow image-overflow d-flex flex-column flex-fill">
                    <div class="row info-row container-fluid my-0 mx-auto">
                      <div
                        class="col-md-3 col-sm-6 p-2"
                        v-for="(list, index) in allList"
                        :key="index"
                      >
                        <!-- pdf -->
                        <div
                          class="fig-section"
                          v-if="checkFile(list.original_file_name)"
                        >
                          <span
                            class="input-icon"
                            v-on:click="modalPopUp(list.id, list.file_name)"
                          >
                            <i
                              class="
                                fa fa-times
                                p-1
                                w-100
                                text-right text-secondary
                              "
                              aria-hidden="true"
                              v-if="enableEdit"
                              data-toggle="modal"
                              data-target="#exampleModalCenter"
                            ></i
                          ></span>
                          <figure class="figure w-100">
                            <a :href="list.original_file_name" target="_blank">
                              <div class="img-figure">
                                <img
                                  src="~/assets/images/pdf-screen.png"
                                  class="img-fluid rounded figure-img"
                                  alt=""
                                />
                              </div>
                            </a>

                            <figcaption class="figure-caption">
                              <p class="fig-caption mb-0">
                                {{ list.file_name }}
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <!-- ppt -->
                        <div
                          class="fig-section"
                          v-if="checkppt(list.original_file_name)"
                        >
                          <span
                            class="input-icon"
                            v-on:click="modalPopUp(list.id, list.file_name)"
                          >
                            <i
                              class="
                                fa fa-times
                                p-1
                                w-100
                                text-right text-secondary
                              "
                              aria-hidden="true"
                              v-if="enableEdit"
                              data-toggle="modal"
                              data-target="#exampleModalCenter"
                            ></i
                          ></span>
                          <figure class="figure w-100">
                            <a :href="list.original_file_name" download>
                              <div class="img-figure">
                                <img
                                  src="~/assets/images/ppt.jpg"
                                  class="img-fluid rounded figure-img"
                                  alt=""
                                />
                              </div>
                            </a>
                            <figcaption class="figure-caption">
                              <p class="fig-caption mb-0">
                                {{ list.file_name }}
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <!-- image -->
                        <div
                          class="fig-section"
                          v-if="checkImage(list.file_type)"
                        >
                          <span
                            class="input-icon"
                            v-on:click="modalPopUp(list.id, list.file_name)"
                          >
                            <i
                              class="
                                fa fa-times
                                p-1
                                w-100
                                text-right text-secondary
                              "
                              aria-hidden="true"
                              v-if="enableEdit"
                              data-toggle="modal"
                              data-target="#exampleModalCenter"
                            ></i
                          ></span>
                          <figure class="figure w-100">
                            <div class="img-figure">
                              <img
                                class="figure-img"
                                v-if="list.original_file_name"
                                id="myImg"
                                :src="list.original_file_name"
                                alt=""
                                @click="imagePopUP(list.original_file_name)"
                              />
                            </div>
                            <figcaption class="figure-caption">
                              <p class="fig-caption mb-0">
                                {{ list.file_name }}
                              </p>
                            </figcaption>
                          </figure>
                          <!-- The Modal -->
                          <div id="myModal" class="modal">
                            <span class="close" @click="spanClose()"
                              >&times;</span
                            >
                            <img class="modal-content" id="img01" />
                            <div id="caption"></div>
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="allList.length == 0"
                        class="
                          w-100
                          text-center
                          d-flex
                          align-items-center
                          justify-content-center
                        "
                      >
                        <p class="no-data">No Data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Modal -->
              <div
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        Confirmation
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
                    <div class="modal-body">
                      <p class="confirm-text d-flex text-nowrap">
                        <span class="w-100"
                          >Are you sure you want to delete this
                        </span>
                        <!-- <span class="delete-text w-100 pl-1">
                          {{ remove_name }}</span
                        > -->
                        <span class="w-100"> file?</span>
                      </p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary px-3 py-1 rounded-pill"
                        data-dismiss="modal"
                      >
                        No
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary px-3 py-1 rounded-pill"
                        data-dismiss="modal"
                        @click="FileRemove"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="enableEdit" class="col-md-4 d-flex flex-column">
                <div
                  class="
                    inner-club
                    club-files
                    jochi-sub-components-light-bg
                    p-3
                    h-40
                    flex-fill
                    d-flex
                  "
                >
                  <div class="container-fluid p-2 text-center d-flex flex-column justify-content-center align-items-center">
                    <form
                      method="post"
                      @submit.prevent="UploadFile"
                      id="form"
                      enctype="multipart/form-data"
                      class="d-flex flex-column align-items-center w-100 h-100"
                    >
                      <div class="py-4 upload-area h-100">
                        <div class="proof-img-wrp mt-3 mb-3">
                          <img
                            v-if="fileCheck && profileImageUrl"
                            src="~/assets/images/pdf-upload.png"
                          />
                          <img
                            v-if="filepptCheck && profileImageUrl"
                            src="~/assets/images/ppt-upload.jpg"
                          />
                          <img
                            v-if="
                              !fileCheck && !filepptCheck && profileImageUrl
                            "
                            :src="profileImageUrl"
                          />
                          <img
                            v-if="
                              (!fileCheck || !filepptCheck) && !profileImageUrl
                            "
                            src="~/assets/images/upload.png"
                            id="ElectionDocChange"
                          />
                          <div class="img-edit d-none">
                            <a
                              class="btn btn-info round p-1 mx-1"
                              href="javascript:void(0)"
                            >
                              <i class="fas fa-file-upload"></i>
                            </a>
                            <a
                              class="btn btn-danger round p-1 mx-1"
                              href="javascript:void(0)"
                              @click="removeFile"
                            >
                              <i class="fas fa-trash-alt"></i>
                            </a>
                          </div>
                        </div>
                        <div v-if="profileImageUrl">
                          <input
                            type="file"
                            :v-model="profilePic"
                            ref="profilePic"
                            name="profilePic"
                            class="rg-img-upload img-up-two"
                            @change="onFileChange"
                            accept=".png,.jpeg,.jpg,.doc,.docx,.pdf"
                          />
                        </div>
                        <div v-else class="custom-upload-with-msg text-center">
                          <label class="form-label" for="actual-btn"
                            >Drag and drop file here
                          </label>
                          <br />
                          <input
                            id="actual-btn"
                            type="file"
                            :v-model="profilePic"
                            ref="profilePic"
                            name="profilePic"
                            class="rg-img-upload img-up-two"
                            @change="onFileChange"
                            accept=".png,.jpeg,.jpg,.doc,.docx,.pdf"
                          />
                        </div>
                        <!-- <button
                          id="clckPrevent"
                          type="file"
                          class="btn btn-primary py-1 my-3"
                          @click="$event.stopPropagation()"
                        >
                          Browse for files
                        </button> -->
                      </div>
                      <button
                        id="clckPrevent"
                        type="submit"
                        class="btn upload-btn mt-3"
                        :disabled="!profileImageUrl"
                      >
                        <i class="fas fa-file-upload pr-1"></i>Upload
                      </button>
                    </form>
                    <button
                      id="clckPrevent"
                      type=""
                      class="btn delete-btn mt-3"
                      @click="deleteFunction()"
                      :disabled="!profileImageUrl"
                    >
                      <i class="fas fa-trash-alt pr-1"></i>Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- End Club files -->
        <section id="tab" class="">
          <div class="info-tab container-fluid my-3 px-3">
            <div class="row tab-row m-0">
              <div class="col-md-4 col-xs-12 py-2 py-md-3">
                <!-- <nuxt-link
                  :to="{
                    path: '/club-info',
                    query: { id: clubId, name: headingName },
                  }"
                  class="inner-tab d-flex align-items-center justify-content-center p-3 rounded-10 h-100"
                >
                  <span class="text-24 color-primary font-semi-bold">Club Details</span>
                </nuxt-link> -->
                <nuxt-link
                  :to="{
                    path: '/club-moreInfo',
                    query: {
                      id: clubId,
                      name: headingName,
                      type: activity_type,
                    },
                  }"
                  class="
                    inner-tab
                    d-flex
                    align-items-center
                    justify-content-center
                    p-3
                    rounded-10
                    h-100
                  "
                >
                  <!-- <i class="fas fa-info"></i> -->
                  <span class="text-24 color-primary font-semi-bold"
                    >Home Page</span
                  >
                </nuxt-link>
              </div>
              <div class="col-md-4 col-xs-12 py-2 py-md-3">
                <nuxt-link
                  :to="{
                    path: '/club-info',
                    query: {
                      id: clubId,
                      name: headingName,
                      type: activity_type,
                    },
                  }"
                  class="
                    inner-tab
                    d-flex
                    align-items-center
                    justify-content-center
                    p-3
                    rounded-10
                    h-100
                  "
                >
                  <span class="text-24 color-primary font-semi-bold"
                    >Club Details</span
                  >
                </nuxt-link>
              </div>
              <div @click="onNextMeeting" class="col-md-4 col-xs-12 p-2">
                <div
                  class="
                    inner-tab
                    default
                    d-flex
                    flex-column
                    align-items-center
                    justify-content-center
                    p-4
                    rounded-10
                    h-100
                  "
                >
                  <span class="text-24 color-primary font-semi-bold"
                    >Next Meeting</span
                  >
                  <span class="text-16 color-primary font-regular">{{
                    clubMoreDetails.announcement
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
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
              class="btn btn-primary rounded-pill mt-2 py-1 px-4"
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
var fileCheck = false;
var filepptCheck = false;
var headingName = "";
var clubId = "";
export default {
  name: "UserClubFiles",
  components: {
    lottie,
  },
  data() {
    return {
      profilePic: null,
      profileImageUrl: "",
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      headingName: this.$route.query.name,
      clubId: this.$route.query.id,
      fileName: [],
      file_type: "",
      fileCheck: false,
      filepptCheck: false,
      remove_id: "",
      remove_name: "",
      activity_type: this.$route.query.type,
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
    // if (user == 3) {
    this.ClubFiles();
    // } else {
    //   this.$router.push("/");
    // }
  },
  computed: {
    ...mapState("clubFiles", {
      allList: (state) => state.allList,
      enableEdit: (state) => state.enableEdit,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
    ...mapState("clubMoreInfo", {
      clubMoreDetails: (state) => state.clubMoreDetails,
      slots: (state) => state.slots,
      // successMessageClub: (state) => state.successMessage,
      // SuccessTypeClub: (state) => state.SuccessType,
      // errorMessageClub: (state) => state.errorMessage,
      // errorTypeClub: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("clubFiles", {
      clubFiles: "clubFiles",
      uploadFile: "uploadFile",
      fileRemove: "fileRemove",
    }),
    ...mapActions("clubMoreInfo", {
      clubMoreInfo: "clubMoreInfo",
      slotswithId: "slotswithId",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async SlotswithId() {
      await this.slotswithId({});
    },
    UpdateSlots(val) {
      this.valueId = val.id;
    },
    async getClubMoreInfo() {
      await this.clubMoreInfo({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
      });
    },
    checkSlot(day) {
      if (this.dateArray.includes(day)) {
        return true;
      } else {
        return false;
      }
    },
    checkFile(filesName) {
      if (filesName.includes("pdf")) {
        return true;
      }
      return false;
    },
    checkppt(filesName) {
      if (filesName.includes("ppt")) {
        return true;
      }
      return false;
    },
    checkImage(type) {
      if (type == "jpeg" || type == "jpg" || type == "png") {
        return true;
      }
      return false;
    },
    async ClubFiles() {
      this.loading = true;
      await this.clubFiles({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
      });
      this.loading = false;
    },

    async UploadFile() {
      if (this.profilePic) {
        this.loading = true;
        const data = new FormData();
        data.append("file", this.profilePic);
        data.append("club_id", this.$route.query.id);
        data.append("user_id", localStorage.getItem("id"));

        await this.uploadFile(data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          club_id: this.$route.query.id,
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
        this.profileImageUrl = "";
        this.ClubFiles();
      }
    },
    async FileRemove() {
      this.loading = true;
      await this.fileRemove({
        user_id: localStorage.getItem("id"),
        file_id: this.remove_id,
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
      this.ClubFiles();
    },
    onFileChange(e) {
      if (e.target.files[0]) {
        this.profilePic = this.$refs.profilePic.files[0];
        const file = e.target.files[0];
        this.file_type = file.name;
        //
        if (this.file_type.includes("pdf")) {
          this.fileCheck = true;
          this.filepptCheck = false;
          this.profileImageUrl = "pdf-upload.png";
        } else if (this.file_type.includes("ppt")) {
          this.filepptCheck = true;
          this.fileCheck = false;
          this.profileImageUrl = "ppt.jpg";
        } else if (this.file_type.includes("pptx")) {
          this.filepptCheck = true;
          this.fileCheck = false;
          this.profileImageUrl = "ppt.jpg";
        } else {
          this.filepptCheck = false;
          this.fileCheck = false;
          this.profileImageUrl = URL.createObjectURL(file);
        }
      }
    },
    removeFile() {
      this.profileImageUrl = "";
      this.profilePic = null;
      $("#ElectionDocChange").remove();
    },
    deleteFunction() {
      this.profileImageUrl = "";
      this.profilePic = null;
      $("#ElectionDocChange").remove();
    },
    imagePopUP(src) {
      var modal = document.getElementById("myModal");

      // Get the image and insert it inside the modal - use its "alt" text as a caption
      var img = document.getElementById("myImg");
      var modalImg = document.getElementById("img01");
      var captionText = document.getElementById("caption");
      modal.style.display = "block";
      modalImg.src = src;
      captionText.innerHTML = this.alt;
    },

    spanClose() {
      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];
      modal.style.display = "none";
    },
    modalPopUp(valId, valName) {
      this.remove_id = valId;
      this.remove_name = valName;
    },
    onNextMeeting() {
      if (this.enableEdit) {
        $("#nextMeetingModal").modal();
      }
    },
  },
};
</script>
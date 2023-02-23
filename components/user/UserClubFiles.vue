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
        <div
          class="cd-cover-pic-section position-relative"
          v-bind:style="{
            'background-image':
              'url(' +
              (clubBannerImage
                ? clubBannerImage
                : '../../image/cover-pic.jpg') +
              ')',
          }"
        >
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
            <button
              v-if="enableEdit"
              @click="openAddBanner"
              class="btn p-1 m-2"
            >
              <i class="fas fa-pen color-white"></i>
            </button>
            <button
              v-if="enableEdit"
              class="btn p-0 tooltip01 right-tip"
              CustomTitle="1200 X 180"
            >
              <i class="fas fa-info-circle color-white"></i>
            </button>

            <button class="btn p-1 m-2" v-on:click="toggleDropdown">
              <i class="fas fa-cog color-white"></i>
            </button>
          </div>
        </div>
        <div class="position-relative">
          <div
            v-bind:class="{
              'dropdown-club jochi-components-light-bg': true,
              'dropdown-club--visible': dropdownVisible,
            }"
          >
            <ul class="m-0">
              <li>
                <button
                  class="btn btn-primary btn-sm py-1 mb-2 col-12"
                  @click="openConfirm('info')"
                >
                  Info
                </button>
              </li>
              <li>
                <button
                  class="btn btn-primary btn-sm py-1 mb-2 col-12"
                  @click="openConfirm('leave')"
                >
                  Leave
                </button>
              </li>
              <li v-if="userType == '3' && enableEdit">
                <button
                  class="btn btn-primary btn-sm py-1 mb-2 col-12"
                  @click="openConfirm('remove_leader')"
                >
                  Remove As Leader
                </button>
              </li>
              <li v-if="enableEdit">
                <button
                  class="btn btn-primary btn-sm py-1 col-12"
                  @click="openConfirm('delete')"
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
        <section id="club-detail" class="flex-fill d-flex flex-column h-40">
          <div
            class="
              club-section
              container-fluid
              pt-2
              d-flex
              flex-column
              custom-overflow
              flex-fill
            "
          >
            <div class="row my-0 flex-fill">
              <div class="col d-flex h-md-100">
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
                  <div
                    class="
                      custom-overflow
                      image-overflow
                      d-flex
                      flex-column
                      h-100
                    "
                  >
                    <div
                      class="
                        row
                        info-row
                        container-fluid
                        my-0
                        mx-auto
                        align-items-start
                      "
                    >
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
                                class="figure-img cursor-pointer"
                                v-if="list.original_file_name"
                                id="myImg"
                                :src="list.original_file_name"
                                alt=""
                                @click="
                                  imagePopUP(
                                    list.original_file_name,
                                    list.file_name
                                  )
                                "
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
                            <div
                              class="
                                d-flex
                                align-items-center
                                justify-content-center
                                h-100
                              "
                            >
                              <div
                                class="d-flex flex-column w-50 align-items-end"
                              >
                                <span
                                  class="
                                    close
                                    d-flex
                                    align-items-center
                                    justify-content-center
                                    rounded-circle
                                    bg-white
                                    color-primary
                                    mb-1
                                    font-regular
                                    position-absolute
                                    z-index-9
                                    mr-2
                                    mt-2
                                  "
                                  @click="spanClose()"
                                  >&times;</span
                                >
                                <div
                                  class="
                                    modal-content
                                    h-100
                                    border-white
                                    card card-white
                                    rounded-22
                                  "
                                >
                                  <img id="img01" class="img-preview" />
                                  <div id="caption" class="pl-3 py-2"></div>
                                </div>
                              </div>
                            </div>
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
                          h-100
                        "
                      >
                        <p class="no-data mb-0">No data</p>
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
                    <div class="modal-header pb-0">
                      <h2
                        class="modal-title font-bold"
                        id="exampleModalLongTitle"
                      >
                        Confirmation
                      </h2>
                    </div>
                    <div class="modal-body">
                      <p class="confirm-text d-flex">
                        <span class="w-100 color-dark font-semi-bold"
                          >Are you sure you want to delete this file?
                        </span>
                      </p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="
                          btn btn-secondary
                          px-4
                          py-1
                          rounded-12
                          font-semi-bold
                        "
                        data-dismiss="modal"
                      >
                        No
                      </button>
                      <button
                        type="button"
                        class="
                          btn btn-success
                          px-4
                          py-1
                          rounded-12
                          font-semi-bold
                        "
                        data-dismiss="modal"
                        @click="FileRemove"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="enableEdit" class="col-lg-4 d-flex flex-column py-3">
                <div
                  class="
                    inner-club
                    club-files
                    card card-primary
                    rounded-22
                    p-3
                    h-40
                    flex-fill
                    d-flex
                  "
                >
                  <div
                    class="
                      container-fluid
                      p-2
                      text-center
                      d-flex
                      flex-column
                      justify-content-center
                      align-items-center
                      flex-fill
                    "
                  >
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
                            id="fileUpload"
                            :v-model="profilePic"
                            ref="profilePic"
                            name="profilePic"
                            class="rg-img-upload img-up-two cursor-pointer"
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
                            class="rg-img-upload img-up-two cursor-pointer"
                            @change="onFileChange"
                            accept=".png,.jpeg,.jpg,.doc,.docx,.pdf"
                          />
                        </div>
                      </div>
                      <button
                        id="clckPrevent"
                        type="submit"
                        class="btn btn-primary mt-3 px-4 py-1"
                        :disabled="!profileImageUrl"
                      >
                        <i class="fas fa-file-upload pr-1"></i>Upload
                      </button>
                    </form>
                    <button
                      id="clckPrevent"
                      type=""
                      class="btn btn-secondary mt-3 px-4 py-1"
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
          <div class="info-tab container-fluid mb-3 px-3">
            <div class="row tab-row m-0 px-3">
              <div class="col-md-4 col-xs-12 py-2 py-md-0">
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
                    p-2
                    rounded-10
                    h-100
                  "
                >
                  <span class="text-24 color-primary font-semi-bold"
                    >Home Page</span
                  >
                </nuxt-link>
              </div>
              <div class="col-md-4 col-xs-12 py-2 py-md-0">
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
                    p-2
                    rounded-10
                    h-100
                  "
                >
                  <span class="text-24 color-primary font-semi-bold"
                    >Club Details</span
                  >
                </nuxt-link>
              </div>
              <div
                @click="onNextMeeting"
                class="col-md-4 col-xs-12 py-2 py-md-0"
              >
                <div
                  class="
                    inner-tab
                    default
                    d-flex
                    flex-column
                    align-items-center
                    justify-content-center
                    p-2
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
          <div class="modal-body no-overflow px-4 pt-4">
            <h3
              class="modal-title color-primary font-semi-bold"
              id="nextMeetingModalLongTitle"
            >
              Configure Meeting Days
            </h3>
            <div class="inner-info">
              <p class="color-dark text-24 font-semi-bold">
                Next meeting:
                {{
                  clubMoreDetails.announcement == null
                    ? "No meeting scheduled "
                    : clubMoreDetails.announcement
                }}
              </p>

              <div class="row inner-col" v-if="enableEdit">
                <div class="col-lg-8 col-md-12 input-icon-area form-row">
                  <multiselect
                    v-model="valueMeeting"
                    track-by="start_time"
                    label="start_time"
                    placeholder="Choose time"
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
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary px-4 py-1 rounded-12"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              v-if="enableEdit"
              class="btn btn-success rounded-12 mt-2 py-1 px-4 font-semi-bold"
              :disabled="!valueMeeting || dayArrVal.length <= 0"
              @click.prevent="UpdateTime"
            >
              Update the next meeting
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal add assignment -->

    <!-- modal for add banner -->
    <div
      class="modal fade"
      id="addBannerModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addBannerModalModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header px-4">
            <h3 class="modal-title color-primary" id="addBannerModalLongTitle">
              Add Banner
            </h3>
          </div>
          <div class="modal-body overflow-hidden d-flex flex-column px-4">
            <div class="d-flex flex-column overflow-hidden h-100">
              <div
                size="120"
                class="
                  user
                  d-flex
                  align-items-center
                  justify-content-center
                  py-4
                  rounded
                  card card-primary-sm
                  mb-3
                "
              >
                <v-icon
                  class="icon primary white--text text-30 color-secondary"
                  @click="$refs.FileInput.click()"
                  >mdi-upload</v-icon
                >
                <input
                  ref="FileInput"
                  type="file"
                  accept="image/*"
                  style="display: none"
                  @change="onFileSelect"
                />
              </div>
              <v-card
                class="
                  bg-transparent
                  shadow-none
                  h-100
                  overflow-hidden
                  d-flex
                  flex-column
                "
              >
                <v-card-text class="p-0 h-100 overflow-hidden">
                  <VueCropper
                    v-show="selectedFile"
                    ref="cropper"
                    :src="selectedFile"
                    alt="Source Image"
                    :aspect-ratio="20 / 3"
                    class="card card-primary mb-3"
                  ></VueCropper>
                </v-card-text>
                <v-card-actions class="justify-content-end">
                  <v-btn
                    color="primary"
                    class="
                      btn btn-secondary
                      font-semi-bold
                      color-white
                      mr-2
                      py-1
                      px-3
                      rounded-12
                      text-capitalize
                    "
                    text
                    data-dismiss="modal"
                    @click="clearCrop"
                    ><span class="font-semi-bold">Cancel</span></v-btn
                  >
                  <v-btn
                    class="
                      btn btn-success
                      font-semi-bold
                      bg-primary
                      color-dark
                      py-1
                      px-3
                      rounded-12
                      text-capitalize
                      shadow-none
                    "
                    @click="saveImage(), (dialog = false)"
                    ><span class="font-semi-bold">Upload</span></v-btn
                  >
                </v-card-actions>
              </v-card>
              <!-- </v-dialog> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal add banner -->

    <!-- modal for confirmation pop up -->
    <div
      class="modal fade"
      id="confirmationModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="confirmationModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header pb-0">
            <h2 class="modal-title font-bold" id="confirmationModalLongTitle">
              {{ showClubInfo ? "Club Information" : "Confirmation" }}
            </h2>
          </div>
          <div v-if="!showClubInfo" class="modal-body">
            <p class="confirm-text d-flex">
              <span class="w-100 color-dark font-semi-bold"
                >{{ confirmationMessage }}
              </span>
            </p>
          </div>
          <div v-if="showClubInfo && clubInformation" class="modal-body">
            <div class="confirm-text">
              <div class="w-100">
                <label for="created_at">Type:</label>
                <span class="color-dark font-semi-bold"
                  >{{
                    clubInformation.activity_type == "Clubs" ? "Club" : "Team"
                  }}
                </span>
              </div>
              <div>
                <label for="created_at">Created By:</label>
                <span
                  v-if="clubInformation.student"
                  class="color-dark font-semi-bold"
                  >{{
                    clubInformation.student.first_name +
                    " " +
                    clubInformation.student.last_name
                  }}
                </span>
              </div>
              <div>
                <label for="created_at">Created At:</label>
                <span class="color-dark font-semi-bold"
                  >{{ clubCreatedAt }}
                </span>
              </div>
            </div>
          </div>
          <div v-if="!showClubInfo" class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary px-4 py-1 rounded-12 font-semi-bold"
              data-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              class="btn btn-success px-4 py-1 rounded-12 font-semi-bold"
              data-dismiss="modal"
              @click="confirmAction()"
            >
              Yes
            </button>
          </div>
          <div v-if="showClubInfo" class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary px-4 py-1 rounded-12 font-semi-bold"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal for confirmation pop up end -->
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import VueCropper from "vue-cropperjs";

var fileCheck = false;
var filepptCheck = false;
var headingName = "";
var clubId = "";
export default {
  name: "UserClubFiles",
  components: {
    lottie,
    VueCropper,
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
      valueMeeting: "",
      mime_type: "",
      cropedImage: "",
      autoCrop: false,
      selectedFile: "",
      image: "",
      dialog: false,
      files: "",
      dropdownVisible: false,
      confirmEvent: "",
      confirmationMessage: "",
      showClubInfo: false,
      clubCreatedAt: "",
      userType: "",
      startTime: null,
    };
  },
  mounted() {
    const page = "ClubFiles";
    const distinct_id = localStorage.getItem("distinctId");
    this.$mixpanel.track("Page View", { distinct_id, page });
    this.startTime = new Date().getTime();

    this.userType = localStorage.getItem("user_type");
    this.getClubMoreInfo();
    this.SlotswithId();
    this.ClubFiles();
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
      successMessageClub: (state) => state.successMessage,
      SuccessTypeClub: (state) => state.SuccessType,
      errorMessageClub: (state) => state.errorMessage,
      errorTypeClub: (state) => state.errorType,
      clubBannerImage: (state) => state.clubBannerImage,
    }),
    ...mapState("clubUpdates", {
      successTypeClubUpdate: (state) => state.successTypeClubUpdate,
      successMessageClubUpdate: (state) => state.successMessageClubUpdate,
      errorMessageClubUpdate: (state) => state.errorMessageClubUpdate,
      errorTypeClubUpdate: (state) => state.errorTypeClubUpdate,
      clubInformation: (state) => state.clubInformation,
    }),
  },
  methods: {
    ...mapActions("clubFiles", {
      clubFiles: "clubFiles",
      uploadFile: "uploadFile",
      fileRemove: "fileRemove",
      uploadBanner: "uploadBanner",
    }),
    ...mapActions("clubMoreInfo", {
      clubMoreInfo: "clubMoreInfo",
      slotswithId: "slotswithId",
      updateTime: "updateTime",
    }),
    ...mapActions("clubUpdates", {
      clubDelete: "clubDelete",
      clubLeave: "clubLeave",
      leaderRemove: "leaderRemove",
      getInformation: "getInformation",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
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
      } else if (this.errorMessageClub != "") {
        this.$toast.open({
          message: this.errorMessageClub,
          type: this.errorTypeClub,
          duration: 5000,
        });
      }
      this.valueMeeting = "";
      this.getClubMoreInfo();
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
    imagePopUP(src, name) {
      var modal = document.getElementById("myModal");

      // Get the image and insert it inside the modal - use its "alt" text as a caption
      var img = document.getElementById("myImg");
      var modalImg = document.getElementById("img01");
      var captionText = document.getElementById("caption");
      modal.style.display = "block";
      modalImg.src = src;
      captionText.innerHTML = name;
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
        this.valueMeeting = "";
        this.dayArrVal = [];
        this.dateArray = [];
        $("#nextMeetingModal").modal();

        let activeElements = document.getElementsByClassName(
          "btn date-picker badge badge-pill badge-color active"
        );
        Array.prototype.forEach.call(activeElements, function (element) {
          element.classList.remove("active");
        });
      }
    },
    openAddBanner() {
      this.clearCrop();
      $("#addBannerModal").modal({ backdrop: true });
    },
    saveImage() {
      const userId = this.$route.params.user_id;
      this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData();

        if (blob) {
          var file = new File([blob], "name");
          blob.fileName = this.fileName;
          formData.append("file", blob, this.fileName);
          formData.append("club_id", this.$route.query.id);
          formData.append("user_id", localStorage.getItem("id"));
          formData.append("club_banner", "1");

          this.upload(formData);
        }
      }, this.mime_type);
    },
    async upload(formData) {
      await this.uploadBanner(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        club_id: this.$route.query.id,
      });
      if (this.successMessage != "") {
        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        await this.getClubMoreInfo();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
    },
    onFileSelect(e) {
      if (e.target.files[0] && this.checkFileValid(e.target.files[0])) {
        if (
          e?.target?.files[0]?.size &&
          e.target.files[0]?.size > 5 * 1024 * 1024
        ) {
          return this.$toast.open({
            message: "File size must be lesser than 5 MB",
            type: "warning",
          });
        }
        const file = e.target.files[0];
        this.mime_type = file.type;
        this.fileName = file.name;
        if (typeof FileReader === "function") {
          this.dialog = true;
          const reader = new FileReader();
          reader.onload = (event) => {
            this.selectedFile = event.target.result;
            this.$refs.cropper.replace(this.selectedFile);
          };
          reader.readAsDataURL(file);
        } else {
          alert("Sorry, FileReader API not supported");
        }
      }
    },
    checkFileValid(profileImage) {
      let parts = profileImage.name.split(".");
      let ext = parts[parts.length - 1];
      if (ext == "png" || ext == "jpg" || ext == "jpeg") {
        return true;
      }

      this.$toast.open({
        message: "File type accepts only PNG,JPG,JPEG formats",
        type: "warning",
        duration: 5000,
      });
      return false;
    },
    clearCrop() {
      this.selectedFile = "";
      this.$refs.cropper.destroy();
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    openConfirm(event) {
      this.showClubInfo = false;
      this.confirmEvent = event;
      $("#confirmationModal").modal();
      this.confirmationMessage = this.setConfirmationMessage(event);
    },
    setConfirmationMessage(event) {
      const type = this.activity_type == "Sports" ? " team" : " club";
      switch (event) {
        case "delete": {
          return (
            "Are you sure you want to delete this" +
            type +
            "? This action is not reversible!"
          );
        }
        case "remove_leader": {
          return (
            "Are you sure you want to remove yourself as a leader of this" +
            type +
            "? This action is not reversible!"
          );
        }
        case "leave": {
          return (
            "Are you sure you want to leave this" +
            type +
            "? This action is not reversible!"
          );
        }
        case "info": {
          this.showClubInfo = true;
          this.getClubInformation();
          return "";
        }
        default: {
          return "";
        }
      }
    },
    confirmAction() {
      switch (this.confirmEvent) {
        case "delete": {
          this.deleteClub();
          break;
        }
        case "remove_leader": {
          this.removeAsLeader();
          break;
        }
        case "leave": {
          this.leaveClub();
          break;
        }

        default: {
          return "";
        }
      }
    },
    async deleteClub() {
      await this.clubDelete({
        club_id: this.clubId,
      });
      if (this.successMessageClubUpdate != "") {
        this.$router.push("/club-detail");
        this.$toast.open({
          message: this.successMessageClubUpdate,
          type: this.successTypeClubUpdate,
          duration: 5000,
        });
      } else if (this.errorMessageClubUpdate != "") {
        this.$toast.open({
          message: this.errorMessageClubUpdate,
          type: this.errorTypeClubUpdate,
          duration: 5000,
        });
      }
    },
    async removeAsLeader() {
      await this.leaderRemove({
        club_id: this.clubId,
      });
      if (this.successMessageClubUpdate != "") {
        this.$toast.open({
          message: this.successMessageClubUpdate,
          type: this.successTypeClubUpdate,
          duration: 5000,
        });
      } else if (this.errorMessageClubUpdate != "") {
        this.$toast.open({
          message: this.errorMessageClubUpdate,
          type: this.errorTypeClubUpdate,
          duration: 5000,
        });
      }
      this.ClubFiles();
    },
    async leaveClub() {
      await this.clubLeave({
        club_id: this.clubId,
      });
      if (this.successMessageClubUpdate != "") {
        this.$router.push("/club-detail");

        this.$toast.open({
          message: this.successMessageClubUpdate,
          type: this.successTypeClubUpdate,
          duration: 5000,
        });
      } else if (this.errorMessageClubUpdate != "") {
        this.$toast.open({
          message: this.errorMessageClubUpdate,
          type: this.errorTypeClubUpdate,
          duration: 5000,
        });
      }
    },
    async getClubInformation() {
      await this.getInformation({
        club_id: this.clubId,
      });
      console.log("club information", this.clubInformation);
      this.clubCreatedAt = moment(this.clubInformation).format("MMMM Do, YYYY");
    },
  },
  beforeDestroy() {
    const endTime = new Date().getTime();
    const duration = (endTime - this.startTime) / 1000;
    const distinct_id = localStorage.getItem("distinctId");
    const page = "ClubFiles";
    this.$mixpanel.track("Page Duration", { duration, distinct_id, page });
  },
};
</script>

<style scoped>
.dropdown-club {
  display: none;
}
.dropdown-club--visible {
  display: block;
  position: absolute;
  width: 235px;
  height: auto;
  z-index: 999;
  border-radius: 0px 0px 1rem 1rem;
  right: 10px;
  padding: 1rem;
  color: #fff;
}
</style>
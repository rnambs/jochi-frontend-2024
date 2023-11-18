<template>
  <div :class="!accordionOpened ? 'main-section' : 'main-section opened'">
    <!-- profile Page -->
    <section id="study-detail" class="">
      <div
        class="study-section rounded-10 m--12 custom-full-height d-flex flex-column"
      >
        <div class="inner-study d-flex flex-column flex-fill h-100">
          <div class="d-flex flex-column justify-content-between align-items-center">
            <div class="d-flex flex-wrap align-items-center justify-content-between w-100 pr-3">
              <h3 class="color-primary-dark heading3 font-bold mr-3">Profile</h3>
              <div class="faq-section d-flex flex-wrap align-items-center">
                <div class="theme-switcher mr-3">
                  <input type="radio" id="light-theme" name="themes" v-model="selectedTheme" value="light" checked />
                  <label for="light-theme" class="cursor-pointer">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                      Light
                    </span>
                  </label>
                  <input type="radio" id="dark-theme" name="themes" v-model="selectedTheme" value="dark" />
                  <label for="dark-theme" class="cursor-pointer">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                      Dark
                    </span>
                  </label>
                  <span class="slider"></span>
                </div>
                <div class="faq-btn mr-4">
                  <a class="color-dark font-semi-bold" href="https://www.jochi.info/faq" target="blank">
                    FAQs
                  </a>
                </div>
                <div class="privacy-btn">
                  <a
                    class="color-dark font-semi-bold"
                    href="https://jochi.notion.site/Terms-of-Use-eac8a3c7cade407780964b231adaf051"
                    target = "blank"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
            <div
              v-if="user_type == 2 && isSchoolAdmin != '1'"
              class="d-flex justify-content-end align-items-center w-100 my-2"
            >
              <div class="text-center">
                <button
                  v-if="requestSent != '1'"
                  @click="openRequestConfirm()"
                  class="btn btn-primary py-1 px-4 rounded-8 font-semi-bold"
                >
                  Request to be a school admin
                </button>

                <span
                  class="bg-primary py-1 px-4 rounded-8 font-semi-bold text-nowrap"
                  style="color: white"
                  v-if="requestSent == '1'"
                >
                  <i class="fas fa-hourglass-half mr-2"></i>
                  <span class="text-nowrap">Pending Approval</span></span
                >
              </div>
            </div>
            <div
              class="d-flex justify-content-between align-items-center sch-admin"
              v-if="user_type == 2 && isSchoolAdmin == '1'"
            >
              <i class="fas fa-user-tie mr-2"></i> School Admin
            </div>
          </div>

          <div
            class="profile-row study-row d-flex flex-column flex-fill justify-content-start pr-2"
          >
            <div
              class="study-col d-flex flex-column justify-content-start flex-fill"
            >
              <div class="form-section mx-auto w-100 pt-3 flex-fill d-flex flex-column">
                <!-- <form action="" class="container"> -->
                <!-- <div class="form-group">
                    <label for="">Email</label>
                    <div class="form-field">{{ email }}</div>
                  </div> -->
                <div class="flex-fill d-flex flex-column">
                  <div>
                  <div
                    :class="
                      (advisorDetail && advisorDetail.first_name) ||
                      requestList.length > 0
                        ? 'row'
                        : 'row d-flex'
                    "
                  >
                    <!----image-->
                    <div class="col-12 col-md-6">
                      <div
                        data-intro="Custom your profile on Jochi by uploading a profile picture."
                        class="study-col profile-col d-flex align-items-center flex-fill"
                      >
                        <form id="form" enctype="multipart/form-data">
                          <div class="">
                            <div class="upload-image position-relative">
                              <div
                                class="proof-img-wrp position-relative cursor-pointer d-flex justify-content-center"
                              >
                                <img
                                  v-if="profileImageUrl"
                                  :src="profileImageUrl"
                                  class="profile-pic rounded-circle"
                                  alt=""
                                />
                                <img
                                  v-if="!profileImageUrl"
                                  :src="profile ? profile : defaultImage"
                                  class="profile-pic rounded-circle"
                                  alt=""
                                />
                                <!-- @error="$event.target.src=(awsPath + 'images/avatar/man_green.svg')" -->

                                <div
                                  v-if="
                                    this.profile &&
                                    (this.profile !=
                                      'https://jochi-developement.s3.ap-south-1.amazonaws.com/profilePic/1634542050892.png' 
                                      && this.profile != JOCHI_PRO_PIC)
                                  "
                                  class="middle position-absolute text-center"
                                >
                                  <div
                                    v-if="
                                      profileImageUrl ||
                                      (profile &&
                                        profile !=
                                          'https://jochi-live.s3.amazonaws.com/profilePic/defaultProfilePic/profile.png')
                                    "
                                    class="text-30 color-dark"
                                    @click="openModal()"
                                  >
                                    <i class="far fa-trash-alt"></i>
                                    <p
                                      class="text-remove color-secondary text-14 text-nowrap"
                                    >
                                      Remove profile
                                    </p>
                                  </div>
                                </div>

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
                                <span
                                  class="pic-edit w-100 d-flex flex-row-reverse position-absolute"
                                >
                                  <i
                                    class="fas fa-pen rounded-circle position-relative text-16 d-flex align-items-center justify-content-center bg-primary text-white"
                                  >
                                    <!-- accept=".png,.jpeg,.jpg,.doc,.docx,.pdf" -->
                                    <input
                                      type="file"
                                      :v-model="profilePic"
                                      ref="profilePic"
                                      name="profilePic"
                                      id="fileUpload"
                                      class="rg-img-upload img-up-two cursor-pointer position-absolute w-100 h-100 rounded-circle"
                                      @change="onFileChange()"
                                      accept=".jpeg,.jpg,.png"
                                    />
                                  </i> </span
                                ><br />
                              </div>
                              <div
                                v-else
                                class="custom-upload-with-msg text-center"
                              >
                                <span
                                  class="pic-edit w-100 d-flex flex-row-reverse position-absolute"
                                >
                                  <i
                                    class="fas fa-pen rounded-circle position-relative text-16 d-flex align-items-center justify-content-center bg-primary text-white"
                                  >
                                    <input
                                      id="actual-btn"
                                      type="file"
                                      :v-model="profilePic"
                                      ref="profilePic"
                                      name="profilePic"
                                      class="rg-img-upload img-up-two cursor-pointer position-absolute w-100 h-100 rounded-circle"
                                      @change="onFileChange"
                                      accept=".jpeg,.jpg,.png"
                                    />
                                  </i> </span
                                ><br />
                              </div>
                            </div>
                          </div>

                          <!-- <button
            id="clckPrevent"
            type="submit"
            class="btn btn-primary "
            :disabled="!profileImageUrl || loading"
          >
          <span class="mr-2"><i class="fas fa-save"></i></span> <span>Save Changes</span>
          </button> -->
                        </form>
                        <div class="d-flex flex-column align-items-start ml-3">
                          <h5 class="text-center color-dark font-semi-bold ">
                            <!-- <span><i class="fas fa-user"></i></span> -->
                            {{ name }}
                          </h5>
                          <p class="mb-0 color-gray">{{ email }}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="
                        (user_type == '3' &&
                          advisorDetail &&
                          advisorDetail.first_name) ||
                        requestList.length > 0
                      "
                      class="col-12 col-md-6"
                    >
                      <div
                        data-intro="Find your advisor details."
                        class="border-0 rounded-10 h-100"
                      >
                        <div class="">
                          <div v-if="user_type == '3'" class="col-md-12 p-0">
                            <div
                              v-if="advisorDetail && advisorDetail.first_name"
                              class="card card-void p-3"
                            >
                              <h4 class="color-dark font-semi-bold">
                                Your Advisor
                              </h4>
                              <div
                                class="d-flex align-items-center my-2 mr-3 min-w-200"
                              >
                                <div class="ld-img-section mr-3">
                                  <div class="ld-img-holder">
                                    <img
                                      v-if="
                                        advisorDetail &&
                                        advisorDetail.profile_pic
                                      "
                                      :src="advisorDetail.profile_pic"
                                      alt=""
                                    />
                                    <img
                                      v-else
                                      src="~/static/image/avatar.png"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div class="ld-details-section">
                                  <p class="ld-heading mb-1">
                                    {{
                                      advisorDetail.first_name +
                                      " " +
                                      advisorDetail.last_name
                                    }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-if="requestList.length > 0" class="col-md-12 p-0">
                            <div class="card border p-3">
                              <h4 class="color-dark font-semi-bold">
                                Advisor Requests
                              </h4>
                              <div
                                v-for="advisor in requestList"
                                :key="advisor.id"
                                class="d-flex flex-column flex-md-row align-items-center my-2 mr-3 min-w-200"
                              >
                                <div
                                  class="ld-img-section mr-0 mr-md-3 mb-2 mb-md-0"
                                >
                                  <div class="ld-img-holder">
                                    <img
                                      v-if="
                                        advisor &&
                                        advisor.teacher &&
                                        advisor.teacher.profile_pic
                                      "
                                      :src="advisor.teacher.profile_pic"
                                      alt=""
                                    />
                                    <img
                                      v-else
                                      src="~/static/image/avatar.png"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  class="d-flex flex-column flex-md-row align-items-center justify-content-between w-100 flex-wrap"
                                >
                                  <div class="ld-details-section">
                                    <p
                                      v-if="advisor.teacher"
                                      class="ld-heading mb-1"
                                    >
                                      {{
                                        advisor.teacher.first_name +
                                        " " +
                                        advisor.teacher.last_name
                                      }}
                                    </p>
                                  </div>

                                  <div
                                    class="d-flex align-items-center justify-content-center flex-wrap"
                                  >
                                    <button
                                      class="btn btn-void px-3 py-1  mr-2 mb-2"
                                      @click="respondRequest(2, advisor)"
                                    >
                                      Reject
                                    </button>
                                    <button
                                      class="btn btn-primary px-3 py-1 mb-2 "
                                      @click="respondRequest(1, advisor)"
                                    >
                                      Accept
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    <!-- <div class="col-12 col-md-4">
                        <div class="card card-primary h-100 ">
                              <nuxt-link to="/user-reset-password" class="btn btn-void d-flex flex-column align-items-start">
                                <span class="mr-2 text-30"><i class="fas fa-lock"></i></span>
                                <span>Change Password</span>
                              </nuxt-link>
                        </div>
                      </div> -->
                  </div>
                  <div class="row px--12 max-h-50 flex-fill">
                    
                    <div class="col-12 col-md-4">
                      <div
                            data-intro="With the guidelines previous mentioned in mind, opt in/choose your preferences to receive certain notifications via your school email and SMS."
                            class="card border-0 p-0 h-100 d-flex flex-column"
                          >
                            <h4 class="color-dark font-semi-bold">
                              Notification Settings
                            </h4>
                            <div class="col-xl-12 px-0 align-items-center">
                              <div class="d-flex flex-column">
                                <div class="custom-switch pb-3 mr-3">
                                  <input
                                    @change="
                                      updateNotification($event, 'sms')
                                    "
                                    type="checkbox"
                                    id="smsNotify"
                                    name="smsNotify"
                                    class="custom-control-input color-primary-dark"
                                    v-model="smsNotify"
                                  />
                                  <label
                                    class="custom-control-label font-normal color-dark text-14 cursor-pointer"
                                    for="smsNotify"
                                    >SMS Notification
                                  </label>
                                </div>
                                <div class="custom-switch pb-3 mr-3">
                                  <input
                                    @change="
                                      updateNotification($event, 'meeting')
                                    "
                                    type="checkbox"
                                    id="meetingNotify"
                                    name="meetingNotify"
                                    class="custom-control-input color-primary-dark"
                                    v-model="meetingNotify"
                                  />
                                  <label
                                    class="custom-control-label font-normal color-dark text-14 cursor-pointer"
                                    for="meetingNotify"
                                    >Meeting Notification
                                  </label>
                                </div>

                                <div class="custom-switch pb-3 mr-3">
                                  <input
                                    @change="
                                      updateNotification($event, 'club')
                                    "
                                    type="checkbox"
                                    id="clubNotify"
                                    name="clubNotify"
                                    class="custom-control-input color-primary-dark"
                                    v-model="clubNotify"
                                  />
                                  <label
                                    class="custom-control-label font-normal color-dark text-14 cursor-pointer"
                                    for="clubNotify"
                                    >Club Notification
                                  </label>
                                </div>
                                <div class="custom-switch pb-3 mr-3">
                                  <input
                                    @change="
                                      updateNotification($event, 'assignment')
                                    "
                                    type="checkbox"
                                    id="assignmentNotify"
                                    name="assignmentNotify"
                                    class="custom-control-input color-primary-dark"
                                    v-model="assignmentNotify"
                                  />
                                  <label
                                    class="custom-control-label font-normal color-dark text-14 cursor-pointer"
                                    for="assignmentNotify"
                                    >Assignment Notification
                                  </label>
                                </div>
                                <div class="custom-switch pb-3 mr-3">
                                  <input
                                    @change="
                                      updateNotification($event, 'session')
                                    "
                                    type="checkbox"
                                    id="sessionNotify"
                                    name="sessionNotify"
                                    class="custom-control-input color-primary-dark"
                                    v-model="sessionNotify"
                                  />
                                  <label
                                    class="custom-control-label font-normal color-dark text-14 cursor-pointer"
                                    for="sessionNotify"
                                    >Study Session Notification
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                    </div>
                    <div class="col-12 col-md-8 card card-primary02 p-3 p-lg-4 rounded-20">
                      <div
                        class="card card-primary02 p-2 d-flex flex-column mb-3 border border--form2"
                      >
                        <p
                          class="mb-0 text-16 color-secondary d-flex flex-row align-items-center"
                        >
                          <span class="text-20"
                            ><i class="i-mail j-icon i-lg bg-text-secondary"></i
                          ></span>
                          <span class="ml-2">{{ email }}</span>
                        </p>
                      </div>
                      <div class="card card-primary02 p-2 mb-3 border border--form2">
                        <p
                          class="mb-0 text-16 color-secondary d-flex flex-row align-items-center"
                        >
                          <span class="text-20"
                            ><i class="i-school j-icon i-lg bg-text-secondary"></i
                          ></span>
                          <span class="ml-2">{{ schoolName }}</span>
                        </p>
                      </div>
                      <div
                          data-intro="Want to receive text updates about upcoming assignments, meetings, and more? Add your phone number to do so. Please note that this is entirely optional and if you are under the age of 18 you must get parental/guardian consent to opt in."
                          class=""
                        >
                          <button
                            class="mr-3 d-inline-flex"
                            v-if="!enableEdit"
                            @click="enableEdit = true"
                          >
                            <span class="d-flex"
                              ><i class="i-edit-pen j-icon i-md bg-primary-dark"></i
                            ></span>
                            <span class="color-primary-dark">Edit</span>
                          </button>

                          <div class="card card-primary02 p-2 border border--form2">
                            <p
                              class="mb-0 text-16 color-secondary d-flex flex-row align-items-center"
                            >
                              <span class="text-20"
                                ><i class="i-phone j-icon i-lg bg-text-secondary"></i
                              ></span>
                              <input
                                :disabled="!enableEdit"
                                type="text"
                                class="pl-3 word-break text-truncate w-100 color-secondary"
                                v-model="phoneNumber"
                                @change="checkValueChange()"
                                @input="checkValue()"
                                maxlength="15"
                              />
                            </p>
                          </div>
                          <span
                            class="mt-1 text-12 color-danger"
                            v-if="phoneInvalid"
                            >Please enter a valid phone number with country
                            code</span
                          >
                      </div>

                      <div class="d-flex flex-wrap mt-3 align-items-center justify-content-end">
                        <button
                            class="btn btn-secondary btn-sm mr-2"
                            v-if="enableEdit"
                            @click="
                              enableEdit = false;
                              cancelEditPhone();
                            "
                          >Cancel
                          </button>
                          <button class="btn btn-primary btn-sm" v-if="enableEdit" @click="phoneUpdate()">
                            Save changes
                          </button>
                      </div>
                    </div>

                    <!-- <div v-if="user_type == 3" class="col-md-12">
                      <div class="row">
                        

                        <div class="col-xl-12">
                          
                        </div>
                      </div>
                    </div> -->
                  </div>
                </div>
                <div class="row justify-content-center">
                  <!-- <div class="col-12 col-md-4">
                      <div class="card card-primary p-3 h-100">
                        <p class="mb-0 text-16 color-secondary d-flex flex-column">
                          <span class="text-30"><i class="fas fa-school"></i></span>
                          <span>{{ schoolName }}</span>
                        </p>
                      </div>
                    </div> -->
                </div>
                <!-- <div class="form-group">
                    <label for="">Name of school</label>
                    <div class="form-field">{{ schoolName }}</div>
                  </div> -->
                <!-- <div class="form-group">
                                        <label for="">Class</label>
                                        <div class="form-field">IX</div>
                                   </div> -->

                <!-- <div class="row justify-content-end">
                    <div class="col-4">
                      <img src="../../static/image/student_img.png" alt=" img-fluid card-img">
                    </div>
                  </div> -->
                <!-- </form> -->
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
        <div
          class="modal-dialog modal-md modal-dialog-centered"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header pb-0">
              <h3 class="modal-title" id="exampleModalLongTitle">
                Confirm Delete
              </h3>
              <!-- <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button> -->
            </div>
            <div class="modal-body">
              <div>Are you sure you want to delete the profile image?</div>
            </div>
            <div class="modal-footer justify-content-end border-top-0">
              <button
                type="button"
                class="btn btn-secondary py-1 px-4 rounded-8 font-semi-bold"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary py-1 px-4 rounded-8 font-semi-bold"
                data-dismiss="modal"
                @click="confirmDelete()"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal End -->

      <!-- Send request to upgrade user confirmation end  -->
      <div
        class="modal fade"
        id="upgradeConfirm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="upgradeConfirmModalCenterTitle"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered add-assmt"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header pb-1">
              <h3 class="modal-title" id="upgradeConfirmModalLongTitle">
                Request Confirmation
              </h3>
            </div>
            <div class="modal-body px-3 bold-6">
              Send request to become a school admin?
            </div>
            <div class="modal-footer justify-content-end border-top-0">
              <button
                type="button"
                class="btn btn-void py-1 px-3 rounded-8 font-semi-bold"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary py-1 px-3 rounded-8 font-semi-bold"
                :disabled="processingUpgrade"
                @click="upgrade()"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Send request to upgrade user confirmation end  -->
    </section>

    <!-- End Study Page -->
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import { defaultImage, JOCHI_PRO_PIC } from "../../assets/js/constants";
import { eventBus } from "~/plugins/eventbus.js";
var fileCheck = false;
var filepptCheck = false;

export default {
  name: "UserProfile",
  components: {
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
      accordionOpened:false,
      email: "",
      name: "",
      schoolName: "",
      profilePic: null,
      profileImageUrl: "",
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      fileName: [],
      file_type: "",
      fileCheck: false,
      filepptCheck: false,
      profile: "",
      defaultImage: defaultImage,
      JOCHI_PRO_PIC: JOCHI_PRO_PIC,
      submitted: false,
      user_type: "",
      phoneNumber: "",
      notifyStatus: false,
      phoneInvalid: false,
      enableEdit: false,
      smsNotify: false,
      meetingNotify: false,
      clubNotify: false,
      assignmentNotify: false,
      sessionNotify: false,
      requestSent: "0",
      isSchoolAdmin: "0",
      processingUpgrade: false,
      selectedTheme: "light", // Initially select the "light" theme
    };
  },
  created() {
    this.UserDetails();
    this.user_type = localStorage.getItem("user_type");
    if (this.user_type == "3") {
      this.getAllAdvisors();
      this.getAdvisor();
    } else {
      this.schoolAdminStatus();
    }
    this.fetchSettings();
    eventBus.$on('accordionOpened', (newValue) => {
      this.accordionOpened = newValue;
    });
  },
  mounted() {
    window.addEventListener("orientationchange", this.handleOrientationChange);
    setTimeout(() => {
      this.startIntro();
    }, 1000);
    const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
    // Set the selectedTheme property to the saved theme
    this.selectedTheme = savedTheme;
  }
  },
  computed: {
    ...mapState("profilePage", {
      allList: (state) => state.allList,
      requestList: (state) => state.requestList,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      profileImage: (state) => state.profile,
      advisorDetail: (state) => state.advisorDetail,
      phone: (state) => state.phone,
      notification: (state) => state.notification,
      notificationSettings: (state) => state.notificationSettings,
      schoolAdminRequested: (state) => state.schoolAdminRequested,
      schoolAdmin: (state) => state.schoolAdmin,
    }),
    startProductGuide() {
      return this.$store.state.startProductGuide;
    },
  },
  watch: {
    selectedTheme(newTheme) {
      localStorage.setItem('selectedTheme', newTheme);
      // When the selected theme changes, apply it to the <html> element's class
      const html = document.documentElement; // <html> element
      html.classList.remove("light-theme", "dark-theme"); // Remove all theme classes
      html.classList.add(newTheme + "-theme"); // Add the selected theme class
    },
  },
  methods: {
    ...mapActions("profilePage", {
      userDetails: "userDetails",
      uploadProfile: "uploadProfile",
      profileRemove: "profileRemove",
      getAdvisorRequests: "getAdvisorRequests",
      respondAdvisorRequest: "respondAdvisorRequest",
      getAdvisorDetail: "getAdvisorDetail",
      updatePhone: "updatePhone",
      notificationUpdate: "notificationUpdate",
      getSettings: "getSettings",
      upgradeUser: "upgradeUser",
      getSchoolAdminStatus: "getSchoolAdminStatus",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },

    async UserDetails() {
      this.loading = true;
      this.email = localStorage.getItem("email");
      this.name = localStorage.getItem("last_name");
      await this.userDetails({
        user_id: localStorage.getItem("id"),
      });
      this.schoolName = localStorage.getItem("school_name");
      if (localStorage.getItem("profile_pic")) {
        this.profile = localStorage.getItem("profile_pic");
      }
      if (localStorage.getItem("phone")) {
        this.phoneNumber = localStorage.getItem("phone");
      }
      if (localStorage.getItem("notifyStatus")) {
        this.notifyStatus =
          localStorage.getItem("notifyStatus") == "true" ? true : false;
      }

      this.loading = false;
    },

    async UploadProfile() {
      this.loading = true;
      const data = new FormData();
      data.append("file", this.profilePic);
      data.append("user_id", localStorage.getItem("id"));

      await this.uploadProfile(data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      this.loading = false;
      if (this.successMessage != "") {
        this.profile = localStorage.getItem("profile_pic");
        await $("#profileImage").attr("src", this.profile);
        await $("#profileImageTeacher").attr("src", this.profile);
        await $("#menu_profile_pic").attr("src", this.profile);
        this.removeFile();
        this.$toast.open({
          message: this.successMessage,
          type: this.successType,
          duration: 5000,
        });
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
    },
    checkFile(profileImage) {
      let parts = profileImage.name.split(".");
      let ext = parts[parts.length - 1];
      if (ext == "png" || ext == "jpg" || ext == "jpeg") {
        // this.onFileChange();
        return true;
      }
      if (localStorage.getItem("profile_pic")) {
        this.profile = localStorage.getItem("profile_pic");
        $("#profileImage").attr("src", this.profile);
        $("#profileImageTeacher").attr("src", this.profile);
        $("#menu_profile_pic").attr("src", this.profile);
      }
      this.$toast.open({
        message: "File type accepts only PNG,JPG,JPEG formats",
        type: "warning",
        duration: 5000,
      });
      return false;
    },
    async ProfileRemove() {
      this.loading = true;
      await this.profileRemove({
        user_id: localStorage.getItem("id"),
      });
      this.loading = false;
      if (this.successMessage != "") {
        this.UserDetails();
        this.$router.go();
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
    },
    onFileChange(e) {
      if (e.target.files[0] && this.checkFile(e.target.files[0])) {
        if (
          e?.target?.files[0]?.size &&
          e.target.files[0]?.size > 5 * 1024 * 1024
        ) {
          // document.querySelector("#fileUpload").value = "";
          document.querySelector("#actual-btn").value = "";
          return this.$toast.open({
            message: "File size must be lesser than 5 MB",
            type: "warning",
          });
        }

        this.profilePic = this.$refs.profilePic.files[0];
        const file = e.target.files[0];
        this.profileImageUrl = URL.createObjectURL(file);
        this.UploadProfile();
      }
      //
    },
    removeFile() {
      this.profileImageUrl = "";
      this.profilePic = null;
      $("#ElectionDocChange").remove();
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
    async getAllAdvisors() {
      await this.getAdvisorRequests();
    },
    async respondRequest(status, advisor) {
      this.submitted = true;
      await this.respondAdvisorRequest({
        teacher_id: advisor.teacher_id,
        response: status,
        token: advisor.advisor_token,
      });
      this.submitted = false;
      this.getAllAdvisors();
      this.getAdvisor();
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.successType,
          duration: 5000,
        });
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
    },
    async getAdvisor() {
      await this.getAdvisorDetail();
    },
    async openModal() {
      $("#exampleModalCenter").modal({ backdrop: true });
    },
    async confirmDelete() {
      this.ProfileRemove();
      $(".modal").modal("hide");
      $(".modal-backdrop").remove();
    },
    checkValue() {},
    checkValueChange() {
      const phonePattern = /^(\+\d{1,3}[- ]?)?\d{10,15}$/;
      if (
        !phonePattern.test(this.phoneNumber) ||
        !this.phoneNumber.includes("+")
      ) {
        this.phoneInvalid = true;
      } else {
        this.phoneInvalid = false;
      }
    },
    async phoneUpdate() {
      this.checkValueChange();
      if (!this.phoneInvalid) {
        await this.updatePhone({
          phone_number: this.phoneNumber,
        });
        if (this.successMessage != "") {
          localStorage.setItem("phone", this.phoneNumber);
          this.$toast.open({
            message: this.successMessage,
            type: this.successType,
            duration: 5000,
          });
        } else if (this.errorMessage != "") {
          this.$toast.open({
            message: this.errorMessage,
            type: this.errorType,
            duration: 5000,
          });
        }
      }
    },
    async updateNotification(event, type) {
      await this.notificationUpdate({
        enable_status: event.target.checked,
        assignments: type == "assignment" ? 1 : "",
        meetings: type == "meeting" ? 1 : "",
        sessions: type == "session" ? 1 : "",
        clubs: type == "club" ? 1 : "",
        SMS: type == "sms" ? 1 : "",
      });
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.successType,
          duration: 5000,
        });
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
    },
    async fetchSettings() {
      await this.getSettings();
      this.smsNotify = this.notificationSettings.SMS_notification
        ? true
        : false;
      this.assignmentNotify = this.notificationSettings.assignments
        ? true
        : false;
      this.clubNotify = this.notificationSettings.clubs ? true : false;
      this.meetingNotify = this.notificationSettings.meetings ? true : false;
      this.sessionNotify = this.notificationSettings.sessions ? true : false;
    },
    async upgrade() {
      this.loading = true;
      this.processingUpgrade = true;
      await this.upgradeUser({ teacher_id: localStorage.getItem("id") });
      this.loading = false;
      this.processingUpgrade = false;
      $(".modal").modal("hide");
      $(".modal-backdrop").remove();
      if (this.successMessage != "") {
        this.requestSent = "1";
        localStorage.setItem("schoolAdminRequested", "1");
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
    },
    async schoolAdminStatus() {
      await this.getSchoolAdminStatus();
      this.requestSent = this.schoolAdminRequested;
      this.isSchoolAdmin = this.schoolAdmin;
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
          if (state != "skip") this.$router.push("/planner-day");
        });
        intro.onexit(() => {
          if (!completed) this.$store.commit("setStartProductGuide", false);
        });
      }
    },
    async openRequestConfirm() {
      $("#upgradeConfirm").modal({ backdrop: true });
    },
    handleOrientationChange() {
      const intro = this.$intro();
      intro.exit();
      this.$store.commit("setStartProductGuide", false);
    },
    cancelEditPhone() {
      this.phoneInvalid = false;
      if (localStorage.getItem("phone")) {
        this.phoneNumber = localStorage.getItem("phone");
      }
    },
  },
  destroyed() {
    window.removeEventListener(
      "orientationchange",
      this.handleOrientationChange
    );
  },
  // // middleware: "authenticated",
};
</script>
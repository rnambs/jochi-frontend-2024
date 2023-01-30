<template>
  <div class="main-section">
    <!-- profile Page -->
    <section id="study-detail" class="">
      <div
        class="
          study-section
          jochi-components-light-bg
          custom-margin-for-main-section custom-full-height
          d-flex
          flex-column
        "
      >
        <div class="inner-study p-4 d-flex flex-column flex-fill h-100">
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="color-primary font-bold">Profile</h2>
          </div>
          <div
            class="
              profile-row
              study-row
              px-2
              d-flex
              flex-column flex-fill
              justify-content-start
              pt-3
            "
          >
            <div
              class="
                study-col
                profile-col
                d-flex
                flex-column
                justify-content-end
                align-items-center
                flex-fill
              "
            >
              <form id="form" enctype="multipart/form-data">
                <div class="">
                  <div class="upload-image position-relative">
                    <div
                      class="
                        proof-img-wrp
                        position-relative
                        cursor-pointer
                        d-flex
                        justify-content-center
                      "
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
                          this.profile !=
                            'https://jochi-developement.s3.ap-south-1.amazonaws.com/profilePic/1634542050892.png'
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
                            class="
                              text-remove
                              color-secondary
                              text-14 text-nowrap
                            "
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
                        class="
                          pic-edit
                          w-100
                          d-flex
                          flex-row-reverse
                          position-absolute
                        "
                      >
                        <i
                          class="
                            fas
                            fa-pen
                            rounded-circle
                            position-relative
                            text-16
                            d-flex
                            align-items-center
                            justify-content-center
                            bg-theme
                            text-white
                          "
                        >
                          <!-- accept=".png,.jpeg,.jpg,.doc,.docx,.pdf" -->
                          <input
                            type="file"
                            :v-model="profilePic"
                            ref="profilePic"
                            name="profilePic"
                            id="fileUpload"
                            class="
                              rg-img-upload
                              img-up-two
                              cursor-pointer
                              position-absolute
                              w-100
                              h-100
                              rounded-circle
                            "
                            @change="onFileChange()"
                            accept=".jpeg,.jpg,.png"
                          />
                        </i> </span
                      ><br />
                    </div>
                    <div v-else class="custom-upload-with-msg text-center">
                      <span
                        class="
                          pic-edit
                          w-100
                          d-flex
                          flex-row-reverse
                          position-absolute
                        "
                      >
                        <i
                          class="
                            fas
                            fa-pen
                            rounded-circle
                            position-relative
                            text-16
                            d-flex
                            align-items-center
                            justify-content-center
                            bg-theme
                            text-white
                          "
                        >
                          <input
                            id="actual-btn"
                            type="file"
                            :v-model="profilePic"
                            ref="profilePic"
                            name="profilePic"
                            class="
                              rg-img-upload
                              img-up-two
                              cursor-pointer
                              position-absolute
                              w-100
                              h-100
                              rounded-circle
                            "
                            @change="onFileChange"
                            accept=".jpeg,.jpg,.png"
                          />
                        </i> </span
                      ><br />
                    </div>
                  </div>
                </div>
                <h4 class="text-center color-dark font-semi-bold">
                  <!-- <span><i class="fas fa-user"></i></span> -->
                  {{ name }}
                </h4>

                <!-- <button
            id="clckPrevent"
            type="submit"
            class="btn btn-primary "
            :disabled="!profileImageUrl || loading"
          >
          <span class="mr-2"><i class="fas fa-save"></i></span> <span>Save Changes</span>
          </button> -->
              </form>
            </div>
            <div
              class="
                study-col
                d-flex
                flex-column
                justify-content-start
                flex-fill
              "
            >
              <div class="form-section mx-auto w-100 py-3">
                <!-- <form action="" class="container"> -->
                <!-- <div class="form-group">
                    <label for="">Email</label>
                    <div class="form-field">{{ email }}</div>
                  </div> -->
                <div>
                  <div
                    class="
                      row
                      flex-column
                      justify-content-center
                      align-items-center
                    "
                  >
                    <div class="col-12 col-md-7">
                      <div
                        class="card card-primary p-3 h-100 d-flex flex-column"
                      >
                        <p
                          class="
                            mb-0
                            text-16
                            color-secondary
                            d-flex
                            flex-row
                            align-items-baseline
                          "
                        >
                          <span class="text-24"
                            ><i class="fas fa-envelope"></i
                          ></span>
                          <span class="ml-2">{{ email }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="col-12 col-md-7">
                      <div class="card card-primary p-3 h-100">
                        <p
                          class="
                            mb-0
                            text-16
                            color-secondary
                            d-flex
                            flex-row
                            align-items-baseline
                          "
                        >
                          <span class="text-24"
                            ><i class="fas fa-school"></i
                          ></span>
                          <span class="ml-2">{{ schoolName }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="col-12 col-md-7">
                      <input type="checkbox" id="switch_time" />
                      <label for="switch_time">Notification</label>
                      <div class="card card-primary p-3 h-100">
                        <p
                          class="
                            mb-0
                            text-16
                            color-secondary
                            d-flex
                            flex-row
                            align-items-baseline
                          "
                        >
                          <span class="text-24"
                            ><i class="fas fa-phone"></i
                          ></span>
                          <input
                            type="text"
                            v-model="valuePhone"
                            @change="checkValueChange()"
                            @input="checkValue()"
                            maxlength="15"
                          />
                        </p>
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

                    <div v-if="user_type == '3'" class="col-12 col-md-7">
                      <div
                        v-if="advisorDetail && advisorDetail.first_name"
                        class="card card-primary p-3 h-100 d-flex flex-column"
                      >
                        <h4 class="color-dark font-semi-bold">Your Advisor</h4>
                        <div
                          class="d-flex align-items-center my-2 mr-3 min-w-200"
                        >
                          <div class="ld-img-section mr-3">
                            <div class="ld-img-holder">
                              <img
                                v-if="
                                  advisorDetail && advisorDetail.profile_pic
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
                    <div v-if="requestList.length > 0" class="col-12 col-md-7">
                      <div
                        class="card card-primary p-3 h-100 d-flex flex-column"
                      >
                        <h4 class="color-dark font-semi-bold">
                          Advisor Requests
                        </h4>
                        <div
                          v-for="advisor in requestList"
                          :key="advisor.id"
                          class="
                            d-flex
                            flex-column flex-md-row
                            align-items-center
                            my-2
                            mr-3
                            min-w-200
                          "
                        >
                          <div class="ld-img-section mr-0 mr-md-3 mb-2 mb-md-0">
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
                            class="
                              d-flex
                              flex-column flex-md-row
                              align-items-center
                              justify-content-between
                              w-100
                            "
                          >
                            <div class="ld-details-section">
                              <p v-if="advisor.teacher" class="ld-heading mb-1">
                                {{
                                  advisor.teacher.first_name +
                                  " " +
                                  advisor.teacher.last_name
                                }}
                              </p>
                            </div>

                            <div
                              class="
                                d-flex
                                align-items-center
                                justify-content-center
                              "
                            >
                              <button
                                class="
                                  btn btn-secondary
                                  px-4
                                  py-1
                                  rounded-pill
                                  mr-2
                                "
                                @click="respondRequest(2, advisor)"
                              >
                                Reject
                              </button>
                              <button
                                class="btn btn-primary px-4 py-1 rounded-pill"
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
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary py-1 px-4 rounded-12 font-semi-bold"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-success py-1 px-4 rounded-12 font-semi-bold"
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
    </section>

    <!-- End Study Page -->
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import { defaultImage } from "../../assets/js/constants";
var fileCheck = false;
var filepptCheck = false;

export default {
  name: "UserProfile",
  components: {
    lottie,
  },
  data() {
    return {
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
      submitted: false,
      user_type: "",
      valuePhone: "",
    };
  },

  created() {
    this.UserDetails();
    this.user_type = localStorage.getItem("user_type");
    if (this.user_type == "3") {
      this.getAllAdvisors();
      this.getAdvisor();
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
    }),
  },
  methods: {
    ...mapActions("profilePage", {
      userDetails: "userDetails",
      uploadProfile: "uploadProfile",
      profileRemove: "profileRemove",
      getAdvisorRequests: "getAdvisorRequests",
      respondAdvisorRequest: "respondAdvisorRequest",
      getAdvisorDetail: "getAdvisorDetail",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },

    async UserDetails() {
      this.loading = true;
      await this.userDetails({
        user_id: localStorage.getItem("id"),
      });

      this.email = localStorage.getItem("email");
      this.name = localStorage.getItem("first_name");
      this.schoolName = localStorage.getItem("school_name");
      if (localStorage.getItem("profile_pic")) {
        this.profile = localStorage.getItem("profile_pic");
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
    checkValue() {
      console.log(this.valuePhone);
      const phonePattern = /^(\+|\d+)$/;
      if (!phonePattern.test(this.valuePhone)) {
        this.valuePhone = this.valuePhone.slice(0, -1);
      }
      console.log(this.valuePhone);
    },
    checkValueChange() {
      console.log(this.valuePhone);
      const phonePattern = /^(\+\d{1,3}[- ]?)?\d{10,15}$/;
      if (!phonePattern.test(this.valuePhone)) {
        this.valuePhone = this.valuePhone.slice(0, -1);
      }
      console.log(this.valuePhone);
    },
  },
  // // middleware: "authenticated",
};
</script>
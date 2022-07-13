<template>
  <div class="main-section">
    <!-- profile Page -->
    <section id="study-detail" class="">
      <div class="study-section container">
        <div class="inner-study container p-3 mt-4">
          <div class="col-12 px-4 d-flex justify-content-between">
            <h4>Profile</h4>
          </div>
          <div class="row profile-row study-row px-5">
            <div class="col-md-6 study-col profile-col d-flex flex-column justify-content-center align-items-center">
              <form
                method="post"
                @submit.prevent="UploadProfile"
                id="form"
                enctype="multipart/form-data"
              >
                <div class="upload-area">
                  <div class="upload-image position-relative">
                    <div class="proof-img-wrp position-relative cursor-pointer">
                      <img
                        v-if="profileImageUrl"
                        :src="profileImageUrl"
                        class="profile-pic rounded-circle"
                        alt=""
                      />
                      <img
                        v-if="!profileImageUrl"
                        :src="profile ? profile : defaultImage"
                        class="profile-pic"
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
                        <div class="text-30 color-dark" @click="ProfileRemove()">
                          <i class="far fa-trash-alt"></i>
                          <p class="text-remove color-secondary text-14 text-nowrap">Remove profile</p>
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
                      <span class="pic-edit w-100 d-flex flex-row-reverse position-absolute">
                        <i class="fas fa-pen rounded-circle color-dark position-relative text-16">
                          <!-- accept=".png,.jpeg,.jpg,.doc,.docx,.pdf" -->
                          <input
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
                    <div v-else class="custom-upload-with-msg text-center">
                      <span class="pic-edit w-100 d-flex flex-row-reverse position-absolute">
                        <i class="fas fa-pen rounded-circle color-dark position-relative text-16">
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
                <h6 class="text-center color-dark">{{ name }}</h6>
                <button
                  id="clckPrevent"
                  type="submit"
                  class="btn btn-primary "
                  :disabled="!profileImageUrl || loading"
                >
                  <i class="far fa-save pr-1 font-regular"></i>Save Changes
                </button>
              </form>
            </div>
            <div class="col-md-6 study-col d-flex flex-column justify-content-center">
              <div
                class="form-section mt-4 mb-4 mx-auto w-100 py-4 px-0 pr-md-5"
              >
                <form action="" class="container">
                  <div class="form-group">
                    <label for="">Email</label>
                    <div class="form-field">{{ email }}</div>
                  </div>
                  <div class="form-group">
                    <label for="">Name of school</label>
                    <div class="form-field">{{ schoolName }}</div>
                  </div>
                  <!-- <div class="form-group">
                                        <label for="">Class</label>
                                        <div class="form-field">IX</div>
                                   </div> -->
                  <div class="form-group">
                    <div class="form-field change-pwd">
                      <nuxt-link to="/user-reset-password">
                        <span><i class="fas fa-lock"></i></span>
                        <span>Change Password</span>
                      </nuxt-link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    };
  },

  mounted() {
    this.UserDetails();
  },
  computed: {
    ...mapState("profilePage", {
      allList: (state) => state.allList,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      profileImage: (state) => state.profile,
    }),
  },
  methods: {
    ...mapActions("profilePage", {
      userDetails: "userDetails",
      uploadProfile: "uploadProfile",
      profileRemove: "profileRemove",
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
      this.profilePic = this.$refs.profilePic.files[0];
      const file = e.target.files[0];
      this.profileImageUrl = URL.createObjectURL(file);

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
  },
  // // middleware: "authenticated",
};
</script>
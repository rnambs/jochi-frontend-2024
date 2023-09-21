<template>
  <div class="w-100 main-container register vh-100" data-app>
    <!-- <div class="text-center" v-if="loading && loadingMessage">
      {{ loadingMessage }}
    </div> -->
    <!-- <img
      src="../static/image/login-bg.jpg"
      alt=""
      class="bg-img d-none d-md-flex"
    />
    <img
      src="../static/image/login-bg-rotate.jpg"
      alt=""
      class="bg-img d-flex d-md-none"
    /> -->

    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div
      v-if="loading && loadingMessage"
      id="fountainTextG"
      class="d-flex align-items-center justify-content-center w-100 m-0 h-100 position-absolute"
    >
      <div class="fountainTextG">{{ loadingMessage }} &nbsp;</div>

      <div id="fountainTextG_2" class="fountainTextG animation">. &nbsp;</div>
      <div id="fountainTextG_3" class="fountainTextG animation">. &nbsp;</div>
      <div id="fountainTextG_4" class="fountainTextG animation">. &nbsp;</div>
    </div>
    <div class="row main-row flex-row vh-100 m-0 w-100">
      <div
        class="col-md-6 form-section d-flex align-items-center justify-content-center h-md-100"
      >
        <!-- Sign-Up -->

        <section
          id="sign-up"
          class="login-box d-flex flex-column h-100 w-100"
        >
        <div class="d-flex flex-column align-items-center justify-content-center h-100">
          <div class="logo-img d-flex align-items-center justify-content-center justify-content-md-start w-100">
            <img src="../static/image/jochi-rid-logo.png" alt="" class="logo-icon" />
          </div>
          <div
            class="d-flex flex-column my-0 my-md-auto w-100 justify-content-center p-3 px-3 px-md-5 px-lg-3"
          >
            <div
              class="card border-0 rounded-22 p-1 p-md-4 p-xl-5 d-flex flex-column align-items-center align-items-md-start"
            >
              <!-- <img
                src="../static/image/edlink-jochi.png"
                alt=""
                class="mb-2 mb-lg-4 passport-img py-4 py-md-2 py-xl-4"
              /> -->
              <div class="d-flex flex-column align-items-center align-items-md-start mb-4 mb-lg-5">
                <h1 class="heading1 color-text-primary text-center text-md-left">Welcome to Jochi!</h1>
                <p class="mb-4 text-24 color-text-gray text-center text-md-left font-semi-bold">Sign-in with your school account</p>
                <button
                  class="btn btn-sign-in"
                  @click="redirectToGg4L()"
                >
                Single-Sign On
                </button>
              </div>
              <div class="d-flex flex-column">
                <a href="mailto:contact@jochi.info" class="d-flex align-items-center text-decoration-none mb-2">
                  <img src="../static/image/magic-trick-dynamic-color.png" alt="magic trick" class="btn-icon-lg me-1" />
                  <p class="mb-0 text-24 color-text-gray font-semi-bold">Support & Tutorials</p>
                </a>
                <a href="https://www.notion.so/jochi/Privacy-Policy-91d3a5ff9e5a49f0b4f8a4a830091bab" class="d-flex align-items-center text-decoration-none mb-2">
                  <img src="../static/image/sheild-dynamic-color.png" alt="magic trick" class="btn-icon-lg me-1" />
                  <p class="mb-0 text-24 color-text-gray font-semi-bold">Privacy Policy</p>
                </a>
                <a href="" class="d-flex align-items-center text-decoration-none mb-2">
                  <img src="../static/image/club-icon.png" alt="magic trick" class="btn-icon-lg me-1" />
                  <p class="mb-0 text-24 color-text-gray font-semi-bold">Clubs by Jochi</p>
                </a>
              </div>
              <!-- <form action="" class="sign-in" @submit.prevent="GetSignUp">
                <div class="row mb-3">
                  <div class="col-12">
                    <div class="form-row m-0">
                      <label class="form-label" for="name">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="name"
                        :class="{ 'is-invalid': submitted && $v.name.$error }"
                        placeholder="Enter Name"
                        maxlength="150"
                      />
                      <div
                        v-if="submitted && $v.name.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.name.required">This field is required</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-12">
                    <div class="form-row m-0">
                      <label class="form-label" for="email">Email</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="Email"
                        :class="{ 'is-invalid': submitted && $v.Email.$error }"
                        placeholder="Enter Email"
                        maxlength="320"
                      />
                      <div
                        v-if="submitted && $v.Email.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.Email.required"
                          >This field is required</span
                        >
                        <span v-if="!$v.Email.email">Email is invalid</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-12">
                    <div class="form-row m-0 flex-column">
                      <label for="state" class="form-label">School </label>
                      <multiselect
                        v-model="value"
                        :options="schools"
                        track-by="name"
                        label="name"
                        placeholder="Select your school"
                        @input="SchoolSelection"
                        :class="{ 'is-invalid': submitted && $v.value.$error }"
                      >
                        <span slot="noResult">No data found</span>
                      </multiselect>
                      <div
                        v-if="submitted && $v.value.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.value.required"
                          >This field is required</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-12">
  
                    <div class="form-row m-0">
                      <label class="form-label" for="Password">Student ID</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter your ID"
                        v-model="studentId"
                        :class="{
                          'is-invalid': submitted && $v.studentId.$error,
                        }"
                      /><br />
                      <div
                        v-if="submitted && $v.studentId.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.studentId.required"
                          >This field is required</span
                        >
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 my-4">
                        <span>Already have an account? </span
                        ><span
                          ><nuxt-link to="/" class="btn-link"
                            >Sign in</nuxt-link
                          ></span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-2 mt-4">
                  <div class="col-12 signin-button-section">
                    <button action="" class="signin" :disabled="processing">
                      <strong>Sign Up</strong>
                    </button>
                  </div>
                </div>
              </form> -->
            </div>
            <!-- <div
              class="login-icon-area d-flex align-items-center justify-content-between p-4"
            >
              <a class="btn" href="https://www.instagram.com/jochi.info/"
                ><img
                  src="../static/image/social-icon/Instagram logo.png"
                  alt=""
              /></a>
              <a class="btn" href="https://mobile.twitter.com/JochiInfo"
                ><img src="../static/image/social-icon/Twitter Png.png" alt=""
              /></a>
              <a class="btn" href="https://www.tiktok.com/@jochiapp"
                ><img src="../static/image/social-icon/TikTok Logo.png" alt=""
              /></a>
              <a
                class="btn"
                href="https://open.spotify.com/user/j67o7nwic4neqgxjhxd17bsb7?si=FSnQG04QTVWIJVqGfUvmOQ"
                ><img src="../static/image/social-icon/Spotify Logo.png" alt=""
              /></a>
              <a
                class="btn"
                href="https://www.youtube.com/channel/UCu063irMWPCQz4AkWkdwCBA"
                ><img src="../static/image/social-icon/YouTube Png.png" alt=""
              /></a>
            </div> -->
          </div>
        </div>
          <div class="d-flex d-md-none flex-column color-dark">
            <a class="text-decoration-none text-15 color-text-gray font-semi-bold text-center mb-1" href="">contact@jochi.info</a>
            <a class="text-decoration-none text-15 color-text-gray font-semi-bold text-center" href="">www.jochi.info</a>
          </div>
          <!-- <div class="d-flex flex-column justify-content-center">
            <a
              href="https://www.jochi.info"
              class="text-center color-secondary font-regular text-16"
              >www.jochi.info</a
            > -->
            <!-- <span class="text-center color-secondary font-regular text-16">
              contact@jochi.info</span
            > -->
            <!-- <a
              href="mailto:contact@jochi.info"
              class="text-center color-secondary font-regular text-16"
              >contact@jochi.info</a
            >
          </div> -->
        </section>
      </div>
      <div
        class="col-md-6 img-section login-cover d-none d-md-flex flex-column align-items-center justify-content-between h-md-100 flex-fill"
      >
        <div class="d-flex flex-column align-items-center bg-theme-secondary w-100 h-100 rounded-30 p-4">
          <img
            src="../static/image/icon-image-group.png"
            alt="undraw"
            class="img-responsive jump my-auto"
          />
          <div class="d-flex flex-column color-dark">
            <a class="text-decoration-none text-15 color-white font-semi-bold text-center mb-1" href="">contact@jochi.info</a>
            <a class="text-decoration-none text-15 color-white font-semi-bold text-center" href="">www.jochi.info</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import Multiselect from "vue-multiselect";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import {
  REDIRECT_LOGIN_URL,
  GG4L_REDIRECT_LOGIN_URL,
} from "~/assets/js/constants";
const crypto = require("crypto");

var schoolSelectValue = "";

export default {
  middleware: 'authenticated',
  name: "student-signup",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/custom.css" }],
    };
  },
  components: {
    Multiselect,
    lottie,
  },
  data() {
    return {
      name: "",
      Email: "",
      studentId: "",
      submitted: false,
      processing: false,
      value: "",
      loading: false,
      loadingMessage: "",
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      redirect: "",
    };
  },

  validations: {
    name: { required },
    Email: { required, email },
    value: { required },
    studentId: { required },
  },

  beforeMount() {
    // window.localStorage.clear();

    // this.redirect = GG4L_REDIRECT_LOGIN_URL + REDIRECT_LOGIN_URL;
    this.redirect = GG4L_REDIRECT_LOGIN_URL;
    if (localStorage.getItem("email")) {
      var userType = localStorage.getItem("user_type");
      var schoolAccess = localStorage.getItem("schoolAccess");
      if (userType == "1") {
        this.$router.push("/dashboard");
      }else if (userType == "3" && schoolAccess == 'ClubOnly') {
        this.$router.push("/club-detail");
      }else if (userType == "3") {
        this.$router.push("/student-dashboard");
      } else if (userType == "2" && schoolAccess == 'ClubOnly') {
        this.$router.push("/club-detail");
      }else if (userType == "2") {
        this.$router.push("/teacher-dashboard");
      }
    }
    const log_code = this.generateRandomString(16);
    localStorage.setItem("log_code", log_code);
  },
  computed: {
    ...mapState("studentSignUp", {
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      schools: (state) => state.schools,
    }),
  },

  methods: {
    ...mapActions("studentSignUp", {
      getSignUp: "getSignUp",
      getSchool: "getSchool",
    }),
    ...mapActions("redirectLogin", {
      redirectLog: "redirectLog",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async GetSignUp() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.processing = true;

        this.loading = true;
        this.loadingMessage =
          "Schoology ID verification is in progress, Please wait ";
        await this.getSignUp({
          first_name: this.name,
          email: this.Email,
          school_id: schoolSelectValue,
          lms_id: this.studentId,
        });
        this.loadingMessage = "";
        this.loading = false;
        if (this.errorMessage != "") {
          this.$toast.open({
            message: this.errorMessage,
            type: this.errorType,
            duration: 5000,
          });
        }
        this.processing = false;
      }
    },
    SchoolSelection(val) {
      if (val) {
        schoolSelectValue = val.id;
      }
    },
    async redirectToGg4L() {
      await this.redirectLog({
        log_code: localStorage.getItem("log_code"),
        logged_in_date: moment().format("YYYY-MM-DD"),
        status: "Pending",
      });
      window.location.href = this.redirect;
    },
    generateRandomString(length) {
      const buffer = crypto.randomBytes(Math.ceil(length / 2));
      const hexString = buffer.toString("hex").slice(0, length);
      return hexString;
    },
  },
};
</script>
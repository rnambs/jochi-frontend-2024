<template>
  <div class="w-100 main-container register vh-100" data-app>
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
      <div class="col-md-6 form-section d-flex align-items-center justify-content-center h-md-100">
        <section id="sign-up" class="login-box d-flex flex-column h-100 w-100">
          <div class="d-flex flex-column align-items-center justify-content-center h-100">
            <div class="logo-img d-flex align-items-center justify-content-center justify-content-md-start w-100">
              <img src="../static/image/jochi-rid-logo.png" alt="" class="logo-icon" />
            </div>
            <div class="d-flex flex-column my-0 my-md-auto w-100 justify-content-center p-3 px-3 px-md-5 px-lg-3">
              <div class="card border-0 rounded-22 p-1 p-md-4 p-xl-5 d-flex flex-column align-items-center align-items-md-start">
                <div class="d-flex flex-column align-items-center align-items-md-start">
                  <h1 class="heading1 color-text-primary text-center text-md-left">Welcome to Jochi!</h1>
                  <p class="mb-4 text-24 color-text-gray text-center text-md-left font-semi-bold">Sign-in with your school account</p>
                  <button class="btn btn-sign-in" @click="redirectToGg4L()">
                  Single-Sign On
                  </button>
                  <p class="text-privacy-policy text-center">
                    By signing in, you agree to our
                    <a href="https://www.jochi.info/privacy-policy" target="_blank">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="col-md-6 img-section login-cover d-none d-md-flex flex-column align-items-center justify-content-between h-md-100 flex-fill">
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
<style scoped>
  /* Add your Lato or Open Sans font import here, e.g., */
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

  /* Apply the font to all text within the component */
  .main-container {
    font-family: 'Lato', sans-serif;
  }

  .text-privacy-policy {
    margin-top: 20px;
    font-size: 14px;
  }
</style>
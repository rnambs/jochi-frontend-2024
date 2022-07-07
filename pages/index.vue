<template>
  <div class="container-fluid main-container jochi-main-bg-light">
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div class="row main-row">
      <div class="col-md-6 img-section">
        <img
          src="~/assets/images/undraw/Undraw.png"
          alt="undraw"
          class="img-responsive"
        />
      </div>
      <div class="col-md-5 col-lg-4 form-section" v-if="!isLoggedIn">
        <h1 class="heading mb-5">Sign in</h1>
        <div class="jochi-components-light-bg p-5">
          <form action="" class="sign-in" @submit.prevent="GetSignIn">
            <div class="row mb-3">
              <div class="col-12">
                <div class="form-row m-0">
                  <label class="form-label" for="username">Email Address</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="Email"
                    :class="{ 'is-invalid': submitted && $v.Email.$error }"
                    maxlength="320"
                  />
                  <div
                    v-if="submitted && $v.Email.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.Email.required">Email is required</span>
                    <span v-if="!$v.Email.email">Email is invalid</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-12">
                <div class="form-row m-0">
                  <div class="d-flex w-100 justify-content-between">
                    <label class="form-label" for="Password">Password</label>
                    <nuxt-link class="btn-link" to="/forgot-password"
                      >Forgot Password?</nuxt-link
                    >
                  </div>
                  <div class="password-eye position-relative w-100">
                    <input
                      :type="passwordFieldType"
                      class="form-control"
                      v-model="password"
                      :class="{ 'is-invalid': submitted && $v.password.$error }"
                    />
                    <span
                      :class="passwordFieldType"
                      type="password"
                      id="eyeSpan"
                      @click="toggleVisiblity()"
                    >
                      <i class="eye-icon"></i>
                    </span>
                  </div>
                  <br />
                  <div
                    v-if="submitted && $v.password.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.password.required"
                      >Password is required</span
                    >
                    <!-- <span v-if="!$v.password.minLength"
                      >Password must be at least 8 characters</span
                    > -->
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 my-4">
                <span>Don't have an account? </span
                ><span
                  ><nuxt-link to="/student-signup" class="btn-link"
                    >Sign up</nuxt-link
                  ></span
                >
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 signin-button-section">
                <button
                  type="submit"
                  action=""
                  class="signin"
                  :disabled="processing"
                >
                  <strong>Sign In</strong>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";

export default {
  components: {
    lottie,
  },
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  data() {
    return {
      Email: "",
      password: "",
      submitted: false,
      processing: false,
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      isLoggedIn: false,
      currentToken: "",
      passwordFieldType: "password",
      code: this.$route.query.code,
      stateResp: this.$route.query.state,
    };
  },
  validations: {
    Email: { required, email },
    // password: { required, minLength: minLength(8) },
    password: { required },
  },
  mounted() {
    console.log("this code >>>>>>>>>>>>>>>>>>", this.code, this.stateResp);
    if (this.code && this.stateResp) {
      this.redirectToPassport();
    }

    this.getTokenDevice();

    if (localStorage.getItem("email")) {
      this.isLoggedIn = true;
      var userType = localStorage.getItem("user_type");

      if (userType == 3) {
        this.$router.push("planner-day");
      } else if (userType == 2) {
        this.$router.push("custom-availability");
      } else if (userType == 1) {
        this.$router.push("dashboard");
      }
    }
  },
  computed: {
    ...mapState("studentSignIn", {
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
    }),
  },
  methods: {
    ...mapActions("studentSignIn", {
      getSignIn: "getSignIn",
      passportRedirect: "passportRedirect",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async toggleVisiblity() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    async GetSignIn() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.loading = true;
        this.processing = true;
        await this.getSignIn({
          email: this.Email,
          password: this.password,
          deviceTokenWeb: this.currentToken,
        });
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
    async getTokenDevice() {
      this.currentToken = await this.$fire.messaging.getToken();
      console.log("consoling token", this.currentToken);
      this.$fire.messaging.onMessage((payload) => {
        console.info("Message received: ", payload);
      });
    },
    async redirectToPassport() {
      this.loading = true;
      await this.passportRedirect({
        code: this.code,
        state: this.stateResp,
      });
      this.loading = false;
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
      }
      if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
    },
  },
};
</script>
<template>
  <div class="w-100 main-container register" data-app>
    <!-- <div class="text-center" v-if="loading && loadingMessage">
      {{ loadingMessage }}
    </div> -->
    <img
      src="../static/image/login-bg.jpg"
      alt=""
      class="bg-img d-none d-md-block"
    />
    <img
      src="../static/image/login-bg-rotate.jpg"
      alt=""
      class="bg-img d-block d-md-none"
    />

    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div
      v-if="loading && loadingMessage"
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
      <div class="fountainTextG">{{ loadingMessage }} &nbsp;</div>

      <div id="fountainTextG_2" class="fountainTextG animation">. &nbsp;</div>
      <div id="fountainTextG_3" class="fountainTextG animation">. &nbsp;</div>
      <div id="fountainTextG_4" class="fountainTextG animation">. &nbsp;</div>
    </div>
    <div class="row main-row flex-row vh-100 m-0">
      <div
        class="
          col-md-6
          img-section
          login-cover
          d-flex
          flex-column
          align-items-center
          justify-content-between
          h-md-100
          flex-fill
        "
      >
        <div class="logo-img d-flex align-items-center w-100">
          <img src="../static/image/logo.png" alt="" class="logo-icon" />
        </div>
        <img
          src="../static/image/login-img.png"
          alt="undraw"
          class="img-responsive jump"
        />
        <p class="mb-0 color-white text-16 font-regular">
          FAQ's | Privacy Policy
        </p>
      </div>
      <div
        class="
          col-md-6
          form-section
          d-flex
          align-items-center
          justify-content-center
          h-md-100
        "
      >
        <!-- Sign-Up -->

        <section
          id="sign-up"
          class="login-box d-flex flex-column h-100 justify-content-between"
        >
          <div class="d-flex flex-column h-100 justify-content-center p-3">
            <div
              class="
                card
                rounded-22
                p-5
                d-flex
                flex-column
                justify-content-center
                align-items-center
              "
            >
              <img
                src="../static/image/school_passport.png"
                alt=""
                class="mb-4 passport-img py-4"
              />
              <button
                class="btn btn-primary font-semi-bold px-5"
                @click="redirectToGg4L()"
              >
                Sign in with School Passport
              </button>
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
            <div
              class="
                login-icon-area
                d-flex
                align-items-center
                justify-content-between
                p-4
              "
            >
              <a class="btn" href=""
                ><img
                  src="../static/image/social-icon/Instagram logo.png"
                  alt=""
              /></a>
              <a class="btn" href=""
                ><img src="../static/image/social-icon/Twitter Png.png" alt=""
              /></a>
              <a class="btn" href=""
                ><img src="../static/image/social-icon/TikTok Logo.png" alt=""
              /></a>
              <a class="btn" href=""
                ><img src="../static/image/social-icon/Spotify Logo.png" alt=""
              /></a>
              <a class="btn" href=""
                ><img src="../static/image/social-icon/YouTube Png.png" alt=""
              /></a>
            </div>
          </div>
          <div class="d-flex flex-column justify-content-center">
            <a href="" class="text-center color-secondary font-regular text-16"
              >www.jochi.info</a
            >
            <a href="" class="text-center color-secondary font-regular text-16">
              contact@jochi.info</a
            >
          </div>
        </section>
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
import { REDIRECT_LOGIN_URL } from "~/assets/js/constants";

var schoolSelectValue = "";

export default {
  name: "student-signup",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
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
  mounted() {
    this.redirect =
      "https://sso.gg4l.com/oauth/auth?response_type=code&client_id=PTRQTIBSJC&redirect_uri=" +
      REDIRECT_LOGIN_URL;
    if (localStorage.getItem("email")) {
      var userType = localStorage.getItem("user_type");
      if (userType == "1") {
        this.$router.push("/dashboard");
      } else if (userType == "3") {
        this.$router.push("/planner-day");
      } else if (userType == "2") {
        this.$router.push("/custom-availability");
      }
    }
    this.getSchool();
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
    redirectToGg4L() {
      window.location.href = this.redirect;
    },
  },
};
</script>
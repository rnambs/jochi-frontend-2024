<template>
  <div class="container-fluid main-container" data-app>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div class="row main-row">
      <div class="col-md-6 img-section">
        <img
          src="~/assets/images/undraw/Undraw_signUp.png"
          alt="undraw"
          class="img-responsive"
        />
      </div>
      <div class="col-md-5 col-lg-4 form-section">
        <!-- Sign-Up -->

        <section id="sign-up" class="">
          <h1 class="heading mb-5">Sign up</h1>
          <form action="" class="sign-in" @submit.prevent="TeacherSignUp">
            <div class="row mb-3">
              <div class="col-12">
                <div class="form-row m-0">
                  <label class="form-label" for="name"> Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="name"
                    :class="{ 'is-invalid': submitted && $v.name.$error }"
                    placeholder="Enter Name"
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
            <div class="row mb-2">
              <div class="col-12">
                <!-- teacher pwd -->
                <section id="teacher-id" class="">
                  <div class="form-row m-0">
                    <label class="form-label" for="Password">Password</label>
                    <div class="password-eye position-relative w-100">
                      <input
                        :type="passwordFieldType"
                        class="form-control"
                        placeholder="********"
                        v-model="password"
                        :class="{
                          'is-invalid': submitted && $v.password.$error,
                        }"
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
                        >This field is required</span
                      >
                      <span v-if="!$v.password.minLength"
                        >Password must be at least 8 characters</span
                      >
                    </div>
                  </div>
                </section>
                <!-- end teacher pwd -->
              </div>
            </div>
            <div class="row">
              <div class="col-12 my-4">
                <span>Already have an account? </span
                ><span
                  ><nuxt-link to="/" class="btn-link">Sign in</nuxt-link></span
                >
              </div>
            </div>
            <div class="row mb-2 mt-4">
              <div class="col-12 signin-button-section">
                <button action="" class="signin" :disabled="processing">
                  <strong>Sign Up</strong>
                </button>
              </div>
            </div>
          </form>
        </section>

        <!-- End Sign up -->
      </div>
    </div>
  </div>
</template>
<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import Multiselect from "vue-multiselect";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
var schoolSelectValue = "";
export default {
  name: "teacher-signup",
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
      password: "",
      submitted: false,
      value: "",
      loading: false,
      processing: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      passwordFieldType: "password",
    };
  },
  validations: {
    name: { required },
    Email: { required, email },
    password: { required, minLength: minLength(8) },
    value: { required },
  },
  mounted() {
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
    ...mapState("teacherSignUp", {
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      schools: (state) => state.schools,
    }),
  },

  methods: {
    ...mapActions("teacherSignUp", {
      teacherSignUp: "teacherSignUp",
      getSchool: "getSchool",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async toggleVisiblity() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    async TeacherSignUp() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.loading = true;
        this.processing = true;

        await this.teacherSignUp({
          first_name: this.name,
          last_name: this.last_name,
          email: this.Email,
          school_id: schoolSelectValue,
          password: this.password,
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
    SchoolSelection(val) {
      if (val) {
        schoolSelectValue = val.id;
      }
    },
  },
};
</script>
<template>
  <div class="container-fluid main-container">
    <div class="row main-row d-flex align-items-center flex-row vh-100">
      <div class="col-md-6 img-section">
        <img
          src="~/assets/images/undraw/Undraw_signUp.png"
          alt="undraw"
          class="img-responsive"
        />
      </div>
      <div class="col-md-5 col-lg-4 form-section">
        <section id="Reset Password" class="">
          <h1 class="heading mb-5">Forgot Password</h1>
          <form action="" class="sign-in" @submit.prevent="PasswordReset">
            <div class="row mb-4">
              <div class="col-12">
                <div class="form-row m-0">
                  <label class="form-label" for="email">Email</label>
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
                    <span v-if="!$v.Email.required"
                      >This field is required</span
                    >
                    <span v-if="!$v.Email.email">Email is invalid</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <div class="col text-left signin-button-section">
                    <button action="" class="signin my-3 px-4">
                      <strong>Submit</strong>
                    </button>
                  </div>
                  <div class="col text-right my-3 py-2">
                    <nuxt-link
                      class="text-decoration-none align-items-center btn-link"
                      to="/"
                    >
                      <span class="text-secondary">
                        <i
                          class="fa fa-chevron-left px-2"
                          aria-hidden="true"
                        ></i
                        >Back to
                      </span>
                      <span class="text-color">Login</span>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>

        <!-- END Sent to E-mail -->
      </div>
    </div>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";
export default {
  name: "user-forgot-password",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  data() {
    return {
      Email: "",
      submitted: false,
      processing: false,
    };
  },
  validations: {
    Email: { required, email },
  },
  computed: {
    ...mapState("studentForgotPassword", {
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  mounted() {
    if (localStorage.getItem("email")) {
      var userType = localStorage.getItem("user_type");
      if (userType == "1") {
        this.$router.push("/dashboard");
      } else if (userType == "3") {
        this.$router.push("/planner-day");
      } else if (userType == "2") {
        this.$router.push("/teacher-dashboard");
      }
    }
  },
  methods: {
    ...mapActions("studentForgotPassword", {
      passwordReset: "passwordReset",
    }),
    async PasswordReset() {
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        this.processing = true;

        await this.passwordReset({
          email: this.Email,
        });
        if (this.successMessage != "") {
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
          this.submitted = false;
          this.Email = "";
        } else if (this.errorMessage != "") {
          this.$toast.open({
            message: this.errorMessage,
            type: this.errorType,
            duration: 5000,
          });
        }
        this.processing = false;
      }
    },
  },
};
</script>
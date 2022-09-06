<template>
  <div>
    <div class="sufee-login d-flex align-content-center flex-wrap">
      <div class="container">
        <div class="login-content">
          <div class="login-logo">
            <img
              class="align-content"
              src="~/assets/images/jochi..svg"
              alt=""
            />
          </div>
          <div class="login-form">
            <form>
              <div class="form-group">
                <label>Email address</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email"
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
              <div class="button-section">
                <div class="row">
                  <div class="col">
                    <button
                      type="button"
                      class="btn btn-white btn-flat w-auto p-2"
                      data-target=""
                    ></button>
                  </div>
                </div>
              </div>

              <div class="text-center">
                <button
                  type="button"
                  class="btn btn-danger btn-flat w-auto"
                  @click="ForgotPassword()"
                  :disabled="processing"
                >
                  Reset My Password
                </button>
              </div>
              <div class="text-center mt-3 mb-2">
                <nuxt-link
                  class="text-decoration-none text-secondary"
                  to="/admin-login"
                >
                  <i class="fa fa-chevron-left" aria-hidden="true"></i> Back to
                  Login
                </nuxt-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
export default {
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

  computed: {
    ...mapState("forgotPassword", {
      errorMessage: (state) => state.errorMessage,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("forgotPassword", {
      forgotPassword: "forgotPassword",
    }),
    async ForgotPassword() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.processing = true;

        await this.forgotPassword({
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

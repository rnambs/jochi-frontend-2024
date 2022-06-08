<template>
  <div class="container-fluid main-container">
    <div class="row main-row">
      <div class="col-md-6 img-section">
        <img
          src="~/assets/images/undraw/Undraw_signUp.png"
          alt="undraw"
          class="img-responsive"
        />
      </div>
      <div class="col-md-5 col-lg-4 form-section">
        <!-- Reset Password-->

        <section id="Reset Password" class="">
          <h1 class="heading mb-5">Reset Password</h1>
          <form action="" class="sign-in" @submit.prevent="GetResetPassword">
            <div class="row">
              <div class="col-12 mb-3">
                <div class="form-row m-0">
                  <label class="form-label" for="Password"
                    >Current Password</label
                  >
                  <div class="password-eye position-relative w-100">
                    <input
                      :type="passwordFieldTypeC"
                      class="form-control"
                      v-model="CPassword"
                      :class="{
                        'is-invalid': submitted && $v.CPassword.$error,
                      }"
                    />
                    <span
                      :class="passwordFieldTypeC"
                      type="password"
                      id="eyeSpan"
                      @click="toggleVisiblityC()"
                    >
                      <i class="eye-icon"></i>
                    </span>
                  </div>
                  <br />
                  <div
                    v-if="submitted && $v.CPassword.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.CPassword.required"
                      >Password is required</span
                    >
                    <!-- <span v-if="$v.CPassword.minLength"
                      >Password must be at least 8 characters</span
                    > -->
                  </div>
                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-row m-0">
                  <label class="form-label" for="Password">Password</label>
                  <div class="password-eye position-relative w-100">
                    <input
                      :type="passwordFieldType"
                      class="form-control"
                      v-model="Password"
                      :class="{ 'is-invalid': submitted && $v.Password.$error }"
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
                    v-if="submitted && $v.Password.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.Password.required"
                      >Password is required</span
                    >
                    <span v-if="!$v.Password.minLength"
                      >Password must be at least 8 characters</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12">
                <div class="form-row m-0">
                  <label class="form-label" for="Password"
                    >Confirm Password</label
                  >
                  <div class="password-eye position-relative w-100">
                    <input
                      :type="passwordFieldTypeConf"
                      class="form-control"
                      v-model="ConfirmPassword"
                      :class="{
                        'is-invalid': submitted && $v.ConfirmPassword.$error,
                      }"
                    />
                    <span
                      :class="passwordFieldTypeConf"
                      type="password"
                      id="eyeSpan"
                      @click="toggleVisiblityConf()"
                    >
                      <i class="eye-icon"></i>
                    </span>
                  </div>
                  <br />
                  <div
                    v-if="submitted && $v.ConfirmPassword.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.ConfirmPassword.required"
                      >Confirm Password is required</span
                    >
                    <span v-else-if="!$v.ConfirmPassword.sameAsPassword"
                      >Confirm Password is not matching with Password</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <div class="col text-left signin-button-section">
                    <button
                      action=""
                      class="signin mb-2 mt-3 px-5"
                      :disabled="processing"
                    >
                      <strong>Confirm</strong>
                    </button>
                  </div>
                  <div class="col text-right my-3 py-2">
                    <nuxt-link
                      class="text-decoration-none align-items-center btn-link"
                      to="/user-profile"
                    >
                      <span class="text-secondary">
                        <i
                          class="fa fa-chevron-left px-2"
                          aria-hidden="true"
                        ></i
                        >Back to
                      </span>
                      <span class="text-color">profile</span>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>

        <!-- End Reset pwd -->
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";

export default {
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  data() {
    return {
      Password: "",
      ConfirmPassword: "",
      CPassword: "",
      submitted: false,
      processing: false,
      passwordFieldTypeConf: "password",
      passwordFieldType: "password",
      passwordFieldTypeC: "password",
    };
  },
  validations: {
    ConfirmPassword: { required, sameAsPassword: sameAs("Password") },
    Password: { required, minLength: minLength(8) },
    CPassword: { required, minLength: minLength(8) },
  },
  mounted() {},

  computed: {
    ...mapState("studentResetPassword", {
      successMessage: (state) => state.successMessage,
      successType: (state) => state.successType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("studentResetPassword", {
      getResetPassword: "getResetPassword",
    }),
    async toggleVisiblityConf() {
      this.passwordFieldTypeConf =
        this.passwordFieldTypeConf === "password" ? "text" : "password";
    },
    async toggleVisiblity() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    async toggleVisiblityC() {
      this.passwordFieldTypeC =
        this.passwordFieldTypeC === "password" ? "text" : "password";
    },
    async GetResetPassword() {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.processing = true;
        await this.getResetPassword({
          id: localStorage.getItem("id"),
          current_password: this.CPassword,
          password: this.Password,
          confirm_password: this.ConfirmPassword,
        });

        if (this.successMessage != "") {
          this.submitted = false;
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
          this.$router.push("/user-profile");
        } else if (this.errorMessage != "") {
          this.submitted = false;
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

<style scoped>
.invalid-feedback {
  display: block;
}
</style>
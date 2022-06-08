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
                <label>Password</label>
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
                    ><i class="eye-icon"></i>
                  </span>
                </div>
                <div
                  v-if="submitted && $v.Password.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.Password.required">Password is required</span>
                  <br v-if="!$v.Password.required && !$v.Password.minLength" />
                  <span v-if="!$v.Password.minLength"
                    >Password must be at least 8 characters</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <div class="password-eye position-relative w-100">
                  <input
                    :type="passwordFieldTypeC"
                    class="form-control"
                    v-model="ConfirmPassword"
                    :class="{
                      'is-invalid': submitted && $v.ConfirmPassword.$error,
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
                <div
                  v-if="submitted && $v.ConfirmPassword.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.ConfirmPassword.required"
                    >Confirm Password is required</span
                  >
                  <br
                    v-if="
                      !$v.ConfirmPassword.required &&
                      !$v.ConfirmPassword.sameAsPassword
                    "
                  />
                  <span v-else-if="!$v.ConfirmPassword.sameAsPassword"
                    >Confirm Password is not matching with Password</span
                  >
                </div>
              </div>

              <button
                @click.prevent="InvokeResetPassword"
                type="submit"
                class="btn btn-danger btn-flat m-b-30 m-t-30"
                :disabled="processing"
              >
                Update Password
              </button>
              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";

export default {
  data() {
    return {
      Password: "",
      ConfirmPassword: "",
      submitted: false,
      processing: false,
      passwordFieldType: "password",
      passwordFieldTypeC: "password",
    };
  },
  validations: {
    ConfirmPassword: { required, sameAsPassword: sameAs("Password") },
    Password: { required, minLength: minLength(8) },
  },
  mounted() {
    this.TokenValidate();
  },

  computed: {
    ...mapState("forgotPasswordReset", {
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("forgotPasswordReset", {
      invokeResetPassword: "invokeResetPassword",
      tokenValidate: "tokenValidate",
    }),
    async toggleVisiblity() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    async toggleVisiblityC() {
      this.passwordFieldTypeC =
        this.passwordFieldTypeC === "password" ? "text" : "password";
    },
    async InvokeResetPassword() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.processing = true;

        await this.invokeResetPassword({
          password: this.ConfirmPassword,
          token: this.$route.query.token,
        });

        if (this.successMessage != "") {
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
          this.$router.push("/admin-login");
        } else if (this.errorMessage != "") {
          this.$toast.open({
            message: this.errorMessage,
            type: this.errorType,
            duration: 5000,
          });
          this.$router.go();
        }
        this.processing = false;
      }
    },
    async TokenValidate() {
      await this.tokenValidate({
        reset_password_token: this.$route.query.token,
      });
      if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
        this.$router.push("/admin-login");
      }
    },
  },
};
</script>
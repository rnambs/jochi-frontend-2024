<template>
  <div class="content">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-lg-3"></div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">Reset Password</div>
            <div class="card-body card-block">
              <form @submit.prevent="GetResetPassword">
                <div class="form-group">
                  <div class="input-group">
                    <div class="password-eye position-relative w-100">
                      <input
                        :type="passwordFieldTypeC"
                        id="currentpassword"
                        name="currentpassword"
                        placeholder="Current Password"
                        class="form-control"
                        v-model="currentpassword"
                        :class="{
                          'is-invalid': submitted && $v.currentpassword.$error,
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
                      v-if="submitted && $v.currentpassword.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.currentpassword.required"
                        >Password is required</span
                      >
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="password-eye position-relative w-100">
                      <input
                        :type="passwordFieldTypeN"
                        id="newpassword"
                        name="newpassword"
                        placeholder="New Password"
                        class="form-control"
                        v-model="newpassword"
                        :class="{
                          'is-invalid': submitted && $v.newpassword.$error,
                        }"
                      />
                      <span
                        :class="passwordFieldTypeN"
                        type="password"
                        id="eyeSpan"
                        @click="toggleVisiblityN()"
                      >
                        <i class="eye-icon"></i>
                      </span>
                    </div>
                    <div
                      v-if="submitted && $v.newpassword.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.newpassword.required"
                        >Password is required</span
                      >
                      <span v-if="!$v.newpassword.minLength"
                        >Password must be at least 8 characters</span
                      >
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="password-eye position-relative w-100">
                      <input
                        :type="passwordFieldType"
                        id="password"
                        name="Password"
                        placeholder="Confirm Password"
                        class="form-control"
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
                    <div
                      v-if="submitted && $v.password.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.password.required"
                        >Password is required</span
                      >
                      <span v-else-if="!$v.password.sameAsPassword"
                        >Confirm Password is not matching with Password</span
                      >
                    </div>
                  </div>
                </div>
                <div class="form-actions form-group">
                  <button
                    type="submit"
                    class="btn btn-danger btn-sm"
                    :disabled="processing"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-3"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";
export default {
  name: "UserResetPassword",
  data() {
    return {
      password: "",
      newpassword: "",
      currentpassword: "",
      submitted: false,
      processing: false,
      passwordFieldType: "password",
      passwordFieldTypeN: "password",
      passwordFieldTypeC: "password",
    };
  },
  validations: {
    password: { required, sameAsPassword: sameAs("newpassword") },
    newpassword: { required, minLength: minLength(8) },
    currentpassword: { required },
  },
  computed: {
    ...mapState("resetPassword", {
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("resetPassword", {
      getResetPassword: "getResetPassword",
    }),
    async toggleVisiblity() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    async toggleVisiblityN() {
      this.passwordFieldTypeN =
        this.passwordFieldTypeN === "password" ? "text" : "password";
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
      }
      await this.getResetPassword({
        id: localStorage.getItem("id"),
        currentPassword: this.currentpassword,
        password: this.newpassword,
        confirm_password: this.password,
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
    },
  },
};
</script>
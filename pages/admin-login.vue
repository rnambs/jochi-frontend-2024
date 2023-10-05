<template>
  <div>
    <div class="sufee-login d-flex align-content-center flex-wrap">
      <div class="container">
        <div class="login-content">
          <div class="login-logo">
            <img
              class="align-content"
              src="~/assets/images/logo-grid.png"
              alt=""
              style="max-width: 150px"
            />
          </div>
          <div class="login-form" v-if="!isLoggedIn">
            <form @submit.prevent="GetLogin">
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
              <div class="form-group">
                <label>Password</label>
                <input
                  :type="type"
                  class="form-control"
                  placeholder="Password"
                  v-model="password"
                  :class="{ 'is-invalid': submitted && $v.password.$error }"
                />
                <span @click="showPassword" v-bind:class="[eye]"></span>
                <div
                  v-if="submitted && $v.password.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.password.required">Password is required</span>
                  <span v-if="!$v.password.minLength"
                    >Password must be at least 8 characters</span
                  >
                </div>
              </div>
              <div class="checkbox">
                <label class="pull-right">
                  <nuxt-link to="/admin-forgot-password"
                    >Forgot Password
                  </nuxt-link>
                </label>
              </div>
              <span style="color: red">{{ errorMessage }}</span>
              <button
                type="submit"
                class="btn btn-danger btn-flat m-b-30 m-t-30"
                :disabled="processing"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      Email: "",
      password: "",

      type: "password",
      eye: "fa fa-fw fa-eye-slash field-icon",
      submitted: false,
      isLoggedIn: false,
      processing: false
    };
  },
  validations: {
    Email: { required, email },
    password: { required, minLength: minLength(8) },
  },
  mounted() {
    if (localStorage.getItem("email")) {
      this.isLoggedIn = true;
      var userType = localStorage.getItem("user_type");
      if (userType == 1) {
        this.$router.push("/dashboard");
      } else if (userType == 3) {
        this.$router.push("/planner-day");
      } else if (userType == 2) {
        this.$router.push("/custom-availability");
      }
    }
  },
  computed: {
    ...mapState("login", {
      errorMessage: (state) => state.errorMessage,
    }),
  },
  methods: {
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.eye = "fa fa-fw fa-eye field-icon";
      } else {
        this.type = "password";
        this.eye = "fa fa-fw fa-eye-slash field-icon";
      }
    },
    ...mapActions("login", {
      getLogin: "getLogin",
    }),
    async GetLogin() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.processing = true;

        await this.getLogin({
          email: this.Email,
          password: this.password,
        });
        this.processing = false;
      }
    },
  },
};
</script>
<style >
.field-icon {
  float: right;
  margin-left: -25px;
  margin-top: -25px;
  position: relative;
  z-index: 2;
}

.container {
  padding-top: 50px;
  margin: auto;
}
</style>

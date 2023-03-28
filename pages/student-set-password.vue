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
        <!-- set Password-->
        <section id="set Password" class="">
          <h1 class="heading mb-4">Create Password</h1>
          <p class="mb-4">
            Account verified successfully please create the password and
            complete the registration.
          </p>
          <form action="" class="sign-in" @submit.prevent="GetPassword">
            <div class="row mb-4">
              <div class="col-12">
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
                      class="cursor-pointer"
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
            <div class="row mb-4">
              <div class="col-12">
                <div class="form-row m-0">
                  <label class="form-label" for="Password"
                    >Confirm Password</label
                  >
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
                      class="signin my-3 px-5"
                      :disabled="processing"
                    >
                      <strong>Confirm</strong>
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
      submitted: false,
      processing: false,
      currentToken: "",
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
    this.getTokenDevice();
  },
  computed: {
    ...mapState("studentSetPassword", {
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
    }),
  },
  methods: {
    ...mapActions("studentSetPassword", {
      getPassword: "getPassword",
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
    async GetPassword() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.processing = true;

        await this.getPassword({
          password: this.ConfirmPassword,
          unique_key: this.$route.query.token,
          deviceTokenWeb: this.currentToken,
        });
        if (this.successMessage != "") {
          this.submitted = false;
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
          this.$router.push("/");
        } else if (this.errorMessage != "") {
          this.submitted = false;
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
    async getTokenDevice() {
      this.currentToken = await this.$fire.messaging.getToken();
      this.$fire.messaging.onMessage((payload) => {
        console.info("Message received: ", payload);
      });
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
        this.$router.push("/");
      }
    },
  },
};
</script>
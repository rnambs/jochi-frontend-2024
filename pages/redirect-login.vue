<template>
  <div class="inner-section">
    <div
      class="
        main-section
        sufee-login
        d-flex
        vh-100
        align-content-center
        flex-wrap
      "
    >
      <div class="container">
        <div
          class="
            login-content
            d-flex
            flex-column
            align-items-center
            justify-content-center
          "
        >
          <div class="login-logo">
            <img
              class="align-content"
              src="~/assets/images/jochi..svg"
              alt=""
            />
          </div>
          <div class="text-center">
            <span class="text-center"
              >Please wait! Your credentials are being verified!</span
            >
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
    return {};
  },

  mounted() {
    this.getTokenDevice();
    console.log("code in redirect", this.$route.query.code);
    // this.gg4lLogin();
  },

  computed: {
    ...mapState("redirectLogin", {
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("redirectLogin", {
      loginUsingGg4l: "loginUsingGg4l",
    }),
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
    async getTokenDevice() {
      this.currentToken = await this.$fire.messaging.getToken();
      console.log("consoling token", this.currentToken);
      this.gg4lLogin();
      this.$fire.messaging.onMessage((payload) => {
        console.info("Message received: ", payload);
      });
    },

    async gg4lLogin() {
      await this.loginUsingGg4l({
        code: this.$route.query.code,
        deviceTokenWeb: this.currentToken,
      });
      if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
        // this.$router.push("/admin-login");
      } else {
        let user_type = localStorage.getItem("user_type");
        if (user_type == 3 || user_type == "3") {
          this.$router.push("/student-dashboard");
        } else {
          this.$router.push("/teacher-dashboard");
        }
      }
    },
  },
};
</script>
<style>
.inner-section {
  overflow: hidden;
  height: 100vh;
}
.inner-section .sufee-login {
  position: relative;
}
.inner-section .sufee-login::before {
  content: "";
  position: absolute;
  background-image: url(../static/image/jochi-light-bg-rotate.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-size: 100% 100%;
  overflow: hidden;
  overflow-y: auto;
  width: 200%;
  height: 227%;
  left: -43%;
  right: 0;
  margin: auto;
  top: -48%;
  opacity: 0.7;
  transform-origin: 50% 50%;
  -webkit-animation: rotating 5s linear infinite;
  animation: rotating 30s linear infinite;
}
.login-content {
  position: relative;
  z-index: 9;
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
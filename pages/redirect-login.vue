<template>
  <div class="inner-section">
    <div
      class="main-section sufee-login d-flex vh-100 align-content-center flex-wrap"
    >
      <div class="container">
        <div
          class="login-content d-flex flex-column"
        >
          <!-- <div class="login-logo">
            <img
              class="align-content"
              src="../static/image/rid-logo.png"
              alt="logo-icon"
            />
          </div>   -->
          <div class="d-flex flex-column align-items-center justify-content-center">
            <!-- <div class="login-logo">
              <img
                class="align-content"
                src="../static/image/logo.png"
                alt="logo-icon"
              />
            </div> -->
            <!-- <div class="text-center">
              <span class="text-center"
                >Please wait! Your credentials are being verified!</span
              >
            </div> -->
            <lottie
              v-if="loading"
              :options="lottieOptions"
              v-on:animCreated="handleAnimation"
              class="lottie-loader"
            />
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
import { FRONTEND_BASE_URL, GG4L_REDIRECT_URL } from "~/assets/js/constants";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
// import io from "socket.io-client";

// const socket = io("ws://localhost:3000");

export default {
  middleware: 'authenticated',
  components: {
    lottie,
  },
  data() {
    return {
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
    };
  },
  mounted() {
    this.loading=true;
    this.login();
  },

  computed: {
    ...mapState("redirectLogin", {
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      studentSignUp: (state) => state.studentSignUp,
      schoolAdminRequested: (state) => state.schoolAdminRequested,
      schoolAdmin: (state) => state.schoolAdmin,
    }),
  },
  methods: {
    ...mapActions("redirectLogin", {
      loginUsingGg4l: "loginUsingGg4l",
      sendDeviceToken: "sendDeviceToken",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async login() {
      await this.gg4lLogin();
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
        // this.$router.push("/");
      }
    },
    async getTokenDevice() {
      try {
        this.currentToken = await this.$fire?.messaging?.getToken();
        const deviceTokenWeb = this.currentToken.toString();
        console.log("Device Token (Web):", deviceTokenWeb);
        await this.sendDeviceToken({
          deviceTokenWeb,
        });
        this.$fire.messaging.onMessage((payload) => {
          // alert("alerting" + payload);
          console.info("Message received: ", payload);
        });
      } catch (e) {
        console.log(e);
      }
    },

    async gg4lLogin() {
      await this.loginUsingGg4l({
        code: this.$route.query.code,
        log_code: localStorage.getItem("log_code"),
        logged_in_date: moment().format("YYYY-MM-DD"),
      });
      await this.getTokenDevice();
      const token = localStorage.getItem("token");
      // socket.emit("login", token?.split("Bearer ")[1]);

      if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });

        window.localStorage.clear();
        window.location.href = GG4L_REDIRECT_URL + FRONTEND_BASE_URL;
        // this.$router.push("/admin-login");
      } else {
        let user_type = localStorage.getItem("user_type");
        let schoolAccess = localStorage.getItem("schoolAccess");
        if (schoolAccess == 'ClubOnly' && user_type == 3 ) {
          console.log("studentSignUp value", this.studentSignUp);
          if (this.studentSignUp == true || this.studentSignUp == "true") {
            localStorage.setItem("studentSignUp", this.studentSignUp);
            // this.$store.commit("setStartProductGuide", true); /* Commented for hiding tutorial part */
          }
          this.$router.push("/club-detail");
        }  else if (user_type == 3 ) {
  this.$router.push("/student-dashboard");
} else if (schoolAccess == 'ClubOnly' && user_type == 2) {
  this.$router.push("/club-detail");
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
  background-image: url(../static/image/v4/jochi-light-bg-rotate.png);
  background-color: #beafde;
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
  /* transform-origin: 50% 50%;
  -webkit-animation: rotating 5s linear infinite;
  animation: rotating 30s linear infinite; */
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
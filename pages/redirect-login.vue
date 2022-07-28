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
            Please wait! Your credentials are being verified!
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
    console.log("code in redirect", this.$route.query.code);
    this.gg4lLogin();
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

    async gg4lLogin() {
      await this.loginUsingGg4l({
        code: this.$route.query.code,
      });
      if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
        // this.$router.push("/admin-login");
      } else {
        this.$router.push("/student-dashboard");
      }
    },
  },
};
</script>
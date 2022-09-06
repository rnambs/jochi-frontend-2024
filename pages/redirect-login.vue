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
          <div class="">
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
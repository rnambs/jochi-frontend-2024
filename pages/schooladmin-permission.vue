<template>
  <div
    class="container-fluid main-container jochi-main-bg-primary-light vh-100 d-flex align-items-center justify-content-center"
  >
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div class="d-flex flex-column align-items-center justify-content-center">
      <div class="col-7 col-sm-6 col-md-5 col-lg-3">
        <img
          src="../static/image/process-image.png"
          alt=""
          class="img-responsive jump"
        />
      </div>
      <h5 v-if="!processed" class="border-top pt-2 color-black">
        {{ response == 1 ? "Approving" : "Rejecting" }} the school admin user is
        in progress...
      </h5>
      <h5 v-if="processed && isSuccess" class="border-top pt-2 color-black">
        School admin successfully {{ response == 1 ? "approved" : "rejected" }}
      </h5>
      <h5 v-if="processed && isError" class="border-top pt-2 color-black">
        {{ "Error!" + " " + errorMessage }}
      </h5>
    </div>
  </div>
</template>
<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";

export default {
  components: {
    lottie,
  },
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  data() {
    return {
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      response: Number(this.$route.query.response),
      token: this.$route.query.token,
      processed: false,
      isError: false,
      isSuccess: false,
    };
  },

  mounted() {
    if (this.response && this.token) {
      this.setClubApprovalStatus();
    }
  },
  computed: {
    ...mapState("schoolAdminPermission", {
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.successType,
    }),
  },
  methods: {
    ...mapActions("schoolAdminPermission", {
      setApprovalStatus: "setApprovalStatus",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async setClubApprovalStatus() {
      await this.setApprovalStatus({
        response: this.response,
        token: this.token,
      });
      this.processed = true;
      if (this.successMessage != "") {
        this.isSuccess = true;
        this.$toast.open({
          message: this.successMessage,
          type: this.successType,
          duration: 5000,
        });
      } else if (this.errorMessage != "") {
        this.isError = true;
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
    },
  },
};
</script>
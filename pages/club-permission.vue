<template>
  <div class="container-fluid main-container jochi-main-bg-light">
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <h2 v-if="!processed">
      Your request for {{ response == 1 ? "approving" : "rejecting" }} the club
      is in progress...
    </h2>
    <h2 v-else>
      Club details successfully {{ response == 1 ? "approved" : "rejected" }}
    </h2>
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
      clubId: this.$route.query.club_id,
      response: Number(this.$route.query.response),
      token: this.$route.query.token,
      processed: false,
    };
  },

  mounted() {
    if (this.clubId && this.response && this.token) {
      this.setClubApprovalStatus();
    }
  },
  computed: {
    ...mapState("appointmentVerified", {
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
    }),
  },
  methods: {
    ...mapActions("clubPermission", {
      setApprovalStatus: "setApprovalStatus",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async setClubApprovalStatus() {
      await this.setApprovalStatus({
        clubId: this.clubId,
        response: this.response,
        token: this.token,
      });
      if (this.successMessage != "") {
        this.processed = true;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
      } else if (this.errorMessage != "") {
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
<template>
  <div class="container-fluid main-container">
    <div class="row main-row">
      <div class="col-md-6 img-section">
        <img
          src="~/assets/images/undraw/Undraw_signUp.png"
          alt="undraw"
          class="img-responsive"
        />
      </div>
      <div class="col-md-5 col-lg-4 form-section">
        <!-- END Sent to E-mail -->

        <section id="Reset Password" class="">
          <p class="mb-4">{{ verifiedMessage }}</p>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";

export default {
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  data() {
    return {};
  },

  mounted() {
    this.EmilVerified();
  },

  computed: {
    ...mapState("emailVerified", {
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      verifiedMessage: (state) => state.verifiedMessage,
    }),
  },
  methods: {
    ...mapActions("emailVerified", {
      emilVerified: "emilVerified",
    }),
    async EmilVerified() {
      await this.emilVerified({
        unique_key: this.$route.query.token,
      });
      if (this.errorMessage != "") {
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
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
        <section id="Reset Password" class=""></section>
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
    if (!localStorage.getItem("email")) {
      this.$router.push("/");
    }
    console.log(
      this.$route.query.teacher_id,
      this.$route.query.status,
      this.$route.query.advisor_token
    );
    this.TeacherAdvisorConfirm();
  },

  computed: {
    ...mapState("teacherAdvisorConfirmation", {
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
    }),
  },
  methods: {
    ...mapActions("teacherAdvisorConfirmation", {
      teacherAdvisorConfirm: "teacherAdvisorConfirm",
    }),

    async TeacherAdvisorConfirm() {
      await this.teacherAdvisorConfirm({
        teacher_id: this.$route.query.teacher_id,
        response: this.$route.query.status,
        token: this.$route.query.advisor_token,
      });

      if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      } else if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
      }
    },
  },
};
</script>
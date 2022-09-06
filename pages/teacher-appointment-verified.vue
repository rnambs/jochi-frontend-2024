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
    this.TeacherMeetingConfirm();
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
    ...mapActions("appointmentVerified", {
      teacherMeetingConfirm: "teacherMeetingConfirm",
    }),

    async TeacherMeetingConfirm() {
      await this.teacherMeetingConfirm({
        teacher_id: localStorage.getItem("id"),
        request_id: this.$route.query.request_id,
        student_id: this.$route.query.student_id,
        meeting_request: this.$route.query.meeting_request,
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
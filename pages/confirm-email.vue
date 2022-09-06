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
        <!-- END Sent to E-mail -->

        <section id="Reset Password" class="">
          <h1 class="heading mb-4">Verification Email</h1>
          <p class="mb-4">
            A verification email has been sent to your given email address,
            Please verify and continue.
          </p>
          <form action="" class="sign-in">
            <div class="row mt-2">
              <div class="col-12 signin-button-section">
                <button action="" class="signin mb-2 mt-2 px-4">
                  <strong
                    ><nuxt-link class="btn-link font-weight-bold" to="/"
                      >Continue</nuxt-link
                    ></strong
                  >
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "confirm-email",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
  data() {
    return {};
  },

  computed: {
    ...mapState("studentSignUp", {
      Email: (state) => state.Email,
    }),
  },
  mounted() {},
};
</script>
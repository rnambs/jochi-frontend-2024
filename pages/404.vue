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
        <!-- Sign-Up -->

        <section id="sign-up" class="">
          <h1 class="heading mb-4 text-center">404</h1>
          <form action="" class="sign-in" @submit.prevent="GetSignUp">
            <div class="row">
              <div class="col-12">
                <h4 class="text-center">This page could not be found</h4>
                <div class="col-12 text-center my-3">
                  <nuxt-link
                    class="
                      text-decoration-none text-secondary
                      align-items-center
                    "
                    to="/"
                  >
                    Please go back to <span class="text-color">Login</span>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
var input = "";
export default {
  name: "student-signup",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
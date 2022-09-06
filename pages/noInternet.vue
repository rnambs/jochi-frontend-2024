<template>
  <div class="container-fluid main-container">
    <div class="row main-row d-flex align-items-center flex-row vh-100">
      <div class="col-md-6 img-section">
        <img
          src="~/assets/images/undraw/no_internet.png"
          alt="undraw"
          class="img-responsive"
        />
      </div>
      <div class="col-md-5 col-lg-4 form-section">
        <!-- Sign-Up -->

        <section id="sign-up" class="">
          <h1 class="heading mb-4 text-center">Whoops !!</h1>
          <form action="" class="sign-in" @submit.prevent="GetSignUp">
            <div class="row">
              <div class="col-12">
                <h6 class="text-center text-light">
                  Slow or no internet connection<br />
                  Please check your internet settings.
                </h6>
                <div class="col-12 text-center my-3">
                  <div class="row">
                    <div class="col signin-button-section">
                      <button action="" class="signin mb-2 mt-4 px-5">
                        <strong>Reload</strong>
                      </button>
                    </div>
                  </div>
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
export default {
  name: "student-signup",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
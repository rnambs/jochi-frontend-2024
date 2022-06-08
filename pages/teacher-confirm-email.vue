<template>
    <div class= "container-fluid main-container"> 
        <div class="row main-row">
            <div class="col-md-6 img-section">
                <img src="~/assets/images/undraw/Undraw_signUp.png" alt="undraw" class="img-responsive">
            </div>
            <div class="col-md-5 col-lg-4 form-section">
            <!-- END Sent to E-mail -->

            <section id="Reset Password" class="">
                <h1 class="heading mb-4">Verification Email </h1>
                <p class="mb-4">Sign up process completed, Your account is under verification. After admin approval you will receive an email.</p>
                <form action="" class="sign-in">
                    <div class="row mt-2">
                        <div class="col-12 signin-button-section">
                            <nuxt-link to="/">
                            <button action="" class="signin mb-2 mt-2 px-4"><strong><nuxt-link class="btn-link font-weight-bold" to="/">Continue</nuxt-link></strong></button>
                            </nuxt-link>
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
    head () {
    return {
        link: [
          { rel: 'stylesheet', href: '/css/style01.css' },
        ]
    }
  }
}
</script>
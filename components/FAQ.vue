<template>
  <div>
    <div class="main-section">
      <div class="study-section container-fluid">
        <div class="inner-study p-4 mt-4">
          <div class="study-row">
            <div class="py-3 px-5">
              <h3 class="faq-head text-center mb-3">FAQ</h3>
              <h3 class="faq-head text-center mb-4">General</h3>
  
              <h5 class="faq-head">What is Jochi?</h5>
              <p class="faq-text">
                Jochi is a personal management platform designed for middle & high
                school students that helps them manage their school related needs,
                outside the classroom. Our platform can be accessed via our Mobile
                & Web app.
              </p>
  
              <h5 class="faq-head">Why should our school consider using Jochi?</h5>
  
              <p class="faq-text">
                Jochi is a solution for students that has been thoughtfully
                designed by students. Our platform is the first of its kind,
                enabling students to develop soft skills at a young age while
                enhancing their experince in school.
              </p>
  
              <h5 class="faq-head">How is Jochi an 'integrated' solution?</h5>
  
              <p class="faq-text">
                Our platform integrates with middle & high schools' existing
                learning management and calender systems. This integration
                simplifies the lives of students and allows for a more
                personalised experince.
              </p>
  
              <h5 class="faq-head">What is Jochi's privacy policy?</h5>
              <p class="faq-text">
                Jochi does not sell user data or information to any third party.
                Additionally, Jochi is US DPA , EU GDFR, and EU Children's Online
                Privacy Protection Act compliant. Our entire privacy policy can be
                found at this
                <a href="https://www.jochi.info/privacy-policy" class="faq-link">link</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import lottie from "vue-lottie/src/lottie.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "FAQ",
  components: {
    lottie,
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    ...mapState("plannerMonth", {}),
  },
  methods: {
    ...mapActions("plannerMonth", {}),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
  },
};
</script>
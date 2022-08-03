<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />

    <div class="main-section">
      <!-- teacher Page -->
      <section id="teacher-detail" class="">
        <div class="teacher-section jochi-components-light-bg
        p-4
        custom-margin-for-main-section custom-full-height
        d-flex
        flex-column custom-overflow">
        <div class="d-flex align-items-center justify-content-between  px-3">
            <h2 class="color-primary font-semi-bold m-0">Advisor</h2>
            <button class="btn btn-primary px-4 ">Send Request</button>
        </div>
          <div class="inner-teacher container-fluid p-3 d-flex flex-column flex-fill h-40">
            <div class="row h-100">
                <div class="col-12 col-md-5 col-lg-4 col-xl-3">
                    <div class="card card-primary-void rounded-22 py-4 h-100 position-realtive">
                        <div class="d-flex flex-column px-4">
                            <h3 class="color-dark font-semi-bold mb-0">Student</h3>
                        </div>
                        <!-- <div class="form-row position-relative mb-3 px-2">
                            <input
                              class="form-control w-100 tab-form-control"
                              type="text"
                              placeholder="Search"
                            />
                            <span class="input-icon custom-search-icon position-absolute">
                              <i class="fa fa-search" aria-hidden="true"></i>
                            </span>
                        </div> -->
                        <!-- student list -->
                        <div class="hidden-scroll d-flex flex-column ">
                            <div class="d-flex align-items-center flex-row p-3 student-list border-bottom">
                                <div class="ld-img-section mr-3">
                                    <div class="ld-img-holder"></div>
                                </div>
                                <div class="ld-details-section">
                                    <p class="ld-heading mb-1">Courtney Henry</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-center flex-row p-3 student-list border-bottom">
                                <div class="ld-img-section mr-3">
                                    <div class="ld-img-holder"></div>
                                </div>
                                <div class="ld-details-section">
                                    <p class="ld-heading mb-1">Devon Lane</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-center flex-row p-3 student-list border-bottom">
                                <div class="ld-img-section mr-3">
                                    <div class="ld-img-holder"></div>
                                </div>
                                <div class="ld-details-section">
                                    <p class="ld-heading mb-1">Eleanor Pena</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-center flex-row p-3 student-list border-bottom">
                                <div class="ld-img-section mr-3">
                                    <div class="ld-img-holder"></div>
                                </div>
                                <div class="ld-details-section">
                                    <p class="ld-heading mb-1">Jane Cooper</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-center flex-row p-3 student-list border-bottom active">
                                <div class="ld-img-section mr-3">
                                    <div class="ld-img-holder"></div>
                                </div>
                                <div class="ld-details-section">
                                    <p class="ld-heading mb-1">Kathryn Murphy</p>
                                </div>
                            </div>
                        </div>
                        <!-- end student list -->
                        <!-- rounded black button -->
                        <!-- <button class="btn btn-rounded position-absolute bg-dark rounded-circle p-0">
                            <i class="fas fa-plus color-white"></i>
                        </button> -->
                        <!-- end rounded black button -->
                    </div>
                </div>
                <div class="col-12 col-md-7 col-lg-8 col-xl-9">
                    <div class="card card-primary-void rounded-22 p-4 h-100 position-realtive">
                        <div class="d-flex py-4 px-0 px-xl-4">
                            <div class="ld-img-section mr-3 mb-3">
                                <div class="ld-img-holder img-holder-lg"></div>
                            </div>
                            <div class="d-flex flex-column flex-fill justify-content-center">
                                <h2 class="color-primary font-semi-bold">Kathryn Murphy</h2>
                                <div>
                                    <div class="row m-0">
                                        <div class="col-12 col-sm-3 col-md-12 col-lg-2 p-1">
                                            <p class="mb-0 color-dark text-16 font-regular"><span>School</span></p>
                                        </div>
                                        <div class="col-1 p-1">
                                            <p class="mb-0 color-dark text-16 font-regular text-right"><span>: </span></p>
                                        </div>
                                        <div class="col-7 col-md-11 col-lg-8 p-1">
                                            <p class="mb-0 color-dark text-16 font-semi-bold"><span>Southside Middle School</span></p>
                                        </div>
                                    </div>
                                    <div class="row m-0">
                                        <div class="col-12 col-sm-3 col-md-12 col-lg-2 p-1">
                                            <p class="mb-0 color-dark text-16 font-regular"><span>Class</span></p>
                                        </div>
                                        <div class="col-1 p-1">
                                            <p class="mb-0 color-dark text-16 font-regular text-right"><span>: </span></p>
                                        </div>
                                        <div class="col-7 col-md-11 col-lg-8 p-1">
                                            <p class="mb-0 color-dark text-16 font-semi-bold"><span>7</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card card-primary-void rounded-22 p-4 h-100">
                            <h2 class="color-primary font-semi-bold">Assignment</h2>
                        </div>

                        <!-- analytics -->
                        <div class="d-none ">
                            <h2 class="color-primary font-semi-bold">Analytics</h2>
                        </div>
                        <!-- end analytics -->

                        <div class="tab-btns d-flex align-items-center position-absolute">
                            <button class="tab-btn mr-3" id="filterPlanner">profile</button>
                            <button class="btn tab-btn" id="assignmentPlanner">Study Analytics</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <!-- End teacher Page -->
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from "vuex";
import VueToast from "vue-toast-notification";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";

export default {
  name: "UserTeacherAdvisor",
  components: {
    lottie,
  },
  data() {
    return {
    
    };
  },
  mounted() {
 
  },

  computed: {
  
  },
  methods: {
    
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
  
 
 
     
};
</script>

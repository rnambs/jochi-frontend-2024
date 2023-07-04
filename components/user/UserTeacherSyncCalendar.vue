<template>
  <div class="main-section">
    <!-- teacher syncCalendar Page -->

    <section id="study-detail" class="">
      <div class="study-section bg-white border rounded-8
      custom-margin-for-main-section custom-full-height
      d-flex
      flex-column">
          <h2 class="color-primary-dark font-semi-bold px-4 pb-2 pt-4">Sync Calendar</h2>
          <div class="px-4 pb-2 mb-2 pt-4 custom-overflow h-100">
            <div class="card card-primary rounded-22 p-4 h-100">
              <div class="row">
                <div class="col-md-6 d-flex flex-column justify-content-center">
                  <div
                    class="form-section form-bg mt-4 mr-5 mb-4 ml-5 ml-sm-5 ml-md-0"
                  >
                    <div class="form-group px-4">
                      <div class="d-flex flex-column align-items-center">
                        <button class="btn btn-primary mb-3 px-5" @click="syncToGoogle()">
                          <span class="mr-2">{{ syncStatus == 1 ? "Disable" : "Enable" }}</span>
                          <i class="fab fa-google"></i>
                          <span class="ml-2">Calendar Sync</span>
                        </button>
                        <p
                          for=""
                          class="d-flex align-items-center px-0 px-lg-3 mb-0 color-secondary text-16 font-regular"
                        >
                          <span>Status : &nbsp;</span>
                          <span v-if="syncStatus == 1" class="text-nowrap">
                            Synced
                            <i
                              class="fa fa-calendar-check-o text-success"
                              aria-hidden="true"
                            ></i>
                          </span>
                          <span v-if="syncStatus == 0">
                            Not Synced
                            <i
                              class="fa fa-calendar-minus-o"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </p>
                      </div>
                    </div>
                    <!-- </form> -->
                  </div>
                </div>
                <div class="col-md-3 d-flex flex-column justify-content-center">
                  <img
                    src="../../static/image/dashboard_img.png"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>

    <!-- End teacher syncCalendar Page -->
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "UserTeacherSyncCalendar",
  data() {
    return {};
  },
  computed: {
    ...mapState("teacherSyncCalendar", {
      syncStatus: (state) => state.syncStatus,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  mounted() {
    this.getCalendatSyncStatus();
  },
  methods: {
    ...mapActions("teacherSyncCalendar", {
      syncGoogleCalendar: "syncGoogleCalendar",
      updateToken: "updateToken",
      getSyncStatus: "getSyncStatus",
    }),
    async getCalendatSyncStatus() {
      await this.getSyncStatus();
    },
    async syncToGoogle() {
      let authCode = "";
      if (this.syncStatus == 0) {
        authCode = await this.$gAuth.getAuthCode();
      }
      this.loading = true;
      await this.updateToken({
        user_id: localStorage.getItem("id"),
        status: this.syncStatus == 1 ? false : true,
        token: authCode,
      });
      this.loading = false;

      if (this.successMessage != "") {
        this.getSyncStatus();
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
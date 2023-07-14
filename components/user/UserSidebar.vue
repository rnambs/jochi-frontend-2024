<template>
  <section id="header" class="">
    <nav
      class="navbar navbar-expand-md navbar-light bg-white p-0"
      id="clickableId"
    >
      <a
        class="navbar-brand d-flex align-items-center justify-content-center"
        href="#"
      >
        <span
          class="bg-primary-dark rounded-14 d-flex align-items-center justify-content-center p-2"
        >
          <img
            src="../../static/image/v4/logo-ms.png"
            alt="jochi logo"
            class="img-logo-v4 object-fit-contain"
          />
        </span>
      </a>
      <button
        class="navbar-toggler mr-3"
        type="button"
        data-toggle="collapse"
        data-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarContent">
        <ul
          class="navbar-nav mr-auto flex-column vertical-nav accordion bg-white border-right pb-0 pb-md-5"
          id="accordionExample"
        >
          <!-- Dashboard -->
          <li class="nav-item px-1 parent-menu my-1 my-md-2">
            <nuxt-link
              to="/student-dashboard"
              class="ml-4 mx-md-auto nav-link btn d-inline-flex justify-content-start justify-content-md-center"
            >
              <i class="icon icon--dashboard"></i>
              <span
                class="ml-3 color-secondary text-capitalize font-medium d-block d-md-none"
                >Dashboard</span
              >
            </nuxt-link>
          </li>
          <!-- Planner -->
          <li class="nav-item px-1 parent-menu my-1 my-md-2">
            <a
              @click="$event.target.classList.toggle('active')"
              class="ml-4 mx-md-auto nav-link btn accordion-link collapsed d-inline-flex justify-content-start justify-content-md-center"
              type="button"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              <i class="icon icon--planner"></i>
              <span
                class="ml-3 color-secondary text-capitalize font-medium d-block d-md-none"
                >Planner</span
              >
            </a>
            <div
              id="collapseOne"
              class="collapse collapse-for-link"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <ul class="ml-4 ml-md-0 flex-row flex-md-column nav sub-menu">
                <li class="nav-item px-1 w-auto mb-1 mb-md-2">
                  <nuxt-link
                    to="/planner-day"
                    @click="$event.target.classList.toggle('active')"
                    class="nav-link btn p-1 text-center"
                    >Daily</nuxt-link
                  >
                </li>
                <li class="nav-item px-1 w-auto mb-1 mb-md-2">
                  <nuxt-link
                    to="/planner-week"
                    @click="$event.target.classList.toggle('active')"
                    class="nav-link btn p-1 text-center"
                    >Weekly</nuxt-link
                  >
                </li>
                <li class="nav-item px-1 w-auto mb-1">
                  <nuxt-link
                    to="/planner-month"
                    @click="$event.target.classList.toggle('active')"
                    class="nav-link btn p-1 text-center"
                    >Monthly</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </li>
          <!-- Meeting -->
          <li class="nav-item px-1 parent-menu my-1 my-md-2">
            <a
              @click="$event.target.classList.toggle('active')"
              class="ml-4 mx-md-auto nav-link btn accordion-link collapsed d-inline-flex justify-content-start justify-content-md-center"
              type="button"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <i class="icon icon--meeting"></i>
              <span
                class="ml-3 color-secondary text-capitalize font-medium d-block d-md-none"
                >Meeting</span
              >
            </a>
            <div
              id="collapseTwo"
              class="collapse collapse-for-link"
              aria-labelledby="headingTwo"
              data-parent="#accordionExample"
            >
              <ul class="ml-4 ml-md-0 flex-row flex-md-column nav sub-menu">
                <li class="nav-item px-1 w-auto mb-1 mb-md-2">
                  <nuxt-link
                    to="/teacher-meeting"
                    @click="$event.target.classList.toggle('active')"
                    class="nav-link btn p-1 text-center text-nowrap"
                    >Schedule</nuxt-link
                  >
                </li>
                <li class="nav-item px-1 w-auto mb-1 mb-md-2">
                  <nuxt-link
                    to="/custom-availability-student"
                    @click="$event.target.classList.toggle('active')"
                    class="nav-link btn p-1 text-center text-nowrap"
                    >Availability</nuxt-link
                  >
                </li>
                <li class="nav-item px-1 w-auto mb-1">
                  <nuxt-link
                    to="/viewall-meeting"
                    @click="$event.target.classList.toggle('active')"
                    class="nav-link btn p-1 text-center text-nowrap"
                    >View All</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </li>
          <!-- Teams & Clubs -->
          <li class="nav-item px-1 parent-menu my-1 my-md-2">
            <a
              @click="$event.target.classList.toggle('active')"
              class="ml-4 mx-md-auto nav-link btn accordion-link collapsed d-inline-flex justify-content-start justify-content-md-center"
              type="button"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <i class="icon icon--club"></i>
              <span
                class="ml-3 color-secondary text-capitalize font-medium d-block d-md-none"
                >Teams & Clubs</span
              >
            </a>
            <div
              id="collapseThree"
              class="collapse collapse-for-link"
              aria-labelledby="headingThree"
              data-parent="#accordionExample"
            >
              <ul class="ml-4 ml-md-0 flex-row flex-md-column nav sub-menu">
                <li class="nav-item px-1 w-auto mb-1 mb-md-2">
                  <nuxt-link
                    to="/club-detail"
                    class="nav-link btn p-1 text-center"
                    >Existing</nuxt-link
                  >
                </li>
                <li class="nav-item px-1 w-auto mb-1">
                  <nuxt-link
                    to="/club-catalogue"
                    class="nav-link btn p-1 text-center"
                    >Catalog</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </li>
          <!-- Study Room -->
          <li class="nav-item px-1 parent-menu my-1 my-md-2">
            <a
              @click="$event.target.classList.toggle('active')"
              class="ml-4 mx-md-auto nav-link btn accordion-link collapsed d-inline-flex justify-content-start justify-content-md-center"
              type="button"
              data-toggle="collapse"
              data-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              <i class="icon icon--club"></i>
              <span
                class="ml-3 color-secondary text-capitalize font-medium d-block d-md-none"
                >Study Room</span
              >
            </a>
            <div
              id="collapseFour"
              class="collapse collapse-for-link"
              aria-labelledby="headingFour"
              data-parent="#accordionExample"
            >
              <ul class="ml-4 ml-md-0 flex-row flex-md-column nav sub-menu">
                <li class="nav-item px-1 w-auto mb-1 mb-md-2">
                  <nuxt-link
                    to="/study-time"
                    class="nav-link btn p-1 text-center"
                    >Session</nuxt-link
                  >
                </li>
                <li class="nav-item px-1 w-auto mb-1">
                  <nuxt-link
                    to="/study-analytics"
                    class="nav-link btn p-1 text-center text-nowrap"
                    >Analytics</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </li>
          <!-- nav bottom -->
          <!-- settings -->
          <li class="nav-item px-1 parent-menu mb-1 mb-md-2 mt-auto">
            <nuxt-link
              to="#"
              class="ml-4 mx-md-auto nav-link btn d-inline-flex justify-content-start justify-content-md-center"
            >
              <i class="icon icon--settings"></i>
              <span
                class="ml-3 color-secondary text-capitalize font-medium d-block d-md-none"
                >Settings</span
              >
            </nuxt-link>
          </li>
          <li class="nav-item px-1 parent-menu my-1 my-md-2">
            <a
              @click="GetLogout()"
              href="#"
              class="ml-4 mx-md-auto nav-link btn d-inline-flex justify-content-start justify-content-md-center"
            >
              <i class="icon icon--logout"></i>
              <span
                class="ml-3 color-secondary text-capitalize font-medium d-block d-md-none"
                >Logout</span
              >
            </a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto header mr-3">
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Cloud</a>
          </li> -->
          <li
            class="nav-item d-flex justify-content-start justify-content-md-center p-1"
          >
            <div class="dropdown my-auto">
              <a
                class="dropdown-toggle ml-4 mx-md-auto d-inline-flex align-items-center justify-content-start justify-content-md-center"
                href="#"
                data-toggle="dropdown"
                @click="getNotifications()"
              >
                <span class="position-relative d-flex">
                  <i class="icon icon--notification"></i>
                  <!-- <span v-if="notificationCount > 0" class="notify-span">{{
                    notificationCount
                  }}</span> -->
                  <span
                    v-if="notificationCount > 0"
                    class="position-absolute top-0 right-0 bg-danger p-1 mr-1 rounded-circle"
                  ></span>
                </span>
                <span
                  class="ml-3 text-14 color-secondary text-capitalize font-medium d-block d-md-none text-decoration-none"
                  >Notifications</span
                >
              </a>
              <div class="dropdown-menu notify">
                <!-- notification -->
                <div
                  class="notifications dropdown-item px-2"
                  v-if="notificationList && notificationList.length > 0"
                >
                  <div
                    class="d-flex justify-content-between align-items-center px-3 my-2"
                  >
                    <h5 class="color-primary-dark font-semi-bold mb-0">
                      Notifications
                    </h5>
                    <button
                      class="color-dark font-semi-bold text-18"
                      @click="clearNotifications()"
                    >
                      Clear all
                    </button>
                  </div>
                  <div class="notification-text px-3 py-1 hidden-scroll">
                    <!-- :class="
                        data.isViewed
                          ? 'unread d-flex flex-column p-3 card card-primary bg-white rounded-22 my-3 cursor-pointer'
                          : 'read d-flex flex-column p-3 card card-void my-3 cursor-pointer'
                      " -->
                    <div
                      class="d-flex flex-column p-3 card card-void my-3 cursor-pointer"
                      v-for="(data, index) in notificationList"
                      :key="index"
                      @click="onNotificationClick(data.id, data.meetingType)"
                    >
                      <p
                        class="color-dark font-semi-bold text-14 text-wrap mb-0"
                      >
                        {{ data.message }}
                      </p>
                      <p
                        class="color-secondary text-12 font-regulat mb-0 d-flex justify-content-end align-items-center"
                      >
                        <span class="mr-2">{{ data.timestamp }}</span>

                        <span
                          :class="
                            data.isViewed
                              ? 'unread bg-transparent '
                              : 'read bg-primary d-block notify-span-icon rounded-circle'
                          "
                        >
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="notifications dropdown-item px-2 no-notify"
                  v-if="!notificationList || notificationList.length == 0"
                >
                  No notifications to display
                </div>
                <!-- notification End -->
              </div>
            </div>
          </li>
          <li class="nav-item d-flex justify-content-center p-2">
            <nuxt-link
              to="/user-profile"
              class="ml-3 mx-md-auto nav-link d-inline-flex justify-content-start justify-content-md-center"
            >
              <img
                v-bind:src="
                  profile && profile != 'null' ? profile : defaultImage
                "
                class="rounded-circle img-profile"
                alt="Profile image"
                id="profileImage"
              />
              <span
                class="ml-3 color-secondary text-capitalize font-medium d-block d-md-none"
                >Profile</span
              >
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
    <!--  Logout  confirmation  -->
    <div
      class="modal fade"
      id="logoutConfirmation"
      tabindex="-1"
      role="dialog"
      aria-labelledby="ModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header pb-1">
            <h3 class="modal-title" id="logoutConfirmationModalLongTitle">
              Log Out Confirmation
            </h3>
          </div>
          <div class="modal-body px-4">Are you sure you want to log out?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary py-1 px-3 rounded-12 font-semi-bold"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              data-dismiss="modal"
              type="button"
              class="btn btn-success py-1 px-3 rounded-12 font-semi-bold"
              @click="logout()"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Logout confirmation end  -->
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { defaultImage } from "../../assets/js/constants";
import { FRONTEND_BASE_URL, GG4L_REDIRECT_URL } from "~/assets/js/constants";

export default {
  name: "UserSidebar",
  // // middleware: "authenticated",
  data() {
    return {
      firstName: "",
      profile: "",
      defaultImage: defaultImage,
    };
  },

  mounted() {
    if (!localStorage.getItem("email")) {
      this.$router.push("/");
    }
    this.UserDetails();
    this.getPushNotifications();
    this.getNotifications();
    this.getCount();
    this.syncGg4lData();

    const studentSignUpSetting = localStorage.getItem("studentSignUpSetting");
    if (studentSignUpSetting == "true") {
      this.$store.commit("setStartProductGuide", true);
      localStorage.setItem("studentSignUpSetting", "false");
    }

    const activeLink = document.querySelector(".nuxt-link-active");
    const parentElement = activeLink?.closest(".collapse-for-link");
    const siblingDiv = parentElement.previousElementSibling;
    siblingDiv?.classList.add("show");
    if (siblingDiv.classList.contains("collapsed")) {
      siblingDiv.click();
    }

    // window.addEventListener("keydown", (e) => {
    //   if (e.keyCode == 123) {
    //     e.preventDefault();

    //     return false;
    //   }
    //   if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    //     e.preventDefault();
    //     return false;
    //   }
    //   if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    //     e.preventDefault();

    //     return false;
    //   }
    //   if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    //     e.preventDefault();

    //     return false;
    //   }

    //   if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    //     e.preventDefault();

    //     return false;
    //   }
    // });

    // window.addEventListener("contextmenu", (e) => {
    //   e.preventDefault();
    //   return false;
    // });
  },
  updated() {
    document.addEventListener("DOMContentLoaded", function () {
      document.onkeydown = function (e) {
        if (e.keyCode == 123) {
          return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
          return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
          return false;
        }
        if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
          return false;
        }

        if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
          return false;
        }
      };
    });
  },
  computed: {
    ...mapState("studentSignIn", {
      notificationList: (state) => state.notificationList,
      notificationCount: (state) => state.notificationCount,
    }),
    startProductGuide() {
      return this.$store.state.startProductGuide;
    },
    startProductGuideNotification() {
      return this.$store.state.startProductGuideNotification;
    },
  },
  watch: {
    startProductGuideNotification(newValue, oldValue) {
      if (newValue) {
        this.startIntro();
      }
    },
  },
  methods: {
    ...mapActions("studentSignIn", {
      getLogout: "getLogout",
      userDetails: "userDetails",
      getNotificationsList: "getNotificationsList",
      clearNotificationsList: "clearNotificationsList",
      markAsRead: "markAsRead",
      getNotificationCount: "getNotificationCount",
      syncData: "syncData",
    }),
    async getPushNotifications() {
      this.$fire.messaging.onMessage((payload) => {
        // alert("alerting" + payload.notification.body);
        this.getCount();
        this.getNotifications();
      });
    },
    async getNotifications() {
      await this.getNotificationsList();
    },
    async clearNotifications() {
      await this.clearNotificationsList();
      await this.getNotificationsList();
    },
    async onNotificationClick(id, type) {
      // Assignment
      // Assignment session rescheduled

      // Teacher Advisor

      // Study session
      // Session
      // Assignment session

      // Club
      // Club Leader
      // Club Activation
      // Team Activation

      await this.markNotificationAsRead(id);

      if (type == "Peer" || type == "Teacher") {
        this.$router.push("/viewall-meeting");
      } else if (type == "Assignment") {
        this.$router.push("/planner-day");
      } else if (
        type == "Session" ||
        type == "Study session" ||
        type == "Assignment session" ||
        type == "Assignment session rescheduled"
      ) {
        this.$router.push("/study-time");
      } else if (type == "Teacher Advisor") {
        this.$router.push("/user-profile");
      } else if (
        type == "Club" ||
        type == "Club Leader" ||
        type == "Club Activation" ||
        type == "Team Activation"
      ) {
        this.$router.push("/club-detail");
      }

      // if (type == "Club Meeting") {
      //   this.$router.push("/club-detail");
      // } else if (type == "Teacher Advisor Request") {
      //   this.$router.push("/user-profile");
      // } else if (type == "Study Session Invitation") {
      //   this.$router.push("/study-time");
      // } else if (
      //   type == "Meeting Request Accepeted" ||
      //   type == "Peer Meeting" ||
      //   type == "Peer Meeting Scheduled"
      // ) {
      //   this.$router.push("/viewall-meeting");
      // } else if (
      //   type == "Assignment Session Invitation" ||
      //   type.includes("Assignment") ||
      //   type.includes("assignment")
      // ) {
      //   this.$router.push("/planner-month");
      // }
      this.getNotificationsList();
    },
    async markNotificationAsRead(id) {
      await this.markAsRead({ notificationId: id });
    },

    async GetLogout() {
      $("#logoutConfirmation").modal({ backdrop: true });
    },
    async logout() {
      await this.getLogout({
        auth_token: localStorage.getItem("token").replace("Bearer ", ""),
      });
      window.localStorage.clear();
      window.location.href = GG4L_REDIRECT_URL + FRONTEND_BASE_URL;
    },
    async UserDetails() {
      this.loading = true;
      await this.userDetails({
        user_id: localStorage.getItem("id"),
      });
      this.email = localStorage.getItem("email");
      this.firstName = localStorage.getItem("firstName");
      this.schoolName = localStorage.getItem("school_name");
      this.profile = localStorage.getItem("profile_pic");

      if (!localStorage.getItem("email")) {
        this.$router.push("/");
      }
      this.loading = false;
    },
    clickableIcon() {
      let element = document.getElementById("clickableId");
      if (element.classList.contains("sidebar-opened")) {
        element.classList.remove("sidebar-opened");
      } else {
        element.classList.add("sidebar-opened");
      }
    },
    openLink() {
      window.open("https://www.jochi.info/faqs", "_blank");
    },
    async getCount() {
      await this.getNotificationCount();
    },
    async syncGg4lData() {
      let isGg4lDataSynced = localStorage.getItem("isGg4lDataSynced");
      if (isGg4lDataSynced != "1") {
        await this.syncData();
        localStorage.setItem("isGg4lDataSynced", "1");
        if (this.startProductGuide) {
          localStorage.setItem("studentSignUpSetting", "true");
        } else {
          localStorage.setItem("studentSignUpSetting", "false");
        }
        this.$router.go();
      }
    },
    startGuide() {
      this.$store.commit("setStartProductGuide", true);
      if (this.$route.name != "student-dashboard") {
        this.$router.push("/student-dashboard");
      }
      // this.$router.push("/planner-day");
    },
    startIntro() {
      const intro = this.$intro();
      let completed = false;
      let skip = false;
      if (this.startProductGuideNotification) {
        intro.start();
        intro.onskip(() => {
          skip = true;
          this.$store.commit("setStartProductGuide", false);
          this.$store.commit("setStartProductGuideNotification", false);
        });
        if (skip) return;
        intro.oncomplete((step, state) => {
          completed = true;
          if (state != "skip") {
            this.$store.commit("setStartProductGuide", false);
            this.$store.commit("setStartProductGuideNotification", false);
          }
        });
        intro.onexit(() => {
          if (!completed) {
            this.$store.commit("setStartProductGuide", false);
            this.$store.commit("setStartProductGuideNotification", false);
          }
        });
      }
    },
  },
  destroyed() {
    window.removeEventListener(
      "orientationchange",
      this.handleOrientationChange
    );
  },
  // // middleware: "authenticated",
};
</script>
<style>
@media (max-width: 991.98px) {
  .inner-section
    .header-section
    .sidebar-section
    .menu-items
    .card-body
    .inner-custom-list
    li
    a {
    font-size: 0.7rem;
  }
}
</style>
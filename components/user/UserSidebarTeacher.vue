<template>
  <section id="header" class="">
    <div class="header-section position-fixed top-0 position-relative">
      <div
        class="
          sidebar-section
          col-sm-4 col-md-5 col-lg-6
          d-flex
          justify-content-between
          jochi-components-light-bg
          p-3 p-lg-4
          position-fixed
          flex-column
        "
        id="clickableId"
      >
        <div class="d-flex flex-column h-40 flex-fill">
          <div class="position-relative profile-sidebar">
            <div
              class="
                user-icon
                d-flex
                flex-column flex-lg-row
                notification-icon-section
                align-items-center
                justify-content-end
                position-md-absolute
                mb-3 mb-lg-0
              "
            >
              <!-- <a class="position-relative p-2" href="#">
                <img
                  src="../../static/image/Jochi Icons/home_hires.png"
                  alt=""
                  class="dark-icon"
                />
              </a> -->
              <div class="dropdown">
                <a
                  class="dropdown-toggle position-relative p-2"
                  href="#"
                  data-toggle="dropdown"
                  @click="getNotifications()"
                >
                  <img
                    src="../../static/image/Jochi Icons/bell_hires.png"
                    alt=""
                    class="dark-icon"
                  />
                  <span v-if="notificationCount > 0" class="notify-span">{{
                    notificationCount
                  }}</span>
                </a>
                <div class="dropdown-menu notify border-0">
                  <!-- notification -->
                  <div
                    class="notifications dropdown-item px-2"
                    v-if="notificationList && notificationList.length > 0"
                  >
                    <div
                      class="
                        d-flex
                        justify-content-between
                        align-items-center
                        px-3
                        my-2
                      "
                    >
                      <h5 class="color-primary font-semi-bold mb-0">
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
                      <div
                        :class="
                          data.isViewed
                            ? 'unread d-flex flex-column p-3 card card-void rounded-22 my-3 cursor-pointer'
                            : 'read d-flex flex-column p-3 card card-void rounded-22 my-3 cursor-pointer'
                        "
                        v-for="(data, index) in notificationList"
                        :key="index"
                        @click="onNotificationClick(data.id, data.meetingType)"
                      >
                        <p
                          class="
                            color-dark
                            font-semi-bold
                            text-14 text-wrap
                            mb-0
                          "
                        >
                          {{ data.message }}
                        </p>
                        <p
                          class="
                            color-secondary
                            text-12
                            font-regulat
                            mb-0
                            d-flex
                            justify-content-end
                            align-items-center
                          "
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
            </div>
            <nuxt-link
              to="/user-profile"
              class="
                pr-0 pr-lg-4
                d-flex
                flex-column
                align-items-center align-items-lg-start
              "
            >
              <img
                v-bind:src="
                  profile && profile != 'null' ? profile : defaultImage
                "
                class="rounded-circle img-profile mb-2"
                alt=""
                id="profileImage"
              />
              <div
                class="
                  d-flex
                  flex-column flex-lg-row
                  align-items-center
                  justify-cotent-center
                "
              >
                <h4
                  class="
                    color-primary
                    mb-0
                    font-semi-bold
                    text-18 text-center text-lg-left
                    word-break
                  "
                >
                  {{ firstName }}
                </h4>
              </div>
            </nuxt-link>
          </div>
          <div
            class="
              menu-items
              position-relative
              py-4
              custom-scroll-for-side-menus
              d-flex
              flex-column flex-fill
              h-40
            "
          >
            <div class="accordion" id="accordionExample">
              <!-- Home Menu -->
              <div class="menu-items position-relative py-0">
                <div class="accordion" id="accordionExample">
                  <div class="card bg-transparent shadow-none border-0 mb-2">
                    <div
                      class="card-header bg-transparent border-0 p-1"
                      id="headingOne"
                    >
                      <div class="mb-0 d-flex">
                        <button
                          class="
                            btn btn-link
                            d-flex
                            align-items-center
                            justify-content-between
                            bg-transparent
                            text-decoration-none text-18
                            color-secondary
                            btn-block
                            px-0
                            text-left
                            collapsed
                            justify-content-start
                            py-0 py-lg-0
                          "
                          @click="$event.target.classList.toggle('active')"
                          type="button"
                          data-toggle="collapse"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          <div class="bottum-btn">
                            <nuxt-link
                              to="/teacher-dashboard"
                              data-toggle="collapse"
                              class="
                                btn btn-link
                                d-flex
                                align-items-center
                                justify-content-between
                                bg-transparent
                                text-decoration-none text-18
                                color-secondary
                                btn-block
                                text-left
                                collapsed
                                flex-fill
                                px-0
                                py-1 py-xl-2
                              "
                            >
                              <div class="font-icon d-inline-block">
                                <img
                                  src="../../static/image/home-solid.png"
                                  alt=""
                                />
                              </div>
                              <span
                                class="
                                  ml-3
                                  color-secondary
                                  text-capitalize
                                  font-medium
                                "
                                >Home</span
                              >
                            </nuxt-link>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Home Menu End -->
              <!-- Appointments Menu -->
              <div class="menu-items position-relative py-0">
                <div class="accordion" id="accordionExample">
                  <div class="card bg-transparent shadow-none border-0 mb-2">
                    <div
                      class="card-header bg-transparent border-0 p-1"
                      id="headingOne"
                    >
                      <div class="mb-0 d-flex">
                        <button
                          class="
                            btn btn-link
                            d-flex
                            align-items-center
                            justify-content-between
                            bg-transparent
                            text-decoration-none text-18
                            color-secondary
                            btn-block
                            px-0
                            text-left
                            collapsed
                            justify-content-start
                            py-0 py-lg-0
                          "
                          @click="$event.target.classList.toggle('active')"
                          type="button"
                          data-toggle="collapse"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          <div class="bottum-btn">
                            <nuxt-link
                              to="/teacher-appointment"
                              data-toggle="collapse"
                              class="
                                btn btn-link
                                d-flex
                                align-items-center
                                justify-content-between
                                bg-transparent
                                text-decoration-none text-18
                                color-secondary
                                btn-block
                                text-left
                                flex-fill
                                px-0
                                py-1 py-xl-2
                              "
                            >
                              <div class="font-icon d-inline-block">
                                <img
                                  src="../../static/image/user-tag.png"
                                  alt=""
                                />
                              </div>
                              <span
                                class="
                                  ml-3
                                  color-secondary
                                  text-capitalize
                                  font-medium
                                "
                                >Appoinments</span
                              >
                            </nuxt-link>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Appointments Menu End -->
              <!-- Availability Menu -->
              <div class="menu-items position-relative py-0">
                <div class="accordion" id="accordionExample">
                  <div class="card bg-transparent shadow-none border-0 mb-2">
                    <div
                      class="card-header bg-transparent border-0 p-1"
                      id="headingOne"
                    >
                      <div class="mb-0 d-flex">
                        <button
                          class="
                            btn btn-link
                            d-flex
                            align-items-center
                            justify-content-between
                            bg-transparent
                            text-decoration-none text-18
                            color-secondary
                            btn-block
                            px-0
                            text-left
                            collapsed
                            justify-content-start
                            py-0 py-lg-0
                          "
                          @click="$event.target.classList.toggle('active')"
                          type="button"
                          data-toggle="collapse"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          <div class="bottum-btn">
                            <nuxt-link
                              to="/custom-availability"
                              data-toggle="collapse"
                              class="
                                btn btn-link
                                d-flex
                                align-items-center
                                justify-content-between
                                bg-transparent
                                text-decoration-none text-18
                                color-secondary
                                btn-block
                                text-left
                                flex-fill
                                px-0
                                py-1 py-xl-2
                              "
                            >
                              <div class="font-icon d-inline-block">
                                <img
                                  src="../../static/image/calendar-check.png"
                                  alt=""
                                />
                              </div>
                              <span
                                class="
                                  ml-3
                                  color-secondary
                                  text-capitalize
                                  font-medium
                                "
                                >Availability</span
                              >
                            </nuxt-link>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Availability Menu End -->
              <!-- Sync Calendar Menu -->
              <div class="menu-items position-relative py-0">
                <div class="accordion" id="accordionExample">
                  <div class="card bg-transparent shadow-none border-0 mb-2">
                    <div
                      class="card-header bg-transparent border-0 p-1"
                      id="headingOne"
                    >
                      <div class="mb-0 d-flex">
                        <button
                          class="
                            btn btn-link
                            d-flex
                            align-items-center
                            justify-content-between
                            bg-transparent
                            text-decoration-none text-18
                            color-secondary
                            btn-block
                            px-0
                            text-left
                            collapsed
                            justify-content-start
                            py-0 py-lg-0
                          "
                          @click="$event.target.classList.toggle('active')"
                          type="button"
                          data-toggle="collapse"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          <div class="bottum-btn">
                            <nuxt-link
                              to="/teacher-syncCalendar"
                              data-toggle="collapse"
                              class="
                                btn btn-link
                                d-flex
                                align-items-center
                                justify-content-between
                                bg-transparent
                                text-decoration-none text-18
                                color-secondary
                                btn-block
                                text-left
                                flex-fill
                                px-0
                                py-1 py-xl-2
                              "
                            >
                              <div class="font-icon d-inline-block">
                                <img
                                  src="../../static/image/sync-solid.png"
                                  alt=""
                                />
                              </div>
                              <span
                                class="
                                  ml-3
                                  color-secondary
                                  text-capitalize
                                  font-medium
                                "
                                >Sync Calendar</span
                              >
                            </nuxt-link>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Sync Calendar Menu End -->

              <!-- Teams and Clubs -->
              <div class="card bg-transparent shadow-none border-0 mb-2">
                <div
                  class="card-header bg-transparent border-0 p-1"
                  id="headingThree"
                >
                  <div class="mb-0 d-flex">
                    <button
                      class="
                        btn btn-link
                        d-flex
                        align-items-center
                        justify-content-between
                        bg-transparent
                        text-decoration-none text-18
                        color-secondary
                        btn-block
                        text-left
                        collapsed
                        flex-fill
                        px-0
                        py-1 py-xl-2
                      "
                      @click="$event.target.classList.toggle('active')"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      <div class="font-icon d-inline-block">
                        <img
                          src="../../static/image/Football.png"
                          alt=""
                          class="teams-clubs"
                        />
                      </div>
                      <span
                        class="ml-3 color-secondary text-capitalize font-medium"
                        >Extracurriculars</span
                      >
                      <i class="fas fa-chevron-right color-secondary ms-2"></i>
                    </button>
                  </div>
                </div>
                <div
                  id="collapseThree"
                  class="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordionExample"
                >
                  <div class="card-body py-0">
                    <ul class="inner-custom-list ml-4 mb-2">
                      <li class="nav-item pb-1 pb-md-0 mb-1 mb-lg-0">
                        <nuxt-link to="/club-detail" class="nav-link"
                          >Existing</nuxt-link
                        >
                      </li>
                      <li class="nav-item pb-1 pb-md-0 mb-1 mb-lg-0">
                        <nuxt-link to="/club-catalogue" class="nav-link"
                          >Catalog</nuxt-link
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- Teams and Clubs End -->

              <!-- Advisor Menu -->
              <div class="menu-items position-relative py-0">
                <div class="accordion" id="accordionExample">
                  <div class="card bg-transparent shadow-none border-0 mb-2">
                    <div
                      class="card-header bg-transparent border-0 p-1"
                      id="headingOne"
                    >
                      <div class="mb-0 d-flex">
                        <button
                          class="
                            btn btn-link
                            d-flex
                            align-items-center
                            justify-content-between
                            bg-transparent
                            text-decoration-none text-18
                            color-secondary
                            btn-block
                            px-0
                            text-left
                            collapsed
                            justify-content-start
                            py-0 py-lg-0
                          "
                          @click="$event.target.classList.toggle('active')"
                          type="button"
                          data-toggle="collapse"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          <div class="bottum-btn">
                            <nuxt-link
                              to="/teacher-advisor"
                              data-toggle="collapse"
                              class="
                                btn btn-link
                                d-flex
                                align-items-center
                                justify-content-between
                                bg-transparent
                                text-decoration-none text-18
                                color-secondary
                                btn-block
                                text-left
                                flex-fill
                                px-0
                                py-1 py-xl-2
                              "
                            >
                              <div class="font-icon d-inline-block">
                                <img
                                  src="../../static/image/advisor.png"
                                  alt=""
                                />
                              </div>
                              <span
                                class="
                                  ml-3
                                  color-secondary
                                  text-capitalize
                                  font-medium
                                "
                                >Advisor</span
                              >
                            </nuxt-link>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Advisor Menu End -->
            </div>
          </div>
        </div>
        <div>
          <!-- <div class="menu-items position-relative py-0">
            <div class="accordion" id="accordionExample">
              <div class="card bg-transparent shadow-none border-0 mb-2">
                <div
                  class="card-header bg-transparent border-0 p-1"
                  id="headingOne"
                >
                  <div class="mb-0 d-flex">
                    <button
                      class="
                        btn btn-link
                        d-flex
                        align-items-center
                        justify-content-between
                        bg-transparent
                        text-decoration-none text-18
                        color-secondary
                        btn-block
                        px-0
                        text-left
                        collapsed
                        justify-content-start
                        py-auto py-lg-0
                      "
                      @click="
                        $event.target.classList.toggle('active');
                        openLink();
                      "
                      type="button"
                      data-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      <div class="bottum-btn">
                        <div class="font-icon d-inline-block">
                          <i class="fas fa-comments"></i>
                        </div>
                        <span
                          class="
                            ml-3
                            color-secondary
                            text-capitalize
                            font-medium
                          "
                          >FAQ</span
                        >
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="menu-items position-relative py-0">
            <div class="accordion" id="accordionExample">
              <div class="card bg-transparent shadow-none border-0 mb-2">
                <div
                  class="card-header bg-transparent border-0 p-1"
                  id="headingOne"
                >
                  <div class="mb-0 d-flex">
                    <button
                      class="
                        btn btn-link
                        d-flex
                        align-items-center
                        justify-content-between
                        bg-transparent
                        text-decoration-none text-18
                        color-secondary
                        btn-block
                        px-0
                        text-left
                        collapsed
                        justify-content-start
                        py-auto py-lg-0
                      "
                      @click="$event.target.classList.toggle('active')"
                      type="button"
                      data-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      <nuxt-link to="/privacy-policy" class="bottum-btn">
                        <div class="font-icon d-inline-block">
                          <i class="fas fa-shield-alt"></i>
                        </div>
                        <span
                          class="
                            ml-3
                            color-secondary
                            text-capitalize
                            font-medium
                          "
                          >Privacy Policy</span
                        >
                      </nuxt-link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div class="menu-items position-relative py-0">
            <div class="accordion" id="accordionExample">
              <div class="card bg-transparent shadow-none border-0 mb-2">
                <div
                  class="card-header bg-transparent border-0 p-1"
                  id="headingOne"
                >
                  <div class="mb-0 d-flex justify-content-center justify-content-lg-start">
                    <button
                      class="
                        btn btn-link
                        d-flex
                        align-items-center
                        justify-content-between
                        bg-transparent
                        text-decoration-none text-18
                        color-secondary
                        btn-block
                        px-0
                        text-left
                        collapsed
                        justify-content-start
                        py-2 py-lg-0
                      "
                      @click="$event.target.classList.toggle('active')"
                      type="button"
                      data-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      <a href="#" @click="GetLogout()" class="bottum-btn">
                        <div class="font-icon d-inline-block">
                          <i class="fas fa-sign-out-alt"></i>
                        </div>
                        <span
                          class="
                            ml-3
                            color-secondary
                            text-capitalize
                            font-medium
                          "
                          >Logout</span
                        >
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { defaultImage } from "../../assets/js/constants";
import { FRONTEND_BASE_URL, GG4L_REDIRECT_URL } from "~/assets/js/constants";

export default {
  name: "UserSidebarTeacher",
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
  },
  methods: {
    ...mapActions("studentSignIn", {
      getLogout: "getLogout",
      userDetails: "userDetails",
      getNotificationsList: "getNotificationsList",
      clearNotificationsList: "clearNotificationsList",
      markAsRead: "markAsRead",
      getNotificationCount: "getNotificationCount",
    }),
    async getPushNotifications() {
      this.$fire.messaging.onMessage((payload) => {
        // alert("alerting" + payload.notification.body);
        // console.info("Message received: ", payload);
        this.getCount();
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
      await this.markNotificationAsRead(id);

      if (type == "Peer" || type == "Teacher") {
        this.$router.push("/teacher-appointment");
      } else if (type == "Assignment") {
        this.$router.push("/planner-month");
      } else if (
        type == "Session" ||
        type == "Study session" ||
        type == "Assignment session" ||
        type == "Assignment session rescheduled"
      ) {
        this.$router.push("/study-time");
      } else if (type == "Teacher Advisor") {
        this.$router.push("/teacher-advisor");
      } else if (
        type == "Club" ||
        type == "Club Leader" ||
        type == "Club Activation" ||
        type == "Team Activation"
      ) {
        this.$router.push("/clubs");
      }

      // if (type == "Club Meeting") {
      //   this.$router.push("/clubs");
      // } else if (type == "Student Meeting") {
      //   this.$router.push("/teacher-appointment");
      // } else if (type == "Meeting Request") {
      //   this.$router.push("/teacher-appointment");
      // } else if (type == "Meeting Rescheduled") {
      //   this.$router.push("/teacher-appointment");
      // } else if (type == "Advisor Request Accepted") {
      //   this.$router.push("/teacher-advisor");
      // }
      this.getNotificationsList();
    },
    async markNotificationAsRead(id) {
      await this.markAsRead({ notificationId: id });
    },
    // async GetLogout() {
    //   await this.getLogout({
    //     auth_token: localStorage.getItem("token").replace("Bearer ", ""),
    //   });
    //   window.localStorage.clear();
    //   window.location.href = GG4L_REDIRECT_URL + FRONTEND_BASE_URL;
    // },
    async GetLogout() {
      let confirm = window.confirm("You will be logged out now");
      if (confirm) {
        await this.getLogout({
          auth_token: localStorage.getItem("token").replace("Bearer ", ""),
        });
        window.localStorage.clear();
        window.location.href = GG4L_REDIRECT_URL + FRONTEND_BASE_URL;
      } else {
        return;
      }
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
  },
  // // middleware: "authenticated",
};
</script>
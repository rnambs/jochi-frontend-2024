<template>
  <section id="header" class="">
    <div class="header-section position-fixed top-0 position-relative">
      <!-- <span class="menu-bar-icon" v-on:click="clickableIcon()"
        ><i class="fas fa-bars"></i
      ></span> -->
      <!-- <h5 class="mr-3 mb-0 mt-0 text-light">{{ firstName }}</h5> -->
      <!-- Student Sidebar -->
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
          <!-- <div class="logo-section mt-3 p-2">
            <a href="">
              <div
                class="
                  text-logo
                  d-flex
                  align-items-center
                  justify-content-center
                "
              >
                <img
                  src="~/assets/images/Icon/logo-icon.png"
                  alt="logo"
                  class="jochi-logo-text pr-2"
                />
                <p class="mb-0 jochi-logo">Jochi</p>
              </div>
              <img
                src="~/assets/images/Icon/Jochi Logo No Bcknd.png"
                alt=""
                class="icon-logo"
              />
            </a>
          </div> -->
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
              <nuxt-link to="/student-dashboard" class="nav-link btn p-0 mb-2">
                <img
                  src="../../static/image/Jochi Icons/home_hires.png"
                  alt=""
                  class="dark-icon"
              /></nuxt-link>

              <div class="dropdown mb-2">
                <a
                  class="dropdown-toggle position-relative p-2"
                  href="#"
                  data-toggle="dropdown"
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
                      <!-- :class="
                          data.isViewed
                            ? 'unread d-flex flex-column p-3 card card-primary-sm bg-white rounded-22 my-3 cursor-pointer'
                            : 'read d-flex flex-column p-3 card card-void rounded-22 my-3 cursor-pointer'
                        " -->
                      <div
                        class="
                          d-flex
                          flex-column
                          p-3
                          card card-void
                          rounded-22
                          my-3
                          cursor-pointer
                        "
                        v-for="(data, index) in notificationList"
                        :key="index"
                        @click="onNotificationClick(data.id, data.title)"
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
              <!-- <img v-else src="../../assets/images/avatar/man_green.svg" class="rounded-circle img-profile" alt="" > -->
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

            <!-- <div class="user-icon mr-3 settings-icon-section position-absolute">
              <div class="dropdown">
                <a class="dropdown-toggle" href="#" data-toggle="dropdown">
                  <p>Settings</p>
                </a>
                <div class="dropdown-menu">
                  <nuxt-link to="/user-reset-password" class="dropdown-item">
                    <span>Reset Password</span>
                  </nuxt-link>
                  <a class="dropdown-item" href="#" @click="GetLogout()"
                    >Logout</a
                  >
                </div>
              </div>
            </div> -->
            <!-- <div class="sidebar-profile p-2 d-flex align-items-center">
              <img
                v-bind:src="
                  profile && profile != 'null' ? profile : defaultImage
                "
                id="menu_profile_pic"
                alt=""
                class="profile-pic p-1"
              />
              <div class="profile-text pl-2">
                <p class="wish-text mb-1">Hello,</p>
                <p class="profile-name mb-0">{{ firstName }}</p>
              </div>
            </div> -->
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
                        text-left
                        collapsed
                        flex-fill
                        px-0
                        py-2 py-lg-2
                      "
                      @click="$event.target.classList.toggle('active')"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      <div class="font-icon d-inline-block">
                        <img
                          src="../../static/image/Calendar.png"
                          alt=""
                          class="planner"
                        />
                      </div>
                      <span
                        class="ml-3 color-secondary text-capitalize font-medium"
                        >Planner</span
                      >
                      <i class="fas fa-chevron-right color-secondary ms-2"></i>
                    </button>
                  </div>
                </div>
                <div
                  id="collapseOne"
                  class="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div class="card-body py-0">
                    <ul class="inner-custom-list ml-4 mb-2">
                      <li class="nav-item pb-1 pb-md-0 mb-1 mb-lg-0">
                        <nuxt-link
                          to="/planner-day"
                          @click="$event.target.classList.toggle('active')"
                          class="nav-link"
                          >Daily</nuxt-link
                        >
                      </li>
                      <li class="nav-item pb-1 pb-md-0 mb-1 mb-lg-0">
                        <nuxt-link
                          to="/planner-week"
                          @click="$event.target.classList.toggle('active')"
                          class="nav-link"
                          >Weekly</nuxt-link
                        >
                      </li>
                      <li class="nav-item pb-1 pb-md-0 mb-1 mb-lg-0">
                        <nuxt-link
                          to="/planner-month"
                          @click="$event.target.classList.toggle('active')"
                          class="nav-link"
                          >Monthly</nuxt-link
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card bg-transparent shadow-none border-0 mb-2">
                <div
                  class="card-header bg-transparent border-0 p-1"
                  id="headingTwo"
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
                        py-2 py-lg-2
                      "
                      @click="$event.target.classList.toggle('active')"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <div class="font-icon d-inline-block">
                        <img
                          src="../../static/image/Call.png"
                          alt=""
                          class="meetings"
                        />
                      </div>
                      <span
                        class="ml-3 color-secondary text-capitalize font-medium"
                        >Meeting</span
                      >
                      <i class="fas fa-chevron-right color-secondary ms-2"></i>
                    </button>
                  </div>
                </div>
                <div
                  id="collapseTwo"
                  class="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionExample"
                >
                  <div class="card-body py-0">
                    <ul class="inner-custom-list ml-4 mb-2">
                      <li class="nav-item pb-1 pb-md-0 mb-1 mb-lg-0">
                        <nuxt-link
                          to="/teacher-meeting"
                          @click="$event.target.classList.toggle('active')"
                          class="nav-link text-nowrap"
                          >Schedule</nuxt-link
                        >
                      </li>
                      <!-- <li class="nav-item">
                        <nuxt-link
                          to="/peer-meeting"
                          @click="$event.target.classList.toggle('active')"
                          class="nav-link"
                          >Peer</nuxt-link
                        >
                      </li> -->
                      <li class="nav-item pb-1 pb-md-0 mb-1 mb-lg-0">
                        <nuxt-link
                          to="/viewall-meeting"
                          @click="$event.target.classList.toggle('active')"
                          class="nav-link text-nowrap"
                          >View All</nuxt-link
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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
                        py-2 py-lg-2
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
              <div class="card bg-transparent shadow-none border-0 mb-2">
                <div
                  class="card-header bg-transparent border-0 p-1"
                  id="headingFour"
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
                        pt-0 pt-lg-0
                        pb-2 pb-lg-2
                      "
                      @click="$event.target.classList.toggle('active')"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      <div class="font-icon d-inline-block">
                        <img
                          src="../../static/image/Lot_of_book.png"
                          alt=""
                          class="study-room"
                        />
                      </div>
                      <span
                        class="ml-3 color-secondary text-capitalize font-medium"
                        >Study Room</span
                      >
                      <i class="fas fa-chevron-right color-secondary ms-2"></i>
                    </button>
                  </div>
                </div>
                <div
                  id="collapseFour"
                  class="collapse"
                  aria-labelledby="headingFour"
                  data-parent="#accordionExample"
                >
                  <div class="card-body py-0">
                    <ul class="inner-custom-list ml-4 mb-2">
                      <li class="nav-item pb-1 pb-md-0 mb-1 mb-lg-0">
                        <nuxt-link to="/study-time" class="nav-link"
                          >Session</nuxt-link
                        >
                      </li>
                      <li class="nav-item pb-1 pb-md-0 mb-1 mb-lg-0">
                        <nuxt-link
                          to="/study-analytics"
                          class="nav-link text-nowrap"
                          >Analytics</nuxt-link
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <!-- <div class="menu-items  position-relative py-0">
            <div class="accordion" id="accordionExample">
              <div class="card bg-transparent shadow-none border-0 mb-2">
                <div class="card-header bg-transparent border-0 p-1" id="headingOne">
                  <div class="mb-0 d-flex">
                    <button
                      class="
                        btn btn-link d-flex align-items-center justify-content-between bg-transparent text-decoration-none text-18 color-secondary btn-block px-0
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
                        <span class="ml-3 color-secondary text-capitalize font-medium">FAQ</span>
                      </div> -->
          <!-- <a href="https://www.jochi.info/faqs">FAQ</a> -->
          <!--</button>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <!-- <div class="menu-items  position-relative py-0">
            <div class="accordion" id="accordionExample">
              <div class="card bg-transparent shadow-none border-0 mb-2">
                <div class="card-header bg-transparent border-0 p-1" id="headingOne">
                  <div class="mb-0 d-flex">
                    <button
                      class="
                        btn btn-link d-flex align-items-center justify-content-between bg-transparent text-decoration-none text-18 color-secondary btn-block px-0
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
                        <span class="ml-3 color-secondary text-capitalize font-medium">Privacy Policy</span>
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
                  <div
                    class="
                      mb-0
                      d-flex
                      justify-content-center justify-content-lg-start
                    "
                  >
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
                      <!-- @click="GetLogout()" -->
                      <a @click="GetLogout()" href="#" class="bottum-btn">
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
                        >
                          Logout
                        </span>
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
    this.sendToken();
    this.getNotifications();

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
    }),
    async sendToken() {
      // const currentToken = await this.$fire.messaging.getToken();
      // console.log("current token consoling", currentToken);
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
      console.log(type);
      if (type == "Club Meeting") {
        this.$router.push("/club-detail");
      } else if (type == "Assignment Session Invitation") {
        this.$router.push("/planner-month");
      } else if (type == "Teacher Advisor Request") {
        this.$router.push("/user-profile");
      } else if (type == "Study Session Invitation") {
        this.$router.push("/study-time");
      } else if (
        type == "Meeting Request Accepeted" ||
        type == "Peer Meeting" ||
        type == "Peer Meeting Scheduled"
      ) {
        this.$router.push("/viewall-meeting");
      }
      this.getNotificationsList();
    },
    async markNotificationAsRead(id) {
      await this.markAsRead({ notificationId: id });
    },

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
  },
  // // middleware: "authenticated",
};
</script>
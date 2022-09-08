<template>
  <section id="header" class="">
    <div class="header-section position-fixed top-0">
      <!-- <span class="menu-bar-icon" v-on:click="clickableIcon()"
        ><i class="fas fa-bars"></i
      ></span> -->
      <!-- <h5 class="mr-3 mb-0 mt-0 text-light">{{ firstName }}</h5> -->
      <!-- <div class="user-icon mr-3">
        <div class="dropdown">
          <a class="dropdown-toggle" href="#" data-toggle="dropdown">
            <i class="fas fa-cog"></i>
          </a>
          <div class="dropdown-menu">
            <nuxt-link to="/user-reset-password" class="dropdown-item">
              <span>Reset Password</span>
            </nuxt-link>
            <a class="dropdown-item" href="#" @click="GetLogout()">Logout</a>
          </div>
        </div>
      </div>
      <div class="user-icon mr-3">
        <div class="dropdown">
          <a
            class="dropdown-toggle position-relative p-2"
            href="#"
            data-toggle="dropdown"
          >
            <i class="fas fa-bell"></i>
            <span v-if="notificationCount > 0" class="notify-span">{{
              notificationCount
            }}</span>
          </a>
          <div class="dropdown-menu notify"> -->
      <!-- notification -->
      <!-- <div
              class="notifications dropdown-item px-2"
              v-if="notificationList && notificationList.length > 0"
            >
              <div
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  px-3
                  mt-2
                  mb-3
                "
              >
                <h5 class="notify-head">Notifications</h5>
                <button
                  class="btn btn-sm notify-btn mb-3"
                  @click="clearNotifications()"
                >
                  Clear all
                </button>
              </div>
              <div class="notification-text px-3">
                <p
                  :class="
                    data.isViewed
                      ? 'unread d-flex flex-column p-3'
                      : 'read d-flex flex-column p-3'
                  "
                  v-for="(data, index) in notificationList"
                  :key="index"
                  @click="onNotificationClick(data.id, data.title)"
                >
                  <span class="notify-text">{{ data.message }}</span>
                  <span class="notify-time d-flex justify-content-end">{{
                    data.timestamp
                  }}</span>
                </p>
              </div>
            </div>
            <div
              class="notifications dropdown-item px-2 no-notify"
              v-if="!notificationList || notificationList.length == 0"
            >
              No notifications to display
            </div> -->
      <!-- notification End -->
      <!-- </div>
        </div>
      </div>
      <nuxt-link to="/user-profile" class="pr-4">
        <img
          v-bind:src="profile && profile != 'null' ? profile : defaultImage"
          class="rounded-circle img-profile"
          alt=""
          id="profileImageTeacher"
        />
      </nuxt-link> -->

      <!-- Teacher Sidebar -->
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
        <!-- <div class="logo-section mt-3 p-2">
          <a href="">
            <div
              class="text-logo d-flex align-items-center justify-content-center"
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
              notification-icon-section
              align-items-center
              justify-content-end
            "
          >
            <a class="position-relative p-2" href="#">
              <img
                src="../../static/image/Jochi Icons/home_hires.png"
                alt=""
                class="dark-icon"
              />
            </a>
            <div class="dropdown">
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
                <span class="notify-span">3</span>
              </a>
              <div class="dropdown-menu notify">
                <!-- notification -->
                <!-- <div
                    class="notifications dropdown-item px-2"
                    v-if="notificationList && notificationList.length > 0"
                  >
                    <div
                      class="
                        d-flex
                        justify-content-between
                        align-items-center
                        px-3
                        mt-2
                        mb-3
                      "
                    >
                      <h5 class="notify-head">Notifications</h5>
                      <button
                        class="btn btn-sm notify-btn mb-3"
                        @click="clearNotifications()"
                      >
                        Clear all
                      </button>
                    </div>
                    <div class="notification-text px-3">
                      <p
                        :class="
                          data.isViewed
                            ? 'unread d-flex flex-column p-3'
                            : 'read d-flex flex-column p-3'
                        "
                        v-for="(data, index) in notificationList"
                        :key="index"
                        @click="onNotificationClick(data.id, data.title)"
                      >
                        <span class="notify-text">{{ data.message }}</span>
                        <span class="notify-time d-flex justify-content-end">{{
                          data.timestamp
                        }}</span>
                      </p>
                    </div>
                  </div> -->
                <!-- <div
                    class="notifications dropdown-item px-2 no-notify"
                    v-if="!notificationList || notificationList.length == 0"
                  >
                    No notifications to display
                  </div> -->
                <!-- notification End -->
              </div>
            </div>
          </div>
          <a class="pr-4">
            <!-- <img
              v-bind:src="
                profile && profile != 'null' ? profile : defaultImage
              "
              class="rounded-circle img-profile"
              alt=""
              id="profileImage"
            /> -->
            <img
              src="../../assets/images/avatar/man_green.svg"
              class="rounded-circle img-profile"
              alt=""
            />
            <h4
              class="
                color-primary
                mb-0
                mt-2
                font-semi-bold
                text-18 text-center text-lg-left
              "
            >
              Tophia
            </h4>
          </a>
          <div class="user-icon mr-3 settings-icon-section position-absolute">
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
          </div>
          <!-- <div class="sidebar-profile p-2 d-flex align-items-center">
            <img
              v-bind:src="profile && profile != 'null' ? profile : defaultImage"
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
            pt-4
            d-flex
            flex-column
            h-100
            justify-content-between
          "
        >
          <ul class="custom-list">
            <li class="active menu-list nav-item">
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
                  py-2 py-lg-2
                "
              >
                <div class="font-icon d-inline-block">
                  <img src="../../static/image/home-solid.png" alt="" />
                </div>
                <span class="ml-3 color-secondary text-capitalize font-medium"
                  >Home</span
                >
              </nuxt-link>
            </li>

            <li class="menu-list nav-item">
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
                  py-2 py-lg-2
                "
              >
                <div class="font-icon d-inline-block">
                  <img src="../../static/image/user-tag.png" alt="" />
                </div>
                <span class="ml-3 color-secondary text-capitalize font-medium"
                  >Appoinments</span
                >
              </nuxt-link>
            </li>
            <li class="menu-list nav-item">
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
                  py-2 py-lg-2
                "
              >
                <div class="font-icon d-inline-block">
                  <img src="../../static/image/calendar-check.png" alt="" />
                </div>
                <span class="ml-3 color-secondary text-capitalize font-medium"
                  >Availability</span
                >
              </nuxt-link>
            </li>
            <li class="menu-list nav-item">
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
                  py-2 py-lg-2
                "
              >
                <div class="font-icon d-inline-block">
                  <img src="../../static/image/sync-solid.png" alt="" />
                </div>
                <span class="ml-3 color-secondary text-capitalize font-medium"
                  >Sync Calendar</span
                >
              </nuxt-link>
            </li>
            <li class="menu-list nav-item">
              <nuxt-link
                to="/club-detail"
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
                  py-2 py-lg-2
                "
              >
                <div class="font-icon d-inline-block">
                  <img src="../../static/image/club-type.png" alt="" />
                </div>
                <span class="ml-3 color-secondary text-capitalize font-medium"
                  >Club - Existing</span
                >
              </nuxt-link>
            </li>
            <li class="menu-list nav-item">
              <nuxt-link
                to="/club-catalogue"
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
                  py-2 py-lg-2
                "
              >
                <div class="font-icon d-inline-block">
                  <img
                    src="~/assets/images/Icon/club-icon.png"
                    class="image-i"
                    alt=""
                  />
                </div>
                <span class="ml-3 color-secondary text-capitalize font-medium"
                  >Club Catalog</span
                >
              </nuxt-link>
            </li>
            <li class="menu-list nav-item">
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
                  py-2 py-lg-2
                "
              >
                <div class="font-icon d-inline-block">
                  <img src="../../static/image/advisor.png" alt="" />
                </div>
                <span class="ml-3 color-secondary text-capitalize font-medium"
                  >Advisor</span
                >
              </nuxt-link>
            </li>
            <!-- <li class="menu-list nav-item">
              <div class="card mb-2">
                <div class="card-header p-1" id="headingThree">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left collapsed"
                      @click="$event.target.classList.toggle('active')"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      <div class="font-icon d-inline-block">
                        <img
                          src="~/assets/images/Icon/club-icon.png"
                          alt=""
                          class="teams-clubs"
                        />
                      </div>
                      <span class="ml-2">Teams & Clubs</span>
                      <i class="fas fa-chevron-right"></i>
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseThree"
                  class="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordionExample"
                >
                  <div class="card-body py-0">
                    <ul class="inner-custom-list ml-4">
                      <li class="nav-item">
                        <nuxt-link to="/club-detail" class="nav-link"
                          >Existing</nuxt-link
                        >
                      </li>
                      <li class="nav-item">
                        <nuxt-link to="/club-catalogue" class="nav-link"
                          >Catalog</nuxt-link
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li> -->
          </ul>
          <ul class="custom-list">
            <li @click="openLink()" class="active menu-list nav-item">
              <div
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
                  py-2 py-lg-2
                "
              >
                <div class="font-icon d-inline-block">
                  <i class="fas fa-comments"></i>
                </div>
                <span class="ml-3 color-secondary text-capitalize font-medium"
                  >FAQ</span
                >
              </div>
            </li>

            <li class="menu-list nav-item">
              <nuxt-link
                to="/privacy-policy"
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
                  py-2 py-lg-2
                "
              >
                <div class="font-icon d-inline-block">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <span class="ml-3 color-secondary text-capitalize font-medium"
                  >Privacy Policy</span
                >
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { defaultImage } from "../../assets/js/constants";

export default {
  name: "UserTeacherSidebar",
  // // middleware: "authenticated",
  data() {
    return {
      firstName: "",
      profile: "",
      defaultImage: defaultImage,
    };
  },
  mounted() {
    this.UserDetails();
    this.profile = localStorage.getItem("profile_pic");
    this.firstName = localStorage.getItem("first_name");
    if (!localStorage.getItem("email")) {
      this.$router.push("/");
    }
    this.getNotifications();

    this.sendToken();

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
    async UserDetails() {
      this.loading = true;
      await this.userDetails({
        user_id: localStorage.getItem("id"),
      });
      this.firstName = localStorage.getItem("first_name");
      this.schoolName = localStorage.getItem("school_name");
      this.profile = localStorage.getItem("profile_pic");

      if (!localStorage.getItem("email")) {
        this.$router.push("/");
      }
      this.loading = false;
    },
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
      if (type == "Club Meeting") {
        this.$router.push("/clubs");
      } else if (type == "Student Meeting") {
        this.$router.push("/teacher-appointment");
      } else if (type == "Meeting Request") {
        this.$router.push("/teacher-appointment");
      } else if (type == "Meeting Rescheduled") {
        this.$router.push("/teacher-appointment");
      } else if (type == "Teacher Advisor") {
        this.$router.push("/user-profile");
      }
      this.getNotificationsList();
    },
    async markNotificationAsRead(id) {
      await this.markAsRead({ notificationId: id });
    },
    async GetLogout() {
      await this.getLogout({
        auth_token: localStorage.getItem("token").replace("Bearer ", ""),
      });
      window.localStorage.clear();
      window.location.href =
        "https://sso.gg4l.com/oauth/loginwith/logout?redirect_uri=" +
        FRONTEND_BASE_URL;
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
};
</script>
<template>
  <section id="header" class="">
    <div class="header-section fixed-top">
      <span class="menu-bar-icon" v-on:click="clickableIcon()"
        ><i class="fas fa-bars"></i
      ></span>
      <!-- <h5 class="mr-3 mb-0 mt-0 text-light">{{ firstName }}</h5> -->
      <div class="user-icon mr-3">
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
          <div class="dropdown-menu notify">
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
                  mt-2
                  mb-3
                "
              >
                <h5 class="notify-head">Notificaitons</h5>
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
            </div>
            <!-- notification End -->
          </div>
        </div>
      </div>
      <nuxt-link to="/user-profile" class="pr-4">
        <img
          v-bind:src="profile && profile != 'null' ? profile : defaultImage"
          class="rounded-circle img-profile"
          alt=""
          id="profileImageTeacher"
        />
      </nuxt-link>

      <!-- Teacher Sidebar -->
      <div class="teacher-sidebar-section" id="clickableId">
        <div class="logo-section mt-3 p-2">
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
        </div>
        <div class="position-relative profile-sidebar">
          <div class="sidebar-profile p-2 d-flex align-items-center">
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
          </div>
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
                class="nav-link"
              >
                <div class="font-icon d-inline-block">
                  <i class="fas fa-home"></i>
                </div>
                <span class="ml-2">Home</span>
              </nuxt-link>
            </li>

            <li class="menu-list nav-item">
              <nuxt-link
                to="/teacher-appointment"
                data-toggle="collapse"
                class="nav-link"
              >
                <div class="font-icon d-inline-block">
                  <i class="fas fa-calendar-check"></i>
                </div>
                <span class="ml-2">Appoinments</span>
              </nuxt-link>
            </li>
            <li class="menu-list nav-item">
              <nuxt-link
                to="/custom-availability"
                data-toggle="collapse"
                class="nav-link"
              >
                <div class="font-icon d-inline-block">
                  <i class="fas fa-user-tag"></i>
                </div>
                <span class="ml-2">Availability</span>
              </nuxt-link>
            </li>
            <li class="menu-list nav-item">
              <nuxt-link
                to="/teacher-syncCalendar"
                data-toggle="collapse"
                class="nav-link"
              >
                <div class="font-icon d-inline-block">
                  <i class="fas fa-sync"></i>
                </div>
                <span class="ml-2">Sync Calendar</span>
              </nuxt-link>
            </li>
            <!-- <li class="menu-list nav-item">
              <nuxt-link to="/clubs" data-toggle="collapse" class="nav-link">
                <div class="font-icon d-inline-block">
                  <img
                    src="~/assets/images/Icon/club-icon.png"
                    class="image-i"
                    alt=""
                  />
                </div>
                <span class="ml-2">Clubs</span>
              </nuxt-link>
            </li> -->

            <li class="menu-list nav-item">
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
            </li>
          </ul>
          <ul class="custom-list">
            <li @click="openLink()" class="active menu-list nav-item">
              <div data-toggle="collapse" class="nav-link">
                <div class="font-icon d-inline-block">
                  <i class="fas fa-comments"></i>
                </div>
                <span class="ml-2">FAQ</span>
              </div>
            </li>

            <li class="menu-list nav-item">
              <nuxt-link
                to="/privacy-policy"
                data-toggle="collapse"
                class="nav-link"
              >
                <div class="font-icon d-inline-block">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <span class="ml-2">Privacy Policy</span>
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
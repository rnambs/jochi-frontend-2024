<template>
  <section id="header" class="">
    <div class="header-section position-fixed top-0 position-relative">
      <!-- <span class="menu-bar-icon" v-on:click="clickableIcon()"
        ><i class="fas fa-bars"></i
      ></span> -->
      <!-- <h5 class="mr-3 mb-0 mt-0 text-light">{{ firstName }}</h5> -->
      <!-- Student Sidebar -->
      <div
        class="sidebar-section col-sm-4 col-md-5 col-lg-6 d-flex justify-content-between bg-white border rounded-10 p-3 p-lg-4 position-fixed flex-column"
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
              class="user-icon d-flex flex-column flex-lg-row notification-icon-section align-items-center justify-content-end position-md-absolute mb-3 mb-lg-0"
            >
              <nuxt-link to="/student-dashboard" class="nav-link btn p-0 mb-3">
                <img
                  src="../../static/image/Jochi Icons/home_hires.png"
                  alt=""
                  class="dark-icon"
              /></nuxt-link>

              <div class="dropdown mb-2 mb-lg-3">
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
                            : 'read d-flex flex-column p-3 card card-void rounded-22 my-3 cursor-pointer'
                        " -->
                      <div
                        class="d-flex flex-column p-3 card card-void rounded-22 my-3 cursor-pointer"
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
            </div>
            <nuxt-link
              to="/user-profile"
              class="pr-0 pr-lg-4 d-flex flex-column align-items-center align-items-lg-start"
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
                class="d-flex flex-column flex-lg-row align-items-center justify-cotent-center"
              >
                <h4
                  class="color-primary-dark mb-0 font-semi-bold text-18 text-center text-lg-left word-break"
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
            class="menu-items position-relative py-4 custom-scroll-for-side-menus d-flex flex-column flex-fill h-40"
          >
            <div class="accordion" id="accordionExample">
              <div class="card bg-transparent shadow-none border-0 mb-2">
                <div
                  class="card-header bg-transparent border-0 p-1"
                  id="headingOne"
                >
                  <div class="mb-0 d-flex">
                    <button
                      class="btn btn-link d-flex align-items-center justify-content-between bg-transparent text-decoration-none text-18 color-secondary btn-block text-left collapsed flex-fill px-0 py-2 py-lg-2"
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
                      class="btn btn-link d-flex align-items-center justify-content-between bg-transparent text-decoration-none text-18 color-secondary btn-block text-left collapsed flex-fill px-0 py-2 py-lg-2"
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
                          to="/custom-availability-student"
                          @click="$event.target.classList.toggle('active')"
                          class="nav-link text-nowrap"
                          >Availability</nuxt-link
                        >
                      </li>
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
                      class="btn btn-link d-flex align-items-center justify-content-between bg-transparent text-decoration-none text-18 color-secondary btn-block text-left collapsed flex-fill px-0 py-2 py-lg-2"
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
                        >Teams & Clubs</span
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
                      class="btn btn-link d-flex align-items-center justify-content-between bg-transparent text-decoration-none text-18 color-secondary btn-block text-left collapsed flex-fill px-0 pt-0 pt-lg-0 pb-2 pb-lg-2"
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
                    class="mb-0 d-flex justify-content-center justify-content-lg-start align-items-center align-items-lg-start flex-column"
                  >
                    <button
                      class="btn btn-link d-flex align-items-center justify-content-between text-decoration-none text-18 btn-block text-left collapsed justify-content-start pl-2 pr-2"
                      @click="
                        $event.target.classList.toggle('active');
                        startGuide();
                      "
                      type="button"
                      data-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      <div class="bottum-btn align-items-center">
                        <!-- <div class="font-icon d-inline-block">
                          <img
                            src="../../static/image/advisor.png"
                            alt=""
                          />
                        </div> -->
                        <!-- <i class="fab fa-jira"></i> -->
                        <svg
                          width="15"
                          height="16"
                          viewBox="0 0 15 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2.06861 0.0332069C1.10417 0.193875 0.310535 0.935562 0.0662749 1.90446C0.00132947 2.16215 0 2.28313 0 8.00647C0 13.7298 0.00132947 13.8508 0.0662749 14.1085C0.290127 14.9964 0.969461 15.6893 1.86128 15.9394C2.06665 15.997 2.37127 16 8.02677 16C13.5034 16 13.9842 15.9956 14.0766 15.9449C14.3329 15.8043 14.4895 15.5451 14.4907 15.2594C14.4919 14.9691 14.3455 14.7211 14.1013 14.5997C13.9809 14.5399 13.7546 14.5369 8.10986 14.5209L2.24351 14.5043L2.07732 14.4221C1.61267 14.1921 1.38562 13.6592 1.54859 13.181C1.61263 12.993 1.8536 12.7164 2.04033 12.6165L2.17703 12.5433L8.04339 12.5267C13.6045 12.511 13.9167 12.507 14.0427 12.4502C14.2183 12.371 14.3528 12.2412 14.4284 12.078C14.4875 11.9503 14.49 11.7227 14.4907 6.25972L14.4914 0.574407L14.4072 0.40543C14.3173 0.224985 14.1484 0.0836941 13.9569 0.0287864C13.8134 -0.0123612 2.31653 -0.00807362 2.06861 0.0332069ZM7.72471 2.30626C8.83221 2.54088 9.62498 3.64642 9.47654 4.74926C9.38009 5.46605 9.01674 6.03946 8.41528 6.42405C8.21001 6.5553 8.15975 6.60635 8.09155 6.75286C8.04239 6.85839 8.01068 6.98742 8.01049 7.08251C8.00962 7.50176 7.85806 7.79036 7.56777 7.9255C7.33767 8.03262 7.14107 8.03063 6.91682 7.91889C6.56979 7.74595 6.45113 7.44612 6.51235 6.89698C6.59884 6.12135 6.94567 5.57736 7.63058 5.14299C8.12445 4.82979 8.0977 4.11436 7.58202 3.84494C7.34415 3.72067 7.14725 3.72067 6.90937 3.84494C6.62353 3.99428 6.55024 4.13318 6.46502 4.68714C6.43654 4.87247 6.27145 5.07399 6.07209 5.16682C5.68073 5.34906 5.27979 5.21468 5.07418 4.83232C5.01698 4.72596 5.00329 4.64616 5.00568 4.43347C5.01519 3.59666 5.51022 2.84494 6.30083 2.4668C6.72324 2.26478 7.24905 2.20549 7.72471 2.30626ZM7.48757 8.80615C7.55663 8.82533 7.66595 8.88738 7.7305 8.94409C8.17694 9.33605 8.01846 10.0563 7.44941 10.2218C6.82505 10.4033 6.28897 9.75258 6.58272 9.16977C6.74515 8.84747 7.10936 8.70112 7.48757 8.80615Z"
                            fill="#B4B4B4"
                          />
                        </svg>

                        <span
                          class="color-secondary text-capitalize font-medium pl-2 ml-2"
                          >Walkthrough</span
                        >
                      </div>
                    </button>

                    <button
                      class="btn btn-link d-flex align-items-center justify-content-between bg-transparent text-decoration-none text-18 color-secondary btn-block px-0 text-left collapsed justify-content-start py-auto py-lg-0"
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
                          class="ml-2 color-secondary text-capitalize font-medium"
                        >
                          Log Out
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

  .dropdown .dropdown-menu.notify {
    top: -40px !important;
  }
}
</style>
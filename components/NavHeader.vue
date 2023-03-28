<template>
  <header id="header" class="header">
    <div class="top-left">
      <div class="navbar-header d-flex align-items-center">
        <a class="navbar-brand" href="/dashboard">
          <img src="~/assets/images/jochi..png" alt="Logo" />
        </a>
        <a class="navbar-brand hidden" href="/dashboard">
          <img src="../assets/images/Icon/logo-icon.png" alt="Logo" />
        </a>
        <a id="menuToggle" class="menutoggle" @click="menuToggle()"
          ><i class="fa fa-bars"></i
        ></a>
      </div>
    </div>
    <div class="top-right">
      <div class="header-menu">
        <div class="user-area dropdown float-end mx-5">
          <a
            href="#"
            class="dropdown-toggle active"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              class="user-avatar rounded-circle"
              src="~/assets/images/admin.jpg"
              alt="User Avatar"
            />
          </a>

          <div class="user-menu dropdown-menu">
            <a class="nav-link" href="/admin-reset-password"
              ><i class="fa fa- user"></i>Reset Password</a
            >

            <a class="nav-link" href="#" @click="GetLogout()"
              ><i class="fa fa-power -off"></i>Log Out</a
            >
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "NavHeader",
  mounted() {
    if (!localStorage.getItem("email")) {
      this.$router.push("/admin-login");
    }

    // commented inspect code

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
    ...mapState({}),
  },

  methods: {
    ...mapActions("login", {
      getLogout: "getLogout",
    }),

    async GetLogout() {
      let confirm = window.confirm("You will be logged out now");
      if (confirm) {
        await this.getLogout({
          auth_token: localStorage.getItem("token").replace("Bearer ", ""),
        });
      } else {
        return;
      }
    },
    async menuToggle() {
      // Menu Trigger
      var windowWidth = $(window).width();
      if (windowWidth < 1010) {
        $("body").removeClass("open");
        if (windowWidth <= 768) {
          $("#left-panel").slideToggle();
        } else {
          $("#left-panel").toggleClass("open-menu");
        }
      } else {
        $("body").toggleClass("open");
        // $('#left-panel').removeClass('open-menu');
      }
    },
  },
  // middleware: "authenticated",
};
</script>
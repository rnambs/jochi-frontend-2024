<template>
  <div class="inner-section">
    <!-- header -->

    <section id="header" class="">
      <div class="header-section fixed-top">
        <div class="user-icon mr-5">
          <!-- <a href="#"><i class="fa fa-cog" aria-hidden="true"></i></a> -->
          <img src="~/assets/images/admin.jpg" class="rounded-circle" alt="" />
        </div>
      </div>
    </section>

    <!-- end section -->

    <!-- sidebar -->

    <section id="" class="">
      <div class="sidebar-section col-sm-4 col-md-5 col-lg-6">
        <div class="logo-section mt-3 p-2">
          <img src="~/assets/images/undraw/jochi-icon.png" alt="logo" />
        </div>
        <div class="menu-items mt-5">
          <ul class="custom-list">
            <li class="active menu-list">
              <a
                href="#Planner-subMenu"
                data-toggle="collapse"
                aria-expanded="false"
                class="dropdown-toggle"
              >
                <i class="fa fa-calendar-minus-o" aria-hidden="true"></i>
                <span class="ml-2">Planner</span>
              </a>
              <ul
                class="collapse inner-custom-list ml-4 p-2"
                id="Planner-subMenu"
              >
                <li>
                  <a href="">Daily</a>
                </li>
                <li>
                  <a href="">Monthly</a>
                </li>
                <li>
                  <a href="">Weekly</a>
                </li>
              </ul>
            </li>

            <li class="menu-list">
              <a
                href="#Meeting-subMenu"
                data-toggle="collapse"
                aria-expanded="false"
                class="dropdown-toggle"
              >
                <i class="fa fa-users" aria-hidden="true"></i>
                <span class="mr-2">Meeting</span>
              </a>
              <ul
                class="collapse inner-custom-list ml-4 p-2"
                id="Meeting-subMenu"
              >
                <li>
                  <a href="">Teacher</a>
                </li>
                <li>
                  <a href="">Peer</a>
                </li>
                <li>
                  <a href="">View All</a>
                </li>
              </ul>
            </li>

            <li class="menu-list">
              <a
                href="#Club-subMenu"
                data-toggle="collapse"
                aria-expanded="false"
                class="dropdown-toggle"
              >
                <i class="fa fa-futbol-o" aria-hidden="true"></i>
                <span class="mr-2">Clubs</span>
              </a>
              <ul class="collapse inner-custom-list ml-4 p-2" id="Club-subMenu">
                <li>
                  <a href="">Existing</a>
                </li>
                <li>
                  <a href="">Catalog</a>
                </li>
              </ul>
            </li>
            <li class="menu-list">
              <a
                href="#Study-subMenu"
                data-toggle="collapse"
                aria-expanded="false"
                class="dropdown-toggle"
              >
                <i class="fa fa-book" aria-hidden="true"></i>
                <span class="mr-2">Study</span>
              </a>
              <ul
                class="collapse inner-custom-list ml-4 p-2"
                id="Study-subMenu"
              >
                <li>
                  <a href="">Study Room</a>
                </li>
                <li>
                  <a href="">My Sessions</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- sidebar -->

    <div class="main-section">
      <!-- Study Page -->

      <section id="study-detail" class="">
        <div class="study-section container">
          <div class="inner-study container p-3 mt-5">
            <div class="row study-row">
              <div class="row header-row container">
                <div class="col-md-12">
                  <h4>Rate your session</h4>
                </div>
              </div>
              <div class="row inner-row mt-0 container">
                <div class="col-md-4">
                  <div class="inner-col p-2">
                    <h6 class="py-2 color-dark font-semi-bold">Focus</h6>
                    <i class="fa fa-star star-icon" aria-hidden="true"></i>
                    <i class="fa fa-star star-icon" aria-hidden="true"></i>
                    <i class="fa fa-star star-icon" aria-hidden="true"></i>
                    <i class="fa fa-star-o star-icon" aria-hidden="true"></i>
                    <p class="total-value py-2">3.0<sub>/4</sub></p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="inner-col p-2">
                    <h6 class="py-2 color-dark font-semi-bold">Efficiency</h6>
                    <i class="fa fa-star star-icon" aria-hidden="true"></i>
                    <i class="fa fa-star star-icon" aria-hidden="true"></i>
                    <i class="fa fa-star star-icon" aria-hidden="true"></i>
                    <i class="fa fa-star-o star-icon" aria-hidden="true"></i>
                    <p class="total-value py-2">3.0<sub>/4</sub></p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="inner-col p-2">
                    <h6 class="py-2 color-dark font-semi-bold">Work Complete</h6>
                    <i class="fa fa-star star-icon" aria-hidden="true"></i>
                    <i class="fa fa-star star-icon" aria-hidden="true"></i>
                    <i class="fa fa-star star-icon" aria-hidden="true"></i>
                    <i class="fa fa-star-o star-icon" aria-hidden="true"></i>
                    <p class="total-value py-2 ">3.0<sub>/4</sub></p>
                  </div>
                </div>
              </div>
              <div class="row button-row container">
                <div class="col-md-12">
                  <button
                    type="submit"
                    class="btn btn-color mb-3 mt-2 pl-3 pr-3"
                  >
                    Log Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- End Study Page -->
    </div>
  </div>
</template>
<script>
export default {
  // middleware: "authenticated",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
};
</script>
<template>
  <div class="container-fluid main-container student-dashboard-main">
    <div class="col-12">
      <div class="row">
        <div class="col-2">
          <div class="sd-sidebar jochi-components-light-bg p-4">
            <div class="sb-head-section">
              <div class="display-picture-holder mb-3">
                <img src="" alt="">
              </div>
              <p class="sb-user-name mb-1">Hannah Scott</p>
              <a href="#" class="sb-settings-btn">Settings</a>
            </div>
            <div class="sb-buttons-section">
              <div class="sb-expand-btn my-3">
                <div class="sb-btn-head d-flex align-items-center">
                  <div class="sb-btn-icon mr-3">
                    <img src="../static/image/Calendar.png" alt="" class="planner">
                  </div>
                  Planner
                </div>
                <div class="sb-btn-content">
                  <div class="sb-btn">Daily</div>
                  <div class="sb-btn">Weekly</div>
                  <div class="sb-btn">Monthly</div>
                </div>
              </div>
              <div class="sb-expand-btn my-3">
                <div class="sb-btn-head d-flex align-items-center">
                  <div class="sb-btn-icon mr-3">
                    <img src="../static/image/Call.png" alt="" class="meetings">
                  </div>
                  Meetings
                </div>
              </div>
              <div class="sb-expand-btn my-3">
                <div class="sb-btn-head d-flex align-items-center">
                  <div class="sb-btn-icon mr-3">
                    <img src="../static/image/Football.png" alt="" class="teams-clubs">
                  </div>
                  Teams & Clubs
                </div>
              </div>
              <div class="sb-expand-btn my-3">
                <div class="sb-btn-head d-flex align-items-center">
                  <div class="sb-btn-icon mr-3">
                    <img src="../static/image/Lot_of_book.png" alt="" class="study-room">
                  </div>
                  Study Room
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-10">
            <div class="dashboard-main-content jochi-components-light-bg p-4 pl-5">
              <div class="dmc-head d-flex justify-content-between align-items-start">
                <div class="greet-with-name-sec">
                  <p class="hello">Hello,</p>
                  <p class="name-section">Hannah</p>
                </div>
                <div class="faq-section d-flex align-items-center">
                  <div class="faq-btn mr-4">FAQs</div>
                  <div class="privacy-btn mr-4">Privacy Policy</div>
                </div>
              </div>
              <div class="col-12 p-0">
                <div class="row">
                  <div class="col-8">
                    <div class="jochi-sub-components-light-bg p-4 pr-1 pb-1">
                      <div class="row">
                        <div class="col-7"></div>
                        <div class="col-5 p-0">
                          <img src="../static/image/dashboard_img.png" alt="" class="img-fluid">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StudentDashboard from "~/components/StudentDashboard.vue";

export default {
  name: "student-signup",
  head() {
    return {
      link: [{ rel: "stylesheet", href: "/css/style01.css" }],
    };
  },
}
</script>

<style>
  body {
    background-color: #ffffff !important;
  }

  .student-dashboard-main {
    min-height: 100vh;
    margin: 0;
  }

  .sd-sidebar,
  .dashboard-main-content{
    height: calc(100vh - 1.8rem);
  }

  .sb-btn-icon {
    width: 30px;
  }

  .sb-btn-icon img{
    width: 100%;
  }

  .sb-btn-head {
    font-size: 17px;
    font-weight: 500;
  }

  .sb-expand-btn {
    cursor: pointer;
  }

 .sb-btn-content {
   padding-left: 4rem;
   font-size: 14px;
 }

 .display-picture-holder {
    width: 80px;
    height: 80px;
    background-color: #ffffff;
    border-radius: 50%;
    overflow: hidden;
 }

 .sb-user-name {
   font-size: 26px;
    color: #ff6d6d;
    font-weight: 700;
 }

 .sb-settings-btn {
   color: #B4B4B4;
   font-size: 13px;
   font-weight: 500;
 }

 .greet-with-name-sec .hello {
    font-size: 24px;
    font-weight: 500;
    color: #000000;
    margin-bottom: 0.4rem;
    margin-left: 2px;
  }

  .greet-with-name-sec .name-section {
    font-size: 38px;
    font-weight: 700;
    color: #ff6d6d;
  }

  .faq-section {
    font-weight: 700;
    color: #000000;
  }

</style>
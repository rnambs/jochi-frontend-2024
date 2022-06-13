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
                <div class="row mt-5">
                    <div class="col-2">
                        <div class="profile-pic-section d-flex justify-content-center">
                            <div class="position-relative">
                                <div class="profile-pic-holder"></div>
                                <div class="profile-pic-edit-btn position-absolute">
                                    <label for="profilePicEdit">
                                        <div class="dp-edit-btn">
                                            <img src="../static/image/dp-edit-btn.png" alt="">
                                        </div>
                                    </label>
                                    <input type="file" hidden id="profilePicEdit">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 profile-page-form-section">
                        <div class="row">
                            <div class="col-6">
                                <label for="">Name</label>
                                <input type="text" class="form-control mb-3">
                                <label for="">Email</label>
                                <input type="text" class="form-control mb-3">
                            </div>
                            <div class="col-6">
                                <label for="">School</label>
                                <input type="text" class="form-control mb-3">
                                <label for="">Phone Number</label>
                                <input type="text" class="form-control mb-3">
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
  name: "student-profile",
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

  .sd-sidebar {
    height: 100%;
  }
  .sd-sidebar,
  .dashboard-main-content{
    min-height: calc(100vh - 1.8rem);
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

 .profile-pic-holder {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #ea2626;
    overflow: hidden;
 }

 .profile-pic-edit-btn {
    bottom: 0;
    left: 90px;
 }

 .dp-edit-btn {
    width: 40px;
 }

 .profile-page-form-section .form-control {
    background-color: #b4b4b4;
    border-block-color: #b4b4b4;
    color: #ffffff;
 }

 .profile-page-form-section label {
    color: #ff6d6d;
    font-weight: 400;
 }

</style>
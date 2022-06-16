<template>
  <div class="container-fluid main-container student-dashboard-main">
    <div class="col-12">
      <div class="row">
        <div class="col-2">
          <div class="sd-sidebar jochi-components-light-bg p-4">
            <div class="sb-head-section">
              <div class="d-flex align-items-start justify-content-between mb-3">
                <div class="display-picture-holder">
                  <img src="" alt="">
                </div>
                <div class="notification-section position-relative">
                    <svg width="426" height="493" viewBox="0 0 426 493" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 442.398H145.6C154.561 471.519 181.44 492.796 212.799 492.796C244.158 492.796 271.037 471.515 279.998 442.398H425.598L425.039 361.757L412.156 358.397C371.836 348.319 368.476 246.957 368.476 216.157C368.476 119.837 310.796 79.5174 267.116 63.2774C267.675 60.4766 267.675 57.6758 267.675 54.879C267.675 24.641 243.034 0 212.796 0C182.558 0 157.917 24.641 157.917 54.879C157.917 57.6798 157.917 60.4806 158.476 63.2774C114.796 80.0784 57.1156 119.836 57.1156 216.157C57.1156 246.958 53.7562 348.317 13.4356 358.397L0.556595 361.757L0 442.398ZM212.8 459.199C202.159 459.199 192.081 454.718 185.359 446.879H240.238C233.519 454.719 223.441 459.199 212.8 459.199V459.199ZM34.16 386.398C71.68 367.918 90.16 310.796 90.16 216.718C90.16 133.839 141.121 102.478 183.68 90.7178L204.399 85.1162L193.758 66.6362C192.078 63.2768 190.957 59.9174 190.957 55.9952C190.957 44.2332 200.477 34.7142 212.238 34.7142C224 34.7142 233.519 44.2337 233.519 55.9952C233.519 59.9171 232.398 63.2764 230.718 66.6362L220.077 85.1162L240.796 90.7178C283.355 102.48 334.316 134.398 334.316 216.718C334.316 310.796 353.355 367.918 390.316 386.398V408.796H34.1564L34.16 386.398Z"/>
                    </svg>
                    <div class="position-absolute notification-count-section"></div>
                </div>
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
                  <h4 class="jochi-headings">Profile</h4>
                  <div class="faq-section d-flex align-items-center">
                    <div class="faq-btn mr-4">FAQs</div>
                    <div class="privacy-btn mr-4">Privacy Policy</div>
                  </div>
                </div>
                <div class="row mt-2 mb-4">
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
                <h4 class="jochi-headings">Preferences</h4>
                <div class="row">
                  <div class="col-5">
                    <h6 class="jochi-headings">Sync your School Learning Management System</h6>
                    <input type="text" class="form-control mb-2"/>
                    <p>Need help connecting, follow our guide for help!</p>
                    <div class="leaders-details-section">
                      <h6 class="jochi-headings">Leaders Details</h6>
                      <div class="d-flex align-items-center mt-4">
                        <div class="ld-img-section mr-3">
                          <div class="ld-img-holder"></div>
                        </div>
                        <div class="ld-details-section">
                          <p class="ld-heading mb-1">
                            Mark Jones, President
                          </p>
                          <p class="ld-details mb-0">
                            markjones@school.edu
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-5 pl-4">
                    <h6 class="jochi-headings">Notifications Settings</h6>
                    <div class="d-flex align-items-center pl-3">
                      <input type="checkbox" class="form-checkbox">
                      <label for="" class="mb-0 ml-3 checkbox-label">Text Messages</label>
                    </div>
                    <div class="d-flex align-items-center pl-3">
                      <input type="checkbox" class="form-checkbox">
                      <label for="" class="mb-0 ml-3 checkbox-label">Emails</label>
                    </div>
                    <div class="d-flex align-items-center pl-3">
                      <input type="checkbox" class="form-checkbox">
                      <label for="" class="mb-0 ml-3 checkbox-label">Web App Notifications</label>
                    </div>
                    <h6 class="jochi-headings mt-3">Submit Feedback!</h6>
                      <textarea type="text" class="form-control mb-3"></textarea>
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
  
  .jochi-headings {
    color: #ff6d6d;
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

 .form-control {
    background-color: #b4b4b4;
    border-block-color: #b4b4b4;
    color: #ffffff;
 }

 label {
    color: #ff6d6d;
    font-weight: 400;
 }

 .faq-section {
    font-weight: 700;
    color: #000000;
  }

  .checkbox-label {
    color: #000000;
    font-weight: 600;
  }

  textarea.form-control {
    height: 150px;
  }

  .ld-img-holder {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #ffffff;
    overflow: hidden;
  }

  .ld-heading {
    font-size: 22px;
    color: #000000;
    font-weight: 600;
  }

  .notification-section {
    cursor: pointer;
  }

  .notification-section svg {
    fill: #b4b4b4;
    width: 25px;
    height: 25px;
  }

  .notification-count-section {
    background-color: #ea2626;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    top: 3px;
    right: 0;
  }

</style>
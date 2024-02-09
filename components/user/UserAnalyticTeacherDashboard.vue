<template>
  <div class="main-section">
    <section class="py-4 analytic-dashboard">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 class="text-20 font-poppins font-semi-bold mb-0 flex-grow-1">
            Welcome Back {{ firstName + ' ' + lastName }}!</h2>
          <div class="form-group flex-grow-1 mb-0">
            <!-- <input type="text" class="form-control" id="search" placeholder="Search Student"> -->
            <multiselect
                  v-model="selectedStudent"
                  :options="studentDetails"
                  track-by="first_name"
                  label="first_name"
                  placeholder="
                  Select students"
                  @input="selectedStudentId"
                >
                  <span slot="noResult">No data found</span>
                </multiselect>
          </div>
        </div>
        <div class="row d-flex">
          <div class="col-12 col-sm-3 h-auto d-flex">
            <div class="border p-3 rounded-20 w-100 box-card">
              <div class="w-fit-content mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <rect width="44" height="44" rx="10" fill="#E2E2E2" />
                  <path
                    d="M26.19 12H17.81C14.17 12 12 14.17 12 17.81V26.18C12 29.83 14.17 32 17.81 32H26.18C29.82 32 31.99 29.83 31.99 26.19V17.81C32 14.17 29.83 12 26.19 12ZM19.11 26.9C19.11 27.18 18.89 27.4 18.61 27.4H15.82C15.54 27.4 15.32 27.18 15.32 26.9V22.28C15.32 21.65 15.83 21.14 16.46 21.14H18.61C18.89 21.14 19.11 21.36 19.11 21.64V26.9ZM23.89 26.9C23.89 27.18 23.67 27.4 23.39 27.4H20.6C20.32 27.4 20.1 27.18 20.1 26.9V17.74C20.1 17.11 20.61 16.6 21.24 16.6H22.76C23.39 16.6 23.9 17.11 23.9 17.74V26.9H23.89ZM28.68 26.9C28.68 27.18 28.46 27.4 28.18 27.4H25.39C25.11 27.4 24.89 27.18 24.89 26.9V23.35C24.89 23.07 25.11 22.85 25.39 22.85H27.54C28.17 22.85 28.68 23.36 28.68 23.99V26.9Z"
                    fill="#825DEC" />
                </svg>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <p class="mb-0 text-14 color-text-50">Total Number of Students</p>
                <h2 class="mb-0 text-46 color-text-100">{{this.studentCount}}</h2>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-3 h-auto d-flex clickable" @click="openModal('consistentlyBehindlist')">
            <div class="border p-3 rounded-20 w-100 box-card">
              <div class="w-fit-content mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <rect width="44" height="44" rx="10" fill="#E2E2E2" />
                  <path
                    d="M26.19 12H17.81C14.17 12 12 14.17 12 17.81V26.18C12 29.83 14.17 32 17.81 32H26.18C29.82 32 31.99 29.83 31.99 26.19V17.81C32 14.17 29.83 12 26.19 12ZM19.11 26.9C19.11 27.18 18.89 27.4 18.61 27.4H15.82C15.54 27.4 15.32 27.18 15.32 26.9V22.28C15.32 21.65 15.83 21.14 16.46 21.14H18.61C18.89 21.14 19.11 21.36 19.11 21.64V26.9ZM23.89 26.9C23.89 27.18 23.67 27.4 23.39 27.4H20.6C20.32 27.4 20.1 27.18 20.1 26.9V17.74C20.1 17.11 20.61 16.6 21.24 16.6H22.76C23.39 16.6 23.9 17.11 23.9 17.74V26.9H23.89ZM28.68 26.9C28.68 27.18 28.46 27.4 28.18 27.4H25.39C25.11 27.4 24.89 27.18 24.89 26.9V23.35C24.89 23.07 25.11 22.85 25.39 22.85H27.54C28.17 22.85 28.68 23.36 28.68 23.99V26.9Z"
                    fill="#825DEC" />
                </svg>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <p class="mb-0 text-14 color-text-50">Students Consistently Behind</p>
                <h2 class="mb-0 text-46 color-text-100">{{ this.consistentlyBehindCount !== null ? consistentlyBehindCount : '0' }}</h2>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-3 h-auto d-flex clickable" @click="openModal('fallingBehindlist')">
            <div class="border p-3 rounded-20 w-100 box-card">
              <div class="w-fit-content mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <rect width="44" height="44" rx="10" fill="#E2E2E2" />
                  <path
                    d="M26.19 12H17.81C14.17 12 12 14.17 12 17.81V26.18C12 29.83 14.17 32 17.81 32H26.18C29.82 32 31.99 29.83 31.99 26.19V17.81C32 14.17 29.83 12 26.19 12ZM19.11 26.9C19.11 27.18 18.89 27.4 18.61 27.4H15.82C15.54 27.4 15.32 27.18 15.32 26.9V22.28C15.32 21.65 15.83 21.14 16.46 21.14H18.61C18.89 21.14 19.11 21.36 19.11 21.64V26.9ZM23.89 26.9C23.89 27.18 23.67 27.4 23.39 27.4H20.6C20.32 27.4 20.1 27.18 20.1 26.9V17.74C20.1 17.11 20.61 16.6 21.24 16.6H22.76C23.39 16.6 23.9 17.11 23.9 17.74V26.9H23.89ZM28.68 26.9C28.68 27.18 28.46 27.4 28.18 27.4H25.39C25.11 27.4 24.89 27.18 24.89 26.9V23.35C24.89 23.07 25.11 22.85 25.39 22.85H27.54C28.17 22.85 28.68 23.36 28.68 23.99V26.9Z"
                    fill="#825DEC" />
                </svg>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <p class="mb-0 text-14 color-text-50">Students Falling Behind</p>
                <h2 class="mb-0 text-46 color-text-100">{{ this.fallingBehindCount !== null ? fallingBehindCount : '0' }}</h2>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-3 h-auto d-flex clickable"  @click="openModal('aheadlist')">
            <div class="border p-3 rounded-20 w-100 box-card">
              <div class="w-fit-content mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <rect width="44" height="44" rx="10" fill="#E2E2E2" />
                  <path
                    d="M26.19 12H17.81C14.17 12 12 14.17 12 17.81V26.18C12 29.83 14.17 32 17.81 32H26.18C29.82 32 31.99 29.83 31.99 26.19V17.81C32 14.17 29.83 12 26.19 12ZM19.11 26.9C19.11 27.18 18.89 27.4 18.61 27.4H15.82C15.54 27.4 15.32 27.18 15.32 26.9V22.28C15.32 21.65 15.83 21.14 16.46 21.14H18.61C18.89 21.14 19.11 21.36 19.11 21.64V26.9ZM23.89 26.9C23.89 27.18 23.67 27.4 23.39 27.4H20.6C20.32 27.4 20.1 27.18 20.1 26.9V17.74C20.1 17.11 20.61 16.6 21.24 16.6H22.76C23.39 16.6 23.9 17.11 23.9 17.74V26.9H23.89ZM28.68 26.9C28.68 27.18 28.46 27.4 28.18 27.4H25.39C25.11 27.4 24.89 27.18 24.89 26.9V23.35C24.89 23.07 25.11 22.85 25.39 22.85H27.54C28.17 22.85 28.68 23.36 28.68 23.99V26.9Z"
                    fill="#825DEC" />
                </svg>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <p class="mb-0 text-14 color-text-50">Students Ahead of Their Work</p>
                <h2 class="mb-0 text-46 color-text-100">{{ this.aheadCount }}</h2>
              </div>
            </div>
          </div>
          <!-- <div class="col-12 col-sm-12 col-lg-6 h-auto d-flex">
            <div class="border p-3 rounded-20 w-100 box-card">
              <div class="d-flex h-100">
                <div class="d-flex flex-column  justify-content-between align-items-start ">
                  <p class="mb-0 text-14 color-text-50">Students Ahead of Their Work</p>
                  <h2 class="mb-0 text-46 color-text-100">4</h2>
                </div>
                <div class="d-flex flex-wrap h-100 overflow-y-auto overflow-x-hidden ml-5">
                  <p class="mb-0 mx-2 text-12 color-text-100">Kristin Watson</p>
                  <p class="mb-0 mx-2 text-12 color-text-100">Hanna Kong</p>
                  <p class="mb-0 mx-2 text-12 color-text-100">Jerome Bell</p>
                  <p class="mb-0 mx-2 text-12 color-text-100">Ty Ramos</p>
                  <p class="mb-0 mx-2 text-12 color-text-100">John Claude</p>
                  <p class="mb-0 mx-2 text-12 color-text-100">Sofi Bloomfield</p>
                  <p class="mb-0 mx-2 text-12 color-text-100">Robert James</p>
                  <p class="mb-0 mx-2 text-12 color-text-100">Ryan Sock</p>
                  <p class="mb-0 mx-2 text-12 color-text-100">Christian Haidas</p>
                  <p class="mb-0 mx-2 text-12 color-text-100">Joe Woods</p>
                  <p class="mb-0 mx-2 text-12 color-text-100">Arya Mann</p>
                  <p class="mb-0 mx-2 text-12 color-text-100">Timothy Robers</p>

                </div>
              </div>

            </div>
          </div> -->
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 h-auto d-flex">
            <div class="border p-3 rounded-20 w-100 box-card">
              <div class="d-flex  justify-content-between pb-3 align-items-center border-bottom">
                <div>
                  <h2 class="text-16 mb-0 font-semi-bold color-text-100">All Your Students</h2>
                  <p class="text-14 color-text-60 mb-0">Broken down by grade level</p>
                </div>
                <img src="../../assets/images/Icon/info.svg" class="cursor-pointer" alt="info" width="24" height="24" />
              </div>
              <!-- <img src="../../assets/images/graph.png" class="" alt="graph" width="100%" height="auto"/> -->
              <div>
                <div id="weeklyContainer" class="chart p-2 color-secondary my-auto">
                  <canvas ref="myChart"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 h-auto d-flex">
            <div class="border p-3 rounded-20 w-100 box-card">
              <h2 class="text-16 mb-0 font-semi-bold color-text-100 border-bottom pb-3">Welcome to Jochi!</h2>
              <!-- code commented for alternate usage -->
              <!-- <carousel :per-page="1"  :adjustableHeight="true"  :mouse-drag="false">
                <slide>
                  <h4>Welcome to Jochi!</h4>
                  <p>How Jochi works for
                    specialists.
                  </p>
                      <div>
                        <a href="https://www.loom.com/share/1bdf0f8ba91f4b5d886861ef9835ff95" target="_blank">
                          <p>Jochi - Watch Video</p>
                        </a>
                        <a href="https://www.loom.com/share/1bdf0f8ba91f4b5d886861ef9835ff95" target="_blank">
                          <img src="https://cdn.loom.com/sessions/thumbnails/1bdf0f8ba91f4b5d886861ef9835ff95-with-play.gif">
                        </a>
                      </div>
                </slide>
                <slide>
                  <h4>Jochi for Students</h4>
                  <p>What Jochi looks like for
                    your students.
                  </p>
                  <div>
                        <a href="https://www.loom.com/share/1bdf0f8ba91f4b5d886861ef9835ff95" target="_blank">
                          <p>Jochi - Watch Video</p>
                        </a>
                        <a href="https://www.loom.com/share/1bdf0f8ba91f4b5d886861ef9835ff95" target="_blank">
                          <img src="https://cdn.loom.com/sessions/thumbnails/1bdf0f8ba91f4b5d886861ef9835ff95-with-play.gif">
                        </a>
                      </div>
                </slide>
              </carousel> -->
              <v-carousel :show-arrows="false"  delimiter-icon="mdi-circle"   height="auto"  hide-delimiter-background class="pb-5">
                <v-carousel-item
                >
                <div class="position-relative">
                  <div class="position-absolute w-100 p-2 bg-dark-backdrop">
                    <p class="mb-1 color-white">How Jochi works for
                      specialists
                    </p>
                    <a href="https://www.loom.com/share/1bdf0f8ba91f4b5d886861ef9835ff95" target="_blank" class="btn btn-secondary py-1">
                      <span class="mr-1"><i class="fa-solid fa-circle-play"></i></span>
                      <span>Jochi - Watch Video</span>
                    </a>
                  </div>
                        <a href="https://www.loom.com/share/1bdf0f8ba91f4b5d886861ef9835ff95" target="_blank">
                          <img src="https://cdn.loom.com/sessions/thumbnails/1bdf0f8ba91f4b5d886861ef9835ff95-with-play.gif">
                        </a>
                      </div>
                </v-carousel-item>
                <v-carousel-item
                >
                <div class="position-relative">
                  <div class="position-absolute w-100 p-2 bg-dark-backdrop">
                    <p class="mb-1 color-white">What Jochi looks like for
                    your students
                    </p>
                    <a href="https://www.loom.com/share/1bdf0f8ba91f4b5d886861ef9835ff95" target="_blank" class="btn btn-secondary py-1">
                      <span class="mr-1"><i class="fa-solid fa-circle-play"></i></span>
                      <span>Jochi - Watch Video</span>
                    </a>
                  </div>
                        <a href="https://www.loom.com/share/1bdf0f8ba91f4b5d886861ef9835ff95" target="_blank">
                          <img src="https://cdn.loom.com/sessions/thumbnails/1bdf0f8ba91f4b5d886861ef9835ff95-with-play.gif">
                        </a>
                      </div>
              </v-carousel-item>
              </v-carousel>
            </div>
          </div>
        </div>
        <!-- TABLE -->
        <div class="row">
          <div class="col-12">
            <div class="border p-3 rounded-20 w-100 box-card">
              <h2 class="text-16 mb-0 font-semi-bold color-text-100 pb-3 text-center">Meeting Requests</h2>
              <div class="position-relative overflow-x-auto table-responsive  ">
                <table class="table">
                  <thead>
                    <tr>
                      <td scope="col"></td>
                      <td scope="col" class="font-semi-bold text-14">
                        Name
                      </td>
                      <td scope="col" class="font-semi-bold text-14">
                        Date
                      </td>
                      <td scope="col" class="font-semi-bold text-14">
                        Time
                      </td>
                      <td scope="col" class="font-semi-bold text-14">
                        Duration
                      </td>
                      <td scope="col" class="font-semi-bold text-14">
                        Accept
                      </td>
                      <td scope="col" class="font-semi-bold text-14">
                        Reject
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="teacher in teachersList" :key="teacher.id">
                      <td scope="row"></td>
                      <td class="text-14">{{ teacher["title"] }}</td>
                      <td class="text-14">{{ teacher["date"] }}</td>
                      <td class="text-14">{{ teacher["time"] }}</td>
                      <td class="text-14">30 Min</td>
                      <td>
                        <button class="d-flex btn border border-success text-success px-3 py-1" @click="
                          TeacherMeetingConfirm(
                                      teacher.studentId,
                                      teacher.reqId,
                                      1,
                                      teacher.selectableDate
                          )
                        ">
                          <i class="fa fa-check text-12 px-1" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button class="d-flex btn border border-danger text-danger px-3 py-1" @click="
                                    TeacherMeetingConfirm(
                                      teacher.studentId,
                                      teacher.reqId,
                                      2
                                    )
                        ">
                          <i class="fa fa-times text-12 px-1" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button @click="setMeeting(teacher)"
                          class="d-flex btn border border-primary text-primary px-3 py-1">
                          <i class="fas fa-eye text-12"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                          v-if="teachersList.length == 0"
                          class="empty-shedule"
                        >
                          <p class="color-gray text-center  text-16">No New Meeting Request's Found</p>
                        </div>
              </div>
            </div>
          </div>
        </div>
        <!-- TABLE END -->
      </div>
      <div
        class="modal fade"
        id="mediumModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mediumModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-md"
          role="document"
        >
          <div class="modal-content h-auto">
            <div class="modal-header text-dark pb-1">
              <h3 class="modal-title heading3" id="mediumModalLabel">Meeting Request</h3>
              <!-- <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button> -->
            </div>
            <div class="modal-body pb-3">
              <p
                v-if="meetingDetail && meetingDetail.date"
                class="font-bold text-24 color-dark mb-1"
              >
                {{ meetingDetail.date }}
              </p>
              <p
                v-if="
                  meetingDetail &&
                  meetingDetail.default_slots &&
                  meetingDetail.default_slots.start_time &&
                  meetingDetail.default_slots.end_time
                "
                class="mb-1 font-semi-bold text-18 color-primary-dark"
              >
                {{ meetingDetail.default_slots.start_time }} -
                {{ meetingDetail.default_slots.end_time }}
              </p>
              <div class="row py-0">
                <div class="col-3">
                  <p class="mb-0 font-semi-bold color-dark text-16">Name</p>
                </div>
                <div class="col">
                  <p class="mb-0 color-dark font-regular text-16 d-flex">
                    <span class="px-2"> : </span>
                    <span v-if="meetingDetail && meetingDetail.meeting_name">{{
                      meetingDetail.meeting_name
                    }}</span>
                  </p>
                </div>
              </div>
              <div class="row py-0 mt-0">
                <div class="col-3">
                  <p class="mb-0 font-semi-bold color-dark text-16">With</p>
                </div>
                <div class="col">
                  <p class="mb-0 color-dark font-regular text-16 d-flex">
                    <span class="px-2"> : </span>
                    <span v-if="meetingDetail && meetingDetail.title">{{
                      meetingDetail.title
                    }}</span>
                  </p>
                </div>
              </div>
              <div class="row py-0 mt-0">
                <div class="col-3">
                  <p class="mb-0 font-semi-bold color-dark text-16">
                    Description
                  </p>
                </div>
                <div class="col">
                  <p class="mb-0 color-dark font-regular text-16 d-flex">
                    <span class="px-2"> : </span>
                    <span
                      v-if="meetingDetail && meetingDetail.meeting_description"
                      >{{ meetingDetail.meeting_description }}</span
                    >
                  </p>
                </div>
              </div>
              <div class="row py-0 mt-0">
                <div class="col-3">
                  <p class="mb-0 font-semi-bold color-dark text-16">Type</p>
                </div>
                <div class="col">
                  <p class="mb-0 color-dark font-regular text-16 d-flex">
                    <span class="px-2"> : </span>
                    <span
                      v-if="meetingDetail && meetingDetail.conversation_type"
                      >{{ meetingDetail.conversation_type }}</span
                    >
                  </p>
                </div>
              </div>
              <div
                v-if="meetingDetail && meetingDetail.meeting_link"
                class="row py-0"
              >
                <div class="col-3">
                  <p class="mb-0 font-semi-bold color-dark text-16">Link</p>
                </div>
                <div class="col">
                  <p class="mb-0 color-dark font-regular text-16 d-flex">
                    <span class="px-2"> : </span>
                    <span>{{ meetingDetail.meeting_link }}</span>
                  </p>
                </div>
              </div>
              <div
                v-if="meetingDetail && meetingDetail.meeting_location"
                class="row py-0 mt-0"
              >
                <div class="col-3">
                  <p class="mb-0 font-semi-bold color-dark text-16">Location</p>
                </div>
                <div class="col">
                  <p class="mb-0 color-dark font-regular text-16 d-flex">
                    <span class="px-2"> : </span>
                    <span>{{ meetingDetail.meeting_location }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-end border-top-0 text-dark">
              <button
                v-if="
                  meetingDetail &&
                  meetingDetail.studentId &&
                  meetingDetail.reqId
                "
                class="d-flex btn btn-secondary rounded-8 px-4 py-1 mx-2 font-semi-bold"
                @click="
                  TeacherMeetingConfirm(
                    meetingDetail.studentId,
                    meetingDetail.reqId,
                    2
                  )
                "
              >
                <span class="text-16">Reject</span>
              </button>
              <button
                v-if="
                  meetingDetail &&
                  meetingDetail.studentId &&
                  meetingDetail.reqId &&
                  meetingDetail.selectableDate
                "
                class="d-flex btn btn-primary rounded-8 px-4 py-1 font-semi-bold"
                @click="
                  TeacherMeetingConfirm(
                    meetingDetail.studentId,
                    meetingDetail.reqId,
                    1,
                    meetingDetail.selectableDate
                  )
                "
              >
                <span class="text-16">Accept</span>
              </button>
              <button
                v-else
                data-dismiss="modal"
                class="d-flex btn btn-secondary rounded-8 px-4 py-1 mx-2 font-semi-bold"
              >
                <span class="text-16">Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div
        class="modal fade"
        id="studentList"
        tabindex="-1"
        role="dialog"
        aria-labelledby="inviteStudentModalCenterTitle"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered add-assmt"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="inviteStudentModalLongTitle">
                List of Student's who are {{ modalListType === 'consistentlyBehindlist' ? 'Consistently Behind' : (modalListType === 'fallingBehindlist' ? 'Falling Behind' : 'Ahead') }}
              </h3>
            </div>
            <h4 class="modal-body"></h4>
                    <div
                      @click="onStudentClick(student)"
                      v-for="student in studentsList"
                      :key="student.id"
                      :class="{ 'bg-card-secondary': student.id }"
                      class="d-flex align-items-center flex-row p-3 student-list border-bottom cursor-pointer"
                    >
                      <div class="ld-img-section mr-3">
                        <div class="ld-img-holder">
                          <img
                            v-if="student.profile_pic"
                            :src="student.profile_pic"
                            alt=""
                          />
                          <img v-else src="~/static/image/avatar.png" alt="" />
                        </div>
                      </div>
                      <div class="ld-details-section">
                        <p class="ld-heading mb-1">
                          {{ student.first_name + " " + student.last_name }}
                        </p>
                      </div>
                    </div>
                    <div v-if="this.studentsList == 0">
                    <p class="color-gray text-center text-16">No Student's Found</p>
                    </div>
                  <div class="modal-body no-overflow px-4">
                <div class="form-row">
              </div>
            </div>
            <div class="modal-footer justify-content-end border-top-0">
              <button
                type="button"
                class="btn btn-void font-semi-bold rounded-8 py-1 px-4"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Chart from 'chart.js/auto';
var isAccepted = false;
var selectDate = "";
var dateSelectValue = "";
var dateStr = "";
export default{
  data(){
    return{
      chart: null,
      teachersList: [],
      meetingDetail: {},
      studentsList: [],
      modalListType: '',
      firstName: '',
      lastName: '',
      selectedStudent: "",
      data : [
                { Behind: 1, falling: 0, ahead: 1 },
                { Behind: 0, falling: 1, ahead: 2 },
                { Behind: 1, falling: 1, ahead: 0 }
              ],
    }
  },
  mounted(){
    this.firstName = localStorage.getItem("firstName");
    this.lastName = localStorage.getItem("lastName");
    this.TeacherMeetingList();
    this.GetStudentCount();
    // this.GetConsistentlyList();
    // this.GetFallingList();
    // this.GetAheadList();
    this.GetTaskStatus();
    this.GetGradeLevels()
  },
  computed: {
    ...mapState("teacherAppointment", {
      agendaList: (state) => state.agendaList,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      teachers: (state) => state.teachers,
    }),
    ...mapState("teacherAdvisor", {
      studentDetails: (state) => state.studentDetails,
      studentCount: (state) => state.studentCount,
      consistentlyBehindCount: (state) => state.consistentlyBehindCount,
      consistenlyList: (state) => state.consistenlyList,
      fallingBehindCount:(state) => state.fallingBehindCount,
      fallingBehindlist:(state) => state.fallingBehindlist,
      aheadCount:(state) => state.aheadCount,
      aheadList:(state) => state.aheadList,
      totalGrades:(state) => state.totalGrades,
      taskStatusData:(state) => state.taskStatusData,
    }),
  },
  methods: {
    ...mapActions("teacherAppointment", {
      listTeacherAgenda: "listTeacherAgenda",
      teacherMeetingList: "teacherMeetingList",
      teacherMeetingConfirm: "teacherMeetingConfirm",
    }),
    ...mapActions("teacherAdvisor", {
      getStudentCount: "getStudentCount",
      getConsistentlyList: "getConsistentlyList",
      getFallingList: "getFallingList",
      getAheadList: "getAheadList",
      getTaskStatus: "getTaskStatus",
      getGradeLevels: "getGradeLevels"
    }),
    async GetStudentCount(){
      await this.getStudentCount();
    },
    async GetConsistentlyList(){
      await this.getConsistentlyList();
    },
    async GetFallingList(){
      await this.getFallingList();
    },
    async GetAheadList(){
       await this.getAheadList();
    },
    async GetTaskStatus(){
       await this.getTaskStatus();
    },
    async GetGradeLevels(){
       await this.getGradeLevels();
       this.renderChart();
       console.log("data",this.totalGrades);
       console.log("data",this.taskStatusData); 
    },
    renderChart() {
        const aheadArray = this.taskStatusData.map(item => item.aheadStudentsCount);
        const behindArray  = this.taskStatusData.map(item => item.consistentlyBehindCount);
        const fallingArray  = this.taskStatusData.map(item => item.fallingBehindCount);

        const sumArray = Array.from({ length: aheadArray.length }, (_, i) => aheadArray[i] + behindArray[i] + fallingArray[i]);

        // Find the highest number among the sums
        const highestSum = Math.max(...sumArray);

        // code commented for alternate usage

        // const allNumbers = [...aheadArray, ...behindArray, ...fallingArray];
        // const highestNumber = Math.max(...allNumbers);
        if (this.totalGrades.length < 1) {
        document.getElementById("weeklyContainer").innerHTML =
          "No data Found";
      }
        const ctx = this.$refs.myChart.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.totalGrades,
            datasets: [
              {
                label: 'Ahead', // First dataset label
                data: aheadArray, // Example data points for Dataset 1
                backgroundColor: 'rgb(22, 91, 170)', // Example color, customize as needed
                borderColor: 'rgb(109, 152, 201)', // Example color, customize as needed
                borderWidth: 1,
              },
              {
                label: 'Falling Behind', // Second dataset label
                data: fallingArray, // Example data points for Dataset 2
                backgroundColor: 'rgb(161, 85, 185)', // Example color, customize as needed
                borderColor: 'rgb(109, 152, 201)', // Example color, customize as needed
                borderWidth: 1,
              },
              {
                label: 'Really Behind', // Third dataset label
                data: behindArray, // Example data points for Dataset 3
                backgroundColor: 'rgb(247, 101, 163)', // Example color, customize as needed
                borderColor: 'rgb(109, 152, 201)', // Example color, customize as needed
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                position: 'bottom',
                align: 'start',
                onHover: function(event, legendItem) {
                  document.getElementById("weeklyContainer").style.cursor = 'pointer';
                  // You can add additional hover effects here
                },
                onLeave: function(event, legendItem) {
                  document.getElementById("weeklyContainer").style.cursor = 'default';
                  // Reset hover effects here
                }
              }
            },
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
                beginAtZero: true,
                stepSize: Math.ceil(highestSum / 5) * 2,      // Set step size to 20
                max: Math.ceil(highestSum / 5) * 10,  
              },
            },
          },
        });
    },
    selectedStudentId(selectedStudent) {
      this.$router.push(`/student-analytic-dashboard?id=${selectedStudent.id}`);
    },
    async TeacherMeetingList() {
      const { id } = localStorage;
      await this.teacherMeetingList({ teacher_id: id });

      this.teachersList = this.teachers.map((element) => {
        const { title, default_slots, student_id, request_id, date, conversation_type, meeting_description, meeting_location, meeting_link, meeting_name } = element;

        const Scheduleobj = {
          date: this.formatDate(date),
          title,
          time: default_slots.start_time,
          studentId: student_id,
          reqId: request_id,
          selectableDate: date,
          conversation_type,
          dateSelected: date,
          default_slots,
          meeting_description,
          meeting_location,
          meeting_link,
          meeting_name,
        };

        this.teachersList.push(Scheduleobj);

        return Scheduleobj;
      });
      
    },
    formatDate(input) {
      var datePart = input.match(/\d+/g),
        year = datePart[0], // get only two digits
        month = datePart[1],
        day = datePart[2];

      return month + "-" + day + "-" + year;
    },
    async TeacherMeetingConfirm(
      student_value,
      request_value,
      value,
      dateSelect = null
    ) {
      this.loading = true;
      isAccepted = true;
      var numValue = value;
      selectDate = dateSelect;
      await this.teacherMeetingConfirm({
        request_id: request_value,
        student_id: student_value,

        meeting_request: numValue.toString(),
      });
      this.loading = false;
      if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      } else if (this.successMessage != "") {
        if ($("#mediumModal").hasClass("show")) {
          $("#mediumModal").modal("hide");
          $(".modal").modal("hide");
          $(".modal-backdrop").remove();
        }
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        if (dateSelect) {
          if (dateSelectValue) {
            let today = new Date();
            this.currentTime = this.formatAMPM(today);

            var todayStr = today.toISOString().split("T")[0];
            if (dateSelectValue == todayStr) {
              $('.fc-day[data-date="' + dateSelectValue + '"]').css(
                "background-color",
                "#F49196"
              );
            } else {
              $('.fc-day[data-date="' + dateSelectValue + '"]').css(
                "background-color",
                "#424246"
              );
            }
          }

          $('.fc-day[data-date="' + dateSelect + '"]').css(
            "background-color",
            "#5B5B5E"
          );
          dateSelectValue = dateSelect;
        }

        if (dateSelect) {
          dateStr = dateSelect;
        }
      }
      // this.ListTeacherAgenda();
      this.TeacherMeetingList();
    },
    formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },
    setMeeting(teacher) {
      $("#mediumModal").modal("show");
      this.meetingDetail = teacher;
    },
    openModal(listType) {
      this.modalListType = listType;
      if (listType === 'consistentlyBehindlist') {
        this.studentsList = this.$store.state.teacherAdvisor.consistenlyList;
      } else if (listType === 'fallingBehindlist') {
        this.studentsList = this.$store.state.teacherAdvisor.fallingBehindlist;
      } else if (listType === 'aheadlist') {
        this.studentsList = this.$store.state.teacherAdvisor.aheadList;
      }
      $("#studentList").modal("show");
    },
    onStudentClick(student){
      $("#studentList").modal("hide");
      this.$router.push(`/student-analytic-dashboard?id=${student.id}`);
    }
  },

}
</script>

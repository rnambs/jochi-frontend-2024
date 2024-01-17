<template>
  <div class="main-section">
    <section class="py-4 teacher-dashboard">
      <div class="container-fluid">
        <div class="d-flex justify-space-between align-items-center mb-3">
          <h2 class="text-20 font-poppins font-semi-bold mb-0 flex-grow-1">
            Welcome Back Samantha!</h2>
          <div class="form-group flex-grow-1 mb-0">
            <input type="text" class="form-control" id="search" placeholder="Search Student">
          </div>
        </div>
        <div class="row d-flex">
          <div class="col-12 col-sm-4 col-lg-2 h-auto d-flex">
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
                <p class="mb-0 text-14 color-text-50">Total # of Students</p>
                <h2 class="mb-0 text-46 color-text-100">132</h2>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-4 col-lg-2 h-auto d-flex">
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
                <h2 class="mb-0 text-46 color-text-100">14</h2>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-4 col-lg-2 h-auto d-flex">
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
                <h2 class="mb-0 text-46 color-text-100">12</h2>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-lg-6 h-auto d-flex">
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
          </div>
        </div>
        <div class="row d-flex">
          <div class="col-12 col-sm-6 h-auto d-flex">
            <div class="border p-3 rounded-20 w-100 box-card">
              <div class="d-flex  justify-content-between pb-3 align-items-center border-bottom">
                <div>
                  <h2 class="text-16 mb-0 font-semi-bold color-text-100">All Your Students</h2>
                  <p class="text-14 color-text-60 mb-0">Broken down by grade level</p>
                </div>
                <img src="../../assets/images/Icon/info.svg" class="cursor-pointer" alt="info" width="24" height="24" />
              </div>
              <img src="../../assets/images/graph.png" class="" alt="graph" width="100%" height="auto"/>
            </div>
          </div>
          <div class="col-12 col-sm-6 h-auto d-flex">
            <div class="border p-3 rounded-20 w-100 box-card">
              <h2 class="text-16 mb-0 font-semi-bold color-text-100 border-bottom pb-3">Carousel</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="border p-3 rounded-20 w-100 box-card">
              <h2 class="text-16 mb-0 font-semi-bold color-text-100 pb-3">Meeting Requests</h2>
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
                          openModal(
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
                          openModal(teacher.studentId, teacher.reqId, 2)
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
</script>

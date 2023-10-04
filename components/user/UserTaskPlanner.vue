<template>
    <div>
        <div :class="!accordionOpened ? 'main-section' : 'main-section opened'">
            <!-- Daily Calander -->
 <section id="taskPlanner" class="">
                <div class="m--12 custom-full-height d-flex planner-day-responsive">
                    <div class="d-flex flex-column flex-fill w-100">
                        <div class="row">
                            <div class="col-12">
                                <h2 class="heading2 font-semi-bold color-primary-dark mb-1">Tasks</h2>
                                <p class="color-tertiary font-medium mb-1">Task For this week</p>
                                <div class="d-flex flex-wrap">
                                    <div class="pb-0 pr-3 m-1 mr-auto">
                                        <div data-intro="Filter tasks" class="dropdown form-row d-inline-flex w-auto">
                                            <div class="dropdown-select form-control form-sm form-transparent"
                                                type="button" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i class="i-filter-calendar j-icon i-sm bg-gray mr-1"></i>
                                                <span id="dLabel" class="mr-3">This week</span>
                                                <span class="caret"><i
                                                        class="fas fa-chevron-down font-medium"></i></span>
                                            </div>
                                            <ul class="dropdown-menu w-100 rounded-12 p-2" aria-labelledby="dLabel">
                                                <li class="item p-2">This week</li>
                                                <li class="item p-2">This Month</li>
                                                <li class="item p-2">All</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="m-1 d-flex justify-content-end">
                                      <button @click="AddAssignmentModal()"
                                      class="btn btn-primary py-1 px-3 mr-3">Add Assignment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row h-100">
                            <div class="col-12 col-sm-6 col-lg-3">
                              <drop
                          class="drop color-secondary text-16 h-100 d-flex flex-column"
                          @drop="doingDrop"
                        >
                                <div class="card card-tertiary px-3 pt-3 rounded-12 w-100 h-100">
                                    <div class="d-flex align-items-center mb-3">
                                        <span class="mr-2"><span
                                                class="bg-task-violet p-1 rounded-circle d-flex"></span></span>
                                        <p class="mb-0 color-dark font-medium text-14">Doing</p>
                                    </div>
                                    <span class="border-pb-1 bg-task-violet w-100 d-flex mb-3"></span>
                                    <div v-for="item in doingAssignments"
                            :key="item.id">
                            <drag :transfer-data="{ item }">
                                    <div class="card card-primary p-3 mb-3">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <div class="d-flex flex-wrap align-items-center">
                                              <span class="task-label  my-1 mr-1"
                                                :class="{
                                          'task-label--yellow': item.priority == '1',
                                          'task-label--violet': item.priority == '2',
                                          'task-label--green': item.priority == '3',
                                          'task-label--red': item.priority == '4',
                                        }">{{
                                          item.priority == "1"
                                            ? "Urgent"
                                            : item.priority == "2"
                                            ? "Important"
                                            : item.priority == "3"
                                            ? "Can Wait"
                                            : item.priority == "4"
                                            ? "Overdue"
                                            : ""
                                        }}</span>
                                                <span class="task-label task-label--violet my-1 mr-1">{{
                                          item.subject.subject_name
                                            ? item.subject.subject_name
                                            : item.subject
                                        }}</span>
                                            </div>
                                            <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                                <div class="dropdown-select form-control" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span
                                                        class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                                        <i class="i-more-dotes j-icon i-xs bg-text-secondary"></i>
                                                    </span>
                                                </div>
                                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0"
                                                    aria-labelledby="dLabel">
                                                    <li @click="EditAssignmentModal()" class="item p-2">
                                                      Edit
                                                    </li>
                                                    <li class="item p-2">Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h6 class="color-dark font-semi-bold text-14 mb-1">{{ item.task }}</h6>
                                        <p class="text-10 color-gray mb-2">{{ item.assignment_description }}</p>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex">
                                                <img src="../../static/image/v4/avatar/avatat1.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm">
                                                <img src="../../static/image/v4/avatar/avatar2.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm ml--4">
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <button class="btn p-0 mr-2">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.29041 0.666992C3.74267 0.666992 0.866211 3.54345 0.866211 7.09119C0.866211 10.6389 3.74267 13.5154 7.29041 13.5154C10.8381 13.5154 13.7146 10.6389 13.7146 7.09119C13.7146 3.54345 10.8381 0.666992 7.29041 0.666992ZM9.67595 7.16392L6.06233 9.32066C6.03646 9.33637 6.00351 9.33715 5.97686 9.32144C5.95099 9.30654 5.93453 9.27873 5.93453 9.24774V7.09096V4.93419C5.93453 4.90363 5.95099 4.87539 5.97686 4.86046C6.00351 4.84518 6.03646 4.84596 6.06233 4.86124L9.67595 7.01842C9.70182 7.03312 9.71713 7.06153 9.71713 7.09094C9.71713 7.12098 9.70184 7.14883 9.67595 7.16392Z"
                                                            fill="#5534A5" />
                                                    </svg>
                                                </button>
                                                <button class="btn btn-drag-card-open">
                                                    Open
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    </drag>
                                  </div>
                                  <client-only>
                            <infinite-loading
                              class="d-flex align-items-center w-100 justify-content-center"
                              :identifier="doingreloadCount"
                              @infinite="doingNext"
                            >
                            <div slot="no-more">That's all!</div>
                            </infinite-loading>
                          </client-only>
                                </div>
                                </drop>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-3">
                              <drop
                          class="drop color-secondary text-16 h-100 d-flex flex-column"
                          @drop="confirmUndo"
                        >
                                <div class="card card-tertiary px-3 pt-3 rounded-12 w-100 h-100">
                                    <div class="d-flex align-items-center mb-3">
                                        <span class="mr-2"><span
                                                class="bg-task-yellow p-1 rounded-circle d-flex"></span></span>
                                        <p class="mb-0 color-dark font-medium text-14">Todo</p>
                                    </div>
                                    <span class="border-pb-1 bg-task-yellow w-100 d-flex mb-3"></span>
                                    <div v-for="item in tempAssts"
                            :key="item.id">
                            <drag :transfer-data="{ item }">
                                    <div class="card card-primary p-3 mb-3">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <div class="d-flex flex-wrap align-items-center">
                                                <span class="task-label  my-1 mr-1"
                                                :class="{
                                          'task-label--yellow': item.priority == '1',
                                          'task-label--violet': item.priority == '2',
                                          'task-label--green': item.priority == '3',
                                          'task-label--red': item.priority == '4',
                                        }">{{
                                          item.priority == "1"
                                            ? "Urgent"
                                            : item.priority == "2"
                                            ? "Important"
                                            : item.priority == "3"
                                            ? "Can Wait"
                                            : item.priority == "4"
                                            ? "Overdue"
                                            : ""
                                        }}</span>
                                                <span class="task-label task-label--yellow my-1 mr-1">{{
                                          item.subject.subject_name
                                            ? item.subject.subject_name
                                            : item.subject
                                        }}</span>
                                            </div>
                                            <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                                <div class="dropdown-select form-control" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span
                                                        class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                                        <i class="i-more-dotes j-icon i-xs bg-text-secondary"></i>
                                                    </span>
                                                </div>
                                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0"
                                                    aria-labelledby="dLabel">
                                                    <li class="item p-2">Edit</li>
                                                    <li class="item p-2">Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h6 class="color-dark font-semi-bold text-14 mb-1">{{ item.task }}</h6>
                                        <p class="text-10 color-gray mb-2">{{ item.assignment_description }}</p>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex">
                                                <img src="../../static/image/v4/avatar/avatat1.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm">
                                                <img src="../../static/image/v4/avatar/avatar2.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm ml--4">
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <button class="btn p-0 mr-2">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.29041 0.666992C3.74267 0.666992 0.866211 3.54345 0.866211 7.09119C0.866211 10.6389 3.74267 13.5154 7.29041 13.5154C10.8381 13.5154 13.7146 10.6389 13.7146 7.09119C13.7146 3.54345 10.8381 0.666992 7.29041 0.666992ZM9.67595 7.16392L6.06233 9.32066C6.03646 9.33637 6.00351 9.33715 5.97686 9.32144C5.95099 9.30654 5.93453 9.27873 5.93453 9.24774V7.09096V4.93419C5.93453 4.90363 5.95099 4.87539 5.97686 4.86046C6.00351 4.84518 6.03646 4.84596 6.06233 4.86124L9.67595 7.01842C9.70182 7.03312 9.71713 7.06153 9.71713 7.09094C9.71713 7.12098 9.70184 7.14883 9.67595 7.16392Z"
                                                            fill="#5534A5" />
                                                    </svg>
                                                </button>
                                                <button class="btn btn-drag-card-open">
                                                    Open
                                                </button>
                                            </div>
                                        </div>
                                        </div>
                                    </drag>
                                    </div>
                                    <client-only>
                            <infinite-loading
                              class="d-flex align-items-center w-100 justify-content-center"
                              :identifier="reloadCount"
                              @infinite="loadNext"
                            >
                            <div class="mb-2" slot="no-more"><span class="color-gray">That's all!</span></div>
                            </infinite-loading>
                          </client-only>
                                </div>
                              </drop>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-3">
                                <drop
                          class="drop color-secondary text-16 h-100 d-flex flex-column"
                          @drop="handleDrop"
                        >
                                <div class="card card-tertiary px-3 pt-3 rounded-12 w-100 h-100">
                                    <div class="d-flex align-items-center mb-3">
                                        <span class="mr-2"><span
                                                class="bg-task-green p-1 rounded-circle d-flex"></span></span>
                                        <p class="mb-0 color-dark font-medium text-14">Done</p>
                                    </div>
                                    <span class="border-pb-1 bg-task-green w-100 d-flex mb-3"></span>
                                    <div  v-for="item in completedAssignmentList"
                            :key="item.id">
                            <drag :transfer-data="{ item }">
                                    <div class="card card-primary p-3 mb-3"> 
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <div class="d-flex flex-wrap align-items-center">
                                                <span class="task-label  my-1 mr-1"
                                                :class="{
                                          'task-label--yellow': item.priority == '1',
                                          'task-label--violet': item.priority == '2',
                                          'task-label--green': item.priority == '3',
                                          'task-label--red': item.priority == '4',
                                        }"
                                                >   {{
                                          item.priority == "1"
                                            ? "Urgent"
                                            : item.priority == "2"
                                            ? "Important"
                                            : item.priority == "3"
                                            ? "Can Wait"
                                            : item.priority == "4"
                                            ? "Overdue"
                                            : ""
                                        }}</span>
                                                <span class="task-label task-label--green my-1 mr-1"> {{
                                          item.subject.subject_name
                                            ? item.subject.subject_name
                                            : item.subject
                                        }}    </span>
                                            </div>
                                            <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                                <div class="dropdown-select form-control" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span
                                                        class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                                        <i class="i-more-dotes j-icon i-xs bg-text-secondary"></i>
                                                    </span>
                                                </div>
                                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0"
                                                    aria-labelledby="dLabel">
                                                    <li class="item p-2">Edit</li>
                                                    <li class="item p-2">Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h6 class="color-dark font-semi-bold text-14 mb-1">{{ item.task }} </h6>
                                        <p class="text-10 color-gray mb-2" v-html="item.assignment_description"></p>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex">
                                                <img src="../../static/image/v4/avatar/avatat1.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm">
                                                <img src="../../static/image/v4/avatar/avatar2.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm ml--4">
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <button class="btn p-0 mr-2">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.29041 0.666992C3.74267 0.666992 0.866211 3.54345 0.866211 7.09119C0.866211 10.6389 3.74267 13.5154 7.29041 13.5154C10.8381 13.5154 13.7146 10.6389 13.7146 7.09119C13.7146 3.54345 10.8381 0.666992 7.29041 0.666992ZM9.67595 7.16392L6.06233 9.32066C6.03646 9.33637 6.00351 9.33715 5.97686 9.32144C5.95099 9.30654 5.93453 9.27873 5.93453 9.24774V7.09096V4.93419C5.93453 4.90363 5.95099 4.87539 5.97686 4.86046C6.00351 4.84518 6.03646 4.84596 6.06233 4.86124L9.67595 7.01842C9.70182 7.03312 9.71713 7.06153 9.71713 7.09094C9.71713 7.12098 9.70184 7.14883 9.67595 7.16392Z"
                                                            fill="#5534A5" />
                                                    </svg>
                                                </button>
                                                <button class="btn btn-drag-card-open">
                                                    Open
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </drag>
                                    </div>
                                </div>
                                </drop>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-3">
                                <div class="card card-tertiary px-3 pt-3 rounded-12 w-100 h-100">
                                    <div class="d-flex align-items-center mb-3">
                                        <span class="mr-2"><span
                                                class="bg-task-red p-1 rounded-circle d-flex"></span></span>
                                        <p class="mb-0 color-dark font-medium text-14">Overdue</p>
                                    </div>
                                    <span class="border-pb-1 bg-task-red w-100 d-flex mb-3"></span>
                                    <div  v-for="item in overdueAssignments"
                            :key="item.id">
                            <drag :transfer-data="{ item }">
                                    <div class="card card-primary p-3 mb-3">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <div class="d-flex flex-wrap align-items-center">
                                              <span class="task-label  my-1 mr-1"
                                                :class="{
                                          'task-label--yellow': item.priority == '1',
                                          'task-label--violet': item.priority == '2',
                                          'task-label--green': item.priority == '3',
                                          'task-label--red': item.priority == '4',
                                        }"
                                                >   {{
                                          item.priority == "1"
                                            ? "Urgent"
                                            : item.priority == "2"
                                            ? "Important"
                                            : item.priority == "3"
                                            ? "Can Wait"
                                            : item.priority == "4"
                                            ? "Overdue"
                                            : ""
                                        }}</span>
                                                 <span class="task-label task-label--red my-1 mr-1"> {{
                                          item.subject.subject_name
                                            ? item.subject.subject_name
                                            : item.subject
                                        }}    </span>
                                            </div>
                                            <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                                <div class="dropdown-select form-control" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span
                                                        class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                                        <i class="i-more-dotes j-icon i-xs bg-text-secondary"></i>
                                                    </span>
                                                </div>
                                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0"
                                                    aria-labelledby="dLabel">
                                                    <li class="item p-2">Edit</li>
                                                    <li class="item p-2">Remove</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h6 class="color-dark font-semi-bold text-14 mb-1">{{ item.task }}</h6>
                                        <p class="text-10 color-gray mb-2">{{ item.assignment_description }}</p>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex">
                                                <img src="../../static/image/v4/avatar/avatat1.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm">
                                                <img src="../../static/image/v4/avatar/avatar2.png" alt="avatar 1"
                                                    class="img-avatar img-avatar--sm ml--4">
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <button class="btn p-0 mr-2">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.29041 0.666992C3.74267 0.666992 0.866211 3.54345 0.866211 7.09119C0.866211 10.6389 3.74267 13.5154 7.29041 13.5154C10.8381 13.5154 13.7146 10.6389 13.7146 7.09119C13.7146 3.54345 10.8381 0.666992 7.29041 0.666992ZM9.67595 7.16392L6.06233 9.32066C6.03646 9.33637 6.00351 9.33715 5.97686 9.32144C5.95099 9.30654 5.93453 9.27873 5.93453 9.24774V7.09096V4.93419C5.93453 4.90363 5.95099 4.87539 5.97686 4.86046C6.00351 4.84518 6.03646 4.84596 6.06233 4.86124L9.67595 7.01842C9.70182 7.03312 9.71713 7.06153 9.71713 7.09094C9.71713 7.12098 9.70184 7.14883 9.67595 7.16392Z"
                                                            fill="#5534A5" />
                                                    </svg>
                                                </button>
                                                <button class="btn btn-drag-card-open">
                                                    Open
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    </drag>
                                    </div>
                                    <client-only>
                            <infinite-loading
                              class="d-flex align-items-center w-100 justify-content-center"
                              :identifier="overduereloadCount"
                              @infinite="overdueNext"
                            >
                            <div slot="no-more"><span class="color-gray">That's all!</span></div>
                            </infinite-loading>
                          </client-only>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="modal fade" id="editAssignment" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle"
              aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
                <div class="modal-content">
                  <div class="modal-header pb-1">
                    <h3 class="modal-title" id="editAssignmentModalLongTitle">
                      Edit Assignment
                    </h3>
                  </div>
                  <div class="modal-body px-3">
                          <form >
                            <div class="form-group mb-2">
                              <label for="recipient-name" class="col-form-label py-1"
                                >Subject here<em>*</em></label
                              >
                              <!-- <input
                                v-if="schoologyAssignment == '1'"
                                type="text"
                                class="form-control"
                                id="message-text"
                                maxlength="125"
                                placeholder="Enter assignment name"
                              /> -->
                              <select
                                class="form-control"
                              >
                                <option value="">Select subject</option>
                                <option>Jochi Math Test Course</option>
                                <option>Personal</option>
                              </select>
                              <!-- <div
                                v-if="submitted && $v.subject.$error"
                                class="invalid-feedback"
                              >
                                <span v-if="!$v.subject.required"
                                  >This field is required</span
                                >
                              </div> -->
                            </div>
                            <div class="form-group mb-2">
                              <label for="assignment-name" class="col-form-label py-1"
                                >Assignment Name<em>*</em></label
                              >
                              <input
                                type="text"
                                class="form-control"
                                id="assignment-name"
                                maxlength="60"
                                placeholder="Enter assignment name"
                              />
                            </div>
                            <div class="form-group mb-2">
                              <label for="message-text" class="col-form-label py-1"
                                >Task</label
                              >
                              <textarea
                                class="form-control"
                                id="message-text"
                                rows="3"
                                maxlength="500"
                                placeholder="Enter assignment description"
                              ></textarea>
                            </div>
                            <div class="row">
                              <div class="col-md-6 ml-auto py-0">
                                <div class="form-group mb-2 mb-0">
                                  <label
                                    for="recipient-name"
                                    class="col-form-label py-1"
                                    >Priority<em>*</em></label
                                  >
                                  <div class="dropdown input-icon-area">
                                    <button
                                      id="dLabel"
                                      class="dropdown-select form-control text-left"
                                      type="button"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    >
                                      <span class="">Select priority</span
                                      >
                                    </button>
                                    <ul
                                      class="dropdown-menu border"
                                      aria-labelledby="dLabel"
                                    >
                                      <li
                                        class="item low-color"
                                      >
                                        <span>Can Wait</span>
                                      </li>
                                      <li
                                        class="item medium-color"
                                      >
                                        <span>Important</span>
                                      </li>
                                      <li
                                        class="item high-color"
                                      >
                                        <span>Urgent</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6 ml-auto py-0">
                                <div class="form-group mb-2">
                                  <label
                                    for="recipient-name"
                                    class="col-form-label py-1"
                                    >Date<em>*</em></label
                                  >
                                  <date-picker
                                    class="form-control dropdown-menu-top"
                                    placeholder="MM/DD/YYYY"
                                    format="MM/dd/yyyy"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row mt-0">
                              <div class="col-6">
                                <div class="form-group">
                                  <label
                                    for="recipient-name"
                                    class="col-form-label"
                                    >Time<em>*</em></label
                                  >
                                  <div>
                                    <vue-timepicker
                                      format="hh:mm A"
                                      name="timeValue"
                                      class="show-cursor dropdown-menu-top"
                                    ></vue-timepicker>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              class="d-flex justify-content-between align-items-center mb-2"
                            >
                              <h6 class="color-dark font-semi-bold mb-0">
                                Sub Tasks
                              </h6>
                              <a class="btn p-0">
                                <span class="color-secondary"
                                  ><i class="fas fa-plus-circle"></i
                                ></span>
                              </a>
                            </div>
                            <div
                              class="d-flex flex-row align-items-start"
                            >
                              <div class="form-row mb-2 mx-0 mr-2 w-100">
                                <label class="form-label" for="name"
                                  >Add a sub-task</label
                                >
                                <input
                                  type="text"
                                  maxlength="100"
                                  class="form-control"
                                />
                              </div>
                              <div class="pt-4">
                                <button
                                  class="btn btn-primary btn-sm mt-2"
                                >
                                  Add
                                </button>
                              </div>
                            </div>

                            <div
                              class="d-flex justify-content-between align-items-center mb-2"
                            >
                              <h6 class="color-dark font-semi-bold mb-0">
                                Invite Peers
                              </h6>
                              <a class="btn p-0">
                                <span class="color-secondary"
                                  ><i class="fas fa-plus-circle"></i
                                ></span>
                              </a>
                            </div>

                            <!-- Additional Material Add -->
                            <div
                              class="d-flex justify-content-between align-items-center mb-2"
                            >
                              <h6 class="color-dark font-semi-bold mb-0">
                                Additional Material
                              </h6>
                              <a class="btn p-0">
                                <span class="color-secondary"
                                  ><i class="fas fa-plus-circle"></i
                                ></span>
                              </a>
                            </div>
                          </form>
                  </div>
                  <div class="modal-footer justify-content-end border-top-0">
                    <button type="button" class="btn btn-void py-1 px-3 rounded-8 font-semi-bold" data-dismiss="modal">
                      Cancel
                    </button>
                    <button data-dismiss="modal" type="button" class="btn btn-primary py-1 px-3 rounded-8 font-semi-bold">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal fade" id="AddAssignment" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle"
              aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
                <div class="modal-content">
                  <div class="modal-header pb-1">
                    <h3 class="modal-title" id="editAssignmentModalLongTitle">
                      Add Assignment
                    </h3>
                  </div>
                  <div class="modal-body px-3">
                          <form >
                            <div class="form-group mb-2">
                              <label for="recipient-name" class="col-form-label py-1"
                                >Subject here<em>*</em></label
                              >
                              <!-- <input
                                v-if="schoologyAssignment == '1'"
                                type="text"
                                class="form-control"
                                id="message-text"
                                maxlength="125"
                                placeholder="Enter assignment name"
                              /> -->
                              <select
                                class="form-control"
                                v-model="subject"
                                    :class="{
                                      'is-invalid':
                                        submitted && $v.subject.$error,
                                    }"
                              >
                                <option value="">Select subject</option>
                                <option>Jochi Math Test Course</option>
                                <option>Personal</option>
                              </select>
                              <div
                                v-if="submitted && $v.subject.$error"
                                class="invalid-feedback"
                              >
                                <span v-if="!$v.subject.required"
                                  >This field is required</span
                                >
                              </div>
                            </div>
                            <div class="form-group mb-2">
                              <label for="assignment-name" class="col-form-label py-1"
                                >Assignment Name<em>*</em></label
                              >
                              <input
                                type="text"
                                class="form-control"
                                id="assignment-name"
                                maxlength="125"
                                placeholder="Enter assignment name"
                                :class="{
                                      'is-invalid':
                                        submitted && $v.assignmentName.$error,
                                    }"
                              />
                              <div
                                    v-if="submitted && $v.assignmentName.$error"
                                    class="invalid-feedback"
                                  >
                                    <span v-if="!$v.assignmentName.required"
                                      >This field is required</span
                                    >
                                  </div>
                            </div>
                            <div class="form-group mb-2">
                              <label for="message-text" class="col-form-label py-1"
                                >Task</label
                              >
                              <textarea
                                class="form-control"
                                id="message-text"
                                rows="3"
                                maxlength="500"
                                v-model="assignmentDescription"
                                placeholder="Enter assignment description"
                              ></textarea>
                            </div>
                            <div class="row">
                              <div class="col-md-6 ml-auto py-0">
                                <div class="form-group mb-2 mb-0">
                                  <label
                                    for="recipient-name"
                                    class="col-form-label py-1"
                                    >Priority<em>*</em></label
                                  >
                                  <div class="dropdown input-icon-area">
                                    <button
                                      id="dLabel"
                                      class="dropdown-select form-control text-left"
                                      type="button"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    >
                                      <span class="">Select priority</span
                                      >
                                    </button>
                                    <ul
                                      class="dropdown-menu border"
                                      aria-labelledby="dLabel"
                                    >
                                      <li
                                        class="item low-color"
                                      >
                                        <span>Can Wait</span>
                                      </li>
                                      <li
                                        class="item medium-color"
                                      >
                                        <span>Important</span>
                                      </li>
                                      <li
                                        class="item high-color"
                                      >
                                        <span>Urgent</span>
                                      </li>
                                    </ul>
                                  </div>
                                  <div
                                      v-if="
                                        submitted &&
                                        priorityVal != 'Urgent' &&
                                        priorityVal != 'Important' &&
                                        priorityVal != 'Can Wait'
                                      "
                                      class="invalid-feedback"
                                      style="display: block"
                                    >
                                      <span
                                        v-if="
                                          priorityVal != 'Urgent' &&
                                          priorityVal != 'Important' &&
                                          priorityVal != 'Can Wait'
                                        "
                                        >This field is required</span
                                      >
                                    </div>
                                </div>
                              </div>
                              <div class="col-md-6 ml-auto py-0">
                                <div class="form-group mb-2">
                                  <label
                                    for="recipient-name"
                                    class="col-form-label py-1"
                                    >Date<em>*</em></label
                                  >
                                  <date-picker
                                    class="form-control dropdown-menu-top"
                                    placeholder="MM/DD/YYYY"
                                    format="MM/dd/yyyy"
                                    v-model="dateValue"
                                    :class="{
                                          'is-invalid':
                                            submitted && $v.dateValue.$error,
                                        }"
                                  />
                                  <div
                                        v-if="submitted && $v.dateValue.$error"
                                        class="invalid-feedback"
                                      >
                                        <span v-if="!$v.dateValue.required"
                                          >This field is required</span
                                        >
                                      </div>
                                </div>
                              </div>
                            </div>
                            <div class="row mt-0">
                              <div class="col-6">
                                <div class="form-group">
                                  <label
                                    for="recipient-name"
                                    class="col-form-label"
                                    >Time<em>*</em></label
                                  >
                                  <div>
                                    <vue-timepicker
                                    close-on-complete
                                    v-model="timeValue"
                                      format="hh:mm A"
                                      name="timeValue"
                                      class="show-cursor dropdown-menu-top"
                                      :class="{
                                            'is-invalid':
                                              submitted &&
                                              ($v.timeValue.$error ||
                                                !validTime),
                                          }"
                                    ></vue-timepicker>
                                    <div
                                          v-if="
                                            submitted &&
                                            ($v.timeValue.$error || !validTime)
                                          "
                                          class="invalid-feedback"
                                        >
                                          <span
                                            v-if="
                                              !$v.timeValue.required ||
                                              !validTime
                                            "
                                            >Not a valid time</span
                                          >
                                        </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              class="d-flex justify-content-between align-items-center mb-2"
                            >
                              <h6 class="color-dark font-semi-bold mb-0">
                                Sub Tasks
                              </h6>
                              <a class="btn p-0">
                                <span class="color-secondary"
                                  ><i class="fas fa-plus-circle"></i
                                ></span>
                              </a>
                            </div>
                            <div
                              class="d-flex flex-row align-items-start"
                            >
                              <div class="form-row mb-2 mx-0 mr-2 w-100">
                                <label class="form-label" for="name"
                                  >Add a sub-task</label
                                >
                                <input
                                  type="text"
                                  maxlength="100"
                                  class="form-control"
                                />
                              </div>
                              <div class="pt-4">
                                <button
                                  class="btn btn-primary btn-sm mt-2"
                                >
                                  Add
                                </button>
                              </div>
                            </div>

                            <div
                              class="d-flex justify-content-between align-items-center mb-2"
                            >
                              <h6 class="color-dark font-semi-bold mb-0">
                                Invite Peers
                              </h6>
                              <a class="btn p-0">
                                <span class="color-secondary"
                                  ><i class="fas fa-plus-circle"></i
                                ></span>
                              </a>
                            </div>

                            <!-- Additional Material Add -->
                            <div
                              class="d-flex justify-content-between align-items-center mb-2"
                            >
                              <h6 class="color-dark font-semi-bold mb-0">
                                Additional Material
                              </h6>
                              <a class="btn p-0">
                                <span class="color-secondary"
                                  ><i class="fas fa-plus-circle"></i
                                ></span>
                              </a>
                            </div>
                          </form>
                  </div>
                  <div class="modal-footer justify-content-end border-top-0">
                    <button type="button" class="btn btn-void py-1 px-3 rounded-8 font-semi-bold" data-dismiss="modal">
                      Cancel
                    </button>
                    <button @click="AddAssignment()"
                    data-dismiss="modal" type="button" class="btn btn-primary py-1 px-3 rounded-8 font-semi-bold">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Daily Calander -->
        </div>
    </div>
</template>
<script>
import { required, requiredIf } from "vuelidate/lib/validators";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import { mapState, mapActions } from "vuex";
import { eventBus } from "~/plugins/eventbus.js";
import InfiniteLoading from "vue-infinite-loading";
import draggable from "vuedraggable";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import "vue2-timepicker/dist/VueTimepicker.css";
export default {
  name: "UserStudentTask",
  components: {
    lottie,
    InfiniteLoading,
    draggable,
    VueTimepicker,
  },
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "/css/custom.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/intro.js/6.0.0/introjs.css",
        },
      ],
    };
  },
  data() {
    return {
        accordionOpened:false,
        completedAssignmentList: [],
        doingreloadCount: 0,
        overduereloadCount: 0,
        reloadCount: 0,
        tempOffset: -1,
        overduetempOffset: -1,
        doingtempOffset: -1,
      reloadNext: false,
      offset: 0,
      limit: 10,
      overdueoffset: 0,
      overduelimit: 10,
      doingoffset: 0,
      doinglimit: 10,
      pendingAssignments: [],
      tempAssts: [],
      draggable: "Drag Me",
      drag: false,
      completeAsstId: 0,
      undoAsstId: 0,
      assignmentId: 0,
      schoologyAssignment: "",
      submissionId: "",
      processingCompleteAssignment: false,
      assignmentMaterials: [],
      overdueAssignmentList: [],
      doingAssignmentList: [],
      overdueAssignments:[],
      doingAssignments: [],
      subject: "",
      submitted: false,
      assignmentDescription: "",
      dateValue: "",
      timeValue: "",
    }
  },
  created() {
    eventBus.$on('accordionOpened', (newValue) => {
      this.accordionOpened = newValue;
    });
  },
  mounted(){
    this.user_id = localStorage.getItem("id");
    this.GetStudents();
    this.getSubjectsList();
    this.getAllCompletedAssignments();
  },
  computed: {
    ...mapState("teacherMeeting",{
        students: (state) => state.students,
    }),
    ...mapState("quotedMessage",{
        quoteMessage: (state) => state.quoteMessage,
      viewed: (state) => state.viewed,
      assignment: (state) => state.assignment,
      sharedAssignment: (state) => state.sharedAssignment,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      errorMessageQuote: (state) => state.errorMessage,
      errorTypeQuote: (state) => state.errorType,
      subjectsData: (state) => state.subjectsData,
      assignmentsList: (state) => state.assignmentsList,
      sharedAssignmentsList: (state) => state.sharedAssignmentsList,
      completedAssignments: (state) => state.completedAssignments,
      completedSharedAssignments: (state) => state.completedSharedAssignments,
      newAdditionalMaterial: (state) => state.newAdditionalMaterial,
      allSubTskCompleted: (state) => state.allSubTskCompleted,
      overdues: (state) => state.overdues,
      sharedOverdues: (state) => state.sharedOverdues,
    }),
},
validations: {
    subject: { required },
    dateValue: { required },
    timeValue: { required },
    assignmentName: { required },
    // assignmentDescription: { required },
  },
methods:{
    ...mapActions("quotedMessage", {
      showQuotedMessage: "showQuotedMessage",
      getDailyPlanner: "getDailyPlanner",
      addAssignment: "addAssignment",
      getAssignment: "getAssignment",
      updateAssignment: "updateAssignment",
      getSubjectsList: "getSubjectsList",
      getAssignments: "getAssignments",
      completeTask: "completeTask",
      getCompletedAssignments: "getCompletedAssignments",
      uploadAdditionalMaterial: "uploadAdditionalMaterial",
      deleteAssignments: "deleteAssignments",
      assignmentSubmit: "assignmentSubmit",
    }),
    ...mapActions("teacherMeeting", {
      getStudents: "getStudents",
    }),
    async GetStudents() {
      await this.getStudents({
        school_id: localStorage.getItem("school_id"),
        studentId: localStorage.getItem("id"),
      });
    },
    async getAllCompletedAssignments() {
      await this.getCompletedAssignments({
        userId: localStorage.getItem("id"),
        date: moment().format("YYYY-MM-DD"),
        type: "Weekly",
      });
      let completed = [];
      completed = this.completedAssignments;
      this.completedAssignmentList = [];
      this.completedAssignments.forEach((e) => {
        let asst = {};
        asst = e;
        this.completedAssignmentList.push(asst);
      });
      this.completedSharedAssignments.forEach((e) => {
        let asst = {};
        asst = e.assignments;
        this.completedAssignmentList.push(asst);
      });
    },
    async GetSubjectList() {
      await this.getSubjectsList({});
    },
async doingNext($state) {
      if (this.doingtempOffset != this.doingoffset || this.reloadNext) {
        this.reloadNext = false;
        this.doingtempOffset = this.doingoffset;
        this.doingAssignmentList = [];
        await this.getAssignments({ offset: this.doingoffset, limit: this.doinglimit, filter: 'Doing' });
        this.doingoffset = this.doingoffset + this.doinglimit;
        this.assignmentMaterials = [];
        await this.mapAssignments();
        await this.mapSharedAssignments();
        if (this.doingAssignmentList.length > 0) {
          this.doingAssignments.push(...this.doingAssignmentList);
          $state.loaded();
        } else {
          $state.complete();
        }
      }
    },
async loadNext($state) {
      if (this.tempOffset != this.offset || this.reloadNext) {
        this.reloadNext = false;
        this.tempOffset = this.offset;
        this.pendingAssignments = [];
        await this.getAssignments({ offset: this.offset, limit: this.limit, filter: 'Pending' });
        this.offset = this.offset + this.limit;
        this.assignmentMaterials = [];
        await this.mapAssignments();
        await this.mapSharedAssignments();
        if (this.pendingAssignments.length > 0) {
          this.tempAssts.push(...this.pendingAssignments);
          $state.loaded();
        } else {
          $state.complete();
        }
      }
    },
    async overdueNext($state) {
      if (this.overduetempOffset != this.overdueoffset || this.reloadNext) {
        this.reloadNext = false;
        this.overduetempOffset = this.overdueoffset;
        this.overdueAssignmentList = [];
        await this.getAssignments({ offset: this.overdueoffset, limit: this.overduelimit, filter: 'Overdue' });
        if (this.overdueoffset == 0) {
          await this.mapOverdues();
        }
        this.overdueoffset = this.overdueoffset + this.overduelimit;
        this.assignmentMaterials = [];
        await this.mapAssignments();
        // await this.mapSharedAssignments();
        if (this.overdueAssignmentList.length > 0) {
          this.overdueAssignments.push(...this.overdueAssignmentList);
          $state.loaded();
        } else {
          $state.complete();
        }
      }
    },
    mapOverdues() {
      if (this.overdues && this.overdues.length > 0) {
        this.overdues.forEach((e) => {
          let asst = this.mapData(e);
          this.overdueAssignmentList.push(asst);
        });
      }

      if (this.sharedOverdues && this.sharedOverdues.length > 0) {
        this.sharedOverdues.forEach((e) => {
          let asst = this.mapSharedData(e);
          this.overdueAssignmentList.push(asst);
        });
      }
    },
    mapData(e) {
      if (e) {
        let item = {};
        this.assignmentMaterials = [];
        item.assignment_description = e.assignment_description;
        if (e.assignment_materials && e.assignment_materials.length > 0) {
          e.assignment_materials.forEach((m) => {
            let data = {};
            data = m;
            this.assignmentMaterials.push(data);
          });
        }
        item.assignment_materials = this.assignmentMaterials;
        item.completed_date = e.completed_date;
        item.dueTimeFormat = e.dueTimeFormat;
        item.due_date = e.due_date;
        item.due_time = e.due_time;
        item.id = e.id;
        item.priority = e.priority;
        item.schoologyAssignment = e.schoologyAssignment;
        item.schoologyAssignmentId = e.schoologyAssignmentId;
        item.subTasks = e.subTasks;
        item.subject = e.subject;
        item.subjects = e.subjects;
        item.task = e.task;
        item.task_status = e.task_status;
        item.updatedAt = e.updatedAt;
        item.user_id = e.user_id;
        item.shared_users_id = e.shared_users_id;
        item.submission_id =
          e.submission_id && e.submission_id != "" ? e.submission_id : null;
        item.grade = e.grade;
        item.grade_possible = e.grade_possible;
        item.peers = this.mapPeers(e);
        if (e.due_date) {
          item.formattedDate = moment(e.due_date).format("MMMM Do, YYYY");
        }
        item.isShared = false;
        return item;
      }
    },
    mapSharedData(e) {
      let item = {};
      this.assignmentMaterials = [];
      if (e && e.assignments) {
        item.assignment_description = e.assignments.assignment_description;
        if (
          e.assignments?.assignment_materials &&
          e.assignments?.assignment_materials.length > 0
        ) {
          e.assignments?.assignment_materials.forEach((m) => {
            let data = {};
            data = m;
            this.assignmentMaterials.push(data);
          });
        }
        item.assignment_materials = this.assignmentMaterials;
        item.completed_date = e.assignments.completed_date;
        item.dueTimeFormat = e.assignments.dueTimeFormat;
        item.due_date = e.assignments.due_date;
        item.due_time = e.assignments.due_time;
        item.id = e.assignments.id;
        item.priority = e.assignments.priority;
        item.schoologyAssignment = e.assignments.schoologyAssignment;
        item.schoologyAssignmentId = e.assignments.schoologyAssignmentId;
        item.subTasks = e.assignments?.subTasks;
        item.subject = e.assignments?.subjects?.subject_name;
        item.subjects = e.assignments?.subjects;
        item.task = e.assignments.task;
        item.task_status = e.assignments.task_status;
        item.updatedAt = e.assignments.updatedAt;
        item.user_id = e.assignments.user_id;
        item.shared_users_id = e.shared_users_id;
        item.submission_id =
          e.submission_id && e.submission_id != "" ? e.submission_id : null;
        item.peers = this.mapPeers(e);
        if (e.assignments.due_date) {
          item.formattedDate = moment(e.assignments.due_date).format(
            "MMMM Do, YYYY"
          );
        }
        item.isShared = true;
        return item;
      }
    },
    mapPeers(e) {
      let user_id = localStorage.getItem("id");
      let peers = [];
      if (
        e.assignments?.assignment_shared_users &&
        e.assignments?.assignment_shared_users.length > 0
      ) {
        e.assignments?.assignment_shared_users.forEach((item) => {
          let peer = {};
          if (item.shared_users_id != user_id) {
            if (item.users) {
              peer = item.users;
              peer.id = item.shared_users_id;
              peers.push(peer);
            }
          }
        });
      }
      if (e.assignment_shared_users && e.assignment_shared_users?.length > 0) {
        e.assignment_shared_users.forEach((item) => {
          let peer = {};
          if (item.shared_users_id != user_id) {
            if (item.users) {
              peer = item.users;
              peer.id = item.shared_users_id;
              peers.push(peer);
            }
          }
        });
      }
      let exists = peers.find(
        (ele) => ele.id.toString() == e.assignments?.user_id.toString()
      );

      if (e.assignments?.users && !exists) {
        let user = {};
        user = e.assignments?.users;
        user.id = e.user_id;
        peers.push(user);
      }
      return peers;
    },
    mapAssignments() {
      if (this.assignmentsList && this.assignmentsList.length > 0) {
        this.assignmentsList.forEach((e) => {
          let asst = this.mapData(e);
          this.pendingAssignments.push(asst);
          const doingAssignmentLists = this.pendingAssignments.filter((asst) => asst.task_status === 'Doing');
    this.doingAssignmentList.push(...doingAssignmentLists);
    this.pendingAssignments = this.pendingAssignments.filter((asst) => asst.task_status !== 'Doing');
          });
      }
    },
    mapSharedAssignments() {
      if (this.sharedAssignmentsList && this.sharedAssignmentsList.length > 0) {
        this.sharedAssignmentsList.forEach((e) => {
          let asst = this.mapSharedData(e);
          this.pendingAssignments.push(asst);
          const doingAssignmentLists = this.pendingAssignments.filter((asst) => asst.task_status === 'Doing');
    this.doingAssignmentList.push(...doingAssignmentLists);
    this.pendingAssignments = this.pendingAssignments.filter((asst) => asst.task_status !== 'Doing');
        });
      }
    },
    confirmUndo(data, event) {
      let assignment = data.item;
      this.undoAsstId = assignment.id;
      this.completeAssignment(false);
    },
    handleDrop(data, event) {
  let assignment = data.item;
  this.completeAsstId = assignment.id;
  this.assignmentId = assignment.id;
  this.schoologyAssignment = assignment.schoologyAssignment;
  this.submissionId = assignment.submission_id;
  this.completeAssignment(true);
},
async completeAssignment(completed = true) {
  this.processingCompleteAssignment = true;
  await this.completeTask({
    assignment_id: completed ? this.completeAsstId : this.undoAsstId,
    status: completed ? "Completed" : "Pending",
  });
  this.processingCompleteAssignment = false;
  if (this.successMessage != "") {
    this.openAssignment = false;
    this.doingoffset = 0;
    this.offset = 0;
    this.tempAssts = [];
    this.doingAssignments = [];
    this.reloadNext = true;
    this.reloadCount += 1;
    this.doingreloadCount += 1;
    this.getAssignments({ offset: this.overdueoffset, limit: this.overduelimit, filter: 'Doing' });
    this.getAssignments({ offset: this.overdueoffset, limit: this.overduelimit, filter: 'Pending' });
    this.getAssignments({ offset: this.overdueoffset, limit: this.overduelimit, filter: 'Overdue' });
    this.getAllCompletedAssignments();
    this.completeAsstId = 0;
  }
},
doingDrop(data, event) {
  let assignment = data.item;
  this.completeAsstId = assignment.id;
  this.assignmentId = assignment.id;
  this.schoologyAssignment = assignment.schoologyAssignment;
  this.submissionId = assignment.submission_id;
  this.doingAssignment();
},
async doingAssignment() {
  this.processingCompleteAssignment = true;
  await this.completeTask({
    assignment_id: this.assignmentId,
    status: 'Doing',
  });
  this.processingCompleteAssignment = false;
  if (this.successMessage != "") {
    this.openAssignment = false;
    this.offset = 0;
    this.doingoffset = 0;
    this.doingAssignments = [];
    this.tempAssts = [];
    this.reloadNext = true;
    this.reloadCount += 1;
    this.doingreloadCount += 1;
    this.getAssignments({ offset: this.overdueoffset, limit: this.overduelimit, filter: 'Doing' });
    this.getAssignments({ offset: this.overdueoffset, limit: this.overduelimit, filter: 'Pending' });
    this.getAssignments({ offset: this.overdueoffset, limit: this.overduelimit, filter: 'Overdue' });
    this.getAllCompletedAssignments();
    this.completeAsstId = 0;
  }
},
EditAssignmentModal() {
        $("#editAssignment").modal({ backdrop: true });
    },
AddAssignmentModal() {
        $("#AddAssignment").modal({ backdrop: true });
    },
AddAssignment(){

    }
  },
}
</script>
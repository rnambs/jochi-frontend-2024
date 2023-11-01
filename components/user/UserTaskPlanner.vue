<template>
  <div>
    <lottie v-if="loading" :options="lottieOptions" v-on:animCreated="handleAnimation" class="lottie-loader" />
    <div :class="!accordionOpened ? 'main-section' : 'main-section opened'">
      <!-- Daily Calander -->
      <section id="taskPlanner" class="">
        <div class="m--12 custom-full-height d-flex planner-day-responsive">
          <div class="d-flex flex-column flex-fill w-100">
            <div class="row">
              <div class="col-12">
                <div class="d-flex flex-wrap">
                  <div class="d-flex flex-column pr-3 mr-auto">
                    <h2 class="heading2 font-semi-bold color-primary-dark mb-1">Tasks</h2>
                    <p class="color-tertiary font-medium mb-1">{{ assignmentTypeText }}</p>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="d-flex flex-wrap">
                    <div class="pb-0 m-1 mr-3">
                      <div data-intro="Filter tasks" class="dropdown form-row d-inline-flex w-auto">
                        <div class="dropdown-select form-control form-sm form-transparent" type="button"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="i-filter-calendar j-icon i-sm bg-gray mr-1"></i>
                          <span id="dLabel" class="mr-3">{{ TypeText }}</span>
                          <span class="caret"><i class="fas fa-chevron-down font-medium"></i></span>
                        </div>
                        <ul class="dropdown-menu w-100 rounded-12 p-2" aria-labelledby="dLabel">
                          <li class="item p-2" @click="weeklyAssignments()"
                            :class="{ active: assignmentType === 'Weekly' }">This week</li>
                          <li class="item p-2" @click="monthlyAssignments()"
                            :class="{ active: assignmentType === 'Monthly' }">This Month</li>
                          <li class="item p-2" @click="allAssignments()" :class="{ active: assignmentType === 'All' }">All
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="m-1 d-flex justify-content-end">
                      <button @click="
                        openAssignment = true;
                      isAddAssignment = true;
                      EditAssignmentModal();" class="btn btn-primary py-1 px-3 mr-3">Add Assignment</button>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row h-100">
              <div class="col-12 col-sm-6 col-lg-3">
                  <div class="card card-tertiary pl-3 pr-2 pt-3 rounded-12 w-100 h-100">
                    <div class="d-flex flex-column pr-2">
                      <div class="d-flex align-items-center mb-3">
                        <span class="mr-2"><span class="bg-task-violet p-1 rounded-circle d-flex"></span></span>
                        <p class="mb-0 color-dark font-medium text-14">Doing</p>
                      </div>
                      <span class="border-pb-1 bg-task-violet w-100 d-flex mb-3"></span>
                    </div>
                    <drop class="drop color-secondary text-16 h-100 d-flex flex-column"
                      @dragover="doingDropStart()"
                      @dragleave="doingDropEnd()"
                      @drop="doingDrop">
                    <div class="drop-zone" :class="{ 'dropping': isDropping }"></div>
                    <div class="d-flex flex-column task-container pr-2 mb-3">
                      <div v-for="(item, index) in doingAssignments" :key="item.id">
                        <drag :transfer-data="{ item, source: 'doingAssignments', sourceType: 'Doing' }"
                          @dragstart="handleDragStart(index)" @dragend="handleDragEnd()">
                          <div class="card card-primary p-3 mb-3"
                            :class="{ 'dragging': isDragging && index === draggingIndex }">
                            <div class="d-flex align-items-center justify-content-between mb-2">
                              <div class="d-flex flex-wrap align-items-center">
                                <span class="task-label  my-1 mr-1" :class="{
                                  'task-label--yellow': item.priority == '1',
                                  'task-label--violet': item.priority == '2',
                                  'task-label--green': item.priority == '3',
                                  'task-label--red': item.priority == '4',
                                }"><span>{{
  item.priority == "1"
  ? "Urgent"
  : item.priority == "2"
    ? "Important"
    : item.priority == "3"
      ? "Can Wait"
      : item.priority == "4"
        ? "Overdue"
        : ""
}}</span></span>
                                <span class="task-label task-label--violet my-1 mr-1"><span>{{
                                  item.subject.subject_name
                                  ? item.subject.subject_name
                                  : item.subject
                                }}</span></span>
                              </div>
                              <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                <div class="dropdown-select form-control" type="button" data-toggle="dropdown"
                                  aria-haspopup="true" aria-expanded="false">
                                  <span class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                    <i class="i-more-dotes j-icon i-xs bg-text-secondary"></i>
                                  </span>
                                </div>
                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0" aria-labelledby="dLabel">
                                  <li @click="onCardClick(item, 'Doing')" class="item px-2 py-1">
                                    Edit
                                  </li>
                                  <li @click="movetoTodo(item, 'Doing')" class="item px-2 py-1">
                                    Move to ToDo
                                  </li>
                                  <li @click="movetoDone(item, 'Doing')" class="item px-2 py-1">
                                    Move to Done
                                  </li>
                                  <div v-if="item.shared_users_id != user_id">
                                    <li @click="onChooseMultiple(item.id)" class="item px-2 py-1">Remove</li>
                                  </div>
                                </ul>
                              </div>
                            </div>
                            <div class="clickable" @click="onCardClick(item, 'Doing')">
                              <h6 class="color-dark font-semi-bold text-14 mb-1">{{ item.task }}</h6>
                              <p class="text-10 color-gray mb-2 task-description">{{ item.assignment_description }}</p>
                              <div class="d-flex align-items-center justify-content-start">
                                <div class="d-flex">
                                  <div v-for="(peer, index) in item.peers" :key="index">
                                    <img v-if="peer.profile_pic" :src="peer.profile_pic" alt=""
                                      class="img-avatar img-avatar--sm">
                                    <img v-else src="~/static/image/avatar.png" alt="" class="img-avatar img-avatar--sm">
                                  </div>
                                </div>
                                <!-- <div class="d-flex align-items-center">
                                  <button class="btn btn-drag-card-open">
                                    Open
                                  </button>
                                </div> -->
                              </div>
                            </div>
                          </div>
                        </drag>
                      </div>
                      <client-only>
                        <infinite-loading class="d-flex align-items-center w-100 justify-content-center"
                          :identifier="doingreloadCount" @infinite="doingNext">
                          <div slot="no-more"><span class="color-gray text-12">That's all!</span></div>
                          <div slot="no-results"><span class="color-gray text-12">No Assignments</span></div>
                        </infinite-loading>
                      </client-only>
                    
                    </div>
                  </drop>
                  </div>
              </div>
              <div class="col-12 col-sm-6 col-lg-3">
                  <div class="card card-tertiary pl-3 pr-2 pt-3 rounded-12 w-100 h-100">
                    <div class="d-flex flex-column pr-2">
                      <div class="d-flex align-items-center mb-3">
                        <span class="mr-2"><span class="bg-task-yellow p-1 rounded-circle d-flex"></span></span>
                        <p class="mb-0 color-dark font-medium text-14">Todo</p>
                      </div>
                      <span class="border-pb-1 bg-task-yellow w-100 d-flex mb-3"></span>
                    </div>
                    <drop class="drop color-secondary text-16 h-100 d-flex flex-column" 
                      @dragover="todoDropStart()"
                      @dragleave="todoDropEnd()"
                      @drop="confirmUndo">
                      <div class="drop-zone" :class="{ 'dropping': isDroppingTodo }"></div>
                    <div class="d-flex flex-column task-container pr-2 mb-3"> 
                      <div v-for="(item, index) in tempAssts" :key="item.id">
                        <drag :transfer-data="{ item, source: 'todoAssignments', sourceType: 'Pending' }"
                          @dragstart="handleDragStartTodo(index)" @dragend="handleDragEndTodo()">
                          <div class="card card-primary p-3 mb-3"
                            :class="{ 'draggingTodo': isDraggingTodo && index === draggingIndexTodo }">
                            <div class="d-flex align-items-center justify-content-between mb-2">
                              <div class="d-flex flex-wrap align-items-center">
                                <span class="task-label  my-1 mr-1" :class="{
                                  'task-label--yellow': item.priority == '1',
                                  'task-label--violet': item.priority == '2',
                                  'task-label--green': item.priority == '3',
                                  'task-label--red': item.priority == '4',
                                }"><span>{{
  item.priority == "1"
  ? "Urgent"
  : item.priority == "2"
    ? "Important"
    : item.priority == "3"
      ? "Can Wait"
      : item.priority == "4"
        ? "Overdue"
        : ""
}}</span></span>
                                <span class="task-label task-label--yellow my-1 mr-1"><span>{{
                                  item.subject.subject_name
                                  ? item.subject.subject_name
                                  : item.subject
                                }}</span></span>
                              </div>
                              <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                <div class="dropdown-select form-control" type="button" data-toggle="dropdown"
                                  aria-haspopup="true" aria-expanded="false">
                                  <span class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                    <i class="i-more-dotes j-icon i-xs bg-text-secondary"></i>
                                  </span>
                                </div>
                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0" aria-labelledby="dLabel">
                                  <li @click="onCardClick(item, 'Pending')" class="item px-2 py-1">Edit</li>
                                  <li @click="movetoDoing(item, 'Pending')" class="item px-2 py-1">
                                    Move to Doing
                                  </li>
                                  <li @click="movetoDone(item, 'Pending')" class="item px-2 py-1">
                                    Move to Done
                                  </li>
                                  <div v-if="item.shared_users_id != user_id">
                                    <li @click="onChooseMultiple(item.id)" class="item px-2 py-1">Remove</li>
                                  </div>
                                </ul>
                              </div>
                            </div>
                            <div class="clickable" @click="onCardClick(item, 'Pending')">
                              <h6 class="color-dark font-semi-bold text-14 mb-1">{{ item.task }}</h6>
                              <p class="text-10 color-gray mb-2 task-description">{{ item.assignment_description }}</p>
                              <div class="d-flex align-items-center justify-content-start">
                                <div class="d-flex">
                                  <div v-for="(peer, index) in item.peers" :key="index">
                                    <img v-if="peer.profile_pic" :src="peer.profile_pic" alt=""
                                      class="img-avatar img-avatar--sm">
                                    <img v-else src="~/static/image/avatar.png" alt="" class="img-avatar img-avatar--sm">
                                  </div>
                                </div>
                                <!-- <div class="d-flex align-items-center">
                                  <button class="btn btn-drag-card-open">
                                    Open
                                  </button>
                                </div> -->
                              </div>
                            </div>
                          </div>
                        </drag>
                      </div>
                      <client-only>
                        <infinite-loading class="d-flex align-items-center w-100 justify-content-center"
                          :identifier="reloadCount" @infinite="loadNext">
                          <div class="mb-2" slot="no-more"><span class="color-gray text-12">That's all!</span></div>
                          <div slot="no-results"><span class="color-gray text-12">No Assignments</span></div>
                        </infinite-loading>
                      </client-only>
                    </div>
                     </drop>
                  </div>
              </div>
              <div class="col-12 col-sm-6 col-lg-3">
                  <div class="card card-tertiary pl-3 pr-2 pt-3 rounded-12 w-100 h-100">
                    <div class="d-flex flex-column pr-2">
                      <div class="d-flex align-items-center mb-3">
                        <span class="mr-2"><span class="bg-task-green p-1 rounded-circle d-flex"></span></span>
                        <p class="mb-0 color-dark font-medium text-14">Done</p>
                      </div>
                      <span class="border-pb-1 bg-task-green w-100 d-flex mb-3"></span>
                    </div>
                    <drop class="drop color-secondary text-16 h-100 d-flex flex-column" 
                      @dragover="doneDropStart()"
                      @dragleave="doneDropEnd()"
                      @drop="handleDrop">
                      <div class="drop-zone" :class="{ 'dropping': isDroppingDone }">             
                      </div>
                    <div class="d-flex flex-column task-container pr-2 mb-3">
                      <div v-for="(item,index) in doneAssignmentsList" :key="item.id">
                        <drag :transfer-data="{ item, source: 'doneAssignments', sourceType: 'Done' }"
                        @dragstart="handleDragStartDone(index)" @dragend="handleDragEndDone()">

                          <div class="card card-primary p-3 mb-3" :class="{ 'draggingDone': isDraggingDone && index === draggingIndexDone }">
                            <div class="d-flex align-items-center justify-content-between mb-2">
                              <div class="d-flex flex-wrap align-items-center">
                                <span class="task-label  my-1 mr-1" :class="{
                                  'task-label--yellow': item.priority == '1',
                                  'task-label--violet': item.priority == '2',
                                  'task-label--green': item.priority == '3',
                                  'task-label--red': item.priority == '4',
                                }"><span> {{
  item.priority == "1"
  ? "Urgent"
  : item.priority == "2"
    ? "Important"
    : item.priority == "3"
      ? "Can Wait"
      : item.priority == "4"
        ? "Overdue"
        : ""
}}</span></span>
                                <span class="task-label task-label--green my-1 mr-1"><span>{{ item.subject.subject_name
                                  ? item.subject.subject_name
                                  : item.subject
                                }}</span></span>
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
                                                  <li @click="movetoDoing(item, 'Done')" class="item px-2 py-1">
                                    Move to Doing
                                  </li>
                                  <li @click="movetoTodo(item, 'Done')" class="item px-2 py-1">
                                    Move to Todo
                                  </li>
                                              </ul>
                                          </div>
                            </div>
                            <h6 class="color-dark font-semi-bold text-14 mb-1">{{ item.task }} </h6>
                            <p class="text-10 color-gray mb-2 task-description" v-html="item.assignment_description"></p>
                            <div class="d-flex align-items-center justify-content-start">
                              <div class="d-flex">
                                <div v-for="(peer, index) in item.peers" :key="index">
                                  <img v-if="peer.profile_pic" :src="peer.profile_pic" alt=""
                                    class="img-avatar img-avatar--sm">
                                  <img v-else src="~/static/image/avatar.png" alt="" class="img-avatar img-avatar--sm">
                                </div>
                              </div>
                              <!-- <div class="d-flex align-items-center">
                                <button class="btn btn-drag-card-open">
                                  Open
                                </button>
                              </div> -->
                            </div>
                          </div>
                        </drag>
                      </div>
                      <client-only>
                        <infinite-loading class="d-flex align-items-center w-100 justify-content-center"
                          :identifier="donereloadCount" @infinite="doneNext">
                          <div slot="no-more"><span class="color-gray text-12">That's all!</span></div>
                          <div slot="no-results"><span class="color-gray text-12">No Assignments</span></div>
                        </infinite-loading>
                      </client-only>
                    </div>
                  </drop>
                  </div> 
              </div>
              <div class="col-12 col-sm-6 col-lg-3">
                <div class="card card-tertiary pl-3 pr-2 pt-3 rounded-12 w-100 h-100">
                  <div class="d-flex flex-column pr-2">
                    <div class="d-flex align-items-center mb-3">
                      <span class="mr-2">
                        <span class="bg-task-red p-1 rounded-circle d-flex">
                        </span>
                      </span>
                      <p class="mb-0 color-dark font-medium text-14">Overdue</p>
                    </div>
                    <span class="border-pb-1 bg-task-red w-100 d-flex mb-3"></span>
                  </div>
                  <div class="d-flex flex-column task-container pr-2 mb-3">
                    <div v-for="(item,index) in overdueAssignments" :key="item.id">
                      <drag :transfer-data="{ item, source: 'overdueAssignments', sourceType: 'Overdue' }"
                      @dragstart="handleDragStartDue(index)" @dragend="handleDragEndDue()">
                        <div class="card card-primary p-3 mb-3" :class="{ 'draggingDue': isDraggingDue && index === draggingIndexDue }">
                          <div class="d-flex align-items-center justify-content-between mb-2">
                            <div class="d-flex flex-wrap align-items-center">
                              <span class="task-label  my-1 mr-1" :class="{
                                'task-label--yellow': item.priority == '1',
                                'task-label--violet': item.priority == '2',
                                'task-label--green': item.priority == '3',
                                'task-label--red': item.priority == '4',
                              }"><span> {{
  item.priority == "1"
  ? "Urgent"
  : item.priority == "2"
    ? "Important"
    : item.priority == "3"
      ? "Can Wait"
      : item.priority == "4"
        ? "Overdue"
        : ""
}}</span></span>
                              <span class="task-label task-label--red my-1 mr-1"><span> {{
                                item.subject.subject_name
                                ? item.subject.subject_name
                                : item.subject
                              }} </span></span>
                            </div>
                            <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                              <div class="dropdown-select form-control" type="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <span class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                  <i class="i-more-dotes j-icon i-xs bg-text-secondary"></i>
                                </span>
                              </div>
                              <ul class="dropdown-menu w-100 rounded-12 p-2 end-0" aria-labelledby="dLabel">
                                <li @click="onCardClick(item, 'Overdue')" class="item px-2 py-1">Edit</li>
                                <li @click="movetoDoing(item, 'Overdue')" class="item px-2 py-1">
                                    Move to Doing
                                  </li>
                                  <li @click="movetoTodo(item, 'Overdue')" class="item px-2 py-1">
                                    Move to ToDo
                                  </li>
                                  <li  @click="movetoDone(item, 'Overdue')" class="item px-2 py-1">
                                    Move to Done
                                  </li>
                                <div v-if="item.shared_users_id != user_id">
                                  <li @click="onChooseMultiple(item.id)" class="item px-2 py-1">Remove</li>
                                </div>
                              </ul>
                            </div>
                          </div>
                          <div class="clickable" @click="onCardClick(item, 'Overdue')">
                            <h6 class="color-dark font-semi-bold text-14 mb-1">{{ item.task }}</h6>
                            <p class="text-10 color-gray mb-2 task-description">{{ item.assignment_description }}</p>
                            <div class="d-flex align-items-center justify-content-start">
                              <div class="d-flex">
                                <div v-for="(peer, index) in item.peers" :key="index">
                                  <img v-if="peer.profile_pic" :src="peer.profile_pic" alt=""
                                    class="img-avatar img-avatar--sm">
                                  <img v-else src="~/static/image/avatar.png" alt="" class="img-avatar img-avatar--sm">
                                </div>
                              </div>
                              <!-- <div class="d-flex align-items-center">
                                <button class="btn btn-drag-card-open">
                                  Open
                                </button>
                              </div> -->
                            </div>
                          </div>
                        </div>
                      </drag>
                    </div>
                    <client-only>
                      <infinite-loading class="d-flex align-items-center w-100 justify-content-center"
                        :identifier="overduereloadCount" @infinite="overdueNext">
                        <div slot="no-more"><span class="color-gray text-12">That's all!</span></div>
                        <div slot="no-results"><span class="color-gray text-12">No Assignments</span></div>
                      </infinite-loading>
                    </client-only>
                  </div>
                </div>
              </div>
            </div>

            <div class="row h-100 d-none">
              <div class="col-12 col-sm-6 col-lg-3">
                
                  <div class="card card-tertiary pl-3 pr-2 pt-3 rounded-12 w-100 h-100">
                    <div class="d-flex flex-column pr-2">
                      <div class="d-flex align-items-center mb-3">
                        <span class="mr-2"><span class="bg-task-violet p-1 rounded-circle d-flex"></span></span>
                        <p class="mb-0 color-dark font-medium text-14">Doing</p>
                      </div>
                      <span class="border-pb-1 bg-task-violet w-100 d-flex mb-3"></span>
                    </div>
                    <div class="d-flex flex-column task-container pr-2 mb-3">
                      <drop class="drop color-secondary text-16 h-100 d-flex flex-column"
                      @dragover="doingDropStart()"
                      @dragleave="doingDropEnd()"
                      @drop="doingDrop">
                      <div class="drop-zone" :class="{ 'dropping': isDropping }"></div>
                      <div v-for="(item, index) in doingAssignments" :key="item.id">
                        <drag :transfer-data="{ item, source: 'doingAssignments', sourceType: 'Doing' }"
                          @dragstart="handleDragStart(index)" @dragend="handleDragEnd()">
                          <div class="card card-primary p-3 mb-3"
                            :class="{ 'dragging': isDragging && index === draggingIndex }">
                            <div class="d-flex align-items-center justify-content-between mb-2">
                              <div class="d-flex flex-wrap align-items-center">
                                <span class="task-label  my-1 mr-1" :class="{
                                  'task-label--yellow': item.priority == '1',
                                  'task-label--violet': item.priority == '2',
                                  'task-label--green': item.priority == '3',
                                  'task-label--red': item.priority == '4',
                                }"><span>{{
  item.priority == "1"
  ? "Urgent"
  : item.priority == "2"
    ? "Important"
    : item.priority == "3"
      ? "Can Wait"
      : item.priority == "4"
        ? "Overdue"
        : ""
}}</span></span>
                                <span class="task-label task-label--violet my-1 mr-1"><span>{{
                                  item.subject.subject_name
                                  ? item.subject.subject_name
                                  : item.subject
                                }}</span></span>
                              </div>
                              <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                <div class="dropdown-select form-control" type="button" data-toggle="dropdown"
                                  aria-haspopup="true" aria-expanded="false">
                                  <span class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                    <i class="i-more-dotes j-icon i-xs bg-text-secondary"></i>
                                  </span>
                                </div>
                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0" aria-labelledby="dLabel">
                                  <li @click="onCardClick(item, 'Doing')" class="item px-2 py-1">
                                    Edit
                                  </li>
                                  <div v-if="item.shared_users_id != user_id">
                                    <li @click="onChooseMultiple(item.id)" class="item px-2 py-1">Remove</li>
                                  </div>
                                </ul>
                              </div>
                            </div>
                            <div class="clickable" @click="onCardClick(item, 'Doing')">
                              <h6 class="color-dark font-semi-bold text-14 mb-1">{{ item.task }}</h6>
                              <p class="text-10 color-gray mb-2 task-description">{{ item.assignment_description }}</p>
                              <div class="d-flex align-items-center justify-content-start">
                                <div class="d-flex">
                                  <div v-for="(peer, index) in item.peers" :key="index">
                                    <img v-if="peer.profile_pic" :src="peer.profile_pic" alt=""
                                      class="img-avatar img-avatar--sm">
                                    <img v-else src="~/static/image/avatar.png" alt="" class="img-avatar img-avatar--sm">
                                  </div>
                                </div>
                                <!-- <div class="d-flex align-items-center">
                                  <button class="btn btn-drag-card-open">
                                    Open
                                  </button>
                                </div> -->
                              </div>
                            </div>
                          </div>
                        </drag>
                      </div>
                      <client-only>
                        <infinite-loading class="d-flex align-items-center w-100 justify-content-center"
                          :identifier="doingreloadCount" @infinite="doingNext">
                          <div slot="no-more"><span class="color-gray text-12">That's all!</span></div>
                          <div slot="no-results"><span class="color-gray text-12">No Assignments</span></div>
                        </infinite-loading>
                      </client-only>
                    </drop>
                    </div>
                  </div>
              </div>
              <div class="col-12 col-sm-6 col-lg-3">
                  <div class="card card-tertiary pl-3 pr-2 pt-3 rounded-12 w-100 h-100">
                    <div class="d-flex flex-column pr-2">
                      <div class="d-flex align-items-center mb-3">
                        <span class="mr-2"><span class="bg-task-yellow p-1 rounded-circle d-flex"></span></span>
                        <p class="mb-0 color-dark font-medium text-14">Todo</p>
                      </div>
                      <span class="border-pb-1 bg-task-yellow w-100 d-flex mb-3"></span>
                    </div>
                    <div class="d-flex flex-column task-container pr-2 mb-3">
                      <drop class="drop color-secondary text-16 h-100 d-flex flex-column" 
                      @dragover="todoDropStart()"
                      @dragleave="todoDropEnd()"
                      @drop="confirmUndo">
                      <div class="drop-zone" :class="{ 'dropping': isDroppingTodo }"></div>
                      <div v-for="(item, index) in tempAssts" :key="item.id">
                        <drag :transfer-data="{ item, source: 'todoAssignments', sourceType: 'Pending' }"
                          @dragstart="handleDragStartTodo(index)" @dragend="handleDragEndTodo()">
                          <div class="card card-primary p-3 mb-3"
                            :class="{ 'draggingTodo': isDraggingTodo && index === draggingIndexTodo }">
                            <div class="d-flex align-items-center justify-content-between mb-2">
                              <div class="d-flex flex-wrap align-items-center">
                                <span class="task-label  my-1 mr-1" :class="{
                                  'task-label--yellow': item.priority == '1',
                                  'task-label--violet': item.priority == '2',
                                  'task-label--green': item.priority == '3',
                                  'task-label--red': item.priority == '4',
                                }"><span>{{
  item.priority == "1"
  ? "Urgent"
  : item.priority == "2"
    ? "Important"
    : item.priority == "3"
      ? "Can Wait"
      : item.priority == "4"
        ? "Overdue"
        : ""
}}</span></span>
                                <span class="task-label task-label--yellow my-1 mr-1"><span>{{
                                  item.subject.subject_name
                                  ? item.subject.subject_name
                                  : item.subject
                                }}</span></span>
                              </div>
                              <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                <div class="dropdown-select form-control" type="button" data-toggle="dropdown"
                                  aria-haspopup="true" aria-expanded="false">
                                  <span class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                    <i class="i-more-dotes j-icon i-xs bg-text-secondary"></i>
                                  </span>
                                </div>
                                <ul class="dropdown-menu w-100 rounded-12 p-2 end-0" aria-labelledby="dLabel">
                                  <li @click="onCardClick(item, 'Pending')" class="item px-2 py-1">Edit</li>
                                  <div v-if="item.shared_users_id != user_id">
                                    <li @click="onChooseMultiple(item.id)" class="item px-2 py-1">Remove</li>
                                  </div>
                                </ul>
                              </div>
                            </div>
                            <div class="clickable" @click="onCardClick(item, 'Pending')">
                              <h6 class="color-dark font-semi-bold text-14 mb-1">{{ item.task }}</h6>
                              <p class="text-10 color-gray mb-2 task-description">{{ item.assignment_description }}</p>
                              <div class="d-flex align-items-center justify-content-start">
                                <div class="d-flex">
                                  <div v-for="(peer, index) in item.peers" :key="index">
                                    <img v-if="peer.profile_pic" :src="peer.profile_pic" alt=""
                                      class="img-avatar img-avatar--sm">
                                    <img v-else src="~/static/image/avatar.png" alt="" class="img-avatar img-avatar--sm">
                                  </div>
                                </div>
                                <!-- <div class="d-flex align-items-center">
                                  <button class="btn btn-drag-card-open">
                                    Open
                                  </button>
                                </div> -->
                              </div>
                            </div>
                          </div>
                        </drag>
                      </div>
                      <client-only>
                        <infinite-loading class="d-flex align-items-center w-100 justify-content-center"
                          :identifier="reloadCount" @infinite="loadNext">
                          <div class="mb-2" slot="no-more"><span class="color-gray text-12">That's all!</span></div>
                          <div slot="no-results"><span class="color-gray text-12">No Assignments</span></div>
                        </infinite-loading>
                      </client-only>
                    </drop>
                    </div>
                  </div>
              </div>
              <div class="col-12 col-sm-6 col-lg-3">
                  <div class="card card-tertiary pl-3 pr-2 pt-3 rounded-12 w-100 h-100">
                    <div class="d-flex flex-column pr-2">
                      <div class="d-flex align-items-center mb-3">
                        <span class="mr-2"><span class="bg-task-green p-1 rounded-circle d-flex"></span></span>
                        <p class="mb-0 color-dark font-medium text-14">Done</p>
                      </div>
                      <span class="border-pb-1 bg-task-green w-100 d-flex mb-3"></span>
                    </div>
                    <div class="d-flex flex-column task-container pr-2 mb-3">
                      <drop class="drop color-secondary text-16 h-100 d-flex flex-column" 
                      @dragover="doneDropStart()"
                      @dragleave="doneDropEnd()"
                      @drop="handleDrop">
                      <!-- <div class="drop-zone" :class="{ 'dropping': isDroppingDone }"></div> -->
                      <div v-for="(item,index) in doneAssignmentsList" :key="item.id">
                        <drag :transfer-data="{ item, source: 'doneAssignments', sourceType: 'Done' }"
                        @dragstart="handleDragStartDone(index)" @dragend="handleDragEndDone()">

                          <div class="card card-primary p-3 mb-3" :class="{ 'draggingDone': isDraggingDone && index === draggingIndexDone }">
                            <div class="d-flex align-items-center justify-content-between mb-2">
                              <div class="d-flex flex-wrap align-items-center">
                                <span class="task-label  my-1 mr-1" :class="{
                                  'task-label--yellow': item.priority == '1',
                                  'task-label--violet': item.priority == '2',
                                  'task-label--green': item.priority == '3',
                                  'task-label--red': item.priority == '4',
                                }"><span> {{
  item.priority == "1"
  ? "Urgent"
  : item.priority == "2"
    ? "Important"
    : item.priority == "3"
      ? "Can Wait"
      : item.priority == "4"
        ? "Overdue"
        : ""
}}</span></span>
                                <span class="task-label task-label--green my-1 mr-1"><span>{{ item.subject.subject_name
                                  ? item.subject.subject_name
                                  : item.subject
                                }}</span></span>
                              </div>
                              <!-- <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                                              <div class="dropdown-select form-control" type="button"
                                                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                  <span
                                                      class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                                      <i class="i-more-dotes j-icon i-xs bg-text-secondary"></i>
                                                  </span>
                                              </div>
                                              <ul class="dropdown-menu w-100 rounded-12 p-2 end-0"
                                                  aria-labelledby="dLabel">
                                                  <li @click="onCardClick(item)" class="item p-2">Edit</li>
                                                  <li @click="onChooseMultiple(item.id)" class="item p-2">Remove</li>
                                              </ul>
                                          </div> -->
                            </div>
                            <h6 class="color-dark font-semi-bold text-14 mb-1">{{ item.task }} </h6>
                            <p class="text-10 color-gray mb-2 task-description" v-html="item.assignment_description"></p>
                            <div class="d-flex align-items-center justify-content-start">
                              <div class="d-flex">
                                <div v-for="(peer, index) in item.peers" :key="index">
                                  <img v-if="peer.profile_pic" :src="peer.profile_pic" alt=""
                                    class="img-avatar img-avatar--sm">
                                  <img v-else src="~/static/image/avatar.png" alt="" class="img-avatar img-avatar--sm">
                                </div>
                              </div>
                              <!-- <div class="d-flex align-items-center">
                                <button class="btn btn-drag-card-open">
                                  Open
                                </button>
                              </div> -->
                            </div>
                          </div>
                        </drag>
                      </div>
                      <client-only>
                        <infinite-loading class="d-flex align-items-center w-100 justify-content-center"
                          :identifier="donereloadCount" @infinite="doneNext">
                          <div slot="no-more"><span class="color-gray text-12">That's all!</span></div>
                          <div slot="no-results"><span class="color-gray text-12">No Assignments</span></div>
                        </infinite-loading>
                      </client-only>
                    </drop>
                    </div>
                  </div> 
              </div>
              <div class="col-12 col-sm-6 col-lg-3">
                <div class="card card-tertiary pl-3 pr-2 pt-3 rounded-12 w-100 h-100">
                  <div class="d-flex flex-column pr-2">
                    <div class="d-flex align-items-center mb-3">
                      <span class="mr-2">
                        <span class="bg-task-red p-1 rounded-circle d-flex">
                        </span>
                      </span>
                      <p class="mb-0 color-dark font-medium text-14">Overdue</p>
                    </div>
                    <span class="border-pb-1 bg-task-red w-100 d-flex mb-3"></span>
                  </div>
                  <div class="d-flex flex-column task-container pr-2 mb-3">
                    <div v-for="(item,index) in overdueAssignments" :key="item.id">
                      <drag :transfer-data="{ item, source: 'overdueAssignments', sourceType: 'Overdue' }"
                      @dragstart="handleDragStartDue(index)" @dragend="handleDragEndDue()">
                        <div class="card card-primary p-3 mb-3" :class="{ 'draggingDue': isDraggingDue && index === draggingIndexDue }">
                          <div class="d-flex align-items-center justify-content-between mb-2">
                            <div class="d-flex flex-wrap align-items-center">
                              <span class="task-label  my-1 mr-1" :class="{
                                'task-label--yellow': item.priority == '1',
                                'task-label--violet': item.priority == '2',
                                'task-label--green': item.priority == '3',
                                'task-label--red': item.priority == '4',
                              }"><span> {{
  item.priority == "1"
  ? "Urgent"
  : item.priority == "2"
    ? "Important"
    : item.priority == "3"
      ? "Can Wait"
      : item.priority == "4"
        ? "Overdue"
        : ""
}}</span></span>
                              <span class="task-label task-label--red my-1 mr-1"> <span>{{
                                item.subject.subject_name
                                ? item.subject.subject_name
                                : item.subject
                              }} </span></span>
                            </div>
                            <div class="dropdown dropdown-void form-row d-inline-flex w-auto">
                              <div class="dropdown-select form-control" type="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <span class="icon icon-sm icon--more d-flex align-items-center justify-content-center">
                                  <i class="i-more-dotes j-icon i-xs bg-text-secondary"></i>
                                </span>
                              </div>
                              <ul class="dropdown-menu w-100 rounded-12 p-2 end-0" aria-labelledby="dLabel">
                                <li @click="onCardClick(item, 'Overdue')" class="item px-2 py-1">Edit</li>
                                <div v-if="item.shared_users_id != user_id">
                                  <li @click="onChooseMultiple(item.id)" class="item px-2 py-1">Remove</li>
                                </div>
                              </ul>
                            </div>
                          </div>
                          <div class="clickable" @click="onCardClick(item, 'Overdue')">
                            <h6 class="color-dark font-semi-bold text-14 mb-1">{{ item.task }}</h6>
                            <p class="text-10 color-gray mb-2 task-description">{{ item.assignment_description }}</p>
                            <div class="d-flex align-items-center justify-content-start">
                              <div class="d-flex">
                                <div v-for="(peer, index) in item.peers" :key="index">
                                  <img v-if="peer.profile_pic" :src="peer.profile_pic" alt=""
                                    class="img-avatar img-avatar--sm">
                                  <img v-else src="~/static/image/avatar.png" alt="" class="img-avatar img-avatar--sm">
                                </div>
                              </div>
                              <!-- <div class="d-flex align-items-center">
                                <button class="btn btn-drag-card-open">
                                  Open
                                </button>
                              </div> -->
                            </div>
                          </div>
                        </div>
                      </drag>
                    </div>
                    <client-only>
                      <infinite-loading class="d-flex align-items-center w-100 justify-content-center"
                        :identifier="overduereloadCount" @infinite="overdueNext">
                        <div slot="no-more"><span class="color-gray text-12">That's all!</span></div>
                        <div slot="no-results"><span class="color-gray text-12">No Assignments</span></div>
                      </infinite-loading>
                    </client-only>
                  </div>
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
                {{ isAddAssignment ? "Add" : "Edit" }} Assignment
              </h3>
              <!-- grades section -->
              <div class="d-flex align-items-center mb-2 ml-auto" v-if="submissionId && grade && gradePossible">
                <p class="mb-0">Grade</p><span class="px-1">:</span>
                <p class="mb-0 bg-primary-light01 px-2 rounded-pill font-semi-bold color-primary"><span>{{
                  grade
                }}</span>/<span>{{ gradePossible }}</span></p>
                <!-- <span v-if="gradePossible"
                                      >Grade Possible</span
                                    >: -->
              </div>
              <!-- grades section end -->
            </div>
            <div class="modal-body px-3">
              <form v-if="!isSharedAssignment" ref="assignmentForm" id="assignmentForm">
                <div class="form-group mb-2">
                  <label for="recipient-name" class="col-form-label py-1">Subject here<em>*</em></label>
                  <input v-if="schoologyAssignment == '1'" type="text" class="form-control" v-model="gg4lSubject"
                    maxlength="100" placeholder="Enter assignment name" />
                  <!-- <select v-else class="form-control" tabindex="" v-model="subject" :class="{
                    'is-invalid':
                      submitted && $v.subject.$error,
                  }">
                    <option value="">Select subject</option>
                    <option v-bind:value="{
                      id: subjects.id,
                      text: subjects.subject_name,
                    }" v-for="(subjects, index) in subjectsData" :key="index">
                      {{ subjects.subject_name }}
                    </option>
                    <option v-if="subjectsData.length == 0">
                      No data
                    </option>
                  </select>
                  <div v-if="submitted && $v.subject.$error" class="invalid-feedback">
                    <span v-if="!$v.subject.required">This field is required</span>
                  </div> -->
                  <div v-else
                    class="dropdown"
                  >
                    <div
                      class="dropdown-select d-inline-flex form-control rounded-8 border border--form color-secondary font-normal text-16 pr-2"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      :class="{
                      'is-invalid':
                      submitted && $v.subject.$error,
                  }"
                    >
                      <span id="dLabel" class="mr-auto color-secondary text-truncate">
                        {{ subject ? subject.text : 'Select Subject' }}</span
                      >
                      <span class="caret color-secondary"
                        ><i class="fas fa-chevron-down font-medium"></i
                      ></span>
                    </div>

                    <ul
                      class="dropdown-menu w-100 rounded-12 border border--form mt-0 p-2"
                      aria-labelledby="dLabel"
                    >
                      <li v-for="(subjects, index) in subjectsData" :key="index" class="item p-2" @click="selectSubject(subjects)">
                        {{ subjects.subject_name }}
                      </li>
                      <li v-if="subjectsData.length == 0">
                      No data
                      </li>
                      <div v-if="submitted && $v.subject.$error" class="invalid-feedback">
                      <span v-if="!$v.subject.required">This field is required</span>
                  </div>
                    </ul>
                  </div>
                </div>
                <div class="form-group mb-2">
                  <label for="assignment-name" class="col-form-label py-1">Assignment Name<em>*</em></label>
                  <input type="text" class="form-control" v-model="assignmentName" placeholder="Enter assignment name"
                    :class="{
                      'is-invalid':
                        submitted && $v.assignmentName.$error,
                    }" />
                  <div v-if="submitted && $v.assignmentName.$error" class="invalid-feedback">
                    <span v-if="!$v.assignmentName.required">This field is required</span>
                  </div>
                </div>
                <div class="form-group mb-2">
                  <label for="message-text" class="col-form-label py-1">Task</label>
                  <textarea class="form-control" id="message-text" rows="3" v-model="assignmentDescription"
                    maxlength="500" placeholder="Enter assignment description"></textarea>
                </div>
                <div class="row">
                  <div class="col-md-6 ml-auto py-0">
                    <div class="form-group mb-2 mb-0">
                      <label for="recipient-name" class="col-form-label py-1">Priority<em>*</em></label>
                      <div class="dropdown input-icon-area">
                        <button id="dLabel" class="dropdown-select form-control text-left" type="button"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span class="">
                            {{
                              priorityVal
                              ? priorityVal
                              : "Select priority"
                            }}</span>
                        </button>
                        <ul class="dropdown-menu border" aria-labelledby="dLabel">
                          <li @click="priorityVal = 'Can Wait'" class="item low-color">
                            <span>Can Wait</span>
                          </li>
                          <li @click="priorityVal = 'Important'" class="item medium-color">
                            <span>Important</span>
                          </li>
                          <li @click="priorityVal = 'Urgent'" class="item high-color">
                            <span>Urgent</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="submitted &&
                      priorityVal != 'Urgent' &&
                      priorityVal != 'Important' &&
                      priorityVal != 'Can Wait'
                      " class="invalid-feedback" style="display: block">
                      <span v-if="priorityVal != 'Urgent' &&
                        priorityVal != 'Important' &&
                        priorityVal != 'Can Wait'
                        ">This field is required</span>
                    </div>
                  </div>
                  <div class="col-md-6 ml-auto py-0">
                    <div class="form-group mb-2">
                      <label for="recipient-name" class="col-form-label py-1">Date<em>*</em></label>
                      <date-picker class="form-control dropdown-menu-top" placeholder="MM/DD/YYYY" format="MM/dd/yyyy"
                        v-model="dateValue" :class="{
                          'is-invalid':
                            submitted && $v.dateValue.$error,
                        }" :disabled-dates="disabledDates" />
                      <div v-if="submitted && $v.dateValue.$error" class="invalid-feedback">
                        <span v-if="!$v.dateValue.required">This field is required</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-0">
                  <div class="col-6">
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label">Time<em>*</em></label>
                      <div>
                        <vue-timepicker @change="checkValidTime" close-on-complete format="hh:mm A" v-model="timeValue"
                          name="timeValue" class="show-cursor dropdown-menu-top" :value="timeValue" :class="{
                            'is-invalid':
                              submitted &&
                              ($v.timeValue.$error ||
                                !validTime),
                          }"></vue-timepicker>
                        <div v-if="submitted &&
                          ($v.timeValue.$error || !validTime)
                          " class="invalid-feedback">
                          <span v-if="!$v.timeValue.required ||
                            !validTime
                            ">Not a valid time</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h6 class="color-dark font-semi-bold mb-0">
                    Sub Tasks
                  </h6>
                  <a @click="onAddSubTaskClick" class="btn p-0">
                    <span class="color-secondary"><i class="fas fa-plus-circle"></i></span>
                  </a>
                </div>
                <div v-if="addSubTask" class="d-flex flex-row align-items-start">
                  <div class="form-row mb-2 mx-0 mr-2 w-100">
                    <label class="form-label" for="name">Add a sub-task</label>
                    <input type="text" maxlength="100" v-model="subTaskName" class="form-control" />
                  </div>
                  <div class="pt-4">
                    <button class="btn btn-primary btn-sm mt-1" @click="onAddNewSubTask">
                      Add
                    </button>
                  </div>
                </div>
                <!-- <div
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
                          </div> -->

                <div class="custom-overflow pr-2 mr--2 d-flex flex-column">
                  <div v-if="isAddAssignment === false">
                    <div v-for="subTask in subTasksList" :key="subTask.id">
                      <div class="card card-transparent show-icon p-1 mb-1">
                        <div class="d-flex align-items-center justify-content-between">
                          <div class="p-1 form-group checkbox">
                            <!-- @click="confirmSubTaskComplete($event, subTask.id, subTask.task_status,subTask)" -->
                            <input :id="subTask.id" class="mr-2 cursor-pointer" type="checkbox"
                              v-model="subTask.isTaskCompleted" @change="updateTaskIds(subTask.id)" />
                            <label :for="subTask.id">{{ subTask.title }}</label>
                          </div>
                          <span v-if="subTask.task_status != 'Completed'
                            " @click="deleteSubTask(subTask)"
                            class="color-primary-dark fa-icon show-hover d-none btn p-0"><i
                              class="fas fa-trash-alt"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div v-for="subTask in subTasksList" :key="subTask.id">
                      <div class="card card-transparent show-icon p-1 mb-1">
                        <div class="d-flex align-items-center justify-content-between">
                          <!-- <p
                                          class="mb-0 color-secondary text-16 font-regular word-break pr-3"
                                        >
                                          <span
                                            class="subtask-btn mr-1"
                                            :class="{
                                              selected:
                                                subTask.task_status ==
                                                'Completed',
                                            }"
                                            ><i></i
                                          ></span>
                                          <span>{{ subTask.title }}</span>
                                        </p> -->
                          <div class="p-1 form-group checkbox">
                            <!-- @click="confirmSubTaskComplete($event, subTask.id, subTask.task_status,subTask)" -->
                            <input :id="subTask.id" class="mr-2 cursor-pointer" type="checkbox" />
                            <label :for="subTask.id">{{ subTask.title }}</label>
                          </div>
                          <span v-if="subTask.task_status != 'Completed'
                            " @click="deleteSubTask(subTask)"
                            class="color-primary-dark fa-icon show-hover d-none btn p-0"><i
                              class="fas fa-trash-alt"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Additional Material Add -->
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h6 class="color-dark font-semi-bold mb-0">
                    Invite Peers
                  </h6>
                  <a @click="onInviteClick" class="btn p-0">
                    <span class="color-secondary"><i class="fas fa-plus-circle"></i></span>
                  </a>
                </div>
                <div v-if="invitePeer" class="d-flex flex-row align-items-start">
                  <div class="form-row mb-2 mx-0 mr-2 w-100">
                    <label class="form-label" for="name">Invite peers</label>
                    <!-- <input type="text" class="form-control" /> -->
                    <multiselect v-model="peerSelected" :options="students" track-by="first_name" label="first_name"
                      :placeholder="peerSelected.length > 3
                        ? ''
                        : 'Select students'
                        " :multiple="true" :max="4">
                      <span slot="maxElements">Maximum of 4 students selected</span>
                      <span slot="noResult">No data found</span>
                    </multiselect>
                  </div>
                  <div class="pt-4">
                    <button @click="onInvitePeer" class="btn btn-primary btn-sm mt-1">
                      {{ isAddAssignment ? "Add" : "Save" }}
                    </button>
                  </div>
                </div>
                <div class="hidden-scroll px-3 row my-0">
                  <div v-for="peer of peerList" :key="peer.id"
                    class="h-fit-content show-icon d-flex align-items-center position-realtive">
                    <div class="d-flex align-items-center my-2 mr-3">
                      <div class="ld-img-section position-relative mr-2 d-flex flex-column">
                        <div class="ld-img-holder">
                          <img v-if="peer.profile_pic" :src="peer.profile_pic" alt="" />
                          <img v-else src="~/static/image/avatar.png" alt="" />
                        </div>
                        <button type="button" role="button"
                          class="btn btn-tag-remove position-absolute left-0 rounded-circle d-none" @click="
                            removePeerConfirm(peer.id, $event)
                            ">
                          <span class="color-primary-dark fa-icon show-hover btn p-0 ml-05"><i
                              class="fas fa-trash-alt color-danger"></i></span>
                        </button>
                      </div>
                      <div class="ld-details-section">
                        <p class="ld-heading mb-0">
                          {{ peer.first_name }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h6 class="color-dark font-semi-bold mb-0">
                    Additional Material
                  </h6>
                  <a @click="onAdditionalMatClick" class="btn p-0">
                    <span class="color-secondary"><i class="fas fa-plus-circle"></i></span>
                  </a>
                </div>
                <div v-if="additionalMaterial" class="d-flex flex-row align-items-start">
                  <div class="form-row mb-2 mx-0 mr-2 w-100">
                    <label class="form-label" for="name">Add Additional Material</label>
                    <!-- <input type="text" class="form-control" /> -->
                    <select v-model="materialType" class="form-select form-control mb-2"
                      aria-label="Default select example">
                      <option value="">
                        Choose material type
                      </option>
                      <option value="file">File</option>
                      <option value="link">Link</option>
                    </select>
                    <div class="row m-0">
                      <div class="col-12 py-0">
                        <input v-if="materialType == 'file'" type="file" class="form-control px-2"
                          placeholder="Upload File" @change="onFileChange" id="fileUpload"
                          accept=".png,.jpeg,.jpg,.pdf" />
                      </div>
                      <div class="col-12 py-0">
                        <input v-if="materialType == 'link'" type="text" class="form-control px-2"
                          placeholder="Paste Link" v-model="link" />
                      </div>
                      <div class="col-3 p-0"></div>
                    </div>
                  </div>
                  <div class="pt-4">
                    <button type="button" @click="UploadAttachment" class="btn btn-primary btn-sm mt-1">
                      Add
                    </button>
                  </div>
                </div>
                <div class="hidden-scroll px-3 row my-0">
                  <div v-for="item of additionalMaterialList" :key="item.id" class="h-fit-content cursor-pointer w-100">
                    <div v-if="item.link"
                      class="d-flex align-items-center justify-content-between my-2 mr-3 min-w-200 w-100 show-icon">
                      <div class="ld-details-section w-100">
                        <p @click="openLink(item)" class="ld-heading mb-1 text-link text-truncate">
                          <!-- {{ peer.first_name }} -->
                          {{ item.link }}
                        </p>
                      </div>
                      <span class="color-primary-dark fa-icon show-hover d-none btn p-0"
                        @click="deleteAdditionalMat(item)"><i class="fas fa-trash-alt"></i></span>
                    </div>
                    <div v-else
                      class="d-flex align-items-center justify-content-between my-2 mr-3 min-w-200 w-100 show-icon">
                      <div class="ld-details-section w-100">
                        <p @click="openLink(item)" class="ld-heading mb-1 text-link text-truncate">
                          <!-- {{ peer.first_name }} -->
                          {{
                            item.file_type &&
                            item.file_type != "link"
                            ? item.file_name
                            : item.material
                          }}
                        </p>
                      </div>
                      <span class="color-primary-dark fa-icon show-hover d-none btn p-0"
                        @click="deleteAdditionalMat(item)"><i class="fas fa-trash-alt"></i></span>
                    </div>
                  </div>
                </div>
              </form>
              <form v-if="isSharedAssignment" ref="assignmentForm" id="assignmentForm">
                <div class="form-group mb-2">
                  <label for="recipient-name" class="col-form-label py-1">Subject here<em>*</em></label>
                  <input v-if="schoologyAssignment == '1'" type="text" disabled="disabled" class="form-control" v-model="gg4lSubject"
                    maxlength="100" placeholder="Enter assignment name" />
                  <!-- <select v-else class="form-control" tabindex="" v-model="subject" :class="{
                    'is-invalid':
                      submitted && $v.subject.$error,
                  }">
                    <option value="">Select subject</option>
                    <option v-bind:value="{
                      id: subjects.id,
                      text: subjects.subject_name,
                    }" v-for="(subjects, index) in subjectsData" :key="index">
                      {{ subjects.subject_name }}
                    </option>
                    <option v-if="subjectsData.length == 0">
                      No data
                    </option>
                  </select>
                  <div v-if="submitted && $v.subject.$error" class="invalid-feedback">
                    <span v-if="!$v.subject.required">This field is required</span>
                  </div> -->
                  <div v-else
                    class="dropdown"
                  >
                    <div
                      class="dropdown-select d-inline-flex form-control rounded-8 border border--form color-secondary font-normal text-16 pr-2 disabled"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      :class="{
                      'is-invalid':
                      submitted && $v.subject.$error,
                  }"
                    >
                      <span id="dLabel" class="mr-auto color-secondary text-truncate">
                        {{ subject }}</span
                      >
                      <span class="caret color-secondary"
                        ><i class="fas fa-chevron-down font-medium"></i
                      ></span>
                    </div>

                    <ul
                      class="dropdown-menu w-100 rounded-12 border border--form mt-0 p-2"
                      aria-labelledby="dLabel"
                    >
                      <li v-for="(subjects, index) in subjectsData" :key="index" class="item p-2" @click="selectSubject(subjects)">
                        {{ subjects.subject_name }}
                      </li>
                      <li v-if="subjectsData.length == 0">
                      No data
                      </li>
                      <div v-if="submitted && $v.subject.$error" class="invalid-feedback">
                      <span v-if="!$v.subject.required">This field is required</span>
                  </div>
                    </ul>
                  </div>
                </div>
                <div class="form-group mb-2">
                  <label for="assignment-name" class="col-form-label py-1">Assignment Name<em>*</em></label>
                  <input type="text" disabled="disabled" class="form-control" v-model="assignmentName" placeholder="Enter assignment name"
                    :class="{
                      'is-invalid':
                        submitted && $v.assignmentName.$error,
                    }" />
                  <div v-if="submitted && $v.assignmentName.$error" class="invalid-feedback">
                    <span v-if="!$v.assignmentName.required">This field is required</span>
                  </div>
                </div>
                <div class="form-group mb-2">
                  <label for="message-text" class="col-form-label py-1">Task</label>
                  <textarea disabled="disabled" class="form-control" id="message-text" rows="3" v-model="assignmentDescription"
                    maxlength="500" placeholder="Enter assignment description"></textarea>
                </div>
                <div class="row">
                  <div class="col-md-6 ml-auto py-0 disabled">
                    <div class="form-group mb-2 mb-0">
                      <label for="recipient-name" class="col-form-label py-1">Priority<em>*</em></label>
                      <div class="dropdown input-icon-area">
                        <button id="dLabel" class="dropdown-select form-control text-left" type="button"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span class="">
                            {{
                              priorityVal
                              ? priorityVal
                              : "Select priority"
                            }}</span>
                        </button>
                        <ul class="dropdown-menu border" aria-labelledby="dLabel">
                          <li @click="priorityVal = 'Can Wait'" class="item low-color">
                            <span>Can Wait</span>
                          </li>
                          <li @click="priorityVal = 'Important'" class="item medium-color">
                            <span>Important</span>
                          </li>
                          <li @click="priorityVal = 'Urgent'" class="item high-color">
                            <span>Urgent</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="submitted &&
                      priorityVal != 'Urgent' &&
                      priorityVal != 'Important' &&
                      priorityVal != 'Can Wait'
                      " class="invalid-feedback" style="display: block">
                      <span v-if="priorityVal != 'Urgent' &&
                        priorityVal != 'Important' &&
                        priorityVal != 'Can Wait'
                        ">This field is required</span>
                    </div>
                  </div>
                  <div class="col-md-6 ml-auto py-0">
                    <div class="form-group mb-2">
                      <label for="recipient-name" class="col-form-label py-1">Date<em>*</em></label>
                      <date-picker disabled="disabled" class="form-control dropdown-menu-top" placeholder="MM/DD/YYYY" format="MM/dd/yyyy"
                        v-model="dateValue" :class="{
                          'is-invalid':
                            submitted && $v.dateValue.$error,
                        }" :disabled-dates="disabledDates" />
                      <div v-if="submitted && $v.dateValue.$error" class="invalid-feedback">
                        <span v-if="!$v.dateValue.required">This field is required</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-0">
                  <div class="col-6 py-1">
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label py-0">Time<em>*</em></label>
                      <div>
                        <vue-timepicker disabled="disabled" @change="checkValidTime" close-on-complete format="hh:mm A" v-model="timeValue"
                          name="timeValue" class="show-cursor dropdown-menu-top" :value="timeValue" :class="{
                            'is-invalid':
                              submitted &&
                              ($v.timeValue.$error ||
                                !validTime),
                          }"></vue-timepicker>
                        <div v-if="submitted &&
                          ($v.timeValue.$error || !validTime)
                          " class="invalid-feedback">
                          <span v-if="!$v.timeValue.required ||
                            !validTime
                            ">Not a valid time</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h6 class="color-dark font-semi-bold mb-0">
                    Sub Tasks
                  </h6>
                  <a @click="onAddSubTaskClick" class="btn p-0">
                    <span class="color-secondary"><i class="fas fa-plus-circle"></i></span>
                  </a>
                </div>
                <div v-if="addSubTask" class="d-flex flex-row align-items-start">
                  <div class="form-row mb-2 mx-0 mr-2 w-100">
                    <label class="form-label" for="name">Add a sub-task</label>
                    <input type="text" maxlength="100" v-model="subTaskName" class="form-control" />
                  </div>
                  <div class="pt-4">
                    <button class="btn btn-primary btn-sm mt-1" @click="onAddNewSubTask">
                      Add
                    </button>
                  </div>
                </div>
                <!-- <div
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
                          </div> -->

                <div class="custom-overflow pr-2 mr--2 d-flex flex-column">
                  <div v-if="isAddAssignment === false">
                    <div v-for="subTask in subTasksList" :key="subTask.id">
                      <div class="card card-transparent show-icon p-1 mb-1">
                        <div class="d-flex align-items-center justify-content-between">
                          <div class="p-1 form-group checkbox">
                            <!-- @click="confirmSubTaskComplete($event, subTask.id, subTask.task_status,subTask)" -->
                            <input :id="subTask.id" class="mr-2 cursor-pointer" type="checkbox"
                              v-model="subTask.isTaskCompleted" @change="updateTaskIds(subTask.id)" />
                            <label :for="subTask.id">{{ subTask.title }}</label>
                          </div>
                          <span v-if="subTask.task_status != 'Completed'
                            " @click="deleteSubTask(subTask)"
                            class="color-primary-dark fa-icon show-hover d-none btn p-0"><i
                              class="fas fa-trash-alt"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div v-for="subTask in subTasksList" :key="subTask.id">
                      <div class="card card-transparent show-icon p-1 mb-1">
                        <div class="d-flex align-items-center justify-content-between">
                          <!-- <p
                                          class="mb-0 color-secondary text-16 font-regular word-break pr-3"
                                        >
                                          <span
                                            class="subtask-btn mr-1"
                                            :class="{
                                              selected:
                                                subTask.task_status ==
                                                'Completed',
                                            }"
                                            ><i></i
                                          ></span>
                                          <span>{{ subTask.title }}</span>
                                        </p> -->
                          <div class="p-1 form-group checkbox">
                            <!-- @click="confirmSubTaskComplete($event, subTask.id, subTask.task_status,subTask)" -->
                            <input :id="subTask.id" class="mr-2 cursor-pointer" type="checkbox" />
                            <label :for="subTask.id">{{ subTask.title }}</label>
                          </div>
                          <span v-if="subTask.task_status != 'Completed'
                            " @click="deleteSubTask(subTask)"
                            class="color-primary-dark fa-icon show-hover d-none btn p-0"><i
                              class="fas fa-trash-alt"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Additional Material Add -->
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h6 class="color-dark font-semi-bold mb-0">
                    Invite Peers
                  </h6>
                </div>
                <div v-if="invitePeer" class="d-flex flex-row align-items-start">
                  <div class="form-row mb-2 mx-0 mr-2 w-100">
                    <label class="form-label" for="name">Invite peers</label>
                    <!-- <input type="text" class="form-control" /> -->
                    <multiselect v-model="peerSelected" :options="students" track-by="first_name" label="first_name"
                      :placeholder="peerSelected.length > 3
                        ? ''
                        : 'Select students'
                        " :multiple="true" :max="4">
                      <span slot="maxElements">Maximum of 4 students selected</span>
                      <span slot="noResult">No data found</span>
                    </multiselect>
                  </div>
                  <div class="pt-4">
                    <button @click="onInvitePeer" class="btn btn-primary btn-sm mt-1">
                      {{ isAddAssignment ? "Add" : "Save" }}
                    </button>
                  </div>
                </div>
                <div class="hidden-scroll px-3 row my-0">
                  <div v-for="peer of peerList" :key="peer.id"
                    class="h-fit-content show-icon d-flex align-items-center position-realtive">
                    <div class="d-flex align-items-center my-2 mr-3">
                      <div class="ld-img-section mr-2 d-flex flex-column">
                        <div class="ld-img-holder">
                          <img v-if="peer.profile_pic" :src="peer.profile_pic" alt="" />
                          <img v-else src="~/static/image/avatar.png" alt="" />
                        </div>
                      </div>
                      <div class="ld-details-section">
                        <p class="ld-heading mb-0">
                          {{ peer.first_name }}
                        </p>
                      </div>
                    </div>
                    <!-- <button
                                      type="button"
                                      role="button"
                                      class="btn btn-tag-remove position-absolute left-0 rounded-circle d-none"
                                      @click="
                                        removePeerConfirm(peer.id, $event)
                                      "
                                    >
                                      <span
                                        class="color-primary-dark fa-icon show-hover btn p-0 ml-05"
                                        ><i
                                          class="fas fa-trash-alt color-danger"
                                        ></i
                                      ></span>
                                    </button> -->
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h6 class="color-dark font-semi-bold mb-0">
                    Additional Material
                  </h6>
                  <a @click="onAdditionalMatClick" class="btn p-0">
                    <span class="color-secondary"><i class="fas fa-plus-circle"></i></span>
                  </a>
                </div>
                <div v-if="additionalMaterial" class="d-flex flex-row align-items-start">
                  <div class="form-row mb-2 mx-0 mr-2 w-100">
                    <label class="form-label" for="name">Add Additional Material</label>
                    <!-- <input type="text" class="form-control" /> -->
                    <select v-model="materialType" class="form-select form-control mb-2"
                      aria-label="Default select example">
                      <option value="">
                        Choose material type
                      </option>
                      <option value="file">File</option>
                      <option value="link">Link</option>
                    </select>
                    <div class="row m-0">
                      <div class="col-12 py-0">
                        <input v-if="materialType == 'file'" type="file" class="form-control px-2"
                          placeholder="Upload File" @change="onFileChange" id="fileUpload"
                          accept=".png,.jpeg,.jpg,.pdf" />
                      </div>
                      <div class="col-12 py-0">
                        <input v-if="materialType == 'link'" type="text" class="form-control px-2"
                          placeholder="Paste Link" v-model="link" />
                      </div>
                      <div class="col-3 p-0"></div>
                    </div>
                  </div>
                  <div class="pt-4">
                    <button type="button" @click="UploadAttachment" class="btn btn-primary btn-sm mt-1">
                      Add
                    </button>
                  </div>
                </div>
                <div class="hidden-scroll px-3 row my-0">
                  <div v-for="item of additionalMaterialList" :key="item.id" class="h-fit-content cursor-pointer w-100">
                    <div v-if="item.link"
                      class="d-flex align-items-center justify-content-between my-2 mr-3 min-w-200 w-100 show-icon">
                      <div class="ld-details-section w-100">
                        <p @click="openLink(item)" class="ld-heading mb-1 text-link text-truncate">
                          <!-- {{ peer.first_name }} -->
                          {{ item.link }}
                        </p>
                      </div>
                      <span class="color-primary-dark fa-icon show-hover d-none btn p-0"
                        @click="deleteAdditionalMat(item)"><i class="fas fa-trash-alt"></i></span>
                    </div>
                    <div v-else
                      class="d-flex align-items-center justify-content-between my-2 mr-3 min-w-200 w-100 show-icon">
                      <div class="ld-details-section w-100">
                        <p @click="openLink(item)" class="ld-heading mb-1 text-link text-truncate">
                          <!-- {{ peer.first_name }} -->
                          {{
                            item.file_type &&
                            item.file_type != "link"
                            ? item.file_name
                            : item.material
                          }}
                        </p>
                      </div>
                      <span class="color-primary-dark fa-icon show-hover d-none btn p-0"
                        @click="deleteAdditionalMat(item)"><i class="fas fa-trash-alt"></i></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer justify-content-end border-top-0">
              <button v-if="!isAddAssignment && schoologyAssignment == '1'
                " type="button" class="btn btn-primary py-1 px-3 mr-auto" :disabled="processing || submissionId"
                @click="submitAssignment()">
                Submit Assignment
              </button>
              <button type="button" class="btn btn-secondary py-1 px-3 mr-2" @click="
                openAssignment = false;
              closePopup();
              ">
                Close
              </button>
              <button type="button" class="btn btn-primary py-1 px-3" :disabled="processing" @click="
                isAddAssignment
                  ? AddAssignment()
                  : UpdateAssignment()
                ">
                {{ isAddAssignment ? "Add" : "Update" }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="deleteAssignmentConfirmation" tabindex="-1" role="dialog"
        aria-labelledby="deleteAssignmentConfirmationModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
          <div class="modal-content">
            <div class="modal-header pb-1">
              <h4 class="modal-title" id="deleteAssignmentConfirmationModalLongTitle">
                Delete Assignment Confirmation
              </h4>
            </div>
            <div class="modal-body px-3">
              <p class="mb-0">Delete selected assignment?</p>
            </div>
            <div class="modal-footer justify-content-end border-top-0">
              <button type="button" class="btn btn-secondary py-1 px-3 rounded-8 font-semi-bold" data-dismiss="modal">
                Cancel
              </button>
              <button data-dismiss="modal" type="button" class="btn btn-primary py-1 px-3 rounded-8 font-semi-bold"
                @click="deleteAssts()">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="submitAssignmentConfirmation" tabindex="-1" role="dialog"
        aria-labelledby="submitAssignmentConfirmationModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
          <div class="modal-content">
            <div class="modal-header pb-1">
              <h4 class="modal-title" id="submitAssignmentConfirmationModalLongTitle">
                Submit Assignment
              </h4>
            </div>
            <div class="modal-body px-3">
              <!-- Additional Material Add -->
              <div class="d-flex justify-content-between align-items-center mb-2">
                <p class="mb-0">
                  Submit Additional Material
                </p>

              </div>
              <div class="d-flex flex-row align-items-start">
                <div class="form-row mb-2 mx-0 mr-2 w-100">

                  <select v-model="materialTypeSubmit" class="form-select form-control mb-2"
                    aria-label="Default select example">
                    <option value="">Choose material type</option>
                    <!-- <option value="file">File</option> -->
                    <option value="link">Link</option>
                    <option value="text">Text</option>
                  </select>
                  <div class="d-flex flex-column w-100">
                    <div class="row m-0 px--12">
                      <div class="col-12 py-0 p-0">
                        <input id="fileUploadSubmit" v-if="materialTypeSubmit == 'file'" type="file"
                          class="form-control px-2 cursor-pointer" placeholder="Upload File" @change="onFileChangeSubmit"
                          accept=".png,.jpeg,.jpg,.pdf" />
                      </div>
                    </div>
                    <div class="row m-0 px--12">
                      <div class="col-12 py-0 p-0">
                        <input v-if="materialTypeSubmit == 'link'" type="text" class="form-control px-2"
                          placeholder="Paste Link" v-model="linkSubmit" maxlength="500" @input="onChangeLink()" />
                      </div>
                      <div v-if="submittedAsst && materialTypeSubmit == 'link'" class="invalid-feedback"
                        style="display:block !important">
                        <span v-if="!linkSubmit || invalidSubmitUrl">Please add a valid URL</span>
                      </div>
                    </div>
                    <div class="row m-0 px--12">
                      <div class="col-12 p-0">
                        <textarea v-if="materialTypeSubmit == 'text'" class="form-control px-2" rows="4"
                          placeholder="Enter description" v-model="textSubmit" maxlength="1000"
                          @input="onChangeText()"></textarea>
                      </div>
                      <div v-if="submittedAsst && materialTypeSubmit == 'text'" class="invalid-feedback"
                        style="display:block !important">
                        <span v-if="invalidSubmitText">Please add a valid description</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Material Add End -->
            <div class="modal-footer justify-content-end border-top-0">
              <button type="button" class="btn btn-secondary py-1 px-3 rounded-8 font-semi-bold" data-dismiss="modal">
                Cancel
              </button>
              <button :disabled="disableSubmit" type="button" class="btn btn-primary py-1 px-3 rounded-8 font-semi-bold"
                @click="submitAsst()">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="completeConfirm" tabindex="-1" role="dialog"
        aria-labelledby="completeConfirmModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
          <div class="modal-content">
            <div class="modal-header pb-1">
              <h4 class="modal-title" id="completeConfirmModalLongTitle">
                Complete Assignment Confirmation
              </h4>
            </div>
            <div class="modal-body px-3 bold-6">
              <p class="mb-0">Mark assignment as completed?</p>
              <p class="mb-0" v-if="schoologyAssignment == '1' && !submissionId">Did you forget to submit your work?</p>
            </div>
            <div class="modal-footer justify-content-end border-top-0">
              <button type="button" class="btn btn-secondary py-1 px-3 rounded-8 font-semi-bold" data-dismiss="modal">
                Cancel
              </button>
              <button type="button" class="btn btn-primary py-1 px-3 rounded-8 font-semi-bold"
                :disabled="processingCompleteAssignment" @click="completeAssignment()">
                Complete
              </button>
              <button v-if="schoologyAssignment == '1'" type="button"
                class="btn btn-primary py-1 px-3 rounded-8 font-semi-bold" @click="submitAndCompleteAssignment()"
                :disabled="submissionId">
                Submit Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="undoAssignmentConfirmation" tabindex="-1" role="dialog"
        aria-labelledby="undoAssignmentConfirmationModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
          <div class="modal-content">
            <div class="modal-header pb-1">
              <h4 class="modal-title" id="undoAssignmentConfirmationModalLongTitle">
                Re-Open Assignment
              </h4>
            </div>
            <div class="modal-body px-3">
              <p class="mb-0">
                This action will mark this assignment as incomplete again
              </p>
            </div>
            <div class="modal-footer justify-content-end border-top-0">
              <button type="button" class="btn btn-secondary py-1 px-3 rounded-8 font-semi-bold" data-dismiss="modal">
                Cancel
              </button>
              <button data-dismiss="modal" type="button" class="btn btn-primary py-1 px-3 rounded-8 font-semi-bold"
                @click="undoAsstComplete()">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="undoAssignmentConfirmationoverdue" tabindex="-1" role="dialog"
        aria-labelledby="undoAssignmentConfirmationModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
          <div class="modal-content">
            <div class="modal-header pb-1">
              <h4 class="modal-title" id="undoAssignmentConfirmationModalLongTitle">
                Re-Open Assignment
              </h4>
            </div>
            <div class="modal-body px-3">
              <p class="mb-0">
                This action will mark this assignment as incomplete again
              </p>
            </div>
            <div class="modal-footer justify-content-end border-top-0">
              <button type="button" class="btn btn-secondary py-1 px-3 rounded-8 font-semi-bold" data-dismiss="modal">
                Cancel
              </button>
              <button data-dismiss="modal" type="button" class="btn btn-primary py-1 px-3 rounded-8 font-semi-bold"
                @click="doingAssignment()">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Sub task undo confirmation  -->
      <div class="modal fade" id="undoSubTaskConfirm" tabindex="-1" role="dialog"
        aria-labelledby="undoSubTaskConfirmModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
          <div class="modal-content">
            <div class="modal-body px-3">
              <h4 class="modal-title color-primary-dark font-bold mt-3" id="undoSubTaskConfirmModalLongTitle">
                Re-Open Sub-Task
              </h4>
              <p class="mb-0">
                This action will mark this sub-task as incomplete again
              </p>
            </div>
            <div class="modal-footer justify-content-end border-top-0">
              <button type="button" class="btn btn-secondary py-1 px-4 rounded-8 mr-2 font-semi-bold"
                data-dismiss="modal">
                Cancel
              </button>
              <button type="button" class="btn btn-primary py-1 px-4 rounded-8 font-semi-bold"
                :disabled="processingSubCompleteAssignment" @click="undoCompleteSubTask()">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Sub task completion confirmation  -->
      <div class="modal fade" id="completeSubTaskConfirm" tabindex="-1" role="dialog"
        aria-labelledby="completeConfirmModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
          <div class="modal-content">
            <div class="modal-body px-3">
              <h4 class="modal-title color-primary-dark font-bold mt-3" id="completeConfirmModalLongTitle">
                Complete Sub-Task Confirmation
              </h4>
              <p class="mb-0">
                Mark sub-task as completed?
              </p>
            </div>
            <div class="modal-footer justify-content-end border-top-0">
              <button type="button" class="btn btn-secondary py-1 px-4 rounded-8 mr-2 font-semi-bold"
                data-dismiss="modal">
                Cancel
              </button>
              <button type="button" class="btn btn-primary py-1 px-4 rounded-8 font-semi-bold"
                :disabled="processingSubCompleteAssignment" @click="
                  processingSubCompleteAssignment = true;
                completeSubTask();
                ">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Sub task completion confirmation end  -->
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
import moment from "moment";
import { Drag, Drop } from 'vue-drag-drop';
var fromDate = "";
var endDate = "";
export default {
  name: "UserStudentTask",
  components: {
    lottie,
    InfiniteLoading,
    draggable,
    VueTimepicker,
    Drag,
    Drop,
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
      isDropping: false,
      isDroppingTodo: false,
      isDroppingDone: false,
      isDragging: false,
      isDraggingTodo: false,
      isDraggingDone: false,
      isDraggingDue: false,
      draggingIndex: null,
      draggingIndexTodo: null,
      draggingIndexDone: null,
      draggingIndexDue: null,
      accordionOpened: false,
      completedAssignmentList: [],
      doingreloadCount: 0,
      overduereloadCount: 0,
      donereloadCount: 0,
      reloadCount: 0,
      tempOffset: -1,
      overduetempOffset: -1,
      doingtempOffset: -1,
      donetempOffset: -1,
      doingreloadNext: false,
      reloadNext: false,
      donereloadNext: false,
      overduereloadNext: false,
      offset: 0,
      limit: 10,
      overdueoffset: 0,
      overduelimit: 10,
      doingoffset: 0,
      doneoffset: 0,
      doinglimit: 10,
      donelimit: 10,
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
      overdueAssignments: [],
      doingAssignments: [],
      subject: "",
      submitted: false,
      assignmentDescription: "",
      dateValue: "",
      timeValue: "",
      openAssignment: false,
      date_today: new Date(),
      disabledDates: {
        to: new Date(),
      },
      processing: false,
      gg4lSubject: "",
      assignmentName: "",
      peerSelected: [],
      materialType: "",
      isAddAssignment: true,
      additionalMaterialList: [],
      link: "",
      materialType: "",
      priorityVal: "",
      addSubTask: false,
      subTasksList: [],
      invitePeer: false,
      peerList: [],
      additionalMaterial: false,
      subTaskName: "",
      choosenAssignments: [],
      isSharedAssignment: false,
      grade: "",
      gradePossible: "",
      invalidSubmitUrl: false,
      submittedAsst: false,
      disableSubmit: false,
      invalidSubmitText: false,
      loading: false,
      lottieOptions: { animationData: animationData.default },
      anim: null,
      removedPeerList: [],
      doneAssignmentsList: [],
      materialTypeSubmit: "",
      linkSubmit: "",
      monthlyAssignmentsCalled: false, // Flag for monthlyAssignments
      allAssignmentsCalled: false,     // Flag for allAssignments
      assignmentType: 'Weekly',
      school_id: '',
      processingSubCompleteAssignment: false,
      sourceassignment: '',
      typeOfAssignment: '',
      doingItem: {},
      doingType: '',
      todoItem: {},
      todoType: '',
      doneItem: {},
      doneType: '',
      task_ids: [],
      OverdueToast: false,
    }
  },
  created() {
    this.loading = true;
    eventBus.$on('accordionOpened', (newValue) => {
      this.accordionOpened = newValue;
    });
  },
  async mounted() {
    const taskId = this.$route.query.id;
    if (taskId) {
      
      await this.getAssignment({
        id: taskId,
      })
      if(taskId){
      let data = this.mapData(this.assignment);
      if(!data)
      data = this.mapSharedData(this.sharedAssignment);
      this.onCardClick(data, data.task_status);
    }
    }
    
    this.loading = false;
    this.school_id = localStorage.getItem("school_id")
    this.user_id = localStorage.getItem("id");
    this.GetStudents();
    this.disabledDates.to = new Date(
      this.date_today.getFullYear(),
      this.date_today.getMonth(),
      this.date_today.getDate()
    );
    //date picker
    var today = new Date();
    var future = new Date();
    future.setDate(future.getDate() + 30);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var today = dd + "/" + mm + "/" + yyyy;

    $(function () {
      fromDate = "";
      endDate = "";
      $('input[name="daterange"]').daterangepicker({
        // autoUpdateInput: false,
        singleDatePicker: true,
        minDate: today,
        maxDate: future,
        opens: "left",
        locale: {
          // format: "DD-MM-YYYY",
          cancelLabel: "Clear",
        },
      });

      $('input[name="daterange"]').on(
        "apply.daterangepicker",
        function (ev, picker) {
          $(this).val(picker.startDate.format("YYYY/MM/DD"));
          fromDate = picker.startDate.format("YYYY-MM-DD");
          endDate = picker.endDate.format("YYYY-MM-DD");
        }
      );

      $('input[name="daterange"]').on(
        "cancel.daterangepicker",
        function (ev, picker) {
          $(this).val("");
        }
      );
    });
    this.getSubjectsList();
    this.checkValidTime();
  },
  computed: {
    ...mapState("teacherMeeting", {
      students: (state) => state.students,
    }),
    ...mapState("quotedMessage", {
      quoteMessage: (state) => state.quoteMessage,
      viewed: (state) => state.viewed,
      assignment: (state) => state.assignment,
      sharedAssignment: (state) => state.sharedAssignment,
      successMessage: (state) => state.successMessage,
      SuccessTypeSubTasks: (state) => state.SuccessTypeSubTasks,
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
    assignmentTypeText() {
      if (this.assignmentType === 'Monthly') {
        return 'Completed task for this month';
      } else if (this.assignmentType === 'All') {
        return 'All completed task';
      } else {
        return 'Completed task for this week';
      }
    },
    TypeText() {
      if (this.assignmentType === 'Monthly') {
        return 'This Month';
      } else if (this.assignmentType === 'All') {
        return 'All Assignment';
      } else {
        return 'This Week';
      }
    },
  },
  validations: {
    subject: { required },
    dateValue: { required },
    timeValue: { required },
    assignmentName: { required },
    // assignmentDescription: { required },
  },
  methods: {
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
    doingDropStart() {
      // When the drag starts, set isDragging to true to add the class
      if (this.isDragging) {
        return;
    }
      this.isDropping = true;
      // this.draggingIndex = index;
    },
    doingDropEnd() {
      // When the drag ends, set isDragging to false to remove the class
  //     setTimeout(() => {
  // }, 300);
      this.isDropping = false;
      // this.draggingIndex = null;
    },
    todoDropStart() {
      // When the drag starts, set isDragging to true to add the class
      if (this.isDraggingTodo) {
        return;
    }
      this.isDroppingTodo = true;
      // this.draggingIndex = index;
    },
    todoDropEnd() {
      // When the drag ends, set isDragging to false to remove the class
      this.isDroppingTodo = false;
      // this.draggingIndex = null;
    },
    doneDropStart() {
      // When the drag starts, set isDragging to true to add the class
      if (this.isDraggingDone) {
        return;
    }
      this.isDroppingDone = true;
      // this.draggingIndex = index;
    },
    doneDropEnd() {
      // When the drag ends, set isDragging to false to remove the class
      this.isDroppingDone = false;
      // this.draggingIndex = null;
    },
    handleDragStart(index) {
      // When the drag starts, set isDragging to true to add the class
      this.isDragging = true;
      this.draggingIndex = index;
      this.isDropping = false;
    },
    handleDragEnd() {
      // When the drag ends, set isDragging to false to remove the class
      this.isDragging = false;
      this.draggingIndex = null;
      this.isDropping = false;
    },
    handleDragStartTodo(index) {
      this.isDraggingTodo = true;
      this.draggingIndexTodo = index;
    },
    handleDragEndTodo() {
      this.isDraggingTodo = false;
      this.draggingIndexTodo = null;
    },
    handleDragStartDone(index) {
      this.isDraggingDone = true;
      this.draggingIndexDone = index;
    },
    handleDragEndDone() {
      this.isDraggingDone = false;
      this.draggingIndexDone = null;
    },
    handleDragStartDue(index) {
      this.isDraggingDue = true;
      this.draggingIndexDue = index;
    },
    handleDragEndDue() {
      this.isDraggingDue = false;
      this.draggingIndexDue = null;
    },
    async GetStudents() {
      await this.getStudents({
        school_id: localStorage.getItem("school_id"),
        studentId: localStorage.getItem("id"),
      });
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async GetSubjectList() {
      await this.getSubjectsList({});
    },
    monthlyAssignments() {
      // Set the assignmentType to "Monthly" when clicking monthlyAssignments
      this.assignmentType = 'Monthly';
      this.doneoffset = 0;
      this.doneAssignmentsList = [];
      this.donereloadNext = true;
      this.donereloadCount += 1;
      this.monthlyAssignmentsCalled = true;
    },
    allAssignments() {
      this.assignmentType = 'All';
      this.doneoffset = 0;
      this.doneAssignmentsList = [];
      this.donereloadNext = true;
      this.donereloadCount += 1;
      this.allAssignmentsCalled = true;
    },
    weeklyAssignments() {
      this.assignmentType = 'Weekly';
      this.doneoffset = 0;
      this.doneAssignmentsList = [];
      this.donereloadNext = true;
      this.donereloadCount += 1;
      this.allAssignmentsCalled = true;
    },

    async doingNext($state) {
      if (this.doingtempOffset != this.doingoffset || this.doingreloadNext) {
        this.doingreloadNext = false;
        this.doingtempOffset = this.doingoffset;
        this.doingAssignmentList = [];
        await this.getAssignments({ offset: this.doingoffset, limit: this.doinglimit, filter: 'Doing' });
        this.doingoffset = this.doingoffset + this.doinglimit;
        this.assignmentMaterials = [];
        await this.doingmapAssignments();
        await this.doingmapSharedAssignments();
        if (this.doingAssignmentList.length > 0) {
          this.doingAssignments.push(...this.doingAssignmentList);
          $state.loaded();
        } else {
          $state.complete();
        }
      }
    },
    doingmapAssignments() {
      if (this.assignmentsList && this.assignmentsList.length > 0) {
        this.assignmentsList.forEach((e) => {
          let asst = this.mapData(e);
          this.doingAssignmentList.push(asst);
        });
      }
    },
    doingmapSharedAssignments() {
      if (this.sharedAssignmentsList && this.sharedAssignmentsList.length > 0) {
        this.sharedAssignmentsList.forEach((e) => {
          let asst = this.mapSharedData(e);
          this.doingAssignmentList.push(asst);
        });
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
    async doneNext($state) {
      if (this.donetempOffset != this.doneoffset || this.donereloadNext) {
        this.donereloadNext = false;
        this.donetempOffset = this.doneoffset;
        this.completedAssignmentList = [];
        await this.getCompletedAssignments({
          offset: this.doneoffset,
          limit: this.donelimit,
          userId: localStorage.getItem("id"),
          date: moment().format("YYYY-MM-DD"),
          type: this.assignmentType, // Use the assignmentType here
        });
        this.assignmentMaterials = [];
        this.doneoffset = this.doneoffset + this.donelimit;
        await this.copyCompletedAssignments();
        await this.copyCompletedSharedAssignments();

        if (this.completedAssignmentList.length > 0) {
          this.doneAssignmentsList.push(...this.completedAssignmentList);
          $state.loaded();
        } else {
          $state.complete();
        }
      }
    },
    copyCompletedAssignments() {
      if (this.completedAssignments && this.completedAssignments.length > 0) {
        this.completedAssignments.forEach((e) => {
          let asst = this.mapData(e);
          this.completedAssignmentList.push(asst);
        });
      }
    },
    copyCompletedSharedAssignments() {
      if (this.completedSharedAssignments && this.completedSharedAssignments.length > 0) {
        this.completedSharedAssignments.forEach((e) => {
          let asst = this.mapSharedData(e);
          this.completedAssignmentList.push(asst);
        });
      }
    },
    async overdueNext($state) {
      if (this.overduetempOffset != this.overdueoffset || this.overduereloadNext) {
        this.overduereloadNext = false;
        this.overduetempOffset = this.overdueoffset;
        this.overdueAssignmentList = [];
        await this.getAssignments({ offset: this.overdueoffset, limit: this.overduelimit, filter: 'Overdue' });
        if (this.overdueoffset == 0) {
          await this.mapOverdues();
        }
        this.overdueoffset = this.overdueoffset + this.overduelimit;
        this.assignmentMaterials = [];
        // await this.mapAssignments();
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
        const parser = new DOMParser();
        const doc = parser.parseFromString(e.assignment_description, 'text/html');
        const textContent = doc.body.textContent;
        item.assignment_description = textContent;
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
        const parser = new DOMParser();
        const doc = parser.parseFromString(e.assignments.assignment_description, 'text/html');
        const textContent = doc.body.textContent;
        item.assignment_description = textContent;
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
        item.subject = e.assignments?.subjects?.subject_name ?? "";
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
        });
      }
    },
    mapSharedAssignments() {
      if (this.sharedAssignmentsList && this.sharedAssignmentsList.length > 0) {
        this.sharedAssignmentsList.forEach((e) => {
          let asst = this.mapSharedData(e);
          this.pendingAssignments.push(asst);
        });
      }
    },
    confirmUndo(data) {
      const { item, source } = data;
      let assignment = data.item;
      this.undoAsstId = assignment.id;
      this.todoItem = data.item;
      this.todoType = data.sourceType;
      if(data.item.task_status == 'Overdue' || data.item.task_status == 'Doing' || this.todoType == 'Doing') {
        this.OverdueToast = true
      }
      if (source === 'doingAssignments' || source === 'overdueAssignments') {
        this.sourceassignment = source;
        this.undoAsstComplete(data);
      } else if (source !== 'todoAssignments') {
        // Add a condition to exclude 'todoAssignments'
        $("#undoAssignmentConfirmation").modal({ backdrop: true });
      }
      this.isDragging = false;
      this.draggingIndex = null;
      this.isDroppingTodo = false;
      this.isDraggingDue = false;
    },
    undoAsstComplete(data) {
      if(this.todoType == 'Doing' ||this.todoType == 'Overdue' ) {
        this.OverdueToast = true
      }else{
        this.OverdueToast = false;
      }
      this.completeAssignment(data,false);
      this.removeItemFromList(this.todoType, this.todoItem)
    },
    handleDrop(data, event) {
      const { item, source } = data;
      let assignment = data.item;
      this.completeAsstId = assignment.id;
      this.assignmentId = assignment.id;
      this.schoologyAssignment = assignment.schoologyAssignment;
      this.submissionId = assignment.submission_id;
      if(data.item.task_status == 'Pending' || data.item.task_status == 'Overdue'|| data.item.task_status == 'Doing'){
        this.OverdueToast = false;
      }
      if (source !== 'doneAssignments') {
        this.sourceassignment = source;
        this.doneItem = data.item;
        this.doneType = data.sourceType;
        // Add a condition to exclude 'doneAssignments'
        $("#completeConfirm").modal({ backdrop: true });
      }
      this.isDroppingDone = false;
    },
    async completeAssignment(data,completed = true) {
      this.processingCompleteAssignment = true;
      await this.completeTask({
        assignment_id: completed ? this.completeAsstId : this.undoAsstId,
        status: completed ? "Completed" : "Pending",
      });
      this.processingCompleteAssignment = false;
      this.removeItemFromList(this.doneType, this.doneItem);
      if (this.successMessage != "") {
        this.openAssignment = false;
        completed ? this.loadUpdatedData('Done') : this.loadUpdatedData('Pending');
        this.completeAsstId = 0;
        if (this.OverdueToast == false) {
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
        }
        this.doneType = '';
        this.doneItem = {};
        this.todoType = '';
        this.todoItem = {};
        this.openAssignment = false;
        this.sourceassignment = '',
          $(".modal").modal("hide");
        $(".modal-backdrop").remove();
      }
    },
    doingDrop(data, event) {
      const { item, source } = data;
      let assignment = data.item;
      this.completeAsstId = assignment.id;
      this.assignmentId = assignment.id;
      this.schoologyAssignment = assignment.schoologyAssignment;
      this.submissionId = assignment.submission_id;
      this.doingItem = data.item;
      this.doingType = data.sourceType;
      if (source === 'doneAssignments') {
        this.sourceassignment = source;
        $("#undoAssignmentConfirmationoverdue").modal({ backdrop: true });
      } else if (source !== 'doingAssignments') {
        this.doingAssignment();
      }
      this.isDropping = false;
    },
    async doingAssignment() {
      this.processingCompleteAssignment = true;
      await this.completeTask({
        assignment_id: this.assignmentId,
        status: 'Doing',
      });
      this.processingCompleteAssignment = false;
      this.removeItemFromList(this.doingType, this.doingItem)
      if (this.successMessage != "") {
        // this.openAssignment = false;
        this.sourceassignment = '',
          this.loadUpdatedData('Doing')
        this.completeAsstId = 0;
      }
    },
    EditAssignmentModal() {
      this.openAssignment = true;
      this.resetAssignment();
      // $("#editAssignment").modal({ backdrop: true });
      $('#editAssignment').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    async resetAssignment() {
      this.choosenAssignments = [];
      this.schoologyAssignment = "";
      this.peerSelected = [];
      this.isSharedAssignment = false;
      this.subject = "";
      this.assignmentName = "";
      this.assignmentDescription = "";
      this.priorityVal = "";
      this.dateValue = "";
      this.timeValue = "";
      this.subTasksList = [];
      this.peerList = [];
      this.additionalMaterialList = [];
      this.invitePeer = false;
      this.materialType = "";
      this.additionalMaterial = false;
      this.addSubTask = false;
      this.submitted = false;
      this.value = "";
      this.dateValue = "";
      this.file = "";
      this.link = "";
      this.submissionId = "";
      this.schoologyAssignment = "";
      this.grade = "";
      this.gradePossible = "";
      this.invalidSubmitUrl = false;
      this.submittedAsst = false;
      this.disableSubmit = false;
      this.invalidSubmitText = false;
      this.additionalMaterial = false;
      this.assignmentId = '';
      // $('input[name="daterange"]').val("");
      fromDate = "";
      // $(".dropdown-select").text("Select priority");
      this.priorityVal = "";
      this.subject = "";
      this.task = "";
      (fromDate = ""), $('input[name="daterange"]').val("");
      fromDate = "";
      this.priorityVal = "";
      this.timeValue = null;
      this.subject = "";
      this.task = "";
      this.taskValue = "";
      this.timeList = "";
      this.timeValue = "";
      let clearTimeBtn = document.getElementsByClassName("clear-btn")[0];
      clearTimeBtn?.click();
      this.typeOfAssignment = '';
    },
    checkValidTime() {
      if (this.timeValue) {
        let tempTime =
          typeof this.timeValue == "object"
            ? this.timeValue.hh +
            ":" +
            this.timeValue.mm +
            " " +
            this.timeValue.A
            : this.timeValue;
        let valid = moment(tempTime, "h:mm A", true).isValid();

        if (valid && tempTime.split(" ")[1].length > 1) {
          this.validTime = true;
          this.timeValue = tempTime;
        } else {
          this.validTime = false;
        }
        return valid;
      } else {
        return false;
      }
    },
    onAddSubTaskClick() {
      this.addSubTask = true;
    },
    onInviteClick() {
      this.invitePeer = true;
    },
    onAdditionalMatClick() {
      this.additionalMaterial = true;
    },
    closePopup() {
      this.deletedSubTasksArray = [];
      this.openAssignment = false;
      $('#editAssignment').modal('hide');
      this.resetAssignment();
    },
    async AddAssignment() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid || !this.validTime) {
        return;
      }
      this.processing = true;
      const df = moment(this.dateValue).format("YYYY-MM-DD");
      this.loading = true;
      const peersSelected = [];
      if (this.peerList.length > 0) {
        this.peerList.forEach((e) => {
          peersSelected.push(e.id);
        });
      }

      let assignment_materials = [];
      if (
        this.additionalMaterialList &&
        this.additionalMaterialList.length > 0
      ) {
        this.additionalMaterialList.forEach((e) => {
          // assignment_materials.push(e.link ? e.link : e.material);
          if (e) {
            assignment_materials.push(
              e.link ? e.link : e.name ? e.name : e.material
            );
          }
        });
      }
      let subTaskLists = [];
      this.subTasksList.forEach((e) => {
        subTaskLists.push(e.title);
      });

      await this.addAssignment({
        school_id: localStorage.getItem("school_id"),
        user_id: localStorage.getItem("id"),
        task: this.assignmentName,
        assignment_description: this.assignmentDescription,
        subject: this.subject?.id,
        subject_id: this.subject?.id,
        due_time: this.timeValue,
        due_date: df,
        priority:
          this.priorityVal == "Urgent"
            ? 1
            : this.priorityVal == "Important"
              ? 2
              : this.priorityVal == "Can Wait"
                ? 3
                : "",
        shared_users_ids: peersSelected,
        assignment_materials: assignment_materials,
        subTasks: subTaskLists,
      });
      this.loading = false;

      if (this.successMessage != "") {
        this.offset = 0;
        this.tempAssts = [];
        this.reloadNext = true;
        this.reloadCount += 1;
        // this.GetAssignment();
        // this.getAssignmentsList();
        this.openAssignment = false;

        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 4000,
        });
        this.resetAssignment();
        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.submitted = false;
      this.processing = false;
    },
    async UpdateAssignment() {
      if (this.priorityVal == "Overdue" && !this.isSharedAssignment) {
        this.$toast.open({
          message: "Please Select the Priority",
          type: "error",
          duration: 5000,
        });
        return;
      }
      this.submitted = true;
      if (!this.isSharedAssignment) {
        this.$v.$touch();
        if (this.$v.$invalid || !this.validTime) {
          return;
        }
      }

      let priority = 0;

      if (this.priorityVal == "Urgent") {
        priority = "1";
      } else if (this.priorityVal == "Important") {
        priority = "2";
      } else if (this.priorityVal == "Can Wait") {
        priority = "3";
      } else if (this.priorityVal == "Overdue") {
        priority = this.prior;
      }
      this.processing = true;
      this.loading = true;
      const dfE = moment(this.dateValue).format("YYYY-MM-DD");

      const peersSelected = [];
      if (this.peerList.length > 0) {
        this.peerList.forEach((e) => {
          peersSelected.push(e.id);
        });
      }

      let removed = [];
      this.removedPeerList.forEach((e) => {
        const index = this.peerList.findIndex((item) => item.id == e);
        if (index < 0) {
          removed.push(e);
        }
      });

      removed = [...new Set(removed)];

      let assignment_materials = [];
      if (
        this.additionalMaterialList &&
        this.additionalMaterialList.length > 0
      ) {
        this.additionalMaterialList.forEach((e) => {
          // assignment_materials.push(e.link ? e.link : e.material);
          if (e) {
            assignment_materials.push(
              e.link ? e.link : e.name ? e.name : e.material
            );
          }
        });
      }
      let subTaskLists = [];
      this.subTasksList.forEach((e) => {
        subTaskLists.push(e.title);
      });
      await this.updateAssignment({
        school_id: localStorage.getItem("school_id"),
        assignment_id: this.assignmentId,
        user_id: localStorage.getItem("id"),
        task: this.assignmentName,
        assignment_description: this.assignmentDescription,
        subject: this.isSharedAssignment ? this.subjectId : this.subject?.id,
        subject_id: this.isSharedAssignment ? this.subjectId : this.subject?.id,
        due_time: this.timeValue,
        due_date: dfE,
        priority: priority,
        shared_users_ids: peersSelected,
        assignment_materials: assignment_materials,
        subTasks: subTaskLists,
        deleted_subTask: this.deletedSubTasksArray,
        removed_users: removed,
        task_ids: this.task_ids,
      });
      this.loading = false;
      this.removedPeerList = [];
      if (this.SuccessTypeSubTasks == true) {
        this.subtaskUpdatedData();
      }
      if (this.successMessage != "") {
        this.loadUpdatedData();
        this.deletedSubTasksArray = [];
        this.openAssignment = false;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.resetAssignment();
        this.task_ids = [];
        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      // this.GetWeeklyPlanner();
      this.submitted = false;
      this.processing = false;
    },
    mapAssignmentDetail(data) {

      const parser = new DOMParser();
      const doc = parser.parseFromString(data.assignment_description, 'text/html');
      const textContent = doc.body.textContent;

      this.isSharedAssignment = data.isShared;
      this.schoologyAssignment = data.schoologyAssignment;
      this.assignmentId = data.id;
      this.assignmentName = data.task;
      this.assignmentDescription = textContent;
      this.submissionId = data.submission_id;
      this.grade = data.grade;
      this.gradePossible = data.grade_possible;
      this.priorityVal =
        data.priority == "1"
          ? "Urgent"
          : data.priority == "2"
            ? "Important"
            : data.priority == "3"
              ? "Can Wait"
              : data.priority == "4"
                ? "Overdue"
                : "";

      if (data.isShared) {
        this.subject = data.subject;
        this.subjectId = data.subjects.id;
      } else {
        this.subject = {
          id: data.subjects?.id,
          text: data.subjects?.subject_name,
        };
      }
      if (this.schoologyAssignment == "1") {
        this.gg4lSubject = data.subject;
      }
      this.dateValue = data.due_date
        ? moment(data.due_date).format("MM/DD/YYYY")
        : "";
      this.timeValue = data.due_time;
      this.subTasksList = [];
      if (data.subTasks && data.subTasks.length > 0) {
        data.subTasks.forEach((e) => {
          let item = {};
          item = e;
          item.isTaskCompleted = item.task_status !== 'Completed' ? false : true;
          this.subTasksList.push(item);
        });
      }
      this.peerList = data.peers;
      this.additionalMaterialList = data.assignment_materials
        ? data.assignment_materials
        : [];
    },
    mapPeerInvited(data) {
      this.peerSelected = [];
      if (data.peers && data.peers?.length > 0 && this.students.length > 0) {
        data.peers.forEach((e) => {
          let studs = this.students.find(
            (s) => s.id.toString() == e.id.toString()
          );
          this.peerSelected.push(studs);
        });
      }
    },
    onCardClick(data, type) {
      this.resetAssignment();
      this.deletedSubTasksArray = [];
      this.isAddAssignment = false;
      this.openAssignment = true;
      this.EditAssignmentModal();
      this.mapAssignmentDetail(data);
      this.mapPeerInvited(data);
      this.typeOfAssignment = type;
    },
    submitAssignment() {
      this.submittedAsst = false;
      this.onResetSubmit();
      $('#editAssignment').modal('hide');
      $("#submitAssignmentConfirmation").modal({ backdrop: true });
    },
    onResetSubmit() {
      this.invalidSubmitUrl = false;
      this.submittedAsst = false;
      this.disableSubmit = false;
      this.invalidSubmitText = false;
      this.materialTypeSubmit = '';
      this.linkSubmit = '';
      this.textSubmit = '';
    },
    deleteAdditionalMat(item) {
      this.additionalMaterialList;
      const index = this.additionalMaterialList.indexOf(item);
      if (index > -1) {
        this.additionalMaterialList.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
    openLink(material) {
      let link = material.link
        ? material.link
        : material.name
          ? material.name
          : material.file_name;
      if (material.file_type) {
        link = material.material;
      }
      window.open(
        link,
        "_blank" // <- This is what makes it open in a new window.
      );
    },
    async UploadAttachment() {
      if (!this.materialType) {
        return this.$toast.open({
          message: "Please Choose File Type",
          type: "warning",
          duration: 5000,
        });
        return false;
      }

      this.processingUpload = true;
      const data = new FormData();
      if (this.materialType == "file") {
        if (this.file) {
          data.append("file", this.file);
          await this.uploadAdditionalMaterial(data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (this.errorMessageQuote != "") {
            return this.$toast.open({
              message: this.errorMessageQuote,
              type: this.errorTypeQuote,
              duration: 4000,
            });
          }

          this.additionalMaterialList.push({
            id: this.newAdditionalMaterial.id,
            name: this.newAdditionalMaterial.material,
            material: this.file.name,
          });
          this.processingUpload = false;
          this.file = "";
          if (document.querySelector("#fileUpload"))
            document.querySelector("#fileUpload").value = "";
        } else {
          this.processingUpload = false;

          return this.$toast.open({
            message: "Please Add Valid File",
            type: "warning",
            duration: 5000,
          });
          return false;
        }
      } else {
        let urlValid = this.isValidHttpUrl(this.link);
        if (urlValid) {
          this.additionalMaterialList.push({
            id: Math.random(),
            link: this.link,
          });
          this.link = "";
        }
        this.processingUpload = false;
        return;
      }
      this.processingUpload = false;
    },
    isValidHttpUrl(urlLink, showError = true) {
      let url;

      try {
        url = new URL(urlLink);
      } catch (_) {
        if (showError) {
          this.$toast.open({
            message: "Please Add Valid URL",
            type: "warning",
            duration: 5000,
          });
        }
        return false;
      }

      let valid = url.protocol === "http:" || url.protocol === "https:";
      if (!valid) {
        this.$toast.open({
          message: "Please Add Valid URL",
          type: "warning",
          duration: 5000,
        });
      }

      return valid;
    },
    onChangeLink() {
      if (this.submittedAsst) {
        if (!this.isValidHttpUrl(this.linkSubmit, false)) {
          this.invalidSubmitUrl = true;
          return false;
        } else {
          this.invalidSubmitUrl = false;
          return true;
        }

      }
    },
    onAddNewSubTask() {
      if (this.subTaskName && this.subTaskName.trim() !== "") {
        let sub = {};
        sub.title = this.subTaskName;
        this.subTasksList.push(sub);
      } else {
        this.$toast.open({
          message: "Please Add a Valid Sub Task ",
          type: "warning",
          duration: 5000,
        });
      }
      this.subTaskName = "";
      this.addSubTask = false;
    },
    deleteSubTask(subTask) {
      if (this.assignmentId) {
        // deleted_subTask
        this.deletedSubTasksArray.push(subTask.id);
      }
      this.subTasksList = this.subTasksList.filter((e) => e != subTask);
    },
    onInvitePeer() {
      this.peerList = [];
      this.peerSelected.forEach((e) => {
        this.peerList.push(e);
      });
      this.invitePeer = false;
    },
    removePeerConfirm(id, event) {
      event.stopPropagation();
      this.removePeerId = id;
      this.removePeer();
    },
    removePeer() {
      this.removedPeerList.push(this.removePeerId);
      const index = this.peerList.findIndex(
        (item) => item.id == this.removePeerId
      );
      if (index > -1) {
        this.peerList.splice(index, 1); // 2nd parameter means remove one item only
      }
      const index1 = this.peerSelected.findIndex(
        (item) => item.id == this.removePeerId
      );
      if (index1 > -1) {
        this.peerSelected.splice(index1, 1); // 2nd parameter means remove one item only
        this.$toast.open({
          message: "Removed Peer Successfully",
          type: "warning",
          duration: 5000,
        });
      }
    },
    onFileChange(e) {
      if (
        e?.target?.files[0]?.size &&
        e.target.files[0]?.size > 5 * 1024 * 1024
      ) {
        if (document.querySelector("#fileUpload"))
          document.querySelector("#fileUpload").value = "";

        return this.$toast.open({
          message: "File size must be lesser than 5 MB",
          type: "warning",
        });
      }
      if (e.target.files[0]) {
        this.file = e.target.files[0];
      }
    },
    confirmDeletion() {
      $("#deleteAssignmentConfirmation").modal({ backdrop: true });
    },
    async deleteAssts() {
      await this.deleteAssignments({
        assignments_ids: this.choosenAssignments,
      });
      if (this.successMessage != "") {
        this.choosenAssignments = [];
        this.doingoffset = 0;
        this.doingAssignments = [];
        this.doingreloadNext = true;
        this.doingreloadCount += 1;
        this.offset = 0;
        this.tempAssts = [];
        this.reloadNext = true;
        this.reloadCount += 1;
        this.overdueoffset = 0;
        this.overdueAssignments = [];
        this.overduereloadNext = true;
        this.overduereloadCount += 1;
        this.openAssignment = false;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });

        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
      }
    },
    onChooseMultiple(id) {
      if (this.choosenAssignments.includes(id)) {
        let index = this.choosenAssignments.indexOf(id);
        this.choosenAssignments.splice(index, 1);
      } else {
        this.choosenAssignments.push(id);
      }
      this.confirmDeletion();
    },
    onFileChangeSubmit(e) {
      if (
        e?.target?.files[0]?.size &&
        e.target.files[0]?.size > 5 * 1024 * 1024
      ) {
        if (document.querySelector("#fileUploadSubmit"))
          document.querySelector("#fileUploadSubmit").value = "";

        return this.$toast.open({
          message: "File size must be lesser than 5 MB",
          type: "warning",
        });
      }

      if (e.target.files[0]) {
        this.fileSubmit = e.target.files[0];
        e.target.files[0].value = "";
      }
    },
    async submitAsst() {
      if (!this.materialTypeSubmit) {
        this.$toast.open({
          message: "Please Fill the Details",
          type: "warning",
          duration: 4000,
        });
        return;
      }
      this.submittedAsst = true;
      this.disableSubmit = true;
      this.invalidSubmitUrl = false;
      var payload = {};
      if (this.materialTypeSubmit == "text") {
        if (!this.textSubmit || this.onChangeText()) {
          this.invalidSubmitText = true;
          this.disableSubmit = false;
          return
        } else {
          this.invalidSubmitText = false;
        }
        payload = {
          assignment_id: this.assignmentId,
          type: "text",
          text: this.textSubmit,
        };
      } else if (this.materialTypeSubmit == "link") {
        const isValidHttpUrl = this.onChangeLink()
        if (!isValidHttpUrl) {
          this.disableSubmit = false;
          return
        }
        payload = {
          assignment_id: this.assignmentId,
          type: "link",
          url: this.linkSubmit,
        };
      }

      await this.assignmentSubmit(payload);
      this.disableSubmit = false;
      this.submittedAsst = false;
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 4000,
        });
        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
        this.submissionId = "1"
      } else if (this.errorMessageQuote != "") {
        this.$toast.open({
          message: this.errorMessageQuote,
          type: this.errorTypeQuote,
          duration: 5000,
        });
      }
      this.doneoffset = 0;
      this.offset = 0;
      this.doingoffset = 0;
      this.doneAssignmentsList = [];
      this.tempAssts = [];
      this.doingAssignments = [];
      this.donereloadNext = true;
      this.reloadNext = true;
      this.doingreloadNext = true;
      this.donereloadCount += 1;
      this.reloadCount += 1;
      this.doingreloadCount += 1;
    },
    onChangeText() {
      if (this.submittedAsst && this.textSubmit) {
        this.invalidSubmitText = false;
      } else if (this.submittedAsst && !this.textSubmit) {
        this.invalidSubmitText = true;
      }
      return this.invalidSubmitText;
    },
    confirmComplete() {
      this.completeAsstId = this.assignmentId;
      $("#completeConfirm").modal({ backdrop: true });
    },

    confirmSubTaskComplete(event, id, status, subTask) {
      // this.completeAsstId = asstId;
      this.completeSubTaskId = id;
      if (status == "Completed") {
        subTask.task_status = ''
        this.undoSubtaskId = id;
        this.undoCompleteSubTask();
      } else {
        subTask.task_status = 'Completed';
        this.completeSubTask();
      }
      event.preventDefault();
      event.stopPropagation();
    },
    async undoCompleteSubTask() {
      this.completeSubTask(false);
    },
    async completeSubTask(completed = true) {
      // this.processingSubCompleteAssignment = true;
      await this.completeTask({
        task_id: completed ? this.completeSubTaskId : this.undoSubtaskId,
        status: completed ? "Completed" : "Pending",
      });
      this.processingSubCompleteAssignment = false;

      if (this.successMessage != "") {
        this.doneoffset = 0;
        this.doneAssignmentsList = [];
        this.donereloadNext = true;
        this.completeSubTaskId = 0;
        this.donereloadCount += 1;
        this.completeAsstId = 0;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
      }
    },
    submitAndCompleteAssignment() {
      $(".modal").modal("hide");
      $(".modal-backdrop").remove();
      this.submitAssignment();
    },

    loadUpdatedData(type) {
      const assignmentType = type ?? this.typeOfAssignment;
      switch (assignmentType) {
        case "Pending": {
          //  to do
          this.offset = 0;
          this.tempAssts = [];
          this.reloadNext = true;
          this.reloadCount += 1;
          break;
        }
        case "Doing": {
          //  doing
          this.doingoffset = 0;
          this.doingAssignments = [];
          this.doingreloadNext = true;
          this.doingreloadCount += 1;
          break;
        }
        case "Done": {
          // done
          this.doneoffset = 0;
          this.doneAssignmentsList = [];
          this.donereloadNext = true;
          this.donereloadCount += 1;
          break;
        }
        case "Overdue": {
          // overdue 
          this.overdueoffset = 0;
          this.overdueAssignments = [];
          this.overduereloadNext = true;
          this.overduereloadCount += 1;
          this.offset = 0;
          this.tempAssts = [];
          this.reloadNext = true;
          this.reloadCount += 1;
          break;
        }

        default: {
          return "";
        }
      }
    },
    subtaskUpdatedData(type) {
      const assignmentType = type ?? this.typeOfAssignment;
      switch (assignmentType) {
        case "Pending": {
          //  to do
          this.offset = 0;
          this.tempAssts = [];
          this.reloadNext = true;
          this.reloadCount += 1;
          this.doneoffset = 0;
          this.doneAssignmentsList = [];
          this.donereloadNext = true;
          this.donereloadCount += 1;
          break;
        }
        case "Doing": {
          //  doing
          this.doingoffset = 0;
          this.doingAssignments = [];
          this.doingreloadNext = true;
          this.doingreloadCount += 1;
          this.doneoffset = 0;
          this.doneAssignmentsList = [];
          this.donereloadNext = true;
          this.donereloadCount += 1;
          break;
        }
        case "Done": {
          // done
          this.doneoffset = 0;
          this.doneAssignmentsList = [];
          this.donereloadNext = true;
          this.donereloadCount += 1;
          break;
        }
        case "Overdue": {
          // overdue 
          this.overdueoffset = 0;
          this.overdueAssignments = [];
          this.overduereloadNext = true;
          this.overduereloadCount += 1;
          this.offset = 0;
          this.tempAssts = [];
          this.reloadNext = true;
          this.reloadCount += 1;
          break;
        }

        default: {
          return "";
        }
      }
    },
    removeItemFromList(type, item) {
      switch (type) {
        case "Pending": {
          const index = this.tempAssts.indexOf(item);
          if (index > -1) {
            this.tempAssts.splice(index, 1);
          }
          break;
        }
        case "Doing": {
          const index = this.doingAssignments.indexOf(item);
          if (index > -1) {
            this.doingAssignments.splice(index, 1);
          }
          break;
        }
        case "Done": {
          const index = this.doneAssignmentsList.indexOf(item);
          if (index > -1) {
            this.doneAssignmentsList.splice(index, 1);
          }
          break;
        }
        case "Overdue": {
          const index = this.overdueAssignments.indexOf(item);
          if (index > -1) {
            this.overdueAssignments.splice(index, 1);
          }
          break;
        }
        default: {
          return "";
        }
      }
    },
    updateTaskStaus(event, task) {
      this.completeSubTaskId = task.id;
      if (!task.isTaskCompleted) {
        this.undoSubtaskId = task.id;
        this.undoCompleteSubTask();
      } else {
        this.completeSubTask();
      }
      event.preventDefault();
      event.stopPropagation();
    },
    updateTaskIds(subTaskId) {
      // Check if the subTaskId is in the task_ids array
      const index = this.task_ids.indexOf(subTaskId);
      if (index === -1) {
        // If not in the array, add it
        this.task_ids.push(subTaskId);
      } else {
        // If already in the array, remove it
        this.task_ids.splice(index, 1);
      }
    },
    movetoTodo(item,type){
      this.undoAsstId = item.id;
      this.typeOfAssignment = type;
      this.todoItem = item;
      this.todoType = this.typeOfAssignment;
      if (this.todoType == 'Done'){
        $("#undoAssignmentConfirmation").modal({ backdrop: true });
      }else{
        this.undoAsstComplete();
      } 
    },
    movetoDone(item,type){
      let assignment = item;
      this.completeAsstId = assignment.id;
      this.assignmentId = assignment.id;
      this.schoologyAssignment = assignment.schoologyAssignment;
      this.submissionId = assignment.submission_id;
      this.completeAsstId = item.id;
      this.typeOfAssignment = type;
      this.doneItem = item;
      this.doneType = this.typeOfAssignment;
      $("#completeConfirm").modal({ backdrop: true });
    },
    movetoDoing(item, type) {
      let assignment = item;
      this.completeAsstId = assignment.id;
      this.assignmentId = assignment.id;
      this.schoologyAssignment = assignment.schoologyAssignment;
      this.submissionId = assignment.submission_id;
      this.typeOfAssignment = type;
      this.doingItem = item;
      this.doingType = this.typeOfAssignment;
      if (this.doingType == 'Done') {
        $("#undoAssignmentConfirmationoverdue").modal({ backdrop: true });
      } else  {
        this.doingAssignment();
      }
  },
  selectSubject(selectedSubject) {
      this.subject = {
      id: selectedSubject.id,
      text: selectedSubject.subject_name
    };
  }
  },
}
</script>
<style scoped>
.clickable {
  cursor: pointer;
}
.dragging,.draggingTodo,.draggingDone,.draggingDue {
  opacity: 0.75;
  /* Initial opacity, you can adjust it as needed */
  transition: opacity 0.3s;
  /* Apply a transition effect to the opacity property */
  border: 1.25px dashed rgba(80, 48, 229, 0.59);
  background-color: rgba(80, 48, 229, 0.06);
}
.drop-zone{
  min-height: 0px;
  opacity: 0;
  transition: ease-in-out 0.1s all;
}
.dropping{
  transition: background-color 0.2s ease, border 0.2s ease;
  border: 1.25px solid rgba(80, 48, 229, 0.59);
  background-color: rgba(80, 48, 229, 0.06);
  display: block;
  opacity: 1;
  min-height: 100px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 16px;
  /* transition: ease-in-out 0.3s all; */
}
.disabled {
    pointer-events: none; /* Prevent interaction with the contents */
}

</style>
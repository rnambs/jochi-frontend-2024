<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div class="main-section">
      <!-- tab for club info -->
      <div
        class="
          jochi-components-light-bg
          custom-margin-for-main-section custom-full-height
          d-flex
          flex-column
        "
      >
        <!-- end tab for club info -->

        <div class="cd-cover-pic-section position-relative">
          <div class="black-grad"></div>
          <div class="position-absolute cover-button mr-3 mb-1 d-flex align-items-center">
            <button class="btn p-1 m-2">
              <i class="fas fa-pen color-white"></i>
            </button>
            <div class="d-flex align-items-center">
              <button class="btn p-1 m-2">
                <i class="fas fa-info-circle color-white"></i>
              </button>
              <p class="mb-0 color-secondary text-14 font-regular">1200 X 180</p>
            </div>
          </div>
        </div>

        <!-- image upload -->
        <VueCropper></VueCropper>
        <!-- image upload end -->

        <!-- Club info -->

        <section id="club-detail" class="d-flex flex-column flex-fill h-40">
          <div
            class="
              club-section
              container-fluid
              mt-2
              d-flex
              flex-column flex-fill
              h-40
              custom-overflow
            "
          >
            <div
              class="
                inner-club
                club-info
                d-flex
                flex-column
                container-fluid
                h-40
                flex-fill
                pt-3
                px-3
              "
            >
              <div class="info-head my-2">
                <h3 class="color-primary font-bold">{{ headingName }}</h3>
              </div>
              <div
                class="
                  inner-info
                  container-fluid
                  my-1
                  d-flex
                  flex-column
                  h-40
                  flex-fill
                "
              >
                <div class="row my-0 h-40 flex-fill">
                  <div
                    v-if="type == 'Sports'"
                    class="col-md-6 col-xs-12 h-100 d-flex"
                  >
                    <div
                      class="
                        inner-info
                        container-fluid
                        p-2
                        d-flex
                        flex-column
                        card card-primary
                        rounded-22
                        p-4
                      "
                    >
                      <div
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                          mb-3
                          px-2
                        "
                      >
                        <h5 class="color-dark mb-0 font-bold">
                          Trainings/Matches
                        </h5>
                        <a
                          v-if="enableEdit"
                          href="#"
                          class="btn add-assignment p-1 color-secondary"
                          data-toggle="modal"
                          @click="openActivityModal()"
                          ><span><i class="fas fa-plus-circle"></i></span
                        ></a>
                      </div>
                      <div class="hidden-scroll p-2">
                        <div
                          v-for="(item, index) in sportsActivities"
                          :key="index"
                        >
                          <div
                            v-if="item.session_type == 'Match'"
                            class="card card-void px-3 py-2 mb-3"
                          >
                            <div class="d-flex flex-column">
                              <div
                                class="
                                  d-flex
                                  flex-row flex-sm-column flex-lg-row
                                  justify-content-between
                                  w-100
                                "
                              >
                                <div
                                  @click="openEditSportsActivity(item)"
                                  class="left-side"
                                >
                                  <h4
                                    @click="openEditSportsActivity(item)"
                                    class="
                                      color-primary
                                      text-truncate
                                      mb-1
                                      font-semi-bold
                                      text-18
                                    "
                                  >
                                    {{ item.title }}
                                  </h4>
                                  <p
                                    class="
                                      color-dark
                                      text-16
                                      font-semi-bold
                                      mb-0
                                    "
                                  >
                                    {{ item.first_name }}
                                    <span>{{ headingName }}</span>
                                    <span
                                      class="
                                        color-primary
                                        text-18
                                        font-semi-bold
                                      "
                                      >Vs</span
                                    >
                                    <span>{{ item.opponent_team }}</span>
                                  </p>
                                  <p
                                    class="
                                      color-secondary
                                      text-14
                                      font-regular
                                      mb-1
                                    "
                                  >
                                    <span>{{ item.date }}</span
                                    ><span>, </span><span>{{ item.time }}</span>
                                  </p>
                                </div>
                                <div
                                  class="
                                    right-side
                                    h-100
                                    d-flex
                                    align-items-end align-items-sm-center
                                    justify-content-between
                                    flex-column flex-sm-row
                                  "
                                >
                                  <p class="mb-0 color-secondary mr-2">
                                    <span
                                      ><i class="fas fa-map-marker-alt"></i
                                    ></span>
                                    <span>{{ item.venue }}</span>
                                  </p>
                                  <div class="d-flex justify-content-end">
                                    <!-- <div
                                        :class="
                                          isRead == 1
                                            ? 'anc-status-btn green mr-3'
                                            : 'anc-status-btn red mr-3'
                                        "
                                      ></div> -->
                                    <button
                                      v-if="enableEdit"
                                      @click="
                                        onDeleteActivityClick(
                                          item.id,
                                          item.club_id
                                        )
                                      "
                                      data-toggle="modal"
                                      data-target="#mediumModal"
                                      class="btn p-1 color-secondary"
                                    >
                                      <span>
                                        <i
                                          class="fa fa-trash"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <p
                                class="
                                  mb-0
                                  color-secondary
                                  text-14
                                  font-regular
                                "
                              >
                                {{ item.desc }}
                              </p>
                            </div>
                          </div>
                          <div v-else class="card card-void px-3 py-2 mb-3">
                            <div
                              class="
                                d-flex
                                flex-row flex-sm-column flex-lg-row
                                justify-content-between
                                w-100
                              "
                            >
                              <div
                                @click="openEditSportsActivity(item)"
                                class="left-side"
                              >
                                <p
                                  class="color-dark text-16 font-semi-bold mb-0"
                                >
                                  {{ item.first_name }}
                                </p>
                                <p
                                  class="
                                    color-secondary
                                    text-14
                                    font-regular
                                    mb-1
                                  "
                                >
                                  {{ item.date }}
                                </p>
                                <p
                                  class="
                                    color-secondary
                                    text-14
                                    font-regular
                                    mb-0
                                  "
                                >
                                  {{ item.time }}
                                </p>
                              </div>
                              <div
                                class="
                                  right-side
                                  h-100
                                  d-flex
                                  align-items-end
                                  align-items-sm-start
                                  align-items-lg-end
                                  justify-content-between
                                  flex-column flex-sm-row flex-lg-column
                                "
                              >
                                <p
                                  @click="openEditSportsActivity(item)"
                                  class="color-primary text-truncate mb-0"
                                >
                                  {{ item.title }}
                                </p>
                                <div class="d-flex justify-content-end mb-2">
                                  <!-- <div
                                        :class="
                                          item.isRead == 1
                                            ? 'anc-status-btn green mr-3'
                                            : 'anc-status-btn red mr-3'
                                        "
                                      ></div> -->
                                  <button
                                    v-if="enableEdit"
                                    @click="
                                      onDeleteClick(item.id, item.club_id)
                                    "
                                    data-toggle="modal"
                                    data-target="#mediumModal"
                                    class="btn p-1 color-secondary"
                                  >
                                    <span>
                                      <i
                                        class="fa fa-trash"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- {{ item.description }} -->
                        </div>
                      </div>
                      <!-- </div> -->
                      <!-- <div class="col-6" v-if="enableEdit">
                          <div class="inner-info-head mb-3">
                            <h6>Add Todo</h6>
                          </div>
                          <div class="form-row m-0">
                            <input
                              class="form-control"
                              v-model="todolist"
                              maxlength="30"
                            />
                            <button
                              :disabled="!todolist"
                              class="btn btn-info-edit mt-2"
                              @click.prevent="EditTodo(clubId)"
                            >
                              Update
                            </button>
                          </div>
                        </div> -->
                    </div>
                  </div>
                  <div v-else class="col-md-6 col-xs-12 h-100 d-flex">
                    <div class="inner-info container-fluid p-2">
                      <div class="">
                        <div class="inner-info-head mb-2">
                          <h5 class="color-dark mb-2 font-bold">To do!</h5>
                        </div>
                        <div class="form-group ml-4">
                          <ul class="list-unstyled">
                            <li
                              v-for="(todos, index) in clubMoreDetails.todo"
                              :key="index"
                              class="row m-0"
                            >
                              <p
                                class="
                                  mb-0
                                  col-8
                                  p-0
                                  color-secondary
                                  font-regular
                                  text-16
                                  d-flex
                                  align-items-center
                                "
                              >
                                <span
                                  class="
                                    d-flex
                                    rounded-circle
                                    border
                                    bullet
                                    mr-2
                                  "
                                ></span>
                                <span
                                  class="input-name color-dark text-truncate"
                                >
                                  {{ todos.todo_list }}</span
                                >
                              </p>
                              <p class="mb-0 col-4 p-0">
                                <span
                                  class="input-icon color-secondary btn p-1 m-0"
                                  v-if="enableEdit"
                                  @click.prevent="Removetodo(todos.id)"
                                >
                                  <i
                                    class="fa fa-times p-1"
                                    aria-hidden="true"
                                  ></i
                                ></span>
                              </p>
                            </li>
                            <li v-if="clubMoreDetails.todo === 0">
                              <span class="input-name">
                                No to-do's available</span
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="" v-if="enableEdit">
                        <div class="inner-info-head mb-2">
                          <h5 class="color-dark mb-2 font-bold">Add Todo</h5>
                        </div>
                        <div class="d-flex flex-row align-items-center mb-2">
                          <div class="form-row m-0 flex-fill mr-2">
                            <input
                              class="form-control"
                              v-model="todolist"
                              maxlength="30"
                            />
                          </div>
                          <button
                            :disabled="!todolist"
                            class="btn btn-primary"
                            @click.prevent="EditTodo(clubId)"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-xs-12 h-100 d-flex">
                    <div
                      class="
                        inner-info
                        container
                        p-2
                        d-flex
                        flex-column
                        card card-primary
                        rounded-22
                        p-4
                      "
                    >
                      <!-- <p class="time">
                        Next meeting:
                        {{
                          allList.announcement == null
                            ? "No meeting scheduled "
                            : allList.announcement
                        }}
                      </p>

                      <div class="row inner-col" v-if="enableEdit">
                        <div class="col-lg-4 col-md-12 inner-info-head">
                          <h6>Choose time</h6>
                        </div>
                        <div class="col-lg-8 col-md-12 input-icon-area">
                          <multiselect
                            v-model="value"
                            track-by="start_time"
                            label="start_time"
                            placeholder="Select the time"
                            :options="slots"
                            @input="UpdateSlots"
                          >
                            <span slot="noResult">No data found</span>
                          </multiselect>
                        </div>
                      </div> -->

                      <div
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                          mb-2
                          px-2
                        "
                      >
                        <h5 class="color-dark font-bold mb-0">Announcements</h5>
                        <a
                          v-if="enableEdit"
                          href="#"
                          class="btn add-assignment p-1 color-secondary"
                          data-toggle="modal"
                          @click="openModal()"
                          ><span><i class="fas fa-plus-circle"></i></span
                        ></a>
                      </div>
                      <div class="hidden-scroll p-2">
                        <div
                          v-for="(item, index) in announcementList"
                          :key="index"
                        >
                          <div
                            class="card card-void px-3 py-2 mb-3"
                            :class="
                              item.isRead == 1 ? 'card-void' : 'card-void'
                            "
                          >
                            <div
                              class="
                                d-flex
                                justify-content-between
                                flex-row flex-sm-column flex-lg-row
                                w-100
                              "
                            >
                              <div class="left-side">
                                <p
                                  class="color-dark mb-0 font-semi-bold text-16"
                                >
                                  {{ item.first_name }}
                                </p>
                                <p
                                  @click="openEdit(item)"
                                  class="color-primary word-break cursor-pointer mb-0 font-semi-bold"
                                >
                                  {{ item.title }}
                                </p>
                              </div>
                              <div
                                class="
                                  right-side
                                  h-100
                                  d-flex
                                  align-items-end
                                  align-items-sm-center
                                  align-items-lg-end
                                  justify-content-between
                                  flex-column flex-sm-row flex-lg-column
                                "
                              > 
                              <div class="d-flex flex-wrap justify-content-end">
                                <p
                                  class="
                                    color-secondary
                                    font-regular
                                    text-nowrap text-14
                                    mb-1
                                  "
                                >
                                  {{ item.date }}<span>, </span>
                                </p>
                                <p
                                  class="
                                    color-secondary
                                    text-nowrap
                                    font-regular
                                    text-14
                                    mb-0
                                  "
                                >
                                  {{ item.time }}
                                </p>
                              </div>
                                <div class="d-flex justify-content-end mb-2">
                                  <div class="d-flex align-items-center">
                                    <div></div>
                                    <button
                                      v-if="enableEdit"
                                      @click="
                                        onDeleteClick(item.id, item.club_id)
                                      "
                                      data-toggle="modal"
                                      data-target="#mediumModal"
                                      class="btn p-1 color-secondary"
                                    >
                                      <span>
                                        <i
                                          class="fa fa-trash"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- {{ item.description }} -->
                        </div>
                      </div>
                      <!-- <button
                        v-if="enableEdit"
                        class="btn btn-info-edit mt-2"
                        :disabled="!value"
                        @click.prevent="UpdateTime"
                      >
                        Update the next meeting
                      </button> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tab" class="">
          <div class="info-tab container-fluid mb-3 px-3">
            <div class="row tab-row m-0 px-3">
              <div class="col-md-4 col-xs-12 py-2 py-md-0">
                <nuxt-link
                  :to="{
                    path: '/club-info',
                    query: { id: clubId, name: headingName, type: type },
                  }"
                  class="
                    inner-tab
                    d-flex
                    align-items-center
                    justify-content-center
                    p-2
                    rounded-10
                    h-100
                  "
                >
                  <!-- <i class="fas fa-info"></i> -->
                  <span class="text-24 color-primary font-semi-bold"
                    >Club Details</span
                  >
                </nuxt-link>
              </div>
              <div class="col-md-4 col-xs-12 py-2 py-md-0">
                <nuxt-link
                  :to="{
                    path: '/club-files',
                    query: { id: clubId, name: headingName, type: type },
                  }"
                  class="
                    inner-tab
                    d-flex
                    align-items-center
                    justify-content-center
                    p-2
                    rounded-10
                    h-100
                  "
                >
                  <!-- <i class="fas fa-file-alt"></i> -->
                  <span class="text-24 color-primary font-semi-bold"
                    >Files/Slides</span
                  >
                </nuxt-link>
              </div>
              <div
                @click="onNextMeeting"
                class="col-md-4 col-xs-12 py-2 py-md-0"
              >
                <div
                  class="
                    inner-tab
                    default
                    d-flex
                    flex-column
                    align-items-center
                    justify-content-center
                    p-2
                    rounded-10
                    h-100
                    cursor-pointer
                  "
                >
                  <!-- <nuxt-link
                    :to="{
                      path: '/club-moreInfo',
                      query: { id: clubId, name: headingName },
                    }"
                    class="inner-tab"
                  > -->
                  <!-- <i class="fas fa-ellipsis-h"></i> -->
                  <span class="text-24 color-primary font-semi-bold"
                    >Next Meeting</span
                  >
                  <span class="text-16 color-primary font-regular">{{
                    clubMoreDetails.announcement
                  }}</span>
                  <!-- </nuxt-link> -->
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- End Club info -->
      </div>
    </div>
    <!-- modal delete confirm pop up -->
    <div
      class="modal fade"
      id="mediumModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="mediumModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md modal-dialog-centered" role="document">
        <div class="modal-content h-auto">
          <div class="modal-header text-dark">
            <h5 class="modal-title" id="mediumModalLabel">Delete</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-left">Are you sure you want to delete this item?</p>
          </div>
          <div class="modal-footer bg-white text-dark">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-secondary px-4 py-1 rounded-pill"
              aria-label="Close"
            >
              No
            </button>
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-primary color-white px-4 py-1 rounded-pill"
              @click="
                deleteActivityClickId
                  ? onDeleteActivity()
                  : onDeleteAnnouncement()
              "
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal delete confirm pop up -->

    <!-- modal for add announcement -->
    <div
      class="modal fade"
      id="announcementModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="announcementModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="announcementModalLongTitle">
              {{ enableEdit ? (isAnnouncementEdit ? "Edit" : "Add") : "" }}
              Announcement
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="resetAnnouncement"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body no-overflow px-4">
            <form name="announcement">
              <fieldset :disabled="!enableEdit">
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label color-secondary"
                    >Title<em>*</em></label
                  >

                  <input
                    type="text"
                    id="club"
                    placeholder="Enter your club name"
                    class="form-control"
                    v-model="announcement.announceTitle"
                    name="announceTitle"
                    maxlength="100"
                    :class="{
                      'is-invalid':
                        submitted &&
                        isAnnouncement &&
                        $v.announcement.announceTitle.$error,
                    }"
                  />
                  <div
                    v-if="
                      submitted &&
                      isAnnouncement &&
                      $v.announcement.announceTitle.$error
                    "
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.announcement.announceTitle.required"
                      >This field is required</span
                    >
                  </div>
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label color-secondary"
                    >Description<em>*</em></label
                  >
                  <textarea
                    class="form-control"
                    id="message-text"
                    v-model="announcement.announceDesc"
                    name="announceDesc"
                    maxlength="800"
                    placeholder="Enter task description"
                    :class="{
                      'is-invalid':
                        submitted &&
                        isAnnouncement &&
                        $v.announcement.announceDesc.$error,
                    }"
                  ></textarea>
                  <div
                    v-if="
                      submitted &&
                      isAnnouncement &&
                      $v.announcement.announceDesc.$error
                    "
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.announcement.announceDesc.required"
                      >This field is required</span
                    >
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
          <div v-if="enableEdit" class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary px-3 py-1 rounded-pill"
              data-dismiss="modal"
              @click="resetAnnouncement"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary px-3 py-1 rounded-pill"
              :disabled="submitted && !$v.announcement.$invalid"
              @click="
                isAnnouncementEdit
                  ? updateAnnouncementId()
                  : addNewAnnouncement()
              "
            >
              {{ (isAnnouncementEdit ? "Update" : "Add") + " Announcement" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal add announcement -->

    <!-- modal for add activities -->
    <div
      class="modal fade"
      id="activityModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="activityModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="activityModalLongTitle">
              {{ enableEdit ? (isActivityEdit ? "Edit" : "Add") : "" }}
              Training/Match
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body d-flex flex-column px-4">
            <div class="custom-overflow pr-2 mr--2">
              <form>
                <fieldset :disabled="!enableEdit">
                  <div class="form-row">
                    <label for="recipient-name" class="col-form-label"
                      >Type<em>*</em></label
                    >

                    <select
                      class="form-control bg-white mb-3"
                      tabindex=""
                      name="activityType"
                      v-model="activity.activityType"
                      :class="{
                        'is-invalid':
                          submittedActivity &&
                          isActivity &&
                          $v.activity.activityType.$error,
                      }"
                    >
                      <option value="Match">Match</option>
                      <option value="Training">Training</option>
                    </select>
                    <div
                      v-if="
                        submittedActivity &&
                        isActivity &&
                        $v.activity.activityType.$error
                      "
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.activity.activityType.required"
                        >This field is required</span
                      >
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label"
                      >Title<em>*</em></label
                    >

                    <input
                      type="text"
                      id="club"
                      placeholder="Enter the title"
                      class="form-control bg-white"
                      v-model="activity.activityTitle"
                      name="activityTitle"
                      maxlength="100"
                      :class="{
                        'is-invalid':
                          submittedActivity &&
                          isActivity &&
                          $v.activity.activityTitle.$error,
                      }"
                    />
                    <div
                      v-if="
                        submittedActivity &&
                        isActivity &&
                        $v.activity.activityTitle.$error
                      "
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.activity.activityTitle.required"
                        >This field is required</span
                      >
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="message-text" class="col-form-label"
                      >Description<em>*</em></label
                    >
                    <textarea
                      class="form-control bg-white"
                      id="message-text"
                      v-model="activity.activityDesc"
                      name="activityDesc"
                      maxlength="800"
                      placeholder="Enter description"
                      :class="{
                        'is-invalid':
                          submittedActivity &&
                          isActivity &&
                          $v.activity.activityDesc.$error,
                      }"
                    ></textarea>
                    <div
                      v-if="
                        submittedActivity &&
                        isActivity &&
                        $v.activity.activityDesc.$error
                      "
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.activity.activityDesc.required"
                        >This field is required</span
                      >
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label"
                      >Date<em>*</em></label
                    >

                    <!-- <input
                      type="text"
                      id="club"
                      placeholder="Enter the date"
                      class="form-control"
                      v-model="activity.activityDate"
                      name="activityDate"
                      maxlength="100"
                      :class="{
                        'is-invalid':
                          submittedActivity &&
                          isActivity &&
                          $v.activity.activityDate.$error,
                      }"
                    /> -->
                    <!-- <input
                      type="text"
                      name="daterange"
                      @change="onDateChange($event)"
                      v-model="activity.activityDate"
                      autocomplete="off"
                      placeholder="Date Range"
                      class="form-control tab-form-control custom-form-control"
                      :class="{
                        'is-invalid':
                          submittedActivity &&
                          isActivity &&
                          $v.activity.activityDate.$error,
                      }"
                    /> -->
                    <date-picker
                      class="form-control bg-white"
                      placeholder="MM/DD/YYYY"
                      format="MM/dd/yyyy"
                      :value="activity.activityDate"
                      v-model="activity.activityDate"
                      :disabled-dates="disabledDates"
                      @change="onDateChange"
                      name="activityDate"
                      :class="{
                        'is-invalid':
                          submittedActivity &&
                          isActivity &&
                          $v.activity.activityDate.$error,
                      }"
                    />
                    <div
                      v-if="
                        submittedActivity &&
                        isActivity &&
                        $v.activity.activityDate.$error
                      "
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.activity.activityDate.required"
                        >This field is required</span
                      >
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label"
                      >Time<em>*</em></label
                    >

                    <!-- <input
                      type="text"
                      id="club"
                      placeholder="Enter the time"
                      class="form-control"
                      v-model="activityTime"
                      name="activityTime"
                      maxlength="100"
                      :class="{
                        'is-invalid':
                          submittedActivity &&
                          isActivity &&
                          $v.activity.activityTime.$error,
                      }"
                    /> -->
                    <vue-timepicker
                      format="hh:mm A"
                      v-model="activity.activityTime"
                      name="activityTime"
                      class="show-cursor form-white"
                      :value="activity.activityTime"
                      :class="{
                        'is-invalid':
                          submittedActivity && $v.activity.activityTime.$error,
                      }"
                    ></vue-timepicker>
                    <div
                      v-if="
                        submittedActivity &&
                        isActivity &&
                        $v.activity.activityTime.$error
                      "
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.activity.activityTime.required"
                        >This field is required</span
                      >
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label"
                      >Venue<em>*</em></label
                    >

                    <input
                      type="text"
                      id="club"
                      placeholder="Enter the venue"
                      class="form-control bg-white"
                      v-model="activity.activityVenue"
                      name="activityVenue"
                      maxlength="100"
                      :class="{
                        'is-invalid':
                          submittedActivity &&
                          isActivity &&
                          $v.activity.activityVenue.$error,
                      }"
                    />
                    <div
                      v-if="
                        submittedActivity &&
                        isActivity &&
                        $v.activity.activityVenue.$error
                      "
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.activity.activityVenue.required"
                        >This field is required</span
                      >
                    </div>
                  </div>
                  <div
                    v-if="activity.activityType == 'Match'"
                    class="form-group"
                  >
                    <label for="recipient-name" class="col-form-label"
                      >Opponent Team<em>*</em></label
                    >

                    <input
                      type="text"
                      id="club"
                      placeholder="Enter the opponent team name"
                      class="form-control bg-white"
                      v-model="activity.activityOpponentTeam"
                      name="activityOpponentTeam"
                      maxlength="100"
                      :class="{
                        'is-invalid':
                          submittedActivity &&
                          isActivity &&
                          $v.activity.activityOpponentTeam.$error,
                      }"
                    />
                    <div
                      v-if="
                        submittedActivity &&
                        isActivity &&
                        $v.activity.activityOpponentTeam.$error
                      "
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.activity.activityOpponentTeam.required"
                        >This field is required</span
                      >
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
          <div v-if="enableEdit" class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary px-3 py-1 rounded-pill"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary px-3 py-1 rounded-pill"
              :disabled="submittedActivity && !$v.activity.$invalid"
              @click="isActivityEdit ? updateActivity() : addNewActivity()"
            >
              {{ (isActivityEdit ? "Update" : "Add") + " Training/Match" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal add activities -->

    <!-- modal for add next meeting -->
    <div
      class="modal fade"
      id="nextMeetingModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="nextMeetingModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title color-dark" id="nextMeetingModalLongTitle">
              Configure Meeting Days
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body no-overflow px-4">
            <!-- <div class="col-md-5 col-xs-12"> -->
            <div class="inner-info container">
              <div class="inner-info-head mb-3">
                <h6 class="color-dark mb-0">Meeting Time</h6>
              </div>
              <p class="color-secondary text-14 font-regular">
                Next meeting:
                {{
                  clubMoreDetails.announcement == null
                    ? "No meeting scheduled "
                    : clubMoreDetails.announcement
                }}
              </p>

              <div class="row inner-col mb-3" v-if="enableEdit">
                <div
                  class="
                    col-lg-4 col-md-12
                    inner-info-head
                    d-flex
                    align-items-center
                  "
                >
                  <h6 class="color-dark mb-0">Choose time</h6>
                </div>
                <div class="col-lg-8 col-md-12 input-icon-area form-row">
                  <multiselect
                    v-model="value"
                    track-by="start_time"
                    label="start_time"
                    placeholder="Select the time"
                    :options="slots"
                    @input="UpdateSlots"
                  >
                    <span slot="noResult">No data found</span>
                  </multiselect>
                </div>
              </div>

              <div class="row choose-date my-2 m-0 p-0">
                <div
                  class="col p-0 d-flex justify-content-center"
                  v-for="(day, index) in dayList"
                  :key="index"
                  @click.prevent="
                    UpdateDays(day);
                    $event.target.classList.toggle('active');
                  "
                >
                  <a
                    class="
                      btn
                      date-picker
                      badge badge-pill badge-color
                      active
                      mx-1
                    "
                    :id="day"
                    v-if="checkSlot(day)"
                    >{{ day }}</a
                  >
                  <a
                    href=""
                    class="btn date-picker badge badge-pill badge-color mx-1"
                    :id="day"
                    v-else
                    >{{ day }}</a
                  >
                </div>
              </div>
              <!-- <button
                v-if="enableEdit"
                class="btn btn-info-edit mt-2"
                :disabled="!value"
                @click.prevent="UpdateTime"
              >
                Update the next meeting
              </button> -->
            </div>
            <!-- </div> -->
          </div>
          <div class="modal-footer px-4">
            <!-- <button
              type="button"
              class="btn btn-color-close"
              data-dismiss="modal"
            >
              Cancel
            </button> -->
            <button
              v-if="enableEdit"
              class="btn btn-primary rounded-pill mt-2 py-1 px-4"
              :disabled="!value"
              @click.prevent="UpdateTime"
            >
              Update the next meeting
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal add assignment -->
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import { required, requiredUnless } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
import VueTimepicker from "vue2-timepicker";
import vueCropper from "vue-cropperjs";
import VueCropper from "./VueCropper.vue";

var today = new Date();
var activityDate = "";
var clubId = "";
var list_data = "";
export default {
  name: "UserClubFiles",
  components: {
    lottie,
    Multiselect,
    VueTimepicker,
    vueCropper,
    VueCropper,
  },
  data() {
    return {
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      headingName: this.$route.query.name,
      clubId: this.$route.query.id,
      type: this.$route.query.type,
      list_data: [],
      dateArray: [],
      simpleStringValue: "",
      announcement: "",
      dayList: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      todolist: "",
      value: "",
      daysArray: [],
      dayArrVal: [],
      valueId: "",
      deleteClickId: 0,
      deleteClubId: 0,
      deleteActivityClickId: 0,
      deleteActivityClubId: 0,
      isAnnouncementEdit: false,
      isActivityEdit: false,
      announceTitle: "",
      announceDesc: "",
      announcementId: 0,
      submitted: false,
      submittedActivity: false,
      announcementList: [],
      activityId: "",
      activityType: "",
      activityTitle: "",
      activityDesc: "",
      activityDate: "",
      activityTime: "",
      activityVenue: "",
      activityOpponentTeam: "",
      isAnnouncement: false,
      isActivity: false,
      announcement: {
        announceTitle: "",
        announceDesc: "",
      },
      activity: {
        activityType: "",
        activityTitle: "",
        activityDesc: "",
        activityDate: "",
        activityTime: "",
        activityVenue: "",
        activityOpponentTeam: "",
      },
      disabledDates: {
        to: new Date(),
      },
      date_today: new Date(),
    };
  },
  validations: {
    announcement: {
      announceTitle: { required },
      announceDesc: { required },
    },
    activity: {
      activityType: { required },
      activityTitle: { required },
      activityDesc: { required },
      activityDate: { required },
      activityTime: { required },
      activityVenue: { required },
      activityOpponentTeam: {
        required: requiredUnless((vm) => {
          return vm.activity
            ? vm.activity.activityOpponentTeam === "Match"
            : false;
        }),
      },
    },
  },
  mounted() {
    this.disabledDates.to = new Date(
      this.date_today.getFullYear(),
      this.date_today.getMonth(),
      this.date_today.getDate()
    );
    var user;
    var user = localStorage.getItem("user_type");
    this.getAnnouncement();
    this.getSportActivities();
    this.getClubMoreInfo();
    // if (user == 3) {
    this.ClubMoreInfo();
    this.SlotswithId();
    // } else {
    //   this.$router.push("/");
    // }
    this.initializeDatePicker();
  },
  computed: {
    ...mapState("clubMoreInfo", {
      allList: (state) => state.allList,
      clubMoreDetails: (state) => state.clubMoreDetails,
      announcements: (state) => state.announcements,
      sportsActivities: (state) => state.sportsActivities,
      enableEdit: (state) => state.enableEdit,
      slots: (state) => state.slots,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
    checkIsAnnouncement() {
      return this.isAnnouncement; // some conditional logic here...
    },
    checkIsActivity() {
      return this.isActivity; // some conditional logic here...
    },
  },
  methods: {
    ...mapActions("clubMoreInfo", {
      clubMoreInfo: "clubMoreInfo",
      editTodo: "editTodo",
      updateTime: "updateTime",
      slotswithId: "slotswithId",
      removetodo: "removetodo",
      getAnnouncements: "getAnnouncements",
      deleteAnnouncement: "deleteAnnouncement",
      addAnnouncement: "addAnnouncement",
      updateAnnouncement: "updateAnnouncement",
      markAsRead: "markAsRead",
      getActivities: "getActivities",
      addActivities: "addActivities",
      updateActivities: "updateActivities",
      deleteActivity: "deleteActivity",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async getAnnouncement() {
      this.loading = true;
      await this.getAnnouncements({
        club_id: this.clubId,
        // user_id: localStorage.getItem("id"),
      });
      this.loading = false;
      this.announcementList = [];
      this.announcements.forEach((e) => {
        e["date"] = moment(e.createdAt).format("MMMM Do, YYYY");
        e["time"] = moment(e.createdAt).format("h:mm A");
        // e["time"] = moment(e.createdAt, "h:mm a");
        this.announcementList.push(e);
      });
    },
    checkSlot(day) {
      if (this.dateArray.includes(day)) {
        return true;
      } else {
        return false;
      }
    },

    async getClubMoreInfo() {
      await this.clubMoreInfo({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
      });
    },
    async ClubMoreInfo() {
      this.loading = true;

      this.loading = false;
      this.list_data = [];

      var daysArr = [];
      if (this.allList.days) {
        this.allList.days.forEach((day) => {
          daysArr.push(day);
        });
      }
      this.dateArray = daysArr;
      var todoArr = [];
      if (this.allList.todo) {
        this.allList.todo.forEach((element) => {
          var ScheduleArr = {};
          ScheduleArr["name"] = element.todo_list;
          ScheduleArr["id"] = element.id;
          todoArr.push(ScheduleArr);
        });
        this.list_data = todoArr;
      }
    },
    async EditTodo() {
      this.loading = true;
      await this.editTodo({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
        title: this.todolist,
      });
      this.loading = false;
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.getClubMoreInfo();
      this.todolist = "";
    },
    async UpdateTime() {
      this.dayArrVal = [];
      let activeElements = document.getElementsByClassName(
        "badge badge-pill badge-color active"
      );
      let tempArray = [];
      Array.prototype.forEach.call(activeElements, function (element) {
        tempArray.push(element.id);
      });
      this.dayArrVal = tempArray;
      this.loading = true;
      await this.updateTime({
        club_id: this.clubId,
        user_id: localStorage.getItem("id"),
        week: this.dayArrVal,
        slot_id: this.valueId,
      });

      this.loading = false;

      if (this.successMessage != "") {
        $("#nextMeetingModal").modal("hide");
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.value = "";
      this.getClubMoreInfo();
    },
    async Removetodo(val) {
      this.loading = true;
      await this.removetodo({
        club_id: this.clubId,
        user_id: localStorage.getItem("id"),
        todoId: val,
      });
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.getClubMoreInfo();

      this.loading = false;
    },
    async SlotswithId() {
      await this.slotswithId({});
    },

    UpdateDays(value) {
      this.daysArray.push(value);
      this.dayArrVal = [];
      this.daysArray.forEach((element) => {
        this.dayArrVal.push(element);
      });
    },
    UpdateSlots(val) {
      this.valueId = val.id;
    },
    onDeleteClick(id, clubId) {
      this.deleteClickId = id;
      this.deleteClubId = clubId;
    },
    async onDeleteAnnouncement() {
      this.loading = true;
      await this.deleteAnnouncement({
        id: this.deleteClickId,
        clubId: this.deleteClubId,
      });
      this.loading = false;
      if (this.successMessage != "") {
        this.deleteClickId = 0;
        this.deleteClubId = 0;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.getAnnouncement();
      }
    },
    async openModal() {
      this.$v.$reset();
      this.resetAnnouncement();
      this.submitted = false;
      this.isAnnouncement = true;
      this.isAnnouncementEdit = false;
      $("#announcementModal").modal({ backdrop: true });
    },
    async openActivityModal() {
      this.$v.$reset();
      this.resetActivity();
      this.submitted = false;
      this.isActivity = true;
      this.isActivityEdit = false;
      $("#activityModal").modal({ backdrop: true });
    },
    async openEdit(data) {
      this.resetAnnouncement();
      this.isAnnouncementEdit = true;
      this.markAnnouncementAsRead(data.id);
      // this.dateValue = new Date(this.calendarApi.view.activeStart);
      // this.isAssignmentEdit = false;
      this.announcementId = data.id;
      this.announcement.announceTitle = data.title;
      this.announcement.announceDesc = data.description;
      // this.announceDate = new Date(data.date);
      this.announceClubId = data.club_id;
      $("#announcementModal").modal({ backdrop: true });
    },
    async openEditSportsActivity(data) {
      this.resetActivity();
      this.isActivityEdit = true;
      this.activityId = data.id;
      this.activity.activityType = data.session_type;
      this.activity.activityTitle = data.title;
      this.activity.activityDesc = data.description;
      this.activity.activityDate = data.date;
      this.activity.activityTime = data.time;
      this.activity.activityVenue = data.venue;
      this.activity.activityOpponentTeam = data.opponent_team;
      $("#activityModal").modal({ backdrop: true });
    },
    async addNewAnnouncement() {
      this.submitted = true;
      this.$v.announcement.announceTitle.$touch();
      this.$v.announcement.announceDesc.$touch();
      if (this.$v.announcement.$invalid) {
        return;
      } else {
        this.loading = true;
        await this.addAnnouncement({
          title: this.announcement.announceTitle,
          description: this.announcement.announceDesc,
          club_id: this.clubId,
        });
        this.loading = false;
        this.submitted = false;
        if (this.successMessage != "") {
          this.resetAnnouncement();
          $("#announcementModal").modal("hide");
          $(".modal").modal("hide");
          $(".modal-backdrop").remove();
          this.deleteClickId = 0;
          this.deleteClubId = 0;
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
          this.getAnnouncement();
        }
      }
    },
    async updateAnnouncementId() {
      this.loading = true;
      this.submitted = true;
      this.$v.announcement.announceTitle.$touch();
      this.$v.announcement.announceDesc.$touch();
      if (this.$v.announcement.$invalid) {
        return;
      } else {
        await this.updateAnnouncement({
          id: this.announcementId,
          title: this.announcement.announceTitle,
          description: this.announcement.announceDesc,
          club_id: this.clubId,
        });
        this.loading = false;
        this.submitted = false;

        if (this.successMessage != "") {
          $("#announcementModal").modal("hide");
          $(".modal").modal("hide");
          $(".modal-backdrop").remove();
          this.isAnnouncementEdit = false;
          this.resetAnnouncement();
          this.deleteClickId = 0;
          this.deleteClubId = 0;
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
          this.getAnnouncement();
        }
      }
    },
    resetAnnouncement() {
      this.isAnnouncement = false;
      this.announceClubId = "";
      this.announcementId = "";
      this.announcement.announceTitle = "";
      this.announcement.announceDesc = "";
    },
    resetActivity() {
      this.isActivity = false;
      this.activityId = "";
      this.activity.activityTitle = "";
      this.activity.activityType = "";
      this.activity.activityDesc = "";
      this.activity.activityDate = "";
      this.activity.activityTime = "";
      this.activity.activityVenue = "";
      this.activity.activityOpponentTeam = "";
    },
    async markAnnouncementAsRead(id) {
      this.loading = true;
      await this.markAsRead({
        announcement_id: id,
        club_id: this.clubId,
      });
      this.loading = false;
      this.getAnnouncement();
    },
    async getSportActivities() {
      this.loading = true;
      await this.getActivities({
        club_id: this.clubId,
      });
      this.loading = false;
      // this.announcementList = [];
      // this.announcements.forEach((e) => {
      //   e["date"] = moment(e.createdAt).format("MMMM Do, YYYY");
      //   e["time"] = moment(e.createdAt).format("h:mm A");
      //   // e["time"] = moment(e.createdAt, "h:mm a");
      //   this.announcementList.push(e);
      // });
    },
    async addNewActivity() {
      console.log(this.activity);
      let act = this.activity;
      this.submittedActivity = true;
      this.$v.activity.activityTitle.$touch();
      this.$v.activity.activityDesc.$touch();
      this.$v.activity.activityType.$touch();
      this.$v.activity.activityDate.$touch();
      this.$v.activity.activityTime.$touch();
      this.$v.activity.activityVenue.$touch();
      if (act.activityType == "Match") {
        this.$v.activity.activityOpponentTeam.$touch();
      }
      if (this.$v.activity.$invalid) {
        return;
      } else {
        this.loading = true;
        await this.addActivities({
          club_id: this.clubId,
          title: this.activity.activityTitle,
          description: this.activity.activityDesc,
          session_type: this.activity.activityType,
          date: this.activity.activityDate
            ? moment(this.activity.activityDate).format("YYYY-MM-DD")
            : "",
          time: this.activity.activityTime,
          venue: this.activity.activityVenue,
          opponent_team: this.activity.activityOpponentTeam,
        });
        this.loading = false;
        this.submittedActivity = false;
        if (this.successMessage != "") {
          this.resetActivity();
          $("#activityModal").modal("hide");
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
          this.getSportActivities();
        }
      }
    },
    async updateActivity() {
      this.loading = true;
      this.submittedActivity = true;
      this.$v.activity.activityTitle.$touch();
      this.$v.activity.activityDesc.$touch();
      this.$v.activity.activityType.$touch();
      this.$v.activity.activityDate.$touch();
      this.$v.activity.activityTime.$touch();
      this.$v.activity.activityVenue.$touch();
      // this.$v.activity.activityOpponentTeam.$touch();
      if (this.$v.activity.$invalid) {
        return;
      } else {
        await this.updateActivities({
          id: this.activityId,
          club_id: this.clubId,
          title: this.activity.activityTitle,
          description: this.activity.activityDesc,
          session_type: this.activity.activityType,
          date: this.activity.activityDate,
          time: this.activity.activityTime,
          venue: this.activity.activityVenue,
          opponent_team: this.activity.activityOpponentTeam,
        });
        this.loading = false;
        this.submittedActivity = false;

        if (this.successMessage != "") {
          $("#activityModal").modal("hide");
          $(".modal-backdrop").remove();
          this.isActivityEdit = false;
          this.resetActivity();
          this.$toast.open({
            message: this.successMessage,
            type: this.SuccessType,
            duration: 5000,
          });
          this.getSportActivities();
        }
      }
    },
    onDeleteActivityClick(id, clubId) {
      this.deleteActivityClickId = id;
      this.deleteActivityClubId = clubId;
    },
    async onDeleteActivity() {
      this.loading = true;
      await this.deleteActivity({
        id: this.deleteActivityClickId,
        clubId: this.deleteActivityClubId,
      });
      this.loading = false;
      if (this.successMessage != "") {
        this.deleteClickId = 0;
        this.deleteClubId = 0;
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.getSportActivities();
      }
    },
    onNextMeeting() {
      if (this.enableEdit) {
        $("#nextMeetingModal").modal();
      }
    },
    initializeDatePicker() {
      $(function () {
        $('input[name="daterange"]').daterangepicker({
          autoUpdateInput: false,
          singleDatePicker: true,
          minDate: today,

          opens: "left",
          locale: {
            format: "DD-MM-YYYY",
            cancelLabel: "Clear",
          },
        });

        $('input[name="daterange"]').on(
          "apply.daterangepicker",
          function (ev, picker) {
            $(this).val(picker.startDate.format("MM/DD/YYYY"));
            activityDate = picker.startDate.format("YYYY-MM-DD");
            // endDate = picker.endDate.format("YYYY-MM-DD");
          }
        );

        $('input[name="daterange"]').on(
          "cancel.daterangepicker",
          function (ev, picker) {
            $(this).val("");
          }
        );
      });
    },
    onDateChange(event) {
      console.log(event, this.activity.activityDate);
      this.activity.activityDate = moment(this.activity.activityDate).format(
        "YYYY-MM-DD"
      );
      console.log(this.activity.activityDate);
    },
  },
};
</script>
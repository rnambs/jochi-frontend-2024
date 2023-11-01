<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div :class="!accordionOpened ? 'main-section' : 'main-section opened'">
      <!-- tab for club info -->
      <div
        class="bg-global border-0 rounded-10 m--12 custom-full-height d-flex flex-column"
      >
        <!-- end tab for club info -->
        <div
          class="cd-cover-pic-section position-relative"
          v-bind:style="{
            'background-image':
              'url(' +
              (clubBannerImage
                ? clubBannerImage
                : '../../image/cover-pic.jpg') +
              ')',
          }"
        >
          <div class="black-grad"></div>
          <div
            class="position-absolute cover-button mr-3 mb-1 d-flex align-items-center"
          >
            <button
              v-if="enableEdit"
              @click="openAddBanner"
              class="btn p-1 m-2"
            >
              <i class="fas fa-pen color-white"></i>
            </button>

            <button
              v-if="enableEdit"
              class="btn p-0 tooltip01 right-tip"
              CustomTitle="1200 X 180"
            >
              <i class="fas fa-info-circle color-white"></i>
            </button>

            <button class="btn p-1 m-2" v-on:click="toggleDropdown">
              <i class="fas fa-cog color-white"></i>
            </button>
          </div>
        </div>
        <div class="position-relative">
          <div
            v-bind:class="{
              'dropdown-club bg-global border rounded-10': true,
              'dropdown-club--visible': dropdownVisible,
            }"
          >
            <ul v-if="isSchoolAdmin != '1'" class="m-0">
              <li>
                <button
                  class="btn btn-primary btn-sm py-1 mb-2 w-100 w-100"
                  @click="openConfirm('info')"
                >
                  Info
                </button>
              </li>
              <li>
                <button
                  class="btn btn-primary btn-sm py-1 mb-2 col-12 w-100"
                  @click="openConfirm('leave')"
                >
                  Leave
                </button>
              </li>
              <li v-if="userType == '3' && enableEdit">
                <button
                  class="btn btn-primary btn-sm py-1 mb-2 col-12 w-100"
                  @click="openConfirm('remove_leader')"
                >
                  Remove As Leader
                </button>
              </li>
              <li v-if="enableEdit">
                <button
                  class="btn btn-primary btn-sm py-1 col-12 w-100"
                  @click="openConfirm('delete')"
                >
                  Delete
                </button>
              </li>
            </ul>
            <ul v-else class="m-0">
              <li>
                <button
                  class="btn btn-primary btn-sm py-1 mb-2 col-12"
                  @click="openConfirm('info')"
                >
                  Info
                </button>
              </li>
              <li>
                <button
                  class="btn btn-primary btn-sm py-1 col-12"
                  @click="openConfirm('delete')"
                >
                  Delete
                </button>
              </li>
            </ul>
            <!-- dropdown content here -->
          </div>
        </div>

        <!-- Club info -->

        <section id="club-detail" class="d-flex flex-column flex-fill h-40">
          <div
            class="club-section container-fluid mt-2 d-flex flex-column flex-fill h-40 custom-overflow px-0"
          >
            <div
              class="inner-club club-info d-flex flex-column container-fluid h-40 flex-fill px-0"
            >
              <div class="info-head mt-2">
                <h3 class="text-24 color-primary-dark font-semibold mb-1">{{ headingName }}</h3>
              </div>
              <div
                class="inner-info container-fluid my-1 d-flex flex-column h-40 flex-fill px-0"
              >
                <div class="row my-0 h-40 flex-fill">
                  <div
                    v-if="type == 'Sports'"
                    class="col-md-6 col-xs-12 h-md-100 d-flex"
                  >
                    <div
                      class="inner-info container-fluid d-flex flex-column card card-secondary border-0 rounded-22 p-3 p-lg-4"
                    >
                      <div
                        class="d-flex align-items-center justify-content-between mb-3 px-2"
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
                                class="d-flex flex-row flex-sm-column flex-xl-row justify-content-between w-100"
                              >
                                <div class="left-side">
                                  <h4
                                    @click="openEditSportsActivity(item)"
                                    class="color-primary-dark text-truncate mb-1 font-semi-bold text-18 cursor-pointer"
                                  >
                                    {{ item.title }}
                                  </h4>
                                  <p
                                    @click="openEditSportsActivity(item)"
                                    class="color-dark text-16 font-semi-bold mb-0 cursor-pointer"
                                  >
                                    {{ item.first_name }}
                                    <span>{{ headingName }}</span>
                                    <span
                                      class="color-primary-dark text-18 font-semi-bold"
                                      >Vs</span
                                    >
                                    <span>{{ item.opponent_team }}</span>
                                  </p>
                                  <p
                                    class="color-secondary text-14 font-regular mb-1"
                                  >
                                    <span>{{ item.formattedDate }}</span
                                    ><span> &nbsp; </span
                                    ><span>{{ item.time }}</span>
                                  </p>
                                </div>
                                <div
                                  class="right-side h-100 d-flex align-items-end align-items-sm-center align-items-xl-end justify-content-between flex-column flex-sm-row flex-xl-column"
                                >
                                  <p class="mb-0 color-secondary text-right">
                                    <span
                                      ><i class="fas fa-map-marker-alt"></i
                                    ></span>
                                    <span>{{ item.venue }}</span>
                                  </p>
                                  <div class="d-flex justify-content-end">
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
                                class="mb-0 color-secondary text-14 font-regular"
                              >
                                {{ item.desc }}
                              </p>
                            </div>
                          </div>
                          <div v-else class="card card-void px-3 py-2 mb-3">
                            <div
                              class="d-flex flex-row flex-sm-column flex-xl-row justify-content-between w-100"
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
                                  @click="openEditSportsActivity(item)"
                                  class="color-primary-dark word-break cursor-pointer mb-0 line-break-anywhere font-semi-bold"
                                >
                                  {{ item.title }}
                                </p>
                              </div>
                              <div
                                class="right-side h-100 d-flex align-items-end align-items-sm-center align-items-xl-end justify-content-between flex-column flex-sm-row flex-xl-column"
                              >
                                <div
                                  class="d-flex flex-wrap justify-content-end"
                                >
                                  <p
                                    class="color-secondary text-14 font-regular mb-1"
                                  >
                                    {{ item.formattedDate }}
                                  </p>
                                  &nbsp;
                                  <p
                                    class="color-secondary text-14 font-regular mb-0"
                                  >
                                    {{ item.time }}
                                  </p>
                                </div>
                                <div class="d-flex justify-content-end mb-2">
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
                          </div>

                          <!-- {{ item.description }} -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="col-md-6 col-xs-12 h-md-100 d-flex">
                    <div
                      class="inner-info container-fluid p-4 d-flex flex-column card card-secondary border-0 rounded-10"
                    >
                      <div class="h-40 flex-fill custom-overflow">
                        <div class="inner-info-head mb-2">
                          <h5 class="text-18 color-dark mb-2 font-semibold">To do!</h5>
                        </div>
                        <div
                          class="form-group ml-4 color-gray"
                          v-if="
                            !clubMoreDetails.todo ||
                            clubMoreDetails.todo.length <= 0
                          "
                        >
                          No To-dos added!
                        </div>
                        <div class="form-group ml-4">
                          <ul class="list-unstyled">
                            <li
                              v-for="(todos, index) in clubMoreDetails.todo"
                              :key="index"
                              class="row m-0"
                            >
                              <p
                                class="mb-0 col-8 p-0 font-regular text-16 d-flex align-items-center"
                              >
                                <span
                                  class="d-flex rounded-circle border-form-color bullet mr-2"
                                ></span>
                                <span
                                  class="input-name color-gray text-truncate"
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
                                    class="fa fa-times p-1 font-regular color-gray"
                                    aria-hidden="true"
                                  ></i
                                ></span>
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="" v-if="enableEdit">
                        <div class="inner-info-head mb-2">
                          <h5 class="text-18 color-dark my-2 font-semibold">Add Todo</h5>
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
                      class="inner-info container-fluid d-flex flex-column card card-secondary border-0 rounded-10 p-3 p-lg-4"
                    >
                      <div
                        class="d-flex align-items-center justify-content-between mb-2 px-2"
                      >
                        <h5 class="text-18 color-dark font-semibold mb-0">Announcements</h5>
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
                            class="card card-void border border--form px-3 py-2 mb-3"
                            :class="
                              item.isRead == 1 ? 'card-void' : 'card-void'
                            "
                          >
                            <div
                              class="d-flex justify-content-between flex-row flex-sm-column flex-xl-row w-100"
                            >
                              <div class="left-side">
                                <p
                                  class="color-dark mb-0 font-semi-bold text-16"
                                >
                                  {{ item.first_name }}
                                </p>
                                <p
                                  @click="openEdit(item)"
                                  class="color-primary-dark word-break cursor-pointer line-break-anywhere mb-0 font-semi-bold"
                                >
                                  {{ item.title }}
                                </p>
                              </div>
                              <div
                                class="right-side h-100 d-flex align-items-end align-items-sm-center align-items-xl-end justify-content-between flex-column flex-sm-row flex-xl-column"
                              >
                                <div
                                  class="d-flex flex-wrap justify-content-end"
                                >
                                  <p
                                    class="color-gray font-regular text-nowrap text-14 mb-1"
                                  >
                                    {{ item.date }}<span> &nbsp; </span>
                                  </p>
                                  <p
                                    class="color-gray text-nowrap font-regular text-14 mb-0"
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tab" class="">
          <div class="info-tab container-fluid mb-3 px-0">
            <div class="row tab-row m-0 px-3">
              <div class="col-md-4 col-xs-12 py-2 py-md-0 px-0">
                <nuxt-link
                  :to="{
                    path: '/club-info',
                    query: { id: clubId, name: headingName, type: type },
                  }"
                  class="inner-tab d-flex align-items-center justify-content-center btn btn-primary btn-lg w-100 h-100"
                >
                  <span class="font-semi-bold"
                    >Club Details</span
                  >
                </nuxt-link>
              </div>
              <div class="col-md-4 col-xs-12 py-2 py-md-0 px-0 px-md-3">
                <nuxt-link
                  :to="{
                    path: '/club-files',
                    query: { id: clubId, name: headingName, type: type },
                  }"
                  class="inner-tab d-flex align-items-center justify-content-center btn btn-primary btn-lg w-100 h-100"
                >
                  <span class="font-semi-bold"
                    >Files/Slides</span
                  >
                </nuxt-link>
              </div>
              <div
                @click="onNextMeeting"
                class="col-md-4 col-xs-12 py-2 py-md-0 px-0"
              >
                <div
                  :class="
                    enableEdit
                      ? 'inner-tab default d-flex flex-column align-items-center justify-content-center btn btn-primary btn-lg w-100 cursor-pointer'
                      : 'inner-tab default d-flex flex-column align-items-center justify-content-center btn btn-primary btn-lg w-100'
                  "
                >
                  <span class="font-semi-bold"
                    >Next Meeting</span
                  >
                  <span class="text-16 color-white font-regular mx-2">{{
                    clubMoreDetails.announcement
                  }}</span>
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
          <div class="modal-body px-3 pt-4">
            <h3
              class="modal-title color-primary-dark font-bold"
              id="mediumModalLabel"
            >
              Delete
            </h3>
            <p class="text-left color-dark mb-0 font-semi-bold">
              Are you sure you want to delete this item?
            </p>
          </div>
          <div class="modal-footer justify-content-end border-top-0 text-dark">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-void px-4 py-1 rounded-8 font-semi-bold"
              aria-label="Close"
            >
              No
            </button>
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-primary px-4 py-1 rounded-8 font-semi-bold"
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
            <h3
              class="color-primary-dark font-semi-bold"
              id="announcementModalLongTitle"
            >
              {{ enableEdit ? (isAnnouncementEdit ? "Edit" : "Add") : "" }}
              Announcement
            </h3>
          </div>
          <div class="modal-body no-overflow px-4">
            <form name="announcement">
              <fieldset v-if="enableEdit">
                <div class="form-group">
                  <input
                    type="text"
                    id="club"
                    placeholder="Title *"
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
                  <textarea
                    class="form-control"
                    id="message-text"
                    v-model="announcement.announceDesc"
                    name="announceDesc"
                    maxlength="800"
                    placeholder="Description *"
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
              <fieldset v-else>
                <div class="form-group">
                  <label
                    for="recipient-name"
                    class="col-form-label color-secondary"
                    >Title</label
                  >

                  <p>{{ announcement.announceTitle }}</p>
                </div>
                <div class="form-group">
                  <label
                    for="message-text"
                    class="col-form-label color-secondary"
                    >Description</label
                  >
                  <p>{{ announcement.announceDesc }}</p>
                </div>
              </fieldset>
            </form>
          </div>
          <div v-if="enableEdit" class="modal-footer justify-content-end border-top-0">
            <button
              type="button"
              class="btn btn-secondary px-3 py-1 rounded-8 font-semi-bold"
              data-dismiss="modal"
              @click="resetAnnouncement"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary px-3 py-1 rounded-8 font-semi-bold"
              :disabled="processing && !$v.announcement.$invalid"
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
            <h3
              class="color-primary-dark font-semi-bold"
              id="activityModalLongTitle"
            >
              {{ enableEdit ? (isActivityEdit ? "Edit" : "Add") : "" }}
              Training/Match
            </h3>
          </div>
          <div class="modal-body d-flex flex-column px-0">
            <div class="custom-overflow px-4">
              <form>
                <fieldset v-if="enableEdit">
                  <div class="form-group">
                    <select
                      class="form-control bg-transparent mb-3"
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
                      <option value="" selected disabled>Type *</option>
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
                    <input
                      type="text"
                      id="club"
                      placeholder="Title *"
                      class="form-control bg-transparent"
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
                    <textarea
                      class="form-control bg-transparent"
                      id="message-text"
                      v-model="activity.activityDesc"
                      name="activityDesc"
                      maxlength="800"
                      placeholder="Description *"
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
                    <date-picker
                      class="form-control bg-transparent"
                      placeholder="Date *"
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
                    <vue-timepicker
                      close-on-complete
                      format="hh:mm A"
                      v-model="activity.activityTime"
                      placeholder="Time *"
                      name="activityTime"
                      class="show-cursor form-white dropdown-menu-top"
                      :class="{
                        'is-invalid':
                          submittedActivity &&
                          ($v.activity.activityTime.$error ||
                            activity.activityTimeError),
                      }"
                      @change="timeChangeHandler"
                    ></vue-timepicker>
                    <div
                      v-if="
                        submittedActivity &&
                        isActivity &&
                        ($v.activity.activityTime.$error ||
                          activity.activityTimeError)
                      "
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.activity.activityTime.required"
                        >This field is required</span
                      >
                      <span v-if="activity.activityTimeError"
                        >Add a valid time</span
                      >
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      id="club"
                      placeholder="Venue *"
                      class="form-control bg-transparent"
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
                      class="form-control bg-transparent"
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
                <fieldset v-else>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label"
                      >Type<em>*</em></label
                    >

                    <p>{{ activity.activityType }}</p>
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label"
                      >Title<em>*</em></label
                    >

                    <p>{{ activity.activityTitle }}</p>
                  </div>
                  <div class="form-group">
                    <label for="message-text" class="col-form-label"
                      >Description<em>*</em></label
                    >
                    <p>{{ activity.activityDesc }}</p>
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label"
                      >Date<em>*</em></label
                    >

                    <p>{{ activity.activityDate }}</p>
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label"
                      >Time<em>*</em></label
                    >

                    <p>{{ activity.activityTime }}</p>
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label"
                      >Venue<em>*</em></label
                    >

                    <p>{{ activity.activityVenue }}</p>
                  </div>
                  <div
                    v-if="activity.activityType == 'Match'"
                    class="form-group"
                  >
                    <label for="recipient-name" class="col-form-label"
                      >Opponent Team<em>*</em></label
                    >

                    <p>{{ activity.activityOpponentTeam }}</p>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
          <div v-if="enableEdit" class="modal-footer justify-content-end border-top-0">
            <button
              type="button"
              class="btn btn-secondary px-3 py-1 rounded-8 font-semi-bold"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary px-3 py-1 rounded-8 font-semi-bold"
              :disabled="processingActivity && !$v.activity.$invalid"
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
          <div class="modal-body no-overflow px-4 pt-4">
            <h3
              class="modal-title color-primary-dark font-semi-bold"
              id="nextMeetingModalLongTitle"
            >
              Configure Meeting Days
            </h3>
            <div class="inner-info">
              <p class="color-dark text-24 font-semi-bold">
                Next meeting:
                {{
                  clubMoreDetails.announcement == null
                    ? "No meeting scheduled "
                    : clubMoreDetails.announcement
                }}
              </p>

              <div class="row inner-col mb-3" v-if="enableEdit">
                <div class="col-lg-8 col-md-12 input-icon-area form-row">
                  <multiselect
                    v-model="value"
                    track-by="start_time"
                    label="start_time"
                    placeholder="Choose time"
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
                    class="btn date-picker badge badge-pill badge-color active mx-1"
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
            </div>
          </div>
          <div class="modal-footer justify-content-end border-top-0 px-4">
            <button
              type="button"
              class="btn btn-void px-4 py-1 rounded-8"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              v-if="enableEdit"
              class="btn btn-primary rounded-8 mt-2 py-1 px-4 font-semi-bold"
              :disabled="!value || dayArrVal.length <= 0"
              @click.prevent="UpdateTime"
            >
              Update the next meeting 
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal add assignment -->

    <!-- modal for add banner -->
    <div
      class="modal fade"
      id="addBannerModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addBannerModalModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header px-4">
            <h3 class="modal-title color-primary-dark" id="addBannerModalLongTitle">
              Add Banner
            </h3>
          </div>
          <div class="modal-body overflow-hidden d-flex flex-column px-4">
            <div class="d-flex flex-column overflow-hidden h-100">
              <div
                size="120"
                class="user d-flex align-items-center justify-content-center py-4 rounded card card-primary mb-3"
              >
                <v-icon
                  class="icon primary white--text text-30 color-secondary"
                  @click="$refs.FileInput.click()"
                  >mdi-upload</v-icon
                >
                <input
                  id="file-input"
                  ref="FileInput"
                  type="file"
                  accept="image/*"
                  style="display: none"
                  @change="onFileSelect"
                />
              </div>
              <v-card
                class="bg-transparent shadow-none h-100 overflow-hidden d-flex flex-column"
              >
                <v-card-text
                  v-show="selectedFile"
                  class="p-0 h-100 overflow-hidden"
                >
                  <VueCropper
                    ref="cropper"
                    :src="selectedFile"
                    alt="Source Image"
                    :aspect-ratio="20 / 3"
                    class="card card-primary mb-3"
                  ></VueCropper>
                </v-card-text>
                <v-card-actions class="justify-content-end">
                  <v-btn
                    color="primary"
                    class="btn btn-secondary font-semi-bold mr-2 py-1 px-3 rounded-8 text-capitalize"
                    text
                    data-dismiss="modal"
                    @click="clearCrop"
                    ><span class="font-semi-bold">Cancel</span></v-btn
                  >
                  <v-btn
                    class="btn btn-primary font-semi-bold bg-primary color-dark py-1 px-3 rounded-8 text-capitalize shadow-none"
                    @click="saveImage(), (dialog = false)"
                    ><span class="font-semi-bold color-white">Upload</span></v-btn
                  >
                </v-card-actions>
              </v-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal add banner -->
    <!-- modal for confirmation pop up -->
    <div
      class="modal fade"
      id="confirmationModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="confirmationModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header pb-0">
            <h2 class="modal-title font-bold" id="confirmationModalLongTitle">
              {{ showClubInfo ? "Club Information" : "Confirmation" }}
            </h2>
          </div>
          <div v-if="!showClubInfo" class="modal-body">
            <p class="confirm-text d-flex">
              <span class="w-100 color-dark font-semi-bold"
                >{{ confirmationMessage }}
              </span>
            </p>
          </div>
          <div v-if="showClubInfo && clubInformation" class="modal-body">
            <div class="confirm-text">
              <div>
                <label for="created_at">Type: </label>
                <span class="color-dark font-semi-bold"
                  >{{
                    clubInformation.activity_type == "Clubs" ? "Club" : "Team"
                  }}
                </span>
              </div>
              <div>
                <label for="created_at">Created By: </label>
                <span
                  v-if="clubInformation.student"
                  class="color-dark font-semi-bold"
                  >{{
                    clubInformation.student.first_name +
                    " " +
                    clubInformation.student.last_name
                  }}
                </span>
              </div>
              <div>
                <label for="created_at">Created At: </label>
                <span class="color-dark font-semi-bold"
                  >{{ clubCreatedAt }}
                </span>
              </div>
            </div>
          </div>
          <div v-if="!showClubInfo" class="modal-footer justify-content-end border-top-0">
            <button
              type="button"
              class="btn btn-void px-4 py-1 rounded-8 font-semi-bold"
              data-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              class="btn btn-primary px-4 py-1 rounded-8 font-semi-bold"
              data-dismiss="modal"
              @click="confirmAction()"
            >
              Yes
            </button>
          </div>
          <div v-if="showClubInfo" class="modal-footer justify-content-end border-top-0">
            <button
              type="button"
              class="btn btn-void px-4 py-1 rounded-8 font-semi-bold"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal for confirmation pop up end -->
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import { required, requiredIf } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
import VueTimepicker from "vue2-timepicker";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { eventBus } from "~/plugins/eventbus.js";

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
    VueCropper,
  },
  data() {
    return {
      accordionOpened:false,
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
      processing: false,
      submittedActivity: false,
      processingActivity: false,
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
        activityTimeError: false,
      },
      disabledDates: {
        to: new Date(),
      },
      date_today: new Date(),
      mime_type: "",
      fileName: "",
      cropedImage: "",
      autoCrop: false,
      selectedFile: "",
      image: "",
      dialog: false,
      files: "",
      dropdownVisible: false,
      confirmEvent: "",
      confirmationMessage: "",
      showClubInfo: false,
      clubCreatedAt: "",
      userType: "",
      startTime: null,
      isSchoolAdmin: "0",
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
        required: requiredIf(function (model) {
          if (this.activity.activityType === "Match") {
            return true;
          }
          return false;
        }),
      },
    },
  },
  created() {
    eventBus.$on('accordionOpened', (newValue) => {
      this.accordionOpened = newValue;
    });
  },
  mounted() {
    if (localStorage.getItem("schoolAdmin")) {
      this.isSchoolAdmin = localStorage.getItem("schoolAdmin");
    }
    const page = "ClubHomepage";
    const distinct_id = localStorage.getItem("distinctId");
    this.$mixpanel.track("Page View", { distinct_id, page });
    this.startTime = new Date().getTime();

    this.userType = localStorage.getItem("user_type");

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
    this.ClubMoreInfo();
    this.SlotswithId();

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
      clubBannerImage: (state) => state.clubBannerImage,
    }),
    ...mapState("clubFiles", {
      successMessageClubFile: (state) => state.successMessage,
      SuccessTypeClubFile: (state) => state.successType,
      errorMessageClubFile: (state) => state.errorMessage,
      errorTypeClubFile: (state) => state.errorType,
    }),
    checkIsAnnouncement() {
      return this.isAnnouncement; // some conditional logic here...
    },
    checkIsActivity() {
      return this.isActivity; // some conditional logic here...
    },
    ...mapState("clubUpdates", {
      successTypeClubUpdate: (state) => state.successTypeClubUpdate,
      successMessageClubUpdate: (state) => state.successMessageClubUpdate,
      errorMessageClubUpdate: (state) => state.errorMessageClubUpdate,
      errorTypeClubUpdate: (state) => state.errorTypeClubUpdate,
      clubInformation: (state) => state.clubInformation,
    }),
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
    ...mapActions("clubFiles", {
      clubFiles: "clubFiles",
      uploadFile: "uploadFile",
      fileRemove: "fileRemove",
      uploadBanner: "uploadBanner",
    }),
    ...mapActions("clubUpdates", {
      clubDelete: "clubDelete",
      clubLeave: "clubLeave",
      leaderRemove: "leaderRemove",
      getInformation: "getInformation",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async getAnnouncement() {
      this.loading = true;
      await this.getAnnouncements({
        club_id: this.clubId,
      });
      this.loading = false;
      this.announcementList = [];
      this.announcements.forEach((e) => {
        e["date"] = moment(e.createdAt).format("MMMM Do, YYYY");
        e["time"] = moment(e.createdAt).format("h:mm A");
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
      if (this.todolist.trim().length === 0) {
        this.$toast.open({
          message: "Please enter valid data",
          type: "warning",
          duration: 5000,
        });
      } else {
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
      }
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
      this.value = "";
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
      this.announcementId = data.id;
      this.announcement.announceTitle = data.title;
      this.announcement.announceDesc = data.description;
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
      this.processing = true;
      this.$v.announcement.announceTitle.$touch();
      this.$v.announcement.announceDesc.$touch();
      if (this.$v.announcement.$invalid) {
        this.processing = false;
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
        this.processing = false;
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
      this.activity.activityTime = {
        hh: "00",
        MM: "00",
        A: "am",
      };
      this.activity.activityVenue = "";
      this.activity.activityOpponentTeam = "";
      this.activity.activityTimeError = false;
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
    },
    async addNewActivity() {
      let isValid = this.timeChangeHandler();

      this.submittedActivity = true;
      this.processingActivity = true;
      this.$v.activity.activityTitle.$touch();
      this.$v.activity.activityDesc.$touch();
      this.$v.activity.activityType.$touch();
      this.$v.activity.activityDate.$touch();
      this.$v.activity.activityTime.$touch();
      this.$v.activity.activityVenue.$touch();
      this.$v.activity.activityOpponentTeam.$touch();
      if (this.$v.activity.$invalid || !isValid) {
        this.processingActivity = false;

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
          time:
            this.activity.activityTime.hh +
            ":" +
            this.activity.activityTime.mm +
            " " +
            this.activity.activityTime.A,
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
        this.processingActivity = false;
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
        this.value = "";
        this.dayArrVal = [];
        $("#nextMeetingModal").modal();
        let activeElements = document.getElementsByClassName(
          "btn date-picker badge badge-pill badge-color active"
        );
        Array.prototype.forEach.call(activeElements, function (element) {
          element.classList.remove("active");
        });
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
      this.activity.activityDate = moment(this.activity.activityDate).format(
        "YYYY-MM-DD"
      );
    },
    openAddBanner() {
      this.clearCrop();
      $("#addBannerModal").modal({ backdrop: true });
    },
    saveImage() {
      const userId = this.$route.params.user_id;
      this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData();

        if (blob) {
          var file = new File([blob], "name");
          blob.fileName = this.fileName;

          let uploadedName = this.fileName.split(".")[0];
          let timestampName =
            uploadedName +
            "_" +
            new Date().getTime() +
            "." +
            this.fileName.split(".")[1];
          formData.append("file", blob, timestampName);
          formData.append("club_id", this.$route.query.id);
          formData.append("user_id", localStorage.getItem("id"));
          formData.append("club_banner", "1");

          this.upload(formData);
        }
      }, this.mime_type);
    },
    async upload(formData) {
      await this.uploadBanner(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        club_id: this.$route.query.id,
      });

      if (this.successMessageClubFile != "") {
        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
        this.$toast.open({
          message: this.successMessageClubFile,
          type: this.SuccessTypeClubFile,
          duration: 5000,
        });
        this.getClubMoreInfo();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
    },
    onFileSelect(e) {
      if (e.target.files[0] && this.checkFileValid(e.target.files[0])) {
        if (
          e?.target?.files[0]?.size &&
          e.target.files[0]?.size > 5 * 1024 * 1024
        ) {
          return this.$toast.open({
            message: "File size must be lesser than 5 MB",
            type: "warning",
          });
        }

        const file = e.target.files[0];
        this.mime_type = file.type;
        this.fileName = file.name;
        if (typeof FileReader === "function") {
          this.dialog = true;
          const reader = new FileReader();
          reader.onload = (event) => {
            this.selectedFile = event.target.result;
            this.$refs.cropper.replace(this.selectedFile);
          };
          reader.readAsDataURL(file);
        } else {
          alert("Sorry, FileReader API not supported");
        }
      }
    },
    checkFileValid(profileImage) {
      let parts = profileImage.name.split(".");
      let ext = parts[parts.length - 1];
      if (ext == "png" || ext == "jpg" || ext == "jpeg") {
        return true;
      }

      this.$toast.open({
        message: "File type accepts only PNG,JPG,JPEG formats",
        type: "warning",
        duration: 5000,
      });
      return false;
    },
    timeChangeHandler() {
      let time =
        this.activity.activityTime.hh +
        ":" +
        this.activity.activityTime.mm +
        " " +
        this.activity.activityTime.A;

      let isValid = moment(time, "hh:mm A", true).isValid();
      if (!isValid) {
        this.activity.activityTimeError = true;
      } else {
        this.activity.activityTimeError = false;
      }
      return isValid;
    },
    clearCrop() {
      const fileInput = document.getElementById("file-input");
      fileInput.value = "";
      this.selectedFile = "";
      this.$refs.cropper.destroy();
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    openConfirm(event) {
      this.showClubInfo = false;
      this.confirmEvent = event;
      $("#confirmationModal").modal();
      this.confirmationMessage = this.setConfirmationMessage(event);
    },
    setConfirmationMessage(event) {
      const type = this.type == "Sports" ? " team" : " club";

      switch (event) {
        case "delete": {
          return (
            "Are you sure you want to delete this " +
            type +
            "? This action is not reversible!"
          );
        }
        case "remove_leader": {
          return (
            "Are you sure you want to remove yourself as a leader of this " +
            type +
            "? This action is not reversible!"
          );
        }
        case "leave": {
          return (
            "Are you sure you want to leave this " +
            type +
            "? This action is not reversible!"
          );
        }
        case "info": {
          this.showClubInfo = true;
          this.getClubInformation();
          return "";
        }
        default: {
          return "";
        }
      }
    },
    confirmAction() {
      switch (this.confirmEvent) {
        case "delete": {
          this.deleteClub();
          break;
        }
        case "remove_leader": {
          this.removeAsLeader();
          break;
        }
        case "leave": {
          this.leaveClub();
          break;
        }

        default: {
          return "";
        }
      }
    },
    async deleteClub() {
      await this.clubDelete({
        club_id: this.clubId,
      });
      if (this.successMessageClubUpdate != "") {
        if (this.isSchoolAdmin == "1") {
          this.$router.push("/club-catalogue");
        } else {
          this.$router.push("/club-detail");
        }
        this.$toast.open({
          message: this.successMessageClubUpdate,
          type: this.successTypeClubUpdate,
          duration: 5000,
        });
      } else if (this.errorMessageClubUpdate != "") {
        this.$toast.open({
          message: this.errorMessageClubUpdate,
          type: this.errorTypeClubUpdate,
          duration: 5000,
        });
      }
    },
    async removeAsLeader() {
      await this.leaderRemove({
        club_id: this.clubId,
      });
      if (this.successMessageClubUpdate != "") {
        this.$toast.open({
          message: this.successMessageClubUpdate,
          type: this.successTypeClubUpdate,
          duration: 5000,
        });
      } else if (this.errorMessageClubUpdate != "") {
        this.$toast.open({
          message: this.errorMessageClubUpdate,
          type: this.errorTypeClubUpdate,
          duration: 5000,
        });
      }
      this.getClubMoreInfo();
    },
    async leaveClub() {
      await this.clubLeave({
        club_id: this.clubId,
      });
      if (this.successMessageClubUpdate != "") {
        this.$router.push("/club-detail");
        this.$toast.open({
          message: this.successMessageClubUpdate,
          type: this.successTypeClubUpdate,
          duration: 5000,
        });
      } else if (this.errorMessageClubUpdate != "") {
        this.$toast.open({
          message: this.errorMessageClubUpdate,
          type: this.errorTypeClubUpdate,
          duration: 5000,
        });
      }
    },
    async getClubInformation() {
      await this.getInformation({
        club_id: this.clubId,
      });
      this.clubCreatedAt = this.clubInformation.createdAt;
    },
  },
  beforeDestroy() {
    const endTime = new Date().getTime();
    const duration = (endTime - this.startTime) / 1000;
    const distinct_id = localStorage.getItem("distinctId");
    const page = "ClubHomepage";
    this.$mixpanel.track("Page Duration", { duration, distinct_id, page });
  },
};
</script>

<style scoped>
.dropdown-club {
  display: none;
}
.dropdown-club--visible {
  display: block;
  position: absolute;
  width: 235px;
  height: auto;
  z-index: 999;
  border-radius: 0px 0px 1rem 1rem;
  right: 10px;
  padding: 1rem;
  color: #fff;
}
</style>
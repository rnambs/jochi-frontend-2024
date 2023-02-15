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

        <!-- :style="{ 'background-image': clubDetails.club_banner_image }" -->
        <!-- Club info -->

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
            class="
              position-absolute
              cover-button
              mr-3
              mb-1
              d-flex
              align-items-center
            "
          >
            <button
              v-if="enableEdit"
              @click="openAddBanner"
              class="btn p-1 m-2"
            >
              <i class="fas fa-pen color-white"></i>
            </button>
            <!-- <div class="d-flex align-items-center">
              <button class="btn p-1 m-2">
                <i class="fas fa-info-circle color-white"></i>
              </button>
              <p class="mb-0 color-secondary text-14 font-regular">
                1200 X 180
              </p>
            </div> -->
            <button
              v-if="enableEdit"
              class="btn p-0 tooltip01 right-tip"
              CustomTitle="1200 X 180"
            >
              <i class="fas fa-info-circle color-white"></i>
            </button>
            <!-- <button class="btn p-1 m-2" CustomTitle="1200 X 180">
              <i class="fas fa-cog color-white"></i>
            </button> -->
            <button class="btn p-1 m-2" v-on:click="toggleDropdown">
              <i class="fas fa-cog color-white"></i>
            </button>
          </div>
        </div>
        <div class="position-relative">
          <div
            v-bind:class="{
              'dropdown-club jochi-components-light-bg': true,
              'dropdown-club--visible': dropdownVisible,
            }"
          >
            <ul class="m-0">
              <ul class="m-0">
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
                    class="btn btn-primary btn-sm py-1 mb-2 col-12"
                    @click="openConfirm('leave')"
                  >
                    Leave
                  </button>
                </li>
                <li v-if="enableEdit">
                  <button
                    class="btn btn-primary btn-sm py-1 mb-2 col-12"
                    @click="openConfirm('remove_leader')"
                  >
                    Remove As Leader
                  </button>
                </li>
                <li v-if="enableEdit">
                  <button
                    class="btn btn-primary btn-sm py-1 col-12"
                    @click="openConfirm('delete')"
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </ul>
          </div>
        </div>
        <section id="club-detail" class="flex-fill custom-overflow">
          <div class="club-section container-fluid mt-2">
            <div
              class="
                inner-club
                club-info
                d-flex
                flex-column
                justify-content-top
                container-fluid
                pr-3
                py-0
                pl-0
              "
            >
              <div class="my-2 px-2">
                <h3 class="color-primary font-semi-bold mb-1">Club Details</h3>
              </div>
              <div class="inner-info">
                <div
                  class="row mx-3"
                  v-for="(list, index) in list_data"
                  :key="index"
                >
                  <div v-if="index == 0" class="col-md-6 col-xs-12 pl-3 py-12">
                    <div class="inner-info-head mb-2">
                      <h4 class="color-dark mb-2 font-bold">
                        About the {{ headingName }}
                      </h4>
                    </div>
                    <p
                      v-if="!editDescription"
                      class="mb-2 text-14 color-secondary"
                    >
                      {{ clubDetails.description }}
                      <span
                        v-if="enableEdit"
                        class="ml-2 text-secondary btn p-1"
                        @click="editDescription = true"
                        ><i class="fas fa-pencil"></i
                      ></span>
                    </p>

                    <div v-if="editDescription" class="form-group mb-1">
                      <div class="d-flex align-items-start">
                        <textarea
                          placeholder="No data"
                          class="form-control club-info mb-0 input mr-2"
                          id=""
                          rows="5"
                          v-model="clubDetails.description"
                          maxlength="500"
                        ></textarea>
                        <button @click="editDescription = false" class="close">
                          <span
                            @click="editDescription = false"
                            aria-hidden="true"
                            >&times;</span
                          >
                        </button>
                      </div>

                      <button
                        href=""
                        class="
                          btn btn-dark
                          custom-theme-color-btn
                          px-4
                          mb-0
                          mt-3
                        "
                        v-if="enableEdit"
                        :disabled="!clubDetails.description"
                        @click.prevent="
                          Editinformation(clubId, clubDetails.description)
                        "
                      >
                        Update
                      </button>
                    </div>
                    <!-- <div class="custom-switch pb-2" v-if="enableEdit">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="custom-Switches"
                        v-model="availability"
                        @change="ShowClubInCatalog()"
                        v-on:click="availabilityToggle()"
                      />
                      <label class="custom-control-label
                        font-normal
                        color-dark
                        text-14" for="custom-Switches"
                        >Show club in catalog
                      </label>
                    </div> -->
                  </div>
                  <div v-if="index == 0" class="col-md-6 col-xs-12 px-0 py-12">
                    <div class="row">
                      <div class="col-12 inner-col text-right py-12">
                        <div
                          class="
                            d-flex
                            mb-3
                            justify-content-end
                            align-items-center
                            mb-2
                          "
                        >
                          <h4 class="color-dark mb-0 mr-2 font-bold">
                            Leaders
                          </h4>
                          <a
                            v-if="enableEdit"
                            href="#"
                            class="btn p-1 color-secondary"
                            ><span @click="openAddLeader"
                              ><i class="fas fa-plus-circle"></i></span
                          ></a>
                        </div>
                        <div class="row justify-content-end">
                          <div class="col-10 col-lg-8">
                            <div class="inner-info-text">
                              <ul class="mb-0 leader-list-style">
                                <li
                                  v-for="(data, index) in leadersInfo"
                                  :key="index"
                                >
                                  <!-- <span class="input-name">{{ data }}</span> -->
                                  <div
                                    v-if="index < 2"
                                    class="
                                      d-flex
                                      align-items-center
                                      justify-content-end
                                      mt-2
                                    "
                                  >
                                    <div
                                      class="
                                        col-3
                                        d-flex
                                        justify-content-end
                                        p-0
                                        mr-1
                                      "
                                    >
                                      <div class="ld-img-section">
                                        <div
                                          v-if="data.user_info"
                                          class="ld-img-holder"
                                        >
                                          <img
                                            v-if="data.user_info"
                                            :src="data.user_info.profile_pic"
                                            alt=""
                                          />
                                          <span v-else>{{
                                            data.user_info.first_name.charAt(0)
                                          }}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-9 p-0">
                                      <div class="ld-details-section">
                                        <p
                                          v-if="data.user_info"
                                          class="
                                            mb-1
                                            text-18
                                            color-dark
                                            font-semi-bold
                                          "
                                        >
                                          {{
                                            data.user_info.first_name +
                                            (data.user_info.last_name
                                              ? " " + data.user_info.last_name
                                              : "")
                                          }},
                                          {{
                                            data.user_info.user_type_id == 3
                                              ? "Student"
                                              : "Teacher"
                                          }}
                                        </p>
                                        <p
                                          v-if="data.user_info"
                                          class="
                                            color-secondary
                                            text-16
                                            font-regular
                                            mb-0
                                            text-truncate
                                          "
                                        >
                                          {{ data.user_info.email }}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </li>

                                <button
                                  v-if="leadersInfo.length >= 3"
                                  @click="openViewMoreMembers(true)"
                                  class="btn btn-void mt-3 py-1 px-0"
                                >
                                  <span class="font-semi-bold mr-1"
                                    >View More</span
                                  ><span class="more-icon"
                                    ><i class="fas fa-chevron-right"></i
                                  ></span>
                                </button>

                                <!-- <li
                                  v-for="(leader, index) in list.todoLeader"
                                  :key="index"
                                >
                                  <span class="input-name">{{ leader }}</span>
                                  <span
                                    class="input-icon"
                                    v-if="enableEdit"
                                    @click.prevent="RemoveLeader(leader)"
                                  >
                                    <i class="fa fa-times p-1" aria-hidden="true"></i
                                  ></span> 
                                </li> -->
                                <!-- list.todoArr.length == 0 && -->
                                <li
                                  v-if="!leadersInfo || leadersInfo.length == 0"
                                >
                                  <span
                                    class="text-secondary text-14 font-regular"
                                    >No data</span
                                  >
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- <div
                        class="col-12 text-right inner-col py-12"
                        v-if="enableEdit"
                      >
                        <div class="inner-info-head mb-0">
                          <h4 class="color-dark mb-2 font-bold">Add Leaders</h4>
                        </div>

                        <div
                          class="
                            form-row
                            m-0
                            d-flex
                            align-items-center
                            justify-content-end
                          "
                        ></div>
                      </div> -->
                    </div>
                  </div>
                  <div
                    v-if="index == 0"
                    class="col-md-6 col-xs-12 pr-0 pl-3 py-12"
                  >
                    <div class="mb-2 mt-4">
                      <h4 class="color-dark mb-2 font-bold">Members</h4>
                    </div>
                    <div
                      class="
                        members-thumbnail-list
                        d-flex
                        flex-column
                        align-items-center
                        justify-content-start
                        mt-3
                        position-relative
                      "
                    >
                      <div class="first-row">
                        <div class="d-flex align-items-center">
                          <div
                            v-for="index in 4"
                            :key="index"
                            :class="
                              membersInfo[index - 1] &&
                              membersInfo[index - 1].user_info
                                ? 'mlist-thumb-holder'
                                : 'd-none'
                            "
                          >
                            <!-- {{ membersInfo[index].user_info }} -->
                            <img
                              v-if="
                                membersInfo[index - 1] &&
                                membersInfo[index - 1].user_info &&
                                membersInfo[index - 1].user_info.profile_pic
                              "
                              :src="
                                membersInfo[index - 1].user_info.profile_pic
                              "
                              alt=""
                            />
                            <span v-else>{{
                              membersInfo[index - 1] &&
                              membersInfo[index - 1].user_info
                                ? membersInfo[
                                    index - 1
                                  ].user_info.first_name.charAt(0)
                                : ""
                            }}</span>
                          </div>
                          <!-- <div class="mlist-thumb-holder"></div>
                          <div class="mlist-thumb-holder"></div>
                          <div class="mlist-thumb-holder"></div> -->
                        </div>
                      </div>
                      <div v-if="membersInfo.length > 4" class="second-row">
                        <div class="d-flex align-items-center">
                          <div
                            v-for="index in 3"
                            :key="index"
                            :class="
                              membersInfo[index + 3] &&
                              membersInfo[index + 3].user_info
                                ? 'mlist-thumb-holder'
                                : 'd-none'
                            "
                          >
                            <img
                              v-if="
                                membersInfo[index + 3] &&
                                membersInfo[index + 3].user_info.profile_pic
                              "
                              :src="
                                membersInfo[index + 3].user_info.profile_pic
                              "
                              alt=""
                            />
                          </div>
                          <!-- <div class="mlist-thumb-holder"></div>
                          <div class="mlist-thumb-holder"></div> -->
                        </div>
                      </div>
                      <div
                        v-if="membersInfo.length > 7"
                        class="ml-list-more position-absolute"
                        @click="openViewMoreMembers(false)"
                      >
                        7+
                      </div>
                    </div>
                  </div>
                  <div v-if="index == 0" class="col-md-6 col-xs-12 px-0 py-12">
                    <div class="row">
                      <div class="col-12 inner-col text-right py-12">
                        <div
                          class="
                            inner-info-head
                            mb-2
                            d-flex
                            align-items-center
                            justify-content-end
                          "
                        >
                          <h4 class="color-dark mb-0 mr-2 font-bold">Tags</h4>
                          <!-- <a href="#" class="btn p-1 color-secondary">
                            <span><i class="fas fa-plus-circle"></i></span>
                          </a> -->
                        </div>
                        <div class="row justify-content-end">
                          <div class="col-10 col-lg-8 info-tag">
                            <div class="input-group mb-0 justify-content-end">
                              <div
                                class="p-1"
                                v-for="(value, index) in list.taglists"
                                :key="index"
                              >
                                <!-- <input type="text" class="pl" hidden />{{
                                  value.name
                                }} -->

                                <!-- <input
                                  type="text"
                                  :style="{
                                    'background-color': tagColorMap[value.name],
                                  }"
                                  class="pl"
                                  hidden
                                />{{ value.name }} -->
                                <span
                                  :style="{
                                    'background-color': tagColorMap[value.name]
                                      ? tagColorMap[value.name]
                                      : red,
                                  }"
                                  class="
                                    px-4
                                    py-1
                                    rounded-6
                                    color-white
                                    d-flex
                                    justify-content-center
                                    min-w-100
                                    text-14
                                    bg-theme
                                    align-items-center
                                  "
                                  >{{ value.name }}
                                  <span
                                    class="input-icon color-white btn p-0"
                                    v-if="enableEdit"
                                    @click.prevent="RemoveTag(value.id)"
                                    ><i
                                      class="fa fa-times p-1 text-12"
                                      aria-hidden="true"
                                    ></i
                                  ></span>
                                </span>
                              </div>
                              <div
                                class="input-icon-area mb-2 mr-2"
                                v-if="list.taglists.length == 0"
                              >
                                <input type="text" class="pl" />No data
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-12 text-right inner-col py-12"
                        v-if="enableEdit"
                      >
                        <div class="inner-info-head mb-3">
                          <h4 class="color-dark mb-2 font-bold">Add Tags</h4>
                        </div>
                        <div
                          class="d-flex align-items-center justify-content-end"
                        >
                          <div class="input-icon-area col-6 pr-0 form-row">
                            <multiselect
                              v-model="value"
                              :options="taglist"
                              track-by="name"
                              label="name"
                              placeholder="Select a tag"
                              @input="EditTag"
                            >
                              <span slot="noResult">No data found</span>
                            </multiselect>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="list_data.length == 0" class="w-100 text-center py-5">
              <p class="no-data">No Data</p>
            </div>
          </div>
        </section>

        <section id="tab" class="">
          <div class="info-tab container-fluid mb-3 px-3">
            <div class="row tab-row m-0 px-3">
              <div class="col-md-4 col-xs-12 py-2 py-md-0">
                <nuxt-link
                  :to="{
                    path: '/club-moreInfo',
                    query: {
                      id: clubId,
                      name: headingName,
                      type: clubDetails.activity_type,
                    },
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
                    >Home Page</span
                  >
                </nuxt-link>
              </div>
              <div class="col-md-4 col-xs-12 py-2 py-md-0">
                <nuxt-link
                  :to="{
                    path: '/club-files',
                    query: {
                      id: clubId,
                      name: headingName,
                      type: clubDetails.activity_type,
                    },
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
                    >Files & Slides</span
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
                  "
                >
                  <!-- <nuxt-link
                    :to="{
                      path: '/club-moreInfo',
                      query: {
                        id: clubId,
                        name: headingName,
                        type: activity_type,
                      },
                    }"
                    class="inner-tab"
                  > -->
                  <!-- <i class="fas fa-ellipsis-h"></i> -->
                  <!-- <span class="pl">More</span> -->
                  <span class="text-24 color-primary font-semi-bold"
                    >Next Meeting</span
                  >
                  <span class="text-16 color-primary font-regular">{{
                    clubMoreDetails.announcement
                  }}</span>
                </div>
                <!-- </nuxt-link> -->
              </div>
            </div>
          </div>
        </section>
      </div>
      <!-- End Club info -->
    </div>
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
          <!-- <div class="modal-header">
            <h3 class="modal-title" id="nextMeetingModalLongTitle">
              Configure Meeting Days
            </h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div> -->
          <div class="modal-body no-overflow px-4 pt-4">
            <!-- <div class="col-md-5 col-xs-12"> -->
            <h3
              class="modal-title color-primary font-semi-bold"
              id="nextMeetingModalLongTitle"
            >
              Configure Meeting Days
            </h3>
            <div class="inner-info">
              <!-- <div class="inner-info-head mb-3">
                <h6 class="color-dark mb-0">Meeting Time</h6>
              </div> -->
              <p class="color-dark text-24 font-semi-bold">
                Next meeting:
                {{
                  clubMoreDetails.announcement == null
                    ? "No meeting scheduled "
                    : clubMoreDetails.announcement
                }}
              </p>

              <div class="row inner-col mb-3" v-if="enableEdit">
                <!-- <div
                  class="
                    col-lg-4 col-md-12
                    inner-inner-info-head
                    d-flex
                    align-items-center
                  "
                >
                  <h6 class="color-dark mb-0">Choose time</h6>
                </div> -->
                <div class="col-lg-8 col-md-12 input-icon-area form-row">
                  <multiselect
                    v-model="valueMeeting"
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
              type="button"
              class="btn btn-secondary px-4 py-1 rounded-12"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              v-if="enableEdit"
              class="btn btn-success rounded-12 mt-2 py-1 px-4 font-semi-bold"
              :disabled="!valueMeeting"
              @click.prevent="UpdateTime"
            >
              Update the next meeting
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal add next meeting -->

    <!-- modal for view members and leaders -->
    <div
      class="modal fade"
      id="viewMoreModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="viewMoreModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <div class="modal-header pb-1">
            <h3 class="modal-title" id="viewMoreModalLongTitle">
              View {{ isLeaderView ? "Leaders" : "Members" }}
            </h3>
            <button
              type="button"
              class="btn btn-close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body d-flex custom-overflow px-4">
            <!-- leader details -->
            <div v-if="isLeaderView" class="inner-info-text">
              <ul class="mb-0 leader-list-style">
                <li v-for="(data, index) in leadersInfo" :key="index">
                  <!-- <span class="input-name">{{ data }}</span> -->
                  <div class="d-flex align-items-center mt-3">
                    <div class="d-flex justify-content-end p-0">
                      <div class="ld-img-section mr-3">
                        <div v-if="data.user_info" class="ld-img-holder">
                          <img
                            v-if="data.user_info"
                            :src="data.user_info.profile_pic"
                            alt=""
                          />
                          <span v-else>{{
                            data.user_info.first_name.charAt(0)
                          }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="p-0">
                      <div class="ld-details-section">
                        <p
                          v-if="data.user_info"
                          class="mb-0 text-18 color-dark font-semi-bold"
                        >
                          {{
                            data.user_info.first_name +
                            (data.user_info.last_name
                              ? " " + data.user_info.last_name
                              : "")
                          }},
                          {{
                            data.user_info.user_type_id == 3
                              ? "Student"
                              : "Teacher"
                          }}
                        </p>
                        <p
                          v-if="data.user_info"
                          class="
                            color-secondary
                            text-16
                            font-regular
                            mb-0
                            text-truncate
                          "
                        >
                          {{ data.user_info.email }}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>

                <li v-if="!leadersInfo || leadersInfo.length == 0">
                  <span class="input-name">No data</span>
                </li>
              </ul>
            </div>
            <!-- details end -->

            <!-- member details -->
            <div v-if="!isLeaderView" class="inner-info-text">
              <ul class="mb-0 leader-list-style">
                <li v-for="(data, index) in membersInfo" :key="index">
                  <!-- <span class="input-name">{{ data }}</span> -->
                  <div class="d-flex align-items-center mt-3">
                    <div class="d-flex justify-content-end p-0">
                      <div class="ld-img-section mr-3">
                        <div v-if="data.user_info" class="ld-img-holder">
                          <img
                            v-if="data.user_info"
                            :src="data.user_info.profile_pic"
                            alt=""
                          />
                          <span v-else>{{
                            data.user_info.first_name.charAt(0)
                          }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="p-0">
                      <div class="ld-details-section">
                        <p
                          v-if="data.user_info"
                          class="mb-0 text-18 color-dark font-semi-bold"
                        >
                          {{
                            data.user_info.first_name +
                            (data.user_info.last_name
                              ? " " + data.user_info.last_name
                              : "")
                          }},
                          {{
                            data.user_info.user_type_id == 3
                              ? "Student"
                              : "Teacher"
                          }}
                        </p>
                        <p
                          v-if="data.user_info"
                          class="
                            color-secondary
                            text-16
                            font-regular
                            mb-0
                            text-truncate
                          "
                        >
                          {{ data.user_info.email }}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>

                <li v-if="!membersInfo || membersInfo.length == 0">
                  <span class="input-name">No data</span>
                </li>
              </ul>
            </div>
            <!-- details end -->
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
    <!--  modal for view members and leaders -->

    <!-- modal for add leader -->
    <div
      class="modal fade"
      id="addLeaderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addLeaderModalModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
        <div class="modal-content">
          <!-- <div class="modal-header">
            <h4 class="modal-title color-dark" id="addLeaderModalLongTitle">
              Add Leaders
            </h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div> -->
          <div class="modal-body no-overflow px-4 pt-4">
            <!-- <div class="col-md-5 col-xs-12"> -->
            <h3
              class="modal-title color-primary font-semi-bold"
              id="addLeaderModalLongTitle"
            >
              Add Leaders
            </h3>
            <div class="d-flex align-items-center flex-fill mr-2 form-row">
              <multiselect
                v-model="leaderUpdate"
                :options="students"
                track-by="first_name"
                label="first_name"
                placeholder="
                                Select students
                              "
              >
                <span slot="noResult">No data found</span>
              </multiselect>
            </div>

            <!-- </div> -->
          </div>
          <div class="modal-footer px-4">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-secondary px-4 py-1 rounded-12 font-semi-bold"
              aria-label="Close"
            >
              Close
            </button>
            <button
              class="btn btn-success py-1 rounded-12 font-semi-bold px-4"
              :disabled="!leaderUpdate"
              @click.prevent="addLeader()"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal add leaders -->

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
            <h3 class="modal-title color-primary" id="addBannerModalLongTitle">
              Add Banner
            </h3>
            <!-- <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button> -->
          </div>
          <div class="modal-body overflow-hidden d-flex flex-column px-4">
            <div class="d-flex flex-column overflow-hidden h-100">
              <div
                size="120"
                class="
                  user
                  d-flex
                  align-items-center
                  justify-content-center
                  py-4
                  rounded
                  card card-primary-sm
                  mb-3
                "
              >
                <!-- <v-img :src="image_name" class="profile-img"></v-img> -->
                <v-icon
                  class="icon primary white--text text-30 color-secondary"
                  @click="$refs.FileInput.click()"
                  >mdi-upload</v-icon
                >
                <input
                  ref="FileInput"
                  type="file"
                  accept="image/*"
                  style="display: none"
                  @change="onFileSelect"
                />
              </div>
              <!-- <v-dialog v-model="dialog" width="500"> -->
              <v-card
                class="
                  bg-transparent
                  shadow-none
                  h-100
                  overflow-hidden
                  d-flex
                  flex-column
                "
              >
                <v-card-text class="p-0 h-100 overflow-hidden">
                  <VueCropper
                    v-show="selectedFile"
                    ref="cropper"
                    :src="selectedFile"
                    alt=""
                    :aspect-ratio="20 / 3"
                    class="card card-primary mb-3"
                  ></VueCropper>
                </v-card-text>
                <v-card-actions class="justify-content-end">
                  <v-btn
                    color="primary"
                    class="
                      btn btn-secondary
                      color-white
                      font-semi-bold
                      mr-2
                      py-1
                      px-3
                      rounded-12
                      text-capitalize
                    "
                    text
                    data-dismiss="modal"
                    @click="clearCrop"
                    ><span class="font-semi-bold">Cancel</span></v-btn
                  >
                  <v-btn
                    class="
                      btn btn-success
                      font-semi-bold
                      bg-primary
                      color-dark
                      py-1
                      px-3
                      rounded-12
                      text-capitalize
                      shadow-none
                    "
                    @click="saveImage(), (dialog = false)"
                    ><span class="font-semi-bold">Upload</span></v-btn
                  >
                </v-card-actions>
              </v-card>
              <!-- </v-dialog> -->
            </div>
          </div>

          <!-- <div class="modal-footer px-4">
            <button
              class="btn btn-primary"
              :disabled="!leaderUpdate"
              @click.prevent="addLeader()"
            >
              Update
            </button>
          </div> -->
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
            <p class="confirm-text d-flexconfirm-text d-flex">
              <span class="w-100 color-dark font-semi-bold"
                >{{ confirmationMessage }}
              </span>
              <!-- <span class="delete-text w-100 pl-1">
                          {{ remove_name }}</span
                        > -->
              <!-- <span class="w-100"> file?</span> -->
            </p>
          </div>
          <div v-if="showClubInfo && clubInformation" class="modal-body">
            <p class="confirm-text d-flex justify-content-between">
              <label for="created_at">Type</label>
              <span class="color-dark font-semi-bold"
                >{{ clubInformation.activity_type }}
              </span>

              <label for="created_at">Created By</label>
              <span
                v-if="clubInformation.student"
                class="color-dark font-semi-bold"
                >{{
                  clubInformation.student.first_name +
                  " " +
                  clubInformation.student.last_name
                }}
              </span>

              <label for="created_at">Created At</label>
              <span class="color-dark font-semi-bold"
                >{{ clubCreatedAt }}
              </span>
            </p>
          </div>
          <div v-if="!showClubInfo" class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary px-4 py-1 rounded-12 font-semi-bold"
              data-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              class="btn btn-success px-4 py-1 rounded-12 font-semi-bold"
              data-dismiss="modal"
              @click="confirmAction()"
            >
              Yes
            </button>
          </div>
          <div v-if="showClubInfo" class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary px-4 py-1 rounded-12 font-semi-bold"
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
import Multiselect from "vue-multiselect";
import "vue-croppa/dist/vue-croppa.css";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import VueCropper from "vue-cropperjs";

var headingName = "";
var clubId = "";
var list_data = [];
var statusValue = "";
export default {
  name: "UserClubInfo",
  components: {
    lottie,
    Multiselect,
    Cropper,
    VueCropper,
  },
  data() {
    return {
      value: [],
      valueMeeting: "",
      name: "",
      student: "",
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      headingName: this.$route.query.name,
      clubId: this.$route.query.id,
      type: this.$route.query.type,
      list_data: [],
      tagValue: [],
      availability: "",
      activity_type: "",
      editDescription: false,
      clubDetails: {},
      leadersInfo: {},
      membersInfo: {},
      dayList: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      dateArray: [],
      dayArrVal: [],
      daysArray: [],
      selectedStudents: [],
      leaderUpdate: {},
      isLeaderView: false,
      tagColorMap: {},
      croppa: {},
      img: "https://images.unsplash.com/photo-1600984575359-310ae7b6bdf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
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
    };
  },

  mounted() {
    var user = localStorage.getItem("user_type");
    this.getClubMoreInfo();
    this.SlotswithId();
    // load students for add leader
    this.GetStudents();

    // if (user == 3) {
    this.ClubInfo();
    this.GetTag();
    // } else {
    //   this.$router.push("/");
    // }
  },
  computed: {
    ...mapState("clubInfo", {
      enableEdit: (state) => state.enableEdit,
      allList: (state) => state.allList,
      taglist: (state) => state.taglist,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
      students: (state) => state.students,
    }),
    ...mapState("clubMoreInfo", {
      clubMoreDetails: (state) => state.clubMoreDetails,
      slots: (state) => state.slots,
      successMessageClub: (state) => state.successMessage,
      SuccessTypeClub: (state) => state.successType,
      errorMessageClub: (state) => state.errorMessage,
      errorTypeClub: (state) => state.errorType,
      clubBannerImage: (state) => state.clubBannerImage,
    }),
    ...mapState("teacherMeeting", {
      // students: (state) => state.students,
    }),
    ...mapState("clubFiles", {
      successMessageClubFile: (state) => state.successMessage,
      SuccessTypeClubFile: (state) => state.SuccessType,
      errorMessageClubFile: (state) => state.errorMessage,
      errorTypeClubFile: (state) => state.errorType,
    }),
    ...mapState("clubUpdates", {
      successTypeClubUpdate: (state) => state.successTypeClubUpdate,
      successMessageClubUpdate: (state) => state.successMessageClubUpdate,
      errorMessageClubUpdate: (state) => state.errorMessageClubUpdate,
      errorTypeClubUpdate: (state) => state.errorTypeClubUpdate,
      clubInformation: (state) => state.clubInformation,
    }),
  },
  methods: {
    ...mapActions("clubInfo", {
      clubInfo: "clubInfo",
      editinformation: "editinformation",
      getTagList: "getTagList",
      editTag: "editTag",
      showClubInCatalog: "showClubInCatalog",
      removeLeader: "removeLeader",
      removeTag: "removeTag",
      addStudentLeader: "addStudentLeader",
      getStudents: "getStudents",
    }),
    ...mapActions("clubMoreInfo", {
      clubMoreInfo: "clubMoreInfo",
      updateTime: "updateTime",
      slotswithId: "slotswithId",
    }),
    ...mapActions("teacherMeeting", {
      // getStudents: "getStudents",
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
      removeLeader: "removeLeader",
      getInformation: "getInformation",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async getClubMoreInfo() {
      await this.clubMoreInfo({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
      });
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
      if (this.successMessageClub != "") {
        $("#nextMeetingModal").modal("hide");
        this.$toast.open({
          message: this.successMessageClub,
          type: this.SuccessTypeClub,
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
      this.valueMeeting = "";
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
    checkSlot(day) {
      if (this.dateArray.includes(day)) {
        return true;
      } else {
        return false;
      }
    },
    UpdateSlots(val) {
      this.valueId = val.id;
    },
    async GetTag() {
      await this.getTagList({
        club_id: this.$route.query.id,
      });
    },
    // generate random tag colours
    generateRandomColor() {
      this.tagColorMap = {};
      const obj = {};
      this.list_data.forEach((e) => {
        if (e.taglists && e.taglists.length > 0) {
          e.taglists.forEach((tag) => {
            // let index = this.tagColorMap.find((index) => index.tag == tag);
            if (!this.tagColorMap[tag.name]) {
              let color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
              const key = tag.name;

              obj[key] = color;
            }
          });
          this.tagColorMap = obj;
          console.log("color", this.tagColorMap);
        }
      });
    },
    async ShowClubInCatalog() {
      this.loading = true;
      await this.showClubInCatalog({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
        status: this.availability ? "active" : "inactive",
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
      this.ClubInfo();
    },

    async ClubInfo() {
      this.loading = true;
      await this.clubInfo({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
      });
      this.activity_type = this.allList[0].activity_type;
      this.loading = false;
      this.list_data = [];
      this.clubDetails = this.allList[0];
      this.leadersInfo = this.allList[1].Leaders_info;
      this.membersInfo = this.allList[2].Members_info;
      this.allList.forEach((element) => {
        var Scheduleobj = {};
        statusValue = element.status_by_leader;
        var description = element.description;
        var new_leader = element.student_leaders;
        if (new_leader) {
          var newLeader = new_leader.split(",");
        }
        var leader = element.leaders_names;
        if (leader) {
          var leaders = leader.split(",");
        }
        var todoLeader = [];
        var todoArr = [];
        var taglists = [];
        Scheduleobj["description"] = description;
        Scheduleobj["leaders"] = leaders;
        Scheduleobj["newLeader"] = newLeader;
        element["tag_details"]?.forEach((el) => {
          var ScheduleArr = {};
          ScheduleArr["name"] = el.tags.name;
          ScheduleArr["id"] = el.tags.id;
          taglists.push(ScheduleArr);
        });
        if (leaders) {
          leaders.forEach((ele) => {
            todoArr.push(ele);
          });
        }
        if (new_leader) {
          newLeader.forEach((elements) => {
            todoLeader.push(elements);
          });
        }

        Scheduleobj["todoLeader"] = todoLeader;
        Scheduleobj["todoArr"] = todoArr;
        Scheduleobj["taglists"] = taglists;
        this.list_data.push(Scheduleobj);
        // this.taglist = this.taglist.filter( ( el ) => !this.list_data.includes( el ) );
      });
      this.generateRandomColor();
      if (statusValue == "active") {
        this.availability = true;
      } else {
        this.availability = false;
      }
    },
    async Editinformation(value, des) {
      this.loading = true;
      if (this.student) {
        await this.editinformation({
          user_id: localStorage.getItem("id"),
          club_id: value,
          student_leaders: this.student,
        });
      } else {
        await this.editinformation({
          user_id: localStorage.getItem("id"),
          club_id: value,
          description: des,
        });
      }

      this.loading = false;
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.editDescription = false;
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.student = "";
      this.ClubInfo();
    },
    async EditTag(val) {
      this.loading = true;
      if (val) {
        this.tagValue = val.id;
      }
      await this.editTag({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
        tags: this.tagValue,
      });
      this.loading = false;
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.value = "";
        this.GetTag();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }

      this.ClubInfo();
    },
    async RemoveLeader(val) {
      await this.removeLeader({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
        name: val,
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
      this.ClubInfo();
    },
    async RemoveTag(val) {
      await this.removeTag({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
        tag_id: val,
      });
      if (this.successMessage != "") {
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.GetTag();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
      this.ClubInfo();
    },
    availabilityToggle() {},
    check() {
      this.editDescription = true;
    },
    onNextMeeting() {
      if (this.enableEdit) {
        $("#nextMeetingModal").modal();
      }
    },
    // adding student leader
    async GetStudents() {
      await this.getStudents({
        // school_id: localStorage.getItem("school_id"),
        // studentId: localStorage.getItem("id"),
        clubId: this.$route.query.id,
      });
    },
    async addLeader() {
      await this.addStudentLeader({
        club_id: this.$route.query.id,
        user_id: this.leaderUpdate ? this.leaderUpdate.id : "",
      });
      if (this.successMessage != "") {
        $("#addLeaderModal").modal("hide");
        this.$toast.open({
          message: this.successMessage,
          type: this.SuccessType,
          duration: 5000,
        });
        this.leaderUpdate = "";
        this.ClubInfo();
        this.GetStudents();
      } else if (this.errorMessage != "") {
        this.$toast.open({
          message: this.errorMessage,
          type: this.errorType,
          duration: 5000,
        });
      }
    },
    // view more members
    openViewMoreMembers(isLeader) {
      this.isLeaderView = isLeader;
      $("#viewMoreModal").modal({ backdrop: true });
    },
    // add student leaders
    openAddLeader() {
      $("#addLeaderModal").modal({ backdrop: true });
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
          console.log("consoling image outputs ", blob, file);
          formData.append("file", blob, this.fileName);
          formData.append("club_id", this.$route.query.id);
          formData.append("user_id", localStorage.getItem("id"));
          formData.append("club_banner", "1");

          this.upload(formData);

          // this.uploadBanner(formData, {
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //   },
          //   club_id: this.$route.query.id,
          // });
          // if (this.successMessageClubFile != "") {
          //   $(".modal").modal("hide");
          //   $(".modal-backdrop").remove();
          //   this.$toast.open({
          //     message: this.successMessageClubFile,
          //     type: this.SuccessTypeClubFile,
          //     duration: 5000,
          //   });
          //   this.getClubMoreInfo();
          // } else if (this.errorMessageClubFile != "") {
          //   this.$toast.open({
          //     message: this.errorMessageClubFile,
          //     type: this.errorTypeClubFile,
          //     duration: 5000,
          //   });
          // }
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
      //   this.loading = false;
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
        console.log(this.mime_type, file);
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

    clearCrop() {
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
      switch (event) {
        case "delete": {
          return "Are you sure you want to delete this club? This action is not reversible!";
        }
        case "remove_leader": {
          return "Are you sure you want to remove yourself as a leader of this club? This action is not reversible!";
        }
        case "leave": {
          return "Are you sure you want to leave this club? This action is not reversible!";
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
      this.$router.push("/club-detail");
    },
    async removeAsLeader() {
      await this.removeLeader({
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
      this.$router.push("/club-detail");
    },
    async getClubInformation() {
      await this.getInformation({
        club_id: this.clubId,
      });
      console.log("club information", this.clubInformation);
      this.clubCreatedAt = moment(this.clubInformation).format("MMMM Do, YYYY");
    },
  },
};
</script>

<style>
.cropper {
  height: 600px;
  width: 600px;
  background: #ddd;
}

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
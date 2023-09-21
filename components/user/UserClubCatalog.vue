<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div class="main-section">
      <div
        class="bg-white border rounded-10 p-4 custom-margin-for-main-section custom-full-height d-flex flex-column"
      >
        <section id="tab" class="">
          <div class="tab-section container-fluid">
            <div class="d-flex justify-content-between align-item-center">
              <div class="d-flex flex-column">
                <h2
                  data-intro="View all the community service, sports teams, and clubs available at your school. To learn more about different activities, click learn more."
                  class="color-primary-dark font-semi-bold mb-1"
                >
                  Club Catalog
                </h2>
                <h4 class="mb-2 color-dark font-semi-bold">
                  Find your people!
                </h4>
              </div>

              <div
                data-intro="You can even create your own extracurricular here. It may take some time to appear as an administrator at your school and will have to approve this before other students can see your new extracurricular activity."
              >
                <button
                  v-if="user_type == 3"
                  type="button"
                  class="btn btn-primary py-2 mt-1 h-fit-content px-4"
                  @click="openCreateNewModal"
                >
                  Create your own club
                </button>
              </div>
            </div>
            <div class="row p-2">
              <div class="col-md-4">
                <div class="form-row position-relative">
                  <input
                    data-intro="Search for different extracurriculars (sports, clubs, extracurriculars) from this search bar."
                    class="form-control w-100 tab-form-control"
                    type="text"
                    v-model="search"
                    placeholder="Search"
                    v-on:keyup="debounceSearch()"
                  />
                  <span class="input-icon custom-search-icon position-absolute">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
              <div class="col-md-4">
                <div
                  data-intro="Filter extracurriculars based on different tags here."
                  class="input-icon-area custom-multiselect-adj-text form-row"
                >
                  <multiselect
                    v-model="value"
                    :options="tags"
                    track-by="name"
                    label="name"
                    placeholder="Filter"
                    @input="filterSelection"
                  >
                    <span slot="noResult">No data found</span>
                  </multiselect>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- end tab for club catalog -->

        <!-- Club catalog -->

        <section
          id="club-detail"
          class="d-flex flex-column flex-fill h-40 pr-3"
        >
          <div
            class="inner-club container-fluid bg-transparent custom-overflow pe-2 mr--2 mt-0 d-flex flex-column flex-fill"
          >
            <div
              class="pt-4 pb-3 border-bottom"
              v-for="(list, index) in list_data"
              :key="index"
            >
              <div class="row catalog-row">
                <div class="col-lg-4">
                  <h4 class="mb-2 color-dark font-semi-bold text-capitalize">
                    {{ list["name"] }}
                  </h4>

                  <p class="color-secondary fort-regular text-14 mb-0">
                    {{ list.activity_type == "Clubs" ? "Club" : "Team" }}
                  </p>
                </div>
                <div
                  class="col-lg-6 d-flex justify-content-start justify-content-lg-end"
                >
                  <div
                    class="p-0 pr-2 pr-sm-0 pr-md-4 pr-xl-2 d-flex justify-content-start justify-content-lg-end"
                  >
                    <div
                      class="to-do-ul d-flex align-items-center justify-content-start justify-content-lg-end flex-wrap"
                    >
                      <p
                        v-for="(todos, index) in list.tagList"
                        :key="index"
                        class="mb-2"
                      >
                        <span
                          class="to-do-li color-white text-14 rounded-6 px-4 py-1 m-1 min-w-100 d-flex justify-content-center"
                          :style="{
                            'background-color': tagColorMap[todos]
                              ? tagColorMap[todos]
                              : red,
                          }"
                        >
                          {{ todos }}
                        </span>
                      </p>
                      <span
                        v-if="list.tagList.length == 0"
                        class="to-do-li color-secondary"
                      >
                        No tags available
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="col-lg-2 d-flex justify-content-start justify-content-lg-end"
                >
                  <nuxt-link
                    v-if="isSchoolAdmin != '1'"
                    :to="{
                      path: '/student-club-view',
                      query: { id: list.id, name: list.name },
                    }"
                    class="btn btn-primary py-1 mt-2 h-fit-content px-lg-3 px-xl-4"
                  >
                    Learn More
                  </nuxt-link>
                  <nuxt-link
                    v-else
                    :to="{
                      path: '/club-moreInfo',
                      query: {
                        id: list.id,
                        name: list.name,
                        type: list.activity_type,
                      },
                    }"
                    class="btn btn-primary py-1 mt-2 h-fit-content px-lg-3 px-xl-4"
                  >
                    Learn More
                  </nuxt-link>
                </div>
              </div>
            </div>
            <div v-if="list_data.length == 0" class="w-100 text-center py-5">
              <p class="no-data">No data available</p>
            </div>
          </div>
        </section>

        <!-- End Club catalog -->

        <!-- Create new modal -->

        <!-- <div
          class="modal fade"
          id="createNewModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-md modal-dialog-centered"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header pb-1">
                <h3 class="modal-title" id="exampleModalLabel">
                  Create your own club
                </h3>
              </div>
              <div class="modal-body px-3">
                <form action="">
                  <table class="w-100 table-modal custom-row-table">
                    <tr>
                      <td class="tmodal-data d-flex">
                        <p
                          class="mb-0 tdata-overflow d-flex align-items-center form-row px-0 py-1 col-12 col-md-10 col-lg-9"
                        >
                          <span class="pr-2"></span>
                          <input
                            type="text"
                            v-model="name"
                            autocomplete="off"
                            maxlength="100"
                            class="form-control bg-white custom-form-control"
                            placeholder="Name"
                            :class="{
                              'is-invalid': submitted && $v.name.$error,
                            }"
                          />
                        </p>
                        <div
                          v-if="submitted && $v.name.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.name.required"
                            >This field is required</span
                          >
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="tmodal-data d-flex">
                        <p
                          class="mb-0 tdata-overflow d-flex align-items-center form-row col-12 col-md-11 col-lg-10 px-0 py-1"
                        >
                          <span class="pr-2"></span>
                          <textarea
                            rows="3"
                            v-model="description"
                            placeholder="Description"
                            type="text"
                            autocomplete="off"
                            maxlength="700"
                            class="form-control bg-white custom-form-control"
                            :class="{
                              'is-invalid': submitted && $v.description.$error,
                            }"
                          ></textarea>
                        </p>
                        <div
                          v-if="submitted && $v.description.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.description.required"
                            >This field is required</span
                          >
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="tmodal-data d-flex">
                        <p
                          class="mb-0 tdata-overflow d-flex align-items-center form-row col-12 col-md-7 col-lg-6 px-0 py-1"
                        >
                          <span class="pr-2"></span>
                          <select
                            v-model="activity_type"
                            class="custom-select form-control bg-white"
                            :class="{
                              'is-invalid':
                                submitted && $v.activity_type.$error,
                            }"
                          >
                            <option value="" selected disabled>Type</option>
                            <option value="Clubs">Club</option>
                            <option value="Sports">Team</option>
                          </select>
                        </p>
                        <div
                          v-if="submitted && $v.activity_type.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.activity_type.required"
                            >This field is required</span
                          >
                        </div>
                      </td>
                    </tr>
                  </table>
                </form>
              </div>
              <div class="modal-footer justify-content-end border-top-0">
                <button
                  type="button"
                  class="btn btn-secondary px-4 py-1 rounded-8 font-semi-bold"
                  data-dismiss="modal"
                  @click="resetClubData"
                >
                  Close
                </button>
                <button
                  type="button"
                  @click="createNewClub"
                  class="btn btn-primary px-4 py-1 rounded-8 font-semi-bold"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div> -->

        <!-- Create new modal end -->

        <!-- Create own club modal -->
        <div
          class="modal fade"
          id="createNewModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="createClubModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered add-assmt" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h3
                  class="color-primary-dark font-semi-bold"
                  id="createClubModalLongTitle"
                >
                  Create your own club
                </h3>
              </div>
              <div class="modal-body no-overflow px-4">
                <form name="announcement">
                  <fieldset>
                    <div class="form-group">
                      <input
                        type="text"
                        id="clubName"
                        placeholder="Name"
                        class="form-control"
                        v-model="name"
                        name="clubName"
                        :class="{
                          'is-invalid': submitted && $v.name.$error,
                        }"
                      />
                      <div
                        v-if="submitted && $v.name.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.name.required"
                          >This field is required</span
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        id="descriptionText"
                        v-model="description"
                        name="description"
                        maxlength="800"
                        placeholder="Description"
                        :class="{
                          'is-invalid': submitted && $v.description.$error,
                        }"
                      ></textarea>
                      <div
                        v-if="submitted && $v.description.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.description.required"
                          >This field is required</span
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <select
                        v-model="activity_type"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            submitted && $v.activity_type.$error,
                        }"
                      >
                        <option value="" selected disabled>Type</option>
                        <option value="Clubs">Club</option>
                        <option value="Sports">Team</option>
                      </select>
                      <div
                        v-if="submitted && $v.activity_type.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.activity_type.required"
                          >This field is required</span
                        >
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
              <div class="modal-footer justify-content-end border-top-0">
                <button
                  type="button"
                  class="btn btn-secondary px-3 py-1 rounded-8 font-semi-bold"
                  data-dismiss="modal"
                  @click="resetClubData"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary px-3 py-1 rounded-8 font-semi-bold"
                  @click="createNewClub"
                >
                Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Create own club modal -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Multiselect from "vue-multiselect";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
import { required } from "vuelidate/lib/validators";

var SelectValue = "";
var list_data = [];
var ismounted = false;
export default {
  name: "UserClubCatalog",
  components: {
    Multiselect,
    lottie,
  },
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/intro.js/6.0.0/introjs.css",
        },
      ],
    };
  },
  data() {
    return {
      user_type: 0,
      list_data: [],
      value: "",
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      search: "",
      todoList: false,
      expandId: "",
      activity_type: "",
      name: "",
      description: "",
      submitted: false,
      tags: [],
      debounce: null,
      tagColorMap: {},
      startTime: null,
      isSchoolAdmin: "0",
    };
  },
  validations: {
    activity_type: { required },
    name: { required },
    description: { required },
  },
  mounted() {
    // if (process.client) { 
      
    // }
    window.addEventListener("orientationchange", this.handleOrientationChange);
    this.isSchoolAdmin = localStorage.getItem("schoolAdmin");
    const page = "ClubCatalog";
    const distinct_id = localStorage.getItem("distinctId");
    this.$mixpanel.track("Page View", { distinct_id, page });
    this.startTime = new Date().getTime();
    
    this.user_type = localStorage.getItem("user_type");
    SelectValue = "";
    this.GetTag();
    this.ClubCatalogue();
    this.startIntro();
  },
  computed: {
    ...mapState("clubCatalogue", {
      allList: (state) => state.allList,
      taglist: (state) => state.taglist,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
    startProductGuide() {
      return this.$store.state.startProductGuide;
    },
  },
  methods: {
    ...mapActions("clubCatalogue", {
      clubCatalogue: "clubCatalogue",
      joinClub: "joinClub",
      getTag: "getTag",
      createClub: "createClub",
    }),
    debounceSearch() {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.ClubCatalogue();
      }, 600);
    },
    myFunction: function (id) {
      if (this.expandId && this.expandId != id) {
        this.todoList = false;
        var dotsValue = document.getElementById("dots" + this.expandId);
        var moreTextValue = document.getElementById("more" + this.expandId);
        var btnTextValue = document.getElementById(this.expandId);
        if (dotsValue && dotsValue.style.display === "none") {
          dotsValue.style.display = "inline";
          moreTextValue.style.display = "none";
        }
        if (!this.todoList && btnTextValue) {
          btnTextValue.innerHTML = "Read more";
          this.expandId = "";
        }
      }

      this.expandId = id;
      this.todoList = !this.todoList;
      var dots = document.getElementById("dots" + id);
      var moreText = document.getElementById("more" + id);
      var btnText = document.getElementById(id);

      if (dots && dots.style.display === "none") {
        dots.style.display = "inline";
        moreText.style.display = "none";
      } else if (dots) {
        dots.style.display = "none";
        moreText.style.display = "inline";
      }
      if (!this.todoList && btnText) {
        btnText.innerHTML = "Read more";
        this.expandId = "";
      } else if (this.todoList && btnText) {
        btnText.innerHTML = "Read less";
      }
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async GetTag() {
      await this.getTag({});
      this.tags = [{ createdAt: "", id: "", name: "All", updatedAt: "" }];
      this.tags = this.tags.concat(this.taglist);
      this.value = this.tags[0];
    },
    async ClubCatalogue() {
      this.loading = true;
      await this.clubCatalogue({
        school_id: localStorage.getItem("school_id"),
        user_id: localStorage.getItem("id"),
        tag_id: SelectValue,
        search_key: this.search,
      });
      this.loading = false;
      this.list_data = [];

      this.allList.forEach((element) => {
        var Scheduleobj = {};
        var description = element.description;
        var name = element.name;
        var id = element.id;
        var tagList = [];

        if (element.description) {
          var tokens = element.description.split(" ");

          var descriptionPart = "";
          var remaining = "";

          if (tokens.length >= 15) {
            for (let i = 0; i < 15; i++) {
              descriptionPart = descriptionPart + tokens[i] + " ";
            }
            for (let j = 15; j < tokens.length; j++) {
              remaining = remaining + tokens[j] + " ";
            }
          } else {
            descriptionPart = element.description;
          }
        }

        Scheduleobj["part"] = descriptionPart;
        Scheduleobj["description"] = description;
        Scheduleobj["name"] = name;
        Scheduleobj["id"] = id;
        Scheduleobj["remaining"] = remaining;
        element.club_details.forEach((ele) => {
          tagList.push(ele?.tags?.name);
        });
        Scheduleobj["tagList"] = tagList;
        Scheduleobj["activity_type"] = element.activity_type;
        this.list_data.push(Scheduleobj);
      });
      this.list_data.forEach((element) => {
        var dots = document.getElementById("dots" + element.id);
        var moreText = document.getElementById("more" + element.id);
        var btnText = document.getElementById(element.id);
        if (dots) {
          dots.style.display = "inline";
          btnText.innerHTML = "Read more";
          moreText.style.display = "none";
        }
      });
      this.generateRandomColor();
    },

    // generate random tag colours
    generateRandomColor() {
      this.tagColorMap = {};
      const obj = {};
      this.list_data.forEach((e) => {
        if (e.tagList && e.tagList.length > 0) {
          e.tagList.forEach((tag) => {
            if (!this.tagColorMap[tag]) {
              let color = this.randomColorMap();
              
              const key = tag;

              obj[key] = color;
            }
            this.tagColorMap = obj;
          });
        }
      });
    },

    randomColorMap(){
     let color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
     color = color.length<7 ? color + "0".repeat(7 - color.length) : color
     const isWhiteSpectrumColor = this.isColorInWhiteSpectrum(color);

      if(isWhiteSpectrumColor){
        return this.randomColorMap()
      }
      return color;
      
    },

    isColorInWhiteSpectrum(hexColor, threshold = 50) {
      // Convert hexadecimal color to RGB values

      const hex = hexColor.replace(/^#/, '');
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;

      // Calculate the difference between each RGB component and the maximum value (255 for white)
      const diffR = 255 - r;
      const diffG = 255 - g;
      const diffB = 255 - b;

      // Calculate the overall difference as a sum of squared differences
      const overallDiff = diffR ** 2 + diffG ** 2 + diffB ** 2;

      // Compare the overall difference with the squared threshold
      return overallDiff <= threshold ** 2;
    },

    async JoinClub(value) {
      this.loading = true;
      await this.joinClub({
        club_id: value,
        user_id: localStorage.getItem("id"),
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
      this.loading = false;
      this.ClubCatalogue();
    },
    filterSelection(val) {
      if (val && val.id) {
        SelectValue = val.id;
      } else {
        SelectValue = "";
      }
      this.ClubCatalogue();
    },
    async createNewClub() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.loading = true;
        await this.createClub({
          activity_type: this.activity_type,
          school_id: localStorage.getItem("school_id"),
          student_id: localStorage.getItem("id"),
          name: this.name,
          description: this.description,
        });
        this.submitted = false;
        if (this.successMessage != "") {
          this.resetClubData();
          $("#createNewModal").modal("hide");
          $(".modal-backdrop").remove();
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
        this.loading = false;
        this.ClubCatalogue();
      }
    },
    resetClubData() {
      this.activity_type = "";
      this.name = "";
      this.description = "";
    },
    openCreateNewModal() {
      this.$v.$reset();
      this.resetClubData();
      $("#createNewModal").modal({ backdrop: true });
    },
    startIntro() {
      const intro = this.$intro();
      let completed = false;
      let skip = false;
      if (this.startProductGuide) {
        intro.start();
        intro.onskip(() => {
          skip = true;
          this.$store.commit("setStartProductGuide", false);
        });
        if (skip) return;
        intro.oncomplete((step, state) => {
          completed = true;
          if (state != "skip") this.$router.push("/study-time");
        });
        intro.onexit(() => {
          if (!completed) this.$store.commit("setStartProductGuide", false);
        });
      }
    },
    handleOrientationChange() {
      const intro = this.$intro();
      intro.exit();
      this.$store.commit("setStartProductGuide", false);
    },
  },
  beforeDestroy() {
    const endTime = new Date().getTime();
    const duration = (endTime - this.startTime) / 1000;
    const distinct_id = localStorage.getItem("distinctId");
    const page = "ClubCatalog";
    this.$mixpanel.track("Page Duration", { duration, distinct_id, page });
  },
  destroyed() {
    window.removeEventListener(
      "orientationchange",
      this.handleOrientationChange
    );
  },
};
</script>

<style scoped>
#more {
  display: none;
}
</style>
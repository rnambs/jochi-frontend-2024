<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div class="main-section">
      <!-- tab for club catalog -->
      <div
        class="
          jochi-components-light-bg
          p-4
          custom-margin-for-main-section custom-full-height
          d-flex
          flex-column
        "
      >
        <section id="tab" class="">
          <div class="tab-section container-fluid mt-4">
            <div class="d-flex justify-content-between align-item-center">
              <h3 class="color-primary font-semi-bold">Club Catalog</h3>
              <!-- data-toggle="modal"
                data-target="#createNewModal" -->
              <button
                type="button"
                class="btn btn-primary"
                @click="openCreateNewModal"
              >
                Create New
              </button>
            </div>
            <div class="row p-2">
              <div class="col-md-4">
                <div class="form-row position-relative">
                  <input
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
                  <!-- <span class="input-icon">
                      <i class="fa fa-filter" aria-hidden="true"></i>
                    </span> -->
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
            class="
              inner-club
              container-fluid
              bg-transparent
              custom-overflow
              pe-2
              mr--2
              mt-3
              d-flex
              flex-column flex-fill
            "
          >
            <div
              class="pt-3 pb-1 border-bottom"
              v-for="(list, index) in list_data"
              :key="index"
            >
              <!-- <div class="row-heading col-12">
                    <h6 class="mb-0">{{ list["name"] }}</h6>
                  </div> -->
              <div class="row catalog-row">
                <div class="col-lg-4">
                  <h5 class="mb-0 color-dark font-semi-bold">
                    {{ list["name"] }}
                  </h5>
                  <!-- <p class="catalog-text">
                        {{ list.part ? list.part : "No data "
                        }}<span :id="'dots' + list.id" v-if="list.remaining"
                          >...</span
                        ><span :id="'more' + list.id" style="display: none">
                          {{ list.remaining }}
                        </span>
                      </p> -->
                  <p class="color-secondary fort-regular text-14">
                    {{ list.activity_type == "Clubs" ? "Club" : "Team" }}
                  </p>
                </div>
                <div
                  class="
                    col-lg-6
                    d-flex
                    justify-content-start justify-content-lg-end
                  "
                >
                  <div
                    class="
                      p-0
                      pr-2
                      d-flex
                      justify-content-start justify-content-lg-end
                    "
                  >
                    <div
                      class="
                        to-do-ul
                        d-flex
                        align-items-center
                        justify-content-end
                        flex-wrap
                      "
                    >
                      <p
                        v-for="(todos, index) in list.tagList"
                        :key="index"
                        class="mb-2"
                      >
                        <!-- <li
                              class="to-do-li"
                              v-if="
                                index % 2 == 0 &&
                                (!(expandId == list.id) ? index < 4 : true)
                              "
                            >
                              {{ todos }}
                            </li> -->
                        <span
                          class="
                            to-do-li
                            color-white
                            text-14
                            rounded
                            px-4
                            py-1
                            m-1
                            min-w-100
                            d-flex
                            justify-content-center
                          "
                          :style="{
                            'background-color': tagColorMap[todos],
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
                <!-- <div class="col-md-3">
                      <ul class="to-do-ul">
                        <span
                          v-for="(todos, index) in list.tagList"
                          :key="index"
                        >
                          <li
                            class="to-do-li"
                            v-if="
                              index % 2 != 0 &&
                              (!(expandId == list.id) ? index < 4 : true)
                            "
                          >
                            {{ todos }}
                          </li>
                        </span>
                      </ul>
                    </div> -->
                <!-- <div class="col-md-2">
                      <a
                        href="#"
                        class="btn btn-join-now"
                        @click="JoinClub(list.id)"
                        >Join Now</a
                      >
                      <a
                        v-if="
                          (list.part && list.remaining) ||
                          list.tagList.length >= 5
                        "
                        class="btn readmore-btn"
                        @click="myFunction(list.id)"
                        :id="list.id"
                        >Read more<i class="fas fa-chevron-right pl-1"></i
                      ></a>
                    </div> -->

                <!-- <div class="col-lg-2 d-flex justify-content-start justify-content-lg-end">
                      <nuxt-link
                        :to="{
                          path: '/student-club-view',
                          query: { id: list.id, name: list.activity_type },
                        }"
                        class="
                          btn
                          btn-primary
                          py-2
                          px-4
                          mt-2
                          h-fit-content
                        "
                      >
                        View More
                      </nuxt-link>
                    </div>
                  </div>
                </div> -->
                <div
                  class="
                    col-lg-2
                    d-flex
                    justify-content-start justify-content-lg-end
                  "
                >
                  <nuxt-link
                    :to="{
                      path: '/student-club-view',
                      query: { id: list.id, name: list.activity_type },
                    }"
                    class="btn btn-primary py-1 mt-2 h-fit-content"
                  >
                    View More
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

        <div
          class="modal fade"
          id="createNewModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Create New</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="resetClubData"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form action="">
                  <table class="w-100 table-modal custom-row-table">
                    <tr>
                      <td class="tmodal-data text-nowrap">Type</td>
                      <td class="tmodal-data d-flex">
                        <p
                          class="
                            mb-0
                            tdata-overflow
                            d-flex
                            align-items-center
                            form-row
                            col-8
                            px-0
                            py-1
                          "
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
                    <tr>
                      <td class="tmodal-data text-nowrap">Name</td>
                      <td class="tmodal-data d-flex">
                        <p
                          class="
                            mb-0
                            tdata-overflow
                            d-flex
                            align-items-center
                            form-row
                            px-0
                            py-1
                            col-8
                          "
                        >
                          <span class="pr-2"></span>
                          <input
                            type="text"
                            v-model="name"
                            autocomplete="off"
                            maxlength="100"
                            class="form-control bg-white custom-form-control"
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
                      <td class="tmodal-data text-nowrap">Description</td>
                      <td class="tmodal-data d-flex">
                        <p
                          class="
                            mb-0
                            tdata-overflow
                            d-flex
                            align-items-center
                            form-row
                            col-8
                            px-0
                            py-1
                          "
                        >
                          <span class="pr-2"></span>
                          <textarea
                            rows="3"
                            v-model="description"
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

                    <!-- <tr>
                      <td class="tmodal-data text-nowrap">Tags</td>
                      <td class="tmodal-data">
                        <p class="mb-0 tdata-overflow  d-flex align-items-center">
                          <span class="pr-2">:</span>
                          <select
                            class="custom-select custom-select-sm mb-3"
                          >
                            <option value="Video Conference">
                              Tag 1
                            </option>
                            <option value="In Person">Tag 2</option>
                          </select>
                        </p>
                      </td>
                    </tr> -->
                  </table>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-color-close"
                  data-dismiss="modal"
                  @click="resetClubData"
                >
                  Close
                </button>
                <button
                  type="button"
                  @click="createNewClub"
                  class="btn btn-color-save"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Create new modal end -->
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
  data() {
    return {
      list_data: [],
      value: "",
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      search: "",
      todoList: false,
      expandId: "",
      // taglist: [],
      activity_type: "",
      name: "",
      description: "",
      submitted: false,
      tags: [],
      debounce: null,
      tagColorMap: {},
    };
  },
  validations: {
    activity_type: { required },
    name: { required },
    description: { required },
  },
  mounted() {
    SelectValue = "";
    this.GetTag();
    this.ClubCatalogue();
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
      // console.log("color", this.list_data);
      this.list_data.forEach((e) => {
        if (e.tagList && e.tagList.length > 0) {
          e.tagList.forEach((tag) => {
            // let index = this.tagColorMap.find((index) => index.tag == tag);
            if (!this.tagColorMap[tag]) {
              let color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
              const key = tag;

              obj[key] = color;

              console.log(obj);
            }
            this.tagColorMap = obj;
          });
        }
      });
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
          // $(".modal").modal("hide");
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
  },
};
</script>

<style scoped>
#more {
  display: none;
}
</style>
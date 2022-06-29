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
      <div class="jochi-components-light-bg p-4 custom-margin-for-main-section custom-full-height">
        <section id="tab" class="">
          <div class="tab-section container-fluid mt-4">
            <h4 class="tab-head">Club Catalog</h4>
            <div class="inner-tab-section container-fluid py-3">
              <div class="row m-auto">
                <div class="col-md-4">
                  <div class="input-icon-area">
                    <input
                      class="form-control"
                      type="text"
                      v-model="search"
                      placeholder="Search"
                      v-on:keyup="ClubCatalogue()"
                    />
                    <span class="input-icon custom-search-icon-1">
                      <i class="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="input-icon-area custom-multiselect-adj-text">
                    <multiselect
                      v-model="value"
                      :options="taglist"
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
          </div>
        </section>

        <!-- end tab for club catalog -->

        <!-- Club catalog -->

        <section id="club-detail" class="">
          <div class="club-section-catlg container-fluid mt-3">
            <div class="inner-club container-fluid p-4">
              <div class="inner-clb p-2">
                <div
                  class="
                    row
                    catalog-list
                    container-fluid
                    pl-3
                    pr-3
                    pt-3
                    mb-3
                    mx-auto
                  "
                  v-for="(list, index) in list_data"
                  :key="index"
                >
                  <!-- <div class="row-heading col-12">
                    <h6 class="mb-0">{{ list["name"] }}</h6>
                  </div> -->
                  <div class="col-12 p-0">
                    <div class="row catalog-row">
                      <div class="col-md-4 col-sm-4">
                        <h5 class="mb-0">{{ list["name"] }}</h5>
                        <p class="catalog-text">
                          {{ list.part ? list.part : "No data "
                          }}<span :id="'dots' + list.id" v-if="list.remaining"
                            >...</span
                          ><span :id="'more' + list.id" style="display: none">
                            {{ list.remaining }}
                          </span>
                        </p>
                      </div>
                      <div class="col-md-6 d-flex justify-content-end">
                        <div class="col-md-8 pt-0 d-flex justify-content-end">
                          <ul class="to-do-ul d-flex align-items-center justify-content-end flex-wrap">
                            <span
                              v-for="(todos, index) in list.tagList"
                              :key="index"
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
                              <li class="to-do-li">
                                {{ todos }}
                              </li>
                            </span>
                            <span v-if="list.tagList.length == 0" class="to-do-li">
                              No tags available
                            </span>
                          </ul>
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
                      <div class="col-md-2">
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
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="list_data.length == 0" class="w-100 text-center py-5">
                  <p class="no-data">No data available</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- End Club catalog -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Multiselect from "vue-multiselect";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";

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
    };
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
    }),
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
      if (val) {
        SelectValue = val.id;
      } else {
        SelectValue = "";
      }
      this.ClubCatalogue();
    },
  },
};
</script>

<style scoped>
#more {
  display: none;
}
</style>
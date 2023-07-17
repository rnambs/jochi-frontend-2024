<template>
  <div>
    <lottie
      v-if="loading"
      :options="lottieOptions"
      v-on:animCreated="handleAnimation"
      class="lottie-loader"
    />
    <div class="main-section">
      <!-- tab for club files -->

      <section id="tab" class="">
        <div class="info-tab container-fluid mt-3">
          <div class="row tab-row">
            <div class="col-md-4 col-xs-12">
              <nuxt-link
                :to="{
                  path: '/user-club-info',
                  query: { id: clubId, name: headingName },
                }"
                class="inner-tab"
              >
                <i class="fas fa-info"></i><span class="pl">Info</span>
              </nuxt-link>
            </div>
            <div class="col-md-4 col-xs-12">
              <nuxt-link
                :to="{
                  path: '/user-club-files',
                  query: { id: clubId, name: headingName },
                }"
                class="inner-tab"
              >
                <i class="fas fa-file-alt"></i
                ><span class="pl">Files/Slides</span>
              </nuxt-link>
            </div>
            <div class="col-md-4 col-xs-12">
              <nuxt-link
                :to="{
                  path: '/user-club-moreInfo',
                  query: { id: clubId, name: headingName },
                }"
                class="inner-tab"
              >
                <i class="fas fa-ellipsis-h"></i><span class="pl">More</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>

      <!-- end tab for club files -->

      <!-- Club files -->

      <section id="club-detail" class="">
        <div class="club-section container-fluid mt-2">
          <div class="row">
            <div class="col-md-8">
              <div class="inner-club container-fluid p-3">
                <div class="info-head container-fluid my-3">
                  <h5>{{ headingName }}</h5>
                </div>
                <div class="image-overflow">
                  <div class="row info-row container-fluid mt-2 mx-auto">
                    <div
                      class="col-md-3 col-sm-6"
                      v-for="(list, index) in allList"
                      :key="index"
                    >
                      <!-- pdf -->
                      <div
                        class="fig-section"
                        v-if="checkFile(list.original_file_name)"
                      >
                        <span
                          class="input-icon"
                          v-on:click="modalPopUp(list.id, list.file_name)"
                        >
                          <i
                            class="
                              fa fa-times
                              p-1
                              w-100
                              text-right text-secondary
                            "
                            aria-hidden="true"
                            v-if="enableEdit"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                          ></i
                        ></span>
                        <figure class="figure w-100">
                          <a :href="list.original_file_name" target="_blank">
                            <div class="img-figure">
                              <img
                                src="~/assets/images/pdf-screen.png"
                                class="img-fluid rounded figure-img"
                                alt=""
                              />
                            </div>
                          </a>

                          <figcaption class="figure-caption">
                            {{ list.file_name }}
                          </figcaption>
                        </figure>
                      </div>
                      <!-- ppt -->
                      <div
                        class="fig-section"
                        v-if="checkppt(list.original_file_name)"
                      >
                        <span
                          class="input-icon"
                          v-on:click="modalPopUp(list.id, list.file_name)"
                        >
                          <i
                            class="
                              fa fa-times
                              p-1
                              w-100
                              text-right text-secondary
                            "
                            aria-hidden="true"
                            v-if="enableEdit"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                          ></i
                        ></span>
                        <figure class="figure w-100">
                          <a :href="list.original_file_name" download>
                            <div class="img-figure">
                              <img
                                src="~/assets/images/ppt.jpg"
                                class="img-fluid rounded figure-img"
                                alt=""
                              />
                            </div>
                          </a>
                          <figcaption class="figure-caption">
                            {{ list.file_name }}
                          </figcaption>
                        </figure>
                      </div>
                      <!-- image -->
                      <div
                        class="fig-section"
                        v-if="checkImage(list.file_type)"
                      >
                        <span
                          class="input-icon"
                          v-on:click="modalPopUp(list.id, list.file_name)"
                        >
                          <i
                            class="
                              fa fa-times
                              p-1
                              w-100
                              text-right text-secondary
                            "
                            aria-hidden="true"
                            v-if="enableEdit"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                          ></i
                        ></span>
                        <figure class="figure w-100">
                          <div class="img-figure">
                            <img
                              class="figure-img cursor-pointer"
                              v-if="list.original_file_name"
                              id="myImg"
                              :src="list.original_file_name"
                              alt=""
                              @click="imagePopUP(list.original_file_name)"
                            />
                          </div>
                          <figcaption class="figure-caption">
                            {{ list.file_name }}
                          </figcaption>
                        </figure>
                        <!-- The Modal -->
                        <div id="myModal" class="modal">
                          <span class="close" @click="spanClose()"
                            >&times;</span
                          >
                          <img class="modal-content" id="img01" />
                          <div id="caption"></div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="allList.length == 0"
                      class="w-100 text-center py-5"
                    >
                      <p class="no-data">No Data</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal -->
            <div
              class="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">
                      Confirmation
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
                  <div class="modal-body">
                    <p>
                      Are you sure you want to delete this file?
                      <!-- {{ remove_name }}  -->
                    </p>
                  </div>
                  <div class="modal-footer justify-content-center border-top-0">
                    <button
                      type="button"
                      class="btn btn-secondary px-3 py-1 "
                      data-dismiss="modal"
                    >
                      No
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary px-3 py-1 "
                      data-dismiss="modal"
                      @click="FileRemove"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="inner-club p-3">
                <div class="container-fluid p-4 text-center" v-if="enableEdit">
                  <form
                    method="post"
                    @submit.prevent="UploadFile"
                    id="form"
                    enctype="multipart/form-data"
                  >
                    <div class="py-4 upload-area">
                      <div class="proof-img-wrp mt-3 mb-3">
                        <img
                          v-if="fileCheck && profileImageUrl"
                          src="~/assets/images/pdf-upload.png"
                        />
                        <img
                          v-if="filepptCheck && profileImageUrl"
                          src="~/assets/images/ppt-upload.jpg"
                        />
                        <img
                          v-if="!fileCheck && !filepptCheck && profileImageUrl"
                          :src="profileImageUrl"
                        />
                        <img
                          v-if="
                            (!fileCheck || !filepptCheck) && !profileImageUrl
                          "
                          src="~/assets/images/upload.png"
                          id="ElectionDocChange"
                        />
                        <div class="img-edit d-none">
                          <a
                            class="btn btn-info round p-1 mx-1"
                            href="javascript:void(0)"
                          >
                            <i class="fas fa-file-upload"></i>
                          </a>
                          <a
                            class="btn btn-danger round p-1 mx-1"
                            href="javascript:void(0)"
                            @click="removeFile"
                          >
                            <i class="fas fa-trash-alt"></i>
                          </a>
                        </div>
                      </div>
                      <div v-if="profileImageUrl">
                        <input
                          type="file"
                          :v-model="profilePic"
                          ref="profilePic"
                          name="profilePic"
                          class="rg-img-upload img-up-two cursor-pointer"
                          @change="onFileChange"
                          accept=".png,.jpeg,.jpg,.doc,.docx,.pdf"
                        />
                      </div>
                      <div v-else class="custom-upload-with-msg text-center">
                        <label class="form-label" for="actual-btn"
                          >Drag and drop file here
                        </label>
                        <br />
                        <input
                          id="actual-btn"
                          type="file"
                          :v-model="profilePic"
                          ref="profilePic"
                          name="profilePic"
                          class="rg-img-upload img-up-two cursor-pointer"
                          @change="onFileChange"
                          accept=".png,.jpeg,.jpg,.doc,.docx,.pdf"
                        />
                      </div>
                      <button
                        id="clckPrevent"
                        type=""
                        class="btn upload-btn mt-3"
                      >
                        Browse for file
                      </button>
                    </div>
                    <button
                      id="clckPrevent"
                      type="submit"
                      class="btn upload-btn mt-3"
                      :disabled="!profileImageUrl"
                    >
                      <i class="fas fa-file-upload pr-1"></i>Upload
                    </button>
                  </form>
                  <button
                    id="clckPrevent"
                    type=""
                    class="btn delete-btn mt-3"
                    @click="deleteFunction()"
                    :disabled="!profileImageUrl"
                  >
                    <i class="fas fa-trash-alt pr-1"></i>Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- End Club files -->
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/animation.json";
var fileCheck = false;
var filepptCheck = false;
var headingName = "";
var clubId = "";
export default {
  name: "UserClubFiles",
  components: {
    lottie,
  },
  data() {
    return {
      profilePic: null,
      profileImageUrl: "",
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
      headingName: this.$route.query.name,
      clubId: this.$route.query.id,
      fileName: [],
      file_type: "",
      fileCheck: false,
      filepptCheck: false,
      remove_id: "",
      remove_name: "",
    };
  },
  mounted() {
    var user = localStorage.getItem("user_type");
    if (user == 2) {
      this.ClubFiles();
    } else {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState("teacherClubFiles", {
      allList: (state) => state.allList,
      enableEdit: (state) => state.enableEdit,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("teacherClubFiles", {
      clubFiles: "clubFiles",
      uploadFile: "uploadFile",
      fileRemove: "fileRemove",
    }),
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    checkFile(filesName) {
      if (filesName.includes("pdf")) {
        return true;
      }
      return false;
    },
    checkppt(filesName) {
      if (filesName.includes("ppt")) {
        return true;
      }
      return false;
    },
    checkImage(type) {
      if (type == "jpeg" || type == "jpg" || type == "png") {
        return true;
      }
      return false;
    },
    async ClubFiles() {
      this.loading = true;
      await this.clubFiles({
        club_id: this.$route.query.id,
        user_id: localStorage.getItem("id"),
      });
      this.loading = false;
    },

    async UploadFile() {
      this.loading = true;
      const data = new FormData();
      data.append("file", this.profilePic);
      data.append("club_id", this.$route.query.id);
      data.append("user_id", localStorage.getItem("id"));

      await this.uploadFile(data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        club_id: this.$route.query.id,
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
      this.profileImageUrl = "";
      this.ClubFiles();
    },
    async FileRemove() {
      this.loading = true;
      await this.fileRemove({
        user_id: localStorage.getItem("id"),
        file_id: this.remove_id,
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
      this.ClubFiles();
    },
    onFileChange(e) {
      this.profilePic = this.$refs.profilePic.files[0];
      const file = e.target.files[0];
      this.file_type = file.name;
      //
      if (this.file_type.includes("pdf")) {
        this.fileCheck = true;
        this.filepptCheck = false;
        this.profileImageUrl = "pdf-upload.png";
      } else if (this.file_type.includes("ppt")) {
        this.filepptCheck = true;
        this.fileCheck = false;
        this.profileImageUrl = "ppt.jpg";
      } else if (this.file_type.includes("pptx")) {
        this.filepptCheck = true;
        this.fileCheck = false;
        this.profileImageUrl = "ppt.jpg";
      } else {
        this.filepptCheck = false;
        this.fileCheck = false;
        this.profileImageUrl = URL.createObjectURL(file);
      }
    },
    removeFile() {
      this.profileImageUrl = "";
      this.profilePic = null;
      $("#ElectionDocChange").remove();
    },
    deleteFunction() {
      this.profileImageUrl = "";
      this.profilePic = null;
      $("#ElectionDocChange").remove();
    },
    imagePopUP(src) {
      var modal = document.getElementById("myModal");

      // Get the image and insert it inside the modal - use its "alt" text as a caption
      var img = document.getElementById("myImg");
      var modalImg = document.getElementById("img01");
      var captionText = document.getElementById("caption");
      modal.style.display = "block";
      modalImg.src = src;
      captionText.innerHTML = this.alt;
    },

    spanClose() {
      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];
      modal.style.display = "none";
    },
    modalPopUp(valId, valName) {
      this.remove_id = valId;
      this.remove_name = valName;
    },
  },
};
</script>
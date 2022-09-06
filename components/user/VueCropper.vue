<template>
  <div>
    <div size="120" class="user">
      <v-img :src="image_name" class="profile-img"></v-img>
      <v-icon class="icon primary white--text" @click="$refs.FileInput.click()"
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
    <v-card>
      <v-card-text>
        <VueCropper
          v-show="selectedFile"
          ref="cropper"
          :src="selectedFile"
          alt="Source Image"
          :aspect-ratio="20 / 3"
        ></VueCropper>
      </v-card-text>
      <v-card-actions>
        <v-btn class="primary" @click="saveImage(), (dialog = false)"
          >Upload</v-btn
        >
        <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
    <!-- </v-dialog> -->
  </div>
</template>

<script>
import axios from "axios";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { mapState, mapActions } from "vuex";

export default {
  components: { VueCropper },
  props: ["image_name"],
  data() {
    return {
      mime_type: "",
      cropedImage: "",
      autoCrop: false,
      selectedFile: "",
      image: "",
      dialog: false,
      files: "",
    };
  },
  computed: {
    ...mapState("clubFiles", {
      allList: (state) => state.allList,
      enableEdit: (state) => state.enableEdit,
      successMessage: (state) => state.successMessage,
      SuccessType: (state) => state.SuccessType,
      errorMessage: (state) => state.errorMessage,
      errorType: (state) => state.errorType,
    }),
  },
  methods: {
    ...mapActions("clubFiles", {
      clubFiles: "clubFiles",
      uploadFile: "uploadFile",
      fileRemove: "fileRemove",
      uploadBanner: "uploadBanner",
    }),
    saveImage() {
      const userId = this.$route.params.user_id;
      this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData();

        if (blob) {
          var file = new File([blob], "name");

          console.log("consoling image outputs ", blob, file);
          formData.append("file", blob, this.fileName);
          formData.append("club_id", this.$route.query.id);
          formData.append("user_id", localStorage.getItem("id"));
          formData.append("club_banner", "1");

          this.uploadBanner(formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            club_id: this.$route.query.id,
          });
          //   this.loading = false;
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
          //   this.profileImageUrl = "";
          // this.ClubFiles();
        }
      }, this.mime_type);
    },
    //  async UploadFile() {
    //   if (this.profilePic) {
    //     this.loading = true;
    //     const data = new FormData();
    //     data.append("file", this.profilePic);
    //     data.append("club_id", this.$route.query.id);
    //     data.append("user_id", localStorage.getItem("id"));

    //     await this.uploadFile(data, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //       club_id: this.$route.query.id,
    //     });
    //     this.loading = false;
    //     if (this.successMessage != "") {
    //       this.$toast.open({
    //         message: this.successMessage,
    //         type: this.SuccessType,
    //         duration: 5000,
    //       });
    //     } else if (this.errorMessage != "") {
    //       this.$toast.open({
    //         message: this.errorMessage,
    //         type: this.errorType,
    //         duration: 5000,
    //       });
    //     }
    //     this.profileImageUrl = "";
    //     this.ClubFiles();
    //   }
    // },
    onFileSelect(e) {
      const file = e.target.files[0];
      this.mime_type = file.type;
      console.log(this.mime_type);
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
    },
  },
};
</script>
<style scoped>
.user {
  width: 140px;
  height: 140px;
  border-radius: 100%;
  border: 3px solid #2e7d32;
  position: relative;
}
.profile-img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.icon {
  position: absolute;
  top: 10px;
  right: 0;
  background: #e2e2e2;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  text-align: center;
  color: #0000ff;
  font-size: 14px;
  cursor: pointer;
}
</style>
import { BASE_URL } from "../assets/js/constants";

const state = {

  allList: [],
  errorMessage: "",
  errorType: "",
  successMessage: "",
  successType: "",
  enableEdit: '',
}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {

  async clubFiles({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `club/detail/view_file_list?club_id=${payLoad.club_id}&user_id=${payLoad.user_id}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      if (response.message == "Success") {
        commit('setAllList', response.data);
        commit('setEnableEdit', response.enable_edit);
      }
      else if (response.message == "No club found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "This club is not exist");
        commit('setErrorType', "error");
        // this.$router.push("/club-detail");

      }
      else if (response.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "error");
        this.$router.push("/club-detail");

      }
      else if (response.message == "You are not a member of this club") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "You are not a member of this club");
        commit('setErrorType', "error");
        this.$router.push("/club-detail");

      }
      else if (response.message == "Club is not active") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Club is not active");
        commit('setErrorType', "error");
      }
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
    }


  },
  async uploadFile({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'club/detail/file_upload', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      if (response.message == "File uploaded successfully") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "File uploaded successfully");
        commit('setSuccessType', "success");


      }
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else if (e?.response?.data?.message == "Invalid file type. Only JPEG, JPG, PNG, PDF and PPT files are allowed.") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Oops! Something went wrong. Please try again later");
        commit('setErrorType', "error");
      }
      else if (e?.response?.data?.message == "File size cannot be larger than 4MB!") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "File size cannot be larger than 4MB!");
        commit('setErrorType', "error");

      }

      else if (e?.response?.data?.message == "No club found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "This club is not exist");
        commit('setErrorType', "error");
        // this.$router.push("/club-detail");

      }
      else if (e?.response?.data?.message == "Club is not active") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Club is not active");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Please upload a file!") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Please upload a file!");
        commit('setErrorType', "error");

      }
    }

  },
  async uploadBanner({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'club/detail/upload_club_banner', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      if (response.message) {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', response.message);
        commit('setSuccessType', "success");


      }
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else if (e?.response?.data?.message == "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Oops! Something went wrong. Please try again later");
        commit('setErrorType', "error");
      }
      else if (e?.response?.data?.message == "File size cannot be larger than 4MB!") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "File size cannot be larger than 4MB!");
        commit('setErrorType', "error");

      }

      else if (e?.response?.data?.message == "No club found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "This club is not exist");
        commit('setErrorType', "error");
        // this.$router.push("/club-detail");

      }
      else if (e?.response?.data?.message == "Club is not active") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Club is not active");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Please upload a file!") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Please upload a file!");
        commit('setErrorType', "error");

      }
    }

  },
  //file remove
  async fileRemove({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$post(BASE_URL + 'club/detail/remove_file', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "File removed successfully") {

        commit('setErrorMessage', "");
        commit('setErrorType', "error");
        commit('setSuccessMessage', "File removed successfully");
        commit('setSuccessType', "");
      }
      else if (response.message == "No file found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "No file found");
        commit('setErrorType', "error");

      }
      else if (response.message == "Leader Not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Leader Not found");
        commit('setErrorType', "error");
      }
      else if (response.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Validation error");
        commit('setErrorType', "error");
      }

    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
    }
  },


}
const mutations = {
  setAllList(state, data) {
    state.allList = data;
  },
  setEnableEdit(state, data) {
    state.enableEdit = data;
  },

  setErrorMessage(state, data) {
    state.errorMessage = data;
  },
  setErrorType(state, data) {
    state.errorType = data;
  },
  setSuccessMessage(state, data) {
    state.successMessage = data;
  },
  setSuccessType(state, data) {
    state.successType = data;
  },

}
const getters = {
  allList: () => {
    return state.allList;
  },

  errorMessage: () => {
    return state.errorMessage;
  },
  enableEdit: () => {
    return state.enableEdit;
  },
  errorType: () => {
    return state.errorType;
  },
  successMessage: () => {
    return state.successMessage;
  },
  successType: () => {
    return state.successType;
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

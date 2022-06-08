import { BASE_URL } from "../assets/js/constants";

const state = {

  allList: [],
  errorMessage: "",
  errorType: "",
  successMessage: "",
  successType: "",
  profile: '',
}

const actions = {

  async userDetails({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `users/view_file_name?user_id=${payLoad.user_id}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      if (response.message == "Success") {
        commit('setAllList', response.data);
        commit('profileSet', response.data.profile_pic)
      }


    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else if (e.response.data.message == "User not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "User not found");
        commit('setErrorType', "error");

      }
      else if (e.response.data.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "error");
        this.$router.push("/club-detail");

      }
    }


  },
  async uploadProfile({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'users/profile_upload', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      console.log("response of upload profile pic", response, response.message)

      if (response.message == "Image uploaded successfully") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Image uploaded successfully");
        commit('setSuccessType', "success");
        commit('profileSet', response.filePath)

      }
    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else if (e.response.data.message == "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.");
        commit('setErrorType', "error");

      }
      else if (e.response.data.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Oops! Something went wrong. Please try again later");
        commit('setErrorType', "error");
      }
      else if (e.response.data.message == "File size cannot be larger than 4MB!") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "File size cannot be larger than 4MB!");
        commit('setErrorType', "error");

      }

      else if (e.response.data.message == "No user found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "No user found");
        commit('setErrorType', "error");

      }
    }

  },
  //file remove
  async profileRemove({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$put(BASE_URL + 'users/remove_profile_pic', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "success") {

        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Image Removed Successfully");
        commit('setSuccessType', "success");
      }
    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else if (e.response.data.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Validation error");
        commit('setErrorType', "error");
      }
    }
  },


}
const mutations = {
  setAllList(state, data) {
    state.allList = data;
  },
  profileSet(state, data) {
    state.profile = data;
    localStorage.setItem('profile_pic', data);
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
  profile: () => {
    return state.profile;
  },
  errorMessage: () => {
    return state.errorMessage;
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

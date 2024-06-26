import { BASE_URL } from "../assets/js/constants";

const state = {
  allList: [],
  slots: [],
  errorMessage: "",
  errorType: "",
  successMessage: "",
  successType: "",
  enableEdit: '',
}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {

  async clubMoreInfo({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$get(BASE_URL + `club/detail/more_details?club_id=${payLoad.club_id}&user_id=${payLoad.user_id}`, {
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
      else if (response.message == "You are not a member of this club") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "You are not a member of this club");
        commit('setErrorType', "error");
        this.$router.push("/club-detail");

      }
      else if (response.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "error");
        this.$router.push("/club-detail");

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
    }

  },
  //update or create todo
  async editTodo({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$post(BASE_URL + 'club/detail/create_todo', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Oops! Something went wrong. Please try again later");
        commit('setErrorType', "error");
      }
      else if (response.message == "No club found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "This club is not exist");
        commit('setErrorType', "error");
        // this.$router.push("/club-detail");

      }
      else if (response.message == "Club is not active") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Club is not active");
        commit('setErrorType', "error");

      }
      else if (response.message == "You already have the same todo on list") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "You already have the same todo on list");
        commit('setErrorType', "error");

      }
      else if (response.message == "Leader Not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Leader Not found");
        commit('setErrorType', "error");

      }

      else if (response.message == "Todo created successfully") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Todo created successfully");
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
    }
  },
  //update time
  async updateTime({ commit }, payLoad) {

    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$post(BASE_URL + 'club/detail/update_date_time', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Meeting time updated successfully") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Meeting time updated successfully");
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
        commit('setErrorMessage', "Please select the day & time to update the meeting time");
        commit('setErrorType', "error");
      }
      else if (e.response.data.message == "No club found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "This club is not exist");
        commit('setErrorType', "error");
        // this.$router.push("/club-detail");

      }
      else if (e.response.data.message == "No slot found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "No slot found");
        commit('setErrorType', "error");

      }
      else if (e.response.data.message == "Leader Not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Leader Not found");
        commit('setErrorType', "error");

      }
      else if (e.response.data.message == "Please give a valid club id") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Please give a valid club id");
        commit('setErrorType', "error");

      }
      else if (e.response.data.message == "Duplicate days found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Duplicate days found, Please select another day");
        commit('setErrorType', "error");

      }

    }
  },
  //timeslot
  async slotswithId({ commit }) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + 'custom/availability/all_slots', {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setAvailableSlot', response.data);
    }
    catch (e) {
      if (e.response.data.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
    }
  },
  //remove todo
  async removetodo({ commit }, payLoad) {

    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$post(BASE_URL + 'club/detail/remove_todo', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Oops! Something went wrong. Please try again later");
        commit('setErrorType', "error");
      }
      else if (response.message == "No club found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "This club is not exist");
        commit('setErrorType', "error");
        // this.$router.push("/club-detail");

      }

      else if (response.message == "Leader Not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Leader Not found");
        commit('setErrorType', "error");

      }
      else if (response.message == "Todo removed successfully") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Todo removed successfully");
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
  setAvailableSlot(state, data) {
    state.slots = data;
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
  enableEdit: () => {
    return state.enableEdit;
  },
  slots: () => {
    return state.slots;
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

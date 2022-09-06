import { BASE_URL } from "../assets/js/constants";

const state = {
  schoolDetails: [],
  states: [],
  timezone: [],
  successMessage: "",
  SuccessType: "",
  errorMessage: "",
  errorType: "",

}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {

  //   // school edit
  async updateSchools({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'schools/school_edit', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setSuccessMessage', "school Updated Successfully");
      commit('setSuccessType', "success");
    } catch (e) {
      if (e.response && e.response.status == 401) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }

      else if (e.response && e.response.status == 409) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e.response.data.message);
        commit('setErrorType', "error");
      }
      else if (e.response && e.response.status == 400) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e.response.data.message);
        commit('setErrorType', "error");
      }
    }
  },
  //school details by id for editing
  async fetchSchool({ commit }, payLoad) {

    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `schools/school_details?school_id=${payLoad.school_id}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setSchoolDetails', response.data);
    } catch (e) {
      if (e.response && e.response.status == 401) {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }
  },

  //fetch state
  async fetchStates({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + 'states/states_list', {
        headers: {
          'Authorization': `${token}`
        },
      });
      commit('setState', response.data);

    } catch (e) {
      if (e.response && e.response.status == 401) {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }

  },
  //timezone
  async fetchTimeZone({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + 'schools/all_timeZome', {
        headers: {
          'Authorization': `${token}`
        },
      });
      commit('setTimezone', response.data);

    } catch (e) {
      if (e.response && e.response.status == 401) {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }

  }
}
const mutations = {

  setSchoolDetails(state, data) {
    state.schoolDetails = data;

  },
  setTimezone(state, data) {
    state.timezone = data;

  },
  setState(state, data) {
    state.states = data;

  },
  setSuccessMessage(state, data) {
    state.successMessage = data;

  },
  setSuccessType(state, data) {
    state.SuccessType = data;

  },
  setErrorMessage(state, data) {
    state.errorMessage = data;

  },
  setErrorType(state, data) {
    state.errorType = data;

  },

}
const getters = {

  schoolDetails: () => {
    return state.schoolDeatils;
  },
  timezone: () => {
    return state.timezone;
  },

  states: () => {
    return state.states;
  },
  SuccessType: () => {
    return state.SuccessType;
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

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

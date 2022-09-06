import { BASE_URL } from "../assets/js/constants"; const state = {


  states: [],
  successMessage: "",
  successType: "",
  errorMessage: "",
  errorType: "",
  timezone: [],
}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
  //   //school adding
  async addSchools({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'schools/school_creation', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setErrorMessage', "");
      commit('setErrorType', "");
      commit('setSuccessMessage', "School Added Successfully");
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
  //   

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
    state.successType = data;
  },
  setErrorMessage(state, data) {
    state.errorMessage = data;
  },
  setErrorType(state, data) {
    state.errorType = data;
  },

}
const getters = {
  timezone: () => {
    return state.timezone;
  },
  states: () => {
    return state.states;
  },
  successMessage: () => {
    return state.successMessage;
  },
  successType: () => {
    return state.successType;
  },
  errorMessage: () => {
    return state.errorMessage;
  },
  errorType: () => {
    return state.errorType;
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

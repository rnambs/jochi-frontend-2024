import { BASE_URL } from "../assets/js/constants";

const state = {
  schools: [],
  successMessage: "",
  successType: "",
  schoolCount: "",
  errorMessage: "",
  errorType: "",
}
// const BASE_URL = "https://jochi-api.devateam.com/";
const actions = {
  async getSchoolList({ commit }, payLoad) {
    const token = localStorage.getItem('token')

    try {
      const response = await this.$axios.$get(BASE_URL + `schools/school_listing?limit=${payLoad.limit}&offset=${payLoad.offset}&search=${payLoad.search}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setSchool', response.data[0].rows);
      commit('setschoolCount', response.data[0].count);
    } catch (e) {
      if (e.response && e.response.status == 401) {
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }
  },


  //   },
  // // school delete
  async deleteSchools({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'schools/school_delete', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setSuccessMessage', "School Deleted Successfully");
      commit('setSuccessType', "success");
    } catch (e) {
      if (e.response && e.response.status == 401) {
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }
  },

  // update Active status
  async updateStatus({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'schools/school_status', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Success") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Status updated successfully");
        commit('setSuccessType', "success");
      }
    } catch (e) {
      if (e.response && e.response.status == 401) {
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
      else {
        commit('setErrorMessage', e.response.data.message);
        commit('setErrorType', "error");
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
      }
    }
  },


}
const mutations = {

  setSchool(state, data) {
    state.schools = data;

  },
  setschoolCount(state, data) {
    state.schoolCount = data;

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

  schools: () => {
    return state.schools;
  },
  schoolCount: () => {
    return state.schoolCount;
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

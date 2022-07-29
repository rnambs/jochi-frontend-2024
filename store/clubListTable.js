import { BASE_URL } from "../assets/js/constants";

const state = {
  clubs: [],
  successMessage: "",
  successType: "",
  clubCount: "",

}
// const BASE_URL = "https://jochi-api.devateam.com/";
const actions = {
  //club list
  async getClubList({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `clubs/club_listing?limit=${payLoad.limit}&offset=${payLoad.offset}&search=${payLoad.search}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setClub', response.data[0].rows);
      commit('setClubsCount', response.data[0].count);

    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }

  },
  //club details by id
  async fetchClub({ commit }, payLoad) {

    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + 'clubs/club_details', payLoad, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }


  },
  // // club delete
  async deleteClubs({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'clubs/club_delete', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setSuccessMessage', "Club Deleted Successfully");
      commit('setSuccessType', "success");
    } catch (e) {
      if (e.response.data.message == "Unauthorized") {

        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }


  },

  // update Active status
  async updateStatus({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'clubs/club_edit', payLoad, {
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
      else if (response.message) {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', response.message);
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

  setClub(state, data) {
    state.clubs = data;
  },
  setClubsCount(state, data) {
    state.clubCount = data;
  },
  setSuccessMessage(state, data) {
    state.successMessage = data;
  },
  setSuccessType(state, data) {
    state.successType = data;
  },
}
const getters = {

  clubs: () => {
    return state.clubs;
  },
  clubCount: () => {
    return state.clubCount;
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

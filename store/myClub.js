import { BASE_URL } from "../assets/js/constants";

const state = {
  allList: [],
  taglist: [],
  errorMessage: "",
  errorType: "",
  successMessage: "",
  successType: "",
  syncStatus: '',
}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
  async getTag({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `club/detail/get_tag`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setTagList', response.data);
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
  async myClubList({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      if (payLoad.tag_id) {
        const response = await this.$axios.$get(BASE_URL + `club/detail/my_club_list?user_id=${payLoad.user_id}&tag_id=${payLoad.tag_id}`, {
          headers: {
            'Authorization': ` ${token}`
          },
        });
        commit('setAllList', response.data);
        commit('setSyncStatus', response.sync_status);
      } else {
        const response = await this.$axios.$get(BASE_URL + `club/detail/my_club_list?user_id=${payLoad.user_id}`, {
          headers: {
            'Authorization': ` ${token}`
          },
        });
        commit('setAllList', response.data);
        commit('setSyncStatus', response.sync_status);
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
  async syncClub({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$post(BASE_URL + 'planner/sync_club_data', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },

      });

      if (response.message == "Sync to planner turned on successfully" || response.message == "Sync to planner turned off successfully") {
        commit('setSuccessMessage', response.message);
        commit('setSuccessType', "success");
        commit('setErrorMessage', "");
        commit('setErrorType', "error");
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
      else if (e.response.data.message == "Already updated with the same status") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Already updated with the same status");
        commit('setErrorType', "");

      }
      else if (e.response.data.message == "Status should be true or false") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Status should be true or false");
        commit('setErrorType', "");
      }
      else if (e.response.data.message == "User Not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "User Not found");
        commit('setErrorType', "");
      }
      else if (e.response.data.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Validation error");
        commit('setErrorType', "");
      }
    }
  },

}
const mutations = {
  setAllList(state, data) {
    state.allList = data;
  },
  setSyncStatus(state, data) {
    state.syncStatus = data;
  },

  setTagList(state, data) {
    state.taglist = data;
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
  syncStatus: () => {
    return state.syncStatus;
  },
  taglist: () => {
    return state.taglist;
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

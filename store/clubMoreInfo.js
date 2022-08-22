import { BASE_URL } from "../assets/js/constants";

const state = {
  allList: [],
  clubMoreDetails: {},
  announcements: [],
  sportsActivities: [],
  slots: [],
  errorMessage: "",
  errorType: "",
  successMessage: "",
  successType: "",
  enableEdit: '',
  clubBannerImage: '',
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
        commit('setClubMoreDetails', response.data);
        commit('setEnableEdit', response.enable_edit);
        commit('setClubBannerImage', response.data.club_banner_image);
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
      if (e.response.data.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e.response.data.message);
        commit('setErrorType', "error");
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

    try {
      const response = await this.$axios.$get(BASE_URL + 'custom/availability/all_slots', {
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

  async getAnnouncements({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$get(BASE_URL + `club/detail/get_announcement?club_id=${payLoad.club_id}`, {
        headers: {
          'Authorization': ` ${token}`
        },

      });
      if (response.message == "Success") {
        commit('setAnnouncements', response.data);
        commit('setEnableEdit', response.enable_edit);
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

  async deleteAnnouncement({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$delete(BASE_URL + `club/detail/delete_announcement?announcement_id=${payLoad.id}&club_id=${payLoad.clubId}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Success") {
        commit('setSuccessMessage', "Announcement removed successfully");
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
  async addAnnouncement({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$post(BASE_URL + 'club/detail/create_announcement', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Success") {
        commit('setSuccessMessage', "Announcement created successfully");
      }
      else if (response.message == "Success") {
        commit('setSuccessMessage', "Announcement created successfully");
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
  async updateAnnouncement({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$put(BASE_URL + 'club/detail/update_announcement', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Success") {
        commit('setSuccessMessage', "Announcement updated successfully");
      }
      else if (response.message) {
        commit('setSuccessMessage', "Announcement updated successfully");
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
  async markAsRead({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$get(BASE_URL + `club/detail/read_announcement?announcement_id=${payLoad.announcement_id}&club_id=${payLoad.club_id}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });


      if (response.message == "Success") {
        commit('setAllList', response.data);
        commit('setEnableEdit', response.enable_edit);
      }

      else if (response.message) {
        commit('setSuccessMessage', response.message);
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "success");

      }

    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
      }
    }

  },
  async getActivities({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$get(BASE_URL + `team/get_team_match_training?club_id=${payLoad.club_id}`, {
        headers: {
          'Authorization': ` ${token}`
        },

      });
      if (response.message == "Success") {
        if (response.data && response.data.length > 0) {
          response.data.forEach(e => {
            e['formattedDate'] = moment(e.date).format('MMMM Do, YYYY')
          })
        }
        commit('setSportsActivities', response.data);
        commit('setEnableEdit', response.enable_edit);
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
  async addActivities({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$post(BASE_URL + 'team/create_team_match_training', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Success") {
        commit('setSuccessMessage', "Training/Match created successfully");
      }
      else if (response.message) {
        commit('setSuccessMessage', "Training/Match created successfully");
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
  async updateActivities({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$put(BASE_URL + 'team/update_team_match_training', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Success") {
        commit('setSuccessMessage', "Training/Match updated successfully");
      }
      else if (response.message) {
        commit('setSuccessMessage', "Training/Match updated successfully");
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
  async deleteActivity({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$delete(BASE_URL + `team/delete_team_match_training?match_training_id=${payLoad.id}&club_id=${payLoad.clubId}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Success") {
        commit('setSuccessMessage', "Training/Match removed successfully");
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
  async joinClub({ commit }, payLoad) {

    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'club/detail/join_member', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setErrorMessage', "");
      commit('setErrorType', "");
      commit('setSuccessMessage', response.message);
      commit('setSuccessType', "success");
    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      if (e.response.data.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e.response.data.message);
        commit('setErrorType', "error");
      }
    }

  },

}
const mutations = {
  setAllList(state, data) {
    state.allList = data;
  },
  setClubMoreDetails(state, data) {
    state.clubMoreDetails = data;
  },
  setAnnouncements(state, data) {
    state.announcements = data;
  },
  setSportsActivities(state, data) {
    state.sportsActivities = data;
  },
  setEnableEdit(state, data) {
    state.enableEdit = data;
  },
  setClubBannerImage(state, data) {
    state.clubBannerImage = data;
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
  clubMoreDetails: () => {
    return state.clubMoreDetails;
  },
  announcements: () => {
    return state.announcements;
  },
  sportsActivities: () => {
    return state.sportsActivities;
  },
  enableEdit: () => {
    return state.enableEdit;
  },
  clubBannerImage: () => {
    return state.clubBannerImage;
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

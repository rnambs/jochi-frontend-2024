import { BASE_URL } from "../assets/js/constants";

const state = {
  schools: [],
  successMessage: "",
  successType: "",
  errorMessage: "",
  errorType: "",
  Teachers: [],
  Students: [],
}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
  //   //club adding
  async addClubs({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'clubs/club_creation', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      if (response.message == "Success") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Club Added Successfully");
        commit('setSuccessType', "success");
      }
      else if (response.message == "Club exist with same club name") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Club exist with same club name");
        commit('setErrorType', "error");

      }
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
  //school list for club adding form
  async getSchool({ commit }, payLoad) {

    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + 'schools/all_school', {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setSchool', response.data);

    } catch (e) {
      if (e.response && e.response.status == 401) {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }
  },
  //student list for club
  async getStudents({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    const response = await this.$axios.$get(BASE_URL + `users/get_students?school_id=${payLoad.school_id}&studentId=${payLoad.studentId}`, {
      headers: {
        'Authorization': ` ${token}`
      },
    });
    commit('setStudentsList', response.data);


  },
  //teacher list for club
  async getTeacher({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    const response = await this.$axios.$get(BASE_URL + `users/get_teachers?school_id=${payLoad.school_id}`, {
      headers: {
        'Authorization': ` ${token}`
      },
    });
    commit('setTeacherList', response.data);


  },

}
const mutations = {
  setStudentsList(state, data) {
    state.Students = data;
  },
  setTeacherList(state, data) {
    state.Teachers = data;
  },
  setSchool(state, data) {
    state.schools = data;
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
  Students: () => {
    return state.Students;
  },
  Teachers: () => {
    return state.Teachers;
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
  schools: () => {
    return state.schools;
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

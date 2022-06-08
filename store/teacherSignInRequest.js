import { BASE_URL } from "../assets/js/constants";

const state = {
  teachers: [],
  teacherCount: [],
  successMessage: "",
  successType: "",
}
// const BASE_URL = "https://jochi-api.devateam.com/";
const actions = {
  //teacher list
  async getTeacherList({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `admin/school_teachers_list?teacher_status=${payLoad.teacher_status}&limit=${payLoad.limit}&offset=${payLoad.offset}&search=${payLoad.search}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setTeachers', response.data[0].rows);
      commit('setTeacherCount', response.data[0].count);

    } catch (e) {
      if (e.response && e.response.status == 401) {
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }
  },

  //accept/reject by admin
  async adminSelect({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'admin/admin_approval_teacher', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      // this.$router.go();
    } catch (e) {

    }
  },



}
const mutations = {

  setTeachers(state, data) {
    state.teachers = data;
  },
  setTeacherCount(state, data) {
    state.teacherCount = data;
  },

  setSuccessMessage(state, data) {
    state.successMessage = data;
  },
  setSuccessType(state, data) {
    state.successType = data;
  },
}
const getters = {

  teachers: () => {
    return state.teachers;
  },
  teacherCount: () => {
    return state.teacherCount;
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

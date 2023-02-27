
import { BASE_URL } from "../assets/js/constants";
const state = {
  students: [],
  teachers: [],
  timeZones: [],
  studentsSchedule: [],
  teacherSchedule: [],
  invitedMembers: [],
  errorMessage: "",
  errorType: "",
  successMessage: "",
  successType: "",
}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
  async getStudents({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$get(BASE_URL + `users/get_students?school_id=${payLoad.school_id}&studentId=${payLoad.studentId}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setStudentsList', response.data);
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      if (e?.response?.data?.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
      }
    }

  },
  async getTeacher({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$get(BASE_URL + `users/get_teachers?school_id=${payLoad.school_id}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setTeacherList', response.data);
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      if (e?.response?.data?.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
      }
    }

  },
  async updateStudentTimeSchedule({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'peer/meetings/peer_time_schedule', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setStudentSchedule', response.data);
      commit('setTimeZone', response.timeZone);
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      if (e?.response?.data?.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
      }
    }

  },
  async updateTimeSchedule({ commit }, payLoad) {

    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'teacher/meetings/teacher_time_schedule', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setTeacherSchedule', response.data);
      commit('setTimeZone', response.timeZone);
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      if (e?.response?.data?.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
      }
    }

  },

  async scheduleConfirm({ commit }, payLoad) {

    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'teacher/meetings/schedule_teacher_meeting', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Invalid Value");
        commit('setErrorType', "error");
      }
      else if (response.message == "Teacher Not Found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Teacher Not Found");
        commit('setErrorType', "error");
      }
      else if (response.message == "Student Not Found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Student Not Found");
        commit('setErrorType', "error");
      }
      else if (response.message == "You are selected time slot is invalid, please try with another") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "You are selected time slot is invalid, Please try with another");
        commit('setErrorType', "error");

      }
      else if (response.message == "You have already selected this time slot") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "You have already selected this time slot");
        commit('setErrorType', "error");

      }
      else if (response.message == "Teacher and Student are from different school") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Teacher and Student are from different school");
        commit('setErrorType', "error");

      }
      else if (response.message == "You already have a meeting at the selected time, Please try with another time") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "You already have a meeting at the selected time, Please try with another slot");
        commit('setErrorType', "error");

      }
      else if (response.message == "You already have a meeting") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "You already have a meeting");
        commit('setErrorType', "error");

      }
      else if (response.message == "Success") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Your meeting request submitted successfully");
        commit('setSuccessType', "error");

      }
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      if (e?.response?.data?.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
      }
    }
  },
  async studentScheduleConfirm({ commit }, payLoad) {


    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'peer/meetings/schedule_peer_meeting', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Invalid Value");
        commit('setErrorType', "error");
      }
      else if (response.message == "User Not Found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "User Not Found");
        commit('setErrorType', "error");
      }

      else if (response.message == "Please give a valid slot id") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Please give a valid slot id");
        commit('setErrorType', "error");

      }

      else if (response.message == "You have already scheduled a meeting") {

        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "You have already scheduled a meeting");
        commit('setErrorType', "error");

      }

      else if (response.message == "Success") {

        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Your meeting request submitted successfully");
        commit('setSuccessType', "error");

      }
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }

      if (e?.response?.data?.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
      }
    }
  },
  async acceptOrRejectMeeting({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'meeting/request/respond_to_meeting_request', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Success") {

        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Your meeting request submitted successfully");
        commit('setSuccessType', "error");

      }
      if (response.message) {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', response.message);
        commit('setSuccessType', "error");
      }
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      if (e?.response?.data?.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
      }
    }

  },
  async getInvitedMembers({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$get(BASE_URL + `view/all/group_members_detail?group_id=${payLoad.group_id}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setInvitedMembers', response.data);
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      if (e?.response?.data?.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
      }
    }

  },

}
const mutations = {
  setStudentsList(state, data) {
    state.students = data;
  },
  setStudentSchedule(state, data) {
    state.studentsSchedule = data;
  },
  setTeacherSchedule(state, data) {
    state.teacherSchedule = data;
  },
  setInvitedMembers(state, data) {
    state.invitedMembers = data;
  },
  setTimeZone(state, data) {
    state.timeZones = data;
  },
  setTeacherList(state, data) {
    state.teachers = data;
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
  studentsSchedule: () => {
    return state.studentsSchedule;
  },
  teacherSchedule: () => {
    return state.teacherSchedule;
  },
  invitedMembers: () => {
    return state.invitedMembers;
  },
  students: () => {
    return state.students;
  },
  teachers: () => {
    return state.teachers;
  },
  timeZones: () => {
    return state.timeZones;
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

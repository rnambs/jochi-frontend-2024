import { BASE_URL } from "../assets/js/constants";

const state = {
  teachers: [],
  students: [],
  studentsCount: '',
  teachersCount: '',
  schoolDetails: [],
  successMessage: "",
  successType: "",
  errorMessage: "",
  errorType: "",
}
// const BASE_URL = "https://jochi-api.devateam.com/";
const actions = {
  //teacher list
  async getTeacherList({ commit }, payLoad) {

    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `admin/school_teachers_list?school_id=${payLoad.school_id}&search=${payLoad.search}&limit=${payLoad.limit}&offset=${payLoad.offset}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setTeachers', response.data[0].rows);
      commit('setTeachersCount', response.data[0].count);
    } catch (e) {
      if (e.response && e.response.status == 401) {
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }
  },

  //student list
  async getStudentList({ commit }, payLoad) {
    const token = localStorage.getItem('token')

    try {
      const response = await this.$axios.$get(BASE_URL + `admin/school_students_list?school_id=${payLoad.school_id}&search=${payLoad.search}&limit=${payLoad.limit}&offset=${payLoad.offset}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setStudent', response.data[0].rows);
      commit('setStudentsCount', response.data[0].count);
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

    } catch (e) {

    }
  },
  //fetch school details
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
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }
  },
  //delete user
  async deleteUsers({ commit }, payLoad) {
    const token = localStorage.getItem('token')


    try {
      const response = await this.$axios.$delete(BASE_URL + `admin/user_delete?id=${payLoad.deleteID}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (payLoad.type == 1) {
        commit('setSuccessMessage', "Student Deleted Successfully");
      } else {
        commit('setSuccessMessage', "Teacher Deleted Successfully");
      }
      commit('setSuccessType', "success");
    } catch (e) {
      if (e.response && e.response.status == 401) {
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }
  },
  // user status
  async setActionStatus({ commit }, payLoad) {

    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'admin/user_activity', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "User status is successfully updated  to active "
      ) {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "User status is successfully updated ");
        commit('setSuccessType', "success");
      }
      if (response.message == "User status is successfully updated  to inactive") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "User status is successfully updated ");
        commit('setSuccessType', "success");
      }


    } catch (e) {
      if (e.response && e.response.status == 400) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "No user found with this id");
        commit('setErrorType', "error");
      }
      else if (e.response && e.response.status == 422) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "A user with this email address already exists");
        commit('setErrorType', "error");
      }
      if (e.response && e.response.status == 401) {
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }
  },
  //lms id
  async fetchLmsId({ commit }, payLoad) {
    const token = localStorage.getItem('token')

    try {
      const response = await this.$axios.$put(BASE_URL + 'schools/add_school_lms', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response && response.message == "School LMS id updated successfully") {
        commit('setSuccessMessage', "School LMS id updated successfully");
        commit('setSuccessType', "success");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
      }
    } catch (e) {
      if (e.response && e.response.status == 400) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "LMS ID not valid");
        commit('setErrorType', "error");
      }
      if (e.response && e.response.status == 409) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "LMS ID already exist");
        commit('setErrorType', "error");
      }

    }
  },

}
const mutations = {

  setTeachers(state, data) {
    state.teachers = data;
  },
  setTeachersCount(state, data) {
    state.teachersCount = data;
  },
  setStudent(state, data) {
    state.students = data;
  },
  setStudentsCount(state, data) {
    state.studentsCount = data;
  },
  setSchoolDetails(state, data) {
    state.schoolDetails = data;

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

  teachers: () => {
    return state.teachers;
  },
  teachersCount: () => {
    return state.teachersCount;
  },
  students: () => {
    return state.students;
  },
  studentsCount: () => {
    return state.studentsCount;
  },
  schoolDetails: () => {
    return state.schoolDeatils;
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

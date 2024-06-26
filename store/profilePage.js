import { BASE_URL } from "../assets/js/constants";

const state = {

  allList: [],
  requestList: [],
  advisorDetail: {},
  errorMessage: "",
  errorType: "",
  successMessage: "",
  successType: "",
  profile: '',
  phone: '',
  notification: '',
  notificationSettings: {},
  schoolAdminRequested: '',
  schoolAdmin: '',
}

const actions = {

  async userDetails({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `users/view_file_name?user_id=${payLoad.user_id}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      if (response.message == "Success") {
        commit('setAllList', response.data);
        commit('profileSet', response.data.profile_pic)
        commit('setPhone', response.data.phone_number)
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
      else if (e?.response?.data?.message == "User not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "User not found");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "error");
        this.$router.push("/club-detail");

      }
    }


  },
  async uploadProfile({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'users/profile_upload', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });


      if (response.message == "Image uploaded successfully") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Image uploaded successfully");
        commit('setSuccessType', "success");
        commit('profileSet', response.filePath)

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
      else if (e?.response?.data?.message == "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Oops! Something went wrong. Please try again later");
        commit('setErrorType', "error");
      }
      else if (e?.response?.data?.message == "File size cannot be larger than 4MB!") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "File size cannot be larger than 4MB!");
        commit('setErrorType', "error");

      }

      else if (e?.response?.data?.message == "No user found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "No user found");
        commit('setErrorType', "error");

      }
    }

  },
  //file remove
  async profileRemove({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$put(BASE_URL + 'users/remove_profile_pic', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "success") {

        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Image Removed Successfully");
        commit('setSuccessType', "success");
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
      else if (e?.response?.data?.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Validation error");
        commit('setErrorType', "error");
      }
    }
  },
  async getAdvisorRequests({ commit }) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `teacher/get_all_advisors_request`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      if (response.message == "Success") {
        commit('setRequestList', response.data);
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
      else if (e?.response?.data?.message == "User not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "User not found");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "error");
        this.$router.push("/club-detail");

      }
    }


  },

  async respondAdvisorRequest({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `teacher/respond_to_advisor_request?teacher_id=${payLoad.teacher_id}&advisor_request=${payLoad.response}&advisor_token=${payLoad.token}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      if (response.message) {
        commit('setSuccessMessage', response.message);
        commit('setSuccessType', "success");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
      }
    } catch (e) {
      if (e.response?.data?.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e.response?.data?.message);
        commit('setErrorType', "error");
      }
    }
  },
  async getAdvisorDetail({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `users/advisor_details`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });


      commit('setAdvisorDetail', response.data);


    } catch (e) {
      if (e.response?.data?.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e.response?.data?.message);
        commit('setErrorType', "error");
      }
    }
  },
  // update phone number in profile
  async updatePhone({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'users/update_phone_number', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });


      // if (response.message == "Image uploaded successfully") {
      commit('setErrorMessage', "");
      commit('setErrorType', "");
      commit('setSuccessMessage', response.message);
      commit('setSuccessType', "success");
      commit('setPhone', response.phone_number)

      // }
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else if (e?.response?.data?.message == "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Oops! Something went wrong. Please try again later");
        commit('setErrorType', "error");
      }
      else if (e?.response?.data?.message == "File size cannot be larger than 4MB!") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "File size cannot be larger than 4MB!");
        commit('setErrorType', "error");

      }

      else if (e?.response?.data?.message == "No user found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "No user found");
        commit('setErrorType', "error");

      }
    }

  },
  // enable/disable notification
  async notificationUpdate({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'users/enable_disable_notification', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      // if (response.message == "Image uploaded successfully") {
      commit('setErrorMessage', "");
      commit('setErrorType', "");
      commit('setSuccessMessage', response.message);
      commit('setSuccessType', "success");
      commit('setNotification', response.enable_status)

      // }
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else if (e?.response?.data?.message == "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Oops! Something went wrong. Please try again later");
        commit('setErrorType', "error");
      }
      else if (e?.response?.data?.message == "File size cannot be larger than 4MB!") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "File size cannot be larger than 4MB!");
        commit('setErrorType', "error");

      }

      else if (e?.response?.data?.message == "No user found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "No user found");
        commit('setErrorType', "error");

      }
    }

  },

  // get notification settings
  async getSettings({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `users/notification_setting_status`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      if (response.message == "Success") {
        commit('setNotificationSettings', response.data);
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
      else if (e?.response?.data?.message == "User not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "User not found");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "error");
        this.$router.push("/club-detail");

      }
    }


  },
  async upgradeUser({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'teacher/school_admin_request', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });


      if (response.message) {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', response.message);
        commit('setSuccessType', "success");


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
      else if (e?.response?.data?.message == "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Oops! Something went wrong. Please try again later");
        commit('setErrorType', "error");
      }
      else if (e?.response?.data?.message == "File size cannot be larger than 4MB!") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "File size cannot be larger than 4MB!");
        commit('setErrorType', "error");

      }

      else if (e?.response?.data?.message == "No user found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "No user found");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");

      }
    }

  },
  // get school admin status
  async getSchoolAdminStatus({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `teacher/get_school_admin_status`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      if (response.message == "Success") {
        commit('setSchoolAdminRequested', response.data.school_admin_requested);
        commit('setSchoolAdmin', response.data.school_admin);
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
      else if (e?.response?.data?.message == "User not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "User not found");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "error");
        // this.$router.push("/club-detail");

      }
    }


  },

}
const mutations = {
  setAllList(state, data) {
    state.allList = data;
  },
  setRequestList(state, data) {
    state.requestList = data;
  },
  setAdvisorDetail(state, data) {
    state.advisorDetail = data;
  },
  profileSet(state, data) {
    state.profile = data;
    localStorage.setItem('profile_pic', data);
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
  setPhone(state, data) {
    if (data) {
      state.phone = data;
      localStorage.setItem('phone', data);
    }
  },
  setNotification(state, data) {
    state.notification = data;
    localStorage.setItem('notification', data);
  },
  setNotificationSettings(state, data) {
    state.notificationSettings = data;
  },
  setSchoolAdminRequested(state, data) {
    state.schoolAdminRequested = data;
    localStorage.setItem('schoolAdminRequested', data)

  },
  setSchoolAdmin(state, data) {
    state.schoolAdmin = data;
    localStorage.setItem('schoolAdmin', data)

  },

}
const getters = {
  allList: () => {
    return state.allList;
  },
  requestList: () => {
    return state.requestList;
  },
  advisorDetail: () => {
    return state.advisorDetail;
  },
  profile: () => {
    return state.profile;
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
  phone: () => {
    return state.phone;
  },
  notification: () => {
    return state.notification;
  },
  notificationSettings: () => {
    return state.notificationSettings;
  },
  schoolAdminRequested: () => {
    return state.schoolAdminRequested;
  },
  schoolAdmin: () => {
    return state.schoolAdmin;
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

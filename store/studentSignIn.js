import { BASE_URL } from "../assets/js/constants";

const state = {
    loginStatus: false,
    loginStatusMessage: '',
    errorMessage: '',
    token: '',
    email: '',
    name: '',
    errorMessage: '',
    errorType: "",
    successMessage: "",
    successType: "",
    id: '',
    school_id: '',
    userType: '',
    school_name: '',
    profile: '',
    allList: [],
    profile: '',
    notificationList: [],
    notificationCount: 0

}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
    async getSignIn({ commit }, payLoad) {
        try {
            const response = await this.$axios.$post(BASE_URL + 'users/users_login', payLoad)
            if (response.message == "User status inactive please contact admin.") {

                commit('setErrorMessage', "Your account is inactive please contact the admin");
                commit('setErrorType', "error");
            }
            else if (response.message == "Your profile is not verified") {

                commit('setErrorMessage', "Your profile is not verified");
                commit('setErrorType', "error");
            }
            else if (response.message == "You have entered invalid credentials") {

                commit('setErrorMessage', "You have entered invalid credentials");
                commit('setErrorType', "error");
            }
            else if (response.message == "Please verify your email to activate the account") {

                commit('setErrorMessage', "Please verify your email to activate the account");
                commit('setErrorType', "error");
            }
            else {
                await commit('setLoginStatus', true);
                commit('setUserToken', response.data.token);
                commit('setUserEmail', response.data.email);
                commit('setUserName', response.data.first_name);
                commit('setUserId', response.data.id);
                commit('setschool_Id', response.data.school_id);
                commit('setUserType', response.data.user_type)
                commit('setSchoolName', response.data.school_name)
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                commit('profileSet', response.data.profile_pic);
                if (response.data.user_type == 3) {
                    this.$router.push('planner-day');
                }
                if (response.data.user_type == 2) {
                    this.$router.push('teacher-dashboard');
                }


            }


        }
        catch (e) {
            if (e.response && e.response.status == 400) {

                commit('setErrorMessage', "Invalid value");
                commit('setErrorType', "error");
            } else if (e.response && e.response.status == 401) {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/');
            }
        }

    },
    async getLogout({ commit }, payLoad) {

        const response = await this.$axios.$post(BASE_URL + 'auth/logOut', payLoad)

        commit('setLoginStatus', false);
        commit('setUserToken', '');
        commit('setUserEmail', '');
        commit('setUserName', '');
        commit('setUserId', '');
        commit('setschool_Id', '');
        commit('setUserType', '')
        window.$nuxt.$cookies.removeAll();
        window.localStorage.clear();
        this.$router.push('/');

    },

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
    async getNotificationsList({ commit }) {
        try {
            const token = localStorage.getItem('token')
            const response = await this.$axios.$get(BASE_URL + `users/notification_data`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setNotificationList', response.data);
            commit('setNotificationCount', response.count);

        } catch (e) {
            if (e?.response?.data?.message == "Unauthorized") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/');
            }
        }


    },
    async clearNotificationsList({ commit }) {
        try {
            const token = localStorage.getItem('token')
            const response = await this.$axios.$delete(BASE_URL + `users/clear_all_notification_data`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setNotificationList', response.data);
        } catch (e) {
            if (e?.response?.data?.message == "Unauthorized") {
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
            const response = await this.$axios.$put(BASE_URL + `users/viewed_notification`, payLoad, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setNotificationList', response.data);
        } catch (e) {
            if (e?.response?.data?.message == "Unauthorized") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/');
            }
        }


    },
    async passportRedirect({ commit }, payLoad) {
        try {
            const response = await this.$axios.$post(BASE_URL + 'users/users_login', payLoad)
            if (response.message) {

                commit('setErrorMessage', response.message);
                commit('setSuccessType', "success");
            }

        }
        catch (e) {
            if (e.response) {

                commit('setErrorMessage', e);
                commit('setErrorType', "error");
            }

            if (e.response && e.response.status == 400) {

                commit('setErrorMessage', "Invalid value");
                commit('setErrorType', "error");
            } else if (e.response && e.response.status == 401) {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/');
            }
        }

    },
    async getNotificationCount({ commit }) {
        try {
            const token = localStorage.getItem('token')
            const response = await this.$axios.$get(BASE_URL + `users/unread_message_count`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setNotificationCount', response.count);

        } catch (e) {
            if (e?.response?.data?.message == "Unauthorized") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/');
            }
        }


    },
    async syncData({ commit }) {
        try {
            const token = localStorage.getItem('token')
            const response = await this.$axios.$post(BASE_URL + `auth/data_sync`, {}, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setSuccessMessage', "Data sync successfull");
            commit('setSuccessType', "success");
            commit('setErrorMessage', "");
            commit('setErrorType', "");

        } catch (e) {
            if (e?.response?.data?.message == "Unauthorized") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/');
            }
            else if (e?.response?.data?.message) {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', e?.response?.data?.message);
                commit('setErrorType', "error");
                window.localStorage.clear();
                this.$router.push('/');
            }
        }


    },


}
const mutations = {
    setAllList(state, data) {
        state.allList = data;
    },
    profileSet(state, data) {
        state.profile = data;
        localStorage.setItem('profile_pic', data);
    },
    setErrorMessage(state, data) {
        state.errorMessage = data;
    },
    setUserType(state, data) {
        state.userType = data;
        localStorage.setItem('user_type', data);
    },
    setErrorType(state, data) {
        state.errorType = data;
    },
    setLoginStatus(state, data) {
        state.loginStatus = data;
    },
    setUserToken(state, data) {
        state.token = data;
        localStorage.setItem('token', data);

        window.$nuxt.$cookies.set('token', data, {
            path: '/',
        })

    },
    setUserEmail(state, data) {
        state.email = data;
        localStorage.setItem('email', data);
    },
    setUserName(state, data) {
        state.name = data;
        localStorage.setItem('first_name', data);
    },

    setUserId(state, data) {
        state.id = data;
        localStorage.setItem('id', data);
    },
    setSuccessMessage(state, data) {
        state.successMessage = data;
    },
    setSuccessType(state, data) {
        state.successType = data;
    },
    setschool_Id(state, data) {
        state.school_id = data;
        localStorage.setItem('school_id', data);
    },
    setSchoolName(state, data) {
        state.school_name = data;
        localStorage.setItem('school_name', data);
    },
    profileSet(state, data) {
        state.profile = data;
        localStorage.setItem('profile_pic', data);
        $('#profileImage').attr('src', this.profileImage);
        $('#profileImageTeacher').attr('src', this.profileImage);
        $('#menu_profile_pic').attr('src', this.profileImage);
    },
    setNotificationList(state, data) {
        state.notificationList = data;
    },
    setNotificationCount(state, data) {
        state.notificationCount = data;
    }
}
const getters = {

    loginStatus: () => {
        return state.loginStatus;
    },
    userType: () => {
        return state.userType;
    },
    token: () => {
        return state.token;
    },

    id: () => {
        return state.id;
    },
    school_id: () => {
        return state.school_id;
    },
    school_name: () => {
        return state.school_name;
    },

    email: () => {
        return state.email;
    },
    name: () => {
        return state.name;
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
    allList: () => {
        return state.allList;
    },
    profile: () => {
        return state.profile;
    },
    notificationList: () => {
        return state.notificationList;
    },
    notificationCount: () => {
        return state.notificationCount;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

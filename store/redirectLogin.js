import { BASE_URL } from "../assets/js/constants";

const state = {
    loginStatus: false,
    loginStatusMessage: '',
    errorMessage: '',
    token: '',
    email: '',
    errorType: '',
    id: '',
    user_type: '',
    firstName: '',
    lastName: '',
    school_id: '',
    school_name: '',
    isGg4lDataSynced: '',
    phone: '',
    notifyStatus: '',
    distinctId: '',
    studentSignUp: false,
}
const actions = {

    // login using gg4l
    async loginUsingGg4l({ commit }, payLoad) {
        try {
            const response = await this.$axios.$post(BASE_URL + 'auth/gg4l_passport_auth', payLoad)
            if (status = 200) {

                localStorage.setItem("skippedPrompt", "false")
                commit('setLoginStatus', true);
                commit('setUserToken', response.data.auth_token);
                commit('setUserEmail', response.data.email);
                commit('setUserId', response.data.id);
                commit('setUserType', response.data.user_type_id);
                commit('setFirstName', response.data.first_name);
                commit('setLastName', response.data.last_name);
                commit('setSchoolId', response.data.school_id);
                commit('setSchoolName', response.data.school_name);
                commit('setIsGg4lDataSynced', response.data.isGg4lDataSynced);
                commit('setPhone', response.data.phone_number);
                commit('setNotifyStatus', response.data.notification);
                commit('setDistinctId', response.data.distinct_id);
                commit('setStudentSignUp', response.data.studentSignUp);
                if (response.data.user_type_id == 1) {
                    this.$router.push('/dashboard');
                }


            }
        }
        catch (err) {
            console.log(err)
            if (err?.response?.data?.error) {
                commit('setLoginStatus', false);
                window.$nuxt.$cookies.removeAll();
                commit('setUserId', '');
                commit('setErrorType', "error");
                commit('setErrorMessage', err?.response?.data?.error);
            }
            else if (status = 422) {
                commit('setLoginStatus', false);
                window.$nuxt.$cookies.removeAll();
                commit('setUserId', '');
                commit('setErrorType', "error");
                commit('setErrorMessage', "You have entered invalid credentials");
            }
        }
    },

    async logout({ commit }, payLoad) {

        const response = await this.$axios.$post(BASE_URL + 'auth/logOut', payLoad)

        commit('setLoginStatus', false);
        commit('setUserToken', '');
        commit('setUserEmail', '');
        commit('setUserId', '');
        commit('setUserType', '');
        window.localStorage.clear();
        window.$nuxt.$cookies.removeAll();
        this.$router.push('/');

    },

    async sendDeviceToken({ commit }, payLoad) {


        const token = localStorage.getItem('token')
        try {
            const token = localStorage.getItem('token')
            const response = await this.$axios.$post(BASE_URL + 'users/save_device_token', payLoad, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setAssignmentList', response.assignments);
            commit('setSharedAssignmentsList', response.shared_assignments);
        } catch (e) {
            if (e.response && e.response.status == 401) {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                // window.localStorage.clear();
                // this.$router.push('/admin-login');
            }

            else if (e.response && e.response.status == 409) {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', e.response.data.message);
                commit('setErrorType', "error");
            }
            else if (e.response) {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', e.response.data.message);
                commit('setErrorType', "error");
            }
        }

    },
}
const mutations = {
    setErrorMessage(state, data) {
        state.errorMessage = data;
    },
    setErrorType(state, data) {
        state.errorType = data;
    },
    setLoginStatus(state, data) {
        state.loginStatus = data;

    },
    setUserType(state, data) {
        state.user_type = data;
        localStorage.setItem('user_type', data);
        window.$nuxt.$cookies.set('token', data, {
            path: '/',
        })
    },
    setUserToken(state, data) {
        state.token = data;
        localStorage.setItem('token', data);
    },
    setUserEmail(state, data) {
        state.email = data;
        localStorage.setItem('email', data);
    },

    setUserId(state, data) {
        state.id = data;
        localStorage.setItem('id', data);
    },
    setFirstName(state, data) {
        state.firstName = data;
        localStorage.setItem('firstName', data);
    },
    setLastName(state, data) {
        state.lastName = data;
        localStorage.setItem('lastName', data);
    },
    setSchoolId(state, data) {
        state.school_id = data;
        localStorage.setItem('school_id', data);
    },
    setSchoolName(state, data) {
        state.school_name = data;
        localStorage.setItem('school_name', data);
    },
    setIsGg4lDataSynced(state, data) {
        state.isGg4lDataSynced = data;
        localStorage.setItem('isGg4lDataSynced', data);
    },
    setPhone(state, data) {
        if (data) {
            state.phone = data;
            localStorage.setItem('phone', data);
        }
    },
    setNotifyStatus(state, data) {
        state.notifyStatus = data;
        localStorage.setItem('notifyStatus', data);
    },
    setDistinctId(state, data) {
        state.distinctId = data;
        localStorage.setItem('distinctId', data);
    },
    setStudentSignUp(state, data) {
        state.studentSignUp = data;
        if (data == true || data == 'true') {
            localStorage.setItem('studentSignUp', data);
            this.$store.commit("setStartProductGuide", true);
        }
    },
}
const getters = {

    loginStatus: () => {
        return state.loginStatus;
    },
    token: () => {
        return state.token;
    },
    user_type: () => {
        return state.user_type;
    },

    id: () => {
        return state.id;
    },

    email: () => {
        return state.email;
    },
    errorMessage: () => {
        return state.errorMessage;
    },
    errorType: () => {
        return state.errorType;
    },
    firstName: () => {
        return state.firstName;
    },
    lastName: () => {
        return state.lastName;
    },
    isGg4lDataSynced: () => {
        return state.isGg4lDataSynced;
    },
    phone: () => {
        return state.phone;
    },
    notifyStatus: () => {
        return state.notifyStatus;
    },
    distinctId: () => {
        return state.distinctId;
    },
    studentSignUp: () => {
        return state.studentSignUp;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

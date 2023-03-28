import { BASE_URL, FRONTEND_BASE_URL } from "../assets/js/constants";

const state = {
    errorMessage: "",
    errorType: "",
    successMessage: "",
    successType: "",
    syncStatus: 0,

}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
    async syncGoogleCalendar({ commit }, { }) {
        try {
            let redirect = FRONTEND_BASE_URL + '/teacher-meeting'
            const response = await this.$axios.$get(
                // 'https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar+https://www.googleapis.com/auth/calendar.events&access_type=offline&include_granted_scopes=true&state=there&redirect_uri=https://jochi.devateam.com/teacher-meeting/&client_id=227130792138-jamh1o4o7o3elmchg04ihj3uuoojqkdk.apps.googleusercontent.com&response_type=code&prompt=consent'
                `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar+https://www.googleapis.com/auth/calendar.events&access_type=offline&include_granted_scopes=true&state=there&redirect_uri=${redirect}/&client_id=227130792138-jamh1o4o7o3elmchg04ihj3uuoojqkdk.apps.googleusercontent.com&response_type=code&prompt=consent`
            );

            var myWindow = window.open("", "_self");
            myWindow.document.write(response);
            window.onerror = e => console.log(e);

        } catch (e) {
            console.log("calendar response error", e)

        }


    },

    async updateToken({ commit }, payload) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$post(BASE_URL + 'teacher/sync_calendar', payload, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });

            if (response.message == "Success") {
                commit('setSuccessMessage', payload.status ? "Google calendar sync enabled" : "Google calendar sync disabled");
                commit('setSuccessType', "success");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
            }
        } catch (e) {
            if (e.response && e.response.status == 400) {


                commit('setErrorMessage', "Please remove the number or symbol from the Name and try to sign up");
                commit('setErrorType', "error");
            }
            else if (e.response && e.response.status == 422) {
                commit('setErrorMessage', "A user with this email address already exists");
                commit('setErrorType', "error");
            }
        }



    },
    async getSyncStatus({ commit }, payLoad) {
        try {
            const token = localStorage.getItem('token')
            const response = await this.$axios.$get(BASE_URL + `teacher/get_calendar_sync_status`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setSyncStatus', response.data.teacher_sync_calendar);
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

}
const mutations = {

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
    setSyncStatus(state, data) {
        state.syncStatus = data;
    },

}
const getters = {

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
    syncStatus: () => {
        return state.syncStatus;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

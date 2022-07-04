import { BASE_URL } from "../assets/js/constants";

const state = {
    allList: [],
    allData: [],
    timeZones: [],
    errorMessage: "",
    errorType: "",
    successMessages: "",
    successTypes: "",
}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
    async listAllMeeting({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$get(BASE_URL + `view/all/list_all_meeting?student_id=${payLoad.student_id}&search_id=${payLoad.search_id}`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setAllList', response.data);
            commit('setTimeZone', response.timeZone);
        } catch {
            if (e.response.data.message == "Unauthorized") {
                commit('setSuccessMessages', "");
                commit('setSuccessTypes', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/');
            }
        }


    },
    async getAll({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$get(BASE_URL + `view/all/get_student_and_teacher?user_id=${payLoad.user_id}`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setAllData', response.data);
        } catch {
            if (e.response.data.message == "Unauthorized") {
                commit('setSuccessMessages', "");
                commit('setSuccessTypes', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/');
            }
        }

    },
    async updateMeeting({ commit }, payLoad) {

        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$put(BASE_URL + 'meeting/request/edit_meeting', payLoad, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            if (response.message) {
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                commit('setSuccessMessages', response.message);
                commit('setSuccessTypes', "success");
                return

            }
            if (response.message == "Validation error") {
                commit('setSuccessMessages', "");
                commit('setSuccessTypes', "");
                commit('setErrorMessage', "Invalid Value");
                commit('setErrorType', "error");
            }
            else if (response.message == "Teacher Not Found") {
                commit('setSuccessMessages', "");
                commit('setSuccessTypes', "");
                commit('setErrorMessage', "Teacher Not Found");
                commit('setErrorType', "error");
            }
            else if (response.message == "Student Not Found") {
                commit('setSuccessMessages', "");
                commit('setSuccessTypes', "");
                commit('setErrorMessage', "Student Not Found");
                commit('setErrorType', "error");
            }
            else if (response.message == "You are selected time slot is invalid, please try with another") {
                commit('setSuccessMessages', "");
                commit('setSuccessTypes', "");
                commit('setErrorMessage', "You are selected time slot is invalid, Please try with another");
                commit('setErrorType', "error");

            }
            else if (response.message == "You have already selected this time slot") {
                commit('setSuccessMessages', "");
                commit('setSuccessTypes', "");
                commit('setErrorMessage', "You have already selected this time slot");
                commit('setErrorType', "error");

            }
            else if (response.message == "Teacher and Student are from different school") {
                commit('setSuccessMessages', "");
                commit('setSuccessTypes', "");
                commit('setErrorMessage', "Teacher and Student are from different school");
                commit('setErrorType', "error");

            }
            else if (response.message == "You already have a meeting at the selected time, Please try with another time") {
                commit('setSuccessMessages', "");
                commit('setSuccessTypes', "");
                commit('setErrorMessage', "You already have a meeting at the selected time, Please try with another slot");
                commit('setErrorType', "error");

            }
            else if (response.message == "You already have a meeting") {
                commit('setSuccessMessages', "");
                commit('setSuccessTypes', "");
                commit('setErrorMessage', "You already have a meeting");
                commit('setErrorType', "error");

            }
            else if (response.message == "Success") {
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                commit('setSuccessMessages', "Your meeting request submitted successfully");
                commit('setSuccessTypes', "error");

            }

        } catch (e) {
            if (e.response.data.message == "Unauthorized") {
                commit('setSuccessMessages', "");
                commit('setSuccessTypes', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
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
    setTimeZone(state, data) {
        state.timeZones = data;
    },
    setAllData(state, data) {
        state.allData = data;
    },
    setErrorMessage(state, data) {
        state.errorMessage = data;
    },
    setErrorType(state, data) {
        state.errorType = data;
    },
    setSuccessMessages(state, data) {
        state.successMessages = data;
    },
    setSuccessTypes(state, data) {
        state.successTypes = data;
    },

}
const getters = {
    allList: () => {
        return state.allList;
    },
    allData: () => {
        return state.allData;
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
    successMessages: () => {
        return state.successMessages;
    },
    successTypes: () => {
        return state.successTypes;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

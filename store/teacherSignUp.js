import { BASE_URL } from "../assets/js/constants";

const state = {
    errorMessage: "",
    errorType: "",
    schools: [],
}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
    async teacherSignUp({ commit }, payLoad) {

        try {
            const response = await this.$axios.$post(BASE_URL + 'teacher/teacher_signup', payLoad)
            commit('setErrorMessage', "");
            commit('setErrorType', "");
            this.$router.push("/teacher-confirm-email");
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
    //school list
    async getSchool({ commit }, payLoad) {
        try {
            const response = await this.$axios.$get(BASE_URL + 'schools/all_school', payLoad)
            commit('setSchool', response.data);

        } catch (e) {

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
    setSchool(state, data) {
        state.schools = data;
    },
}
const getters = {
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

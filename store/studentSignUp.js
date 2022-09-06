
import { BASE_URL } from "../assets/js/constants";

const state = {
    errorMessage: "",
    errorType: "",
    successMessage: "",
    successType: "",
    schools: [],
    Email: "",

}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
    async getSignUp({ commit }, payLoad) {


        try {
            const response = await this.$axios.$post(BASE_URL + 'student/student_signup', payLoad)

            if (response.message == "Email already exist") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "A user with this email address already exists");
                commit('setErrorType', "error");
            }
            else if (response.message == "No school found") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "No school found");
                commit('setErrorType', "error");
            }
            else if (response.message == "Already a user exists with the same LMS id") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "Already a user exists with the same LMS id");
                commit('setErrorType', "error");
            }
            else if (response.message == "LMS ID not valid") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "LMS ID not valid");
                commit('setErrorType', "error");
            }
            else if (response.message == "LMS id not found") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "LMS ID not valid");
                commit('setErrorType', "error");
            }
            else if (response.message == "You have entered invalid LMS ID") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "You have entered invalid LMS ID");
                commit('setErrorType', "error");
            }
            else {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");

                this.$router.push("/confirm-email");
            }

        } catch (e) {
            if (e.response && e.response.status == 400) {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "Please remove the number or symbol from the Name and try to sign up");
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
    setSuccessMessage(state, data) {
        state.successMessage = data;
    },
    setSuccessType(state, data) {
        state.successType = data;
    },
    setSchool(state, data) {
        state.schools = data;
    },
    setEmail(state, data) {
        state.Email = data;
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
    schools: () => {
        return state.schools;
    },
    Email: () => {
        return state.Email;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

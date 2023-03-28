import { BASE_URL } from "../assets/js/constants";

const state = {
    schools: [],
    successMessageEmail: "",
    successTypeEmail: "",
    schoolCountEmail: "",
    errorMessageEmail: "",
    errorTypeEmail: "",
}
const actions = {


    async sendEmail({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$post(BASE_URL + 'admin/send-marketing-email', payLoad, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setsuccessMessageEmail', response.message);
            commit('setsuccessTypeEmail', "success");
            commit('seterrorMessageEmail', "");
            commit('seterrorTypeEmail', "");
        } catch (e) {
            if (e.response && e.response.status == 401) {
                window.localStorage.clear();
                this.$router.push('/admin-login');
            }
            else {
                commit('seterrorMessageEmail', e.response.data.message);
                commit('seterrorTypeEmail', "error");
                commit('setsuccessMessageEmail', "");
                commit('setsuccessTypeEmail', "");
            }
        }
    },



}
const mutations = {

    setSchool(state, data) {
        state.schools = data;

    },
    setschoolCountEmail(state, data) {
        state.schoolCountEmail = data;

    },
    setsuccessMessageEmail(state, data) {
        state.successMessageEmail = data;
    },
    setsuccessTypeEmail(state, data) {
        state.successTypeEmail = data;
    },
    seterrorMessageEmail(state, data) {
        state.errorMessageEmail = data;
    },
    seterrorTypeEmail(state, data) {
        state.errorTypeEmail = data;
    },

}
const getters = {

    schools: () => {
        return state.schools;
    },
    schoolCountEmail: () => {
        return state.schoolCountEmail;
    },
    successMessageEmail: () => {
        return state.successMessageEmail;
    },
    successTypeEmail: () => {
        return state.successTypeEmail;
    },
    errorMessageEmail: () => {
        return state.errorMessageEmail;
    },
    errorTypeEmail: () => {
        return state.errorTypeEmail;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

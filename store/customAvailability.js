import { BASE_URL } from "../assets/js/constants";

const state = {
    successMessage: "",
    SuccessType: "",
    errorMessage: "",
    errorType: "",
    teacherSlot: [],
    availableSlot: [],

}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
    async teacherAvailableSlot({ commit }, payLoad) {
        const token = localStorage.getItem('token')

        try {
            const response = await this.$axios.$get(BASE_URL + `custom/availability/teacher_available_slot?teacher_id=${payLoad.teacher_id}`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setTeacherSlot', response.data);
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

    async updateTeacherAvailability({ commit }, payLoad) {

        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$post(BASE_URL + 'custom/availability/update_availability', payLoad, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setErrorMessage', "");
            commit('setErrorType', "");
            commit('setSuccessMessage', "Updated Successfully");
            commit('setSuccessType', "success");
        }
        catch (e) {
            if (e.response && e.response.status == 400) {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', e.response.data.message);
                commit('setErrorType', "error");
            }
            else if (e.response.data.message == "Unauthorized") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/');
            }
        }
    },
    async availabilitySlotswithId({ commit }) {

        try {
            const response = await this.$axios.$get(BASE_URL + 'custom/availability/all_slots', {
            });
            commit('setAvailableSlot', response.data);
        }
        catch (e) {
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
    setAvailableSlot(state, data) {
        state.availableSlot = data;
    },
    setTeacherSlot(state, data) {
        state.teacherSlot = data;
    },
    setSuccessMessage(state, data) {
        state.successMessage = data;
    },
    setSuccessType(state, data) {
        state.SuccessType = data;

    },
    setErrorMessage(state, data) {
        state.errorMessage = data;

    },
    setErrorType(state, data) {
        state.errorType = data;

    },

}
const getters = {
    availableSlot: () => {
        return state.availableSlot;
    },
    SuccessType: () => {
        return state.SuccessType;
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
    teacherSlot: () => {
        return state.teacherSlot;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

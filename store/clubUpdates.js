import { BASE_URL } from "../assets/js/constants";

const state = {

    clubInformation: {},
    errorMessageClubUpdate: "",
    errorTypeClubUpdate: "",
    successMessageClubUpdate: "",
    successTypeClubUpdate: "",

}

const actions = {

    // delete club
    async clubDelete({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$put(BASE_URL + 'clubs/club_delete', payLoad, {
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
            else if (response.message) {
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                commit('setSuccessMessage', response.message);
                commit('setSuccessType', "success");
            }
        } catch (e) {
            if (e.response && e.response.status == 401) {
                window.localStorage.clear();
                this.$router.push('/admin-login');
            }
            else {
                commit('setErrorMessage', e.response.data.error);
                commit('setErrorType', "error");
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
            }
        }
    },

    // leave club
    async clubLeave({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$put(BASE_URL + 'clubs/leave_club', payLoad, {
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
            else if (response.message) {
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                commit('setSuccessMessage', response.message);
                commit('setSuccessType', "success");
            }
        } catch (e) {
            if (e.response && e.response.status == 401) {
                window.localStorage.clear();
                this.$router.push('/admin-login');
            }
            else {
                commit('setErrorMessage', e.response.data.error);
                commit('setErrorType', "error");
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
            }
        }
    },

    // remove as club
    async removeLeader({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$put(BASE_URL + 'clubs/remove_as_leader', payLoad, {
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
            else if (response.message) {
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                commit('setSuccessMessage', response.message);
                commit('setSuccessType', "success");
            }
        } catch (e) {
            if (e.response && e.response.status == 401) {
                window.localStorage.clear();
                this.$router.push('/admin-login');
            }
            else {
                commit('setErrorMessage', e.response.data.error);
                commit('setErrorType', "error");
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
            }
        }
    },

    // get club info 
    async getInformation({ commit }, payLoad) {
        try {
            const token = localStorage.getItem('token')
            const response = await this.$axios.$get(BASE_URL + `clubs/club_info?club_id=${payLoad.club_id}`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            console.log(response);
            commit('setClubInformation', response.data)
            if (response.message) {
                commit('setSuccessMessage', response.message);
                commit('setSuccessType', "success");
            }

        } catch (e) {
            if (e.response.data.message == "Unauthorized") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/');
            } else if (e.response.error) {
                console.log(e)
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', e.response.error);
                commit('setErrorType', 'error');
            }
        }


    },



}
const mutations = {

    setErrorMessage(state, data) {
        state.errorMessageClubUpdate = data;
    },
    setErrorType(state, data) {
        state.errorTypeClubUpdate = data;
    },
    setSuccessMessage(state, data) {
        state.successMessageClubUpdate = data;
    },
    setSuccessType(state, data) {
        state.successTypeClubUpdate = data;
    },
    setClubInformation(state, data) {
        state.clubInformation = data;
    },

}
const getters = {

    errorMessageClubUpdate: () => {
        return state.errorMessageClubUpdate;
    },
    errorTypeClubUpdate: () => {
        return state.errorTypeClubUpdate;
    },
    successMessageClubUpdate: () => {
        return state.successMessageClubUpdate;
    },
    successTypeClubUpdate: () => {
        return state.successTypeClubUpdate;
    },
    setClubInformation: () => {
        return state.setClubInformation;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

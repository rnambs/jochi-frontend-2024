import { BASE_URL } from "../assets/js/constants";

const state = {
    allList: [],
    taglist: [],
    errorMessage: "",
    errorType: "",
    successMessage: "",
    successType: "",
}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
    async getTag({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$get(BASE_URL + `club/detail/get_tag`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setTagList', response.data);
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
    async myClubList({ commit }, payLoad) {
        try {
            const token = localStorage.getItem('token')
            if (payLoad.tag_id) {
                const response = await this.$axios.$get(BASE_URL + `club/detail/my_club_list?user_id=${payLoad.user_id}&tag_id=${payLoad.tag_id}`, {
                    headers: {
                        'Authorization': ` ${token}`
                    },
                });
                commit('setAllList', response.data);
            } else {
                const response = await this.$axios.$get(BASE_URL + `club/detail/my_club_list?user_id=${payLoad.user_id}`, {
                    headers: {
                        'Authorization': ` ${token}`
                    },
                });
                commit('setAllList', response.data);
            }
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
    setAllList(state, data) {
        state.allList = data;
    },

    setTagList(state, data) {
        state.taglist = data;
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

}
const getters = {
    allList: () => {
        return state.allList;
    },

    taglist: () => {
        return state.taglist;
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

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

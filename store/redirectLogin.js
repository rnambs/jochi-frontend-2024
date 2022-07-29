import { BASE_URL } from "../assets/js/constants";

const state = {
    loginStatus: false,
    loginStatusMessage: '',
    errorMessage: '',
    token: '',
    email: '',
    errorMessage: '',
    id: '',
    user_type: '',
    firstName: '',
    lastName: '',
}
const actions = {

    // login using gg4l
    async loginUsingGg4l({ commit }, payLoad) {
        try {
            const response = await this.$axios.$post(BASE_URL + 'auth/gg4l_passport_auth', payLoad)
            if (status = 200) {
                commit('setLoginStatus', true);
                commit('setUserToken', response.data.auth_token);
                commit('setUserEmail', response.data.email);
                commit('setUserId', response.data.id);
                commit('setUserType', response.data.user_type_id);
                commit('setFirstName', response.data.first_name);
                commit('setLastName', response.data.last_name);
                if (response.data.user_type == 1) {
                    this.$router.push('/dashboard');
                }


            }
        }
        catch (err) {
            if (status = 422) {
                commit('setLoginStatus', false);
                window.$nuxt.$cookies.removeAll();
                commit('setUserId', '');
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

    }

}
const mutations = {
    setErrorMessage(state, data) {
        state.errorMessage = data;
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
    firstName: () => {
        return state.firstName;
    },
    lastName: () => {
        return state.lastName;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

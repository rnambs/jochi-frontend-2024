import { BASE_URL } from "../assets/js/constants";

const state = {
    assignmentList: [],
    sharedAssignmentsList: [],
    studentsList: [],
    studentsListAdvisor: [],
    errorMessage: "",
    errorType: "",
    successMessage: "",
    successType: "",

}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
    async inviteStudent({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$get(BASE_URL + `teacher/invite_students_under_advisor?student_id=${payLoad.id}`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });

            if (response.message) {
                commit('setSuccessMessage', response.message);
                commit('setSuccessType', "success");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
            }


        } catch (e) {
            if (e.response.data.message == "Unauthorized") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/');
            } else if (e.response.data.message) {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', e.response.data.message);
                commit('setErrorType', "error");
            }

        }

    },
    async getStudents({ commit }) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$get(BASE_URL + `teacher/get_all_students_under_advisor`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setStudentsListAdvisor', response.data);
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
    async getStudentsList({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        const response = await this.$axios.$get(BASE_URL + `users/get_students?school_id=${payLoad.school_id}&studentId=${payLoad.studentId}`, {
            headers: {
                'Authorization': ` ${token}`
            },
        });
        commit('setStudentsList', response.data);
    },
    async getStudentsAnalytics({ commit }) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$get(BASE_URL + `teacher/get_all_students_under_advisor`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setTeacherList', response.data);
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
    async getStudentProfile({ commit }) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$get(BASE_URL + `teacher/get_all_students_under_advisor`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setTeacherList', response.data);
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
    async getAssignmentsList({ commit }, payLoad) {
        try {
            const token = localStorage.getItem('token')
            const response = await this.$axios.$get(BASE_URL + `planner/all_assignments?student_id=${payLoad.id}`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setAssignmentList', response.assignments);
            commit('setSharedAssignmentsList', response.shared_assignments);
        } catch (e) {
            if (e.response.data.message == "Unauthorized") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/');
            }
            else {
                commit('setErrorMessage', e.response.data.message);
                commit('setErrorType', "error");
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
            }
        }

    },

}

const mutations = {
    setAssignmentList(state, data) {
        state.assignmentList = data;
    },
    setSharedAssignmentsList(state, data) {
        state.sharedAssignmentsList = data;
    },
    setStudentsList(state, data) {
        state.studentsList = data;
    },
    setStudentsListAdvisor(state, data) {
        state.studentsListAdvisor = data;
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
    assignmentList: () => {
        return state.assignmentList;
    },
    sharedAssignmentsList: () => {
        return state.sharedAssignmentsList;
    },
    studentsList: () => {
        return state.studentsList;
    },
    studentsListAdvisor: () => {
        return state.studentsListAdvisor;
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

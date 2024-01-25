import { BASE_URL } from "../assets/js/constants";

const state = {
    assignmentList: [],
    sharedAssignmentsList: [],
    studentsList: [],
    studentsListAdvisor: [],
    overdueAssignments: [],
    sharedOverdueAssignments: [],
    errorMessage: "",
    errorType: "",
    successMessage: "",
    successType: "",
    subjectsData: [],
    emailCountList: '',
    studentCount: '',
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
        // const response = await this.$axios.$get(BASE_URL + `users/get_students?school_id=${payLoad.school_id}&studentId=${payLoad.studentId}`, {
        const response = await this.$axios.$get(BASE_URL + `users/student_list_for_advisors?school_id=${payLoad.school_id}`, {
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
            const response = await this.$axios.$get(BASE_URL + `planner/all_assignments?all_assignments=1&student_id=${payLoad.id}`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setAssignmentList', response.assignments);
            commit('setSharedAssignmentsList', response.shared_assignments);
            commit('setOverdueAssignments', response.overdue_assignments);
            commit('setSharedOverdueAssignments', response.overdue_shared_assignments);
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
    async getSubjectsList({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
          const response = await this.$axios.$get(BASE_URL + `advisor/subjectlist/${payLoad.id}`, {
            headers: {
              'Authorization': ` ${token}`
            },
          });
          commit('setSubjectsList', response.data);
        } catch (e) {
    
          commit('setErrorMessage', e?.response?.data?.message);
          commit('setErrorType', "error");
          commit('setSuccessMessage', "");
          commit('setSuccessType', "")
    
        }
      },
      async addAssignment({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
          const response = await this.$axios.$post(BASE_URL + 'advisor/addAssignment', payLoad, {
            headers: {
              'Authorization': ` ${token}`
            },
          });
          if (response.message == "Assignment added successfully") {
            commit('setErrorMessage', "");
            commit('setErrorType', "");
            commit('setSuccessMessage', "Assignment Added Successfully");
            commit('setSuccessType', "success");
          }
        } catch (e) {
          if (e?.response?.data?.message == "Unauthorized") {
            commit('setSuccessMessage', "");
            commit('setSuccessType', "");
            commit('setErrorMessage', "");
            commit('setErrorType', "");
            window.localStorage.clear();
            this.$router.push('/');
          }
          else if (e?.response?.data?.message == "Validation error") {
            commit('setSuccessMessage', "");
            commit('setSuccessType', "");
            commit('setErrorMessage', "All fields are required ");
            commit('setErrorType', "error");
          }
          else if (e?.response?.data?.message == "Please select an upcoming time") {
            commit('setSuccessMessage', "");
            commit('setSuccessType', "");
            commit('setErrorMessage', "Please select an upcoming time");
            commit('setErrorType', "error");
          }
          else if (e?.response?.data?.message == "User Not found") {
            commit('setSuccessMessage', "");
            commit('setSuccessType', "");
            commit('setErrorMessage', "User Not found");
            commit('setErrorType', "error");
          }
          else if (e?.response?.data?.message == "Assignment already Exist") {
            commit('setSuccessMessage', "");
            commit('setSuccessType', "");
            commit('setErrorMessage', "Assignment already Exist");
            commit('setErrorType', "error");
          }
          else {
            commit('setErrorMessage', e.response.data.error);
            commit('setErrorType', "error");
            commit('setSuccessMessage', "");
            commit('setSuccessType', "");
          }
        }
    
      },
      async emailReminder({ commit }, payLoad) {
        const { detailId, userId } = payLoad; // Destructure detailId and userId from the payload
        const token = localStorage.getItem('token');
        try {
          const response = await this.$axios.$post(BASE_URL + `advisor/emailReminder/${payLoad.detailId}/${payLoad.userId}`, payLoad, {
            headers: {
              'Authorization': ` ${token}`
            },
          });
      
      
          if (response.message) {
            commit('setErrorMessage', "");
            commit('setErrorType', "");
            commit('setSuccessMessage', response.message);
            commit('setSuccessType', "success");
            commit('setEmailCount', response.emailCount);
          } 
        } catch (e) {     
          if (e?.response?.data?.message == "Mail already sent.") {
            commit('setSuccessMessage', "");
            commit('setSuccessType', "");
            commit('setErrorMessage', "A reminder email has already been sent for the day, you can send another reminder tomorrow");
            commit('setErrorType', "error");
          } 
        }
      },
      async getStudentCount({ commit }, ) {
        const token = localStorage.getItem('token')
        try {
          const response = await this.$axios.$get(BASE_URL + `advisor/dashboard/totalStudentsCount`, {
            headers: {
              'Authorization': ` ${token}`
            },
          });
          if(response.status === true ){
          commit('setTotalStudentCount', response.student_count);
          }
          
        } catch (e) { 
          commit('setErrorMessage', e?.response?.data?.message);
          commit('setErrorType', "error");
          commit('setSuccessMessage', "");
          commit('setSuccessType', "")
    console.log(e);
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
    setOverdueAssignments(state, data) {
        state.overdueAssignments = data;
    },
    setSharedOverdueAssignments(state, data) {
        state.sharedOverdueAssignments = data;
    },
    setSubjectsList(state, data) {
        state.subjectsData = data;
      },
      setEmailCount(state, data) {
        state.emailCountList = data;
    },
    setTotalStudentCount(state, data) {
        state.studentCount = data;
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
    overdueAssignments: () => {
        return state.overdueAssignments;
    },
    sharedOverdueAssignments: () => {
        return state.sharedOverdueAssignments;
    },
    subjectsData: () => {
        return state.subjectsData;
      },
      emailCountList: () => {
        return state.emailCountList;
    },
    studentCount: () => {
        return state.studentCount;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

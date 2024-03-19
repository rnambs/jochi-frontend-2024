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
    consistentlyBehindCount: '',
    consistenlyList: [],
    fallingBehindCount: "",
    fallingBehindlist: [],
    aheadCount: '',
    aheadList: [],
    studentDetails: [],
    totalGrades: [],
    taskStatusData:[],
    totalAssignmentscount: '',
    completedAssignmentscount:'',
    completedAssignments: [],
    OverdueAssignmentscount: '',
    OverDueAssignments: [],
    assignmentsGradeList: [],
    completedSharedAssignmentsCount: '',
    completedShareddetails: [],
    overdueSharedAssignmentsCount: '',
    overdueShareddetails: []
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
          commit('setTotalStudentDetails', response.studentDetails);
          }
          
        } catch (e) { 
          commit('setErrorMessage', e?.response?.data?.message);
          commit('setErrorType', "error");
          commit('setSuccessMessage', "");
          commit('setSuccessType', "")
        }
      },
      
      // async getConsistentlyList({ commit }, ) {
      //   const token = localStorage.getItem('token')
      //   try {
      //     const response = await this.$axios.$get(BASE_URL + `advisor/dashboard/consistentlyBehind`, {
      //       headers: {
      //         'Authorization': ` ${token}`
      //       },
      //     });
      //     if(response.status === true ){
      //     commit('setconsistentlyBehindCount', response.consistentlyBehindCount);
      //     commit('setconsistenlyList',response.data)
      //     }
          
      //   } catch (e) { 
      //     commit('setErrorMessage', e?.response?.data?.message);
      //     commit('setErrorType', "error");
      //     commit('setSuccessMessage', "");
      //     commit('setSuccessType', "")
      //   }
      // },
      // async getFallingList({ commit }, ) {
      //   const token = localStorage.getItem('token')
      //   try {
      //     const response = await this.$axios.$get(BASE_URL + `advisor/dashboard/fallingBehind`, {
      //       headers: {
      //         'Authorization': ` ${token}`
      //       },
      //     });
      //     if(response.status === true ){
      //     commit('setfallingBehindCount', response.fallingBehindCount);
      //     commit('setfallingList',response.data)
      //     }
          
      //   } catch (e) { 
      //     commit('setErrorMessage', e?.response?.data?.message);
      //     commit('setErrorType', "error");
      //     commit('setSuccessMessage', "");
      //     commit('setSuccessType', "")
      //   }
      // },
      // async getAheadList({ commit }, ) {
      //   const token = localStorage.getItem('token')
      //   try {
      //     const response = await this.$axios.$get(BASE_URL + `advisor/dashboard/aheadStudents`, {
      //       headers: {
      //         'Authorization': ` ${token}`
      //       },
      //     });
      //     if(response.status === true ){
      //     commit('setAheadCount', response.aheadOfWorks);
      //     commit('setAheadList',response.data)
      //     }
          
      //   } catch (e) { 
      //     commit('setErrorMessage', e?.response?.data?.message);
      //     commit('setErrorType', "error");
      //     commit('setSuccessMessage', "");
      //     commit('setSuccessType', "")
      //   }
      // },
      async getTaskStatus({ commit }, ) {
        const token = localStorage.getItem('token')
        try {
          const response = await this.$axios.$get(BASE_URL + `advisor/dashboard/studentDetails`, {
            headers: {
              'Authorization': ` ${token}`
            },
          });
          if(response.status === true ){
          commit('setconsistentlyBehindCount', response.consistentlyBehindCount);
          commit('setconsistenlyList',response.consistentlyBehindData)
          commit('setfallingBehindCount', response.fallingBehindCount);
          commit('setfallingList',response.fallingBehindData)
          commit('setAheadCount', response.aheadStudentsCount);
          commit('setAheadList',response.aheadStudentsData)
          }
          
        } catch (e) { 
          commit('setErrorMessage', e?.response?.data?.message);
          commit('setErrorType', "error");
          commit('setSuccessMessage', "");
          commit('setSuccessType', "")
        }
      },
      async getGradeLevels({ commit }, ) {
        const token = localStorage.getItem('token')
        try {
          const response = await this.$axios.$get(BASE_URL + `advisor/dashboard/gradeLevels`, {
            headers: {
              'Authorization': ` ${token}`
            },
          });
          if(response.status === true ){
          commit('settotalGrades', response.totalGrades);
          commit('settaskStatusData',response.data)
          }
          
        } catch (e) { 
          commit('setErrorMessage', e?.response?.data?.message);
          commit('setErrorType', "error");
          commit('setSuccessMessage', "");
          commit('setSuccessType', "")
        }
      },
      async getAssignmentsListData({ commit }, payLoad) {
        try {
            const token = localStorage.getItem('token')
            const response = await this.$axios.$get(BASE_URL + `advisor/dashboard/studentAssignment?studentId=${payLoad.id}&valueType=${payLoad.type}&from_date=${payLoad.fromDate}&to_date=${payLoad.toDate}`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setTotalassignmentscount', response.total_assignments_count);
            commit('setCompletedAssignmentscount', response.completed_assignments_count);
            commit('setOverdueAssignmentscount', response.overdue_assignments_count);
            commit('setOverdueassignments', response.overdue_assignments_details);
            commit('setCompletedassignments', response.completed_assignments_details);
            commit('setCompletedSharedAssignmentsCount', response.completed_sharedAssignments_count);
            commit('setCompletedShareddetails', response.completed_sharedAssignments_details);
            commit('setOverdueSharedAssignmentsCount', response.overdue_sharedAssignments_count);
            commit('setOverdueShareddetails', response.overdue_sharedAssignments_details);
        } catch (e) {
            if (e.response.data.message == "This user does not belong to logged in advisor") {
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
    async getGradeList({ commit }, payLoad) {
      try {
          const token = localStorage.getItem('token')
          const response = await this.$axios.$get(BASE_URL + `advisor/dashboard/student/recentGrades/${payLoad.id}`, {
              headers: {
                  'Authorization': ` ${token}`
              },
          });
          commit('setGradelist', response.assignments);
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
  async generatePdf({ commit }, payLoad) {
    try {
        const token = localStorage.getItem('token');
        const response = await this.$axios.$get(BASE_URL + `advisor/dashboard/student/report?studentId=${payLoad.id}&valueType=${payLoad.type}&from_date=${payLoad.fromDate}&to_date=${payLoad.toDate}`, {
            headers: {
                'Authorization': token
            },
            responseType: 'blob' // Set the response type to 'blob'
        });
        // code commented for future use
        
        // Create blob URL from the response
        // const blob = new Blob([response], { type: 'text/html' });
        // Create a URL for the Blob object
        // const url = window.URL.createObjectURL(blob);
        // Open the URL in a new tab
        // window.open(url);
        // Revoke the URL after opening the new tab
        // window.URL.revokeObjectURL(url);

        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.pdf'); // Set a suitable filename
        link.addEventListener('click', () => {
        commit('setSuccessMessage', 'Download initiated');
        });
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); 

    } catch (e) {
        if (e.response && e.response.data.message === "Unauthorized") {
            commit('setSuccessMessage', "");
            commit('setSuccessType', "");
            commit('setErrorMessage', "");
            commit('setErrorType', "");
            window.localStorage.clear();
            this.$router.push('/');
        } else {
            commit('setErrorMessage', e.response.data.message);
            commit('setErrorType', "error");
            commit('setSuccessMessage', "");
            commit('setSuccessType', "");
        }
    }
}

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
    setconsistentlyBehindCount(state, data) {
        state.consistentlyBehindCount = data;
    },
    setconsistenlyList(state, data) {
        state.consistenlyList = data;
    },
    setfallingBehindCount(state, data) {
      state.fallingBehindCount = data;
  },
  setfallingList(state, data) {
      state.fallingBehindlist = data;
  },
  setAheadCount(state, data) {
    state.aheadCount = data;
  },
  setAheadList(state, data) {
    state.aheadList = data;
  },
  setTotalStudentDetails(state, data) {
    state.studentDetails = data;
  },
  settotalGrades(state, data) {
    state.totalGrades = data;
  },
  settaskStatusData(state, data) {
    state.taskStatusData = data;
  },
  setTotalassignmentscount(state, data) {
    state.totalAssignmentscount = data;
  },
  setCompletedAssignmentscount(state, data) {
    state.completedAssignmentscount = data;
  },
  setOverdueAssignmentscount(state, data) {
    state.OverdueAssignmentscount = data;
  },
  setOverdueassignments(state, data) {
    state.OverDueAssignments = data;
  },
  setCompletedassignments(state, data) {
    state.completedAssignments = data;
  },
  setGradelist(state, data) {
    state.assignmentsGradeList = data;
  },
  setresponseStatus(state, data) {
    state.responseStatus = data;
  },
  setCompletedSharedAssignmentsCount(state, data) {
    state.completedSharedAssignmentsCount = data;
  },
  setCompletedShareddetails(state, data) {
    state.completedShareddetails = data;
  },
  setOverdueSharedAssignmentsCount(state, data) {
    state.overdueSharedAssignmentsCount = data;
  },
  setOverdueShareddetails(state, data) {
    state.overdueShareddetails = data;
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
    consistentlyBehindCount: () => {
        return state.consistentlyBehindCount;
    },
    consistenlyList: () => {
        return state.consistenlyList;
    },
    fallingBehindCount: () => {
      return state.fallingBehindCount;
  },
  fallingBehindlist: () => {
      return state.fallingBehindlist;
  },
  aheadCount: () => {
    return state.aheadCount;
  },
  aheadList: () => {
      return state.aheadList;
  },
  studentDetails: () => {
    return state.studentDetails;
  },
  totalGrades: () => {
    return state.totalGrades;
  },
  taskStatusData: () => {
  return state.taskStatusData;
  },
  totalAssignmentscount: () => {
    return state.totalAssignmentscount;
  },
  completedAssignmentscount: () => {
    return state.completedAssignmentscount;
  },
  completedAssignments: () => {
    return state.completedAssignments;
  },
  OverdueAssignmentscount: () => {
    return state.OverdueAssignmentscount;
  },
  OverDueAssignments: () => {
    return state.OverDueAssignments;
  }, 
  assignmentsGradeList: () => {
    return state.assignmentsGradeList;
  }, 
  responseStatus: () => {
    return state.responseStatus;
  }, 
  completedSharedAssignmentsCount: () => {
    return state.completedSharedAssignmentsCount;
  },
  completedShareddetails: () => {
    return state.completedShareddetails;
  },
  overdueSharedAssignmentsCount: () => {
    return state.overdueSharedAssignmentsCount;
  },
  overdueShareddetails: () => {
    return state.overdueShareddetails;
  },
  
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

import { BASE_URL } from "../assets/js/constants";

const state = {
  id: '',
  viewed: '',
  quoteMessage: '',
  successMessage: "",
  successType: "",
  errorMessage: "",
  errorType: "",
  assignment: [],
  sharedAssignment: [],
  subjectsData: [],
  assignmentsList: [],
  sharedAssignmentsList: [],
  completedAssignments: [],
  completedSharedAssignments: [],
  newAdditionalMaterial: {},
  plannerList: [],
  meetingList: [],
  sessionList: [],
  sharedAstList: [],
  sharedSessionList: [],
  clubMeetings: [],
  allSubTskCompleted: false,
  overdues: [],
  sharedOverdues: [],
  trainingsMatches: [],
  SuccessTypeSubTasks: false,

}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
  async getQuotedMessage({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'quotes/motivational_quotes_update', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      commit('setSuccessMessage', "Quotes Message Updated");
      commit('setSuccessType', "success");

    } catch (e) {
      if (e.response && e.response.status == 401) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else {
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
      }
    }

  },
  async showQuotedMessage({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('id')
    try {
      const response = await this.$axios.$get(BASE_URL + `quotes/get_motivational_quote?user_id=${user_id}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setQuoteMessage', response.data.quote);
      commit('setViewed', response.data.isQuoteViewed);
    } catch (e) {
      if (e.response && e.response.status == 401) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else {
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
      }
    }

  },
  async getDailyPlanner({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$get(BASE_URL + `planner/get_Plan?user_id=${payLoad.user_id}&type=${payLoad.type}&date=${payLoad.date}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setPlannerList', response.data);
      commit('setMeetingList', response.meeting);
      commit('setSharedAstList', response.shared_assignments);
      commit('setSessionList', response.session);
      commit('setSharedSessionList', response.shared_sessions);
      commit('setClubMeetings', response.club_meeting);
      commit('setTrainingsMatches', response.team_match_trainings);


    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else {
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
      }
    }


  },
  async getAssignments({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$get(BASE_URL + `planner/all_assignments?offset=${payLoad.offset}&limit=${payLoad.limit}&filter=${payLoad.filter}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setAssignmentsList', response.assignments);
      commit('setSharedAssignmentsList', response.shared_assignments);
      commit('setOverdues', response.overdue_assignments);
      commit('setSharedOverdues', response.overdue_shared_assignments);
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else {
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
      }
    }


  },
  async addAssignment({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'planner/addAssignment', payLoad, {
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
  async getAssignment({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$get(BASE_URL + `planner/get_assignments?id=${payLoad.id}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setAssignmentList', response.assignments[0]);
      commit('setSharedAssignmentList', response.shared_assignments[0]);
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else {
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
      }
    }


  },
  async updateAssignment({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'planner/editAssignment', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Assignment updated successfully") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Assignment Updated Successfully");
        commit('setSuccessType', "success");
        commit('setSuccessTypeSubTasks', response.completed_assignment);
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
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
      }
    }
  },
  //subjectsList list
  async getSubjectsList({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `studyRoom/subjectsList`, {
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
  async completeTask({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'planner/add_task_status', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      if (response.message) {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', response.message);
        commit('setSuccessType', "success");
        commit('setAllSubTskCompleted', response.all_sub_task_completed);
      }

    } catch (e) {
      if (e.response && e.response.status == 401) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else {
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
      }
    }

  },
  //subjectsList list
  async getCompletedAssignments({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `planner/all_completed_assignments?user_id=${payLoad.userId}&type=${payLoad.type}&limit=${payLoad.limit}&offset=${payLoad.offset}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setCompletedAssignments', response.data);
      commit('setCompletedSharedAssignments', response.shared_assignments);
    } catch (e) {

      commit('setErrorMessage', e?.response?.data?.message);
      commit('setErrorType', "error");
      commit('setSuccessMessage', "");
      commit('setSuccessType', "")

    }
  },

  async uploadAdditionalMaterial({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'planner/add_assignment_material', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });


      commit('setAdditionalMaterial', response.data);

      if (response.message == "File uploaded successfully") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "File uploaded successfully");
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
      else if (e?.response?.data?.message == "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Oops! Something went wrong. Please try again later");
        commit('setErrorType', "error");
      }
      else if (e?.response?.data?.message == "File size cannot be larger than 4MB!") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "File size cannot be larger than 4MB!");
        commit('setErrorType', "error");

      }

      else if (e?.response?.data?.message == "No club found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "This club is not exist");
        commit('setErrorType', "error");
        // this.$router.push("/club-detail");

      }
      else if (e?.response?.data?.message == "Club is not active") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Club is not active");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Please upload a file!") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Please upload a file!");
        commit('setErrorType', "error");

      } else if (e?.response?.data?.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e?.response?.data?.message);
        commit('setErrorType', "error");
      }
    }

  },

  async deleteAssignments({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'planner/delete-assignments', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      // commit('setAdditionalMaterial', response.data);

      // if (response.message == "File uploaded successfully") {
      commit('setErrorMessage', "");
      commit('setErrorType', "");
      commit('setSuccessMessage', response.message);
      commit('setSuccessType', "success");
      // }
    } catch (e) {
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else if (e?.response?.data?.message == "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Invalid file type. Only JPEG,JPG,png, pdf and ppt file are allowed.");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Oops! Something went wrong. Please try again later");
        commit('setErrorType', "error");
      }
      else if (e?.response?.data?.message == "File size cannot be larger than 4MB!") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "File size cannot be larger than 4MB!");
        commit('setErrorType', "error");

      }

      else if (e?.response?.data?.message == "No club found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "This club is not exist");
        commit('setErrorType', "error");
        // this.$router.push("/club-detail");

      }
      else if (e?.response?.data?.message == "Club is not active") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Club is not active");
        commit('setErrorType', "error");

      }
      else if (e?.response?.data?.message == "Please upload a file!") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Please upload a file!");
        commit('setErrorType', "error");

      }
    }

  },
  // submit an assignment to GG4L
  async assignmentSubmit({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'lms/assignment_submit', payLoad, {
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
    } catch (e) {
      console.log(e);
      console.log("response",e?.response?.data?.message);
      if (e?.response?.data?.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else if (e?.response?.data?.error) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e?.response?.data?.error);
        commit('setErrorType', "error");
      }
      else if (e?.response?.data?.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage',e?.response?.data?.message);
        commit('setErrorType', "error");
      }
    }

  },

}
const mutations = {
  setUserId(state, data) {
    state.id = data;
    localStorage.setItem('id', data);
  },
  setPlannerList(state, data) {
    state.plannerList = data;
  },
  setMeetingList(state, data) {
    state.meetingList = data;
  },
  setSharedSessionList(state, data) {
    state.sharedSessionList = data;
  },
  setSessionList(state, data) {
    state.sessionList = data;
  },
  setSharedAstList(state, data) {
    state.sharedAstList = data;
  },
  setAssignmentList(state, data) {
    state.assignment = data;
  },
  setSharedAssignmentList(state, data) {
    state.sharedAssignment = data;
  },
  setQuoteMessage(state, data) {
    state.quoteMessage = data;
  },
  setViewed(state, data) {
    state.viewed = data;
  },
  setSuccessMessage(state, data) {
    state.successMessage = data;
  },
  setSuccessTypeSubTasks(state, data) {
    state.SuccessTypeSubTasks = data;
  },
  setSuccessType(state, data) {
    state.successType = data;
  },
  setErrorMessage(state, data) {
    state.errorMessage = data;
  },
  setErrorType(state, data) {
    state.errorType = data;
  },
  setSubjectsList(state, data) {
    state.subjectsData = data;
  },

  setAssignmentsList(state, data) {
    state.assignmentsList = data;
  },
  setSharedAssignmentsList(state, data) {
    state.sharedAssignmentsList = data;
  },
  setCompletedAssignments(state, data) {
    state.completedAssignments = data;
  },
  setCompletedSharedAssignments(state, data) {
    state.completedSharedAssignments = data;
  },
  setAdditionalMaterial(state, data) {
    state.newAdditionalMaterial = data;
  },
  setClubMeetings(state, data) {
    state.clubMeetings = data;
  },
  setAllSubTskCompleted(state, data) {
    state.allSubTskCompleted = data;
  },
  setOverdues(state, data) {
    state.overdues = data;
  },
  setSharedOverdues(state, data) {
    state.sharedOverdues = data;
  },
  setTrainingsMatches(state, data) {
    state.trainingsMatches = data;
  },
}
const getters = {

  id: () => {
    return state.id;
  },
  plannerList: () => {
    return state.plannerList;
  },
  meetingList: () => {
    return state.meetingList;
  },
  sharedSessionList: () => {
    return state.sharedSessionList;
  },
  sessionList: () => {
    return state.sessionList;
  },
  sharedAstList: () => {
    return state.sharedAstList;
  },
  assignment: () => {
    return state.assignment;
  },
  sharedAssignment: () => {
    return state.sharedAssignment;
  },
  quoteMessage: () => {
    return state.quoteMessage;
  },
  viewed: () => {
    return state.viewed;
  },
  successMessage: () => {
    return state.successMessage;
  },
  SuccessTypeSubTasks: () => {
    return state.SuccessTypeSubTasks;
  },
  successType: () => {
    return state.successType;
  },
  errorMessage: () => {
    return state.errorMessage;
  },
  errorType: () => {
    return state.errorType;
  },
  subjectsData: () => {
    return state.subjectsData;
  },
  assignmentsList: () => {
    return state.assignmentsList;
  },
  sharedAssignmentsList: () => {
    return state.sharedAssignmentsList;
  },
  completedAssignments: () => {
    return state.completedAssignments;
  },
  completedSharedAssignments: () => {
    return state.completedSharedAssignments;
  },
  newAdditionalMaterial: () => {
    return state.newAdditionalMaterial;
  },
  clubMeetings: () => {
    return state.clubMeetings;
  },
  allSubTskCompleted: () => {
    return state.allSubTskCompleted;
  },
  overdues: () => {
    return state.overdues;
  },
  sharedOverdues: () => {
    return state.sharedOverdues;
  },
  trainingsMatches: () => {
    return state.trainingsMatches;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

import Vue from 'vue';
import Vuex from 'vuex';
import { login } from './login';
import { forgotPassword } from './forgotPassword';
import { forgotPasswordReset } from './forgotPasswordReset';
import { resetPassword } from './resetPassword';
import { schoolForm } from './schoolForm';
import { schoolListTable } from './schoolListTable';
import { clubForm } from './clubForm';
import { clubListTable } from './clubListTable';
import { userListTable } from './userListTable';
import { schoolEditForm } from './schoolEditForm';
import { clubEditForm } from './clubEditForm';
import { studentSignUp } from './studentSignUp';
import { studentSetPassword } from './studentSetPassword';
import { studentSignIn } from './studentSignIn';
import { studentForgotPassword } from './studentForgotPassword';
import { studentResetPassword } from './studentResetPassword';
import { teacherSignUp } from './teacherSignUp';
import { quotedMessage } from './quotedMessage';
import { teacherSignInRequest } from './teacherSignInRequest';
import { teacherLogin } from './teacherSignInRequest';
import { emailVerified } from './emailVerified';
import { teacherMeeting } from './teacherMeeting';
import { customAvailability } from './customAvailability';
import { studentCustomAvailability } from './studentCustomAvailability';
import { clubUpdates } from './clubUpdates';
import { teacherAppointment } from './teacherAppointment';
import { viewAllMeeting } from './viewAllMeeting';
import { appointmentVerified } from './appointmentVerified';
import { clubCatalogue } from './clubCatalogue';
import { myClub } from './myClub';
import { myClubTeacher } from './myClubTeacher';
import { clubInfo } from './clubInfo';
import { clubFiles } from './clubFiles';
import { clubMoreInfo } from './clubMoreInfo';
import { teacherClubInfo } from './teacherClubInfo';
import { teacherClubFiles } from './teacherClubFiles';
import { teacherClubMoreInfo } from './teacherClubMoreInfo';
import { plannerMonth } from './plannerMonth';
import { plannerWeek } from './plannerWeek';
import { profilePage } from './profilePage';
import { studyRoom } from './studyRoom';
import { dashBoard } from './dashBoard';
import { teacherDashboard } from './teacherDashboard';
import { userStudyAnalytics } from './userStudyAnalytics';
import { teacherSyncCalendar } from './teacherSyncCalendar';

Vue.use(Vuex);
export const store = new Vuex.Store({
    module: {
        login,
        forgotPassword,
        forgotPasswordReset,
        resetPassword,
        schoolForm,
        schoolListTable,
        clubForm,
        clubListTable,
        userListTable,
        schoolEditForm,
        clubEditForm,
        studentSignUp,
        studentSetPassword,
        studentSignIn,
        studentForgotPassword,
        studentResetPassword,
        teacherSignUp,
        quotedMessage,
        teacherSignInRequest,
        teacherLogin,
        emailVerified,
        teacherMeeting,
        customAvailability,
        teacherAppointment,
        viewAllMeeting,
        appointmentVerified,
        clubCatalogue,
        myClub,
        myClubTeacher,
        clubInfo,
        clubFiles,
        clubMoreInfo,
        teacherClubInfo,
        teacherClubFiles,
        teacherClubMoreInfo,
        plannerMonth,
        plannerWeek,
        profilePage,
        studyRoom,
        dashBoard,
        teacherDashboard,
        userStudyAnalytics,
        teacherSyncCalendar,
        studentCustomAvailability,
        clubUpdates
    }
});

export const state = () => ({
    isTimerRunning: false,
    startProductGuide: false,
    startProductGuideNotification: false,
})

export const mutations = {
    SET_IS_TIMER_RUNNING(state, value) {
        console.log('SET_IS_TIMER_RUNNING', value)
        state.isTimerRunning = value
    },

    setStartProductGuide(state, value) {
        state.startProductGuide = value
    },
    setStartProductGuideNotification(state, value) {
        state.startProductGuideNotification = value
    }
}


// async mounted() {
//     const currentToken = await this.$fire.messaging.getToken()
//     const data = JSON.stringify({
//       notification: {
//         title: 'firebase',
//         body: 'firebase is awesome',
//         click_action: 'http://localhost:3000/',
//         icon: 'http://localhost:3000/assets/images/brand-logo.png'
//       },
//       to: currentToken
//     })
//     const config = {
//       method: 'post',
//       url: 'https://fcm.googleapis.com/fcm/send',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'key=<yourServerKey>'
//       },
//       data
//     };
//     const response = await axios(config)
//     this.$fire.messaging.onMessage((payload) => {
//       console.info('Message received: ', payload)
//     })
//     this.$fire.messaging.onTokenRefresh(async () => {
//       const refreshToken = await this.$fire.messaging.getToken()
//       console.log('Token Refreshed',refreshToken)
//     })
//   }
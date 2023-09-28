// // auth.js
// import { mapState, mapActions } from "vuex";
// import redirectLogin from "../store/redirectLogin";
// export default function ({ store, redirect, route }) {
//   const schoolAccess = store.getters['redirectLogin/schoolAccess'];
//   if (route.path === '/student-dashboard') {
//     // Allow access to '/student-dashboard' regardless of 'schoolAccess'
//     return;
//   }
//   if (schoolAccess !== 'ClubOnly') {
//     console.log('User does not have FullAccess' , schoolAccess );
//     return redirect('/');
//   }
//   }
  
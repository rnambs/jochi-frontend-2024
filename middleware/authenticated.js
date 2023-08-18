// Create a file called auth.js in your middleware folder (if it doesn't exist)
// middleware/auth.js
export default function ({ store, redirect }) {
    // Check if the user is authenticated
    console.log("store.state.loginStatus", store.state.loginStatus);
    if (store.state.loginStatus) {
      // Redirect to the desired page (e.g., the home page) when logged in
      return redirect('/student-dashboard');
    }
  }
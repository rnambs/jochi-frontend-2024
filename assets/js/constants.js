// export const defaultImage = 'https://jochi-developement.s3.ap-south-1.amazonaws.com/profilePic/1634542050892.png';
export const defaultImage = 'https://jochi-live.s3.amazonaws.com/profilePic/defaultProfilePic/profile.png';

// export const defaultImage = '~/assets/images/avatar/man_green.svg';


// export const BASE_URL = 'https://api.jochi.live/';
export const BASE_URL = 'https://api.jochi.devateam.com/';
// export const BASE_URL = 'http://localhost:5000/';

// export const REDIRECT_LOGIN_URL = 'https://www.jochi.live/redirect-login';
export const REDIRECT_LOGIN_URL = 'https://jochi.devateam.com/redirect-login';
// export const REDIRECT_LOGIN_URL = 'http://localhost:3101/redirect-login';

// export const FRONTEND_BASE_URL = 'https://www.jochi.live';
export const FRONTEND_BASE_URL = 'https://jochi.devateam.com/';
// export const FRONTEND_BASE_URL = 'http://localhost:3101/';

export const MIXPANEL_TOKEN = 'b9cdd17303381147a3e2c53700e2da94'; //client account
// export const MIXPANEL_TOKEN = 'e613a6e1f301b9b34075f3d8358cc205'; // test account

// export const GG4L_REDIRECT_LOGIN_URL = "https://sso.gg4l.com/oauth/auth?response_type=code&client_id=PTRQTIBSJC&redirect_uri="
// export const GG4L_REDIRECT_LOGIN_URL = "https://ed.link/sso/login?client_id=515bbb1e-ba82-455d-8fe1-e70535190a8a&redirect_uri=http%3A%2F%2Flocalhost%3A3101%2Fredirect-login&response_type=code"
export const GG4L_REDIRECT_LOGIN_URL = "https://ed.link/sso/login?client_id=515bbb1e-ba82-455d-8fe1-e70535190a8a&redirect_uri=" + REDIRECT_LOGIN_URL + "&response_type=code"
export const GG4L_REDIRECT_URL = "https://sso.gg4l.com/oauth/loginwith/logout?redirect_uri="

// encodeURI
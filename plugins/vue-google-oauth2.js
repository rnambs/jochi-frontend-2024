import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '822922548350-k2uul83tjevfc18r5khca9hhjub324q7.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
  prompt: 'consent',
  accessType : 'offline'
}
Vue.use(GAuth, gauthOption)
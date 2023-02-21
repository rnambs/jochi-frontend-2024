// plugins/intro.js
import Vue from 'vue'
import IntroJs from 'intro.js'

Vue.use({
    install(Vue) {
        Vue.prototype.$intro = IntroJs
    }
})

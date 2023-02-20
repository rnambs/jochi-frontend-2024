const fs = require('fs');
export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    head: {
        title: 'JOCHI',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/image/favicon.png' },
            { rel: 'stylesheet', type: 'text/css', href: "https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" },
            { rel: 'stylesheet', type: 'text/css', href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" },
            { rel: 'stylesheet', type: 'text/css', href: "https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css" },
            { rel: 'stylesheet', type: 'text/css', href: "https://cdn.jsdelivr.net/npm/pixeden-stroke-7-icon@1.2.3/pe-icon-7-stroke/dist/pe-icon-7-stroke.min.css" },
            { rel: 'stylesheet', type: 'text/css', href: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/css/flag-icon.min.css" },
            { rel: 'stylesheet', type: 'text/css', href: "/css/cs-skin-elastic.css" },

            { rel: 'stylesheet', type: 'text/css', href: "/css/style.css" },
            { rel: 'stylesheet', type: 'text/css', href: "https://pro.fontawesome.com/releases/v5.10.0/css/all.css" },



            { rel: 'stylesheet', type: 'text/css', href: "/css/lib/chosen/chosen.min.css" },
            { rel: 'stylesheet', type: 'text/css', href: "https://cdn.jsdelivr.net/npm/chartist@0.11.0/dist/chartist.min.css" },
            { rel: 'stylesheet', type: 'text/css', href: "https://cdn.jsdelivr.net/npm/jqvmap@1.5.1/dist/jqvmap.min.css" },
            { rel: 'stylesheet', type: 'text/css', href: "https://cdn.jsdelivr.net/npm/fullcalendar@3.9.0/dist/fullcalendar.min.css" },
            { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800' },
            { rel: 'stylesheet', type: 'text/css', href: "/css/lib/datatable/dataTables.bootstrap.min.css" },
            { rel: 'stylesheet', type: 'text/css', href: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" },
            { rel: 'stylesheet', type: 'text/css', href: "https://unpkg.com/vue-select@latest/dist/vue-select.css" },
            { rel: 'stylesheet', type: 'text/css', href: "https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" },
        ],
        script: [
            { src: "https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js" },
            { src: "https://cdn.jsdelivr.net/npm/jquery@2.2.4/dist/jquery.min.js" },
            { src: "https://cdn.jsdelivr.net/npm/popper.js@1.14.4/dist/umd/popper.min.js" },
            { src: "https://cdn.jsdelivr.net/npm/jquery-match-height@0.7.2/dist/jquery.matchHeight.min.js" },
            { src: "/js/main.js" },
            { src: "/js/lib/chosen/chosen.jquery.min.js" },
            { src: "https://cdn.jsdelivr.net/npm/chart.js@2.7.3/dist/Chart.bundle.min.js" },
            { src: "https://cdn.jsdelivr.net/npm/chartist@0.11.0/dist/chartist.min.js" },
            { src: "https://cdn.jsdelivr.net/npm/chartist-plugin-legend@0.6.2/chartist-plugin-legend.min.js" },
            { src: "https://cdn.jsdelivr.net/npm/jquery.flot@0.8.3/jquery.flot.min.js" },
            { src: "https://cdn.jsdelivr.net/npm/flot-pie@1.0.0/src/jquery.flot.pie.min.js" },
            { src: "https://cdn.jsdelivr.net/npm/flot-spline@0.0.1/js/jquery.flot.spline.min.js" },
            // { src: "https://cdn.jsdelivr.net/npm/simpleweather@3.1.0/jquery.simpleWeather.min.js" },
            // { src: "/js/init/weather-init.js" },
            { src: "https://cdn.jsdelivr.net/npm/moment@2.22.2/moment.min.js" },
            { src: "https://cdn.jsdelivr.net/npm/fullcalendar@3.9.0/dist/fullcalendar.min.js" },
            { src: "/js/init/fullcalendar-init.js" },
            { src: "/js/lib/data-table/datatables.min.js" },
            { src: "/js/lib/data-table/dataTables.bootstrap.min.js" },
            { src: "/js/lib/data-table/dataTables.buttons.min.js" },
            { src: "/js/lib/data-table/jszip.min.js" },
            { src: "/js/lib/data-table/vfs_fonts.js" },
            { src: "/js/lib/data-table/buttons.html5.min.js" },
            { src: "/js/lib/data-table/buttons.print.min.js" },
            { src: "/js/lib/data-table/buttons.colVis.min.js" },
            { src: "https://cdn.jsdelivr.net/jquery/latest/jquery.min.js" },
            { src: "https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" },
            { src: "/js/lib/data-table/buttons.bootstrap.min.js" },
            { src: "https://cdn.jsdelivr.net/momentjs/latest/moment.min.js" },
            { src: "https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js" },

        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/Vuelidate' },
        { src: '~/plugins/VueToast' },
        { src: '~/plugins/VueStarRating.js', mode: 'client' },
        { src: '~/plugins/vue-google-oauth2', mode: 'client' },
        { src: '~/plugins/vue-datepicker', ssr: false },
        { src: '~/plugins/croppa', ssr: false },
        { src: '~/plugins/vuetify', ssr: false },
        { src: '~/plugins/vue-drag-drop', ssr: false },
        { src: '~/plugins/vuejs-progress-bar', ssr: false },
        { src: '~/plugins/mixpanel.js', mode: 'client' }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // Simple usage
        '@nuxtjs/vuetify',
        '@nuxtjs/dotenv'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/toast',
        'nuxt-vue-multiselect',
        ['@nuxtjs/firebase',
            {
                config: {
                    apiKey: "AIzaSyB7G1KkUjOSmoZhauukZpH1nRhJvsfQfQo",
                    authDomain: "jochi-ff725.firebaseapp.com",
                    projectId: "jochi-ff725",
                    storageBucket: "jochi-ff725.appspot.com",
                    messagingSenderId: "273788357446",
                    appId: "1:273788357446:web:91c1c88a2b0640b3f57347",
                    measurementId: "G-K3M3QC31SE"
                },
                services: {
                    messaging: {
                        createServiceWorker: true,
                        fcmPublicVapidKey: 'BBVr0B9dQ3PolUztt_7Z_XNghUxepkUxSmW_SMh2zPe8vNUcHnFw3J2LXfkxK7-tGtYmjiyiDN2YJgrzDO5vACk', //see step 7
                        inject: fs.readFileSync('./serviceWorker.js') //see step 8
                    },
                }
            }],
        'cookie-universal-nuxt'
        // '@nuxtjs/composition-api/module'
        // '@nuxtjs/firebase',{
        //     config: {
        //       apiKey: "AIzaSyB7G1KkUjOSmoZhauukZpH1nRhJvsfQfQo",
        //       authDomain: "jochi-ff725.firebaseapp.com",
        //       projectId: "jochi-ff725",
        //       storageBucket: "jochi-ff725.appspot.com",
        //       messagingSenderId: "273788357446",
        //       appId: "1:273788357446:web:91c1c88a2b0640b3f57347",
        //       measurementId: "G-K3M3QC31SE"
        //     },
        //     onFirebaseHosting: false,
        //     services: {
        //       messaging: {
        //         createServiceWorker: true,
        //         fcmPublicVapidKey: 'BBVr0B9dQ3PolUztt_7Z_XNghUxepkUxSmW_SMh2zPe8vNUcHnFw3J2LXfkxK7-tGtYmjiyiDN2YJgrzDO5vACk',
        //         inject: fs.readFileSync('./store/serviceWorker.js')
        //       }
        //     }
        //   }
    ],


    toast: {
        position: 'top-right',
        duration: 5000
    },
    generate: {
        fallback: true,
        routes: ['404']
    },
    server: {
        port: 3101,
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [/^vue-google-oauth2($|\/)/]
    },

    serverMiddleware: [
        '~/api/socket.io'
    ]


}

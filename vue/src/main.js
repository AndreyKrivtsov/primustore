//import store from './store'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from 'vue-notification'

import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'

import { PrimusFront } from './primusfront'

// Models
import ProductModel from './models/ProductModel'

Vue.config.productionTip = false

// инициализация orm
const database = new VuexORM.Database()

// регистрация объектов orm в хранилище
database.register(ProductModel)
// Вторую модель регистрирует ModelStore
//database.register(ShoppingCardModel)

Vue.use(Vuex)
const store = new Vuex.Store({
    plugins: [VuexORM.install(database)]
})

Vue.use(PrimusFront, {
    Global: { defaultDesign: '' },
    API: {
        getListLimit: 10,
        axiosConnector: { one: 1 },
        apolloConnector: { two: 2 },
        defaultConnector: 'apollo',
    }
})

Vue.use(Notifications)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

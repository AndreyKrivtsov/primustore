import Vue from 'vue'
import router from './router'
import App from './App.vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import Notifications from 'vue-notification'

import { PrimusFront } from './primusfront'
import { adminCompToReg } from './components'
import ModelDatabase from '@/models'
import ComponentModel from './models/ComponentModel'

import VForm from './components/VComponents/VForm'
import VCol from './components/VComponents/VCol'
import VRow from './components/VComponents/VRow'
import VTextField from './components/VComponents/VTextField'

import '@/assets/style.scss'

Vue.config.productionTip = false

Vue.use(PrimusFront, {
    Global: { defaultDesign: 'vuetify' },
    API: {
        getListLimit: 10,
        axiosConnector: { one: 1 },
        apolloConnector: { two: 2 },
        defaultConnector: 'apollo',
    }
})

Vue.use(Vuex)
const store = new Vuex.Store({
    plugins: [VuexORM.install(ModelDatabase)]
})

Vue.use(Notifications)

// глобальная регистрация компонентов раздела "@/components/admin"
adminCompToReg.forEach(({ name, config } = {}) => {
    let conf = config.component.default || config.component
    let compName = conf.name
    console.log(conf)
    ComponentModel.insert({
        data: {
            header: config.header,
            name: compName,
            attrs: {},
            active: false
        }
    })
    Vue.component(compName, conf)
})

// Заглушка для vuetify
Vue.component('VForm', VForm)
Vue.component('VCol', VCol)
Vue.component('VRow', VRow)
Vue.component('VTextField', VTextField)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
